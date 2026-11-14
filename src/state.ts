import {seedProjects,categories} from './data';
import type {Project,Revision,Assignment,Feedback,Progress,Prefs} from './types';
export type RecordProgress=Progress&{profile:string};
export type State={schema:2;projects:Project[];revisions:Revision[];assignments:Assignment[];feedback:Feedback[];progress:RecordProgress[];prefs:Record<string,Prefs>};
export const copy=<T>(v:T):T=>JSON.parse(JSON.stringify(v));
const now=()=>new Date().toISOString();
const id=()=>crypto.randomUUID();
function fail(message:string):never{throw new Error(message)}
function text(v:unknown,label:string,max=12000,required=false){if(typeof v!=='string'||v.length>max||(required&&!v.trim()))fail(label+' non valido.');return (v as string);}
function list(v:unknown,label:string,max=80){if(!Array.isArray(v)||v.length>max)fail(label+' non valido.');return (v as unknown[]).map(x=>text(x,label));}
export function validateProject(raw:any):Project{
 if(!raw||typeof raw!=='object')fail('Scheda non valida.');
 const p:Project={id:text(raw.id,'Identificativo',100,true),code:text(raw.code,'Codice',30,true),title:text(raw.title,'Titolo',160,true),mission:text(raw.mission,'Missione',12000,true),category:text(raw.category,'Categoria',50,true),level:Number(raw.level),timeMin:Number(raw.timeMin),timeMax:Number(raw.timeMax),concepts:list(raw.concepts,'Concetti'),classes:list(raw.classes,'Classi',3),objectives:list(raw.objectives,'Obiettivi'),prerequisites:list(raw.prerequisites,'Prerequisiti'),materials:list(raw.materials,'Materiali'),steps:[],personalization:list(raw.personalization,'Personalizzazioni'),extensions:list(raw.extensions,'Estensioni'),errors:list(raw.errors,'Errori frequenti'),criteria:list(raw.criteria,'Criteri'),teacherNotes:text(raw.teacherNotes,'Note docente'),solution:text(raw.solution,'Soluzione'),status:text(raw.status,'Stato',40,true),source:text(raw.source,'Origine'),version:Number(raw.version)||1,updatedAt:typeof raw.updatedAt==='string'?raw.updatedAt:'',archived:!!raw.archived};
 if(!categories.some(c=>c.id===p.category)||!Number.isInteger(p.level)||p.level<1||p.level>4)fail('Categoria o livello non valido.');
 if(!Number.isFinite(p.timeMin)||!Number.isFinite(p.timeMax)||p.timeMin<5||p.timeMax<p.timeMin||p.timeMax>1000)fail('Intervallo di tempo non valido.');
 if(!['Bozza','Da sperimentare','In revisione','Validato'].includes(p.status)||p.classes.some(c=>!['1','2','3'].includes(c)))fail('Stato o classe non valido.');
 if(!Number.isInteger(p.version)||p.version<1)fail('Versione non valida.');
 if(raw.originalId)p.originalId=text(raw.originalId,'Originale',100,true);
 if(!Array.isArray(raw.steps)||!raw.steps.length||raw.steps.length>40)fail('Servono da 1 a 40 passaggi.');
 p.steps=raw.steps.map((s:any)=>({id:text(s.id,'ID passaggio',100,true),title:text(s.title,'Titolo passaggio',200,true),body:text(s.body,'Istruzioni',12000,true),check:text(s.check,'Prova',12000,true),hint:text(s.hint??'','Aiuto')}));
 if(new Set(p.steps.map(s=>s.id)).size!==p.steps.length)fail('I passaggi devono avere identificativi differenti.');
 return p;
}
export function initialState(at=now()):State{const projects=seedProjects.map(p=>({...copy(p),updatedAt:at,archived:false}));return{schema:2,projects,revisions:projects.map(p=>({id:'initial-'+p.id,projectId:p.id,version:1,snapshot:copy(p),note:'Prima edizione · CODING LAB',createdAt:at})),assignments:[],feedback:[],progress:[],prefs:{}};}
export function readState(s:State,profile='docente'){return{projects:copy(s.projects),assignments:copy(s.assignments),feedback:copy(s.feedback),progress:copy(s.progress.filter(p=>p.profile===profile)),prefs:copy(s.prefs[profile]||{favorites:[]}),progressRows:copy(s.progress)};}
export function readHistory(s:State,projectId:string){return{revisions:copy(s.revisions.filter(r=>r.projectId===projectId).sort((a,b)=>b.version-a.version))};}
export function mutateState(s:State,b:any,at=now(),newId:()=>string=id):any{
 const find=(projectId:string)=>s.projects.find(p=>p.id===projectId)||fail('Progetto non trovato.');
 const revise=(p:Project,expected:number,note:string)=>{const current=find(p.id);if(current.version!==expected)fail('La scheda è cambiata in un’altra finestra. Ricarica prima di salvare.');const saved={...copy(p),version:current.version+1,updatedAt:at};s.projects=s.projects.map(x=>x.id===saved.id?saved:x);s.revisions.push({id:newId(),projectId:saved.id,version:saved.version,snapshot:copy(saved),note:text(note,'Nota revisione',300),createdAt:at});return copy(saved)};
 switch(b.action){
 case 'save':return{project:revise(validateProject(b.project),Number(b.expectedVersion),b.note||'Aggiornamento della scheda')};
 case 'duplicate':{const p=find(text(b.id,'Progetto',100,true));const clone={...copy(p),id:newId(),code:p.code.replace(/v+$/,'').slice(0,28)+'v',title:(p.title+' · variante').slice(0,160),originalId:p.originalId||p.id,status:'Bozza',version:1,updatedAt:at,archived:false};s.projects.push(clone);s.revisions.push({id:newId(),projectId:clone.id,version:1,snapshot:copy(clone),note:'Variante da '+p.code,createdAt:at});return{project:copy(clone)}}
 case 'create':{const p={...validateProject(b.project),id:newId(),version:1,updatedAt:at,archived:false};s.projects.push(p);s.revisions.push({id:newId(),projectId:p.id,version:1,snapshot:copy(p),note:'Nuovo progetto',createdAt:at});return{project:copy(p)}}
 case 'restore':{const p=find(b.id),r=s.revisions.find(r=>r.id===b.revisionId&&r.projectId===p.id)||fail('Revisione non trovata.');return{project:revise({...copy(r.snapshot),id:p.id,archived:p.archived},b.expectedVersion,'Ripristino della revisione '+r.version)}}
 case 'archive':{const p=find(b.id);return{project:revise({...p,archived:!p.archived},b.expectedVersion,p.archived?'Ripristinato nel catalogo':'Progetto archiviato')}}
 case 'assign':{const a=b.assignment;const projectIds=list(a?.projectIds,'Progetti assegnati',100);if(!projectIds.length||projectIds.some(id=>find(id).archived))fail('Seleziona almeno un progetto attivo.');const assignment:Assignment={id:newId(),title:text(a.title,'Titolo',160,true),className:text(a.className,'Classe',50,true).trim().toUpperCase(),projectIds,due:text(a.due||'','Scadenza',20),notes:text(a.notes||'','Consegna'),createdAt:at};s.assignments.unshift(assignment);return{assignment:copy(assignment)}}
 case 'removeAssignment':s.assignments=s.assignments.filter(a=>a.id!==b.id);return{ok:true};
 case 'progress':{const profile=text(b.profile,'Codice percorso',1100,true),projectId=text(b.projectId,'Progetto',100,true);find(projectId);const data={profile,projectId,checks:list(b.checks,'Checklist',100).map(x=>text(x,'Spunta',100)),reflection:text(b.reflection??'','Riflessione',5000),updatedAt:at};s.progress=s.progress.filter(p=>!(p.profile===profile&&p.projectId===projectId));s.progress.push(data);return{progress:copy(data)}}
 case 'prefs':{const profile=text(b.profile,'Codice percorso',1100,true);const favorites=list(b.favorites,'Preferiti',1000);s.prefs[profile]={favorites};return{ok:true}}
 case 'feedback':{const f=b.feedback;find(text(f?.projectId,'Progetto',100,true));const message=text(f?.message,'Feedback',3000,true).trim();if(message.length<3||!['Idea','Difficoltà','Errore nella scheda','Esperienza'].includes(f.kind)||!Number.isInteger(f.rating)||f.rating<1||f.rating>5)fail('Feedback non valido.');const feedback:Feedback={id:newId(),projectId:f.projectId,alias:text(f.alias??'','Codice alunno',80),className:text(f.className??'','Classe',50),kind:f.kind,message,rating:f.rating,resolved:false,createdAt:at};s.feedback.unshift(feedback);return{feedback:copy(feedback)}}
 case 'resolveFeedback':{const f=s.feedback.find(f=>f.id===b.id)||fail('Feedback non trovato.');f.resolved=!!b.resolved;return{ok:true}}
 default:return fail('Operazione non riconosciuta.');
 }
}
export function backupState(s:State){return{app:'CODING LAB',version:2,exportedAt:now(),state:copy(s)};}
export function importState(raw:any):State{
 if(!raw||raw.app!=='CODING LAB')fail('Questo file non è un backup CODING LAB.');
 const v=raw.state||raw;
 if(!Array.isArray(v.projects)||!v.projects.length||v.projects.length>1000)fail('Il backup non contiene progetti validi.');
 const projects=v.projects.map(validateProject) as Project[];
 if(new Set(projects.map(p=>p.id)).size!==projects.length)fail('Il backup contiene progetti con lo stesso identificativo.');
 const at=now(),projectIds=new Set(projects.map(p=>p.id));
 const state:State={schema:2,projects,revisions:[],assignments:[],feedback:[],progress:[],prefs:{}};
 if(Array.isArray(v.revisions)&&v.revisions.length<=20000){for(const r of v.revisions){const snapshot=validateProject(r.snapshot);if(!projectIds.has(snapshot.id)||r.projectId!==snapshot.id||Number(r.version)!==snapshot.version)fail('Storico delle revisioni incoerente.');state.revisions.push({id:text(r.id,'ID revisione',100,true),projectId:snapshot.id,version:snapshot.version,snapshot,note:text(r.note??'Importazione','Nota revisione',300),createdAt:text(r.createdAt||at,'Data',40)})}}
 for(const p of projects)if(!state.revisions.some(r=>r.projectId===p.id&&r.version===p.version))state.revisions.push({id:'import-'+p.id+'-'+p.version,projectId:p.id,version:p.version,snapshot:copy(p),note:'Snapshot importato dal backup',createdAt:at});
 if(new Set(state.revisions.map(r=>r.projectId+'|'+r.version)).size!==state.revisions.length)fail('Revisioni duplicate nel backup.');
 for(const a of Array.isArray(v.assignments)?v.assignments:[]){if(state.assignments.length>=1000)fail('Troppe assegnazioni.');const ids=list(a.projectIds,'Progetti assegnati',100);if(ids.some(id=>!projectIds.has(id)))fail('Assegnazione con progetto mancante.');state.assignments.push({id:text(a.id,'Assegnazione',100,true),title:text(a.title,'Titolo',160,true),className:text(a.className,'Classe',50,true),due:text(a.due||'','Data',20),notes:text(a.notes||'','Consegna'),projectIds:ids,createdAt:text(a.createdAt||at,'Data',40)})}
 for(const r of Array.isArray(v.progress)?v.progress:[]){if(!projectIds.has(r.projectId))continue;state.progress.push({profile:text(r.profile||'docente','Codice percorso',1100,true),projectId:r.projectId,checks:list(r.checks,'Checklist',100),reflection:text(r.reflection||'','Riflessione',5000),updatedAt:text(r.updatedAt||at,'Data',40)})}
 for(const f of Array.isArray(v.feedback)?v.feedback:[]){if(!projectIds.has(f.projectId))continue;state.feedback.push({id:text(f.id,'Feedback',100,true),projectId:f.projectId,alias:text(f.alias||'','Codice alunno',80),className:text(f.className||'','Classe',50),kind:text(f.kind||'Esperienza','Tipo feedback',40),message:text(f.message,'Feedback',3000,true),rating:Math.min(5,Math.max(1,Number(f.rating)||3)),resolved:!!f.resolved,createdAt:text(f.createdAt||at,'Data',40)})}
 if(v.prefs&&typeof v.prefs==='object')for(const [profile,pref] of Object.entries(v.prefs) as [string,any][]){if(['__proto__','constructor','prototype'].includes(profile))continue;state.prefs[profile]={favorites:list(pref.favorites,'Preferiti',1000).filter(id=>projectIds.has(id))};}
 return state;
}
