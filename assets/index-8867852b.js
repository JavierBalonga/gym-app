import{u as d,a as c,r as h,e as l,j as t,S as p,b as m,c as f,d as x}from"./index-34ee3f20.js";import{R as S}from"./routine-form-8d922fe6.js";function g(){const n=d(),o=c(e=>e.updateRoutine),[u,a]=h.useState(!0),s=l(),i=e=>{e||(a(!1),setTimeout(()=>n(".."),200))},r=e=>{s&&(o({...s,...e}),a(!1),setTimeout(()=>n(".."),200))};return t.jsx(p,{open:u,onOpenChange:i,children:t.jsxs(m,{children:[t.jsx(f,{children:t.jsx(x,{children:"Editar Rutina"})}),s&&t.jsx(S,{defaultValues:s,onSubmit:r})]})})}export{g as default};
