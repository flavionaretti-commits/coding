export type Step={id:string;title:string;body:string;check:string;hint:string};
export type Project={id:string;code:string;title:string;category:string;level:number;timeMin:number;timeMax:number;mission:string;concepts:string[];classes:string[];objectives:string[];prerequisites:string[];materials:string[];steps:Step[];personalization:string[];extensions:string[];errors:string[];criteria:string[];teacherNotes:string;solution:string;status:string;source:string;originalId?:string;version:number;updatedAt:string;archived?:boolean};
export type Assignment={id:string;title:string;projectIds:string[];className:string;due:string;notes:string;createdAt:string};
export type Progress={checks:string[];reflection:string;projectId:string;updatedAt?:string};
export type Feedback={id:string;projectId:string;alias:string;className:string;kind:string;message:string;rating:number;resolved:boolean;createdAt:string};
export type Revision={id:string;projectId:string;version:number;note:string;createdAt:string;snapshot:Project};
export type Prefs={favorites:string[]};
