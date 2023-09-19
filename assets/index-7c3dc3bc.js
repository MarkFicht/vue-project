(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function _i(t,e){const n=Object.create(null),r=t.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return e?s=>!!n[s.toLowerCase()]:s=>!!n[s]}const ae={},_n=[],ze=()=>{},Nu=()=>!1,Du=/^on[^a-z]/,Jr=t=>Du.test(t),vi=t=>t.startsWith("onUpdate:"),ye=Object.assign,yi=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Lu=Object.prototype.hasOwnProperty,J=(t,e)=>Lu.call(t,e),U=Array.isArray,vn=t=>or(t)==="[object Map]",Yr=t=>or(t)==="[object Set]",ao=t=>or(t)==="[object Date]",V=t=>typeof t=="function",me=t=>typeof t=="string",Gn=t=>typeof t=="symbol",oe=t=>t!==null&&typeof t=="object",Xa=t=>oe(t)&&V(t.then)&&V(t.catch),Qa=Object.prototype.toString,or=t=>Qa.call(t),Mu=t=>or(t).slice(8,-1),Za=t=>or(t)==="[object Object]",wi=t=>me(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ir=_i(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Xr=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Uu=/-(\w)/g,st=Xr(t=>t.replace(Uu,(e,n)=>n?n.toUpperCase():"")),Fu=/\B([A-Z])/g,An=Xr(t=>t.replace(Fu,"-$1").toLowerCase()),Qr=Xr(t=>t.charAt(0).toUpperCase()+t.slice(1)),_s=Xr(t=>t?`on${Qr(t)}`:""),Jn=(t,e)=>!Object.is(t,e),Er=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},kr=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},Hs=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let co;const Ws=()=>co||(co=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function yn(t){if(U(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=me(r)?Hu(r):yn(r);if(s)for(const i in s)e[i]=s[i]}return e}else{if(me(t))return t;if(oe(t))return t}}const ju=/;(?![^(]*\))/g,Bu=/:([^]+)/,Vu=/\/\*[^]*?\*\//g;function Hu(t){const e={};return t.replace(Vu,"").split(ju).forEach(n=>{if(n){const r=n.split(Bu);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Zr(t){let e="";if(me(t))e=t;else if(U(t))for(let n=0;n<t.length;n++){const r=Zr(t[n]);r&&(e+=r+" ")}else if(oe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Wu="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",zu=_i(Wu);function ec(t){return!!t||t===""}function Ku(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=es(t[r],e[r]);return n}function es(t,e){if(t===e)return!0;let n=ao(t),r=ao(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=Gn(t),r=Gn(e),n||r)return t===e;if(n=U(t),r=U(e),n||r)return n&&r?Ku(t,e):!1;if(n=oe(t),r=oe(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const c=t.hasOwnProperty(o),a=e.hasOwnProperty(o);if(c&&!a||!c&&a||!es(t[o],e[o]))return!1}}return String(t)===String(e)}function tc(t,e){return t.findIndex(n=>es(n,e))}const be=t=>me(t)?t:t==null?"":U(t)||oe(t)&&(t.toString===Qa||!V(t.toString))?JSON.stringify(t,nc,2):String(t),nc=(t,e)=>e&&e.__v_isRef?nc(t,e.value):vn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s])=>(n[`${r} =>`]=s,n),{})}:Yr(e)?{[`Set(${e.size})`]:[...e.values()]}:oe(e)&&!U(e)&&!Za(e)?String(e):e;let Be;class rc{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Be,!e&&Be&&(this.index=(Be.scopes||(Be.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=Be;try{return Be=this,e()}finally{Be=n}}}on(){Be=this}off(){Be=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function qu(t){return new rc(t)}function Gu(t,e=Be){e&&e.active&&e.effects.push(t)}function Ju(){return Be}const bi=t=>{const e=new Set(t);return e.w=0,e.n=0,e},sc=t=>(t.w&Dt)>0,ic=t=>(t.n&Dt)>0,Yu=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=Dt},Xu=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const s=e[r];sc(s)&&!ic(s)?s.delete(t):e[n++]=s,s.w&=~Dt,s.n&=~Dt}e.length=n}},zs=new WeakMap;let Un=0,Dt=1;const Ks=30;let He;const Yt=Symbol(""),qs=Symbol("");class Ii{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Gu(this,r)}run(){if(!this.active)return this.fn();let e=He,n=Pt;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=He,He=this,Pt=!0,Dt=1<<++Un,Un<=Ks?Yu(this):lo(this),this.fn()}finally{Un<=Ks&&Xu(this),Dt=1<<--Un,He=this.parent,Pt=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){He===this?this.deferStop=!0:this.active&&(lo(this),this.onStop&&this.onStop(),this.active=!1)}}function lo(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let Pt=!0;const oc=[];function Pn(){oc.push(Pt),Pt=!1}function On(){const t=oc.pop();Pt=t===void 0?!0:t}function Ae(t,e,n){if(Pt&&He){let r=zs.get(t);r||zs.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=bi()),ac(s)}}function ac(t,e){let n=!1;Un<=Ks?ic(t)||(t.n|=Dt,n=!sc(t)):n=!t.has(He),n&&(t.add(He),He.deps.push(t))}function pt(t,e,n,r,s,i){const o=zs.get(t);if(!o)return;let c=[];if(e==="clear")c=[...o.values()];else if(n==="length"&&U(t)){const a=Number(r);o.forEach((l,u)=>{(u==="length"||u>=a)&&c.push(l)})}else switch(n!==void 0&&c.push(o.get(n)),e){case"add":U(t)?wi(n)&&c.push(o.get("length")):(c.push(o.get(Yt)),vn(t)&&c.push(o.get(qs)));break;case"delete":U(t)||(c.push(o.get(Yt)),vn(t)&&c.push(o.get(qs)));break;case"set":vn(t)&&c.push(o.get(Yt));break}if(c.length===1)c[0]&&Gs(c[0]);else{const a=[];for(const l of c)l&&a.push(...l);Gs(bi(a))}}function Gs(t,e){const n=U(t)?t:[...t];for(const r of n)r.computed&&uo(r);for(const r of n)r.computed||uo(r)}function uo(t,e){(t!==He||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}const Qu=_i("__proto__,__v_isRef,__isVue"),cc=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Gn)),Zu=Ei(),ed=Ei(!1,!0),td=Ei(!0),fo=nd();function nd(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=X(this);for(let i=0,o=this.length;i<o;i++)Ae(r,"get",i+"");const s=r[e](...n);return s===-1||s===!1?r[e](...n.map(X)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){Pn();const r=X(this)[e].apply(this,n);return On(),r}}),t}function rd(t){const e=X(this);return Ae(e,"has",t),e.hasOwnProperty(t)}function Ei(t=!1,e=!1){return function(r,s,i){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_isShallow")return e;if(s==="__v_raw"&&i===(t?e?yd:hc:e?fc:dc).get(r))return r;const o=U(r);if(!t){if(o&&J(fo,s))return Reflect.get(fo,s,i);if(s==="hasOwnProperty")return rd}const c=Reflect.get(r,s,i);return(Gn(s)?cc.has(s):Qu(s))||(t||Ae(r,"get",s),e)?c:ge(c)?o&&wi(s)?c:c.value:oe(c)?t?gc(c):gt(c):c}}const sd=lc(),id=lc(!0);function lc(t=!1){return function(n,r,s,i){let o=n[r];if(en(o)&&ge(o)&&!ge(s))return!1;if(!t&&(!$r(s)&&!en(s)&&(o=X(o),s=X(s)),!U(n)&&ge(o)&&!ge(s)))return o.value=s,!0;const c=U(n)&&wi(r)?Number(r)<n.length:J(n,r),a=Reflect.set(n,r,s,i);return n===X(i)&&(c?Jn(s,o)&&pt(n,"set",r,s):pt(n,"add",r,s)),a}}function od(t,e){const n=J(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&pt(t,"delete",e,void 0),r}function ad(t,e){const n=Reflect.has(t,e);return(!Gn(e)||!cc.has(e))&&Ae(t,"has",e),n}function cd(t){return Ae(t,"iterate",U(t)?"length":Yt),Reflect.ownKeys(t)}const uc={get:Zu,set:sd,deleteProperty:od,has:ad,ownKeys:cd},ld={get:td,set(t,e){return!0},deleteProperty(t,e){return!0}},ud=ye({},uc,{get:ed,set:id}),Ti=t=>t,ts=t=>Reflect.getPrototypeOf(t);function pr(t,e,n=!1,r=!1){t=t.__v_raw;const s=X(t),i=X(e);n||(e!==i&&Ae(s,"get",e),Ae(s,"get",i));const{has:o}=ts(s),c=r?Ti:n?Ai:Yn;if(o.call(s,e))return c(t.get(e));if(o.call(s,i))return c(t.get(i));t!==s&&t.get(e)}function gr(t,e=!1){const n=this.__v_raw,r=X(n),s=X(t);return e||(t!==s&&Ae(r,"has",t),Ae(r,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)}function mr(t,e=!1){return t=t.__v_raw,!e&&Ae(X(t),"iterate",Yt),Reflect.get(t,"size",t)}function ho(t){t=X(t);const e=X(this);return ts(e).has.call(e,t)||(e.add(t),pt(e,"add",t,t)),this}function po(t,e){e=X(e);const n=X(this),{has:r,get:s}=ts(n);let i=r.call(n,t);i||(t=X(t),i=r.call(n,t));const o=s.call(n,t);return n.set(t,e),i?Jn(e,o)&&pt(n,"set",t,e):pt(n,"add",t,e),this}function go(t){const e=X(this),{has:n,get:r}=ts(e);let s=n.call(e,t);s||(t=X(t),s=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return s&&pt(e,"delete",t,void 0),i}function mo(){const t=X(this),e=t.size!==0,n=t.clear();return e&&pt(t,"clear",void 0,void 0),n}function _r(t,e){return function(r,s){const i=this,o=i.__v_raw,c=X(o),a=e?Ti:t?Ai:Yn;return!t&&Ae(c,"iterate",Yt),o.forEach((l,u)=>r.call(s,a(l),a(u),i))}}function vr(t,e,n){return function(...r){const s=this.__v_raw,i=X(s),o=vn(i),c=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,l=s[t](...r),u=n?Ti:e?Ai:Yn;return!e&&Ae(i,"iterate",a?qs:Yt),{next(){const{value:f,done:p}=l.next();return p?{value:f,done:p}:{value:c?[u(f[0]),u(f[1])]:u(f),done:p}},[Symbol.iterator](){return this}}}}function yt(t){return function(...e){return t==="delete"?!1:this}}function dd(){const t={get(i){return pr(this,i)},get size(){return mr(this)},has:gr,add:ho,set:po,delete:go,clear:mo,forEach:_r(!1,!1)},e={get(i){return pr(this,i,!1,!0)},get size(){return mr(this)},has:gr,add:ho,set:po,delete:go,clear:mo,forEach:_r(!1,!0)},n={get(i){return pr(this,i,!0)},get size(){return mr(this,!0)},has(i){return gr.call(this,i,!0)},add:yt("add"),set:yt("set"),delete:yt("delete"),clear:yt("clear"),forEach:_r(!0,!1)},r={get(i){return pr(this,i,!0,!0)},get size(){return mr(this,!0)},has(i){return gr.call(this,i,!0)},add:yt("add"),set:yt("set"),delete:yt("delete"),clear:yt("clear"),forEach:_r(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=vr(i,!1,!1),n[i]=vr(i,!0,!1),e[i]=vr(i,!1,!0),r[i]=vr(i,!0,!0)}),[t,n,e,r]}const[fd,hd,pd,gd]=dd();function Ri(t,e){const n=e?t?gd:pd:t?hd:fd;return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(J(n,s)&&s in r?n:r,s,i)}const md={get:Ri(!1,!1)},_d={get:Ri(!1,!0)},vd={get:Ri(!0,!1)},dc=new WeakMap,fc=new WeakMap,hc=new WeakMap,yd=new WeakMap;function wd(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function bd(t){return t.__v_skip||!Object.isExtensible(t)?0:wd(Mu(t))}function gt(t){return en(t)?t:Si(t,!1,uc,md,dc)}function pc(t){return Si(t,!1,ud,_d,fc)}function gc(t){return Si(t,!0,ld,vd,hc)}function Si(t,e,n,r,s){if(!oe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=bd(t);if(o===0)return t;const c=new Proxy(t,o===2?r:n);return s.set(t,c),c}function Xt(t){return en(t)?Xt(t.__v_raw):!!(t&&t.__v_isReactive)}function en(t){return!!(t&&t.__v_isReadonly)}function $r(t){return!!(t&&t.__v_isShallow)}function mc(t){return Xt(t)||en(t)}function X(t){const e=t&&t.__v_raw;return e?X(e):t}function Ci(t){return kr(t,"__v_skip",!0),t}const Yn=t=>oe(t)?gt(t):t,Ai=t=>oe(t)?gc(t):t;function _c(t){Pt&&He&&(t=X(t),ac(t.dep||(t.dep=bi())))}function vc(t,e){t=X(t);const n=t.dep;n&&Gs(n)}function ge(t){return!!(t&&t.__v_isRef===!0)}function W(t){return yc(t,!1)}function Id(t){return yc(t,!0)}function yc(t,e){return ge(t)?t:new Ed(t,e)}class Ed{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:X(e),this._value=n?e:Yn(e)}get value(){return _c(this),this._value}set value(e){const n=this.__v_isShallow||$r(e)||en(e);e=n?e:X(e),Jn(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:Yn(e),vc(this))}}function M(t){return ge(t)?t.value:t}const Td={get:(t,e,n)=>M(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return ge(s)&&!ge(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function wc(t){return Xt(t)?t:new Proxy(t,Td)}class Rd{constructor(e,n,r,s){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Ii(e,()=>{this._dirty||(this._dirty=!0,vc(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const e=X(this);return _c(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function Sd(t,e,n=!1){let r,s;const i=V(t);return i?(r=t,s=ze):(r=t.get,s=t.set),new Rd(r,s,i||!s,n)}function Ot(t,e,n,r){let s;try{s=r?t(...r):t()}catch(i){ns(i,e,n)}return s}function Ke(t,e,n,r){if(V(t)){const i=Ot(t,e,n,r);return i&&Xa(i)&&i.catch(o=>{ns(o,e,n)}),i}const s=[];for(let i=0;i<t.length;i++)s.push(Ke(t[i],e,n,r));return s}function ns(t,e,n,r=!0){const s=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,c=n;for(;i;){const l=i.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](t,o,c)===!1)return}i=i.parent}const a=e.appContext.config.errorHandler;if(a){Ot(a,null,10,[t,o,c]);return}}Cd(t,n,s,r)}function Cd(t,e,n,r=!0){console.error(t)}let Xn=!1,Js=!1;const Ie=[];let Qe=0;const wn=[];let lt=null,Wt=0;const bc=Promise.resolve();let Pi=null;function xr(t){const e=Pi||bc;return t?e.then(this?t.bind(this):t):e}function Ad(t){let e=Qe+1,n=Ie.length;for(;e<n;){const r=e+n>>>1;Qn(Ie[r])<t?e=r+1:n=r}return e}function Oi(t){(!Ie.length||!Ie.includes(t,Xn&&t.allowRecurse?Qe+1:Qe))&&(t.id==null?Ie.push(t):Ie.splice(Ad(t.id),0,t),Ic())}function Ic(){!Xn&&!Js&&(Js=!0,Pi=bc.then(Tc))}function Pd(t){const e=Ie.indexOf(t);e>Qe&&Ie.splice(e,1)}function Od(t){U(t)?wn.push(...t):(!lt||!lt.includes(t,t.allowRecurse?Wt+1:Wt))&&wn.push(t),Ic()}function _o(t,e=Xn?Qe+1:0){for(;e<Ie.length;e++){const n=Ie[e];n&&n.pre&&(Ie.splice(e,1),e--,n())}}function Ec(t){if(wn.length){const e=[...new Set(wn)];if(wn.length=0,lt){lt.push(...e);return}for(lt=e,lt.sort((n,r)=>Qn(n)-Qn(r)),Wt=0;Wt<lt.length;Wt++)lt[Wt]();lt=null,Wt=0}}const Qn=t=>t.id==null?1/0:t.id,kd=(t,e)=>{const n=Qn(t)-Qn(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function Tc(t){Js=!1,Xn=!0,Ie.sort(kd);const e=ze;try{for(Qe=0;Qe<Ie.length;Qe++){const n=Ie[Qe];n&&n.active!==!1&&Ot(n,null,14)}}finally{Qe=0,Ie.length=0,Ec(),Xn=!1,Pi=null,(Ie.length||wn.length)&&Tc()}}function $d(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||ae;let s=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:p}=r[u]||ae;p&&(s=n.map(m=>me(m)?m.trim():m)),f&&(s=n.map(Hs))}let c,a=r[c=_s(e)]||r[c=_s(st(e))];!a&&i&&(a=r[c=_s(An(e))]),a&&Ke(a,t,6,s);const l=r[c+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,Ke(l,t,6,s)}}function Rc(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},c=!1;if(!V(t)){const a=l=>{const u=Rc(l,e,!0);u&&(c=!0,ye(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!i&&!c?(oe(t)&&r.set(t,null),null):(U(i)?i.forEach(a=>o[a]=null):ye(o,i),oe(t)&&r.set(t,o),o)}function rs(t,e){return!t||!Jr(e)?!1:(e=e.slice(2).replace(/Once$/,""),J(t,e[0].toLowerCase()+e.slice(1))||J(t,An(e))||J(t,e))}let ke=null,ss=null;function Nr(t){const e=ke;return ke=t,ss=t&&t.type.__scopeId||null,e}function xd(t){ss=t}function Nd(){ss=null}function Sc(t,e=ke,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Ao(-1);const i=Nr(e);let o;try{o=t(...s)}finally{Nr(i),r._d&&Ao(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function vs(t){const{type:e,vnode:n,proxy:r,withProxy:s,props:i,propsOptions:[o],slots:c,attrs:a,emit:l,render:u,renderCache:f,data:p,setupState:m,ctx:_,inheritAttrs:y}=t;let T,S;const x=Nr(t);try{if(n.shapeFlag&4){const O=s||r;T=Xe(u.call(O,O,f,i,m,p,_)),S=a}else{const O=e;T=Xe(O.length>1?O(i,{attrs:a,slots:c,emit:l}):O(i,null)),S=e.props?a:Dd(a)}}catch(O){Hn.length=0,ns(O,t,1),T=pe(tn)}let H=T;if(S&&y!==!1){const O=Object.keys(S),{shapeFlag:B}=H;O.length&&B&7&&(o&&O.some(vi)&&(S=Ld(S,o)),H=En(H,S))}return n.dirs&&(H=En(H),H.dirs=H.dirs?H.dirs.concat(n.dirs):n.dirs),n.transition&&(H.transition=n.transition),T=H,Nr(x),T}const Dd=t=>{let e;for(const n in t)(n==="class"||n==="style"||Jr(n))&&((e||(e={}))[n]=t[n]);return e},Ld=(t,e)=>{const n={};for(const r in t)(!vi(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Md(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:c,patchFlag:a}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return r?vo(r,o,l):!!o;if(a&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const p=u[f];if(o[p]!==r[p]&&!rs(l,p))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===o?!1:r?o?vo(r,o,l):!0:!!o;return!1}function vo(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!rs(n,i))return!0}return!1}function Ud({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const Fd=t=>t.__isSuspense;function jd(t,e){e&&e.pendingBranch?U(t)?e.effects.push(...t):e.effects.push(t):Od(t)}const yr={};function Ze(t,e,n){return Cc(t,e,n)}function Cc(t,e,{immediate:n,deep:r,flush:s,onTrack:i,onTrigger:o}=ae){var c;const a=Ju()===((c=ve)==null?void 0:c.scope)?ve:null;let l,u=!1,f=!1;if(ge(t)?(l=()=>t.value,u=$r(t)):Xt(t)?(l=()=>t,r=!0):U(t)?(f=!0,u=t.some(O=>Xt(O)||$r(O)),l=()=>t.map(O=>{if(ge(O))return O.value;if(Xt(O))return qt(O);if(V(O))return Ot(O,a,2)})):V(t)?e?l=()=>Ot(t,a,2):l=()=>{if(!(a&&a.isUnmounted))return p&&p(),Ke(t,a,3,[m])}:l=ze,e&&r){const O=l;l=()=>qt(O())}let p,m=O=>{p=x.onStop=()=>{Ot(O,a,4)}},_;if(er)if(m=ze,e?n&&Ke(e,a,3,[l(),f?[]:void 0,m]):l(),s==="sync"){const O=xf();_=O.__watcherHandles||(O.__watcherHandles=[])}else return ze;let y=f?new Array(t.length).fill(yr):yr;const T=()=>{if(x.active)if(e){const O=x.run();(r||u||(f?O.some((B,z)=>Jn(B,y[z])):Jn(O,y)))&&(p&&p(),Ke(e,a,3,[O,y===yr?void 0:f&&y[0]===yr?[]:y,m]),y=O)}else x.run()};T.allowRecurse=!!e;let S;s==="sync"?S=T:s==="post"?S=()=>Se(T,a&&a.suspense):(T.pre=!0,a&&(T.id=a.uid),S=()=>Oi(T));const x=new Ii(l,S);e?n?T():y=x.run():s==="post"?Se(x.run.bind(x),a&&a.suspense):x.run();const H=()=>{x.stop(),a&&a.scope&&yi(a.scope.effects,x)};return _&&_.push(H),H}function Bd(t,e,n){const r=this.proxy,s=me(t)?t.includes(".")?Ac(r,t):()=>r[t]:t.bind(r,r);let i;V(e)?i=e:(i=e.handler,n=e);const o=ve;Tn(this);const c=Cc(s,i.bind(r),n);return o?Tn(o):Qt(),c}function Ac(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function qt(t,e){if(!oe(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),ge(t))qt(t.value,e);else if(U(t))for(let n=0;n<t.length;n++)qt(t[n],e);else if(Yr(t)||vn(t))t.forEach(n=>{qt(n,e)});else if(Za(t))for(const n in t)qt(t[n],e);return t}function wr(t,e){const n=ke;if(n===null)return t;const r=cs(n)||n.proxy,s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[o,c,a,l=ae]=e[i];o&&(V(o)&&(o={mounted:o,updated:o}),o.deep&&qt(c),s.push({dir:o,instance:r,value:c,oldValue:void 0,arg:a,modifiers:l}))}return t}function Bt(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const c=s[o];i&&(c.oldValue=i[o].value);let a=c.dir[r];a&&(Pn(),Ke(a,n,8,[t.el,c,t,e]),On())}}function Ge(t,e){return V(t)?(()=>ye({name:t.name},e,{setup:t}))():t}const Tr=t=>!!t.type.__asyncLoader,Pc=t=>t.type.__isKeepAlive;function Vd(t,e){Oc(t,"a",e)}function Hd(t,e){Oc(t,"da",e)}function Oc(t,e,n=ve){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(is(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Pc(s.parent.vnode)&&Wd(r,e,n,s),s=s.parent}}function Wd(t,e,n,r){const s=is(e,t,r,!0);$c(()=>{yi(r[e],s)},n)}function is(t,e,n=ve,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;Pn(),Tn(n);const c=Ke(e,n,t,o);return Qt(),On(),c});return r?s.unshift(i):s.push(i),i}}const vt=t=>(e,n=ve)=>(!er||t==="sp")&&is(t,(...r)=>e(...r),n),ki=vt("bm"),cn=vt("m"),zd=vt("bu"),Kd=vt("u"),kc=vt("bum"),$c=vt("um"),qd=vt("sp"),Gd=vt("rtg"),Jd=vt("rtc");function Yd(t,e=ve){is("ec",t,e)}const xc="components";function Nc(t,e){return Qd(xc,t,!0,e)||t}const Xd=Symbol.for("v-ndc");function Qd(t,e,n=!0,r=!1){const s=ke||ve;if(s){const i=s.type;if(t===xc){const c=Of(i,!1);if(c&&(c===e||c===st(e)||c===Qr(st(e))))return i}const o=yo(s[t]||i[t],e)||yo(s.appContext[t],e);return!o&&r?i:o}}function yo(t,e){return t&&(t[e]||t[st(e)]||t[Qr(st(e))])}function Zd(t,e,n,r){let s;const i=n&&n[r];if(U(t)||me(t)){s=new Array(t.length);for(let o=0,c=t.length;o<c;o++)s[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){s=new Array(t);for(let o=0;o<t;o++)s[o]=e(o+1,o,void 0,i&&i[o])}else if(oe(t))if(t[Symbol.iterator])s=Array.from(t,(o,c)=>e(o,c,void 0,i&&i[c]));else{const o=Object.keys(t);s=new Array(o.length);for(let c=0,a=o.length;c<a;c++){const l=o[c];s[c]=e(t[l],l,c,i&&i[c])}}else s=[];return n&&(n[r]=s),s}const Ys=t=>t?Kc(t)?cs(t)||t.proxy:Ys(t.parent):null,Vn=ye(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ys(t.parent),$root:t=>Ys(t.root),$emit:t=>t.emit,$options:t=>$i(t),$forceUpdate:t=>t.f||(t.f=()=>Oi(t.update)),$nextTick:t=>t.n||(t.n=xr.bind(t.proxy)),$watch:t=>Bd.bind(t)}),ys=(t,e)=>t!==ae&&!t.__isScriptSetup&&J(t,e),ef={get({_:t},e){const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:c,appContext:a}=t;let l;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(ys(r,e))return o[e]=1,r[e];if(s!==ae&&J(s,e))return o[e]=2,s[e];if((l=t.propsOptions[0])&&J(l,e))return o[e]=3,i[e];if(n!==ae&&J(n,e))return o[e]=4,n[e];Xs&&(o[e]=0)}}const u=Vn[e];let f,p;if(u)return e==="$attrs"&&Ae(t,"get",e),u(t);if((f=c.__cssModules)&&(f=f[e]))return f;if(n!==ae&&J(n,e))return o[e]=4,n[e];if(p=a.config.globalProperties,J(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return ys(s,e)?(s[e]=n,!0):r!==ae&&J(r,e)?(r[e]=n,!0):J(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let c;return!!n[o]||t!==ae&&J(t,o)||ys(e,o)||(c=i[0])&&J(c,o)||J(r,o)||J(Vn,o)||J(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:J(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function wo(t){return U(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Xs=!0;function tf(t){const e=$i(t),n=t.proxy,r=t.ctx;Xs=!1,e.beforeCreate&&bo(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:c,provide:a,inject:l,created:u,beforeMount:f,mounted:p,beforeUpdate:m,updated:_,activated:y,deactivated:T,beforeDestroy:S,beforeUnmount:x,destroyed:H,unmounted:O,render:B,renderTracked:z,renderTriggered:Q,errorCaptured:de,serverPrefetch:le,expose:Re,inheritAttrs:Ne,components:Ue,directives:De,filters:jt}=e;if(l&&nf(l,r,null),o)for(const te in o){const Y=o[te];V(Y)&&(r[te]=Y.bind(n))}if(s){const te=s.call(n,n);oe(te)&&(t.data=gt(te))}if(Xs=!0,i)for(const te in i){const Y=i[te],Fe=V(Y)?Y.bind(n,n):V(Y.get)?Y.get.bind(n,n):ze,Z=!V(Y)&&V(Y.set)?Y.set.bind(n):ze,_e=q({get:Fe,set:Z});Object.defineProperty(r,te,{enumerable:!0,configurable:!0,get:()=>_e.value,set:ce=>_e.value=ce})}if(c)for(const te in c)Dc(c[te],r,n,te);if(a){const te=V(a)?a.call(n):a;Reflect.ownKeys(te).forEach(Y=>{kt(Y,te[Y])})}u&&bo(u,t,"c");function fe(te,Y){U(Y)?Y.forEach(Fe=>te(Fe.bind(n))):Y&&te(Y.bind(n))}if(fe(ki,f),fe(cn,p),fe(zd,m),fe(Kd,_),fe(Vd,y),fe(Hd,T),fe(Yd,de),fe(Jd,z),fe(Gd,Q),fe(kc,x),fe($c,O),fe(qd,le),U(Re))if(Re.length){const te=t.exposed||(t.exposed={});Re.forEach(Y=>{Object.defineProperty(te,Y,{get:()=>n[Y],set:Fe=>n[Y]=Fe})})}else t.exposed||(t.exposed={});B&&t.render===ze&&(t.render=B),Ne!=null&&(t.inheritAttrs=Ne),Ue&&(t.components=Ue),De&&(t.directives=De)}function nf(t,e,n=ze){U(t)&&(t=Qs(t));for(const r in t){const s=t[r];let i;oe(s)?"default"in s?i=$e(s.from||r,s.default,!0):i=$e(s.from||r):i=$e(s),ge(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function bo(t,e,n){Ke(U(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Dc(t,e,n,r){const s=r.includes(".")?Ac(n,r):()=>n[r];if(me(t)){const i=e[t];V(i)&&Ze(s,i)}else if(V(t))Ze(s,t.bind(n));else if(oe(t))if(U(t))t.forEach(i=>Dc(i,e,n,r));else{const i=V(t.handler)?t.handler.bind(n):e[t.handler];V(i)&&Ze(s,i,t)}}function $i(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let a;return c?a=c:!s.length&&!n&&!r?a=e:(a={},s.length&&s.forEach(l=>Dr(a,l,o,!0)),Dr(a,e,o)),oe(e)&&i.set(e,a),a}function Dr(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Dr(t,i,n,!0),s&&s.forEach(o=>Dr(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const c=rf[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const rf={data:Io,props:Eo,emits:Eo,methods:Fn,computed:Fn,beforeCreate:Te,created:Te,beforeMount:Te,mounted:Te,beforeUpdate:Te,updated:Te,beforeDestroy:Te,beforeUnmount:Te,destroyed:Te,unmounted:Te,activated:Te,deactivated:Te,errorCaptured:Te,serverPrefetch:Te,components:Fn,directives:Fn,watch:of,provide:Io,inject:sf};function Io(t,e){return e?t?function(){return ye(V(t)?t.call(this,this):t,V(e)?e.call(this,this):e)}:e:t}function sf(t,e){return Fn(Qs(t),Qs(e))}function Qs(t){if(U(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Te(t,e){return t?[...new Set([].concat(t,e))]:e}function Fn(t,e){return t?ye(Object.create(null),t,e):e}function Eo(t,e){return t?U(t)&&U(e)?[...new Set([...t,...e])]:ye(Object.create(null),wo(t),wo(e??{})):e}function of(t,e){if(!t)return e;if(!e)return t;const n=ye(Object.create(null),t);for(const r in e)n[r]=Te(t[r],e[r]);return n}function Lc(){return{app:null,config:{isNativeTag:Nu,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let af=0;function cf(t,e){return function(r,s=null){V(r)||(r=ye({},r)),s!=null&&!oe(s)&&(s=null);const i=Lc(),o=new Set;let c=!1;const a=i.app={_uid:af++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Nf,get config(){return i.config},set config(l){},use(l,...u){return o.has(l)||(l&&V(l.install)?(o.add(l),l.install(a,...u)):V(l)&&(o.add(l),l(a,...u))),a},mixin(l){return i.mixins.includes(l)||i.mixins.push(l),a},component(l,u){return u?(i.components[l]=u,a):i.components[l]},directive(l,u){return u?(i.directives[l]=u,a):i.directives[l]},mount(l,u,f){if(!c){const p=pe(r,s);return p.appContext=i,u&&e?e(p,l):t(p,l,f),c=!0,a._container=l,l.__vue_app__=a,cs(p.component)||p.component.proxy}},unmount(){c&&(t(null,a._container),delete a._container.__vue_app__)},provide(l,u){return i.provides[l]=u,a},runWithContext(l){Lr=a;try{return l()}finally{Lr=null}}};return a}}let Lr=null;function kt(t,e){if(ve){let n=ve.provides;const r=ve.parent&&ve.parent.provides;r===n&&(n=ve.provides=Object.create(r)),n[t]=e}}function $e(t,e,n=!1){const r=ve||ke;if(r||Lr){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Lr._context.provides;if(s&&t in s)return s[t];if(arguments.length>1)return n&&V(e)?e.call(r&&r.proxy):e}}function lf(t,e,n,r=!1){const s={},i={};kr(i,as,1),t.propsDefaults=Object.create(null),Mc(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:pc(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function uf(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,c=X(s),[a]=t.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let p=u[f];if(rs(t.emitsOptions,p))continue;const m=e[p];if(a)if(J(i,p))m!==i[p]&&(i[p]=m,l=!0);else{const _=st(p);s[_]=Zs(a,c,_,m,t,!1)}else m!==i[p]&&(i[p]=m,l=!0)}}}else{Mc(t,e,s,i)&&(l=!0);let u;for(const f in c)(!e||!J(e,f)&&((u=An(f))===f||!J(e,u)))&&(a?n&&(n[f]!==void 0||n[u]!==void 0)&&(s[f]=Zs(a,c,f,void 0,t,!0)):delete s[f]);if(i!==c)for(const f in i)(!e||!J(e,f))&&(delete i[f],l=!0)}l&&pt(t,"set","$attrs")}function Mc(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,c;if(e)for(let a in e){if(Ir(a))continue;const l=e[a];let u;s&&J(s,u=st(a))?!i||!i.includes(u)?n[u]=l:(c||(c={}))[u]=l:rs(t.emitsOptions,a)||(!(a in r)||l!==r[a])&&(r[a]=l,o=!0)}if(i){const a=X(n),l=c||ae;for(let u=0;u<i.length;u++){const f=i[u];n[f]=Zs(s,a,f,l[f],t,!J(l,f))}}return o}function Zs(t,e,n,r,s,i){const o=t[n];if(o!=null){const c=J(o,"default");if(c&&r===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&V(a)){const{propsDefaults:l}=s;n in l?r=l[n]:(Tn(s),r=l[n]=a.call(null,e),Qt())}else r=a}o[0]&&(i&&!c?r=!1:o[1]&&(r===""||r===An(n))&&(r=!0))}return r}function Uc(t,e,n=!1){const r=e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},c=[];let a=!1;if(!V(t)){const u=f=>{a=!0;const[p,m]=Uc(f,e,!0);ye(o,p),m&&c.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!a)return oe(t)&&r.set(t,_n),_n;if(U(i))for(let u=0;u<i.length;u++){const f=st(i[u]);To(f)&&(o[f]=ae)}else if(i)for(const u in i){const f=st(u);if(To(f)){const p=i[u],m=o[f]=U(p)||V(p)?{type:p}:ye({},p);if(m){const _=Co(Boolean,m.type),y=Co(String,m.type);m[0]=_>-1,m[1]=y<0||_<y,(_>-1||J(m,"default"))&&c.push(f)}}}const l=[o,c];return oe(t)&&r.set(t,l),l}function To(t){return t[0]!=="$"}function Ro(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function So(t,e){return Ro(t)===Ro(e)}function Co(t,e){return U(e)?e.findIndex(n=>So(n,t)):V(e)&&So(e,t)?0:-1}const Fc=t=>t[0]==="_"||t==="$stable",xi=t=>U(t)?t.map(Xe):[Xe(t)],df=(t,e,n)=>{if(e._n)return e;const r=Sc((...s)=>xi(e(...s)),n);return r._c=!1,r},jc=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Fc(s))continue;const i=t[s];if(V(i))e[s]=df(s,i,r);else if(i!=null){const o=xi(i);e[s]=()=>o}}},Bc=(t,e)=>{const n=xi(e);t.slots.default=()=>n},ff=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=X(e),kr(e,"_",n)):jc(e,t.slots={})}else t.slots={},e&&Bc(t,e);kr(t.slots,as,1)},hf=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=ae;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:(ye(s,e),!n&&c===1&&delete s._):(i=!e.$stable,jc(e,s)),o=e}else e&&(Bc(t,e),o={default:1});if(i)for(const c in s)!Fc(c)&&!(c in o)&&delete s[c]};function ei(t,e,n,r,s=!1){if(U(t)){t.forEach((p,m)=>ei(p,e&&(U(e)?e[m]:e),n,r,s));return}if(Tr(r)&&!s)return;const i=r.shapeFlag&4?cs(r.component)||r.component.proxy:r.el,o=s?null:i,{i:c,r:a}=t,l=e&&e.r,u=c.refs===ae?c.refs={}:c.refs,f=c.setupState;if(l!=null&&l!==a&&(me(l)?(u[l]=null,J(f,l)&&(f[l]=null)):ge(l)&&(l.value=null)),V(a))Ot(a,c,12,[o,u]);else{const p=me(a),m=ge(a);if(p||m){const _=()=>{if(t.f){const y=p?J(f,a)?f[a]:u[a]:a.value;s?U(y)&&yi(y,i):U(y)?y.includes(i)||y.push(i):p?(u[a]=[i],J(f,a)&&(f[a]=u[a])):(a.value=[i],t.k&&(u[t.k]=a.value))}else p?(u[a]=o,J(f,a)&&(f[a]=o)):m&&(a.value=o,t.k&&(u[t.k]=o))};o?(_.id=-1,Se(_,n)):_()}}}const Se=jd;function pf(t){return gf(t)}function gf(t,e){const n=Ws();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:c,createComment:a,setText:l,setElementText:u,parentNode:f,nextSibling:p,setScopeId:m=ze,insertStaticContent:_}=t,y=(d,h,g,v=null,b=null,I=null,P=!1,R=null,C=!!h.dynamicChildren)=>{if(d===h)return;d&&!Nn(d,h)&&(v=w(d),ce(d,b,I,!0),d=null),h.patchFlag===-2&&(C=!1,h.dynamicChildren=null);const{type:E,ref:D,shapeFlag:$}=h;switch(E){case os:T(d,h,g,v);break;case tn:S(d,h,g,v);break;case ws:d==null&&x(h,g,v,P);break;case Ve:Ue(d,h,g,v,b,I,P,R,C);break;default:$&1?B(d,h,g,v,b,I,P,R,C):$&6?De(d,h,g,v,b,I,P,R,C):($&64||$&128)&&E.process(d,h,g,v,b,I,P,R,C,A)}D!=null&&b&&ei(D,d&&d.ref,I,h||d,!h)},T=(d,h,g,v)=>{if(d==null)r(h.el=c(h.children),g,v);else{const b=h.el=d.el;h.children!==d.children&&l(b,h.children)}},S=(d,h,g,v)=>{d==null?r(h.el=a(h.children||""),g,v):h.el=d.el},x=(d,h,g,v)=>{[d.el,d.anchor]=_(d.children,h,g,v,d.el,d.anchor)},H=({el:d,anchor:h},g,v)=>{let b;for(;d&&d!==h;)b=p(d),r(d,g,v),d=b;r(h,g,v)},O=({el:d,anchor:h})=>{let g;for(;d&&d!==h;)g=p(d),s(d),d=g;s(h)},B=(d,h,g,v,b,I,P,R,C)=>{P=P||h.type==="svg",d==null?z(h,g,v,b,I,P,R,C):le(d,h,b,I,P,R,C)},z=(d,h,g,v,b,I,P,R)=>{let C,E;const{type:D,props:$,shapeFlag:L,transition:j,dirs:K}=d;if(C=d.el=o(d.type,I,$&&$.is,$),L&8?u(C,d.children):L&16&&de(d.children,C,null,v,b,I&&D!=="foreignObject",P,R),K&&Bt(d,null,v,"created"),Q(C,d,d.scopeId,P,v),$){for(const re in $)re!=="value"&&!Ir(re)&&i(C,re,null,$[re],I,d.children,v,b,we);"value"in $&&i(C,"value",null,$.value),(E=$.onVnodeBeforeMount)&&Ye(E,v,d)}K&&Bt(d,null,v,"beforeMount");const ie=(!b||b&&!b.pendingBranch)&&j&&!j.persisted;ie&&j.beforeEnter(C),r(C,h,g),((E=$&&$.onVnodeMounted)||ie||K)&&Se(()=>{E&&Ye(E,v,d),ie&&j.enter(C),K&&Bt(d,null,v,"mounted")},b)},Q=(d,h,g,v,b)=>{if(g&&m(d,g),v)for(let I=0;I<v.length;I++)m(d,v[I]);if(b){let I=b.subTree;if(h===I){const P=b.vnode;Q(d,P,P.scopeId,P.slotScopeIds,b.parent)}}},de=(d,h,g,v,b,I,P,R,C=0)=>{for(let E=C;E<d.length;E++){const D=d[E]=R?It(d[E]):Xe(d[E]);y(null,D,h,g,v,b,I,P,R)}},le=(d,h,g,v,b,I,P)=>{const R=h.el=d.el;let{patchFlag:C,dynamicChildren:E,dirs:D}=h;C|=d.patchFlag&16;const $=d.props||ae,L=h.props||ae;let j;g&&Vt(g,!1),(j=L.onVnodeBeforeUpdate)&&Ye(j,g,h,d),D&&Bt(h,d,g,"beforeUpdate"),g&&Vt(g,!0);const K=b&&h.type!=="foreignObject";if(E?Re(d.dynamicChildren,E,R,g,v,K,I):P||Y(d,h,R,null,g,v,K,I,!1),C>0){if(C&16)Ne(R,h,$,L,g,v,b);else if(C&2&&$.class!==L.class&&i(R,"class",null,L.class,b),C&4&&i(R,"style",$.style,L.style,b),C&8){const ie=h.dynamicProps;for(let re=0;re<ie.length;re++){const he=ie[re],je=$[he],pn=L[he];(pn!==je||he==="value")&&i(R,he,je,pn,b,d.children,g,v,we)}}C&1&&d.children!==h.children&&u(R,h.children)}else!P&&E==null&&Ne(R,h,$,L,g,v,b);((j=L.onVnodeUpdated)||D)&&Se(()=>{j&&Ye(j,g,h,d),D&&Bt(h,d,g,"updated")},v)},Re=(d,h,g,v,b,I,P)=>{for(let R=0;R<h.length;R++){const C=d[R],E=h[R],D=C.el&&(C.type===Ve||!Nn(C,E)||C.shapeFlag&70)?f(C.el):g;y(C,E,D,null,v,b,I,P,!0)}},Ne=(d,h,g,v,b,I,P)=>{if(g!==v){if(g!==ae)for(const R in g)!Ir(R)&&!(R in v)&&i(d,R,g[R],null,P,h.children,b,I,we);for(const R in v){if(Ir(R))continue;const C=v[R],E=g[R];C!==E&&R!=="value"&&i(d,R,E,C,P,h.children,b,I,we)}"value"in v&&i(d,"value",g.value,v.value)}},Ue=(d,h,g,v,b,I,P,R,C)=>{const E=h.el=d?d.el:c(""),D=h.anchor=d?d.anchor:c("");let{patchFlag:$,dynamicChildren:L,slotScopeIds:j}=h;j&&(R=R?R.concat(j):j),d==null?(r(E,g,v),r(D,g,v),de(h.children,g,D,b,I,P,R,C)):$>0&&$&64&&L&&d.dynamicChildren?(Re(d.dynamicChildren,L,g,b,I,P,R),(h.key!=null||b&&h===b.subTree)&&Vc(d,h,!0)):Y(d,h,g,D,b,I,P,R,C)},De=(d,h,g,v,b,I,P,R,C)=>{h.slotScopeIds=R,d==null?h.shapeFlag&512?b.ctx.activate(h,g,v,P,C):jt(h,g,v,b,I,P,C):at(d,h,C)},jt=(d,h,g,v,b,I,P)=>{const R=d.component=Tf(d,v,b);if(Pc(d)&&(R.ctx.renderer=A),Sf(R),R.asyncDep){if(b&&b.registerDep(R,fe),!d.el){const C=R.subTree=pe(tn);S(null,C,h,g)}return}fe(R,d,h,g,b,I,P)},at=(d,h,g)=>{const v=h.component=d.component;if(Md(d,h,g))if(v.asyncDep&&!v.asyncResolved){te(v,h,g);return}else v.next=h,Pd(v.update),v.update();else h.el=d.el,v.vnode=h},fe=(d,h,g,v,b,I,P)=>{const R=()=>{if(d.isMounted){let{next:D,bu:$,u:L,parent:j,vnode:K}=d,ie=D,re;Vt(d,!1),D?(D.el=K.el,te(d,D,P)):D=K,$&&Er($),(re=D.props&&D.props.onVnodeBeforeUpdate)&&Ye(re,j,D,K),Vt(d,!0);const he=vs(d),je=d.subTree;d.subTree=he,y(je,he,f(je.el),w(je),d,b,I),D.el=he.el,ie===null&&Ud(d,he.el),L&&Se(L,b),(re=D.props&&D.props.onVnodeUpdated)&&Se(()=>Ye(re,j,D,K),b)}else{let D;const{el:$,props:L}=h,{bm:j,m:K,parent:ie}=d,re=Tr(h);if(Vt(d,!1),j&&Er(j),!re&&(D=L&&L.onVnodeBeforeMount)&&Ye(D,ie,h),Vt(d,!0),$&&ee){const he=()=>{d.subTree=vs(d),ee($,d.subTree,d,b,null)};re?h.type.__asyncLoader().then(()=>!d.isUnmounted&&he()):he()}else{const he=d.subTree=vs(d);y(null,he,g,v,d,b,I),h.el=he.el}if(K&&Se(K,b),!re&&(D=L&&L.onVnodeMounted)){const he=h;Se(()=>Ye(D,ie,he),b)}(h.shapeFlag&256||ie&&Tr(ie.vnode)&&ie.vnode.shapeFlag&256)&&d.a&&Se(d.a,b),d.isMounted=!0,h=g=v=null}},C=d.effect=new Ii(R,()=>Oi(E),d.scope),E=d.update=()=>C.run();E.id=d.uid,Vt(d,!0),E()},te=(d,h,g)=>{h.component=d;const v=d.vnode.props;d.vnode=h,d.next=null,uf(d,h.props,v,g),hf(d,h.children,g),Pn(),_o(),On()},Y=(d,h,g,v,b,I,P,R,C=!1)=>{const E=d&&d.children,D=d?d.shapeFlag:0,$=h.children,{patchFlag:L,shapeFlag:j}=h;if(L>0){if(L&128){Z(E,$,g,v,b,I,P,R,C);return}else if(L&256){Fe(E,$,g,v,b,I,P,R,C);return}}j&8?(D&16&&we(E,b,I),$!==E&&u(g,$)):D&16?j&16?Z(E,$,g,v,b,I,P,R,C):we(E,b,I,!0):(D&8&&u(g,""),j&16&&de($,g,v,b,I,P,R,C))},Fe=(d,h,g,v,b,I,P,R,C)=>{d=d||_n,h=h||_n;const E=d.length,D=h.length,$=Math.min(E,D);let L;for(L=0;L<$;L++){const j=h[L]=C?It(h[L]):Xe(h[L]);y(d[L],j,g,null,b,I,P,R,C)}E>D?we(d,b,I,!0,!1,$):de(h,g,v,b,I,P,R,C,$)},Z=(d,h,g,v,b,I,P,R,C)=>{let E=0;const D=h.length;let $=d.length-1,L=D-1;for(;E<=$&&E<=L;){const j=d[E],K=h[E]=C?It(h[E]):Xe(h[E]);if(Nn(j,K))y(j,K,g,null,b,I,P,R,C);else break;E++}for(;E<=$&&E<=L;){const j=d[$],K=h[L]=C?It(h[L]):Xe(h[L]);if(Nn(j,K))y(j,K,g,null,b,I,P,R,C);else break;$--,L--}if(E>$){if(E<=L){const j=L+1,K=j<D?h[j].el:v;for(;E<=L;)y(null,h[E]=C?It(h[E]):Xe(h[E]),g,K,b,I,P,R,C),E++}}else if(E>L)for(;E<=$;)ce(d[E],b,I,!0),E++;else{const j=E,K=E,ie=new Map;for(E=K;E<=L;E++){const Pe=h[E]=C?It(h[E]):Xe(h[E]);Pe.key!=null&&ie.set(Pe.key,E)}let re,he=0;const je=L-K+1;let pn=!1,so=0;const xn=new Array(je);for(E=0;E<je;E++)xn[E]=0;for(E=j;E<=$;E++){const Pe=d[E];if(he>=je){ce(Pe,b,I,!0);continue}let Je;if(Pe.key!=null)Je=ie.get(Pe.key);else for(re=K;re<=L;re++)if(xn[re-K]===0&&Nn(Pe,h[re])){Je=re;break}Je===void 0?ce(Pe,b,I,!0):(xn[Je-K]=E+1,Je>=so?so=Je:pn=!0,y(Pe,h[Je],g,null,b,I,P,R,C),he++)}const io=pn?mf(xn):_n;for(re=io.length-1,E=je-1;E>=0;E--){const Pe=K+E,Je=h[Pe],oo=Pe+1<D?h[Pe+1].el:v;xn[E]===0?y(null,Je,g,oo,b,I,P,R,C):pn&&(re<0||E!==io[re]?_e(Je,g,oo,2):re--)}}},_e=(d,h,g,v,b=null)=>{const{el:I,type:P,transition:R,children:C,shapeFlag:E}=d;if(E&6){_e(d.component.subTree,h,g,v);return}if(E&128){d.suspense.move(h,g,v);return}if(E&64){P.move(d,h,g,A);return}if(P===Ve){r(I,h,g);for(let $=0;$<C.length;$++)_e(C[$],h,g,v);r(d.anchor,h,g);return}if(P===ws){H(d,h,g);return}if(v!==2&&E&1&&R)if(v===0)R.beforeEnter(I),r(I,h,g),Se(()=>R.enter(I),b);else{const{leave:$,delayLeave:L,afterLeave:j}=R,K=()=>r(I,h,g),ie=()=>{$(I,()=>{K(),j&&j()})};L?L(I,K,ie):ie()}else r(I,h,g)},ce=(d,h,g,v=!1,b=!1)=>{const{type:I,props:P,ref:R,children:C,dynamicChildren:E,shapeFlag:D,patchFlag:$,dirs:L}=d;if(R!=null&&ei(R,null,g,d,!0),D&256){h.ctx.deactivate(d);return}const j=D&1&&L,K=!Tr(d);let ie;if(K&&(ie=P&&P.onVnodeBeforeUnmount)&&Ye(ie,h,d),D&6)hr(d.component,g,v);else{if(D&128){d.suspense.unmount(g,v);return}j&&Bt(d,null,h,"beforeUnmount"),D&64?d.type.remove(d,h,g,b,A,v):E&&(I!==Ve||$>0&&$&64)?we(E,h,g,!1,!0):(I===Ve&&$&384||!b&&D&16)&&we(C,h,g),v&&fn(d)}(K&&(ie=P&&P.onVnodeUnmounted)||j)&&Se(()=>{ie&&Ye(ie,h,d),j&&Bt(d,null,h,"unmounted")},g)},fn=d=>{const{type:h,el:g,anchor:v,transition:b}=d;if(h===Ve){hn(g,v);return}if(h===ws){O(d);return}const I=()=>{s(g),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(d.shapeFlag&1&&b&&!b.persisted){const{leave:P,delayLeave:R}=b,C=()=>P(g,I);R?R(d.el,I,C):C()}else I()},hn=(d,h)=>{let g;for(;d!==h;)g=p(d),s(d),d=g;s(h)},hr=(d,h,g)=>{const{bum:v,scope:b,update:I,subTree:P,um:R}=d;v&&Er(v),b.stop(),I&&(I.active=!1,ce(P,d,h,g)),R&&Se(R,h),Se(()=>{d.isUnmounted=!0},h),h&&h.pendingBranch&&!h.isUnmounted&&d.asyncDep&&!d.asyncResolved&&d.suspenseId===h.pendingId&&(h.deps--,h.deps===0&&h.resolve())},we=(d,h,g,v=!1,b=!1,I=0)=>{for(let P=I;P<d.length;P++)ce(d[P],h,g,v,b)},w=d=>d.shapeFlag&6?w(d.component.subTree):d.shapeFlag&128?d.suspense.next():p(d.anchor||d.el),k=(d,h,g)=>{d==null?h._vnode&&ce(h._vnode,null,null,!0):y(h._vnode||null,d,h,null,null,null,g),_o(),Ec(),h._vnode=d},A={p:y,um:ce,m:_e,r:fn,mt:jt,mc:de,pc:Y,pbc:Re,n:w,o:t};let N,ee;return e&&([N,ee]=e(A)),{render:k,hydrate:N,createApp:cf(k,N)}}function Vt({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function Vc(t,e,n=!1){const r=t.children,s=e.children;if(U(r)&&U(s))for(let i=0;i<r.length;i++){const o=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=It(s[i]),c.el=o.el),n||Vc(o,c)),c.type===os&&(c.el=o.el)}}function mf(t){const e=t.slice(),n=[0];let r,s,i,o,c;const a=t.length;for(r=0;r<a;r++){const l=t[r];if(l!==0){if(s=n[n.length-1],t[s]<l){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<l?i=c+1:o=c;l<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const _f=t=>t.__isTeleport,Ve=Symbol.for("v-fgt"),os=Symbol.for("v-txt"),tn=Symbol.for("v-cmt"),ws=Symbol.for("v-stc"),Hn=[];let We=null;function ue(t=!1){Hn.push(We=t?null:[])}function vf(){Hn.pop(),We=Hn[Hn.length-1]||null}let Zn=1;function Ao(t){Zn+=t}function Hc(t){return t.dynamicChildren=Zn>0?We||_n:null,vf(),Zn>0&&We&&We.push(t),t}function Oe(t,e,n,r,s,i){return Hc(G(t,e,n,r,s,i,!0))}function Rt(t,e,n,r,s){return Hc(pe(t,e,n,r,s,!0))}function ti(t){return t?t.__v_isVNode===!0:!1}function Nn(t,e){return t.type===e.type&&t.key===e.key}const as="__vInternal",Wc=({key:t})=>t??null,Rr=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?me(t)||ge(t)||V(t)?{i:ke,r:t,k:e,f:!!n}:t:null);function G(t,e=null,n=null,r=0,s=null,i=t===Ve?0:1,o=!1,c=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Wc(e),ref:e&&Rr(e),scopeId:ss,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:ke};return c?(Ni(a,n),i&128&&t.normalize(a)):n&&(a.shapeFlag|=me(n)?8:16),Zn>0&&!o&&We&&(a.patchFlag>0||i&6)&&a.patchFlag!==32&&We.push(a),a}const pe=yf;function yf(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Xd)&&(t=tn),ti(t)){const c=En(t,e,!0);return n&&Ni(c,n),Zn>0&&!i&&We&&(c.shapeFlag&6?We[We.indexOf(t)]=c:We.push(c)),c.patchFlag|=-2,c}if(kf(t)&&(t=t.__vccOpts),e){e=wf(e);let{class:c,style:a}=e;c&&!me(c)&&(e.class=Zr(c)),oe(a)&&(mc(a)&&!U(a)&&(a=ye({},a)),e.style=yn(a))}const o=me(t)?1:Fd(t)?128:_f(t)?64:oe(t)?4:V(t)?2:0;return G(t,e,n,r,s,o,i,!0)}function wf(t){return t?mc(t)||as in t?ye({},t):t:null}function En(t,e,n=!1){const{props:r,ref:s,patchFlag:i,children:o}=t,c=e?bf(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&Wc(c),ref:e&&e.ref?n&&s?U(s)?s.concat(Rr(e)):[s,Rr(e)]:Rr(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ve?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&En(t.ssContent),ssFallback:t.ssFallback&&En(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function zc(t=" ",e=0){return pe(os,null,t,e)}function ut(t="",e=!1){return e?(ue(),Rt(tn,null,t)):pe(tn,null,t)}function Xe(t){return t==null||typeof t=="boolean"?pe(tn):U(t)?pe(Ve,null,t.slice()):typeof t=="object"?It(t):pe(os,null,String(t))}function It(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:En(t)}function Ni(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(U(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Ni(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!(as in e)?e._ctx=ke:s===3&&ke&&(ke.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else V(e)?(e={default:e,_ctx:ke},n=32):(e=String(e),r&64?(n=16,e=[zc(e)]):n=8);t.children=e,t.shapeFlag|=n}function bf(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Zr([e.class,r.class]));else if(s==="style")e.style=yn([e.style,r.style]);else if(Jr(s)){const i=e[s],o=r[s];o&&i!==o&&!(U(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Ye(t,e,n,r=null){Ke(t,e,7,[n,r])}const If=Lc();let Ef=0;function Tf(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||If,i={uid:Ef++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new rc(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Uc(r,s),emitsOptions:Rc(r,s),emit:null,emitted:null,propsDefaults:ae,inheritAttrs:r.inheritAttrs,ctx:ae,data:ae,props:ae,attrs:ae,slots:ae,refs:ae,setupState:ae,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=$d.bind(null,i),t.ce&&t.ce(i),i}let ve=null;const Rf=()=>ve||ke;let Di,gn,Po="__VUE_INSTANCE_SETTERS__";(gn=Ws()[Po])||(gn=Ws()[Po]=[]),gn.push(t=>ve=t),Di=t=>{gn.length>1?gn.forEach(e=>e(t)):gn[0](t)};const Tn=t=>{Di(t),t.scope.on()},Qt=()=>{ve&&ve.scope.off(),Di(null)};function Kc(t){return t.vnode.shapeFlag&4}let er=!1;function Sf(t,e=!1){er=e;const{props:n,children:r}=t.vnode,s=Kc(t);lf(t,n,s,e),ff(t,r);const i=s?Cf(t,e):void 0;return er=!1,i}function Cf(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=Ci(new Proxy(t.ctx,ef));const{setup:r}=n;if(r){const s=t.setupContext=r.length>1?Pf(t):null;Tn(t),Pn();const i=Ot(r,t,0,[t.props,s]);if(On(),Qt(),Xa(i)){if(i.then(Qt,Qt),e)return i.then(o=>{Oo(t,o,e)}).catch(o=>{ns(o,t,0)});t.asyncDep=i}else Oo(t,i,e)}else qc(t,e)}function Oo(t,e,n){V(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:oe(e)&&(t.setupState=wc(e)),qc(t,n)}let ko;function qc(t,e,n){const r=t.type;if(!t.render){if(!e&&ko&&!r.render){const s=r.template||$i(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:c,compilerOptions:a}=r,l=ye(ye({isCustomElement:i,delimiters:c},o),a);r.render=ko(s,l)}}t.render=r.render||ze}Tn(t),Pn(),tf(t),On(),Qt()}function Af(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return Ae(t,"get","$attrs"),e[n]}}))}function Pf(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return Af(t)},slots:t.slots,emit:t.emit,expose:e}}function cs(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy(wc(Ci(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Vn)return Vn[n](t)},has(e,n){return n in e||n in Vn}}))}function Of(t,e=!0){return V(t)?t.displayName||t.name:t.name||e&&t.__name}function kf(t){return V(t)&&"__vccOpts"in t}const q=(t,e)=>Sd(t,e,er);function Gc(t,e,n){const r=arguments.length;return r===2?oe(e)&&!U(e)?ti(e)?pe(t,null,[e]):pe(t,e):pe(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&ti(n)&&(n=[n]),pe(t,e,n))}const $f=Symbol.for("v-scx"),xf=()=>$e($f),Nf="3.3.4",Df="http://www.w3.org/2000/svg",zt=typeof document<"u"?document:null,$o=zt&&zt.createElement("template"),Lf={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e?zt.createElementNS(Df,t):zt.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>zt.createTextNode(t),createComment:t=>zt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>zt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{$o.innerHTML=r?`<svg>${t}</svg>`:t;const c=$o.content;if(r){const a=c.firstChild;for(;a.firstChild;)c.appendChild(a.firstChild);c.removeChild(a)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function Mf(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function Uf(t,e,n){const r=t.style,s=me(n);if(n&&!s){if(e&&!me(e))for(const i in e)n[i]==null&&ni(r,i,"");for(const i in n)ni(r,i,n[i])}else{const i=r.display;s?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=i)}}const xo=/\s*!important$/;function ni(t,e,n){if(U(n))n.forEach(r=>ni(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Ff(t,e);xo.test(n)?t.setProperty(An(r),n.replace(xo,""),"important"):t[r]=n}}const No=["Webkit","Moz","ms"],bs={};function Ff(t,e){const n=bs[e];if(n)return n;let r=st(e);if(r!=="filter"&&r in t)return bs[e]=r;r=Qr(r);for(let s=0;s<No.length;s++){const i=No[s]+r;if(i in t)return bs[e]=i}return e}const Do="http://www.w3.org/1999/xlink";function jf(t,e,n,r,s){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(Do,e.slice(6,e.length)):t.setAttributeNS(Do,e,n);else{const i=zu(e);n==null||i&&!ec(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function Bf(t,e,n,r,s,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,s,i),t[e]=n??"";return}const c=t.tagName;if(e==="value"&&c!=="PROGRESS"&&!c.includes("-")){t._value=n;const l=c==="OPTION"?t.getAttribute("value"):t.value,u=n??"";l!==u&&(t.value=u),n==null&&t.removeAttribute(e);return}let a=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=ec(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(e)}function Kt(t,e,n,r){t.addEventListener(e,n,r)}function Vf(t,e,n,r){t.removeEventListener(e,n,r)}function Hf(t,e,n,r,s=null){const i=t._vei||(t._vei={}),o=i[e];if(r&&o)o.value=r;else{const[c,a]=Wf(e);if(r){const l=i[e]=qf(r,s);Kt(t,c,l,a)}else o&&(Vf(t,c,o,a),i[e]=void 0)}}const Lo=/(?:Once|Passive|Capture)$/;function Wf(t){let e;if(Lo.test(t)){e={};let r;for(;r=t.match(Lo);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):An(t.slice(2)),e]}let Is=0;const zf=Promise.resolve(),Kf=()=>Is||(zf.then(()=>Is=0),Is=Date.now());function qf(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Ke(Gf(r,n.value),e,5,[r])};return n.value=t,n.attached=Kf(),n}function Gf(t,e){if(U(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Mo=/^on[a-z]/,Jf=(t,e,n,r,s=!1,i,o,c,a)=>{e==="class"?Mf(t,r,s):e==="style"?Uf(t,n,r):Jr(e)?vi(e)||Hf(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Yf(t,e,r,s))?Bf(t,e,r,i,o,c,a):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),jf(t,e,r,s))};function Yf(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&Mo.test(e)&&V(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||Mo.test(e)&&me(n)?!1:e in t}const Mr=t=>{const e=t.props["onUpdate:modelValue"]||!1;return U(e)?n=>Er(e,n):e};function Xf(t){t.target.composing=!0}function Uo(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Es={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t._assign=Mr(s);const i=r||s.props&&s.props.type==="number";Kt(t,e?"change":"input",o=>{if(o.target.composing)return;let c=t.value;n&&(c=c.trim()),i&&(c=Hs(c)),t._assign(c)}),n&&Kt(t,"change",()=>{t.value=t.value.trim()}),e||(Kt(t,"compositionstart",Xf),Kt(t,"compositionend",Uo),Kt(t,"change",Uo))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:s}},i){if(t._assign=Mr(i),t.composing||document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===e||(s||t.type==="number")&&Hs(t.value)===e))return;const o=e??"";t.value!==o&&(t.value=o)}},Qf={deep:!0,created(t,e,n){t._assign=Mr(n),Kt(t,"change",()=>{const r=t._modelValue,s=Zf(t),i=t.checked,o=t._assign;if(U(r)){const c=tc(r,s),a=c!==-1;if(i&&!a)o(r.concat(s));else if(!i&&a){const l=[...r];l.splice(c,1),o(l)}}else if(Yr(r)){const c=new Set(r);i?c.add(s):c.delete(s),o(c)}else o(Jc(t,i))})},mounted:Fo,beforeUpdate(t,e,n){t._assign=Mr(n),Fo(t,e,n)}};function Fo(t,{value:e,oldValue:n},r){t._modelValue=e,U(e)?t.checked=tc(e,r.props.value)>-1:Yr(e)?t.checked=e.has(r.props.value):e!==n&&(t.checked=es(e,Jc(t,!0)))}function Zf(t){return"_value"in t?t._value:t.value}function Jc(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const eh=ye({patchProp:Jf},Lf);let jo;function th(){return jo||(jo=pf(eh))}const nh=(...t)=>{const e=th().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=rh(r);if(!s)return;const i=e._component;!V(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const o=n(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function rh(t){return me(t)?document.querySelector(t):t}var sh=!1;/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const ih=Symbol();var Bo;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Bo||(Bo={}));function oh(){const t=qu(!0),e=t.run(()=>W({}));let n=[],r=[];const s=Ci({install(i){s._a=i,i.provide(ih,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!sh?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}/**
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
 */const Yc=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ah=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],a=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(a&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Xc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,a=s+2<t.length,l=a?t[s+2]:0,u=i>>2,f=(i&3)<<4|c>>4;let p=(c&15)<<2|l>>6,m=l&63;a||(m=64,o||(p=64)),r.push(n[u],n[f],n[p],n[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Yc(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ah(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||l==null||f==null)throw new ch;const p=i<<2|c>>4;if(r.push(p),l!==64){const m=c<<4&240|l>>2;if(r.push(m),f!==64){const _=l<<6&192|f;r.push(_)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ch extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const lh=function(t){const e=Yc(t);return Xc.encodeByteArray(e,!0)},Qc=function(t){return lh(t).replace(/\./g,"")},Zc=function(t){try{return Xc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function uh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const dh=()=>uh().__FIREBASE_DEFAULTS__,fh=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},hh=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Zc(t[1]);return e&&JSON.parse(e)},Li=()=>{try{return dh()||fh()||hh()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ph=t=>{var e,n;return(n=(e=Li())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},el=()=>{var t;return(t=Li())===null||t===void 0?void 0:t.config},tl=t=>{var e;return(e=Li())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class gh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function Ee(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function mh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ee())}function nl(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function _h(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vh(){const t=Ee();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function rl(){try{return typeof indexedDB=="object"}catch{return!1}}function sl(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function yh(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const wh="FirebaseError";class ot extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=wh,Object.setPrototypeOf(this,ot.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ln.prototype.create)}}class ln{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?bh(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new ot(s,c,r)}}function bh(t,e){return t.replace(Ih,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ih=/\{\$([^}]+)}/g;function Eh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function tr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Vo(i)&&Vo(o)){if(!tr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Vo(t){return t!==null&&typeof t=="object"}/**
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
 */function ar(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function jn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Bn(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Th(t,e){const n=new Rh(t,e);return n.subscribe.bind(n)}class Rh{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Sh(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Ts),s.error===void 0&&(s.error=Ts),s.complete===void 0&&(s.complete=Ts);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Sh(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ts(){}/**
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
 */const Ch=1e3,Ah=2,Ph=4*60*60*1e3,Oh=.5;function Ho(t,e=Ch,n=Ah){const r=e*Math.pow(n,t),s=Math.round(Oh*r*(Math.random()-.5)*2);return Math.min(Ph,r+s)}/**
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
 */function Me(t){return t&&t._delegate?t._delegate:t}class it{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Ht="[DEFAULT]";/**
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
 */class kh{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new gh;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(xh(e))try{this.getOrInitializeService({instanceIdentifier:Ht})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Ht){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ht){return this.instances.has(e)}getOptions(e=Ht){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:$h(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ht){return this.component?this.component.multipleInstances?e:Ht:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $h(t){return t===Ht?void 0:t}function xh(t){return t.instantiationMode==="EAGER"}/**
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
 */class Nh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new kh(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const Dh={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},Lh=se.INFO,Mh={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},Uh=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Mh[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Mi{constructor(e){this.name=e,this._logLevel=Lh,this._logHandler=Uh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Dh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const Fh=(t,e)=>e.some(n=>t instanceof n);let Wo,zo;function jh(){return Wo||(Wo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bh(){return zo||(zo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const il=new WeakMap,ri=new WeakMap,ol=new WeakMap,Rs=new WeakMap,Ui=new WeakMap;function Vh(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n($t(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&il.set(n,t)}).catch(()=>{}),Ui.set(e,t),e}function Hh(t){if(ri.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ri.set(t,e)}let si={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ri.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ol.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $t(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Wh(t){si=t(si)}function zh(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ss(this),e,...n);return ol.set(r,e.sort?e.sort():[e]),$t(r)}:Bh().includes(t)?function(...e){return t.apply(Ss(this),e),$t(il.get(this))}:function(...e){return $t(t.apply(Ss(this),e))}}function Kh(t){return typeof t=="function"?zh(t):(t instanceof IDBTransaction&&Hh(t),Fh(t,jh())?new Proxy(t,si):t)}function $t(t){if(t instanceof IDBRequest)return Vh(t);if(Rs.has(t))return Rs.get(t);const e=Kh(t);return e!==t&&(Rs.set(t,e),Ui.set(e,t)),e}const Ss=t=>Ui.get(t);function qh(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=$t(o);return r&&o.addEventListener("upgradeneeded",a=>{r($t(o.result),a.oldVersion,a.newVersion,$t(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),c.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Gh=["get","getKey","getAll","getAllKeys","count"],Jh=["put","add","delete","clear"],Cs=new Map;function Ko(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Cs.get(e))return Cs.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Jh.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Gh.includes(n)))return;const i=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&a.done]))[0]};return Cs.set(e,i),i}Wh(t=>({...t,get:(e,n,r)=>Ko(e,n)||t.get(e,n,r),has:(e,n)=>!!Ko(e,n)||t.has(e,n)}));/**
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
 */class Yh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Xh(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Xh(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ii="@firebase/app",qo="0.9.19";/**
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
 */const nn=new Mi("@firebase/app"),Qh="@firebase/app-compat",Zh="@firebase/analytics-compat",ep="@firebase/analytics",tp="@firebase/app-check-compat",np="@firebase/app-check",rp="@firebase/auth",sp="@firebase/auth-compat",ip="@firebase/database",op="@firebase/database-compat",ap="@firebase/functions",cp="@firebase/functions-compat",lp="@firebase/installations",up="@firebase/installations-compat",dp="@firebase/messaging",fp="@firebase/messaging-compat",hp="@firebase/performance",pp="@firebase/performance-compat",gp="@firebase/remote-config",mp="@firebase/remote-config-compat",_p="@firebase/storage",vp="@firebase/storage-compat",yp="@firebase/firestore",wp="@firebase/firestore-compat",bp="firebase",Ip="10.4.0";/**
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
 */const oi="[DEFAULT]",Ep={[ii]:"fire-core",[Qh]:"fire-core-compat",[ep]:"fire-analytics",[Zh]:"fire-analytics-compat",[np]:"fire-app-check",[tp]:"fire-app-check-compat",[rp]:"fire-auth",[sp]:"fire-auth-compat",[ip]:"fire-rtdb",[op]:"fire-rtdb-compat",[ap]:"fire-fn",[cp]:"fire-fn-compat",[lp]:"fire-iid",[up]:"fire-iid-compat",[dp]:"fire-fcm",[fp]:"fire-fcm-compat",[hp]:"fire-perf",[pp]:"fire-perf-compat",[gp]:"fire-rc",[mp]:"fire-rc-compat",[_p]:"fire-gcs",[vp]:"fire-gcs-compat",[yp]:"fire-fst",[wp]:"fire-fst-compat","fire-js":"fire-js",[bp]:"fire-js-all"};/**
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
 */const Ur=new Map,ai=new Map;function Tp(t,e){try{t.container.addComponent(e)}catch(n){nn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function mt(t){const e=t.name;if(ai.has(e))return nn.debug(`There were multiple attempts to register component ${e}.`),!1;ai.set(e,t);for(const n of Ur.values())Tp(n,t);return!0}function kn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const Rp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},xt=new ln("app","Firebase",Rp);/**
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
 */class Sp{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new it("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xt.create("app-deleted",{appName:this._name})}}/**
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
 */const cr=Ip;function al(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:oi,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw xt.create("bad-app-name",{appName:String(s)});if(n||(n=el()),!n)throw xt.create("no-options");const i=Ur.get(s);if(i){if(tr(n,i.options)&&tr(r,i.config))return i;throw xt.create("duplicate-app",{appName:s})}const o=new Nh(s);for(const a of ai.values())o.addComponent(a);const c=new Sp(n,r,o);return Ur.set(s,c),c}function cl(t=oi){const e=Ur.get(t);if(!e&&t===oi&&el())return al();if(!e)throw xt.create("no-app",{appName:t});return e}function et(t,e,n){var r;let s=(r=Ep[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),nn.warn(c.join(" "));return}mt(new it(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Cp="firebase-heartbeat-database",Ap=1,nr="firebase-heartbeat-store";let As=null;function ll(){return As||(As=qh(Cp,Ap,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(nr)}}}).catch(t=>{throw xt.create("idb-open",{originalErrorMessage:t.message})})),As}async function Pp(t){try{return await(await ll()).transaction(nr).objectStore(nr).get(ul(t))}catch(e){if(e instanceof ot)nn.warn(e.message);else{const n=xt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});nn.warn(n.message)}}}async function Go(t,e){try{const r=(await ll()).transaction(nr,"readwrite");await r.objectStore(nr).put(e,ul(t)),await r.done}catch(n){if(n instanceof ot)nn.warn(n.message);else{const r=xt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});nn.warn(r.message)}}}function ul(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Op=1024,kp=30*24*60*60*1e3;class $p{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Np(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Jo();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=kp}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Jo(),{heartbeatsToSend:n,unsentEntries:r}=xp(this._heartbeatsCache.heartbeats),s=Qc(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function Jo(){return new Date().toISOString().substring(0,10)}function xp(t,e=Op){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Yo(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Yo(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Np{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return rl()?sl().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Pp(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Go(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Go(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Yo(t){return Qc(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Dp(t){mt(new it("platform-logger",e=>new Yh(e),"PRIVATE")),mt(new it("heartbeat",e=>new $p(e),"PRIVATE")),et(ii,qo,t),et(ii,qo,"esm2017"),et("fire-js","")}Dp("");var Lp="firebase",Mp="10.4.0";/**
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
 */et(Lp,Mp,"app");const Up=(t,e)=>e.some(n=>t instanceof n);let Xo,Qo;function Fp(){return Xo||(Xo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jp(){return Qo||(Qo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const dl=new WeakMap,ci=new WeakMap,fl=new WeakMap,Ps=new WeakMap,Fi=new WeakMap;function Bp(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Nt(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&dl.set(n,t)}).catch(()=>{}),Fi.set(e,t),e}function Vp(t){if(ci.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ci.set(t,e)}let li={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ci.get(t);if(e==="objectStoreNames")return t.objectStoreNames||fl.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Nt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Hp(t){li=t(li)}function Wp(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Os(this),e,...n);return fl.set(r,e.sort?e.sort():[e]),Nt(r)}:jp().includes(t)?function(...e){return t.apply(Os(this),e),Nt(dl.get(this))}:function(...e){return Nt(t.apply(Os(this),e))}}function zp(t){return typeof t=="function"?Wp(t):(t instanceof IDBTransaction&&Vp(t),Up(t,Fp())?new Proxy(t,li):t)}function Nt(t){if(t instanceof IDBRequest)return Bp(t);if(Ps.has(t))return Ps.get(t);const e=zp(t);return e!==t&&(Ps.set(t,e),Fi.set(e,t)),e}const Os=t=>Fi.get(t);function Kp(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=Nt(o);return r&&o.addEventListener("upgradeneeded",a=>{r(Nt(o.result),a.oldVersion,a.newVersion,Nt(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),c.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",()=>s())}).catch(()=>{}),c}const qp=["get","getKey","getAll","getAllKeys","count"],Gp=["put","add","delete","clear"],ks=new Map;function Zo(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ks.get(e))return ks.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Gp.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||qp.includes(n)))return;const i=async function(o,...c){const a=this.transaction(o,s?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&a.done]))[0]};return ks.set(e,i),i}Hp(t=>({...t,get:(e,n,r)=>Zo(e,n)||t.get(e,n,r),has:(e,n)=>!!Zo(e,n)||t.has(e,n)}));const hl="@firebase/installations",ji="0.6.4";/**
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
 */const pl=1e4,gl=`w:${ji}`,ml="FIS_v2",Jp="https://firebaseinstallations.googleapis.com/v1",Yp=60*60*1e3,Xp="installations",Qp="Installations";/**
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
 */const Zp={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},rn=new ln(Xp,Qp,Zp);function _l(t){return t instanceof ot&&t.code.includes("request-failed")}/**
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
 */function vl({projectId:t}){return`${Jp}/projects/${t}/installations`}function yl(t){return{token:t.token,requestStatus:2,expiresIn:tg(t.expiresIn),creationTime:Date.now()}}async function wl(t,e){const r=(await e.json()).error;return rn.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function bl({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function eg(t,{refreshToken:e}){const n=bl(t);return n.append("Authorization",ng(e)),n}async function Il(t){const e=await t();return e.status>=500&&e.status<600?t():e}function tg(t){return Number(t.replace("s","000"))}function ng(t){return`${ml} ${t}`}/**
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
 */async function rg({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=vl(t),s=bl(t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:ml,appId:t.appId,sdkVersion:gl},c={method:"POST",headers:s,body:JSON.stringify(o)},a=await Il(()=>fetch(r,c));if(a.ok){const l=await a.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:yl(l.authToken)}}else throw await wl("Create Installation",a)}/**
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
 */function El(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function sg(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const ig=/^[cdef][\w-]{21}$/,ui="";function og(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=ag(t);return ig.test(n)?n:ui}catch{return ui}}function ag(t){return sg(t).substr(0,22)}/**
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
 */function ls(t){return`${t.appName}!${t.appId}`}/**
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
 */const Tl=new Map;function Rl(t,e){const n=ls(t);Sl(n,e),cg(n,e)}function Sl(t,e){const n=Tl.get(t);if(n)for(const r of n)r(e)}function cg(t,e){const n=lg();n&&n.postMessage({key:t,fid:e}),ug()}let Gt=null;function lg(){return!Gt&&"BroadcastChannel"in self&&(Gt=new BroadcastChannel("[Firebase] FID Change"),Gt.onmessage=t=>{Sl(t.data.key,t.data.fid)}),Gt}function ug(){Tl.size===0&&Gt&&(Gt.close(),Gt=null)}/**
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
 */const dg="firebase-installations-database",fg=1,sn="firebase-installations-store";let $s=null;function Bi(){return $s||($s=Kp(dg,fg,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(sn)}}})),$s}async function Fr(t,e){const n=ls(t),s=(await Bi()).transaction(sn,"readwrite"),i=s.objectStore(sn),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Rl(t,e.fid),e}async function Cl(t){const e=ls(t),r=(await Bi()).transaction(sn,"readwrite");await r.objectStore(sn).delete(e),await r.done}async function us(t,e){const n=ls(t),s=(await Bi()).transaction(sn,"readwrite"),i=s.objectStore(sn),o=await i.get(n),c=e(o);return c===void 0?await i.delete(n):await i.put(c,n),await s.done,c&&(!o||o.fid!==c.fid)&&Rl(t,c.fid),c}/**
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
 */async function Vi(t){let e;const n=await us(t.appConfig,r=>{const s=hg(r),i=pg(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===ui?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function hg(t){const e=t||{fid:og(),registrationStatus:0};return Al(e)}function pg(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(rn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=gg(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:mg(t)}:{installationEntry:e}}async function gg(t,e){try{const n=await rg(t,e);return Fr(t.appConfig,n)}catch(n){throw _l(n)&&n.customData.serverCode===409?await Cl(t.appConfig):await Fr(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function mg(t){let e=await ea(t.appConfig);for(;e.registrationStatus===1;)await El(100),e=await ea(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Vi(t);return r||n}return e}function ea(t){return us(t,e=>{if(!e)throw rn.create("installation-not-found");return Al(e)})}function Al(t){return _g(t)?{fid:t.fid,registrationStatus:0}:t}function _g(t){return t.registrationStatus===1&&t.registrationTime+pl<Date.now()}/**
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
 */async function vg({appConfig:t,heartbeatServiceProvider:e},n){const r=yg(t,n),s=eg(t,n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:gl,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},a=await Il(()=>fetch(r,c));if(a.ok){const l=await a.json();return yl(l)}else throw await wl("Generate Auth Token",a)}function yg(t,{fid:e}){return`${vl(t)}/${e}/authTokens:generate`}/**
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
 */async function Hi(t,e=!1){let n;const r=await us(t.appConfig,i=>{if(!Pl(i))throw rn.create("not-registered");const o=i.authToken;if(!e&&Ig(o))return i;if(o.requestStatus===1)return n=wg(t,e),i;{if(!navigator.onLine)throw rn.create("app-offline");const c=Tg(i);return n=bg(t,c),c}});return n?await n:r.authToken}async function wg(t,e){let n=await ta(t.appConfig);for(;n.authToken.requestStatus===1;)await El(100),n=await ta(t.appConfig);const r=n.authToken;return r.requestStatus===0?Hi(t,e):r}function ta(t){return us(t,e=>{if(!Pl(e))throw rn.create("not-registered");const n=e.authToken;return Rg(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function bg(t,e){try{const n=await vg(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Fr(t.appConfig,r),n}catch(n){if(_l(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Cl(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Fr(t.appConfig,r)}throw n}}function Pl(t){return t!==void 0&&t.registrationStatus===2}function Ig(t){return t.requestStatus===2&&!Eg(t)}function Eg(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Yp}function Tg(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Rg(t){return t.requestStatus===1&&t.requestTime+pl<Date.now()}/**
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
 */async function Sg(t){const e=t,{installationEntry:n,registrationPromise:r}=await Vi(e);return r?r.catch(console.error):Hi(e).catch(console.error),n.fid}/**
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
 */async function Cg(t,e=!1){const n=t;return await Ag(n),(await Hi(n,e)).token}async function Ag(t){const{registrationPromise:e}=await Vi(t);e&&await e}/**
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
 */function Pg(t){if(!t||!t.options)throw xs("App Configuration");if(!t.name)throw xs("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw xs(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function xs(t){return rn.create("missing-app-config-values",{valueName:t})}/**
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
 */const Ol="installations",Og="installations-internal",kg=t=>{const e=t.getProvider("app").getImmediate(),n=Pg(e),r=kn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},$g=t=>{const e=t.getProvider("app").getImmediate(),n=kn(e,Ol).getImmediate();return{getId:()=>Sg(n),getToken:s=>Cg(n,s)}};function xg(){mt(new it(Ol,kg,"PUBLIC")),mt(new it(Og,$g,"PRIVATE"))}xg();et(hl,ji);et(hl,ji,"esm2017");/**
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
 */const jr="analytics",Ng="firebase_id",Dg="origin",Lg=60*1e3,Mg="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Wi="https://www.googletagmanager.com/gtag/js";/**
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
 */const Ce=new Mi("@firebase/analytics");/**
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
 */const Ug={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},xe=new ln("analytics","Analytics",Ug);/**
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
 */function Fg(t){if(!t.startsWith(Wi)){const e=xe.create("invalid-gtag-resource",{gtagURL:t});return Ce.warn(e.message),""}return t}function kl(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function jg(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function Bg(t,e){const n=jg("firebase-js-sdk-policy",{createScriptURL:Fg}),r=document.createElement("script"),s=`${Wi}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Vg(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Hg(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const a=(await kl(n)).find(l=>l.measurementId===s);a&&await e[a.appId]}}catch(c){Ce.error(c)}t("config",s,i)}async function Wg(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const c=await kl(n);for(const a of o){const l=c.find(f=>f.measurementId===a),u=l&&e[l.appId];if(u)i.push(u);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){Ce.error(i)}}function zg(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[c,a]=o;await Wg(t,e,n,c,a)}else if(i==="config"){const[c,a]=o;await Hg(t,e,n,r,c,a)}else if(i==="consent"){const[c]=o;t("consent","update",c)}else if(i==="get"){const[c,a,l]=o;t("get",c,a,l)}else if(i==="set"){const[c]=o;t("set",c)}else t(i,...o)}catch(c){Ce.error(c)}}return s}function Kg(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=zg(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function qg(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Wi)&&n.src.includes(t))return n;return null}/**
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
 */const Gg=30,Jg=1e3;class Yg{constructor(e={},n=Jg){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const $l=new Yg;function Xg(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Qg(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:Xg(r)},i=Mg.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let c="";try{const a=await o.json();!((e=a.error)===null||e===void 0)&&e.message&&(c=a.error.message)}catch{}throw xe.create("config-fetch-failed",{httpStatus:o.status,responseMessage:c})}return o.json()}async function Zg(t,e=$l,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw xe.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw xe.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new nm;return setTimeout(async()=>{c.abort()},n!==void 0?n:Lg),xl({appId:r,apiKey:s,measurementId:i},o,c,e)}async function xl(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=$l){var i;const{appId:o,measurementId:c}=t;try{await em(r,e)}catch(a){if(c)return Ce.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${a==null?void 0:a.message}]`),{appId:o,measurementId:c};throw a}try{const a=await Qg(t);return s.deleteThrottleMetadata(o),a}catch(a){const l=a;if(!tm(l)){if(s.deleteThrottleMetadata(o),c)return Ce.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:c};throw a}const u=Number((i=l==null?void 0:l.customData)===null||i===void 0?void 0:i.httpStatus)===503?Ho(n,s.intervalMillis,Gg):Ho(n,s.intervalMillis),f={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return s.setThrottleMetadata(o,f),Ce.debug(`Calling attemptFetch again in ${u} millis`),xl(t,f,r,s)}}function em(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(xe.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function tm(t){if(!(t instanceof ot)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class nm{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function rm(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
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
 */async function sm(){if(rl())try{await sl()}catch(t){return Ce.warn(xe.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Ce.warn(xe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function im(t,e,n,r,s,i,o){var c;const a=Zg(t);a.then(m=>{n[m.measurementId]=m.appId,t.options.measurementId&&m.measurementId!==t.options.measurementId&&Ce.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>Ce.error(m)),e.push(a);const l=sm().then(m=>{if(m)return r.getId()}),[u,f]=await Promise.all([a,l]);qg(i)||Bg(i,u.measurementId),s("js",new Date);const p=(c=o==null?void 0:o.config)!==null&&c!==void 0?c:{};return p[Dg]="firebase",p.update=!0,f!=null&&(p[Ng]=f),s("config",u.measurementId,p),u.measurementId}/**
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
 */class om{constructor(e){this.app=e}_delete(){return delete Wn[this.app.options.appId],Promise.resolve()}}let Wn={},na=[];const ra={};let Ns="dataLayer",am="gtag",sa,Nl,ia=!1;function cm(){const t=[];if(nl()&&t.push("This is a browser extension environment."),yh()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=xe.create("invalid-analytics-context",{errorInfo:e});Ce.warn(n.message)}}function lm(t,e,n){cm();const r=t.options.appId;if(!r)throw xe.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Ce.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw xe.create("no-api-key");if(Wn[r]!=null)throw xe.create("already-exists",{id:r});if(!ia){Vg(Ns);const{wrappedGtag:i,gtagCore:o}=Kg(Wn,na,ra,Ns,am);Nl=i,sa=o,ia=!0}return Wn[r]=im(t,na,ra,e,sa,Ns,n),new om(t)}function um(t=cl()){t=Me(t);const e=kn(t,jr);return e.isInitialized()?e.getImmediate():dm(t)}function dm(t,e={}){const n=kn(t,jr);if(n.isInitialized()){const s=n.getImmediate();if(tr(e,n.getOptions()))return s;throw xe.create("already-initialized")}return n.initialize({options:e})}function fm(t,e,n,r){t=Me(t),rm(Nl,Wn[t.app.options.appId],e,n,r).catch(s=>Ce.error(s))}const oa="@firebase/analytics",aa="0.10.0";function hm(){mt(new it(jr,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return lm(r,s,n)},"PUBLIC")),mt(new it("analytics-internal",t,"PRIVATE")),et(oa,aa),et(oa,aa,"esm2017");function t(e){try{const n=e.getProvider(jr).getImmediate();return{logEvent:(r,s,i)=>fm(n,r,s,i)}}catch(n){throw xe.create("interop-component-reg-failed",{reason:n})}}}hm();/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const mn=typeof window<"u";function pm(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const ne=Object.assign;function Ds(t,e){const n={};for(const r in e){const s=e[r];n[r]=qe(s)?s.map(t):t(s)}return n}const zn=()=>{},qe=Array.isArray,gm=/\/$/,mm=t=>t.replace(gm,"");function Ls(t,e,n="/"){let r,s={},i="",o="";const c=e.indexOf("#");let a=e.indexOf("?");return c<a&&c>=0&&(a=-1),a>-1&&(r=e.slice(0,a),i=e.slice(a+1,c>-1?c:e.length),s=t(i)),c>-1&&(r=r||e.slice(0,c),o=e.slice(c,e.length)),r=wm(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:o}}function _m(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ca(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function vm(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&Rn(e.matched[r],n.matched[s])&&Dl(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Rn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Dl(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!ym(t[n],e[n]))return!1;return!0}function ym(t,e){return qe(t)?la(t,e):qe(e)?la(e,t):t===e}function la(t,e){return qe(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function wm(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,c;for(o=0;o<r.length;o++)if(c=r[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var rr;(function(t){t.pop="pop",t.push="push"})(rr||(rr={}));var Kn;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Kn||(Kn={}));function bm(t){if(!t)if(mn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),mm(t)}const Im=/^[^#]+#/;function Em(t,e){return t.replace(Im,"#")+e}function Tm(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const ds=()=>({left:window.pageXOffset,top:window.pageYOffset});function Rm(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=Tm(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function ua(t,e){return(history.state?history.state.position-e:-1)+t}const di=new Map;function Sm(t,e){di.set(t,e)}function Cm(t){const e=di.get(t);return di.delete(t),e}let Am=()=>location.protocol+"//"+location.host;function Ll(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let c=s.includes(t.slice(i))?t.slice(i).length:1,a=s.slice(c);return a[0]!=="/"&&(a="/"+a),ca(a,"")}return ca(n,t)+r+s}function Pm(t,e,n,r){let s=[],i=[],o=null;const c=({state:p})=>{const m=Ll(t,location),_=n.value,y=e.value;let T=0;if(p){if(n.value=m,e.value=p,o&&o===_){o=null;return}T=y?p.position-y.position:0}else r(m);s.forEach(S=>{S(n.value,_,{delta:T,type:rr.pop,direction:T?T>0?Kn.forward:Kn.back:Kn.unknown})})};function a(){o=n.value}function l(p){s.push(p);const m=()=>{const _=s.indexOf(p);_>-1&&s.splice(_,1)};return i.push(m),m}function u(){const{history:p}=window;p.state&&p.replaceState(ne({},p.state,{scroll:ds()}),"")}function f(){for(const p of i)p();i=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:l,destroy:f}}function da(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?ds():null}}function Om(t){const{history:e,location:n}=window,r={value:Ll(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(a,l,u){const f=t.indexOf("#"),p=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+a:Am()+t+a;try{e[u?"replaceState":"pushState"](l,"",p),s.value=l}catch(m){console.error(m),n[u?"replace":"assign"](p)}}function o(a,l){const u=ne({},e.state,da(s.value.back,a,s.value.forward,!0),l,{position:s.value.position});i(a,u,!0),r.value=a}function c(a,l){const u=ne({},s.value,e.state,{forward:a,scroll:ds()});i(u.current,u,!0);const f=ne({},da(r.value,a,null),{position:u.position+1},l);i(a,f,!1),r.value=a}return{location:r,state:s,push:c,replace:o}}function km(t){t=bm(t);const e=Om(t),n=Pm(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=ne({location:"",base:t,go:r,createHref:Em.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function $m(t){return typeof t=="string"||t&&typeof t=="object"}function Ml(t){return typeof t=="string"||typeof t=="symbol"}const wt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Ul=Symbol("");var fa;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(fa||(fa={}));function Sn(t,e){return ne(new Error,{type:t,[Ul]:!0},e)}function ct(t,e){return t instanceof Error&&Ul in t&&(e==null||!!(t.type&e))}const ha="[^/]+?",xm={sensitive:!1,strict:!1,start:!0,end:!0},Nm=/[.+*?^${}()[\]/\\]/g;function Dm(t,e){const n=ne({},xm,e),r=[];let s=n.start?"^":"";const i=[];for(const l of t){const u=l.length?[]:[90];n.strict&&!l.length&&(s+="/");for(let f=0;f<l.length;f++){const p=l[f];let m=40+(n.sensitive?.25:0);if(p.type===0)f||(s+="/"),s+=p.value.replace(Nm,"\\$&"),m+=40;else if(p.type===1){const{value:_,repeatable:y,optional:T,regexp:S}=p;i.push({name:_,repeatable:y,optional:T});const x=S||ha;if(x!==ha){m+=10;try{new RegExp(`(${x})`)}catch(O){throw new Error(`Invalid custom RegExp for param "${_}" (${x}): `+O.message)}}let H=y?`((?:${x})(?:/(?:${x}))*)`:`(${x})`;f||(H=T&&l.length<2?`(?:/${H})`:"/"+H),T&&(H+="?"),s+=H,m+=20,T&&(m+=-8),y&&(m+=-20),x===".*"&&(m+=-50)}u.push(m)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function c(l){const u=l.match(o),f={};if(!u)return null;for(let p=1;p<u.length;p++){const m=u[p]||"",_=i[p-1];f[_.name]=m&&_.repeatable?m.split("/"):m}return f}function a(l){let u="",f=!1;for(const p of t){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const m of p)if(m.type===0)u+=m.value;else if(m.type===1){const{value:_,repeatable:y,optional:T}=m,S=_ in l?l[_]:"";if(qe(S)&&!y)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const x=qe(S)?S.join("/"):S;if(!x)if(T)p.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${_}"`);u+=x}}return u||"/"}return{re:o,score:r,keys:i,parse:c,stringify:a}}function Lm(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function Mm(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=Lm(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(pa(r))return 1;if(pa(s))return-1}return s.length-r.length}function pa(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Um={type:0,value:""},Fm=/[a-zA-Z0-9_]/;function jm(t){if(!t)return[[]];if(t==="/")return[[Um]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${l}": ${m}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let c=0,a,l="",u="";function f(){l&&(n===0?i.push({type:0,value:l}):n===1||n===2||n===3?(i.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:l,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),l="")}function p(){l+=a}for(;c<t.length;){if(a=t[c++],a==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:a==="/"?(l&&f(),o()):a===":"?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:a==="("?n=2:Fm.test(a)?p():(f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:f(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),s}function Bm(t,e,n){const r=Dm(jm(t.path),n),s=ne(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function Vm(t,e){const n=[],r=new Map;e=_a({strict:!1,end:!0,sensitive:!1},e);function s(u){return r.get(u)}function i(u,f,p){const m=!p,_=Hm(u);_.aliasOf=p&&p.record;const y=_a(e,u),T=[_];if("alias"in u){const H=typeof u.alias=="string"?[u.alias]:u.alias;for(const O of H)T.push(ne({},_,{components:p?p.record.components:_.components,path:O,aliasOf:p?p.record:_}))}let S,x;for(const H of T){const{path:O}=H;if(f&&O[0]!=="/"){const B=f.record.path,z=B[B.length-1]==="/"?"":"/";H.path=f.record.path+(O&&z+O)}if(S=Bm(H,f,y),p?p.alias.push(S):(x=x||S,x!==S&&x.alias.push(S),m&&u.name&&!ma(S)&&o(u.name)),_.children){const B=_.children;for(let z=0;z<B.length;z++)i(B[z],S,p&&p.children[z])}p=p||S,(S.record.components&&Object.keys(S.record.components).length||S.record.name||S.record.redirect)&&a(S)}return x?()=>{o(x)}:zn}function o(u){if(Ml(u)){const f=r.get(u);f&&(r.delete(u),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(u);f>-1&&(n.splice(f,1),u.record.name&&r.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function c(){return n}function a(u){let f=0;for(;f<n.length&&Mm(u,n[f])>=0&&(u.record.path!==n[f].record.path||!Fl(u,n[f]));)f++;n.splice(f,0,u),u.record.name&&!ma(u)&&r.set(u.record.name,u)}function l(u,f){let p,m={},_,y;if("name"in u&&u.name){if(p=r.get(u.name),!p)throw Sn(1,{location:u});y=p.record.name,m=ne(ga(f.params,p.keys.filter(x=>!x.optional).map(x=>x.name)),u.params&&ga(u.params,p.keys.map(x=>x.name))),_=p.stringify(m)}else if("path"in u)_=u.path,p=n.find(x=>x.re.test(_)),p&&(m=p.parse(_),y=p.record.name);else{if(p=f.name?r.get(f.name):n.find(x=>x.re.test(f.path)),!p)throw Sn(1,{location:u,currentLocation:f});y=p.record.name,m=ne({},f.params,u.params),_=p.stringify(m)}const T=[];let S=p;for(;S;)T.unshift(S.record),S=S.parent;return{name:y,path:_,params:m,matched:T,meta:zm(T)}}return t.forEach(u=>i(u)),{addRoute:i,resolve:l,removeRoute:o,getRoutes:c,getRecordMatcher:s}}function ga(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Hm(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:Wm(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function Wm(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function ma(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function zm(t){return t.reduce((e,n)=>ne(e,n.meta),{})}function _a(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function Fl(t,e){return e.children.some(n=>n===t||Fl(t,n))}const jl=/#/g,Km=/&/g,qm=/\//g,Gm=/=/g,Jm=/\?/g,Bl=/\+/g,Ym=/%5B/g,Xm=/%5D/g,Vl=/%5E/g,Qm=/%60/g,Hl=/%7B/g,Zm=/%7C/g,Wl=/%7D/g,e_=/%20/g;function zi(t){return encodeURI(""+t).replace(Zm,"|").replace(Ym,"[").replace(Xm,"]")}function t_(t){return zi(t).replace(Hl,"{").replace(Wl,"}").replace(Vl,"^")}function fi(t){return zi(t).replace(Bl,"%2B").replace(e_,"+").replace(jl,"%23").replace(Km,"%26").replace(Qm,"`").replace(Hl,"{").replace(Wl,"}").replace(Vl,"^")}function n_(t){return fi(t).replace(Gm,"%3D")}function r_(t){return zi(t).replace(jl,"%23").replace(Jm,"%3F")}function s_(t){return t==null?"":r_(t).replace(qm,"%2F")}function Br(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function i_(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(Bl," "),o=i.indexOf("="),c=Br(o<0?i:i.slice(0,o)),a=o<0?null:Br(i.slice(o+1));if(c in e){let l=e[c];qe(l)||(l=e[c]=[l]),l.push(a)}else e[c]=a}return e}function va(t){let e="";for(let n in t){const r=t[n];if(n=n_(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(qe(r)?r.map(i=>i&&fi(i)):[r&&fi(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function o_(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=qe(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const a_=Symbol(""),ya=Symbol(""),fs=Symbol(""),zl=Symbol(""),hi=Symbol("");function Dn(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Et(t,e,n,r,s){const i=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((o,c)=>{const a=f=>{f===!1?c(Sn(4,{from:n,to:e})):f instanceof Error?c(f):$m(f)?c(Sn(2,{from:e,to:f})):(i&&r.enterCallbacks[s]===i&&typeof f=="function"&&i.push(f),o())},l=t.call(r&&r.instances[s],e,n,a);let u=Promise.resolve(l);t.length<3&&(u=u.then(a)),u.catch(f=>c(f))})}function Ms(t,e,n,r){const s=[];for(const i of t)for(const o in i.components){let c=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(c_(c)){const l=(c.__vccOpts||c)[e];l&&s.push(Et(l,n,r,i,o))}else{let a=c();s.push(()=>a.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const u=pm(l)?l.default:l;i.components[o]=u;const p=(u.__vccOpts||u)[e];return p&&Et(p,n,r,i,o)()}))}}return s}function c_(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function wa(t){const e=$e(fs),n=$e(zl),r=q(()=>e.resolve(M(t.to))),s=q(()=>{const{matched:a}=r.value,{length:l}=a,u=a[l-1],f=n.matched;if(!u||!f.length)return-1;const p=f.findIndex(Rn.bind(null,u));if(p>-1)return p;const m=ba(a[l-2]);return l>1&&ba(u)===m&&f[f.length-1].path!==m?f.findIndex(Rn.bind(null,a[l-2])):p}),i=q(()=>s.value>-1&&d_(n.params,r.value.params)),o=q(()=>s.value>-1&&s.value===n.matched.length-1&&Dl(n.params,r.value.params));function c(a={}){return u_(a)?e[M(t.replace)?"replace":"push"](M(t.to)).catch(zn):Promise.resolve()}return{route:r,href:q(()=>r.value.href),isActive:i,isExactActive:o,navigate:c}}const l_=Ge({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:wa,setup(t,{slots:e}){const n=gt(wa(t)),{options:r}=$e(fs),s=q(()=>({[Ia(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Ia(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:Gc("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),Kl=l_;function u_(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function d_(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!qe(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function ba(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Ia=(t,e,n)=>t??e??n,f_=Ge({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=$e(hi),s=q(()=>t.route||r.value),i=$e(ya,0),o=q(()=>{let l=M(i);const{matched:u}=s.value;let f;for(;(f=u[l])&&!f.components;)l++;return l}),c=q(()=>s.value.matched[o.value]);kt(ya,q(()=>o.value+1)),kt(a_,c),kt(hi,s);const a=W();return Ze(()=>[a.value,c.value,t.name],([l,u,f],[p,m,_])=>{u&&(u.instances[f]=l,m&&m!==u&&l&&l===p&&(u.leaveGuards.size||(u.leaveGuards=m.leaveGuards),u.updateGuards.size||(u.updateGuards=m.updateGuards))),l&&u&&(!m||!Rn(u,m)||!p)&&(u.enterCallbacks[f]||[]).forEach(y=>y(l))},{flush:"post"}),()=>{const l=s.value,u=t.name,f=c.value,p=f&&f.components[u];if(!p)return Ea(n.default,{Component:p,route:l});const m=f.props[u],_=m?m===!0?l.params:typeof m=="function"?m(l):m:null,T=Gc(p,ne({},_,e,{onVnodeUnmounted:S=>{S.component.isUnmounted&&(f.instances[u]=null)},ref:a}));return Ea(n.default,{Component:T,route:l})||T}}});function Ea(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const ql=f_;function h_(t){const e=Vm(t.routes,t),n=t.parseQuery||i_,r=t.stringifyQuery||va,s=t.history,i=Dn(),o=Dn(),c=Dn(),a=Id(wt);let l=wt;mn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Ds.bind(null,w=>""+w),f=Ds.bind(null,s_),p=Ds.bind(null,Br);function m(w,k){let A,N;return Ml(w)?(A=e.getRecordMatcher(w),N=k):N=w,e.addRoute(N,A)}function _(w){const k=e.getRecordMatcher(w);k&&e.removeRoute(k)}function y(){return e.getRoutes().map(w=>w.record)}function T(w){return!!e.getRecordMatcher(w)}function S(w,k){if(k=ne({},k||a.value),typeof w=="string"){const g=Ls(n,w,k.path),v=e.resolve({path:g.path},k),b=s.createHref(g.fullPath);return ne(g,v,{params:p(v.params),hash:Br(g.hash),redirectedFrom:void 0,href:b})}let A;if("path"in w)A=ne({},w,{path:Ls(n,w.path,k.path).path});else{const g=ne({},w.params);for(const v in g)g[v]==null&&delete g[v];A=ne({},w,{params:f(g)}),k.params=f(k.params)}const N=e.resolve(A,k),ee=w.hash||"";N.params=u(p(N.params));const d=_m(r,ne({},w,{hash:t_(ee),path:N.path})),h=s.createHref(d);return ne({fullPath:d,hash:ee,query:r===va?o_(w.query):w.query||{}},N,{redirectedFrom:void 0,href:h})}function x(w){return typeof w=="string"?Ls(n,w,a.value.path):ne({},w)}function H(w,k){if(l!==w)return Sn(8,{from:k,to:w})}function O(w){return Q(w)}function B(w){return O(ne(x(w),{replace:!0}))}function z(w){const k=w.matched[w.matched.length-1];if(k&&k.redirect){const{redirect:A}=k;let N=typeof A=="function"?A(w):A;return typeof N=="string"&&(N=N.includes("?")||N.includes("#")?N=x(N):{path:N},N.params={}),ne({query:w.query,hash:w.hash,params:"path"in N?{}:w.params},N)}}function Q(w,k){const A=l=S(w),N=a.value,ee=w.state,d=w.force,h=w.replace===!0,g=z(A);if(g)return Q(ne(x(g),{state:typeof g=="object"?ne({},ee,g.state):ee,force:d,replace:h}),k||A);const v=A;v.redirectedFrom=k;let b;return!d&&vm(r,N,A)&&(b=Sn(16,{to:v,from:N}),_e(N,N,!0,!1)),(b?Promise.resolve(b):Re(v,N)).catch(I=>ct(I)?ct(I,2)?I:Z(I):Y(I,v,N)).then(I=>{if(I){if(ct(I,2))return Q(ne({replace:h},x(I.to),{state:typeof I.to=="object"?ne({},ee,I.to.state):ee,force:d}),k||v)}else I=Ue(v,N,!0,h,ee);return Ne(v,N,I),I})}function de(w,k){const A=H(w,k);return A?Promise.reject(A):Promise.resolve()}function le(w){const k=hn.values().next().value;return k&&typeof k.runWithContext=="function"?k.runWithContext(w):w()}function Re(w,k){let A;const[N,ee,d]=p_(w,k);A=Ms(N.reverse(),"beforeRouteLeave",w,k);for(const g of N)g.leaveGuards.forEach(v=>{A.push(Et(v,w,k))});const h=de.bind(null,w,k);return A.push(h),we(A).then(()=>{A=[];for(const g of i.list())A.push(Et(g,w,k));return A.push(h),we(A)}).then(()=>{A=Ms(ee,"beforeRouteUpdate",w,k);for(const g of ee)g.updateGuards.forEach(v=>{A.push(Et(v,w,k))});return A.push(h),we(A)}).then(()=>{A=[];for(const g of d)if(g.beforeEnter)if(qe(g.beforeEnter))for(const v of g.beforeEnter)A.push(Et(v,w,k));else A.push(Et(g.beforeEnter,w,k));return A.push(h),we(A)}).then(()=>(w.matched.forEach(g=>g.enterCallbacks={}),A=Ms(d,"beforeRouteEnter",w,k),A.push(h),we(A))).then(()=>{A=[];for(const g of o.list())A.push(Et(g,w,k));return A.push(h),we(A)}).catch(g=>ct(g,8)?g:Promise.reject(g))}function Ne(w,k,A){c.list().forEach(N=>le(()=>N(w,k,A)))}function Ue(w,k,A,N,ee){const d=H(w,k);if(d)return d;const h=k===wt,g=mn?history.state:{};A&&(N||h?s.replace(w.fullPath,ne({scroll:h&&g&&g.scroll},ee)):s.push(w.fullPath,ee)),a.value=w,_e(w,k,A,h),Z()}let De;function jt(){De||(De=s.listen((w,k,A)=>{if(!hr.listening)return;const N=S(w),ee=z(N);if(ee){Q(ne(ee,{replace:!0}),N).catch(zn);return}l=N;const d=a.value;mn&&Sm(ua(d.fullPath,A.delta),ds()),Re(N,d).catch(h=>ct(h,12)?h:ct(h,2)?(Q(h.to,N).then(g=>{ct(g,20)&&!A.delta&&A.type===rr.pop&&s.go(-1,!1)}).catch(zn),Promise.reject()):(A.delta&&s.go(-A.delta,!1),Y(h,N,d))).then(h=>{h=h||Ue(N,d,!1),h&&(A.delta&&!ct(h,8)?s.go(-A.delta,!1):A.type===rr.pop&&ct(h,20)&&s.go(-1,!1)),Ne(N,d,h)}).catch(zn)}))}let at=Dn(),fe=Dn(),te;function Y(w,k,A){Z(w);const N=fe.list();return N.length?N.forEach(ee=>ee(w,k,A)):console.error(w),Promise.reject(w)}function Fe(){return te&&a.value!==wt?Promise.resolve():new Promise((w,k)=>{at.add([w,k])})}function Z(w){return te||(te=!w,jt(),at.list().forEach(([k,A])=>w?A(w):k()),at.reset()),w}function _e(w,k,A,N){const{scrollBehavior:ee}=t;if(!mn||!ee)return Promise.resolve();const d=!A&&Cm(ua(w.fullPath,0))||(N||!A)&&history.state&&history.state.scroll||null;return xr().then(()=>ee(w,k,d)).then(h=>h&&Rm(h)).catch(h=>Y(h,w,k))}const ce=w=>s.go(w);let fn;const hn=new Set,hr={currentRoute:a,listening:!0,addRoute:m,removeRoute:_,hasRoute:T,getRoutes:y,resolve:S,options:t,push:O,replace:B,go:ce,back:()=>ce(-1),forward:()=>ce(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:fe.add,isReady:Fe,install(w){const k=this;w.component("RouterLink",Kl),w.component("RouterView",ql),w.config.globalProperties.$router=k,Object.defineProperty(w.config.globalProperties,"$route",{enumerable:!0,get:()=>M(a)}),mn&&!fn&&a.value===wt&&(fn=!0,O(s.location).catch(ee=>{}));const A={};for(const ee in wt)Object.defineProperty(A,ee,{get:()=>a.value[ee],enumerable:!0});w.provide(fs,k),w.provide(zl,pc(A)),w.provide(hi,a);const N=w.unmount;hn.add(w),w.unmount=function(){hn.delete(w),hn.size<1&&(l=wt,De&&De(),De=null,a.value=wt,fn=!1,te=!1),N()}}};function we(w){return w.reduce((k,A)=>k.then(()=>le(A)),Promise.resolve())}return hr}function p_(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(l=>Rn(l,c))?r.push(c):n.push(c));const a=t.matched[o];a&&(e.matched.find(l=>Rn(l,a))||s.push(a))}return[n,r,s]}function Ki(){return $e(fs)}const g_=Ge({__name:"App",setup(t){return(e,n)=>(ue(),Rt(M(ql)))}}),m_="modulepreload",__=function(t){return"/vue-project/"+t},Ta={},Ln=function(e,n,r){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=__(i),i in Ta)return;Ta[i]=!0;const o=i.endsWith(".css"),c=o?'[rel="stylesheet"]':"";if(!!r)for(let u=s.length-1;u>=0;u--){const f=s[u];if(f.href===i&&(!o||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${c}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":m_,o||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),o)return new Promise((u,f)=>{l.addEventListener("load",u),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})};function qi(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Ra(t){return t!==void 0&&t.enterprise!==void 0}class v_{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}function Gl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const y_=Gl,Jl=new ln("auth","Firebase",Gl());/**
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
 */const Vr=new Mi("@firebase/auth");function w_(t,...e){Vr.logLevel<=se.WARN&&Vr.warn(`Auth (${cr}): ${t}`,...e)}function Sr(t,...e){Vr.logLevel<=se.ERROR&&Vr.error(`Auth (${cr}): ${t}`,...e)}/**
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
 */function Le(t,...e){throw Gi(t,...e)}function tt(t,...e){return Gi(t,...e)}function Yl(t,e,n){const r=Object.assign(Object.assign({},y_()),{[e]:n});return new ln("auth","Firebase",r).create(e,{appName:t.name})}function b_(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&Le(t,"argument-error"),Yl(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Gi(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Jl.create(t,...e)}function F(t,e,...n){if(!t)throw Gi(e,...n)}function ft(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Sr(e),new Error(e)}function _t(t,e){t||ft(e)}/**
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
 */function pi(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function I_(){return Sa()==="http:"||Sa()==="https:"}function Sa(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function E_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(I_()||nl()||"connection"in navigator)?navigator.onLine:!0}function T_(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class lr{constructor(e,n){this.shortDelay=e,this.longDelay=n,_t(n>e,"Short delay should be less than long delay!"),this.isMobile=mh()||_h()}get(){return E_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ji(t,e){_t(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Xl{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;ft("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;ft("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;ft("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const R_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const S_=new lr(3e4,6e4);function un(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Lt(t,e,n,r,s={}){return Ql(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=ar(Object.assign({key:t.config.apiKey},o)).slice(1),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode),Xl.fetch()(Zl(t,t.config.apiHost,n,c),Object.assign({method:e,headers:a,referrerPolicy:"no-referrer"},i))})}async function Ql(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},R_),e);try{const s=new C_(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw br(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[a,l]=c.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw br(t,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw br(t,"email-already-in-use",o);if(a==="USER_DISABLED")throw br(t,"user-disabled",o);const u=r[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Yl(t,u,l);Le(t,u)}}catch(s){if(s instanceof ot)throw s;Le(t,"network-request-failed",{message:String(s)})}}async function ur(t,e,n,r,s={}){const i=await Lt(t,e,n,r,s);return"mfaPendingCredential"in i&&Le(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Zl(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Ji(t.config,s):`${t.config.apiScheme}://${s}`}class C_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(tt(this.auth,"network-request-failed")),S_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function br(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=tt(t,e,r);return s.customData._tokenResponse=n,s}async function A_(t,e){return Lt(t,"GET","/v2/recaptchaConfig",un(t,e))}/**
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
 */async function P_(t,e){return Lt(t,"POST","/v1/accounts:delete",e)}async function O_(t,e){return Lt(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function qn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function k_(t,e=!1){const n=Me(t),r=await n.getIdToken(e),s=Yi(r);F(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:qn(Us(s.auth_time)),issuedAtTime:qn(Us(s.iat)),expirationTime:qn(Us(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Us(t){return Number(t)*1e3}function Yi(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Sr("JWT malformed, contained fewer than 3 sections"),null;try{const s=Zc(n);return s?JSON.parse(s):(Sr("Failed to decode base64 JWT payload"),null)}catch(s){return Sr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function $_(t){const e=Yi(t);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Cn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ot&&x_(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function x_({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class N_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class eu{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=qn(this.lastLoginAt),this.creationTime=qn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Hr(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Cn(t,O_(n,{idToken:r}));F(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?M_(i.providerUserInfo):[],c=L_(t.providerData,o),a=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),u=a?l:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new eu(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,f)}async function D_(t){const e=Me(t);await Hr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function L_(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function M_(t){return t.map(e=>{var{providerId:n}=e,r=qi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function U_(t,e){const n=await Ql(t,{},async()=>{const r=ar({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Zl(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Xl.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class sr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$_(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return F(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await U_(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new sr;return r&&(F(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(F(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(F(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new sr,this.toJSON())}_performRefresh(){return ft("not implemented")}}/**
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
 */function bt(t,e){F(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Zt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=qi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new N_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new eu(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Cn(this,this.stsTokenManager.getToken(this.auth,e));return F(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return k_(this,e)}reload(){return D_(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Zt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Hr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Cn(this,P_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,c,a,l,u;const f=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(s=n.email)!==null&&s!==void 0?s:void 0,m=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,_=(o=n.photoURL)!==null&&o!==void 0?o:void 0,y=(c=n.tenantId)!==null&&c!==void 0?c:void 0,T=(a=n._redirectEventId)!==null&&a!==void 0?a:void 0,S=(l=n.createdAt)!==null&&l!==void 0?l:void 0,x=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:H,emailVerified:O,isAnonymous:B,providerData:z,stsTokenManager:Q}=n;F(H&&Q,e,"internal-error");const de=sr.fromJSON(this.name,Q);F(typeof H=="string",e,"internal-error"),bt(f,e.name),bt(p,e.name),F(typeof O=="boolean",e,"internal-error"),F(typeof B=="boolean",e,"internal-error"),bt(m,e.name),bt(_,e.name),bt(y,e.name),bt(T,e.name),bt(S,e.name),bt(x,e.name);const le=new Zt({uid:H,auth:e,email:p,emailVerified:O,displayName:f,isAnonymous:B,photoURL:_,phoneNumber:m,tenantId:y,stsTokenManager:de,createdAt:S,lastLoginAt:x});return z&&Array.isArray(z)&&(le.providerData=z.map(Re=>Object.assign({},Re))),T&&(le._redirectEventId=T),le}static async _fromIdTokenResponse(e,n,r=!1){const s=new sr;s.updateFromServerResponse(n);const i=new Zt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Hr(i),i}}/**
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
 */const Ca=new Map;function ht(t){_t(t instanceof Function,"Expected a class definition");let e=Ca.get(t);return e?(_t(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ca.set(t,e),e)}/**
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
 */class tu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}tu.type="NONE";const Aa=tu;/**
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
 */function Cr(t,e,n){return`firebase:${t}:${e}:${n}`}class bn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Cr(this.userKey,s.apiKey,i),this.fullPersistenceKey=Cr("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Zt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new bn(ht(Aa),e,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||ht(Aa);const o=Cr(r,e.config.apiKey,e.name);let c=null;for(const l of n)try{const u=await l._get(o);if(u){const f=Zt._fromJSON(e,u);l!==i&&(c=f),i=l;break}}catch{}const a=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!a.length?new bn(i,e,r):(i=a[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new bn(i,e,r))}}/**
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
 */function Pa(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(su(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ou(e))return"Blackberry";if(au(e))return"Webos";if(Xi(e))return"Safari";if((e.includes("chrome/")||ru(e))&&!e.includes("edge/"))return"Chrome";if(iu(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function nu(t=Ee()){return/firefox\//i.test(t)}function Xi(t=Ee()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ru(t=Ee()){return/crios\//i.test(t)}function su(t=Ee()){return/iemobile/i.test(t)}function iu(t=Ee()){return/android/i.test(t)}function ou(t=Ee()){return/blackberry/i.test(t)}function au(t=Ee()){return/webos/i.test(t)}function hs(t=Ee()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function F_(t=Ee()){var e;return hs(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function j_(){return vh()&&document.documentMode===10}function cu(t=Ee()){return hs(t)||iu(t)||au(t)||ou(t)||/windows phone/i.test(t)||su(t)}function B_(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function lu(t,e=[]){let n;switch(t){case"Browser":n=Pa(Ee());break;case"Worker":n=`${Pa(Ee())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${cr}/${r}`}/**
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
 */class V_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const a=e(i);o(a)}catch(a){c(a)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function H_(t,e={}){return Lt(t,"GET","/v2/passwordPolicy",un(t,e))}/**
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
 */const W_=6;class z_{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:W_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,c;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=(n=a.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),a.isValid&&(a.isValid=(r=a.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),a.isValid&&(a.isValid=(s=a.containsLowercaseLetter)!==null&&s!==void 0?s:!0),a.isValid&&(a.isValid=(i=a.containsUppercaseLetter)!==null&&i!==void 0?i:!0),a.isValid&&(a.isValid=(o=a.containsNumericCharacter)!==null&&o!==void 0?o:!0),a.isValid&&(a.isValid=(c=a.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),a}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class K_{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Oa(this),this.idTokenSubscription=new Oa(this),this.beforeStateQueue=new V_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Jl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ht(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await bn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===c)&&(a!=null&&a.user)&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Hr(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=T_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?Me(e):null;return n&&F(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(ht(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await H_(this),n=new z_(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ln("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ht(e)||this._popupRedirectResolver;F(n,this,"argument-error"),this.redirectPersistenceManager=await bn.create(this,[ht(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const a=e.addObserver(n,r,s);return()=>{o=!0,a()}}else{const a=e.addObserver(n);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=lu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&w_(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Mt(t){return Me(t)}class Oa{constructor(e){this.auth=e,this.observer=null,this.addObserver=Th(n=>this.observer=n)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */function q_(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function uu(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=tt("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",q_().appendChild(r)})}function G_(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const J_="https://www.google.com/recaptcha/enterprise.js?render=",Y_="recaptcha-enterprise",X_="NO_RECAPTCHA";class Q_{constructor(e){this.type=Y_,this.auth=Mt(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{A_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(a=>{if(a.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new v_(a);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(a=>{c(a)})})}function s(i,o,c){const a=window.grecaptcha;Ra(a)?a.enterprise.ready(()=>{a.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(X_)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(c=>{if(!n&&Ra(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}uu(J_+c).then(()=>{s(c,i,o)}).catch(a=>{o(a)})}}).catch(c=>{o(c)})})}}async function Wr(t,e,n,r=!1){const s=new Q_(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */function Z_(t,e){const n=kn(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(tr(i,e??{}))return s;Le(s,"already-initialized")}return n.initialize({options:e})}function ev(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ht);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function tv(t,e,n){const r=Mt(t);F(r._canInitEmulator,r,"emulator-config-failed"),F(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=du(e),{host:o,port:c}=nv(e),a=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${a}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||rv()}function du(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function nv(t){const e=du(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:ka(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:ka(o)}}}function ka(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function rv(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Qi{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ft("not implemented")}_getIdTokenResponse(e){return ft("not implemented")}_linkToIdToken(e,n){return ft("not implemented")}_getReauthenticationResolver(e){return ft("not implemented")}}async function sv(t,e){return Lt(t,"POST","/v1/accounts:update",e)}/**
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
 */async function Fs(t,e){return ur(t,"POST","/v1/accounts:signInWithPassword",un(t,e))}/**
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
 */async function iv(t,e){return ur(t,"POST","/v1/accounts:signInWithEmailLink",un(t,e))}async function ov(t,e){return ur(t,"POST","/v1/accounts:signInWithEmailLink",un(t,e))}/**
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
 */class ir extends Qi{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new ir(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new ir(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const r={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const s=await Wr(e,r,"signInWithPassword");return Fs(e,s)}else return Fs(e,r).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const i=await Wr(e,r,"signInWithPassword");return Fs(e,i)}else return Promise.reject(s)});case"emailLink":return iv(e,{email:this._email,oobCode:this._password});default:Le(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return sv(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return ov(e,{idToken:n,email:this._email,oobCode:this._password});default:Le(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function In(t,e){return ur(t,"POST","/v1/accounts:signInWithIdp",un(t,e))}/**
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
 */const av="http://localhost";class on extends Qi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new on(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Le("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=qi(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new on(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return In(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,In(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,In(e,n)}buildRequest(){const e={requestUri:av,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ar(n)}return e}}/**
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
 */function cv(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function lv(t){const e=jn(Bn(t)).link,n=e?jn(Bn(e)).deep_link_id:null,r=jn(Bn(t)).deep_link_id;return(r?jn(Bn(r)).link:null)||r||n||e||t}class Zi{constructor(e){var n,r,s,i,o,c;const a=jn(Bn(e)),l=(n=a.apiKey)!==null&&n!==void 0?n:null,u=(r=a.oobCode)!==null&&r!==void 0?r:null,f=cv((s=a.mode)!==null&&s!==void 0?s:null);F(l&&u&&f,"argument-error"),this.apiKey=l,this.operation=f,this.code=u,this.continueUrl=(i=a.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=a.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=a.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=lv(e);try{return new Zi(n)}catch{return null}}}/**
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
 */class $n{constructor(){this.providerId=$n.PROVIDER_ID}static credential(e,n){return ir._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Zi.parseLink(n);return F(r,"argument-error"),ir._fromEmailAndCode(e,r.code,r.tenantId)}}$n.PROVIDER_ID="password";$n.EMAIL_PASSWORD_SIGN_IN_METHOD="password";$n.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class eo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class dr extends eo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class St extends dr{constructor(){super("facebook.com")}static credential(e){return on._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.FACEBOOK_SIGN_IN_METHOD="facebook.com";St.PROVIDER_ID="facebook.com";/**
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
 */class dt extends dr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return on._fromParams({providerId:dt.PROVIDER_ID,signInMethod:dt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return dt.credentialFromTaggedObject(e)}static credentialFromError(e){return dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return dt.credential(n,r)}catch{return null}}}dt.GOOGLE_SIGN_IN_METHOD="google.com";dt.PROVIDER_ID="google.com";/**
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
 */class Ct extends dr{constructor(){super("github.com")}static credential(e){return on._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.GITHUB_SIGN_IN_METHOD="github.com";Ct.PROVIDER_ID="github.com";/**
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
 */class At extends dr{constructor(){super("twitter.com")}static credential(e,n){return on._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return At.credential(n,r)}catch{return null}}}At.TWITTER_SIGN_IN_METHOD="twitter.com";At.PROVIDER_ID="twitter.com";/**
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
 */async function js(t,e){return ur(t,"POST","/v1/accounts:signUp",un(t,e))}/**
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
 */class an{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Zt._fromIdTokenResponse(e,r,s),o=$a(r);return new an({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=$a(r);return new an({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function $a(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class zr extends ot{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,zr.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new zr(e,n,r,s)}}function fu(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?zr._fromErrorAndOperation(t,i,e,r):i})}async function uv(t,e,n=!1){const r=await Cn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return an._forOperation(t,"link",r)}/**
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
 */async function dv(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await Cn(t,fu(r,s,e,t),n);F(i.idToken,r,"internal-error");const o=Yi(i.idToken);F(o,r,"internal-error");const{sub:c}=o;return F(t.uid===c,r,"user-mismatch"),an._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Le(r,"user-mismatch"),i}}/**
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
 */async function hu(t,e,n=!1){const r="signIn",s=await fu(t,r,e),i=await an._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function fv(t,e){return hu(Mt(t),e)}/**
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
 */async function pu(t){const e=Mt(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function hv(t,e,n){var r;const s=Mt(t),i={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((r=s._getRecaptchaConfig())===null||r===void 0)&&r.emailPasswordEnabled){const l=await Wr(s,i,"signUpPassword");o=js(s,l)}else o=js(s,i).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const u=await Wr(s,i,"signUpPassword");return js(s,u)}throw l});const c=await o.catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&pu(t),l}),a=await an._fromIdTokenResponse(s,"signIn",c);return await s._updateCurrentUser(a.user),a}function pv(t,e,n){return fv(Me(t),$n.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&pu(t),r})}/**
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
 */async function gv(t,e){return Lt(t,"POST","/v1/accounts:update",e)}/**
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
 */async function mv(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Me(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Cn(r,gv(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:a})=>a==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function _v(t,e,n,r){return Me(t).onIdTokenChanged(e,n,r)}function vv(t,e,n){return Me(t).beforeAuthStateChanged(e,n)}function Ut(t,e,n,r){return Me(t).onAuthStateChanged(e,n,r)}function yv(t){return Me(t).signOut()}const Kr="__sak";/**
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
 */class gu{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Kr,"1"),this.storage.removeItem(Kr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function wv(){const t=Ee();return Xi(t)||hs(t)}const bv=1e3,Iv=10;class mu extends gu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=wv()&&B_(),this.fallbackToPolling=cu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,a)=>{this.notifyListeners(o,a)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);j_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Iv):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},bv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}mu.type="LOCAL";const Ev=mu;/**
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
 */class _u extends gu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}_u.type="SESSION";const vu=_u;/**
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
 */function Tv(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class ps{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ps(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(n.origin,i)),a=await Tv(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:a})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ps.receivers=[];/**
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
 */function to(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Rv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,a)=>{const l=to("",20);s.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){const p=f;if(p.data.eventId===l)switch(p.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(p.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function nt(){return window}function Sv(t){nt().location.href=t}/**
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
 */function yu(){return typeof nt().WorkerGlobalScope<"u"&&typeof nt().importScripts=="function"}async function Cv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Av(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Pv(){return yu()?self:null}/**
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
 */const wu="firebaseLocalStorageDb",Ov=1,qr="firebaseLocalStorage",bu="fbase_key";class fr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function gs(t,e){return t.transaction([qr],e?"readwrite":"readonly").objectStore(qr)}function kv(){const t=indexedDB.deleteDatabase(wu);return new fr(t).toPromise()}function gi(){const t=indexedDB.open(wu,Ov);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(qr,{keyPath:bu})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(qr)?e(r):(r.close(),await kv(),e(await gi()))})})}async function xa(t,e,n){const r=gs(t,!0).put({[bu]:e,value:n});return new fr(r).toPromise()}async function $v(t,e){const n=gs(t,!1).get(e),r=await new fr(n).toPromise();return r===void 0?null:r.value}function Na(t,e){const n=gs(t,!0).delete(e);return new fr(n).toPromise()}const xv=800,Nv=3;class Iu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await gi(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Nv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return yu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ps._getInstance(Pv()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Cv(),!this.activeServiceWorker)return;this.sender=new Rv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Av()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await gi();return await xa(e,Kr,"1"),await Na(e,Kr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>xa(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>$v(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Na(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=gs(s,!1).getAll();return new fr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),xv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Iu.type="LOCAL";const Dv=Iu;new lr(3e4,6e4);/**
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
 */function Eu(t,e){return e?ht(e):(F(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class no extends Qi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return In(e,this._buildIdpRequest())}_linkToIdToken(e,n){return In(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return In(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Lv(t){return hu(t.auth,new no(t),t.bypassAuthState)}function Mv(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),dv(n,new no(t),t.bypassAuthState)}async function Uv(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),uv(n,new no(t),t.bypassAuthState)}/**
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
 */class Tu{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(a))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Lv;case"linkViaPopup":case"linkViaRedirect":return Uv;case"reauthViaPopup":case"reauthViaRedirect":return Mv;default:Le(this.auth,"internal-error")}}resolve(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Fv=new lr(2e3,1e4);async function jv(t,e,n){const r=Mt(t);b_(t,e,eo);const s=Eu(r,n);return new Jt(r,"signInViaPopup",e,s).executeNotNull()}class Jt extends Tu{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Jt.currentPopupAction&&Jt.currentPopupAction.cancel(),Jt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){_t(this.filter.length===1,"Popup operations only handle one event");const e=to();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Jt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Fv.get())};e()}}Jt.currentPopupAction=null;/**
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
 */const Bv="pendingRedirect",Ar=new Map;class Vv extends Tu{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ar.get(this.auth._key());if(!e){try{const r=await Hv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ar.set(this.auth._key(),e)}return this.bypassAuthState||Ar.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Hv(t,e){const n=Kv(e),r=zv(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Wv(t,e){Ar.set(t._key(),e)}function zv(t){return ht(t._redirectPersistence)}function Kv(t){return Cr(Bv,t.config.apiKey,t.name)}async function qv(t,e,n=!1){const r=Mt(t),s=Eu(r,e),o=await new Vv(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const Gv=10*60*1e3;class Jv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Yv(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Ru(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(tt(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Gv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Da(e))}saveEventToCache(e){this.cachedEventUids.add(Da(e)),this.lastProcessedEventTime=Date.now()}}function Da(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Ru({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Yv(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ru(t);default:return!1}}/**
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
 */async function Xv(t,e={}){return Lt(t,"GET","/v1/projects",e)}/**
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
 */const Qv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Zv=/^https?/;async function ey(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Xv(t);for(const n of e)try{if(ty(n))return}catch{}Le(t,"unauthorized-domain")}function ty(t){const e=pi(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Zv.test(n))return!1;if(Qv.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const ny=new lr(3e4,6e4);function La(){const t=nt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function ry(t){return new Promise((e,n)=>{var r,s,i;function o(){La(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{La(),n(tt(t,"network-request-failed"))},timeout:ny.get()})}if(!((s=(r=nt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=nt().gapi)===null||i===void 0)&&i.load)o();else{const c=G_("iframefcb");return nt()[c]=()=>{gapi.load?o():n(tt(t,"network-request-failed"))},uu(`https://apis.google.com/js/api.js?onload=${c}`).catch(a=>n(a))}}).catch(e=>{throw Pr=null,e})}let Pr=null;function sy(t){return Pr=Pr||ry(t),Pr}/**
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
 */const iy=new lr(5e3,15e3),oy="__/auth/iframe",ay="emulator/auth/iframe",cy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ly=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function uy(t){const e=t.config;F(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ji(e,ay):`https://${t.config.authDomain}/${oy}`,r={apiKey:e.apiKey,appName:t.name,v:cr},s=ly.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ar(r).slice(1)}`}async function dy(t){const e=await sy(t),n=nt().gapi;return F(n,t,"internal-error"),e.open({where:document.body,url:uy(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:cy,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=tt(t,"network-request-failed"),c=nt().setTimeout(()=>{i(o)},iy.get());function a(){nt().clearTimeout(c),s(r)}r.ping(a).then(a,()=>{i(o)})}))}/**
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
 */const fy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},hy=500,py=600,gy="_blank",my="http://localhost";class Ma{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function _y(t,e,n,r=hy,s=py){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const a=Object.assign(Object.assign({},fy),{width:r.toString(),height:s.toString(),top:i,left:o}),l=Ee().toLowerCase();n&&(c=ru(l)?gy:n),nu(l)&&(e=e||my,a.scrollbars="yes");const u=Object.entries(a).reduce((p,[m,_])=>`${p}${m}=${_},`,"");if(F_(l)&&c!=="_self")return vy(e||"",c),new Ma(null);const f=window.open(e||"",c,u);F(f,t,"popup-blocked");try{f.focus()}catch{}return new Ma(f)}function vy(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const yy="__/auth/handler",wy="emulator/auth/handler",by=encodeURIComponent("fac");async function Ua(t,e,n,r,s,i){F(t.config.authDomain,t,"auth-domain-config-required"),F(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:cr,eventId:s};if(e instanceof eo){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Eh(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,f]of Object.entries(i||{}))o[u]=f}if(e instanceof dr){const u=e.getScopes().filter(f=>f!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const u of Object.keys(c))c[u]===void 0&&delete c[u];const a=await t._getAppCheckToken(),l=a?`#${by}=${encodeURIComponent(a)}`:"";return`${Iy(t)}?${ar(c).slice(1)}${l}`}function Iy({config:t}){return t.emulator?Ji(t,wy):`https://${t.authDomain}/${yy}`}/**
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
 */const Bs="webStorageSupport";class Ey{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=vu,this._completeRedirectFn=qv,this._overrideRedirectResult=Wv}async _openPopup(e,n,r,s){var i;_t((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Ua(e,n,r,pi(),s);return _y(e,o,to())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Ua(e,n,r,pi(),s);return Sv(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(_t(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await dy(e),r=new Jv(e);return n.register("authEvent",s=>(F(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Bs,{type:Bs},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Bs];o!==void 0&&n(!!o),Le(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=ey(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return cu()||Xi()||hs()}}const Ty=Ey;var Fa="@firebase/auth",ja="1.3.0";/**
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
 */class Ry{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Sy(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Cy(t){mt(new it("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const a={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:lu(t)},l=new K_(r,s,i,a);return ev(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),mt(new it("auth-internal",e=>{const n=Mt(e.getProvider("auth").getImmediate());return(r=>new Ry(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),et(Fa,ja,Sy(t)),et(Fa,ja,"esm2017")}/**
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
 */const Ay=5*60,Py=tl("authIdTokenMaxAge")||Ay;let Ba=null;const Oy=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Py)return;const s=n==null?void 0:n.token;Ba!==s&&(Ba=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function rt(t=cl()){const e=kn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Z_(t,{popupRedirectResolver:Ty,persistence:[Dv,Ev,vu]}),r=tl("authTokenSyncURL");if(r){const i=Oy(r);vv(n,i,()=>i(n.currentUser)),_v(n,o=>i(o))}const s=ph("auth");return s&&tv(n,`http://${s}`),n}Cy("Browser");function Va(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,r)}return n}function Tt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Va(Object(n),!0).forEach(function(r){ky(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Va(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function ky(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Ha(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return Object.keys(t).reduce((n,r)=>(e.includes(r)||(n[r]=M(t[r])),n),{})}function Gr(t){return typeof t=="function"}function $y(t){return Xt(t)||en(t)}function Su(t,e,n){let r=t;const s=e.split(".");for(let i=0;i<s.length;i++){if(!r[s[i]])return n;r=r[s[i]]}return r}function Vs(t,e,n){return q(()=>t.some(r=>Su(e,r,{[n]:!1})[n]))}function Wa(t,e,n){return q(()=>t.reduce((r,s)=>{const i=Su(e,s,{[n]:!1})[n]||[];return r.concat(i)},[]))}function Cu(t,e,n,r){return t.call(r,M(e),M(n),r)}function Au(t){return t.$valid!==void 0?!t.$valid:!t}function xy(t,e,n,r,s,i,o){let{$lazy:c,$rewardEarly:a}=s,l=arguments.length>7&&arguments[7]!==void 0?arguments[7]:[],u=arguments.length>8?arguments[8]:void 0,f=arguments.length>9?arguments[9]:void 0,p=arguments.length>10?arguments[10]:void 0;const m=W(!!r.value),_=W(0);n.value=!1;const y=Ze([e,r].concat(l,p),()=>{if(c&&!r.value||a&&!f.value&&!n.value)return;let T;try{T=Cu(t,e,u,o)}catch(S){T=Promise.reject(S)}_.value++,n.value=!!_.value,m.value=!1,Promise.resolve(T).then(S=>{_.value--,n.value=!!_.value,i.value=S,m.value=Au(S)}).catch(S=>{_.value--,n.value=!!_.value,i.value=S,m.value=!0})},{immediate:!0,deep:typeof e=="object"});return{$invalid:m,$unwatch:y}}function Ny(t,e,n,r,s,i,o,c){let{$lazy:a,$rewardEarly:l}=r;const u=()=>({}),f=q(()=>{if(a&&!n.value||l&&!c.value)return!1;let p=!0;try{const m=Cu(t,e,o,i);s.value=m,p=Au(m)}catch(m){s.value=m}return p});return{$unwatch:u,$invalid:f}}function Dy(t,e,n,r,s,i,o,c,a,l,u){const f=W(!1),p=t.$params||{},m=W(null);let _,y;t.$async?{$invalid:_,$unwatch:y}=xy(t.$validator,e,f,n,r,m,s,t.$watchTargets,a,l,u):{$invalid:_,$unwatch:y}=Ny(t.$validator,e,n,r,m,s,a,l);const T=t.$message;return{$message:Gr(T)?q(()=>T(Ha({$pending:f,$invalid:_,$params:Ha(p),$model:e,$response:m,$validator:i,$propertyPath:c,$property:o}))):T||"",$params:p,$pending:f,$invalid:_,$response:m,$unwatch:y}}function Ly(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const e=M(t),n=Object.keys(e),r={},s={},i={};let o=null;return n.forEach(c=>{const a=e[c];switch(!0){case Gr(a.$validator):r[c]=a;break;case Gr(a):r[c]={$validator:a};break;case c==="$validationGroups":o=a;break;case c.startsWith("$"):i[c]=a;break;default:s[c]=a}}),{rules:r,nestedValidators:s,config:i,validationGroups:o}}const My="__root";function Uy(t,e,n,r,s,i,o,c,a){const l=Object.keys(t),u=r.get(s,t),f=W(!1),p=W(!1),m=W(0);if(u){if(!u.$partial)return u;u.$unwatch(),f.value=u.$dirty.value}const _={$dirty:f,$path:s,$touch:()=>{f.value||(f.value=!0)},$reset:()=>{f.value&&(f.value=!1)},$commit:()=>{}};return l.length?(l.forEach(y=>{_[y]=Dy(t[y],e,_.$dirty,i,o,y,n,s,a,p,m)}),_.$externalResults=q(()=>c.value?[].concat(c.value).map((y,T)=>({$propertyPath:s,$property:n,$validator:"$externalResults",$uid:`${s}-externalResult-${T}`,$message:y,$params:{},$response:null,$pending:!1})):[]),_.$invalid=q(()=>{const y=l.some(T=>M(_[T].$invalid));return p.value=y,!!_.$externalResults.value.length||y}),_.$pending=q(()=>l.some(y=>M(_[y].$pending))),_.$error=q(()=>_.$dirty.value?_.$pending.value||_.$invalid.value:!1),_.$silentErrors=q(()=>l.filter(y=>M(_[y].$invalid)).map(y=>{const T=_[y];return gt({$propertyPath:s,$property:n,$validator:y,$uid:`${s}-${y}`,$message:T.$message,$params:T.$params,$response:T.$response,$pending:T.$pending})}).concat(_.$externalResults.value)),_.$errors=q(()=>_.$dirty.value?_.$silentErrors.value:[]),_.$unwatch=()=>l.forEach(y=>{_[y].$unwatch()}),_.$commit=()=>{p.value=!0,m.value=Date.now()},r.set(s,t,_),_):(u&&r.set(s,t,_),_)}function Fy(t,e,n,r,s,i,o){const c=Object.keys(t);return c.length?c.reduce((a,l)=>(a[l]=mi({validations:t[l],state:e,key:l,parentKey:n,resultsCache:r,globalConfig:s,instance:i,externalResults:o}),a),{}):{}}function jy(t,e,n){const r=q(()=>[e,n].filter(_=>_).reduce((_,y)=>_.concat(Object.values(M(y))),[])),s=q({get(){return t.$dirty.value||(r.value.length?r.value.every(_=>_.$dirty):!1)},set(_){t.$dirty.value=_}}),i=q(()=>{const _=M(t.$silentErrors)||[],y=r.value.filter(T=>(M(T).$silentErrors||[]).length).reduce((T,S)=>T.concat(...S.$silentErrors),[]);return _.concat(y)}),o=q(()=>{const _=M(t.$errors)||[],y=r.value.filter(T=>(M(T).$errors||[]).length).reduce((T,S)=>T.concat(...S.$errors),[]);return _.concat(y)}),c=q(()=>r.value.some(_=>_.$invalid)||M(t.$invalid)||!1),a=q(()=>r.value.some(_=>M(_.$pending))||M(t.$pending)||!1),l=q(()=>r.value.some(_=>_.$dirty)||r.value.some(_=>_.$anyDirty)||s.value),u=q(()=>s.value?a.value||c.value:!1),f=()=>{t.$touch(),r.value.forEach(_=>{_.$touch()})},p=()=>{t.$commit(),r.value.forEach(_=>{_.$commit()})},m=()=>{t.$reset(),r.value.forEach(_=>{_.$reset()})};return r.value.length&&r.value.every(_=>_.$dirty)&&f(),{$dirty:s,$errors:o,$invalid:c,$anyDirty:l,$error:u,$pending:a,$touch:f,$reset:m,$silentErrors:i,$commit:p}}function mi(t){let{validations:e,state:n,key:r,parentKey:s,childResults:i,resultsCache:o,globalConfig:c={},instance:a,externalResults:l}=t;const u=s?`${s}.${r}`:r,{rules:f,nestedValidators:p,config:m,validationGroups:_}=Ly(e),y=Tt(Tt({},c),m),T=r?q(()=>{const Z=M(n);return Z?M(Z[r]):void 0}):n,S=Tt({},M(l)||{}),x=q(()=>{const Z=M(l);return r?Z?M(Z[r]):void 0:Z}),H=Uy(f,T,r,o,u,y,a,x,n),O=Fy(p,T,u,o,y,a,x),B={};_&&Object.entries(_).forEach(Z=>{let[_e,ce]=Z;B[_e]={$invalid:Vs(ce,O,"$invalid"),$error:Vs(ce,O,"$error"),$pending:Vs(ce,O,"$pending"),$errors:Wa(ce,O,"$errors"),$silentErrors:Wa(ce,O,"$silentErrors")}});const{$dirty:z,$errors:Q,$invalid:de,$anyDirty:le,$error:Re,$pending:Ne,$touch:Ue,$reset:De,$silentErrors:jt,$commit:at}=jy(H,O,i),fe=r?q({get:()=>M(T),set:Z=>{z.value=!0;const _e=M(n),ce=M(l);ce&&(ce[r]=S[r]),ge(_e[r])?_e[r].value=Z:_e[r]=Z}}):null;r&&y.$autoDirty&&Ze(T,()=>{z.value||Ue();const Z=M(l);Z&&(Z[r]=S[r])},{flush:"sync"});async function te(){return Ue(),y.$rewardEarly&&(at(),await xr()),await xr(),new Promise(Z=>{if(!Ne.value)return Z(!de.value);const _e=Ze(Ne,()=>{Z(!de.value),_e()})})}function Y(Z){return(i.value||{})[Z]}function Fe(){ge(l)?l.value=S:Object.keys(S).length===0?Object.keys(l).forEach(Z=>{delete l[Z]}):Object.assign(l,S)}return gt(Tt(Tt(Tt({},H),{},{$model:fe,$dirty:z,$error:Re,$errors:Q,$invalid:de,$anyDirty:le,$pending:Ne,$touch:Ue,$reset:De,$path:u||My,$silentErrors:jt,$validate:te,$commit:at},i&&{$getResultsForChild:Y,$clearExternalResults:Fe,$validationGroups:B}),O))}class By{constructor(){this.storage=new Map}set(e,n,r){this.storage.set(e,{rules:n,result:r})}checkRulesValidity(e,n,r){const s=Object.keys(r),i=Object.keys(n);return i.length!==s.length||!i.every(c=>s.includes(c))?!1:i.every(c=>n[c].$params?Object.keys(n[c].$params).every(a=>M(r[c].$params[a])===M(n[c].$params[a])):!0)}get(e,n){const r=this.storage.get(e);if(!r)return;const{rules:s,result:i}=r,o=this.checkRulesValidity(e,n,s),c=i.$unwatch?i.$unwatch:()=>({});return o?i:{$dirty:i.$dirty,$partial:!0,$unwatch:c}}}const Or={COLLECT_ALL:!0,COLLECT_NONE:!1},za=Symbol("vuelidate#injectChildResults"),Ka=Symbol("vuelidate#removeChildResults");function Vy(t){let{$scope:e,instance:n}=t;const r={},s=W([]),i=q(()=>s.value.reduce((u,f)=>(u[f]=M(r[f]),u),{}));function o(u,f){let{$registerAs:p,$scope:m,$stopPropagation:_}=f;_||e===Or.COLLECT_NONE||m===Or.COLLECT_NONE||e!==Or.COLLECT_ALL&&e!==m||(r[p]=u,s.value.push(p))}n.__vuelidateInjectInstances=[].concat(n.__vuelidateInjectInstances||[],o);function c(u){s.value=s.value.filter(f=>f!==u),delete r[u]}n.__vuelidateRemoveInstances=[].concat(n.__vuelidateRemoveInstances||[],c);const a=$e(za,[]);kt(za,n.__vuelidateInjectInstances);const l=$e(Ka,[]);return kt(Ka,n.__vuelidateRemoveInstances),{childResults:i,sendValidationResultsToParent:a,removeValidationResultsFromParent:l}}function Pu(t){return new Proxy(t,{get(e,n){return typeof e[n]=="object"?Pu(e[n]):q(()=>e[n])}})}let qa=0;function Hy(t,e){var n;let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};arguments.length===1&&(r=t,t=void 0,e=void 0);let{$registerAs:s,$scope:i=Or.COLLECT_ALL,$stopPropagation:o,$externalResults:c,currentVueInstance:a}=r;const l=a||((n=Rf())===null||n===void 0?void 0:n.proxy),u=l?l.$options:{};s||(qa+=1,s=`_vuelidate_${qa}`);const f=W({}),p=new By,{childResults:m,sendValidationResultsToParent:_,removeValidationResultsFromParent:y}=l?Vy({$scope:i,instance:l}):{childResults:W({})};if(!t&&u.validations){const T=u.validations;e=W({}),ki(()=>{e.value=l,Ze(()=>Gr(T)?T.call(e.value,new Pu(e.value)):T,S=>{f.value=mi({validations:S,state:e,childResults:m,resultsCache:p,globalConfig:r,instance:l,externalResults:c||l.vuelidateExternalResults})},{immediate:!0})}),r=u.validationsConfig||r}else{const T=ge(t)||$y(t)?t:gt(t||{});Ze(T,S=>{f.value=mi({validations:S,state:e,childResults:m,resultsCache:p,globalConfig:r,instance:l??{},externalResults:c})},{immediate:!0})}return l&&(_.forEach(T=>T(f,{$registerAs:s,$scope:i,$stopPropagation:o})),kc(()=>y.forEach(T=>T(s)))),q(()=>Tt(Tt({},M(f.value)),m.value))}const ms=t=>{if(t=M(t),Array.isArray(t))return!!t.length;if(t==null)return!1;if(t===!1)return!0;if(t instanceof Date)return!isNaN(t.getTime());if(typeof t=="object"){for(let e in t)return!0;return!1}return!!String(t).length},Ou=t=>(t=M(t),Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:String(t).length);function dn(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return r=>(r=M(r),!ms(r)||e.every(s=>(s.lastIndex=0,s.test(r))))}dn(/^[a-zA-Z]*$/);dn(/^[a-zA-Z0-9]*$/);dn(/^\d*(\.\d+)?$/);const Wy=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;var zy=dn(Wy),Ky={$validator:zy,$message:"Value is not a valid email address",$params:{type:"email"}};function qy(t){return e=>!ms(e)||Ou(e)<=M(t)}function Gy(t){return{$validator:qy(t),$message:e=>{let{$params:n}=e;return`The maximum length allowed is ${n.max}`},$params:{max:t,type:"maxLength"}}}function Jy(t){return e=>!ms(e)||Ou(e)>=M(t)}function Yy(t){return{$validator:Jy(t),$message:e=>{let{$params:n}=e;return`This field should be at least ${n.min} characters long`},$params:{min:t,type:"minLength"}}}function Xy(t){return typeof t=="string"&&(t=t.trim()),ms(t)}var Ga={$validator:Xy,$message:"Value is required",$params:{type:"required"}};const Qy=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;dn(Qy);dn(/(^[0-9]*$)|(^-[0-9]+$)/);dn(/^[-]?\d*(\.\d+)?$/);const Zy=t=>(xd("data-v-2f6d0191"),t=t(),Nd(),t),ew={class:"icon"},tw={class:"text"},nw=Zy(()=>G("div",{class:"indicator"},null,-1)),rw=Ge({__name:"IndicatorNavi",setup(t){const e=W(["--clr:#f3218b;","--clr:#2196f3;","--clr:#008a1b;","--clr:#dc1dff;","--clr:#d56f1d;"]),{activeLink:n,routes:r,updateActiveLink:s}=$e("indicatorNavi");return(i,o)=>{const c=Nc("ion-icon");return ue(),Oe("section",{class:"nav show-nav",style:yn(`--widthSection:${70*M(r).length+50}px;`)},[G("nav",{style:yn(`--widthNavTag:${70*M(r).length}px;`)},[(ue(!0),Oe(Ve,null,Zd(M(r),(a,l)=>(ue(),Rt(M(Kl),{key:a.name,to:a.to,style:yn(`${e.value[l]}`),class:Zr([M(n)===a.name&&"active"]),onClick:()=>M(s)(a.name)},{default:Sc(()=>[G("span",ew,[pe(c,{name:`${a.ionIconClass}`},null,8,["name"])]),G("span",tw,be(a.name),1)]),_:2},1032,["to","style","class","onClick"]))),128)),nw],4)],4)}}});const Ft=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},ku=Ft(rw,[["__scopeId","data-v-2f6d0191"]]),sw={class:"header"},iw={class:"login"},ow={action:""},aw={key:0,class:"input-box"},cw={for:"login-input"},lw=["placeholder"],uw={class:"icon"},dw={class:"input-box"},fw={for:"email-input"},hw=["placeholder"],pw={class:"icon"},gw={key:1,class:"form-error"},mw={class:"input-box"},_w={for:"password-input"},vw=["placeholder"],yw={class:"icon"},ww={key:2,class:"form-error"},bw={class:"input-box"},Iw=["value"],Ew={class:"input-box submit-google"},Tw=["value"],Rw={class:"icon"},Sw={key:3,class:"form-error form-error-submit"},Cw=Ge({__name:"LoginPanel",setup(t){const e=W("Vue Project"),n=W("Sign In"),r=W("Register"),s=W("Sign In Google"),i=W("Sign Up Google"),o=W("User Name"),c=W("Password"),a=W("E-mail"),l=W("Keep me log in"),u=W(n.value),f=W([{name:`${n.value}`,ionIconClass:"log-in-outline",to:""},{name:`${r.value}`,ionIconClass:"document-text-outline",to:""}]);kt("indicatorNavi",{activeLink:u,routes:f,updateActiveLink:O=>{u.value=O}});const m=W(""),_=Ki(),y=gt({displayName:"",password:"",email:"",keepLogIn:!1}),T=gt({password:{required:Ga,minLength:Yy(6),maxLength:Gy(20)},email:{required:Ga,email:Ky},keepLogIn:{}}),S=Hy(T,y);ki(async()=>{await new Promise((B,z)=>{const Q=Ut(rt(),de=>{Q(),B(de)},z)})&&_.push("/feed")}),Ze([()=>y.email,()=>y.password],([O,B])=>{m.value=""});const x=async O=>{O.preventDefault();const B=await S.value.$validate(),z=rt();B&&u.value===r.value?hv(z,y.email,y.password).then(Q=>{y.displayName!==""&&mv(z.currentUser,{displayName:y.displayName}),_.push("/feed")}).catch(Q=>{switch(console.error("%c error -> ","background: #222; color: #bada55",Q.code,Q.message),Q.code){case"auth/email-already-in-use":m.value="E-mail already in use";break;default:m.value="Something went wrong";break}}):B&&u.value===n.value&&pv(z,y.email,y.password).then(Q=>{_.push("/feed")}).catch(Q=>{switch(console.error("%c error -> ","background: #222; color: #bada55",Q.code,Q.message),Q.code){case"auth/invalid-email":m.value="Invalid e-mail";break;case"auth/user-not-found":m.value="User not found";break;case"auth/wrong-password":m.value="Incorrect password";break;default:m.value="E-mail or password was Incorrect";break}})},H=O=>{O.preventDefault();const B=new dt;jv(rt(),B).then(z=>{console.log("%c user google -> ","background: #222; color: #bada55",z.user),_.push("/feed")}).catch(z=>{console.error("%c error -> ","background: #222; color: #bada55",z.code,z.message)})};return(O,B)=>{var Q,de;const z=Nc("ion-icon");return ue(),Oe("main",null,[G("header",sw,[G("h1",null,be(e.value),1)]),G("section",iw,[G("form",ow,[G("h2",null,be(u.value),1),u.value===`${r.value}`?(ue(),Oe("span",aw,[G("label",cw,be(o.value),1),wr(G("input",{type:"text",id:"login-input",placeholder:`${o.value}...`,maxlength:"20","onUpdate:modelValue":B[0]||(B[0]=le=>y.displayName=le)},null,8,lw),[[Es,y.displayName]]),G("span",uw,[pe(z,{name:"person-circle-outline"})])])):ut("",!0),G("span",dw,[G("label",fw,be(a.value),1),wr(G("input",{type:"text",id:"email-input",placeholder:`${a.value}...`,"onUpdate:modelValue":B[1]||(B[1]=le=>y.email=le)},null,8,hw),[[Es,y.email]]),G("span",pw,[pe(z,{name:"mail-outline"})])]),M(S).email.$error?(ue(),Oe("span",gw,be(((Q=M(S).email.$errors[0])==null?void 0:Q.$message)||((de=M(S).email.$errors[0])==null?void 0:de.$response.$message)),1)):ut("",!0),G("span",mw,[G("label",_w,be(c.value),1),wr(G("input",{type:"password",id:"password-input",placeholder:`${c.value}...`,"onUpdate:modelValue":B[2]||(B[2]=le=>y.password=le)},null,8,vw),[[Es,y.password]]),G("span",yw,[pe(z,{name:"lock-closed-outline"})])]),M(S).password.$error?(ue(),Oe("span",ww,be(M(S).password.$errors[0].$message),1)):ut("",!0),G("label",null,[wr(G("input",{type:"checkbox","onUpdate:modelValue":B[3]||(B[3]=le=>y.keepLogIn=le)},null,512),[[Qf,y.keepLogIn]]),zc(be(l.value),1)]),G("span",bw,[G("input",{type:"submit",value:u.value,onClick:B[4]||(B[4]=le=>x(le))},null,8,Iw)]),G("span",Ew,[G("input",{type:"submit",value:u.value===`${n.value}`?s.value:i.value,onClick:H},null,8,Tw),G("span",Rw,[pe(z,{name:"logo-google"})])]),m.value?(ue(),Oe("span",Sw,be(m.value),1)):ut("",!0)])]),pe(ku)])}}});const Ja=Ft(Cw,[["__scopeId","data-v-3b8318aa"]]),Aw=Ge({__name:"TheReflexGame",props:{header:{}},setup(t){const e=t,n=W(!1);let r;return cn(()=>{r=rt(),Ut(r,s=>{s?n.value=!0:n.value=!1})}),(s,i)=>(ue(),Oe("h2",null,be(e.header),1))}});const Pw=Ft(Aw,[["__scopeId","data-v-0621bf61"]]),Ow=Ge({__name:"TheDuelGame",props:{header:{}},setup(t){const e=t,n=W(!1);let r;return cn(()=>{r=rt(),Ut(r,s=>{s?n.value=!0:n.value=!1})}),(s,i)=>(ue(),Oe("h2",null,be(e.header),1))}});const kw=Ft(Ow,[["__scopeId","data-v-dbe518da"]]),$w=Ge({__name:"TheQuatroGame",props:{header:{}},setup(t){const e=t,n=W(!1);let r;return cn(()=>{r=rt(),Ut(r,s=>{s?n.value=!0:n.value=!1})}),(s,i)=>(ue(),Oe("h2",null,be(e.header),1))}});const xw=Ft($w,[["__scopeId","data-v-c3dda84a"]]),Nw=Ge({__name:"TheSettings",props:{header:{}},setup(t){const e=t,n=W(!1);let r;return cn(()=>{r=rt(),Ut(r,s=>{s?n.value=!0:n.value=!1})}),(s,i)=>(ue(),Oe("h2",null,be(e.header),1))}});const Dw=Ft(Nw,[["__scopeId","data-v-9a33a386"]]),Lw=Ge({__name:"TheLogout",props:{header:{}},setup(t){const e=t,n=Ki(),r=W(!1);let s;cn(()=>{s=rt(),Ut(s,o=>{o?r.value=!0:r.value=!1})});const i=()=>{yv(s).then(()=>{n.push("/")})};return(o,c)=>(ue(),Oe(Ve,null,[G("h2",null,be(e.header),1),G("button",{onClick:i},"log out")],64))}});const Mw=Ft(Lw,[["__scopeId","data-v-c1440ce7"]]),Uw={class:"header"},Fw={class:"wrapper"},jw=Ge({__name:"FeedPanel",setup(t){const e=W("Feed Panel"),n=W("Reflex"),r=W("Duel"),s=W("Quatro"),i=W("Settings"),o=W("log Out"),c=Ki(),a=W(!1),l=W(n.value),u=W([{name:`${n.value}`,ionIconClass:"game-controller-outline",to:"/feed/reflex-game"},{name:`${r.value}`,ionIconClass:"game-controller-outline",to:"/feed/duel-game"},{name:`${s.value}`,ionIconClass:"game-controller-outline",to:"/feed/quatro-game"},{name:`${i.value}`,ionIconClass:"settings-outline",to:"/feed/settings"},{name:`${o.value}`,ionIconClass:"log-out-outline",to:"/feed/logout"}]);kt("indicatorNavi",{activeLink:l,routes:u,updateActiveLink:m=>{l.value=m}});let p;return cn(()=>{p=rt(),Ut(p,m=>{m?a.value=!0:a.value=!1}),u.value.find(({name:m,to:_})=>_===c.currentRoute.value.path?(l.value=m,!0):!1)}),(m,_)=>(ue(),Oe("main",null,[G("header",Uw,[G("h1",null,be(e.value),1)]),G("section",Fw,[l.value===n.value?(ue(),Rt(Pw,{key:0,header:n.value},null,8,["header"])):ut("",!0),l.value===r.value?(ue(),Rt(kw,{key:1,header:r.value},null,8,["header"])):ut("",!0),l.value===s.value?(ue(),Rt(xw,{key:2,header:s.value},null,8,["header"])):ut("",!0),l.value===i.value?(ue(),Rt(Dw,{key:3,header:i.value},null,8,["header"])):ut("",!0),l.value===o.value?(ue(),Rt(Mw,{key:4,header:o.value},null,8,["header"])):ut("",!0)]),pe(ku)]))}});const $u=Ft(jw,[["__scopeId","data-v-315a35c9"]]),Mn=Object.freeze(Object.defineProperty({__proto__:null,default:$u},Symbol.toStringTag,{value:"Module"})),xu=h_({history:km("/vue-project/"),routes:[{path:"/",name:"home",component:Ja},{path:"/:pathMatch(.*)*",name:"not-found",component:Ja},{path:"/feed",name:"feed",component:$u,meta:{requiresAuth:!0}},{path:"/feed/reflex-game",name:"reflex",component:()=>Ln(()=>Promise.resolve().then(()=>Mn),void 0),meta:{requiresAuth:!0}},{path:"/feed/duel-game",name:"duel",component:()=>Ln(()=>Promise.resolve().then(()=>Mn),void 0),meta:{requiresAuth:!0}},{path:"/feed/quatro-game",name:"quatro",component:()=>Ln(()=>Promise.resolve().then(()=>Mn),void 0),meta:{requiresAuth:!0}},{path:"/feed/settings",name:"settings",component:()=>Ln(()=>Promise.resolve().then(()=>Mn),void 0),meta:{requiresAuth:!0}},{path:"/feed/logout",name:"logout",component:()=>Ln(()=>Promise.resolve().then(()=>Mn),void 0),meta:{requiresAuth:!0}}]}),Ya=()=>new Promise((t,e)=>{const n=Ut(rt(),r=>{n(),t(r)},e)});xu.beforeEach(async(t,e,n)=>{t.name==="home"||t.name==="not-found"?await Ya()?n("/feed"):n():t.matched.some(r=>r.meta.requiresAuth)?await Ya()?n():(alert("You don't have access!"),n("/")):n()});const Bw={apiKey:"AIzaSyBRIqo_JdB3v6nV5pAPNfkgm9NujxAup68",authDomain:"vue-project-d53d4.firebaseapp.com",projectId:"vue-project-d53d4",storageBucket:"vue-project-d53d4.appspot.com",messagingSenderId:"495070706443",appId:"1:495070706443:web:c2afce58385a473439800e",measurementId:"G-FQ88TGJMZE"},Vw=al(Bw);um(Vw);const ro=nh(g_);ro.use(oh());ro.use(xu);ro.mount("#app");
