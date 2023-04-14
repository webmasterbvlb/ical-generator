"use strict";var G=Object.create;var v=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var q=Object.getPrototypeOf,X=Object.prototype.hasOwnProperty;var Z=(n,t)=>{for(var e in t)v(n,e,{get:t[e],enumerable:!0})},Y=(n,t,e,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of W(t))!X.call(n,i)&&i!==e&&v(n,i,{get:()=>t[i],enumerable:!(a=H(t,i))||a.enumerable});return n};var Q=(n,t,e)=>(e=n!=null?G(q(n)):{},Y(t||!n||!n.__esModule?v(e,"default",{value:n,enumerable:!0}):e,n)),K=n=>Y(v({},"__esModule",{value:!0}),n);var nt={};Z(nt,{ICalAlarm:()=>C,ICalAlarmType:()=>z,ICalAttendee:()=>u,ICalAttendeeRole:()=>V,ICalAttendeeStatus:()=>w,ICalAttendeeType:()=>L,ICalCalendar:()=>D,ICalCalendarMethod:()=>k,ICalCategory:()=>I,ICalEvent:()=>p,ICalEventBusyStatus:()=>P,ICalEventClass:()=>F,ICalEventRepeatingFreq:()=>R,ICalEventStatus:()=>U,ICalEventTransparency:()=>B,ICalWeekday:()=>A,default:()=>et,escape:()=>l,foldLines:()=>x,formatDate:()=>d,formatDateTZ:()=>E});module.exports=K(nt);function d(n,t,e,a){if(n!=null&&n.startsWith("/")&&(n=n.substr(1)),typeof t=="string"||t instanceof Date){let i=new Date(t),s=i.getUTCFullYear()+String(i.getUTCMonth()+1).padStart(2,"0")+i.getUTCDate().toString().padStart(2,"0");return n&&(s=i.getFullYear()+String(i.getMonth()+1).padStart(2,"0")+i.getDate().toString().padStart(2,"0")),e?s:n?(s+="T"+i.getHours().toString().padStart(2,"0")+i.getMinutes().toString().padStart(2,"0")+i.getSeconds().toString().padStart(2,"0"),s):(s+="T"+i.getUTCHours().toString().padStart(2,"0")+i.getUTCMinutes().toString().padStart(2,"0")+i.getUTCSeconds().toString().padStart(2,"0")+(a?"":"Z"),s)}else if(N(t)){let i=n?$(t)&&!t.tz()?t.clone().tz(n):t:a?t:t.utc();return i.format("YYYYMMDD")+(e?"":"T"+i.format("HHmmss")+(a||n?"":"Z"))}else if(O(t)){let i=n?t.setZone(n):a?t:t.setZone("utc");return i.toFormat("yyyyLLdd")+(e?"":"T"+i.toFormat("HHmmss")+(a||n?"":"Z"))}else{let i=t;if(n)i=typeof t.tz=="function"?t.tz(n):t;else if(!a)if(typeof t.utc=="function")i=t.utc();else throw new Error("Unable to convert dayjs object to UTC value: UTC plugin is not available!");return i.format("YYYYMMDD")+(e?"":"T"+i.format("HHmmss")+(a||n?"":"Z"))}}function E(n,t,e,a){let i="",s=(a==null?void 0:a.floating)||!1;return a!=null&&a.timezone&&(i=";TZID="+a.timezone,s=!0),t+i+":"+d(n,e,!1,s)}function l(n,t){return String(n).replace(t?/[\\"]/g:/[\\;,]/g,function(e){return"\\"+e}).replace(/(?:\r\n|\r|\n)/g,"\\n")}function x(n){return n.split(`\r
`).map(function(t){let e="",a=0;for(let i=0;i<t.length;i++){let s=t.charAt(i);s>="\uD800"&&s<="\uDBFF"&&(s+=t.charAt(++i));let c=new TextEncoder().encode(s).length;a+=c,a>74&&(e+=`\r
 `,a=c),e+=s}return e}).join(`\r
`)}function o(n,t,e){if(Array.isArray(t))n.x=t.map(a=>{if(Array.isArray(a))return a;if(typeof a.key!="string"||typeof a.value!="string")throw new Error("Either key or value is not a string!");if(a.key.substr(0,2)!=="X-")throw new Error("Key has to start with `X-`!");return[a.key,a.value]});else if(typeof t=="object")n.x=Object.entries(t).map(([a,i])=>{if(typeof a!="string"||typeof i!="string")throw new Error("Either key or value is not a string!");if(a.substr(0,2)!=="X-")throw new Error("Key has to start with `X-`!");return[a,i]});else if(typeof t=="string"&&typeof e=="string"){if(t.substr(0,2)!=="X-")throw new Error("Key has to start with `X-`!");n.x.push([t,e])}else return n.x.map(a=>({key:a[0],value:a[1]}))}function T(n){let t=n.x.map(([e,a])=>e.toUpperCase()+":"+l(a,!1)).join(`\r
`);return t.length?t+`\r
`:""}function b(n,t){let e=null;if(typeof t=="string"){let a=t.match(/^(.+) ?<([^>]+)>$/);a?e={name:a[1].trim(),email:a[2].trim()}:t.includes("@")&&(e={name:t.trim(),email:t.trim()})}else typeof t=="object"&&(e={name:t.name,email:t.email,mailto:t.mailto,sentBy:t.sentBy});if(!e&&typeof t=="string")throw new Error("`"+n+"` isn't formated correctly. See https://sebbo2002.github.io/ical-generator/develop/reference/interfaces/ICalOrganizer.html");if(!e)throw new Error("`"+n+"` needs to be a valid formed string or an object. See https://sebbo2002.github.io/ical-generator/develop/reference/interfaces/ICalOrganizer.html");if(!e.name)throw new Error("`"+n+".name` is empty!");return e}function h(n,t){let e=Object.values(n),a=String(t).toUpperCase();if(!a||!e.includes(a))throw new Error(`Input must be one of the following: ${e.join(", ")}`);return a}function f(n,t){if(n instanceof Date&&isNaN(n.getTime())||typeof n=="string"&&isNaN(new Date(n).getTime()))throw new Error(`\`${t}\` has to be a valid date!`);if(n instanceof Date||typeof n=="string"||O(n)&&n.isValid===!0||(N(n)||_(n))&&n.isValid())return n;throw new Error(`\`${t}\` has to be a valid date!`)}function S(n){return typeof n=="string"||n instanceof Date?new Date(n):O(n)?n.toJSDate():n.toDate()}function N(n){return n!=null&&n._isAMomentObject!=null}function $(n){return N(n)&&"tz"in n&&typeof n.tz=="function"}function _(n){return typeof n=="object"&&n!==null&&!(n instanceof Date)&&!N(n)&&!O(n)}function O(n){return typeof n=="object"&&n!==null&&"toJSDate"in n&&typeof n.toJSDate=="function"}function j(n){return n!==null&&typeof n=="object"&&typeof n.asSeconds=="function"}function M(n){return n!==null&&typeof n=="object"&&typeof n.between=="function"&&typeof n.toString=="function"}function m(n){return n?typeof n=="string"?n:n.toJSON():null}function y(n){let t="";return n<0&&(t="-",n*=-1),t+="P",n>=86400&&(t+=Math.floor(n/86400)+"D",n%=86400),!n&&t.length>1||(t+="T",n>=3600&&(t+=Math.floor(n/3600)+"H",n%=3600),n>=60&&(t+=Math.floor(n/60)+"M",n%=60),n>0?t+=n+"S":t.length<=2&&(t+="0S")),t}var J=Q(require("uuid-random"),1);var V=(i=>(i.CHAIR="CHAIR",i.REQ="REQ-PARTICIPANT",i.OPT="OPT-PARTICIPANT",i.NON="NON-PARTICIPANT",i))(V||{}),w=(s=>(s.ACCEPTED="ACCEPTED",s.TENTATIVE="TENTATIVE",s.DECLINED="DECLINED",s.DELEGATED="DELEGATED",s.NEEDSACTION="NEEDS-ACTION",s))(w||{}),L=(s=>(s.INDIVIDUAL="INDIVIDUAL",s.GROUP="GROUP",s.RESOURCE="RESOURCE",s.ROOM="ROOM",s.UNKNOWN="UNKNOWN",s))(L||{}),u=class{constructor(t,e){if(this.data={name:null,email:null,mailto:null,sentBy:null,status:null,role:"REQ-PARTICIPANT",rsvp:null,type:null,delegatedTo:null,delegatedFrom:null,x:[]},this.event=e,!this.event)throw new Error("`event` option required!");t.name!==void 0&&this.name(t.name),t.email!==void 0&&this.email(t.email),t.mailto!==void 0&&this.mailto(t.mailto),t.sentBy!==void 0&&this.sentBy(t.sentBy),t.status!==void 0&&this.status(t.status),t.role!==void 0&&this.role(t.role),t.rsvp!==void 0&&this.rsvp(t.rsvp),t.type!==void 0&&this.type(t.type),t.delegatedTo!==void 0&&this.delegatedTo(t.delegatedTo),t.delegatedFrom!==void 0&&this.delegatedFrom(t.delegatedFrom),t.delegatesTo&&this.delegatesTo(t.delegatesTo),t.delegatesFrom&&this.delegatesFrom(t.delegatesFrom),t.x!==void 0&&this.x(t.x)}name(t){return t===void 0?this.data.name:(this.data.name=t||null,this)}email(t){return t?(this.data.email=t,this):this.data.email}mailto(t){return t===void 0?this.data.mailto:(this.data.mailto=t||null,this)}sentBy(t){return t?(this.data.sentBy=t,this):this.data.sentBy}role(t){return t===void 0?this.data.role:(this.data.role=h(V,t),this)}rsvp(t){return t===void 0?this.data.rsvp:t===null?(this.data.rsvp=null,this):(this.data.rsvp=!!t,this)}status(t){return t===void 0?this.data.status:t?(this.data.status=h(w,t),this):(this.data.status=null,this)}type(t){return t===void 0?this.data.type:t?(this.data.type=h(L,t),this):(this.data.type=null,this)}delegatedTo(t){return t===void 0?this.data.delegatedTo:t?(typeof t=="string"?this.data.delegatedTo=new u(b("delegatedTo",t),this.event):t instanceof u?this.data.delegatedTo=t:this.data.delegatedTo=new u(t,this.event),this.data.status="DELEGATED",this):(this.data.delegatedTo=null,this.data.status==="DELEGATED"&&(this.data.status=null),this)}delegatedFrom(t){return t===void 0?this.data.delegatedFrom:(t?typeof t=="string"?this.data.delegatedFrom=new u(b("delegatedFrom",t),this.event):t instanceof u?this.data.delegatedFrom=t:this.data.delegatedFrom=new u(t,this.event):this.data.delegatedFrom=null,this)}delegatesTo(t){let e=t instanceof u?t:this.event.createAttendee(t);return this.delegatedTo(e),e.delegatedFrom(this),e}delegatesFrom(t){let e=t instanceof u?t:this.event.createAttendee(t);return this.delegatedFrom(e),e.delegatedTo(this),e}x(t,e){if(t===void 0)return o(this.data);if(typeof t=="string"&&typeof e=="string")o(this.data,t,e);else if(typeof t=="object")o(this.data,t);else throw new Error("Either key or value is not a string!");return this}toJSON(){var t,e;return Object.assign({},this.data,{delegatedTo:((t=this.data.delegatedTo)==null?void 0:t.email())||null,delegatedFrom:((e=this.data.delegatedFrom)==null?void 0:e.email())||null,x:this.x()})}toString(){let t="ATTENDEE";if(!this.data.email)throw new Error("No value for `email` in ICalAttendee given!");return t+=";ROLE="+this.data.role,this.data.type&&(t+=";CUTYPE="+this.data.type),this.data.status&&(t+=";PARTSTAT="+this.data.status),this.data.rsvp!==null&&(t+=";RSVP="+this.data.rsvp.toString().toUpperCase()),this.data.sentBy!==null&&(t+=';SENT-BY="mailto:'+this.data.sentBy+'"'),this.data.delegatedTo&&(t+=';DELEGATED-TO="'+this.data.delegatedTo.email()+'"'),this.data.delegatedFrom&&(t+=';DELEGATED-FROM="'+this.data.delegatedFrom.email()+'"'),this.data.name&&(t+=';CN="'+l(this.data.name,!0)+'"'),this.data.email&&this.data.mailto&&(t+=";EMAIL="+l(this.data.email,!1)),this.data.x.length&&(t+=";"+this.data.x.map(([e,a])=>e.toUpperCase()+"="+l(a,!1)).join(";")),t+=":MAILTO:"+l(this.data.mailto||this.data.email,!1)+`\r
`,t}};var z=(e=>(e.display="display",e.audio="audio",e))(z||{}),C=class{constructor(t,e){if(this.data={type:null,trigger:null,repeat:null,interval:null,attach:null,description:null,x:[]},this.event=e,!e)throw new Error("`event` option required!");t.type!==void 0&&this.type(t.type),t.trigger!==void 0&&this.trigger(t.trigger),t.triggerBefore!==void 0&&this.triggerBefore(t.triggerBefore),t.triggerAfter!==void 0&&this.triggerAfter(t.triggerAfter),t.repeat!==void 0&&this.repeat(t.repeat),t.interval!==void 0&&this.interval(t.interval),t.attach!==void 0&&this.attach(t.attach),t.description!==void 0&&this.description(t.description),t.x!==void 0&&this.x(t.x)}type(t){if(t===void 0)return this.data.type;if(!t)return this.data.type=null,this;if(!Object.keys(z).includes(t))throw new Error("`type` is not correct, must be either `display` or `audio`!");return this.data.type=t,this}trigger(t){if(t===void 0&&typeof this.data.trigger=="number")return-1*this.data.trigger;if(t===void 0&&this.data.trigger)return this.data.trigger;if(t===void 0)return null;if(!t)this.data.trigger=null;else if(typeof t=="number"&&isFinite(t))this.data.trigger=-1*t;else{if(typeof t=="number")throw new Error("`trigger` is not correct, must be a finite number or a supported date!");this.data.trigger=f(t,"trigger")}return this}triggerAfter(t){return t===void 0?this.data.trigger:this.trigger(typeof t=="number"?-1*t:t)}triggerBefore(t){return t===void 0?this.trigger():this.trigger(t)}repeat(t){if(t===void 0)return this.data.repeat;if(!t)return this.data.repeat=null,this;if(typeof t!="number"||!isFinite(t))throw new Error("`repeat` is not correct, must be numeric!");return this.data.repeat=t,this}interval(t){if(t===void 0)return this.data.interval||null;if(!t)return this.data.interval=null,this;if(typeof t!="number"||!isFinite(t))throw new Error("`interval` is not correct, must be numeric!");return this.data.interval=t,this}attach(t){if(t===void 0)return this.data.attach;if(!t)return this.data.attach=null,this;let e=null;if(typeof t=="string")e={uri:t,mime:null};else if(typeof t=="object")e={uri:t.uri,mime:t.mime||null};else throw new Error("`attachment` needs to be a valid formed string or an object. See https://sebbo2002.github.io/ical-generator/develop/reference/classes/ICalAlarm.html#attach");if(!e.uri)throw new Error("`attach.uri` is empty!");return this.data.attach={uri:e.uri,mime:e.mime},this}description(t){return t===void 0?this.data.description:t?(this.data.description=t,this):(this.data.description=null,this)}x(t,e){if(t===void 0)return o(this.data);if(typeof t=="string"&&typeof e=="string")o(this.data,t,e);else if(typeof t=="object")o(this.data,t);else throw new Error("Either key or value is not a string!");return this}toJSON(){let t=this.trigger();return Object.assign({},this.data,{trigger:typeof t=="number"?t:m(t),x:this.x()})}toString(){let t=`BEGIN:VALARM\r
`;if(!this.data.type)throw new Error("No value for `type` in ICalAlarm given!");if(!this.data.trigger)throw new Error("No value for `trigger` in ICalAlarm given!");if(t+="ACTION:"+this.data.type.toUpperCase()+`\r
`,typeof this.data.trigger=="number"&&this.data.trigger>0?t+="TRIGGER;RELATED=END:"+y(this.data.trigger)+`\r
`:typeof this.data.trigger=="number"?t+="TRIGGER:"+y(this.data.trigger)+`\r
`:t+="TRIGGER;VALUE=DATE-TIME:"+d(this.event.timezone(),this.data.trigger)+`\r
`,this.data.repeat&&!this.data.interval)throw new Error("No value for `interval` in ICalAlarm given, but required for `repeat`!");if(this.data.repeat&&(t+="REPEAT:"+this.data.repeat+`\r
`),this.data.interval&&!this.data.repeat)throw new Error("No value for `repeat` in ICalAlarm given, but required for `interval`!");return this.data.interval&&(t+="DURATION:"+y(this.data.interval)+`\r
`),this.data.type==="audio"&&this.data.attach&&this.data.attach.mime?t+="ATTACH;FMTTYPE="+l(this.data.attach.mime,!1)+":"+l(this.data.attach.uri,!1)+`\r
`:this.data.type==="audio"&&this.data.attach?t+="ATTACH;VALUE=URI:"+l(this.data.attach.uri,!1)+`\r
`:this.data.type==="audio"&&(t+=`ATTACH;VALUE=URI:Basso\r
`),this.data.type==="display"&&this.data.description?t+="DESCRIPTION:"+l(this.data.description,!1)+`\r
`:this.data.type==="display"&&(t+="DESCRIPTION:"+l(this.event.summary(),!1)+`\r
`),t+=T(this.data),t+=`END:VALARM\r
`,t}};var I=class{constructor(t){this.data={name:null},t.name!==void 0&&this.name(t.name)}name(t){return t===void 0?this.data.name:(this.data.name=t||null,this)}toJSON(){return Object.assign({},this.data)}toString(){if(!this.data.name)throw new Error("No value for `name` in ICalCategory given!");return l(this.data.name,!1)}};var R=(r=>(r.SECONDLY="SECONDLY",r.MINUTELY="MINUTELY",r.HOURLY="HOURLY",r.DAILY="DAILY",r.WEEKLY="WEEKLY",r.MONTHLY="MONTHLY",r.YEARLY="YEARLY",r))(R||{}),A=(r=>(r.SU="SU",r.MO="MO",r.TU="TU",r.WE="WE",r.TH="TH",r.FR="FR",r.SA="SA",r))(A||{});var U=(a=>(a.CONFIRMED="CONFIRMED",a.TENTATIVE="TENTATIVE",a.CANCELLED="CANCELLED",a))(U||{}),P=(i=>(i.FREE="FREE",i.TENTATIVE="TENTATIVE",i.BUSY="BUSY",i.OOF="OOF",i))(P||{}),B=(e=>(e.TRANSPARENT="TRANSPARENT",e.OPAQUE="OPAQUE",e))(B||{}),F=(a=>(a.PUBLIC="PUBLIC",a.PRIVATE="PRIVATE",a.CONFIDENTIAL="CONFIDENTIAL",a))(F||{}),p=class{constructor(t,e){if(this.data={id:(0,J.default)(),sequence:0,start:null,end:null,recurrenceId:null,timezone:null,stamp:new Date,allDay:!1,floating:!1,repeating:null,summary:"",location:null,description:null,organizer:null,attendees:[],alarms:[],categories:[],status:null,busystatus:null,priority:null,url:null,attachments:[],transparency:null,created:null,lastModified:null,class:null,x:[]},this.calendar=e,!e)throw new Error("`calendar` option required!");t.id&&this.id(t.id),t.sequence!==void 0&&this.sequence(t.sequence),t.start&&this.start(t.start),t.end!==void 0&&this.end(t.end),t.recurrenceId!==void 0&&this.recurrenceId(t.recurrenceId),t.timezone!==void 0&&this.timezone(t.timezone),t.stamp!==void 0&&this.stamp(t.stamp),t.allDay!==void 0&&this.allDay(t.allDay),t.floating!==void 0&&this.floating(t.floating),t.repeating!==void 0&&this.repeating(t.repeating),t.summary!==void 0&&this.summary(t.summary),t.location!==void 0&&this.location(t.location),t.description!==void 0&&this.description(t.description),t.organizer!==void 0&&this.organizer(t.organizer),t.attendees!==void 0&&this.attendees(t.attendees),t.alarms!==void 0&&this.alarms(t.alarms),t.categories!==void 0&&this.categories(t.categories),t.status!==void 0&&this.status(t.status),t.busystatus!==void 0&&this.busystatus(t.busystatus),t.priority!==void 0&&this.priority(t.priority),t.url!==void 0&&this.url(t.url),t.attachments!==void 0&&this.attachments(t.attachments),t.transparency!==void 0&&this.transparency(t.transparency),t.created!==void 0&&this.created(t.created),t.lastModified!==void 0&&this.lastModified(t.lastModified),t.class!==void 0&&this.class(t.class),t.x!==void 0&&this.x(t.x)}id(t){return t===void 0?this.data.id:(this.data.id=String(t),this)}uid(t){return t===void 0?this.id():this.id(t)}sequence(t){if(t===void 0)return this.data.sequence;let e=parseInt(String(t),10);if(isNaN(e))throw new Error("`sequence` must be a number!");return this.data.sequence=t,this}start(t){if(t===void 0)return this.data.start;if(this.data.start=f(t,"start"),this.data.start&&this.data.end&&S(this.data.start).getTime()>S(this.data.end).getTime()){let e=this.data.start;this.data.start=this.data.end,this.data.end=e}return this}end(t){if(t===void 0)return this.data.end;if(t===null)return this.data.end=null,this;if(this.data.end=f(t,"end"),this.data.start&&this.data.end&&S(this.data.start).getTime()>S(this.data.end).getTime()){let e=this.data.start;this.data.start=this.data.end,this.data.end=e}return this}recurrenceId(t){return t===void 0?this.data.recurrenceId:t===null?(this.data.recurrenceId=null,this):(this.data.recurrenceId=f(t,"recurrenceId"),this)}timezone(t){return t===void 0&&this.data.timezone!==null?this.data.timezone:t===void 0?this.calendar.timezone():(this.data.timezone=t&&t!=="UTC"?t.toString():null,this.data.timezone&&(this.data.floating=!1),this)}stamp(t){return t===void 0?this.data.stamp:(this.data.stamp=f(t,"stamp"),this)}timestamp(t){return t===void 0?this.stamp():this.stamp(t)}allDay(t){return t===void 0?this.data.allDay:(this.data.allDay=!!t,this)}floating(t){return t===void 0?this.data.floating:(this.data.floating=!!t,this.data.floating&&(this.data.timezone=null),this)}repeating(t){if(t===void 0)return this.data.repeating;if(!t)return this.data.repeating=null,this;if(M(t)||typeof t=="string")return this.data.repeating=t,this;if(this.data.repeating={freq:h(R,t.freq)},t.count){if(!isFinite(t.count))throw new Error("`repeating.count` must be a finite number!");this.data.repeating.count=t.count}if(t.interval){if(!isFinite(t.interval))throw new Error("`repeating.interval` must be a finite number!");this.data.repeating.interval=t.interval}if(t.until!==void 0&&(this.data.repeating.until=f(t.until,"repeating.until")),t.byDay){let e=Array.isArray(t.byDay)?t.byDay:[t.byDay];this.data.repeating.byDay=e.map(a=>h(A,a))}if(t.byMonth){let e=Array.isArray(t.byMonth)?t.byMonth:[t.byMonth];this.data.repeating.byMonth=e.map(a=>{if(typeof a!="number"||a<1||a>12)throw new Error("`repeating.byMonth` contains invalid value `"+a+"`!");return a})}if(t.byMonthDay){let e=Array.isArray(t.byMonthDay)?t.byMonthDay:[t.byMonthDay];this.data.repeating.byMonthDay=e.map(a=>{if(typeof a!="number"||a<-31||a>31||a===0)throw new Error("`repeating.byMonthDay` contains invalid value `"+a+"`!");return a})}if(t.bySetPos){if(!this.data.repeating.byDay)throw"`repeating.bySetPos` must be used along with `repeating.byDay`!";let e=Array.isArray(t.bySetPos)?t.bySetPos:[t.bySetPos];this.data.repeating.bySetPos=e.map(a=>{if(typeof a!="number"||a<-366||a>366||a===0)throw"`repeating.bySetPos` contains invalid value `"+a+"`!";return a})}if(t.exclude){let e=Array.isArray(t.exclude)?t.exclude:[t.exclude];this.data.repeating.exclude=e.map((a,i)=>f(a,`repeating.exclude[${i}]`))}return t.startOfWeek&&(this.data.repeating.startOfWeek=h(A,t.startOfWeek)),this}summary(t){return t===void 0?this.data.summary:(this.data.summary=t?String(t):"",this)}location(t){if(t===void 0)return this.data.location;if(typeof t=="string")return this.data.location={title:t},this;if(t&&!t.title||t!=null&&t.geo&&(!isFinite(t.geo.lat)||!isFinite(t.geo.lon)))throw new Error("`location` isn't formatted correctly. See https://sebbo2002.github.io/ical-generator/develop/reference/classes/ICalEvent.html#location");return this.data.location=t||null,this}description(t){return t===void 0?this.data.description:t===null?(this.data.description=null,this):(typeof t=="string"?this.data.description={plain:t}:this.data.description=t,this)}organizer(t){return t===void 0?this.data.organizer:t===null?(this.data.organizer=null,this):(this.data.organizer=b("organizer",t),this)}createAttendee(t={}){if(t instanceof u)return this.data.attendees.push(t),t;typeof t=="string"&&(t=b("data",t));let e=new u(t,this);return this.data.attendees.push(e),e}attendees(t){return t?(t.forEach(e=>this.createAttendee(e)),this):this.data.attendees}createAlarm(t={}){let e=t instanceof C?t:new C(t,this);return this.data.alarms.push(e),e}alarms(t){return t?(t.forEach(e=>this.createAlarm(e)),this):this.data.alarms}createCategory(t={}){let e=t instanceof I?t:new I(t);return this.data.categories.push(e),e}categories(t){return t?(t.forEach(e=>this.createCategory(e)),this):this.data.categories}status(t){return t===void 0?this.data.status:t===null?(this.data.status=null,this):(this.data.status=h(U,t),this)}busystatus(t){return t===void 0?this.data.busystatus:t===null?(this.data.busystatus=null,this):(this.data.busystatus=h(P,t),this)}priority(t){if(t===void 0)return this.data.priority;if(t===null)return this.data.priority=null,this;if(t<0||t>9)throw new Error("`priority` is invalid, musst be 0 \u2264 priority \u2264 9.");return this.data.priority=Math.round(t),this}url(t){return t===void 0?this.data.url:(this.data.url=t?String(t):null,this)}createAttachment(t){return this.data.attachments.push(t),this}attachments(t){return t?(t.forEach(e=>this.createAttachment(e)),this):this.data.attachments}transparency(t){return t===void 0?this.data.transparency:t?(this.data.transparency=h(B,t),this):(this.data.transparency=null,this)}created(t){return t===void 0?this.data.created:t===null?(this.data.created=null,this):(this.data.created=f(t,"created"),this)}lastModified(t){return t===void 0?this.data.lastModified:t===null?(this.data.lastModified=null,this):(this.data.lastModified=f(t,"lastModified"),this)}class(t){return t===void 0?this.data.class:t===null?(this.data.class=null,this):(this.data.class=h(F,t),this)}x(t,e){return t===void 0?o(this.data):(typeof t=="string"&&typeof e=="string"&&o(this.data,t,e),typeof t=="object"&&o(this.data,t),this)}toJSON(){var e;let t=null;return M(this.data.repeating)||typeof this.data.repeating=="string"?t=this.data.repeating.toString():this.data.repeating&&(t=Object.assign({},this.data.repeating,{until:m(this.data.repeating.until)||void 0,exclude:(e=this.data.repeating.exclude)==null?void 0:e.map(a=>m(a))})),Object.assign({},this.data,{start:m(this.data.start)||null,end:m(this.data.end)||null,recurrenceId:m(this.data.recurrenceId)||null,stamp:m(this.data.stamp)||null,created:m(this.data.created)||null,lastModified:m(this.data.lastModified)||null,repeating:t,x:this.x()})}toString(){var e,a,i,s,c;let t="";if(!this.data.start)throw new Error("No value for `start` in ICalEvent #"+this.data.id+" given!");if(t+=`BEGIN:VEVENT\r
`,t+="UID:"+this.data.id+`\r
`,t+="SEQUENCE:"+this.data.sequence+`\r
`,t+="DTSTAMP:"+d(this.calendar.timezone(),this.data.stamp)+`\r
`,this.data.allDay?(t+="DTSTART;VALUE=DATE:"+d(this.calendar.timezone(),this.data.start,!0)+`\r
`,this.data.end&&(t+="DTEND;VALUE=DATE:"+d(this.calendar.timezone(),this.data.end,!0)+`\r
`),t+=`X-MICROSOFT-CDO-ALLDAYEVENT:TRUE\r
`,t+=`X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT:TRUE\r
`):(t+=E(this.timezone(),"DTSTART",this.data.start,this.data)+`\r
`,this.data.end&&(t+=E(this.timezone(),"DTEND",this.data.end,this.data)+`\r
`)),M(this.data.repeating)||typeof this.data.repeating=="string"){let r=this.data.repeating.toString().replace(/\r\n/g,`
`).split(`
`).filter(g=>g&&!g.startsWith("DTSTART:")).join(`\r
`);!r.includes(`\r
`)&&!r.startsWith("RRULE:")&&(r="RRULE:"+r),t+=r.trim()+`\r
`}else this.data.repeating&&(t+="RRULE:FREQ="+this.data.repeating.freq,this.data.repeating.count&&(t+=";COUNT="+this.data.repeating.count),this.data.repeating.interval&&(t+=";INTERVAL="+this.data.repeating.interval),this.data.repeating.until&&(t+=";UNTIL="+d(this.calendar.timezone(),this.data.repeating.until,!1,this.floating())),this.data.repeating.byDay&&(t+=";BYDAY="+this.data.repeating.byDay.join(",")),this.data.repeating.byMonth&&(t+=";BYMONTH="+this.data.repeating.byMonth.join(",")),this.data.repeating.byMonthDay&&(t+=";BYMONTHDAY="+this.data.repeating.byMonthDay.join(",")),this.data.repeating.bySetPos&&(t+=";BYSETPOS="+this.data.repeating.bySetPos.join(",")),this.data.repeating.startOfWeek&&(t+=";WKST="+this.data.repeating.startOfWeek),t+=`\r
`,this.data.repeating.exclude&&(this.data.allDay?t+="EXDATE;VALUE=DATE:"+this.data.repeating.exclude.map(r=>d(this.calendar.timezone(),r,!0)).join(",")+`\r
`:(t+="EXDATE",this.timezone()?t+=";TZID="+this.timezone()+":"+this.data.repeating.exclude.map(r=>d(this.timezone(),r,!1,!0)).join(",")+`\r
`:t+=":"+this.data.repeating.exclude.map(r=>d(this.timezone(),r,!1,this.floating())).join(",")+`\r
`)));return this.data.recurrenceId&&(t+=E(this.timezone(),"RECURRENCE-ID",this.data.recurrenceId,this.data)+`\r
`),t+="SUMMARY:"+l(this.data.summary,!1)+`\r
`,this.data.transparency&&(t+="TRANSP:"+l(this.data.transparency,!1)+`\r
`),(e=this.data.location)!=null&&e.title&&(t+="LOCATION:"+l(this.data.location.title+(this.data.location.address?`
`+this.data.location.address:""),!1)+`\r
`,this.data.location.radius&&this.data.location.geo&&(t+="X-APPLE-STRUCTURED-LOCATION;VALUE=URI;"+(this.data.location.address?"X-ADDRESS="+l(this.data.location.address,!1)+";":"")+"X-APPLE-RADIUS="+l(this.data.location.radius,!1)+";X-TITLE="+l(this.data.location.title,!1)+":geo:"+l((a=this.data.location.geo)==null?void 0:a.lat,!1)+","+l((i=this.data.location.geo)==null?void 0:i.lon,!1)+`\r
`),this.data.location.geo&&(t+="GEO:"+l((s=this.data.location.geo)==null?void 0:s.lat,!1)+";"+l((c=this.data.location.geo)==null?void 0:c.lon,!1)+`\r
`)),this.data.description&&(t+="DESCRIPTION:"+l(this.data.description.plain,!1)+`\r
`,this.data.description.html&&(t+="X-ALT-DESC;FMTTYPE=text/html:"+l(this.data.description.html,!1)+`\r
`)),this.data.organizer&&(t+='ORGANIZER;CN="'+l(this.data.organizer.name,!0)+'"',this.data.organizer.sentBy&&(t+=';SENT-BY="mailto:'+l(this.data.organizer.sentBy,!0)+'"'),this.data.organizer.email&&this.data.organizer.mailto&&(t+=";EMAIL="+l(this.data.organizer.email,!1)),this.data.organizer.email&&(t+=":mailto:"+l(this.data.organizer.mailto||this.data.organizer.email,!1)),t+=`\r
`),this.data.attendees.forEach(function(r){t+=r.toString()}),this.data.alarms.forEach(function(r){t+=r.toString()}),this.data.categories.length>0&&(t+="CATEGORIES:"+this.data.categories.map(function(r){return r.toString()}).join()+`\r
`),this.data.url&&(t+="URL;VALUE=URI:"+l(this.data.url,!1)+`\r
`),this.data.attachments.length>0&&this.data.attachments.forEach(r=>{t+="ATTACH:"+l(r,!1)+`\r
`}),this.data.status&&(t+="STATUS:"+this.data.status.toUpperCase()+`\r
`),this.data.busystatus&&(t+="X-MICROSOFT-CDO-BUSYSTATUS:"+this.data.busystatus.toUpperCase()+`\r
`),this.data.priority!==null&&(t+="PRIORITY:"+this.data.priority+`\r
`),t+=T(this.data),this.data.created&&(t+="CREATED:"+d(this.calendar.timezone(),this.data.created)+`\r
`),this.data.lastModified&&(t+="LAST-MODIFIED:"+d(this.calendar.timezone(),this.data.lastModified)+`\r
`),this.data.class&&(t+="CLASS:"+this.data.class.toUpperCase()+`\r
`),t+=`END:VEVENT\r
`,t}};var k=(g=>(g.PUBLISH="PUBLISH",g.REQUEST="REQUEST",g.REPLY="REPLY",g.ADD="ADD",g.CANCEL="CANCEL",g.REFRESH="REFRESH",g.COUNTER="COUNTER",g.DECLINECOUNTER="DECLINECOUNTER",g))(k||{}),D=class{constructor(t={}){this.data={prodId:"//sebbo.net//ical-generator//EN",method:null,name:null,description:null,timezone:null,source:null,url:null,scale:null,ttl:null,events:[],x:[]},t.prodId!==void 0&&this.prodId(t.prodId),t.method!==void 0&&this.method(t.method),t.name!==void 0&&this.name(t.name),t.description!==void 0&&this.description(t.description),t.timezone!==void 0&&this.timezone(t.timezone),t.source!==void 0&&this.source(t.source),t.url!==void 0&&this.url(t.url),t.scale!==void 0&&this.scale(t.scale),t.ttl!==void 0&&this.ttl(t.ttl),t.events!==void 0&&this.events(t.events),t.x!==void 0&&this.x(t.x)}prodId(t){if(!t)return this.data.prodId;if(typeof t=="string"&&/^\/\/(.+)\/\/(.+)\/\/([A-Z]{1,4})$/.test(t))return this.data.prodId=t,this;if(typeof t=="string")throw new Error("`prodId` isn't formated correctly. See https://sebbo2002.github.io/ical-generator/develop/reference/classes/ICalCalendar.html#prodId");if(typeof t!="object")throw new Error("`prodid` needs to be a valid formed string or an object!");if(!t.company)throw new Error("`prodid.company` is a mandatory item!");if(!t.product)throw new Error("`prodid.product` is a mandatory item!");let a=(t.language||"EN").toUpperCase();return this.data.prodId="//"+t.company+"//"+t.product+"//"+a,this}method(t){return t===void 0?this.data.method:t?(this.data.method=h(k,t),this):(this.data.method=null,this)}name(t){return t===void 0?this.data.name:(this.data.name=t?String(t):null,this)}description(t){return t===void 0?this.data.description:(this.data.description=t?String(t):null,this)}timezone(t){var e;return t===void 0?((e=this.data.timezone)==null?void 0:e.name)||null:(t==="UTC"?this.data.timezone=null:typeof t=="string"?this.data.timezone={name:t}:t===null?this.data.timezone=null:this.data.timezone=t,this)}source(t){return t===void 0?this.data.source:(this.data.source=t||null,this)}url(t){return t===void 0?this.data.url:(this.data.url=t||null,this)}scale(t){return t===void 0?this.data.scale:(t===null?this.data.scale=null:this.data.scale=t.toUpperCase(),this)}ttl(t){return t===void 0?this.data.ttl:(j(t)?this.data.ttl=t.asSeconds():t&&t>0?this.data.ttl=t:this.data.ttl=null,this)}createEvent(t){let e=t instanceof p?t:new p(t,this);return this.data.events.push(e),e}events(t){return t?(t.forEach(e=>this.createEvent(e)),this):this.data.events}clear(){return this.data.events=[],this}serve(t,e="calendar.ics"){return t.writeHead(200,{"Content-Type":"text/calendar; charset=utf-8","Content-Disposition":`attachment; filename="${e}"`}),t.end(this.toString()),this}toBlob(){return new Blob([this.toString()],{type:"text/calendar"})}toURL(){return URL.createObjectURL(this.toBlob())}x(t,e){if(t===void 0)return o(this.data);if(typeof t=="string"&&typeof e=="string")o(this.data,t,e);else if(typeof t=="object")o(this.data,t);else throw new Error("Either key or value is not a string!");return this}toJSON(){return Object.assign({},this.data,{timezone:this.timezone(),events:this.data.events.map(t=>t.toJSON()),x:this.x()})}length(){return this.data.events.length}toString(){var e,a;let t="";return t=`BEGIN:VCALENDAR\r
VERSION:2.0\r
`,t+="PRODID:-"+this.data.prodId+`\r
`,this.data.url&&(t+="URL:"+this.data.url+`\r
`),this.data.source&&(t+="SOURCE;VALUE=URI:"+this.data.source+`\r
`),this.data.scale&&(t+="CALSCALE:"+this.data.scale+`\r
`),this.data.method&&(t+="METHOD:"+this.data.method+`\r
`),this.data.name&&(t+="NAME:"+this.data.name+`\r
`,t+="X-WR-CALNAME:"+this.data.name+`\r
`),this.data.description&&(t+="X-WR-CALDESC:"+this.data.description+`\r
`),(e=this.data.timezone)!=null&&e.generator&&[...new Set([this.timezone(),...this.data.events.map(s=>s.timezone())])].filter(s=>s!==null&&!s.startsWith("/")).forEach(s=>{var r;if(!((r=this.data.timezone)!=null&&r.generator))return;let c=this.data.timezone.generator(s);c&&(t+=c.replace(/\r\n/g,`
`).replace(/\n/g,`\r
`).trim()+`\r
`)}),(a=this.data.timezone)!=null&&a.name&&(t+="TIMEZONE-ID:"+this.data.timezone.name+`\r
`,t+="X-WR-TIMEZONE:"+this.data.timezone.name+`\r
`),this.data.ttl&&(t+="REFRESH-INTERVAL;VALUE=DURATION:"+y(this.data.ttl)+`\r
`,t+="X-PUBLISHED-TTL:"+y(this.data.ttl)+`\r
`),this.data.events.forEach(i=>t+=i.toString()),t+=T(this.data),t+="END:VCALENDAR",x(t)}};function tt(n){return new D(n)}var et=tt;0&&(module.exports={ICalAlarm,ICalAlarmType,ICalAttendee,ICalAttendeeRole,ICalAttendeeStatus,ICalAttendeeType,ICalCalendar,ICalCalendarMethod,ICalCategory,ICalEvent,ICalEventBusyStatus,ICalEventClass,ICalEventRepeatingFreq,ICalEventStatus,ICalEventTransparency,ICalWeekday,escape,foldLines,formatDate,formatDateTZ});
//# sourceMappingURL=index.cjs.map