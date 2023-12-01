import{r,j as t,k as F,l as G,u as K,N as Y,B as A}from"./index-8d165fe6.js";import{C as z}from"./card-94c1e5bd.js";import{u as N}from"./store-0b3fec97.js";import{S as H,a as L}from"./sheet-878a68e0.js";import{T as X}from"./trash-2-a78d399e.js";import"./index-b030042b.js";const q=60,y=48,J=45,Q=45,O=r.createContext(null);function D({children:o,value:a,onChange:d}){const[l,f]=r.useState(0),[p,h]=r.useState([]),j=r.useRef(null);r.useEffect(()=>{if(a===void 0)return;const c=p.indexOf(a);c!==-1&&f(-c*y)},[a,p]);const m=(c,E)=>{h(T=>{const s=[...T];return s[c]=E,s})},x=c=>{j.current=l+c.touches[0].clientY},g=c=>{if(j.current===null)return;const E=j.current-c.touches[0].clientY;f(E)},w=()=>{j.current=null;const c=-Math.round(l/y);f(-c*y);const E=p[c];d==null||d(E)};return t.jsx(O.Provider,{value:{delta:l,onTouchStart:x,onTouchMove:g,onTouchEnd:w,registerItem:m},children:o})}const P=()=>{const o=r.useContext(O);if(!o)throw new Error("useWheelInput must be used within a WheelInput");return o};function U({className:o,children:a,...d}){const{onTouchStart:l,onTouchMove:f,onTouchEnd:p}=P();return t.jsx("ul",{...d,className:F("relative h-32 w-full overflow-hidden border first-of-type:rounded-l-xl last-of-type:rounded-r-xl",o),onTouchStart:l,onTouchMove:f,onTouchEnd:p,children:a})}function _({value:o,className:a,children:d,...l}){const{delta:f,registerItem:p}=P(),[h,j]=r.useState(null),m=r.useMemo(()=>{var w;if(h===null)return null;const x=h.parentElement;if(x===null)return null;const g=(w=x==null?void 0:x.parentElement)==null?void 0:w.children;return g===void 0?null:Array.from(g).indexOf(x)},[h]);return r.useEffect(()=>{m!==null&&p(m,o)},[m,o]),r.useEffect(()=>{if(h===null||m===null)return;const x=f/y,g=Z(-90,x*Q+m*J,90);h.style.setProperty("transform",`rotateX(${g}deg) translate3d(0px, 0px, ${q}px)`)},[h,m,f]),t.jsx("li",{className:"absolute left-0 top-1/2 w-full -translate-y-1/2",style:{height:y},children:t.jsx("div",{className:F("absolute left-0 top-0 flex w-full items-center justify-center transition-transform duration-75 [transform-style:_preserve-3d;]",a),...l,style:{height:y},ref:j,children:d||o})})}function Z(o,a,d){return Math.max(o,Math.min(d,a))}function oe(){const o=G(),a=K(),d=N(e=>e.routines),l=N(e=>e.actualRoutineExecutionId),f=N(e=>e.setActualRoutineExecutionId),p=N(e=>e.addRoutineExecution),h=N(e=>e.addExerciseExecution),j=N(e=>e.addSetExecution),m=N(e=>e.removeSetExecution),[x,g]=r.useState(!0),[w,c]=r.useState(null),[E,T]=r.useState(null),s=r.useMemo(()=>{const e=d.find(i=>i.id===o.routineId);return e||null},[o.routineId,d]),n=r.useMemo(()=>{if(!s)return null;const e=s.exercises.find(i=>i.id===o.exerciseId);return e||null},[o.exerciseId,s]),I=r.useMemo(()=>{if(!s||!l)return null;const e=s.executions.find(v=>v.id===l);if(e)return e;const i={id:l,exercises:[]};return p(s.id,i),i},[s,l]),u=r.useMemo(()=>{if(!s||!I||!n)return null;const e=I.exercises.find(v=>v.exerciseId===n.id);if(e)return e;const i={id:crypto.randomUUID(),exerciseId:n.id,sets:[]};return h(s.id,I.id,i),i},[I,n]),R=r.useMemo(()=>{if(!s||!l||!n)return null;const e=s.executions.findIndex(S=>S.id===l);if(e===-1)return null;const i=s.executions[e-1];if(!i)return null;const v=i.exercises.find(S=>S.exerciseId===n.id);if(!v)return null;const b=v.sets.length;let C=0,W=0;return v.sets.forEach(S=>{C+=S.weight,W+=S.reps}),{sets:b,weight:C/b,reps:W/b}},[s,l,n]),M=r.useMemo(()=>!n||!u?null:n.sets-u.sets.length,[n==null?void 0:n.sets,u==null?void 0:u.sets.length]);r.useEffect(()=>{l===null&&f(crypto.randomUUID())},[l]),r.useEffect(()=>{if(!n||!u)return;const e=u.sets[(u==null?void 0:u.sets.length)-1];c((e==null?void 0:e.weight)||n.weight),T((e==null?void 0:e.reps)||n.reps)},[n]);const $=()=>{if(!s||!I||!u||w===null||E===null)return null;j(s.id,I.id,u.id,{id:crypto.randomUUID(),weight:w,reps:E})},k=e=>{if(!s||!I||!u)return null;m(s.id,I.id,u.id,e)},V=e=>{e||(g(!1),setTimeout(()=>a(".."),200))},B=()=>{g(!1),setTimeout(()=>a(".."),200)};return!s||!n?t.jsx(Y,{to:".."}):t.jsx(H,{open:x,onOpenChange:V,children:t.jsxs(L,{children:[t.jsxs("div",{className:"flex flex-row flex-wrap items-baseline justify-between gap-2 pt-6 text-foreground",children:[t.jsx("h3",{className:"text-2xl",children:n==null?void 0:n.name}),t.jsxs("p",{children:[n.sets,"x",n.reps," ",n.weight&&`${n.weight}Kg`]})]}),t.jsx("hr",{}),R&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-row flex-wrap items-baseline justify-between gap-2 text-foreground/50",children:[t.jsx("h4",{className:"text-md",children:"Ejecucion anterior"}),t.jsxs("p",{children:[R.sets,"x",R.reps," ",R.weight&&`${R.weight}Kg`]})]}),t.jsx("hr",{})]}),t.jsx("div",{className:"flex h-0 grow flex-col gap-2 overflow-auto px-4",children:u==null?void 0:u.sets.map((e,i)=>t.jsxs(z,{className:"flex flex-row items-center gap-3 py-2 pl-6 pr-2",children:[t.jsxs("span",{children:[i+1," Serie"]}),t.jsx("div",{className:"grow"}),t.jsxs("span",{children:[e.reps,"Reps ",e.weight,"Kg"]}),t.jsx(A,{type:"button",variant:"outline",size:"icon",onClick:()=>k(e.id),children:t.jsx(X,{})})]},e.id))}),M!==null&&M>0&&t.jsx("p",{className:"text-center text-foreground/50",children:M===1?"Falta 1 Serie":`Faltan ${M} Series`}),t.jsxs("div",{className:"grid grid-cols-2",children:[t.jsx("span",{className:"text-center",children:"Peso"}),t.jsx("span",{className:"text-center",children:"Repeticiones"}),t.jsx(D,{value:w??0,onChange:c,children:t.jsx(U,{children:Array.from({length:200},(e,i)=>t.jsx(_,{value:i/2},i))})}),t.jsx(D,{value:E??0,onChange:T,children:t.jsx(U,{children:Array.from({length:99},(e,i)=>t.jsx(_,{value:i+1},i))})})]}),t.jsxs("div",{className:"flex flex-row gap-2 pt-4",children:[t.jsx(A,{type:"button",variant:"outline",className:"w-full grow",onClick:B,children:"Finalizar Ejercicio"}),t.jsx(A,{type:"button",variant:"default",className:"w-full grow",onClick:$,children:"Agregar Serie"})]})]})})}export{oe as default};
