import{j as e,S as i,B as t,L as a,O as r}from"./index-61d15c15.js";import{C as n,P as c,T as o}from"./card-b58aa4ae.js";import{u as x}from"./store-74cbb4ea.js";const d="/gym-app/assets/empty-routines-e324a0a4.svg";function u(){const l=x(s=>s.routines);return e.jsxs(i,{className:"gap-8",children:[e.jsx("h5",{className:"text-3xl font-bold",children:"Rutinas"}),e.jsxs("div",{className:"flex grow flex-col gap-4",children:[l.length===0?e.jsx("img",{className:"h-64 w-full",src:d,alt:"Routines Empty State"}):e.jsx(e.Fragment,{children:l.map(s=>e.jsxs(n,{className:"flex flex-row items-center gap-4 p-4",children:[e.jsxs("div",{className:"flex grow flex-col gap-2",children:[e.jsx("h5",{className:"text-xl font-bold",children:s.name}),e.jsxs("p",{className:"text-foreground/50",children:[s.exercises.length," ",s.exercises.length===1?"Ejercicio":"Ejercicios"]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(t,{type:"button",variant:"outline",size:"icon",asChild:!0,children:e.jsx(a,{to:`/routine/${s.id}`,children:e.jsx(c,{})})}),e.jsx(t,{type:"button",variant:"outline",size:"icon",asChild:!0,children:e.jsx(a,{to:`/delete/${s.id}`,children:e.jsx(o,{})})})]})]},s.id))}),e.jsx(t,{className:"w-full",asChild:!0,children:e.jsx(a,{to:"/create",children:"Crear Nueva Rutina"})})]}),e.jsx(r,{})]})}export{u as default};
