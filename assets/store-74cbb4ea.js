import{r as x,t as H,R as P}from"./index-61d15c15.js";const D=t=>{let e;const n=new Set,o=(l,c)=>{const h=typeof l=="function"?l(e):l;if(!Object.is(h,e)){const p=e;e=c??typeof h!="object"?h:Object.assign({},e,h),n.forEach(g=>g(e,p))}},s=()=>e,d={setState:o,getState:s,subscribe:l=>(n.add(l),()=>n.delete(l)),destroy:()=>{n.clear()}};return e=t(o,s,d),d},j=t=>t?D(t):D;var _={exports:{}},O={},F={exports:{}},A={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=x;function $(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var L=typeof Object.is=="function"?Object.is:$,q=E.useState,z=E.useEffect,U=E.useLayoutEffect,C=E.useDebugValue;function T(t,e){var n=e(),o=q({inst:{value:n,getSnapshot:e}}),s=o[0].inst,r=o[1];return U(function(){s.value=n,s.getSnapshot=e,w(s)&&r({inst:s})},[t,n,e]),z(function(){return w(s)&&r({inst:s}),t(function(){w(s)&&r({inst:s})})},[t]),C(n),n}function w(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!L(t,n)}catch{return!0}}function W(t,e){return e()}var k=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?W:T;A.useSyncExternalStore=E.useSyncExternalStore!==void 0?E.useSyncExternalStore:k;F.exports=A;var B=F.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b=x,J=B;function M(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var N=typeof Object.is=="function"?Object.is:M,G=J.useSyncExternalStore,K=b.useRef,Q=b.useEffect,X=b.useMemo,Y=b.useDebugValue;O.useSyncExternalStoreWithSelector=function(t,e,n,o,s){var r=K(null);if(r.current===null){var f={hasValue:!1,value:null};r.current=f}else f=r.current;r=X(function(){function l(v){if(!c){if(c=!0,h=v,v=o(v),s!==void 0&&f.hasValue){var S=f.value;if(s(S,v))return p=S}return p=v}if(S=p,N(h,v))return S;var u=o(v);return s!==void 0&&s(S,u)?S:(h=v,p=u)}var c=!1,h,p,g=n===void 0?null:n;return[function(){return l(e())},g===null?void 0:function(){return l(g())}]},[e,n,o,s]);var d=G(t,r[0],r[1]);return Q(function(){f.hasValue=!0,f.value=d},[d]),Y(d),d};_.exports=O;var Z=_.exports;const V=H(Z),{useDebugValue:ee}=P,{useSyncExternalStoreWithSelector:te}=V;function re(t,e=t.getState,n){const o=te(t.subscribe,t.getState,t.getServerState||t.getState,e,n);return ee(o),o}const I=t=>{const e=typeof t=="function"?j(t):t,n=(o,s)=>re(e,o,s);return Object.assign(n,e),n},ne=t=>t?I(t):I;function oe(t,e){let n;try{n=t()}catch{return}return{getItem:s=>{var r;const f=l=>l===null?null:JSON.parse(l,e==null?void 0:e.reviver),d=(r=n.getItem(s))!=null?r:null;return d instanceof Promise?d.then(f):f(d)},setItem:(s,r)=>n.setItem(s,JSON.stringify(r,e==null?void 0:e.replacer)),removeItem:s=>n.removeItem(s)}}const R=t=>e=>{try{const n=t(e);return n instanceof Promise?n:{then(o){return R(o)(n)},catch(o){return this}}}catch(n){return{then(o){return this},catch(o){return R(o)(n)}}}},se=(t,e)=>(n,o,s)=>{let r={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:a=>a,version:0,merge:(a,m)=>({...m,...a}),...e},f=!1;const d=new Set,l=new Set;let c;try{c=r.getStorage()}catch{}if(!c)return t((...a)=>{console.warn(`[zustand persist middleware] Unable to update item '${r.name}', the given storage is currently unavailable.`),n(...a)},o,s);const h=R(r.serialize),p=()=>{const a=r.partialize({...o()});let m;const i=h({state:a,version:r.version}).then(y=>c.setItem(r.name,y)).catch(y=>{m=y});if(m)throw m;return i},g=s.setState;s.setState=(a,m)=>{g(a,m),p()};const v=t((...a)=>{n(...a),p()},o,s);let S;const u=()=>{var a;if(!c)return;f=!1,d.forEach(i=>i(o()));const m=((a=r.onRehydrateStorage)==null?void 0:a.call(r,o()))||void 0;return R(c.getItem.bind(c))(r.name).then(i=>{if(i)return r.deserialize(i)}).then(i=>{if(i)if(typeof i.version=="number"&&i.version!==r.version){if(r.migrate)return r.migrate(i.state,i.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return i.state}).then(i=>{var y;return S=r.merge(i,(y=o())!=null?y:v),n(S,!0),p()}).then(()=>{m==null||m(S,void 0),f=!0,l.forEach(i=>i(S))}).catch(i=>{m==null||m(void 0,i)})};return s.persist={setOptions:a=>{r={...r,...a},a.getStorage&&(c=a.getStorage())},clearStorage:()=>{c==null||c.removeItem(r.name)},getOptions:()=>r,rehydrate:()=>u(),hasHydrated:()=>f,onHydrate:a=>(d.add(a),()=>{d.delete(a)}),onFinishHydration:a=>(l.add(a),()=>{l.delete(a)})},u(),S||v},ie=(t,e)=>(n,o,s)=>{let r={storage:oe(()=>localStorage),partialize:u=>u,version:0,merge:(u,a)=>({...a,...u}),...e},f=!1;const d=new Set,l=new Set;let c=r.storage;if(!c)return t((...u)=>{console.warn(`[zustand persist middleware] Unable to update item '${r.name}', the given storage is currently unavailable.`),n(...u)},o,s);const h=()=>{const u=r.partialize({...o()});return c.setItem(r.name,{state:u,version:r.version})},p=s.setState;s.setState=(u,a)=>{p(u,a),h()};const g=t((...u)=>{n(...u),h()},o,s);let v;const S=()=>{var u,a;if(!c)return;f=!1,d.forEach(i=>{var y;return i((y=o())!=null?y:g)});const m=((a=r.onRehydrateStorage)==null?void 0:a.call(r,(u=o())!=null?u:g))||void 0;return R(c.getItem.bind(c))(r.name).then(i=>{if(i)if(typeof i.version=="number"&&i.version!==r.version){if(r.migrate)return r.migrate(i.state,i.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return i.state}).then(i=>{var y;return v=r.merge(i,(y=o())!=null?y:g),n(v,!0),h()}).then(()=>{m==null||m(v,void 0),v=o(),f=!0,l.forEach(i=>i(v))}).catch(i=>{m==null||m(void 0,i)})};return s.persist={setOptions:u=>{r={...r,...u},u.storage&&(c=u.storage)},clearStorage:()=>{c==null||c.removeItem(r.name)},getOptions:()=>r,rehydrate:()=>S(),hasHydrated:()=>f,onHydrate:u=>(d.add(u),()=>{d.delete(u)}),onFinishHydration:u=>(l.add(u),()=>{l.delete(u)})},r.skipHydration||S(),v||g},ae=(t,e)=>"getStorage"in e||"serialize"in e||"deserialize"in e?se(t,e):ie(t,e),ue=ae,le=ne(ue(t=>({routines:[],addRoutine:e=>{t(n=>({routines:n.routines.concat(e)}))},removeRoutine:e=>{t(n=>({routines:n.routines.filter(o=>o.id!==e)}))},updateRoutine:e=>{t(n=>({routines:n.routines.map(o=>o.id===e.id?e:o)}))}}),{name:"gym-storage"}));export{le as u};
