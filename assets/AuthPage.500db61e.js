var L=Object.defineProperty,x=Object.defineProperties;var H=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var C=(t,e,s)=>e in t?L(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,S=(t,e)=>{for(var s in e||(e={}))N.call(e,s)&&C(t,s,e[s]);if(k)for(var s of k(e))W.call(e,s)&&C(t,s,e[s]);return t},V=(t,e)=>x(t,H(e));import{o as r,c as w,j as B,J as A,l,i as a,w as _,K as D,L as R,M as F,N as j,O as q,b as J,d as $,h as M,g as K,P as O,r as c,a as i,Q as y,t as Q,R as z,y as G,S as X,U as Y}from"./vendor.1fe5a6ca.js";import{r as E,s as Z,g as ee,v as te,_ as se,a as oe}from"./index.ff4fa9c9.js";const ae={setup(t){return(e,s)=>(r(),w(B(A),{class:"baseInput"}))}};const re={class:"icon"},ne={props:{size:{type:Number,default:18},color:{type:String,default:"#c0c4cc"}},setup(t){const e=t;return(s,d)=>(r(),l("div",re,[a(B(D),{size:e.size,color:e.color},{default:_(()=>[R(s.$slots,"default")]),_:3},8,["size","color"])]))}};var I=F({name:"Lock"});const ie={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},le=a("path",{fill:"currentColor",d:"M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z"},null,-1),ce=a("path",{fill:"currentColor",d:"M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm192-160v-64a192 192 0 1 0-384 0v64h384zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64z"},null,-1);function de(t,e,s,d,u,f){return r(),w("svg",ie,[le,ce])}I.render=de;I.__file="packages/components/Lock.vue";var ue=I,b=F({name:"User"});const me={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},pe=a("path",{fill:"currentColor",d:"M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"},null,-1);function he(t,e,s,d,u,f){return r(),w("svg",me,[pe])}b.render=he;b.__file="packages/components/User.vue";var _e=b;const fe=async t=>{try{const{data:e}=await E({method:"post",url:"code",data:t});return e}catch(e){return new Error(e)}},ve=async t=>{try{const{data:e}=await E({method:"post",url:"auth",data:t}),{token:s}=e.data;return Z(s),e}catch(e){return new Error(e)}};const ge=()=>{const t=q(),e=J({login:"",password:"",formState:"code",isWithPass:!1,hashCode:"",code:"",timer:0,timerId:null,responseMsgError:"\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437!",deviceId:"",type:"onenet"}),s=$({get:()=>e.formState==="login",set:()=>{}}),d=$({get:()=>e.isWithPass||e.formState==="pendingCode"?"\u0412\u043E\u0439\u0442\u0438":"\u0412\u044B\u0441\u043B\u0430\u0442\u044C \u043A\u043E\u0434",set:()=>{}}),u=$({get:()=>{let o=!0;return e.formState==="code"&&!e.login||e.formState==="pendingCode"&&!e.code||e.formState==="login"&&(!e.login||!e.password)?o=!0:o=!1,o},set:()=>{}}),f=()=>{e.formState=e.isWithPass?"login":"code"},v=()=>{O({message:e.responseMsgError,type:"error"})},g=()=>{e.timer?e.timer-=1:clearInterval(e.timerId)},m=()=>{setInterval(g,1e3)},p=async()=>{if(u.value)return!1;if(e.formState==="code"){const{deviceId:o,type:h,login:n}=e,P={device_id:o,type:h,login:n},{success:U,data:T}=await fe(P);U?(e.formState="pendingCode",e.hashCode=T.hash,e.timer=59,e.code="",await m()):v()}else if(e.formState==="pendingCode"||e.formState==="login"){const o=e.formState==="login"?{login:e.login,password:e.password,device_id:e.deviceId,type:e.type}:{login:e.login,code:e.code,device_id:e.deviceId,type:e.type,hash:e.hashCode},{success:h}=await ve(o);h?t.push("/"):v()}};return M(()=>e.timer,o=>{o||(e.formState="code")}),M(()=>e.code,o=>{te.isNumber(o)?e.code=o:e.code=""}),K(async()=>{e.deviceId=await ee(18)}),V(S({},j(e)),{isShowPasswordField:s,submitBtnText:d,switchAuthMethod:f,submitHandler:p,isDisableSubmitBtn:u})},we=i("img",{class:"authForm-logo",src:se},null,-1),ye={class:"authForm-body"},Se={key:0,class:"authForm-inputsWrapper"},Fe={class:"authForm-inputItem"},$e={key:1,class:"authForm-inputsWrapper"},Ie={class:"authForm-inputItem"},be={key:0,class:"authForm-inputItem"},ke={key:2,class:"authForm-switchWrapper"},Ce=i("label",{class:"authForm-switchLabel",for:"switch"},"\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",-1),Ve={class:"authForm-footer"},Be={key:0,class:"authForm-footerTimer"},Me={key:0,class:"authForm-footerTimerText"},ze=i("p",{class:"authForm-footerText"},[X("\u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441\xA0"),i("a",{class:"authForm-footerLink",href:"https://onenet.ru/web-terms"},"\u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u043A\u0438\u043C \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435\u043C")],-1);function Ee(t,e,s,d,u,f){const v=c("router-link"),g=c("Lock"),m=c("BaseIcon"),p=c("BaseInput"),o=c("User"),h=c("ElSwitch");return r(),l("form",{class:"authForm",onSubmit:e[4]||(e[4]=G((...n)=>t.submitHandler&&t.submitHandler(...n),["prevent"]))},[a(v,{class:"authForm-link",to:{name:"HomePage"}},{default:_(()=>[we]),_:1}),i("div",ye,[t.formState==="pendingCode"?(r(),l("div",Se,[i("div",Fe,[a(m,{class:"authForm-icon"},{default:_(()=>[a(g)]),_:1}),a(p,{class:"authForm-input",modelValue:t.code,"onUpdate:modelValue":e[0]||(e[0]=n=>t.code=n),modelModifiers:{trim:!0},type:"text",placeholder:"\u041A\u043E\u0434"},null,8,["modelValue"])])])):(r(),l("div",$e,[i("div",Ie,[a(m,{class:"authForm-icon"},{default:_(()=>[a(o)]),_:1}),a(p,{class:"authForm-input",modelValue:t.login,"onUpdate:modelValue":e[1]||(e[1]=n=>t.login=n),modelModifiers:{trim:!0},type:"text",placeholder:"\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 E-mail"},null,8,["modelValue"])]),t.isShowPasswordField?(r(),l("div",be,[a(m,{class:"authForm-icon"},{default:_(()=>[a(g)]),_:1}),a(p,{class:"authForm-input",modelValue:t.password,"onUpdate:modelValue":e[2]||(e[2]=n=>t.password=n),modelModifiers:{trim:!0},type:"password",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C"},null,8,["modelValue"])])):y("",!0)])),i("button",{class:Q(["authForm-button",{_disable:t.isDisableSubmitBtn}]),type:"submit"},z(t.submitBtnText),3),t.formState!=="pendingCode"?(r(),l("div",ke,[Ce,a(h,{class:"authForm-switch",id:"switch",modelValue:t.isWithPass,"onUpdate:modelValue":e[3]||(e[3]=n=>t.isWithPass=n),onChange:t.switchAuthMethod},null,8,["modelValue","onChange"])])):y("",!0)]),i("div",Ve,[t.formState==="pendingCode"?(r(),l("div",Be,[t.timer?(r(),l("p",Me,"\u0412\u044B\u0441\u043B\u0430\u0442\u044C \u043A\u043E\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u0447\u0435\u0440\u0435\u0437 ("+z(t.timer)+" \u0441\u0435\u043A\u0443\u043D\u0434)",1)):y("",!0)])):y("",!0),ze])],32)}const Pe=F({components:{BaseInput:ae,BaseIcon:ne,ElSwitch:Y,User:_e,Lock:ue},setup(){const t=ge();return S({},t)}});var Ue=oe(Pe,[["render",Ee]]);const Te={class:"authPage"},Le={class:"authPage-form"},xe={setup(t){return(e,s)=>(r(),l("div",Te,[i("div",Le,[a(Ue)])]))}},Ae={setup(t){return(e,s)=>(r(),w(xe))}};export{Ae as default};