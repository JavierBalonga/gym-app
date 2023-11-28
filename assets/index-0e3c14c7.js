import{r as l,j as n,k as U,l as P,N as k,S as L,B as w,L as b}from"./index-ac6900ef.js";import{C as V,T as B}from"./card-951af291.js";import{u as v}from"./store-aa3e62e5.js";import{C as M,a as T}from"./chevron-up-dd96e5ae.js";const F=60,y=48,G=45,O=45,W=l.createContext(null);function C({children:r,value:a,onChange:u}){const[m,f]=l.useState(0),[p,h]=l.useState([]),j=l.useRef(null);l.useEffect(()=>{if(a===void 0)return;const t=p.indexOf(a);t!==-1&&f(-t*y)},[a,p]);const c=(t,s)=>{h(S=>{const N=[...S];return N[t]=s,N})},d=t=>{j.current=m+t.touches[0].clientY},x=t=>{if(j.current===null)return;const s=j.current-t.touches[0].clientY;f(s)},E=()=>{j.current=null;const t=-Math.round(m/y);f(-t*y);const s=p[t];u==null||u(s)};return n.jsx(W.Provider,{value:{delta:m,onTouchStart:d,onTouchMove:x,onTouchEnd:E,registerItem:c},children:r})}const $=()=>{const r=l.useContext(W);if(!r)throw new Error("useWheelInput must be used within a WheelInput");return r};function A({className:r,children:a,...u}){const{onTouchStart:m,onTouchMove:f,onTouchEnd:p}=$();return n.jsx("ul",{...u,className:U("relative h-32 w-full overflow-hidden border first-of-type:rounded-l-xl last-of-type:rounded-r-xl",r),onTouchStart:m,onTouchMove:f,onTouchEnd:p,children:a})}function D({value:r,className:a,children:u,...m}){const{delta:f,registerItem:p}=$(),[h,j]=l.useState(null),c=l.useMemo(()=>{var E;if(h===null)return null;const d=h.parentElement;if(d===null)return null;const x=(E=d==null?void 0:d.parentElement)==null?void 0:E.children;return x===void 0?null:Array.from(x).indexOf(d)},[h]);return l.useEffect(()=>{c!==null&&p(c,r)},[c,r]),l.useEffect(()=>{if(h===null||c===null)return;const d=f/y,x=Y(-90,d*O+c*G,90);h.style.setProperty("transform",`rotateX(${x}deg) translate3d(0px, 0px, ${F}px)`)},[h,c,f]),n.jsx("li",{className:"absolute left-0 top-1/2 w-full -translate-y-1/2",style:{height:y},children:n.jsx("div",{className:U("absolute left-0 top-0 flex w-full items-center justify-center transition-transform duration-75 [transform-style:_preserve-3d;]",a),...m,style:{height:y},ref:j,children:u||r})})}function Y(r,a,u){return Math.max(r,Math.min(u,a))}function J(){const r=P(),a=v(e=>e.routines),u=v(e=>e.actualRoutineExecutionId),m=v(e=>e.setActualRoutineExecutionId),f=v(e=>e.addRoutineExecution),p=v(e=>e.addExerciseExecution),h=v(e=>e.addSetExecution),j=v(e=>e.removeSetExecution),[c,d]=l.useState(null),[x,E]=l.useState(null),t=l.useMemo(()=>{const e=a.find(i=>i.id===r.routineId);return e||null},[r.routineId,a]),s=l.useMemo(()=>{if(!t)return null;const e=t.exercises.find(i=>i.id===r.exerciseId);return e||null},[r.exerciseId,t,c,x]),S=l.useMemo(()=>{if(!t)return null;const e=t.exercises.findIndex(g=>g.id===r.exerciseId);if(e===-1)return null;const i=t==null?void 0:t.exercises[e-1];return i?i.id:null},[r.exerciseId,t]),N=l.useMemo(()=>{if(!t)return null;const e=t.exercises.findIndex(g=>g.id===r.exerciseId);if(e===-1)return null;const i=t==null?void 0:t.exercises[e+1];return i?i.id:null},[r.exerciseId,t]),I=l.useMemo(()=>{if(!t||!u)return null;const e=t.executions.find(g=>g.id===u);if(e)return e;const i={id:u,exercises:[]};return f(t.id,i),i},[t,u]),o=l.useMemo(()=>{if(!t||!I||!s)return null;const e=I.exercises.find(g=>g.exerciseId===s.id);if(e)return e;const i={id:crypto.randomUUID(),exerciseId:s.id,sets:[]};return p(t.id,I.id,i),i},[I,s]),R=l.useMemo(()=>!s||!o?null:s.sets-o.sets.length,[s==null?void 0:s.sets,o==null?void 0:o.sets.length]);l.useEffect(()=>{u===null&&m(crypto.randomUUID())},[u]),l.useEffect(()=>{if(!s||!o)return;const e=o.sets[(o==null?void 0:o.sets.length)-1];d((e==null?void 0:e.weight)||s.weight),E((e==null?void 0:e.reps)||s.reps)},[s]);const _=()=>{if(!t||!I||!o||c===null||x===null)return null;h(t.id,I.id,o.id,{id:crypto.randomUUID(),weight:c,reps:x})},z=e=>{if(!t||!I||!o)return null;j(t.id,I.id,o.id,e)};return!t||!s?n.jsx(k,{to:".."}):n.jsxs(L,{className:"gap-3",children:[n.jsx("h2",{className:"text-4xl font-bold",children:t==null?void 0:t.name}),n.jsx("hr",{}),n.jsxs("div",{className:"flex flex-row flex-wrap items-baseline justify-between gap-2",children:[n.jsx("h3",{className:"text-2xl",children:s==null?void 0:s.name}),n.jsxs("p",{className:"text-foreground/50",children:[s.sets,"x",s.reps," ",s.weight&&`${s.weight}Kg`]})]}),n.jsx("hr",{}),n.jsx("div",{className:"flex h-0 grow flex-col gap-2 overflow-auto px-4",children:o==null?void 0:o.sets.map((e,i)=>n.jsxs(V,{className:"flex flex-row items-center gap-3 py-2 pl-6 pr-2",children:[n.jsxs("span",{children:[i+1," Serie"]}),n.jsx("div",{className:"grow"}),n.jsxs("span",{children:[e.reps,"Reps ",e.weight,"Kg"]}),n.jsx(w,{type:"button",variant:"outline",size:"icon",onClick:()=>z(e.id),children:n.jsx(B,{})})]},e.id))}),R!==null&&R>0&&n.jsx("p",{className:"text-center text-foreground/50",children:R===1?"Falta 1 Serie":`Faltan ${R} Series`}),n.jsxs("div",{className:"grid grid-cols-2",children:[n.jsx("span",{className:"text-center",children:"Peso"}),n.jsx("span",{className:"text-center",children:"Repeticiones"}),n.jsx(C,{value:c??0,onChange:d,children:n.jsx(A,{children:Array.from({length:200},(e,i)=>n.jsx(D,{value:i/2},i))})}),n.jsx(C,{value:x??0,onChange:E,children:n.jsx(A,{children:Array.from({length:99},(e,i)=>n.jsx(D,{value:i+1},i))})})]}),n.jsxs("div",{className:"flex flex-row gap-2 pt-4",children:[S?n.jsx(w,{type:"button",variant:"outline",size:"icon",asChild:!0,children:n.jsx(b,{to:`/execute/${r.routineId}/${S}`,children:n.jsx(M,{})})}):n.jsx(w,{type:"button",variant:"outline",size:"icon",asChild:!0,disabled:!0,children:n.jsx(M,{})}),N?n.jsx(w,{type:"button",variant:"outline",size:"icon",asChild:!0,children:n.jsx(b,{to:`/execute/${r.routineId}/${N}`,children:n.jsx(T,{})})}):n.jsx(w,{type:"button",variant:"outline",size:"icon",asChild:!0,disabled:!0,children:n.jsx(T,{})}),n.jsx(w,{type:"button",variant:"default",className:"w-full grow",onClick:_,children:"Agregar Serie"})]})]})}export{J as default};