import{l as f,u as h,r as i,j as t}from"./index-8d165fe6.js";import{R as x}from"./routine-form-d807dc4e.js";import{S,a as j,b as R,c as g}from"./sheet-878a68e0.js";import{u as a}from"./store-0b3fec97.js";import"./card-94c1e5bd.js";import"./pencil-ea7938e5.js";import"./trash-2-a78d399e.js";import"./index-b030042b.js";function H(){const{id:n}=f(),s=h(),o=a(e=>e.routines),u=a(e=>e.updateRoutine),[m,r]=i.useState(!0),p=i.useMemo(()=>{const e=o.find(l=>l.id===n);return e||s(".."),e},[n,o]),c=e=>{e||(r(!1),setTimeout(()=>s(".."),200))},d=e=>{u(e),r(!1),setTimeout(()=>s(".."),200)};return t.jsx(S,{open:m,onOpenChange:c,children:t.jsxs(j,{children:[t.jsx(R,{children:t.jsx(g,{children:"Editar Rutina"})}),t.jsx(x,{defaultValues:p,onSubmit:d})]})})}export{H as default};