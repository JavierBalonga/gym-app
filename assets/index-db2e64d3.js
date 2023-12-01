import{r as s,j as t,k as b,l as P,u as k,N as V,B as T}from"./index-6ef9e31b.js";import{C as $}from"./card-8f27f91a.js";import{u as v}from"./store-f5e1d8e7.js";import{S as B,a as G}from"./sheet-8b7512bc.js";import{T as Y}from"./trash-2-f5db9db4.js";import"./index-7391e4a0.js";const z=60,S=48,H=45,K=45,W=s.createContext(null);function M({children:r,value:a,onChange:d}){const[u,x]=s.useState(0),[p,h]=s.useState([]),E=s.useRef(null);s.useEffect(()=>{if(a===void 0)return;const c=p.indexOf(a);c!==-1&&x(-c*S)},[a,p]);const m=(c,j)=>{h(N=>{const o=[...N];return o[c]=j,o})},f=c=>{E.current=u+c.touches[0].clientY},g=c=>{if(E.current===null)return;const j=E.current-c.touches[0].clientY;x(j)},I=()=>{E.current=null;const c=-Math.round(u/S);x(-c*S);const j=p[c];d==null||d(j)};return t.jsx(W.Provider,{value:{delta:u,onTouchStart:f,onTouchMove:g,onTouchEnd:I,registerItem:m},children:r})}const D=()=>{const r=s.useContext(W);if(!r)throw new Error("useWheelInput must be used within a WheelInput");return r};function A({className:r,children:a,...d}){const{onTouchStart:u,onTouchMove:x,onTouchEnd:p}=D();return t.jsx("ul",{...d,className:b("relative h-32 w-full overflow-hidden border first-of-type:rounded-l-xl last-of-type:rounded-r-xl",r),onTouchStart:u,onTouchMove:x,onTouchEnd:p,children:a})}function C({value:r,className:a,children:d,...u}){const{delta:x,registerItem:p}=D(),[h,E]=s.useState(null),m=s.useMemo(()=>{var I;if(h===null)return null;const f=h.parentElement;if(f===null)return null;const g=(I=f==null?void 0:f.parentElement)==null?void 0:I.children;return g===void 0?null:Array.from(g).indexOf(f)},[h]);return s.useEffect(()=>{m!==null&&p(m,r)},[m,r]),s.useEffect(()=>{if(h===null||m===null)return;const f=x/S,g=L(-90,f*K+m*H,90);h.style.setProperty("transform",`rotateX(${g}deg) translate3d(0px, 0px, ${z}px)`)},[h,m,x]),t.jsx("li",{className:"absolute left-0 top-1/2 w-full -translate-y-1/2",style:{height:S},children:t.jsx("div",{className:b("absolute left-0 top-0 flex w-full items-center justify-center transition-transform duration-75 [transform-style:_preserve-3d;]",a),...u,style:{height:S},ref:E,children:d||r})})}function L(r,a,d){return Math.max(r,Math.min(d,a))}function te(){const r=P(),a=k(),d=v(e=>e.routines),u=v(e=>e.actualRoutineExecutionId),x=v(e=>e.setActualRoutineExecutionId),p=v(e=>e.addRoutineExecution),h=v(e=>e.addExerciseExecution),E=v(e=>e.addSetExecution),m=v(e=>e.removeSetExecution),[f,g]=s.useState(!0),[I,c]=s.useState(null),[j,N]=s.useState(null),o=s.useMemo(()=>{const e=d.find(l=>l.id===r.routineId);return e||null},[r.routineId,d]),n=s.useMemo(()=>{if(!o)return null;const e=o.exercises.find(l=>l.id===r.exerciseId);return e||null},[r.exerciseId,o]),w=s.useMemo(()=>{if(!o||!u)return null;const e=o.executions.find(R=>R.id===u);if(e)return e;const l={id:u,exercises:[]};return p(o.id,l),l},[o,u]),i=s.useMemo(()=>{if(!o||!w||!n)return null;const e=w.exercises.find(R=>R.exerciseId===n.id);if(e)return e;const l={id:crypto.randomUUID(),exerciseId:n.id,sets:[]};return h(o.id,w.id,l),l},[w,n]),y=s.useMemo(()=>!n||!i?null:n.sets-i.sets.length,[n==null?void 0:n.sets,i==null?void 0:i.sets.length]);s.useEffect(()=>{u===null&&x(crypto.randomUUID())},[u]),s.useEffect(()=>{if(!n||!i)return;const e=i.sets[(i==null?void 0:i.sets.length)-1];c((e==null?void 0:e.weight)||n.weight),N((e==null?void 0:e.reps)||n.reps)},[n]);const U=()=>{if(!o||!w||!i||I===null||j===null)return null;E(o.id,w.id,i.id,{id:crypto.randomUUID(),weight:I,reps:j})},_=e=>{if(!o||!w||!i)return null;m(o.id,w.id,i.id,e)},O=e=>{e||(g(!1),setTimeout(()=>a(".."),200))},F=()=>{g(!1),setTimeout(()=>a(".."),200)};return!o||!n?t.jsx(V,{to:".."}):t.jsx(B,{open:f,onOpenChange:O,children:t.jsxs(G,{children:[t.jsxs("div",{className:"flex flex-row flex-wrap items-baseline justify-between gap-2 pt-6",children:[t.jsx("h3",{className:"text-2xl",children:n==null?void 0:n.name}),t.jsxs("p",{className:"text-foreground/50",children:[n.sets,"x",n.reps," ",n.weight&&`${n.weight}Kg`]})]}),t.jsx("hr",{}),t.jsx("div",{className:"flex h-0 grow flex-col gap-2 overflow-auto px-4",children:i==null?void 0:i.sets.map((e,l)=>t.jsxs($,{className:"flex flex-row items-center gap-3 py-2 pl-6 pr-2",children:[t.jsxs("span",{children:[l+1," Serie"]}),t.jsx("div",{className:"grow"}),t.jsxs("span",{children:[e.reps,"Reps ",e.weight,"Kg"]}),t.jsx(T,{type:"button",variant:"outline",size:"icon",onClick:()=>_(e.id),children:t.jsx(Y,{})})]},e.id))}),y!==null&&y>0&&t.jsx("p",{className:"text-center text-foreground/50",children:y===1?"Falta 1 Serie":`Faltan ${y} Series`}),t.jsxs("div",{className:"grid grid-cols-2",children:[t.jsx("span",{className:"text-center",children:"Peso"}),t.jsx("span",{className:"text-center",children:"Repeticiones"}),t.jsx(M,{value:I??0,onChange:c,children:t.jsx(A,{children:Array.from({length:200},(e,l)=>t.jsx(C,{value:l/2},l))})}),t.jsx(M,{value:j??0,onChange:N,children:t.jsx(A,{children:Array.from({length:99},(e,l)=>t.jsx(C,{value:l+1},l))})})]}),t.jsxs("div",{className:"flex flex-row gap-2 pt-4",children:[t.jsx(T,{type:"button",variant:"outline",className:"w-full grow",onClick:F,children:"Finalizar Ejercicio"}),t.jsx(T,{type:"button",variant:"default",className:"w-full grow",onClick:U,children:"Agregar Serie"})]})]})})}export{te as default};
