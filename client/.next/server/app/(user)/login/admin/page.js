(()=>{var e={};e.id=506,e.ids=[506],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4891:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>x,tree:()=>d}),r(301),r(1557),r(5866);var s=r(3191),n=r(8716),i=r(7922),a=r.n(i),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["(user)",{children:["login",{children:["admin",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,301)),"C:\\Users\\artem\\YandexDisk\\IT\\dev\\client\\src\\app\\(user)\\login\\admin\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,1557)),"C:\\Users\\artem\\YandexDisk\\IT\\dev\\client\\src\\app\\(user)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\artem\\YandexDisk\\IT\\dev\\client\\src\\app\\(user)\\login\\admin\\page.tsx"],u="/(user)/login/admin/page",m={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/(user)/login/admin/page",pathname:"/login/admin",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},6377:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},5951:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,9404,23))},6208:(e,t,r)=>{Promise.resolve().then(r.bind(r,5756))},5047:(e,t,r)=>{"use strict";var s=r(7389);r.o(s,"useRouter")&&r.d(t,{useRouter:function(){return s.useRouter}}),r.o(s,"useSearchParams")&&r.d(t,{useSearchParams:function(){return s.useSearchParams}})},5756:(e,t,r)=>{"use strict";r.d(t,{default:()=>l});var s=r(326),n=r(7577),i=r(5047),a=r(9404),o=r.n(a);function l({role:e,redirectPath:t}){let[r,a]=(0,n.useState)({login:"",password:""}),[l,d]=(0,n.useState)(""),c=(0,i.useRouter)(),u=async s=>{s.preventDefault(),d("");try{let s=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...r,role:e})}),n=await s.json();s.ok?c.push(t):d(n.error||"Login failed")}catch(e){d("An unexpected error occurred")}};return s.jsx("div",{className:"min-h-screen flex items-center justify-center",children:(0,s.jsxs)("form",{onSubmit:u,className:"space-y-4",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4",children:"admin"===e?"Admin Login":"User Login"}),l&&s.jsx("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded",children:l}),s.jsx("input",{type:"text",placeholder:"Login",value:r.login,onChange:e=>a({...r,login:e.target.value}),className:"block w-full p-2 border rounded text-black"}),s.jsx("input",{type:"password",placeholder:"Password",value:r.password,onChange:e=>a({...r,password:e.target.value}),className:"block w-full p-2 border rounded text-black"}),s.jsx("button",{type:"submit",className:"w-full bg-blue-500 text-white p-2 rounded",children:"Login"}),"user"===e&&s.jsx("div",{className:"text-center mt-4",children:s.jsx(o(),{href:"/register/user",className:"text-blue-500 hover:text-blue-600 font-medium",children:"Register"})})]})})}},1557:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,metadata:()=>i});var s=r(9510),n=r(7371);r(5023);let i={title:"Hybrid-Chess",description:"Full-stack TypeScript application"};function a({children:e}){return s.jsx("html",{lang:"en",children:(0,s.jsxs)("body",{children:[s.jsx("header",{className:"bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg",children:s.jsx("nav",{className:"container mx-auto px-4 py-3",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[s.jsx("div",{className:"flex items-center space-x-2",children:s.jsx(n.default,{href:"/",className:"text-xl font-bold text-white",children:"♟ Hybrid-Chess"})}),(0,s.jsxs)("div",{className:"flex items-center space-x-6",children:[s.jsx(n.default,{href:"/",className:"text-gray-300 hover:text-white transition-colors duration-200 font-medium",children:"Home"}),s.jsx(n.default,{href:"/profile",className:"text-gray-300 hover:text-white transition-colors duration-200 font-medium",children:"Profile"})]})]})})}),s.jsx("div",{className:"min-h-screen bg-gray-900",children:e})]})})}},301:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(9510),n=r(178);function i(){return s.jsx(n.Z,{role:"admin",redirectPath:"/admin/dashboard"})}},178:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});let s=(0,r(8570).createProxy)(String.raw`C:\Users\artem\YandexDisk\IT\dev\client\src\components\LoginForm.tsx#default`)},5023:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[276,471,783],()=>r(4891));module.exports=s})();