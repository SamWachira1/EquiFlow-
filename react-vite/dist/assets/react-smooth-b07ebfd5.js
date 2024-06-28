import{r as T,R as pt}from"./react-c619c8b3.js";import{P as f}from"./prop-types-75a17b13.js";import{d as bt}from"./fast-equals-a0711cdd.js";function dt(t){typeof requestAnimationFrame<"u"&&requestAnimationFrame(t)}function L(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=-1,i=function r(o){n<0&&(n=o),o-n>e?(t(o),n=-1):dt(r)};requestAnimationFrame(i)}function U(t){"@babel/helpers - typeof";return U=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U(t)}function vt(t){return At(t)||St(t)||gt(t)||ht()}function ht(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gt(t,e){if(t){if(typeof t=="string")return V(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return V(t,e)}}function V(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function St(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function At(t){if(Array.isArray(t))return t}function Ot(){var t={},e=function(){return null},n=!1,i=function r(o){if(!n){if(Array.isArray(o)){if(!o.length)return;var a=o,c=vt(a),u=c[0],s=c.slice(1);if(typeof u=="number"){L(r.bind(null,s),u);return}r(u),L(r.bind(null,s));return}U(o)==="object"&&(t=o,e(t)),typeof o=="function"&&o()}};return{stop:function(){n=!0},start:function(o){n=!1,i(o)},subscribe:function(o){return e=o,function(){e=function(){return null}}}}}function C(t){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(t)}function Y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function Z(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Y(Object(n),!0).forEach(function(i){it(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function it(t,e,n){return e=jt(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function jt(t){var e=wt(t,"string");return C(e)==="symbol"?e:String(e)}function wt(t,e){if(C(t)!=="object"||t===null)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(C(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var _t=function(e,n){return[Object.keys(e),Object.keys(n)].reduce(function(i,r){return i.filter(function(o){return r.includes(o)})})},Pt=function(e){return e},Tt=function(e){return e.replace(/([A-Z])/g,function(n){return"-".concat(n.toLowerCase())})},$=function(e,n){return Object.keys(n).reduce(function(i,r){return Z(Z({},i),{},it({},r,e(r,n[r])))},{})},G=function(e,n,i){return e.map(function(r){return"".concat(Tt(r)," ").concat(n,"ms ").concat(i)}).join(",")};function Et(t,e){return It(t)||Ct(t,e)||ot(t,e)||$t()}function $t(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ct(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var i,r,o,a,c=[],u=!0,s=!1;try{if(o=(n=n.call(t)).next,e===0){if(Object(n)!==n)return;u=!1}else for(;!(u=(i=o.call(n)).done)&&(c.push(i.value),c.length!==e);u=!0);}catch(l){s=!0,r=l}finally{try{if(!u&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return c}}function It(t){if(Array.isArray(t))return t}function Rt(t){return Nt(t)||Dt(t)||ot(t)||Bt()}function Bt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ot(t,e){if(t){if(typeof t=="string")return F(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(t,e)}}function Dt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Nt(t){if(Array.isArray(t))return F(t)}function F(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var R=1e-4,at=function(e,n){return[0,3*e,3*n-6*e,3*e-3*n+1]},ut=function(e,n){return e.map(function(i,r){return i*Math.pow(n,r)}).reduce(function(i,r){return i+r})},Q=function(e,n){return function(i){var r=at(e,n);return ut(r,i)}},Ut=function(e,n){return function(i){var r=at(e,n),o=[].concat(Rt(r.map(function(a,c){return a*c}).slice(1)),[0]);return ut(o,i)}},X=function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];var r=n[0],o=n[1],a=n[2],c=n[3];if(n.length===1)switch(n[0]){case"linear":r=0,o=0,a=1,c=1;break;case"ease":r=.25,o=.1,a=.25,c=1;break;case"ease-in":r=.42,o=0,a=1,c=1;break;case"ease-out":r=.42,o=0,a=.58,c=1;break;case"ease-in-out":r=0,o=0,a=.58,c=1;break;default:{var u=n[0].split("(");if(u[0]==="cubic-bezier"&&u[1].split(")")[0].split(",").length===4){var s=u[1].split(")")[0].split(",").map(function(y){return parseFloat(y)}),l=Et(s,4);r=l[0],o=l[1],a=l[2],c=l[3]}}}var b=Q(r,a),p=Q(o,c),v=Ut(r,a),S=function(m){return m>1?1:m<0?0:m},d=function(m){for(var h=m>1?1:m,A=h,j=0;j<8;++j){var w=b(A)-h,_=v(A);if(Math.abs(w-h)<R||_<R)return p(A);A=S(A-w/_)}return p(A)};return d.isStepper=!1,d},Ft=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.stiff,i=n===void 0?100:n,r=e.damping,o=r===void 0?8:r,a=e.dt,c=a===void 0?17:a,u=function(l,b,p){var v=-(l-b)*i,S=p*o,d=p+(v-S)*c/1e3,y=p*c/1e3+l;return Math.abs(y-b)<R&&Math.abs(d)<R?[b,0]:[y,d]};return u.isStepper=!0,u.dt=c,u},kt=function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];var r=n[0];if(typeof r=="string")switch(r){case"ease":case"ease-in-out":case"ease-out":case"ease-in":case"linear":return X(r);case"spring":return Ft();default:if(r.split("(")[0]==="cubic-bezier")return X(r)}return typeof r=="function"?r:null};function I(t){"@babel/helpers - typeof";return I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(t)}function tt(t){return Wt(t)||Mt(t)||ct(t)||zt()}function zt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Mt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Wt(t){if(Array.isArray(t))return z(t)}function et(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?et(Object(n),!0).forEach(function(i){k(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):et(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function k(t,e,n){return e=Jt(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Jt(t){var e=Kt(t,"string");return I(e)==="symbol"?e:String(e)}function Kt(t,e){if(I(t)!=="object"||t===null)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(I(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function qt(t,e){return Lt(t)||Ht(t,e)||ct(t,e)||xt()}function xt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ct(t,e){if(t){if(typeof t=="string")return z(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return z(t,e)}}function z(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function Ht(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var i,r,o,a,c=[],u=!0,s=!1;try{if(o=(n=n.call(t)).next,e===0){if(Object(n)!==n)return;u=!1}else for(;!(u=(i=o.call(n)).done)&&(c.push(i.value),c.length!==e);u=!0);}catch(l){s=!0,r=l}finally{try{if(!u&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return c}}function Lt(t){if(Array.isArray(t))return t}var B=function(e,n,i){return e+(n-e)*i},M=function(e){var n=e.from,i=e.to;return n!==i},Vt=function t(e,n,i){var r=$(function(o,a){if(M(a)){var c=e(a.from,a.to,a.velocity),u=qt(c,2),s=u[0],l=u[1];return g(g({},a),{},{from:s,velocity:l})}return a},n);return i<1?$(function(o,a){return M(a)?g(g({},a),{},{velocity:B(a.velocity,r[o].velocity,i),from:B(a.from,r[o].from,i)}):a},n):t(e,r,i-1)};const Yt=function(t,e,n,i,r){var o=_t(t,e),a=o.reduce(function(y,m){return g(g({},y),{},k({},m,[t[m],e[m]]))},{}),c=o.reduce(function(y,m){return g(g({},y),{},k({},m,{from:t[m],velocity:0,to:e[m]}))},{}),u=-1,s,l,b=function(){return null},p=function(){return $(function(m,h){return h.from},c)},v=function(){return!Object.values(c).filter(M).length},S=function(m){s||(s=m);var h=m-s,A=h/n.dt;c=Vt(n,c,A),r(g(g(g({},t),e),p())),s=m,v()||(u=requestAnimationFrame(b))},d=function(m){l||(l=m);var h=(m-l)/i,A=$(function(w,_){return B.apply(void 0,tt(_).concat([n(h)]))},a);if(r(g(g(g({},t),e),A)),h<1)u=requestAnimationFrame(b);else{var j=$(function(w,_){return B.apply(void 0,tt(_).concat([n(1)]))},a);r(g(g(g({},t),e),j))}};return b=n.isStepper?S:d,function(){return requestAnimationFrame(b),function(){cancelAnimationFrame(u)}}};function P(t){"@babel/helpers - typeof";return P=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(t)}var Zt=["children","begin","duration","attributeName","easing","isActive","steps","from","to","canBegin","onAnimationEnd","shouldReAnimate","onAnimationReStart"];function Gt(t,e){if(t==null)return{};var n=Qt(t,e),i,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)i=o[r],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(t,i)&&(n[i]=t[i])}return n}function Qt(t,e){if(t==null)return{};var n={},i=Object.keys(t),r,o;for(o=0;o<i.length;o++)r=i[o],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function N(t){return ne(t)||ee(t)||te(t)||Xt()}function Xt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function te(t,e){if(t){if(typeof t=="string")return W(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return W(t,e)}}function ee(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ne(t){if(Array.isArray(t))return W(t)}function W(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function nt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?nt(Object(n),!0).forEach(function(i){E(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):nt(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function E(t,e,n){return e=ft(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function re(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function rt(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,ft(i.key),i)}}function ie(t,e,n){return e&&rt(t.prototype,e),n&&rt(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function ft(t){var e=oe(t,"string");return P(e)==="symbol"?e:String(e)}function oe(t,e){if(P(t)!=="object"||t===null)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(P(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function ae(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&J(t,e)}function J(t,e){return J=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},J(t,e)}function ue(t){var e=ce();return function(){var i=D(t),r;if(e){var o=D(this).constructor;r=Reflect.construct(i,arguments,o)}else r=i.apply(this,arguments);return K(this,r)}}function K(t,e){if(e&&(P(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return q(t)}function q(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ce(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function D(t){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},D(t)}var x=function(t){ae(n,t);var e=ue(n);function n(i,r){var o;re(this,n),o=e.call(this,i,r);var a=o.props,c=a.isActive,u=a.attributeName,s=a.from,l=a.to,b=a.steps,p=a.children,v=a.duration;if(o.handleStyleChange=o.handleStyleChange.bind(q(o)),o.changeStyle=o.changeStyle.bind(q(o)),!c||v<=0)return o.state={style:{}},typeof p=="function"&&(o.state={style:l}),K(o);if(b&&b.length)o.state={style:b[0].style};else if(s){if(typeof p=="function")return o.state={style:s},K(o);o.state={style:u?E({},u,s):s}}else o.state={style:{}};return o}return ie(n,[{key:"componentDidMount",value:function(){var r=this.props,o=r.isActive,a=r.canBegin;this.mounted=!0,!(!o||!a)&&this.runAnimation(this.props)}},{key:"componentDidUpdate",value:function(r){var o=this.props,a=o.isActive,c=o.canBegin,u=o.attributeName,s=o.shouldReAnimate,l=o.to,b=o.from,p=this.state.style;if(c){if(!a){var v={style:u?E({},u,l):l};this.state&&p&&(u&&p[u]!==l||!u&&p!==l)&&this.setState(v);return}if(!(bt(r.to,l)&&r.canBegin&&r.isActive)){var S=!r.canBegin||!r.isActive;this.manager&&this.manager.stop(),this.stopJSAnimation&&this.stopJSAnimation();var d=S||s?b:r.to;if(this.state&&p){var y={style:u?E({},u,d):d};(u&&p[u]!==d||!u&&p!==d)&&this.setState(y)}this.runAnimation(O(O({},this.props),{},{from:d,begin:0}))}}}},{key:"componentWillUnmount",value:function(){this.mounted=!1;var r=this.props.onAnimationEnd;this.unSubscribe&&this.unSubscribe(),this.manager&&(this.manager.stop(),this.manager=null),this.stopJSAnimation&&this.stopJSAnimation(),r&&r()}},{key:"handleStyleChange",value:function(r){this.changeStyle(r)}},{key:"changeStyle",value:function(r){this.mounted&&this.setState({style:r})}},{key:"runJSAnimation",value:function(r){var o=this,a=r.from,c=r.to,u=r.duration,s=r.easing,l=r.begin,b=r.onAnimationEnd,p=r.onAnimationStart,v=Yt(a,c,kt(s),u,this.changeStyle),S=function(){o.stopJSAnimation=v()};this.manager.start([p,l,S,u,b])}},{key:"runStepAnimation",value:function(r){var o=this,a=r.steps,c=r.begin,u=r.onAnimationStart,s=a[0],l=s.style,b=s.duration,p=b===void 0?0:b,v=function(d,y,m){if(m===0)return d;var h=y.duration,A=y.easing,j=A===void 0?"ease":A,w=y.style,_=y.properties,st=y.onAnimationEnd,H=m>0?a[m-1]:y,lt=_||Object.keys(w);if(typeof j=="function"||j==="spring")return[].concat(N(d),[o.runJSAnimation.bind(o,{from:H.style,to:w,duration:h,easing:j}),h]);var yt=G(lt,h,j),mt=O(O(O({},H.style),w),{},{transition:yt});return[].concat(N(d),[mt,h,st]).filter(Pt)};return this.manager.start([u].concat(N(a.reduce(v,[l,Math.max(p,c)])),[r.onAnimationEnd]))}},{key:"runAnimation",value:function(r){this.manager||(this.manager=Ot());var o=r.begin,a=r.duration,c=r.attributeName,u=r.to,s=r.easing,l=r.onAnimationStart,b=r.onAnimationEnd,p=r.steps,v=r.children,S=this.manager;if(this.unSubscribe=S.subscribe(this.handleStyleChange),typeof s=="function"||typeof v=="function"||s==="spring"){this.runJSAnimation(r);return}if(p.length>1){this.runStepAnimation(r);return}var d=c?E({},c,u):u,y=G(Object.keys(d),a,s);S.start([l,o,O(O({},d),{},{transition:y}),a,b])}},{key:"render",value:function(){var r=this.props,o=r.children;r.begin;var a=r.duration;r.attributeName,r.easing;var c=r.isActive;r.steps,r.from,r.to,r.canBegin,r.onAnimationEnd,r.shouldReAnimate,r.onAnimationReStart;var u=Gt(r,Zt),s=T.Children.count(o),l=this.state.style;if(typeof o=="function")return o(l);if(!c||s===0||a<=0)return o;var b=function(v){var S=v.props,d=S.style,y=d===void 0?{}:d,m=S.className,h=T.cloneElement(v,O(O({},u),{},{style:O(O({},y),l),className:m}));return h};return s===1?b(T.Children.only(o)):pt.createElement("div",null,T.Children.map(o,function(p){return b(p)}))}}]),n}(T.PureComponent);x.displayName="Animate";x.defaultProps={begin:0,duration:1e3,from:"",to:"",attributeName:"",easing:"ease",isActive:!0,canBegin:!0,steps:[],onAnimationEnd:function(){},onAnimationStart:function(){}};x.propTypes={from:f.oneOfType([f.object,f.string]),to:f.oneOfType([f.object,f.string]),attributeName:f.string,duration:f.number,begin:f.number,easing:f.oneOfType([f.string,f.func]),steps:f.arrayOf(f.shape({duration:f.number.isRequired,style:f.object.isRequired,easing:f.oneOfType([f.oneOf(["ease","ease-in","ease-out","ease-in-out","linear"]),f.func]),properties:f.arrayOf("string"),onAnimationEnd:f.func})),children:f.oneOfType([f.node,f.func]),isActive:f.bool,canBegin:f.bool,onAnimationEnd:f.func,shouldReAnimate:f.bool,onAnimationStart:f.func,onAnimationReStart:f.func};f.object,f.object,f.object,f.element;f.object,f.object,f.object,f.oneOfType([f.array,f.element]),f.any;export{x as A};
