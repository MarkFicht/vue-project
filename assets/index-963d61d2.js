(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Hl(t,e){const n=Object.create(null),r=t.split(",");for(let s=0;s<r.length;s++)n[r[s]]=!0;return e?s=>!!n[s.toLowerCase()]:s=>!!n[s]}const Pe={},Hr=[],Dt=()=>{},Tv=()=>!1,Av=/^on[^a-z]/,sa=t=>Av.test(t),zl=t=>t.startsWith("onUpdate:"),ze=Object.assign,Kl=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Rv=Object.prototype.hasOwnProperty,de=(t,e)=>Rv.call(t,e),K=Array.isArray,zr=t=>Si(t)==="[object Map]",ia=t=>Si(t)==="[object Set]",Ch=t=>Si(t)==="[object Date]",te=t=>typeof t=="function",Be=t=>typeof t=="string",Zs=t=>typeof t=="symbol",Te=t=>t!==null&&typeof t=="object",pp=t=>Te(t)&&te(t.then)&&te(t.catch),gp=Object.prototype.toString,Si=t=>gp.call(t),Pv=t=>Si(t).slice(8,-1),mp=t=>Si(t)==="[object Object]",Wl=t=>Be(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,fo=Hl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),oa=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Sv=/-(\w)/g,nn=oa(t=>t.replace(Sv,(e,n)=>n?n.toUpperCase():"")),bv=/\B([A-Z])/g,ps=oa(t=>t.replace(bv,"-$1").toLowerCase()),aa=oa(t=>t.charAt(0).toUpperCase()+t.slice(1)),ac=oa(t=>t?`on${aa(t)}`:""),ei=(t,e)=>!Object.is(t,e),po=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},bo=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},Hc=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let kh;const zc=()=>kh||(kh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Kr(t){if(K(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Be(r)?Dv(r):Kr(r);if(s)for(const i in s)e[i]=s[i]}return e}else{if(Be(t))return t;if(Te(t))return t}}const Cv=/;(?![^(]*\))/g,kv=/:([^]+)/,Ov=/\/\*[^]*?\*\//g;function Dv(t){const e={};return t.replace(Ov,"").split(Cv).forEach(n=>{if(n){const r=n.split(kv);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function hn(t){let e="";if(Be(t))e=t;else if(K(t))for(let n=0;n<t.length;n++){const r=hn(t[n]);r&&(e+=r+" ")}else if(Te(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Nv="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Vv=Hl(Nv);function _p(t){return!!t||t===""}function xv(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=ca(t[r],e[r]);return n}function ca(t,e){if(t===e)return!0;let n=Ch(t),r=Ch(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=Zs(t),r=Zs(e),n||r)return t===e;if(n=K(t),r=K(e),n||r)return n&&r?xv(t,e):!1;if(n=Te(t),r=Te(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const a=t.hasOwnProperty(o),c=e.hasOwnProperty(o);if(a&&!c||!a&&c||!ca(t[o],e[o]))return!1}}return String(t)===String(e)}function yp(t,e){return t.findIndex(n=>ca(n,e))}const qt=t=>Be(t)?t:t==null?"":K(t)||Te(t)&&(t.toString===gp||!te(t.toString))?JSON.stringify(t,vp,2):String(t),vp=(t,e)=>e&&e.__v_isRef?vp(t,e.value):zr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s])=>(n[`${r} =>`]=s,n),{})}:ia(e)?{[`Set(${e.size})`]:[...e.values()]}:Te(e)&&!K(e)&&!mp(e)?String(e):e;let It;class Ep{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=It,!e&&It&&(this.index=(It.scopes||(It.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=It;try{return It=this,e()}finally{It=n}}}on(){It=this}off(){It=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function Ip(t){return new Ep(t)}function Mv(t,e=It){e&&e.active&&e.effects.push(t)}function wp(){return It}function Lv(t){It&&It.cleanups.push(t)}const Gl=t=>{const e=new Set(t);return e.w=0,e.n=0,e},Tp=t=>(t.w&Un)>0,Ap=t=>(t.n&Un)>0,Fv=({deps:t})=>{if(t.length)for(let e=0;e<t.length;e++)t[e].w|=Un},$v=t=>{const{deps:e}=t;if(e.length){let n=0;for(let r=0;r<e.length;r++){const s=e[r];Tp(s)&&!Ap(s)?s.delete(t):e[n++]=s,s.w&=~Un,s.n&=~Un}e.length=n}},Co=new WeakMap;let Os=0,Un=1;const Kc=30;let kt;const cr=Symbol(""),Wc=Symbol("");class Ql{constructor(e,n=null,r){this.fn=e,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,Mv(this,r)}run(){if(!this.active)return this.fn();let e=kt,n=Nn;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=kt,kt=this,Nn=!0,Un=1<<++Os,Os<=Kc?Fv(this):Oh(this),this.fn()}finally{Os<=Kc&&$v(this),Un=1<<--Os,kt=this.parent,Nn=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){kt===this?this.deferStop=!0:this.active&&(Oh(this),this.onStop&&this.onStop(),this.active=!1)}}function Oh(t){const{deps:e}=t;if(e.length){for(let n=0;n<e.length;n++)e[n].delete(t);e.length=0}}let Nn=!0;const Rp=[];function gs(){Rp.push(Nn),Nn=!1}function ms(){const t=Rp.pop();Nn=t===void 0?!0:t}function vt(t,e,n){if(Nn&&kt){let r=Co.get(t);r||Co.set(t,r=new Map);let s=r.get(n);s||r.set(n,s=Gl()),Pp(s)}}function Pp(t,e){let n=!1;Os<=Kc?Ap(t)||(t.n|=Un,n=!Tp(t)):n=!t.has(kt),n&&(t.add(kt),kt.deps.push(t))}function mn(t,e,n,r,s,i){const o=Co.get(t);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(n==="length"&&K(t)){const c=Number(r);o.forEach((l,u)=>{(u==="length"||u>=c)&&a.push(l)})}else switch(n!==void 0&&a.push(o.get(n)),e){case"add":K(t)?Wl(n)&&a.push(o.get("length")):(a.push(o.get(cr)),zr(t)&&a.push(o.get(Wc)));break;case"delete":K(t)||(a.push(o.get(cr)),zr(t)&&a.push(o.get(Wc)));break;case"set":zr(t)&&a.push(o.get(cr));break}if(a.length===1)a[0]&&Gc(a[0]);else{const c=[];for(const l of a)l&&c.push(...l);Gc(Gl(c))}}function Gc(t,e){const n=K(t)?t:[...t];for(const r of n)r.computed&&Dh(r);for(const r of n)r.computed||Dh(r)}function Dh(t,e){(t!==kt||t.allowRecurse)&&(t.scheduler?t.scheduler():t.run())}function Uv(t,e){var n;return(n=Co.get(t))==null?void 0:n.get(e)}const jv=Hl("__proto__,__v_isRef,__isVue"),Sp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Zs)),Bv=Yl(),qv=Yl(!1,!0),Hv=Yl(!0),Nh=zv();function zv(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const r=ue(this);for(let i=0,o=this.length;i<o;i++)vt(r,"get",i+"");const s=r[e](...n);return s===-1||s===!1?r[e](...n.map(ue)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){gs();const r=ue(this)[e].apply(this,n);return ms(),r}}),t}function Kv(t){const e=ue(this);return vt(e,"has",t),e.hasOwnProperty(t)}function Yl(t=!1,e=!1){return function(r,s,i){if(s==="__v_isReactive")return!t;if(s==="__v_isReadonly")return t;if(s==="__v_isShallow")return e;if(s==="__v_raw"&&i===(t?e?cE:Dp:e?Op:kp).get(r))return r;const o=K(r);if(!t){if(o&&de(Nh,s))return Reflect.get(Nh,s,i);if(s==="hasOwnProperty")return Kv}const a=Reflect.get(r,s,i);return(Zs(s)?Sp.has(s):jv(s))||(t||vt(r,"get",s),e)?a:Re(a)?o&&Wl(s)?a:a.value:Te(a)?t?Vp(a):rn(a):a}}const Wv=bp(),Gv=bp(!0);function bp(t=!1){return function(n,r,s,i){let o=n[r];if(fr(o)&&Re(o)&&!Re(s))return!1;if(!t&&(!ko(s)&&!fr(s)&&(o=ue(o),s=ue(s)),!K(n)&&Re(o)&&!Re(s)))return o.value=s,!0;const a=K(n)&&Wl(r)?Number(r)<n.length:de(n,r),c=Reflect.set(n,r,s,i);return n===ue(i)&&(a?ei(s,o)&&mn(n,"set",r,s):mn(n,"add",r,s)),c}}function Qv(t,e){const n=de(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&mn(t,"delete",e,void 0),r}function Yv(t,e){const n=Reflect.has(t,e);return(!Zs(e)||!Sp.has(e))&&vt(t,"has",e),n}function Jv(t){return vt(t,"iterate",K(t)?"length":cr),Reflect.ownKeys(t)}const Cp={get:Bv,set:Wv,deleteProperty:Qv,has:Yv,ownKeys:Jv},Xv={get:Hv,set(t,e){return!0},deleteProperty(t,e){return!0}},Zv=ze({},Cp,{get:qv,set:Gv}),Jl=t=>t,la=t=>Reflect.getPrototypeOf(t);function Qi(t,e,n=!1,r=!1){t=t.__v_raw;const s=ue(t),i=ue(e);n||(e!==i&&vt(s,"get",e),vt(s,"get",i));const{has:o}=la(s),a=r?Jl:n?eu:ti;if(o.call(s,e))return a(t.get(e));if(o.call(s,i))return a(t.get(i));t!==s&&t.get(e)}function Yi(t,e=!1){const n=this.__v_raw,r=ue(n),s=ue(t);return e||(t!==s&&vt(r,"has",t),vt(r,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)}function Ji(t,e=!1){return t=t.__v_raw,!e&&vt(ue(t),"iterate",cr),Reflect.get(t,"size",t)}function Vh(t){t=ue(t);const e=ue(this);return la(e).has.call(e,t)||(e.add(t),mn(e,"add",t,t)),this}function xh(t,e){e=ue(e);const n=ue(this),{has:r,get:s}=la(n);let i=r.call(n,t);i||(t=ue(t),i=r.call(n,t));const o=s.call(n,t);return n.set(t,e),i?ei(e,o)&&mn(n,"set",t,e):mn(n,"add",t,e),this}function Mh(t){const e=ue(this),{has:n,get:r}=la(e);let s=n.call(e,t);s||(t=ue(t),s=n.call(e,t)),r&&r.call(e,t);const i=e.delete(t);return s&&mn(e,"delete",t,void 0),i}function Lh(){const t=ue(this),e=t.size!==0,n=t.clear();return e&&mn(t,"clear",void 0,void 0),n}function Xi(t,e){return function(r,s){const i=this,o=i.__v_raw,a=ue(o),c=e?Jl:t?eu:ti;return!t&&vt(a,"iterate",cr),o.forEach((l,u)=>r.call(s,c(l),c(u),i))}}function Zi(t,e,n){return function(...r){const s=this.__v_raw,i=ue(s),o=zr(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,l=s[t](...r),u=n?Jl:e?eu:ti;return!e&&vt(i,"iterate",c?Wc:cr),{next(){const{value:h,done:d}=l.next();return d?{value:h,done:d}:{value:a?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function wn(t){return function(...e){return t==="delete"?!1:this}}function eE(){const t={get(i){return Qi(this,i)},get size(){return Ji(this)},has:Yi,add:Vh,set:xh,delete:Mh,clear:Lh,forEach:Xi(!1,!1)},e={get(i){return Qi(this,i,!1,!0)},get size(){return Ji(this)},has:Yi,add:Vh,set:xh,delete:Mh,clear:Lh,forEach:Xi(!1,!0)},n={get(i){return Qi(this,i,!0)},get size(){return Ji(this,!0)},has(i){return Yi.call(this,i,!0)},add:wn("add"),set:wn("set"),delete:wn("delete"),clear:wn("clear"),forEach:Xi(!0,!1)},r={get(i){return Qi(this,i,!0,!0)},get size(){return Ji(this,!0)},has(i){return Yi.call(this,i,!0)},add:wn("add"),set:wn("set"),delete:wn("delete"),clear:wn("clear"),forEach:Xi(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=Zi(i,!1,!1),n[i]=Zi(i,!0,!1),e[i]=Zi(i,!1,!0),r[i]=Zi(i,!0,!0)}),[t,n,e,r]}const[tE,nE,rE,sE]=eE();function Xl(t,e){const n=e?t?sE:rE:t?nE:tE;return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(de(n,s)&&s in r?n:r,s,i)}const iE={get:Xl(!1,!1)},oE={get:Xl(!1,!0)},aE={get:Xl(!0,!1)},kp=new WeakMap,Op=new WeakMap,Dp=new WeakMap,cE=new WeakMap;function lE(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function uE(t){return t.__v_skip||!Object.isExtensible(t)?0:lE(Pv(t))}function rn(t){return fr(t)?t:Zl(t,!1,Cp,iE,kp)}function Np(t){return Zl(t,!1,Zv,oE,Op)}function Vp(t){return Zl(t,!0,Xv,aE,Dp)}function Zl(t,e,n,r,s){if(!Te(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=uE(t);if(o===0)return t;const a=new Proxy(t,o===2?r:n);return s.set(t,a),a}function Jt(t){return fr(t)?Jt(t.__v_raw):!!(t&&t.__v_isReactive)}function fr(t){return!!(t&&t.__v_isReadonly)}function ko(t){return!!(t&&t.__v_isShallow)}function xp(t){return Jt(t)||fr(t)}function ue(t){const e=t&&t.__v_raw;return e?ue(e):t}function ua(t){return bo(t,"__v_skip",!0),t}const ti=t=>Te(t)?rn(t):t,eu=t=>Te(t)?Vp(t):t;function Mp(t){Nn&&kt&&(t=ue(t),Pp(t.dep||(t.dep=Gl())))}function Lp(t,e){t=ue(t);const n=t.dep;n&&Gc(n)}function Re(t){return!!(t&&t.__v_isRef===!0)}function we(t){return Fp(t,!1)}function hE(t){return Fp(t,!0)}function Fp(t,e){return Re(t)?t:new dE(t,e)}class dE{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:ue(e),this._value=n?e:ti(e)}get value(){return Mp(this),this._value}set value(e){const n=this.__v_isShallow||ko(e)||fr(e);e=n?e:ue(e),ei(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:ti(e),Lp(this))}}function H(t){return Re(t)?t.value:t}const fE={get:(t,e,n)=>H(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return Re(s)&&!Re(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function $p(t){return Jt(t)?t:new Proxy(t,fE)}function pE(t){const e=K(t)?new Array(t.length):{};for(const n in t)e[n]=Up(t,n);return e}class gE{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0}get value(){const e=this._object[this._key];return e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Uv(ue(this._object),this._key)}}class mE{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function _E(t,e,n){return Re(t)?t:te(t)?new mE(t):Te(t)&&arguments.length>1?Up(t,e,n):we(t)}function Up(t,e,n){const r=t[e];return Re(r)?r:new gE(t,e,n)}class yE{constructor(e,n,r,s){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Ql(e,()=>{this._dirty||(this._dirty=!0,Lp(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=r}get value(){const e=ue(this);return Mp(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function vE(t,e,n=!1){let r,s;const i=te(t);return i?(r=t,s=Dt):(r=t.get,s=t.set),new yE(r,s,i||!s,n)}function Vn(t,e,n,r){let s;try{s=r?t(...r):t()}catch(i){ha(i,e,n)}return s}function Nt(t,e,n,r){if(te(t)){const i=Vn(t,e,n,r);return i&&pp(i)&&i.catch(o=>{ha(o,e,n)}),i}const s=[];for(let i=0;i<t.length;i++)s.push(Nt(t[i],e,n,r));return s}function ha(t,e,n,r=!0){const s=e?e.vnode:null;if(e){let i=e.parent;const o=e.proxy,a=n;for(;i;){const l=i.ec;if(l){for(let u=0;u<l.length;u++)if(l[u](t,o,a)===!1)return}i=i.parent}const c=e.appContext.config.errorHandler;if(c){Vn(c,null,10,[t,o,a]);return}}EE(t,n,s,r)}function EE(t,e,n,r=!0){console.error(t)}let ni=!1,Qc=!1;const nt=[];let Kt=0;const Wr=[];let un=null,Xn=0;const jp=Promise.resolve();let tu=null;function ri(t){const e=tu||jp;return t?e.then(this?t.bind(this):t):e}function IE(t){let e=Kt+1,n=nt.length;for(;e<n;){const r=e+n>>>1;si(nt[r])<t?e=r+1:n=r}return e}function nu(t){(!nt.length||!nt.includes(t,ni&&t.allowRecurse?Kt+1:Kt))&&(t.id==null?nt.push(t):nt.splice(IE(t.id),0,t),Bp())}function Bp(){!ni&&!Qc&&(Qc=!0,tu=jp.then(Hp))}function wE(t){const e=nt.indexOf(t);e>Kt&&nt.splice(e,1)}function TE(t){K(t)?Wr.push(...t):(!un||!un.includes(t,t.allowRecurse?Xn+1:Xn))&&Wr.push(t),Bp()}function Fh(t,e=ni?Kt+1:0){for(;e<nt.length;e++){const n=nt[e];n&&n.pre&&(nt.splice(e,1),e--,n())}}function qp(t){if(Wr.length){const e=[...new Set(Wr)];if(Wr.length=0,un){un.push(...e);return}for(un=e,un.sort((n,r)=>si(n)-si(r)),Xn=0;Xn<un.length;Xn++)un[Xn]();un=null,Xn=0}}const si=t=>t.id==null?1/0:t.id,AE=(t,e)=>{const n=si(t)-si(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function Hp(t){Qc=!1,ni=!0,nt.sort(AE);const e=Dt;try{for(Kt=0;Kt<nt.length;Kt++){const n=nt[Kt];n&&n.active!==!1&&Vn(n,null,14)}}finally{Kt=0,nt.length=0,qp(),ni=!1,tu=null,(nt.length||Wr.length)&&Hp()}}function RE(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Pe;let s=n;const i=e.startsWith("update:"),o=i&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:h,trim:d}=r[u]||Pe;d&&(s=n.map(f=>Be(f)?f.trim():f)),h&&(s=n.map(Hc))}let a,c=r[a=ac(e)]||r[a=ac(nn(e))];!c&&i&&(c=r[a=ac(ps(e))]),c&&Nt(c,t,6,s);const l=r[a+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,Nt(l,t,6,s)}}function zp(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!te(t)){const c=l=>{const u=zp(l,e,!0);u&&(a=!0,ze(o,u))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!a?(Te(t)&&r.set(t,null),null):(K(i)?i.forEach(c=>o[c]=null):ze(o,i),Te(t)&&r.set(t,o),o)}function da(t,e){return!t||!sa(e)?!1:(e=e.slice(2).replace(/Once$/,""),de(t,e[0].toLowerCase()+e.slice(1))||de(t,ps(e))||de(t,e))}let mt=null,fa=null;function Oo(t){const e=mt;return mt=t,fa=t&&t.type.__scopeId||null,e}function PE(t){fa=t}function SE(){fa=null}function Kp(t,e=mt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Qh(-1);const i=Oo(e);let o;try{o=t(...s)}finally{Oo(i),r._d&&Qh(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function cc(t){const{type:e,vnode:n,proxy:r,withProxy:s,props:i,propsOptions:[o],slots:a,attrs:c,emit:l,render:u,renderCache:h,data:d,setupState:f,ctx:m,inheritAttrs:v}=t;let y,T;const C=Oo(t);try{if(n.shapeFlag&4){const N=s||r;y=zt(u.call(N,N,h,i,f,d,m)),T=c}else{const N=e;y=zt(N.length>1?N(i,{attrs:c,slots:a,emit:l}):N(i,null)),T=e.props?c:bE(c)}}catch(N){js.length=0,ha(N,t,1),y=Fe(pr)}let F=y;if(T&&v!==!1){const N=Object.keys(T),{shapeFlag:G}=F;N.length&&G&7&&(o&&N.some(zl)&&(T=CE(T,o)),F=Zr(F,T))}return n.dirs&&(F=Zr(F),F.dirs=F.dirs?F.dirs.concat(n.dirs):n.dirs),n.transition&&(F.transition=n.transition),y=F,Oo(C),y}const bE=t=>{let e;for(const n in t)(n==="class"||n==="style"||sa(n))&&((e||(e={}))[n]=t[n]);return e},CE=(t,e)=>{const n={};for(const r in t)(!zl(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function kE(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:c}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?$h(r,o,l):!!o;if(c&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(o[d]!==r[d]&&!da(l,d))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?$h(r,o,l):!0:!!o;return!1}function $h(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!da(n,i))return!0}return!1}function OE({vnode:t,parent:e},n){for(;e&&e.subTree===t;)(t=e.vnode).el=n,e=e.parent}const DE=t=>t.__isSuspense;function NE(t,e){e&&e.pendingBranch?K(t)?e.effects.push(...t):e.effects.push(t):TE(t)}const eo={};function Vt(t,e,n){return Wp(t,e,n)}function Wp(t,e,{immediate:n,deep:r,flush:s,onTrack:i,onTrigger:o}=Pe){var a;const c=wp()===((a=$e)==null?void 0:a.scope)?$e:null;let l,u=!1,h=!1;if(Re(t)?(l=()=>t.value,u=ko(t)):Jt(t)?(l=()=>t,r=!0):K(t)?(h=!0,u=t.some(N=>Jt(N)||ko(N)),l=()=>t.map(N=>{if(Re(N))return N.value;if(Jt(N))return nr(N);if(te(N))return Vn(N,c,2)})):te(t)?e?l=()=>Vn(t,c,2):l=()=>{if(!(c&&c.isUnmounted))return d&&d(),Nt(t,c,3,[f])}:l=Dt,e&&r){const N=l;l=()=>nr(N())}let d,f=N=>{d=C.onStop=()=>{Vn(N,c,4)}},m;if(ai)if(f=Dt,e?n&&Nt(e,c,3,[l(),h?[]:void 0,f]):l(),s==="sync"){const N=SI();m=N.__watcherHandles||(N.__watcherHandles=[])}else return Dt;let v=h?new Array(t.length).fill(eo):eo;const y=()=>{if(C.active)if(e){const N=C.run();(r||u||(h?N.some((G,W)=>ei(G,v[W])):ei(N,v)))&&(d&&d(),Nt(e,c,3,[N,v===eo?void 0:h&&v[0]===eo?[]:v,f]),v=N)}else C.run()};y.allowRecurse=!!e;let T;s==="sync"?T=y:s==="post"?T=()=>pt(y,c&&c.suspense):(y.pre=!0,c&&(y.id=c.uid),T=()=>nu(y));const C=new Ql(l,T);e?n?y():v=C.run():s==="post"?pt(C.run.bind(C),c&&c.suspense):C.run();const F=()=>{C.stop(),c&&c.scope&&Kl(c.scope.effects,C)};return m&&m.push(F),F}function VE(t,e,n){const r=this.proxy,s=Be(t)?t.includes(".")?Gp(r,t):()=>r[t]:t.bind(r,r);let i;te(e)?i=e:(i=e.handler,n=e);const o=$e;es(this);const a=Wp(s,i.bind(r),n);return o?es(o):ur(),a}function Gp(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}function nr(t,e){if(!Te(t)||t.__v_skip||(e=e||new Set,e.has(t)))return t;if(e.add(t),Re(t))nr(t.value,e);else if(K(t))for(let n=0;n<t.length;n++)nr(t[n],e);else if(ia(t)||zr(t))t.forEach(n=>{nr(n,e)});else if(mp(t))for(const n in t)nr(t[n],e);return t}function to(t,e){const n=mt;if(n===null)return t;const r=_a(n)||n.proxy,s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[o,a,c,l=Pe]=e[i];o&&(te(o)&&(o={mounted:o,updated:o}),o.deep&&nr(a),s.push({dir:o,instance:r,value:a,oldValue:void 0,arg:c,modifiers:l}))}return t}function Qn(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(gs(),Nt(c,n,8,[t.el,a,t,e]),ms())}}function bi(t,e){return te(t)?(()=>ze({name:t.name},e,{setup:t}))():t}const go=t=>!!t.type.__asyncLoader,Qp=t=>t.type.__isKeepAlive;function xE(t,e){Yp(t,"a",e)}function ME(t,e){Yp(t,"da",e)}function Yp(t,e,n=$e){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(pa(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Qp(s.parent.vnode)&&LE(r,e,n,s),s=s.parent}}function LE(t,e,n,r){const s=pa(e,t,r,!0);Xp(()=>{Kl(r[e],s)},n)}function pa(t,e,n=$e,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;gs(),es(n);const a=Nt(e,n,t,o);return ur(),ms(),a});return r?s.unshift(i):s.push(i),i}}const In=t=>(e,n=$e)=>(!ai||t==="sp")&&pa(t,(...r)=>e(...r),n),ru=In("bm"),FE=In("m"),$E=In("bu"),UE=In("u"),Jp=In("bum"),Xp=In("um"),jE=In("sp"),BE=In("rtg"),qE=In("rtc");function HE(t,e=$e){pa("ec",t,e)}const Zp="components";function eg(t,e){return KE(Zp,t,!0,e)||t}const zE=Symbol.for("v-ndc");function KE(t,e,n=!0,r=!1){const s=mt||$e;if(s){const i=s.type;if(t===Zp){const a=AI(i,!1);if(a&&(a===e||a===nn(e)||a===aa(nn(e))))return i}const o=Uh(s[t]||i[t],e)||Uh(s.appContext[t],e);return!o&&r?i:o}}function Uh(t,e){return t&&(t[e]||t[nn(e)]||t[aa(nn(e))])}function WE(t,e,n,r){let s;const i=n&&n[r];if(K(t)||Be(t)){s=new Array(t.length);for(let o=0,a=t.length;o<a;o++)s[o]=e(t[o],o,void 0,i&&i[o])}else if(typeof t=="number"){s=new Array(t);for(let o=0;o<t;o++)s[o]=e(o+1,o,void 0,i&&i[o])}else if(Te(t))if(t[Symbol.iterator])s=Array.from(t,(o,a)=>e(o,a,void 0,i&&i[a]));else{const o=Object.keys(t);s=new Array(o.length);for(let a=0,c=o.length;a<c;a++){const l=o[a];s[a]=e(t[l],l,a,i&&i[a])}}else s=[];return n&&(n[r]=s),s}const Yc=t=>t?dg(t)?_a(t)||t.proxy:Yc(t.parent):null,Us=ze(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Yc(t.parent),$root:t=>Yc(t.root),$emit:t=>t.emit,$options:t=>su(t),$forceUpdate:t=>t.f||(t.f=()=>nu(t.update)),$nextTick:t=>t.n||(t.n=ri.bind(t.proxy)),$watch:t=>VE.bind(t)}),lc=(t,e)=>t!==Pe&&!t.__isScriptSetup&&de(t,e),GE={get({_:t},e){const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=t;let l;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(lc(r,e))return o[e]=1,r[e];if(s!==Pe&&de(s,e))return o[e]=2,s[e];if((l=t.propsOptions[0])&&de(l,e))return o[e]=3,i[e];if(n!==Pe&&de(n,e))return o[e]=4,n[e];Jc&&(o[e]=0)}}const u=Us[e];let h,d;if(u)return e==="$attrs"&&vt(t,"get",e),u(t);if((h=a.__cssModules)&&(h=h[e]))return h;if(n!==Pe&&de(n,e))return o[e]=4,n[e];if(d=c.config.globalProperties,de(d,e))return d[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return lc(s,e)?(s[e]=n,!0):r!==Pe&&de(r,e)?(r[e]=n,!0):de(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let a;return!!n[o]||t!==Pe&&de(t,o)||lc(e,o)||(a=i[0])&&de(a,o)||de(r,o)||de(Us,o)||de(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:de(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function jh(t){return K(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Jc=!0;function QE(t){const e=su(t),n=t.proxy,r=t.ctx;Jc=!1,e.beforeCreate&&Bh(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:m,activated:v,deactivated:y,beforeDestroy:T,beforeUnmount:C,destroyed:F,unmounted:N,render:G,renderTracked:W,renderTriggered:re,errorCaptured:q,serverPrefetch:Q,expose:se,inheritAttrs:Ve,components:Ge,directives:ft,filters:cn}=e;if(l&&YE(l,r,null),o)for(const _e in o){const fe=o[_e];te(fe)&&(r[_e]=fe.bind(n))}if(s){const _e=s.call(n,n);Te(_e)&&(t.data=rn(_e))}if(Jc=!0,i)for(const _e in i){const fe=i[_e],bt=te(fe)?fe.bind(n,n):te(fe.get)?fe.get.bind(n,n):Dt,ge=!te(fe)&&te(fe.set)?fe.set.bind(n):Dt,qe=oe({get:bt,set:ge});Object.defineProperty(r,_e,{enumerable:!0,configurable:!0,get:()=>qe.value,set:ke=>qe.value=ke})}if(a)for(const _e in a)tg(a[_e],r,n,_e);if(c){const _e=te(c)?c.call(n):c;Reflect.ownKeys(_e).forEach(fe=>{lr(fe,_e[fe])})}u&&Bh(u,t,"c");function he(_e,fe){K(fe)?fe.forEach(bt=>_e(bt.bind(n))):fe&&_e(fe.bind(n))}if(he(ru,h),he(FE,d),he($E,f),he(UE,m),he(xE,v),he(ME,y),he(HE,q),he(qE,W),he(BE,re),he(Jp,C),he(Xp,N),he(jE,Q),K(se))if(se.length){const _e=t.exposed||(t.exposed={});se.forEach(fe=>{Object.defineProperty(_e,fe,{get:()=>n[fe],set:bt=>n[fe]=bt})})}else t.exposed||(t.exposed={});G&&t.render===Dt&&(t.render=G),Ve!=null&&(t.inheritAttrs=Ve),Ge&&(t.components=Ge),ft&&(t.directives=ft)}function YE(t,e,n=Dt){K(t)&&(t=Xc(t));for(const r in t){const s=t[r];let i;Te(s)?"default"in s?i=_t(s.from||r,s.default,!0):i=_t(s.from||r):i=_t(s),Re(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Bh(t,e,n){Nt(K(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function tg(t,e,n,r){const s=r.includes(".")?Gp(n,r):()=>n[r];if(Be(t)){const i=e[t];te(i)&&Vt(s,i)}else if(te(t))Vt(s,t.bind(n));else if(Te(t))if(K(t))t.forEach(i=>tg(i,e,n,r));else{const i=te(t.handler)?t.handler.bind(n):e[t.handler];te(i)&&Vt(s,i,t)}}function su(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let c;return a?c=a:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(l=>Do(c,l,o,!0)),Do(c,e,o)),Te(e)&&i.set(e,c),c}function Do(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Do(t,i,n,!0),s&&s.forEach(o=>Do(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=JE[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const JE={data:qh,props:Hh,emits:Hh,methods:Ds,computed:Ds,beforeCreate:ut,created:ut,beforeMount:ut,mounted:ut,beforeUpdate:ut,updated:ut,beforeDestroy:ut,beforeUnmount:ut,destroyed:ut,unmounted:ut,activated:ut,deactivated:ut,errorCaptured:ut,serverPrefetch:ut,components:Ds,directives:Ds,watch:ZE,provide:qh,inject:XE};function qh(t,e){return e?t?function(){return ze(te(t)?t.call(this,this):t,te(e)?e.call(this,this):e)}:e:t}function XE(t,e){return Ds(Xc(t),Xc(e))}function Xc(t){if(K(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function ut(t,e){return t?[...new Set([].concat(t,e))]:e}function Ds(t,e){return t?ze(Object.create(null),t,e):e}function Hh(t,e){return t?K(t)&&K(e)?[...new Set([...t,...e])]:ze(Object.create(null),jh(t),jh(e??{})):e}function ZE(t,e){if(!t)return e;if(!e)return t;const n=ze(Object.create(null),t);for(const r in e)n[r]=ut(t[r],e[r]);return n}function ng(){return{app:null,config:{isNativeTag:Tv,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let eI=0;function tI(t,e){return function(r,s=null){te(r)||(r=ze({},r)),s!=null&&!Te(s)&&(s=null);const i=ng(),o=new Set;let a=!1;const c=i.app={_uid:eI++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:bI,get config(){return i.config},set config(l){},use(l,...u){return o.has(l)||(l&&te(l.install)?(o.add(l),l.install(c,...u)):te(l)&&(o.add(l),l(c,...u))),c},mixin(l){return i.mixins.includes(l)||i.mixins.push(l),c},component(l,u){return u?(i.components[l]=u,c):i.components[l]},directive(l,u){return u?(i.directives[l]=u,c):i.directives[l]},mount(l,u,h){if(!a){const d=Fe(r,s);return d.appContext=i,u&&e?e(d,l):t(d,l,h),a=!0,c._container=l,l.__vue_app__=c,_a(d.component)||d.component.proxy}},unmount(){a&&(t(null,c._container),delete c._container.__vue_app__)},provide(l,u){return i.provides[l]=u,c},runWithContext(l){ii=c;try{return l()}finally{ii=null}}};return c}}let ii=null;function lr(t,e){if($e){let n=$e.provides;const r=$e.parent&&$e.parent.provides;r===n&&(n=$e.provides=Object.create(r)),n[t]=e}}function _t(t,e,n=!1){const r=$e||mt;if(r||ii){const s=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:ii._context.provides;if(s&&t in s)return s[t];if(arguments.length>1)return n&&te(e)?e.call(r&&r.proxy):e}}function nI(){return!!($e||mt||ii)}function rI(t,e,n,r=!1){const s={},i={};bo(i,ma,1),t.propsDefaults=Object.create(null),rg(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Np(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function sI(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=ue(s),[c]=t.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(da(t.emitsOptions,d))continue;const f=e[d];if(c)if(de(i,d))f!==i[d]&&(i[d]=f,l=!0);else{const m=nn(d);s[m]=Zc(c,a,m,f,t,!1)}else f!==i[d]&&(i[d]=f,l=!0)}}}else{rg(t,e,s,i)&&(l=!0);let u;for(const h in a)(!e||!de(e,h)&&((u=ps(h))===h||!de(e,u)))&&(c?n&&(n[h]!==void 0||n[u]!==void 0)&&(s[h]=Zc(c,a,h,void 0,t,!0)):delete s[h]);if(i!==a)for(const h in i)(!e||!de(e,h))&&(delete i[h],l=!0)}l&&mn(t,"set","$attrs")}function rg(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(fo(c))continue;const l=e[c];let u;s&&de(s,u=nn(c))?!i||!i.includes(u)?n[u]=l:(a||(a={}))[u]=l:da(t.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(i){const c=ue(n),l=a||Pe;for(let u=0;u<i.length;u++){const h=i[u];n[h]=Zc(s,c,h,l[h],t,!de(l,h))}}return o}function Zc(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=de(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&te(c)){const{propsDefaults:l}=s;n in l?r=l[n]:(es(s),r=l[n]=c.call(null,e),ur())}else r=c}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===ps(n))&&(r=!0))}return r}function sg(t,e,n=!1){const r=e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let c=!1;if(!te(t)){const u=h=>{c=!0;const[d,f]=sg(h,e,!0);ze(o,d),f&&a.push(...f)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!c)return Te(t)&&r.set(t,Hr),Hr;if(K(i))for(let u=0;u<i.length;u++){const h=nn(i[u]);zh(h)&&(o[h]=Pe)}else if(i)for(const u in i){const h=nn(u);if(zh(h)){const d=i[u],f=o[h]=K(d)||te(d)?{type:d}:ze({},d);if(f){const m=Gh(Boolean,f.type),v=Gh(String,f.type);f[0]=m>-1,f[1]=v<0||m<v,(m>-1||de(f,"default"))&&a.push(h)}}}const l=[o,a];return Te(t)&&r.set(t,l),l}function zh(t){return t[0]!=="$"}function Kh(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function Wh(t,e){return Kh(t)===Kh(e)}function Gh(t,e){return K(e)?e.findIndex(n=>Wh(n,t)):te(e)&&Wh(e,t)?0:-1}const ig=t=>t[0]==="_"||t==="$stable",iu=t=>K(t)?t.map(zt):[zt(t)],iI=(t,e,n)=>{if(e._n)return e;const r=Kp((...s)=>iu(e(...s)),n);return r._c=!1,r},og=(t,e,n)=>{const r=t._ctx;for(const s in t){if(ig(s))continue;const i=t[s];if(te(i))e[s]=iI(s,i,r);else if(i!=null){const o=iu(i);e[s]=()=>o}}},ag=(t,e)=>{const n=iu(e);t.slots.default=()=>n},oI=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=ue(e),bo(e,"_",n)):og(e,t.slots={})}else t.slots={},e&&ag(t,e);bo(t.slots,ma,1)},aI=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Pe;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:(ze(s,e),!n&&a===1&&delete s._):(i=!e.$stable,og(e,s)),o=e}else e&&(ag(t,e),o={default:1});if(i)for(const a in s)!ig(a)&&!(a in o)&&delete s[a]};function el(t,e,n,r,s=!1){if(K(t)){t.forEach((d,f)=>el(d,e&&(K(e)?e[f]:e),n,r,s));return}if(go(r)&&!s)return;const i=r.shapeFlag&4?_a(r.component)||r.component.proxy:r.el,o=s?null:i,{i:a,r:c}=t,l=e&&e.r,u=a.refs===Pe?a.refs={}:a.refs,h=a.setupState;if(l!=null&&l!==c&&(Be(l)?(u[l]=null,de(h,l)&&(h[l]=null)):Re(l)&&(l.value=null)),te(c))Vn(c,a,12,[o,u]);else{const d=Be(c),f=Re(c);if(d||f){const m=()=>{if(t.f){const v=d?de(h,c)?h[c]:u[c]:c.value;s?K(v)&&Kl(v,i):K(v)?v.includes(i)||v.push(i):d?(u[c]=[i],de(h,c)&&(h[c]=u[c])):(c.value=[i],t.k&&(u[t.k]=c.value))}else d?(u[c]=o,de(h,c)&&(h[c]=o)):f&&(c.value=o,t.k&&(u[t.k]=o))};o?(m.id=-1,pt(m,n)):m()}}}const pt=NE;function cI(t){return lI(t)}function lI(t,e){const n=zc();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=Dt,insertStaticContent:m}=t,v=(p,g,_,E=null,w=null,R=null,V=!1,b=null,k=!!g.dynamicChildren)=>{if(p===g)return;p&&!Ps(p,g)&&(E=I(p),ke(p,w,R,!0),p=null),g.patchFlag===-2&&(k=!1,g.dynamicChildren=null);const{type:S,ref:j,shapeFlag:L}=g;switch(S){case ga:y(p,g,_,E);break;case pr:T(p,g,_,E);break;case mo:p==null&&C(g,_,E,V);break;case Ht:Ge(p,g,_,E,w,R,V,b,k);break;default:L&1?G(p,g,_,E,w,R,V,b,k):L&6?ft(p,g,_,E,w,R,V,b,k):(L&64||L&128)&&S.process(p,g,_,E,w,R,V,b,k,O)}j!=null&&w&&el(j,p&&p.ref,R,g||p,!g)},y=(p,g,_,E)=>{if(p==null)r(g.el=a(g.children),_,E);else{const w=g.el=p.el;g.children!==p.children&&l(w,g.children)}},T=(p,g,_,E)=>{p==null?r(g.el=c(g.children||""),_,E):g.el=p.el},C=(p,g,_,E)=>{[p.el,p.anchor]=m(p.children,g,_,E,p.el,p.anchor)},F=({el:p,anchor:g},_,E)=>{let w;for(;p&&p!==g;)w=d(p),r(p,_,E),p=w;r(g,_,E)},N=({el:p,anchor:g})=>{let _;for(;p&&p!==g;)_=d(p),s(p),p=_;s(g)},G=(p,g,_,E,w,R,V,b,k)=>{V=V||g.type==="svg",p==null?W(g,_,E,w,R,V,b,k):Q(p,g,w,R,V,b,k)},W=(p,g,_,E,w,R,V,b)=>{let k,S;const{type:j,props:L,shapeFlag:B,transition:Z,dirs:ie}=p;if(k=p.el=o(p.type,R,L&&L.is,L),B&8?u(k,p.children):B&16&&q(p.children,k,null,E,w,R&&j!=="foreignObject",V,b),ie&&Qn(p,null,E,"created"),re(k,p,p.scopeId,V,E),L){for(const Ie in L)Ie!=="value"&&!fo(Ie)&&i(k,Ie,null,L[Ie],R,p.children,E,w,Xe);"value"in L&&i(k,"value",null,L.value),(S=L.onVnodeBeforeMount)&&Bt(S,E,p)}ie&&Qn(p,null,E,"beforeMount");const Ae=(!w||w&&!w.pendingBranch)&&Z&&!Z.persisted;Ae&&Z.beforeEnter(k),r(k,g,_),((S=L&&L.onVnodeMounted)||Ae||ie)&&pt(()=>{S&&Bt(S,E,p),Ae&&Z.enter(k),ie&&Qn(p,null,E,"mounted")},w)},re=(p,g,_,E,w)=>{if(_&&f(p,_),E)for(let R=0;R<E.length;R++)f(p,E[R]);if(w){let R=w.subTree;if(g===R){const V=w.vnode;re(p,V,V.scopeId,V.slotScopeIds,w.parent)}}},q=(p,g,_,E,w,R,V,b,k=0)=>{for(let S=k;S<p.length;S++){const j=p[S]=b?Pn(p[S]):zt(p[S]);v(null,j,g,_,E,w,R,V,b)}},Q=(p,g,_,E,w,R,V)=>{const b=g.el=p.el;let{patchFlag:k,dynamicChildren:S,dirs:j}=g;k|=p.patchFlag&16;const L=p.props||Pe,B=g.props||Pe;let Z;_&&Yn(_,!1),(Z=B.onVnodeBeforeUpdate)&&Bt(Z,_,g,p),j&&Qn(g,p,_,"beforeUpdate"),_&&Yn(_,!0);const ie=w&&g.type!=="foreignObject";if(S?se(p.dynamicChildren,S,b,_,E,ie,R):V||fe(p,g,b,null,_,E,ie,R,!1),k>0){if(k&16)Ve(b,g,L,B,_,E,w);else if(k&2&&L.class!==B.class&&i(b,"class",null,B.class,w),k&4&&i(b,"style",L.style,B.style,w),k&8){const Ae=g.dynamicProps;for(let Ie=0;Ie<Ae.length;Ie++){const xe=Ae[Ie],Ct=L[xe],Vr=B[xe];(Vr!==Ct||xe==="value")&&i(b,xe,Ct,Vr,w,p.children,_,E,Xe)}}k&1&&p.children!==g.children&&u(b,g.children)}else!V&&S==null&&Ve(b,g,L,B,_,E,w);((Z=B.onVnodeUpdated)||j)&&pt(()=>{Z&&Bt(Z,_,g,p),j&&Qn(g,p,_,"updated")},E)},se=(p,g,_,E,w,R,V)=>{for(let b=0;b<g.length;b++){const k=p[b],S=g[b],j=k.el&&(k.type===Ht||!Ps(k,S)||k.shapeFlag&70)?h(k.el):_;v(k,S,j,null,E,w,R,V,!0)}},Ve=(p,g,_,E,w,R,V)=>{if(_!==E){if(_!==Pe)for(const b in _)!fo(b)&&!(b in E)&&i(p,b,_[b],null,V,g.children,w,R,Xe);for(const b in E){if(fo(b))continue;const k=E[b],S=_[b];k!==S&&b!=="value"&&i(p,b,S,k,V,g.children,w,R,Xe)}"value"in E&&i(p,"value",_.value,E.value)}},Ge=(p,g,_,E,w,R,V,b,k)=>{const S=g.el=p?p.el:a(""),j=g.anchor=p?p.anchor:a("");let{patchFlag:L,dynamicChildren:B,slotScopeIds:Z}=g;Z&&(b=b?b.concat(Z):Z),p==null?(r(S,_,E),r(j,_,E),q(g.children,_,j,w,R,V,b,k)):L>0&&L&64&&B&&p.dynamicChildren?(se(p.dynamicChildren,B,_,w,R,V,b),(g.key!=null||w&&g===w.subTree)&&cg(p,g,!0)):fe(p,g,_,j,w,R,V,b,k)},ft=(p,g,_,E,w,R,V,b,k)=>{g.slotScopeIds=b,p==null?g.shapeFlag&512?w.ctx.activate(g,_,E,V,k):cn(g,_,E,w,R,V,k):lt(p,g,k)},cn=(p,g,_,E,w,R,V)=>{const b=p.component=yI(p,E,w);if(Qp(p)&&(b.ctx.renderer=O),EI(b),b.asyncDep){if(w&&w.registerDep(b,he),!p.el){const k=b.subTree=Fe(pr);T(null,k,g,_)}return}he(b,p,g,_,w,R,V)},lt=(p,g,_)=>{const E=g.component=p.component;if(kE(p,g,_))if(E.asyncDep&&!E.asyncResolved){_e(E,g,_);return}else E.next=g,wE(E.update),E.update();else g.el=p.el,E.vnode=g},he=(p,g,_,E,w,R,V)=>{const b=()=>{if(p.isMounted){let{next:j,bu:L,u:B,parent:Z,vnode:ie}=p,Ae=j,Ie;Yn(p,!1),j?(j.el=ie.el,_e(p,j,V)):j=ie,L&&po(L),(Ie=j.props&&j.props.onVnodeBeforeUpdate)&&Bt(Ie,Z,j,ie),Yn(p,!0);const xe=cc(p),Ct=p.subTree;p.subTree=xe,v(Ct,xe,h(Ct.el),I(Ct),p,w,R),j.el=xe.el,Ae===null&&OE(p,xe.el),B&&pt(B,w),(Ie=j.props&&j.props.onVnodeUpdated)&&pt(()=>Bt(Ie,Z,j,ie),w)}else{let j;const{el:L,props:B}=g,{bm:Z,m:ie,parent:Ae}=p,Ie=go(g);if(Yn(p,!1),Z&&po(Z),!Ie&&(j=B&&B.onVnodeBeforeMount)&&Bt(j,Ae,g),Yn(p,!0),L&&me){const xe=()=>{p.subTree=cc(p),me(L,p.subTree,p,w,null)};Ie?g.type.__asyncLoader().then(()=>!p.isUnmounted&&xe()):xe()}else{const xe=p.subTree=cc(p);v(null,xe,_,E,p,w,R),g.el=xe.el}if(ie&&pt(ie,w),!Ie&&(j=B&&B.onVnodeMounted)){const xe=g;pt(()=>Bt(j,Ae,xe),w)}(g.shapeFlag&256||Ae&&go(Ae.vnode)&&Ae.vnode.shapeFlag&256)&&p.a&&pt(p.a,w),p.isMounted=!0,g=_=E=null}},k=p.effect=new Ql(b,()=>nu(S),p.scope),S=p.update=()=>k.run();S.id=p.uid,Yn(p,!0),S()},_e=(p,g,_)=>{g.component=p;const E=p.vnode.props;p.vnode=g,p.next=null,sI(p,g.props,E,_),aI(p,g.children,_),gs(),Fh(),ms()},fe=(p,g,_,E,w,R,V,b,k=!1)=>{const S=p&&p.children,j=p?p.shapeFlag:0,L=g.children,{patchFlag:B,shapeFlag:Z}=g;if(B>0){if(B&128){ge(S,L,_,E,w,R,V,b,k);return}else if(B&256){bt(S,L,_,E,w,R,V,b,k);return}}Z&8?(j&16&&Xe(S,w,R),L!==S&&u(_,L)):j&16?Z&16?ge(S,L,_,E,w,R,V,b,k):Xe(S,w,R,!0):(j&8&&u(_,""),Z&16&&q(L,_,E,w,R,V,b,k))},bt=(p,g,_,E,w,R,V,b,k)=>{p=p||Hr,g=g||Hr;const S=p.length,j=g.length,L=Math.min(S,j);let B;for(B=0;B<L;B++){const Z=g[B]=k?Pn(g[B]):zt(g[B]);v(p[B],Z,_,null,w,R,V,b,k)}S>j?Xe(p,w,R,!0,!1,L):q(g,_,E,w,R,V,b,k,L)},ge=(p,g,_,E,w,R,V,b,k)=>{let S=0;const j=g.length;let L=p.length-1,B=j-1;for(;S<=L&&S<=B;){const Z=p[S],ie=g[S]=k?Pn(g[S]):zt(g[S]);if(Ps(Z,ie))v(Z,ie,_,null,w,R,V,b,k);else break;S++}for(;S<=L&&S<=B;){const Z=p[L],ie=g[B]=k?Pn(g[B]):zt(g[B]);if(Ps(Z,ie))v(Z,ie,_,null,w,R,V,b,k);else break;L--,B--}if(S>L){if(S<=B){const Z=B+1,ie=Z<j?g[Z].el:E;for(;S<=B;)v(null,g[S]=k?Pn(g[S]):zt(g[S]),_,ie,w,R,V,b,k),S++}}else if(S>B)for(;S<=L;)ke(p[S],w,R,!0),S++;else{const Z=S,ie=S,Ae=new Map;for(S=ie;S<=B;S++){const Et=g[S]=k?Pn(g[S]):zt(g[S]);Et.key!=null&&Ae.set(Et.key,S)}let Ie,xe=0;const Ct=B-ie+1;let Vr=!1,Ph=0;const Rs=new Array(Ct);for(S=0;S<Ct;S++)Rs[S]=0;for(S=Z;S<=L;S++){const Et=p[S];if(xe>=Ct){ke(Et,w,R,!0);continue}let jt;if(Et.key!=null)jt=Ae.get(Et.key);else for(Ie=ie;Ie<=B;Ie++)if(Rs[Ie-ie]===0&&Ps(Et,g[Ie])){jt=Ie;break}jt===void 0?ke(Et,w,R,!0):(Rs[jt-ie]=S+1,jt>=Ph?Ph=jt:Vr=!0,v(Et,g[jt],_,null,w,R,V,b,k),xe++)}const Sh=Vr?uI(Rs):Hr;for(Ie=Sh.length-1,S=Ct-1;S>=0;S--){const Et=ie+S,jt=g[Et],bh=Et+1<j?g[Et+1].el:E;Rs[S]===0?v(null,jt,_,bh,w,R,V,b,k):Vr&&(Ie<0||S!==Sh[Ie]?qe(jt,_,bh,2):Ie--)}}},qe=(p,g,_,E,w=null)=>{const{el:R,type:V,transition:b,children:k,shapeFlag:S}=p;if(S&6){qe(p.component.subTree,g,_,E);return}if(S&128){p.suspense.move(g,_,E);return}if(S&64){V.move(p,g,_,O);return}if(V===Ht){r(R,g,_);for(let L=0;L<k.length;L++)qe(k[L],g,_,E);r(p.anchor,g,_);return}if(V===mo){F(p,g,_);return}if(E!==2&&S&1&&b)if(E===0)b.beforeEnter(R),r(R,g,_),pt(()=>b.enter(R),w);else{const{leave:L,delayLeave:B,afterLeave:Z}=b,ie=()=>r(R,g,_),Ae=()=>{L(R,()=>{ie(),Z&&Z()})};B?B(R,ie,Ae):Ae()}else r(R,g,_)},ke=(p,g,_,E=!1,w=!1)=>{const{type:R,props:V,ref:b,children:k,dynamicChildren:S,shapeFlag:j,patchFlag:L,dirs:B}=p;if(b!=null&&el(b,null,_,p,!0),j&256){g.ctx.deactivate(p);return}const Z=j&1&&B,ie=!go(p);let Ae;if(ie&&(Ae=V&&V.onVnodeBeforeUnmount)&&Bt(Ae,g,p),j&6)Gi(p.component,_,E);else{if(j&128){p.suspense.unmount(_,E);return}Z&&Qn(p,null,g,"beforeUnmount"),j&64?p.type.remove(p,g,_,w,O,E):S&&(R!==Ht||L>0&&L&64)?Xe(S,g,_,!1,!0):(R===Ht&&L&384||!w&&j&16)&&Xe(k,g,_),E&&Dr(p)}(ie&&(Ae=V&&V.onVnodeUnmounted)||Z)&&pt(()=>{Ae&&Bt(Ae,g,p),Z&&Qn(p,null,g,"unmounted")},_)},Dr=p=>{const{type:g,el:_,anchor:E,transition:w}=p;if(g===Ht){Nr(_,E);return}if(g===mo){N(p);return}const R=()=>{s(_),w&&!w.persisted&&w.afterLeave&&w.afterLeave()};if(p.shapeFlag&1&&w&&!w.persisted){const{leave:V,delayLeave:b}=w,k=()=>V(_,R);b?b(p.el,R,k):k()}else R()},Nr=(p,g)=>{let _;for(;p!==g;)_=d(p),s(p),p=_;s(g)},Gi=(p,g,_)=>{const{bum:E,scope:w,update:R,subTree:V,um:b}=p;E&&po(E),w.stop(),R&&(R.active=!1,ke(V,p,g,_)),b&&pt(b,g),pt(()=>{p.isUnmounted=!0},g),g&&g.pendingBranch&&!g.isUnmounted&&p.asyncDep&&!p.asyncResolved&&p.suspenseId===g.pendingId&&(g.deps--,g.deps===0&&g.resolve())},Xe=(p,g,_,E=!1,w=!1,R=0)=>{for(let V=R;V<p.length;V++)ke(p[V],g,_,E,w)},I=p=>p.shapeFlag&6?I(p.component.subTree):p.shapeFlag&128?p.suspense.next():d(p.anchor||p.el),x=(p,g,_)=>{p==null?g._vnode&&ke(g._vnode,null,null,!0):v(g._vnode||null,p,g,null,null,null,_),Fh(),qp(),g._vnode=p},O={p:v,um:ke,m:qe,r:Dr,mt:cn,mc:q,pc:fe,pbc:se,n:I,o:t};let $,me;return e&&([$,me]=e(O)),{render:x,hydrate:$,createApp:tI(x,$)}}function Yn({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function cg(t,e,n=!1){const r=t.children,s=e.children;if(K(r)&&K(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=Pn(s[i]),a.el=o.el),n||cg(o,a)),a.type===ga&&(a.el=o.el)}}function uI(t){const e=t.slice(),n=[0];let r,s,i,o,a;const c=t.length;for(r=0;r<c;r++){const l=t[r];if(l!==0){if(s=n[n.length-1],t[s]<l){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<l?i=a+1:o=a;l<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}const hI=t=>t.__isTeleport,Ht=Symbol.for("v-fgt"),ga=Symbol.for("v-txt"),pr=Symbol.for("v-cmt"),mo=Symbol.for("v-stc"),js=[];let Ot=null;function Wt(t=!1){js.push(Ot=t?null:[])}function dI(){js.pop(),Ot=js[js.length-1]||null}let oi=1;function Qh(t){oi+=t}function lg(t){return t.dynamicChildren=oi>0?Ot||Hr:null,dI(),oi>0&&Ot&&Ot.push(t),t}function Zn(t,e,n,r,s,i){return lg(ye(t,e,n,r,s,i,!0))}function ou(t,e,n,r,s){return lg(Fe(t,e,n,r,s,!0))}function tl(t){return t?t.__v_isVNode===!0:!1}function Ps(t,e){return t.type===e.type&&t.key===e.key}const ma="__vInternal",ug=({key:t})=>t??null,_o=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Be(t)||Re(t)||te(t)?{i:mt,r:t,k:e,f:!!n}:t:null);function ye(t,e=null,n=null,r=0,s=null,i=t===Ht?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&ug(e),ref:e&&_o(e),scopeId:fa,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:mt};return a?(au(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Be(n)?8:16),oi>0&&!o&&Ot&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Ot.push(c),c}const Fe=fI;function fI(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===zE)&&(t=pr),tl(t)){const a=Zr(t,e,!0);return n&&au(a,n),oi>0&&!i&&Ot&&(a.shapeFlag&6?Ot[Ot.indexOf(t)]=a:Ot.push(a)),a.patchFlag|=-2,a}if(RI(t)&&(t=t.__vccOpts),e){e=pI(e);let{class:a,style:c}=e;a&&!Be(a)&&(e.class=hn(a)),Te(c)&&(xp(c)&&!K(c)&&(c=ze({},c)),e.style=Kr(c))}const o=Be(t)?1:DE(t)?128:hI(t)?64:Te(t)?4:te(t)?2:0;return ye(t,e,n,r,s,o,i,!0)}function pI(t){return t?xp(t)||ma in t?ze({},t):t:null}function Zr(t,e,n=!1){const{props:r,ref:s,patchFlag:i,children:o}=t,a=e?gI(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:a,key:a&&ug(a),ref:e&&e.ref?n&&s?K(s)?s.concat(_o(e)):[s,_o(e)]:_o(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ht?i===-1?16:i|16:i,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Zr(t.ssContent),ssFallback:t.ssFallback&&Zr(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function hg(t=" ",e=0){return Fe(ga,null,t,e)}function BO(t,e){const n=Fe(mo,null,t);return n.staticCount=e,n}function no(t="",e=!1){return e?(Wt(),ou(pr,null,t)):Fe(pr,null,t)}function zt(t){return t==null||typeof t=="boolean"?Fe(pr):K(t)?Fe(Ht,null,t.slice()):typeof t=="object"?Pn(t):Fe(ga,null,String(t))}function Pn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Zr(t)}function au(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(K(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),au(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!(ma in e)?e._ctx=mt:s===3&&mt&&(mt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else te(e)?(e={default:e,_ctx:mt},n=32):(e=String(e),r&64?(n=16,e=[hg(e)]):n=8);t.children=e,t.shapeFlag|=n}function gI(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=hn([e.class,r.class]));else if(s==="style")e.style=Kr([e.style,r.style]);else if(sa(s)){const i=e[s],o=r[s];o&&i!==o&&!(K(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Bt(t,e,n,r=null){Nt(t,e,7,[n,r])}const mI=ng();let _I=0;function yI(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||mI,i={uid:_I++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new Ep(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:sg(r,s),emitsOptions:zp(r,s),emit:null,emitted:null,propsDefaults:Pe,inheritAttrs:r.inheritAttrs,ctx:Pe,data:Pe,props:Pe,attrs:Pe,slots:Pe,refs:Pe,setupState:Pe,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=RE.bind(null,i),t.ce&&t.ce(i),i}let $e=null;const vI=()=>$e||mt;let cu,xr,Yh="__VUE_INSTANCE_SETTERS__";(xr=zc()[Yh])||(xr=zc()[Yh]=[]),xr.push(t=>$e=t),cu=t=>{xr.length>1?xr.forEach(e=>e(t)):xr[0](t)};const es=t=>{cu(t),t.scope.on()},ur=()=>{$e&&$e.scope.off(),cu(null)};function dg(t){return t.vnode.shapeFlag&4}let ai=!1;function EI(t,e=!1){ai=e;const{props:n,children:r}=t.vnode,s=dg(t);rI(t,n,s,e),oI(t,r);const i=s?II(t,e):void 0;return ai=!1,i}function II(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=ua(new Proxy(t.ctx,GE));const{setup:r}=n;if(r){const s=t.setupContext=r.length>1?TI(t):null;es(t),gs();const i=Vn(r,t,0,[t.props,s]);if(ms(),ur(),pp(i)){if(i.then(ur,ur),e)return i.then(o=>{Jh(t,o,e)}).catch(o=>{ha(o,t,0)});t.asyncDep=i}else Jh(t,i,e)}else fg(t,e)}function Jh(t,e,n){te(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Te(e)&&(t.setupState=$p(e)),fg(t,n)}let Xh;function fg(t,e,n){const r=t.type;if(!t.render){if(!e&&Xh&&!r.render){const s=r.template||su(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:a,compilerOptions:c}=r,l=ze(ze({isCustomElement:i,delimiters:a},o),c);r.render=Xh(s,l)}}t.render=r.render||Dt}es(t),gs(),QE(t),ms(),ur()}function wI(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return vt(t,"get","$attrs"),e[n]}}))}function TI(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return wI(t)},slots:t.slots,emit:t.emit,expose:e}}function _a(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy($p(ua(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Us)return Us[n](t)},has(e,n){return n in e||n in Us}}))}function AI(t,e=!0){return te(t)?t.displayName||t.name:t.name||e&&t.__name}function RI(t){return te(t)&&"__vccOpts"in t}const oe=(t,e)=>vE(t,e,ai);function pg(t,e,n){const r=arguments.length;return r===2?Te(e)&&!K(e)?tl(e)?Fe(t,null,[e]):Fe(t,e):Fe(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&tl(n)&&(n=[n]),Fe(t,e,n))}const PI=Symbol.for("v-scx"),SI=()=>_t(PI),bI="3.3.4",CI="http://www.w3.org/2000/svg",er=typeof document<"u"?document:null,Zh=er&&er.createElement("template"),kI={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e?er.createElementNS(CI,t):er.createElement(t,n?{is:n}:void 0);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>er.createTextNode(t),createComment:t=>er.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>er.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Zh.innerHTML=r?`<svg>${t}</svg>`:t;const a=Zh.content;if(r){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function OI(t,e,n){const r=t._vtc;r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function DI(t,e,n){const r=t.style,s=Be(n);if(n&&!s){if(e&&!Be(e))for(const i in e)n[i]==null&&nl(r,i,"");for(const i in n)nl(r,i,n[i])}else{const i=r.display;s?e!==n&&(r.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(r.display=i)}}const ed=/\s*!important$/;function nl(t,e,n){if(K(n))n.forEach(r=>nl(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=NI(t,e);ed.test(n)?t.setProperty(ps(r),n.replace(ed,""),"important"):t[r]=n}}const td=["Webkit","Moz","ms"],uc={};function NI(t,e){const n=uc[e];if(n)return n;let r=nn(e);if(r!=="filter"&&r in t)return uc[e]=r;r=aa(r);for(let s=0;s<td.length;s++){const i=td[s]+r;if(i in t)return uc[e]=i}return e}const nd="http://www.w3.org/1999/xlink";function VI(t,e,n,r,s){if(r&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(nd,e.slice(6,e.length)):t.setAttributeNS(nd,e,n);else{const i=Vv(e);n==null||i&&!_p(n)?t.removeAttribute(e):t.setAttribute(e,i?"":n)}}function xI(t,e,n,r,s,i,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,s,i),t[e]=n??"";return}const a=t.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){t._value=n;const l=a==="OPTION"?t.getAttribute("value"):t.value,u=n??"";l!==u&&(t.value=u),n==null&&t.removeAttribute(e);return}let c=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=_p(n):n==null&&l==="string"?(n="",c=!0):l==="number"&&(n=0,c=!0)}try{t[e]=n}catch{}c&&t.removeAttribute(e)}function tr(t,e,n,r){t.addEventListener(e,n,r)}function MI(t,e,n,r){t.removeEventListener(e,n,r)}function LI(t,e,n,r,s=null){const i=t._vei||(t._vei={}),o=i[e];if(r&&o)o.value=r;else{const[a,c]=FI(e);if(r){const l=i[e]=jI(r,s);tr(t,a,l,c)}else o&&(MI(t,a,o,c),i[e]=void 0)}}const rd=/(?:Once|Passive|Capture)$/;function FI(t){let e;if(rd.test(t)){e={};let r;for(;r=t.match(rd);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):ps(t.slice(2)),e]}let hc=0;const $I=Promise.resolve(),UI=()=>hc||($I.then(()=>hc=0),hc=Date.now());function jI(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Nt(BI(r,n.value),e,5,[r])};return n.value=t,n.attached=UI(),n}function BI(t,e){if(K(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const sd=/^on[a-z]/,qI=(t,e,n,r,s=!1,i,o,a,c)=>{e==="class"?OI(t,r,s):e==="style"?DI(t,n,r):sa(e)?zl(e)||LI(t,e,n,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):HI(t,e,r,s))?xI(t,e,r,i,o,a,c):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),VI(t,e,r,s))};function HI(t,e,n,r){return r?!!(e==="innerHTML"||e==="textContent"||e in t&&sd.test(e)&&te(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||sd.test(e)&&Be(n)?!1:e in t}const No=t=>{const e=t.props["onUpdate:modelValue"]||!1;return K(e)?n=>po(e,n):e};function zI(t){t.target.composing=!0}function id(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const dc={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t._assign=No(s);const i=r||s.props&&s.props.type==="number";tr(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=Hc(a)),t._assign(a)}),n&&tr(t,"change",()=>{t.value=t.value.trim()}),e||(tr(t,"compositionstart",zI),tr(t,"compositionend",id),tr(t,"change",id))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:r,number:s}},i){if(t._assign=No(i),t.composing||document.activeElement===t&&t.type!=="range"&&(n||r&&t.value.trim()===e||(s||t.type==="number")&&Hc(t.value)===e))return;const o=e??"";t.value!==o&&(t.value=o)}},KI={deep:!0,created(t,e,n){t._assign=No(n),tr(t,"change",()=>{const r=t._modelValue,s=WI(t),i=t.checked,o=t._assign;if(K(r)){const a=yp(r,s),c=a!==-1;if(i&&!c)o(r.concat(s));else if(!i&&c){const l=[...r];l.splice(a,1),o(l)}}else if(ia(r)){const a=new Set(r);i?a.add(s):a.delete(s),o(a)}else o(gg(t,i))})},mounted:od,beforeUpdate(t,e,n){t._assign=No(n),od(t,e,n)}};function od(t,{value:e,oldValue:n},r){t._modelValue=e,K(e)?t.checked=yp(e,r.props.value)>-1:ia(e)?t.checked=e.has(r.props.value):e!==n&&(t.checked=ca(e,gg(t,!0)))}function WI(t){return"_value"in t?t._value:t.value}function gg(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const GI=ze({patchProp:qI},kI);let ad;function QI(){return ad||(ad=cI(GI))}const YI=(...t)=>{const e=QI().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=JI(r);if(!s)return;const i=e._component;!te(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.innerHTML="";const o=n(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function JI(t){return Be(t)?document.querySelector(t):t}var XI=!1;/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */let mg;const ya=t=>mg=t,_g=Symbol();function rl(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var Bs;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Bs||(Bs={}));function ZI(){const t=Ip(!0),e=t.run(()=>we({}));let n=[],r=[];const s=ua({install(i){ya(s),s._a=i,i.provide(_g,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!XI?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const yg=()=>{};function cd(t,e,n,r=yg){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&wp()&&Lv(s),s}function Mr(t,...e){t.slice().forEach(n=>{n(...e)})}const ew=t=>t();function sl(t,e){t instanceof Map&&e instanceof Map&&e.forEach((n,r)=>t.set(r,n)),t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];rl(s)&&rl(r)&&t.hasOwnProperty(n)&&!Re(r)&&!Jt(r)?t[n]=sl(s,r):t[n]=r}return t}const tw=Symbol();function nw(t){return!rl(t)||!t.hasOwnProperty(tw)}const{assign:Rn}=Object;function rw(t){return!!(Re(t)&&t.effect)}function sw(t,e,n,r){const{state:s,actions:i,getters:o}=e,a=n.state.value[t];let c;function l(){a||(n.state.value[t]=s?s():{});const u=pE(n.state.value[t]);return Rn(u,i,Object.keys(o||{}).reduce((h,d)=>(h[d]=ua(oe(()=>{ya(n);const f=n._s.get(t);return o[d].call(f,f)})),h),{}))}return c=vg(t,l,e,n,r,!0),c}function vg(t,e,n={},r,s,i){let o;const a=Rn({actions:{}},n),c={deep:!0};let l,u,h=[],d=[],f;const m=r.state.value[t];!i&&!m&&(r.state.value[t]={}),we({});let v;function y(q){let Q;l=u=!1,typeof q=="function"?(q(r.state.value[t]),Q={type:Bs.patchFunction,storeId:t,events:f}):(sl(r.state.value[t],q),Q={type:Bs.patchObject,payload:q,storeId:t,events:f});const se=v=Symbol();ri().then(()=>{v===se&&(l=!0)}),u=!0,Mr(h,Q,r.state.value[t])}const T=i?function(){const{state:Q}=n,se=Q?Q():{};this.$patch(Ve=>{Rn(Ve,se)})}:yg;function C(){o.stop(),h=[],d=[],r._s.delete(t)}function F(q,Q){return function(){ya(r);const se=Array.from(arguments),Ve=[],Ge=[];function ft(he){Ve.push(he)}function cn(he){Ge.push(he)}Mr(d,{args:se,name:q,store:G,after:ft,onError:cn});let lt;try{lt=Q.apply(this&&this.$id===t?this:G,se)}catch(he){throw Mr(Ge,he),he}return lt instanceof Promise?lt.then(he=>(Mr(Ve,he),he)).catch(he=>(Mr(Ge,he),Promise.reject(he))):(Mr(Ve,lt),lt)}}const N={_p:r,$id:t,$onAction:cd.bind(null,d),$patch:y,$reset:T,$subscribe(q,Q={}){const se=cd(h,q,Q.detached,()=>Ve()),Ve=o.run(()=>Vt(()=>r.state.value[t],Ge=>{(Q.flush==="sync"?u:l)&&q({storeId:t,type:Bs.direct,events:f},Ge)},Rn({},c,Q)));return se},$dispose:C},G=rn(N);r._s.set(t,G);const W=r._a&&r._a.runWithContext||ew,re=r._e.run(()=>(o=Ip(),W(()=>o.run(e))));for(const q in re){const Q=re[q];if(Re(Q)&&!rw(Q)||Jt(Q))i||(m&&nw(Q)&&(Re(Q)?Q.value=m[q]:sl(Q,m[q])),r.state.value[t][q]=Q);else if(typeof Q=="function"){const se=F(q,Q);re[q]=se,a.actions[q]=Q}}return Rn(G,re),Rn(ue(G),re),Object.defineProperty(G,"$state",{get:()=>r.state.value[t],set:q=>{y(Q=>{Rn(Q,q)})}}),r._p.forEach(q=>{Rn(G,o.run(()=>q({store:G,app:r._a,pinia:r,options:a})))}),m&&i&&n.hydrate&&n.hydrate(G.$state,m),l=!0,u=!0,G}function iw(t,e,n){let r,s;const i=typeof e=="function";typeof t=="string"?(r=t,s=i?n:e):(s=t,r=t.id);function o(a,c){const l=nI();return a=a||(l?_t(_g,null):null),a&&ya(a),a=mg,a._s.has(r)||(i?vg(r,e,s,a):sw(r,s,a)),a._s.get(r)}return o.$id=r,o}function qO(t){{t=ue(t);const e={};for(const n in t){const r=t[n];(Re(r)||Jt(r))&&(e[n]=_E(t,n))}return e}}/**
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
 */const Eg=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ow=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Ig={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=i>>2,h=(i&3)<<4|a>>4;let d=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(d=64)),r.push(n[u],n[h],n[d],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Eg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ow(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||l==null||h==null)throw new aw;const d=i<<2|a>>4;if(r.push(d),l!==64){const f=a<<4&240|l>>2;if(r.push(f),h!==64){const m=l<<6&192|h;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class aw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const cw=function(t){const e=Eg(t);return Ig.encodeByteArray(e,!0)},Vo=function(t){return cw(t).replace(/\./g,"")},wg=function(t){try{return Ig.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function lw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const uw=()=>lw().__FIREBASE_DEFAULTS__,hw=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},dw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&wg(t[1]);return e&&JSON.parse(e)},lu=()=>{try{return uw()||hw()||dw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Tg=t=>{var e,n;return(n=(e=lu())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},fw=t=>{const e=Tg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Ag=()=>{var t;return(t=lu())===null||t===void 0?void 0:t.config},Rg=t=>{var e;return(e=lu())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class pw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function gw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),a="";return[Vo(JSON.stringify(n)),Vo(JSON.stringify(o)),a].join(".")}/**
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
 */function at(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function mw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(at())}function Pg(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function _w(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function yw(){const t=at();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Sg(){try{return typeof indexedDB=="object"}catch{return!1}}function bg(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function vw(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Ew="FirebaseError";class Ut extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Ew,Object.setPrototypeOf(this,Ut.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ar.prototype.create)}}class Ar{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Iw(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ut(s,a,r)}}function Iw(t,e){return t.replace(ww,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const ww=/\{\$([^}]+)}/g;function Tw(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ci(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(ld(i)&&ld(o)){if(!ci(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ld(t){return t!==null&&typeof t=="object"}/**
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
 */function Ci(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ns(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Vs(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Aw(t,e){const n=new Rw(t,e);return n.subscribe.bind(n)}class Rw{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Pw(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=fc),s.error===void 0&&(s.error=fc),s.complete===void 0&&(s.complete=fc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Pw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function fc(){}/**
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
 */const Sw=1e3,bw=2,Cw=4*60*60*1e3,kw=.5;function ud(t,e=Sw,n=bw){const r=e*Math.pow(n,t),s=Math.round(kw*r*(Math.random()-.5)*2);return Math.min(Cw,r+s)}/**
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
 */function Ne(t){return t&&t._delegate?t._delegate:t}class Lt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Jn="[DEFAULT]";/**
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
 */class Ow{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new pw;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Nw(e))try{this.getOrInitializeService({instanceIdentifier:Jn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Jn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Jn){return this.instances.has(e)}getOptions(e=Jn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Dw(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Jn){return this.component?this.component.multipleInstances?e:Jn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Dw(t){return t===Jn?void 0:t}function Nw(t){return t.instantiationMode==="EAGER"}/**
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
 */class Vw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Ow(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ce;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ce||(ce={}));const xw={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},Mw=ce.INFO,Lw={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},Fw=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Lw[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class va{constructor(e){this.name=e,this._logLevel=Mw,this._logHandler=Fw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}}const $w=(t,e)=>e.some(n=>t instanceof n);let hd,dd;function Uw(){return hd||(hd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jw(){return dd||(dd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cg=new WeakMap,il=new WeakMap,kg=new WeakMap,pc=new WeakMap,uu=new WeakMap;function Bw(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(xn(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Cg.set(n,t)}).catch(()=>{}),uu.set(e,t),e}function qw(t){if(il.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});il.set(t,e)}let ol={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return il.get(t);if(e==="objectStoreNames")return t.objectStoreNames||kg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return xn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Hw(t){ol=t(ol)}function zw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(gc(this),e,...n);return kg.set(r,e.sort?e.sort():[e]),xn(r)}:jw().includes(t)?function(...e){return t.apply(gc(this),e),xn(Cg.get(this))}:function(...e){return xn(t.apply(gc(this),e))}}function Kw(t){return typeof t=="function"?zw(t):(t instanceof IDBTransaction&&qw(t),$w(t,Uw())?new Proxy(t,ol):t)}function xn(t){if(t instanceof IDBRequest)return Bw(t);if(pc.has(t))return pc.get(t);const e=Kw(t);return e!==t&&(pc.set(t,e),uu.set(e,t)),e}const gc=t=>uu.get(t);function Ww(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=xn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(xn(o.result),c.oldVersion,c.newVersion,xn(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Gw=["get","getKey","getAll","getAllKeys","count"],Qw=["put","add","delete","clear"],mc=new Map;function fd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(mc.get(e))return mc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Qw.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Gw.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return mc.set(e,i),i}Hw(t=>({...t,get:(e,n,r)=>fd(e,n)||t.get(e,n,r),has:(e,n)=>!!fd(e,n)||t.has(e,n)}));/**
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
 */class Yw{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Jw(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Jw(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const al="@firebase/app",pd="0.9.19";/**
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
 */const gr=new va("@firebase/app"),Xw="@firebase/app-compat",Zw="@firebase/analytics-compat",eT="@firebase/analytics",tT="@firebase/app-check-compat",nT="@firebase/app-check",rT="@firebase/auth",sT="@firebase/auth-compat",iT="@firebase/database",oT="@firebase/database-compat",aT="@firebase/functions",cT="@firebase/functions-compat",lT="@firebase/installations",uT="@firebase/installations-compat",hT="@firebase/messaging",dT="@firebase/messaging-compat",fT="@firebase/performance",pT="@firebase/performance-compat",gT="@firebase/remote-config",mT="@firebase/remote-config-compat",_T="@firebase/storage",yT="@firebase/storage-compat",vT="@firebase/firestore",ET="@firebase/firestore-compat",IT="firebase",wT="10.4.0";/**
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
 */const cl="[DEFAULT]",TT={[al]:"fire-core",[Xw]:"fire-core-compat",[eT]:"fire-analytics",[Zw]:"fire-analytics-compat",[nT]:"fire-app-check",[tT]:"fire-app-check-compat",[rT]:"fire-auth",[sT]:"fire-auth-compat",[iT]:"fire-rtdb",[oT]:"fire-rtdb-compat",[aT]:"fire-fn",[cT]:"fire-fn-compat",[lT]:"fire-iid",[uT]:"fire-iid-compat",[hT]:"fire-fcm",[dT]:"fire-fcm-compat",[fT]:"fire-perf",[pT]:"fire-perf-compat",[gT]:"fire-rc",[mT]:"fire-rc-compat",[_T]:"fire-gcs",[yT]:"fire-gcs-compat",[vT]:"fire-fst",[ET]:"fire-fst-compat","fire-js":"fire-js",[IT]:"fire-js-all"};/**
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
 */const xo=new Map,ll=new Map;function AT(t,e){try{t.container.addComponent(e)}catch(n){gr.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function sn(t){const e=t.name;if(ll.has(e))return gr.debug(`There were multiple attempts to register component ${e}.`),!1;ll.set(e,t);for(const n of xo.values())AT(n,t);return!0}function Rr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const RT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Mn=new Ar("app","Firebase",RT);/**
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
 */class PT{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Lt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Mn.create("app-deleted",{appName:this._name})}}/**
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
 */const _s=wT;function Og(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:cl,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Mn.create("bad-app-name",{appName:String(s)});if(n||(n=Ag()),!n)throw Mn.create("no-options");const i=xo.get(s);if(i){if(ci(n,i.options)&&ci(r,i.config))return i;throw Mn.create("duplicate-app",{appName:s})}const o=new Vw(s);for(const c of ll.values())o.addComponent(c);const a=new PT(n,r,o);return xo.set(s,a),a}function hu(t=cl){const e=xo.get(t);if(!e&&t===cl&&Ag())return Og();if(!e)throw Mn.create("no-app",{appName:t});return e}function Pt(t,e,n){var r;let s=(r=TT[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),gr.warn(a.join(" "));return}sn(new Lt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const ST="firebase-heartbeat-database",bT=1,li="firebase-heartbeat-store";let _c=null;function Dg(){return _c||(_c=Ww(ST,bT,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(li)}}}).catch(t=>{throw Mn.create("idb-open",{originalErrorMessage:t.message})})),_c}async function CT(t){try{return await(await Dg()).transaction(li).objectStore(li).get(Ng(t))}catch(e){if(e instanceof Ut)gr.warn(e.message);else{const n=Mn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});gr.warn(n.message)}}}async function gd(t,e){try{const r=(await Dg()).transaction(li,"readwrite");await r.objectStore(li).put(e,Ng(t)),await r.done}catch(n){if(n instanceof Ut)gr.warn(n.message);else{const r=Mn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});gr.warn(r.message)}}}function Ng(t){return`${t.name}!${t.options.appId}`}/**
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
 */const kT=1024,OT=30*24*60*60*1e3;class DT{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new VT(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=md();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=OT}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=md(),{heartbeatsToSend:n,unsentEntries:r}=NT(this._heartbeatsCache.heartbeats),s=Vo(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function md(){return new Date().toISOString().substring(0,10)}function NT(t,e=kT){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),_d(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),_d(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class VT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Sg()?bg().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await CT(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return gd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return gd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function _d(t){return Vo(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function xT(t){sn(new Lt("platform-logger",e=>new Yw(e),"PRIVATE")),sn(new Lt("heartbeat",e=>new DT(e),"PRIVATE")),Pt(al,pd,t),Pt(al,pd,"esm2017"),Pt("fire-js","")}xT("");var MT="firebase",LT="10.4.0";/**
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
 */Pt(MT,LT,"app");var FT=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},D,du=du||{},X=FT||self;function Ea(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function ki(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function $T(t){return Object.prototype.hasOwnProperty.call(t,yc)&&t[yc]||(t[yc]=++UT)}var yc="closure_uid_"+(1e9*Math.random()>>>0),UT=0;function jT(t,e,n){return t.call.apply(t.bind,arguments)}function BT(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function st(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?st=jT:st=BT,st.apply(null,arguments)}function ro(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(this,r)}}function We(t,e){function n(){}n.prototype=e.prototype,t.$=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.ac=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function Hn(){this.s=this.s,this.o=this.o}var qT=0;Hn.prototype.s=!1;Hn.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),qT!=0)&&$T(this)};Hn.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Vg=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function fu(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function yd(t,e){for(let n=1;n<arguments.length;n++){const r=arguments[n];if(Ea(r)){const s=t.length||0,i=r.length||0;t.length=s+i;for(let o=0;o<i;o++)t[s+o]=r[o]}else t.push(r)}}function it(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}it.prototype.h=function(){this.defaultPrevented=!0};var HT=function(){if(!X.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{X.addEventListener("test",()=>{},e),X.removeEventListener("test",()=>{},e)}catch{}return t}();function ui(t){return/^[\s\xa0]*$/.test(t)}function Ia(){var t=X.navigator;return t&&(t=t.userAgent)?t:""}function Gt(t){return Ia().indexOf(t)!=-1}function pu(t){return pu[" "](t),t}pu[" "]=function(){};function zT(t,e){var n=L0;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}var KT=Gt("Opera"),ts=Gt("Trident")||Gt("MSIE"),xg=Gt("Edge"),ul=xg||ts,Mg=Gt("Gecko")&&!(Ia().toLowerCase().indexOf("webkit")!=-1&&!Gt("Edge"))&&!(Gt("Trident")||Gt("MSIE"))&&!Gt("Edge"),WT=Ia().toLowerCase().indexOf("webkit")!=-1&&!Gt("Edge");function Lg(){var t=X.document;return t?t.documentMode:void 0}var hl;e:{var vc="",Ec=function(){var t=Ia();if(Mg)return/rv:([^\);]+)(\)|;)/.exec(t);if(xg)return/Edge\/([\d\.]+)/.exec(t);if(ts)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(WT)return/WebKit\/(\S+)/.exec(t);if(KT)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(Ec&&(vc=Ec?Ec[1]:""),ts){var Ic=Lg();if(Ic!=null&&Ic>parseFloat(vc)){hl=String(Ic);break e}}hl=vc}var dl;if(X.document&&ts){var vd=Lg();dl=vd||parseInt(hl,10)||void 0}else dl=void 0;var GT=dl;function hi(t,e){if(it.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Mg){e:{try{pu(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:QT[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&hi.$.h.call(this)}}We(hi,it);var QT={2:"touch",3:"pen",4:"mouse"};hi.prototype.h=function(){hi.$.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Oi="closure_listenable_"+(1e6*Math.random()|0),YT=0;function JT(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.la=s,this.key=++YT,this.fa=this.ia=!1}function wa(t){t.fa=!0,t.listener=null,t.proxy=null,t.src=null,t.la=null}function gu(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function XT(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function Fg(t){const e={};for(const n in t)e[n]=t[n];return e}const Ed="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function $g(t,e){let n,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(n in r)t[n]=r[n];for(let i=0;i<Ed.length;i++)n=Ed[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function Ta(t){this.src=t,this.g={},this.h=0}Ta.prototype.add=function(t,e,n,r,s){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=pl(t,e,r,s);return-1<o?(e=t[o],n||(e.ia=!1)):(e=new JT(e,this.src,i,!!r,s),e.ia=n,t.push(e)),e};function fl(t,e){var n=e.type;if(n in t.g){var r=t.g[n],s=Vg(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(wa(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function pl(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.fa&&i.listener==e&&i.capture==!!n&&i.la==r)return s}return-1}var mu="closure_lm_"+(1e6*Math.random()|0),wc={};function Ug(t,e,n,r,s){if(r&&r.once)return Bg(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ug(t,e[i],n,r,s);return null}return n=vu(n),t&&t[Oi]?t.O(e,n,ki(r)?!!r.capture:!!r,s):jg(t,e,n,!1,r,s)}function jg(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=ki(s)?!!s.capture:!!s,a=yu(t);if(a||(t[mu]=a=new Ta(t)),n=a.add(e,n,r,o,i),n.proxy)return n;if(r=ZT(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)HT||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Hg(e.toString()),r);else if(t.addListener&&t.removeListener)t.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function ZT(){function t(n){return e.call(t.src,t.listener,n)}const e=e0;return t}function Bg(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Bg(t,e[i],n,r,s);return null}return n=vu(n),t&&t[Oi]?t.P(e,n,ki(r)?!!r.capture:!!r,s):jg(t,e,n,!0,r,s)}function qg(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)qg(t,e[i],n,r,s);else r=ki(r)?!!r.capture:!!r,n=vu(n),t&&t[Oi]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=pl(i,n,r,s),-1<n&&(wa(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=yu(t))&&(e=t.g[e.toString()],t=-1,e&&(t=pl(e,n,r,s)),(n=-1<t?e[t]:null)&&_u(n))}function _u(t){if(typeof t!="number"&&t&&!t.fa){var e=t.src;if(e&&e[Oi])fl(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Hg(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=yu(e))?(fl(n,t),n.h==0&&(n.src=null,e[mu]=null)):wa(t)}}}function Hg(t){return t in wc?wc[t]:wc[t]="on"+t}function e0(t,e){if(t.fa)t=!0;else{e=new hi(e,this);var n=t.listener,r=t.la||t.src;t.ia&&_u(t),t=n.call(r,e)}return t}function yu(t){return t=t[mu],t instanceof Ta?t:null}var Tc="__closure_events_fn_"+(1e9*Math.random()>>>0);function vu(t){return typeof t=="function"?t:(t[Tc]||(t[Tc]=function(e){return t.handleEvent(e)}),t[Tc])}function Ke(){Hn.call(this),this.i=new Ta(this),this.S=this,this.J=null}We(Ke,Hn);Ke.prototype[Oi]=!0;Ke.prototype.removeEventListener=function(t,e,n,r){qg(this,t,e,n,r)};function Je(t,e){var n,r=t.J;if(r)for(n=[];r;r=r.J)n.push(r);if(t=t.S,r=e.type||e,typeof e=="string")e=new it(e,t);else if(e instanceof it)e.target=e.target||t;else{var s=e;e=new it(r,t),$g(e,s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=so(o,r,!0,e)&&s}if(o=e.g=t,s=so(o,r,!0,e)&&s,s=so(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)o=e.g=n[i],s=so(o,r,!1,e)&&s}Ke.prototype.N=function(){if(Ke.$.N.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)wa(n[r]);delete t.g[e],t.h--}}this.J=null};Ke.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)};Ke.prototype.P=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};function so(t,e,n,r){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.fa&&o.capture==n){var a=o.listener,c=o.la||o.src;o.ia&&fl(t.i,o),s=a.call(c,r)!==!1&&s}}return s&&!r.defaultPrevented}var Eu=X.JSON.stringify;class t0{constructor(e,n){this.i=e,this.j=n,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function n0(){var t=Iu;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class r0{constructor(){this.h=this.g=null}add(e,n){const r=zg.get();r.set(e,n),this.h?this.h.next=r:this.g=r,this.h=r}}var zg=new t0(()=>new s0,t=>t.reset());class s0{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function i0(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function o0(t){X.setTimeout(()=>{throw t},0)}let di,fi=!1,Iu=new r0,Kg=()=>{const t=X.Promise.resolve(void 0);di=()=>{t.then(a0)}};var a0=()=>{for(var t;t=n0();){try{t.h.call(t.g)}catch(n){o0(n)}var e=zg;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}fi=!1};function Aa(t,e){Ke.call(this),this.h=t||1,this.g=e||X,this.j=st(this.qb,this),this.l=Date.now()}We(Aa,Ke);D=Aa.prototype;D.ga=!1;D.T=null;D.qb=function(){if(this.ga){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-t):(this.T&&(this.g.clearTimeout(this.T),this.T=null),Je(this,"tick"),this.ga&&(wu(this),this.start()))}};D.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function wu(t){t.ga=!1,t.T&&(t.g.clearTimeout(t.T),t.T=null)}D.N=function(){Aa.$.N.call(this),wu(this),delete this.g};function Tu(t,e,n){if(typeof t=="function")n&&(t=st(t,n));else if(t&&typeof t.handleEvent=="function")t=st(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:X.setTimeout(t,e||0)}function Wg(t){t.g=Tu(()=>{t.g=null,t.i&&(t.i=!1,Wg(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class c0 extends Hn{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Wg(this)}N(){super.N(),this.g&&(X.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pi(t){Hn.call(this),this.h=t,this.g={}}We(pi,Hn);var Id=[];function Gg(t,e,n,r){Array.isArray(n)||(n&&(Id[0]=n.toString()),n=Id);for(var s=0;s<n.length;s++){var i=Ug(e,n[s],r||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function Qg(t){gu(t.g,function(e,n){this.g.hasOwnProperty(n)&&_u(e)},t),t.g={}}pi.prototype.N=function(){pi.$.N.call(this),Qg(this)};pi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Ra(){this.g=!0}Ra.prototype.Ea=function(){this.g=!1};function l0(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+l+"&"):o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+n+`
`+o})}function u0(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+n+`
`+i+" "+o})}function qr(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+d0(t,n)+(r?" "+r:"")})}function h0(t,e){t.info(function(){return"TIMEOUT: "+e})}Ra.prototype.info=function(){};function d0(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return Eu(n)}catch{return e}}var Pr={},wd=null;function Pa(){return wd=wd||new Ke}Pr.Ta="serverreachability";function Yg(t){it.call(this,Pr.Ta,t)}We(Yg,it);function gi(t){const e=Pa();Je(e,new Yg(e))}Pr.STAT_EVENT="statevent";function Jg(t,e){it.call(this,Pr.STAT_EVENT,t),this.stat=e}We(Jg,it);function ht(t){const e=Pa();Je(e,new Jg(e,t))}Pr.Ua="timingevent";function Xg(t,e){it.call(this,Pr.Ua,t),this.size=e}We(Xg,it);function Di(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return X.setTimeout(function(){t()},e)}var Sa={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Zg={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function Au(){}Au.prototype.h=null;function Td(t){return t.h||(t.h=t.i())}function em(){}var Ni={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function Ru(){it.call(this,"d")}We(Ru,it);function Pu(){it.call(this,"c")}We(Pu,it);var gl;function ba(){}We(ba,Au);ba.prototype.g=function(){return new XMLHttpRequest};ba.prototype.i=function(){return{}};gl=new ba;function Vi(t,e,n,r){this.l=t,this.j=e,this.m=n,this.W=r||1,this.U=new pi(this),this.P=f0,t=ul?125:void 0,this.V=new Aa(t),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new tm}function tm(){this.i=null,this.g="",this.h=!1}var f0=45e3,ml={},Mo={};D=Vi.prototype;D.setTimeout=function(t){this.P=t};function _l(t,e,n){t.L=1,t.v=ka(_n(e)),t.s=n,t.S=!0,nm(t,null)}function nm(t,e){t.G=Date.now(),xi(t),t.A=_n(t.v);var n=t.A,r=t.W;Array.isArray(r)||(r=[String(r)]),um(n.i,"t",r),t.C=0,n=t.l.J,t.h=new tm,t.g=Om(t.l,n?e:null,!t.s),0<t.O&&(t.M=new c0(st(t.Pa,t,t.g),t.O)),Gg(t.U,t.g,"readystatechange",t.nb),e=t.I?Fg(t.I):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ha(t.A,t.u,t.s,e)):(t.u="GET",t.g.ha(t.A,t.u,null,e)),gi(),l0(t.j,t.u,t.A,t.m,t.W,t.s)}D.nb=function(t){t=t.target;const e=this.M;e&&Qt(t)==3?e.l():this.Pa(t)};D.Pa=function(t){try{if(t==this.g)e:{const u=Qt(this.g);var e=this.g.Ia();const h=this.g.da();if(!(3>u)&&(u!=3||ul||this.g&&(this.h.h||this.g.ja()||Sd(this.g)))){this.J||u!=4||e==7||(e==8||0>=h?gi(3):gi(2)),Ca(this);var n=this.g.da();this.ca=n;t:if(rm(this)){var r=Sd(this.g);t="";var s=r.length,i=Qt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){rr(this),qs(this);var o="";break t}this.h.i=new X.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,u0(this.j,this.u,this.A,this.m,this.W,u,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ui(a)){var l=a;break t}}l=null}if(n=l)qr(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,yl(this,n);else{this.i=!1,this.o=3,ht(12),rr(this),qs(this);break e}}this.S?(sm(this,u,o),ul&&this.i&&u==3&&(Gg(this.U,this.V,"tick",this.mb),this.V.start())):(qr(this.j,this.m,o,null),yl(this,o)),u==4&&rr(this),this.i&&!this.J&&(u==4?Sm(this.l,this):(this.i=!1,xi(this)))}else V0(this.g),n==400&&0<o.indexOf("Unknown SID")?(this.o=3,ht(12)):(this.o=0,ht(13)),rr(this),qs(this)}}}catch{}finally{}};function rm(t){return t.g?t.u=="GET"&&t.L!=2&&t.l.Ha:!1}function sm(t,e,n){let r=!0,s;for(;!t.J&&t.C<n.length;)if(s=p0(t,n),s==Mo){e==4&&(t.o=4,ht(14),r=!1),qr(t.j,t.m,null,"[Incomplete Response]");break}else if(s==ml){t.o=4,ht(15),qr(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}else qr(t.j,t.m,s,null),yl(t,s);rm(t)&&s!=Mo&&s!=ml&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,ht(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.ba&&(t.ba=!0,e=t.l,e.g==t&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),Du(e),e.M=!0,ht(11))):(qr(t.j,t.m,n,"[Invalid Chunked Response]"),rr(t),qs(t))}D.mb=function(){if(this.g){var t=Qt(this.g),e=this.g.ja();this.C<e.length&&(Ca(this),sm(this,t,e),this.i&&t!=4&&xi(this))}};function p0(t,e){var n=t.C,r=e.indexOf(`
`,n);return r==-1?Mo:(n=Number(e.substring(n,r)),isNaN(n)?ml:(r+=1,r+n>e.length?Mo:(e=e.slice(r,r+n),t.C=r+n,e)))}D.cancel=function(){this.J=!0,rr(this)};function xi(t){t.Y=Date.now()+t.P,im(t,t.P)}function im(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Di(st(t.lb,t),e)}function Ca(t){t.B&&(X.clearTimeout(t.B),t.B=null)}D.lb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(h0(this.j,this.A),this.L!=2&&(gi(),ht(17)),rr(this),this.o=2,qs(this)):im(this,this.Y-t)};function qs(t){t.l.H==0||t.J||Sm(t.l,t)}function rr(t){Ca(t);var e=t.M;e&&typeof e.sa=="function"&&e.sa(),t.M=null,wu(t.V),Qg(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.sa())}function yl(t,e){try{var n=t.l;if(n.H!=0&&(n.g==t||vl(n.i,t))){if(!t.K&&vl(n.i,t)&&n.H==3){try{var r=n.Ja.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){e:if(!n.u){if(n.g)if(n.g.G+3e3<t.G)$o(n),Va(n);else break e;Ou(n),ht(18)}}else n.Fa=s[1],0<n.Fa-n.V&&37500>s[2]&&n.G&&n.A==0&&!n.v&&(n.v=Di(st(n.ib,n),6e3));if(1>=fm(n.i)&&n.oa){try{n.oa()}catch{}n.oa=void 0}}else sr(n,11)}else if((t.K||n.g==t)&&$o(n),!ui(e))for(s=n.Ja.g.parse(e),e=0;e<s.length;e++){let l=s[e];if(n.V=l[0],l=l[1],n.H==2)if(l[0]=="c"){n.K=l[1],n.pa=l[2];const u=l[3];u!=null&&(n.ra=u,n.l.info("VER="+n.ra));const h=l[4];h!=null&&(n.Ga=h,n.l.info("SVER="+n.Ga));const d=l[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,n.L=r,n.l.info("backChannelRequestTimeoutMs_="+r)),r=n;const f=t.g;if(f){const m=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(m){var i=r.i;i.g||m.indexOf("spdy")==-1&&m.indexOf("quic")==-1&&m.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(Su(i,i.h),i.h=null))}if(r.F){const v=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;v&&(r.Da=v,Se(r.I,r.F,v))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-t.G,n.l.info("Handshake RTT: "+n.S+"ms")),r=n;var o=t;if(r.wa=km(r,r.J?r.pa:null,r.Y),o.K){pm(r.i,o);var a=o,c=r.L;c&&a.setTimeout(c),a.B&&(Ca(a),xi(a)),r.g=o}else Rm(r);0<n.j.length&&xa(n)}else l[0]!="stop"&&l[0]!="close"||sr(n,7);else n.H==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?sr(n,7):ku(n):l[0]!="noop"&&n.h&&n.h.Aa(l),n.A=0)}}gi(4)}catch{}}function g0(t){if(t.Z&&typeof t.Z=="function")return t.Z();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(Ea(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}e=[],n=0;for(r in t)e[n++]=t[r];return e}function m0(t){if(t.ta&&typeof t.ta=="function")return t.ta();if(!t.Z||typeof t.Z!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(Ea(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}function om(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(Ea(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=m0(t),r=g0(t),s=r.length,i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}var am=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _0(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function hr(t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof hr){this.h=t.h,Lo(this,t.j),this.s=t.s,this.g=t.g,Fo(this,t.m),this.l=t.l;var e=t.i,n=new mi;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),Ad(this,n),this.o=t.o}else t&&(e=String(t).match(am))?(this.h=!1,Lo(this,e[1]||"",!0),this.s=xs(e[2]||""),this.g=xs(e[3]||"",!0),Fo(this,e[4]),this.l=xs(e[5]||"",!0),Ad(this,e[6]||"",!0),this.o=xs(e[7]||"")):(this.h=!1,this.i=new mi(null,this.h))}hr.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Ms(e,Rd,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Ms(e,Rd,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(Ms(n,n.charAt(0)=="/"?E0:v0,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Ms(n,w0)),t.join("")};function _n(t){return new hr(t)}function Lo(t,e,n){t.j=n?xs(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Fo(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Ad(t,e,n){e instanceof mi?(t.i=e,T0(t.i,t.h)):(n||(e=Ms(e,I0)),t.i=new mi(e,t.h))}function Se(t,e,n){t.i.set(e,n)}function ka(t){return Se(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function xs(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Ms(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,y0),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function y0(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Rd=/[#\/\?@]/g,v0=/[#\?:]/g,E0=/[#\?]/g,I0=/[#\?@]/g,w0=/#/g;function mi(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function zn(t){t.g||(t.g=new Map,t.h=0,t.i&&_0(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}D=mi.prototype;D.add=function(t,e){zn(this),this.i=null,t=ys(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function cm(t,e){zn(t),e=ys(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function lm(t,e){return zn(t),e=ys(t,e),t.g.has(e)}D.forEach=function(t,e){zn(this),this.g.forEach(function(n,r){n.forEach(function(s){t.call(e,s,r,this)},this)},this)};D.ta=function(){zn(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const s=t[r];for(let i=0;i<s.length;i++)n.push(e[r])}return n};D.Z=function(t){zn(this);let e=[];if(typeof t=="string")lm(this,t)&&(e=e.concat(this.g.get(ys(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};D.set=function(t,e){return zn(this),this.i=null,t=ys(this,t),lm(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};D.get=function(t,e){return t?(t=this.Z(t),0<t.length?String(t[0]):e):e};function um(t,e,n){cm(t,e),0<n.length&&(t.i=null,t.g.set(ys(t,e),fu(n)),t.h+=n.length)}D.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const i=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),t.push(s)}}return this.i=t.join("&")};function ys(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function T0(t,e){e&&!t.j&&(zn(t),t.i=null,t.g.forEach(function(n,r){var s=r.toLowerCase();r!=s&&(cm(this,r),um(this,s,n))},t)),t.j=e}var A0=class{constructor(t,e){this.g=t,this.map=e}};function hm(t){this.l=t||R0,X.PerformanceNavigationTiming?(t=X.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(X.g&&X.g.Ka&&X.g.Ka()&&X.g.Ka().dc),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var R0=10;function dm(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function fm(t){return t.h?1:t.g?t.g.size:0}function vl(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Su(t,e){t.g?t.g.add(e):t.h=e}function pm(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}hm.prototype.cancel=function(){if(this.i=gm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function gm(t){if(t.h!=null)return t.i.concat(t.h.F);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.F);return e}return fu(t.i)}var P0=class{stringify(t){return X.JSON.stringify(t,void 0)}parse(t){return X.JSON.parse(t,void 0)}};function S0(){this.g=new P0}function b0(t,e,n){const r=n||"";try{om(t,function(s,i){let o=s;ki(s)&&(o=Eu(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function C0(t,e){const n=new Ra;if(X.Image){const r=new Image;r.onload=ro(io,n,r,"TestLoadImage: loaded",!0,e),r.onerror=ro(io,n,r,"TestLoadImage: error",!1,e),r.onabort=ro(io,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=ro(io,n,r,"TestLoadImage: timeout",!1,e),X.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}function io(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function Oa(t){this.l=t.ec||null,this.j=t.ob||!1}We(Oa,Au);Oa.prototype.g=function(){return new Da(this.l,this.j)};Oa.prototype.i=function(t){return function(){return t}}({});function Da(t,e){Ke.call(this),this.F=t,this.u=e,this.m=void 0,this.readyState=bu,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}We(Da,Ke);var bu=0;D=Da.prototype;D.open=function(t,e){if(this.readyState!=bu)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,_i(this)};D.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.F||X).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};D.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Mi(this)),this.readyState=bu};D.$a=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,_i(this)),this.g&&(this.readyState=3,_i(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof X.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;mm(this)}else t.text().then(this.Za.bind(this),this.ka.bind(this))};function mm(t){t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t))}D.Xa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Mi(this):_i(this),this.readyState==3&&mm(this)}};D.Za=function(t){this.g&&(this.response=this.responseText=t,Mi(this))};D.Ya=function(t){this.g&&(this.response=t,Mi(this))};D.ka=function(){this.g&&Mi(this)};function Mi(t){t.readyState=4,t.l=null,t.j=null,t.A=null,_i(t)}D.setRequestHeader=function(t,e){this.v.append(t,e)};D.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};D.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function _i(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Da.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var k0=X.JSON.parse;function De(t){Ke.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=_m,this.L=this.M=!1}We(De,Ke);var _m="",O0=/^https?$/i,D0=["POST","PUT"];D=De.prototype;D.Oa=function(t){this.M=t};D.ha=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+t);e=e?e.toUpperCase():"GET",this.I=t,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():gl.g(),this.C=this.u?Td(this.u):Td(gl),this.g.onreadystatechange=st(this.La,this);try{this.G=!0,this.g.open(e,String(t),!0),this.G=!1}catch(i){Pd(this,i);return}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())n.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),s=X.FormData&&t instanceof X.FormData,!(0<=Vg(D0,e))||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{Em(this),0<this.B&&((this.L=N0(this.g))?(this.g.timeout=this.B,this.g.ontimeout=st(this.ua,this)):this.A=Tu(this.ua,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){Pd(this,i)}};function N0(t){return ts&&typeof t.timeout=="number"&&t.ontimeout!==void 0}D.ua=function(){typeof du<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Je(this,"timeout"),this.abort(8))};function Pd(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,ym(t),Na(t)}function ym(t){t.F||(t.F=!0,Je(t,"complete"),Je(t,"error"))}D.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,Je(this,"complete"),Je(this,"abort"),Na(this))};D.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Na(this,!0)),De.$.N.call(this)};D.La=function(){this.s||(this.G||this.v||this.l?vm(this):this.kb())};D.kb=function(){vm(this)};function vm(t){if(t.h&&typeof du<"u"&&(!t.C[1]||Qt(t)!=4||t.da()!=2)){if(t.v&&Qt(t)==4)Tu(t.La,0,t);else if(Je(t,"readystatechange"),Qt(t)==4){t.h=!1;try{const o=t.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var r;if(r=o===0){var s=String(t.I).match(am)[1]||null;!s&&X.self&&X.self.location&&(s=X.self.location.protocol.slice(0,-1)),r=!O0.test(s?s.toLowerCase():"")}n=r}if(n)Je(t,"complete"),Je(t,"success");else{t.m=6;try{var i=2<Qt(t)?t.g.statusText:""}catch{i=""}t.j=i+" ["+t.da()+"]",ym(t)}}finally{Na(t)}}}}function Na(t,e){if(t.g){Em(t);const n=t.g,r=t.C[0]?()=>{}:null;t.g=null,t.C=null,e||Je(t,"ready");try{n.onreadystatechange=r}catch{}}}function Em(t){t.g&&t.L&&(t.g.ontimeout=null),t.A&&(X.clearTimeout(t.A),t.A=null)}D.isActive=function(){return!!this.g};function Qt(t){return t.g?t.g.readyState:0}D.da=function(){try{return 2<Qt(this)?this.g.status:-1}catch{return-1}};D.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};D.Wa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),k0(e)}};function Sd(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.K){case _m:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function V0(t){const e={};t=(t.g&&2<=Qt(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<t.length;r++){if(ui(t[r]))continue;var n=i0(t[r]);const s=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const i=e[s]||[];e[s]=i,i.push(n)}XT(e,function(r){return r.join(", ")})}D.Ia=function(){return this.m};D.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function Im(t){let e="";return gu(t,function(n,r){e+=r,e+=":",e+=n,e+=`\r
`}),e}function Cu(t,e,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Im(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):Se(t,e,n))}function Ss(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function wm(t){this.Ga=0,this.j=[],this.l=new Ra,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Ss("failFast",!1,t),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Ss("baseRetryDelayMs",5e3,t),this.hb=Ss("retryDelaySeedMs",1e4,t),this.eb=Ss("forwardChannelMaxRetries",2,t),this.xa=Ss("forwardChannelRequestTimeoutMs",2e4,t),this.va=t&&t.xmlHttpFactory||void 0,this.Ha=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.i=new hm(t&&t.concurrentRequestLimit),this.Ja=new S0,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=t&&t.bc||!1,t&&t.Ea&&this.l.Ea(),t&&t.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&t&&t.detectBufferingProxy||!1,this.qa=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.qa=t.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}D=wm.prototype;D.ra=8;D.H=1;function ku(t){if(Tm(t),t.H==3){var e=t.W++,n=_n(t.I);if(Se(n,"SID",t.K),Se(n,"RID",e),Se(n,"TYPE","terminate"),Li(t,n),e=new Vi(t,t.l,e),e.L=2,e.v=ka(_n(n)),n=!1,X.navigator&&X.navigator.sendBeacon)try{n=X.navigator.sendBeacon(e.v.toString(),"")}catch{}!n&&X.Image&&(new Image().src=e.v,n=!0),n||(e.g=Om(e.l,null),e.g.ha(e.v)),e.G=Date.now(),xi(e)}Cm(t)}function Va(t){t.g&&(Du(t),t.g.cancel(),t.g=null)}function Tm(t){Va(t),t.u&&(X.clearTimeout(t.u),t.u=null),$o(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&X.clearTimeout(t.m),t.m=null)}function xa(t){if(!dm(t.i)&&!t.m){t.m=!0;var e=t.Na;di||Kg(),fi||(di(),fi=!0),Iu.add(e,t),t.C=0}}function x0(t,e){return fm(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.j=e.F.concat(t.j),!0):t.H==1||t.H==2||t.C>=(t.cb?0:t.eb)?!1:(t.m=Di(st(t.Na,t,e),bm(t,t.C)),t.C++,!0)}D.Na=function(t){if(this.m)if(this.m=null,this.H==1){if(!t){this.W=Math.floor(1e5*Math.random()),t=this.W++;const s=new Vi(this,this.l,t);let i=this.s;if(this.U&&(i?(i=Fg(i),$g(i,this.U)):i=this.U),this.o!==null||this.O||(s.I=i,i=null),this.P)e:{for(var e=0,n=0;n<this.j.length;n++){t:{var r=this.j[n];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=n;break e}if(e===4096||n===this.j.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=Am(this,s,e),n=_n(this.I),Se(n,"RID",t),Se(n,"CVER",22),this.F&&Se(n,"X-HTTP-Session-Id",this.F),Li(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(Im(i)))+"&"+e:this.o&&Cu(n,this.o,i)),Su(this.i,s),this.bb&&Se(n,"TYPE","init"),this.P?(Se(n,"$req",e),Se(n,"SID","null"),s.aa=!0,_l(s,n,null)):_l(s,n,e),this.H=2}}else this.H==3&&(t?bd(this,t):this.j.length==0||dm(this.i)||bd(this))};function bd(t,e){var n;e?n=e.m:n=t.W++;const r=_n(t.I);Se(r,"SID",t.K),Se(r,"RID",n),Se(r,"AID",t.V),Li(t,r),t.o&&t.s&&Cu(r,t.o,t.s),n=new Vi(t,t.l,n,t.C+1),t.o===null&&(n.I=t.s),e&&(t.j=e.F.concat(t.j)),e=Am(t,n,1e3),n.setTimeout(Math.round(.5*t.xa)+Math.round(.5*t.xa*Math.random())),Su(t.i,n),_l(n,r,e)}function Li(t,e){t.na&&gu(t.na,function(n,r){Se(e,r,n)}),t.h&&om({},function(n,r){Se(e,r,n)})}function Am(t,e,n){n=Math.min(t.j.length,n);var r=t.h?st(t.h.Va,t.h,t):null;e:{var s=t.j;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=s[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let l=s[c].g;const u=s[c].map;if(l-=i,0>l)i=Math.max(0,s[c].g-100),a=!1;else try{b0(u,o,"req"+l+"_")}catch{r&&r(u)}}if(a){r=o.join("&");break e}}}return t=t.j.splice(0,n),e.F=t,r}function Rm(t){if(!t.g&&!t.u){t.ba=1;var e=t.Ma;di||Kg(),fi||(di(),fi=!0),Iu.add(e,t),t.A=0}}function Ou(t){return t.g||t.u||3<=t.A?!1:(t.ba++,t.u=Di(st(t.Ma,t),bm(t,t.A)),t.A++,!0)}D.Ma=function(){if(this.u=null,Pm(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var t=2*this.S;this.l.info("BP detection timer enabled: "+t),this.B=Di(st(this.jb,this),t)}};D.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,ht(10),Va(this),Pm(this))};function Du(t){t.B!=null&&(X.clearTimeout(t.B),t.B=null)}function Pm(t){t.g=new Vi(t,t.l,"rpc",t.ba),t.o===null&&(t.g.I=t.s),t.g.O=0;var e=_n(t.wa);Se(e,"RID","rpc"),Se(e,"SID",t.K),Se(e,"AID",t.V),Se(e,"CI",t.G?"0":"1"),!t.G&&t.qa&&Se(e,"TO",t.qa),Se(e,"TYPE","xmlhttp"),Li(t,e),t.o&&t.s&&Cu(e,t.o,t.s),t.L&&t.g.setTimeout(t.L);var n=t.g;t=t.pa,n.L=1,n.v=ka(_n(e)),n.s=null,n.S=!0,nm(n,t)}D.ib=function(){this.v!=null&&(this.v=null,Va(this),Ou(this),ht(19))};function $o(t){t.v!=null&&(X.clearTimeout(t.v),t.v=null)}function Sm(t,e){var n=null;if(t.g==e){$o(t),Du(t),t.g=null;var r=2}else if(vl(t.i,e))n=e.F,pm(t.i,e),r=1;else return;if(t.H!=0){if(e.i)if(r==1){n=e.s?e.s.length:0,e=Date.now()-e.G;var s=t.C;r=Pa(),Je(r,new Xg(r,n)),xa(t)}else Rm(t);else if(s=e.o,s==3||s==0&&0<e.ca||!(r==1&&x0(t,e)||r==2&&Ou(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),s){case 1:sr(t,5);break;case 4:sr(t,10);break;case 3:sr(t,6);break;default:sr(t,2)}}}function bm(t,e){let n=t.ab+Math.floor(Math.random()*t.hb);return t.isActive()||(n*=2),n*e}function sr(t,e){if(t.l.info("Error code "+e),e==2){var n=null;t.h&&(n=null);var r=st(t.pb,t);n||(n=new hr("//www.google.com/images/cleardot.gif"),X.location&&X.location.protocol=="http"||Lo(n,"https"),ka(n)),C0(n.toString(),r)}else ht(2);t.H=0,t.h&&t.h.za(e),Cm(t),Tm(t)}D.pb=function(t){t?(this.l.info("Successfully pinged google.com"),ht(2)):(this.l.info("Failed to ping google.com"),ht(1))};function Cm(t){if(t.H=0,t.ma=[],t.h){const e=gm(t.i);(e.length!=0||t.j.length!=0)&&(yd(t.ma,e),yd(t.ma,t.j),t.i.i.length=0,fu(t.j),t.j.length=0),t.h.ya()}}function km(t,e,n){var r=n instanceof hr?_n(n):new hr(n);if(r.g!="")e&&(r.g=e+"."+r.g),Fo(r,r.m);else{var s=X.location;r=s.protocol,e=e?e+"."+s.hostname:s.hostname,s=+s.port;var i=new hr(null);r&&Lo(i,r),e&&(i.g=e),s&&Fo(i,s),n&&(i.l=n),r=i}return n=t.F,e=t.Da,n&&e&&Se(r,n,e),Se(r,"VER",t.ra),Li(t,r),r}function Om(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ha&&!t.va?new De(new Oa({ob:!0})):new De(t.va),e.Oa(t.J),e}D.isActive=function(){return!!this.h&&this.h.isActive(this)};function Dm(){}D=Dm.prototype;D.Ba=function(){};D.Aa=function(){};D.za=function(){};D.ya=function(){};D.isActive=function(){return!0};D.Va=function(){};function Uo(){if(ts&&!(10<=Number(GT)))throw Error("Environmental error: no available transport.")}Uo.prototype.g=function(t,e){return new At(t,e)};function At(t,e){Ke.call(this),this.g=new wm(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(t?t["X-WebChannel-Client-Profile"]=e.Ca:t={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=t,(t=e&&e.cc)&&!ui(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!ui(e)&&(this.g.F=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new vs(this)}We(At,Ke);At.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var t=this.g,e=this.l,n=this.h||void 0;ht(0),t.Y=e,t.na=n||{},t.G=t.aa,t.I=km(t,null,t.Y),xa(t)};At.prototype.close=function(){ku(this.g)};At.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=Eu(t),t=n);e.j.push(new A0(e.fb++,t)),e.H==3&&xa(e)};At.prototype.N=function(){this.g.h=null,delete this.j,ku(this.g),delete this.g,At.$.N.call(this)};function Nm(t){Ru.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}We(Nm,Ru);function Vm(){Pu.call(this),this.status=1}We(Vm,Pu);function vs(t){this.g=t}We(vs,Dm);vs.prototype.Ba=function(){Je(this.g,"a")};vs.prototype.Aa=function(t){Je(this.g,new Nm(t))};vs.prototype.za=function(t){Je(this.g,new Vm)};vs.prototype.ya=function(){Je(this.g,"b")};function M0(){this.blockSize=-1}function Ft(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}We(Ft,M0);Ft.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function Ac(t,e,n){n||(n=0);var r=Array(16);if(typeof e=="string")for(var s=0;16>s;++s)r[s]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(s=0;16>s;++s)r[s]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],s=t.g[2];var i=t.g[3],o=e+(i^n&(s^i))+r[0]+3614090360&4294967295;e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[1]+3905402710&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[2]+606105819&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[3]+3250441966&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(i^n&(s^i))+r[4]+4118548399&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[5]+1200080426&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[6]+2821735955&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[7]+4249261313&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(i^n&(s^i))+r[8]+1770035416&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[9]+2336552879&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[10]+4294925233&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[11]+2304563134&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(i^n&(s^i))+r[12]+1804603682&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[13]+4254626195&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[14]+2792965006&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[15]+1236535329&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(s^i&(n^s))+r[1]+4129170786&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[6]+3225465664&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[11]+643717713&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[0]+3921069994&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(n^s))+r[5]+3593408605&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[10]+38016083&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[15]+3634488961&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[4]+3889429448&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(n^s))+r[9]+568446438&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[14]+3275163606&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[3]+4107603335&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[8]+1163531501&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(n^s))+r[13]+2850285829&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[2]+4243563512&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[7]+1735328473&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[12]+2368359562&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(n^s^i)+r[5]+4294588738&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[8]+2272392833&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[11]+1839030562&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[14]+4259657740&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(n^s^i)+r[1]+2763975236&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[4]+1272893353&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[7]+4139469664&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[10]+3200236656&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(n^s^i)+r[13]+681279174&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[0]+3936430074&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[3]+3572445317&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[6]+76029189&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(n^s^i)+r[9]+3654602809&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[12]+3873151461&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[15]+530742520&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[2]+3299628645&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(s^(n|~i))+r[0]+4096336452&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[7]+1126891415&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[14]+2878612391&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[5]+4237533241&4294967295,n=s+(o<<21&4294967295|o>>>11),o=e+(s^(n|~i))+r[12]+1700485571&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[3]+2399980690&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[10]+4293915773&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[1]+2240044497&4294967295,n=s+(o<<21&4294967295|o>>>11),o=e+(s^(n|~i))+r[8]+1873313359&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[15]+4264355552&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[6]+2734768916&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[13]+1309151649&4294967295,n=s+(o<<21&4294967295|o>>>11),o=e+(s^(n|~i))+r[4]+4149444226&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[11]+3174756917&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[2]+718787259&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+s&4294967295,t.g[3]=t.g[3]+i&4294967295}Ft.prototype.j=function(t,e){e===void 0&&(e=t.length);for(var n=e-this.blockSize,r=this.m,s=this.h,i=0;i<e;){if(s==0)for(;i<=n;)Ac(this,t,i),i+=this.blockSize;if(typeof t=="string"){for(;i<e;)if(r[s++]=t.charCodeAt(i++),s==this.blockSize){Ac(this,r),s=0;break}}else for(;i<e;)if(r[s++]=t[i++],s==this.blockSize){Ac(this,r),s=0;break}}this.h=s,this.i+=e};Ft.prototype.l=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.i;for(e=t.length-8;e<t.length;++e)t[e]=n&255,n/=256;for(this.j(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};function Ee(t,e){this.h=e;for(var n=[],r=!0,s=t.length-1;0<=s;s--){var i=t[s]|0;r&&i==e||(n[s]=i,r=!1)}this.g=n}var L0={};function Nu(t){return-128<=t&&128>t?zT(t,function(e){return new Ee([e|0],0>e?-1:0)}):new Ee([t|0],0>t?-1:0)}function Yt(t){if(isNaN(t)||!isFinite(t))return Gr;if(0>t)return Ye(Yt(-t));for(var e=[],n=1,r=0;t>=n;r++)e[r]=t/n|0,n*=El;return new Ee(e,0)}function xm(t,e){if(t.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(t.charAt(0)=="-")return Ye(xm(t.substring(1),e));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=Yt(Math.pow(e,8)),r=Gr,s=0;s<t.length;s+=8){var i=Math.min(8,t.length-s),o=parseInt(t.substring(s,s+i),e);8>i?(i=Yt(Math.pow(e,i)),r=r.R(i).add(Yt(o))):(r=r.R(n),r=r.add(Yt(o)))}return r}var El=4294967296,Gr=Nu(0),Il=Nu(1),Cd=Nu(16777216);D=Ee.prototype;D.ea=function(){if(Rt(this))return-Ye(this).ea();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.D(n);t+=(0<=r?r:El+r)*e,e*=El}return t};D.toString=function(t){if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(fn(this))return"0";if(Rt(this))return"-"+Ye(this).toString(t);for(var e=Yt(Math.pow(t,6)),n=this,r="";;){var s=Bo(n,e).g;n=jo(n,s.R(e));var i=((0<n.g.length?n.g[0]:n.h)>>>0).toString(t);if(n=s,fn(n))return i+r;for(;6>i.length;)i="0"+i;r=i+r}};D.D=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h};function fn(t){if(t.h!=0)return!1;for(var e=0;e<t.g.length;e++)if(t.g[e]!=0)return!1;return!0}function Rt(t){return t.h==-1}D.X=function(t){return t=jo(this,t),Rt(t)?-1:fn(t)?0:1};function Ye(t){for(var e=t.g.length,n=[],r=0;r<e;r++)n[r]=~t.g[r];return new Ee(n,~t.h).add(Il)}D.abs=function(){return Rt(this)?Ye(this):this};D.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0,s=0;s<=e;s++){var i=r+(this.D(s)&65535)+(t.D(s)&65535),o=(i>>>16)+(this.D(s)>>>16)+(t.D(s)>>>16);r=o>>>16,i&=65535,o&=65535,n[s]=o<<16|i}return new Ee(n,n[n.length-1]&-2147483648?-1:0)};function jo(t,e){return t.add(Ye(e))}D.R=function(t){if(fn(this)||fn(t))return Gr;if(Rt(this))return Rt(t)?Ye(this).R(Ye(t)):Ye(Ye(this).R(t));if(Rt(t))return Ye(this.R(Ye(t)));if(0>this.X(Cd)&&0>t.X(Cd))return Yt(this.ea()*t.ea());for(var e=this.g.length+t.g.length,n=[],r=0;r<2*e;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var s=0;s<t.g.length;s++){var i=this.D(r)>>>16,o=this.D(r)&65535,a=t.D(s)>>>16,c=t.D(s)&65535;n[2*r+2*s]+=o*c,oo(n,2*r+2*s),n[2*r+2*s+1]+=i*c,oo(n,2*r+2*s+1),n[2*r+2*s+1]+=o*a,oo(n,2*r+2*s+1),n[2*r+2*s+2]+=i*a,oo(n,2*r+2*s+2)}for(r=0;r<e;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=e;r<2*e;r++)n[r]=0;return new Ee(n,0)};function oo(t,e){for(;(t[e]&65535)!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function bs(t,e){this.g=t,this.h=e}function Bo(t,e){if(fn(e))throw Error("division by zero");if(fn(t))return new bs(Gr,Gr);if(Rt(t))return e=Bo(Ye(t),e),new bs(Ye(e.g),Ye(e.h));if(Rt(e))return e=Bo(t,Ye(e)),new bs(Ye(e.g),e.h);if(30<t.g.length){if(Rt(t)||Rt(e))throw Error("slowDivide_ only works with positive integers.");for(var n=Il,r=e;0>=r.X(t);)n=kd(n),r=kd(r);var s=Lr(n,1),i=Lr(r,1);for(r=Lr(r,2),n=Lr(n,2);!fn(r);){var o=i.add(r);0>=o.X(t)&&(s=s.add(n),i=o),r=Lr(r,1),n=Lr(n,1)}return e=jo(t,s.R(e)),new bs(s,e)}for(s=Gr;0<=t.X(e);){for(n=Math.max(1,Math.floor(t.ea()/e.ea())),r=Math.ceil(Math.log(n)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),i=Yt(n),o=i.R(e);Rt(o)||0<o.X(t);)n-=r,i=Yt(n),o=i.R(e);fn(i)&&(i=Il),s=s.add(i),t=jo(t,o)}return new bs(s,t)}D.gb=function(t){return Bo(this,t).h};D.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)&t.D(r);return new Ee(n,this.h&t.h)};D.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)|t.D(r);return new Ee(n,this.h|t.h)};D.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)^t.D(r);return new Ee(n,this.h^t.h)};function kd(t){for(var e=t.g.length+1,n=[],r=0;r<e;r++)n[r]=t.D(r)<<1|t.D(r-1)>>>31;return new Ee(n,t.h)}function Lr(t,e){var n=e>>5;e%=32;for(var r=t.g.length-n,s=[],i=0;i<r;i++)s[i]=0<e?t.D(i+n)>>>e|t.D(i+n+1)<<32-e:t.D(i+n);return new Ee(s,t.h)}Uo.prototype.createWebChannel=Uo.prototype.g;At.prototype.send=At.prototype.u;At.prototype.open=At.prototype.m;At.prototype.close=At.prototype.close;Sa.NO_ERROR=0;Sa.TIMEOUT=8;Sa.HTTP_ERROR=6;Zg.COMPLETE="complete";em.EventType=Ni;Ni.OPEN="a";Ni.CLOSE="b";Ni.ERROR="c";Ni.MESSAGE="d";Ke.prototype.listen=Ke.prototype.O;De.prototype.listenOnce=De.prototype.P;De.prototype.getLastError=De.prototype.Sa;De.prototype.getLastErrorCode=De.prototype.Ia;De.prototype.getStatus=De.prototype.da;De.prototype.getResponseJson=De.prototype.Wa;De.prototype.getResponseText=De.prototype.ja;De.prototype.send=De.prototype.ha;De.prototype.setWithCredentials=De.prototype.Oa;Ft.prototype.digest=Ft.prototype.l;Ft.prototype.reset=Ft.prototype.reset;Ft.prototype.update=Ft.prototype.j;Ee.prototype.add=Ee.prototype.add;Ee.prototype.multiply=Ee.prototype.R;Ee.prototype.modulo=Ee.prototype.gb;Ee.prototype.compare=Ee.prototype.X;Ee.prototype.toNumber=Ee.prototype.ea;Ee.prototype.toString=Ee.prototype.toString;Ee.prototype.getBits=Ee.prototype.D;Ee.fromNumber=Yt;Ee.fromString=xm;var F0=function(){return new Uo},$0=function(){return Pa()},Rc=Sa,U0=Zg,j0=Pr,Od={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},ao=em,B0=De,q0=Ft,Qr=Ee;const Dd="@firebase/firestore";/**
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
 */class et{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}et.UNAUTHENTICATED=new et(null),et.GOOGLE_CREDENTIALS=new et("google-credentials-uid"),et.FIRST_PARTY=new et("first-party-uid"),et.MOCK_USER=new et("mock-user");/**
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
 */let Es="10.4.0";/**
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
 */const mr=new va("@firebase/firestore");function Cs(){return mr.logLevel}function M(t,...e){if(mr.logLevel<=ce.DEBUG){const n=e.map(Vu);mr.debug(`Firestore (${Es}): ${t}`,...n)}}function yn(t,...e){if(mr.logLevel<=ce.ERROR){const n=e.map(Vu);mr.error(`Firestore (${Es}): ${t}`,...n)}}function ns(t,...e){if(mr.logLevel<=ce.WARN){const n=e.map(Vu);mr.warn(`Firestore (${Es}): ${t}`,...n)}}function Vu(t){if(typeof t=="string")return t;try{/**
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
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
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
 */function J(t="Unexpected state"){const e=`FIRESTORE (${Es}) INTERNAL ASSERTION FAILED: `+t;throw yn(e),new Error(e)}function be(t,e){t||J()}function ne(t,e){return t}/**
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
 */const A={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Ut{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ln{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class Mm{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class H0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(et.UNAUTHENTICATED))}shutdown(){}}class z0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class K0{constructor(e){this.t=e,this.currentUser=et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new Ln;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ln,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ln)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(be(typeof r.accessToken=="string"),new Mm(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return be(e===null||typeof e=="string"),new et(e)}}class W0{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=et.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class G0{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new W0(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(et.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Q0{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Y0{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){const r=i=>{i.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,M("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(be(typeof n.token=="string"),this.R=n.token,new Q0(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */function J0(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class Lm{static V(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=J0(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function pe(t,e){return t<e?-1:t>e?1:0}function rs(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
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
 */class je{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new U(A.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new U(A.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new U(A.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(A.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return je.fromMillis(Date.now())}static fromDate(e){return je.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new je(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?pe(this.nanoseconds,e.nanoseconds):pe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class ee{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ee(e)}static min(){return new ee(new je(0,0))}static max(){return new ee(new je(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class yi{constructor(e,n,r){n===void 0?n=0:n>e.length&&J(),r===void 0?r=e.length-n:r>e.length-n&&J(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return yi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof yi?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Ce extends yi{construct(e,n,r){return new Ce(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(A.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Ce(n)}static emptyPath(){return new Ce([])}}const X0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class rt extends yi{construct(e,n,r){return new rt(e,n,r)}static isValidIdentifier(e){return X0.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),rt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new rt(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(A.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new U(A.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new U(A.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new U(A.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new rt(n)}static emptyPath(){return new rt([])}}/**
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
 */class z{constructor(e){this.path=e}static fromPath(e){return new z(Ce.fromString(e))}static fromName(e){return new z(Ce.fromString(e).popFirst(5))}static empty(){return new z(Ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ce.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new z(new Ce(e.slice()))}}function Z0(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ee.fromTimestamp(r===1e9?new je(n+1,0):new je(n,r));return new jn(s,z.empty(),e)}function eA(t){return new jn(t.readTime,t.key,-1)}class jn{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new jn(ee.min(),z.empty(),-1)}static max(){return new jn(ee.max(),z.empty(),-1)}}function tA(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=z.comparator(t.documentKey,e.documentKey),n!==0?n:pe(t.largestBatchId,e.largestBatchId))}/**
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
 */const nA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rA{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Fi(t){if(t.code!==A.FAILED_PRECONDITION||t.message!==nA)throw t;M("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&J(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new P((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof P?n:P.resolve(n)}catch(n){return P.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):P.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):P.reject(n)}static resolve(e){return new P((n,r)=>{n(e)})}static reject(e){return new P((n,r)=>{r(e)})}static waitFor(e){return new P((n,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=P.resolve(!1);for(const r of e)n=n.next(s=>s?P.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new P((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const l=c;n(e[l]).next(u=>{o[l]=u,++a,a===i&&r(o)},u=>s(u))}})}static doWhile(e,n){return new P((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function $i(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.oe(r),this._e=r=>n.writeSequenceNumber(r))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}xu.ae=-1;function Ma(t){return t==null}function qo(t){return t===0&&1/t==-1/0}function sA(t){return typeof t=="number"&&Number.isInteger(t)&&!qo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function Nd(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Sr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Fm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class Oe{constructor(e,n){this.comparator=e,this.root=n||Qe.EMPTY}insert(e,n){return new Oe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new Oe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new co(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new co(this.root,e,this.comparator,!1)}getReverseIterator(){return new co(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new co(this.root,e,this.comparator,!0)}}class co{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qe{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Qe.RED,this.left=s??Qe.EMPTY,this.right=i??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Qe(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw J();const e=this.left.check();if(e!==this.right.check())throw J();return e+(this.isRed()?0:1)}}Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw J()}get value(){throw J()}get color(){throw J()}get left(){throw J()}get right(){throw J()}copy(e,n,r,s,i){return this}insert(e,n,r){return new Qe(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ot{constructor(e){this.comparator=e,this.data=new Oe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Vd(this.data.getIterator())}getIteratorFrom(e){return new Vd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ot)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ot(this.comparator);return n.data=e,n}}class Vd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class wt{constructor(e){this.fields=e,e.sort(rt.comparator)}static empty(){return new wt([])}unionWith(e){let n=new ot(rt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new wt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return rs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class $m extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ct{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new $m("Invalid base64 string: "+i):i}}(e);return new ct(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new ct(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return pe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ct.EMPTY_BYTE_STRING=new ct("");const iA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Bn(t){if(be(!!t),typeof t=="string"){let e=0;const n=iA.exec(t);if(be(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Le(t.seconds),nanos:Le(t.nanos)}}function Le(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function _r(t){return typeof t=="string"?ct.fromBase64String(t):ct.fromUint8Array(t)}/**
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
 */function Mu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Lu(t){const e=t.mapValue.fields.__previous_value__;return Mu(e)?Lu(e):e}function vi(t){const e=Bn(t.mapValue.fields.__local_write_time__.timestampValue);return new je(e.seconds,e.nanos)}/**
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
 */class oA{constructor(e,n,r,s,i,o,a,c,l){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}}class Ei{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Ei("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ei&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const lo={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function yr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Mu(t)?4:aA(t)?9007199254740991:10:J()}function on(t,e){if(t===e)return!0;const n=yr(t);if(n!==yr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return vi(t).isEqual(vi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Bn(s.timestampValue),a=Bn(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return _r(s.bytesValue).isEqual(_r(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Le(s.geoPointValue.latitude)===Le(i.geoPointValue.latitude)&&Le(s.geoPointValue.longitude)===Le(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Le(s.integerValue)===Le(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Le(s.doubleValue),a=Le(i.doubleValue);return o===a?qo(o)===qo(a):isNaN(o)&&isNaN(a)}return!1}(t,e);case 9:return rs(t.arrayValue.values||[],e.arrayValue.values||[],on);case 10:return function(s,i){const o=s.mapValue.fields||{},a=i.mapValue.fields||{};if(Nd(o)!==Nd(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!on(o[c],a[c])))return!1;return!0}(t,e);default:return J()}}function Ii(t,e){return(t.values||[]).find(n=>on(n,e))!==void 0}function ss(t,e){if(t===e)return 0;const n=yr(t),r=yr(e);if(n!==r)return pe(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return pe(t.booleanValue,e.booleanValue);case 2:return function(i,o){const a=Le(i.integerValue||i.doubleValue),c=Le(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(t,e);case 3:return xd(t.timestampValue,e.timestampValue);case 4:return xd(vi(t),vi(e));case 5:return pe(t.stringValue,e.stringValue);case 6:return function(i,o){const a=_r(i),c=_r(o);return a.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const a=i.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){const u=pe(a[l],c[l]);if(u!==0)return u}return pe(a.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const a=pe(Le(i.latitude),Le(o.latitude));return a!==0?a:pe(Le(i.longitude),Le(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(i,o){const a=i.values||[],c=o.values||[];for(let l=0;l<a.length&&l<c.length;++l){const u=ss(a[l],c[l]);if(u)return u}return pe(a.length,c.length)}(t.arrayValue,e.arrayValue);case 10:return function(i,o){if(i===lo.mapValue&&o===lo.mapValue)return 0;if(i===lo.mapValue)return 1;if(o===lo.mapValue)return-1;const a=i.fields||{},c=Object.keys(a),l=o.fields||{},u=Object.keys(l);c.sort(),u.sort();for(let h=0;h<c.length&&h<u.length;++h){const d=pe(c[h],u[h]);if(d!==0)return d;const f=ss(a[c[h]],l[u[h]]);if(f!==0)return f}return pe(c.length,u.length)}(t.mapValue,e.mapValue);default:throw J()}}function xd(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return pe(t,e);const n=Bn(t),r=Bn(e),s=pe(n.seconds,r.seconds);return s!==0?s:pe(n.nanos,r.nanos)}function is(t){return wl(t)}function wl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Bn(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return _r(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return z.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=wl(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${wl(n.fields[o])}`;return s+"}"}(t.mapValue):J()}function Tl(t){return!!t&&"integerValue"in t}function Fu(t){return!!t&&"arrayValue"in t}function Md(t){return!!t&&"nullValue"in t}function Ld(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function yo(t){return!!t&&"mapValue"in t}function Hs(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Sr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Hs(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Hs(t.arrayValue.values[n]);return e}return Object.assign({},t)}function aA(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class gt{constructor(e){this.value=e}static empty(){return new gt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!yo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Hs(n)}setAll(e){let n=rt.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=Hs(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());yo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return on(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];yo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Sr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new gt(Hs(this.value))}}function Um(t){const e=[];return Sr(t.fields,(n,r)=>{const s=new rt([n]);if(yo(r)){const i=Um(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new wt(e)}/**
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
 */class tt{constructor(e,n,r,s,i,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new tt(e,0,ee.min(),ee.min(),ee.min(),gt.empty(),0)}static newFoundDocument(e,n,r,s){return new tt(e,1,n,ee.min(),r,s,0)}static newNoDocument(e,n){return new tt(e,2,n,ee.min(),ee.min(),gt.empty(),0)}static newUnknownDocument(e,n){return new tt(e,3,n,ee.min(),ee.min(),gt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ee.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=gt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=gt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ee.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof tt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new tt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ho{constructor(e,n){this.position=e,this.inclusive=n}}function Fd(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=z.comparator(z.fromName(o.referenceValue),n.key):r=ss(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function $d(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!on(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class zs{constructor(e,n="asc"){this.field=e,this.dir=n}}function cA(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class jm{}class Ue extends jm{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new uA(e,n,r):n==="array-contains"?new fA(e,r):n==="in"?new pA(e,r):n==="not-in"?new gA(e,r):n==="array-contains-any"?new mA(e,r):new Ue(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new hA(e,r):new dA(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ss(n,this.value)):n!==null&&yr(this.value)===yr(n)&&this.matchesComparison(ss(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class an extends jm{constructor(e,n){super(),this.filters=e,this.op=n,this.ce=null}static create(e,n){return new an(e,n)}matches(e){return Bm(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.le(n=>n.isInequality());return e!==null?e.field:null}le(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function Bm(t){return t.op==="and"}function qm(t){return lA(t)&&Bm(t)}function lA(t){for(const e of t.filters)if(e instanceof an)return!1;return!0}function Al(t){if(t instanceof Ue)return t.field.canonicalString()+t.op.toString()+is(t.value);if(qm(t))return t.filters.map(e=>Al(e)).join(",");{const e=t.filters.map(n=>Al(n)).join(",");return`${t.op}(${e})`}}function Hm(t,e){return t instanceof Ue?function(r,s){return s instanceof Ue&&r.op===s.op&&r.field.isEqual(s.field)&&on(r.value,s.value)}(t,e):t instanceof an?function(r,s){return s instanceof an&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,a)=>i&&Hm(o,s.filters[a]),!0):!1}(t,e):void J()}function zm(t){return t instanceof Ue?function(n){return`${n.field.canonicalString()} ${n.op} ${is(n.value)}`}(t):t instanceof an?function(n){return n.op.toString()+" {"+n.getFilters().map(zm).join(" ,")+"}"}(t):"Filter"}class uA extends Ue{constructor(e,n,r){super(e,n,r),this.key=z.fromName(r.referenceValue)}matches(e){const n=z.comparator(e.key,this.key);return this.matchesComparison(n)}}class hA extends Ue{constructor(e,n){super(e,"in",n),this.keys=Km("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class dA extends Ue{constructor(e,n){super(e,"not-in",n),this.keys=Km("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Km(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>z.fromName(r.referenceValue))}class fA extends Ue{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Fu(n)&&Ii(n.arrayValue,this.value)}}class pA extends Ue{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ii(this.value.arrayValue,n)}}class gA extends Ue{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ii(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ii(this.value.arrayValue,n)}}class mA extends Ue{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Fu(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ii(this.value.arrayValue,r))}}/**
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
 */class _A{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.he=null}}function Ud(t,e=null,n=[],r=[],s=null,i=null,o=null){return new _A(t,e,n,r,s,i,o)}function $u(t){const e=ne(t);if(e.he===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Al(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Ma(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>is(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>is(r)).join(",")),e.he=n}return e.he}function Uu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!cA(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Hm(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!$d(t.startAt,e.startAt)&&$d(t.endAt,e.endAt)}function Rl(t){return z.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class La{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.Pe=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function yA(t,e,n,r,s,i,o,a){return new La(t,e,n,r,s,i,o,a)}function Fa(t){return new La(t)}function jd(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function vA(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function EA(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function IA(t){return t.collectionGroup!==null}function Ks(t){const e=ne(t);if(e.Pe===null){e.Pe=[];const n=EA(e),r=vA(e);if(n!==null&&r===null)n.isKeyField()||e.Pe.push(new zs(n)),e.Pe.push(new zs(rt.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.Pe.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.Pe.push(new zs(rt.keyField(),i))}}}return e.Pe}function Xt(t){const e=ne(t);return e.Ie||(e.Ie=wA(e,Ks(t))),e.Ie}function wA(t,e){if(t.limitType==="F")return Ud(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new zs(s.field,i)});const n=t.endAt?new Ho(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ho(t.startAt.position,t.startAt.inclusive):null;return Ud(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Pl(t,e,n){return new La(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function $a(t,e){return Uu(Xt(t),Xt(e))&&t.limitType===e.limitType}function Wm(t){return`${$u(Xt(t))}|lt:${t.limitType}`}function $r(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>zm(s)).join(", ")}]`),Ma(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>is(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>is(s)).join(",")),`Target(${r})`}(Xt(t))}; limitType=${t.limitType})`}function Ua(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of Ks(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,a,c){const l=Fd(o,a,c);return o.inclusive?l<=0:l<0}(r.startAt,Ks(r),s)||r.endAt&&!function(o,a,c){const l=Fd(o,a,c);return o.inclusive?l>=0:l>0}(r.endAt,Ks(r),s))}(t,e)}function TA(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Gm(t){return(e,n)=>{let r=!1;for(const s of Ks(t)){const i=AA(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function AA(t,e,n){const r=t.field.isKeyField()?z.comparator(e.key,n.key):function(i,o,a){const c=o.data.field(i),l=a.data.field(i);return c!==null&&l!==null?ss(c,l):J()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return J()}}/**
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
 */class Is{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Sr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Fm(this.inner)}size(){return this.innerSize}}/**
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
 */const RA=new Oe(z.comparator);function vn(){return RA}const Qm=new Oe(z.comparator);function Ls(...t){let e=Qm;for(const n of t)e=e.insert(n.key,n);return e}function Ym(t){let e=Qm;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function ir(){return Ws()}function Jm(){return Ws()}function Ws(){return new Is(t=>t.toString(),(t,e)=>t.isEqual(e))}const PA=new Oe(z.comparator),SA=new ot(z.comparator);function ae(...t){let e=SA;for(const n of t)e=e.add(n);return e}const bA=new ot(pe);function CA(){return bA}/**
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
 */function Xm(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qo(e)?"-0":e}}function Zm(t){return{integerValue:""+t}}function e_(t,e){return sA(e)?Zm(e):Xm(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(){this._=void 0}}function kA(t,e,n){return t instanceof wi?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Mu(i)&&(i=Lu(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof os?n_(t,e):t instanceof as?r_(t,e):function(s,i){const o=t_(s,i),a=Bd(o)+Bd(s.Te);return Tl(o)&&Tl(s.Te)?Zm(a):Xm(s.serializer,a)}(t,e)}function OA(t,e,n){return t instanceof os?n_(t,e):t instanceof as?r_(t,e):n}function t_(t,e){return t instanceof Ti?function(r){return Tl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class wi extends ja{}class os extends ja{constructor(e){super(),this.elements=e}}function n_(t,e){const n=s_(e);for(const r of t.elements)n.some(s=>on(s,r))||n.push(r);return{arrayValue:{values:n}}}class as extends ja{constructor(e){super(),this.elements=e}}function r_(t,e){let n=s_(e);for(const r of t.elements)n=n.filter(s=>!on(s,r));return{arrayValue:{values:n}}}class Ti extends ja{constructor(e,n){super(),this.serializer=e,this.Te=n}}function Bd(t){return Le(t.integerValue||t.doubleValue)}function s_(t){return Fu(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class Ba{constructor(e,n){this.field=e,this.transform=n}}function DA(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof os&&s instanceof os||r instanceof as&&s instanceof as?rs(r.elements,s.elements,on):r instanceof Ti&&s instanceof Ti?on(r.Te,s.Te):r instanceof wi&&s instanceof wi}(t.transform,e.transform)}class NA{constructor(e,n){this.version=e,this.transformResults=n}}class xt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new xt}static exists(e){return new xt(void 0,e)}static updateTime(e){return new xt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function vo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class qa{}function i_(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new ju(t.key,xt.none()):new Ui(t.key,t.data,xt.none());{const n=t.data,r=gt.empty();let s=new ot(rt.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Kn(t.key,r,new wt(s.toArray()),xt.none())}}function VA(t,e,n){t instanceof Ui?function(s,i,o){const a=s.value.clone(),c=Hd(s.fieldTransforms,i,o.transformResults);a.setAll(c),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(t,e,n):t instanceof Kn?function(s,i,o){if(!vo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=Hd(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(o_(s)),c.setAll(a),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Gs(t,e,n,r){return t instanceof Ui?function(i,o,a,c){if(!vo(i.precondition,o))return a;const l=i.value.clone(),u=zd(i.fieldTransforms,c,o);return l.setAll(u),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(t,e,n,r):t instanceof Kn?function(i,o,a,c){if(!vo(i.precondition,o))return a;const l=zd(i.fieldTransforms,c,o),u=o.data;return u.setAll(o_(i)),u.setAll(l),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(h=>h.field))}(t,e,n,r):function(i,o,a){return vo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(t,e,n)}function xA(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=t_(r.transform,s||null);i!=null&&(n===null&&(n=gt.empty()),n.set(r.field,i))}return n||null}function qd(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&rs(r,s,(i,o)=>DA(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ui extends qa{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Kn extends qa{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function o_(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Hd(t,e,n){const r=new Map;be(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,OA(o,a,n[s]))}return r}function zd(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,kA(i,o,e))}return r}class ju extends qa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class MA extends qa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class LA{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&VA(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Gs(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Gs(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Jm();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const c=i_(o,a);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(ee.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ae())}isEqual(e){return this.batchId===e.batchId&&rs(this.mutations,e.mutations,(n,r)=>qd(n,r))&&rs(this.baseMutations,e.baseMutations,(n,r)=>qd(n,r))}}class Bu{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){be(e.mutations.length===r.length);let s=function(){return PA}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Bu(e,n,r,s)}}/**
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
 */class FA{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class $A{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var Me,le;function UA(t){switch(t){default:return J();case A.CANCELLED:case A.UNKNOWN:case A.DEADLINE_EXCEEDED:case A.RESOURCE_EXHAUSTED:case A.INTERNAL:case A.UNAVAILABLE:case A.UNAUTHENTICATED:return!1;case A.INVALID_ARGUMENT:case A.NOT_FOUND:case A.ALREADY_EXISTS:case A.PERMISSION_DENIED:case A.FAILED_PRECONDITION:case A.ABORTED:case A.OUT_OF_RANGE:case A.UNIMPLEMENTED:case A.DATA_LOSS:return!0}}function a_(t){if(t===void 0)return yn("GRPC error has no .code"),A.UNKNOWN;switch(t){case Me.OK:return A.OK;case Me.CANCELLED:return A.CANCELLED;case Me.UNKNOWN:return A.UNKNOWN;case Me.DEADLINE_EXCEEDED:return A.DEADLINE_EXCEEDED;case Me.RESOURCE_EXHAUSTED:return A.RESOURCE_EXHAUSTED;case Me.INTERNAL:return A.INTERNAL;case Me.UNAVAILABLE:return A.UNAVAILABLE;case Me.UNAUTHENTICATED:return A.UNAUTHENTICATED;case Me.INVALID_ARGUMENT:return A.INVALID_ARGUMENT;case Me.NOT_FOUND:return A.NOT_FOUND;case Me.ALREADY_EXISTS:return A.ALREADY_EXISTS;case Me.PERMISSION_DENIED:return A.PERMISSION_DENIED;case Me.FAILED_PRECONDITION:return A.FAILED_PRECONDITION;case Me.ABORTED:return A.ABORTED;case Me.OUT_OF_RANGE:return A.OUT_OF_RANGE;case Me.UNIMPLEMENTED:return A.UNIMPLEMENTED;case Me.DATA_LOSS:return A.DATA_LOSS;default:return J()}}(le=Me||(Me={}))[le.OK=0]="OK",le[le.CANCELLED=1]="CANCELLED",le[le.UNKNOWN=2]="UNKNOWN",le[le.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",le[le.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",le[le.NOT_FOUND=5]="NOT_FOUND",le[le.ALREADY_EXISTS=6]="ALREADY_EXISTS",le[le.PERMISSION_DENIED=7]="PERMISSION_DENIED",le[le.UNAUTHENTICATED=16]="UNAUTHENTICATED",le[le.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",le[le.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",le[le.ABORTED=10]="ABORTED",le[le.OUT_OF_RANGE=11]="OUT_OF_RANGE",le[le.UNIMPLEMENTED=12]="UNIMPLEMENTED",le[le.INTERNAL=13]="INTERNAL",le[le.UNAVAILABLE=14]="UNAVAILABLE",le[le.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function jA(){return new TextEncoder}/**
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
 */const BA=new Qr([4294967295,4294967295],0);function Kd(t){const e=jA().encode(t),n=new q0;return n.update(e),new Uint8Array(n.digest())}function Wd(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Qr([n,r],0),new Qr([s,i],0)]}class qu{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Fs(`Invalid padding: ${n}`);if(r<0)throw new Fs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Fs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Fs(`Invalid padding when bitmap length is 0: ${n}`);this.Ae=8*e.length-n,this.Re=Qr.fromNumber(this.Ae)}Ve(e,n,r){let s=e.add(n.multiply(Qr.fromNumber(r)));return s.compare(BA)===1&&(s=new Qr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Re).toNumber()}me(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ae===0)return!1;const n=Kd(e),[r,s]=Wd(n);for(let i=0;i<this.hashCount;i++){const o=this.Ve(r,s,i);if(!this.me(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new qu(i,s,n);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.Ae===0)return;const n=Kd(e),[r,s]=Wd(n);for(let i=0;i<this.hashCount;i++){const o=this.Ve(r,s,i);this.fe(o)}}fe(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Fs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ha{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,ji.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Ha(ee.min(),s,new Oe(pe),vn(),ae())}}class ji{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new ji(r,n,ae(),ae(),ae())}}/**
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
 */class Eo{constructor(e,n,r,s){this.ge=e,this.removedTargetIds=n,this.key=r,this.pe=s}}class c_{constructor(e,n){this.targetId=e,this.ye=n}}class l_{constructor(e,n,r=ct.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Gd{constructor(){this.we=0,this.Se=Yd(),this.be=ct.EMPTY_BYTE_STRING,this.De=!1,this.Ce=!0}get current(){return this.De}get resumeToken(){return this.be}get ve(){return this.we!==0}get Fe(){return this.Ce}Me(e){e.approximateByteSize()>0&&(this.Ce=!0,this.be=e)}xe(){let e=ae(),n=ae(),r=ae();return this.Se.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:J()}}),new ji(this.be,this.De,e,n,r)}Oe(){this.Ce=!1,this.Se=Yd()}Ne(e,n){this.Ce=!0,this.Se=this.Se.insert(e,n)}Be(e){this.Ce=!0,this.Se=this.Se.remove(e)}Le(){this.we+=1}ke(){this.we-=1}qe(){this.Ce=!0,this.De=!0}}class qA{constructor(e){this.Qe=e,this.Ke=new Map,this.$e=vn(),this.Ue=Qd(),this.We=new Oe(pe)}Ge(e){for(const n of e.ge)e.pe&&e.pe.isFoundDocument()?this.ze(n,e.pe):this.je(n,e.key,e.pe);for(const n of e.removedTargetIds)this.je(n,e.key,e.pe)}He(e){this.forEachTarget(e,n=>{const r=this.Je(n);switch(e.state){case 0:this.Ye(n)&&r.Me(e.resumeToken);break;case 1:r.ke(),r.ve||r.Oe(),r.Me(e.resumeToken);break;case 2:r.ke(),r.ve||this.removeTarget(n);break;case 3:this.Ye(n)&&(r.qe(),r.Me(e.resumeToken));break;case 4:this.Ye(n)&&(this.Ze(n),r.Me(e.resumeToken));break;default:J()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ke.forEach((r,s)=>{this.Ye(s)&&n(s)})}Xe(e){const n=e.targetId,r=e.ye.count,s=this.et(n);if(s){const i=s.target;if(Rl(i))if(r===0){const o=new z(i.path);this.je(n,o,tt.newNoDocument(o,ee.min()))}else be(r===1);else{const o=this.tt(n);if(o!==r){const a=this.nt(e),c=a?this.rt(a,e,o):1;if(c!==0){this.Ze(n);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.We=this.We.insert(n,l)}}}}}nt(e){const n=e.ye.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,a;try{o=_r(r).toUint8Array()}catch(c){if(c instanceof $m)return ns("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new qu(o,s,i)}catch(c){return ns(c instanceof Fs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.Ae===0?null:a}rt(e,n,r){return n.ye.count===r-this.ot(e,n.targetId)?0:2}ot(e,n){const r=this.Qe.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Qe.st(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.je(n,i,null),s++)}),s}_t(e){const n=new Map;this.Ke.forEach((i,o)=>{const a=this.et(o);if(a){if(i.current&&Rl(a.target)){const c=new z(a.target.path);this.$e.get(c)!==null||this.ut(o,c)||this.je(o,c,tt.newNoDocument(c,e))}i.Fe&&(n.set(o,i.xe()),i.Oe())}});let r=ae();this.Ue.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const l=this.et(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(i))}),this.$e.forEach((i,o)=>o.setReadTime(e));const s=new Ha(e,n,this.We,this.$e,r);return this.$e=vn(),this.Ue=Qd(),this.We=new Oe(pe),s}ze(e,n){if(!this.Ye(e))return;const r=this.ut(e,n.key)?2:0;this.Je(e).Ne(n.key,r),this.$e=this.$e.insert(n.key,n),this.Ue=this.Ue.insert(n.key,this.ct(n.key).add(e))}je(e,n,r){if(!this.Ye(e))return;const s=this.Je(e);this.ut(e,n)?s.Ne(n,1):s.Be(n),this.Ue=this.Ue.insert(n,this.ct(n).delete(e)),r&&(this.$e=this.$e.insert(n,r))}removeTarget(e){this.Ke.delete(e)}tt(e){const n=this.Je(e).xe();return this.Qe.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}Le(e){this.Je(e).Le()}Je(e){let n=this.Ke.get(e);return n||(n=new Gd,this.Ke.set(e,n)),n}ct(e){let n=this.Ue.get(e);return n||(n=new ot(pe),this.Ue=this.Ue.insert(e,n)),n}Ye(e){const n=this.et(e)!==null;return n||M("WatchChangeAggregator","Detected inactive target",e),n}et(e){const n=this.Ke.get(e);return n&&n.ve?null:this.Qe.lt(e)}Ze(e){this.Ke.set(e,new Gd),this.Qe.getRemoteKeysForTarget(e).forEach(n=>{this.je(e,n,null)})}ut(e,n){return this.Qe.getRemoteKeysForTarget(e).has(n)}}function Qd(){return new Oe(z.comparator)}function Yd(){return new Oe(z.comparator)}const HA=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),zA=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),KA=(()=>({and:"AND",or:"OR"}))();class WA{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Sl(t,e){return t.useProto3Json||Ma(e)?e:{value:e}}function zo(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function u_(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function GA(t,e){return zo(t,e.toTimestamp())}function Zt(t){return be(!!t),ee.fromTimestamp(function(n){const r=Bn(n);return new je(r.seconds,r.nanos)}(t))}function Hu(t,e){return function(r){return new Ce(["projects",r.projectId,"databases",r.database])}(t).child("documents").child(e).canonicalString()}function h_(t){const e=Ce.fromString(t);return be(g_(e)),e}function bl(t,e){return Hu(t.databaseId,e.path)}function Pc(t,e){const n=h_(e);if(n.get(1)!==t.databaseId.projectId)throw new U(A.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new U(A.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new z(d_(n))}function Cl(t,e){return Hu(t.databaseId,e)}function QA(t){const e=h_(t);return e.length===4?Ce.emptyPath():d_(e)}function kl(t){return new Ce(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function d_(t){return be(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Jd(t,e,n){return{name:bl(t,e),fields:n.value.mapValue.fields}}function YA(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:J()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(l,u){return l.useProto3Json?(be(u===void 0||typeof u=="string"),ct.fromBase64String(u||"")):(be(u===void 0||u instanceof Uint8Array),ct.fromUint8Array(u||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(l){const u=l.code===void 0?A.UNKNOWN:a_(l.code);return new U(u,l.message||"")}(o);n=new l_(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Pc(t,r.document.name),i=Zt(r.document.updateTime),o=r.document.createTime?Zt(r.document.createTime):ee.min(),a=new gt({mapValue:{fields:r.document.fields}}),c=tt.newFoundDocument(s,i,o,a),l=r.targetIds||[],u=r.removedTargetIds||[];n=new Eo(l,u,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Pc(t,r.document),i=r.readTime?Zt(r.readTime):ee.min(),o=tt.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Eo([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Pc(t,r.document),i=r.removedTargetIds||[];n=new Eo([],i,s,null)}else{if(!("filter"in e))return J();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new $A(s,i),a=r.targetId;n=new c_(a,o)}}return n}function JA(t,e){let n;if(e instanceof Ui)n={update:Jd(t,e.key,e.value)};else if(e instanceof ju)n={delete:bl(t,e.key)};else if(e instanceof Kn)n={update:Jd(t,e.key,e.data),updateMask:oR(e.fieldMask)};else{if(!(e instanceof MA))return J();n={verify:bl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const a=o.transform;if(a instanceof wi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof os)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof as)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Ti)return{fieldPath:o.field.canonicalString(),increment:a.Te};throw J()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:GA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:J()}(t,e.precondition)),n}function XA(t,e){return t&&t.length>0?(be(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?Zt(s.updateTime):Zt(i);return o.isEqual(ee.min())&&(o=Zt(i)),new NA(o,s.transformResults||[])}(n,e))):[]}function ZA(t,e){return{documents:[Cl(t,e.path)]}}function eR(t,e){const n={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(n.parent=Cl(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Cl(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(c){if(c.length!==0)return p_(an.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const i=function(c){if(c.length!==0)return c.map(l=>function(h){return{field:Ur(h.field),direction:rR(h.dir)}}(l))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=Sl(t,e.limit);return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),n}function tR(t){let e=QA(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){be(r===1);const u=n.from[0];u.allDescendants?s=u.collectionId:e=e.child(u.collectionId)}let i=[];n.where&&(i=function(h){const d=f_(h);return d instanceof an&&qm(d)?d.getFilters():[d]}(n.where));let o=[];n.orderBy&&(o=function(h){return h.map(d=>function(m){return new zs(jr(m.field),function(y){switch(y){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(m.direction))}(d))}(n.orderBy));let a=null;n.limit&&(a=function(h){let d;return d=typeof h=="object"?h.value:h,Ma(d)?null:d}(n.limit));let c=null;n.startAt&&(c=function(h){const d=!!h.before,f=h.values||[];return new Ho(f,d)}(n.startAt));let l=null;return n.endAt&&(l=function(h){const d=!h.before,f=h.values||[];return new Ho(f,d)}(n.endAt)),yA(e,s,o,i,a,"F",c,l)}function nR(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function f_(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=jr(n.unaryFilter.field);return Ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=jr(n.unaryFilter.field);return Ue.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=jr(n.unaryFilter.field);return Ue.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=jr(n.unaryFilter.field);return Ue.create(o,"!=",{nullValue:"NULL_VALUE"});default:return J()}}(t):t.fieldFilter!==void 0?function(n){return Ue.create(jr(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return J()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return an.create(n.compositeFilter.filters.map(r=>f_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return J()}}(n.compositeFilter.op))}(t):J()}function rR(t){return HA[t]}function sR(t){return zA[t]}function iR(t){return KA[t]}function Ur(t){return{fieldPath:t.canonicalString()}}function jr(t){return rt.fromServerFormat(t.fieldPath)}function p_(t){return t instanceof Ue?function(n){if(n.op==="=="){if(Ld(n.value))return{unaryFilter:{field:Ur(n.field),op:"IS_NAN"}};if(Md(n.value))return{unaryFilter:{field:Ur(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Ld(n.value))return{unaryFilter:{field:Ur(n.field),op:"IS_NOT_NAN"}};if(Md(n.value))return{unaryFilter:{field:Ur(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ur(n.field),op:sR(n.op),value:n.value}}}(t):t instanceof an?function(n){const r=n.getFilters().map(s=>p_(s));return r.length===1?r[0]:{compositeFilter:{op:iR(n.op),filters:r}}}(t):J()}function oR(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function g_(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class Dn{constructor(e,n,r,s,i=ee.min(),o=ee.min(),a=ct.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new Dn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Dn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Dn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Dn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class aR{constructor(e){this.ht=e}}function cR(t){const e=tR({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Pl(e,e.limit,"L"):e}/**
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
 */class lR{constructor(){this.an=new uR}addToCollectionParentIndex(e,n){return this.an.add(n),P.resolve()}getCollectionParents(e,n){return P.resolve(this.an.getEntries(n))}addFieldIndex(e,n){return P.resolve()}deleteFieldIndex(e,n){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,n){return P.resolve()}getDocumentsMatchingTarget(e,n){return P.resolve(null)}getIndexType(e,n){return P.resolve(0)}getFieldIndexes(e,n){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,n){return P.resolve(jn.min())}getMinOffsetFromCollectionGroup(e,n){return P.resolve(jn.min())}updateCollectionGroup(e,n,r){return P.resolve()}updateIndexEntries(e,n){return P.resolve()}}class uR{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new ot(Ce.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ot(Ce.comparator)).toArray()}}/**
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
 */class cs{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static Bn(){return new cs(0)}static Ln(){return new cs(-1)}}/**
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
 */class hR{constructor(){this.changes=new Is(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,tt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?P.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class dR{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class fR{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Gs(r.mutation,s,wt.empty(),je.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ae()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ae()){const s=ir();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Ls();return i.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=ir();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ae()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,s){let i=vn();const o=Ws(),a=function(){return Ws()}();return n.forEach((c,l)=>{const u=r.get(l.key);s.has(l.key)&&(u===void 0||u.mutation instanceof Kn)?i=i.insert(l.key,l):u!==void 0?(o.set(l.key,u.mutation.getFieldMask()),Gs(u.mutation,l,u.mutation.getFieldMask(),je.now())):o.set(l.key,wt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((l,u)=>o.set(l,u)),n.forEach((l,u)=>{var h;return a.set(l,new dR(u,(h=o.get(l))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const r=Ws();let s=new Oe((o,a)=>o-a),i=ae();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(c=>{const l=n.get(c);if(l===null)return;let u=r.get(c)||wt.empty();u=a.applyToLocalView(l,u),r.set(c,u);const h=(s.get(a.batchId)||ae()).add(c);s=s.insert(a.batchId,h)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,u=c.value,h=Jm();u.forEach(d=>{if(!i.has(d)){const f=i_(n.get(d),r.get(d));f!==null&&h.set(d,f),i=i.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,h))}return P.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):IA(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):P.resolve(ir());let a=-1,c=i;return o.next(l=>P.forEach(l,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(u)?P.resolve():this.remoteDocumentCache.getEntry(e,u).next(d=>{c=c.insert(u,d)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,c,l,ae())).next(u=>({batchId:a,changes:Ym(u)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new z(n)).next(r=>{let s=Ls();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Ls();return this.indexManager.getCollectionParents(e,i).next(a=>P.forEach(a,c=>{const l=function(h,d){return new La(d,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next(u=>{u.forEach((h,d)=>{o=o.insert(h,d)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((c,l)=>{const u=l.getKey();o.get(u)===null&&(o=o.insert(u,tt.newInvalidDocument(u)))});let a=Ls();return o.forEach((c,l)=>{const u=i.get(c);u!==void 0&&Gs(u.mutation,l,wt.empty(),je.now()),Ua(n,l)&&(a=a.insert(c,l))}),a})}}/**
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
 */class pR{constructor(e){this.serializer=e,this.lr=new Map,this.hr=new Map}getBundleMetadata(e,n){return P.resolve(this.lr.get(n))}saveBundleMetadata(e,n){return this.lr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:Zt(s.createTime)}}(n)),P.resolve()}getNamedQuery(e,n){return P.resolve(this.hr.get(n))}saveNamedQuery(e,n){return this.hr.set(n.name,function(s){return{name:s.name,query:cR(s.bundledQuery),readTime:Zt(s.readTime)}}(n)),P.resolve()}}/**
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
 */class gR{constructor(){this.overlays=new Oe(z.comparator),this.Pr=new Map}getOverlay(e,n){return P.resolve(this.overlays.get(n))}getOverlays(e,n){const r=ir();return P.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.It(e,n,i)}),P.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Pr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Pr.delete(r)),P.resolve()}getOverlaysForCollection(e,n,r){const s=ir(),i=n.length+1,o=new z(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!n.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return P.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Oe((l,u)=>l-u);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===n&&l.largestBatchId>r){let u=i.get(l.largestBatchId);u===null&&(u=ir(),i=i.insert(l.largestBatchId,u)),u.set(l.getKey(),l)}}const a=ir(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,u)=>a.set(l,u)),!(a.size()>=s)););return P.resolve(a)}It(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Pr.get(s.largestBatchId).delete(r.key);this.Pr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new FA(n,r));let i=this.Pr.get(n);i===void 0&&(i=ae(),this.Pr.set(n,i)),this.Pr.set(n,i.add(r.key))}}/**
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
 */class zu{constructor(){this.Ir=new ot(He.dr),this.Tr=new ot(He.Er)}isEmpty(){return this.Ir.isEmpty()}addReference(e,n){const r=new He(e,n);this.Ir=this.Ir.add(r),this.Tr=this.Tr.add(r)}Ar(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Rr(new He(e,n))}Vr(e,n){e.forEach(r=>this.removeReference(r,n))}mr(e){const n=new z(new Ce([])),r=new He(n,e),s=new He(n,e+1),i=[];return this.Tr.forEachInRange([r,s],o=>{this.Rr(o),i.push(o.key)}),i}gr(){this.Ir.forEach(e=>this.Rr(e))}Rr(e){this.Ir=this.Ir.delete(e),this.Tr=this.Tr.delete(e)}pr(e){const n=new z(new Ce([])),r=new He(n,e),s=new He(n,e+1);let i=ae();return this.Tr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new He(e,0),r=this.Ir.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class He{constructor(e,n){this.key=e,this.yr=n}static dr(e,n){return z.comparator(e.key,n.key)||pe(e.yr,n.yr)}static Er(e,n){return pe(e.yr,n.yr)||z.comparator(e.key,n.key)}}/**
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
 */class mR{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.wr=1,this.Sr=new ot(He.dr)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.wr;this.wr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new LA(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this.Sr=this.Sr.add(new He(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return P.resolve(o)}lookupMutationBatch(e,n){return P.resolve(this.br(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.Dr(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.wr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new He(n,0),s=new He(n,Number.POSITIVE_INFINITY),i=[];return this.Sr.forEachInRange([r,s],o=>{const a=this.br(o.yr);i.push(a)}),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ot(pe);return n.forEach(s=>{const i=new He(s,0),o=new He(s,Number.POSITIVE_INFINITY);this.Sr.forEachInRange([i,o],a=>{r=r.add(a.yr)})}),P.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;z.isDocumentKey(i)||(i=i.child(""));const o=new He(new z(i),0);let a=new ot(pe);return this.Sr.forEachWhile(c=>{const l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(a=a.add(c.yr)),!0)},o),P.resolve(this.Cr(a))}Cr(e){const n=[];return e.forEach(r=>{const s=this.br(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){be(this.vr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Sr;return P.forEach(n.mutations,s=>{const i=new He(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Sr=r})}xn(e){}containsKey(e,n){const r=new He(n,0),s=this.Sr.firstAfterOrEqual(r);return P.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}vr(e,n){return this.Dr(e)}Dr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}br(e){const n=this.Dr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class _R{constructor(e){this.Fr=e,this.docs=function(){return new Oe(z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Fr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return P.resolve(r?r.document.mutableCopy():tt.newInvalidDocument(n))}getEntries(e,n){let r=vn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():tt.newInvalidDocument(s))}),P.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=vn();const o=n.path,a=new z(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:u}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||tA(eA(u),r)<=0||(s.has(u.key)||Ua(n,u))&&(i=i.insert(u.key,u.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,n,r,s){J()}Mr(e,n){return P.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new yR(this)}getSize(e){return P.resolve(this.size)}}class yR extends hR{constructor(e){super(),this.ur=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.ur.addEntry(e,s)):this.ur.removeEntry(r)}),P.waitFor(n)}getFromCache(e,n){return this.ur.getEntry(e,n)}getAllFromCache(e,n){return this.ur.getEntries(e,n)}}/**
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
 */class vR{constructor(e){this.persistence=e,this.Or=new Is(n=>$u(n),Uu),this.lastRemoteSnapshotVersion=ee.min(),this.highestTargetId=0,this.Nr=0,this.Br=new zu,this.targetCount=0,this.Lr=cs.Bn()}forEachTarget(e,n){return this.Or.forEach((r,s)=>n(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Nr)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Nr&&(this.Nr=n),P.resolve()}Qn(e){this.Or.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Lr=new cs(n),this.highestTargetId=n),e.sequenceNumber>this.Nr&&(this.Nr=e.sequenceNumber)}addTargetData(e,n){return this.Qn(n),this.targetCount+=1,P.resolve()}updateTargetData(e,n){return this.Qn(n),P.resolve()}removeTargetData(e,n){return this.Or.delete(n.target),this.Br.mr(n.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Or.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.Or.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),P.waitFor(i).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,n){const r=this.Or.get(n)||null;return P.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Ar(n,r),P.resolve()}removeMatchingKeys(e,n,r){this.Br.Vr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),P.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.mr(n),P.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.pr(n);return P.resolve(r)}containsKey(e,n){return P.resolve(this.Br.containsKey(n))}}/**
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
 */class ER{constructor(e,n){this.kr={},this.overlays={},this.qr=new xu(0),this.Qr=!1,this.Qr=!0,this.referenceDelegate=e(this),this.Kr=new vR(this),this.indexManager=new lR,this.remoteDocumentCache=function(s){return new _R(s)}(r=>this.referenceDelegate.$r(r)),this.serializer=new aR(n),this.Ur=new pR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Qr=!1,Promise.resolve()}get started(){return this.Qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new gR,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.kr[e.toKey()];return r||(r=new mR(n,this.referenceDelegate),this.kr[e.toKey()]=r),r}getTargetCache(){return this.Kr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ur}runTransaction(e,n,r){M("MemoryPersistence","Starting transaction:",e);const s=new IR(this.qr.next());return this.referenceDelegate.Wr(),r(s).next(i=>this.referenceDelegate.Gr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}zr(e,n){return P.or(Object.values(this.kr).map(r=>()=>r.containsKey(e,n)))}}class IR extends rA{constructor(e){super(),this.currentSequenceNumber=e}}class Ku{constructor(e){this.persistence=e,this.jr=new zu,this.Hr=null}static Jr(e){return new Ku(e)}get Yr(){if(this.Hr)return this.Hr;throw J()}addReference(e,n,r){return this.jr.addReference(r,n),this.Yr.delete(r.toString()),P.resolve()}removeReference(e,n,r){return this.jr.removeReference(r,n),this.Yr.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,n){return this.Yr.add(n.toString()),P.resolve()}removeTarget(e,n){this.jr.mr(n.targetId).forEach(s=>this.Yr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Yr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Wr(){this.Hr=new Set}Gr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Yr,r=>{const s=z.fromPath(r);return this.Zr(e,s).next(i=>{i||n.removeEntry(s,ee.min())})}).next(()=>(this.Hr=null,n.apply(e)))}updateLimboDocument(e,n){return this.Zr(e,n).next(r=>{r?this.Yr.delete(n.toString()):this.Yr.add(n.toString())})}$r(e){return 0}Zr(e,n){return P.or([()=>P.resolve(this.jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.zr(e,n)])}}/**
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
 */class Wu{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Qi=r,this.Ki=s}static $i(e,n){let r=ae(),s=ae();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Wu(e,n.fromCache,r,s)}}/**
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
 */class wR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class TR{constructor(){this.Ui=!1,this.Wi=!1,this.Gi=100,this.zi=8}initialize(e,n){this.ji=e,this.indexManager=n,this.Ui=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Hi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Ji(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new wR;return this.Yi(e,n,o).next(a=>{if(i.result=a,this.Wi)return this.Zi(e,n,o,a.size)})}).next(()=>i.result)}Zi(e,n,r,s){return r.documentReadCount<this.Gi?(Cs()<=ce.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",$r(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Gi,"documents"),P.resolve()):(Cs()<=ce.DEBUG&&M("QueryEngine","Query:",$r(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.zi*s?(Cs()<=ce.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",$r(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Xt(n))):P.resolve())}Hi(e,n){if(jd(n))return P.resolve(null);let r=Xt(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Pl(n,null,"F"),r=Xt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=ae(...i);return this.ji.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{const l=this.Xi(n,a);return this.es(n,l,o,c.readTime)?this.Hi(e,Pl(n,null,"F")):this.ts(e,l,n,c)}))})))}Ji(e,n,r,s){return jd(n)||s.isEqual(ee.min())?P.resolve(null):this.ji.getDocuments(e,r).next(i=>{const o=this.Xi(n,i);return this.es(n,o,r,s)?P.resolve(null):(Cs()<=ce.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),$r(n)),this.ts(e,o,n,Z0(s,-1)).next(a=>a))})}Xi(e,n){let r=new ot(Gm(e));return n.forEach((s,i)=>{Ua(e,i)&&(r=r.add(i))}),r}es(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Yi(e,n,r){return Cs()<=ce.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",$r(n)),this.ji.getDocumentsMatchingQuery(e,n,jn.min(),r)}ts(e,n,r,s){return this.ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class AR{constructor(e,n,r,s){this.persistence=e,this.ns=n,this.serializer=s,this.rs=new Oe(pe),this.ss=new Is(i=>$u(i),Uu),this.os=new Map,this._s=e.getRemoteDocumentCache(),this.Kr=e.getTargetCache(),this.Ur=e.getBundleCache(),this.us(r)}us(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new fR(this._s,this.mutationQueue,this.documentOverlayCache,this.indexManager),this._s.setIndexManager(this.indexManager),this.ns.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.rs))}}function RR(t,e,n,r){return new AR(t,e,n,r)}async function m_(t,e){const n=ne(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.us(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let c=ae();for(const l of s){o.push(l.batchId);for(const u of l.mutations)c=c.add(u.key)}for(const l of i){a.push(l.batchId);for(const u of l.mutations)c=c.add(u.key)}return n.localDocuments.getDocuments(r,c).next(l=>({cs:l,removedBatchIds:o,addedBatchIds:a}))})})}function PR(t,e){const n=ne(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n._s.newChangeBuffer({trackRemovals:!0});return function(a,c,l,u){const h=l.batch,d=h.keys();let f=P.resolve();return d.forEach(m=>{f=f.next(()=>u.getEntry(c,m)).next(v=>{const y=l.docVersions.get(m);be(y!==null),v.version.compareTo(y)<0&&(h.applyToRemoteDocument(v,l),v.isValidDocument()&&(v.setReadTime(l.commitVersion),u.addEntry(v)))})}),f.next(()=>a.mutationQueue.removeMutationBatch(c,h))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let c=ae();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function __(t){const e=ne(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Kr.getLastRemoteSnapshotVersion(n))}function SR(t,e){const n=ne(t),r=e.snapshotVersion;let s=n.rs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n._s.newChangeBuffer({trackRemovals:!0});s=n.rs;const a=[];e.targetChanges.forEach((u,h)=>{const d=s.get(h);if(!d)return;a.push(n.Kr.removeMatchingKeys(i,u.removedDocuments,h).next(()=>n.Kr.addMatchingKeys(i,u.addedDocuments,h)));let f=d.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(h)!==null?f=f.withResumeToken(ct.EMPTY_BYTE_STRING,ee.min()).withLastLimboFreeSnapshotVersion(ee.min()):u.resumeToken.approximateByteSize()>0&&(f=f.withResumeToken(u.resumeToken,r)),s=s.insert(h,f),function(v,y,T){return v.resumeToken.approximateByteSize()===0||y.snapshotVersion.toMicroseconds()-v.snapshotVersion.toMicroseconds()>=3e8?!0:T.addedDocuments.size+T.modifiedDocuments.size+T.removedDocuments.size>0}(d,f,u)&&a.push(n.Kr.updateTargetData(i,f))});let c=vn(),l=ae();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,u))}),a.push(bR(i,o,e.documentUpdates).next(u=>{c=u.ls,l=u.hs})),!r.isEqual(ee.min())){const u=n.Kr.getLastRemoteSnapshotVersion(i).next(h=>n.Kr.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(u)}return P.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,l)).next(()=>c)}).then(i=>(n.rs=s,i))}function bR(t,e,n){let r=ae(),s=ae();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=vn();return n.forEach((a,c)=>{const l=i.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(ee.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):M("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)}),{ls:o,hs:s}})}function CR(t,e){const n=ne(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function kR(t,e){const n=ne(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Kr.getTargetData(r,e).next(i=>i?(s=i,P.resolve(s)):n.Kr.allocateTargetId(r).next(o=>(s=new Dn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Kr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.rs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.rs=n.rs.insert(r.targetId,r),n.ss.set(e,r.targetId)),r})}async function Ol(t,e,n){const r=ne(t),s=r.rs.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!$i(o))throw o;M("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.rs=r.rs.remove(e),r.ss.delete(s.target)}function Xd(t,e,n){const r=ne(t);let s=ee.min(),i=ae();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,l,u){const h=ne(c),d=h.ss.get(u);return d!==void 0?P.resolve(h.rs.get(d)):h.Kr.getTargetData(l,u)}(r,o,Xt(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Kr.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>r.ns.getDocumentsMatchingQuery(o,e,n?s:ee.min(),n?i:ae())).next(a=>(OR(r,TA(e),a),{documents:a,Ps:i})))}function OR(t,e,n){let r=t.os.get(e)||ee.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.os.set(e,r)}class Zd{constructor(){this.activeTargetIds=CA()}Rs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}As(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class DR{constructor(){this.ro=new Zd,this.io={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e){return this.ro.Rs(e),this.io[e]||"not-current"}updateQueryState(e,n,r){this.io[e]=n}removeLocalQueryTarget(e){this.ro.Vs(e)}isLocalQueryTarget(e){return this.ro.activeTargetIds.has(e)}clearQueryState(e){delete this.io[e]}getAllActiveQueryTargets(){return this.ro.activeTargetIds}isActiveQueryTarget(e){return this.ro.activeTargetIds.has(e)}start(){return this.ro=new Zd,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class NR{so(e){}shutdown(){}}/**
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
 */class ef{constructor(){this.oo=()=>this._o(),this.ao=()=>this.uo(),this.co=[],this.lo()}so(e){this.co.push(e)}shutdown(){window.removeEventListener("online",this.oo),window.removeEventListener("offline",this.ao)}lo(){window.addEventListener("online",this.oo),window.addEventListener("offline",this.ao)}_o(){M("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.co)e(0)}uo(){M("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.co)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let uo=null;function Sc(){return uo===null?uo=function(){return 268435456+Math.round(2147483648*Math.random())}():uo++,"0x"+uo.toString(16)}/**
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
 */const VR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class xR{constructor(e){this.ho=e.ho,this.Po=e.Po}Io(e){this.To=e}Eo(e){this.Ao=e}onMessage(e){this.Ro=e}close(){this.Po()}send(e){this.ho(e)}Vo(){this.To()}mo(e){this.Ao(e)}fo(e){this.Ro(e)}}/**
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
 */const Ze="WebChannelConnection";class MR extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.po=r+"://"+n.host,this.yo=`projects/${s}/databases/${i}`,this.wo=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get So(){return!1}bo(n,r,s,i,o){const a=Sc(),c=this.Do(n,r);M("RestConnection",`Sending RPC '${n}' ${a}:`,c,s);const l={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Co(l,i,o),this.vo(n,c,l,s).then(u=>(M("RestConnection",`Received RPC '${n}' ${a}: `,u),u),u=>{throw ns("RestConnection",`RPC '${n}' ${a} failed with error: `,u,"url: ",c,"request:",s),u})}Fo(n,r,s,i,o,a){return this.bo(n,r,s,i,o)}Co(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Es}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}Do(n,r){const s=VR[n];return`${this.po}/v1/${r}:${s}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,n,r,s){const i=Sc();return new Promise((o,a)=>{const c=new B0;c.setWithCredentials(!0),c.listenOnce(U0.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Rc.NO_ERROR:const u=c.getResponseJson();M(Ze,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(u)),o(u);break;case Rc.TIMEOUT:M(Ze,`RPC '${e}' ${i} timed out`),a(new U(A.DEADLINE_EXCEEDED,"Request time out"));break;case Rc.HTTP_ERROR:const h=c.getStatus();if(M(Ze,`RPC '${e}' ${i} failed with status:`,h,"response text:",c.getResponseText()),h>0){let d=c.getResponseJson();Array.isArray(d)&&(d=d[0]);const f=d==null?void 0:d.error;if(f&&f.status&&f.message){const m=function(y){const T=y.toLowerCase().replace(/_/g,"-");return Object.values(A).indexOf(T)>=0?T:A.UNKNOWN}(f.status);a(new U(m,f.message))}else a(new U(A.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new U(A.UNAVAILABLE,"Connection failed."));break;default:J()}}finally{M(Ze,`RPC '${e}' ${i} completed.`)}});const l=JSON.stringify(s);M(Ze,`RPC '${e}' ${i} sending request:`,s),c.send(n,"POST",l,r,15)})}Mo(e,n,r){const s=Sc(),i=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=F0(),a=$0(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Co(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const u=i.join("");M(Ze,`Creating RPC '${e}' stream ${s}: ${u}`,c);const h=o.createWebChannel(u,c);let d=!1,f=!1;const m=new xR({ho:y=>{f?M(Ze,`Not sending because RPC '${e}' stream ${s} is closed:`,y):(d||(M(Ze,`Opening RPC '${e}' stream ${s} transport.`),h.open(),d=!0),M(Ze,`RPC '${e}' stream ${s} sending:`,y),h.send(y))},Po:()=>h.close()}),v=(y,T,C)=>{y.listen(T,F=>{try{C(F)}catch(N){setTimeout(()=>{throw N},0)}})};return v(h,ao.EventType.OPEN,()=>{f||M(Ze,`RPC '${e}' stream ${s} transport opened.`)}),v(h,ao.EventType.CLOSE,()=>{f||(f=!0,M(Ze,`RPC '${e}' stream ${s} transport closed`),m.mo())}),v(h,ao.EventType.ERROR,y=>{f||(f=!0,ns(Ze,`RPC '${e}' stream ${s} transport errored:`,y),m.mo(new U(A.UNAVAILABLE,"The operation could not be completed")))}),v(h,ao.EventType.MESSAGE,y=>{var T;if(!f){const C=y.data[0];be(!!C);const F=C,N=F.error||((T=F[0])===null||T===void 0?void 0:T.error);if(N){M(Ze,`RPC '${e}' stream ${s} received error:`,N);const G=N.status;let W=function(Q){const se=Me[Q];if(se!==void 0)return a_(se)}(G),re=N.message;W===void 0&&(W=A.INTERNAL,re="Unknown error status: "+G+" with message "+N.message),f=!0,m.mo(new U(W,re)),h.close()}else M(Ze,`RPC '${e}' stream ${s} received:`,C),m.fo(C)}}),v(a,j0.STAT_EVENT,y=>{y.stat===Od.PROXY?M(Ze,`RPC '${e}' stream ${s} detected buffering proxy`):y.stat===Od.NOPROXY&&M(Ze,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{m.Vo()},0),m}}function bc(){return typeof document<"u"?document:null}/**
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
 */function za(t){return new WA(t,!0)}/**
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
 */class y_{constructor(e,n,r=1e3,s=1.5,i=6e4){this._i=e,this.timerId=n,this.xo=r,this.Oo=s,this.No=i,this.Bo=0,this.Lo=null,this.ko=Date.now(),this.reset()}reset(){this.Bo=0}qo(){this.Bo=this.No}Qo(e){this.cancel();const n=Math.floor(this.Bo+this.Ko()),r=Math.max(0,Date.now()-this.ko),s=Math.max(0,n-r);s>0&&M("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Bo} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Lo=this._i.enqueueAfterDelay(this.timerId,s,()=>(this.ko=Date.now(),e())),this.Bo*=this.Oo,this.Bo<this.xo&&(this.Bo=this.xo),this.Bo>this.No&&(this.Bo=this.No)}$o(){this.Lo!==null&&(this.Lo.skipDelay(),this.Lo=null)}cancel(){this.Lo!==null&&(this.Lo.cancel(),this.Lo=null)}Ko(){return(Math.random()-.5)*this.Bo}}/**
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
 */class v_{constructor(e,n,r,s,i,o,a,c){this._i=e,this.Uo=r,this.Wo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Go=0,this.zo=null,this.jo=null,this.stream=null,this.Ho=new y_(e,n)}Jo(){return this.state===1||this.state===5||this.Yo()}Yo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Zo()}async stop(){this.Jo()&&await this.close(0)}Xo(){this.state=0,this.Ho.reset()}e_(){this.Yo()&&this.zo===null&&(this.zo=this._i.enqueueAfterDelay(this.Uo,6e4,()=>this.t_()))}n_(e){this.r_(),this.stream.send(e)}async t_(){if(this.Yo())return this.close(0)}r_(){this.zo&&(this.zo.cancel(),this.zo=null)}i_(){this.jo&&(this.jo.cancel(),this.jo=null)}async close(e,n){this.r_(),this.i_(),this.Ho.cancel(),this.Go++,e!==4?this.Ho.reset():n&&n.code===A.RESOURCE_EXHAUSTED?(yn(n.toString()),yn("Using maximum backoff delay to prevent overloading the backend."),this.Ho.qo()):n&&n.code===A.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.s_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Eo(n)}s_(){}auth(){this.state=1;const e=this.o_(this.Go),n=this.Go;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Go===n&&this.__(r,s)},r=>{e(()=>{const s=new U(A.UNKNOWN,"Fetching auth token failed: "+r.message);return this.a_(s)})})}__(e,n){const r=this.o_(this.Go);this.stream=this.u_(e,n),this.stream.Io(()=>{r(()=>(this.state=2,this.jo=this._i.enqueueAfterDelay(this.Wo,1e4,()=>(this.Yo()&&(this.state=3),Promise.resolve())),this.listener.Io()))}),this.stream.Eo(s=>{r(()=>this.a_(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}Zo(){this.state=5,this.Ho.Qo(async()=>{this.state=0,this.start()})}a_(e){return M("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}o_(e){return n=>{this._i.enqueueAndForget(()=>this.Go===e?n():(M("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class LR extends v_{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}u_(e,n){return this.connection.Mo("Listen",e,n)}onMessage(e){this.Ho.reset();const n=YA(this.serializer,e),r=function(i){if(!("targetChange"in i))return ee.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ee.min():o.readTime?Zt(o.readTime):ee.min()}(e);return this.listener.c_(n,r)}l_(e){const n={};n.database=kl(this.serializer),n.addTarget=function(i,o){let a;const c=o.target;if(a=Rl(c)?{documents:ZA(i,c)}:{query:eR(i,c)},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=u_(i,o.resumeToken);const l=Sl(i,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(ee.min())>0){a.readTime=zo(i,o.snapshotVersion.toTimestamp());const l=Sl(i,o.expectedCount);l!==null&&(a.expectedCount=l)}return a}(this.serializer,e);const r=nR(this.serializer,e);r&&(n.labels=r),this.n_(n)}h_(e){const n={};n.database=kl(this.serializer),n.removeTarget=e,this.n_(n)}}class FR extends v_{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i,this.P_=!1}get I_(){return this.P_}start(){this.P_=!1,this.lastStreamToken=void 0,super.start()}s_(){this.P_&&this.d_([])}u_(e,n){return this.connection.Mo("Write",e,n)}onMessage(e){if(be(!!e.streamToken),this.lastStreamToken=e.streamToken,this.P_){this.Ho.reset();const n=XA(e.writeResults,e.commitTime),r=Zt(e.commitTime);return this.listener.T_(r,n)}return be(!e.writeResults||e.writeResults.length===0),this.P_=!0,this.listener.E_()}A_(){const e={};e.database=kl(this.serializer),this.n_(e)}d_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>JA(this.serializer,r))};this.n_(n)}}/**
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
 */class $R extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.R_=!1}V_(){if(this.R_)throw new U(A.FAILED_PRECONDITION,"The client has already been terminated.")}bo(e,n,r){return this.V_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.bo(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===A.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(A.UNKNOWN,s.toString())})}Fo(e,n,r,s){return this.V_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Fo(e,n,r,i,o,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===A.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(A.UNKNOWN,i.toString())})}terminate(){this.R_=!0}}class UR{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.f_=0,this.g_=null,this.p_=!0}y_(){this.f_===0&&(this.w_("Unknown"),this.g_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.g_=null,this.S_("Backend didn't respond within 10 seconds."),this.w_("Offline"),Promise.resolve())))}b_(e){this.state==="Online"?this.w_("Unknown"):(this.f_++,this.f_>=1&&(this.D_(),this.S_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.w_("Offline")))}set(e){this.D_(),this.f_=0,e==="Online"&&(this.p_=!1),this.w_(e)}w_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}S_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.p_?(yn(n),this.p_=!1):M("OnlineStateTracker",n)}D_(){this.g_!==null&&(this.g_.cancel(),this.g_=null)}}/**
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
 */class jR{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.C_=[],this.v_=new Map,this.F_=new Set,this.M_=[],this.x_=i,this.x_.so(o=>{r.enqueueAndForget(async()=>{br(this)&&(M("RemoteStore","Restarting streams for network reachability change."),await async function(c){const l=ne(c);l.F_.add(4),await Bi(l),l.O_.set("Unknown"),l.F_.delete(4),await Ka(l)}(this))})}),this.O_=new UR(r,s)}}async function Ka(t){if(br(t))for(const e of t.M_)await e(!0)}async function Bi(t){for(const e of t.M_)await e(!1)}function E_(t,e){const n=ne(t);n.v_.has(e.targetId)||(n.v_.set(e.targetId,e),Yu(n)?Qu(n):ws(n).Yo()&&Gu(n,e))}function I_(t,e){const n=ne(t),r=ws(n);n.v_.delete(e),r.Yo()&&w_(n,e),n.v_.size===0&&(r.Yo()?r.e_():br(n)&&n.O_.set("Unknown"))}function Gu(t,e){if(t.N_.Le(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ee.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}ws(t).l_(e)}function w_(t,e){t.N_.Le(e),ws(t).h_(e)}function Qu(t){t.N_=new qA({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.v_.get(e)||null,st:()=>t.datastore.serializer.databaseId}),ws(t).start(),t.O_.y_()}function Yu(t){return br(t)&&!ws(t).Jo()&&t.v_.size>0}function br(t){return ne(t).F_.size===0}function T_(t){t.N_=void 0}async function BR(t){t.v_.forEach((e,n)=>{Gu(t,e)})}async function qR(t,e){T_(t),Yu(t)?(t.O_.b_(e),Qu(t)):t.O_.set("Unknown")}async function HR(t,e,n){if(t.O_.set("Online"),e instanceof l_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const a of i.targetIds)s.v_.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.v_.delete(a),s.N_.removeTarget(a))}(t,e)}catch(r){M("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ko(t,r)}else if(e instanceof Eo?t.N_.Ge(e):e instanceof c_?t.N_.Xe(e):t.N_.He(e),!n.isEqual(ee.min()))try{const r=await __(t.localStore);n.compareTo(r)>=0&&await function(i,o){const a=i.N_._t(o);return a.targetChanges.forEach((c,l)=>{if(c.resumeToken.approximateByteSize()>0){const u=i.v_.get(l);u&&i.v_.set(l,u.withResumeToken(c.resumeToken,o))}}),a.targetMismatches.forEach((c,l)=>{const u=i.v_.get(c);if(!u)return;i.v_.set(c,u.withResumeToken(ct.EMPTY_BYTE_STRING,u.snapshotVersion)),w_(i,c);const h=new Dn(u.target,c,l,u.sequenceNumber);Gu(i,h)}),i.remoteSyncer.applyRemoteEvent(a)}(t,n)}catch(r){M("RemoteStore","Failed to raise snapshot:",r),await Ko(t,r)}}async function Ko(t,e,n){if(!$i(e))throw e;t.F_.add(1),await Bi(t),t.O_.set("Offline"),n||(n=()=>__(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{M("RemoteStore","Retrying IndexedDB access"),await n(),t.F_.delete(1),await Ka(t)})}function A_(t,e){return e().catch(n=>Ko(t,n,e))}async function Wa(t){const e=ne(t),n=qn(e);let r=e.C_.length>0?e.C_[e.C_.length-1].batchId:-1;for(;zR(e);)try{const s=await CR(e.localStore,r);if(s===null){e.C_.length===0&&n.e_();break}r=s.batchId,KR(e,s)}catch(s){await Ko(e,s)}R_(e)&&P_(e)}function zR(t){return br(t)&&t.C_.length<10}function KR(t,e){t.C_.push(e);const n=qn(t);n.Yo()&&n.I_&&n.d_(e.mutations)}function R_(t){return br(t)&&!qn(t).Jo()&&t.C_.length>0}function P_(t){qn(t).start()}async function WR(t){qn(t).A_()}async function GR(t){const e=qn(t);for(const n of t.C_)e.d_(n.mutations)}async function QR(t,e,n){const r=t.C_.shift(),s=Bu.from(r,e,n);await A_(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Wa(t)}async function YR(t,e){e&&qn(t).I_&&await async function(r,s){if(function(o){return UA(o)&&o!==A.ABORTED}(s.code)){const i=r.C_.shift();qn(r).Xo(),await A_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Wa(r)}}(t,e),R_(t)&&P_(t)}async function tf(t,e){const n=ne(t);n.asyncQueue.verifyOperationInProgress(),M("RemoteStore","RemoteStore received new credentials");const r=br(n);n.F_.add(3),await Bi(n),r&&n.O_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.F_.delete(3),await Ka(n)}async function JR(t,e){const n=ne(t);e?(n.F_.delete(2),await Ka(n)):e||(n.F_.add(2),await Bi(n),n.O_.set("Unknown"))}function ws(t){return t.B_||(t.B_=function(n,r,s){const i=ne(n);return i.V_(),new LR(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Io:BR.bind(null,t),Eo:qR.bind(null,t),c_:HR.bind(null,t)}),t.M_.push(async e=>{e?(t.B_.Xo(),Yu(t)?Qu(t):t.O_.set("Unknown")):(await t.B_.stop(),T_(t))})),t.B_}function qn(t){return t.L_||(t.L_=function(n,r,s){const i=ne(n);return i.V_(),new FR(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Io:WR.bind(null,t),Eo:YR.bind(null,t),E_:GR.bind(null,t),T_:QR.bind(null,t)}),t.M_.push(async e=>{e?(t.L_.Xo(),await Wa(t)):(await t.L_.stop(),t.C_.length>0&&(M("RemoteStore",`Stopping write stream with ${t.C_.length} pending writes`),t.C_=[]))})),t.L_}/**
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
 */class Ju{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ln,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new Ju(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(A.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Xu(t,e){if(yn("AsyncQueue",`${e}: ${t}`),$i(t))return new U(A.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Yr{constructor(e){this.comparator=e?(n,r)=>e(n,r)||z.comparator(n.key,r.key):(n,r)=>z.comparator(n.key,r.key),this.keyedMap=Ls(),this.sortedSet=new Oe(this.comparator)}static emptySet(e){return new Yr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Yr)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Yr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class nf{constructor(){this.k_=new Oe(z.comparator)}track(e){const n=e.doc.key,r=this.k_.get(n);r?e.type!==0&&r.type===3?this.k_=this.k_.insert(n,e):e.type===3&&r.type!==1?this.k_=this.k_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.k_=this.k_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.k_=this.k_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.k_=this.k_.remove(n):e.type===1&&r.type===2?this.k_=this.k_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.k_=this.k_.insert(n,{type:2,doc:e.doc}):J():this.k_=this.k_.insert(n,e)}q_(){const e=[];return this.k_.inorderTraversal((n,r)=>{e.push(r)}),e}}class ls{constructor(e,n,r,s,i,o,a,c,l){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new ls(e,n,Yr.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$a(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class XR{constructor(){this.Q_=void 0,this.listeners=[]}}class ZR{constructor(){this.queries=new Is(e=>Wm(e),$a),this.onlineState="Unknown",this.K_=new Set}}async function S_(t,e){const n=ne(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new XR),s)try{i.Q_=await n.onListen(r)}catch(o){const a=Xu(o,`Initialization of query '${$r(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,i),i.listeners.push(e),e.U_(n.onlineState),i.Q_&&e.W_(i.Q_)&&Zu(n)}async function b_(t,e){const n=ne(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function eP(t,e){const n=ne(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.W_(s)&&(r=!0);o.Q_=s}}r&&Zu(n)}function tP(t,e,n){const r=ne(t),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(n);r.queries.delete(e)}function Zu(t){t.K_.forEach(e=>{e.next()})}class C_{constructor(e,n,r){this.query=e,this.G_=n,this.z_=!1,this.j_=null,this.onlineState="Unknown",this.options=r||{}}W_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ls(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.z_?this.H_(e)&&(this.G_.next(e),n=!0):this.J_(e,this.onlineState)&&(this.Y_(e),n=!0),this.j_=e,n}onError(e){this.G_.error(e)}U_(e){this.onlineState=e;let n=!1;return this.j_&&!this.z_&&this.J_(this.j_,e)&&(this.Y_(this.j_),n=!0),n}J_(e,n){if(!e.fromCache)return!0;const r=n!=="Offline";return(!this.options.Z_||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}H_(e){if(e.docChanges.length>0)return!0;const n=this.j_&&this.j_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Y_(e){e=ls.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.z_=!0,this.G_.next(e)}}/**
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
 */class k_{constructor(e){this.key=e}}class O_{constructor(e){this.key=e}}class nP{constructor(e,n){this.query=e,this.oa=n,this._a=null,this.hasCachedResults=!1,this.current=!1,this.aa=ae(),this.mutatedKeys=ae(),this.ua=Gm(e),this.ca=new Yr(this.ua)}get la(){return this.oa}ha(e,n){const r=n?n.Pa:new nf,s=n?n.ca:this.ca;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((u,h)=>{const d=s.get(u),f=Ua(this.query,h)?h:null,m=!!d&&this.mutatedKeys.has(d.key),v=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations);let y=!1;d&&f?d.data.isEqual(f.data)?m!==v&&(r.track({type:3,doc:f}),y=!0):this.Ia(d,f)||(r.track({type:2,doc:f}),y=!0,(c&&this.ua(f,c)>0||l&&this.ua(f,l)<0)&&(a=!0)):!d&&f?(r.track({type:0,doc:f}),y=!0):d&&!f&&(r.track({type:1,doc:d}),y=!0,(c||l)&&(a=!0)),y&&(f?(o=o.add(f),i=v?i.add(u):i.delete(u)):(o=o.delete(u),i=i.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),i=i.delete(u.key),r.track({type:1,doc:u})}return{ca:o,Pa:r,es:a,mutatedKeys:i}}Ia(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r){const s=this.ca;this.ca=e.ca,this.mutatedKeys=e.mutatedKeys;const i=e.Pa.q_();i.sort((l,u)=>function(d,f){const m=v=>{switch(v){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J()}};return m(d)-m(f)}(l.type,u.type)||this.ua(l.doc,u.doc)),this.da(r);const o=n?this.Ta():[],a=this.aa.size===0&&this.current?1:0,c=a!==this._a;return this._a=a,i.length!==0||c?{snapshot:new ls(this.query,e.ca,s,i,e.mutatedKeys,a===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ea:o}:{Ea:o}}U_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ca:this.ca,Pa:new nf,mutatedKeys:this.mutatedKeys,es:!1},!1)):{Ea:[]}}Aa(e){return!this.oa.has(e)&&!!this.ca.has(e)&&!this.ca.get(e).hasLocalMutations}da(e){e&&(e.addedDocuments.forEach(n=>this.oa=this.oa.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.oa=this.oa.delete(n)),this.current=e.current)}Ta(){if(!this.current)return[];const e=this.aa;this.aa=ae(),this.ca.forEach(r=>{this.Aa(r.key)&&(this.aa=this.aa.add(r.key))});const n=[];return e.forEach(r=>{this.aa.has(r)||n.push(new O_(r))}),this.aa.forEach(r=>{e.has(r)||n.push(new k_(r))}),n}Ra(e){this.oa=e.Ps,this.aa=ae();const n=this.ha(e.documents);return this.applyChanges(n,!0)}Va(){return ls.fromInitialDocuments(this.query,this.ca,this.mutatedKeys,this._a===0,this.hasCachedResults)}}class rP{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class sP{constructor(e){this.key=e,this.ma=!1}}class iP{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.fa={},this.ga=new Is(a=>Wm(a),$a),this.pa=new Map,this.ya=new Set,this.wa=new Oe(z.comparator),this.Sa=new Map,this.ba=new zu,this.Da={},this.Ca=new Map,this.va=cs.Ln(),this.onlineState="Unknown",this.Fa=void 0}get isPrimaryClient(){return this.Fa===!0}}async function oP(t,e){const n=mP(t);let r,s;const i=n.ga.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.Va();else{const o=await kR(n.localStore,Xt(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await aP(n,e,r,a==="current",o.resumeToken),n.isPrimaryClient&&E_(n.remoteStore,o)}return s}async function aP(t,e,n,r,s){t.Ma=(h,d,f)=>async function(v,y,T,C){let F=y.view.ha(T);F.es&&(F=await Xd(v.localStore,y.query,!1).then(({documents:W})=>y.view.ha(W,F)));const N=C&&C.targetChanges.get(y.targetId),G=y.view.applyChanges(F,v.isPrimaryClient,N);return sf(v,y.targetId,G.Ea),G.snapshot}(t,h,d,f);const i=await Xd(t.localStore,e,!0),o=new nP(e,i.Ps),a=o.ha(i.documents),c=ji.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),l=o.applyChanges(a,t.isPrimaryClient,c);sf(t,n,l.Ea);const u=new rP(e,n,o);return t.ga.set(e,u),t.pa.has(n)?t.pa.get(n).push(e):t.pa.set(n,[e]),l.snapshot}async function cP(t,e){const n=ne(t),r=n.ga.get(e),s=n.pa.get(r.targetId);if(s.length>1)return n.pa.set(r.targetId,s.filter(i=>!$a(i,e))),void n.ga.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Ol(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),I_(n.remoteStore,r.targetId),Dl(n,r.targetId)}).catch(Fi)):(Dl(n,r.targetId),await Ol(n.localStore,r.targetId,!0))}async function lP(t,e,n){const r=_P(t);try{const s=await function(o,a){const c=ne(o),l=je.now(),u=a.reduce((f,m)=>f.add(m.key),ae());let h,d;return c.persistence.runTransaction("Locally write mutations","readwrite",f=>{let m=vn(),v=ae();return c._s.getEntries(f,u).next(y=>{m=y,m.forEach((T,C)=>{C.isValidDocument()||(v=v.add(T))})}).next(()=>c.localDocuments.getOverlayedDocuments(f,m)).next(y=>{h=y;const T=[];for(const C of a){const F=xA(C,h.get(C.key).overlayedDocument);F!=null&&T.push(new Kn(C.key,F,Um(F.value.mapValue),xt.exists(!0)))}return c.mutationQueue.addMutationBatch(f,l,T,a)}).next(y=>{d=y;const T=y.applyToLocalDocumentSet(h,v);return c.documentOverlayCache.saveOverlays(f,y.batchId,T)})}).then(()=>({batchId:d.batchId,changes:Ym(h)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,a,c){let l=o.Da[o.currentUser.toKey()];l||(l=new Oe(pe)),l=l.insert(a,c),o.Da[o.currentUser.toKey()]=l}(r,s.batchId,n),await qi(r,s.changes),await Wa(r.remoteStore)}catch(s){const i=Xu(s,"Failed to persist write");n.reject(i)}}async function D_(t,e){const n=ne(t);try{const r=await SR(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Sa.get(i);o&&(be(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.ma=!0:s.modifiedDocuments.size>0?be(o.ma):s.removedDocuments.size>0&&(be(o.ma),o.ma=!1))}),await qi(n,r,e)}catch(r){await Fi(r)}}function rf(t,e,n){const r=ne(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.ga.forEach((i,o)=>{const a=o.view.U_(e);a.snapshot&&s.push(a.snapshot)}),function(o,a){const c=ne(o);c.onlineState=a;let l=!1;c.queries.forEach((u,h)=>{for(const d of h.listeners)d.U_(a)&&(l=!0)}),l&&Zu(c)}(r.eventManager,e),s.length&&r.fa.c_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function uP(t,e,n){const r=ne(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Sa.get(e),i=s&&s.key;if(i){let o=new Oe(z.comparator);o=o.insert(i,tt.newNoDocument(i,ee.min()));const a=ae().add(i),c=new Ha(ee.min(),new Map,new Oe(pe),o,a);await D_(r,c),r.wa=r.wa.remove(i),r.Sa.delete(e),eh(r)}else await Ol(r.localStore,e,!1).then(()=>Dl(r,e,n)).catch(Fi)}async function hP(t,e){const n=ne(t),r=e.batch.batchId;try{const s=await PR(n.localStore,e);V_(n,r,null),N_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await qi(n,s)}catch(s){await Fi(s)}}async function dP(t,e,n){const r=ne(t);try{const s=await function(o,a){const c=ne(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let u;return c.mutationQueue.lookupMutationBatch(l,a).next(h=>(be(h!==null),u=h.keys(),c.mutationQueue.removeMutationBatch(l,h))).next(()=>c.mutationQueue.performConsistencyCheck(l)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(l,u,a)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,u)).next(()=>c.localDocuments.getDocuments(l,u))})}(r.localStore,e);V_(r,e,n),N_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await qi(r,s)}catch(s){await Fi(s)}}function N_(t,e){(t.Ca.get(e)||[]).forEach(n=>{n.resolve()}),t.Ca.delete(e)}function V_(t,e,n){const r=ne(t);let s=r.Da[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Da[r.currentUser.toKey()]=s}}function Dl(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.pa.get(e))t.ga.delete(r),n&&t.fa.xa(r,n);t.pa.delete(e),t.isPrimaryClient&&t.ba.mr(e).forEach(r=>{t.ba.containsKey(r)||x_(t,r)})}function x_(t,e){t.ya.delete(e.path.canonicalString());const n=t.wa.get(e);n!==null&&(I_(t.remoteStore,n),t.wa=t.wa.remove(e),t.Sa.delete(n),eh(t))}function sf(t,e,n){for(const r of n)r instanceof k_?(t.ba.addReference(r.key,e),fP(t,r)):r instanceof O_?(M("SyncEngine","Document no longer in limbo: "+r.key),t.ba.removeReference(r.key,e),t.ba.containsKey(r.key)||x_(t,r.key)):J()}function fP(t,e){const n=e.key,r=n.path.canonicalString();t.wa.get(n)||t.ya.has(r)||(M("SyncEngine","New document in limbo: "+n),t.ya.add(r),eh(t))}function eh(t){for(;t.ya.size>0&&t.wa.size<t.maxConcurrentLimboResolutions;){const e=t.ya.values().next().value;t.ya.delete(e);const n=new z(Ce.fromString(e)),r=t.va.next();t.Sa.set(r,new sP(n)),t.wa=t.wa.insert(n,r),E_(t.remoteStore,new Dn(Xt(Fa(n.path)),r,"TargetPurposeLimboResolution",xu.ae))}}async function qi(t,e,n){const r=ne(t),s=[],i=[],o=[];r.ga.isEmpty()||(r.ga.forEach((a,c)=>{o.push(r.Ma(c,e,n).then(l=>{if((l||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,l!=null&&l.fromCache?"not-current":"current"),l){s.push(l);const u=Wu.$i(c.targetId,l);i.push(u)}}))}),await Promise.all(o),r.fa.c_(s),await async function(c,l){const u=ne(c);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>P.forEach(l,d=>P.forEach(d.Qi,f=>u.persistence.referenceDelegate.addReference(h,d.targetId,f)).next(()=>P.forEach(d.Ki,f=>u.persistence.referenceDelegate.removeReference(h,d.targetId,f)))))}catch(h){if(!$i(h))throw h;M("LocalStore","Failed to update sequence numbers: "+h)}for(const h of l){const d=h.targetId;if(!h.fromCache){const f=u.rs.get(d),m=f.snapshotVersion,v=f.withLastLimboFreeSnapshotVersion(m);u.rs=u.rs.insert(d,v)}}}(r.localStore,i))}async function pP(t,e){const n=ne(t);if(!n.currentUser.isEqual(e)){M("SyncEngine","User change. New user:",e.toKey());const r=await m_(n.localStore,e);n.currentUser=e,function(i,o){i.Ca.forEach(a=>{a.forEach(c=>{c.reject(new U(A.CANCELLED,o))})}),i.Ca.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await qi(n,r.cs)}}function gP(t,e){const n=ne(t),r=n.Sa.get(e);if(r&&r.ma)return ae().add(r.key);{let s=ae();const i=n.pa.get(e);if(!i)return s;for(const o of i){const a=n.ga.get(o);s=s.unionWith(a.view.la)}return s}}function mP(t){const e=ne(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=D_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=gP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=uP.bind(null,e),e.fa.c_=eP.bind(null,e.eventManager),e.fa.xa=tP.bind(null,e.eventManager),e}function _P(t){const e=ne(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=hP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=dP.bind(null,e),e}class of{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=za(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return RR(this.persistence,new TR,e.initialUser,this.serializer)}createPersistence(e){return new ER(Ku.Jr,this.serializer)}createSharedClientState(e){return new DR}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class yP{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>rf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=pP.bind(null,this.syncEngine),await JR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ZR}()}createDatastore(e){const n=za(e.databaseInfo.databaseId),r=function(i){return new MR(i)}(e.databaseInfo);return function(i,o,a,c){return new $R(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,a){return new jR(r,s,i,o,a)}(this.localStore,this.datastore,e.asyncQueue,n=>rf(this.syncEngine,n,0),function(){return ef.C()?new ef:new NR}())}createSyncEngine(e,n){return function(s,i,o,a,c,l,u){const h=new iP(s,i,o,a,c,l);return u&&(h.Fa=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(n){const r=ne(n);M("RemoteStore","RemoteStore shutting down."),r.F_.add(5),await Bi(r),r.x_.shutdown(),r.O_.set("Unknown")}(this.remoteStore)}}/**
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
 */class M_{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ba(this.observer.next,e)}error(e){this.observer.error?this.Ba(this.observer.error,e):yn("Uncaught Error in snapshot listener:",e.toString())}La(){this.muted=!0}Ba(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class vP{constructor(e,n,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=et.UNAUTHENTICATED,this.clientId=Lm.V(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{M("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(M("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new U(A.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ln;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Xu(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Cc(t,e){t.asyncQueue.verifyOperationInProgress(),M("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await m_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function af(t,e){t.asyncQueue.verifyOperationInProgress();const n=await IP(t);M("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener(s=>tf(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,i)=>tf(e.remoteStore,i)),t._onlineComponents=e}function EP(t){return t.name==="FirebaseError"?t.code===A.FAILED_PRECONDITION||t.code===A.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function IP(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){M("FirestoreClient","Using user provided OfflineComponentProvider");try{await Cc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!EP(n))throw n;ns("Error using user provided cache. Falling back to memory cache: "+n),await Cc(t,new of)}}else M("FirestoreClient","Using default OfflineComponentProvider"),await Cc(t,new of);return t._offlineComponents}async function L_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(M("FirestoreClient","Using user provided OnlineComponentProvider"),await af(t,t._uninitializedComponentsProvider._online)):(M("FirestoreClient","Using default OnlineComponentProvider"),await af(t,new yP))),t._onlineComponents}function wP(t){return L_(t).then(e=>e.syncEngine)}async function Nl(t){const e=await L_(t),n=e.eventManager;return n.onListen=oP.bind(null,e.syncEngine),n.onUnlisten=cP.bind(null,e.syncEngine),n}function TP(t,e,n={}){const r=new Ln;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,a,c,l){const u=new M_({next:d=>{o.enqueueAndForget(()=>b_(i,h));const f=d.docs.has(a);!f&&d.fromCache?l.reject(new U(A.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&d.fromCache&&c&&c.source==="server"?l.reject(new U(A.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(d)},error:d=>l.reject(d)}),h=new C_(Fa(a.path),u,{includeMetadataChanges:!0,Z_:!0});return S_(i,h)}(await Nl(t),t.asyncQueue,e,n,r)),r.promise}/**
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
 */function F_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const cf=new Map;/**
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
 */function $_(t,e,n){if(!n)throw new U(A.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function AP(t,e,n,r){if(e===!0&&r===!0)throw new U(A.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function lf(t){if(!z.isDocumentKey(t))throw new U(A.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function uf(t){if(z.isDocumentKey(t))throw new U(A.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function th(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":J()}function Mt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new U(A.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=th(t);throw new U(A.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class hf{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(A.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(A.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}AP("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=F_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new U(A.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new U(A.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new U(A.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ga{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hf({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new U(A.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new U(A.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new H0;switch(r.type){case"firstParty":return new G0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(A.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=cf.get(n);r&&(M("ComponentProvider","Removing Datastore"),cf.delete(n),r.terminate())}(this),Promise.resolve()}}function RP(t,e,n,r={}){var s;const i=(t=Mt(t,Ga))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ns("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=et.MOCK_USER;else{a=gw(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new U(A.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new et(l)}t._authCredentials=new z0(new Mm(a,c))}}/**
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
 */class Qa{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Qa(this.firestore,e,this._query)}}class dt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Fn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new dt(this.firestore,e,this._key)}}class Fn extends Qa{constructor(e,n,r){super(e,n,Fa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new dt(this.firestore,null,new z(e))}withConverter(e){return new Fn(this.firestore,e,this._path)}}function PP(t,e,...n){if(t=Ne(t),$_("collection","path",e),t instanceof Ga){const r=Ce.fromString(e,...n);return uf(r),new Fn(t,null,r)}{if(!(t instanceof dt||t instanceof Fn))throw new U(A.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ce.fromString(e,...n));return uf(r),new Fn(t.firestore,null,r)}}function SP(t,e,...n){if(t=Ne(t),arguments.length===1&&(e=Lm.V()),$_("doc","path",e),t instanceof Ga){const r=Ce.fromString(e,...n);return lf(r),new dt(t,null,new z(r))}{if(!(t instanceof dt||t instanceof Fn))throw new U(A.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ce.fromString(e,...n));return lf(r),new dt(t.firestore,t instanceof Fn?t.converter:null,new z(r))}}/**
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
 */class bP{constructor(){this.Za=Promise.resolve(),this.Xa=[],this.eu=!1,this.tu=[],this.nu=null,this.ru=!1,this.iu=!1,this.su=[],this.Ho=new y_(this,"async_queue_retry"),this.ou=()=>{const n=bc();n&&M("AsyncQueue","Visibility state changed to "+n.visibilityState),this.Ho.$o()};const e=bc();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.ou)}get isShuttingDown(){return this.eu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this._u(),this.au(e)}enterRestrictedMode(e){if(!this.eu){this.eu=!0,this.iu=e||!1;const n=bc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.ou)}}enqueue(e){if(this._u(),this.eu)return new Promise(()=>{});const n=new Ln;return this.au(()=>this.eu&&this.iu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xa.push(e),this.uu()))}async uu(){if(this.Xa.length!==0){try{await this.Xa[0](),this.Xa.shift(),this.Ho.reset()}catch(e){if(!$i(e))throw e;M("AsyncQueue","Operation failed with retryable error: "+e)}this.Xa.length>0&&this.Ho.Qo(()=>this.uu())}}au(e){const n=this.Za.then(()=>(this.ru=!0,e().catch(r=>{this.nu=r,this.ru=!1;const s=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw yn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.ru=!1,r))));return this.Za=n,n}enqueueAfterDelay(e,n,r){this._u(),this.su.indexOf(e)>-1&&(n=0);const s=Ju.createAndSchedule(this,e,n,r,i=>this.cu(i));return this.tu.push(s),s}_u(){this.nu&&J()}verifyOperationInProgress(){}async lu(){let e;do e=this.Za,await e;while(e!==this.Za)}hu(e){for(const n of this.tu)if(n.timerId===e)return!0;return!1}Pu(e){return this.lu().then(()=>{this.tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.lu()})}Iu(e){this.su.push(e)}cu(e){const n=this.tu.indexOf(e);this.tu.splice(n,1)}}function df(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class vr extends Ga{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=function(){return new bP}(),this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||U_(this),this._firestoreClient.terminate()}}function CP(t,e){const n=typeof t=="object"?t:hu(),r=typeof t=="string"?t:e||"(default)",s=Rr(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=fw("firestore");i&&RP(s,...i)}return s}function nh(t){return t._firestoreClient||U_(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function U_(t){var e,n,r;const s=t._freezeSettings(),i=function(a,c,l,u){return new oA(a,c,l,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,F_(u.experimentalLongPollingOptions),u.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._firestoreClient=new vP(t._authCredentials,t._appCheckCredentials,t._queue,i),!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.localCache.kind,_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider})}/**
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
 */class us{constructor(e){this._byteString=e}static fromBase64String(e){try{return new us(ct.fromBase64String(e))}catch(n){throw new U(A.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new us(ct.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ya{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new U(A.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new rt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Cr{constructor(e){this._methodName=e}}/**
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
 */class rh{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new U(A.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new U(A.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return pe(this._lat,e._lat)||pe(this._long,e._long)}}/**
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
 */const kP=/^__.*__$/;class OP{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Kn(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ui(e,this.data,n,this.fieldTransforms)}}class j_{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Kn(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function B_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J()}}class Ja{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.du(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Tu(){return this.settings.Tu}Eu(e){return new Ja(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Au(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Eu({path:r,Ru:!1});return s.Vu(e),s}mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Eu({path:r,Ru:!1});return s.du(),s}fu(e){return this.Eu({path:void 0,Ru:!0})}gu(e){return Wo(e,this.settings.methodName,this.settings.pu||!1,this.path,this.settings.yu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}du(){if(this.path)for(let e=0;e<this.path.length;e++)this.Vu(this.path.get(e))}Vu(e){if(e.length===0)throw this.gu("Document fields must not be empty");if(B_(this.Tu)&&kP.test(e))throw this.gu('Document fields cannot begin and end with "__"')}}class DP{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||za(e)}wu(e,n,r,s=!1){return new Ja({Tu:e,methodName:n,yu:r,path:rt.emptyPath(),Ru:!1,pu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function q_(t){const e=t._freezeSettings(),n=za(t._databaseId);return new DP(t._databaseId,!!e.ignoreUndefinedProperties,n)}function NP(t,e,n,r,s,i={}){const o=t.wu(i.merge||i.mergeFields?2:0,e,n,s);ih("Data must be an object, but it was:",o,r);const a=z_(r,o);let c,l;if(i.merge)c=new wt(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const u=[];for(const h of i.mergeFields){const d=Vl(e,h,n);if(!o.contains(d))throw new U(A.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);W_(u,d)||u.push(d)}c=new wt(u),l=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,l=o.fieldTransforms;return new OP(new gt(a),c,l)}class Xa extends Cr{_toFieldTransform(e){if(e.Tu!==2)throw e.Tu===1?e.gu(`${this._methodName}() can only appear at the top level of your update data`):e.gu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Xa}}function H_(t,e,n){return new Ja({Tu:3,yu:e.settings.yu,methodName:t._methodName,Ru:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class sh extends Cr{_toFieldTransform(e){return new Ba(e.path,new wi)}isEqual(e){return e instanceof sh}}class VP extends Cr{constructor(e,n){super(e),this.Su=n}_toFieldTransform(e){const n=H_(this,e,!0),r=this.Su.map(i=>Ts(i,n)),s=new os(r);return new Ba(e.path,s)}isEqual(e){return this===e}}class xP extends Cr{constructor(e,n){super(e),this.Su=n}_toFieldTransform(e){const n=H_(this,e,!0),r=this.Su.map(i=>Ts(i,n)),s=new as(r);return new Ba(e.path,s)}isEqual(e){return this===e}}class MP extends Cr{constructor(e,n){super(e),this.bu=n}_toFieldTransform(e){const n=new Ti(e.serializer,e_(e.serializer,this.bu));return new Ba(e.path,n)}isEqual(e){return this===e}}function LP(t,e,n,r){const s=t.wu(1,e,n);ih("Data must be an object, but it was:",s,r);const i=[],o=gt.empty();Sr(r,(c,l)=>{const u=oh(e,c,n);l=Ne(l);const h=s.mu(u);if(l instanceof Xa)i.push(u);else{const d=Ts(l,h);d!=null&&(i.push(u),o.set(u,d))}});const a=new wt(i);return new j_(o,a,s.fieldTransforms)}function FP(t,e,n,r,s,i){const o=t.wu(1,e,n),a=[Vl(e,r,n)],c=[s];if(i.length%2!=0)throw new U(A.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Vl(e,i[d])),c.push(i[d+1]);const l=[],u=gt.empty();for(let d=a.length-1;d>=0;--d)if(!W_(l,a[d])){const f=a[d];let m=c[d];m=Ne(m);const v=o.mu(f);if(m instanceof Xa)l.push(f);else{const y=Ts(m,v);y!=null&&(l.push(f),u.set(f,y))}}const h=new wt(l);return new j_(u,h,o.fieldTransforms)}function Ts(t,e){if(K_(t=Ne(t)))return ih("Unsupported field value:",e,t),z_(t,e);if(t instanceof Cr)return function(r,s){if(!B_(s.Tu))throw s.gu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.gu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Ru&&e.Tu!==4)throw e.gu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const a of r){let c=Ts(a,s.fu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Ne(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return e_(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=je.fromDate(r);return{timestampValue:zo(s.serializer,i)}}if(r instanceof je){const i=new je(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:zo(s.serializer,i)}}if(r instanceof rh)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof us)return{bytesValue:u_(s.serializer,r._byteString)};if(r instanceof dt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.gu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Hu(r.firestore._databaseId||s.databaseId,r._key.path)}}throw s.gu(`Unsupported field value: ${th(r)}`)}(t,e)}function z_(t,e){const n={};return Fm(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Sr(t,(r,s)=>{const i=Ts(s,e.Au(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function K_(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof je||t instanceof rh||t instanceof us||t instanceof dt||t instanceof Cr)}function ih(t,e,n){if(!K_(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=th(n);throw r==="an object"?e.gu(t+" a custom object"):e.gu(t+" "+r)}}function Vl(t,e,n){if((e=Ne(e))instanceof Ya)return e._internalPath;if(typeof e=="string")return oh(t,e);throw Wo("Field path arguments must be of type string or ",t,!1,void 0,n)}const $P=new RegExp("[~\\*/\\[\\]]");function oh(t,e,n){if(e.search($P)>=0)throw Wo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ya(...e.split("."))._internalPath}catch{throw Wo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Wo(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new U(A.INVALID_ARGUMENT,a+t+c)}function W_(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class G_{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new dt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new UP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Q_("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class UP extends G_{data(){return super.data()}}function Q_(t,e){return typeof e=="string"?oh(t,e):e instanceof Ya?e._internalPath:e._delegate._internalPath}/**
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
 */function jP(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new U(A.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class BP{convertValue(e,n="none"){switch(yr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(_r(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw J()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Sr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertGeoPoint(e){return new rh(Le(e.latitude),Le(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Lu(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(vi(e));default:return null}}convertTimestamp(e){const n=Bn(e);return new je(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ce.fromString(e);be(g_(r));const s=new Ei(r.get(1),r.get(3)),i=new z(r.popFirst(5));return s.isEqual(n)||yn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function qP(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
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
 */class $s{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Y_ extends G_{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Io(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Q_("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Io extends Y_{data(e={}){return super.data(e)}}class HP{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new $s(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Io(this._firestore,this._userDataWriter,r.key,r,new $s(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new U(A.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(a=>{const c=new Io(s._firestore,s._userDataWriter,a.doc.key,a.doc,new $s(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(a=>i||a.type!==3).map(a=>{const c=new Io(s._firestore,s._userDataWriter,a.doc.key,a.doc,new $s(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,u=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),u=o.indexOf(a.doc.key)),{type:zP(a.type),doc:c,oldIndex:l,newIndex:u}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function zP(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J()}}/**
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
 */function WO(t){t=Mt(t,dt);const e=Mt(t.firestore,vr);return TP(nh(e),t._key).then(n=>X_(e,t,n))}class J_ extends BP{constructor(e){super(),this.firestore=e}convertBytes(e){return new us(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new dt(this.firestore,null,n)}}function GO(t,e,n){t=Mt(t,dt);const r=Mt(t.firestore,vr),s=qP(t.converter,e,n);return ah(r,[NP(q_(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,xt.none())])}function QO(t,e,n,...r){t=Mt(t,dt);const s=Mt(t.firestore,vr),i=q_(s);let o;return o=typeof(e=Ne(e))=="string"||e instanceof Ya?FP(i,"updateDoc",t._key,e,n,r):LP(i,"updateDoc",t._key,e),ah(s,[o.toMutation(t._key,xt.exists(!0))])}function YO(t){return ah(Mt(t.firestore,vr),[new ju(t._key,xt.none())])}function KP(t,...e){var n,r,s;t=Ne(t);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||df(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(df(e[o])){const h=e[o];e[o]=(n=h.next)===null||n===void 0?void 0:n.bind(h),e[o+1]=(r=h.error)===null||r===void 0?void 0:r.bind(h),e[o+2]=(s=h.complete)===null||s===void 0?void 0:s.bind(h)}let c,l,u;if(t instanceof dt)l=Mt(t.firestore,vr),u=Fa(t._key.path),c={next:h=>{e[o]&&e[o](X_(l,t,h))},error:e[o+1],complete:e[o+2]};else{const h=Mt(t,Qa);l=Mt(h.firestore,vr),u=h._query;const d=new J_(l);c={next:f=>{e[o]&&e[o](new HP(l,d,h,f))},error:e[o+1],complete:e[o+2]},jP(t._query)}return function(d,f,m,v){const y=new M_(v),T=new C_(f,y,m);return d.asyncQueue.enqueueAndForget(async()=>S_(await Nl(d),T)),()=>{y.La(),d.asyncQueue.enqueueAndForget(async()=>b_(await Nl(d),T))}}(nh(l),u,a,c)}function ah(t,e){return function(r,s){const i=new Ln;return r.asyncQueue.enqueueAndForget(async()=>lP(await wP(r),s,i)),i.promise}(nh(t),e)}function X_(t,e,n){const r=n.docs.get(e._key),s=new J_(t);return new Y_(t,s,e._key,r,new $s(n.hasPendingWrites,n.fromCache),e.converter)}function JO(){return new sh("serverTimestamp")}function XO(...t){return new VP("arrayUnion",t)}function ZO(...t){return new xP("arrayRemove",t)}function eD(t){return new MP("increment",t)}(function(e,n=!0){(function(s){Es=s})(_s),sn(new Lt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),a=new vr(new K0(r.getProvider("auth-internal")),new Y0(r.getProvider("app-check-internal")),function(l,u){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new U(A.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ei(l.options.projectId,u)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),a._setSettings(i),a},"PUBLIC").setMultipleInstances(!0)),Pt(Dd,"4.2.0",e),Pt(Dd,"4.2.0","esm2017")})();const WP=(t,e)=>e.some(n=>t instanceof n);let ff,pf;function GP(){return ff||(ff=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function QP(){return pf||(pf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Z_=new WeakMap,xl=new WeakMap,ey=new WeakMap,kc=new WeakMap,ch=new WeakMap;function YP(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n($n(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Z_.set(n,t)}).catch(()=>{}),ch.set(e,t),e}function JP(t){if(xl.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});xl.set(t,e)}let Ml={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return xl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ey.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $n(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function XP(t){Ml=t(Ml)}function ZP(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Oc(this),e,...n);return ey.set(r,e.sort?e.sort():[e]),$n(r)}:QP().includes(t)?function(...e){return t.apply(Oc(this),e),$n(Z_.get(this))}:function(...e){return $n(t.apply(Oc(this),e))}}function eS(t){return typeof t=="function"?ZP(t):(t instanceof IDBTransaction&&JP(t),WP(t,GP())?new Proxy(t,Ml):t)}function $n(t){if(t instanceof IDBRequest)return YP(t);if(kc.has(t))return kc.get(t);const e=eS(t);return e!==t&&(kc.set(t,e),ch.set(e,t)),e}const Oc=t=>ch.get(t);function tS(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=$n(o);return r&&o.addEventListener("upgradeneeded",c=>{r($n(o.result),c.oldVersion,c.newVersion,$n(o.transaction))}),n&&o.addEventListener("blocked",()=>n()),a.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",()=>s())}).catch(()=>{}),a}const nS=["get","getKey","getAll","getAllKeys","count"],rS=["put","add","delete","clear"],Dc=new Map;function gf(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Dc.get(e))return Dc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=rS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||nS.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Dc.set(e,i),i}XP(t=>({...t,get:(e,n,r)=>gf(e,n)||t.get(e,n,r),has:(e,n)=>!!gf(e,n)||t.has(e,n)}));const ty="@firebase/installations",lh="0.6.4";/**
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
 */const ny=1e4,ry=`w:${lh}`,sy="FIS_v2",sS="https://firebaseinstallations.googleapis.com/v1",iS=60*60*1e3,oS="installations",aS="Installations";/**
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
 */const cS={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Er=new Ar(oS,aS,cS);function iy(t){return t instanceof Ut&&t.code.includes("request-failed")}/**
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
 */function oy({projectId:t}){return`${sS}/projects/${t}/installations`}function ay(t){return{token:t.token,requestStatus:2,expiresIn:uS(t.expiresIn),creationTime:Date.now()}}async function cy(t,e){const r=(await e.json()).error;return Er.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function ly({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function lS(t,{refreshToken:e}){const n=ly(t);return n.append("Authorization",hS(e)),n}async function uy(t){const e=await t();return e.status>=500&&e.status<600?t():e}function uS(t){return Number(t.replace("s","000"))}function hS(t){return`${sy} ${t}`}/**
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
 */async function dS({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=oy(t),s=ly(t),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:sy,appId:t.appId,sdkVersion:ry},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await uy(()=>fetch(r,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:ay(l.authToken)}}else throw await cy("Create Installation",c)}/**
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
 */function hy(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function fS(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const pS=/^[cdef][\w-]{21}$/,Ll="";function gS(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=mS(t);return pS.test(n)?n:Ll}catch{return Ll}}function mS(t){return fS(t).substr(0,22)}/**
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
 */function Za(t){return`${t.appName}!${t.appId}`}/**
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
 */const dy=new Map;function fy(t,e){const n=Za(t);py(n,e),_S(n,e)}function py(t,e){const n=dy.get(t);if(n)for(const r of n)r(e)}function _S(t,e){const n=yS();n&&n.postMessage({key:t,fid:e}),vS()}let or=null;function yS(){return!or&&"BroadcastChannel"in self&&(or=new BroadcastChannel("[Firebase] FID Change"),or.onmessage=t=>{py(t.data.key,t.data.fid)}),or}function vS(){dy.size===0&&or&&(or.close(),or=null)}/**
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
 */const ES="firebase-installations-database",IS=1,Ir="firebase-installations-store";let Nc=null;function uh(){return Nc||(Nc=tS(ES,IS,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ir)}}})),Nc}async function Go(t,e){const n=Za(t),s=(await uh()).transaction(Ir,"readwrite"),i=s.objectStore(Ir),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&fy(t,e.fid),e}async function gy(t){const e=Za(t),r=(await uh()).transaction(Ir,"readwrite");await r.objectStore(Ir).delete(e),await r.done}async function ec(t,e){const n=Za(t),s=(await uh()).transaction(Ir,"readwrite"),i=s.objectStore(Ir),o=await i.get(n),a=e(o);return a===void 0?await i.delete(n):await i.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&fy(t,a.fid),a}/**
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
 */async function hh(t){let e;const n=await ec(t.appConfig,r=>{const s=wS(r),i=TS(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Ll?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function wS(t){const e=t||{fid:gS(),registrationStatus:0};return my(e)}function TS(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Er.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=AS(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:RS(t)}:{installationEntry:e}}async function AS(t,e){try{const n=await dS(t,e);return Go(t.appConfig,n)}catch(n){throw iy(n)&&n.customData.serverCode===409?await gy(t.appConfig):await Go(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function RS(t){let e=await mf(t.appConfig);for(;e.registrationStatus===1;)await hy(100),e=await mf(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await hh(t);return r||n}return e}function mf(t){return ec(t,e=>{if(!e)throw Er.create("installation-not-found");return my(e)})}function my(t){return PS(t)?{fid:t.fid,registrationStatus:0}:t}function PS(t){return t.registrationStatus===1&&t.registrationTime+ny<Date.now()}/**
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
 */async function SS({appConfig:t,heartbeatServiceProvider:e},n){const r=bS(t,n),s=lS(t,n),i=e.getImmediate({optional:!0});if(i){const l=await i.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:ry,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await uy(()=>fetch(r,a));if(c.ok){const l=await c.json();return ay(l)}else throw await cy("Generate Auth Token",c)}function bS(t,{fid:e}){return`${oy(t)}/${e}/authTokens:generate`}/**
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
 */async function dh(t,e=!1){let n;const r=await ec(t.appConfig,i=>{if(!_y(i))throw Er.create("not-registered");const o=i.authToken;if(!e&&OS(o))return i;if(o.requestStatus===1)return n=CS(t,e),i;{if(!navigator.onLine)throw Er.create("app-offline");const a=NS(i);return n=kS(t,a),a}});return n?await n:r.authToken}async function CS(t,e){let n=await _f(t.appConfig);for(;n.authToken.requestStatus===1;)await hy(100),n=await _f(t.appConfig);const r=n.authToken;return r.requestStatus===0?dh(t,e):r}function _f(t){return ec(t,e=>{if(!_y(e))throw Er.create("not-registered");const n=e.authToken;return VS(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function kS(t,e){try{const n=await SS(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Go(t.appConfig,r),n}catch(n){if(iy(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await gy(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Go(t.appConfig,r)}throw n}}function _y(t){return t!==void 0&&t.registrationStatus===2}function OS(t){return t.requestStatus===2&&!DS(t)}function DS(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+iS}function NS(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function VS(t){return t.requestStatus===1&&t.requestTime+ny<Date.now()}/**
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
 */async function xS(t){const e=t,{installationEntry:n,registrationPromise:r}=await hh(e);return r?r.catch(console.error):dh(e).catch(console.error),n.fid}/**
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
 */async function MS(t,e=!1){const n=t;return await LS(n),(await dh(n,e)).token}async function LS(t){const{registrationPromise:e}=await hh(t);e&&await e}/**
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
 */function FS(t){if(!t||!t.options)throw Vc("App Configuration");if(!t.name)throw Vc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Vc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Vc(t){return Er.create("missing-app-config-values",{valueName:t})}/**
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
 */const yy="installations",$S="installations-internal",US=t=>{const e=t.getProvider("app").getImmediate(),n=FS(e),r=Rr(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},jS=t=>{const e=t.getProvider("app").getImmediate(),n=Rr(e,yy).getImmediate();return{getId:()=>xS(n),getToken:s=>MS(n,s)}};function BS(){sn(new Lt(yy,US,"PUBLIC")),sn(new Lt($S,jS,"PRIVATE"))}BS();Pt(ty,lh);Pt(ty,lh,"esm2017");/**
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
 */const Qo="analytics",qS="firebase_id",HS="origin",zS=60*1e3,KS="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",fh="https://www.googletagmanager.com/gtag/js";/**
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
 */const yt=new va("@firebase/analytics");/**
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
 */const WS={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Tt=new Ar("analytics","Analytics",WS);/**
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
 */function GS(t){if(!t.startsWith(fh)){const e=Tt.create("invalid-gtag-resource",{gtagURL:t});return yt.warn(e.message),""}return t}function vy(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function QS(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function YS(t,e){const n=QS("firebase-js-sdk-policy",{createScriptURL:GS}),r=document.createElement("script"),s=`${fh}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function JS(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function XS(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const c=(await vy(n)).find(l=>l.measurementId===s);c&&await e[c.appId]}}catch(a){yt.error(a)}t("config",s,i)}async function ZS(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await vy(n);for(const c of o){const l=a.find(h=>h.measurementId===c),u=l&&e[l.appId];if(u)i.push(u);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){yt.error(i)}}function eb(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[a,c]=o;await ZS(t,e,n,a,c)}else if(i==="config"){const[a,c]=o;await XS(t,e,n,r,a,c)}else if(i==="consent"){const[a]=o;t("consent","update",a)}else if(i==="get"){const[a,c,l]=o;t("get",a,c,l)}else if(i==="set"){const[a]=o;t("set",a)}else t(i,...o)}catch(a){yt.error(a)}}return s}function tb(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=eb(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function nb(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(fh)&&n.src.includes(t))return n;return null}/**
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
 */const rb=30,sb=1e3;class ib{constructor(e={},n=sb){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ey=new ib;function ob(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function ab(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:ob(r)},i=KS.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let a="";try{const c=await o.json();!((e=c.error)===null||e===void 0)&&e.message&&(a=c.error.message)}catch{}throw Tt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:a})}return o.json()}async function cb(t,e=Ey,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Tt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Tt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new hb;return setTimeout(async()=>{a.abort()},n!==void 0?n:zS),Iy({appId:r,apiKey:s,measurementId:i},o,a,e)}async function Iy(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Ey){var i;const{appId:o,measurementId:a}=t;try{await lb(r,e)}catch(c){if(a)return yt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:a};throw c}try{const c=await ab(t);return s.deleteThrottleMetadata(o),c}catch(c){const l=c;if(!ub(l)){if(s.deleteThrottleMetadata(o),a)return yt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:a};throw c}const u=Number((i=l==null?void 0:l.customData)===null||i===void 0?void 0:i.httpStatus)===503?ud(n,s.intervalMillis,rb):ud(n,s.intervalMillis),h={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return s.setThrottleMetadata(o,h),yt.debug(`Calling attemptFetch again in ${u} millis`),Iy(t,h,r,s)}}function lb(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Tt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function ub(t){if(!(t instanceof Ut)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class hb{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function db(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
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
 */async function fb(){if(Sg())try{await bg()}catch(t){return yt.warn(Tt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return yt.warn(Tt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function pb(t,e,n,r,s,i,o){var a;const c=cb(t);c.then(f=>{n[f.measurementId]=f.appId,t.options.measurementId&&f.measurementId!==t.options.measurementId&&yt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>yt.error(f)),e.push(c);const l=fb().then(f=>{if(f)return r.getId()}),[u,h]=await Promise.all([c,l]);nb(i)||YS(i,u.measurementId),s("js",new Date);const d=(a=o==null?void 0:o.config)!==null&&a!==void 0?a:{};return d[HS]="firebase",d.update=!0,h!=null&&(d[qS]=h),s("config",u.measurementId,d),u.measurementId}/**
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
 */class gb{constructor(e){this.app=e}_delete(){return delete Qs[this.app.options.appId],Promise.resolve()}}let Qs={},yf=[];const vf={};let xc="dataLayer",mb="gtag",Ef,wy,If=!1;function _b(){const t=[];if(Pg()&&t.push("This is a browser extension environment."),vw()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Tt.create("invalid-analytics-context",{errorInfo:e});yt.warn(n.message)}}function yb(t,e,n){_b();const r=t.options.appId;if(!r)throw Tt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)yt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Tt.create("no-api-key");if(Qs[r]!=null)throw Tt.create("already-exists",{id:r});if(!If){JS(xc);const{wrappedGtag:i,gtagCore:o}=tb(Qs,yf,vf,xc,mb);wy=i,Ef=o,If=!0}return Qs[r]=pb(t,yf,vf,e,Ef,xc,n),new gb(t)}function vb(t=hu()){t=Ne(t);const e=Rr(t,Qo);return e.isInitialized()?e.getImmediate():Eb(t)}function Eb(t,e={}){const n=Rr(t,Qo);if(n.isInitialized()){const s=n.getImmediate();if(ci(e,n.getOptions()))return s;throw Tt.create("already-initialized")}return n.initialize({options:e})}function Ib(t,e,n,r){t=Ne(t),db(wy,Qs[t.app.options.appId],e,n,r).catch(s=>yt.error(s))}const wf="@firebase/analytics",Tf="0.10.0";function wb(){sn(new Lt(Qo,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return yb(r,s,n)},"PUBLIC")),sn(new Lt("analytics-internal",t,"PRIVATE")),Pt(wf,Tf),Pt(wf,Tf,"esm2017");function t(e){try{const n=e.getProvider(Qo).getImmediate();return{logEvent:(r,s,i)=>Ib(n,r,s,i)}}catch(n){throw Tt.create("interop-component-reg-failed",{reason:n})}}}wb();const Tb={apiKey:"AIzaSyBRIqo_JdB3v6nV5pAPNfkgm9NujxAup68",authDomain:"vue-project-d53d4.firebaseapp.com",projectId:"vue-project-d53d4",storageBucket:"vue-project-d53d4.appspot.com",messagingSenderId:"495070706443",appId:"1:495070706443:web:c2afce58385a473439800e",measurementId:"G-FQ88TGJMZE"},Ty=Og(Tb);vb(Ty);const Ab=CP(Ty);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Br=typeof window<"u";function Rb(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const ve=Object.assign;function Mc(t,e){const n={};for(const r in e){const s=e[r];n[r]=$t(s)?s.map(t):t(s)}return n}const Ys=()=>{},$t=Array.isArray,Pb=/\/$/,Sb=t=>t.replace(Pb,"");function Lc(t,e,n="/"){let r,s={},i="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,a>-1?a:e.length),s=t(i)),a>-1&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=Ob(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:o}}function bb(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Af(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function Cb(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&hs(e.matched[r],n.matched[s])&&Ay(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function hs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Ay(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!kb(t[n],e[n]))return!1;return!0}function kb(t,e){return $t(t)?Rf(t,e):$t(e)?Rf(e,t):t===e}function Rf(t,e){return $t(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function Ob(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}var Ai;(function(t){t.pop="pop",t.push="push"})(Ai||(Ai={}));var Js;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Js||(Js={}));function Db(t){if(!t)if(Br){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),Sb(t)}const Nb=/^[^#]+#/;function Vb(t,e){return t.replace(Nb,"#")+e}function xb(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const tc=()=>({left:window.pageXOffset,top:window.pageYOffset});function Mb(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=xb(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function Pf(t,e){return(history.state?history.state.position-e:-1)+t}const Fl=new Map;function Lb(t,e){Fl.set(t,e)}function Fb(t){const e=Fl.get(t);return Fl.delete(t),e}let $b=()=>location.protocol+"//"+location.host;function Ry(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let a=s.includes(t.slice(i))?t.slice(i).length:1,c=s.slice(a);return c[0]!=="/"&&(c="/"+c),Af(c,"")}return Af(n,t)+r+s}function Ub(t,e,n,r){let s=[],i=[],o=null;const a=({state:d})=>{const f=Ry(t,location),m=n.value,v=e.value;let y=0;if(d){if(n.value=f,e.value=d,o&&o===m){o=null;return}y=v?d.position-v.position:0}else r(f);s.forEach(T=>{T(n.value,m,{delta:y,type:Ai.pop,direction:y?y>0?Js.forward:Js.back:Js.unknown})})};function c(){o=n.value}function l(d){s.push(d);const f=()=>{const m=s.indexOf(d);m>-1&&s.splice(m,1)};return i.push(f),f}function u(){const{history:d}=window;d.state&&d.replaceState(ve({},d.state,{scroll:tc()}),"")}function h(){for(const d of i)d();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:c,listen:l,destroy:h}}function Sf(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?tc():null}}function jb(t){const{history:e,location:n}=window,r={value:Ry(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,l,u){const h=t.indexOf("#"),d=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+c:$b()+t+c;try{e[u?"replaceState":"pushState"](l,"",d),s.value=l}catch(f){console.error(f),n[u?"replace":"assign"](d)}}function o(c,l){const u=ve({},e.state,Sf(s.value.back,c,s.value.forward,!0),l,{position:s.value.position});i(c,u,!0),r.value=c}function a(c,l){const u=ve({},s.value,e.state,{forward:c,scroll:tc()});i(u.current,u,!0);const h=ve({},Sf(r.value,c,null),{position:u.position+1},l);i(c,h,!1),r.value=c}return{location:r,state:s,push:a,replace:o}}function Bb(t){t=Db(t);const e=jb(t),n=Ub(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=ve({location:"",base:t,go:r,createHref:Vb.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function qb(t){return typeof t=="string"||t&&typeof t=="object"}function Py(t){return typeof t=="string"||typeof t=="symbol"}const Tn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Sy=Symbol("");var bf;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(bf||(bf={}));function ds(t,e){return ve(new Error,{type:t,[Sy]:!0},e)}function ln(t,e){return t instanceof Error&&Sy in t&&(e==null||!!(t.type&e))}const Cf="[^/]+?",Hb={sensitive:!1,strict:!1,start:!0,end:!0},zb=/[.+*?^${}()[\]/\\]/g;function Kb(t,e){const n=ve({},Hb,e),r=[];let s=n.start?"^":"";const i=[];for(const l of t){const u=l.length?[]:[90];n.strict&&!l.length&&(s+="/");for(let h=0;h<l.length;h++){const d=l[h];let f=40+(n.sensitive?.25:0);if(d.type===0)h||(s+="/"),s+=d.value.replace(zb,"\\$&"),f+=40;else if(d.type===1){const{value:m,repeatable:v,optional:y,regexp:T}=d;i.push({name:m,repeatable:v,optional:y});const C=T||Cf;if(C!==Cf){f+=10;try{new RegExp(`(${C})`)}catch(N){throw new Error(`Invalid custom RegExp for param "${m}" (${C}): `+N.message)}}let F=v?`((?:${C})(?:/(?:${C}))*)`:`(${C})`;h||(F=y&&l.length<2?`(?:/${F})`:"/"+F),y&&(F+="?"),s+=F,f+=20,y&&(f+=-8),v&&(f+=-20),C===".*"&&(f+=-50)}u.push(f)}r.push(u)}if(n.strict&&n.end){const l=r.length-1;r[l][r[l].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(l){const u=l.match(o),h={};if(!u)return null;for(let d=1;d<u.length;d++){const f=u[d]||"",m=i[d-1];h[m.name]=f&&m.repeatable?f.split("/"):f}return h}function c(l){let u="",h=!1;for(const d of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const f of d)if(f.type===0)u+=f.value;else if(f.type===1){const{value:m,repeatable:v,optional:y}=f,T=m in l?l[m]:"";if($t(T)&&!v)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const C=$t(T)?T.join("/"):T;if(!C)if(y)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${m}"`);u+=C}}return u||"/"}return{re:o,score:r,keys:i,parse:a,stringify:c}}function Wb(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function Gb(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=Wb(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(kf(r))return 1;if(kf(s))return-1}return s.length-r.length}function kf(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Qb={type:0,value:""},Yb=/[a-zA-Z0-9_]/;function Jb(t){if(!t)return[[]];if(t==="/")return[[Qb]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(f){throw new Error(`ERR (${n})/"${l}": ${f}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,c,l="",u="";function h(){l&&(n===0?i.push({type:0,value:l}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:l,regexp:u,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),l="")}function d(){l+=c}for(;a<t.length;){if(c=t[a++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(l&&h(),o()):c===":"?(h(),n=1):d();break;case 4:d(),n=r;break;case 1:c==="("?n=2:Yb.test(c)?d():(h(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case 2:c===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:h(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${l}"`),h(),o(),s}function Xb(t,e,n){const r=Kb(Jb(t.path),n),s=ve(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function Zb(t,e){const n=[],r=new Map;e=Nf({strict:!1,end:!0,sensitive:!1},e);function s(u){return r.get(u)}function i(u,h,d){const f=!d,m=eC(u);m.aliasOf=d&&d.record;const v=Nf(e,u),y=[m];if("alias"in u){const F=typeof u.alias=="string"?[u.alias]:u.alias;for(const N of F)y.push(ve({},m,{components:d?d.record.components:m.components,path:N,aliasOf:d?d.record:m}))}let T,C;for(const F of y){const{path:N}=F;if(h&&N[0]!=="/"){const G=h.record.path,W=G[G.length-1]==="/"?"":"/";F.path=h.record.path+(N&&W+N)}if(T=Xb(F,h,v),d?d.alias.push(T):(C=C||T,C!==T&&C.alias.push(T),f&&u.name&&!Df(T)&&o(u.name)),m.children){const G=m.children;for(let W=0;W<G.length;W++)i(G[W],T,d&&d.children[W])}d=d||T,(T.record.components&&Object.keys(T.record.components).length||T.record.name||T.record.redirect)&&c(T)}return C?()=>{o(C)}:Ys}function o(u){if(Py(u)){const h=r.get(u);h&&(r.delete(u),n.splice(n.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=n.indexOf(u);h>-1&&(n.splice(h,1),u.record.name&&r.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function a(){return n}function c(u){let h=0;for(;h<n.length&&Gb(u,n[h])>=0&&(u.record.path!==n[h].record.path||!by(u,n[h]));)h++;n.splice(h,0,u),u.record.name&&!Df(u)&&r.set(u.record.name,u)}function l(u,h){let d,f={},m,v;if("name"in u&&u.name){if(d=r.get(u.name),!d)throw ds(1,{location:u});v=d.record.name,f=ve(Of(h.params,d.keys.filter(C=>!C.optional).map(C=>C.name)),u.params&&Of(u.params,d.keys.map(C=>C.name))),m=d.stringify(f)}else if("path"in u)m=u.path,d=n.find(C=>C.re.test(m)),d&&(f=d.parse(m),v=d.record.name);else{if(d=h.name?r.get(h.name):n.find(C=>C.re.test(h.path)),!d)throw ds(1,{location:u,currentLocation:h});v=d.record.name,f=ve({},h.params,u.params),m=d.stringify(f)}const y=[];let T=d;for(;T;)y.unshift(T.record),T=T.parent;return{name:v,path:m,params:f,matched:y,meta:nC(y)}}return t.forEach(u=>i(u)),{addRoute:i,resolve:l,removeRoute:o,getRoutes:a,getRecordMatcher:s}}function Of(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function eC(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:tC(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function tC(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Df(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function nC(t){return t.reduce((e,n)=>ve(e,n.meta),{})}function Nf(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function by(t,e){return e.children.some(n=>n===t||by(t,n))}const Cy=/#/g,rC=/&/g,sC=/\//g,iC=/=/g,oC=/\?/g,ky=/\+/g,aC=/%5B/g,cC=/%5D/g,Oy=/%5E/g,lC=/%60/g,Dy=/%7B/g,uC=/%7C/g,Ny=/%7D/g,hC=/%20/g;function ph(t){return encodeURI(""+t).replace(uC,"|").replace(aC,"[").replace(cC,"]")}function dC(t){return ph(t).replace(Dy,"{").replace(Ny,"}").replace(Oy,"^")}function $l(t){return ph(t).replace(ky,"%2B").replace(hC,"+").replace(Cy,"%23").replace(rC,"%26").replace(lC,"`").replace(Dy,"{").replace(Ny,"}").replace(Oy,"^")}function fC(t){return $l(t).replace(iC,"%3D")}function pC(t){return ph(t).replace(Cy,"%23").replace(oC,"%3F")}function gC(t){return t==null?"":pC(t).replace(sC,"%2F")}function Yo(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function mC(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(ky," "),o=i.indexOf("="),a=Yo(o<0?i:i.slice(0,o)),c=o<0?null:Yo(i.slice(o+1));if(a in e){let l=e[a];$t(l)||(l=e[a]=[l]),l.push(c)}else e[a]=c}return e}function Vf(t){let e="";for(let n in t){const r=t[n];if(n=fC(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}($t(r)?r.map(i=>i&&$l(i)):[r&&$l(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function _C(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=$t(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const yC=Symbol(""),xf=Symbol(""),nc=Symbol(""),Vy=Symbol(""),Ul=Symbol("");function ks(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Sn(t,e,n,r,s){const i=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((o,a)=>{const c=h=>{h===!1?a(ds(4,{from:n,to:e})):h instanceof Error?a(h):qb(h)?a(ds(2,{from:e,to:h})):(i&&r.enterCallbacks[s]===i&&typeof h=="function"&&i.push(h),o())},l=t.call(r&&r.instances[s],e,n,c);let u=Promise.resolve(l);t.length<3&&(u=u.then(c)),u.catch(h=>a(h))})}function Fc(t,e,n,r){const s=[];for(const i of t)for(const o in i.components){let a=i.components[o];if(!(e!=="beforeRouteEnter"&&!i.instances[o]))if(vC(a)){const l=(a.__vccOpts||a)[e];l&&s.push(Sn(l,n,r,i,o))}else{let c=a();s.push(()=>c.then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));const u=Rb(l)?l.default:l;i.components[o]=u;const d=(u.__vccOpts||u)[e];return d&&Sn(d,n,r,i,o)()}))}}return s}function vC(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function Mf(t){const e=_t(nc),n=_t(Vy),r=oe(()=>e.resolve(H(t.to))),s=oe(()=>{const{matched:c}=r.value,{length:l}=c,u=c[l-1],h=n.matched;if(!u||!h.length)return-1;const d=h.findIndex(hs.bind(null,u));if(d>-1)return d;const f=Lf(c[l-2]);return l>1&&Lf(u)===f&&h[h.length-1].path!==f?h.findIndex(hs.bind(null,c[l-2])):d}),i=oe(()=>s.value>-1&&wC(n.params,r.value.params)),o=oe(()=>s.value>-1&&s.value===n.matched.length-1&&Ay(n.params,r.value.params));function a(c={}){return IC(c)?e[H(t.replace)?"replace":"push"](H(t.to)).catch(Ys):Promise.resolve()}return{route:r,href:oe(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}const EC=bi({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Mf,setup(t,{slots:e}){const n=rn(Mf(t)),{options:r}=_t(nc),s=oe(()=>({[Ff(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Ff(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:pg("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),xy=EC;function IC(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function wC(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!$t(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function Lf(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Ff=(t,e,n)=>t??e??n,TC=bi({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=_t(Ul),s=oe(()=>t.route||r.value),i=_t(xf,0),o=oe(()=>{let l=H(i);const{matched:u}=s.value;let h;for(;(h=u[l])&&!h.components;)l++;return l}),a=oe(()=>s.value.matched[o.value]);lr(xf,oe(()=>o.value+1)),lr(yC,a),lr(Ul,s);const c=we();return Vt(()=>[c.value,a.value,t.name],([l,u,h],[d,f,m])=>{u&&(u.instances[h]=l,f&&f!==u&&l&&l===d&&(u.leaveGuards.size||(u.leaveGuards=f.leaveGuards),u.updateGuards.size||(u.updateGuards=f.updateGuards))),l&&u&&(!f||!hs(u,f)||!d)&&(u.enterCallbacks[h]||[]).forEach(v=>v(l))},{flush:"post"}),()=>{const l=s.value,u=t.name,h=a.value,d=h&&h.components[u];if(!d)return $f(n.default,{Component:d,route:l});const f=h.props[u],m=f?f===!0?l.params:typeof f=="function"?f(l):f:null,y=pg(d,ve({},m,e,{onVnodeUnmounted:T=>{T.component.isUnmounted&&(h.instances[u]=null)},ref:c}));return $f(n.default,{Component:y,route:l})||y}}});function $f(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const My=TC;function AC(t){const e=Zb(t.routes,t),n=t.parseQuery||mC,r=t.stringifyQuery||Vf,s=t.history,i=ks(),o=ks(),a=ks(),c=hE(Tn);let l=Tn;Br&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Mc.bind(null,I=>""+I),h=Mc.bind(null,gC),d=Mc.bind(null,Yo);function f(I,x){let O,$;return Py(I)?(O=e.getRecordMatcher(I),$=x):$=I,e.addRoute($,O)}function m(I){const x=e.getRecordMatcher(I);x&&e.removeRoute(x)}function v(){return e.getRoutes().map(I=>I.record)}function y(I){return!!e.getRecordMatcher(I)}function T(I,x){if(x=ve({},x||c.value),typeof I=="string"){const _=Lc(n,I,x.path),E=e.resolve({path:_.path},x),w=s.createHref(_.fullPath);return ve(_,E,{params:d(E.params),hash:Yo(_.hash),redirectedFrom:void 0,href:w})}let O;if("path"in I)O=ve({},I,{path:Lc(n,I.path,x.path).path});else{const _=ve({},I.params);for(const E in _)_[E]==null&&delete _[E];O=ve({},I,{params:h(_)}),x.params=h(x.params)}const $=e.resolve(O,x),me=I.hash||"";$.params=u(d($.params));const p=bb(r,ve({},I,{hash:dC(me),path:$.path})),g=s.createHref(p);return ve({fullPath:p,hash:me,query:r===Vf?_C(I.query):I.query||{}},$,{redirectedFrom:void 0,href:g})}function C(I){return typeof I=="string"?Lc(n,I,c.value.path):ve({},I)}function F(I,x){if(l!==I)return ds(8,{from:x,to:I})}function N(I){return re(I)}function G(I){return N(ve(C(I),{replace:!0}))}function W(I){const x=I.matched[I.matched.length-1];if(x&&x.redirect){const{redirect:O}=x;let $=typeof O=="function"?O(I):O;return typeof $=="string"&&($=$.includes("?")||$.includes("#")?$=C($):{path:$},$.params={}),ve({query:I.query,hash:I.hash,params:"path"in $?{}:I.params},$)}}function re(I,x){const O=l=T(I),$=c.value,me=I.state,p=I.force,g=I.replace===!0,_=W(O);if(_)return re(ve(C(_),{state:typeof _=="object"?ve({},me,_.state):me,force:p,replace:g}),x||O);const E=O;E.redirectedFrom=x;let w;return!p&&Cb(r,$,O)&&(w=ds(16,{to:E,from:$}),qe($,$,!0,!1)),(w?Promise.resolve(w):se(E,$)).catch(R=>ln(R)?ln(R,2)?R:ge(R):fe(R,E,$)).then(R=>{if(R){if(ln(R,2))return re(ve({replace:g},C(R.to),{state:typeof R.to=="object"?ve({},me,R.to.state):me,force:p}),x||E)}else R=Ge(E,$,!0,g,me);return Ve(E,$,R),R})}function q(I,x){const O=F(I,x);return O?Promise.reject(O):Promise.resolve()}function Q(I){const x=Nr.values().next().value;return x&&typeof x.runWithContext=="function"?x.runWithContext(I):I()}function se(I,x){let O;const[$,me,p]=RC(I,x);O=Fc($.reverse(),"beforeRouteLeave",I,x);for(const _ of $)_.leaveGuards.forEach(E=>{O.push(Sn(E,I,x))});const g=q.bind(null,I,x);return O.push(g),Xe(O).then(()=>{O=[];for(const _ of i.list())O.push(Sn(_,I,x));return O.push(g),Xe(O)}).then(()=>{O=Fc(me,"beforeRouteUpdate",I,x);for(const _ of me)_.updateGuards.forEach(E=>{O.push(Sn(E,I,x))});return O.push(g),Xe(O)}).then(()=>{O=[];for(const _ of p)if(_.beforeEnter)if($t(_.beforeEnter))for(const E of _.beforeEnter)O.push(Sn(E,I,x));else O.push(Sn(_.beforeEnter,I,x));return O.push(g),Xe(O)}).then(()=>(I.matched.forEach(_=>_.enterCallbacks={}),O=Fc(p,"beforeRouteEnter",I,x),O.push(g),Xe(O))).then(()=>{O=[];for(const _ of o.list())O.push(Sn(_,I,x));return O.push(g),Xe(O)}).catch(_=>ln(_,8)?_:Promise.reject(_))}function Ve(I,x,O){a.list().forEach($=>Q(()=>$(I,x,O)))}function Ge(I,x,O,$,me){const p=F(I,x);if(p)return p;const g=x===Tn,_=Br?history.state:{};O&&($||g?s.replace(I.fullPath,ve({scroll:g&&_&&_.scroll},me)):s.push(I.fullPath,me)),c.value=I,qe(I,x,O,g),ge()}let ft;function cn(){ft||(ft=s.listen((I,x,O)=>{if(!Gi.listening)return;const $=T(I),me=W($);if(me){re(ve(me,{replace:!0}),$).catch(Ys);return}l=$;const p=c.value;Br&&Lb(Pf(p.fullPath,O.delta),tc()),se($,p).catch(g=>ln(g,12)?g:ln(g,2)?(re(g.to,$).then(_=>{ln(_,20)&&!O.delta&&O.type===Ai.pop&&s.go(-1,!1)}).catch(Ys),Promise.reject()):(O.delta&&s.go(-O.delta,!1),fe(g,$,p))).then(g=>{g=g||Ge($,p,!1),g&&(O.delta&&!ln(g,8)?s.go(-O.delta,!1):O.type===Ai.pop&&ln(g,20)&&s.go(-1,!1)),Ve($,p,g)}).catch(Ys)}))}let lt=ks(),he=ks(),_e;function fe(I,x,O){ge(I);const $=he.list();return $.length?$.forEach(me=>me(I,x,O)):console.error(I),Promise.reject(I)}function bt(){return _e&&c.value!==Tn?Promise.resolve():new Promise((I,x)=>{lt.add([I,x])})}function ge(I){return _e||(_e=!I,cn(),lt.list().forEach(([x,O])=>I?O(I):x()),lt.reset()),I}function qe(I,x,O,$){const{scrollBehavior:me}=t;if(!Br||!me)return Promise.resolve();const p=!O&&Fb(Pf(I.fullPath,0))||($||!O)&&history.state&&history.state.scroll||null;return ri().then(()=>me(I,x,p)).then(g=>g&&Mb(g)).catch(g=>fe(g,I,x))}const ke=I=>s.go(I);let Dr;const Nr=new Set,Gi={currentRoute:c,listening:!0,addRoute:f,removeRoute:m,hasRoute:y,getRoutes:v,resolve:T,options:t,push:N,replace:G,go:ke,back:()=>ke(-1),forward:()=>ke(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:he.add,isReady:bt,install(I){const x=this;I.component("RouterLink",xy),I.component("RouterView",My),I.config.globalProperties.$router=x,Object.defineProperty(I.config.globalProperties,"$route",{enumerable:!0,get:()=>H(c)}),Br&&!Dr&&c.value===Tn&&(Dr=!0,N(s.location).catch(me=>{}));const O={};for(const me in Tn)Object.defineProperty(O,me,{get:()=>c.value[me],enumerable:!0});I.provide(nc,x),I.provide(Vy,Np(O)),I.provide(Ul,c);const $=I.unmount;Nr.add(I),I.unmount=function(){Nr.delete(I),Nr.size<1&&(l=Tn,ft&&ft(),ft=null,c.value=Tn,Dr=!1,_e=!1),$()}}};function Xe(I){return I.reduce((x,O)=>x.then(()=>Q(O)),Promise.resolve())}return Gi}function RC(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(l=>hs(l,a))?r.push(a):n.push(a));const c=t.matched[o];c&&(e.matched.find(l=>hs(l,c))||s.push(c))}return[n,r,s]}function PC(){return _t(nc)}const SC=bi({__name:"App",setup(t){return(e,n)=>(Wt(),ou(H(My)))}}),bC="modulepreload",CC=function(t){return"/vue-project/"+t},Uf={},Fr=function(e,n,r){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=CC(i),i in Uf)return;Uf[i]=!0;const o=i.endsWith(".css"),a=o?'[rel="stylesheet"]':"";if(!!r)for(let u=s.length-1;u>=0;u--){const h=s[u];if(h.href===i&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${a}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":bC,o||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),o)return new Promise((u,h)=>{l.addEventListener("load",u),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})};function gh(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function jf(t){return t!==void 0&&t.enterprise!==void 0}class kC{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}function Ly(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const OC=Ly,Fy=new Ar("auth","Firebase",Ly());/**
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
 */const Jo=new va("@firebase/auth");function DC(t,...e){Jo.logLevel<=ce.WARN&&Jo.warn(`Auth (${_s}): ${t}`,...e)}function wo(t,...e){Jo.logLevel<=ce.ERROR&&Jo.error(`Auth (${_s}): ${t}`,...e)}/**
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
 */function St(t,...e){throw mh(t,...e)}function en(t,...e){return mh(t,...e)}function $y(t,e,n){const r=Object.assign(Object.assign({},OC()),{[e]:n});return new Ar("auth","Firebase",r).create(e,{appName:t.name})}function NC(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&St(t,"argument-error"),$y(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function mh(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Fy.create(t,...e)}function Y(t,e,...n){if(!t)throw mh(e,...n)}function pn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw wo(e),new Error(e)}function En(t,e){t||pn(e)}/**
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
 */function jl(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function VC(){return Bf()==="http:"||Bf()==="https:"}function Bf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function xC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(VC()||Pg()||"connection"in navigator)?navigator.onLine:!0}function MC(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Hi{constructor(e,n){this.shortDelay=e,this.longDelay=n,En(n>e,"Short delay should be less than long delay!"),this.isMobile=mw()||_w()}get(){return xC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function _h(t,e){En(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Uy{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;pn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;pn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;pn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const LC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const FC=new Hi(3e4,6e4);function kr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Wn(t,e,n,r,s={}){return jy(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=Ci(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),Uy.fetch()(By(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function jy(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},LC),e);try{const s=new $C(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ho(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ho(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ho(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw ho(t,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw $y(t,u,l);St(t,u)}}catch(s){if(s instanceof Ut)throw s;St(t,"network-request-failed",{message:String(s)})}}async function zi(t,e,n,r,s={}){const i=await Wn(t,e,n,r,s);return"mfaPendingCredential"in i&&St(t,"multi-factor-auth-required",{_serverResponse:i}),i}function By(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?_h(t.config,s):`${t.config.apiScheme}://${s}`}class $C{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(en(this.auth,"network-request-failed")),FC.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ho(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=en(t,e,r);return s.customData._tokenResponse=n,s}async function UC(t,e){return Wn(t,"GET","/v2/recaptchaConfig",kr(t,e))}/**
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
 */async function jC(t,e){return Wn(t,"POST","/v1/accounts:delete",e)}async function BC(t,e){return Wn(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Xs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function qC(t,e=!1){const n=Ne(t),r=await n.getIdToken(e),s=yh(r);Y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Xs($c(s.auth_time)),issuedAtTime:Xs($c(s.iat)),expirationTime:Xs($c(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function $c(t){return Number(t)*1e3}function yh(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return wo("JWT malformed, contained fewer than 3 sections"),null;try{const s=wg(n);return s?JSON.parse(s):(wo("Failed to decode base64 JWT payload"),null)}catch(s){return wo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function HC(t){const e=yh(t);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function fs(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Ut&&zC(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function zC({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class KC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class qy{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xs(this.lastLoginAt),this.creationTime=Xs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Xo(t){var e;const n=t.auth,r=await t.getIdToken(),s=await fs(t,BC(n,{idToken:r}));Y(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?QC(i.providerUserInfo):[],a=GC(t.providerData,o),c=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),u=c?l:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new qy(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,h)}async function WC(t){const e=Ne(t);await Xo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function GC(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function QC(t){return t.map(e=>{var{providerId:n}=e,r=gh(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function YC(t,e){const n=await jy(t,{},async()=>{const r=Ci({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=By(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Uy.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class Ri{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):HC(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return Y(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await YC(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Ri;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ri,this.toJSON())}_performRefresh(){return pn("not implemented")}}/**
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
 */function An(t,e){Y(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class dr{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=gh(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new KC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new qy(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await fs(this,this.stsTokenManager.getToken(this.auth,e));return Y(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return qC(this,e)}reload(){return WC(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new dr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Xo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await fs(this,jC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,a,c,l,u;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,d=(s=n.email)!==null&&s!==void 0?s:void 0,f=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,m=(o=n.photoURL)!==null&&o!==void 0?o:void 0,v=(a=n.tenantId)!==null&&a!==void 0?a:void 0,y=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,T=(l=n.createdAt)!==null&&l!==void 0?l:void 0,C=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:F,emailVerified:N,isAnonymous:G,providerData:W,stsTokenManager:re}=n;Y(F&&re,e,"internal-error");const q=Ri.fromJSON(this.name,re);Y(typeof F=="string",e,"internal-error"),An(h,e.name),An(d,e.name),Y(typeof N=="boolean",e,"internal-error"),Y(typeof G=="boolean",e,"internal-error"),An(f,e.name),An(m,e.name),An(v,e.name),An(y,e.name),An(T,e.name),An(C,e.name);const Q=new dr({uid:F,auth:e,email:d,emailVerified:N,displayName:h,isAnonymous:G,photoURL:m,phoneNumber:f,tenantId:v,stsTokenManager:q,createdAt:T,lastLoginAt:C});return W&&Array.isArray(W)&&(Q.providerData=W.map(se=>Object.assign({},se))),y&&(Q._redirectEventId=y),Q}static async _fromIdTokenResponse(e,n,r=!1){const s=new Ri;s.updateFromServerResponse(n);const i=new dr({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Xo(i),i}}/**
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
 */const qf=new Map;function gn(t){En(t instanceof Function,"Expected a class definition");let e=qf.get(t);return e?(En(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,qf.set(t,e),e)}/**
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
 */class Hy{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Hy.type="NONE";const Hf=Hy;/**
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
 */function To(t,e,n){return`firebase:${t}:${e}:${n}`}class Jr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=To(this.userKey,s.apiKey,i),this.fullPersistenceKey=To("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?dr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Jr(gn(Hf),e,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||gn(Hf);const o=To(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){const h=dr._fromJSON(e,u);l!==i&&(a=h),i=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Jr(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Jr(i,e,r))}}/**
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
 */function zf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Qy(e))return"Blackberry";if(Yy(e))return"Webos";if(vh(e))return"Safari";if((e.includes("chrome/")||Ky(e))&&!e.includes("edge/"))return"Chrome";if(Gy(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function zy(t=at()){return/firefox\//i.test(t)}function vh(t=at()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ky(t=at()){return/crios\//i.test(t)}function Wy(t=at()){return/iemobile/i.test(t)}function Gy(t=at()){return/android/i.test(t)}function Qy(t=at()){return/blackberry/i.test(t)}function Yy(t=at()){return/webos/i.test(t)}function rc(t=at()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function JC(t=at()){var e;return rc(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function XC(){return yw()&&document.documentMode===10}function Jy(t=at()){return rc(t)||Gy(t)||Yy(t)||Qy(t)||/windows phone/i.test(t)||Wy(t)}function ZC(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function Xy(t,e=[]){let n;switch(t){case"Browser":n=zf(at());break;case"Worker":n=`${zf(at())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${_s}/${r}`}/**
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
 */class ek{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function tk(t,e={}){return Wn(t,"GET","/v2/passwordPolicy",kr(t,e))}/**
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
 */const nk=6;class rk{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:nk,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,a;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class sk{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kf(this),this.idTokenSubscription=new Kf(this),this.beforeStateQueue=new ek(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Fy,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=gn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Jr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Xo(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=MC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?Ne(e):null;return n&&Y(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(gn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await tk(this),n=new rk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ar("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&gn(e)||this._popupRedirectResolver;Y(n,this,"argument-error"),this.redirectPersistenceManager=await Jr.create(this,[gn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xy(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&DC(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Gn(t){return Ne(t)}class Kf{constructor(e){this.auth=e,this.observer=null,this.addObserver=Aw(n=>this.observer=n)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */function ik(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Zy(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=en("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",ik().appendChild(r)})}function ok(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const ak="https://www.google.com/recaptcha/enterprise.js?render=",ck="recaptcha-enterprise",lk="NO_RECAPTCHA";class uk{constructor(e){this.type=ck,this.auth=Gn(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{UC(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new kC(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(i,o,a){const c=window.grecaptcha;jf(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(lk)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(a=>{if(!n&&jf(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}Zy(ak+a).then(()=>{s(a,i,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function Zo(t,e,n,r=!1){const s=new uk(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */function hk(t,e){const n=Rr(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(ci(i,e??{}))return s;St(s,"already-initialized")}return n.initialize({options:e})}function dk(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(gn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function fk(t,e,n){const r=Gn(t);Y(r._canInitEmulator,r,"emulator-config-failed"),Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=ev(e),{host:o,port:a}=pk(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||gk()}function ev(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function pk(t){const e=ev(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Wf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Wf(o)}}}function Wf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function gk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Eh{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return pn("not implemented")}_getIdTokenResponse(e){return pn("not implemented")}_linkToIdToken(e,n){return pn("not implemented")}_getReauthenticationResolver(e){return pn("not implemented")}}async function mk(t,e){return Wn(t,"POST","/v1/accounts:update",e)}/**
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
 */async function Uc(t,e){return zi(t,"POST","/v1/accounts:signInWithPassword",kr(t,e))}/**
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
 */async function _k(t,e){return zi(t,"POST","/v1/accounts:signInWithEmailLink",kr(t,e))}async function yk(t,e){return zi(t,"POST","/v1/accounts:signInWithEmailLink",kr(t,e))}/**
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
 */class Pi extends Eh{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Pi(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Pi(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const r={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const s=await Zo(e,r,"signInWithPassword");return Uc(e,s)}else return Uc(e,r).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const i=await Zo(e,r,"signInWithPassword");return Uc(e,i)}else return Promise.reject(s)});case"emailLink":return _k(e,{email:this._email,oobCode:this._password});default:St(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return mk(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return yk(e,{idToken:n,email:this._email,oobCode:this._password});default:St(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Xr(t,e){return zi(t,"POST","/v1/accounts:signInWithIdp",kr(t,e))}/**
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
 */const vk="http://localhost";class wr extends Eh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new wr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):St("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=gh(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new wr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Xr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Xr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Xr(e,n)}buildRequest(){const e={requestUri:vk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ci(n)}return e}}/**
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
 */function Ek(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ik(t){const e=Ns(Vs(t)).link,n=e?Ns(Vs(e)).deep_link_id:null,r=Ns(Vs(t)).deep_link_id;return(r?Ns(Vs(r)).link:null)||r||n||e||t}class Ih{constructor(e){var n,r,s,i,o,a;const c=Ns(Vs(e)),l=(n=c.apiKey)!==null&&n!==void 0?n:null,u=(r=c.oobCode)!==null&&r!==void 0?r:null,h=Ek((s=c.mode)!==null&&s!==void 0?s:null);Y(l&&u&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=u,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=Ik(e);try{return new Ih(n)}catch{return null}}}/**
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
 */class As{constructor(){this.providerId=As.PROVIDER_ID}static credential(e,n){return Pi._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Ih.parseLink(n);return Y(r,"argument-error"),Pi._fromEmailAndCode(e,r.code,r.tenantId)}}As.PROVIDER_ID="password";As.EMAIL_PASSWORD_SIGN_IN_METHOD="password";As.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class wh{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ki extends wh{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Cn extends Ki{constructor(){super("facebook.com")}static credential(e){return wr._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Cn.credential(e.oauthAccessToken)}catch{return null}}}Cn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Cn.PROVIDER_ID="facebook.com";/**
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
 */class dn extends Ki{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return wr._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return dn.credential(n,r)}catch{return null}}}dn.GOOGLE_SIGN_IN_METHOD="google.com";dn.PROVIDER_ID="google.com";/**
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
 */class kn extends Ki{constructor(){super("github.com")}static credential(e){return wr._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kn.credential(e.oauthAccessToken)}catch{return null}}}kn.GITHUB_SIGN_IN_METHOD="github.com";kn.PROVIDER_ID="github.com";/**
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
 */class On extends Ki{constructor(){super("twitter.com")}static credential(e,n){return wr._fromParams({providerId:On.PROVIDER_ID,signInMethod:On.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return On.credentialFromTaggedObject(e)}static credentialFromError(e){return On.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return On.credential(n,r)}catch{return null}}}On.TWITTER_SIGN_IN_METHOD="twitter.com";On.PROVIDER_ID="twitter.com";/**
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
 */async function jc(t,e){return zi(t,"POST","/v1/accounts:signUp",kr(t,e))}/**
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
 */class Tr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await dr._fromIdTokenResponse(e,r,s),o=Gf(r);return new Tr({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Gf(r);return new Tr({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Gf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class ea extends Ut{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ea.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new ea(e,n,r,s)}}function tv(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ea._fromErrorAndOperation(t,i,e,r):i})}async function wk(t,e,n=!1){const r=await fs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Tr._forOperation(t,"link",r)}/**
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
 */async function Tk(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await fs(t,tv(r,s,e,t),n);Y(i.idToken,r,"internal-error");const o=yh(i.idToken);Y(o,r,"internal-error");const{sub:a}=o;return Y(t.uid===a,r,"user-mismatch"),Tr._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&St(r,"user-mismatch"),i}}/**
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
 */async function nv(t,e,n=!1){const r="signIn",s=await tv(t,r,e),i=await Tr._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function Ak(t,e){return nv(Gn(t),e)}/**
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
 */async function rv(t){const e=Gn(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Rk(t,e,n){var r;const s=Gn(t),i={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((r=s._getRecaptchaConfig())===null||r===void 0)&&r.emailPasswordEnabled){const l=await Zo(s,i,"signUpPassword");o=jc(s,l)}else o=jc(s,i).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const u=await Zo(s,i,"signUpPassword");return jc(s,u)}throw l});const a=await o.catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&rv(t),l}),c=await Tr._fromIdTokenResponse(s,"signIn",a);return await s._updateCurrentUser(c.user),c}function Pk(t,e,n){return Ak(Ne(t),As.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&rv(t),r})}/**
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
 */async function Sk(t,e){return Wn(t,"POST","/v1/accounts:update",e)}/**
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
 */async function bk(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Ne(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await fs(r,Sk(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function Ck(t,e,n,r){return Ne(t).onIdTokenChanged(e,n,r)}function kk(t,e,n){return Ne(t).beforeAuthStateChanged(e,n)}function sv(t,e,n,r){return Ne(t).onAuthStateChanged(e,n,r)}function tD(t){return Ne(t).signOut()}const ta="__sak";/**
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
 */class iv{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ta,"1"),this.storage.removeItem(ta),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function Ok(){const t=at();return vh(t)||rc(t)}const Dk=1e3,Nk=10;class ov extends iv{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Ok()&&ZC(),this.fallbackToPolling=Jy(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);XC()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Nk):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Dk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ov.type="LOCAL";const Vk=ov;/**
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
 */class av extends iv{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}av.type="SESSION";const cv=av;/**
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
 */function xk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class sc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new sc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await xk(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}sc.receivers=[];/**
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
 */function Th(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Mk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=Th("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(h){const d=h;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function tn(){return window}function Lk(t){tn().location.href=t}/**
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
 */function lv(){return typeof tn().WorkerGlobalScope<"u"&&typeof tn().importScripts=="function"}async function Fk(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $k(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Uk(){return lv()?self:null}/**
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
 */const uv="firebaseLocalStorageDb",jk=1,na="firebaseLocalStorage",hv="fbase_key";class Wi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ic(t,e){return t.transaction([na],e?"readwrite":"readonly").objectStore(na)}function Bk(){const t=indexedDB.deleteDatabase(uv);return new Wi(t).toPromise()}function Bl(){const t=indexedDB.open(uv,jk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(na,{keyPath:hv})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(na)?e(r):(r.close(),await Bk(),e(await Bl()))})})}async function Qf(t,e,n){const r=ic(t,!0).put({[hv]:e,value:n});return new Wi(r).toPromise()}async function qk(t,e){const n=ic(t,!1).get(e),r=await new Wi(n).toPromise();return r===void 0?null:r.value}function Yf(t,e){const n=ic(t,!0).delete(e);return new Wi(n).toPromise()}const Hk=800,zk=3;class dv{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Bl(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>zk)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lv()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=sc._getInstance(Uk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Fk(),!this.activeServiceWorker)return;this.sender=new Mk(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$k()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Bl();return await Qf(e,ta,"1"),await Yf(e,ta),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Qf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>qk(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Yf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ic(s,!1).getAll();return new Wi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dv.type="LOCAL";const Kk=dv;new Hi(3e4,6e4);/**
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
 */function fv(t,e){return e?gn(e):(Y(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Ah extends Eh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Xr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Xr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Xr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Wk(t){return nv(t.auth,new Ah(t),t.bypassAuthState)}function Gk(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),Tk(n,new Ah(t),t.bypassAuthState)}async function Qk(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),wk(n,new Ah(t),t.bypassAuthState)}/**
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
 */class pv{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Wk;case"linkViaPopup":case"linkViaRedirect":return Qk;case"reauthViaPopup":case"reauthViaRedirect":return Gk;default:St(this.auth,"internal-error")}}resolve(e){En(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){En(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Yk=new Hi(2e3,1e4);async function Jk(t,e,n){const r=Gn(t);NC(t,e,wh);const s=fv(r,n);return new ar(r,"signInViaPopup",e,s).executeNotNull()}class ar extends pv{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ar.currentPopupAction&&ar.currentPopupAction.cancel(),ar.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){En(this.filter.length===1,"Popup operations only handle one event");const e=Th();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(en(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(en(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ar.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(en(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Yk.get())};e()}}ar.currentPopupAction=null;/**
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
 */const Xk="pendingRedirect",Ao=new Map;class Zk extends pv{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ao.get(this.auth._key());if(!e){try{const r=await e1(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ao.set(this.auth._key(),e)}return this.bypassAuthState||Ao.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function e1(t,e){const n=r1(e),r=n1(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function t1(t,e){Ao.set(t._key(),e)}function n1(t){return gn(t._redirectPersistence)}function r1(t){return To(Xk,t.config.apiKey,t.name)}async function s1(t,e,n=!1){const r=Gn(t),s=fv(r,e),o=await new Zk(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const i1=10*60*1e3;class o1{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!a1(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!gv(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(en(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=i1&&this.cachedEventUids.clear(),this.cachedEventUids.has(Jf(e))}saveEventToCache(e){this.cachedEventUids.add(Jf(e)),this.lastProcessedEventTime=Date.now()}}function Jf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function gv({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function a1(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gv(t);default:return!1}}/**
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
 */async function c1(t,e={}){return Wn(t,"GET","/v1/projects",e)}/**
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
 */const l1=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,u1=/^https?/;async function h1(t){if(t.config.emulator)return;const{authorizedDomains:e}=await c1(t);for(const n of e)try{if(d1(n))return}catch{}St(t,"unauthorized-domain")}function d1(t){const e=jl(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!u1.test(n))return!1;if(l1.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const f1=new Hi(3e4,6e4);function Xf(){const t=tn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function p1(t){return new Promise((e,n)=>{var r,s,i;function o(){Xf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Xf(),n(en(t,"network-request-failed"))},timeout:f1.get()})}if(!((s=(r=tn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=tn().gapi)===null||i===void 0)&&i.load)o();else{const a=ok("iframefcb");return tn()[a]=()=>{gapi.load?o():n(en(t,"network-request-failed"))},Zy(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Ro=null,e})}let Ro=null;function g1(t){return Ro=Ro||p1(t),Ro}/**
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
 */const m1=new Hi(5e3,15e3),_1="__/auth/iframe",y1="emulator/auth/iframe",v1={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},E1=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function I1(t){const e=t.config;Y(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?_h(e,y1):`https://${t.config.authDomain}/${_1}`,r={apiKey:e.apiKey,appName:t.name,v:_s},s=E1.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Ci(r).slice(1)}`}async function w1(t){const e=await g1(t),n=tn().gapi;return Y(n,t,"internal-error"),e.open({where:document.body,url:I1(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:v1,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=en(t,"network-request-failed"),a=tn().setTimeout(()=>{i(o)},m1.get());function c(){tn().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const T1={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},A1=500,R1=600,P1="_blank",S1="http://localhost";class Zf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function b1(t,e,n,r=A1,s=R1){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},T1),{width:r.toString(),height:s.toString(),top:i,left:o}),l=at().toLowerCase();n&&(a=Ky(l)?P1:n),zy(l)&&(e=e||S1,c.scrollbars="yes");const u=Object.entries(c).reduce((d,[f,m])=>`${d}${f}=${m},`,"");if(JC(l)&&a!=="_self")return C1(e||"",a),new Zf(null);const h=window.open(e||"",a,u);Y(h,t,"popup-blocked");try{h.focus()}catch{}return new Zf(h)}function C1(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const k1="__/auth/handler",O1="emulator/auth/handler",D1=encodeURIComponent("fac");async function ep(t,e,n,r,s,i){Y(t.config.authDomain,t,"auth-domain-config-required"),Y(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:_s,eventId:s};if(e instanceof wh){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Tw(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries(i||{}))o[u]=h}if(e instanceof Ki){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${D1}=${encodeURIComponent(c)}`:"";return`${N1(t)}?${Ci(a).slice(1)}${l}`}function N1({config:t}){return t.emulator?_h(t,O1):`https://${t.authDomain}/${k1}`}/**
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
 */const Bc="webStorageSupport";class V1{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cv,this._completeRedirectFn=s1,this._overrideRedirectResult=t1}async _openPopup(e,n,r,s){var i;En((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await ep(e,n,r,jl(),s);return b1(e,o,Th())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await ep(e,n,r,jl(),s);return Lk(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(En(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await w1(e),r=new o1(e);return n.register("authEvent",s=>(Y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Bc,{type:Bc},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Bc];o!==void 0&&n(!!o),St(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=h1(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Jy()||vh()||rc()}}const x1=V1;var tp="@firebase/auth",np="1.3.0";/**
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
 */class M1{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function L1(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function F1(t){sn(new Lt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xy(t)},l=new sk(r,s,i,c);return dk(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),sn(new Lt("auth-internal",e=>{const n=Gn(e.getProvider("auth").getImmediate());return(r=>new M1(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Pt(tp,np,L1(t)),Pt(tp,np,"esm2017")}/**
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
 */const $1=5*60,U1=Rg("authIdTokenMaxAge")||$1;let rp=null;const j1=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>U1)return;const s=n==null?void 0:n.token;rp!==s&&(rp=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Po(t=hu()){const e=Rr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=hk(t,{popupRedirectResolver:x1,persistence:[Kk,Vk,cv]}),r=Rg("authTokenSyncURL");if(r){const i=j1(r);kk(n,i,()=>i(n.currentUser)),Ck(n,o=>i(o))}const s=Tg("auth");return s&&fk(n,`http://${s}`),n}F1("Browser");function nD(t,e){const n=new Array(e);let r=t.length;const s=new Array(r);if(e>r)throw new RangeError("getRandom: more elements taken than available");for(;e--;){const i=Math.floor(Math.random()*r);n[e]=t[i in s?s[i]:i],s[i]=--r in s?s[r]:r}return n}const sp=()=>new Promise((t,e)=>{const n=sv(Po(),r=>{n(),t(r)},e)});function ip(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,r)}return n}function bn(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ip(Object(n),!0).forEach(function(r){B1(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ip(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function B1(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function op(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return Object.keys(t).reduce((n,r)=>(e.includes(r)||(n[r]=H(t[r])),n),{})}function ra(t){return typeof t=="function"}function q1(t){return Jt(t)||fr(t)}function mv(t,e,n){let r=t;const s=e.split(".");for(let i=0;i<s.length;i++){if(!r[s[i]])return n;r=r[s[i]]}return r}function qc(t,e,n){return oe(()=>t.some(r=>mv(e,r,{[n]:!1})[n]))}function ap(t,e,n){return oe(()=>t.reduce((r,s)=>{const i=mv(e,s,{[n]:!1})[n]||[];return r.concat(i)},[]))}function _v(t,e,n,r){return t.call(r,H(e),H(n),r)}function yv(t){return t.$valid!==void 0?!t.$valid:!t}function H1(t,e,n,r,s,i,o){let{$lazy:a,$rewardEarly:c}=s,l=arguments.length>7&&arguments[7]!==void 0?arguments[7]:[],u=arguments.length>8?arguments[8]:void 0,h=arguments.length>9?arguments[9]:void 0,d=arguments.length>10?arguments[10]:void 0;const f=we(!!r.value),m=we(0);n.value=!1;const v=Vt([e,r].concat(l,d),()=>{if(a&&!r.value||c&&!h.value&&!n.value)return;let y;try{y=_v(t,e,u,o)}catch(T){y=Promise.reject(T)}m.value++,n.value=!!m.value,f.value=!1,Promise.resolve(y).then(T=>{m.value--,n.value=!!m.value,i.value=T,f.value=yv(T)}).catch(T=>{m.value--,n.value=!!m.value,i.value=T,f.value=!0})},{immediate:!0,deep:typeof e=="object"});return{$invalid:f,$unwatch:v}}function z1(t,e,n,r,s,i,o,a){let{$lazy:c,$rewardEarly:l}=r;const u=()=>({}),h=oe(()=>{if(c&&!n.value||l&&!a.value)return!1;let d=!0;try{const f=_v(t,e,o,i);s.value=f,d=yv(f)}catch(f){s.value=f}return d});return{$unwatch:u,$invalid:h}}function K1(t,e,n,r,s,i,o,a,c,l,u){const h=we(!1),d=t.$params||{},f=we(null);let m,v;t.$async?{$invalid:m,$unwatch:v}=H1(t.$validator,e,h,n,r,f,s,t.$watchTargets,c,l,u):{$invalid:m,$unwatch:v}=z1(t.$validator,e,n,r,f,s,c,l);const y=t.$message;return{$message:ra(y)?oe(()=>y(op({$pending:h,$invalid:m,$params:op(d),$model:e,$response:f,$validator:i,$propertyPath:a,$property:o}))):y||"",$params:d,$pending:h,$invalid:m,$response:f,$unwatch:v}}function W1(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const e=H(t),n=Object.keys(e),r={},s={},i={};let o=null;return n.forEach(a=>{const c=e[a];switch(!0){case ra(c.$validator):r[a]=c;break;case ra(c):r[a]={$validator:c};break;case a==="$validationGroups":o=c;break;case a.startsWith("$"):i[a]=c;break;default:s[a]=c}}),{rules:r,nestedValidators:s,config:i,validationGroups:o}}const G1="__root";function Q1(t,e,n,r,s,i,o,a,c){const l=Object.keys(t),u=r.get(s,t),h=we(!1),d=we(!1),f=we(0);if(u){if(!u.$partial)return u;u.$unwatch(),h.value=u.$dirty.value}const m={$dirty:h,$path:s,$touch:()=>{h.value||(h.value=!0)},$reset:()=>{h.value&&(h.value=!1)},$commit:()=>{}};return l.length?(l.forEach(v=>{m[v]=K1(t[v],e,m.$dirty,i,o,v,n,s,c,d,f)}),m.$externalResults=oe(()=>a.value?[].concat(a.value).map((v,y)=>({$propertyPath:s,$property:n,$validator:"$externalResults",$uid:`${s}-externalResult-${y}`,$message:v,$params:{},$response:null,$pending:!1})):[]),m.$invalid=oe(()=>{const v=l.some(y=>H(m[y].$invalid));return d.value=v,!!m.$externalResults.value.length||v}),m.$pending=oe(()=>l.some(v=>H(m[v].$pending))),m.$error=oe(()=>m.$dirty.value?m.$pending.value||m.$invalid.value:!1),m.$silentErrors=oe(()=>l.filter(v=>H(m[v].$invalid)).map(v=>{const y=m[v];return rn({$propertyPath:s,$property:n,$validator:v,$uid:`${s}-${v}`,$message:y.$message,$params:y.$params,$response:y.$response,$pending:y.$pending})}).concat(m.$externalResults.value)),m.$errors=oe(()=>m.$dirty.value?m.$silentErrors.value:[]),m.$unwatch=()=>l.forEach(v=>{m[v].$unwatch()}),m.$commit=()=>{d.value=!0,f.value=Date.now()},r.set(s,t,m),m):(u&&r.set(s,t,m),m)}function Y1(t,e,n,r,s,i,o){const a=Object.keys(t);return a.length?a.reduce((c,l)=>(c[l]=ql({validations:t[l],state:e,key:l,parentKey:n,resultsCache:r,globalConfig:s,instance:i,externalResults:o}),c),{}):{}}function J1(t,e,n){const r=oe(()=>[e,n].filter(m=>m).reduce((m,v)=>m.concat(Object.values(H(v))),[])),s=oe({get(){return t.$dirty.value||(r.value.length?r.value.every(m=>m.$dirty):!1)},set(m){t.$dirty.value=m}}),i=oe(()=>{const m=H(t.$silentErrors)||[],v=r.value.filter(y=>(H(y).$silentErrors||[]).length).reduce((y,T)=>y.concat(...T.$silentErrors),[]);return m.concat(v)}),o=oe(()=>{const m=H(t.$errors)||[],v=r.value.filter(y=>(H(y).$errors||[]).length).reduce((y,T)=>y.concat(...T.$errors),[]);return m.concat(v)}),a=oe(()=>r.value.some(m=>m.$invalid)||H(t.$invalid)||!1),c=oe(()=>r.value.some(m=>H(m.$pending))||H(t.$pending)||!1),l=oe(()=>r.value.some(m=>m.$dirty)||r.value.some(m=>m.$anyDirty)||s.value),u=oe(()=>s.value?c.value||a.value:!1),h=()=>{t.$touch(),r.value.forEach(m=>{m.$touch()})},d=()=>{t.$commit(),r.value.forEach(m=>{m.$commit()})},f=()=>{t.$reset(),r.value.forEach(m=>{m.$reset()})};return r.value.length&&r.value.every(m=>m.$dirty)&&h(),{$dirty:s,$errors:o,$invalid:a,$anyDirty:l,$error:u,$pending:c,$touch:h,$reset:f,$silentErrors:i,$commit:d}}function ql(t){let{validations:e,state:n,key:r,parentKey:s,childResults:i,resultsCache:o,globalConfig:a={},instance:c,externalResults:l}=t;const u=s?`${s}.${r}`:r,{rules:h,nestedValidators:d,config:f,validationGroups:m}=W1(e),v=bn(bn({},a),f),y=r?oe(()=>{const ge=H(n);return ge?H(ge[r]):void 0}):n,T=bn({},H(l)||{}),C=oe(()=>{const ge=H(l);return r?ge?H(ge[r]):void 0:ge}),F=Q1(h,y,r,o,u,v,c,C,n),N=Y1(d,y,u,o,v,c,C),G={};m&&Object.entries(m).forEach(ge=>{let[qe,ke]=ge;G[qe]={$invalid:qc(ke,N,"$invalid"),$error:qc(ke,N,"$error"),$pending:qc(ke,N,"$pending"),$errors:ap(ke,N,"$errors"),$silentErrors:ap(ke,N,"$silentErrors")}});const{$dirty:W,$errors:re,$invalid:q,$anyDirty:Q,$error:se,$pending:Ve,$touch:Ge,$reset:ft,$silentErrors:cn,$commit:lt}=J1(F,N,i),he=r?oe({get:()=>H(y),set:ge=>{W.value=!0;const qe=H(n),ke=H(l);ke&&(ke[r]=T[r]),Re(qe[r])?qe[r].value=ge:qe[r]=ge}}):null;r&&v.$autoDirty&&Vt(y,()=>{W.value||Ge();const ge=H(l);ge&&(ge[r]=T[r])},{flush:"sync"});async function _e(){return Ge(),v.$rewardEarly&&(lt(),await ri()),await ri(),new Promise(ge=>{if(!Ve.value)return ge(!q.value);const qe=Vt(Ve,()=>{ge(!q.value),qe()})})}function fe(ge){return(i.value||{})[ge]}function bt(){Re(l)?l.value=T:Object.keys(T).length===0?Object.keys(l).forEach(ge=>{delete l[ge]}):Object.assign(l,T)}return rn(bn(bn(bn({},F),{},{$model:he,$dirty:W,$error:se,$errors:re,$invalid:q,$anyDirty:Q,$pending:Ve,$touch:Ge,$reset:ft,$path:u||G1,$silentErrors:cn,$validate:_e,$commit:lt},i&&{$getResultsForChild:fe,$clearExternalResults:bt,$validationGroups:G}),N))}class X1{constructor(){this.storage=new Map}set(e,n,r){this.storage.set(e,{rules:n,result:r})}checkRulesValidity(e,n,r){const s=Object.keys(r),i=Object.keys(n);return i.length!==s.length||!i.every(a=>s.includes(a))?!1:i.every(a=>n[a].$params?Object.keys(n[a].$params).every(c=>H(r[a].$params[c])===H(n[a].$params[c])):!0)}get(e,n){const r=this.storage.get(e);if(!r)return;const{rules:s,result:i}=r,o=this.checkRulesValidity(e,n,s),a=i.$unwatch?i.$unwatch:()=>({});return o?i:{$dirty:i.$dirty,$partial:!0,$unwatch:a}}}const So={COLLECT_ALL:!0,COLLECT_NONE:!1},cp=Symbol("vuelidate#injectChildResults"),lp=Symbol("vuelidate#removeChildResults");function Z1(t){let{$scope:e,instance:n}=t;const r={},s=we([]),i=oe(()=>s.value.reduce((u,h)=>(u[h]=H(r[h]),u),{}));function o(u,h){let{$registerAs:d,$scope:f,$stopPropagation:m}=h;m||e===So.COLLECT_NONE||f===So.COLLECT_NONE||e!==So.COLLECT_ALL&&e!==f||(r[d]=u,s.value.push(d))}n.__vuelidateInjectInstances=[].concat(n.__vuelidateInjectInstances||[],o);function a(u){s.value=s.value.filter(h=>h!==u),delete r[u]}n.__vuelidateRemoveInstances=[].concat(n.__vuelidateRemoveInstances||[],a);const c=_t(cp,[]);lr(cp,n.__vuelidateInjectInstances);const l=_t(lp,[]);return lr(lp,n.__vuelidateRemoveInstances),{childResults:i,sendValidationResultsToParent:c,removeValidationResultsFromParent:l}}function vv(t){return new Proxy(t,{get(e,n){return typeof e[n]=="object"?vv(e[n]):oe(()=>e[n])}})}let up=0;function eO(t,e){var n;let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};arguments.length===1&&(r=t,t=void 0,e=void 0);let{$registerAs:s,$scope:i=So.COLLECT_ALL,$stopPropagation:o,$externalResults:a,currentVueInstance:c}=r;const l=c||((n=vI())===null||n===void 0?void 0:n.proxy),u=l?l.$options:{};s||(up+=1,s=`_vuelidate_${up}`);const h=we({}),d=new X1,{childResults:f,sendValidationResultsToParent:m,removeValidationResultsFromParent:v}=l?Z1({$scope:i,instance:l}):{childResults:we({})};if(!t&&u.validations){const y=u.validations;e=we({}),ru(()=>{e.value=l,Vt(()=>ra(y)?y.call(e.value,new vv(e.value)):y,T=>{h.value=ql({validations:T,state:e,childResults:f,resultsCache:d,globalConfig:r,instance:l,externalResults:a||l.vuelidateExternalResults})},{immediate:!0})}),r=u.validationsConfig||r}else{const y=Re(t)||q1(t)?t:rn(t||{});Vt(y,T=>{h.value=ql({validations:T,state:e,childResults:f,resultsCache:d,globalConfig:r,instance:l??{},externalResults:a})},{immediate:!0})}return l&&(m.forEach(y=>y(h,{$registerAs:s,$scope:i,$stopPropagation:o})),Jp(()=>v.forEach(y=>y(s)))),oe(()=>bn(bn({},H(h.value)),f.value))}const oc=t=>{if(t=H(t),Array.isArray(t))return!!t.length;if(t==null)return!1;if(t===!1)return!0;if(t instanceof Date)return!isNaN(t.getTime());if(typeof t=="object"){for(let e in t)return!0;return!1}return!!String(t).length},Ev=t=>(t=H(t),Array.isArray(t)?t.length:typeof t=="object"?Object.keys(t).length:String(t).length);function Or(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return r=>(r=H(r),!oc(r)||e.every(s=>(s.lastIndex=0,s.test(r))))}Or(/^[a-zA-Z]*$/);Or(/^[a-zA-Z0-9]*$/);Or(/^\d*(\.\d+)?$/);const tO=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;var nO=Or(tO),rO={$validator:nO,$message:"Value is not a valid email address",$params:{type:"email"}};function sO(t){return e=>!oc(e)||Ev(e)<=H(t)}function iO(t){return{$validator:sO(t),$message:e=>{let{$params:n}=e;return`The maximum length allowed is ${n.max}`},$params:{max:t,type:"maxLength"}}}function oO(t){return e=>!oc(e)||Ev(e)>=H(t)}function aO(t){return{$validator:oO(t),$message:e=>{let{$params:n}=e;return`This field should be at least ${n.min} characters long`},$params:{min:t,type:"minLength"}}}function cO(t){return typeof t=="string"&&(t=t.trim()),oc(t)}var hp={$validator:cO,$message:"Value is required",$params:{type:"required"}};const lO=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;Or(lO);Or(/(^[0-9]*$)|(^-[0-9]+$)/);Or(/^[-]?\d*(\.\d+)?$/);const uO=t=>(PE("data-v-d3497aae"),t=t(),SE(),t),hO={class:"icon"},dO={class:"text"},fO=uO(()=>ye("div",{class:"indicator"},null,-1)),pO=bi({__name:"IndicatorNavi",setup(t){const{activeLink:e,routes:n,updateActiveLink:r,colors:s}=_t("indicatorNavi");return(i,o)=>{const a=eg("ion-icon");return Wt(),Zn("section",{class:"nav show-nav",style:Kr(`--widthSection:${70*H(n).length+50}px;`)},[ye("nav",{style:Kr(`--widthNavTag:${70*H(n).length}px;`)},[(Wt(!0),Zn(Ht,null,WE(H(n),(c,l)=>(Wt(),ou(H(xy),{key:c.name,to:c.to,style:Kr(`${H(s)[l]}`),class:hn([H(e)===c.name&&"active"]),onClick:()=>H(r)(c.name)},{default:Kp(()=>[ye("span",hO,[Fe(a,{name:`${c.ionIconClass}`},null,8,["name"])]),ye("span",dO,qt(c.name),1)]),_:2},1032,["to","style","class","onClick"]))),128)),fO],4)],4)}}});const Iv=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},gO=Iv(pO,[["__scopeId","data-v-d3497aae"]]),mO={class:"header"},_O={class:"login"},yO={action:""},vO={key:0,class:"input-box"},EO={for:"login-input"},IO=["placeholder"],wO={class:"icon"},TO={class:"input-box"},AO={for:"email-input"},RO=["placeholder"],PO={class:"icon"},SO={key:1,class:"form-error"},bO={class:"input-box"},CO={for:"password-input"},kO=["placeholder"],OO={class:"icon"},DO={key:2,class:"form-error"},NO={class:"input-box"},VO=["value"],xO={class:"input-box submit-google"},MO=["value"],LO={class:"icon"},FO={key:3,class:"form-error form-error-submit"},$O=bi({__name:"LoginPanel",setup(t){const e=we("Vue Project"),n=we("Sign In"),r=we("Register"),s=we("Sign In Google"),i=we("Sign Up Google"),o=we("User Name"),a=we("Password"),c=we("E-mail"),l=we("Keep me log in"),u=we(n.value),h=we([{name:`${n.value}`,ionIconClass:"log-in-outline",to:""},{name:`${r.value}`,ionIconClass:"document-text-outline",to:""}]),d=G=>u.value=G,f=we(["--clr:#2196f3;","--clr:#008a1b;","--clr:#dc1dff;","--clr:#f3218b;","--clr:#d56f1d;"]);lr("indicatorNavi",{activeLink:u,routes:h,updateActiveLink:d,colors:f});const m=we(""),v=PC(),y=rn({displayName:"",password:"",email:"",keepLogIn:!1}),T=rn({password:{required:hp,minLength:aO(6),maxLength:iO(20)},email:{required:hp,email:rO},keepLogIn:{}}),C=eO(T,y);ru(async()=>{await new Promise((W,re)=>{const q=sv(Po(),Q=>{q(),W(Q)},re)})&&v.push("/feed")}),Vt([()=>y.email,()=>y.password],([G,W])=>{y.email=G.replace(" ",""),m.value=""});const F=async G=>{G.preventDefault();const W=await C.value.$validate(),re=Po();W&&u.value===r.value?Rk(re,y.email,y.password).then(q=>{y.displayName!==""&&bk(re.currentUser,{displayName:y.displayName}),v.push("/feed")}).catch(q=>{switch(console.error(q.message),q.code){case"auth/email-already-in-use":m.value="E-mail already in use";break;default:m.value="Something went wrong";break}}):W&&u.value===n.value&&Pk(re,y.email,y.password).then(q=>{v.push("/feed")}).catch(q=>{switch(console.error(q.message),q.code){case"auth/invalid-email":m.value="Invalid e-mail";break;case"auth/user-not-found":m.value="User not found";break;case"auth/wrong-password":m.value="Incorrect password";break;default:m.value="E-mail or password was Incorrect";break}})},N=G=>{G.preventDefault();const W=new dn;Jk(Po(),W).then(re=>v.push("/feed")).catch(re=>{console.error(re.message)})};return(G,W)=>{var q,Q;const re=eg("ion-icon");return Wt(),Zn("main",null,[ye("header",mO,[ye("h1",null,qt(e.value),1)]),ye("section",_O,[ye("form",yO,[ye("h2",null,qt(u.value),1),u.value===`${r.value}`?(Wt(),Zn("span",vO,[ye("label",EO,qt(o.value),1),to(ye("input",{type:"text",class:hn("customInput"),id:"login-input",placeholder:`${o.value}...`,maxlength:"20","onUpdate:modelValue":W[0]||(W[0]=se=>y.displayName=se)},null,8,IO),[[dc,y.displayName]]),ye("span",wO,[Fe(re,{name:"person-circle-outline"})])])):no("",!0),ye("span",TO,[ye("label",AO,qt(c.value),1),to(ye("input",{type:"text",class:hn("customInput"),id:"email-input",placeholder:`${c.value}...`,"onUpdate:modelValue":W[1]||(W[1]=se=>y.email=se)},null,8,RO),[[dc,y.email]]),ye("span",PO,[Fe(re,{name:"mail-outline"})])]),H(C).email.$error?(Wt(),Zn("span",SO,qt(((q=H(C).email.$errors[0])==null?void 0:q.$message)||((Q=H(C).email.$errors[0])==null?void 0:Q.$response.$message)),1)):no("",!0),ye("span",bO,[ye("label",CO,qt(a.value),1),to(ye("input",{type:"password",class:hn("customInput"),id:"password-input",placeholder:`${a.value}...`,"onUpdate:modelValue":W[2]||(W[2]=se=>y.password=se)},null,8,kO),[[dc,y.password]]),ye("span",OO,[Fe(re,{name:"lock-closed-outline"})])]),H(C).password.$error?(Wt(),Zn("span",DO,qt(H(C).password.$errors[0].$message),1)):no("",!0),ye("label",null,[to(ye("input",{type:"checkbox","onUpdate:modelValue":W[3]||(W[3]=se=>y.keepLogIn=se)},null,512),[[KI,y.keepLogIn]]),hg(qt(l.value),1)]),ye("span",NO,[ye("input",{type:"submit",class:hn("customButton"),value:u.value,onClick:W[4]||(W[4]=se=>F(se))},null,8,VO)]),ye("span",xO,[ye("input",{type:"submit",class:hn("customButton"),value:u.value===`${n.value}`?s.value:i.value,onClick:N},null,8,MO),ye("span",LO,[Fe(re,{name:"logo-google"})])]),m.value?(Wt(),Zn("span",FO,qt(m.value),1)):no("",!0)])]),Fe(gO)])}}});const dp=Iv($O,[["__scopeId","data-v-2671a315"]]),UO=PP(Ab,"gameStatus"),jO=SP(UO,"Duel");let fp;const rD=iw("gameStore",{state:()=>({duel:{isStarted:!1,players:[]},gems:{isStarted:!1,players:[]},reflex:{isStarted:!1,players:[]}}),getters:{},actions:{async subFirebaseConnect(){fp=await KP(jO,t=>{if(t.exists()){const{isStarted:e,players:n}=t.data();this.duel.isStarted=e,this.duel.players=n}})},unSubFirebaseConnect(){fp()}}});const wv=AC({history:Bb("/vue-project/"),routes:[{path:"/",name:"home",component:dp},{path:"/:pathMatch(.*)*",name:"not-found",component:dp},{path:"/feed",name:"feed",component:()=>Fr(()=>import("./FeedPanel-003b3380.js"),["assets/FeedPanel-003b3380.js","assets/debounce-e49fa7a6.js"]),meta:{requiresAuth:!0}},{path:"/feed/reflex-game",name:"reflex",component:()=>Fr(()=>import("./FeedPanel-003b3380.js"),["assets/FeedPanel-003b3380.js","assets/debounce-e49fa7a6.js"]),meta:{requiresAuth:!0}},{path:"/feed/duel-game",name:"duel",component:()=>Fr(()=>import("./TheDuelGameBoard-f2a91649.js"),["assets/TheDuelGameBoard-f2a91649.js","assets/debounce-e49fa7a6.js","assets/TheDuelGameBoard-94fe9ee6.css"]),meta:{requiresAuth:!0}},{path:"/feed/gems-game",name:"gems",component:()=>Fr(()=>import("./FeedPanel-003b3380.js"),["assets/FeedPanel-003b3380.js","assets/debounce-e49fa7a6.js"]),meta:{requiresAuth:!0}},{path:"/feed/settings",name:"settings",component:()=>Fr(()=>import("./FeedPanel-003b3380.js"),["assets/FeedPanel-003b3380.js","assets/debounce-e49fa7a6.js"]),meta:{requiresAuth:!0}},{path:"/feed/logout",name:"logout",component:()=>Fr(()=>import("./FeedPanel-003b3380.js"),["assets/FeedPanel-003b3380.js","assets/debounce-e49fa7a6.js"]),meta:{requiresAuth:!0}}]});wv.beforeEach(async(t,e,n)=>{t.name==="home"||t.name==="not-found"?await sp()?n("/feed"):n():t.matched.some(r=>r.meta.requiresAuth)?await sp()?n():(alert("You don't have access!"),n("/")):n()});const Rh=YI(SC);Rh.use(ZI());Rh.use(wv);Rh.mount("#app");export{ou as A,Fe as B,QO as C,XO as D,JO as E,FE as F,Po as G,sv as H,Ht as I,tD as J,lr as K,sp as L,GO as M,gO as N,iw as O,KP as P,eD as Q,ZO as R,WE as S,oe as T,nD as U,hg as V,BO as W,Iv as _,ye as a,qt as b,Zn as c,bi as d,no as e,Kr as f,rD as g,SE as h,PC as i,_t as j,PP as k,Ab as l,SP as m,hn as n,Wt as o,PE as p,ru as q,we as r,qO as s,pE as t,H as u,WO as v,Vt as w,YO as x,Jp as y,eg as z};
