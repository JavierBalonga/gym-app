import{j as e,S as i,B as l,L as a}from"./index-c7d5116a.js";import{u as r,C as n,P as c,T as x}from"./card-996b3c01.js";function m(){const t=r(s=>s.routines);return e.jsx(i,{className:"gap-8",children:t.length===0?e.jsxs("div",{className:"flex grow flex-col items-center justify-center gap-4",children:[e.jsx("img",{className:"h-64 w-full",src:"/empty-routines.svg",alt:"Routines Empty State"}),e.jsx(l,{className:"w-full",asChild:!0,children:e.jsx(a,{to:"/routine",children:"Crear Nueva Rutina"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("h5",{className:"text-3xl font-bold",children:"Rutinas"}),e.jsx("div",{className:"flex flex-col gap-4",children:t.map(s=>e.jsxs(n,{className:"flex flex-row items-center gap-4 p-4",children:[e.jsxs("div",{className:"flex grow flex-col gap-2",children:[e.jsx("h5",{className:"text-xl font-bold",children:s.name}),e.jsxs("p",{className:"text-foreground/50",children:[s.exercises.length," ",s.exercises.length===1?"Ejercicio":"Ejercicios"]})]}),e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(l,{type:"button",variant:"outline",size:"icon",asChild:!0,children:e.jsx(a,{to:`/routine/${s.id}`,children:e.jsx(c,{})})}),e.jsx(l,{type:"button",variant:"outline",size:"icon",children:e.jsx(x,{})})]})]},s.id))}),e.jsx("div",{className:"grow"}),e.jsx(l,{className:"w-full",asChild:!0,children:e.jsx(a,{to:"/routine",children:"Crear Nueva Rutina"})})]})})}export{m as default};
