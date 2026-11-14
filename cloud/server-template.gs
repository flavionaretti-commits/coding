/** CODING LAB · archivio personale Google Drive per la PWA GitHub Pages. */
function inizializzaCodingLab() {
  var props = PropertiesService.getScriptProperties();
  var existing = props.getProperty('CODING_DB_FILE');
  if (!existing) {
    var file = DriveApp.createFile('CODING_LAB_ARCHIVIO.json', JSON.stringify(CodingLabEngine.initialState()), MimeType.PLAIN_TEXT);
    props.setProperty('CODING_DB_FILE', file.getId());
  }
  var key = props.getProperty('CODING_TEACHER_KEY');
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    props.setProperty('CODING_TEACHER_KEY', key);
  }
  console.log('Chiave docente (conservala solo sui tuoi dispositivi): ' + key);
  console.log('Archivio pronto. Pubblica come Web app: esegui come te, accesso Chiunque.');
}
function doGet() { return codingJson_({app: 'CODING LAB', version: 1, online: true}); }
function codingJson_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || e.postData.contents.length > 10 * 1024 * 1024) throw new Error('Richiesta non valida o troppo grande.');
    var body = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var fileId = props.getProperty('CODING_DB_FILE');
    var secret = props.getProperty('CODING_TEACHER_KEY');
    if (!fileId || !secret) throw new Error('Esegui inizializzaCodingLab dall’editor Apps Script.');
    var teacher = typeof body.teacherKey === 'string' && body.teacherKey === secret;
    if (body.teacherKey && !teacher) throw new Error('Chiave docente non corretta.');
    var readers = ['get','progress','prefs','feedback'];
    if (!teacher && readers.indexOf(body.action) < 0) throw new Error('Per questa operazione serve la chiave docente.');
    var profile = typeof body.profile === 'string' ? body.profile.slice(0,1100) : 'docente';
    if (!teacher && ['progress','prefs'].indexOf(body.action) >= 0 && profile.indexOf('alunno|') !== 0) throw new Error('Scegli un codice alunno per salvare il percorso.');
    lock.waitLock(25000);
    var file = DriveApp.getFileById(fileId);
    var state = JSON.parse(file.getBlob().getDataAsString('UTF-8'));
    var result;
    if (body.action === 'get') {
      result = CodingLabEngine.readState(state, profile);
      result.isTeacher = teacher;
      if (!teacher) {
        result.projects = result.projects.filter(function(p) { return !p.archived; }).map(function(p) { p.teacherNotes = ''; p.solution = ''; return p; });
        result.feedback = [];
        result.progressRows = [];
        if (profile.indexOf('alunno|') !== 0) { result.progress = []; result.prefs = {favorites: []}; }
        var className = '';
        try { className = decodeURIComponent(profile.split('|')[1] || '').toUpperCase(); } catch (_) {}
        result.assignments = result.assignments.filter(function(a) { return className && a.className.toUpperCase() === className; });
      }
    } else if (body.action === 'history') {
      result = CodingLabEngine.readHistory(state, body.id);
    } else if (body.action === 'export') {
      result = CodingLabEngine.backupState(state);
    } else if (body.action === 'import') {
      var replacement = CodingLabEngine.importState(body.backup);
      var previousId = props.getProperty('CODING_PREVIOUS_FILE');
      if (previousId) DriveApp.getFileById(previousId).setContent(JSON.stringify(state));
      else props.setProperty('CODING_PREVIOUS_FILE', DriveApp.createFile('CODING_LAB_PRIMA_IMPORT.json', JSON.stringify(state), MimeType.PLAIN_TEXT).getId());
      file.setContent(JSON.stringify(replacement));
      result = {ok:true};
    } else if (body.action === 'undoImport') {
      var previousId = props.getProperty('CODING_PREVIOUS_FILE');
      if (!previousId) throw new Error('Non c’è un’importazione da annullare.');
      var previousFile = DriveApp.getFileById(previousId);
      var previous = CodingLabEngine.importState({app:'CODING LAB',version:2,state:JSON.parse(previousFile.getBlob().getDataAsString('UTF-8'))});
      previousFile.setContent(JSON.stringify(state));
      file.setContent(JSON.stringify(previous));
      result = {ok:true};
    } else {
      result = CodingLabEngine.mutateState(state, body, new Date().toISOString(), function(){ return Utilities.getUuid(); });
      file.setContent(JSON.stringify(state));
    }
    return codingJson_(result);
  } catch (error) {
    return codingJson_({error: error && error.message ? error.message : 'Operazione cloud non riuscita.'});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
