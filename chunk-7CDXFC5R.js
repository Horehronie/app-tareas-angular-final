import{b as pe,c as ue,d as ge,e as _e}from"./chunk-UAWOG2QM.js";import{a as de,b as fe}from"./chunk-JG3JJMIJ.js";import"./chunk-ZEAZJOJA.js";import{a as u}from"./chunk-PHPHF7LR.js";import{a as M}from"./chunk-WIDNJ34L.js";import"./chunk-3PGDNC5K.js";import{A as me,b as L,d as p,e as D,f as U,g as $,h as H,i as J,j as K,k as Q,m as W,n as X,o as Y,p as Z,r as ee,s as te,t as oe,u as ne,v as re,x as ie,y as ae,z as le}from"./chunk-A3JXB763.js";import"./chunk-EJJBCPAK.js";import"./chunk-MJYIHZUX.js";import{s as ce,v as se}from"./chunk-BHTFXPLE.js";import{Ab as j,Ba as s,F,Gb as A,Ib as R,J as d,Jb as G,Ka as i,La as n,M as T,Ma as g,Qa as N,Sa as h,T as S,Ta as _,U as E,b as w,cb as l,db as C,eb as x,fb as B,gb as z,hb as V,ka as m,sa as I,xa as f,yb as q}from"./chunk-5B4YHSEC.js";import{a as O,b as y,e as b}from"./chunk-ACKELEN3.js";var v=class r{storage;constructor(){this.storage=ue()}uploadFile(o){return new w(e=>{let t=ge(this.storage,`uploads/${o.name}`),c=_e(t,o);c.on("state_changed",a=>{},a=>{e.error(a)},()=>{pe(c.snapshot.ref).then(a=>{e.next(a),e.complete()})})})}static \u0275fac=function(e){return new(e||r)};static \u0275prov=F({token:r,factory:r.\u0275fac,providedIn:"root"})};var be=()=>["/tasks/"];function he(r,o){r&1&&(i(0,"mat-error"),l(1," El titular es requerido "),n())}function Ce(r,o){r&1&&(i(0,"mat-error"),l(1," El monto es requerido "),n())}function xe(r,o){if(r&1&&(i(0,"p",22),l(1),n()),r&2){let e=_(2);m(),x(" ",e.archivoFile.name," ")}}function Me(r,o){if(r&1){let e=N();i(0,"div",17)(1,"label",18)(2,"input",19),h("change",function(c){S(e);let a=_();return E(a.onFileSelected(c))}),n(),i(3,"span",20),l(4,"Seleccionar archivo"),n()(),f(5,xe,2,1,"p",21),n()}if(r&2){let e=_();m(5),s("ngIf",e.archivoFile)}}var k=class r{_formBuilder=d(Q);_taskService=d(M);_router=d(R);_uploadService=d(v);_route=d(A);loading=I(!1);idTask="";archivoFile=null;form=this._formBuilder.group({titular:this._formBuilder.control("",p.required),monto:this._formBuilder.control("",p.required),estado:this._formBuilder.control(!1,p.required),archivo:this._formBuilder.control("",p.required)});onFileSelected(o){let e=o.target;e.files&&e.files.length>0&&(this.archivoFile=e.files[0],console.log("Archivo seleccionado:",this.archivoFile),this._uploadService.uploadFile(this.archivoFile).subscribe({next:t=>{this.form.patchValue({archivo:t}),console.log("Archivo subido. URL:",t)},error:t=>{console.error("Error al subir el archivo:",t),u.error("Error al subir el archivo")}}))}ngOnInit(){let o=this._route.snapshot.paramMap.get("idTask");o&&(this.idTask=o,this.getTask(o))}getTask(o){return b(this,null,function*(){let e=yield this._taskService.getTask(o);if(!e.exists())return;let t=e.data();this.form.patchValue(y(O({},t),{monto:Number(t.monto)}))})}submit(){return b(this,null,function*(){if(this.form.invalid||!this.form.value.archivo){console.log("Formulario inv\xE1lido"),u.error("Complete todos los campos y espere a que se suba el archivo");return}try{this.loading.set(!0);let{titular:o,monto:e,estado:t,archivo:c}=this.form.value,a={titular:o||"",monto:e||0,estado:t||!1,archivo:c};this.idTask?this._taskService.update(a,this.idTask):this._taskService.create(a),u.success(`Factura ${this.idTask?"actualizada":"cargada"} con \xE9xito`),this._router.navigateByUrl("/tasks")}catch(o){console.error(o),u.error("Ocurri\xF3 un error al cargar la factura")}finally{this.loading.set(!1)}})}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=T({type:r,selectors:[["app-task-form"]],standalone:!0,features:[B([M]),z],decls:33,vars:11,consts:[[1,"form-container"],[1,"form-card"],[1,"form-title"],[1,"form-content",3,"ngSubmit","formGroup"],["appearance","outline",1,"form-field"],["matInput","","placeholder","Ingrese el titular","formControlName","titular"],[4,"ngIf"],["matInput","","type","number","placeholder","0.00","formControlName","monto"],["matPrefix","",1,"currency-prefix"],["class","file-upload-section",4,"ngIf"],["type","hidden","formControlName","archivo"],[1,"toggle-section"],[1,"toggle-label"],["formControlName","estado","color","primary"],[1,"buttons-container"],["mat-raised-button","","color","primary","type","submit",1,"submit-button",3,"disabled"],["mat-raised-button","","type","button",1,"back-button",3,"routerLink","disabled"],[1,"file-upload-section"],[1,"file-upload-label"],["type","file","accept","application/pdf, image/*",1,"file-input",3,"change"],[1,"upload-text"],["class","file-name",4,"ngIf"],[1,"file-name"]],template:function(e,t){if(e&1&&(i(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title")(4,"h1",2),l(5),n()()(),i(6,"mat-card-content")(7,"form",3),h("ngSubmit",function(){return t.submit()}),i(8,"mat-form-field",4)(9,"mat-label"),l(10,"Titular"),n(),g(11,"input",5),f(12,he,2,0,"mat-error",6),n(),i(13,"mat-form-field",4)(14,"mat-label"),l(15,"Monto"),n(),g(16,"input",7),i(17,"span",8),l(18,"$\xA0"),n(),f(19,Ce,2,0,"mat-error",6),n(),f(20,Me,6,1,"div",9),g(21,"input",10),i(22,"div",11)(23,"span",12),l(24,"Estado de pago"),n(),i(25,"mat-slide-toggle",13),l(26),n()(),i(27,"div",14)(28,"button",15)(29,"span"),l(30),n()(),i(31,"button",16),l(32," Volver "),n()()()()()()),e&2){let c,a,P;m(5),C(t.idTask?"Actualizar Factura":"Cargar Factura"),m(2),s("formGroup",t.form),m(5),s("ngIf",(c=t.form.get("titular"))==null||c.errors==null?null:c.errors.required),m(7),s("ngIf",(a=t.form.get("monto"))==null||a.errors==null?null:a.errors.required),m(),s("ngIf",!t.idTask),m(6),x(" ",(P=t.form.get("estado"))!=null&&P.value?"Pagada":"Pendiente"," "),m(2),s("disabled",t.loading()||!t.form.value.archivo),m(2),C(t.loading()?"Procesando...":t.idTask?"Actualizar":"Guardar"),m(),s("routerLink",V(10,be))("disabled",t.loading())}},dependencies:[W,$,L,H,D,U,J,K,te,X,Z,ee,Y,ae,ie,oe,ne,re,me,le,se,ce,fe,de,j,q,G],styles:[".form-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;min-height:100vh;padding:clamp(1rem,3vw,2rem);background-color:#152426;margin-top:-28px;padding-top:calc(28px + clamp(1rem,3vw,2rem))}.form-card[_ngcontent-%COMP%]{width:100%;max-width:min(480px,90vw);background:#273436;border-radius:clamp(8px,2vw,12px);box-shadow:0 8px 32px #0000001a}@media (max-width: 480px){.form-card[_ngcontent-%COMP%]{margin:1rem}}.form-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:clamp(1rem,3vw,1.5rem) clamp(1rem,3vw,1.5rem) 0}.form-card[_ngcontent-%COMP%]   .form-title[_ngcontent-%COMP%]{color:#f3f4f6;font-size:clamp(20px,5vw,24px);font-weight:500;margin:0;text-align:center;width:100%}.form-content[_ngcontent-%COMP%]{padding:clamp(1rem,3vw,1.5rem)}.form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:clamp(1rem,3vw,1.5rem)}.form-field[_ngcontent-%COMP%]     .mat-form-field-wrapper{margin-bottom:0}.form-field[_ngcontent-%COMP%]     .mat-form-field-outline{color:#ffffff1f}.form-field[_ngcontent-%COMP%]     .mat-form-field-label{color:#fff9}.form-field[_ngcontent-%COMP%]     .mat-input-element{color:#f3f4f6;font-size:clamp(14px,4vw,16px)}.form-field[_ngcontent-%COMP%]     .mat-form-field-flex{align-items:center}.form-field[_ngcontent-%COMP%]     .mat-form-field-infix{display:flex;align-items:center;padding-left:.5rem}.form-field[_ngcontent-%COMP%]     .mat-form-field-prefix{top:0;margin-left:1.25rem}.currency-prefix[_ngcontent-%COMP%]{color:#fff9;margin-left:15px;margin-top:3px;display:inline-flex;align-items:center;height:100%;font-size:clamp(14px,4vw,16px)}.file-upload-section[_ngcontent-%COMP%]{margin-bottom:clamp(1rem,3vw,1.5rem)}.file-upload-section[_ngcontent-%COMP%]   .file-upload-label[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:.5rem;padding:clamp(.75rem,2vw,1rem);background:#ffffff0d;border:2px dashed rgba(255,255,255,.1);border-radius:8px;cursor:pointer;transition:all .3s ease}.file-upload-section[_ngcontent-%COMP%]   .file-upload-label[_ngcontent-%COMP%]:hover{background:#ffffff14;border-color:#fff3}.file-upload-section[_ngcontent-%COMP%]   .file-upload-label[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%]{color:#fffc;font-size:clamp(14px,4vw,16px)}.file-upload-section[_ngcontent-%COMP%]   .file-input[_ngcontent-%COMP%]{display:none}.file-upload-section[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%]{margin-top:.5rem;color:#fff9;font-size:clamp(12px,3.5vw,.875rem);text-align:center;word-break:break-all;padding:0 1rem}.toggle-section[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:clamp(1.5rem,4vw,2rem);padding:.5rem 0;flex-wrap:wrap;gap:1rem}@media (max-width: 360px){.toggle-section[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}}.toggle-section[_ngcontent-%COMP%]   .toggle-label[_ngcontent-%COMP%]{color:#fffc;font-size:clamp(14px,4vw,16px)}.buttons-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem;margin-top:clamp(1.5rem,4vw,2rem)}.buttons-container[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%], .buttons-container[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]{width:100%;padding:clamp(.5rem,2vw,.75rem);display:flex;align-items:center;justify-content:center;gap:.5rem;font-size:clamp(14px,4vw,16px)}.buttons-container[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]:disabled, .buttons-container[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]:disabled{opacity:.7}.buttons-container[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]{background-color:#37474f;color:#fff}.buttons-container[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]:hover:not(:disabled){background-color:#455a64}.buttons-container[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]:active:not(:disabled){background-color:#263238}"]})};export{k as default};
