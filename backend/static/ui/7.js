(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"G+fI":function(e,r,t){"use strict";t.r(r),t.d(r,"ServerModule",function(){return J});var o=t("ofXK"),i=t("tyNb"),n=t("LRne"),s=t("w1tV"),a=t("eIep"),b=t("GSgJ"),c=t("gR9L"),l=t("fXoL"),d=t("3Pt+"),m=t("LCkw");function v(e,r){1&e&&l.Hb(0,"p",33)}const u=function(e,r){return{"form-valid":e,"form-invalid":r}};function f(e,r){if(1&e){const e=l.Mb();l.Lb(0,"div",1),l.Lb(1,"div",2),l.Lb(2,"form",3),l.Lb(3,"div",4),l.Hb(4,"div",5),l.Lb(5,"div",6),l.Lb(6,"div",4),l.Lb(7,"div",7),l.Lb(8,"div",8),l.Lb(9,"label",9),l.oc(10,"Server Name"),l.Kb(),l.Hb(11,"input",10),l.Kb(),l.Lb(12,"div",8),l.Lb(13,"label",11),l.oc(14,"DB Server Name"),l.Kb(),l.Hb(15,"input",12),l.Kb(),l.Lb(16,"div",8),l.Lb(17,"label",13),l.oc(18,"DB Name"),l.Kb(),l.Hb(19,"input",14),l.Kb(),l.Lb(20,"div",8),l.Lb(21,"label",15),l.oc(22,"Server IP"),l.Kb(),l.Hb(23,"input",16),l.Kb(),l.Lb(24,"div",8),l.Lb(25,"label",17),l.oc(26,"AE Script Path"),l.Kb(),l.Hb(27,"input",18),l.Kb(),l.Kb(),l.Lb(28,"div",7),l.Lb(29,"div",8),l.Lb(30,"label",19),l.oc(31,"AssistEdge Version"),l.Kb(),l.Hb(32,"input",20),l.Kb(),l.Lb(33,"div",8),l.Lb(34,"label",21),l.oc(35,"Listener URL"),l.Kb(),l.Hb(36,"input",22),l.Kb(),l.Lb(37,"div",8),l.Lb(38,"label",23),l.oc(39,"AE Site URL"),l.Kb(),l.Hb(40,"input",24),l.Kb(),l.Lb(41,"div",8),l.Lb(42,"label",25),l.oc(43,"Messaging URL"),l.Kb(),l.Hb(44,"input",26),l.Kb(),l.Lb(45,"div",8),l.Lb(46,"label",27),l.oc(47,"UserName"),l.Kb(),l.Hb(48,"input",28),l.Kb(),l.Lb(49,"div",8),l.Lb(50,"label",29),l.oc(51,"Password"),l.Kb(),l.Hb(52,"input",30),l.Kb(),l.Kb(),l.Kb(),l.Lb(53,"div",8),l.Lb(54,"button",31),l.Sb("click",function(){return l.jc(e),l.Wb().AddServer()}),l.oc(55," Add Server "),l.Kb(),l.Kb(),l.Kb(),l.Hb(56,"div",5),l.Kb(),l.Kb(),l.mc(57,v,1,0,"p",32),l.Xb(58,"async"),l.Kb(),l.Kb()}if(2&e){const e=l.Wb();l.wb(2),l.cc("formGroup",e.serverForm),l.wb(52),l.cc("disabled",e.serverForm.invalid)("ngClass",l.fc(6,u,!e.serverForm.invalid,e.serverForm.invalid)),l.wb(3),l.cc("ngIf",l.Yb(58,4,e.serverName$))}}let p=(()=>{class e{constructor(e,r,t){this._router=e,this._formBuilder=r,this._serverService=t}ngOnInit(){this.serverForm=new b.a.CreateServer(this._formBuilder).InItForm(),this.serverNameValueChange$=this.serverForm.controls.serverName.valueChanges,this.serverName$=this.serverNameValueChange$.pipe(Object(s.a)(),Object(a.a)(e=>(this.serverForm.patchValue({listenerUrl:`http://${e}:3031/listener/rpa/api/message`,aeSiteUrl:`http://${e}:3031/Admin`,messagingUrl:`http://${e}:3031/messaging`}),Object(n.a)(e))))}AddServer(){this.addServerSubs=this._serverService.AddServer(this.serverForm.value).subscribe(e=>{this._router.navigate([c.a.getRoutePathByName("server-view-all")])},e=>{console.log(e)})}ngOnDestroy(){console.log(this.addServerSubs),null!=this.addServerSubs&&this.addServerSubs.unsubscribe()}}return e.\u0275fac=function(r){return new(r||e)(l.Gb(i.f),l.Gb(d.d),l.Gb(m.a))},e.\u0275cmp=l.Ab({type:e,selectors:[["app-create-server"]],decls:3,vars:5,consts:[["class","create-server",4,"ngIf"],[1,"create-server"],[1,"form-wrapper"],[3,"formGroup"],[1,"row"],[1,"col-md-1"],[1,"col-md-10"],[1,"col-md-6"],[1,"form-group"],["for","serverName",1,"form-label","required"],["id","serverName","name","serverName","formControlName","serverName",1,"form-control","highlight"],["for","dbServerName",1,"form-label","required"],["id","dbServerName","name","dbServerName","formControlName","dbServerName",1,"form-control","highlight"],["for","dbName",1,"form-label","required"],["id","dbName","name","dbName","formControlName","dbName",1,"form-control","highlight"],["for","serverIp",1,"form-label","required"],["type","text","id","serverIp","formControlName","serverIp",1,"form-control","highlight"],["for","aeFilePath",1,"form-label","required"],["type","text","id","aeFilePath","formControlName","aeFilePath",1,"form-control","highlight"],["for","aeVersion",1,"form-label","required"],["id","aeVersion","name","aeVersion","formControlName","aeVersion",1,"form-control","highlight"],["for","listenerUrl",1,"form-label","required"],["type","text","id","listenerUrl","formControlName","listenerUrl",1,"form-control","highlight"],["for","aeSiteUrl",1,"form-label","required"],["type","text","id","aeSiteUrl","formControlName","aeSiteUrl",1,"form-control","highlight"],["for","messagingUrl",1,"form-label","required"],["type","text","id","messagingUrl","formControlName","messagingUrl",1,"form-control","highlight"],["for","userName",1,"form-label","required"],["id","userName","name","userName","formControlName","userName",1,"form-control","highlight"],["for","password",1,"form-label","required"],["type","password","id","password","name","password","formControlName","password",1,"form-control","highlight"],["type","submit",1,"btn","btn-primary",3,"disabled","ngClass","click"],["style","display: none",4,"ngIf"],[2,"display","none"]],template:function(e,r){1&e&&(l.mc(0,f,59,9,"div",0),l.Xb(1,"async"),l.Xb(2,"async")),2&e&&l.cc("ngIf",l.Yb(1,1,r.serverName$)||!l.Yb(2,3,r.serverName$))},directives:[o.n,d.s,d.j,d.f,d.b,d.i,d.e,o.l],pipes:[o.b],styles:[""]}),e})();var g=t("rRiM");function h(e,r){1&e&&(l.Lb(0,"th",2),l.oc(1,"Start"),l.Kb())}function S(e,r){1&e&&(l.Lb(0,"th",2),l.oc(1,"Stop"),l.Kb())}function L(e,r){1&e&&(l.Lb(0,"span"),l.oc(1," Running "),l.Kb())}function w(e,r){1&e&&(l.Lb(0,"span"),l.oc(1," Stopped "),l.Kb())}function K(e,r){1&e&&(l.Lb(0,"span",14),l.oc(1," Stopping "),l.Kb())}function N(e,r){1&e&&(l.Lb(0,"span",15),l.oc(1," Starting "),l.Kb())}function y(e,r){if(1&e&&(l.Jb(0),l.mc(1,K,2,0,"span",12),l.mc(2,N,2,0,"span",13),l.Ib()),2&e){const e=l.Wb();l.wb(1),l.cc("ngIf",e.server.status),l.wb(1),l.cc("ngIf",!e.server.status)}}function C(e,r){1&e&&l.Hb(0,"i",18)}function I(e,r){1&e&&l.Hb(0,"i",19)}function _(e,r){if(1&e&&(l.Jb(0),l.mc(1,C,1,0,"i",16),l.mc(2,I,1,0,"i",17),l.Ib()),2&e){const e=l.Wb();l.wb(1),l.cc("ngIf",!e.server.status),l.wb(1),l.cc("ngIf",e.server.status)}}let U=(()=>{class e{constructor(e,r){this._router=e,this._serverService=r,this.serverStatus="",this.deletedOrStatusChangedTrigger=new l.n}ngOnInit(){}ViewServer(e){this._serverService.selectedServer=e,this._router.navigate([c.a.getRoutePathByName("server-home"),e.serverName,"view"])}EditServer(e){this._serverService.selectedServer=e,this._router.navigate([c.a.getRoutePathByName("server-home"),e.serverName,"edit"])}DeleteServer(e){confirm(`Do you want to delete the Server with name ${e.serverName} ?\n\nThis will delete all the entities using this server i.e Triggers, Schedules, Executions, etc.`)&&(this.deleteServerSubs=this._serverService.DeleteServer(e.serverName).subscribe(e=>{this.deletedOrStatusChangedTrigger.emit(e)}))}StartServer(e){confirm(`Do you want to ${e.status?"stop":"start"} the Server with name ${e.serverName} ?`)&&(this.serverStatus="Changing for "+e.serverName,this.deleteServerSubs=this._serverService.StartServer(e.serverName).subscribe(e=>{this.serverStatus="Changed"},e=>{this.serverStatus=""},()=>{this.deletedOrStatusChangedTrigger.emit(e)}))}ngOnDestroy(){this.deleteServerSubs&&this.deleteServerSubs.unsubscribe()}}return e.\u0275fac=function(r){return new(r||e)(l.Gb(i.f),l.Gb(m.a))},e.\u0275cmp=l.Ab({type:e,selectors:[["app-server"]],inputs:{server:"server",serverNo:"serverNo"},outputs:{deletedOrStatusChangedTrigger:"deletedOrStatusChangedTrigger"},decls:53,vars:13,consts:[[1,"server"],[1,"table","table-hover"],["scope","col"],["scope","col",4,"ngIf"],["scope","row",3,"ngClass"],[4,"ngIf"],[3,"click"],["aria-hidden","true",1,"bi","bi-eye-fill","primary"],["aria-hidden","true",1,"bi","bi-pencil-square","secondary"],["aria-hidden","true",1,"bi","bi-archive-fill","danger"],["target","_blank","rel","noopener noreferrer",3,"href"],[1,"bi","bi-link-45deg"],["class","danger",4,"ngIf"],["class","success",4,"ngIf"],[1,"danger"],[1,"success"],["aria-hidden","true","class","bi bi-play-circle-fill success",4,"ngIf"],["aria-hidden","true","class","bi bi-stop-circle-fill danger",4,"ngIf"],["aria-hidden","true",1,"bi","bi-play-circle-fill","success"],["aria-hidden","true",1,"bi","bi-stop-circle-fill","danger"]],template:function(e,r){1&e&&(l.Lb(0,"div",0),l.Lb(1,"table",1),l.Lb(2,"thead"),l.Lb(3,"tr"),l.Lb(4,"th",2),l.oc(5,"#"),l.Kb(),l.Lb(6,"th",2),l.oc(7,"Name"),l.Kb(),l.Lb(8,"th",2),l.oc(9,"Status"),l.Kb(),l.Lb(10,"th",2),l.oc(11,"Version"),l.Kb(),l.Lb(12,"th",2),l.oc(13,"DBServer"),l.Kb(),l.Lb(14,"th",2),l.oc(15,"DB"),l.Kb(),l.Lb(16,"th",2),l.oc(17,"View"),l.Kb(),l.Lb(18,"th",2),l.oc(19,"Edit"),l.Kb(),l.mc(20,h,2,0,"th",3),l.mc(21,S,2,0,"th",3),l.Lb(22,"th",2),l.oc(23,"Delete"),l.Kb(),l.Lb(24,"th",2),l.oc(25,"AESite"),l.Kb(),l.Kb(),l.Kb(),l.Lb(26,"tbody"),l.Lb(27,"tr"),l.Lb(28,"th",4),l.oc(29),l.Kb(),l.Lb(30,"td"),l.oc(31),l.Kb(),l.Lb(32,"td"),l.mc(33,L,2,0,"span",5),l.mc(34,w,2,0,"span",5),l.Kb(),l.Lb(35,"td"),l.oc(36),l.Kb(),l.Lb(37,"td"),l.oc(38),l.Kb(),l.Lb(39,"td"),l.oc(40),l.Kb(),l.Lb(41,"td",6),l.Sb("click",function(){return r.ViewServer(r.server)}),l.Hb(42,"i",7),l.Kb(),l.Lb(43,"td",6),l.Sb("click",function(){return r.EditServer(r.server)}),l.Hb(44,"i",8),l.Kb(),l.Lb(45,"td",6),l.Sb("click",function(){return r.StartServer(r.server)}),l.mc(46,y,3,2,"ng-container",5),l.mc(47,_,3,2,"ng-container",5),l.Kb(),l.Lb(48,"td",6),l.Sb("click",function(){return r.DeleteServer(r.server)}),l.Hb(49,"i",9),l.Kb(),l.Lb(50,"td"),l.Lb(51,"a",10),l.Hb(52,"i",11),l.Kb(),l.Kb(),l.Kb(),l.Kb(),l.Kb(),l.Kb()),2&e&&(l.wb(20),l.cc("ngIf",0==r.server.status),l.wb(1),l.cc("ngIf",1==r.server.status),l.wb(7),l.cc("ngClass",r.server.status?"online":"offline"),l.wb(1),l.qc(" ",r.serverNo+1," "),l.wb(2),l.pc(r.server.serverName),l.wb(2),l.cc("ngIf",r.server.status),l.wb(1),l.cc("ngIf",!r.server.status),l.wb(2),l.pc(r.server.aeVersion),l.wb(2),l.pc(r.server.dbServerName),l.wb(2),l.pc(r.server.dbName),l.wb(6),l.cc("ngIf",r.serverStatus.includes(r.server.serverName)),l.wb(1),l.cc("ngIf",!r.serverStatus.includes(r.server.serverName)),l.wb(4),l.cc("href",r.server.aeSiteUrl,l.kc))},directives:[o.n,o.l],styles:[".server[_ngcontent-%COMP%]{margin:15px 30px;background-color:#eee;transition-duration:.3s;border-radius:25px!important;box-shadow:4px 3px 8px 0 grey;border:3px solid var(--color-secondary)}.server[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:4px 3px 11px 6px grey}.server[_ngcontent-%COMP%]   .offline[_ngcontent-%COMP%]{background-color:#ed6347}.server[_ngcontent-%COMP%]   .online[_ngcontent-%COMP%]{background-color:#50b83c}"]}),e})();var O=t("4Kj8"),H=t("itXk"),x=t("lJxs");let F=(()=>{class e{constructor(e){this._commonService=e}transform(e){return this._commonService.searchBoxTypedKeywords="",Object(H.a)([e,this._commonService.searchBoxKeywords$]).pipe(Object(x.a)(([e,r])=>{let t=[];return""==r?t=e:e.forEach(e=>{const o=Object.values(e);for(var i in o)if((null==o[i]?"":o[i]).toString().toUpperCase().includes(r.toUpperCase())){t.push(e);break}}),t}))}}return e.\u0275fac=function(r){return new(r||e)(l.Gb(g.a))},e.\u0275pipe=l.Fb({name:"filterAeServers",type:e,pure:!0}),e})();function P(e,r){if(1&e){const e=l.Mb();l.Lb(0,"app-server",8),l.Sb("deletedOrStatusChangedTrigger",function(r){return l.jc(e),l.Wb(3).onTriggerDeleteOrStatusChange(r)}),l.Kb()}if(2&e){const e=r.index;l.cc("server",r.$implicit)("serverNo",e)}}function k(e,r){1&e&&(l.Lb(0,"h4"),l.oc(1," No Server found as per the searched keyword. Try with some different keyword. "),l.Kb())}function $(e,r){1&e&&(l.Lb(0,"h4"),l.oc(1,"No Server found to display"),l.Kb())}function q(e,r){if(1&e&&(l.Jb(0),l.mc(1,P,1,2,"app-server",4),l.Lb(2,"div",5),l.Hb(3,"div",6),l.Lb(4,"div",7),l.mc(5,k,2,0,"h4",3),l.Xb(6,"json"),l.Xb(7,"json"),l.mc(8,$,2,0,"h4",3),l.Xb(9,"json"),l.Kb(),l.Hb(10,"div",6),l.Kb(),l.Ib()),2&e){const e=r.ngIf,t=l.Wb().ngIf;l.wb(1),l.cc("ngForOf",e),l.wb(4),l.cc("ngIf",!("[]"==l.Yb(6,3,t))&&"[]"==l.Yb(7,5,e)),l.wb(3),l.cc("ngIf","[]"==l.Yb(9,7,t))}}function V(e,r){if(1&e&&(l.Lb(0,"div",2),l.mc(1,q,11,9,"ng-container",3),l.Xb(2,"async"),l.Xb(3,"filterAeServers"),l.Kb()),2&e){const e=l.Wb();l.wb(1),l.cc("ngIf",l.Yb(2,1,l.Yb(3,3,e.allServers$)))}}function A(e,r){1&e&&(l.Lb(0,"app-spinner",9),l.oc(1),l.Kb()),2&e&&(l.cc("spinnerColor","#428bca")("spinnerSize","1.5rem"),l.wb(1),l.pc(" Fetching data from backend....."))}function D(e,r){1&e&&(l.Lb(0,"app-spinner",9),l.oc(1),l.Kb()),2&e&&(l.cc("spinnerColor","#428bca")("spinnerSize","1.5rem"),l.wb(1),l.pc(" Checking for search keyword from search box....."))}let G=(()=>{class e{constructor(e,r){this._commonService=e,this._serverService=r}ngOnInit(){this.allServers$=this._serverService.GetAllServers$()}onTriggerDeleteOrStatusChange(e){this.ngOnInit()}ngOnDestroy(){this._commonService.searchBoxTypedKeywords=""}}return e.\u0275fac=function(r){return new(r||e)(l.Gb(g.a),l.Gb(m.a))},e.\u0275cmp=l.Ab({type:e,selectors:[["app-list-server"]],decls:8,vars:13,consts:[["class","list-server",4,"ngIf"],[3,"spinnerColor","spinnerSize",4,"ngIf"],[1,"list-server"],[4,"ngIf"],[3,"server","serverNo","deletedOrStatusChangedTrigger",4,"ngFor","ngForOf"],[1,"no-matching-server","row"],[1,"col-md-2"],[1,"col-md-8"],[3,"server","serverNo","deletedOrStatusChangedTrigger"],[3,"spinnerColor","spinnerSize"]],template:function(e,r){1&e&&(l.mc(0,V,4,5,"div",0),l.Xb(1,"async"),l.mc(2,A,2,3,"app-spinner",1),l.Xb(3,"async"),l.mc(4,D,2,3,"app-spinner",1),l.Xb(5,"async"),l.Xb(6,"async"),l.Xb(7,"filterAeServers")),2&e&&(l.cc("ngIf",l.Yb(1,3,r.allServers$)),l.wb(2),l.cc("ngIf",!l.Yb(3,5,r.allServers$)),l.wb(2),l.cc("ngIf",l.Yb(5,7,r.allServers$)&&!l.Yb(6,9,l.Yb(7,11,r.allServers$))))},directives:[o.n,o.m,U,O.a],pipes:[o.b,F,o.g],styles:[".list-server[_ngcontent-%COMP%]   .no-matching-server[_ngcontent-%COMP%]{margin-top:30px}"]}),e})();var X=t("vkgz");function j(e,r){1&e&&(l.Lb(0,"div",42),l.Lb(1,"label",43),l.oc(2,"Password"),l.Kb(),l.Hb(3,"input",44),l.Kb())}const B=function(e,r){return{"form-valid":e,"form-invalid":r}};function Y(e,r){if(1&e){const e=l.Mb();l.Lb(0,"div",45),l.Lb(1,"button",46),l.Sb("click",function(){return l.jc(e),l.Wb(3).UpdateServer()}),l.oc(2," Update Server "),l.Kb(),l.Kb()}if(2&e){const e=l.Wb(3);l.wb(1),l.cc("disabled",e.serverForm.invalid)("ngClass",l.fc(2,B,!e.serverForm.invalid,e.serverForm.invalid))}}function M(e,r){if(1&e&&(l.Lb(0,"div",4),l.Lb(1,"form",5),l.Lb(2,"div",6),l.Hb(3,"div",7),l.Lb(4,"div",8),l.Lb(5,"div",6),l.Lb(6,"div",9),l.Lb(7,"div",10),l.Lb(8,"label",11),l.oc(9,"Server Name"),l.Kb(),l.Hb(10,"input",12),l.Kb(),l.Lb(11,"div",13),l.Lb(12,"label",14),l.oc(13,"DB Server Name"),l.Kb(),l.Hb(14,"input",15),l.Kb(),l.Lb(15,"div",16),l.Lb(16,"label",17),l.oc(17,"DB Name"),l.Kb(),l.Hb(18,"input",18),l.Kb(),l.Lb(19,"div",19),l.Lb(20,"label",20),l.oc(21,"Server IP"),l.Kb(),l.Hb(22,"input",21),l.Kb(),l.Lb(23,"div",22),l.Lb(24,"label",23),l.oc(25,"AE Script Path"),l.Kb(),l.Hb(26,"input",24),l.Kb(),l.Kb(),l.Lb(27,"div",9),l.Lb(28,"div",25),l.Lb(29,"label",26),l.oc(30,"AssistEdge Version"),l.Kb(),l.Hb(31,"input",27),l.Kb(),l.Lb(32,"div",28),l.Lb(33,"label",29),l.oc(34,"Listener URL"),l.Kb(),l.Hb(35,"input",30),l.Kb(),l.Lb(36,"div",31),l.Lb(37,"label",32),l.oc(38,"AE Site URL"),l.Kb(),l.Hb(39,"input",33),l.Kb(),l.Lb(40,"div",34),l.Lb(41,"label",35),l.oc(42,"Messaging URL"),l.Kb(),l.Hb(43,"input",36),l.Kb(),l.Lb(44,"div",37),l.Lb(45,"label",38),l.oc(46,"UserName"),l.Kb(),l.Hb(47,"input",39),l.Kb(),l.mc(48,j,4,0,"div",40),l.Kb(),l.Kb(),l.mc(49,Y,3,5,"div",41),l.Kb(),l.Hb(50,"div",7),l.Kb(),l.Kb(),l.Kb()),2&e){const e=r.ngIf,t=l.Wb(2);l.wb(1),l.cc("formGroup",t.serverForm),l.wb(13),l.cc("readonly","view"==e.mode),l.wb(4),l.cc("readonly","view"==e.mode),l.wb(4),l.cc("readonly","view"==e.mode),l.wb(4),l.cc("readonly","view"==e.mode),l.wb(5),l.cc("readonly","view"==e.mode),l.wb(4),l.cc("readonly","view"==e.mode),l.wb(4),l.cc("readonly","view"==e.mode),l.wb(4),l.cc("readonly","view"==e.mode),l.wb(4),l.cc("readonly","view"==e.mode),l.wb(1),l.cc("ngIf","edit"==e.mode),l.wb(1),l.cc("ngIf",!("view"==e.mode))}}function T(e,r){if(1&e&&(l.Lb(0,"div",2),l.mc(1,M,51,12,"div",3),l.Xb(2,"async"),l.Kb()),2&e){const e=l.Wb();l.wb(1),l.cc("ngIf",l.Yb(2,1,e.routeParams$))}}function R(e,r){1&e&&(l.Lb(0,"app-spinner",47),l.oc(1),l.Kb()),2&e&&(l.cc("spinnerColor","#428bca")("spinnerSize","1.5rem"),l.wb(1),l.pc(" Fetching data from backend....."))}const E=[{path:"",redirectTo:"view-all",pathMatch:"full"},{path:"create",component:p},{path:":id/:mode",component:(()=>{class e{constructor(e,r,t,o){this._route=e,this._router=r,this._formBuilder=t,this._serverService=o}ngOnInit(){this.routeParams$=this._route.params,this.serverForm=new b.a.CreateServer(this._formBuilder).InItForm(),this.selectedServer$=this._serverService.selectedServer$.pipe(Object(X.a)(e=>{(null==e?void 0:e.serverName)?this.serverForm.patchValue(e):this._router.navigate([c.a.getRoutePathByName("server-view-all")])}))}UpdateServer(){this.deleteServerSubscription=this._serverService.UpdateServer(this.serverForm.value).subscribe(e=>{console.log(e),this._router.navigate([c.a.getRoutePathByName("server-view-all")])},e=>{console.log(e)})}ngOnDestroy(){this.deleteServerSubscription&&this.deleteServerSubscription.unsubscribe(),this.addServerSubscription&&this.addServerSubscription.unsubscribe()}}return e.\u0275fac=function(r){return new(r||e)(l.Gb(i.a),l.Gb(i.f),l.Gb(d.d),l.Gb(m.a))},e.\u0275cmp=l.Ab({type:e,selectors:[["app-view-or-edit-server"]],decls:4,vars:6,consts:[["class","create-server",4,"ngIf"],[3,"spinnerColor","spinnerSize",4,"ngIf"],[1,"create-server"],["class","form-wrapper",4,"ngIf"],[1,"form-wrapper"],[3,"formGroup"],[1,"row"],[1,"col-md-1"],[1,"col-md-10"],[1,"col-md-6"],[1,"form-group","serverName"],["for","serverName",1,"form-label","required"],["readonly","","id","serverName","name","serverName","formControlName","serverName",1,"form-control","highlight"],[1,"form-group","dbServerName"],["for","dbServerName",1,"form-label","required"],["id","dbServerName","name","dbServerName","formControlName","dbServerName",1,"form-control","highlight",3,"readonly"],[1,"form-group","dbName"],["for","dbName",1,"form-label","required"],["id","dbName","name","dbName","formControlName","dbName",1,"form-control","highlight",3,"readonly"],[1,"form-group","serverIp"],["for","serverIp",1,"form-label","required"],["type","text","id","serverIp","formControlName","serverIp",1,"form-control","highlight",3,"readonly"],[1,"form-group","aeFilePath"],["for","aeFilePath",1,"form-label","required"],["type","text","id","aeFilePath","formControlName","aeFilePath",1,"form-control","highlight",3,"readonly"],[1,"form-group","aeVersion"],["for","aeVersion",1,"form-label","required"],["id","aeVersion","name","aeVersion","formControlName","aeVersion",1,"form-control","highlight",3,"readonly"],[1,"form-group","listenerUrl"],["for","listenerUrl",1,"form-label","required"],["type","text","id","listenerUrl","formControlName","listenerUrl",1,"form-control","highlight",3,"readonly"],[1,"form-group","aeSiteUrl"],["for","aeSiteUrl",1,"form-label","required"],["type","text","id","aeSiteUrl","formControlName","aeSiteUrl",1,"form-control","highlight",3,"readonly"],[1,"form-group","messagingUrl"],["for","messagingUrl",1,"form-label","required"],["type","text","id","messagingUrl","formControlName","messagingUrl",1,"form-control","highlight",3,"readonly"],[1,"form-group","userName"],["for","userName",1,"form-label","required"],["id","userName","name","userName","formControlName","userName",1,"form-control","highlight",3,"readonly"],["class","form-group password",4,"ngIf"],["class","form-group",4,"ngIf"],[1,"form-group","password"],["for","password",1,"form-label","required"],["type","password","id","password","name","password","formControlName","password",1,"form-control","highlight"],[1,"form-group"],["type","submit",1,"btn","btn-primary",3,"disabled","ngClass","click"],[3,"spinnerColor","spinnerSize"]],template:function(e,r){1&e&&(l.mc(0,T,3,3,"div",0),l.Xb(1,"async"),l.mc(2,R,2,3,"app-spinner",1),l.Xb(3,"async")),2&e&&(l.cc("ngIf",l.Yb(1,2,r.selectedServer$)),l.wb(2),l.cc("ngIf",!l.Yb(3,4,r.selectedServer$)))},directives:[o.n,d.s,d.j,d.f,d.b,d.i,d.e,o.l,O.a],pipes:[o.b],styles:[""]}),e})()},{path:"view-all",component:G}];let W=(()=>{class e{}return e.\u0275mod=l.Eb({type:e}),e.\u0275inj=l.Db({factory:function(r){return new(r||e)},imports:[[i.i.forChild(E)],i.i]}),e})();var z=t("PCNd");let J=(()=>{class e{}return e.\u0275mod=l.Eb({type:e}),e.\u0275inj=l.Db({factory:function(r){return new(r||e)},imports:[[o.c,W,d.n,z.a]]}),e})()}}]);