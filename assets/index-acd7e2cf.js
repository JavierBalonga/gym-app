import{k as d,u as h,a as m,r as x,e as j,j as e,D as p,l as g,m as D,n as f,o as C,p as v,B as r,L as E}from"./index-1eafb353.js";function k(){const{routineId:n}=d(),t=h(),o=m(a=>a.removeRoutine),[l,i]=x.useState(!0),s=j(),c=a=>{a||(i(!1),setTimeout(()=>t(".."),200))},u=()=>{n&&(o(n),i(!1),setTimeout(()=>t(".."),200))};return e.jsx(p,{open:l,onOpenChange:c,children:e.jsxs(g,{children:[e.jsxs(D,{children:[e.jsx(f,{children:"Eliminar?"}),e.jsxs(C,{children:['La rutina "',s==null?void 0:s.name,'" será eliminada permanentemente.',e.jsx("br",{}),"Esta acción no se puede deshacer."]})]}),e.jsxs(v,{children:[e.jsx(r,{variant:"outline",asChild:!0,children:e.jsx(E,{to:"..",children:"Cancelar"})}),e.jsx(r,{onClick:u,children:"Eliminar"})]})]})})}export{k as default};