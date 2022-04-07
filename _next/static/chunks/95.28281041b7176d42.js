"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[95],{2095:function(t,e,s){s.r(e),s.d(e,{GiscusWidget:function(){return Et}});var i=Object.defineProperty,r=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,a=(t,e,s)=>e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;const c=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,d=Symbol(),u=new Map;class p{constructor(t,e){if(this._$cssResult$=!0,e!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=u.get(this.cssText);return c&&void 0===t&&(u.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const _=c?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new p("string"==typeof t?t:t+"",d))(e)})(t):t;var $;const v=window.trustedTypes,g=v?v.emptyScript:"",f=window.reactiveElementPolyfillSupport,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(i){s=null}}return s}},y=(t,e)=>e!==t&&(e==e||t==t),A={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:y};class S extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Eh(s,e);void 0!==i&&(this._$Eu.set(i,s),t.push(i))})),t}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||A}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(_(t))}else void 0!==t&&e.push(_(t));return e}static _$Eh(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return s=e,i=this.constructor.elementStyles,c?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((t=>{const e=document.createElement("style"),i=window.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=t.cssText,s.appendChild(e)})),e;var s,i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ES(t,e,s=A){var i,r;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const o=(null!==(r=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==r?r:m.toAttribute)(e,s.type);this._$Ei=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Ei=null}}_$AK(t,e){var s,i,r;const n=this.constructor,o=n._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=n.getPropertyOptions(o),l=t.converter,h=null!==(r=null!==(i=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof l?l:null)&&void 0!==r?r:m.fromAttribute;this._$Ei=o,this[o]=h(e,t.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||y)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}}var E;S.finalized=!0,S.elementProperties=new Map,S.elementStyles=[],S.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:S}),(null!==($=globalThis.reactiveElementVersions)&&void 0!==$?$:globalThis.reactiveElementVersions=[]).push("1.3.1");const b=globalThis.trustedTypes,w=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,C=`lit$${(Math.random()+"").slice(9)}$`,U="?"+C,O=`<${U}>`,P=document,I=(t="")=>P.createComment(t),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,x=/-->/g,T=/>/g,H=/>|[ \x09\n\x0c\r](?:([^\s"'>=/]+)([ \x09\n\x0c\r]*=[ \x09\n\x0c\r]*(?:[^ \x09\n\x0c\r"'`<>=]|("|')|))|$)/g,k=/'/g,G=/"/g,L=/^(?:script|style|textarea|title)$/i,z=(V=1,(t,...e)=>({_$litType$:V,strings:t,values:e})),j=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),B=new WeakMap,K=P.createTreeWalker(P,129,null,!1);var V;class W{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,l=this.parts,[h,a]=((t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":"",o=M;for(let h=0;h<s;h++){const e=t[h];let s,l,a=-1,c=0;for(;c<e.length&&(o.lastIndex=c,l=o.exec(e),null!==l);)c=o.lastIndex,o===M?"!--"===l[1]?o=x:void 0!==l[1]?o=T:void 0!==l[2]?(L.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=H):void 0!==l[3]&&(o=H):o===H?">"===l[0]?(o=null!=r?r:M,a=-1):void 0===l[1]?a=-2:(a=o.lastIndex-l[2].length,s=l[1],o=void 0===l[3]?H:'"'===l[3]?G:k):o===G||o===k?o=H:o===x||o===T?o=M:(o=H,r=void 0);const d=o===H&&t[h+1].startsWith("/>")?" ":"";n+=o===M?e+O:a>=0?(i.push(s),e.slice(0,a)+"$lit$"+e.slice(a)+C+d):e+C+(-2===a?(i.push(void 0),h):d)}const l=n+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==w?w.createHTML(l):l,i]})(t,e);if(this.el=W.createElement(h,s),K.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=K.nextNode())&&l.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(C)){const s=a[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(C),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?tt:Q})}else l.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(L.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=b?b.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],I()),K.nextNode(),l.push({type:2,index:++r});i.append(t[e],I())}}}else if(8===i.nodeType)if(i.data===U)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)l.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=P.createElement("template");return s.innerHTML=t,s}}function q(t,e,s=t,i){var r,n,o,l;if(e===j)return e;let h=void 0!==i?null===(r=s._$Cl)||void 0===r?void 0:r[i]:s._$Cu;const a=N(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,i)),void 0!==i?(null!==(o=(l=s)._$Cl)&&void 0!==o?o:l._$Cl=[])[i]=h:s._$Cu=h),void 0!==h&&(e=q(t,h._$AS(t,e.values),h,i)),e}class Y{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:P).importNode(s,!0);K.currentNode=r;let n=K.nextNode(),o=0,l=0,h=i[0];for(;void 0!==h;){if(o===h.index){let e;2===h.type?e=new J(n,n.nextSibling,this,t):1===h.type?e=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(e=new et(n,this,t)),this.v.push(e),h=i[++l]}o!==(null==h?void 0:h.index)&&(n=K.nextNode(),o++)}return r}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class J{constructor(t,e,s,i){var r;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),N(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==j&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>{var e;return R(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.S(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==D&&N(this._$AH)?this._$AA.nextSibling.data=t:this.k(P.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=W.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.m(s);else{const t=new Y(r,this),e=t.p(this.options);t.m(s),this.k(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new W(t)),e}S(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new J(this.A(I()),this.A(I()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Q{constructor(t,e,s,i,r){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=q(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const i=t;let o,l;for(t=r[0],o=0;o<r.length-1;o++)l=q(this,i[s+o],e,o),l===j&&(l=this._$AH[o]),n||(n=!N(l)||l!==this._$AH[o]),l===D?t=D:t!==D&&(t+=(null!=l?l:"")+r[o+1]),this._$AH[o]=l}n&&!i&&this.C(t)}C(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends Q{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===D?void 0:t}}const F=b?b.emptyScript:"";class X extends Q{constructor(){super(...arguments),this.type=4}C(t){t&&t!==D?this.element.setAttribute(this.name,F):this.element.removeAttribute(this.name)}}class tt extends Q{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=q(this,t,e,0))&&void 0!==s?s:D)===j)return;const i=this._$AH,r=t===D&&i!==D||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==D&&(i===D||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const st=window.litHtmlPolyfillSupport;var it,rt;null==st||st(W,J),(null!==(E=globalThis.litHtmlVersions)&&void 0!==E?E:globalThis.litHtmlVersions=[]).push("2.2.1");class nt extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,s)=>{var i,r;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new J(e.insertBefore(I(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return j}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:nt}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.2.0");const lt=(t,e)=>{return"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?(s=((t,e)=>{for(var s in e||(e={}))l.call(e,s)&&a(t,s,e[s]);if(o)for(var s of o(e))h.call(e,s)&&a(t,s,e[s]);return t})({},e),r(s,n({finisher(s){s.createProperty(e.key,t)}}))):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};var s};function ht(t){return(e,s)=>{return void 0!==s?(i=t,r=s,void e.constructor.createProperty(r,i)):lt(t,e);var i,r}}var at;null===(at=window.HTMLSlotElement)||void 0===at||at.prototype.assignedElements;const ct=2;const dt=(t,e)=>{var s,i;const r=t._$AN;if(void 0===r)return!1;for(const n of r)null===(i=(s=n)._$AO)||void 0===i||i.call(s,e,!1),dt(n,e);return!0},ut=t=>{let e,s;do{if(void 0===(e=t._$AM))break;s=e._$AN,s.delete(t),t=e}while(0===(null==s?void 0:s.size))},pt=t=>{for(let e;e=t._$AM;t=e){let s=e._$AN;if(void 0===s)e._$AN=s=new Set;else if(s.has(t))break;s.add(t),vt(e)}};function _t(t){void 0!==this._$AN?(ut(this),this._$AM=t,pt(this)):this._$AM=t}function $t(t,e=!1,s=0){const i=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(e)if(Array.isArray(i))for(let n=s;n<i.length;n++)dt(i[n],!1),ut(i[n]);else null!=i&&(dt(i,!1),ut(i));else dt(this,t)}const vt=t=>{var e,s,i,r;t.type==ct&&(null!==(e=(i=t)._$AP)&&void 0!==e||(i._$AP=$t),null!==(s=(r=t)._$AQ)&&void 0!==s||(r._$AQ=_t))};class gt{}const ft=new WeakMap,mt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),pt(this),this.isConnected=t._$AU}_$AO(t,e=!0){var s,i;t!==this.isConnected&&(this.isConnected=t,t?null===(s=this.reconnected)||void 0===s||s.call(this):null===(i=this.disconnected)||void 0===i||i.call(this)),e&&(dt(this,t),ut(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}{render(t){return D}update(t,[e]){var s;const i=e!==this.U;return i&&void 0!==this.U&&this.ot(void 0),(i||this.rt!==this.lt)&&(this.U=e,this.ht=null===(s=t.options)||void 0===s?void 0:s.host,this.ot(this.lt=t.element)),D}ot(t){"function"==typeof this.U?(void 0!==ft.get(this.U)&&this.U.call(this.ht,void 0),ft.set(this.U,t),void 0!==t&&this.U.call(this.ht,t)):this.U.value=t}get rt(){var t;return"function"==typeof this.U?ft.get(this.U):null===(t=this.U)||void 0===t?void 0:t.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});var yt=Object.defineProperty,At=Object.getOwnPropertyDescriptor,St=(t,e,s,i)=>{for(var r,n=i>1?void 0:i?At(e,s):e,o=t.length-1;o>=0;o--)(r=t[o])&&(n=(i?r(e,s,n):r(n))||n);return i&&n&&yt(e,s,n),n};let Et=class extends nt{constructor(){super(),this.GISCUS_SESSION_KEY="giscus-session",this.GISCUS_ORIGIN="https://giscus.app",this.ERROR_SUGGESTION="Please consider reporting this error at https://github.com/laymonage/giscus/issues/new.",this.__session="",this._iframeRef=new gt,this.messageEventHandler=this.handleMessageEvent.bind(this),this.reactionsEnabled="1",this.emitMetadata="0",this.inputPosition="bottom",this.theme="light",this.lang="en",this.loading="eager",this.setupSession(),window.addEventListener("message",this.messageEventHandler)}get iframeRef(){return this._iframeRef.value}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("message",this.messageEventHandler)}_formatError(t){return`[giscus] An error occurred. Error message: "${t}".`}setupSession(){const t=location.href,e=new URL(t),s=localStorage.getItem(this.GISCUS_SESSION_KEY),i=e.searchParams.get("giscus")||"";if(i)return localStorage.setItem(this.GISCUS_SESSION_KEY,JSON.stringify(i)),this.__session=i,e.searchParams.delete("giscus"),void history.replaceState(void 0,document.title,e.toString());if(s)try{this.__session=JSON.parse(s||"")||""}catch(r){this.__session="",localStorage.removeItem(this.GISCUS_SESSION_KEY),console.warn(`${this._formatError(null==r?void 0:r.message)} Session has been cleared.`)}}handleMessageEvent(t){if(t.origin!==this.GISCUS_ORIGIN)return;const{data:e}=t;if("object"!==typeof e||!e.giscus)return;if(this.iframeRef&&e.giscus.resizeHeight&&(this.iframeRef.style.height=`${e.giscus.resizeHeight}px`),!e.giscus.error)return;const s=e.giscus.error;if(s.includes("Bad credentials")||s.includes("Invalid state value")){if(null!==localStorage.getItem(this.GISCUS_SESSION_KEY))return localStorage.removeItem(this.GISCUS_SESSION_KEY),this.__session="",console.warn(`${this._formatError(s)} Session has been cleared.`),void this.update(new Map);console.error(`${this._formatError(s)} No session is stored initially. ${this.ERROR_SUGGESTION}`)}s.includes("Discussion not found")?console.warn(`[giscus] ${s}. A new discussion will be created if a comment/reaction is submitted.`):console.error(`${this._formatError(s)} ${this.ERROR_SUGGESTION}`)}sendMessage(t){var e,s;null==(s=null==(e=this.iframeRef)?void 0:e.contentWindow)||s.postMessage({giscus:t},this.GISCUS_ORIGIN)}updateConfig(){const t={setConfig:{repo:this.repo,repoId:this.repoId,category:this.category,categoryId:this.categoryId,term:this.getTerm(),number:+this.getNumber(),reactionsEnabled:"1"===this.reactionsEnabled,emitMetadata:"1"===this.emitMetadata,inputPosition:this.inputPosition,theme:this.theme,lang:this.lang}};this.sendMessage(t)}requestUpdate(t,e,s){this.hasUpdated?this.updateConfig():super.requestUpdate(t,e,s)}_getOgMetaContent(t){const e=document.querySelector(`meta[property='og:${t}'],meta[name='${t}']`);return e?e.content:""}getTerm(){switch(this.mapping){case"url":return origin;case"title":return document.title;case"og:title":return this._getOgMetaContent("title");case"specific":return this.term||"";case"number":return"";default:return location.pathname.length<2?"index":location.pathname.substring(1).replace(/\.\w+$/,"")}}getNumber(){return"number"===this.mapping&&this.term||""}getIframeSrc(){const t=new URL(location.href);t.searchParams.delete("giscus");const e=`${t}${this.id?"#"+this.id:""}`,s=this._getOgMetaContent("description"),i={origin:e,session:this.__session,repo:this.repo,repoId:this.repoId||"",category:this.category||"",categoryId:this.categoryId||"",term:this.getTerm(),number:this.getNumber(),reactionsEnabled:this.reactionsEnabled,emitMetadata:this.emitMetadata,inputPosition:this.inputPosition,theme:this.theme,description:s},r=this.lang?`/${this.lang}`:"",n=new URLSearchParams(i);return`${this.GISCUS_ORIGIN}${r}/widget?${n}`}render(){return z`
      <iframe
        scrolling="no"
        ${mt(this._iframeRef)}
        src=${this.getIframeSrc()}
        loading=${this.loading}
      ></iframe>
    `}};var bt;Et.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new p(s,d)})`
    :host,
    iframe {
      width: 100%;
      border: none;
      color-scheme: normal;
    }
  `,St([ht({reflect:!0})],Et.prototype,"repo",2),St([ht({reflect:!0})],Et.prototype,"repoId",2),St([ht({reflect:!0})],Et.prototype,"category",2),St([ht({reflect:!0})],Et.prototype,"categoryId",2),St([ht({reflect:!0})],Et.prototype,"mapping",2),St([ht({reflect:!0})],Et.prototype,"term",2),St([ht({reflect:!0})],Et.prototype,"reactionsEnabled",2),St([ht({reflect:!0})],Et.prototype,"emitMetadata",2),St([ht({reflect:!0})],Et.prototype,"inputPosition",2),St([ht({reflect:!0})],Et.prototype,"theme",2),St([ht({reflect:!0})],Et.prototype,"lang",2),St([ht({reflect:!0})],Et.prototype,"loading",2),Et=St([(bt="giscus-widget",t=>{return"function"==typeof t?(e=bt,s=t,window.customElements.define(e,s),s):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(bt,t);var e,s})],Et)}}]);