(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function fi(t,e){const n=Object.create(null),r=t.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return e?s=>!!n[s.toLowerCase()]:s=>!!n[s]}const ae={},dn=[],je=()=>{},Pu=()=>!1,Ou=/^on[^a-z]/,Wr=t=>Ou.test(t),hi=t=>t.startsWith("onUpdate:"),ve=Object.assign,pi=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},ku=Object.prototype.hasOwnProperty,q=(t,e)=>ku.call(t,e),U=Array.isArray,fn=t=>Qn(t)==="[object Map]",zr=t=>Qn(t)==="[object Set]",no=t=>Qn(t)==="[object Date]",V=t=>typeof t=="function",ge=t=>typeof t=="string",Bn=t=>typeof t=="symbol",oe=t=>t!==null&&typeof t=="object",Ka=t=>oe(t)&&V(t.then)&&V(t.catch),qa=Object.prototype.toString,Qn=t=>qa.call(t),Nu=t=>Qn(t).slice(8,-1),Ga=t=>Qn(t)==="[object Object]",gi=t=>ge(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,mr=fi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Kr=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},xu=/-(\w)/g,tt=Kr(t=>t.replace(xu,(e,n)=>n?n.toUpperCase():"")),$u=/\B([A-Z])/g,In=Kr(t=>t.replace($u,"-$1").toLowerCase()),qr=Kr(t=>t.charAt(0).toUpperCase()+t.slice(1)),fs=Kr(t=>t?`on${qr(t)}`:""),jn=(t,e)=>!Object.is(t,e),_r=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Sr=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},Us=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ro;const Fs=()=>ro||(ro=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function hn(t){if(U(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ge(r)?Uu(r):hn(r);if(s)for(const i in s)e[i]=s[i]}return e}else{if(ge(t))return t;if(oe(t))return t}}const Du=/;(?![^(]*\))/g,Lu=/:([^]+)/,Mu=/\/\*[^]*?\*\//g;function Uu(t){const e={};return t.replace(Mu,"").split(Du).forEach(n=>{if(n){const r=n.split(Lu);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Gr(t){let e="";if(ge(t))e=t;else if(U(t))for(let n=0;n<t.length;n++){const r=Gr(t[n]);r&&(e+=r+" ")}else if(oe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Fu="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Bu=fi(Fu);function Ja(t){return!!t||t===""}function ju(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=Jr(t[r],e[r]);return n}function Jr(t,e){if(t===e)return!0;let n=no(t),r=no(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=Bn(t),r=Bn(e),n||r)return t===e;if(n=U(t),r=U(e),n||r)return n&&r?ju(t,e):!1;if(n=oe(t),r=oe(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const c=t.hasOwnProperty(o),a=e.hasOwnProperty(o);if(c&&!a||!c&&a||!Jr(t[o],e[o]))return!1}}return String(t)===String(e)}function Ya(t,e){return t.findIndex(n=>Jr(n,e))}const Ke=t=>ge(t)?t:t==null?"":U(t)||oe(t)&&(t.toString===qa||!V(t.toString))?JSON.stringify(t,Xa,2):String(t),Xa=(t,e)=>e&&e.__v_isRef?Xa(t,e.value):fn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s])=>(n[`${r} =>`]=s,n),{})}:zr(e)?{[`Set(${e.size})`]:[...e.values()]}:oe(e)&&!U(e)&&!Ga(e)?String(e):e;let Ue;class Qa{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Ue,!e&&Ue&&(this.index=(Ue.scopes||(Ue.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=Ue;try{return Ue=this,e()}finally{Ue=n}}}on(){Ue=this}off(){Ue=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function Vu(t){return new Qa(t)}function Hu(t,e=Ue){e&&e.active&&e.effects.push(t)}function Wu(){return Ue}const mi=t=>{const e=new Set(t);return e.w=0,e.n=0,e},Za=t=>(t.w&Pt)>0,ec=t=>(t.n&Pt)>0,zu=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=Pt},Ku=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const s=e[r];Za(s)&&!ec(s)?s.delete(t):e[n++]=s,s.w&=~Pt,s.n&=~Pt}e.length=n}},Bs=new WeakMap;let On=0,Pt=1;const js=30;let Fe;const Ht=Symbol(""),Vs=Symbol("");class _i{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Hu(this,r)}run(){if(!this.active)return this.fn();let e=Fe,n=Tt;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=Fe,Fe=this,Tt=!0,Pt=1<<++On,On<=js?zu(this):so(this),this.fn()}finally{On<=js&&Ku(this),Pt=1<<--On,Fe=this.parent,Tt=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){Fe===this?this.deferStop=!0:this.active&&(so(this),this.onStop&&this.onStop(),this.active=!1)}}function so(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let Tt=!0;const tc=[];function En(){tc.push(Tt),Tt=!1}function Tn(){const t=tc.pop();Tt=t===void 0?!0:t}function Se(t,e,n){if(Tt&&Fe){let r=Bs.get(t);r||Bs.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=mi()),nc(s)}}function nc(t,e){let n=!1;On<=js?ec(t)||(t.n|=Pt,n=!Za(t)):n=!t.has(Fe),n&&(t.add(Fe),Fe.deps.push(t))}function ut(t,e,n,r,s,i){const o=Bs.get(t);if(!o)return;let c=[];if(e==="clear")c=[...o.values()];else if(n==="length"&&U(t)){const a=Number(r);o.forEach((l,u)=>{(u==="length"||u>=a)&&c.push(l)})}else switch(n!==void 0&&c.push(o.get(n)),e){case"add":U(t)?gi(n)&&c.push(o.get("length")):(c.push(o.get(Ht)),fn(t)&&c.push(o.get(Vs)));break;case"delete":U(t)||(c.push(o.get(Ht)),fn(t)&&c.push(o.get(Vs)));break;case"set":fn(t)&&c.push(o.get(Ht));break}if(c.length===1)c[0]&&Hs(c[0]);else{const a=[];for(const l of c)l&&a.push(...l);Hs(mi(a))}}function Hs(t,e){const n=U(t)?t:[...t];for(const r of n)r.computed&&io(r);for(const r of n)r.computed||io(r)}function io(t,e){(t!==Fe||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const qu=fi("__proto__,__v_isRef,__isVue"),rc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Bn)),Gu=vi(),Ju=vi(!1,!0),Yu=vi(!0),oo=Xu();function Xu(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=J(this);for(let i=0,o=this.length;i<o;i++)Se(r,"get",i+"");const s=r[e](...n);return s===-1||s===!1?r[e](...n.map(J)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){En();const r=J(this)[e].apply(this,n);return Tn(),r}}),t}function Qu(t){const e=J(this);return Se(e,"has",t),e.hasOwnProperty(t)}function vi(t=!1,e=!1){return function(r,s,i){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_isShallow")return e;if(s==="__v_raw"&&i===(t?e?pd:cc:e?ac:oc).get(r))return r;const o=U(r);if(!t){if(o&&q(oo,s))return Reflect.get(oo,s,i);if(s==="hasOwnProperty")return Qu}const c=Reflect.get(r,s,i);return(Bn(s)?rc.has(s):qu(s))||(t||Se(r,"get",s),e)?c:pe(c)?o&&gi(s)?c:c.value:oe(c)?t?uc(c):dt(c):c}}const Zu=sc(),ed=sc(!0);function sc(t=!1){return function(n,r,s,i){let o=n[r];if(Gt(o)&&pe(o)&&!pe(s))return!1;if(!t&&(!Ar(s)&&!Gt(s)&&(o=J(o),s=J(s)),!U(n)&&pe(o)&&!pe(s)))return o.value=s,!0;const c=U(n)&&gi(r)?Number(r)<n.length:q(n,r),a=Reflect.set(n,r,s,i);return n===J(i)&&(c?jn(s,o)&&ut(n,"set",r,s):ut(n,"add",r,s)),a}}function td(t,e){const n=q(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&ut(t,"delete",e,void 0),r}function nd(t,e){const n=Reflect.has(t,e);return(!Bn(e)||!rc.has(e))&&Se(t,"has",e),n}function rd(t){return Se(t,"iterate",U(t)?"length":Ht),Reflect.ownKeys(t)}const ic={get:Gu,set:Zu,deleteProperty:td,has:nd,ownKeys:rd},sd={get:Yu,set(t,e){return!0},deleteProperty(t,e){return!0}},id=ve({},ic,{get:Ju,set:ed}),yi=t=>t,Yr=t=>Reflect.getPrototypeOf(t);function ar(t,e,n=!1,r=!1){t=t.__v_raw;const s=J(t),i=J(e);n||(e!==i&&Se(s,"get",e),Se(s,"get",i));const{has:o}=Yr(s),c=r?yi:n?Ei:Vn;if(o.call(s,e))return c(t.get(e));if(o.call(s,i))return c(t.get(i));t!==s&&t.get(e)}function cr(t,e=!1){const n=this.__v_raw,r=J(n),s=J(t);return e||(t!==s&&Se(r,"has",t),Se(r,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)}function lr(t,e=!1){return t=t.__v_raw,!e&&Se(J(t),"iterate",Ht),Reflect.get(t,"size",t)}function ao(t){t=J(t);const e=J(this);return Yr(e).has.call(e,t)||(e.add(t),ut(e,"add",t,t)),this}function co(t,e){e=J(e);const n=J(this),{has:r,get:s}=Yr(n);let i=r.call(n,t);i||(t=J(t),i=r.call(n,t));const o=s.call(n,t);return n.set(t,e),i?jn(e,o)&&ut(n,"set",t,e):ut(n,"add",t,e),this}function lo(t){const e=J(this),{has:n,get:r}=Yr(e);let s=n.call(e,t);s||(t=J(t),s=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return s&&ut(e,"delete",t,void 0),i}function uo(){const t=J(this),e=t.size!==0,n=t.clear();return e&&ut(t,"clear",void 0,void 0),n}function ur(t,e){return function(r,s){const i=this,o=i.__v_raw,c=J(o),a=e?yi:t?Ei:Vn;return!t&&Se(c,"iterate",Ht),o.forEach((l,u)=>r.call(s,a(l),a(u),i))}}function dr(t,e,n){return function(...r){const s=this.__v_raw,i=J(s),o=fn(i),c=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,l=s[t](...r),u=n?yi:e?Ei:Vn;return!e&&Se(i,"iterate",a?Vs:Ht),{next(){const{value:f,done:p}=l.next();return p?{value:f,done:p}:{value:c?[u(f[0]),u(f[1])]:u(f),done:p}},[Symbol.iterator](){return this}}}}function gt(t){return function(...e){return t==="delete"?!1:this}}function od(){const t={get(i){return ar(this,i)},get size(){return lr(this)},has:cr,add:ao,set:co,delete:lo,clear:uo,forEach:ur(!1,!1)},e={get(i){return ar(this,i,!1,!0)},get size(){return lr(this)},has:cr,add:ao,set:co,delete:lo,clear:uo,forEach:ur(!1,!0)},n={get(i){return ar(this,i,!0)},get size(){return lr(this,!0)},has(i){return cr.call(this,i,!0)},add:gt("add"),set:gt("set"),delete:gt("delete"),clear:gt("clear"),forEach:ur(!0,!1)},r={get(i){return ar(this,i,!0,!0)},get size(){return lr(this,!0)},has(i){return cr.call(this,i,!0)},add:gt("add"),set:gt("set"),delete:gt("delete"),clear:gt("clear"),forEach:ur(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=dr(i,!1,!1),n[i]=dr(i,!0,!1),e[i]=dr(i,!1,!0),r[i]=dr(i,!0,!0)}),[t,n,e,r]}const[ad,cd,ld,ud]=od();function wi(t,e){const n=e?t?ud:ld:t?cd:ad;return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(q(n,s)&&s in r?n:r,s,i)}const dd={get:wi(!1,!1)},fd={get:wi(!1,!0)},hd={get:wi(!0,!1)},oc=new WeakMap,ac=new WeakMap,cc=new WeakMap,pd=new WeakMap;function gd(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function md(t){return t.__v_skip||!Object.isExtensible(t)?0:gd(Nu(t))}function dt(t){return Gt(t)?t:bi(t,!1,ic,dd,oc)}function lc(t){return bi(t,!1,id,fd,ac)}function uc(t){return bi(t,!0,sd,hd,cc)}function bi(t,e,n,r,s){if(!oe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=md(t);if(o===0)return t;const c=new Proxy(t,o===2?r:n);return s.set(t,c),c}function Wt(t){return Gt(t)?Wt(t.__v_raw):!!(t&&t.__v_isReactive)}function Gt(t){return!!(t&&t.__v_isReadonly)}function Ar(t){return!!(t&&t.__v_isShallow)}function dc(t){return Wt(t)||Gt(t)}function J(t){const e=t&&t.__v_raw;return e?J(e):t}function Ii(t){return Sr(t,"__v_skip",!0),t}const Vn=t=>oe(t)?dt(t):t,Ei=t=>oe(t)?uc(t):t;function fc(t){Tt&&Fe&&(t=J(t),nc(t.dep||(t.dep=mi())))}function hc(t,e){t=J(t);const n=t.dep;n&&Hs(n)}function pe(t){return!!(t&&t.__v_isRef===!0)}function ie(t){return pc(t,!1)}function _d(t){return pc(t,!0)}function pc(t,e){return pe(t)?t:new vd(t,e)}class vd{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:J(e),this._value=n?e:Vn(e)}get value(){return fc(this),this._value}set value(e){const n=this.__v_isShallow||Ar(e)||Gt(e);e=n?e:J(e),jn(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:Vn(e),hc(this))}}function M(t){return pe(t)?t.value:t}const yd={get:(t,e,n)=>M(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return pe(s)&&!pe(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function gc(t){return Wt(t)?t:new Proxy(t,yd)}class wd{constructor(e,n,r,s){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new _i(e,()=>{this._dirty||(this._dirty=!0,hc(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const e=J(this);return fc(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function bd(t,e,n=!1){let r,s;const i=V(t);return i?(r=t,s=je):(r=t.get,s=t.set),new wd(r,s,i||!s,n)}function Rt(t,e,n,r){let s;try{s=r?t(...r):t()}catch(i){Xr(i,e,n)}return s}function Ve(t,e,n,r){if(V(t)){const i=Rt(t,e,n,r);return i&&Ka(i)&&i.catch(o=>{Xr(o,e,n)}),i}const s=[];for(let i=0;i<t.length;i++)s.push(Ve(t[i],e,n,r));return s}function Xr(t,e,n,r=!0){const s=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,c=n;for(;i;){const l=i.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](t,o,c)===!1)return}i=i.parent}const a=e.appContext.config.errorHandler;if(a){Rt(a,null,10,[t,o,c]);return}}Id(t,n,s,r)}function Id(t,e,n,r=!0){console.error(t)}let Hn=!1,Ws=!1;const we=[];let Je=0;const pn=[];let ot=null,Lt=0;const mc=Promise.resolve();let Ti=null;function Cr(t){const e=Ti||mc;return t?e.then(this?t.bind(this):t):e}function Ed(t){let e=Je+1,n=we.length;for(;e<n;){const r=e+n>>>1;Wn(we[r])<t?e=r+1:n=r}return e}function Ri(t){(!we.length||!we.includes(t,Hn&&t.allowRecurse?Je+1:Je))&&(t.id==null?we.push(t):we.splice(Ed(t.id),0,t),_c())}function _c(){!Hn&&!Ws&&(Ws=!0,Ti=mc.then(yc))}function Td(t){const e=we.indexOf(t);e>Je&&we.splice(e,1)}function Rd(t){U(t)?pn.push(...t):(!ot||!ot.includes(t,t.allowRecurse?Lt+1:Lt))&&pn.push(t),_c()}function fo(t,e=Hn?Je+1:0){for(;e<we.length;e++){const n=we[e];n&&n.pre&&(we.splice(e,1),e--,n())}}function vc(t){if(pn.length){const e=[...new Set(pn)];if(pn.length=0,ot){ot.push(...e);return}for(ot=e,ot.sort((n,r)=>Wn(n)-Wn(r)),Lt=0;Lt<ot.length;Lt++)ot[Lt]();ot=null,Lt=0}}const Wn=t=>t.id==null?1/0:t.id,Sd=(t,e)=>{const n=Wn(t)-Wn(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function yc(t){Ws=!1,Hn=!0,we.sort(Sd);const e=je;try{for(Je=0;Je<we.length;Je++){const n=we[Je];n&&n.active!==!1&&Rt(n,null,14)}}finally{Je=0,we.length=0,vc(),Hn=!1,Ti=null,(we.length||pn.length)&&yc()}}function Ad(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||ae;let s=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:p}=r[u]||ae;p&&(s=n.map(m=>ge(m)?m.trim():m)),f&&(s=n.map(Us))}let c,a=r[c=fs(e)]||r[c=fs(tt(e))];!a&&i&&(a=r[c=fs(In(e))]),a&&Ve(a,t,6,s);const l=r[c+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,Ve(l,t,6,s)}}function wc(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},c=!1;if(!V(t)){const a=l=>{const u=wc(l,e,!0);u&&(c=!0,ve(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!i&&!c?(oe(t)&&r.set(t,null),null):(U(i)?i.forEach(a=>o[a]=null):ve(o,i),oe(t)&&r.set(t,o),o)}function Qr(t,e){return!t||!Wr(e)?!1:(e=e.slice(2).replace(/Once$/,""),q(t,e[0].toLowerCase()+e.slice(1))||q(t,In(e))||q(t,e))}let Ce=null,Zr=null;function Pr(t){const e=Ce;return Ce=t,Zr=t&&t.type.__scopeId||null,e}function Cd(t){Zr=t}function Pd(){Zr=null}function bc(t,e=Ce,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Eo(-1);const i=Pr(e);let o;try{o=t(...s)}finally{Pr(i),r._d&&Eo(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function hs(t){const{type:e,vnode:n,proxy:r,withProxy:s,props:i,propsOptions:[o],slots:c,attrs:a,emit:l,render:u,renderCache:f,data:p,setupState:m,ctx:_,inheritAttrs:y}=t;let T,S;const x=Pr(t);try{if(n.shapeFlag&4){const O=s||r;T=Ge(u.call(O,O,f,i,m,p,_)),S=a}else{const O=e;T=Ge(O.length>1?O(i,{attrs:a,slots:c,emit:l}):O(i,null)),S=e.props?a:Od(a)}}catch(O){Dn.length=0,Xr(O,t,1),T=he(Jt)}let H=T;if(S&&y!==!1){const O=Object.keys(S),{shapeFlag:j}=H;O.length&&j&7&&(o&&O.some(hi)&&(S=kd(S,o)),H=_n(H,S))}return n.dirs&&(H=_n(H),H.dirs=H.dirs?H.dirs.concat(n.dirs):n.dirs),n.transition&&(H.transition=n.transition),T=H,Pr(x),T}const Od=t=>{let e;for(const n in t)(n==="class"||n==="style"||Wr(n))&&((e||(e={}))[n]=t[n]);return e},kd=(t,e)=>{const n={};for(const r in t)(!hi(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Nd(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:c,patchFlag:a}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return r?ho(r,o,l):!!o;if(a&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const p=u[f];if(o[p]!==r[p]&&!Qr(l,p))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===o?!1:r?o?ho(r,o,l):!0:!!o;return!1}function ho(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!Qr(n,i))return!0}return!1}function xd({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const $d=t=>t.__isSuspense;function Dd(t,e){e&&e.pendingBranch?U(t)?e.effects.push(...t):e.effects.push(t):Rd(t)}const fr={};function Xe(t,e,n){return Ic(t,e,n)}function Ic(t,e,{immediate:n,deep:r,flush:s,onTrack:i,onTrigger:o}=ae){var c;const a=Wu()===((c=_e)==null?void 0:c.scope)?_e:null;let l,u=!1,f=!1;if(pe(t)?(l=()=>t.value,u=Ar(t)):Wt(t)?(l=()=>t,r=!0):U(t)?(f=!0,u=t.some(O=>Wt(O)||Ar(O)),l=()=>t.map(O=>{if(pe(O))return O.value;if(Wt(O))return Bt(O);if(V(O))return Rt(O,a,2)})):V(t)?e?l=()=>Rt(t,a,2):l=()=>{if(!(a&&a.isUnmounted))return p&&p(),Ve(t,a,3,[m])}:l=je,e&&r){const O=l;l=()=>Bt(O())}let p,m=O=>{p=x.onStop=()=>{Rt(O,a,4)}},_;if(Kn)if(m=je,e?n&&Ve(e,a,3,[l(),f?[]:void 0,m]):l(),s==="sync"){const O=Pf();_=O.__watcherHandles||(O.__watcherHandles=[])}else return je;let y=f?new Array(t.length).fill(fr):fr;const T=()=>{if(x.active)if(e){const O=x.run();(r||u||(f?O.some((j,W)=>jn(j,y[W])):jn(O,y)))&&(p&&p(),Ve(e,a,3,[O,y===fr?void 0:f&&y[0]===fr?[]:y,m]),y=O)}else x.run()};T.allowRecurse=!!e;let S;s==="sync"?S=T:s==="post"?S=()=>Te(T,a&&a.suspense):(T.pre=!0,a&&(T.id=a.uid),S=()=>Ri(T));const x=new _i(l,S);e?n?T():y=x.run():s==="post"?Te(x.run.bind(x),a&&a.suspense):x.run();const H=()=>{x.stop(),a&&a.scope&&pi(a.scope.effects,x)};return _&&_.push(H),H}function Ld(t,e,n){const r=this.proxy,s=ge(t)?t.includes(".")?Ec(r,t):()=>r[t]:t.bind(r,r);let i;V(e)?i=e:(i=e.handler,n=e);const o=_e;vn(this);const c=Ic(s,i.bind(r),n);return o?vn(o):Kt(),c}function Ec(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function Bt(t,e){if(!oe(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),pe(t))Bt(t.value,e);else if(U(t))for(let n=0;n<t.length;n++)Bt(t[n],e);else if(zr(t)||fn(t))t.forEach(n=>{Bt(n,e)});else if(Ga(t))for(const n in t)Bt(t[n],e);return t}function hr(t,e){const n=Ce;if(n===null)return t;const r=rs(n)||n.proxy,s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[o,c,a,l=ae]=e[i];o&&(V(o)&&(o={mounted:o,updated:o}),o.deep&&Bt(c),s.push({dir:o,instance:r,value:c,oldValue:void 0,arg:a,modifiers:l}))}return t}function xt(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const c=s[o];i&&(c.oldValue=i[o].value);let a=c.dir[r];a&&(En(),Ve(a,n,8,[t.el,c,t,e]),Tn())}}function Zn(t,e){return V(t)?(()=>ve({name:t.name},e,{setup:t}))():t}const vr=t=>!!t.type.__asyncLoader,Tc=t=>t.type.__isKeepAlive;function Md(t,e){Rc(t,"a",e)}function Ud(t,e){Rc(t,"da",e)}function Rc(t,e,n=_e){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(es(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Tc(s.parent.vnode)&&Fd(r,e,n,s),s=s.parent}}function Fd(t,e,n,r){const s=es(e,t,r,!0);Ac(()=>{pi(r[e],s)},n)}function es(t,e,n=_e,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;En(),vn(n);const c=Ve(e,n,t,o);return Kt(),Tn(),c});return r?s.unshift(i):s.push(i),i}}const pt=t=>(e,n=_e)=>(!Kn||t==="sp")&&es(t,(...r)=>e(...r),n),Si=pt("bm"),Bd=pt("m"),jd=pt("bu"),Vd=pt("u"),Sc=pt("bum"),Ac=pt("um"),Hd=pt("sp"),Wd=pt("rtg"),zd=pt("rtc");function Kd(t,e=_e){es("ec",t,e)}const Cc="components";function Pc(t,e){return Gd(Cc,t,!0,e)||t}const qd=Symbol.for("v-ndc");function Gd(t,e,n=!0,r=!1){const s=Ce||_e;if(s){const i=s.type;if(t===Cc){const c=Sf(i,!1);if(c&&(c===e||c===tt(e)||c===qr(tt(e))))return i}const o=po(s[t]||i[t],e)||po(s.appContext[t],e);return!o&&r?i:o}}function po(t,e){return t&&(t[e]||t[tt(e)]||t[qr(tt(e))])}function Jd(t,e,n,r){let s;const i=n&&n[r];if(U(t)||ge(t)){s=new Array(t.length);for(let o=0,c=t.length;o<c;o++)s[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){s=new Array(t);for(let o=0;o<t;o++)s[o]=e(o+1,o,void 0,i&&i[o])}else if(oe(t))if(t[Symbol.iterator])s=Array.from(t,(o,c)=>e(o,c,void 0,i&&i[c]));else{const o=Object.keys(t);s=new Array(o.length);for(let c=0,a=o.length;c<a;c++){const l=o[c];s[c]=e(t[l],l,c,i&&i[c])}}else s=[];return n&&(n[r]=s),s}const zs=t=>t?jc(t)?rs(t)||t.proxy:zs(t.parent):null,$n=ve(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>zs(t.parent),$root:t=>zs(t.root),$emit:t=>t.emit,$options:t=>Ai(t),$forceUpdate:t=>t.f||(t.f=()=>Ri(t.update)),$nextTick:t=>t.n||(t.n=Cr.bind(t.proxy)),$watch:t=>Ld.bind(t)}),ps=(t,e)=>t!==ae&&!t.__isScriptSetup&&q(t,e),Yd={get({_:t},e){const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:c,appContext:a}=t;let l;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(ps(r,e))return o[e]=1,r[e];if(s!==ae&&q(s,e))return o[e]=2,s[e];if((l=t.propsOptions[0])&&q(l,e))return o[e]=3,i[e];if(n!==ae&&q(n,e))return o[e]=4,n[e];Ks&&(o[e]=0)}}const u=$n[e];let f,p;if(u)return e==="$attrs"&&Se(t,"get",e),u(t);if((f=c.__cssModules)&&(f=f[e]))return f;if(n!==ae&&q(n,e))return o[e]=4,n[e];if(p=a.config.globalProperties,q(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return ps(s,e)?(s[e]=n,!0):r!==ae&&q(r,e)?(r[e]=n,!0):q(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let c;return!!n[o]||t!==ae&&q(t,o)||ps(e,o)||(c=i[0])&&q(c,o)||q(r,o)||q($n,o)||q(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:q(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function go(t){return U(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Ks=!0;function Xd(t){const e=Ai(t),n=t.proxy,r=t.ctx;Ks=!1,e.beforeCreate&&mo(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:c,provide:a,inject:l,created:u,beforeMount:f,mounted:p,beforeUpdate:m,updated:_,activated:y,deactivated:T,beforeDestroy:S,beforeUnmount:x,destroyed:H,unmounted:O,render:j,renderTracked:W,renderTriggered:Y,errorCaptured:ue,serverPrefetch:le,expose:Ee,inheritAttrs:ke,components:De,directives:Ne,filters:Nt}=e;if(l&&Qd(l,r,null),o)for(const Z in o){const G=o[Z];V(G)&&(r[Z]=G.bind(n))}if(s){const Z=s.call(n,n);oe(Z)&&(t.data=dt(Z))}if(Ks=!0,i)for(const Z in i){const G=i[Z],Le=V(G)?G.bind(n,n):V(G.get)?G.get.bind(n,n):je,X=!V(G)&&V(G.set)?G.set.bind(n):je,me=K({get:Le,set:X});Object.defineProperty(r,Z,{enumerable:!0,configurable:!0,get:()=>me.value,set:ce=>me.value=ce})}if(c)for(const Z in c)Oc(c[Z],r,n,Z);if(a){const Z=V(a)?a.call(n):a;Reflect.ownKeys(Z).forEach(G=>{zt(G,Z[G])})}u&&mo(u,t,"c");function de(Z,G){U(G)?G.forEach(Le=>Z(Le.bind(n))):G&&Z(G.bind(n))}if(de(Si,f),de(Bd,p),de(jd,m),de(Vd,_),de(Md,y),de(Ud,T),de(Kd,ue),de(zd,W),de(Wd,Y),de(Sc,x),de(Ac,O),de(Hd,le),U(Ee))if(Ee.length){const Z=t.exposed||(t.exposed={});Ee.forEach(G=>{Object.defineProperty(Z,G,{get:()=>n[G],set:Le=>n[G]=Le})})}else t.exposed||(t.exposed={});j&&t.render===je&&(t.render=j),ke!=null&&(t.inheritAttrs=ke),De&&(t.components=De),Ne&&(t.directives=Ne)}function Qd(t,e,n=je){U(t)&&(t=qs(t));for(const r in t){const s=t[r];let i;oe(s)?"default"in s?i=Pe(s.from||r,s.default,!0):i=Pe(s.from||r):i=Pe(s),pe(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function mo(t,e,n){Ve(U(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Oc(t,e,n,r){const s=r.includes(".")?Ec(n,r):()=>n[r];if(ge(t)){const i=e[t];V(i)&&Xe(s,i)}else if(V(t))Xe(s,t.bind(n));else if(oe(t))if(U(t))t.forEach(i=>Oc(i,e,n,r));else{const i=V(t.handler)?t.handler.bind(n):e[t.handler];V(i)&&Xe(s,i,t)}}function Ai(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let a;return c?a=c:!s.length&&!n&&!r?a=e:(a={},s.length&&s.forEach(l=>Or(a,l,o,!0)),Or(a,e,o)),oe(e)&&i.set(e,a),a}function Or(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Or(t,i,n,!0),s&&s.forEach(o=>Or(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const c=Zd[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const Zd={data:_o,props:vo,emits:vo,methods:kn,computed:kn,beforeCreate:Ie,created:Ie,beforeMount:Ie,mounted:Ie,beforeUpdate:Ie,updated:Ie,beforeDestroy:Ie,beforeUnmount:Ie,destroyed:Ie,unmounted:Ie,activated:Ie,deactivated:Ie,errorCaptured:Ie,serverPrefetch:Ie,components:kn,directives:kn,watch:tf,provide:_o,inject:ef};function _o(t,e){return e?t?function(){return ve(V(t)?t.call(this,this):t,V(e)?e.call(this,this):e)}:e:t}function ef(t,e){return kn(qs(t),qs(e))}function qs(t){if(U(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Ie(t,e){return t?[...new Set([].concat(t,e))]:e}function kn(t,e){return t?ve(Object.create(null),t,e):e}function vo(t,e){return t?U(t)&&U(e)?[...new Set([...t,...e])]:ve(Object.create(null),go(t),go(e??{})):e}function tf(t,e){if(!t)return e;if(!e)return t;const n=ve(Object.create(null),t);for(const r in e)n[r]=Ie(t[r],e[r]);return n}function kc(){return{app:null,config:{isNativeTag:Pu,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let nf=0;function rf(t,e){return function(r,s=null){V(r)||(r=ve({},r)),s!=null&&!oe(s)&&(s=null);const i=kc(),o=new Set;let c=!1;const a=i.app={_uid:nf++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Of,get config(){return i.config},set config(l){},use(l,...u){return o.has(l)||(l&&V(l.install)?(o.add(l),l.install(a,...u)):V(l)&&(o.add(l),l(a,...u))),a},mixin(l){return i.mixins.includes(l)||i.mixins.push(l),a},component(l,u){return u?(i.components[l]=u,a):i.components[l]},directive(l,u){return u?(i.directives[l]=u,a):i.directives[l]},mount(l,u,f){if(!c){const p=he(r,s);return p.appContext=i,u&&e?e(p,l):t(p,l,f),c=!0,a._container=l,l.__vue_app__=a,rs(p.component)||p.component.proxy}},unmount(){c&&(t(null,a._container),delete a._container.__vue_app__)},provide(l,u){return i.provides[l]=u,a},runWithContext(l){kr=a;try{return l()}finally{kr=null}}};return a}}let kr=null;function zt(t,e){if(_e){let n=_e.provides;const r=_e.parent&&_e.parent.provides;r===n&&(n=_e.provides=Object.create(r)),n[t]=e}}function Pe(t,e,n=!1){const r=_e||Ce;if(r||kr){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:kr._context.provides;if(s&&t in s)return s[t];if(arguments.length>1)return n&&V(e)?e.call(r&&r.proxy):e}}function sf(t,e,n,r=!1){const s={},i={};Sr(i,ns,1),t.propsDefaults=Object.create(null),Nc(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:lc(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function of(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,c=J(s),[a]=t.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let p=u[f];if(Qr(t.emitsOptions,p))continue;const m=e[p];if(a)if(q(i,p))m!==i[p]&&(i[p]=m,l=!0);else{const _=tt(p);s[_]=Gs(a,c,_,m,t,!1)}else m!==i[p]&&(i[p]=m,l=!0)}}}else{Nc(t,e,s,i)&&(l=!0);let u;for(const f in c)(!e||!q(e,f)&&((u=In(f))===f||!q(e,u)))&&(a?n&&(n[f]!==void 0||n[u]!==void 0)&&(s[f]=Gs(a,c,f,void 0,t,!0)):delete s[f]);if(i!==c)for(const f in i)(!e||!q(e,f))&&(delete i[f],l=!0)}l&&ut(t,"set","$attrs")}function Nc(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,c;if(e)for(let a in e){if(mr(a))continue;const l=e[a];let u;s&&q(s,u=tt(a))?!i||!i.includes(u)?n[u]=l:(c||(c={}))[u]=l:Qr(t.emitsOptions,a)||(!(a in r)||l!==r[a])&&(r[a]=l,o=!0)}if(i){const a=J(n),l=c||ae;for(let u=0;u<i.length;u++){const f=i[u];n[f]=Gs(s,a,f,l[f],t,!q(l,f))}}return o}function Gs(t,e,n,r,s,i){const o=t[n];if(o!=null){const c=q(o,"default");if(c&&r===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&V(a)){const{propsDefaults:l}=s;n in l?r=l[n]:(vn(s),r=l[n]=a.call(null,e),Kt())}else r=a}o[0]&&(i&&!c?r=!1:o[1]&&(r===""||r===In(n))&&(r=!0))}return r}function xc(t,e,n=!1){const r=e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},c=[];let a=!1;if(!V(t)){const u=f=>{a=!0;const[p,m]=xc(f,e,!0);ve(o,p),m&&c.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!a)return oe(t)&&r.set(t,dn),dn;if(U(i))for(let u=0;u<i.length;u++){const f=tt(i[u]);yo(f)&&(o[f]=ae)}else if(i)for(const u in i){const f=tt(u);if(yo(f)){const p=i[u],m=o[f]=U(p)||V(p)?{type:p}:ve({},p);if(m){const _=Io(Boolean,m.type),y=Io(String,m.type);m[0]=_>-1,m[1]=y<0||_<y,(_>-1||q(m,"default"))&&c.push(f)}}}const l=[o,c];return oe(t)&&r.set(t,l),l}function yo(t){return t[0]!=="$"}function wo(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function bo(t,e){return wo(t)===wo(e)}function Io(t,e){return U(e)?e.findIndex(n=>bo(n,t)):V(e)&&bo(e,t)?0:-1}const $c=t=>t[0]==="_"||t==="$stable",Ci=t=>U(t)?t.map(Ge):[Ge(t)],af=(t,e,n)=>{if(e._n)return e;const r=bc((...s)=>Ci(e(...s)),n);return r._c=!1,r},Dc=(t,e,n)=>{const r=t._ctx;for(const s in t){if($c(s))continue;const i=t[s];if(V(i))e[s]=af(s,i,r);else if(i!=null){const o=Ci(i);e[s]=()=>o}}},Lc=(t,e)=>{const n=Ci(e);t.slots.default=()=>n},cf=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=J(e),Sr(e,"_",n)):Dc(e,t.slots={})}else t.slots={},e&&Lc(t,e);Sr(t.slots,ns,1)},lf=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=ae;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:(ve(s,e),!n&&c===1&&delete s._):(i=!e.$stable,Dc(e,s)),o=e}else e&&(Lc(t,e),o={default:1});if(i)for(const c in s)!$c(c)&&!(c in o)&&delete s[c]};function Js(t,e,n,r,s=!1){if(U(t)){t.forEach((p,m)=>Js(p,e&&(U(e)?e[m]:e),n,r,s));return}if(vr(r)&&!s)return;const i=r.shapeFlag&4?rs(r.component)||r.component.proxy:r.el,o=s?null:i,{i:c,r:a}=t,l=e&&e.r,u=c.refs===ae?c.refs={}:c.refs,f=c.setupState;if(l!=null&&l!==a&&(ge(l)?(u[l]=null,q(f,l)&&(f[l]=null)):pe(l)&&(l.value=null)),V(a))Rt(a,c,12,[o,u]);else{const p=ge(a),m=pe(a);if(p||m){const _=()=>{if(t.f){const y=p?q(f,a)?f[a]:u[a]:a.value;s?U(y)&&pi(y,i):U(y)?y.includes(i)||y.push(i):p?(u[a]=[i],q(f,a)&&(f[a]=u[a])):(a.value=[i],t.k&&(u[t.k]=a.value))}else p?(u[a]=o,q(f,a)&&(f[a]=o)):m&&(a.value=o,t.k&&(u[t.k]=o))};o?(_.id=-1,Te(_,n)):_()}}}const Te=Dd;function uf(t){return df(t)}function df(t,e){const n=Fs();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:c,createComment:a,setText:l,setElementText:u,parentNode:f,nextSibling:p,setScopeId:m=je,insertStaticContent:_}=t,y=(d,h,g,v=null,b=null,I=null,P=!1,R=null,A=!!h.dynamicChildren)=>{if(d===h)return;d&&!Cn(d,h)&&(v=w(d),ce(d,b,I,!0),d=null),h.patchFlag===-2&&(A=!1,h.dynamicChildren=null);const{type:E,ref:D,shapeFlag:N}=h;switch(E){case ts:T(d,h,g,v);break;case Jt:S(d,h,g,v);break;case gs:d==null&&x(h,g,v,P);break;case qe:De(d,h,g,v,b,I,P,R,A);break;default:N&1?j(d,h,g,v,b,I,P,R,A):N&6?Ne(d,h,g,v,b,I,P,R,A):(N&64||N&128)&&E.process(d,h,g,v,b,I,P,R,A,C)}D!=null&&b&&Js(D,d&&d.ref,I,h||d,!h)},T=(d,h,g,v)=>{if(d==null)r(h.el=c(h.children),g,v);else{const b=h.el=d.el;h.children!==d.children&&l(b,h.children)}},S=(d,h,g,v)=>{d==null?r(h.el=a(h.children||""),g,v):h.el=d.el},x=(d,h,g,v)=>{[d.el,d.anchor]=_(d.children,h,g,v,d.el,d.anchor)},H=({el:d,anchor:h},g,v)=>{let b;for(;d&&d!==h;)b=p(d),r(d,g,v),d=b;r(h,g,v)},O=({el:d,anchor:h})=>{let g;for(;d&&d!==h;)g=p(d),s(d),d=g;s(h)},j=(d,h,g,v,b,I,P,R,A)=>{P=P||h.type==="svg",d==null?W(h,g,v,b,I,P,R,A):le(d,h,b,I,P,R,A)},W=(d,h,g,v,b,I,P,R)=>{let A,E;const{type:D,props:N,shapeFlag:L,transition:B,dirs:z}=d;if(A=d.el=o(d.type,I,N&&N.is,N),L&8?u(A,d.children):L&16&&ue(d.children,A,null,v,b,I&&D!=="foreignObject",P,R),z&&xt(d,null,v,"created"),Y(A,d,d.scopeId,P,v),N){for(const ne in N)ne!=="value"&&!mr(ne)&&i(A,ne,null,N[ne],I,d.children,v,b,ye);"value"in N&&i(A,"value",null,N.value),(E=N.onVnodeBeforeMount)&&ze(E,v,d)}z&&xt(d,null,v,"beforeMount");const se=(!b||b&&!b.pendingBranch)&&B&&!B.persisted;se&&B.beforeEnter(A),r(A,h,g),((E=N&&N.onVnodeMounted)||se||z)&&Te(()=>{E&&ze(E,v,d),se&&B.enter(A),z&&xt(d,null,v,"mounted")},b)},Y=(d,h,g,v,b)=>{if(g&&m(d,g),v)for(let I=0;I<v.length;I++)m(d,v[I]);if(b){let I=b.subTree;if(h===I){const P=b.vnode;Y(d,P,P.scopeId,P.slotScopeIds,b.parent)}}},ue=(d,h,g,v,b,I,P,R,A=0)=>{for(let E=A;E<d.length;E++){const D=d[E]=R?vt(d[E]):Ge(d[E]);y(null,D,h,g,v,b,I,P,R)}},le=(d,h,g,v,b,I,P)=>{const R=h.el=d.el;let{patchFlag:A,dynamicChildren:E,dirs:D}=h;A|=d.patchFlag&16;const N=d.props||ae,L=h.props||ae;let B;g&&$t(g,!1),(B=L.onVnodeBeforeUpdate)&&ze(B,g,h,d),D&&xt(h,d,g,"beforeUpdate"),g&&$t(g,!0);const z=b&&h.type!=="foreignObject";if(E?Ee(d.dynamicChildren,E,R,g,v,z,I):P||G(d,h,R,null,g,v,z,I,!1),A>0){if(A&16)ke(R,h,N,L,g,v,b);else if(A&2&&N.class!==L.class&&i(R,"class",null,L.class,b),A&4&&i(R,"style",N.style,L.style,b),A&8){const se=h.dynamicProps;for(let ne=0;ne<se.length;ne++){const fe=se[ne],Me=N[fe],an=L[fe];(an!==Me||fe==="value")&&i(R,fe,Me,an,b,d.children,g,v,ye)}}A&1&&d.children!==h.children&&u(R,h.children)}else!P&&E==null&&ke(R,h,N,L,g,v,b);((B=L.onVnodeUpdated)||D)&&Te(()=>{B&&ze(B,g,h,d),D&&xt(h,d,g,"updated")},v)},Ee=(d,h,g,v,b,I,P)=>{for(let R=0;R<h.length;R++){const A=d[R],E=h[R],D=A.el&&(A.type===qe||!Cn(A,E)||A.shapeFlag&70)?f(A.el):g;y(A,E,D,null,v,b,I,P,!0)}},ke=(d,h,g,v,b,I,P)=>{if(g!==v){if(g!==ae)for(const R in g)!mr(R)&&!(R in v)&&i(d,R,g[R],null,P,h.children,b,I,ye);for(const R in v){if(mr(R))continue;const A=v[R],E=g[R];A!==E&&R!=="value"&&i(d,R,E,A,P,h.children,b,I,ye)}"value"in v&&i(d,"value",g.value,v.value)}},De=(d,h,g,v,b,I,P,R,A)=>{const E=h.el=d?d.el:c(""),D=h.anchor=d?d.anchor:c("");let{patchFlag:N,dynamicChildren:L,slotScopeIds:B}=h;B&&(R=R?R.concat(B):B),d==null?(r(E,g,v),r(D,g,v),ue(h.children,g,D,b,I,P,R,A)):N>0&&N&64&&L&&d.dynamicChildren?(Ee(d.dynamicChildren,L,g,b,I,P,R),(h.key!=null||b&&h===b.subTree)&&Mc(d,h,!0)):G(d,h,g,D,b,I,P,R,A)},Ne=(d,h,g,v,b,I,P,R,A)=>{h.slotScopeIds=R,d==null?h.shapeFlag&512?b.ctx.activate(h,g,v,P,A):Nt(h,g,v,b,I,P,A):st(d,h,A)},Nt=(d,h,g,v,b,I,P)=>{const R=d.component=wf(d,v,b);if(Tc(d)&&(R.ctx.renderer=C),If(R),R.asyncDep){if(b&&b.registerDep(R,de),!d.el){const A=R.subTree=he(Jt);S(null,A,h,g)}return}de(R,d,h,g,b,I,P)},st=(d,h,g)=>{const v=h.component=d.component;if(Nd(d,h,g))if(v.asyncDep&&!v.asyncResolved){Z(v,h,g);return}else v.next=h,Td(v.update),v.update();else h.el=d.el,v.vnode=h},de=(d,h,g,v,b,I,P)=>{const R=()=>{if(d.isMounted){let{next:D,bu:N,u:L,parent:B,vnode:z}=d,se=D,ne;$t(d,!1),D?(D.el=z.el,Z(d,D,P)):D=z,N&&_r(N),(ne=D.props&&D.props.onVnodeBeforeUpdate)&&ze(ne,B,D,z),$t(d,!0);const fe=hs(d),Me=d.subTree;d.subTree=fe,y(Me,fe,f(Me.el),w(Me),d,b,I),D.el=fe.el,se===null&&xd(d,fe.el),L&&Te(L,b),(ne=D.props&&D.props.onVnodeUpdated)&&Te(()=>ze(ne,B,D,z),b)}else{let D;const{el:N,props:L}=h,{bm:B,m:z,parent:se}=d,ne=vr(h);if($t(d,!1),B&&_r(B),!ne&&(D=L&&L.onVnodeBeforeMount)&&ze(D,se,h),$t(d,!0),N&&Q){const fe=()=>{d.subTree=hs(d),Q(N,d.subTree,d,b,null)};ne?h.type.__asyncLoader().then(()=>!d.isUnmounted&&fe()):fe()}else{const fe=d.subTree=hs(d);y(null,fe,g,v,d,b,I),h.el=fe.el}if(z&&Te(z,b),!ne&&(D=L&&L.onVnodeMounted)){const fe=h;Te(()=>ze(D,se,fe),b)}(h.shapeFlag&256||se&&vr(se.vnode)&&se.vnode.shapeFlag&256)&&d.a&&Te(d.a,b),d.isMounted=!0,h=g=v=null}},A=d.effect=new _i(R,()=>Ri(E),d.scope),E=d.update=()=>A.run();E.id=d.uid,$t(d,!0),E()},Z=(d,h,g)=>{h.component=d;const v=d.vnode.props;d.vnode=h,d.next=null,of(d,h.props,v,g),lf(d,h.children,g),En(),fo(),Tn()},G=(d,h,g,v,b,I,P,R,A=!1)=>{const E=d&&d.children,D=d?d.shapeFlag:0,N=h.children,{patchFlag:L,shapeFlag:B}=h;if(L>0){if(L&128){X(E,N,g,v,b,I,P,R,A);return}else if(L&256){Le(E,N,g,v,b,I,P,R,A);return}}B&8?(D&16&&ye(E,b,I),N!==E&&u(g,N)):D&16?B&16?X(E,N,g,v,b,I,P,R,A):ye(E,b,I,!0):(D&8&&u(g,""),B&16&&ue(N,g,v,b,I,P,R,A))},Le=(d,h,g,v,b,I,P,R,A)=>{d=d||dn,h=h||dn;const E=d.length,D=h.length,N=Math.min(E,D);let L;for(L=0;L<N;L++){const B=h[L]=A?vt(h[L]):Ge(h[L]);y(d[L],B,g,null,b,I,P,R,A)}E>D?ye(d,b,I,!0,!1,N):ue(h,g,v,b,I,P,R,A,N)},X=(d,h,g,v,b,I,P,R,A)=>{let E=0;const D=h.length;let N=d.length-1,L=D-1;for(;E<=N&&E<=L;){const B=d[E],z=h[E]=A?vt(h[E]):Ge(h[E]);if(Cn(B,z))y(B,z,g,null,b,I,P,R,A);else break;E++}for(;E<=N&&E<=L;){const B=d[N],z=h[L]=A?vt(h[L]):Ge(h[L]);if(Cn(B,z))y(B,z,g,null,b,I,P,R,A);else break;N--,L--}if(E>N){if(E<=L){const B=L+1,z=B<D?h[B].el:v;for(;E<=L;)y(null,h[E]=A?vt(h[E]):Ge(h[E]),g,z,b,I,P,R,A),E++}}else if(E>L)for(;E<=N;)ce(d[E],b,I,!0),E++;else{const B=E,z=E,se=new Map;for(E=z;E<=L;E++){const Ae=h[E]=A?vt(h[E]):Ge(h[E]);Ae.key!=null&&se.set(Ae.key,E)}let ne,fe=0;const Me=L-z+1;let an=!1,Zi=0;const An=new Array(Me);for(E=0;E<Me;E++)An[E]=0;for(E=B;E<=N;E++){const Ae=d[E];if(fe>=Me){ce(Ae,b,I,!0);continue}let We;if(Ae.key!=null)We=se.get(Ae.key);else for(ne=z;ne<=L;ne++)if(An[ne-z]===0&&Cn(Ae,h[ne])){We=ne;break}We===void 0?ce(Ae,b,I,!0):(An[We-z]=E+1,We>=Zi?Zi=We:an=!0,y(Ae,h[We],g,null,b,I,P,R,A),fe++)}const eo=an?ff(An):dn;for(ne=eo.length-1,E=Me-1;E>=0;E--){const Ae=z+E,We=h[Ae],to=Ae+1<D?h[Ae+1].el:v;An[E]===0?y(null,We,g,to,b,I,P,R,A):an&&(ne<0||E!==eo[ne]?me(We,g,to,2):ne--)}}},me=(d,h,g,v,b=null)=>{const{el:I,type:P,transition:R,children:A,shapeFlag:E}=d;if(E&6){me(d.component.subTree,h,g,v);return}if(E&128){d.suspense.move(h,g,v);return}if(E&64){P.move(d,h,g,C);return}if(P===qe){r(I,h,g);for(let N=0;N<A.length;N++)me(A[N],h,g,v);r(d.anchor,h,g);return}if(P===gs){H(d,h,g);return}if(v!==2&&E&1&&R)if(v===0)R.beforeEnter(I),r(I,h,g),Te(()=>R.enter(I),b);else{const{leave:N,delayLeave:L,afterLeave:B}=R,z=()=>r(I,h,g),se=()=>{N(I,()=>{z(),B&&B()})};L?L(I,z,se):se()}else r(I,h,g)},ce=(d,h,g,v=!1,b=!1)=>{const{type:I,props:P,ref:R,children:A,dynamicChildren:E,shapeFlag:D,patchFlag:N,dirs:L}=d;if(R!=null&&Js(R,null,g,d,!0),D&256){h.ctx.deactivate(d);return}const B=D&1&&L,z=!vr(d);let se;if(z&&(se=P&&P.onVnodeBeforeUnmount)&&ze(se,h,d),D&6)or(d.component,g,v);else{if(D&128){d.suspense.unmount(g,v);return}B&&xt(d,null,h,"beforeUnmount"),D&64?d.type.remove(d,h,g,b,C,v):E&&(I!==qe||N>0&&N&64)?ye(E,h,g,!1,!0):(I===qe&&N&384||!b&&D&16)&&ye(A,h,g),v&&sn(d)}(z&&(se=P&&P.onVnodeUnmounted)||B)&&Te(()=>{se&&ze(se,h,d),B&&xt(d,null,h,"unmounted")},g)},sn=d=>{const{type:h,el:g,anchor:v,transition:b}=d;if(h===qe){on(g,v);return}if(h===gs){O(d);return}const I=()=>{s(g),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(d.shapeFlag&1&&b&&!b.persisted){const{leave:P,delayLeave:R}=b,A=()=>P(g,I);R?R(d.el,I,A):A()}else I()},on=(d,h)=>{let g;for(;d!==h;)g=p(d),s(d),d=g;s(h)},or=(d,h,g)=>{const{bum:v,scope:b,update:I,subTree:P,um:R}=d;v&&_r(v),b.stop(),I&&(I.active=!1,ce(P,d,h,g)),R&&Te(R,h),Te(()=>{d.isUnmounted=!0},h),h&&h.pendingBranch&&!h.isUnmounted&&d.asyncDep&&!d.asyncResolved&&d.suspenseId===h.pendingId&&(h.deps--,h.deps===0&&h.resolve())},ye=(d,h,g,v=!1,b=!1,I=0)=>{for(let P=I;P<d.length;P++)ce(d[P],h,g,v,b)},w=d=>d.shapeFlag&6?w(d.component.subTree):d.shapeFlag&128?d.suspense.next():p(d.anchor||d.el),k=(d,h,g)=>{d==null?h._vnode&&ce(h._vnode,null,null,!0):y(h._vnode||null,d,h,null,null,null,g),fo(),vc(),h._vnode=d},C={p:y,um:ce,m:me,r:sn,mt:Nt,mc:ue,pc:G,pbc:Ee,n:w,o:t};let $,Q;return e&&([$,Q]=e(C)),{render:k,hydrate:$,createApp:rf(k,$)}}function $t({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function Mc(t,e,n=!1){const r=t.children,s=e.children;if(U(r)&&U(s))for(let i=0;i<r.length;i++){const o=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=vt(s[i]),c.el=o.el),n||Mc(o,c)),c.type===ts&&(c.el=o.el)}}function ff(t){const e=t.slice(),n=[0];let r,s,i,o,c;const a=t.length;for(r=0;r<a;r++){const l=t[r];if(l!==0){if(s=n[n.length-1],t[s]<l){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<l?i=c+1:o=c;l<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const hf=t=>t.__isTeleport,qe=Symbol.for("v-fgt"),ts=Symbol.for("v-txt"),Jt=Symbol.for("v-cmt"),gs=Symbol.for("v-stc"),Dn=[];let Be=null;function Ye(t=!1){Dn.push(Be=t?null:[])}function pf(){Dn.pop(),Be=Dn[Dn.length-1]||null}let zn=1;function Eo(t){zn+=t}function Uc(t){return t.dynamicChildren=zn>0?Be||dn:null,pf(),zn>0&&Be&&Be.push(t),t}function Mt(t,e,n,r,s,i){return Uc(ee(t,e,n,r,s,i,!0))}function Pi(t,e,n,r,s){return Uc(he(t,e,n,r,s,!0))}function Ys(t){return t?t.__v_isVNode===!0:!1}function Cn(t,e){return t.type===e.type&&t.key===e.key}const ns="__vInternal",Fc=({key:t})=>t??null,yr=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ge(t)||pe(t)||V(t)?{i:Ce,r:t,k:e,f:!!n}:t:null);function ee(t,e=null,n=null,r=0,s=null,i=t===qe?0:1,o=!1,c=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Fc(e),ref:e&&yr(e),scopeId:Zr,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Ce};return c?(Oi(a,n),i&128&&t.normalize(a)):n&&(a.shapeFlag|=ge(n)?8:16),zn>0&&!o&&Be&&(a.patchFlag>0||i&6)&&a.patchFlag!==32&&Be.push(a),a}const he=gf;function gf(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===qd)&&(t=Jt),Ys(t)){const c=_n(t,e,!0);return n&&Oi(c,n),zn>0&&!i&&Be&&(c.shapeFlag&6?Be[Be.indexOf(t)]=c:Be.push(c)),c.patchFlag|=-2,c}if(Af(t)&&(t=t.__vccOpts),e){e=mf(e);let{class:c,style:a}=e;c&&!ge(c)&&(e.class=Gr(c)),oe(a)&&(dc(a)&&!U(a)&&(a=ve({},a)),e.style=hn(a))}const o=ge(t)?1:$d(t)?128:hf(t)?64:oe(t)?4:V(t)?2:0;return ee(t,e,n,r,s,o,i,!0)}function mf(t){return t?dc(t)||ns in t?ve({},t):t:null}function _n(t,e,n=!1){const{props:r,ref:s,patchFlag:i,children:o}=t,c=e?_f(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&Fc(c),ref:e&&e.ref?n&&s?U(s)?s.concat(yr(e)):[s,yr(e)]:yr(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==qe?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&_n(t.ssContent),ssFallback:t.ssFallback&&_n(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function Bc(t=" ",e=0){return he(ts,null,t,e)}function pr(t="",e=!1){return e?(Ye(),Pi(Jt,null,t)):he(Jt,null,t)}function Ge(t){return t==null||typeof t=="boolean"?he(Jt):U(t)?he(qe,null,t.slice()):typeof t=="object"?vt(t):he(ts,null,String(t))}function vt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:_n(t)}function Oi(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(U(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Oi(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!(ns in e)?e._ctx=Ce:s===3&&Ce&&(Ce.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else V(e)?(e={default:e,_ctx:Ce},n=32):(e=String(e),r&64?(n=16,e=[Bc(e)]):n=8);t.children=e,t.shapeFlag|=n}function _f(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Gr([e.class,r.class]));else if(s==="style")e.style=hn([e.style,r.style]);else if(Wr(s)){const i=e[s],o=r[s];o&&i!==o&&!(U(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function ze(t,e,n,r=null){Ve(t,e,7,[n,r])}const vf=kc();let yf=0;function wf(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||vf,i={uid:yf++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new Qa(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:xc(r,s),emitsOptions:wc(r,s),emit:null,emitted:null,propsDefaults:ae,inheritAttrs:r.inheritAttrs,ctx:ae,data:ae,props:ae,attrs:ae,slots:ae,refs:ae,setupState:ae,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Ad.bind(null,i),t.ce&&t.ce(i),i}let _e=null;const bf=()=>_e||Ce;let ki,cn,To="__VUE_INSTANCE_SETTERS__";(cn=Fs()[To])||(cn=Fs()[To]=[]),cn.push(t=>_e=t),ki=t=>{cn.length>1?cn.forEach(e=>e(t)):cn[0](t)};const vn=t=>{ki(t),t.scope.on()},Kt=()=>{_e&&_e.scope.off(),ki(null)};function jc(t){return t.vnode.shapeFlag&4}let Kn=!1;function If(t,e=!1){Kn=e;const{props:n,children:r}=t.vnode,s=jc(t);sf(t,n,s,e),cf(t,r);const i=s?Ef(t,e):void 0;return Kn=!1,i}function Ef(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=Ii(new Proxy(t.ctx,Yd));const{setup:r}=n;if(r){const s=t.setupContext=r.length>1?Rf(t):null;vn(t),En();const i=Rt(r,t,0,[t.props,s]);if(Tn(),Kt(),Ka(i)){if(i.then(Kt,Kt),e)return i.then(o=>{Ro(t,o,e)}).catch(o=>{Xr(o,t,0)});t.asyncDep=i}else Ro(t,i,e)}else Vc(t,e)}function Ro(t,e,n){V(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:oe(e)&&(t.setupState=gc(e)),Vc(t,n)}let So;function Vc(t,e,n){const r=t.type;if(!t.render){if(!e&&So&&!r.render){const s=r.template||Ai(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:c,compilerOptions:a}=r,l=ve(ve({isCustomElement:i,delimiters:c},o),a);r.render=So(s,l)}}t.render=r.render||je}vn(t),En(),Xd(t),Tn(),Kt()}function Tf(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return Se(t,"get","$attrs"),e[n]}}))}function Rf(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return Tf(t)},slots:t.slots,emit:t.emit,expose:e}}function rs(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(gc(Ii(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in $n)return $n[n](t)},has(e,n){return n in e||n in $n}}))}function Sf(t,e=!0){return V(t)?t.displayName||t.name:t.name||e&&t.__name}function Af(t){return V(t)&&"__vccOpts"in t}const K=(t,e)=>bd(t,e,Kn);function Hc(t,e,n){const r=arguments.length;return r===2?oe(e)&&!U(e)?Ys(e)?he(t,null,[e]):he(t,e):he(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Ys(n)&&(n=[n]),he(t,e,n))}const Cf=Symbol.for("v-scx"),Pf=()=>Pe(Cf),Of="3.3.4",kf="http://www.w3.org/2000/svg",Ut=typeof document<"u"?document:null,Ao=Ut&&Ut.createElement("template"),Nf={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e?Ut.createElementNS(kf,t):Ut.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Ut.createTextNode(t),createComment:t=>Ut.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Ut.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Ao.innerHTML=r?`<svg>${t}</svg>`:t;const c=Ao.content;if(r){const a=c.firstChild;for(;a.firstChild;)c.appendChild(a.firstChild);c.removeChild(a)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function xf(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function $f(t,e,n){const r=t.style,s=ge(n);if(n&&!s){if(e&&!ge(e))for(const i in e)n[i]==null&&Xs(r,i,"");for(const i in n)Xs(r,i,n[i])}else{const i=r.display;s?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=i)}}const Co=/\s*!important$/;function Xs(t,e,n){if(U(n))n.forEach(r=>Xs(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Df(t,e);Co.test(n)?t.setProperty(In(r),n.replace(Co,""),"important"):t[r]=n}}const Po=["Webkit","Moz","ms"],ms={};function Df(t,e){const n=ms[e];if(n)return n;let r=tt(e);if(r!=="filter"&&r in t)return ms[e]=r;r=qr(r);for(let s=0;s<Po.length;s++){const i=Po[s]+r;if(i in t)return ms[e]=i}return e}const Oo="http://www.w3.org/1999/xlink";function Lf(t,e,n,r,s){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(Oo,e.slice(6,e.length)):t.setAttributeNS(Oo,e,n);else{const i=Bu(e);n==null||i&&!Ja(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function Mf(t,e,n,r,s,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,s,i),t[e]=n??"";return}const c=t.tagName;if(e==="value"&&c!=="PROGRESS"&&!c.includes("-")){t._value=n;const l=c==="OPTION"?t.getAttribute("value"):t.value,u=n??"";l!==u&&(t.value=u),n==null&&t.removeAttribute(e);return}let a=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=Ja(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(e)}function Ft(t,e,n,r){t.addEventListener(e,n,r)}function Uf(t,e,n,r){t.removeEventListener(e,n,r)}function Ff(t,e,n,r,s=null){const i=t._vei||(t._vei={}),o=i[e];if(r&&o)o.value=r;else{const[c,a]=Bf(e);if(r){const l=i[e]=Hf(r,s);Ft(t,c,l,a)}else o&&(Uf(t,c,o,a),i[e]=void 0)}}const ko=/(?:Once|Passive|Capture)$/;function Bf(t){let e;if(ko.test(t)){e={};let r;for(;r=t.match(ko);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):In(t.slice(2)),e]}let _s=0;const jf=Promise.resolve(),Vf=()=>_s||(jf.then(()=>_s=0),_s=Date.now());function Hf(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Ve(Wf(r,n.value),e,5,[r])};return n.value=t,n.attached=Vf(),n}function Wf(t,e){if(U(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const No=/^on[a-z]/,zf=(t,e,n,r,s=!1,i,o,c,a)=>{e==="class"?xf(t,r,s):e==="style"?$f(t,n,r):Wr(e)?hi(e)||Ff(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Kf(t,e,r,s))?Mf(t,e,r,i,o,c,a):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Lf(t,e,r,s))};function Kf(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&No.test(e)&&V(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||No.test(e)&&ge(n)?!1:e in t}const Nr=t=>{const e=t.props["onUpdate:modelValue"]||!1;return U(e)?n=>_r(e,n):e};function qf(t){t.target.composing=!0}function xo(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const vs={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t._assign=Nr(s);const i=r||s.props&&s.props.type==="number";Ft(t,e?"change":"input",o=>{if(o.target.composing)return;let c=t.value;n&&(c=c.trim()),i&&(c=Us(c)),t._assign(c)}),n&&Ft(t,"change",()=>{t.value=t.value.trim()}),e||(Ft(t,"compositionstart",qf),Ft(t,"compositionend",xo),Ft(t,"change",xo))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:s}},i){if(t._assign=Nr(i),t.composing||document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===e||(s||t.type==="number")&&Us(t.value)===e))return;const o=e??"";t.value!==o&&(t.value=o)}},Gf={deep:!0,created(t,e,n){t._assign=Nr(n),Ft(t,"change",()=>{const r=t._modelValue,s=Jf(t),i=t.checked,o=t._assign;if(U(r)){const c=Ya(r,s),a=c!==-1;if(i&&!a)o(r.concat(s));else if(!i&&a){const l=[...r];l.splice(c,1),o(l)}}else if(zr(r)){const c=new Set(r);i?c.add(s):c.delete(s),o(c)}else o(Wc(t,i))})},mounted:$o,beforeUpdate(t,e,n){t._assign=Nr(n),$o(t,e,n)}};function $o(t,{value:e,oldValue:n},r){t._modelValue=e,U(e)?t.checked=Ya(e,r.props.value)>-1:zr(e)?t.checked=e.has(r.props.value):e!==n&&(t.checked=Jr(e,Wc(t,!0)))}function Jf(t){return"_value"in t?t._value:t.value}function Wc(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const Yf=ve({patchProp:zf},Nf);let Do;function Xf(){return Do||(Do=uf(Yf))}const Qf=(...t)=>{const e=Xf().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=Zf(r);if(!s)return;const i=e._component;!V(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const o=n(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function Zf(t){return ge(t)?document.querySelector(t):t}var eh=!1;/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const th=Symbol();var Lo;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Lo||(Lo={}));function nh(){const t=Vu(!0),e=t.run(()=>ie({}));let n=[],r=[];const s=Ii({install(i){s._a=i,i.provide(th,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!eh?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zc=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},rh=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],a=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(a&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Kc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,a=s+2<t.length,l=a?t[s+2]:0,u=i>>2,f=(i&3)<<4|c>>4;let p=(c&15)<<2|l>>6,m=l&63;a||(m=64,o||(p=64)),r.push(n[u],n[f],n[p],n[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(zc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):rh(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||l==null||f==null)throw new sh;const p=i<<2|c>>4;if(r.push(p),l!==64){const m=c<<4&240|l>>2;if(r.push(m),f!==64){const _=l<<6&192|f;r.push(_)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class sh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ih=function(t){const e=zc(t);return Kc.encodeByteArray(e,!0)},qc=function(t){return ih(t).replace(/\./g,"")},Gc=function(t){try{return Kc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ah=()=>oh().__FIREBASE_DEFAULTS__,ch=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},lh=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Gc(t[1]);return e&&JSON.parse(e)},Ni=()=>{try{return ah()||ch()||lh()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},uh=t=>{var e,n;return(n=(e=Ni())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Jc=()=>{var t;return(t=Ni())===null||t===void 0?void 0:t.config},Yc=t=>{var e;return(e=Ni())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(be())}function Xc(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function hh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ph(){const t=be();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Qc(){try{return typeof indexedDB=="object"}catch{return!1}}function Zc(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function gh(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="FirebaseError";class rt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=mh,Object.setPrototypeOf(this,rt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tn.prototype.create)}}class tn{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?_h(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new rt(s,c,r)}}function _h(t,e){return t.replace(vh,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const vh=/\{\$([^}]+)}/g;function yh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function qn(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Mo(i)&&Mo(o)){if(!qn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Mo(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Nn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function xn(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function wh(t,e){const n=new bh(t,e);return n.subscribe.bind(n)}class bh{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Ih(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=ys),s.error===void 0&&(s.error=ys),s.complete===void 0&&(s.complete=ys);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ih(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ys(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh=1e3,Th=2,Rh=4*60*60*1e3,Sh=.5;function Uo(t,e=Eh,n=Th){const r=e*Math.pow(n,t),s=Math.round(Sh*r*(Math.random()-.5)*2);return Math.min(Rh,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(t){return t&&t._delegate?t._delegate:t}class nt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new dh;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ph(e))try{this.getOrInitializeService({instanceIdentifier:Dt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Dt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Dt){return this.instances.has(e)}getOptions(e=Dt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Ch(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Dt){return this.component?this.component.multipleInstances?e:Dt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ch(t){return t===Dt?void 0:t}function Ph(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Ah(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(re||(re={}));const kh={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},Nh=re.INFO,xh={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},$h=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=xh[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xi{constructor(e){this.name=e,this._logLevel=Nh,this._logHandler=$h,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?kh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const Dh=(t,e)=>e.some(n=>t instanceof n);let Fo,Bo;function Lh(){return Fo||(Fo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mh(){return Bo||(Bo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const el=new WeakMap,Qs=new WeakMap,tl=new WeakMap,ws=new WeakMap,$i=new WeakMap;function Uh(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(St(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&el.set(n,t)}).catch(()=>{}),$i.set(e,t),e}function Fh(t){if(Qs.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Qs.set(t,e)}let Zs={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Qs.get(t);if(e==="objectStoreNames")return t.objectStoreNames||tl.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return St(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Bh(t){Zs=t(Zs)}function jh(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(bs(this),e,...n);return tl.set(r,e.sort?e.sort():[e]),St(r)}:Mh().includes(t)?function(...e){return t.apply(bs(this),e),St(el.get(this))}:function(...e){return St(t.apply(bs(this),e))}}function Vh(t){return typeof t=="function"?jh(t):(t instanceof IDBTransaction&&Fh(t),Dh(t,Lh())?new Proxy(t,Zs):t)}function St(t){if(t instanceof IDBRequest)return Uh(t);if(ws.has(t))return ws.get(t);const e=Vh(t);return e!==t&&(ws.set(t,e),$i.set(e,t)),e}const bs=t=>$i.get(t);function Hh(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=St(o);return r&&o.addEventListener("upgradeneeded",a=>{r(St(o.result),a.oldVersion,a.newVersion,St(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),c.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Wh=["get","getKey","getAll","getAllKeys","count"],zh=["put","add","delete","clear"],Is=new Map;function jo(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Is.get(e))return Is.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=zh.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Wh.includes(n)))return;const i=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&a.done]))[0]};return Is.set(e,i),i}Bh(t=>({...t,get:(e,n,r)=>jo(e,n)||t.get(e,n,r),has:(e,n)=>!!jo(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(qh(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function qh(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ei="@firebase/app",Vo="0.9.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=new xi("@firebase/app"),Gh="@firebase/app-compat",Jh="@firebase/analytics-compat",Yh="@firebase/analytics",Xh="@firebase/app-check-compat",Qh="@firebase/app-check",Zh="@firebase/auth",ep="@firebase/auth-compat",tp="@firebase/database",np="@firebase/database-compat",rp="@firebase/functions",sp="@firebase/functions-compat",ip="@firebase/installations",op="@firebase/installations-compat",ap="@firebase/messaging",cp="@firebase/messaging-compat",lp="@firebase/performance",up="@firebase/performance-compat",dp="@firebase/remote-config",fp="@firebase/remote-config-compat",hp="@firebase/storage",pp="@firebase/storage-compat",gp="@firebase/firestore",mp="@firebase/firestore-compat",_p="firebase",vp="10.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti="[DEFAULT]",yp={[ei]:"fire-core",[Gh]:"fire-core-compat",[Yh]:"fire-analytics",[Jh]:"fire-analytics-compat",[Qh]:"fire-app-check",[Xh]:"fire-app-check-compat",[Zh]:"fire-auth",[ep]:"fire-auth-compat",[tp]:"fire-rtdb",[np]:"fire-rtdb-compat",[rp]:"fire-fn",[sp]:"fire-fn-compat",[ip]:"fire-iid",[op]:"fire-iid-compat",[ap]:"fire-fcm",[cp]:"fire-fcm-compat",[lp]:"fire-perf",[up]:"fire-perf-compat",[dp]:"fire-rc",[fp]:"fire-rc-compat",[hp]:"fire-gcs",[pp]:"fire-gcs-compat",[gp]:"fire-fst",[mp]:"fire-fst-compat","fire-js":"fire-js",[_p]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr=new Map,ni=new Map;function wp(t,e){try{t.container.addComponent(e)}catch(n){Yt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ft(t){const e=t.name;if(ni.has(e))return Yt.debug(`There were multiple attempts to register component ${e}.`),!1;ni.set(e,t);for(const n of xr.values())wp(n,t);return!0}function Rn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},At=new tn("app","Firebase",bp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw At.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=vp;function nl(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ti,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw At.create("bad-app-name",{appName:String(s)});if(n||(n=Jc()),!n)throw At.create("no-options");const i=xr.get(s);if(i){if(qn(n,i.options)&&qn(r,i.config))return i;throw At.create("duplicate-app",{appName:s})}const o=new Oh(s);for(const a of ni.values())o.addComponent(a);const c=new Ip(n,r,o);return xr.set(s,c),c}function rl(t=ti){const e=xr.get(t);if(!e&&t===ti&&Jc())return nl();if(!e)throw At.create("no-app",{appName:t});return e}function Qe(t,e,n){var r;let s=(r=yp[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Yt.warn(c.join(" "));return}ft(new nt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep="firebase-heartbeat-database",Tp=1,Gn="firebase-heartbeat-store";let Es=null;function sl(){return Es||(Es=Hh(Ep,Tp,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Gn)}}}).catch(t=>{throw At.create("idb-open",{originalErrorMessage:t.message})})),Es}async function Rp(t){try{return await(await sl()).transaction(Gn).objectStore(Gn).get(il(t))}catch(e){if(e instanceof rt)Yt.warn(e.message);else{const n=At.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Yt.warn(n.message)}}}async function Ho(t,e){try{const r=(await sl()).transaction(Gn,"readwrite");await r.objectStore(Gn).put(e,il(t)),await r.done}catch(n){if(n instanceof rt)Yt.warn(n.message);else{const r=At.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Yt.warn(r.message)}}}function il(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp=1024,Ap=30*24*60*60*1e3;class Cp{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Op(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Wo();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=Ap}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Wo(),{heartbeatsToSend:n,unsentEntries:r}=Pp(this._heartbeatsCache.heartbeats),s=qc(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function Wo(){return new Date().toISOString().substring(0,10)}function Pp(t,e=Sp){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),zo(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),zo(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Op{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qc()?Zc().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Rp(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ho(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ho(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function zo(t){return qc(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(t){ft(new nt("platform-logger",e=>new Kh(e),"PRIVATE")),ft(new nt("heartbeat",e=>new Cp(e),"PRIVATE")),Qe(ei,Vo,t),Qe(ei,Vo,"esm2017"),Qe("fire-js","")}kp("");var Np="firebase",xp="10.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qe(Np,xp,"app");const $p=(t,e)=>e.some(n=>t instanceof n);let Ko,qo;function Dp(){return Ko||(Ko=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Lp(){return qo||(qo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ol=new WeakMap,ri=new WeakMap,al=new WeakMap,Ts=new WeakMap,Di=new WeakMap;function Mp(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Ct(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ol.set(n,t)}).catch(()=>{}),Di.set(e,t),e}function Up(t){if(ri.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ri.set(t,e)}let si={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ri.get(t);if(e==="objectStoreNames")return t.objectStoreNames||al.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ct(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Fp(t){si=t(si)}function Bp(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Rs(this),e,...n);return al.set(r,e.sort?e.sort():[e]),Ct(r)}:Lp().includes(t)?function(...e){return t.apply(Rs(this),e),Ct(ol.get(this))}:function(...e){return Ct(t.apply(Rs(this),e))}}function jp(t){return typeof t=="function"?Bp(t):(t instanceof IDBTransaction&&Up(t),$p(t,Dp())?new Proxy(t,si):t)}function Ct(t){if(t instanceof IDBRequest)return Mp(t);if(Ts.has(t))return Ts.get(t);const e=jp(t);return e!==t&&(Ts.set(t,e),Di.set(e,t)),e}const Rs=t=>Di.get(t);function Vp(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=Ct(o);return r&&o.addEventListener("upgradeneeded",a=>{r(Ct(o.result),a.oldVersion,a.newVersion,Ct(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),c.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",()=>s())}).catch(()=>{}),c}const Hp=["get","getKey","getAll","getAllKeys","count"],Wp=["put","add","delete","clear"],Ss=new Map;function Go(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ss.get(e))return Ss.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Wp.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Hp.includes(n)))return;const i=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&a.done]))[0]};return Ss.set(e,i),i}Fp(t=>({...t,get:(e,n,r)=>Go(e,n)||t.get(e,n,r),has:(e,n)=>!!Go(e,n)||t.has(e,n)}));const cl="@firebase/installations",Li="0.6.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll=1e4,ul=`w:${Li}`,dl="FIS_v2",zp="https://firebaseinstallations.googleapis.com/v1",Kp=60*60*1e3,qp="installations",Gp="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Xt=new tn(qp,Gp,Jp);function fl(t){return t instanceof rt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hl({projectId:t}){return`${zp}/projects/${t}/installations`}function pl(t){return{token:t.token,requestStatus:2,expiresIn:Xp(t.expiresIn),creationTime:Date.now()}}async function gl(t,e){const r=(await e.json()).error;return Xt.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function ml({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Yp(t,{refreshToken:e}){const n=ml(t);return n.append("Authorization",Qp(e)),n}async function _l(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Xp(t){return Number(t.replace("s","000"))}function Qp(t){return`${dl} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zp({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=hl(t),s=ml(t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:dl,appId:t.appId,sdkVersion:ul},c={method:"POST",headers:s,body:JSON.stringify(o)},a=await _l(()=>fetch(r,c));if(a.ok){const l=await a.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:pl(l.authToken)}}else throw await gl("Create Installation",a)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg=/^[cdef][\w-]{21}$/,ii="";function ng(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=rg(t);return tg.test(n)?n:ii}catch{return ii}}function rg(t){return eg(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl=new Map;function wl(t,e){const n=ss(t);bl(n,e),sg(n,e)}function bl(t,e){const n=yl.get(t);if(n)for(const r of n)r(e)}function sg(t,e){const n=ig();n&&n.postMessage({key:t,fid:e}),og()}let jt=null;function ig(){return!jt&&"BroadcastChannel"in self&&(jt=new BroadcastChannel("[Firebase] FID Change"),jt.onmessage=t=>{bl(t.data.key,t.data.fid)}),jt}function og(){yl.size===0&&jt&&(jt.close(),jt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag="firebase-installations-database",cg=1,Qt="firebase-installations-store";let As=null;function Mi(){return As||(As=Vp(ag,cg,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Qt)}}})),As}async function $r(t,e){const n=ss(t),s=(await Mi()).transaction(Qt,"readwrite"),i=s.objectStore(Qt),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&wl(t,e.fid),e}async function Il(t){const e=ss(t),r=(await Mi()).transaction(Qt,"readwrite");await r.objectStore(Qt).delete(e),await r.done}async function is(t,e){const n=ss(t),s=(await Mi()).transaction(Qt,"readwrite"),i=s.objectStore(Qt),o=await i.get(n),c=e(o);return c===void 0?await i.delete(n):await i.put(c,n),await s.done,c&&(!o||o.fid!==c.fid)&&wl(t,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ui(t){let e;const n=await is(t.appConfig,r=>{const s=lg(r),i=ug(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===ii?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function lg(t){const e=t||{fid:ng(),registrationStatus:0};return El(e)}function ug(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Xt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=dg(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:fg(t)}:{installationEntry:e}}async function dg(t,e){try{const n=await Zp(t,e);return $r(t.appConfig,n)}catch(n){throw fl(n)&&n.customData.serverCode===409?await Il(t.appConfig):await $r(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function fg(t){let e=await Jo(t.appConfig);for(;e.registrationStatus===1;)await vl(100),e=await Jo(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Ui(t);return r||n}return e}function Jo(t){return is(t,e=>{if(!e)throw Xt.create("installation-not-found");return El(e)})}function El(t){return hg(t)?{fid:t.fid,registrationStatus:0}:t}function hg(t){return t.registrationStatus===1&&t.registrationTime+ll<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pg({appConfig:t,heartbeatServiceProvider:e},n){const r=gg(t,n),s=Yp(t,n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:ul,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},a=await _l(()=>fetch(r,c));if(a.ok){const l=await a.json();return pl(l)}else throw await gl("Generate Auth Token",a)}function gg(t,{fid:e}){return`${hl(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fi(t,e=!1){let n;const r=await is(t.appConfig,i=>{if(!Tl(i))throw Xt.create("not-registered");const o=i.authToken;if(!e&&vg(o))return i;if(o.requestStatus===1)return n=mg(t,e),i;{if(!navigator.onLine)throw Xt.create("app-offline");const c=wg(i);return n=_g(t,c),c}});return n?await n:r.authToken}async function mg(t,e){let n=await Yo(t.appConfig);for(;n.authToken.requestStatus===1;)await vl(100),n=await Yo(t.appConfig);const r=n.authToken;return r.requestStatus===0?Fi(t,e):r}function Yo(t){return is(t,e=>{if(!Tl(e))throw Xt.create("not-registered");const n=e.authToken;return bg(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function _g(t,e){try{const n=await pg(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await $r(t.appConfig,r),n}catch(n){if(fl(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Il(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await $r(t.appConfig,r)}throw n}}function Tl(t){return t!==void 0&&t.registrationStatus===2}function vg(t){return t.requestStatus===2&&!yg(t)}function yg(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Kp}function wg(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function bg(t){return t.requestStatus===1&&t.requestTime+ll<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ig(t){const e=t,{installationEntry:n,registrationPromise:r}=await Ui(e);return r?r.catch(console.error):Fi(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eg(t,e=!1){const n=t;return await Tg(n),(await Fi(n,e)).token}async function Tg(t){const{registrationPromise:e}=await Ui(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rg(t){if(!t||!t.options)throw Cs("App Configuration");if(!t.name)throw Cs("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Cs(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Cs(t){return Xt.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="installations",Sg="installations-internal",Ag=t=>{const e=t.getProvider("app").getImmediate(),n=Rg(e),r=Rn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Cg=t=>{const e=t.getProvider("app").getImmediate(),n=Rn(e,Rl).getImmediate();return{getId:()=>Ig(n),getToken:s=>Eg(n,s)}};function Pg(){ft(new nt(Rl,Ag,"PUBLIC")),ft(new nt(Sg,Cg,"PRIVATE"))}Pg();Qe(cl,Li);Qe(cl,Li,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr="analytics",Og="firebase_id",kg="origin",Ng=60*1e3,xg="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Bi="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re=new xi("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Oe=new tn("analytics","Analytics",$g);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dg(t){if(!t.startsWith(Bi)){const e=Oe.create("invalid-gtag-resource",{gtagURL:t});return Re.warn(e.message),""}return t}function Sl(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Lg(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function Mg(t,e){const n=Lg("firebase-js-sdk-policy",{createScriptURL:Dg}),r=document.createElement("script"),s=`${Bi}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Ug(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Fg(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const a=(await Sl(n)).find(l=>l.measurementId===s);a&&await e[a.appId]}}catch(c){Re.error(c)}t("config",s,i)}async function Bg(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const c=await Sl(n);for(const a of o){const l=c.find(f=>f.measurementId===a),u=l&&e[l.appId];if(u)i.push(u);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){Re.error(i)}}function jg(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[c,a]=o;await Bg(t,e,n,c,a)}else if(i==="config"){const[c,a]=o;await Fg(t,e,n,r,c,a)}else if(i==="consent"){const[c]=o;t("consent","update",c)}else if(i==="get"){const[c,a,l]=o;t("get",c,a,l)}else if(i==="set"){const[c]=o;t("set",c)}else t(i,...o)}catch(c){Re.error(c)}}return s}function Vg(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=jg(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function Hg(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Bi)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg=30,zg=1e3;class Kg{constructor(e={},n=zg){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Al=new Kg;function qg(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Gg(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:qg(r)},i=xg.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let c="";try{const a=await o.json();!((e=a.error)===null||e===void 0)&&e.message&&(c=a.error.message)}catch{}throw Oe.create("config-fetch-failed",{httpStatus:o.status,responseMessage:c})}return o.json()}async function Jg(t,e=Al,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Oe.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Oe.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new Qg;return setTimeout(async()=>{c.abort()},n!==void 0?n:Ng),Cl({appId:r,apiKey:s,measurementId:i},o,c,e)}async function Cl(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Al){var i;const{appId:o,measurementId:c}=t;try{await Yg(r,e)}catch(a){if(c)return Re.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${a==null?void 0:a.message}]`),{appId:o,measurementId:c};throw a}try{const a=await Gg(t);return s.deleteThrottleMetadata(o),a}catch(a){const l=a;if(!Xg(l)){if(s.deleteThrottleMetadata(o),c)return Re.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:c};throw a}const u=Number((i=l==null?void 0:l.customData)===null||i===void 0?void 0:i.httpStatus)===503?Uo(n,s.intervalMillis,Wg):Uo(n,s.intervalMillis),f={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return s.setThrottleMetadata(o,f),Re.debug(`Calling attemptFetch again in ${u} millis`),Cl(t,f,r,s)}}function Yg(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Oe.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Xg(t){if(!(t instanceof rt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class Qg{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Zg(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function em(){if(Qc())try{await Zc()}catch(t){return Re.warn(Oe.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Re.warn(Oe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function tm(t,e,n,r,s,i,o){var c;const a=Jg(t);a.then(m=>{n[m.measurementId]=m.appId,t.options.measurementId&&m.measurementId!==t.options.measurementId&&Re.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>Re.error(m)),e.push(a);const l=em().then(m=>{if(m)return r.getId()}),[u,f]=await Promise.all([a,l]);Hg(i)||Mg(i,u.measurementId),s("js",new Date);const p=(c=o==null?void 0:o.config)!==null&&c!==void 0?c:{};return p[kg]="firebase",p.update=!0,f!=null&&(p[Og]=f),s("config",u.measurementId,p),u.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.app=e}_delete(){return delete Ln[this.app.options.appId],Promise.resolve()}}let Ln={},Xo=[];const Qo={};let Ps="dataLayer",rm="gtag",Zo,Pl,ea=!1;function sm(){const t=[];if(Xc()&&t.push("This is a browser extension environment."),gh()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Oe.create("invalid-analytics-context",{errorInfo:e});Re.warn(n.message)}}function im(t,e,n){sm();const r=t.options.appId;if(!r)throw Oe.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Re.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Oe.create("no-api-key");if(Ln[r]!=null)throw Oe.create("already-exists",{id:r});if(!ea){Ug(Ps);const{wrappedGtag:i,gtagCore:o}=Vg(Ln,Xo,Qo,Ps,rm);Pl=i,Zo=o,ea=!0}return Ln[r]=tm(t,Xo,Qo,e,Zo,Ps,n),new nm(t)}function om(t=rl()){t=$e(t);const e=Rn(t,Dr);return e.isInitialized()?e.getImmediate():am(t)}function am(t,e={}){const n=Rn(t,Dr);if(n.isInitialized()){const s=n.getImmediate();if(qn(e,n.getOptions()))return s;throw Oe.create("already-initialized")}return n.initialize({options:e})}function cm(t,e,n,r){t=$e(t),Zg(Pl,Ln[t.app.options.appId],e,n,r).catch(s=>Re.error(s))}const ta="@firebase/analytics",na="0.10.0";function lm(){ft(new nt(Dr,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return im(r,s,n)},"PUBLIC")),ft(new nt("analytics-internal",t,"PRIVATE")),Qe(ta,na),Qe(ta,na,"esm2017");function t(e){try{const n=e.getProvider(Dr).getImmediate();return{logEvent:(r,s,i)=>cm(n,r,s,i)}}catch(n){throw Oe.create("interop-component-reg-failed",{reason:n})}}}lm();/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const un=typeof window<"u";function um(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const te=Object.assign;function Os(t,e){const n={};for(const r in e){const s=e[r];n[r]=He(s)?s.map(t):t(s)}return n}const Mn=()=>{},He=Array.isArray,dm=/\/$/,fm=t=>t.replace(dm,"");function ks(t,e,n="/"){let r,s={},i="",o="";const c=e.indexOf("#");let a=e.indexOf("?");return c<a&&c>=0&&(a=-1),a>-1&&(r=e.slice(0,a),i=e.slice(a+1,c>-1?c:e.length),s=t(i)),c>-1&&(r=r||e.slice(0,c),o=e.slice(c,e.length)),r=mm(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:o}}function hm(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ra(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function pm(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&yn(e.matched[r],n.matched[s])&&Ol(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function yn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Ol(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!gm(t[n],e[n]))return!1;return!0}function gm(t,e){return He(t)?sa(t,e):He(e)?sa(e,t):t===e}function sa(t,e){return He(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function mm(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,c;for(o=0;o<r.length;o++)if(c=r[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var Jn;(function(t){t.pop="pop",t.push="push"})(Jn||(Jn={}));var Un;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Un||(Un={}));function _m(t){if(!t)if(un){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),fm(t)}const vm=/^[^#]+#/;function ym(t,e){return t.replace(vm,"#")+e}function wm(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const os=()=>({left:window.pageXOffset,top:window.pageYOffset});function bm(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=wm(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function ia(t,e){return(history.state?history.state.position-e:-1)+t}const oi=new Map;function Im(t,e){oi.set(t,e)}function Em(t){const e=oi.get(t);return oi.delete(t),e}let Tm=()=>location.protocol+"//"+location.host;function kl(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let c=s.includes(t.slice(i))?t.slice(i).length:1,a=s.slice(c);return a[0]!=="/"&&(a="/"+a),ra(a,"")}return ra(n,t)+r+s}function Rm(t,e,n,r){let s=[],i=[],o=null;const c=({state:p})=>{const m=kl(t,location),_=n.value,y=e.value;let T=0;if(p){if(n.value=m,e.value=p,o&&o===_){o=null;return}T=y?p.position-y.position:0}else r(m);s.forEach(S=>{S(n.value,_,{delta:T,type:Jn.pop,direction:T?T>0?Un.forward:Un.back:Un.unknown})})};function a(){o=n.value}function l(p){s.push(p);const m=()=>{const _=s.indexOf(p);_>-1&&s.splice(_,1)};return i.push(m),m}function u(){const{history:p}=window;p.state&&p.replaceState(te({},p.state,{scroll:os()}),"")}function f(){for(const p of i)p();i=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:l,destroy:f}}function oa(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?os():null}}function Sm(t){const{history:e,location:n}=window,r={value:kl(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(a,l,u){const f=t.indexOf("#"),p=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+a:Tm()+t+a;try{e[u?"replaceState":"pushState"](l,"",p),s.value=l}catch(m){console.error(m),n[u?"replace":"assign"](p)}}function o(a,l){const u=te({},e.state,oa(s.value.back,a,s.value.forward,!0),l,{position:s.value.position});i(a,u,!0),r.value=a}function c(a,l){const u=te({},s.value,e.state,{forward:a,scroll:os()});i(u.current,u,!0);const f=te({},oa(r.value,a,null),{position:u.position+1},l);i(a,f,!1),r.value=a}return{location:r,state:s,push:c,replace:o}}function Am(t){t=_m(t);const e=Sm(t),n=Rm(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=te({location:"",base:t,go:r,createHref:ym.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function Cm(t){return typeof t=="string"||t&&typeof t=="object"}function Nl(t){return typeof t=="string"||typeof t=="symbol"}const mt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},xl=Symbol("");var aa;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(aa||(aa={}));function wn(t,e){return te(new Error,{type:t,[xl]:!0},e)}function it(t,e){return t instanceof Error&&xl in t&&(e==null||!!(t.type&e))}const ca="[^/]+?",Pm={sensitive:!1,strict:!1,start:!0,end:!0},Om=/[.+*?^${}()[\]/\\]/g;function km(t,e){const n=te({},Pm,e),r=[];let s=n.start?"^":"";const i=[];for(const l of t){const u=l.length?[]:[90];n.strict&&!l.length&&(s+="/");for(let f=0;f<l.length;f++){const p=l[f];let m=40+(n.sensitive?.25:0);if(p.type===0)f||(s+="/"),s+=p.value.replace(Om,"\\$&"),m+=40;else if(p.type===1){const{value:_,repeatable:y,optional:T,regexp:S}=p;i.push({name:_,repeatable:y,optional:T});const x=S||ca;if(x!==ca){m+=10;try{new RegExp(`(${x})`)}catch(O){throw new Error(`Invalid custom RegExp for param "${_}" (${x}): `+O.message)}}let H=y?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;f||(H=T&&l.length<2?`(?:/${H})`:"/"+H),T&&(H+="?"),s+=H,m+=20,T&&(m+=-8),y&&(m+=-20),x===".*"&&(m+=-50)}u.push(m)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function c(l){const u=l.match(o),f={};if(!u)return null;for(let p=1;p<u.length;p++){const m=u[p]||"",_=i[p-1];f[_.name]=m&&_.repeatable?m.split("/"):m}return f}function a(l){let u="",f=!1;for(const p of t){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const m of p)if(m.type===0)u+=m.value;else if(m.type===1){const{value:_,repeatable:y,optional:T}=m,S=_ in l?l[_]:"";if(He(S)&&!y)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const x=He(S)?S.join("/"):S;if(!x)if(T)p.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${_}"`);u+=x}}return u||"/"}return{re:o,score:r,keys:i,parse:c,stringify:a}}function Nm(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function xm(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=Nm(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(la(r))return 1;if(la(s))return-1}return s.length-r.length}function la(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const $m={type:0,value:""},Dm=/[a-zA-Z0-9_]/;function Lm(t){if(!t)return[[]];if(t==="/")return[[$m]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${l}": ${m}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let c=0,a,l="",u="";function f(){l&&(n===0?i.push({type:0,value:l}):n===1||n===2||n===3?(i.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:l,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),l="")}function p(){l+=a}for(;c<t.length;){if(a=t[c++],a==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:a==="/"?(l&&f(),o()):a===":"?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:a==="("?n=2:Dm.test(a)?p():(f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),s}function Mm(t,e,n){const r=km(Lm(t.path),n),s=te(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function Um(t,e){const n=[],r=new Map;e=fa({strict:!1,end:!0,sensitive:!1},e);function s(u){return r.get(u)}function i(u,f,p){const m=!p,_=Fm(u);_.aliasOf=p&&p.record;const y=fa(e,u),T=[_];if("alias"in u){const H=typeof u.alias=="string"?[u.alias]:u.alias;for(const O of H)T.push(te({},_,{components:p?p.record.components:_.components,path:O,aliasOf:p?p.record:_}))}let S,x;for(const H of T){const{path:O}=H;if(f&&O[0]!=="/"){const j=f.record.path,W=j[j.length-1]==="/"?"":"/";H.path=f.record.path+(O&&W+O)}if(S=Mm(H,f,y),p?p.alias.push(S):(x=x||S,x!==S&&x.alias.push(S),m&&u.name&&!da(S)&&o(u.name)),_.children){const j=_.children;for(let W=0;W<j.length;W++)i(j[W],S,p&&p.children[W])}p=p||S,(S.record.components&&Object.keys(S.record.components).length||S.record.name||S.record.redirect)&&a(S)}return x?()=>{o(x)}:Mn}function o(u){if(Nl(u)){const f=r.get(u);f&&(r.delete(u),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(u);f>-1&&(n.splice(f,1),u.record.name&&r.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function c(){return n}function a(u){let f=0;for(;f<n.length&&xm(u,n[f])>=0&&(u.record.path!==n[f].record.path||!$l(u,n[f]));)f++;n.splice(f,0,u),u.record.name&&!da(u)&&r.set(u.record.name,u)}function l(u,f){let p,m={},_,y;if("name"in u&&u.name){if(p=r.get(u.name),!p)throw wn(1,{location:u});y=p.record.name,m=te(ua(f.params,p.keys.filter(x=>!x.optional).map(x=>x.name)),u.params&&ua(u.params,p.keys.map(x=>x.name))),_=p.stringify(m)}else if("path"in u)_=u.path,p=n.find(x=>x.re.test(_)),p&&(m=p.parse(_),y=p.record.name);else{if(p=f.name?r.get(f.name):n.find(x=>x.re.test(f.path)),!p)throw wn(1,{location:u,currentLocation:f});y=p.record.name,m=te({},f.params,u.params),_=p.stringify(m)}const T=[];let S=p;for(;S;)T.unshift(S.record),S=S.parent;return{name:y,path:_,params:m,matched:T,meta:jm(T)}}return t.forEach(u=>i(u)),{addRoute:i,resolve:l,removeRoute:o,getRoutes:c,getRecordMatcher:s}}function ua(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Fm(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:Bm(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function Bm(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function da(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function jm(t){return t.reduce((e,n)=>te(e,n.meta),{})}function fa(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function $l(t,e){return e.children.some(n=>n===t||$l(t,n))}const Dl=/#/g,Vm=/&/g,Hm=/\//g,Wm=/=/g,zm=/\?/g,Ll=/\+/g,Km=/%5B/g,qm=/%5D/g,Ml=/%5E/g,Gm=/%60/g,Ul=/%7B/g,Jm=/%7C/g,Fl=/%7D/g,Ym=/%20/g;function ji(t){return encodeURI(""+t).replace(Jm,"|").replace(Km,"[").replace(qm,"]")}function Xm(t){return ji(t).replace(Ul,"{").replace(Fl,"}").replace(Ml,"^")}function ai(t){return ji(t).replace(Ll,"%2B").replace(Ym,"+").replace(Dl,"%23").replace(Vm,"%26").replace(Gm,"`").replace(Ul,"{").replace(Fl,"}").replace(Ml,"^")}function Qm(t){return ai(t).replace(Wm,"%3D")}function Zm(t){return ji(t).replace(Dl,"%23").replace(zm,"%3F")}function e_(t){return t==null?"":Zm(t).replace(Hm,"%2F")}function Lr(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function t_(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(Ll," "),o=i.indexOf("="),c=Lr(o<0?i:i.slice(0,o)),a=o<0?null:Lr(i.slice(o+1));if(c in e){let l=e[c];He(l)||(l=e[c]=[l]),l.push(a)}else e[c]=a}return e}function ha(t){let e="";for(let n in t){const r=t[n];if(n=Qm(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(He(r)?r.map(i=>i&&ai(i)):[r&&ai(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function n_(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=He(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const r_=Symbol(""),pa=Symbol(""),as=Symbol(""),Bl=Symbol(""),ci=Symbol("");function Pn(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function yt(t,e,n,r,s){const i=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((o,c)=>{const a=f=>{f===!1?c(wn(4,{from:n,to:e})):f instanceof Error?c(f):Cm(f)?c(wn(2,{from:e,to:f})):(i&&r.enterCallbacks[s]===i&&typeof f=="function"&&i.push(f),o())},l=t.call(r&&r.instances[s],e,n,a);let u=Promise.resolve(l);t.length<3&&(u=u.then(a)),u.catch(f=>c(f))})}function Ns(t,e,n,r){const s=[];for(const i of t)for(const o in i.components){let c=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(s_(c)){const l=(c.__vccOpts||c)[e];l&&s.push(yt(l,n,r,i,o))}else{let a=c();s.push(()=>a.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const u=um(l)?l.default:l;i.components[o]=u;const p=(u.__vccOpts||u)[e];return p&&yt(p,n,r,i,o)()}))}}return s}function s_(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function ga(t){const e=Pe(as),n=Pe(Bl),r=K(()=>e.resolve(M(t.to))),s=K(()=>{const{matched:a}=r.value,{length:l}=a,u=a[l-1],f=n.matched;if(!u||!f.length)return-1;const p=f.findIndex(yn.bind(null,u));if(p>-1)return p;const m=ma(a[l-2]);return l>1&&ma(u)===m&&f[f.length-1].path!==m?f.findIndex(yn.bind(null,a[l-2])):p}),i=K(()=>s.value>-1&&a_(n.params,r.value.params)),o=K(()=>s.value>-1&&s.value===n.matched.length-1&&Ol(n.params,r.value.params));function c(a={}){return o_(a)?e[M(t.replace)?"replace":"push"](M(t.to)).catch(Mn):Promise.resolve()}return{route:r,href:K(()=>r.value.href),isActive:i,isExactActive:o,navigate:c}}const i_=Zn({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:ga,setup(t,{slots:e}){const n=dt(ga(t)),{options:r}=Pe(as),s=K(()=>({[_a(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[_a(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:Hc("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),jl=i_;function o_(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function a_(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!He(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function ma(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const _a=(t,e,n)=>t??e??n,c_=Zn({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Pe(ci),s=K(()=>t.route||r.value),i=Pe(pa,0),o=K(()=>{let l=M(i);const{matched:u}=s.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),c=K(()=>s.value.matched[o.value]);zt(pa,K(()=>o.value+1)),zt(r_,c),zt(ci,s);const a=ie();return Xe(()=>[a.value,c.value,t.name],([l,u,f],[p,m,_])=>{u&&(u.instances[f]=l,m&&m!==u&&l&&l===p&&(u.leaveGuards.size||(u.leaveGuards=m.leaveGuards),u.updateGuards.size||(u.updateGuards=m.updateGuards))),l&&u&&(!m||!yn(u,m)||!p)&&(u.enterCallbacks[f]||[]).forEach(y=>y(l))},{flush:"post"}),()=>{const l=s.value,u=t.name,f=c.value,p=f&&f.components[u];if(!p)return va(n.default,{Component:p,route:l});const m=f.props[u],_=m?m===!0?l.params:typeof m=="function"?m(l):m:null,T=Hc(p,te({},_,e,{onVnodeUnmounted:S=>{S.component.isUnmounted&&(f.instances[u]=null)},ref:a}));return va(n.default,{Component:T,route:l})||T}}});function va(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Vl=c_;function l_(t){const e=Um(t.routes,t),n=t.parseQuery||t_,r=t.stringifyQuery||ha,s=t.history,i=Pn(),o=Pn(),c=Pn(),a=_d(mt);let l=mt;un&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Os.bind(null,w=>""+w),f=Os.bind(null,e_),p=Os.bind(null,Lr);function m(w,k){let C,$;return Nl(w)?(C=e.getRecordMatcher(w),$=k):$=w,e.addRoute($,C)}function _(w){const k=e.getRecordMatcher(w);k&&e.removeRoute(k)}function y(){return e.getRoutes().map(w=>w.record)}function T(w){return!!e.getRecordMatcher(w)}function S(w,k){if(k=te({},k||a.value),typeof w=="string"){const g=ks(n,w,k.path),v=e.resolve({path:g.path},k),b=s.createHref(g.fullPath);return te(g,v,{params:p(v.params),hash:Lr(g.hash),redirectedFrom:void 0,href:b})}let C;if("path"in w)C=te({},w,{path:ks(n,w.path,k.path).path});else{const g=te({},w.params);for(const v in g)g[v]==null&&delete g[v];C=te({},w,{params:f(g)}),k.params=f(k.params)}const $=e.resolve(C,k),Q=w.hash||"";$.params=u(p($.params));const d=hm(r,te({},w,{hash:Xm(Q),path:$.path})),h=s.createHref(d);return te({fullPath:d,hash:Q,query:r===ha?n_(w.query):w.query||{}},$,{redirectedFrom:void 0,href:h})}function x(w){return typeof w=="string"?ks(n,w,a.value.path):te({},w)}function H(w,k){if(l!==w)return wn(8,{from:k,to:w})}function O(w){return Y(w)}function j(w){return O(te(x(w),{replace:!0}))}function W(w){const k=w.matched[w.matched.length-1];if(k&&k.redirect){const{redirect:C}=k;let $=typeof C=="function"?C(w):C;return typeof $=="string"&&($=$.includes("?")||$.includes("#")?$=x($):{path:$},$.params={}),te({query:w.query,hash:w.hash,params:"path"in $?{}:w.params},$)}}function Y(w,k){const C=l=S(w),$=a.value,Q=w.state,d=w.force,h=w.replace===!0,g=W(C);if(g)return Y(te(x(g),{state:typeof g=="object"?te({},Q,g.state):Q,force:d,replace:h}),k||C);const v=C;v.redirectedFrom=k;let b;return!d&&pm(r,$,C)&&(b=wn(16,{to:v,from:$}),me($,$,!0,!1)),(b?Promise.resolve(b):Ee(v,$)).catch(I=>it(I)?it(I,2)?I:X(I):G(I,v,$)).then(I=>{if(I){if(it(I,2))return Y(te({replace:h},x(I.to),{state:typeof I.to=="object"?te({},Q,I.to.state):Q,force:d}),k||v)}else I=De(v,$,!0,h,Q);return ke(v,$,I),I})}function ue(w,k){const C=H(w,k);return C?Promise.reject(C):Promise.resolve()}function le(w){const k=on.values().next().value;return k&&typeof k.runWithContext=="function"?k.runWithContext(w):w()}function Ee(w,k){let C;const[$,Q,d]=u_(w,k);C=Ns($.reverse(),"beforeRouteLeave",w,k);for(const g of $)g.leaveGuards.forEach(v=>{C.push(yt(v,w,k))});const h=ue.bind(null,w,k);return C.push(h),ye(C).then(()=>{C=[];for(const g of i.list())C.push(yt(g,w,k));return C.push(h),ye(C)}).then(()=>{C=Ns(Q,"beforeRouteUpdate",w,k);for(const g of Q)g.updateGuards.forEach(v=>{C.push(yt(v,w,k))});return C.push(h),ye(C)}).then(()=>{C=[];for(const g of d)if(g.beforeEnter)if(He(g.beforeEnter))for(const v of g.beforeEnter)C.push(yt(v,w,k));else C.push(yt(g.beforeEnter,w,k));return C.push(h),ye(C)}).then(()=>(w.matched.forEach(g=>g.enterCallbacks={}),C=Ns(d,"beforeRouteEnter",w,k),C.push(h),ye(C))).then(()=>{C=[];for(const g of o.list())C.push(yt(g,w,k));return C.push(h),ye(C)}).catch(g=>it(g,8)?g:Promise.reject(g))}function ke(w,k,C){c.list().forEach($=>le(()=>$(w,k,C)))}function De(w,k,C,$,Q){const d=H(w,k);if(d)return d;const h=k===mt,g=un?history.state:{};C&&($||h?s.replace(w.fullPath,te({scroll:h&&g&&g.scroll},Q)):s.push(w.fullPath,Q)),a.value=w,me(w,k,C,h),X()}let Ne;function Nt(){Ne||(Ne=s.listen((w,k,C)=>{if(!or.listening)return;const $=S(w),Q=W($);if(Q){Y(te(Q,{replace:!0}),$).catch(Mn);return}l=$;const d=a.value;un&&Im(ia(d.fullPath,C.delta),os()),Ee($,d).catch(h=>it(h,12)?h:it(h,2)?(Y(h.to,$).then(g=>{it(g,20)&&!C.delta&&C.type===Jn.pop&&s.go(-1,!1)}).catch(Mn),Promise.reject()):(C.delta&&s.go(-C.delta,!1),G(h,$,d))).then(h=>{h=h||De($,d,!1),h&&(C.delta&&!it(h,8)?s.go(-C.delta,!1):C.type===Jn.pop&&it(h,20)&&s.go(-1,!1)),ke($,d,h)}).catch(Mn)}))}let st=Pn(),de=Pn(),Z;function G(w,k,C){X(w);const $=de.list();return $.length?$.forEach(Q=>Q(w,k,C)):console.error(w),Promise.reject(w)}function Le(){return Z&&a.value!==mt?Promise.resolve():new Promise((w,k)=>{st.add([w,k])})}function X(w){return Z||(Z=!w,Nt(),st.list().forEach(([k,C])=>w?C(w):k()),st.reset()),w}function me(w,k,C,$){const{scrollBehavior:Q}=t;if(!un||!Q)return Promise.resolve();const d=!C&&Em(ia(w.fullPath,0))||($||!C)&&history.state&&history.state.scroll||null;return Cr().then(()=>Q(w,k,d)).then(h=>h&&bm(h)).catch(h=>G(h,w,k))}const ce=w=>s.go(w);let sn;const on=new Set,or={currentRoute:a,listening:!0,addRoute:m,removeRoute:_,hasRoute:T,getRoutes:y,resolve:S,options:t,push:O,replace:j,go:ce,back:()=>ce(-1),forward:()=>ce(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:de.add,isReady:Le,install(w){const k=this;w.component("RouterLink",jl),w.component("RouterView",Vl),w.config.globalProperties.$router=k,Object.defineProperty(w.config.globalProperties,"$route",{enumerable:!0,get:()=>M(a)}),un&&!sn&&a.value===mt&&(sn=!0,O(s.location).catch(Q=>{}));const C={};for(const Q in mt)Object.defineProperty(C,Q,{get:()=>a.value[Q],enumerable:!0});w.provide(as,k),w.provide(Bl,lc(C)),w.provide(ci,a);const $=w.unmount;on.add(w),w.unmount=function(){on.delete(w),on.size<1&&(l=mt,Ne&&Ne(),Ne=null,a.value=mt,sn=!1,Z=!1),$()}}};function ye(w){return w.reduce((k,C)=>k.then(()=>le(C)),Promise.resolve())}return or}function u_(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(l=>yn(l,c))?r.push(c):n.push(c));const a=t.matched[o];a&&(e.matched.find(l=>yn(l,a))||s.push(a))}return[n,r,s]}function d_(){return Pe(as)}const f_=Zn({__name:"App",setup(t){return(e,n)=>(Ye(),Pi(M(Vl)))}}),h_="modulepreload",p_=function(t){return"/vue-project/"+t},ya={},ln=function(e,n,r){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=p_(i),i in ya)return;ya[i]=!0;const o=i.endsWith(".css"),c=o?'[rel="stylesheet"]':"";if(!!r)for(let u=s.length-1;u>=0;u--){const f=s[u];if(f.href===i&&(!o||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${c}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":h_,o||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),o)return new Promise((u,f)=>{l.addEventListener("load",u),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})};function Vi(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function wa(t){return t!==void 0&&t.enterprise!==void 0}class g_{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}function Hl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const m_=Hl,Wl=new tn("auth","Firebase",Hl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=new xi("@firebase/auth");function __(t,...e){Mr.logLevel<=re.WARN&&Mr.warn(`Auth (${tr}): ${t}`,...e)}function wr(t,...e){Mr.logLevel<=re.ERROR&&Mr.error(`Auth (${tr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(t,...e){throw Hi(t,...e)}function Ze(t,...e){return Hi(t,...e)}function zl(t,e,n){const r=Object.assign(Object.assign({},m_()),{[e]:n});return new tn("auth","Firebase",r).create(e,{appName:t.name})}function v_(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&xe(t,"argument-error"),zl(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Hi(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Wl.create(t,...e)}function F(t,e,...n){if(!t)throw Hi(e,...n)}function ct(t){const e="INTERNAL ASSERTION FAILED: "+t;throw wr(e),new Error(e)}function ht(t,e){t||ct(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function y_(){return ba()==="http:"||ba()==="https:"}function ba(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(y_()||Xc()||"connection"in navigator)?navigator.onLine:!0}function b_(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,n){this.shortDelay=e,this.longDelay=n,ht(n>e,"Short delay should be less than long delay!"),this.isMobile=fh()||hh()}get(){return w_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(t,e){ht(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=new nr(3e4,6e4);function nn(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Ot(t,e,n,r,s={}){return ql(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=er(Object.assign({key:t.config.apiKey},o)).slice(1),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode),Kl.fetch()(Gl(t,t.config.apiHost,n,c),Object.assign({method:e,headers:a,referrerPolicy:"no-referrer"},i))})}async function ql(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},I_),e);try{const s=new T_(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw gr(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[a,l]=c.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw gr(t,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw gr(t,"email-already-in-use",o);if(a==="USER_DISABLED")throw gr(t,"user-disabled",o);const u=r[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw zl(t,u,l);xe(t,u)}}catch(s){if(s instanceof rt)throw s;xe(t,"network-request-failed",{message:String(s)})}}async function rr(t,e,n,r,s={}){const i=await Ot(t,e,n,r,s);return"mfaPendingCredential"in i&&xe(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Gl(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Wi(t.config,s):`${t.config.apiScheme}://${s}`}class T_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Ze(this.auth,"network-request-failed")),E_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function gr(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Ze(t,e,r);return s.customData._tokenResponse=n,s}async function R_(t,e){return Ot(t,"GET","/v2/recaptchaConfig",nn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function S_(t,e){return Ot(t,"POST","/v1/accounts:delete",e)}async function A_(t,e){return Ot(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function C_(t,e=!1){const n=$e(t),r=await n.getIdToken(e),s=zi(r);F(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Fn(xs(s.auth_time)),issuedAtTime:Fn(xs(s.iat)),expirationTime:Fn(xs(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function xs(t){return Number(t)*1e3}function zi(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return wr("JWT malformed, contained fewer than 3 sections"),null;try{const s=Gc(n);return s?JSON.parse(s):(wr("Failed to decode base64 JWT payload"),null)}catch(s){return wr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function P_(t){const e=zi(t);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof rt&&O_(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function O_({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Fn(this.lastLoginAt),this.creationTime=Fn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ur(t){var e;const n=t.auth,r=await t.getIdToken(),s=await bn(t,A_(n,{idToken:r}));F(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?$_(i.providerUserInfo):[],c=x_(t.providerData,o),a=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),u=a?l:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Jl(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,f)}async function N_(t){const e=$e(t);await Ur(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function x_(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function $_(t){return t.map(e=>{var{providerId:n}=e,r=Vi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D_(t,e){const n=await ql(t,{},async()=>{const r=er({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Gl(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Kl.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):P_(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return F(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await D_(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Yn;return r&&(F(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(F(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(F(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yn,this.toJSON())}_performRefresh(){return ct("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(t,e){F(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class qt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Vi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new k_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Jl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await bn(this,this.stsTokenManager.getToken(this.auth,e));return F(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return C_(this,e)}reload(){return N_(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new qt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ur(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await bn(this,S_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,c,a,l,u;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(s=n.email)!==null&&s!==void 0?s:void 0,m=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,_=(o=n.photoURL)!==null&&o!==void 0?o:void 0,y=(c=n.tenantId)!==null&&c!==void 0?c:void 0,T=(a=n._redirectEventId)!==null&&a!==void 0?a:void 0,S=(l=n.createdAt)!==null&&l!==void 0?l:void 0,x=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:H,emailVerified:O,isAnonymous:j,providerData:W,stsTokenManager:Y}=n;F(H&&Y,e,"internal-error");const ue=Yn.fromJSON(this.name,Y);F(typeof H=="string",e,"internal-error"),_t(f,e.name),_t(p,e.name),F(typeof O=="boolean",e,"internal-error"),F(typeof j=="boolean",e,"internal-error"),_t(m,e.name),_t(_,e.name),_t(y,e.name),_t(T,e.name),_t(S,e.name),_t(x,e.name);const le=new qt({uid:H,auth:e,email:p,emailVerified:O,displayName:f,isAnonymous:j,photoURL:_,phoneNumber:m,tenantId:y,stsTokenManager:ue,createdAt:S,lastLoginAt:x});return W&&Array.isArray(W)&&(le.providerData=W.map(Ee=>Object.assign({},Ee))),T&&(le._redirectEventId=T),le}static async _fromIdTokenResponse(e,n,r=!1){const s=new Yn;s.updateFromServerResponse(n);const i=new qt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ur(i),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia=new Map;function lt(t){ht(t instanceof Function,"Expected a class definition");let e=Ia.get(t);return e?(ht(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ia.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Yl.type="NONE";const Ea=Yl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function br(t,e,n){return`firebase:${t}:${e}:${n}`}class gn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=br(this.userKey,s.apiKey,i),this.fullPersistenceKey=br("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?qt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new gn(lt(Ea),e,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||lt(Ea);const o=br(r,e.config.apiKey,e.name);let c=null;for(const l of n)try{const u=await l._get(o);if(u){const f=qt._fromJSON(e,u);l!==i&&(c=f),i=l;break}}catch{}const a=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!a.length?new gn(i,e,r):(i=a[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new gn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ta(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Zl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(tu(e))return"Blackberry";if(nu(e))return"Webos";if(Ki(e))return"Safari";if((e.includes("chrome/")||Ql(e))&&!e.includes("edge/"))return"Chrome";if(eu(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Xl(t=be()){return/firefox\//i.test(t)}function Ki(t=be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ql(t=be()){return/crios\//i.test(t)}function Zl(t=be()){return/iemobile/i.test(t)}function eu(t=be()){return/android/i.test(t)}function tu(t=be()){return/blackberry/i.test(t)}function nu(t=be()){return/webos/i.test(t)}function cs(t=be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function L_(t=be()){var e;return cs(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function M_(){return ph()&&document.documentMode===10}function ru(t=be()){return cs(t)||eu(t)||nu(t)||tu(t)||/windows phone/i.test(t)||Zl(t)}function U_(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function su(t,e=[]){let n;switch(t){case"Browser":n=Ta(be());break;case"Worker":n=`${Ta(be())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${tr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const a=e(i);o(a)}catch(a){c(a)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function B_(t,e={}){return Ot(t,"GET","/v2/passwordPolicy",nn(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j_=6;class V_{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:j_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,c;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=(n=a.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),a.isValid&&(a.isValid=(r=a.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),a.isValid&&(a.isValid=(s=a.containsLowercaseLetter)!==null&&s!==void 0?s:!0),a.isValid&&(a.isValid=(i=a.containsUppercaseLetter)!==null&&i!==void 0?i:!0),a.isValid&&(a.isValid=(o=a.containsNumericCharacter)!==null&&o!==void 0?o:!0),a.isValid&&(a.isValid=(c=a.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),a}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ra(this),this.idTokenSubscription=new Ra(this),this.beforeStateQueue=new F_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=lt(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await gn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===c)&&(a!=null&&a.user)&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ur(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=b_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?$e(e):null;return n&&F(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await B_(this),n=new V_(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new tn("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&lt(e)||this._popupRedirectResolver;F(n,this,"argument-error"),this.redirectPersistenceManager=await gn.create(this,[lt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const a=e.addObserver(n,r,s);return()=>{o=!0,a()}}else{const a=e.addObserver(n);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=su(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&__(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function kt(t){return $e(t)}class Ra{constructor(e){this.auth=e,this.observer=null,this.addObserver=wh(n=>this.observer=n)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W_(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function iu(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Ze("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",W_().appendChild(r)})}function z_(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const K_="https://www.google.com/recaptcha/enterprise.js?render=",q_="recaptcha-enterprise",G_="NO_RECAPTCHA";class J_{constructor(e){this.type=q_,this.auth=kt(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{R_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(a=>{if(a.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new g_(a);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(a=>{c(a)})})}function s(i,o,c){const a=window.grecaptcha;wa(a)?a.enterprise.ready(()=>{a.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(G_)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(c=>{if(!n&&wa(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}iu(K_+c).then(()=>{s(c,i,o)}).catch(a=>{o(a)})}}).catch(c=>{o(c)})})}}async function Fr(t,e,n,r=!1){const s=new J_(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y_(t,e){const n=Rn(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(qn(i,e??{}))return s;xe(s,"already-initialized")}return n.initialize({options:e})}function X_(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(lt);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Q_(t,e,n){const r=kt(t);F(r._canInitEmulator,r,"emulator-config-failed"),F(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=ou(e),{host:o,port:c}=Z_(e),a=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${a}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||ev()}function ou(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Z_(t){const e=ou(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Sa(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Sa(o)}}}function Sa(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function ev(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ct("not implemented")}_getIdTokenResponse(e){return ct("not implemented")}_linkToIdToken(e,n){return ct("not implemented")}_getReauthenticationResolver(e){return ct("not implemented")}}async function tv(t,e){return Ot(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $s(t,e){return rr(t,"POST","/v1/accounts:signInWithPassword",nn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nv(t,e){return rr(t,"POST","/v1/accounts:signInWithEmailLink",nn(t,e))}async function rv(t,e){return rr(t,"POST","/v1/accounts:signInWithEmailLink",nn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn extends qi{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Xn(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Xn(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const r={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const s=await Fr(e,r,"signInWithPassword");return $s(e,s)}else return $s(e,r).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const i=await Fr(e,r,"signInWithPassword");return $s(e,i)}else return Promise.reject(s)});case"emailLink":return nv(e,{email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return tv(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return rv(e,{idToken:n,email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mn(t,e){return rr(t,"POST","/v1/accounts:signInWithIdp",nn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sv="http://localhost";class Zt extends qi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Zt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):xe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Vi(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Zt(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return mn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,mn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,mn(e,n)}buildRequest(){const e={requestUri:sv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=er(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function ov(t){const e=Nn(xn(t)).link,n=e?Nn(xn(e)).deep_link_id:null,r=Nn(xn(t)).deep_link_id;return(r?Nn(xn(r)).link:null)||r||n||e||t}class Gi{constructor(e){var n,r,s,i,o,c;const a=Nn(xn(e)),l=(n=a.apiKey)!==null&&n!==void 0?n:null,u=(r=a.oobCode)!==null&&r!==void 0?r:null,f=iv((s=a.mode)!==null&&s!==void 0?s:null);F(l&&u&&f,"argument-error"),this.apiKey=l,this.operation=f,this.code=u,this.continueUrl=(i=a.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=a.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=a.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=ov(e);try{return new Gi(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(){this.providerId=Sn.PROVIDER_ID}static credential(e,n){return Xn._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Gi.parseLink(n);return F(r,"argument-error"),Xn._fromEmailAndCode(e,r.code,r.tenantId)}}Sn.PROVIDER_ID="password";Sn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Sn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr extends Ji{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends sr{constructor(){super("facebook.com")}static credential(e){return Zt._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bt.credential(e.oauthAccessToken)}catch{return null}}}bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";bt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends sr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Zt._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return at.credential(n,r)}catch{return null}}}at.GOOGLE_SIGN_IN_METHOD="google.com";at.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends sr{constructor(){super("github.com")}static credential(e){return Zt._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return It.credential(e.oauthAccessToken)}catch{return null}}}It.GITHUB_SIGN_IN_METHOD="github.com";It.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends sr{constructor(){super("twitter.com")}static credential(e,n){return Zt._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Et.credential(n,r)}catch{return null}}}Et.TWITTER_SIGN_IN_METHOD="twitter.com";Et.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ds(t,e){return rr(t,"POST","/v1/accounts:signUp",nn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await qt._fromIdTokenResponse(e,r,s),o=Aa(r);return new en({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Aa(r);return new en({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Aa(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br extends rt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Br.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Br(e,n,r,s)}}function au(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Br._fromErrorAndOperation(t,i,e,r):i})}async function av(t,e,n=!1){const r=await bn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return en._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cv(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await bn(t,au(r,s,e,t),n);F(i.idToken,r,"internal-error");const o=zi(i.idToken);F(o,r,"internal-error");const{sub:c}=o;return F(t.uid===c,r,"user-mismatch"),en._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&xe(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cu(t,e,n=!1){const r="signIn",s=await au(t,r,e),i=await en._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function lv(t,e){return cu(kt(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lu(t){const e=kt(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function uv(t,e,n){var r;const s=kt(t),i={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((r=s._getRecaptchaConfig())===null||r===void 0)&&r.emailPasswordEnabled){const l=await Fr(s,i,"signUpPassword");o=Ds(s,l)}else o=Ds(s,i).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const u=await Fr(s,i,"signUpPassword");return Ds(s,u)}throw l});const c=await o.catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&lu(t),l}),a=await en._fromIdTokenResponse(s,"signIn",c);return await s._updateCurrentUser(a.user),a}function dv(t,e,n){return lv($e(t),Sn.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&lu(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fv(t,e){return Ot(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hv(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=$e(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await bn(r,fv(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:a})=>a==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function pv(t,e,n,r){return $e(t).onIdTokenChanged(e,n,r)}function gv(t,e,n){return $e(t).beforeAuthStateChanged(e,n)}function uu(t,e,n,r){return $e(t).onAuthStateChanged(e,n,r)}function Aw(t){return $e(t).signOut()}const jr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(jr,"1"),this.storage.removeItem(jr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mv(){const t=be();return Ki(t)||cs(t)}const _v=1e3,vv=10;class fu extends du{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=mv()&&U_(),this.fallbackToPolling=ru(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,a)=>{this.notifyListeners(o,a)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);M_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,vv):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},_v)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}fu.type="LOCAL";const yv=fu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu extends du{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}hu.type="SESSION";const pu=hu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wv(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ls(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(n.origin,i)),a=await wv(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:a})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ls.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,a)=>{const l=Yi("",20);s.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const p=f;if(p.data.eventId===l)switch(p.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(p.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){return window}function Iv(t){et().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(){return typeof et().WorkerGlobalScope<"u"&&typeof et().importScripts=="function"}async function Ev(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Tv(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Rv(){return gu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu="firebaseLocalStorageDb",Sv=1,Vr="firebaseLocalStorage",_u="fbase_key";class ir{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function us(t,e){return t.transaction([Vr],e?"readwrite":"readonly").objectStore(Vr)}function Av(){const t=indexedDB.deleteDatabase(mu);return new ir(t).toPromise()}function ui(){const t=indexedDB.open(mu,Sv);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Vr,{keyPath:_u})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Vr)?e(r):(r.close(),await Av(),e(await ui()))})})}async function Ca(t,e,n){const r=us(t,!0).put({[_u]:e,value:n});return new ir(r).toPromise()}async function Cv(t,e){const n=us(t,!1).get(e),r=await new ir(n).toPromise();return r===void 0?null:r.value}function Pa(t,e){const n=us(t,!0).delete(e);return new ir(n).toPromise()}const Pv=800,Ov=3;class vu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ui(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Ov)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return gu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ls._getInstance(Rv()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Ev(),!this.activeServiceWorker)return;this.sender=new bv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Tv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ui();return await Ca(e,jr,"1"),await Pa(e,jr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ca(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Cv(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Pa(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=us(s,!1).getAll();return new ir(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Pv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vu.type="LOCAL";const kv=vu;new nr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yu(t,e){return e?lt(e):(F(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi extends qi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return mn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return mn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Nv(t){return cu(t.auth,new Xi(t),t.bypassAuthState)}function xv(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),cv(n,new Xi(t),t.bypassAuthState)}async function $v(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),av(n,new Xi(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(a))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Nv;case"linkViaPopup":case"linkViaRedirect":return $v;case"reauthViaPopup":case"reauthViaRedirect":return xv;default:xe(this.auth,"internal-error")}}resolve(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv=new nr(2e3,1e4);async function Lv(t,e,n){const r=kt(t);v_(t,e,Ji);const s=yu(r,n);return new Vt(r,"signInViaPopup",e,s).executeNotNull()}class Vt extends wu{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Vt.currentPopupAction&&Vt.currentPopupAction.cancel(),Vt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){ht(this.filter.length===1,"Popup operations only handle one event");const e=Yi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Vt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Dv.get())};e()}}Vt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv="pendingRedirect",Ir=new Map;class Uv extends wu{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ir.get(this.auth._key());if(!e){try{const r=await Fv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ir.set(this.auth._key(),e)}return this.bypassAuthState||Ir.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Fv(t,e){const n=Vv(e),r=jv(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Bv(t,e){Ir.set(t._key(),e)}function jv(t){return lt(t._redirectPersistence)}function Vv(t){return br(Mv,t.config.apiKey,t.name)}async function Hv(t,e,n=!1){const r=kt(t),s=yu(r,e),o=await new Uv(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wv=10*60*1e3;class zv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Kv(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!bu(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Ze(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Wv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Oa(e))}saveEventToCache(e){this.cachedEventUids.add(Oa(e)),this.lastProcessedEventTime=Date.now()}}function Oa(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function bu({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Kv(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return bu(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qv(t,e={}){return Ot(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Jv=/^https?/;async function Yv(t){if(t.config.emulator)return;const{authorizedDomains:e}=await qv(t);for(const n of e)try{if(Xv(n))return}catch{}xe(t,"unauthorized-domain")}function Xv(t){const e=li(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Jv.test(n))return!1;if(Gv.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qv=new nr(3e4,6e4);function ka(){const t=et().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Zv(t){return new Promise((e,n)=>{var r,s,i;function o(){ka(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ka(),n(Ze(t,"network-request-failed"))},timeout:Qv.get()})}if(!((s=(r=et().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=et().gapi)===null||i===void 0)&&i.load)o();else{const c=z_("iframefcb");return et()[c]=()=>{gapi.load?o():n(Ze(t,"network-request-failed"))},iu(`https://apis.google.com/js/api.js?onload=${c}`).catch(a=>n(a))}}).catch(e=>{throw Er=null,e})}let Er=null;function ey(t){return Er=Er||Zv(t),Er}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty=new nr(5e3,15e3),ny="__/auth/iframe",ry="emulator/auth/iframe",sy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},iy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function oy(t){const e=t.config;F(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Wi(e,ry):`https://${t.config.authDomain}/${ny}`,r={apiKey:e.apiKey,appName:t.name,v:tr},s=iy.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${er(r).slice(1)}`}async function ay(t){const e=await ey(t),n=et().gapi;return F(n,t,"internal-error"),e.open({where:document.body,url:oy(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:sy,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Ze(t,"network-request-failed"),c=et().setTimeout(()=>{i(o)},ty.get());function a(){et().clearTimeout(c),s(r)}r.ping(a).then(a,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ly=500,uy=600,dy="_blank",fy="http://localhost";class Na{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function hy(t,e,n,r=ly,s=uy){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const a=Object.assign(Object.assign({},cy),{width:r.toString(),height:s.toString(),top:i,left:o}),l=be().toLowerCase();n&&(c=Ql(l)?dy:n),Xl(l)&&(e=e||fy,a.scrollbars="yes");const u=Object.entries(a).reduce((p,[m,_])=>`${p}${m}=${_},`,"");if(L_(l)&&c!=="_self")return py(e||"",c),new Na(null);const f=window.open(e||"",c,u);F(f,t,"popup-blocked");try{f.focus()}catch{}return new Na(f)}function py(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gy="__/auth/handler",my="emulator/auth/handler",_y=encodeURIComponent("fac");async function xa(t,e,n,r,s,i){F(t.config.authDomain,t,"auth-domain-config-required"),F(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:tr,eventId:s};if(e instanceof Ji){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",yh(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,f]of Object.entries(i||{}))o[u]=f}if(e instanceof sr){const u=e.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const u of Object.keys(c))c[u]===void 0&&delete c[u];const a=await t._getAppCheckToken(),l=a?`#${_y}=${encodeURIComponent(a)}`:"";return`${vy(t)}?${er(c).slice(1)}${l}`}function vy({config:t}){return t.emulator?Wi(t,my):`https://${t.authDomain}/${gy}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls="webStorageSupport";class yy{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=pu,this._completeRedirectFn=Hv,this._overrideRedirectResult=Bv}async _openPopup(e,n,r,s){var i;ht((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await xa(e,n,r,li(),s);return hy(e,o,Yi())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await xa(e,n,r,li(),s);return Iv(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(ht(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await ay(e),r=new zv(e);return n.register("authEvent",s=>(F(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ls,{type:Ls},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ls];o!==void 0&&n(!!o),xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Yv(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ru()||Ki()||cs()}}const wy=yy;var $a="@firebase/auth",Da="1.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Ey(t){ft(new nt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const a={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:su(t)},l=new H_(r,s,i,a);return X_(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),ft(new nt("auth-internal",e=>{const n=kt(e.getProvider("auth").getImmediate());return(r=>new by(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qe($a,Da,Iy(t)),Qe($a,Da,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ty=5*60,Ry=Yc("authIdTokenMaxAge")||Ty;let La=null;const Sy=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Ry)return;const s=n==null?void 0:n.token;La!==s&&(La=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Tr(t=rl()){const e=Rn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Y_(t,{popupRedirectResolver:wy,persistence:[kv,yv,pu]}),r=Yc("authTokenSyncURL");if(r){const i=Sy(r);gv(n,i,()=>i(n.currentUser)),pv(n,o=>i(o))}const s=uh("auth");return s&&Q_(n,`http://${s}`),n}Ey("Browser");function Ma(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,r)}return n}function wt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Ma(Object(n),!0).forEach(function(r){Ay(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ma(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Ay(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Ua(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return Object.keys(t).reduce((n,r)=>(e.includes(r)||(n[r]=M(t[r])),n),{})}function Hr(t){return typeof t=="function"}function Cy(t){return Wt(t)||Gt(t)}function Iu(t,e,n){let r=t;const s=e.split(".");for(let i=0;i<s.length;i++){if(!r[s[i]])return n;r=r[s[i]]}return r}function Ms(t,e,n){return K(()=>t.some(r=>Iu(e,r,{[n]:!1})[n]))}function Fa(t,e,n){return K(()=>t.reduce((r,s)=>{const i=Iu(e,s,{[n]:!1})[n]||[];return r.concat(i)},[]))}function Eu(t,e,n,r){return t.call(r,M(e),M(n),r)}function Tu(t){return t.$valid!==void 0?!t.$valid:!t}function Py(t,e,n,r,s,i,o){let{$lazy:c,$rewardEarly:a}=s,l=arguments.length>7&&arguments[7]!==void 0?arguments[7]:[],u=arguments.length>8?arguments[8]:void 0,f=arguments.length>9?arguments[9]:void 0,p=arguments.length>10?arguments[10]:void 0;const m=ie(!!r.value),_=ie(0);n.value=!1;const y=Xe([e,r].concat(l,p),()=>{if(c&&!r.value||a&&!f.value&&!n.value)return;let T;try{T=Eu(t,e,u,o)}catch(S){T=Promise.reject(S)}_.value++,n.value=!!_.value,m.value=!1,Promise.resolve(T).then(S=>{_.value--,n.value=!!_.value,i.value=S,m.value=Tu(S)}).catch(S=>{_.value--,n.value=!!_.value,i.value=S,m.value=!0})},{immediate:!0,deep:typeof e=="object"});return{$invalid:m,$unwatch:y}}function Oy(t,e,n,r,s,i,o,c){let{$lazy:a,$rewardEarly:l}=r;const u=()=>({}),f=K(()=>{if(a&&!n.value||l&&!c.value)return!1;let p=!0;try{const m=Eu(t,e,o,i);s.value=m,p=Tu(m)}catch(m){s.value=m}return p});return{$unwatch:u,$invalid:f}}function ky(t,e,n,r,s,i,o,c,a,l,u){const f=ie(!1),p=t.$params||{},m=ie(null);let _,y;t.$async?{$invalid:_,$unwatch:y}=Py(t.$validator,e,f,n,r,m,s,t.$watchTargets,a,l,u):{$invalid:_,$unwatch:y}=Oy(t.$validator,e,n,r,m,s,a,l);const T=t.$message;return{$message:Hr(T)?K(()=>T(Ua({$pending:f,$invalid:_,$params:Ua(p),$model:e,$response:m,$validator:i,$propertyPath:c,$property:o}))):T||"",$params:p,$pending:f,$invalid:_,$response:m,$unwatch:y}}function Ny(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const e=M(t),n=Object.keys(e),r={},s={},i={};let o=null;return n.forEach(c=>{const a=e[c];switch(!0){case Hr(a.$validator):r[c]=a;break;case Hr(a):r[c]={$validator:a};break;case c==="$validationGroups":o=a;break;case c.startsWith("$"):i[c]=a;break;default:s[c]=a}}),{rules:r,nestedValidators:s,config:i,validationGroups:o}}const xy="__root";function $y(t,e,n,r,s,i,o,c,a){const l=Object.keys(t),u=r.get(s,t),f=ie(!1),p=ie(!1),m=ie(0);if(u){if(!u.$partial)return u;u.$unwatch(),f.value=u.$dirty.value}const _={$dirty:f,$path:s,$touch:()=>{f.value||(f.value=!0)},$reset:()=>{f.value&&(f.value=!1)},$commit:()=>{}};return l.length?(l.forEach(y=>{_[y]=ky(t[y],e,_.$dirty,i,o,y,n,s,a,p,m)}),_.$externalResults=K(()=>c.value?[].concat(c.value).map((y,T)=>({$propertyPath:s,$property:n,$validator:"$externalResults",$uid:`${s}-externalResult-${T}`,$message:y,$params:{},$response:null,$pending:!1})):[]),_.$invalid=K(()=>{const y=l.some(T=>M(_[T].$invalid));return p.value=y,!!_.$externalResults.value.length||y}),_.$pending=K(()=>l.some(y=>M(_[y].$pending))),_.$error=K(()=>_.$dirty.value?_.$pending.value||_.$invalid.value:!1),_.$silentErrors=K(()=>l.filter(y=>M(_[y].$invalid)).map(y=>{const T=_[y];return dt({$propertyPath:s,$property:n,$validator:y,$uid:`${s}-${y}`,$message:T.$message,$params:T.$params,$response:T.$response,$pending:T.$pending})}).concat(_.$externalResults.value)),_.$errors=K(()=>_.$dirty.value?_.$silentErrors.value:[]),_.$unwatch=()=>l.forEach(y=>{_[y].$unwatch()}),_.$commit=()=>{p.value=!0,m.value=Date.now()},r.set(s,t,_),_):(u&&r.set(s,t,_),_)}function Dy(t,e,n,r,s,i,o){const c=Object.keys(t);return c.length?c.reduce((a,l)=>(a[l]=di({validations:t[l],state:e,key:l,parentKey:n,resultsCache:r,globalConfig:s,instance:i,externalResults:o}),a),{}):{}}function Ly(t,e,n){const r=K(()=>[e,n].filter(_=>_).reduce((_,y)=>_.concat(Object.values(M(y))),[])),s=K({get(){return t.$dirty.value||(r.value.length?r.value.every(_=>_.$dirty):!1)},set(_){t.$dirty.value=_}}),i=K(()=>{const _=M(t.$silentErrors)||[],y=r.value.filter(T=>(M(T).$silentErrors||[]).length).reduce((T,S)=>T.concat(...S.$silentErrors),[]);return _.concat(y)}),o=K(()=>{const _=M(t.$errors)||[],y=r.value.filter(T=>(M(T).$errors||[]).length).reduce((T,S)=>T.concat(...S.$errors),[]);return _.concat(y)}),c=K(()=>r.value.some(_=>_.$invalid)||M(t.$invalid)||!1),a=K(()=>r.value.some(_=>M(_.$pending))||M(t.$pending)||!1),l=K(()=>r.value.some(_=>_.$dirty)||r.value.some(_=>_.$anyDirty)||s.value),u=K(()=>s.value?a.value||c.value:!1),f=()=>{t.$touch(),r.value.forEach(_=>{_.$touch()})},p=()=>{t.$commit(),r.value.forEach(_=>{_.$commit()})},m=()=>{t.$reset(),r.value.forEach(_=>{_.$reset()})};return r.value.length&&r.value.every(_=>_.$dirty)&&f(),{$dirty:s,$errors:o,$invalid:c,$anyDirty:l,$error:u,$pending:a,$touch:f,$reset:m,$silentErrors:i,$commit:p}}function di(t){let{validations:e,state:n,key:r,parentKey:s,childResults:i,resultsCache:o,globalConfig:c={},instance:a,externalResults:l}=t;const u=s?`${s}.${r}`:r,{rules:f,nestedValidators:p,config:m,validationGroups:_}=Ny(e),y=wt(wt({},c),m),T=r?K(()=>{const X=M(n);return X?M(X[r]):void 0}):n,S=wt({},M(l)||{}),x=K(()=>{const X=M(l);return r?X?M(X[r]):void 0:X}),H=$y(f,T,r,o,u,y,a,x,n),O=Dy(p,T,u,o,y,a,x),j={};_&&Object.entries(_).forEach(X=>{let[me,ce]=X;j[me]={$invalid:Ms(ce,O,"$invalid"),$error:Ms(ce,O,"$error"),$pending:Ms(ce,O,"$pending"),$errors:Fa(ce,O,"$errors"),$silentErrors:Fa(ce,O,"$silentErrors")}});const{$dirty:W,$errors:Y,$invalid:ue,$anyDirty:le,$error:Ee,$pending:ke,$touch:De,$reset:Ne,$silentErrors:Nt,$commit:st}=Ly(H,O,i),de=r?K({get:()=>M(T),set:X=>{W.value=!0;const me=M(n),ce=M(l);ce&&(ce[r]=S[r]),pe(me[r])?me[r].value=X:me[r]=X}}):null;r&&y.$autoDirty&&Xe(T,()=>{W.value||De();const X=M(l);X&&(X[r]=S[r])},{flush:"sync"});async function Z(){return De(),y.$rewardEarly&&(st(),await Cr()),await Cr(),new Promise(X=>{if(!ke.value)return X(!ue.value);const me=Xe(ke,()=>{X(!ue.value),me()})})}function G(X){return(i.value||{})[X]}function Le(){pe(l)?l.value=S:Object.keys(S).length===0?Object.keys(l).forEach(X=>{delete l[X]}):Object.assign(l,S)}return dt(wt(wt(wt({},H),{},{$model:de,$dirty:W,$error:Ee,$errors:Y,$invalid:ue,$anyDirty:le,$pending:ke,$touch:De,$reset:Ne,$path:u||xy,$silentErrors:Nt,$validate:Z,$commit:st},i&&{$getResultsForChild:G,$clearExternalResults:Le,$validationGroups:j}),O))}class My{constructor(){this.storage=new Map}set(e,n,r){this.storage.set(e,{rules:n,result:r})}checkRulesValidity(e,n,r){const s=Object.keys(r),i=Object.keys(n);return i.length!==s.length||!i.every(c=>s.includes(c))?!1:i.every(c=>n[c].$params?Object.keys(n[c].$params).every(a=>M(r[c].$params[a])===M(n[c].$params[a])):!0)}get(e,n){const r=this.storage.get(e);if(!r)return;const{rules:s,result:i}=r,o=this.checkRulesValidity(e,n,s),c=i.$unwatch?i.$unwatch:()=>({});return o?i:{$dirty:i.$dirty,$partial:!0,$unwatch:c}}}const Rr={COLLECT_ALL:!0,COLLECT_NONE:!1},Ba=Symbol("vuelidate#injectChildResults"),ja=Symbol("vuelidate#removeChildResults");function Uy(t){let{$scope:e,instance:n}=t;const r={},s=ie([]),i=K(()=>s.value.reduce((u,f)=>(u[f]=M(r[f]),u),{}));function o(u,f){let{$registerAs:p,$scope:m,$stopPropagation:_}=f;_||e===Rr.COLLECT_NONE||m===Rr.COLLECT_NONE||e!==Rr.COLLECT_ALL&&e!==m||(r[p]=u,s.value.push(p))}n.__vuelidateInjectInstances=[].concat(n.__vuelidateInjectInstances||[],o);function c(u){s.value=s.value.filter(f=>f!==u),delete r[u]}n.__vuelidateRemoveInstances=[].concat(n.__vuelidateRemoveInstances||[],c);const a=Pe(Ba,[]);zt(Ba,n.__vuelidateInjectInstances);const l=Pe(ja,[]);return zt(ja,n.__vuelidateRemoveInstances),{childResults:i,sendValidationResultsToParent:a,removeValidationResultsFromParent:l}}function Ru(t){return new Proxy(t,{get(e,n){return typeof e[n]=="object"?Ru(e[n]):K(()=>e[n])}})}let Va=0;function Fy(t,e){var n;let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};arguments.length===1&&(r=t,t=void 0,e=void 0);let{$registerAs:s,$scope:i=Rr.COLLECT_ALL,$stopPropagation:o,$externalResults:c,currentVueInstance:a}=r;const l=a||((n=bf())===null||n===void 0?void 0:n.proxy),u=l?l.$options:{};s||(Va+=1,s=`_vuelidate_${Va}`);const f=ie({}),p=new My,{childResults:m,sendValidationResultsToParent:_,removeValidationResultsFromParent:y}=l?Uy({$scope:i,instance:l}):{childResults:ie({})};if(!t&&u.validations){const T=u.validations;e=ie({}),Si(()=>{e.value=l,Xe(()=>Hr(T)?T.call(e.value,new Ru(e.value)):T,S=>{f.value=di({validations:S,state:e,childResults:m,resultsCache:p,globalConfig:r,instance:l,externalResults:c||l.vuelidateExternalResults})},{immediate:!0})}),r=u.validationsConfig||r}else{const T=pe(t)||Cy(t)?t:dt(t||{});Xe(T,S=>{f.value=di({validations:S,state:e,childResults:m,resultsCache:p,globalConfig:r,instance:l??{},externalResults:c})},{immediate:!0})}return l&&(_.forEach(T=>T(f,{$registerAs:s,$scope:i,$stopPropagation:o})),Sc(()=>y.forEach(T=>T(s)))),K(()=>wt(wt({},M(f.value)),m.value))}const ds=t=>{if(t=M(t),Array.isArray(t))return!!t.length;if(t==null)return!1;if(t===!1)return!0;if(t instanceof Date)return!isNaN(t.getTime());if(typeof t=="object"){for(let e in t)return!0;return!1}return!!String(t).length},Su=t=>(t=M(t),Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:String(t).length);function rn(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return r=>(r=M(r),!ds(r)||e.every(s=>(s.lastIndex=0,s.test(r))))}rn(/^[a-zA-Z]*$/);rn(/^[a-zA-Z0-9]*$/);rn(/^\d*(\.\d+)?$/);const By=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;var jy=rn(By),Vy={$validator:jy,$message:"Value is not a valid email address",$params:{type:"email"}};function Hy(t){return e=>!ds(e)||Su(e)<=M(t)}function Wy(t){return{$validator:Hy(t),$message:e=>{let{$params:n}=e;return`The maximum length allowed is ${n.max}`},$params:{max:t,type:"maxLength"}}}function zy(t){return e=>!ds(e)||Su(e)>=M(t)}function Ky(t){return{$validator:zy(t),$message:e=>{let{$params:n}=e;return`This field should be at least ${n.min} characters long`},$params:{min:t,type:"minLength"}}}function qy(t){return typeof t=="string"&&(t=t.trim()),ds(t)}var Ha={$validator:qy,$message:"Value is required",$params:{type:"required"}};const Gy=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;rn(Gy);rn(/(^[0-9]*$)|(^-[0-9]+$)/);rn(/^[-]?\d*(\.\d+)?$/);const Jy=t=>(Cd("data-v-2f6d0191"),t=t(),Pd(),t),Yy={class:"icon"},Xy={class:"text"},Qy=Jy(()=>ee("div",{class:"indicator"},null,-1)),Zy=Zn({__name:"IndicatorNavi",setup(t){const e=ie(["--clr:#f3218b;","--clr:#2196f3;","--clr:#008a1b;","--clr:#dc1dff;","--clr:#d56f1d;"]),{activeLink:n,routes:r,updateActiveLink:s}=Pe("indicatorNavi");return(i,o)=>{const c=Pc("ion-icon");return Ye(),Mt("section",{class:"nav show-nav",style:hn(`--widthSection:${70*M(r).length+50}px;`)},[ee("nav",{style:hn(`--widthNavTag:${70*M(r).length}px;`)},[(Ye(!0),Mt(qe,null,Jd(M(r),(a,l)=>(Ye(),Pi(M(jl),{key:a.name,to:a.to,style:hn(`${e.value[l]}`),class:Gr([M(n)===a.name&&"active"]),onClick:()=>M(s)(a.name)},{default:bc(()=>[ee("span",Yy,[he(c,{name:`${a.ionIconClass}`},null,8,["name"])]),ee("span",Xy,Ke(a.name),1)]),_:2},1032,["to","style","class","onClick"]))),128)),Qy],4)],4)}}});const Au=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},ew=Au(Zy,[["__scopeId","data-v-2f6d0191"]]),tw={class:"header"},nw={class:"login"},rw={action:""},sw={key:0,class:"input-box"},iw={for:"login-input"},ow=["placeholder"],aw={class:"icon"},cw={class:"input-box"},lw={for:"email-input"},uw=["placeholder"],dw={class:"icon"},fw={key:1,class:"form-error"},hw={class:"input-box"},pw={for:"password-input"},gw=["placeholder"],mw={class:"icon"},_w={key:2,class:"form-error"},vw={class:"input-box"},yw=["value"],ww={class:"input-box submit-google"},bw=["value"],Iw={class:"icon"},Ew={key:3,class:"form-error form-error-submit"},Tw=Zn({__name:"LoginPanel",setup(t){const e=ie("Vue Project"),n=ie("Sign In"),r=ie("Register"),s=ie("Sign In Google"),i=ie("Sign Up Google"),o=ie("User Name"),c=ie("Password"),a=ie("E-mail"),l=ie("Keep me log in"),u=ie(n.value),f=ie([{name:`${n.value}`,ionIconClass:"log-in-outline",to:""},{name:`${r.value}`,ionIconClass:"document-text-outline",to:""}]);zt("indicatorNavi",{activeLink:u,routes:f,updateActiveLink:O=>{u.value=O}});const m=ie(""),_=d_(),y=dt({displayName:"",password:"",email:"",keepLogIn:!1}),T=dt({password:{required:Ha,minLength:Ky(6),maxLength:Wy(20)},email:{required:Ha,email:Vy},keepLogIn:{}}),S=Fy(T,y);Si(async()=>{await new Promise((j,W)=>{const Y=uu(Tr(),ue=>{Y(),j(ue)},W)})&&_.push("/feed")}),Xe([()=>y.email,()=>y.password],([O,j])=>{m.value=""});const x=async O=>{O.preventDefault();const j=await S.value.$validate(),W=Tr();j&&u.value===r.value?uv(W,y.email,y.password).then(Y=>{y.displayName!==""&&hv(W.currentUser,{displayName:y.displayName}),_.push("/feed")}).catch(Y=>{switch(console.error("%c error -> ","background: #222; color: #bada55",Y.code,Y.message),Y.code){case"auth/email-already-in-use":m.value="E-mail already in use";break;default:m.value="Something went wrong";break}}):j&&u.value===n.value&&dv(W,y.email,y.password).then(Y=>{_.push("/feed")}).catch(Y=>{switch(console.error("%c error -> ","background: #222; color: #bada55",Y.code,Y.message),Y.code){case"auth/invalid-email":m.value="Invalid e-mail";break;case"auth/user-not-found":m.value="User not found";break;case"auth/wrong-password":m.value="Incorrect password";break;default:m.value="E-mail or password was Incorrect";break}})},H=O=>{O.preventDefault();const j=new at;Lv(Tr(),j).then(W=>{console.log("%c user google -> ","background: #222; color: #bada55",W.user),_.push("/feed")}).catch(W=>{console.error("%c error -> ","background: #222; color: #bada55",W.code,W.message)})};return(O,j)=>{var Y,ue;const W=Pc("ion-icon");return Ye(),Mt("main",null,[ee("header",tw,[ee("h1",null,Ke(e.value),1)]),ee("section",nw,[ee("form",rw,[ee("h2",null,Ke(u.value),1),u.value===`${r.value}`?(Ye(),Mt("span",sw,[ee("label",iw,Ke(o.value),1),hr(ee("input",{type:"text",id:"login-input",placeholder:`${o.value}...`,maxlength:"20","onUpdate:modelValue":j[0]||(j[0]=le=>y.displayName=le)},null,8,ow),[[vs,y.displayName]]),ee("span",aw,[he(W,{name:"person-circle-outline"})])])):pr("",!0),ee("span",cw,[ee("label",lw,Ke(a.value),1),hr(ee("input",{type:"text",id:"email-input",placeholder:`${a.value}...`,"onUpdate:modelValue":j[1]||(j[1]=le=>y.email=le)},null,8,uw),[[vs,y.email]]),ee("span",dw,[he(W,{name:"mail-outline"})])]),M(S).email.$error?(Ye(),Mt("span",fw,Ke(((Y=M(S).email.$errors[0])==null?void 0:Y.$message)||((ue=M(S).email.$errors[0])==null?void 0:ue.$response.$message)),1)):pr("",!0),ee("span",hw,[ee("label",pw,Ke(c.value),1),hr(ee("input",{type:"password",id:"password-input",placeholder:`${c.value}...`,"onUpdate:modelValue":j[2]||(j[2]=le=>y.password=le)},null,8,gw),[[vs,y.password]]),ee("span",mw,[he(W,{name:"lock-closed-outline"})])]),M(S).password.$error?(Ye(),Mt("span",_w,Ke(M(S).password.$errors[0].$message),1)):pr("",!0),ee("label",null,[hr(ee("input",{type:"checkbox","onUpdate:modelValue":j[3]||(j[3]=le=>y.keepLogIn=le)},null,512),[[Gf,y.keepLogIn]]),Bc(Ke(l.value),1)]),ee("span",vw,[ee("input",{type:"submit",value:u.value,onClick:j[4]||(j[4]=le=>x(le))},null,8,yw)]),ee("span",ww,[ee("input",{type:"submit",value:u.value===`${n.value}`?s.value:i.value,onClick:H},null,8,bw),ee("span",Iw,[he(W,{name:"logo-google"})])]),m.value?(Ye(),Mt("span",Ew,Ke(m.value),1)):pr("",!0)])]),he(ew)])}}});const Wa=Au(Tw,[["__scopeId","data-v-51280b17"]]);const Cu=l_({history:Am("/vue-project/"),routes:[{path:"/",name:"home",component:Wa},{path:"/:pathMatch(.*)*",name:"not-found",component:Wa},{path:"/feed",name:"feed",component:()=>ln(()=>import("./FeedPanel-094ad3dd.js"),[]),meta:{requiresAuth:!0}},{path:"/feed/reflex-game",name:"reflex",component:()=>ln(()=>import("./FeedPanel-094ad3dd.js"),[]),meta:{requiresAuth:!0}},{path:"/feed/duel-game",name:"duel",component:()=>ln(()=>import("./FeedPanel-094ad3dd.js"),[]),meta:{requiresAuth:!0}},{path:"/feed/quatro-game",name:"quatro",component:()=>ln(()=>import("./FeedPanel-094ad3dd.js"),[]),meta:{requiresAuth:!0}},{path:"/feed/settings",name:"settings",component:()=>ln(()=>import("./FeedPanel-094ad3dd.js"),[]),meta:{requiresAuth:!0}},{path:"/feed/logout",name:"logout",component:()=>ln(()=>import("./FeedPanel-094ad3dd.js"),[]),meta:{requiresAuth:!0}}]}),za=()=>new Promise((t,e)=>{const n=uu(Tr(),r=>{n(),t(r)},e)});Cu.beforeEach(async(t,e,n)=>{t.name==="home"||t.name==="not-found"?await za()?n("/feed"):n():t.matched.some(r=>r.meta.requiresAuth)?await za()?n():(alert("You don't have access!"),n("/")):n()});const Rw={apiKey:"AIzaSyBRIqo_JdB3v6nV5pAPNfkgm9NujxAup68",authDomain:"vue-project-d53d4.firebaseapp.com",projectId:"vue-project-d53d4",storageBucket:"vue-project-d53d4.appspot.com",messagingSenderId:"495070706443",appId:"1:495070706443:web:c2afce58385a473439800e",measurementId:"G-FQ88TGJMZE"},Sw=nl(Rw);om(Sw);const Qi=Qf(f_);Qi.use(nh());Qi.use(Cu);Qi.mount("#app");export{qe as F,ew as I,Au as _,uu as a,Ye as b,Mt as c,Zn as d,ee as e,Pi as f,Tr as g,pr as h,he as i,Bd as o,zt as p,ie as r,Aw as s,Ke as t,d_ as u};
