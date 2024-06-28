import{r as W}from"./react-dom-5ca1b2a9.js";import"./hoist-non-react-statics-23d96a9a.js";import{r as u}from"./react-c619c8b3.js";import{w as q}from"./use-sync-external-store-a9288389.js";function A(e){e()}let F=A;const K=e=>F=e,G=()=>F,D=Symbol.for("react-redux-context"),T=typeof globalThis<"u"?globalThis:{};function J(){var e;if(!u.createContext)return{};const r=(e=T[D])!=null?e:T[D]=new Map;let s=r.get(u.createContext);return s||(s=u.createContext(null),r.set(u.createContext,s)),s}const d=J();function R(e=d){return function(){return u.useContext(e)}}const H=R(),Q=()=>{throw new Error("uSES not initialized!")};let I=Q;const X=e=>{I=e},Y=(e,r)=>e===r;function Z(e=d){const r=e===d?H:R(e);return function(t,c={}){const{equalityFn:o=Y,stabilityCheck:l=void 0,noopCheck:p=void 0}=typeof c=="function"?{equalityFn:c}:c,{store:a,subscription:i,getServerState:S,stabilityCheck:y,noopCheck:_}=r();u.useRef(!0);const k=u.useCallback({[t.name](L){return t(L)}}[t.name],[t,y,l]),b=I(i.addNestedSub,a.getState,S||a.getState,k,o);return u.useDebugValue(b),b}}const ae=Z();var n={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P=Symbol.for("react.element"),N=Symbol.for("react.portal"),m=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),h=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),g=Symbol.for("react.context"),O=Symbol.for("react.server_context"),v=Symbol.for("react.forward_ref"),$=Symbol.for("react.suspense"),w=Symbol.for("react.suspense_list"),E=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),ee=Symbol.for("react.offscreen"),j;j=Symbol.for("react.module.reference");function f(e){if(typeof e=="object"&&e!==null){var r=e.$$typeof;switch(r){case P:switch(e=e.type,e){case m:case h:case x:case $:case w:return e;default:switch(e=e&&e.$$typeof,e){case O:case g:case v:case M:case E:case C:return e;default:return r}}case N:return r}}}n.ContextConsumer=g;n.ContextProvider=C;n.Element=P;n.ForwardRef=v;n.Fragment=m;n.Lazy=M;n.Memo=E;n.Portal=N;n.Profiler=h;n.StrictMode=x;n.Suspense=$;n.SuspenseList=w;n.isAsyncMode=function(){return!1};n.isConcurrentMode=function(){return!1};n.isContextConsumer=function(e){return f(e)===g};n.isContextProvider=function(e){return f(e)===C};n.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===P};n.isForwardRef=function(e){return f(e)===v};n.isFragment=function(e){return f(e)===m};n.isLazy=function(e){return f(e)===M};n.isMemo=function(e){return f(e)===E};n.isPortal=function(e){return f(e)===N};n.isProfiler=function(e){return f(e)===h};n.isStrictMode=function(e){return f(e)===x};n.isSuspense=function(e){return f(e)===$};n.isSuspenseList=function(e){return f(e)===w};n.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===m||e===h||e===x||e===$||e===w||e===ee||typeof e=="object"&&e!==null&&(e.$$typeof===M||e.$$typeof===E||e.$$typeof===C||e.$$typeof===g||e.$$typeof===v||e.$$typeof===j||e.getModuleId!==void 0)};n.typeOf=f;function te(){const e=G();let r=null,s=null;return{clear(){r=null,s=null},notify(){e(()=>{let t=r;for(;t;)t.callback(),t=t.next})},get(){let t=[],c=r;for(;c;)t.push(c),c=c.next;return t},subscribe(t){let c=!0,o=s={callback:t,next:null,prev:s};return o.prev?o.prev.next=o:r=o,function(){!c||r===null||(c=!1,o.next?o.next.prev=o.prev:s=o.prev,o.prev?o.prev.next=o.next:r=o.next)}}}}const V={notify(){},get:()=>[]};function ne(e,r){let s,t=V,c=0,o=!1;function l(L){S();const U=t.subscribe(L);let z=!1;return()=>{z||(z=!0,U(),y())}}function p(){t.notify()}function a(){b.onStateChange&&b.onStateChange()}function i(){return o}function S(){c++,s||(s=r?r.addNestedSub(a):e.subscribe(a),t=te())}function y(){c--,s&&c===0&&(s(),s=void 0,t.clear(),t=V)}function _(){o||(o=!0,S())}function k(){o&&(o=!1,y())}const b={addNestedSub:l,notifyNestedSubs:p,handleChangeWrapper:a,isSubscribed:i,trySubscribe:_,tryUnsubscribe:k,getListeners:()=>t};return b}const re=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",oe=re?u.useLayoutEffect:u.useEffect;function de({store:e,context:r,children:s,serverState:t,stabilityCheck:c="once",noopCheck:o="once"}){const l=u.useMemo(()=>{const i=ne(e);return{store:e,subscription:i,getServerState:t?()=>t:void 0,stabilityCheck:c,noopCheck:o}},[e,t,c,o]),p=u.useMemo(()=>e.getState(),[e]);oe(()=>{const{subscription:i}=l;return i.onStateChange=i.notifyNestedSubs,i.trySubscribe(),p!==e.getState()&&i.notifyNestedSubs(),()=>{i.tryUnsubscribe(),i.onStateChange=void 0}},[l,p]);const a=r||d;return u.createElement(a.Provider,{value:l},s)}function B(e=d){const r=e===d?H:R(e);return function(){const{store:t}=r();return t}}const se=B();function ce(e=d){const r=e===d?se:B(e);return function(){return r().dispatch}}const be=ce();X(q.useSyncExternalStoreWithSelector);K(W.unstable_batchedUpdates);export{de as P,ae as a,be as u};
