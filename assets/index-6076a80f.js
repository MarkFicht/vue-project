(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function ui(t,e){const n=Object.create(null),r=t.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return e?s=>!!n[s.toLowerCase()]:s=>!!n[s]}const ie={},cn=[],Ve=()=>{},Tu=()=>!1,Ru=/^on[^a-z]/,Vr=t=>Ru.test(t),di=t=>t.startsWith("onUpdate:"),ge=Object.assign,fi=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Su=Object.prototype.hasOwnProperty,q=(t,e)=>Su.call(t,e),U=Array.isArray,ln=t=>Xn(t)==="[object Map]",Hr=t=>Xn(t)==="[object Set]",eo=t=>Xn(t)==="[object Date]",V=t=>typeof t=="function",me=t=>typeof t=="string",Un=t=>typeof t=="symbol",oe=t=>t!==null&&typeof t=="object",Wa=t=>oe(t)&&V(t.then)&&V(t.catch),za=Object.prototype.toString,Xn=t=>za.call(t),Cu=t=>Xn(t).slice(8,-1),Ka=t=>Xn(t)==="[object Object]",hi=t=>me(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,pr=ui(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Wr=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Au=/-(\w)/g,Ze=Wr(t=>t.replace(Au,(e,n)=>n?n.toUpperCase():"")),Pu=/\B([A-Z])/g,yn=Wr(t=>t.replace(Pu,"-$1").toLowerCase()),zr=Wr(t=>t.charAt(0).toUpperCase()+t.slice(1)),us=Wr(t=>t?`on${zr(t)}`:""),Fn=(t,e)=>!Object.is(t,e),gr=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Tr=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},Ls=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let to;const Ms=()=>to||(to=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function pi(t){if(U(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=me(r)?xu(r):pi(r);if(s)for(const i in s)e[i]=s[i]}return e}else{if(me(t))return t;if(oe(t))return t}}const Ou=/;(?![^(]*\))/g,ku=/:([^]+)/,Nu=/\/\*[^]*?\*\//g;function xu(t){const e={};return t.replace(Nu,"").split(Ou).forEach(n=>{if(n){const r=n.split(ku);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Bn(t){let e="";if(me(t))e=t;else if(U(t))for(let n=0;n<t.length;n++){const r=Bn(t[n]);r&&(e+=r+" ")}else if(oe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Du="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",$u=ui(Du);function qa(t){return!!t||t===""}function Lu(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=Kr(t[r],e[r]);return n}function Kr(t,e){if(t===e)return!0;let n=eo(t),r=eo(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=Un(t),r=Un(e),n||r)return t===e;if(n=U(t),r=U(e),n||r)return n&&r?Lu(t,e):!1;if(n=oe(t),r=oe(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const c=t.hasOwnProperty(o),a=e.hasOwnProperty(o);if(c&&!a||!c&&a||!Kr(t[o],e[o]))return!1}}return String(t)===String(e)}function Ga(t,e){return t.findIndex(n=>Kr(n,e))}const Ue=t=>me(t)?t:t==null?"":U(t)||oe(t)&&(t.toString===za||!V(t.toString))?JSON.stringify(t,Ja,2):String(t),Ja=(t,e)=>e&&e.__v_isRef?Ja(t,e.value):ln(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s])=>(n[`${r} =>`]=s,n),{})}:Hr(e)?{[`Set(${e.size})`]:[...e.values()]}:oe(e)&&!U(e)&&!Ka(e)?String(e):e;let Fe;class Ya{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Fe,!e&&Fe&&(this.index=(Fe.scopes||(Fe.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=Fe;try{return Fe=this,e()}finally{Fe=n}}}on(){Fe=this}off(){Fe=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function Mu(t){return new Ya(t)}function Uu(t,e=Fe){e&&e.active&&e.effects.push(t)}function Fu(){return Fe}const gi=t=>{const e=new Set(t);return e.w=0,e.n=0,e},Xa=t=>(t.w&At)>0,Qa=t=>(t.n&At)>0,Bu=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=At},ju=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const s=e[r];Xa(s)&&!Qa(s)?s.delete(t):e[n++]=s,s.w&=~At,s.n&=~At}e.length=n}},Us=new WeakMap;let An=0,At=1;const Fs=30;let Be;const Vt=Symbol(""),Bs=Symbol("");class mi{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Uu(this,r)}run(){if(!this.active)return this.fn();let e=Be,n=Et;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=Be,Be=this,Et=!0,At=1<<++An,An<=Fs?Bu(this):no(this),this.fn()}finally{An<=Fs&&ju(this),At=1<<--An,Be=this.parent,Et=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){Be===this?this.deferStop=!0:this.active&&(no(this),this.onStop&&this.onStop(),this.active=!1)}}function no(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let Et=!0;const Za=[];function wn(){Za.push(Et),Et=!1}function bn(){const t=Za.pop();Et=t===void 0?!0:t}function Re(t,e,n){if(Et&&Be){let r=Us.get(t);r||Us.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=gi()),ec(s)}}function ec(t,e){let n=!1;An<=Fs?Qa(t)||(t.n|=At,n=!Xa(t)):n=!t.has(Be),n&&(t.add(Be),Be.deps.push(t))}function lt(t,e,n,r,s,i){const o=Us.get(t);if(!o)return;let c=[];if(e==="clear")c=[...o.values()];else if(n==="length"&&U(t)){const a=Number(r);o.forEach((l,u)=>{(u==="length"||u>=a)&&c.push(l)})}else switch(n!==void 0&&c.push(o.get(n)),e){case"add":U(t)?hi(n)&&c.push(o.get("length")):(c.push(o.get(Vt)),ln(t)&&c.push(o.get(Bs)));break;case"delete":U(t)||(c.push(o.get(Vt)),ln(t)&&c.push(o.get(Bs)));break;case"set":ln(t)&&c.push(o.get(Vt));break}if(c.length===1)c[0]&&js(c[0]);else{const a=[];for(const l of c)l&&a.push(...l);js(gi(a))}}function js(t,e){const n=U(t)?t:[...t];for(const r of n)r.computed&&ro(r);for(const r of n)r.computed||ro(r)}function ro(t,e){(t!==Be||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const Vu=ui("__proto__,__v_isRef,__isVue"),tc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Un)),Hu=_i(),Wu=_i(!1,!0),zu=_i(!0),so=Ku();function Ku(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=J(this);for(let i=0,o=this.length;i<o;i++)Re(r,"get",i+"");const s=r[e](...n);return s===-1||s===!1?r[e](...n.map(J)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){wn();const r=J(this)[e].apply(this,n);return bn(),r}}),t}function qu(t){const e=J(this);return Re(e,"has",t),e.hasOwnProperty(t)}function _i(t=!1,e=!1){return function(r,s,i){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_isShallow")return e;if(s==="__v_raw"&&i===(t?e?ld:oc:e?ic:sc).get(r))return r;const o=U(r);if(!t){if(o&&q(so,s))return Reflect.get(so,s,i);if(s==="hasOwnProperty")return qu}const c=Reflect.get(r,s,i);return(Un(s)?tc.has(s):Vu(s))||(t||Re(r,"get",s),e)?c:fe(c)?o&&hi(s)?c:c.value:oe(c)?t?cc(c):ut(c):c}}const Gu=nc(),Ju=nc(!0);function nc(t=!1){return function(n,r,s,i){let o=n[r];if(Kt(o)&&fe(o)&&!fe(s))return!1;if(!t&&(!Rr(s)&&!Kt(s)&&(o=J(o),s=J(s)),!U(n)&&fe(o)&&!fe(s)))return o.value=s,!0;const c=U(n)&&hi(r)?Number(r)<n.length:q(n,r),a=Reflect.set(n,r,s,i);return n===J(i)&&(c?Fn(s,o)&&lt(n,"set",r,s):lt(n,"add",r,s)),a}}function Yu(t,e){const n=q(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&lt(t,"delete",e,void 0),r}function Xu(t,e){const n=Reflect.has(t,e);return(!Un(e)||!tc.has(e))&&Re(t,"has",e),n}function Qu(t){return Re(t,"iterate",U(t)?"length":Vt),Reflect.ownKeys(t)}const rc={get:Hu,set:Gu,deleteProperty:Yu,has:Xu,ownKeys:Qu},Zu={get:zu,set(t,e){return!0},deleteProperty(t,e){return!0}},ed=ge({},rc,{get:Wu,set:Ju}),vi=t=>t,qr=t=>Reflect.getPrototypeOf(t);function ir(t,e,n=!1,r=!1){t=t.__v_raw;const s=J(t),i=J(e);n||(e!==i&&Re(s,"get",e),Re(s,"get",i));const{has:o}=qr(s),c=r?vi:n?Ii:jn;if(o.call(s,e))return c(t.get(e));if(o.call(s,i))return c(t.get(i));t!==s&&t.get(e)}function or(t,e=!1){const n=this.__v_raw,r=J(n),s=J(t);return e||(t!==s&&Re(r,"has",t),Re(r,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)}function ar(t,e=!1){return t=t.__v_raw,!e&&Re(J(t),"iterate",Vt),Reflect.get(t,"size",t)}function io(t){t=J(t);const e=J(this);return qr(e).has.call(e,t)||(e.add(t),lt(e,"add",t,t)),this}function oo(t,e){e=J(e);const n=J(this),{has:r,get:s}=qr(n);let i=r.call(n,t);i||(t=J(t),i=r.call(n,t));const o=s.call(n,t);return n.set(t,e),i?Fn(e,o)&&lt(n,"set",t,e):lt(n,"add",t,e),this}function ao(t){const e=J(this),{has:n,get:r}=qr(e);let s=n.call(e,t);s||(t=J(t),s=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return s&&lt(e,"delete",t,void 0),i}function co(){const t=J(this),e=t.size!==0,n=t.clear();return e&&lt(t,"clear",void 0,void 0),n}function cr(t,e){return function(r,s){const i=this,o=i.__v_raw,c=J(o),a=e?vi:t?Ii:jn;return!t&&Re(c,"iterate",Vt),o.forEach((l,u)=>r.call(s,a(l),a(u),i))}}function lr(t,e,n){return function(...r){const s=this.__v_raw,i=J(s),o=ln(i),c=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,l=s[t](...r),u=n?vi:e?Ii:jn;return!e&&Re(i,"iterate",a?Bs:Vt),{next(){const{value:f,done:p}=l.next();return p?{value:f,done:p}:{value:c?[u(f[0]),u(f[1])]:u(f),done:p}},[Symbol.iterator](){return this}}}}function pt(t){return function(...e){return t==="delete"?!1:this}}function td(){const t={get(i){return ir(this,i)},get size(){return ar(this)},has:or,add:io,set:oo,delete:ao,clear:co,forEach:cr(!1,!1)},e={get(i){return ir(this,i,!1,!0)},get size(){return ar(this)},has:or,add:io,set:oo,delete:ao,clear:co,forEach:cr(!1,!0)},n={get(i){return ir(this,i,!0)},get size(){return ar(this,!0)},has(i){return or.call(this,i,!0)},add:pt("add"),set:pt("set"),delete:pt("delete"),clear:pt("clear"),forEach:cr(!0,!1)},r={get(i){return ir(this,i,!0,!0)},get size(){return ar(this,!0)},has(i){return or.call(this,i,!0)},add:pt("add"),set:pt("set"),delete:pt("delete"),clear:pt("clear"),forEach:cr(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=lr(i,!1,!1),n[i]=lr(i,!0,!1),e[i]=lr(i,!1,!0),r[i]=lr(i,!0,!0)}),[t,n,e,r]}const[nd,rd,sd,id]=td();function yi(t,e){const n=e?t?id:sd:t?rd:nd;return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(q(n,s)&&s in r?n:r,s,i)}const od={get:yi(!1,!1)},ad={get:yi(!1,!0)},cd={get:yi(!0,!1)},sc=new WeakMap,ic=new WeakMap,oc=new WeakMap,ld=new WeakMap;function ud(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function dd(t){return t.__v_skip||!Object.isExtensible(t)?0:ud(Cu(t))}function ut(t){return Kt(t)?t:wi(t,!1,rc,od,sc)}function ac(t){return wi(t,!1,ed,ad,ic)}function cc(t){return wi(t,!0,Zu,cd,oc)}function wi(t,e,n,r,s){if(!oe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=dd(t);if(o===0)return t;const c=new Proxy(t,o===2?r:n);return s.set(t,c),c}function Ht(t){return Kt(t)?Ht(t.__v_raw):!!(t&&t.__v_isReactive)}function Kt(t){return!!(t&&t.__v_isReadonly)}function Rr(t){return!!(t&&t.__v_isShallow)}function lc(t){return Ht(t)||Kt(t)}function J(t){const e=t&&t.__v_raw;return e?J(e):t}function bi(t){return Tr(t,"__v_skip",!0),t}const jn=t=>oe(t)?ut(t):t,Ii=t=>oe(t)?cc(t):t;function uc(t){Et&&Be&&(t=J(t),ec(t.dep||(t.dep=gi())))}function dc(t,e){t=J(t);const n=t.dep;n&&js(n)}function fe(t){return!!(t&&t.__v_isRef===!0)}function ae(t){return fc(t,!1)}function fd(t){return fc(t,!0)}function fc(t,e){return fe(t)?t:new hd(t,e)}class hd{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:J(e),this._value=n?e:jn(e)}get value(){return uc(this),this._value}set value(e){const n=this.__v_isShallow||Rr(e)||Kt(e);e=n?e:J(e),Fn(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:jn(e),dc(this))}}function B(t){return fe(t)?t.value:t}const pd={get:(t,e,n)=>B(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return fe(s)&&!fe(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function hc(t){return Ht(t)?t:new Proxy(t,pd)}class gd{constructor(e,n,r,s){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new mi(e,()=>{this._dirty||(this._dirty=!0,dc(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const e=J(this);return uc(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function md(t,e,n=!1){let r,s;const i=V(t);return i?(r=t,s=Ve):(r=t.get,s=t.set),new gd(r,s,i||!s,n)}function Tt(t,e,n,r){let s;try{s=r?t(...r):t()}catch(i){Gr(i,e,n)}return s}function He(t,e,n,r){if(V(t)){const i=Tt(t,e,n,r);return i&&Wa(i)&&i.catch(o=>{Gr(o,e,n)}),i}const s=[];for(let i=0;i<t.length;i++)s.push(He(t[i],e,n,r));return s}function Gr(t,e,n,r=!0){const s=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,c=n;for(;i;){const l=i.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](t,o,c)===!1)return}i=i.parent}const a=e.appContext.config.errorHandler;if(a){Tt(a,null,10,[t,o,c]);return}}_d(t,n,s,r)}function _d(t,e,n,r=!0){console.error(t)}let Vn=!1,Vs=!1;const ve=[];let Ge=0;const un=[];let st=null,$t=0;const pc=Promise.resolve();let Ei=null;function Sr(t){const e=Ei||pc;return t?e.then(this?t.bind(this):t):e}function vd(t){let e=Ge+1,n=ve.length;for(;e<n;){const r=e+n>>>1;Hn(ve[r])<t?e=r+1:n=r}return e}function Ti(t){(!ve.length||!ve.includes(t,Vn&&t.allowRecurse?Ge+1:Ge))&&(t.id==null?ve.push(t):ve.splice(vd(t.id),0,t),gc())}function gc(){!Vn&&!Vs&&(Vs=!0,Ei=pc.then(_c))}function yd(t){const e=ve.indexOf(t);e>Ge&&ve.splice(e,1)}function wd(t){U(t)?un.push(...t):(!st||!st.includes(t,t.allowRecurse?$t+1:$t))&&un.push(t),gc()}function lo(t,e=Vn?Ge+1:0){for(;e<ve.length;e++){const n=ve[e];n&&n.pre&&(ve.splice(e,1),e--,n())}}function mc(t){if(un.length){const e=[...new Set(un)];if(un.length=0,st){st.push(...e);return}for(st=e,st.sort((n,r)=>Hn(n)-Hn(r)),$t=0;$t<st.length;$t++)st[$t]();st=null,$t=0}}const Hn=t=>t.id==null?1/0:t.id,bd=(t,e)=>{const n=Hn(t)-Hn(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function _c(t){Vs=!1,Vn=!0,ve.sort(bd);const e=Ve;try{for(Ge=0;Ge<ve.length;Ge++){const n=ve[Ge];n&&n.active!==!1&&Tt(n,null,14)}}finally{Ge=0,ve.length=0,mc(),Vn=!1,Ei=null,(ve.length||un.length)&&_c()}}function Id(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||ie;let s=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:p}=r[u]||ie;p&&(s=n.map(m=>me(m)?m.trim():m)),f&&(s=n.map(Ls))}let c,a=r[c=us(e)]||r[c=us(Ze(e))];!a&&i&&(a=r[c=us(yn(e))]),a&&He(a,t,6,s);const l=r[c+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,He(l,t,6,s)}}function vc(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},c=!1;if(!V(t)){const a=l=>{const u=vc(l,e,!0);u&&(c=!0,ge(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!i&&!c?(oe(t)&&r.set(t,null),null):(U(i)?i.forEach(a=>o[a]=null):ge(o,i),oe(t)&&r.set(t,o),o)}function Jr(t,e){return!t||!Vr(e)?!1:(e=e.slice(2).replace(/Once$/,""),q(t,e[0].toLowerCase()+e.slice(1))||q(t,yn(e))||q(t,e))}let Ce=null,Yr=null;function Cr(t){const e=Ce;return Ce=t,Yr=t&&t.type.__scopeId||null,e}function Ed(t){Yr=t}function Td(){Yr=null}function Rd(t,e=Ce,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&bo(-1);const i=Cr(e);let o;try{o=t(...s)}finally{Cr(i),r._d&&bo(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function ds(t){const{type:e,vnode:n,proxy:r,withProxy:s,props:i,propsOptions:[o],slots:c,attrs:a,emit:l,render:u,renderCache:f,data:p,setupState:m,ctx:_,inheritAttrs:b}=t;let T,S;const N=Cr(t);try{if(n.shapeFlag&4){const C=s||r;T=qe(u.call(C,C,f,i,m,p,_)),S=a}else{const C=e;T=qe(C.length>1?C(i,{attrs:a,slots:c,emit:l}):C(i,null)),S=e.props?a:Sd(a)}}catch(C){xn.length=0,Gr(C,t,1),T=de(qt)}let x=T;if(S&&b!==!1){const C=Object.keys(S),{shapeFlag:H}=x;C.length&&H&7&&(o&&C.some(di)&&(S=Cd(S,o)),x=pn(x,S))}return n.dirs&&(x=pn(x),x.dirs=x.dirs?x.dirs.concat(n.dirs):n.dirs),n.transition&&(x.transition=n.transition),T=x,Cr(N),T}const Sd=t=>{let e;for(const n in t)(n==="class"||n==="style"||Vr(n))&&((e||(e={}))[n]=t[n]);return e},Cd=(t,e)=>{const n={};for(const r in t)(!di(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Ad(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:c,patchFlag:a}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return r?uo(r,o,l):!!o;if(a&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const p=u[f];if(o[p]!==r[p]&&!Jr(l,p))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===o?!1:r?o?uo(r,o,l):!0:!!o;return!1}function uo(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!Jr(n,i))return!0}return!1}function Pd({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const Od=t=>t.__isSuspense;function kd(t,e){e&&e.pendingBranch?U(t)?e.effects.push(...t):e.effects.push(t):wd(t)}const ur={};function Je(t,e,n){return yc(t,e,n)}function yc(t,e,{immediate:n,deep:r,flush:s,onTrack:i,onTrigger:o}=ie){var c;const a=Fu()===((c=pe)==null?void 0:c.scope)?pe:null;let l,u=!1,f=!1;if(fe(t)?(l=()=>t.value,u=Rr(t)):Ht(t)?(l=()=>t,r=!0):U(t)?(f=!0,u=t.some(C=>Ht(C)||Rr(C)),l=()=>t.map(C=>{if(fe(C))return C.value;if(Ht(C))return Ft(C);if(V(C))return Tt(C,a,2)})):V(t)?e?l=()=>Tt(t,a,2):l=()=>{if(!(a&&a.isUnmounted))return p&&p(),He(t,a,3,[m])}:l=Ve,e&&r){const C=l;l=()=>Ft(C())}let p,m=C=>{p=N.onStop=()=>{Tt(C,a,4)}},_;if(zn)if(m=Ve,e?n&&He(e,a,3,[l(),f?[]:void 0,m]):l(),s==="sync"){const C=Rf();_=C.__watcherHandles||(C.__watcherHandles=[])}else return Ve;let b=f?new Array(t.length).fill(ur):ur;const T=()=>{if(N.active)if(e){const C=N.run();(r||u||(f?C.some((H,ee)=>Fn(H,b[ee])):Fn(C,b)))&&(p&&p(),He(e,a,3,[C,b===ur?void 0:f&&b[0]===ur?[]:b,m]),b=C)}else N.run()};T.allowRecurse=!!e;let S;s==="sync"?S=T:s==="post"?S=()=>Ee(T,a&&a.suspense):(T.pre=!0,a&&(T.id=a.uid),S=()=>Ti(T));const N=new mi(l,S);e?n?T():b=N.run():s==="post"?Ee(N.run.bind(N),a&&a.suspense):N.run();const x=()=>{N.stop(),a&&a.scope&&fi(a.scope.effects,N)};return _&&_.push(x),x}function Nd(t,e,n){const r=this.proxy,s=me(t)?t.includes(".")?wc(r,t):()=>r[t]:t.bind(r,r);let i;V(e)?i=e:(i=e.handler,n=e);const o=pe;gn(this);const c=yc(s,i.bind(r),n);return o?gn(o):Wt(),c}function wc(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function Ft(t,e){if(!oe(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),fe(t))Ft(t.value,e);else if(U(t))for(let n=0;n<t.length;n++)Ft(t[n],e);else if(Hr(t)||ln(t))t.forEach(n=>{Ft(n,e)});else if(Ka(t))for(const n in t)Ft(t[n],e);return t}function dr(t,e){const n=Ce;if(n===null)return t;const r=ts(n)||n.proxy,s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[o,c,a,l=ie]=e[i];o&&(V(o)&&(o={mounted:o,updated:o}),o.deep&&Ft(c),s.push({dir:o,instance:r,value:c,oldValue:void 0,arg:a,modifiers:l}))}return t}function Nt(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const c=s[o];i&&(c.oldValue=i[o].value);let a=c.dir[r];a&&(wn(),He(a,n,8,[t.el,c,t,e]),bn())}}function Xr(t,e){return V(t)?(()=>ge({name:t.name},e,{setup:t}))():t}const mr=t=>!!t.type.__asyncLoader,bc=t=>t.type.__isKeepAlive;function xd(t,e){Ic(t,"a",e)}function Dd(t,e){Ic(t,"da",e)}function Ic(t,e,n=pe){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(Qr(e,r,n),n){let s=n.parent;for(;s&&s.parent;)bc(s.parent.vnode)&&$d(r,e,n,s),s=s.parent}}function $d(t,e,n,r){const s=Qr(e,t,r,!0);Tc(()=>{fi(r[e],s)},n)}function Qr(t,e,n=pe,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;wn(),gn(n);const c=He(e,n,t,o);return Wt(),bn(),c});return r?s.unshift(i):s.push(i),i}}const ht=t=>(e,n=pe)=>(!zn||t==="sp")&&Qr(t,(...r)=>e(...r),n),Ri=ht("bm"),Ld=ht("m"),Md=ht("bu"),Ud=ht("u"),Ec=ht("bum"),Tc=ht("um"),Fd=ht("sp"),Bd=ht("rtg"),jd=ht("rtc");function Vd(t,e=pe){Qr("ec",t,e)}const Rc="components";function Hd(t,e){return zd(Rc,t,!0,e)||t}const Wd=Symbol.for("v-ndc");function zd(t,e,n=!0,r=!1){const s=Ce||pe;if(s){const i=s.type;if(t===Rc){const c=If(i,!1);if(c&&(c===e||c===Ze(e)||c===zr(Ze(e))))return i}const o=fo(s[t]||i[t],e)||fo(s.appContext[t],e);return!o&&r?i:o}}function fo(t,e){return t&&(t[e]||t[Ze(e)]||t[zr(Ze(e))])}const Hs=t=>t?Uc(t)?ts(t)||t.proxy:Hs(t.parent):null,Nn=ge(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Hs(t.parent),$root:t=>Hs(t.root),$emit:t=>t.emit,$options:t=>Si(t),$forceUpdate:t=>t.f||(t.f=()=>Ti(t.update)),$nextTick:t=>t.n||(t.n=Sr.bind(t.proxy)),$watch:t=>Nd.bind(t)}),fs=(t,e)=>t!==ie&&!t.__isScriptSetup&&q(t,e),Kd={get({_:t},e){const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:c,appContext:a}=t;let l;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(fs(r,e))return o[e]=1,r[e];if(s!==ie&&q(s,e))return o[e]=2,s[e];if((l=t.propsOptions[0])&&q(l,e))return o[e]=3,i[e];if(n!==ie&&q(n,e))return o[e]=4,n[e];Ws&&(o[e]=0)}}const u=Nn[e];let f,p;if(u)return e==="$attrs"&&Re(t,"get",e),u(t);if((f=c.__cssModules)&&(f=f[e]))return f;if(n!==ie&&q(n,e))return o[e]=4,n[e];if(p=a.config.globalProperties,q(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return fs(s,e)?(s[e]=n,!0):r!==ie&&q(r,e)?(r[e]=n,!0):q(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let c;return!!n[o]||t!==ie&&q(t,o)||fs(e,o)||(c=i[0])&&q(c,o)||q(r,o)||q(Nn,o)||q(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:q(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function ho(t){return U(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Ws=!0;function qd(t){const e=Si(t),n=t.proxy,r=t.ctx;Ws=!1,e.beforeCreate&&po(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:c,provide:a,inject:l,created:u,beforeMount:f,mounted:p,beforeUpdate:m,updated:_,activated:b,deactivated:T,beforeDestroy:S,beforeUnmount:N,destroyed:x,unmounted:C,render:H,renderTracked:ee,renderTriggered:se,errorCaptured:we,serverPrefetch:Pe,expose:Ie,inheritAttrs:Oe,components:$e,directives:ke,filters:kt}=e;if(l&&Gd(l,r,null),o)for(const Q in o){const G=o[Q];V(G)&&(r[Q]=G.bind(n))}if(s){const Q=s.call(n,n);oe(Q)&&(t.data=ut(Q))}if(Ws=!0,i)for(const Q in i){const G=i[Q],Le=V(G)?G.bind(n,n):V(G.get)?G.get.bind(n,n):Ve,Y=!V(G)&&V(G.set)?G.set.bind(n):Ve,he=z({get:Le,set:Y});Object.defineProperty(r,Q,{enumerable:!0,configurable:!0,get:()=>he.value,set:ce=>he.value=ce})}if(c)for(const Q in c)Sc(c[Q],r,n,Q);if(a){const Q=V(a)?a.call(n):a;Reflect.ownKeys(Q).forEach(G=>{dn(G,Q[G])})}u&&po(u,t,"c");function le(Q,G){U(G)?G.forEach(Le=>Q(Le.bind(n))):G&&Q(G.bind(n))}if(le(Ri,f),le(Ld,p),le(Md,m),le(Ud,_),le(xd,b),le(Dd,T),le(Vd,we),le(jd,ee),le(Bd,se),le(Ec,N),le(Tc,C),le(Fd,Pe),U(Ie))if(Ie.length){const Q=t.exposed||(t.exposed={});Ie.forEach(G=>{Object.defineProperty(Q,G,{get:()=>n[G],set:Le=>n[G]=Le})})}else t.exposed||(t.exposed={});H&&t.render===Ve&&(t.render=H),Oe!=null&&(t.inheritAttrs=Oe),$e&&(t.components=$e),ke&&(t.directives=ke)}function Gd(t,e,n=Ve){U(t)&&(t=zs(t));for(const r in t){const s=t[r];let i;oe(s)?"default"in s?i=Ne(s.from||r,s.default,!0):i=Ne(s.from||r):i=Ne(s),fe(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function po(t,e,n){He(U(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Sc(t,e,n,r){const s=r.includes(".")?wc(n,r):()=>n[r];if(me(t)){const i=e[t];V(i)&&Je(s,i)}else if(V(t))Je(s,t.bind(n));else if(oe(t))if(U(t))t.forEach(i=>Sc(i,e,n,r));else{const i=V(t.handler)?t.handler.bind(n):e[t.handler];V(i)&&Je(s,i,t)}}function Si(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let a;return c?a=c:!s.length&&!n&&!r?a=e:(a={},s.length&&s.forEach(l=>Ar(a,l,o,!0)),Ar(a,e,o)),oe(e)&&i.set(e,a),a}function Ar(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Ar(t,i,n,!0),s&&s.forEach(o=>Ar(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const c=Jd[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const Jd={data:go,props:mo,emits:mo,methods:Pn,computed:Pn,beforeCreate:be,created:be,beforeMount:be,mounted:be,beforeUpdate:be,updated:be,beforeDestroy:be,beforeUnmount:be,destroyed:be,unmounted:be,activated:be,deactivated:be,errorCaptured:be,serverPrefetch:be,components:Pn,directives:Pn,watch:Xd,provide:go,inject:Yd};function go(t,e){return e?t?function(){return ge(V(t)?t.call(this,this):t,V(e)?e.call(this,this):e)}:e:t}function Yd(t,e){return Pn(zs(t),zs(e))}function zs(t){if(U(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function be(t,e){return t?[...new Set([].concat(t,e))]:e}function Pn(t,e){return t?ge(Object.create(null),t,e):e}function mo(t,e){return t?U(t)&&U(e)?[...new Set([...t,...e])]:ge(Object.create(null),ho(t),ho(e??{})):e}function Xd(t,e){if(!t)return e;if(!e)return t;const n=ge(Object.create(null),t);for(const r in e)n[r]=be(t[r],e[r]);return n}function Cc(){return{app:null,config:{isNativeTag:Tu,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Qd=0;function Zd(t,e){return function(r,s=null){V(r)||(r=ge({},r)),s!=null&&!oe(s)&&(s=null);const i=Cc(),o=new Set;let c=!1;const a=i.app={_uid:Qd++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Sf,get config(){return i.config},set config(l){},use(l,...u){return o.has(l)||(l&&V(l.install)?(o.add(l),l.install(a,...u)):V(l)&&(o.add(l),l(a,...u))),a},mixin(l){return i.mixins.includes(l)||i.mixins.push(l),a},component(l,u){return u?(i.components[l]=u,a):i.components[l]},directive(l,u){return u?(i.directives[l]=u,a):i.directives[l]},mount(l,u,f){if(!c){const p=de(r,s);return p.appContext=i,u&&e?e(p,l):t(p,l,f),c=!0,a._container=l,l.__vue_app__=a,ts(p.component)||p.component.proxy}},unmount(){c&&(t(null,a._container),delete a._container.__vue_app__)},provide(l,u){return i.provides[l]=u,a},runWithContext(l){Pr=a;try{return l()}finally{Pr=null}}};return a}}let Pr=null;function dn(t,e){if(pe){let n=pe.provides;const r=pe.parent&&pe.parent.provides;r===n&&(n=pe.provides=Object.create(r)),n[t]=e}}function Ne(t,e,n=!1){const r=pe||Ce;if(r||Pr){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Pr._context.provides;if(s&&t in s)return s[t];if(arguments.length>1)return n&&V(e)?e.call(r&&r.proxy):e}}function ef(t,e,n,r=!1){const s={},i={};Tr(i,es,1),t.propsDefaults=Object.create(null),Ac(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:ac(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function tf(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,c=J(s),[a]=t.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let p=u[f];if(Jr(t.emitsOptions,p))continue;const m=e[p];if(a)if(q(i,p))m!==i[p]&&(i[p]=m,l=!0);else{const _=Ze(p);s[_]=Ks(a,c,_,m,t,!1)}else m!==i[p]&&(i[p]=m,l=!0)}}}else{Ac(t,e,s,i)&&(l=!0);let u;for(const f in c)(!e||!q(e,f)&&((u=yn(f))===f||!q(e,u)))&&(a?n&&(n[f]!==void 0||n[u]!==void 0)&&(s[f]=Ks(a,c,f,void 0,t,!0)):delete s[f]);if(i!==c)for(const f in i)(!e||!q(e,f))&&(delete i[f],l=!0)}l&&lt(t,"set","$attrs")}function Ac(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,c;if(e)for(let a in e){if(pr(a))continue;const l=e[a];let u;s&&q(s,u=Ze(a))?!i||!i.includes(u)?n[u]=l:(c||(c={}))[u]=l:Jr(t.emitsOptions,a)||(!(a in r)||l!==r[a])&&(r[a]=l,o=!0)}if(i){const a=J(n),l=c||ie;for(let u=0;u<i.length;u++){const f=i[u];n[f]=Ks(s,a,f,l[f],t,!q(l,f))}}return o}function Ks(t,e,n,r,s,i){const o=t[n];if(o!=null){const c=q(o,"default");if(c&&r===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&V(a)){const{propsDefaults:l}=s;n in l?r=l[n]:(gn(s),r=l[n]=a.call(null,e),Wt())}else r=a}o[0]&&(i&&!c?r=!1:o[1]&&(r===""||r===yn(n))&&(r=!0))}return r}function Pc(t,e,n=!1){const r=e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},c=[];let a=!1;if(!V(t)){const u=f=>{a=!0;const[p,m]=Pc(f,e,!0);ge(o,p),m&&c.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!a)return oe(t)&&r.set(t,cn),cn;if(U(i))for(let u=0;u<i.length;u++){const f=Ze(i[u]);_o(f)&&(o[f]=ie)}else if(i)for(const u in i){const f=Ze(u);if(_o(f)){const p=i[u],m=o[f]=U(p)||V(p)?{type:p}:ge({},p);if(m){const _=wo(Boolean,m.type),b=wo(String,m.type);m[0]=_>-1,m[1]=b<0||_<b,(_>-1||q(m,"default"))&&c.push(f)}}}const l=[o,c];return oe(t)&&r.set(t,l),l}function _o(t){return t[0]!=="$"}function vo(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function yo(t,e){return vo(t)===vo(e)}function wo(t,e){return U(e)?e.findIndex(n=>yo(n,t)):V(e)&&yo(e,t)?0:-1}const Oc=t=>t[0]==="_"||t==="$stable",Ci=t=>U(t)?t.map(qe):[qe(t)],nf=(t,e,n)=>{if(e._n)return e;const r=Rd((...s)=>Ci(e(...s)),n);return r._c=!1,r},kc=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Oc(s))continue;const i=t[s];if(V(i))e[s]=nf(s,i,r);else if(i!=null){const o=Ci(i);e[s]=()=>o}}},Nc=(t,e)=>{const n=Ci(e);t.slots.default=()=>n},rf=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=J(e),Tr(e,"_",n)):kc(e,t.slots={})}else t.slots={},e&&Nc(t,e);Tr(t.slots,es,1)},sf=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=ie;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:(ge(s,e),!n&&c===1&&delete s._):(i=!e.$stable,kc(e,s)),o=e}else e&&(Nc(t,e),o={default:1});if(i)for(const c in s)!Oc(c)&&!(c in o)&&delete s[c]};function qs(t,e,n,r,s=!1){if(U(t)){t.forEach((p,m)=>qs(p,e&&(U(e)?e[m]:e),n,r,s));return}if(mr(r)&&!s)return;const i=r.shapeFlag&4?ts(r.component)||r.component.proxy:r.el,o=s?null:i,{i:c,r:a}=t,l=e&&e.r,u=c.refs===ie?c.refs={}:c.refs,f=c.setupState;if(l!=null&&l!==a&&(me(l)?(u[l]=null,q(f,l)&&(f[l]=null)):fe(l)&&(l.value=null)),V(a))Tt(a,c,12,[o,u]);else{const p=me(a),m=fe(a);if(p||m){const _=()=>{if(t.f){const b=p?q(f,a)?f[a]:u[a]:a.value;s?U(b)&&fi(b,i):U(b)?b.includes(i)||b.push(i):p?(u[a]=[i],q(f,a)&&(f[a]=u[a])):(a.value=[i],t.k&&(u[t.k]=a.value))}else p?(u[a]=o,q(f,a)&&(f[a]=o)):m&&(a.value=o,t.k&&(u[t.k]=o))};o?(_.id=-1,Ee(_,n)):_()}}}const Ee=kd;function of(t){return af(t)}function af(t,e){const n=Ms();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:c,createComment:a,setText:l,setElementText:u,parentNode:f,nextSibling:p,setScopeId:m=Ve,insertStaticContent:_}=t,b=(d,h,g,v=null,w=null,I=null,O=!1,R=null,A=!!h.dynamicChildren)=>{if(d===h)return;d&&!Sn(d,h)&&(v=y(d),ce(d,w,I,!0),d=null),h.patchFlag===-2&&(A=!1,h.dynamicChildren=null);const{type:E,ref:L,shapeFlag:D}=h;switch(E){case Zr:T(d,h,g,v);break;case qt:S(d,h,g,v);break;case hs:d==null&&N(h,g,v,O);break;case it:$e(d,h,g,v,w,I,O,R,A);break;default:D&1?H(d,h,g,v,w,I,O,R,A):D&6?ke(d,h,g,v,w,I,O,R,A):(D&64||D&128)&&E.process(d,h,g,v,w,I,O,R,A,P)}L!=null&&w&&qs(L,d&&d.ref,I,h||d,!h)},T=(d,h,g,v)=>{if(d==null)r(h.el=c(h.children),g,v);else{const w=h.el=d.el;h.children!==d.children&&l(w,h.children)}},S=(d,h,g,v)=>{d==null?r(h.el=a(h.children||""),g,v):h.el=d.el},N=(d,h,g,v)=>{[d.el,d.anchor]=_(d.children,h,g,v,d.el,d.anchor)},x=({el:d,anchor:h},g,v)=>{let w;for(;d&&d!==h;)w=p(d),r(d,g,v),d=w;r(h,g,v)},C=({el:d,anchor:h})=>{let g;for(;d&&d!==h;)g=p(d),s(d),d=g;s(h)},H=(d,h,g,v,w,I,O,R,A)=>{O=O||h.type==="svg",d==null?ee(h,g,v,w,I,O,R,A):Pe(d,h,w,I,O,R,A)},ee=(d,h,g,v,w,I,O,R)=>{let A,E;const{type:L,props:D,shapeFlag:M,transition:j,dirs:W}=d;if(A=d.el=o(d.type,I,D&&D.is,D),M&8?u(A,d.children):M&16&&we(d.children,A,null,v,w,I&&L!=="foreignObject",O,R),W&&Nt(d,null,v,"created"),se(A,d,d.scopeId,O,v),D){for(const te in D)te!=="value"&&!pr(te)&&i(A,te,null,D[te],I,d.children,v,w,_e);"value"in D&&i(A,"value",null,D.value),(E=D.onVnodeBeforeMount)&&Ke(E,v,d)}W&&Nt(d,null,v,"beforeMount");const re=(!w||w&&!w.pendingBranch)&&j&&!j.persisted;re&&j.beforeEnter(A),r(A,h,g),((E=D&&D.onVnodeMounted)||re||W)&&Ee(()=>{E&&Ke(E,v,d),re&&j.enter(A),W&&Nt(d,null,v,"mounted")},w)},se=(d,h,g,v,w)=>{if(g&&m(d,g),v)for(let I=0;I<v.length;I++)m(d,v[I]);if(w){let I=w.subTree;if(h===I){const O=w.vnode;se(d,O,O.scopeId,O.slotScopeIds,w.parent)}}},we=(d,h,g,v,w,I,O,R,A=0)=>{for(let E=A;E<d.length;E++){const L=d[E]=R?_t(d[E]):qe(d[E]);b(null,L,h,g,v,w,I,O,R)}},Pe=(d,h,g,v,w,I,O)=>{const R=h.el=d.el;let{patchFlag:A,dynamicChildren:E,dirs:L}=h;A|=d.patchFlag&16;const D=d.props||ie,M=h.props||ie;let j;g&&xt(g,!1),(j=M.onVnodeBeforeUpdate)&&Ke(j,g,h,d),L&&Nt(h,d,g,"beforeUpdate"),g&&xt(g,!0);const W=w&&h.type!=="foreignObject";if(E?Ie(d.dynamicChildren,E,R,g,v,W,I):O||G(d,h,R,null,g,v,W,I,!1),A>0){if(A&16)Oe(R,h,D,M,g,v,w);else if(A&2&&D.class!==M.class&&i(R,"class",null,M.class,w),A&4&&i(R,"style",D.style,M.style,w),A&8){const re=h.dynamicProps;for(let te=0;te<re.length;te++){const ue=re[te],Me=D[ue],sn=M[ue];(sn!==Me||ue==="value")&&i(R,ue,Me,sn,w,d.children,g,v,_e)}}A&1&&d.children!==h.children&&u(R,h.children)}else!O&&E==null&&Oe(R,h,D,M,g,v,w);((j=M.onVnodeUpdated)||L)&&Ee(()=>{j&&Ke(j,g,h,d),L&&Nt(h,d,g,"updated")},v)},Ie=(d,h,g,v,w,I,O)=>{for(let R=0;R<h.length;R++){const A=d[R],E=h[R],L=A.el&&(A.type===it||!Sn(A,E)||A.shapeFlag&70)?f(A.el):g;b(A,E,L,null,v,w,I,O,!0)}},Oe=(d,h,g,v,w,I,O)=>{if(g!==v){if(g!==ie)for(const R in g)!pr(R)&&!(R in v)&&i(d,R,g[R],null,O,h.children,w,I,_e);for(const R in v){if(pr(R))continue;const A=v[R],E=g[R];A!==E&&R!=="value"&&i(d,R,E,A,O,h.children,w,I,_e)}"value"in v&&i(d,"value",g.value,v.value)}},$e=(d,h,g,v,w,I,O,R,A)=>{const E=h.el=d?d.el:c(""),L=h.anchor=d?d.anchor:c("");let{patchFlag:D,dynamicChildren:M,slotScopeIds:j}=h;j&&(R=R?R.concat(j):j),d==null?(r(E,g,v),r(L,g,v),we(h.children,g,L,w,I,O,R,A)):D>0&&D&64&&M&&d.dynamicChildren?(Ie(d.dynamicChildren,M,g,w,I,O,R),(h.key!=null||w&&h===w.subTree)&&xc(d,h,!0)):G(d,h,g,L,w,I,O,R,A)},ke=(d,h,g,v,w,I,O,R,A)=>{h.slotScopeIds=R,d==null?h.shapeFlag&512?w.ctx.activate(h,g,v,O,A):kt(h,g,v,w,I,O,A):nt(d,h,A)},kt=(d,h,g,v,w,I,O)=>{const R=d.component=mf(d,v,w);if(bc(d)&&(R.ctx.renderer=P),vf(R),R.asyncDep){if(w&&w.registerDep(R,le),!d.el){const A=R.subTree=de(qt);S(null,A,h,g)}return}le(R,d,h,g,w,I,O)},nt=(d,h,g)=>{const v=h.component=d.component;if(Ad(d,h,g))if(v.asyncDep&&!v.asyncResolved){Q(v,h,g);return}else v.next=h,yd(v.update),v.update();else h.el=d.el,v.vnode=h},le=(d,h,g,v,w,I,O)=>{const R=()=>{if(d.isMounted){let{next:L,bu:D,u:M,parent:j,vnode:W}=d,re=L,te;xt(d,!1),L?(L.el=W.el,Q(d,L,O)):L=W,D&&gr(D),(te=L.props&&L.props.onVnodeBeforeUpdate)&&Ke(te,j,L,W),xt(d,!0);const ue=ds(d),Me=d.subTree;d.subTree=ue,b(Me,ue,f(Me.el),y(Me),d,w,I),L.el=ue.el,re===null&&Pd(d,ue.el),M&&Ee(M,w),(te=L.props&&L.props.onVnodeUpdated)&&Ee(()=>Ke(te,j,L,W),w)}else{let L;const{el:D,props:M}=h,{bm:j,m:W,parent:re}=d,te=mr(h);if(xt(d,!1),j&&gr(j),!te&&(L=M&&M.onVnodeBeforeMount)&&Ke(L,re,h),xt(d,!0),D&&X){const ue=()=>{d.subTree=ds(d),X(D,d.subTree,d,w,null)};te?h.type.__asyncLoader().then(()=>!d.isUnmounted&&ue()):ue()}else{const ue=d.subTree=ds(d);b(null,ue,g,v,d,w,I),h.el=ue.el}if(W&&Ee(W,w),!te&&(L=M&&M.onVnodeMounted)){const ue=h;Ee(()=>Ke(L,re,ue),w)}(h.shapeFlag&256||re&&mr(re.vnode)&&re.vnode.shapeFlag&256)&&d.a&&Ee(d.a,w),d.isMounted=!0,h=g=v=null}},A=d.effect=new mi(R,()=>Ti(E),d.scope),E=d.update=()=>A.run();E.id=d.uid,xt(d,!0),E()},Q=(d,h,g)=>{h.component=d;const v=d.vnode.props;d.vnode=h,d.next=null,tf(d,h.props,v,g),sf(d,h.children,g),wn(),lo(),bn()},G=(d,h,g,v,w,I,O,R,A=!1)=>{const E=d&&d.children,L=d?d.shapeFlag:0,D=h.children,{patchFlag:M,shapeFlag:j}=h;if(M>0){if(M&128){Y(E,D,g,v,w,I,O,R,A);return}else if(M&256){Le(E,D,g,v,w,I,O,R,A);return}}j&8?(L&16&&_e(E,w,I),D!==E&&u(g,D)):L&16?j&16?Y(E,D,g,v,w,I,O,R,A):_e(E,w,I,!0):(L&8&&u(g,""),j&16&&we(D,g,v,w,I,O,R,A))},Le=(d,h,g,v,w,I,O,R,A)=>{d=d||cn,h=h||cn;const E=d.length,L=h.length,D=Math.min(E,L);let M;for(M=0;M<D;M++){const j=h[M]=A?_t(h[M]):qe(h[M]);b(d[M],j,g,null,w,I,O,R,A)}E>L?_e(d,w,I,!0,!1,D):we(h,g,v,w,I,O,R,A,D)},Y=(d,h,g,v,w,I,O,R,A)=>{let E=0;const L=h.length;let D=d.length-1,M=L-1;for(;E<=D&&E<=M;){const j=d[E],W=h[E]=A?_t(h[E]):qe(h[E]);if(Sn(j,W))b(j,W,g,null,w,I,O,R,A);else break;E++}for(;E<=D&&E<=M;){const j=d[D],W=h[M]=A?_t(h[M]):qe(h[M]);if(Sn(j,W))b(j,W,g,null,w,I,O,R,A);else break;D--,M--}if(E>D){if(E<=M){const j=M+1,W=j<L?h[j].el:v;for(;E<=M;)b(null,h[E]=A?_t(h[E]):qe(h[E]),g,W,w,I,O,R,A),E++}}else if(E>M)for(;E<=D;)ce(d[E],w,I,!0),E++;else{const j=E,W=E,re=new Map;for(E=W;E<=M;E++){const Se=h[E]=A?_t(h[E]):qe(h[E]);Se.key!=null&&re.set(Se.key,E)}let te,ue=0;const Me=M-W+1;let sn=!1,Xi=0;const Tn=new Array(Me);for(E=0;E<Me;E++)Tn[E]=0;for(E=j;E<=D;E++){const Se=d[E];if(ue>=Me){ce(Se,w,I,!0);continue}let ze;if(Se.key!=null)ze=re.get(Se.key);else for(te=W;te<=M;te++)if(Tn[te-W]===0&&Sn(Se,h[te])){ze=te;break}ze===void 0?ce(Se,w,I,!0):(Tn[ze-W]=E+1,ze>=Xi?Xi=ze:sn=!0,b(Se,h[ze],g,null,w,I,O,R,A),ue++)}const Qi=sn?cf(Tn):cn;for(te=Qi.length-1,E=Me-1;E>=0;E--){const Se=W+E,ze=h[Se],Zi=Se+1<L?h[Se+1].el:v;Tn[E]===0?b(null,ze,g,Zi,w,I,O,R,A):sn&&(te<0||E!==Qi[te]?he(ze,g,Zi,2):te--)}}},he=(d,h,g,v,w=null)=>{const{el:I,type:O,transition:R,children:A,shapeFlag:E}=d;if(E&6){he(d.component.subTree,h,g,v);return}if(E&128){d.suspense.move(h,g,v);return}if(E&64){O.move(d,h,g,P);return}if(O===it){r(I,h,g);for(let D=0;D<A.length;D++)he(A[D],h,g,v);r(d.anchor,h,g);return}if(O===hs){x(d,h,g);return}if(v!==2&&E&1&&R)if(v===0)R.beforeEnter(I),r(I,h,g),Ee(()=>R.enter(I),w);else{const{leave:D,delayLeave:M,afterLeave:j}=R,W=()=>r(I,h,g),re=()=>{D(I,()=>{W(),j&&j()})};M?M(I,W,re):re()}else r(I,h,g)},ce=(d,h,g,v=!1,w=!1)=>{const{type:I,props:O,ref:R,children:A,dynamicChildren:E,shapeFlag:L,patchFlag:D,dirs:M}=d;if(R!=null&&qs(R,null,g,d,!0),L&256){h.ctx.deactivate(d);return}const j=L&1&&M,W=!mr(d);let re;if(W&&(re=O&&O.onVnodeBeforeUnmount)&&Ke(re,h,d),L&6)sr(d.component,g,v);else{if(L&128){d.suspense.unmount(g,v);return}j&&Nt(d,null,h,"beforeUnmount"),L&64?d.type.remove(d,h,g,w,P,v):E&&(I!==it||D>0&&D&64)?_e(E,h,g,!1,!0):(I===it&&D&384||!w&&L&16)&&_e(A,h,g),v&&nn(d)}(W&&(re=O&&O.onVnodeUnmounted)||j)&&Ee(()=>{re&&Ke(re,h,d),j&&Nt(d,null,h,"unmounted")},g)},nn=d=>{const{type:h,el:g,anchor:v,transition:w}=d;if(h===it){rn(g,v);return}if(h===hs){C(d);return}const I=()=>{s(g),w&&!w.persisted&&w.afterLeave&&w.afterLeave()};if(d.shapeFlag&1&&w&&!w.persisted){const{leave:O,delayLeave:R}=w,A=()=>O(g,I);R?R(d.el,I,A):A()}else I()},rn=(d,h)=>{let g;for(;d!==h;)g=p(d),s(d),d=g;s(h)},sr=(d,h,g)=>{const{bum:v,scope:w,update:I,subTree:O,um:R}=d;v&&gr(v),w.stop(),I&&(I.active=!1,ce(O,d,h,g)),R&&Ee(R,h),Ee(()=>{d.isUnmounted=!0},h),h&&h.pendingBranch&&!h.isUnmounted&&d.asyncDep&&!d.asyncResolved&&d.suspenseId===h.pendingId&&(h.deps--,h.deps===0&&h.resolve())},_e=(d,h,g,v=!1,w=!1,I=0)=>{for(let O=I;O<d.length;O++)ce(d[O],h,g,v,w)},y=d=>d.shapeFlag&6?y(d.component.subTree):d.shapeFlag&128?d.suspense.next():p(d.anchor||d.el),k=(d,h,g)=>{d==null?h._vnode&&ce(h._vnode,null,null,!0):b(h._vnode||null,d,h,null,null,null,g),lo(),mc(),h._vnode=d},P={p:b,um:ce,m:he,r:nn,mt:kt,mc:we,pc:G,pbc:Ie,n:y,o:t};let $,X;return e&&([$,X]=e(P)),{render:k,hydrate:$,createApp:Zd(k,$)}}function xt({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function xc(t,e,n=!1){const r=t.children,s=e.children;if(U(r)&&U(s))for(let i=0;i<r.length;i++){const o=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=_t(s[i]),c.el=o.el),n||xc(o,c)),c.type===Zr&&(c.el=o.el)}}function cf(t){const e=t.slice(),n=[0];let r,s,i,o,c;const a=t.length;for(r=0;r<a;r++){const l=t[r];if(l!==0){if(s=n[n.length-1],t[s]<l){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<l?i=c+1:o=c;l<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const lf=t=>t.__isTeleport,it=Symbol.for("v-fgt"),Zr=Symbol.for("v-txt"),qt=Symbol.for("v-cmt"),hs=Symbol.for("v-stc"),xn=[];let je=null;function Lt(t=!1){xn.push(je=t?null:[])}function uf(){xn.pop(),je=xn[xn.length-1]||null}let Wn=1;function bo(t){Wn+=t}function Dc(t){return t.dynamicChildren=Wn>0?je||cn:null,uf(),Wn>0&&je&&je.push(t),t}function Rn(t,e,n,r,s,i){return Dc(K(t,e,n,r,s,i,!0))}function $c(t,e,n,r,s){return Dc(de(t,e,n,r,s,!0))}function Gs(t){return t?t.__v_isVNode===!0:!1}function Sn(t,e){return t.type===e.type&&t.key===e.key}const es="__vInternal",Lc=({key:t})=>t??null,_r=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?me(t)||fe(t)||V(t)?{i:Ce,r:t,k:e,f:!!n}:t:null);function K(t,e=null,n=null,r=0,s=null,i=t===it?0:1,o=!1,c=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Lc(e),ref:e&&_r(e),scopeId:Yr,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Ce};return c?(Ai(a,n),i&128&&t.normalize(a)):n&&(a.shapeFlag|=me(n)?8:16),Wn>0&&!o&&je&&(a.patchFlag>0||i&6)&&a.patchFlag!==32&&je.push(a),a}const de=df;function df(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Wd)&&(t=qt),Gs(t)){const c=pn(t,e,!0);return n&&Ai(c,n),Wn>0&&!i&&je&&(c.shapeFlag&6?je[je.indexOf(t)]=c:je.push(c)),c.patchFlag|=-2,c}if(Ef(t)&&(t=t.__vccOpts),e){e=ff(e);let{class:c,style:a}=e;c&&!me(c)&&(e.class=Bn(c)),oe(a)&&(lc(a)&&!U(a)&&(a=ge({},a)),e.style=pi(a))}const o=me(t)?1:Od(t)?128:lf(t)?64:oe(t)?4:V(t)?2:0;return K(t,e,n,r,s,o,i,!0)}function ff(t){return t?lc(t)||es in t?ge({},t):t:null}function pn(t,e,n=!1){const{props:r,ref:s,patchFlag:i,children:o}=t,c=e?hf(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&Lc(c),ref:e&&e.ref?n&&s?U(s)?s.concat(_r(e)):[s,_r(e)]:_r(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==it?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&pn(t.ssContent),ssFallback:t.ssFallback&&pn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function Mc(t=" ",e=0){return de(Zr,null,t,e)}function fr(t="",e=!1){return e?(Lt(),$c(qt,null,t)):de(qt,null,t)}function qe(t){return t==null||typeof t=="boolean"?de(qt):U(t)?de(it,null,t.slice()):typeof t=="object"?_t(t):de(Zr,null,String(t))}function _t(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:pn(t)}function Ai(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(U(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Ai(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!(es in e)?e._ctx=Ce:s===3&&Ce&&(Ce.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else V(e)?(e={default:e,_ctx:Ce},n=32):(e=String(e),r&64?(n=16,e=[Mc(e)]):n=8);t.children=e,t.shapeFlag|=n}function hf(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Bn([e.class,r.class]));else if(s==="style")e.style=pi([e.style,r.style]);else if(Vr(s)){const i=e[s],o=r[s];o&&i!==o&&!(U(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Ke(t,e,n,r=null){He(t,e,7,[n,r])}const pf=Cc();let gf=0;function mf(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||pf,i={uid:gf++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new Ya(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Pc(r,s),emitsOptions:vc(r,s),emit:null,emitted:null,propsDefaults:ie,inheritAttrs:r.inheritAttrs,ctx:ie,data:ie,props:ie,attrs:ie,slots:ie,refs:ie,setupState:ie,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Id.bind(null,i),t.ce&&t.ce(i),i}let pe=null;const _f=()=>pe||Ce;let Pi,on,Io="__VUE_INSTANCE_SETTERS__";(on=Ms()[Io])||(on=Ms()[Io]=[]),on.push(t=>pe=t),Pi=t=>{on.length>1?on.forEach(e=>e(t)):on[0](t)};const gn=t=>{Pi(t),t.scope.on()},Wt=()=>{pe&&pe.scope.off(),Pi(null)};function Uc(t){return t.vnode.shapeFlag&4}let zn=!1;function vf(t,e=!1){zn=e;const{props:n,children:r}=t.vnode,s=Uc(t);ef(t,n,s,e),rf(t,r);const i=s?yf(t,e):void 0;return zn=!1,i}function yf(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=bi(new Proxy(t.ctx,Kd));const{setup:r}=n;if(r){const s=t.setupContext=r.length>1?bf(t):null;gn(t),wn();const i=Tt(r,t,0,[t.props,s]);if(bn(),Wt(),Wa(i)){if(i.then(Wt,Wt),e)return i.then(o=>{Eo(t,o,e)}).catch(o=>{Gr(o,t,0)});t.asyncDep=i}else Eo(t,i,e)}else Fc(t,e)}function Eo(t,e,n){V(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:oe(e)&&(t.setupState=hc(e)),Fc(t,n)}let To;function Fc(t,e,n){const r=t.type;if(!t.render){if(!e&&To&&!r.render){const s=r.template||Si(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:c,compilerOptions:a}=r,l=ge(ge({isCustomElement:i,delimiters:c},o),a);r.render=To(s,l)}}t.render=r.render||Ve}gn(t),wn(),qd(t),bn(),Wt()}function wf(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return Re(t,"get","$attrs"),e[n]}}))}function bf(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return wf(t)},slots:t.slots,emit:t.emit,expose:e}}function ts(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(hc(bi(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Nn)return Nn[n](t)},has(e,n){return n in e||n in Nn}}))}function If(t,e=!0){return V(t)?t.displayName||t.name:t.name||e&&t.__name}function Ef(t){return V(t)&&"__vccOpts"in t}const z=(t,e)=>md(t,e,zn);function Bc(t,e,n){const r=arguments.length;return r===2?oe(e)&&!U(e)?Gs(e)?de(t,null,[e]):de(t,e):de(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Gs(n)&&(n=[n]),de(t,e,n))}const Tf=Symbol.for("v-scx"),Rf=()=>Ne(Tf),Sf="3.3.4",Cf="http://www.w3.org/2000/svg",Mt=typeof document<"u"?document:null,Ro=Mt&&Mt.createElement("template"),Af={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e?Mt.createElementNS(Cf,t):Mt.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Mt.createTextNode(t),createComment:t=>Mt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Mt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Ro.innerHTML=r?`<svg>${t}</svg>`:t;const c=Ro.content;if(r){const a=c.firstChild;for(;a.firstChild;)c.appendChild(a.firstChild);c.removeChild(a)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function Pf(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function Of(t,e,n){const r=t.style,s=me(n);if(n&&!s){if(e&&!me(e))for(const i in e)n[i]==null&&Js(r,i,"");for(const i in n)Js(r,i,n[i])}else{const i=r.display;s?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=i)}}const So=/\s*!important$/;function Js(t,e,n){if(U(n))n.forEach(r=>Js(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=kf(t,e);So.test(n)?t.setProperty(yn(r),n.replace(So,""),"important"):t[r]=n}}const Co=["Webkit","Moz","ms"],ps={};function kf(t,e){const n=ps[e];if(n)return n;let r=Ze(e);if(r!=="filter"&&r in t)return ps[e]=r;r=zr(r);for(let s=0;s<Co.length;s++){const i=Co[s]+r;if(i in t)return ps[e]=i}return e}const Ao="http://www.w3.org/1999/xlink";function Nf(t,e,n,r,s){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(Ao,e.slice(6,e.length)):t.setAttributeNS(Ao,e,n);else{const i=$u(e);n==null||i&&!qa(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function xf(t,e,n,r,s,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,s,i),t[e]=n??"";return}const c=t.tagName;if(e==="value"&&c!=="PROGRESS"&&!c.includes("-")){t._value=n;const l=c==="OPTION"?t.getAttribute("value"):t.value,u=n??"";l!==u&&(t.value=u),n==null&&t.removeAttribute(e);return}let a=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=qa(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(e)}function Ut(t,e,n,r){t.addEventListener(e,n,r)}function Df(t,e,n,r){t.removeEventListener(e,n,r)}function $f(t,e,n,r,s=null){const i=t._vei||(t._vei={}),o=i[e];if(r&&o)o.value=r;else{const[c,a]=Lf(e);if(r){const l=i[e]=Ff(r,s);Ut(t,c,l,a)}else o&&(Df(t,c,o,a),i[e]=void 0)}}const Po=/(?:Once|Passive|Capture)$/;function Lf(t){let e;if(Po.test(t)){e={};let r;for(;r=t.match(Po);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):yn(t.slice(2)),e]}let gs=0;const Mf=Promise.resolve(),Uf=()=>gs||(Mf.then(()=>gs=0),gs=Date.now());function Ff(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;He(Bf(r,n.value),e,5,[r])};return n.value=t,n.attached=Uf(),n}function Bf(t,e){if(U(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Oo=/^on[a-z]/,jf=(t,e,n,r,s=!1,i,o,c,a)=>{e==="class"?Pf(t,r,s):e==="style"?Of(t,n,r):Vr(e)?di(e)||$f(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Vf(t,e,r,s))?xf(t,e,r,i,o,c,a):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Nf(t,e,r,s))};function Vf(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&Oo.test(e)&&V(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||Oo.test(e)&&me(n)?!1:e in t}const Or=t=>{const e=t.props["onUpdate:modelValue"]||!1;return U(e)?n=>gr(e,n):e};function Hf(t){t.target.composing=!0}function ko(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const ms={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t._assign=Or(s);const i=r||s.props&&s.props.type==="number";Ut(t,e?"change":"input",o=>{if(o.target.composing)return;let c=t.value;n&&(c=c.trim()),i&&(c=Ls(c)),t._assign(c)}),n&&Ut(t,"change",()=>{t.value=t.value.trim()}),e||(Ut(t,"compositionstart",Hf),Ut(t,"compositionend",ko),Ut(t,"change",ko))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:s}},i){if(t._assign=Or(i),t.composing||document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===e||(s||t.type==="number")&&Ls(t.value)===e))return;const o=e??"";t.value!==o&&(t.value=o)}},Wf={deep:!0,created(t,e,n){t._assign=Or(n),Ut(t,"change",()=>{const r=t._modelValue,s=zf(t),i=t.checked,o=t._assign;if(U(r)){const c=Ga(r,s),a=c!==-1;if(i&&!a)o(r.concat(s));else if(!i&&a){const l=[...r];l.splice(c,1),o(l)}}else if(Hr(r)){const c=new Set(r);i?c.add(s):c.delete(s),o(c)}else o(jc(t,i))})},mounted:No,beforeUpdate(t,e,n){t._assign=Or(n),No(t,e,n)}};function No(t,{value:e,oldValue:n},r){t._modelValue=e,U(e)?t.checked=Ga(e,r.props.value)>-1:Hr(e)?t.checked=e.has(r.props.value):e!==n&&(t.checked=Kr(e,jc(t,!0)))}function zf(t){return"_value"in t?t._value:t.value}function jc(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const Kf=ge({patchProp:jf},Af);let xo;function qf(){return xo||(xo=of(Kf))}const Gf=(...t)=>{const e=qf().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=Jf(r);if(!s)return;const i=e._component;!V(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const o=n(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function Jf(t){return me(t)?document.querySelector(t):t}var Yf=!1;/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const Xf=Symbol();var Do;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Do||(Do={}));function Qf(){const t=Mu(!0),e=t.run(()=>ae({}));let n=[],r=[];const s=bi({install(i){s._a=i,i.provide(Xf,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!Yf?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}/**
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
 */const Vc=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Zf=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],a=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(a&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Hc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,a=s+2<t.length,l=a?t[s+2]:0,u=i>>2,f=(i&3)<<4|c>>4;let p=(c&15)<<2|l>>6,m=l&63;a||(m=64,o||(p=64)),r.push(n[u],n[f],n[p],n[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Vc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Zf(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||l==null||f==null)throw new eh;const p=i<<2|c>>4;if(r.push(p),l!==64){const m=c<<4&240|l>>2;if(r.push(m),f!==64){const _=l<<6&192|f;r.push(_)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class eh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const th=function(t){const e=Vc(t);return Hc.encodeByteArray(e,!0)},Wc=function(t){return th(t).replace(/\./g,"")},zc=function(t){try{return Hc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function nh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const rh=()=>nh().__FIREBASE_DEFAULTS__,sh=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ih=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&zc(t[1]);return e&&JSON.parse(e)},Oi=()=>{try{return rh()||sh()||ih()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},oh=t=>{var e,n;return(n=(e=Oi())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Kc=()=>{var t;return(t=Oi())===null||t===void 0?void 0:t.config},qc=t=>{var e;return(e=Oi())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class ah{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function ye(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ch(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ye())}function Gc(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function lh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function uh(){const t=ye();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Jc(){try{return typeof indexedDB=="object"}catch{return!1}}function Yc(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function dh(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const fh="FirebaseError";class tt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=fh,Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zt.prototype.create)}}class Zt{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?hh(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new tt(s,c,r)}}function hh(t,e){return t.replace(ph,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const ph=/\{\$([^}]+)}/g;function gh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Kn(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if($o(i)&&$o(o)){if(!Kn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function $o(t){return t!==null&&typeof t=="object"}/**
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
 */function Qn(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function On(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function kn(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function mh(t,e){const n=new _h(t,e);return n.subscribe.bind(n)}class _h{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");vh(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=_s),s.error===void 0&&(s.error=_s),s.complete===void 0&&(s.complete=_s);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function vh(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function _s(){}/**
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
 */const yh=1e3,wh=2,bh=4*60*60*1e3,Ih=.5;function Lo(t,e=yh,n=wh){const r=e*Math.pow(n,t),s=Math.round(Ih*r*(Math.random()-.5)*2);return Math.min(bh,r+s)}/**
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
 */function De(t){return t&&t._delegate?t._delegate:t}class et{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Eh{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ah;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Rh(e))try{this.getOrInitializeService({instanceIdentifier:Dt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Dt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Dt){return this.instances.has(e)}getOptions(e=Dt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Th(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Dt){return this.component?this.component.multipleInstances?e:Dt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Th(t){return t===Dt?void 0:t}function Rh(t){return t.instantiationMode==="EAGER"}/**
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
 */class Sh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Eh(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ne;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ne||(ne={}));const Ch={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},Ah=ne.INFO,Ph={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},Oh=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Ph[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ki{constructor(e){this.name=e,this._logLevel=Ah,this._logHandler=Oh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ch[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const kh=(t,e)=>e.some(n=>t instanceof n);let Mo,Uo;function Nh(){return Mo||(Mo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xh(){return Uo||(Uo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Xc=new WeakMap,Ys=new WeakMap,Qc=new WeakMap,vs=new WeakMap,Ni=new WeakMap;function Dh(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Rt(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Xc.set(n,t)}).catch(()=>{}),Ni.set(e,t),e}function $h(t){if(Ys.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Ys.set(t,e)}let Xs={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ys.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Qc.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Rt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Lh(t){Xs=t(Xs)}function Mh(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ys(this),e,...n);return Qc.set(r,e.sort?e.sort():[e]),Rt(r)}:xh().includes(t)?function(...e){return t.apply(ys(this),e),Rt(Xc.get(this))}:function(...e){return Rt(t.apply(ys(this),e))}}function Uh(t){return typeof t=="function"?Mh(t):(t instanceof IDBTransaction&&$h(t),kh(t,Nh())?new Proxy(t,Xs):t)}function Rt(t){if(t instanceof IDBRequest)return Dh(t);if(vs.has(t))return vs.get(t);const e=Uh(t);return e!==t&&(vs.set(t,e),Ni.set(e,t)),e}const ys=t=>Ni.get(t);function Fh(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=Rt(o);return r&&o.addEventListener("upgradeneeded",a=>{r(Rt(o.result),a.oldVersion,a.newVersion,Rt(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),c.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Bh=["get","getKey","getAll","getAllKeys","count"],jh=["put","add","delete","clear"],ws=new Map;function Fo(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ws.get(e))return ws.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=jh.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Bh.includes(n)))return;const i=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&a.done]))[0]};return ws.set(e,i),i}Lh(t=>({...t,get:(e,n,r)=>Fo(e,n)||t.get(e,n,r),has:(e,n)=>!!Fo(e,n)||t.has(e,n)}));/**
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
 */class Vh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Hh(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Hh(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Qs="@firebase/app",Bo="0.9.19";/**
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
 */const Gt=new ki("@firebase/app"),Wh="@firebase/app-compat",zh="@firebase/analytics-compat",Kh="@firebase/analytics",qh="@firebase/app-check-compat",Gh="@firebase/app-check",Jh="@firebase/auth",Yh="@firebase/auth-compat",Xh="@firebase/database",Qh="@firebase/database-compat",Zh="@firebase/functions",ep="@firebase/functions-compat",tp="@firebase/installations",np="@firebase/installations-compat",rp="@firebase/messaging",sp="@firebase/messaging-compat",ip="@firebase/performance",op="@firebase/performance-compat",ap="@firebase/remote-config",cp="@firebase/remote-config-compat",lp="@firebase/storage",up="@firebase/storage-compat",dp="@firebase/firestore",fp="@firebase/firestore-compat",hp="firebase",pp="10.4.0";/**
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
 */const Zs="[DEFAULT]",gp={[Qs]:"fire-core",[Wh]:"fire-core-compat",[Kh]:"fire-analytics",[zh]:"fire-analytics-compat",[Gh]:"fire-app-check",[qh]:"fire-app-check-compat",[Jh]:"fire-auth",[Yh]:"fire-auth-compat",[Xh]:"fire-rtdb",[Qh]:"fire-rtdb-compat",[Zh]:"fire-fn",[ep]:"fire-fn-compat",[tp]:"fire-iid",[np]:"fire-iid-compat",[rp]:"fire-fcm",[sp]:"fire-fcm-compat",[ip]:"fire-perf",[op]:"fire-perf-compat",[ap]:"fire-rc",[cp]:"fire-rc-compat",[lp]:"fire-gcs",[up]:"fire-gcs-compat",[dp]:"fire-fst",[fp]:"fire-fst-compat","fire-js":"fire-js",[hp]:"fire-js-all"};/**
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
 */const kr=new Map,ei=new Map;function mp(t,e){try{t.container.addComponent(e)}catch(n){Gt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function dt(t){const e=t.name;if(ei.has(e))return Gt.debug(`There were multiple attempts to register component ${e}.`),!1;ei.set(e,t);for(const n of kr.values())mp(n,t);return!0}function In(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const _p={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},St=new Zt("app","Firebase",_p);/**
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
 */class vp{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new et("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw St.create("app-deleted",{appName:this._name})}}/**
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
 */const Zn=pp;function Zc(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Zs,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw St.create("bad-app-name",{appName:String(s)});if(n||(n=Kc()),!n)throw St.create("no-options");const i=kr.get(s);if(i){if(Kn(n,i.options)&&Kn(r,i.config))return i;throw St.create("duplicate-app",{appName:s})}const o=new Sh(s);for(const a of ei.values())o.addComponent(a);const c=new vp(n,r,o);return kr.set(s,c),c}function el(t=Zs){const e=kr.get(t);if(!e&&t===Zs&&Kc())return Zc();if(!e)throw St.create("no-app",{appName:t});return e}function Ye(t,e,n){var r;let s=(r=gp[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Gt.warn(c.join(" "));return}dt(new et(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const yp="firebase-heartbeat-database",wp=1,qn="firebase-heartbeat-store";let bs=null;function tl(){return bs||(bs=Fh(yp,wp,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(qn)}}}).catch(t=>{throw St.create("idb-open",{originalErrorMessage:t.message})})),bs}async function bp(t){try{return await(await tl()).transaction(qn).objectStore(qn).get(nl(t))}catch(e){if(e instanceof tt)Gt.warn(e.message);else{const n=St.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Gt.warn(n.message)}}}async function jo(t,e){try{const r=(await tl()).transaction(qn,"readwrite");await r.objectStore(qn).put(e,nl(t)),await r.done}catch(n){if(n instanceof tt)Gt.warn(n.message);else{const r=St.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Gt.warn(r.message)}}}function nl(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Ip=1024,Ep=30*24*60*60*1e3;class Tp{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Sp(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Vo();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=Ep}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Vo(),{heartbeatsToSend:n,unsentEntries:r}=Rp(this._heartbeatsCache.heartbeats),s=Wc(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function Vo(){return new Date().toISOString().substring(0,10)}function Rp(t,e=Ip){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Ho(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ho(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Sp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Jc()?Yc().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await bp(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return jo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return jo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ho(t){return Wc(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Cp(t){dt(new et("platform-logger",e=>new Vh(e),"PRIVATE")),dt(new et("heartbeat",e=>new Tp(e),"PRIVATE")),Ye(Qs,Bo,t),Ye(Qs,Bo,"esm2017"),Ye("fire-js","")}Cp("");var Ap="firebase",Pp="10.4.0";/**
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
 */Ye(Ap,Pp,"app");const Op=(t,e)=>e.some(n=>t instanceof n);let Wo,zo;function kp(){return Wo||(Wo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Np(){return zo||(zo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rl=new WeakMap,ti=new WeakMap,sl=new WeakMap,Is=new WeakMap,xi=new WeakMap;function xp(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Ct(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&rl.set(n,t)}).catch(()=>{}),xi.set(e,t),e}function Dp(t){if(ti.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ti.set(t,e)}let ni={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ti.get(t);if(e==="objectStoreNames")return t.objectStoreNames||sl.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ct(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function $p(t){ni=t(ni)}function Lp(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Es(this),e,...n);return sl.set(r,e.sort?e.sort():[e]),Ct(r)}:Np().includes(t)?function(...e){return t.apply(Es(this),e),Ct(rl.get(this))}:function(...e){return Ct(t.apply(Es(this),e))}}function Mp(t){return typeof t=="function"?Lp(t):(t instanceof IDBTransaction&&Dp(t),Op(t,kp())?new Proxy(t,ni):t)}function Ct(t){if(t instanceof IDBRequest)return xp(t);if(Is.has(t))return Is.get(t);const e=Mp(t);return e!==t&&(Is.set(t,e),xi.set(e,t)),e}const Es=t=>xi.get(t);function Up(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=Ct(o);return r&&o.addEventListener("upgradeneeded",a=>{r(Ct(o.result),a.oldVersion,a.newVersion,Ct(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),c.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",()=>s())}).catch(()=>{}),c}const Fp=["get","getKey","getAll","getAllKeys","count"],Bp=["put","add","delete","clear"],Ts=new Map;function Ko(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ts.get(e))return Ts.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Bp.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Fp.includes(n)))return;const i=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&a.done]))[0]};return Ts.set(e,i),i}$p(t=>({...t,get:(e,n,r)=>Ko(e,n)||t.get(e,n,r),has:(e,n)=>!!Ko(e,n)||t.has(e,n)}));const il="@firebase/installations",Di="0.6.4";/**
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
 */const ol=1e4,al=`w:${Di}`,cl="FIS_v2",jp="https://firebaseinstallations.googleapis.com/v1",Vp=60*60*1e3,Hp="installations",Wp="Installations";/**
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
 */const zp={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Jt=new Zt(Hp,Wp,zp);function ll(t){return t instanceof tt&&t.code.includes("request-failed")}/**
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
 */function ul({projectId:t}){return`${jp}/projects/${t}/installations`}function dl(t){return{token:t.token,requestStatus:2,expiresIn:qp(t.expiresIn),creationTime:Date.now()}}async function fl(t,e){const r=(await e.json()).error;return Jt.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function hl({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Kp(t,{refreshToken:e}){const n=hl(t);return n.append("Authorization",Gp(e)),n}async function pl(t){const e=await t();return e.status>=500&&e.status<600?t():e}function qp(t){return Number(t.replace("s","000"))}function Gp(t){return`${cl} ${t}`}/**
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
 */async function Jp({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=ul(t),s=hl(t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:cl,appId:t.appId,sdkVersion:al},c={method:"POST",headers:s,body:JSON.stringify(o)},a=await pl(()=>fetch(r,c));if(a.ok){const l=await a.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:dl(l.authToken)}}else throw await fl("Create Installation",a)}/**
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
 */function gl(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function Yp(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Xp=/^[cdef][\w-]{21}$/,ri="";function Qp(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Zp(t);return Xp.test(n)?n:ri}catch{return ri}}function Zp(t){return Yp(t).substr(0,22)}/**
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
 */function ns(t){return`${t.appName}!${t.appId}`}/**
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
 */const ml=new Map;function _l(t,e){const n=ns(t);vl(n,e),eg(n,e)}function vl(t,e){const n=ml.get(t);if(n)for(const r of n)r(e)}function eg(t,e){const n=tg();n&&n.postMessage({key:t,fid:e}),ng()}let Bt=null;function tg(){return!Bt&&"BroadcastChannel"in self&&(Bt=new BroadcastChannel("[Firebase] FID Change"),Bt.onmessage=t=>{vl(t.data.key,t.data.fid)}),Bt}function ng(){ml.size===0&&Bt&&(Bt.close(),Bt=null)}/**
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
 */const rg="firebase-installations-database",sg=1,Yt="firebase-installations-store";let Rs=null;function $i(){return Rs||(Rs=Up(rg,sg,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Yt)}}})),Rs}async function Nr(t,e){const n=ns(t),s=(await $i()).transaction(Yt,"readwrite"),i=s.objectStore(Yt),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&_l(t,e.fid),e}async function yl(t){const e=ns(t),r=(await $i()).transaction(Yt,"readwrite");await r.objectStore(Yt).delete(e),await r.done}async function rs(t,e){const n=ns(t),s=(await $i()).transaction(Yt,"readwrite"),i=s.objectStore(Yt),o=await i.get(n),c=e(o);return c===void 0?await i.delete(n):await i.put(c,n),await s.done,c&&(!o||o.fid!==c.fid)&&_l(t,c.fid),c}/**
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
 */async function Li(t){let e;const n=await rs(t.appConfig,r=>{const s=ig(r),i=og(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===ri?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function ig(t){const e=t||{fid:Qp(),registrationStatus:0};return wl(e)}function og(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Jt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=ag(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:cg(t)}:{installationEntry:e}}async function ag(t,e){try{const n=await Jp(t,e);return Nr(t.appConfig,n)}catch(n){throw ll(n)&&n.customData.serverCode===409?await yl(t.appConfig):await Nr(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function cg(t){let e=await qo(t.appConfig);for(;e.registrationStatus===1;)await gl(100),e=await qo(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Li(t);return r||n}return e}function qo(t){return rs(t,e=>{if(!e)throw Jt.create("installation-not-found");return wl(e)})}function wl(t){return lg(t)?{fid:t.fid,registrationStatus:0}:t}function lg(t){return t.registrationStatus===1&&t.registrationTime+ol<Date.now()}/**
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
 */async function ug({appConfig:t,heartbeatServiceProvider:e},n){const r=dg(t,n),s=Kp(t,n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:al,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},a=await pl(()=>fetch(r,c));if(a.ok){const l=await a.json();return dl(l)}else throw await fl("Generate Auth Token",a)}function dg(t,{fid:e}){return`${ul(t)}/${e}/authTokens:generate`}/**
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
 */async function Mi(t,e=!1){let n;const r=await rs(t.appConfig,i=>{if(!bl(i))throw Jt.create("not-registered");const o=i.authToken;if(!e&&pg(o))return i;if(o.requestStatus===1)return n=fg(t,e),i;{if(!navigator.onLine)throw Jt.create("app-offline");const c=mg(i);return n=hg(t,c),c}});return n?await n:r.authToken}async function fg(t,e){let n=await Go(t.appConfig);for(;n.authToken.requestStatus===1;)await gl(100),n=await Go(t.appConfig);const r=n.authToken;return r.requestStatus===0?Mi(t,e):r}function Go(t){return rs(t,e=>{if(!bl(e))throw Jt.create("not-registered");const n=e.authToken;return _g(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function hg(t,e){try{const n=await ug(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Nr(t.appConfig,r),n}catch(n){if(ll(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await yl(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Nr(t.appConfig,r)}throw n}}function bl(t){return t!==void 0&&t.registrationStatus===2}function pg(t){return t.requestStatus===2&&!gg(t)}function gg(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Vp}function mg(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function _g(t){return t.requestStatus===1&&t.requestTime+ol<Date.now()}/**
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
 */async function vg(t){const e=t,{installationEntry:n,registrationPromise:r}=await Li(e);return r?r.catch(console.error):Mi(e).catch(console.error),n.fid}/**
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
 */async function yg(t,e=!1){const n=t;return await wg(n),(await Mi(n,e)).token}async function wg(t){const{registrationPromise:e}=await Li(t);e&&await e}/**
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
 */function bg(t){if(!t||!t.options)throw Ss("App Configuration");if(!t.name)throw Ss("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Ss(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Ss(t){return Jt.create("missing-app-config-values",{valueName:t})}/**
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
 */const Il="installations",Ig="installations-internal",Eg=t=>{const e=t.getProvider("app").getImmediate(),n=bg(e),r=In(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Tg=t=>{const e=t.getProvider("app").getImmediate(),n=In(e,Il).getImmediate();return{getId:()=>vg(n),getToken:s=>yg(n,s)}};function Rg(){dt(new et(Il,Eg,"PUBLIC")),dt(new et(Ig,Tg,"PRIVATE"))}Rg();Ye(il,Di);Ye(il,Di,"esm2017");/**
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
 */const xr="analytics",Sg="firebase_id",Cg="origin",Ag=60*1e3,Pg="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ui="https://www.googletagmanager.com/gtag/js";/**
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
 */const Te=new ki("@firebase/analytics");/**
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
 */const Og={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ae=new Zt("analytics","Analytics",Og);/**
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
 */function kg(t){if(!t.startsWith(Ui)){const e=Ae.create("invalid-gtag-resource",{gtagURL:t});return Te.warn(e.message),""}return t}function El(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Ng(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function xg(t,e){const n=Ng("firebase-js-sdk-policy",{createScriptURL:kg}),r=document.createElement("script"),s=`${Ui}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Dg(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function $g(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const a=(await El(n)).find(l=>l.measurementId===s);a&&await e[a.appId]}}catch(c){Te.error(c)}t("config",s,i)}async function Lg(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const c=await El(n);for(const a of o){const l=c.find(f=>f.measurementId===a),u=l&&e[l.appId];if(u)i.push(u);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){Te.error(i)}}function Mg(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[c,a]=o;await Lg(t,e,n,c,a)}else if(i==="config"){const[c,a]=o;await $g(t,e,n,r,c,a)}else if(i==="consent"){const[c]=o;t("consent","update",c)}else if(i==="get"){const[c,a,l]=o;t("get",c,a,l)}else if(i==="set"){const[c]=o;t("set",c)}else t(i,...o)}catch(c){Te.error(c)}}return s}function Ug(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=Mg(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function Fg(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Ui)&&n.src.includes(t))return n;return null}/**
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
 */const Bg=30,jg=1e3;class Vg{constructor(e={},n=jg){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Tl=new Vg;function Hg(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Wg(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:Hg(r)},i=Pg.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let c="";try{const a=await o.json();!((e=a.error)===null||e===void 0)&&e.message&&(c=a.error.message)}catch{}throw Ae.create("config-fetch-failed",{httpStatus:o.status,responseMessage:c})}return o.json()}async function zg(t,e=Tl,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Ae.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Ae.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new Gg;return setTimeout(async()=>{c.abort()},n!==void 0?n:Ag),Rl({appId:r,apiKey:s,measurementId:i},o,c,e)}async function Rl(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Tl){var i;const{appId:o,measurementId:c}=t;try{await Kg(r,e)}catch(a){if(c)return Te.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${a==null?void 0:a.message}]`),{appId:o,measurementId:c};throw a}try{const a=await Wg(t);return s.deleteThrottleMetadata(o),a}catch(a){const l=a;if(!qg(l)){if(s.deleteThrottleMetadata(o),c)return Te.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:c};throw a}const u=Number((i=l==null?void 0:l.customData)===null||i===void 0?void 0:i.httpStatus)===503?Lo(n,s.intervalMillis,Bg):Lo(n,s.intervalMillis),f={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return s.setThrottleMetadata(o,f),Te.debug(`Calling attemptFetch again in ${u} millis`),Rl(t,f,r,s)}}function Kg(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Ae.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function qg(t){if(!(t instanceof tt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class Gg{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Jg(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
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
 */async function Yg(){if(Jc())try{await Yc()}catch(t){return Te.warn(Ae.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Te.warn(Ae.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Xg(t,e,n,r,s,i,o){var c;const a=zg(t);a.then(m=>{n[m.measurementId]=m.appId,t.options.measurementId&&m.measurementId!==t.options.measurementId&&Te.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>Te.error(m)),e.push(a);const l=Yg().then(m=>{if(m)return r.getId()}),[u,f]=await Promise.all([a,l]);Fg(i)||xg(i,u.measurementId),s("js",new Date);const p=(c=o==null?void 0:o.config)!==null&&c!==void 0?c:{};return p[Cg]="firebase",p.update=!0,f!=null&&(p[Sg]=f),s("config",u.measurementId,p),u.measurementId}/**
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
 */class Qg{constructor(e){this.app=e}_delete(){return delete Dn[this.app.options.appId],Promise.resolve()}}let Dn={},Jo=[];const Yo={};let Cs="dataLayer",Zg="gtag",Xo,Sl,Qo=!1;function em(){const t=[];if(Gc()&&t.push("This is a browser extension environment."),dh()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Ae.create("invalid-analytics-context",{errorInfo:e});Te.warn(n.message)}}function tm(t,e,n){em();const r=t.options.appId;if(!r)throw Ae.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Te.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ae.create("no-api-key");if(Dn[r]!=null)throw Ae.create("already-exists",{id:r});if(!Qo){Dg(Cs);const{wrappedGtag:i,gtagCore:o}=Ug(Dn,Jo,Yo,Cs,Zg);Sl=i,Xo=o,Qo=!0}return Dn[r]=Xg(t,Jo,Yo,e,Xo,Cs,n),new Qg(t)}function nm(t=el()){t=De(t);const e=In(t,xr);return e.isInitialized()?e.getImmediate():rm(t)}function rm(t,e={}){const n=In(t,xr);if(n.isInitialized()){const s=n.getImmediate();if(Kn(e,n.getOptions()))return s;throw Ae.create("already-initialized")}return n.initialize({options:e})}function sm(t,e,n,r){t=De(t),Jg(Sl,Dn[t.app.options.appId],e,n,r).catch(s=>Te.error(s))}const Zo="@firebase/analytics",ea="0.10.0";function im(){dt(new et(xr,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return tm(r,s,n)},"PUBLIC")),dt(new et("analytics-internal",t,"PRIVATE")),Ye(Zo,ea),Ye(Zo,ea,"esm2017");function t(e){try{const n=e.getProvider(xr).getImmediate();return{logEvent:(r,s,i)=>sm(n,r,s,i)}}catch(n){throw Ae.create("interop-component-reg-failed",{reason:n})}}}im();/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const an=typeof window<"u";function om(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const Z=Object.assign;function As(t,e){const n={};for(const r in e){const s=e[r];n[r]=We(s)?s.map(t):t(s)}return n}const $n=()=>{},We=Array.isArray,am=/\/$/,cm=t=>t.replace(am,"");function Ps(t,e,n="/"){let r,s={},i="",o="";const c=e.indexOf("#");let a=e.indexOf("?");return c<a&&c>=0&&(a=-1),a>-1&&(r=e.slice(0,a),i=e.slice(a+1,c>-1?c:e.length),s=t(i)),c>-1&&(r=r||e.slice(0,c),o=e.slice(c,e.length)),r=fm(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:o}}function lm(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ta(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function um(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&mn(e.matched[r],n.matched[s])&&Cl(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function mn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Cl(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!dm(t[n],e[n]))return!1;return!0}function dm(t,e){return We(t)?na(t,e):We(e)?na(e,t):t===e}function na(t,e){return We(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function fm(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,c;for(o=0;o<r.length;o++)if(c=r[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var Gn;(function(t){t.pop="pop",t.push="push"})(Gn||(Gn={}));var Ln;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Ln||(Ln={}));function hm(t){if(!t)if(an){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),cm(t)}const pm=/^[^#]+#/;function gm(t,e){return t.replace(pm,"#")+e}function mm(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const ss=()=>({left:window.pageXOffset,top:window.pageYOffset});function _m(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=mm(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function ra(t,e){return(history.state?history.state.position-e:-1)+t}const si=new Map;function vm(t,e){si.set(t,e)}function ym(t){const e=si.get(t);return si.delete(t),e}let wm=()=>location.protocol+"//"+location.host;function Al(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let c=s.includes(t.slice(i))?t.slice(i).length:1,a=s.slice(c);return a[0]!=="/"&&(a="/"+a),ta(a,"")}return ta(n,t)+r+s}function bm(t,e,n,r){let s=[],i=[],o=null;const c=({state:p})=>{const m=Al(t,location),_=n.value,b=e.value;let T=0;if(p){if(n.value=m,e.value=p,o&&o===_){o=null;return}T=b?p.position-b.position:0}else r(m);s.forEach(S=>{S(n.value,_,{delta:T,type:Gn.pop,direction:T?T>0?Ln.forward:Ln.back:Ln.unknown})})};function a(){o=n.value}function l(p){s.push(p);const m=()=>{const _=s.indexOf(p);_>-1&&s.splice(_,1)};return i.push(m),m}function u(){const{history:p}=window;p.state&&p.replaceState(Z({},p.state,{scroll:ss()}),"")}function f(){for(const p of i)p();i=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:l,destroy:f}}function sa(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?ss():null}}function Im(t){const{history:e,location:n}=window,r={value:Al(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(a,l,u){const f=t.indexOf("#"),p=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+a:wm()+t+a;try{e[u?"replaceState":"pushState"](l,"",p),s.value=l}catch(m){console.error(m),n[u?"replace":"assign"](p)}}function o(a,l){const u=Z({},e.state,sa(s.value.back,a,s.value.forward,!0),l,{position:s.value.position});i(a,u,!0),r.value=a}function c(a,l){const u=Z({},s.value,e.state,{forward:a,scroll:ss()});i(u.current,u,!0);const f=Z({},sa(r.value,a,null),{position:u.position+1},l);i(a,f,!1),r.value=a}return{location:r,state:s,push:c,replace:o}}function Em(t){t=hm(t);const e=Im(t),n=bm(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Z({location:"",base:t,go:r,createHref:gm.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function Tm(t){return typeof t=="string"||t&&typeof t=="object"}function Pl(t){return typeof t=="string"||typeof t=="symbol"}const gt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Ol=Symbol("");var ia;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(ia||(ia={}));function _n(t,e){return Z(new Error,{type:t,[Ol]:!0},e)}function rt(t,e){return t instanceof Error&&Ol in t&&(e==null||!!(t.type&e))}const oa="[^/]+?",Rm={sensitive:!1,strict:!1,start:!0,end:!0},Sm=/[.+*?^${}()[\]/\\]/g;function Cm(t,e){const n=Z({},Rm,e),r=[];let s=n.start?"^":"";const i=[];for(const l of t){const u=l.length?[]:[90];n.strict&&!l.length&&(s+="/");for(let f=0;f<l.length;f++){const p=l[f];let m=40+(n.sensitive?.25:0);if(p.type===0)f||(s+="/"),s+=p.value.replace(Sm,"\\$&"),m+=40;else if(p.type===1){const{value:_,repeatable:b,optional:T,regexp:S}=p;i.push({name:_,repeatable:b,optional:T});const N=S||oa;if(N!==oa){m+=10;try{new RegExp(`(${N})`)}catch(C){throw new Error(`Invalid custom RegExp for param "${_}" (${N}): `+C.message)}}let x=b?`((?:${N})(?:/(?:${N}))*)`:`(${N})`;f||(x=T&&l.length<2?`(?:/${x})`:"/"+x),T&&(x+="?"),s+=x,m+=20,T&&(m+=-8),b&&(m+=-20),N===".*"&&(m+=-50)}u.push(m)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function c(l){const u=l.match(o),f={};if(!u)return null;for(let p=1;p<u.length;p++){const m=u[p]||"",_=i[p-1];f[_.name]=m&&_.repeatable?m.split("/"):m}return f}function a(l){let u="",f=!1;for(const p of t){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const m of p)if(m.type===0)u+=m.value;else if(m.type===1){const{value:_,repeatable:b,optional:T}=m,S=_ in l?l[_]:"";if(We(S)&&!b)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const N=We(S)?S.join("/"):S;if(!N)if(T)p.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${_}"`);u+=N}}return u||"/"}return{re:o,score:r,keys:i,parse:c,stringify:a}}function Am(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function Pm(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=Am(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(aa(r))return 1;if(aa(s))return-1}return s.length-r.length}function aa(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Om={type:0,value:""},km=/[a-zA-Z0-9_]/;function Nm(t){if(!t)return[[]];if(t==="/")return[[Om]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${l}": ${m}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let c=0,a,l="",u="";function f(){l&&(n===0?i.push({type:0,value:l}):n===1||n===2||n===3?(i.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:l,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),l="")}function p(){l+=a}for(;c<t.length;){if(a=t[c++],a==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:a==="/"?(l&&f(),o()):a===":"?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:a==="("?n=2:km.test(a)?p():(f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),s}function xm(t,e,n){const r=Cm(Nm(t.path),n),s=Z(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function Dm(t,e){const n=[],r=new Map;e=ua({strict:!1,end:!0,sensitive:!1},e);function s(u){return r.get(u)}function i(u,f,p){const m=!p,_=$m(u);_.aliasOf=p&&p.record;const b=ua(e,u),T=[_];if("alias"in u){const x=typeof u.alias=="string"?[u.alias]:u.alias;for(const C of x)T.push(Z({},_,{components:p?p.record.components:_.components,path:C,aliasOf:p?p.record:_}))}let S,N;for(const x of T){const{path:C}=x;if(f&&C[0]!=="/"){const H=f.record.path,ee=H[H.length-1]==="/"?"":"/";x.path=f.record.path+(C&&ee+C)}if(S=xm(x,f,b),p?p.alias.push(S):(N=N||S,N!==S&&N.alias.push(S),m&&u.name&&!la(S)&&o(u.name)),_.children){const H=_.children;for(let ee=0;ee<H.length;ee++)i(H[ee],S,p&&p.children[ee])}p=p||S,(S.record.components&&Object.keys(S.record.components).length||S.record.name||S.record.redirect)&&a(S)}return N?()=>{o(N)}:$n}function o(u){if(Pl(u)){const f=r.get(u);f&&(r.delete(u),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(u);f>-1&&(n.splice(f,1),u.record.name&&r.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function c(){return n}function a(u){let f=0;for(;f<n.length&&Pm(u,n[f])>=0&&(u.record.path!==n[f].record.path||!kl(u,n[f]));)f++;n.splice(f,0,u),u.record.name&&!la(u)&&r.set(u.record.name,u)}function l(u,f){let p,m={},_,b;if("name"in u&&u.name){if(p=r.get(u.name),!p)throw _n(1,{location:u});b=p.record.name,m=Z(ca(f.params,p.keys.filter(N=>!N.optional).map(N=>N.name)),u.params&&ca(u.params,p.keys.map(N=>N.name))),_=p.stringify(m)}else if("path"in u)_=u.path,p=n.find(N=>N.re.test(_)),p&&(m=p.parse(_),b=p.record.name);else{if(p=f.name?r.get(f.name):n.find(N=>N.re.test(f.path)),!p)throw _n(1,{location:u,currentLocation:f});b=p.record.name,m=Z({},f.params,u.params),_=p.stringify(m)}const T=[];let S=p;for(;S;)T.unshift(S.record),S=S.parent;return{name:b,path:_,params:m,matched:T,meta:Mm(T)}}return t.forEach(u=>i(u)),{addRoute:i,resolve:l,removeRoute:o,getRoutes:c,getRecordMatcher:s}}function ca(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function $m(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:Lm(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function Lm(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function la(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function Mm(t){return t.reduce((e,n)=>Z(e,n.meta),{})}function ua(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function kl(t,e){return e.children.some(n=>n===t||kl(t,n))}const Nl=/#/g,Um=/&/g,Fm=/\//g,Bm=/=/g,jm=/\?/g,xl=/\+/g,Vm=/%5B/g,Hm=/%5D/g,Dl=/%5E/g,Wm=/%60/g,$l=/%7B/g,zm=/%7C/g,Ll=/%7D/g,Km=/%20/g;function Fi(t){return encodeURI(""+t).replace(zm,"|").replace(Vm,"[").replace(Hm,"]")}function qm(t){return Fi(t).replace($l,"{").replace(Ll,"}").replace(Dl,"^")}function ii(t){return Fi(t).replace(xl,"%2B").replace(Km,"+").replace(Nl,"%23").replace(Um,"%26").replace(Wm,"`").replace($l,"{").replace(Ll,"}").replace(Dl,"^")}function Gm(t){return ii(t).replace(Bm,"%3D")}function Jm(t){return Fi(t).replace(Nl,"%23").replace(jm,"%3F")}function Ym(t){return t==null?"":Jm(t).replace(Fm,"%2F")}function Dr(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function Xm(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(xl," "),o=i.indexOf("="),c=Dr(o<0?i:i.slice(0,o)),a=o<0?null:Dr(i.slice(o+1));if(c in e){let l=e[c];We(l)||(l=e[c]=[l]),l.push(a)}else e[c]=a}return e}function da(t){let e="";for(let n in t){const r=t[n];if(n=Gm(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(We(r)?r.map(i=>i&&ii(i)):[r&&ii(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function Qm(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=We(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const Zm=Symbol(""),fa=Symbol(""),is=Symbol(""),Ml=Symbol(""),oi=Symbol("");function Cn(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function vt(t,e,n,r,s){const i=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((o,c)=>{const a=f=>{f===!1?c(_n(4,{from:n,to:e})):f instanceof Error?c(f):Tm(f)?c(_n(2,{from:e,to:f})):(i&&r.enterCallbacks[s]===i&&typeof f=="function"&&i.push(f),o())},l=t.call(r&&r.instances[s],e,n,a);let u=Promise.resolve(l);t.length<3&&(u=u.then(a)),u.catch(f=>c(f))})}function Os(t,e,n,r){const s=[];for(const i of t)for(const o in i.components){let c=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(e_(c)){const l=(c.__vccOpts||c)[e];l&&s.push(vt(l,n,r,i,o))}else{let a=c();s.push(()=>a.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const u=om(l)?l.default:l;i.components[o]=u;const p=(u.__vccOpts||u)[e];return p&&vt(p,n,r,i,o)()}))}}return s}function e_(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function ha(t){const e=Ne(is),n=Ne(Ml),r=z(()=>e.resolve(B(t.to))),s=z(()=>{const{matched:a}=r.value,{length:l}=a,u=a[l-1],f=n.matched;if(!u||!f.length)return-1;const p=f.findIndex(mn.bind(null,u));if(p>-1)return p;const m=pa(a[l-2]);return l>1&&pa(u)===m&&f[f.length-1].path!==m?f.findIndex(mn.bind(null,a[l-2])):p}),i=z(()=>s.value>-1&&s_(n.params,r.value.params)),o=z(()=>s.value>-1&&s.value===n.matched.length-1&&Cl(n.params,r.value.params));function c(a={}){return r_(a)?e[B(t.replace)?"replace":"push"](B(t.to)).catch($n):Promise.resolve()}return{route:r,href:z(()=>r.value.href),isActive:i,isExactActive:o,navigate:c}}const t_=Xr({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:ha,setup(t,{slots:e}){const n=ut(ha(t)),{options:r}=Ne(is),s=z(()=>({[ga(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[ga(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:Bc("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),n_=t_;function r_(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function s_(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!We(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function pa(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const ga=(t,e,n)=>t??e??n,i_=Xr({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Ne(oi),s=z(()=>t.route||r.value),i=Ne(fa,0),o=z(()=>{let l=B(i);const{matched:u}=s.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),c=z(()=>s.value.matched[o.value]);dn(fa,z(()=>o.value+1)),dn(Zm,c),dn(oi,s);const a=ae();return Je(()=>[a.value,c.value,t.name],([l,u,f],[p,m,_])=>{u&&(u.instances[f]=l,m&&m!==u&&l&&l===p&&(u.leaveGuards.size||(u.leaveGuards=m.leaveGuards),u.updateGuards.size||(u.updateGuards=m.updateGuards))),l&&u&&(!m||!mn(u,m)||!p)&&(u.enterCallbacks[f]||[]).forEach(b=>b(l))},{flush:"post"}),()=>{const l=s.value,u=t.name,f=c.value,p=f&&f.components[u];if(!p)return ma(n.default,{Component:p,route:l});const m=f.props[u],_=m?m===!0?l.params:typeof m=="function"?m(l):m:null,T=Bc(p,Z({},_,e,{onVnodeUnmounted:S=>{S.component.isUnmounted&&(f.instances[u]=null)},ref:a}));return ma(n.default,{Component:T,route:l})||T}}});function ma(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Ul=i_;function o_(t){const e=Dm(t.routes,t),n=t.parseQuery||Xm,r=t.stringifyQuery||da,s=t.history,i=Cn(),o=Cn(),c=Cn(),a=fd(gt);let l=gt;an&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=As.bind(null,y=>""+y),f=As.bind(null,Ym),p=As.bind(null,Dr);function m(y,k){let P,$;return Pl(y)?(P=e.getRecordMatcher(y),$=k):$=y,e.addRoute($,P)}function _(y){const k=e.getRecordMatcher(y);k&&e.removeRoute(k)}function b(){return e.getRoutes().map(y=>y.record)}function T(y){return!!e.getRecordMatcher(y)}function S(y,k){if(k=Z({},k||a.value),typeof y=="string"){const g=Ps(n,y,k.path),v=e.resolve({path:g.path},k),w=s.createHref(g.fullPath);return Z(g,v,{params:p(v.params),hash:Dr(g.hash),redirectedFrom:void 0,href:w})}let P;if("path"in y)P=Z({},y,{path:Ps(n,y.path,k.path).path});else{const g=Z({},y.params);for(const v in g)g[v]==null&&delete g[v];P=Z({},y,{params:f(g)}),k.params=f(k.params)}const $=e.resolve(P,k),X=y.hash||"";$.params=u(p($.params));const d=lm(r,Z({},y,{hash:qm(X),path:$.path})),h=s.createHref(d);return Z({fullPath:d,hash:X,query:r===da?Qm(y.query):y.query||{}},$,{redirectedFrom:void 0,href:h})}function N(y){return typeof y=="string"?Ps(n,y,a.value.path):Z({},y)}function x(y,k){if(l!==y)return _n(8,{from:k,to:y})}function C(y){return se(y)}function H(y){return C(Z(N(y),{replace:!0}))}function ee(y){const k=y.matched[y.matched.length-1];if(k&&k.redirect){const{redirect:P}=k;let $=typeof P=="function"?P(y):P;return typeof $=="string"&&($=$.includes("?")||$.includes("#")?$=N($):{path:$},$.params={}),Z({query:y.query,hash:y.hash,params:"path"in $?{}:y.params},$)}}function se(y,k){const P=l=S(y),$=a.value,X=y.state,d=y.force,h=y.replace===!0,g=ee(P);if(g)return se(Z(N(g),{state:typeof g=="object"?Z({},X,g.state):X,force:d,replace:h}),k||P);const v=P;v.redirectedFrom=k;let w;return!d&&um(r,$,P)&&(w=_n(16,{to:v,from:$}),he($,$,!0,!1)),(w?Promise.resolve(w):Ie(v,$)).catch(I=>rt(I)?rt(I,2)?I:Y(I):G(I,v,$)).then(I=>{if(I){if(rt(I,2))return se(Z({replace:h},N(I.to),{state:typeof I.to=="object"?Z({},X,I.to.state):X,force:d}),k||v)}else I=$e(v,$,!0,h,X);return Oe(v,$,I),I})}function we(y,k){const P=x(y,k);return P?Promise.reject(P):Promise.resolve()}function Pe(y){const k=rn.values().next().value;return k&&typeof k.runWithContext=="function"?k.runWithContext(y):y()}function Ie(y,k){let P;const[$,X,d]=a_(y,k);P=Os($.reverse(),"beforeRouteLeave",y,k);for(const g of $)g.leaveGuards.forEach(v=>{P.push(vt(v,y,k))});const h=we.bind(null,y,k);return P.push(h),_e(P).then(()=>{P=[];for(const g of i.list())P.push(vt(g,y,k));return P.push(h),_e(P)}).then(()=>{P=Os(X,"beforeRouteUpdate",y,k);for(const g of X)g.updateGuards.forEach(v=>{P.push(vt(v,y,k))});return P.push(h),_e(P)}).then(()=>{P=[];for(const g of d)if(g.beforeEnter)if(We(g.beforeEnter))for(const v of g.beforeEnter)P.push(vt(v,y,k));else P.push(vt(g.beforeEnter,y,k));return P.push(h),_e(P)}).then(()=>(y.matched.forEach(g=>g.enterCallbacks={}),P=Os(d,"beforeRouteEnter",y,k),P.push(h),_e(P))).then(()=>{P=[];for(const g of o.list())P.push(vt(g,y,k));return P.push(h),_e(P)}).catch(g=>rt(g,8)?g:Promise.reject(g))}function Oe(y,k,P){c.list().forEach($=>Pe(()=>$(y,k,P)))}function $e(y,k,P,$,X){const d=x(y,k);if(d)return d;const h=k===gt,g=an?history.state:{};P&&($||h?s.replace(y.fullPath,Z({scroll:h&&g&&g.scroll},X)):s.push(y.fullPath,X)),a.value=y,he(y,k,P,h),Y()}let ke;function kt(){ke||(ke=s.listen((y,k,P)=>{if(!sr.listening)return;const $=S(y),X=ee($);if(X){se(Z(X,{replace:!0}),$).catch($n);return}l=$;const d=a.value;an&&vm(ra(d.fullPath,P.delta),ss()),Ie($,d).catch(h=>rt(h,12)?h:rt(h,2)?(se(h.to,$).then(g=>{rt(g,20)&&!P.delta&&P.type===Gn.pop&&s.go(-1,!1)}).catch($n),Promise.reject()):(P.delta&&s.go(-P.delta,!1),G(h,$,d))).then(h=>{h=h||$e($,d,!1),h&&(P.delta&&!rt(h,8)?s.go(-P.delta,!1):P.type===Gn.pop&&rt(h,20)&&s.go(-1,!1)),Oe($,d,h)}).catch($n)}))}let nt=Cn(),le=Cn(),Q;function G(y,k,P){Y(y);const $=le.list();return $.length?$.forEach(X=>X(y,k,P)):console.error(y),Promise.reject(y)}function Le(){return Q&&a.value!==gt?Promise.resolve():new Promise((y,k)=>{nt.add([y,k])})}function Y(y){return Q||(Q=!y,kt(),nt.list().forEach(([k,P])=>y?P(y):k()),nt.reset()),y}function he(y,k,P,$){const{scrollBehavior:X}=t;if(!an||!X)return Promise.resolve();const d=!P&&ym(ra(y.fullPath,0))||($||!P)&&history.state&&history.state.scroll||null;return Sr().then(()=>X(y,k,d)).then(h=>h&&_m(h)).catch(h=>G(h,y,k))}const ce=y=>s.go(y);let nn;const rn=new Set,sr={currentRoute:a,listening:!0,addRoute:m,removeRoute:_,hasRoute:T,getRoutes:b,resolve:S,options:t,push:C,replace:H,go:ce,back:()=>ce(-1),forward:()=>ce(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:le.add,isReady:Le,install(y){const k=this;y.component("RouterLink",n_),y.component("RouterView",Ul),y.config.globalProperties.$router=k,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>B(a)}),an&&!nn&&a.value===gt&&(nn=!0,C(s.location).catch(X=>{}));const P={};for(const X in gt)Object.defineProperty(P,X,{get:()=>a.value[X],enumerable:!0});y.provide(is,k),y.provide(Ml,ac(P)),y.provide(oi,a);const $=y.unmount;rn.add(y),y.unmount=function(){rn.delete(y),rn.size<1&&(l=gt,ke&&ke(),ke=null,a.value=gt,nn=!1,Q=!1),$()}}};function _e(y){return y.reduce((k,P)=>k.then(()=>Pe(P)),Promise.resolve())}return sr}function a_(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(l=>mn(l,c))?r.push(c):n.push(c));const a=t.matched[o];a&&(e.matched.find(l=>mn(l,a))||s.push(a))}return[n,r,s]}function c_(){return Ne(is)}const l_=Xr({__name:"App",setup(t){return(e,n)=>(Lt(),$c(B(Ul)))}}),u_="modulepreload",d_=function(t){return"/vue-project/"+t},_a={},f_=function(e,n,r){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=d_(i),i in _a)return;_a[i]=!0;const o=i.endsWith(".css"),c=o?'[rel="stylesheet"]':"";if(!!r)for(let u=s.length-1;u>=0;u--){const f=s[u];if(f.href===i&&(!o||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${c}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":u_,o||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),o)return new Promise((u,f)=>{l.addEventListener("load",u),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})};function Bi(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function va(t){return t!==void 0&&t.enterprise!==void 0}class h_{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}function Fl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const p_=Fl,Bl=new Zt("auth","Firebase",Fl());/**
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
 */const $r=new ki("@firebase/auth");function g_(t,...e){$r.logLevel<=ne.WARN&&$r.warn(`Auth (${Zn}): ${t}`,...e)}function vr(t,...e){$r.logLevel<=ne.ERROR&&$r.error(`Auth (${Zn}): ${t}`,...e)}/**
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
 */function xe(t,...e){throw ji(t,...e)}function Xe(t,...e){return ji(t,...e)}function jl(t,e,n){const r=Object.assign(Object.assign({},p_()),{[e]:n});return new Zt("auth","Firebase",r).create(e,{appName:t.name})}function m_(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&xe(t,"argument-error"),jl(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ji(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Bl.create(t,...e)}function F(t,e,...n){if(!t)throw ji(e,...n)}function at(t){const e="INTERNAL ASSERTION FAILED: "+t;throw vr(e),new Error(e)}function ft(t,e){t||at(e)}/**
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
 */function ai(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function __(){return ya()==="http:"||ya()==="https:"}function ya(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function v_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(__()||Gc()||"connection"in navigator)?navigator.onLine:!0}function y_(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class er{constructor(e,n){this.shortDelay=e,this.longDelay=n,ft(n>e,"Short delay should be less than long delay!"),this.isMobile=ch()||lh()}get(){return v_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Vi(t,e){ft(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Vl{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;at("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;at("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;at("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const w_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const b_=new er(3e4,6e4);function en(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Pt(t,e,n,r,s={}){return Hl(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Qn(Object.assign({key:t.config.apiKey},o)).slice(1),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode),Vl.fetch()(Wl(t,t.config.apiHost,n,c),Object.assign({method:e,headers:a,referrerPolicy:"no-referrer"},i))})}async function Hl(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},w_),e);try{const s=new I_(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw hr(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[a,l]=c.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw hr(t,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw hr(t,"email-already-in-use",o);if(a==="USER_DISABLED")throw hr(t,"user-disabled",o);const u=r[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw jl(t,u,l);xe(t,u)}}catch(s){if(s instanceof tt)throw s;xe(t,"network-request-failed",{message:String(s)})}}async function tr(t,e,n,r,s={}){const i=await Pt(t,e,n,r,s);return"mfaPendingCredential"in i&&xe(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Wl(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Vi(t.config,s):`${t.config.apiScheme}://${s}`}class I_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Xe(this.auth,"network-request-failed")),b_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function hr(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Xe(t,e,r);return s.customData._tokenResponse=n,s}async function E_(t,e){return Pt(t,"GET","/v2/recaptchaConfig",en(t,e))}/**
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
 */async function T_(t,e){return Pt(t,"POST","/v1/accounts:delete",e)}async function R_(t,e){return Pt(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Mn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function S_(t,e=!1){const n=De(t),r=await n.getIdToken(e),s=Hi(r);F(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Mn(ks(s.auth_time)),issuedAtTime:Mn(ks(s.iat)),expirationTime:Mn(ks(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ks(t){return Number(t)*1e3}function Hi(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return vr("JWT malformed, contained fewer than 3 sections"),null;try{const s=zc(n);return s?JSON.parse(s):(vr("Failed to decode base64 JWT payload"),null)}catch(s){return vr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function C_(t){const e=Hi(t);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function vn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof tt&&A_(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function A_({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class P_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class zl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mn(this.lastLoginAt),this.creationTime=Mn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Lr(t){var e;const n=t.auth,r=await t.getIdToken(),s=await vn(t,R_(n,{idToken:r}));F(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?N_(i.providerUserInfo):[],c=k_(t.providerData,o),a=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),u=a?l:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new zl(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,f)}async function O_(t){const e=De(t);await Lr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function k_(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function N_(t){return t.map(e=>{var{providerId:n}=e,r=Bi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function x_(t,e){const n=await Hl(t,{},async()=>{const r=Qn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Wl(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Vl.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class Jn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):C_(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return F(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await x_(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Jn;return r&&(F(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(F(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(F(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Jn,this.toJSON())}_performRefresh(){return at("not implemented")}}/**
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
 */function mt(t,e){F(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class zt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Bi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new P_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new zl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await vn(this,this.stsTokenManager.getToken(this.auth,e));return F(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return S_(this,e)}reload(){return O_(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new zt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Lr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await vn(this,T_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,c,a,l,u;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(s=n.email)!==null&&s!==void 0?s:void 0,m=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,_=(o=n.photoURL)!==null&&o!==void 0?o:void 0,b=(c=n.tenantId)!==null&&c!==void 0?c:void 0,T=(a=n._redirectEventId)!==null&&a!==void 0?a:void 0,S=(l=n.createdAt)!==null&&l!==void 0?l:void 0,N=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:x,emailVerified:C,isAnonymous:H,providerData:ee,stsTokenManager:se}=n;F(x&&se,e,"internal-error");const we=Jn.fromJSON(this.name,se);F(typeof x=="string",e,"internal-error"),mt(f,e.name),mt(p,e.name),F(typeof C=="boolean",e,"internal-error"),F(typeof H=="boolean",e,"internal-error"),mt(m,e.name),mt(_,e.name),mt(b,e.name),mt(T,e.name),mt(S,e.name),mt(N,e.name);const Pe=new zt({uid:x,auth:e,email:p,emailVerified:C,displayName:f,isAnonymous:H,photoURL:_,phoneNumber:m,tenantId:b,stsTokenManager:we,createdAt:S,lastLoginAt:N});return ee&&Array.isArray(ee)&&(Pe.providerData=ee.map(Ie=>Object.assign({},Ie))),T&&(Pe._redirectEventId=T),Pe}static async _fromIdTokenResponse(e,n,r=!1){const s=new Jn;s.updateFromServerResponse(n);const i=new zt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Lr(i),i}}/**
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
 */const wa=new Map;function ct(t){ft(t instanceof Function,"Expected a class definition");let e=wa.get(t);return e?(ft(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,wa.set(t,e),e)}/**
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
 */class Kl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Kl.type="NONE";const ba=Kl;/**
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
 */function yr(t,e,n){return`firebase:${t}:${e}:${n}`}class fn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=yr(this.userKey,s.apiKey,i),this.fullPersistenceKey=yr("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?zt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new fn(ct(ba),e,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||ct(ba);const o=yr(r,e.config.apiKey,e.name);let c=null;for(const l of n)try{const u=await l._get(o);if(u){const f=zt._fromJSON(e,u);l!==i&&(c=f),i=l;break}}catch{}const a=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!a.length?new fn(i,e,r):(i=a[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new fn(i,e,r))}}/**
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
 */function Ia(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Jl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ql(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xl(e))return"Blackberry";if(Ql(e))return"Webos";if(Wi(e))return"Safari";if((e.includes("chrome/")||Gl(e))&&!e.includes("edge/"))return"Chrome";if(Yl(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ql(t=ye()){return/firefox\//i.test(t)}function Wi(t=ye()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Gl(t=ye()){return/crios\//i.test(t)}function Jl(t=ye()){return/iemobile/i.test(t)}function Yl(t=ye()){return/android/i.test(t)}function Xl(t=ye()){return/blackberry/i.test(t)}function Ql(t=ye()){return/webos/i.test(t)}function os(t=ye()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function D_(t=ye()){var e;return os(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function $_(){return uh()&&document.documentMode===10}function Zl(t=ye()){return os(t)||Yl(t)||Ql(t)||Xl(t)||/windows phone/i.test(t)||Jl(t)}function L_(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function eu(t,e=[]){let n;switch(t){case"Browser":n=Ia(ye());break;case"Worker":n=`${Ia(ye())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Zn}/${r}`}/**
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
 */class M_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const a=e(i);o(a)}catch(a){c(a)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function U_(t,e={}){return Pt(t,"GET","/v2/passwordPolicy",en(t,e))}/**
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
 */const F_=6;class B_{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:F_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,c;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=(n=a.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),a.isValid&&(a.isValid=(r=a.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),a.isValid&&(a.isValid=(s=a.containsLowercaseLetter)!==null&&s!==void 0?s:!0),a.isValid&&(a.isValid=(i=a.containsUppercaseLetter)!==null&&i!==void 0?i:!0),a.isValid&&(a.isValid=(o=a.containsNumericCharacter)!==null&&o!==void 0?o:!0),a.isValid&&(a.isValid=(c=a.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),a}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class j_{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ea(this),this.idTokenSubscription=new Ea(this),this.beforeStateQueue=new M_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Bl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ct(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await fn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===c)&&(a!=null&&a.user)&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Lr(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=y_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?De(e):null;return n&&F(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(ct(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await U_(this),n=new B_(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Zt("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ct(e)||this._popupRedirectResolver;F(n,this,"argument-error"),this.redirectPersistenceManager=await fn.create(this,[ct(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const a=e.addObserver(n,r,s);return()=>{o=!0,a()}}else{const a=e.addObserver(n);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&g_(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Ot(t){return De(t)}class Ea{constructor(e){this.auth=e,this.observer=null,this.addObserver=mh(n=>this.observer=n)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */function V_(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function tu(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Xe("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",V_().appendChild(r)})}function H_(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const W_="https://www.google.com/recaptcha/enterprise.js?render=",z_="recaptcha-enterprise",K_="NO_RECAPTCHA";class q_{constructor(e){this.type=z_,this.auth=Ot(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{E_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(a=>{if(a.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new h_(a);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(a=>{c(a)})})}function s(i,o,c){const a=window.grecaptcha;va(a)?a.enterprise.ready(()=>{a.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(K_)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(c=>{if(!n&&va(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}tu(W_+c).then(()=>{s(c,i,o)}).catch(a=>{o(a)})}}).catch(c=>{o(c)})})}}async function Mr(t,e,n,r=!1){const s=new q_(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */function G_(t,e){const n=In(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Kn(i,e??{}))return s;xe(s,"already-initialized")}return n.initialize({options:e})}function J_(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ct);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Y_(t,e,n){const r=Ot(t);F(r._canInitEmulator,r,"emulator-config-failed"),F(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=nu(e),{host:o,port:c}=X_(e),a=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${a}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||Q_()}function nu(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function X_(t){const e=nu(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Ta(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Ta(o)}}}function Ta(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Q_(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class zi{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return at("not implemented")}_getIdTokenResponse(e){return at("not implemented")}_linkToIdToken(e,n){return at("not implemented")}_getReauthenticationResolver(e){return at("not implemented")}}async function Z_(t,e){return Pt(t,"POST","/v1/accounts:update",e)}/**
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
 */async function Ns(t,e){return tr(t,"POST","/v1/accounts:signInWithPassword",en(t,e))}/**
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
 */async function ev(t,e){return tr(t,"POST","/v1/accounts:signInWithEmailLink",en(t,e))}async function tv(t,e){return tr(t,"POST","/v1/accounts:signInWithEmailLink",en(t,e))}/**
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
 */class Yn extends zi{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Yn(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Yn(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const r={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const s=await Mr(e,r,"signInWithPassword");return Ns(e,s)}else return Ns(e,r).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const i=await Mr(e,r,"signInWithPassword");return Ns(e,i)}else return Promise.reject(s)});case"emailLink":return ev(e,{email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return Z_(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return tv(e,{idToken:n,email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function hn(t,e){return tr(t,"POST","/v1/accounts:signInWithIdp",en(t,e))}/**
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
 */const nv="http://localhost";class Xt extends zi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Xt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):xe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Bi(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Xt(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return hn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,hn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,hn(e,n)}buildRequest(){const e={requestUri:nv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Qn(n)}return e}}/**
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
 */function rv(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function sv(t){const e=On(kn(t)).link,n=e?On(kn(e)).deep_link_id:null,r=On(kn(t)).deep_link_id;return(r?On(kn(r)).link:null)||r||n||e||t}class Ki{constructor(e){var n,r,s,i,o,c;const a=On(kn(e)),l=(n=a.apiKey)!==null&&n!==void 0?n:null,u=(r=a.oobCode)!==null&&r!==void 0?r:null,f=rv((s=a.mode)!==null&&s!==void 0?s:null);F(l&&u&&f,"argument-error"),this.apiKey=l,this.operation=f,this.code=u,this.continueUrl=(i=a.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=a.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=a.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=sv(e);try{return new Ki(n)}catch{return null}}}/**
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
 */class En{constructor(){this.providerId=En.PROVIDER_ID}static credential(e,n){return Yn._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Ki.parseLink(n);return F(r,"argument-error"),Yn._fromEmailAndCode(e,r.code,r.tenantId)}}En.PROVIDER_ID="password";En.EMAIL_PASSWORD_SIGN_IN_METHOD="password";En.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class qi{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class nr extends qi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class wt extends nr{constructor(){super("facebook.com")}static credential(e){return Xt._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wt.credential(e.oauthAccessToken)}catch{return null}}}wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";wt.PROVIDER_ID="facebook.com";/**
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
 */class ot extends nr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Xt._fromParams({providerId:ot.PROVIDER_ID,signInMethod:ot.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ot.credentialFromTaggedObject(e)}static credentialFromError(e){return ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ot.credential(n,r)}catch{return null}}}ot.GOOGLE_SIGN_IN_METHOD="google.com";ot.PROVIDER_ID="google.com";/**
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
 */class bt extends nr{constructor(){super("github.com")}static credential(e){return Xt._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bt.credential(e.oauthAccessToken)}catch{return null}}}bt.GITHUB_SIGN_IN_METHOD="github.com";bt.PROVIDER_ID="github.com";/**
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
 */class It extends nr{constructor(){super("twitter.com")}static credential(e,n){return Xt._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return It.credential(n,r)}catch{return null}}}It.TWITTER_SIGN_IN_METHOD="twitter.com";It.PROVIDER_ID="twitter.com";/**
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
 */async function xs(t,e){return tr(t,"POST","/v1/accounts:signUp",en(t,e))}/**
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
 */class Qt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await zt._fromIdTokenResponse(e,r,s),o=Ra(r);return new Qt({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Ra(r);return new Qt({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Ra(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Ur extends tt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ur.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Ur(e,n,r,s)}}function ru(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ur._fromErrorAndOperation(t,i,e,r):i})}async function iv(t,e,n=!1){const r=await vn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Qt._forOperation(t,"link",r)}/**
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
 */async function ov(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await vn(t,ru(r,s,e,t),n);F(i.idToken,r,"internal-error");const o=Hi(i.idToken);F(o,r,"internal-error");const{sub:c}=o;return F(t.uid===c,r,"user-mismatch"),Qt._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&xe(r,"user-mismatch"),i}}/**
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
 */async function su(t,e,n=!1){const r="signIn",s=await ru(t,r,e),i=await Qt._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function av(t,e){return su(Ot(t),e)}/**
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
 */async function iu(t){const e=Ot(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function cv(t,e,n){var r;const s=Ot(t),i={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((r=s._getRecaptchaConfig())===null||r===void 0)&&r.emailPasswordEnabled){const l=await Mr(s,i,"signUpPassword");o=xs(s,l)}else o=xs(s,i).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const u=await Mr(s,i,"signUpPassword");return xs(s,u)}throw l});const c=await o.catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&iu(t),l}),a=await Qt._fromIdTokenResponse(s,"signIn",c);return await s._updateCurrentUser(a.user),a}function lv(t,e,n){return av(De(t),En.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&iu(t),r})}/**
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
 */async function uv(t,e){return Pt(t,"POST","/v1/accounts:update",e)}/**
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
 */async function dv(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=De(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await vn(r,uv(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:a})=>a==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function fv(t,e,n,r){return De(t).onIdTokenChanged(e,n,r)}function hv(t,e,n){return De(t).beforeAuthStateChanged(e,n)}function ou(t,e,n,r){return De(t).onAuthStateChanged(e,n,r)}function Cw(t){return De(t).signOut()}const Fr="__sak";/**
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
 */class au{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Fr,"1"),this.storage.removeItem(Fr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function pv(){const t=ye();return Wi(t)||os(t)}const gv=1e3,mv=10;class cu extends au{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=pv()&&L_(),this.fallbackToPolling=Zl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,a)=>{this.notifyListeners(o,a)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);$_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,mv):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},gv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}cu.type="LOCAL";const _v=cu;/**
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
 */class lu extends au{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}lu.type="SESSION";const uu=lu;/**
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
 */function vv(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class as{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new as(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(n.origin,i)),a=await vv(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:a})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}as.receivers=[];/**
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
 */function Gi(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class yv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,a)=>{const l=Gi("",20);s.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const p=f;if(p.data.eventId===l)switch(p.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(p.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Qe(){return window}function wv(t){Qe().location.href=t}/**
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
 */function du(){return typeof Qe().WorkerGlobalScope<"u"&&typeof Qe().importScripts=="function"}async function bv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Iv(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ev(){return du()?self:null}/**
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
 */const fu="firebaseLocalStorageDb",Tv=1,Br="firebaseLocalStorage",hu="fbase_key";class rr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function cs(t,e){return t.transaction([Br],e?"readwrite":"readonly").objectStore(Br)}function Rv(){const t=indexedDB.deleteDatabase(fu);return new rr(t).toPromise()}function ci(){const t=indexedDB.open(fu,Tv);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Br,{keyPath:hu})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Br)?e(r):(r.close(),await Rv(),e(await ci()))})})}async function Sa(t,e,n){const r=cs(t,!0).put({[hu]:e,value:n});return new rr(r).toPromise()}async function Sv(t,e){const n=cs(t,!1).get(e),r=await new rr(n).toPromise();return r===void 0?null:r.value}function Ca(t,e){const n=cs(t,!0).delete(e);return new rr(n).toPromise()}const Cv=800,Av=3;class pu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ci(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Av)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return du()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=as._getInstance(Ev()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await bv(),!this.activeServiceWorker)return;this.sender=new yv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Iv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ci();return await Sa(e,Fr,"1"),await Ca(e,Fr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Sa(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Sv(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ca(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=cs(s,!1).getAll();return new rr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Cv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pu.type="LOCAL";const Pv=pu;new er(3e4,6e4);/**
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
 */function gu(t,e){return e?ct(e):(F(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Ji extends zi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return hn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return hn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return hn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Ov(t){return su(t.auth,new Ji(t),t.bypassAuthState)}function kv(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),ov(n,new Ji(t),t.bypassAuthState)}async function Nv(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),iv(n,new Ji(t),t.bypassAuthState)}/**
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
 */class mu{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(a))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ov;case"linkViaPopup":case"linkViaRedirect":return Nv;case"reauthViaPopup":case"reauthViaRedirect":return kv;default:xe(this.auth,"internal-error")}}resolve(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const xv=new er(2e3,1e4);async function Dv(t,e,n){const r=Ot(t);m_(t,e,qi);const s=gu(r,n);return new jt(r,"signInViaPopup",e,s).executeNotNull()}class jt extends mu{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,jt.currentPopupAction&&jt.currentPopupAction.cancel(),jt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){ft(this.filter.length===1,"Popup operations only handle one event");const e=Gi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Xe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Xe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,jt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Xe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,xv.get())};e()}}jt.currentPopupAction=null;/**
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
 */const $v="pendingRedirect",wr=new Map;class Lv extends mu{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=wr.get(this.auth._key());if(!e){try{const r=await Mv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}wr.set(this.auth._key(),e)}return this.bypassAuthState||wr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Mv(t,e){const n=Bv(e),r=Fv(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Uv(t,e){wr.set(t._key(),e)}function Fv(t){return ct(t._redirectPersistence)}function Bv(t){return yr($v,t.config.apiKey,t.name)}async function jv(t,e,n=!1){const r=Ot(t),s=gu(r,e),o=await new Lv(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const Vv=10*60*1e3;class Hv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Wv(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!_u(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Xe(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Vv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Aa(e))}saveEventToCache(e){this.cachedEventUids.add(Aa(e)),this.lastProcessedEventTime=Date.now()}}function Aa(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function _u({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Wv(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _u(t);default:return!1}}/**
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
 */async function zv(t,e={}){return Pt(t,"GET","/v1/projects",e)}/**
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
 */const Kv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,qv=/^https?/;async function Gv(t){if(t.config.emulator)return;const{authorizedDomains:e}=await zv(t);for(const n of e)try{if(Jv(n))return}catch{}xe(t,"unauthorized-domain")}function Jv(t){const e=ai(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!qv.test(n))return!1;if(Kv.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Yv=new er(3e4,6e4);function Pa(){const t=Qe().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Xv(t){return new Promise((e,n)=>{var r,s,i;function o(){Pa(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Pa(),n(Xe(t,"network-request-failed"))},timeout:Yv.get()})}if(!((s=(r=Qe().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Qe().gapi)===null||i===void 0)&&i.load)o();else{const c=H_("iframefcb");return Qe()[c]=()=>{gapi.load?o():n(Xe(t,"network-request-failed"))},tu(`https://apis.google.com/js/api.js?onload=${c}`).catch(a=>n(a))}}).catch(e=>{throw br=null,e})}let br=null;function Qv(t){return br=br||Xv(t),br}/**
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
 */const Zv=new er(5e3,15e3),ey="__/auth/iframe",ty="emulator/auth/iframe",ny={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ry=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function sy(t){const e=t.config;F(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Vi(e,ty):`https://${t.config.authDomain}/${ey}`,r={apiKey:e.apiKey,appName:t.name,v:Zn},s=ry.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Qn(r).slice(1)}`}async function iy(t){const e=await Qv(t),n=Qe().gapi;return F(n,t,"internal-error"),e.open({where:document.body,url:sy(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ny,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Xe(t,"network-request-failed"),c=Qe().setTimeout(()=>{i(o)},Zv.get());function a(){Qe().clearTimeout(c),s(r)}r.ping(a).then(a,()=>{i(o)})}))}/**
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
 */const oy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ay=500,cy=600,ly="_blank",uy="http://localhost";class Oa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function dy(t,e,n,r=ay,s=cy){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const a=Object.assign(Object.assign({},oy),{width:r.toString(),height:s.toString(),top:i,left:o}),l=ye().toLowerCase();n&&(c=Gl(l)?ly:n),ql(l)&&(e=e||uy,a.scrollbars="yes");const u=Object.entries(a).reduce((p,[m,_])=>`${p}${m}=${_},`,"");if(D_(l)&&c!=="_self")return fy(e||"",c),new Oa(null);const f=window.open(e||"",c,u);F(f,t,"popup-blocked");try{f.focus()}catch{}return new Oa(f)}function fy(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const hy="__/auth/handler",py="emulator/auth/handler",gy=encodeURIComponent("fac");async function ka(t,e,n,r,s,i){F(t.config.authDomain,t,"auth-domain-config-required"),F(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Zn,eventId:s};if(e instanceof qi){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",gh(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,f]of Object.entries(i||{}))o[u]=f}if(e instanceof nr){const u=e.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const u of Object.keys(c))c[u]===void 0&&delete c[u];const a=await t._getAppCheckToken(),l=a?`#${gy}=${encodeURIComponent(a)}`:"";return`${my(t)}?${Qn(c).slice(1)}${l}`}function my({config:t}){return t.emulator?Vi(t,py):`https://${t.authDomain}/${hy}`}/**
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
 */const Ds="webStorageSupport";class _y{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=uu,this._completeRedirectFn=jv,this._overrideRedirectResult=Uv}async _openPopup(e,n,r,s){var i;ft((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await ka(e,n,r,ai(),s);return dy(e,o,Gi())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await ka(e,n,r,ai(),s);return wv(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(ft(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await iy(e),r=new Hv(e);return n.register("authEvent",s=>(F(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ds,{type:Ds},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ds];o!==void 0&&n(!!o),xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Gv(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Zl()||Wi()||os()}}const vy=_y;var Na="@firebase/auth",xa="1.3.0";/**
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
 */class yy{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function wy(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function by(t){dt(new et("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const a={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eu(t)},l=new j_(r,s,i,a);return J_(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),dt(new et("auth-internal",e=>{const n=Ot(e.getProvider("auth").getImmediate());return(r=>new yy(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ye(Na,xa,wy(t)),Ye(Na,xa,"esm2017")}/**
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
 */const Iy=5*60,Ey=qc("authIdTokenMaxAge")||Iy;let Da=null;const Ty=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Ey)return;const s=n==null?void 0:n.token;Da!==s&&(Da=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Ir(t=el()){const e=In(t,"auth");if(e.isInitialized())return e.getImmediate();const n=G_(t,{popupRedirectResolver:vy,persistence:[Pv,_v,uu]}),r=qc("authTokenSyncURL");if(r){const i=Ty(r);hv(n,i,()=>i(n.currentUser)),fv(n,o=>i(o))}const s=oh("auth");return s&&Y_(n,`http://${s}`),n}by("Browser");function $a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,r)}return n}function yt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?$a(Object(n),!0).forEach(function(r){Ry(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):$a(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function Ry(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function La(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return Object.keys(t).reduce((n,r)=>(e.includes(r)||(n[r]=B(t[r])),n),{})}function jr(t){return typeof t=="function"}function Sy(t){return Ht(t)||Kt(t)}function vu(t,e,n){let r=t;const s=e.split(".");for(let i=0;i<s.length;i++){if(!r[s[i]])return n;r=r[s[i]]}return r}function $s(t,e,n){return z(()=>t.some(r=>vu(e,r,{[n]:!1})[n]))}function Ma(t,e,n){return z(()=>t.reduce((r,s)=>{const i=vu(e,s,{[n]:!1})[n]||[];return r.concat(i)},[]))}function yu(t,e,n,r){return t.call(r,B(e),B(n),r)}function wu(t){return t.$valid!==void 0?!t.$valid:!t}function Cy(t,e,n,r,s,i,o){let{$lazy:c,$rewardEarly:a}=s,l=arguments.length>7&&arguments[7]!==void 0?arguments[7]:[],u=arguments.length>8?arguments[8]:void 0,f=arguments.length>9?arguments[9]:void 0,p=arguments.length>10?arguments[10]:void 0;const m=ae(!!r.value),_=ae(0);n.value=!1;const b=Je([e,r].concat(l,p),()=>{if(c&&!r.value||a&&!f.value&&!n.value)return;let T;try{T=yu(t,e,u,o)}catch(S){T=Promise.reject(S)}_.value++,n.value=!!_.value,m.value=!1,Promise.resolve(T).then(S=>{_.value--,n.value=!!_.value,i.value=S,m.value=wu(S)}).catch(S=>{_.value--,n.value=!!_.value,i.value=S,m.value=!0})},{immediate:!0,deep:typeof e=="object"});return{$invalid:m,$unwatch:b}}function Ay(t,e,n,r,s,i,o,c){let{$lazy:a,$rewardEarly:l}=r;const u=()=>({}),f=z(()=>{if(a&&!n.value||l&&!c.value)return!1;let p=!0;try{const m=yu(t,e,o,i);s.value=m,p=wu(m)}catch(m){s.value=m}return p});return{$unwatch:u,$invalid:f}}function Py(t,e,n,r,s,i,o,c,a,l,u){const f=ae(!1),p=t.$params||{},m=ae(null);let _,b;t.$async?{$invalid:_,$unwatch:b}=Cy(t.$validator,e,f,n,r,m,s,t.$watchTargets,a,l,u):{$invalid:_,$unwatch:b}=Ay(t.$validator,e,n,r,m,s,a,l);const T=t.$message;return{$message:jr(T)?z(()=>T(La({$pending:f,$invalid:_,$params:La(p),$model:e,$response:m,$validator:i,$propertyPath:c,$property:o}))):T||"",$params:p,$pending:f,$invalid:_,$response:m,$unwatch:b}}function Oy(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const e=B(t),n=Object.keys(e),r={},s={},i={};let o=null;return n.forEach(c=>{const a=e[c];switch(!0){case jr(a.$validator):r[c]=a;break;case jr(a):r[c]={$validator:a};break;case c==="$validationGroups":o=a;break;case c.startsWith("$"):i[c]=a;break;default:s[c]=a}}),{rules:r,nestedValidators:s,config:i,validationGroups:o}}const ky="__root";function Ny(t,e,n,r,s,i,o,c,a){const l=Object.keys(t),u=r.get(s,t),f=ae(!1),p=ae(!1),m=ae(0);if(u){if(!u.$partial)return u;u.$unwatch(),f.value=u.$dirty.value}const _={$dirty:f,$path:s,$touch:()=>{f.value||(f.value=!0)},$reset:()=>{f.value&&(f.value=!1)},$commit:()=>{}};return l.length?(l.forEach(b=>{_[b]=Py(t[b],e,_.$dirty,i,o,b,n,s,a,p,m)}),_.$externalResults=z(()=>c.value?[].concat(c.value).map((b,T)=>({$propertyPath:s,$property:n,$validator:"$externalResults",$uid:`${s}-externalResult-${T}`,$message:b,$params:{},$response:null,$pending:!1})):[]),_.$invalid=z(()=>{const b=l.some(T=>B(_[T].$invalid));return p.value=b,!!_.$externalResults.value.length||b}),_.$pending=z(()=>l.some(b=>B(_[b].$pending))),_.$error=z(()=>_.$dirty.value?_.$pending.value||_.$invalid.value:!1),_.$silentErrors=z(()=>l.filter(b=>B(_[b].$invalid)).map(b=>{const T=_[b];return ut({$propertyPath:s,$property:n,$validator:b,$uid:`${s}-${b}`,$message:T.$message,$params:T.$params,$response:T.$response,$pending:T.$pending})}).concat(_.$externalResults.value)),_.$errors=z(()=>_.$dirty.value?_.$silentErrors.value:[]),_.$unwatch=()=>l.forEach(b=>{_[b].$unwatch()}),_.$commit=()=>{p.value=!0,m.value=Date.now()},r.set(s,t,_),_):(u&&r.set(s,t,_),_)}function xy(t,e,n,r,s,i,o){const c=Object.keys(t);return c.length?c.reduce((a,l)=>(a[l]=li({validations:t[l],state:e,key:l,parentKey:n,resultsCache:r,globalConfig:s,instance:i,externalResults:o}),a),{}):{}}function Dy(t,e,n){const r=z(()=>[e,n].filter(_=>_).reduce((_,b)=>_.concat(Object.values(B(b))),[])),s=z({get(){return t.$dirty.value||(r.value.length?r.value.every(_=>_.$dirty):!1)},set(_){t.$dirty.value=_}}),i=z(()=>{const _=B(t.$silentErrors)||[],b=r.value.filter(T=>(B(T).$silentErrors||[]).length).reduce((T,S)=>T.concat(...S.$silentErrors),[]);return _.concat(b)}),o=z(()=>{const _=B(t.$errors)||[],b=r.value.filter(T=>(B(T).$errors||[]).length).reduce((T,S)=>T.concat(...S.$errors),[]);return _.concat(b)}),c=z(()=>r.value.some(_=>_.$invalid)||B(t.$invalid)||!1),a=z(()=>r.value.some(_=>B(_.$pending))||B(t.$pending)||!1),l=z(()=>r.value.some(_=>_.$dirty)||r.value.some(_=>_.$anyDirty)||s.value),u=z(()=>s.value?a.value||c.value:!1),f=()=>{t.$touch(),r.value.forEach(_=>{_.$touch()})},p=()=>{t.$commit(),r.value.forEach(_=>{_.$commit()})},m=()=>{t.$reset(),r.value.forEach(_=>{_.$reset()})};return r.value.length&&r.value.every(_=>_.$dirty)&&f(),{$dirty:s,$errors:o,$invalid:c,$anyDirty:l,$error:u,$pending:a,$touch:f,$reset:m,$silentErrors:i,$commit:p}}function li(t){let{validations:e,state:n,key:r,parentKey:s,childResults:i,resultsCache:o,globalConfig:c={},instance:a,externalResults:l}=t;const u=s?`${s}.${r}`:r,{rules:f,nestedValidators:p,config:m,validationGroups:_}=Oy(e),b=yt(yt({},c),m),T=r?z(()=>{const Y=B(n);return Y?B(Y[r]):void 0}):n,S=yt({},B(l)||{}),N=z(()=>{const Y=B(l);return r?Y?B(Y[r]):void 0:Y}),x=Ny(f,T,r,o,u,b,a,N,n),C=xy(p,T,u,o,b,a,N),H={};_&&Object.entries(_).forEach(Y=>{let[he,ce]=Y;H[he]={$invalid:$s(ce,C,"$invalid"),$error:$s(ce,C,"$error"),$pending:$s(ce,C,"$pending"),$errors:Ma(ce,C,"$errors"),$silentErrors:Ma(ce,C,"$silentErrors")}});const{$dirty:ee,$errors:se,$invalid:we,$anyDirty:Pe,$error:Ie,$pending:Oe,$touch:$e,$reset:ke,$silentErrors:kt,$commit:nt}=Dy(x,C,i),le=r?z({get:()=>B(T),set:Y=>{ee.value=!0;const he=B(n),ce=B(l);ce&&(ce[r]=S[r]),fe(he[r])?he[r].value=Y:he[r]=Y}}):null;r&&b.$autoDirty&&Je(T,()=>{ee.value||$e();const Y=B(l);Y&&(Y[r]=S[r])},{flush:"sync"});async function Q(){return $e(),b.$rewardEarly&&(nt(),await Sr()),await Sr(),new Promise(Y=>{if(!Oe.value)return Y(!we.value);const he=Je(Oe,()=>{Y(!we.value),he()})})}function G(Y){return(i.value||{})[Y]}function Le(){fe(l)?l.value=S:Object.keys(S).length===0?Object.keys(l).forEach(Y=>{delete l[Y]}):Object.assign(l,S)}return ut(yt(yt(yt({},x),{},{$model:le,$dirty:ee,$error:Ie,$errors:se,$invalid:we,$anyDirty:Pe,$pending:Oe,$touch:$e,$reset:ke,$path:u||ky,$silentErrors:kt,$validate:Q,$commit:nt},i&&{$getResultsForChild:G,$clearExternalResults:Le,$validationGroups:H}),C))}class $y{constructor(){this.storage=new Map}set(e,n,r){this.storage.set(e,{rules:n,result:r})}checkRulesValidity(e,n,r){const s=Object.keys(r),i=Object.keys(n);return i.length!==s.length||!i.every(c=>s.includes(c))?!1:i.every(c=>n[c].$params?Object.keys(n[c].$params).every(a=>B(r[c].$params[a])===B(n[c].$params[a])):!0)}get(e,n){const r=this.storage.get(e);if(!r)return;const{rules:s,result:i}=r,o=this.checkRulesValidity(e,n,s),c=i.$unwatch?i.$unwatch:()=>({});return o?i:{$dirty:i.$dirty,$partial:!0,$unwatch:c}}}const Er={COLLECT_ALL:!0,COLLECT_NONE:!1},Ua=Symbol("vuelidate#injectChildResults"),Fa=Symbol("vuelidate#removeChildResults");function Ly(t){let{$scope:e,instance:n}=t;const r={},s=ae([]),i=z(()=>s.value.reduce((u,f)=>(u[f]=B(r[f]),u),{}));function o(u,f){let{$registerAs:p,$scope:m,$stopPropagation:_}=f;_||e===Er.COLLECT_NONE||m===Er.COLLECT_NONE||e!==Er.COLLECT_ALL&&e!==m||(r[p]=u,s.value.push(p))}n.__vuelidateInjectInstances=[].concat(n.__vuelidateInjectInstances||[],o);function c(u){s.value=s.value.filter(f=>f!==u),delete r[u]}n.__vuelidateRemoveInstances=[].concat(n.__vuelidateRemoveInstances||[],c);const a=Ne(Ua,[]);dn(Ua,n.__vuelidateInjectInstances);const l=Ne(Fa,[]);return dn(Fa,n.__vuelidateRemoveInstances),{childResults:i,sendValidationResultsToParent:a,removeValidationResultsFromParent:l}}function bu(t){return new Proxy(t,{get(e,n){return typeof e[n]=="object"?bu(e[n]):z(()=>e[n])}})}let Ba=0;function My(t,e){var n;let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};arguments.length===1&&(r=t,t=void 0,e=void 0);let{$registerAs:s,$scope:i=Er.COLLECT_ALL,$stopPropagation:o,$externalResults:c,currentVueInstance:a}=r;const l=a||((n=_f())===null||n===void 0?void 0:n.proxy),u=l?l.$options:{};s||(Ba+=1,s=`_vuelidate_${Ba}`);const f=ae({}),p=new $y,{childResults:m,sendValidationResultsToParent:_,removeValidationResultsFromParent:b}=l?Ly({$scope:i,instance:l}):{childResults:ae({})};if(!t&&u.validations){const T=u.validations;e=ae({}),Ri(()=>{e.value=l,Je(()=>jr(T)?T.call(e.value,new bu(e.value)):T,S=>{f.value=li({validations:S,state:e,childResults:m,resultsCache:p,globalConfig:r,instance:l,externalResults:c||l.vuelidateExternalResults})},{immediate:!0})}),r=u.validationsConfig||r}else{const T=fe(t)||Sy(t)?t:ut(t||{});Je(T,S=>{f.value=li({validations:S,state:e,childResults:m,resultsCache:p,globalConfig:r,instance:l??{},externalResults:c})},{immediate:!0})}return l&&(_.forEach(T=>T(f,{$registerAs:s,$scope:i,$stopPropagation:o})),Ec(()=>b.forEach(T=>T(s)))),z(()=>yt(yt({},B(f.value)),m.value))}const ls=t=>{if(t=B(t),Array.isArray(t))return!!t.length;if(t==null)return!1;if(t===!1)return!0;if(t instanceof Date)return!isNaN(t.getTime());if(typeof t=="object"){for(let e in t)return!0;return!1}return!!String(t).length},Iu=t=>(t=B(t),Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:String(t).length);function tn(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return r=>(r=B(r),!ls(r)||e.every(s=>(s.lastIndex=0,s.test(r))))}tn(/^[a-zA-Z]*$/);tn(/^[a-zA-Z0-9]*$/);tn(/^\d*(\.\d+)?$/);const Uy=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;var Fy=tn(Uy),By={$validator:Fy,$message:"Value is not a valid email address",$params:{type:"email"}};function jy(t){return e=>!ls(e)||Iu(e)<=B(t)}function Vy(t){return{$validator:jy(t),$message:e=>{let{$params:n}=e;return`The maximum length allowed is ${n.max}`},$params:{max:t,type:"maxLength"}}}function Hy(t){return e=>!ls(e)||Iu(e)>=B(t)}function Wy(t){return{$validator:Hy(t),$message:e=>{let{$params:n}=e;return`This field should be at least ${n.min} characters long`},$params:{min:t,type:"minLength"}}}function zy(t){return typeof t=="string"&&(t=t.trim()),ls(t)}var ja={$validator:zy,$message:"Value is required",$params:{type:"required"}};const Ky=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;tn(Ky);tn(/(^[0-9]*$)|(^-[0-9]+$)/);tn(/^[-]?\d*(\.\d+)?$/);const qy=t=>(Ed("data-v-7e0a58c1"),t=t(),Td(),t),Gy={class:"header"},Jy={class:"login"},Yy={action:""},Xy={key:0,class:"input-box"},Qy={for:"login-input"},Zy=["placeholder"],ew={class:"icon"},tw={class:"input-box"},nw={for:"email-input"},rw=["placeholder"],sw={class:"icon"},iw={key:1,class:"form-error"},ow={class:"input-box"},aw={for:"password-input"},cw=["placeholder"],lw={class:"icon"},uw={key:2,class:"form-error"},dw={class:"input-box"},fw=["value"],hw={class:"input-box submit-google"},pw=["value"],gw={class:"icon"},mw={key:3,class:"form-error form-error-submit"},_w={class:"nav show-nav"},vw={class:"icon"},yw={class:"text"},ww={class:"icon"},bw={class:"text"},Iw=qy(()=>K("div",{class:"indicator"},null,-1)),Ew=Xr({__name:"LoginPanel",setup(t){const e=ae(!0),n=ae("Vue Project"),r=ae("Sign In"),s=ae("Register"),i=ae("Sign Up Google"),o=ae("Sign In Google"),c=ae("User Name"),a=ae("Password"),l=ae("E-mail"),u=ae("Keep me log in"),f=ae(""),p=c_(),m=ut({displayName:"",password:"",email:"",keepLogIn:!1}),_=ut({password:{required:ja,minLength:Wy(6),maxLength:Vy(20)},email:{required:ja,email:By},keepLogIn:{}}),b=My(_,m);Ri(async()=>{await new Promise((x,C)=>{const H=ou(Ir(),ee=>{H(),x(ee)},C)})&&p.push("/feed")}),Je([()=>m.email,()=>m.password],([N,x])=>{f.value=""});const T=async N=>{N.preventDefault();const x=await b.value.$validate(),C=Ir();x&&!e.value?cv(C,m.email,m.password).then(H=>{m.displayName!==""&&dv(C.currentUser,{displayName:m.displayName}),p.push("/feed")}).catch(H=>{switch(console.error("%c error -> ","background: #222; color: #bada55",H.code,H.message),H.code){case"auth/email-already-in-use":f.value="E-mail already in use";break;default:f.value="Something went wrong";break}}):x&&e.value&&lv(C,m.email,m.password).then(H=>{p.push("/feed")}).catch(H=>{switch(console.error("%c error -> ","background: #222; color: #bada55",H.code,H.message),H.code){case"auth/invalid-email":f.value="Invalid e-mail";break;case"auth/user-not-found":f.value="User not found";break;case"auth/wrong-password":f.value="Incorrect password";break;default:f.value="E-mail or password was Incorrect";break}})},S=N=>{N.preventDefault();const x=new ot;Dv(Ir(),x).then(C=>{console.log("%c user google -> ","background: #222; color: #bada55",C.user),p.push("/feed")}).catch(C=>{console.error("%c error -> ","background: #222; color: #bada55",C.code,C.message)})};return(N,x)=>{var H,ee;const C=Hd("ion-icon");return Lt(),Rn("main",null,[K("header",Gy,[K("h1",null,Ue(n.value),1)]),K("section",Jy,[K("form",Yy,[K("h2",null,Ue(e.value?r.value:s.value),1),e.value?fr("",!0):(Lt(),Rn("span",Xy,[K("label",Qy,Ue(c.value),1),dr(K("input",{type:"text",id:"login-input",placeholder:`${c.value}...`,maxlength:"20","onUpdate:modelValue":x[0]||(x[0]=se=>m.displayName=se)},null,8,Zy),[[ms,m.displayName]]),K("span",ew,[de(C,{name:"person-circle-outline"})])])),K("span",tw,[K("label",nw,Ue(l.value),1),dr(K("input",{type:"text",id:"email-input",placeholder:`${l.value}...`,"onUpdate:modelValue":x[1]||(x[1]=se=>m.email=se)},null,8,rw),[[ms,m.email]]),K("span",sw,[de(C,{name:"mail-outline"})])]),B(b).email.$error?(Lt(),Rn("span",iw,Ue(((H=B(b).email.$errors[0])==null?void 0:H.$message)||((ee=B(b).email.$errors[0])==null?void 0:ee.$response.$message)),1)):fr("",!0),K("span",ow,[K("label",aw,Ue(a.value),1),dr(K("input",{type:"password",id:"password-input",placeholder:`${a.value}...`,"onUpdate:modelValue":x[2]||(x[2]=se=>m.password=se)},null,8,cw),[[ms,m.password]]),K("span",lw,[de(C,{name:"lock-closed-outline"})])]),B(b).password.$error?(Lt(),Rn("span",uw,Ue(B(b).password.$errors[0].$message),1)):fr("",!0),K("label",null,[dr(K("input",{type:"checkbox","onUpdate:modelValue":x[3]||(x[3]=se=>m.keepLogIn=se)},null,512),[[Wf,m.keepLogIn]]),Mc(Ue(u.value),1)]),K("span",dw,[K("input",{type:"submit",value:e.value?r.value:s.value,onClick:x[4]||(x[4]=se=>T(se))},null,8,fw)]),K("span",hw,[K("input",{type:"submit",value:e.value?o.value:i.value,onClick:S},null,8,pw),K("span",gw,[de(C,{name:"logo-google"})])]),f.value?(Lt(),Rn("span",mw,Ue(f.value),1)):fr("",!0)])]),K("section",_w,[K("nav",null,[K("a",{style:"--clr:#f3218b;",class:Bn([e.value&&"active"]),onClick:x[5]||(x[5]=()=>e.value=!0)},[K("span",vw,[de(C,{name:"log-in-outline"})]),K("span",yw,Ue(r.value),1)],2),K("a",{style:"--clr:#2196f3;",class:Bn([!e.value&&"active"]),onClick:x[6]||(x[6]=()=>e.value=!1)},[K("span",ww,[de(C,{name:"document-text-outline"})]),K("span",bw,Ue(s.value),1)],2),Iw])])])}}});const Tw=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},Va=Tw(Ew,[["__scopeId","data-v-7e0a58c1"]]),Eu=o_({history:Em("/vue-project/"),routes:[{path:"/",name:"home",component:Va},{path:"/:pathMatch(.*)*",name:"not-found",component:Va},{path:"/feed",name:"feed",component:()=>f_(()=>import("./FeedPanel-512dca9f.js"),[]),meta:{requiresAuth:!0}}]}),Ha=()=>new Promise((t,e)=>{const n=ou(Ir(),r=>{n(),t(r)},e)});Eu.beforeEach(async(t,e,n)=>{t.name==="home"||t.name==="not-found"?await Ha()?n("/feed"):n():t.matched.some(r=>r.meta.requiresAuth)?await Ha()?n():(alert("You don't have access!"),n("/")):n()});const Rw={apiKey:"AIzaSyBRIqo_JdB3v6nV5pAPNfkgm9NujxAup68",authDomain:"vue-project-d53d4.firebaseapp.com",projectId:"vue-project-d53d4",storageBucket:"vue-project-d53d4.appspot.com",messagingSenderId:"495070706443",appId:"1:495070706443:web:c2afce58385a473439800e",measurementId:"G-FQ88TGJMZE"},Sw=Zc(Rw);nm(Sw);const Yi=Gf(l_);Yi.use(Qf());Yi.use(Eu);Yi.mount("#app");export{ou as a,K as b,Rn as c,Xr as d,Lt as e,Ir as g,Ld as o,ae as r,Cw as s,Ue as t,c_ as u};
