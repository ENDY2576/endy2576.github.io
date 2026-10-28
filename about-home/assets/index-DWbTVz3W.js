var du=Object.defineProperty;var fu=(i,t,e)=>t in i?du(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Gt=(i,t,e)=>fu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var Nl="1.3.26";function lh(i,t,e){return Math.max(i,Math.min(t,e))}function pu(i,t,e){return(1-e)*i+e*t}function mu(i,t,e,n){return pu(i,t,1-Math.exp(-e*n))}function gu(i,t){return(i%t+t)%t}var vu=class{constructor(){Gt(this,"isRunning",!1);Gt(this,"value",0);Gt(this,"from",0);Gt(this,"to",0);Gt(this,"currentTime",0);Gt(this,"lerp");Gt(this,"duration");Gt(this,"easing");Gt(this,"onUpdate")}advance(i){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=i;const n=lh(0,this.currentTime/this.duration,1);t=n>=1;const s=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=mu(this.value,this.to,this.lerp*60,i),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(i,t,{lerp:e,duration:n,easing:s,onStart:r,onUpdate:o}){this.from=this.value=i,this.to=t,this.lerp=e,this.duration=n,this.easing=s,this.currentTime=0,this.isRunning=!0,r==null||r(),this.onUpdate=o}};function _u(i,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,i.apply(this,n)},t)}}var xu=class{constructor(i,t,{autoResize:e=!0,debounce:n=250}={}){Gt(this,"width",0);Gt(this,"height",0);Gt(this,"scrollHeight",0);Gt(this,"scrollWidth",0);Gt(this,"debouncedResize");Gt(this,"wrapperResizeObserver");Gt(this,"contentResizeObserver");Gt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Gt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Gt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=i,this.content=t,e&&(this.debouncedResize=_u(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var i,t;(i=this.wrapperResizeObserver)==null||i.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},ch=class{constructor(){Gt(this,"events",{})}emit(i,...t){var n;const e=this.events[i]||[];for(let s=0,r=e.length;s<r;s++)(n=e[s])==null||n.call(e,...t)}on(i,t){return this.events[i]?this.events[i].push(t):this.events[i]=[t],()=>{var e;this.events[i]=(e=this.events[i])==null?void 0:e.filter(n=>t!==n)}}off(i,t){var e;this.events[i]=(e=this.events[i])==null?void 0:e.filter(n=>t!==n)}destroy(){this.events={}}};const yu=100/6,ti={passive:!1};function Ul(i,t){return i===1?yu:i===2?t:1}var Mu=class{constructor(i,t={wheelMultiplier:1,touchMultiplier:1}){Gt(this,"touchStart",{x:0,y:0});Gt(this,"lastDelta",{x:0,y:0});Gt(this,"window",{width:0,height:0});Gt(this,"emitter",new ch);Gt(this,"onTouchStart",i=>{const{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:i})});Gt(this,"onTouchMove",i=>{const{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i,n=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:s},this.emitter.emit("scroll",{deltaX:n,deltaY:s,event:i})});Gt(this,"onTouchEnd",i=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:i})});Gt(this,"onWheel",i=>{let{deltaX:t,deltaY:e,deltaMode:n}=i;const s=Ul(n,this.window.width),r=Ul(n,this.window.height);t*=s,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:i})});Gt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=i,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ti),this.element.addEventListener("touchstart",this.onTouchStart,ti),this.element.addEventListener("touchmove",this.onTouchMove,ti),this.element.addEventListener("touchend",this.onTouchEnd,ti)}on(i,t){return this.emitter.on(i,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,ti),this.element.removeEventListener("touchstart",this.onTouchStart,ti),this.element.removeEventListener("touchmove",this.onTouchMove,ti),this.element.removeEventListener("touchend",this.onTouchEnd,ti)}};const Fl=i=>Math.min(1,1.001-2**(-10*i));var Su=class{constructor({wrapper:i=window,content:t=document.documentElement,eventsTarget:e=i,smoothWheel:n=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:p="vertical",gestureOrientation:m=p==="horizontal"?"both":"vertical",touchMultiplier:g=1,wheelMultiplier:u=1,autoResize:_=!0,prevent:d,virtualScroll:f,overscroll:S=!0,autoRaf:M=!1,anchors:y=!1,autoToggle:B=!1,allowNestedScroll:D=!1,__experimental__naiveDimensions:P=!1,naiveDimensions:z=P,stopInertiaOnNavigate:et=!1,respectReducedMotion:v=!0}={}){Gt(this,"_isScrolling",!1);Gt(this,"_isStopped",!1);Gt(this,"_isLocked",!1);Gt(this,"_preventNextNativeScrollEvent",!1);Gt(this,"_resetVelocityTimeout",null);Gt(this,"_rafId",null);Gt(this,"_isDraggingSelection",!1);Gt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Gt(this,"isTouching");Gt(this,"isIos");Gt(this,"time",0);Gt(this,"userData",{});Gt(this,"lastVelocity",0);Gt(this,"velocity",0);Gt(this,"direction",0);Gt(this,"options");Gt(this,"targetScroll");Gt(this,"animatedScroll");Gt(this,"animate",new vu);Gt(this,"emitter",new ch);Gt(this,"dimensions");Gt(this,"virtualScroll");Gt(this,"onScrollEnd",i=>{i instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&i.stopPropagation()});Gt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Gt(this,"onTransitionEnd",i=>{var t;(t=i.propertyName)!=null&&t.includes("overflow")&&i.target===this.rootElement&&this.checkOverflow()});Gt(this,"onClick",i=>{const t=i.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){const n=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(n){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(n.hash);this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});Gt(this,"onPointerDown",i=>{i.button===1&&this.reset()});Gt(this,"onVirtualScroll",i=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(i)===!1)return;const{deltaX:t,deltaY:e,event:n}=i;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const s=n.type.includes("touch"),r=n.type.includes("wheel");if(s&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&s&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(u=>{var _,d,f,S,M;return u instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(u))||((_=u.hasAttribute)==null?void 0:_.call(u,"data-lenis-prevent"))||h==="vertical"&&((d=u.hasAttribute)==null?void 0:d.call(u,"data-lenis-prevent-vertical"))||h==="horizontal"&&((f=u.hasAttribute)==null?void 0:f.call(u,"data-lenis-prevent-horizontal"))||s&&((S=u.hasAttribute)==null?void 0:S.call(u,"data-lenis-prevent-touch"))||r&&((M=u.hasAttribute)==null?void 0:M.call(u,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(u,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let p=e;this.options.gestureOrientation==="both"?p=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(p=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const m=s&&this.options.syncTouch,g=s&&n.type==="touchend";g&&(p=Math.sign(p)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+p,{programmatic:!1,...m?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Gt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const i=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-i,this.direction=Math.sign(this.animatedScroll-i),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Gt(this,"raf",i=>{const t=i-(this.time||i);this.time=i,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Nl,window.lenis||(window.lenis={}),window.lenis.version=Nl,p==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!i||i===document.documentElement)&&(i=window),typeof a=="number"&&typeof l!="function"?l=Fl:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:i,content:t,eventsTarget:e,smoothWheel:n,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:m,orientation:p,touchMultiplier:g,wheelMultiplier:u,autoResize:_,prevent:d,virtualScroll:f,overscroll:S,autoRaf:M,anchors:y,autoToggle:B,allowNestedScroll:D,naiveDimensions:z,stopInertiaOnNavigate:et,respectReducedMotion:v},this.dimensions=new xu(i,t,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Mu(e,{touchMultiplier:g,wheelMultiplier:u}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(i,t){return this.emitter.on(i,t)}off(i,t){return this.emitter.off(i,t)}get overflow(){const i=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[i]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(i){this.isHorizontal?this.options.wrapper.scrollTo({left:i,behavior:"instant"}):this.options.wrapper.scrollTo({top:i,behavior:"instant"})}isTouchOnSelectionHandle(i){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=i.targetTouches[0]??i.changedTouches[0];if(!e)return!1;const n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;const s=n[0],r=n[n.length-1],o=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=o,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(i,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:o=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:p}={}){if(this.prefersReducedMotion&&(s?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let m=i,g=t;if(typeof m=="string"&&["top","left","start","#"].includes(m))m=0;else if(typeof m=="string"&&["bottom","right","end"].includes(m))m=this.limit;else{let u=null;if(typeof m=="string"?(u=m.startsWith("#")?document.getElementById(m.slice(1)):document.querySelector(m),u||(m==="#top"?m=0:console.warn("Lenis: Target not found",m))):m instanceof HTMLElement&&(m!=null&&m.nodeType)&&(u=m),u){if(this.options.wrapper!==window){const y=this.rootElement.getBoundingClientRect();g-=this.isHorizontal?y.left:y.top}const _=u.getBoundingClientRect(),d=getComputedStyle(u),f=this.isHorizontal?Number.parseFloat(d.scrollMarginLeft):Number.parseFloat(d.scrollMarginTop),S=getComputedStyle(this.rootElement),M=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);m=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(f)?0:f)-(Number.isNaN(M)?0:M)}}if(typeof m=="number"){if(m+=g,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const u=m-this.animatedScroll;u>this.limit/2?m-=this.limit:u<-this.limit/2&&(m+=this.limit)}}else m=lh(0,m,this.limit);if(m===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=p??{},e){this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=m),typeof o=="number"&&typeof a!="function"?a=Fl:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,m,{duration:o,easing:a,lerp:r,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(u,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=u-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=u,this.setScroll(this.scroll),s&&(this.targetScroll=u),_||this.emit(),_&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(i,{deltaX:t,deltaY:e}){const n=Date.now();i._lenis||(i._lenis={});const s=i._lenis;let r,o,a,l,c,h,p,m,g,u;if(n-(s.time??0)>2e3){s.time=Date.now();const D=window.getComputedStyle(i);if(s.computedStyle=D,r=["auto","overlay","scroll"].includes(D.overflowX),o=["auto","overlay","scroll"].includes(D.overflowY),c=["auto"].includes(D.overscrollBehaviorX),h=["auto"].includes(D.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=o,!(r||o))return!1;p=i.scrollWidth,m=i.scrollHeight,g=i.clientWidth,u=i.clientHeight,a=p>g,l=m>u,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=p,s.scrollHeight=m,s.clientWidth=g,s.clientHeight=u,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=h}else a=s.isScrollableX,l=s.isScrollableY,r=s.hasOverflowX,o=s.hasOverflowY,p=s.scrollWidth,m=s.scrollHeight,g=s.clientWidth,u=s.clientHeight,c=s.hasOverscrollBehaviorX,h=s.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;const _=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let d,f,S,M,y,B;if(_==="horizontal")d=Math.round(i.scrollLeft),f=p-g,S=t,M=r,y=a,B=c;else if(_==="vertical")d=Math.round(i.scrollTop),f=m-u,S=e,M=o,y=l,B=h;else return!1;return!B&&(d>=f||d<=0)?!0:(S>0?d<f:d>0)&&M&&y}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const i=this.options.wrapper;return this.isHorizontal?i.scrollX??i.scrollLeft:i.scrollY??i.scrollTop}get scroll(){return this.options.infinite?gu(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(i){this._isScrolling!==i&&(this._isScrolling=i,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(i){this._isStopped!==i&&(this._isStopped=i,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(i){this._isLocked!==i&&(this._isLocked=i,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let i="lenis";return this.options.autoToggle&&(i+=" lenis-autoToggle"),this.isStopped&&(i+=" lenis-stopped"),this.isLocked&&(i+=" lenis-locked"),this.isScrolling&&(i+=" lenis-scrolling"),this.isScrolling==="smooth"&&(i+=" lenis-smooth"),i}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(i=>{this.rootElement.classList.add(i)})}cleanUpClassName(){for(const i of Array.from(this.rootElement.classList))(i==="lenis"||i.startsWith("lenis-"))&&this.rootElement.classList.remove(i)}};let He,hs,pn,mn,Ds,fa="dark",cs=[],pa=0,bu=performance.now(),ma=0;const ci={x:-9999,y:-9999,active:!1},wu={dark:{bg0:"#070b18",bg1:"#0d1b3a",star:"rgba(180,210,255,",glow:"rgba(80,140,255,",link:"rgba(120,170,255,"},light:{bg0:"#eaf1fb",bg1:"#cfe0f7",star:"rgba(40,90,180,",glow:"rgba(60,120,230,",link:"rgba(50,110,220,"}};function Ol(){Ds=Math.min(window.devicePixelRatio||1,2),pn=window.innerWidth,mn=window.innerHeight,hs.width=pn*Ds,hs.height=mn*Ds,hs.style.width=pn+"px",hs.style.height=mn+"px",He.setTransform(Ds,0,0,Ds,0,0)}function Bl(){const i=Math.round(pn*mn/22e3);cs=Array.from({length:i},()=>({x:Math.random()*pn,y:Math.random()*mn,r:Math.random()*1.6+.4,vx0:(Math.random()-.5)*.12,vy0:(Math.random()-.5)*.12,pushx:0,pushy:0,a:Math.random()*.6+.2,ph:Math.random()*Math.PI*2}))}const To=150,Eu=.9,Ao=132;function hh(i){const t=(i-bu)/1e3,e=wu[fa],n=He.createLinearGradient(0,0,pn,mn);n.addColorStop(0,e.bg0),n.addColorStop(1,e.bg1),He.fillStyle=n,He.fillRect(0,0,pn,mn);for(const c of cs){if(ci.active){const p=c.x-ci.x,m=c.y-ci.y,g=p*p+m*m;if(g<To*To&&g>.01){const u=Math.sqrt(g),_=(1-u/To)*Eu;c.pushx+=p/u*_,c.pushy+=m/u*_}}c.x+=c.vx0+c.pushx,c.y+=c.vy0+c.pushy,c.pushx*=.86,c.pushy*=.86,c.x<-10&&(c.x=pn+10),c.x>pn+10&&(c.x=-10),c.y<-10&&(c.y=mn+10),c.y>mn+10&&(c.y=-10);const h=c.a*(.6+.4*Math.sin(t*1.5+c.ph));He.beginPath(),He.arc(c.x,c.y,c.r,0,Math.PI*2),He.fillStyle=e.star+h.toFixed(3)+")",He.fill()}for(let c=0;c<cs.length;c++){const h=cs[c];for(let p=c+1;p<cs.length;p++){const m=cs[p],g=h.x-m.x,u=h.y-m.y,_=g*g+u*u;if(_<Ao*Ao){const f=(1-Math.sqrt(_)/Ao)*.5;He.beginPath(),He.moveTo(h.x,h.y),He.lineTo(m.x,m.y),He.strokeStyle=e.link+f.toFixed(3)+")",He.lineWidth=1,He.stroke()}}}const s=pn/2,r=mn*(.42-ma*.12),o=Math.min(pn,mn)*(.32+.02*Math.sin(t*.4)),a=(fa==="dark"?.18:.22)+.12*Math.sin(ma*Math.PI),l=He.createRadialGradient(s,r,0,s,r,o);l.addColorStop(0,e.glow+a.toFixed(3)+")"),l.addColorStop(1,e.glow+"0)"),He.fillStyle=l,He.fillRect(0,0,pn,mn),pa=requestAnimationFrame(hh)}function uh(i){fa=i}function Tu(i){ma=Math.max(0,Math.min(1,i))}function Au(i){hs=i,He=hs.getContext("2d"),Ol(),Bl(),window.addEventListener("resize",()=>{Ol(),Bl()}),window.addEventListener("pointermove",t=>{ci.x=t.clientX,ci.y=t.clientY,ci.active=!0}),window.addEventListener("pointerout",()=>{ci.active=!1}),window.addEventListener("blur",()=>{ci.active=!1}),cancelAnimationFrame(pa),pa=requestAnimationFrame(hh)}let Zt,hi,Ii,ps,Is,dh="dark",qs=0,io=0,so=!1,Cu=performance.now(),Wi=0,zl=!0;const Ys=20;let di=[],qn=[];const Ru={dark:{line:"120,180,255",node:"123,224,255",burst:"123,200,255"},light:{line:"43,108,255",node:"0,144,212",burst:"43,108,255"}};function kl(){Is=Math.min(window.devicePixelRatio||1,2),Ii=window.innerWidth,ps=window.innerHeight,hi.width=Ii*Is,hi.height=ps*Is,hi.style.width=Ii+"px",hi.style.height=ps+"px",Zt.setTransform(Is,0,0,Is,0,0),so=Ii<560,hi.style.display=so?"none":"block",Lu()}function Pu(){return Ii<760?18:Math.max(36,Math.min(Ii*.05,64))}function Lu(){const i=Pu(),t=ps*.12,e=ps*.88;di=Array.from({length:Ys},(n,s)=>({x:i,y:t+(e-t)*s/(Ys-1),p:s/(Ys-1),glow:0}))}function Du(i){if(!i)return;const t=16;for(let e=0;e<t;e++){const n=Math.random()*Math.PI*2,s=.4+Math.random()*1.6;qn.push({x:i.x,y:i.y,vx:Math.cos(n)*s,vy:Math.sin(n)*s-.35,life:1,decay:.01+Math.random()*.02,r:1+Math.random()*2})}qn.length>260&&qn.splice(0,qn.length-260)}function Iu(){for(const i of qn)i.x+=i.vx,i.y+=i.vy,i.vy+=.012,i.vx*=.99,i.life-=i.decay;qn.length&&(qn=qn.filter(i=>i.life>0))}function ga(i){if(so){io=requestAnimationFrame(ga);return}const t=(i-Cu)/1e3,e=Ru[dh];Zt.clearRect(0,0,Ii,ps);const n=di[0].x,s=di[0].y,r=di[Ys-1].y,o=s+(r-s)*qs;Zt.lineWidth=2,Zt.strokeStyle=`rgba(${e.line},0.10)`,Zt.beginPath(),Zt.moveTo(n,s),Zt.lineTo(n,r),Zt.stroke();const a=Zt.createLinearGradient(n,s,n,o||s+1);a.addColorStop(0,`rgba(${e.line},0)`),a.addColorStop(1,`rgba(${e.line},0.9)`),Zt.save(),Zt.shadowBlur=14,Zt.shadowColor=`rgba(${e.line},0.8)`,Zt.strokeStyle=a,Zt.lineWidth=2.4,Zt.beginPath(),Zt.moveTo(n,s),Zt.lineTo(n,o),Zt.stroke(),Zt.restore();const l=.6+.4*Math.sin(t*4);Zt.save(),Zt.shadowBlur=22,Zt.shadowColor=`rgba(${e.node},1)`,Zt.fillStyle=`rgba(${e.node},${l})`,Zt.beginPath(),Zt.arc(n,o,4+2*l,0,Math.PI*2),Zt.fill(),Zt.restore();for(let c=0;c<Ys;c++){const h=di[c],p=qs>=h.p-5e-4;let m=p?.5:.16;Math.abs(qs-h.p)<.014&&(m=1),h.glow+=(m-h.glow)*.12;const g=p?.5*Math.sin(t*2+c):0,u=Math.max(1.5,3.2+h.glow*4+g);Zt.save(),Zt.shadowBlur=8+h.glow*18,Zt.shadowColor=`rgba(${e.node},${.5+.5*h.glow})`,Zt.fillStyle=`rgba(${e.node},${.25+h.glow*.75})`,Zt.beginPath(),Zt.arc(h.x,h.y,u,0,Math.PI*2),Zt.fill(),Zt.restore()}Iu();for(const c of qn)Zt.save(),Zt.globalAlpha=Math.max(0,c.life),Zt.shadowBlur=8,Zt.shadowColor=`rgba(${e.burst},${c.life})`,Zt.fillStyle=`rgba(${e.burst},1)`,Zt.beginPath(),Zt.arc(c.x,c.y,c.r,0,Math.PI*2),Zt.fill(),Zt.restore();io=requestAnimationFrame(ga)}function fh(i){dh=i}function Nu(i){if(qs=Math.max(0,Math.min(1,i)),so||di.length===0)return;const t=di.filter(e=>qs>=e.p-5e-4).length;if(zl){Wi=t,zl=!1;return}if(t>Wi){for(let e=Wi;e<t;e++)Du(di[e]);Wi=t}else t<Wi&&(Wi=t)}function Uu(i){hi=i,hi&&(Zt=hi.getContext("2d"),kl(),window.addEventListener("resize",kl),cancelAnimationFrame(io),io=requestAnimationFrame(ga))}let Rn={x:0,y:0},ai={x:0,y:0},li={x:0,y:0},Oi,Bi,sr=!1,ph=!1,wn=null;const va=".cta-links a, .theme-toggle, .dot";function Fu(){typeof window>"u"||window.matchMedia("(pointer:fine)").matches&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches||window.innerWidth<760||(sr=!0,Bi=document.createElement("div"),Bi.className="cur-dot",Oi=document.createElement("div"),Oi.className="cur-ring",document.body.append(Oi,Bi),document.body.classList.add("has-custom-cursor"),Rn.x=ai.x=li.x=window.innerWidth/2,Rn.y=ai.y=li.y=window.innerHeight/2,window.addEventListener("pointermove",Ou),document.addEventListener("pointerover",Bu),document.addEventListener("pointerout",zu),window.addEventListener("blur",()=>_a(!1)),document.addEventListener("mouseleave",()=>_a(!1)),mh()))}function _a(i){if(!sr)return;ph=i;const t=i?"1":"0";Bi&&(Bi.style.opacity=t),Oi&&(Oi.style.opacity=t)}function Ou(i){Rn.x=i.clientX,Rn.y=i.clientY,ph||_a(!0);const t=i.target&&i.target.closest?i.target.closest(".screen"):null;let e="dot";if(t){const n=t.getAttribute("data-screen");n==="9"?e="cross":n==="1"&&(e="ring")}wn&&(e="hover"),document.body.dataset.cur!==e&&(document.body.dataset.cur=e)}function Bu(i){if(!sr)return;const t=i.target&&i.target.closest?i.target.closest(va):null;t&&t!==wn&&(wn&&(wn.style.transform=""),wn=t)}function zu(i){if(!sr)return;const t=i.target&&i.target.closest?i.target.closest(va):null;if(!t)return;const e=i.relatedTarget;e&&e.closest&&e.closest(va)===t||t===wn&&(t.style.transform="",wn=null)}function mh(){if(sr){if(ai.x+=(Rn.x-ai.x)*.35,ai.y+=(Rn.y-ai.y)*.35,li.x+=(Rn.x-li.x)*.16,li.y+=(Rn.y-li.y)*.16,wn&&wn.isConnected){const i=wn.getBoundingClientRect(),t=i.left+i.width/2,e=i.top+i.height/2,n=(Rn.x-t)*.28,s=(Rn.y-e)*.28;wn.style.transform=`translate(${n.toFixed(1)}px, ${s.toFixed(1)}px)`}Bi&&(Bi.style.transform=`translate3d(${ai.x.toFixed(1)}px, ${ai.y.toFixed(1)}px, 0) translate(-50%, -50%)`),Oi&&(Oi.style.transform=`translate3d(${li.x.toFixed(1)}px, ${li.y.toFixed(1)}px, 0) translate(-50%, -50%)`),requestAnimationFrame(mh)}}function ku(){const i=document.getElementById("blinds");if(!i)return{play(){}};const t=14,e=[];for(let s=0;s<t;s++){const r=document.createElement("span");r.style.width=100/t+"%",r.style.left=100/t*s+"%",i.appendChild(r),e.push(r)}function n(s){return new Promise(r=>{e.forEach(a=>a.style.transformOrigin="top");const o=e.map((a,l)=>a.animate([{transform:"scaleY(0)"},{transform:"scaleY(1)"}],{duration:360,delay:l*20,easing:"cubic-bezier(0.7,0,0.3,1)",fill:"forwards"}));Promise.all(o.map(a=>a.finished)).then(()=>{typeof s=="function"&&s(),e.forEach(l=>l.style.transformOrigin="bottom");const a=e.map((l,c)=>l.animate([{transform:"scaleY(1)"},{transform:"scaleY(0)"}],{duration:420,delay:(t-1-c)*18,easing:"cubic-bezier(0.7,0,0.3,1)",fill:"forwards"}));Promise.all(a.map(l=>l.finished)).then(()=>{e.forEach(l=>l.style.transform="scaleY(0)"),r()})})})}return{play:n}}const Hl="·:*○●★☆→←↑↓/\\|=+<>ABCDEF0123456789░▒▓".split("");function Hu(){const i=Array.from(document.querySelectorAll("[data-ascii]"));function t(e){const n=e.getAttribute("data-ascii")||"",s=24;let r=0;cancelAnimationFrame(e._raf||0);function o(){const a=r/s;let l="";for(let c=0;c<n.length;c++)c/n.length<a?l+=n[c]:l+=Hl[Math.floor(Math.random()*Hl.length)];e.textContent=l,r++,r<=s?e._raf=requestAnimationFrame(o):e.textContent=n}o()}return{run:t,nodes:i,runIn(e){e.querySelectorAll("[data-ascii]").forEach(t)}}}function Gu(){const i=Array.from(document.querySelectorAll("[data-parallax]"));function t(){const e=window.innerHeight;for(const n of i){const s=n.getBoundingClientRect(),o=(s.top+s.height/2-e/2)/e,a=parseFloat(n.dataset.parallax)||0;n.style.translate=`0 ${(o*a*-46).toFixed(2)}px`}}return{update:t}}function Vu(){const i=document.querySelector(".hero-inner");if(!i)return;let t=0,e=0,n=0,s=0;window.addEventListener("pointermove",o=>{const a=o.clientX/window.innerWidth-.5,l=o.clientY/window.innerHeight-.5;t=a*22,e=l*16});function r(){n+=(t-n)*.08,s+=(e-s)*.08,i.style.translate=`${n.toFixed(2)}px ${s.toFixed(2)}px`,requestAnimationFrame(r)}r()}function Wu(i){var c;const t=document.querySelector(".hero-name"),e=document.getElementById("egg");if(!t||!e)return;const n=e.querySelector(".egg-dl"),s=(i==null?void 0:i.secret)||{};if(n){const h=[["真名",s.realName||"（待补充）"],["所在地",s.city||"中国 · 宁德市"],["生年",s.born||"2004"],["邮箱",s.email||"站内私信可见"],["微信",s.wechat||"（待补充）"]];n.innerHTML=h.map(([p,m])=>`<div class="egg-row"><dt>${p}</dt><dd>${m}</dd></div>`).join("")}let r=0,o=0;t.addEventListener("click",()=>{const h=Date.now();h-o>450&&(r=0),r++,o=h,r>=3&&(l(),r=0)});const a=()=>{e.classList.remove("show"),document.body.style.overflow="",document.body.style.paddingRight=""},l=()=>{e.classList.add("show");const h=window.innerWidth-document.documentElement.clientWidth;document.body.style.overflow="hidden",h>0&&(document.body.style.paddingRight=h+"px")};(c=e.querySelector(".egg-close"))==null||c.addEventListener("click",a),e.addEventListener("click",h=>{h.target===e&&a()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&a()}),e._endyOpen=l}const Xu=[{name:"Ｄｒ．ＳＴＯＮＥ 石纪元 (第四季)",href:"https://www.bilibili.com/bangumi/media/md24449643/",cover:"./img/comic/24449643.webp",score:"9.9",status:"在看",area:"日本",type:"番剧"},{name:"葬送的芙莉莲",href:"https://www.bilibili.com/bangumi/media/md21087073/",cover:"./img/comic/21087073.webp",score:"9.9",status:"在看",area:"日本",type:"番剧"},{name:"中国奇谭",href:"https://www.bilibili.com/bangumi/media/md28235401/",cover:"./img/comic/28235401.webp",score:"9.9",status:"在看",area:"中国大陆",type:"国创"},{name:"ReLIFE",href:"https://www.bilibili.com/bangumi/media/md28229193/",cover:"./img/comic/28229193.webp",score:"9.9",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元 (第三季)",href:"https://www.bilibili.com/bangumi/media/md20140807/",cover:"./img/comic/20140807.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"碧蓝之海 第二季",href:"https://www.bilibili.com/bangumi/media/md26714035/",cover:"./img/comic/26714035.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"灵笼 第二季",href:"https://www.bilibili.com/bangumi/media/md21123554/",cover:"./img/comic/21123554.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"测不准的阿波连同学 第二季",href:"https://www.bilibili.com/bangumi/media/md25530455/",cover:"./img/comic/25530455.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"风灵玉秀",href:"https://www.bilibili.com/bangumi/media/md6038/",cover:"./img/comic/6038.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"命运-冠位指定 -神圣圆桌领域卡美洛- 后篇 圣骑士银之臂",href:"https://www.bilibili.com/bangumi/media/md20145263/",cover:"./img/comic/20145263.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"奇幻世界舅舅",href:"https://www.bilibili.com/bangumi/media/md28338491/",cover:"./img/comic/28338491.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"JOJO的奇妙冒险 石之海",href:"https://www.bilibili.com/bangumi/media/md28235123/",cover:"./img/comic/28235123.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元 特别篇：龙水",href:"https://www.bilibili.com/bangumi/media/md28338468/",cover:"./img/comic/28338468.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"时光代理人",href:"https://www.bilibili.com/bangumi/media/md28230742/",cover:"./img/comic/28230742.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"犬夜叉剧场版 穿越时空的思念",href:"https://www.bilibili.com/bangumi/media/md28339205/",cover:"./img/comic/28339205.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"鬼灭之刃 无限列车篇",href:"https://www.bilibili.com/bangumi/media/md28235136/",cover:"./img/comic/28235136.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"命运-冠位嘉年华",href:"https://www.bilibili.com/bangumi/media/md28234639/",cover:"./img/comic/28234639.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"伍六七之玄武国篇",href:"https://www.bilibili.com/bangumi/media/md28232253/",cover:"./img/comic/28232253.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"Re：从零开始的异世界生活 第二季 后半",href:"https://www.bilibili.com/bangumi/media/md28232073/",cover:"./img/comic/28232073.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"岸边露伴 一动也不动",href:"https://www.bilibili.com/bangumi/media/md28233715/",cover:"./img/comic/28233715.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"凡人修仙传",href:"https://www.bilibili.com/bangumi/media/md28223043/",cover:"./img/comic/28223043.webp",score:"9.7",status:"在看",area:"中国大陆",type:"国创"},{name:"间谍过家家 第二季",href:"https://www.bilibili.com/bangumi/media/md21086686/",cover:"./img/comic/21086686.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"黑执事 绿之魔女篇",href:"https://www.bilibili.com/bangumi/media/md25435993/",cover:"./img/comic/25435993.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"克雷瓦提斯-魔兽之王与婴儿与尸之勇者-",href:"https://www.bilibili.com/bangumi/media/md26638078/",cover:"./img/comic/26638078.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"我独自升级 第二季 -起于暗影-",href:"https://www.bilibili.com/bangumi/media/md24474625/",cover:"./img/comic/24474625.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"鬼灭之刃 柱训练篇",href:"https://www.bilibili.com/bangumi/media/md21226899/",cover:"./img/comic/21226899.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"天使的小生意气",href:"https://www.bilibili.com/bangumi/media/md2042/",cover:"./img/comic/2042.png",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"间谍过家家",href:"https://www.bilibili.com/bangumi/media/md28237119/",cover:"./img/comic/28237119.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"绝顶",href:"https://www.bilibili.com/bangumi/media/md28339263/",cover:"./img/comic/28339263.webp",score:"9.7",status:"在看",area:"中国大陆",type:"国创"},{name:"只有我不存在的城市",href:"https://www.bilibili.com/bangumi/media/md28228814/",cover:"./img/comic/28228814.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元  (第二季)",href:"https://www.bilibili.com/bangumi/media/md28231817/",cover:"./img/comic/28231817.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元",href:"https://www.bilibili.com/bangumi/media/md28221387/",cover:"./img/comic/28221387.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"测不准的阿波连同学",href:"https://www.bilibili.com/bangumi/media/md28234872/",cover:"./img/comic/28234872.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"鬼灭之刃 游郭篇",href:"https://www.bilibili.com/bangumi/media/md28235125/",cover:"./img/comic/28235125.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"与变成了异世界美少女的好友一起冒险",href:"https://www.bilibili.com/bangumi/media/md28236221/",cover:"./img/comic/28236221.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"天官赐福 日语版",href:"https://www.bilibili.com/bangumi/media/md28234618/",cover:"./img/comic/28234618.webp",score:"9.7",status:"在看",area:"中国大陆",type:"国创"}],qu=[{name:"江上清风游",artist:"变奏的梦想",id:"003Mb4Eh0X2cN8",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=003Mb4Eh0X2cN8",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=002NgwPy4cyuFI",lrc:""},{name:"YOSEMITE (心平能愈三千疾)",artist:"Knorr",id:"002Z6oqu4LaUWh",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=002Z6oqu4LaUWh",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=000Xbv0B1DH5fP",lrc:""},{name:"夜、萤火虫和你",artist:"AniFace",id:"0021VYHj0M9W8V",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=0021VYHj0M9W8V",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=0007G14R3tMDKG",lrc:""},{name:"明镜菩提",artist:"正版原声",id:"0003kyCF1bXRSH",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=0003kyCF1bXRSH",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=000SyXul49scHZ",lrc:""},{name:"问佛",artist:"纯音乐",id:"002iZSlU4VaRR7",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=002iZSlU4VaRR7",cover:"/img/default_cover.webp",lrc:""},{name:"理想境",artist:"郯隗",id:"000JCy8R0ET4k3",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=000JCy8R0ET4k3",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=000gkCcI2f7sq8",lrc:""},{name:"水墨兰亭",artist:"李志辉",id:"002pDbVN3aopU9",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=002pDbVN3aopU9",cover:"/img/default_cover.webp",lrc:""}],Yu="wxp://f2f0QQ9lidKpnid-SbZUE5L4Gm5T22ziZT4q2GGU357J5io",$u=49,Ku="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111110000001100000101000110001001111111000000001000001000111100011000000000010100100000100000000101110101001010010001111000010010010111010000000010111010110010100011000110001011101011101000000001011101001110010011000011111111100101110100000000100000100100000111001110101000001010000010000000011111110101010101010101010101010101111111000000000000000000011111001001110100101010000000000000000000110110110000010001001111111110000011000000000000101001100111001010101101010001010011111000000001011101100100000100000101001101010011100000000000001100000111101001000110100011110100110100000000010000011111110110011100001000101101100001000000000011010000110111111001111100010000011010000000000001000101100111001001001100101111000010010000000011000001100100001001000011101010110101101000000001001011000011000100101011001110111010010000000000111001010011000100101101010110011001110000000000011111011010100010010001110110001110100001000000001100110000000001000110001010011011000011000000000010110111000110100110110110100001011011100000000010001000011000000011011001011010000011110000000000100011000110010001110110001111001001110000000000110001000111111010011010011001101000100110000000001011010001011110100110010010100011010001000000001101100110001111010100000001010011111100000000000101000110111101110000101001101110101110010000000010000000000110111110011011101011000111110000000000100001010000100111001101011010011010100000000000110111001010110010100100010001011100101100000000011001111100001011001000100101101000110011000000001111000110011000100100110101101101101010000000000111000110101100001010011110001111111101000000000000000000100001111100010000010001100011000000000001111111011101100011110100011011110101110000000000100000100001000000010001010001011000100010000000010111010101011010111100100111111111110000000000001011101011111011100100100010100101010111100000000101110100001000001100101011100110100101110000000010000010011100001001010000000000011010101000000001111111001001101101010101001110011011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",Zu={payload:Yu,n:$u,bits:Ku},Ju="https://qr.alipay.com/fkx15483w2iwyhvwoyzwa99",ju=49,Qu="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111110011101110100100100001110001111111000000001000001000011010010110101000101100100000100000000101110101101111010111101100110001010111010000000010111010101101011111110000000010101011101000000001011101000111101111000101110010100101110100000000100000100111010011001101110011100010000010000000011111110101010101010101010101010101111111000000000000000000011010001001011100100000000000000000000000110110100100111100010101111011000011000000000010111100010000110111100010010101010110001000000001101101111010101111111110011001001000011000000000101000000100100100100010001001011110110110000000001001010000100010100110101100000111100010000000000001110011000101111111001000010101011111100000000001010110111110010010111111101000111000010000000010100000100011011010010110101001010011110000000000111001010011101110110100101000101000101000000000010101000000110010000100000100011100110000000000011110011111101101010010011010001100110001000000000000110000100001011100110101111001101110000000000011100100001100011100101000100010010101110000000011100100000001000110100011111011000101000000000001000101001100110011101011001101001110000000000000100100000101110001111011011001111110011110000000010110111110010010010111100011010101001100000000001001000110110000001001011101111010111011100000000010011111010000000100111100100111001110110000000000001101001001100101011101101011000001111000000000001111010110011100110110101001100110101100000000111000000010111111011101100000000010101100000000011100010101011100100110010001111010100111000000001111110001101101110001001101100110110110000000000110010110011110001110010101001011111111100000000000000000110001000001101101110001100010110000000001111111010111000101101011011011110101000000000000100000100011110110001110101111011000110110000000010111010100001001111100110000111111111010000000001011101010011101101010100001010110010110100000000101110100010010011011100011101011101100110000000010000010000011100000000010101010010010101000000001111111000000011110111100111000010001110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",td={payload:Ju,n:ju,bits:Qu},ed="https://miku-chat-jggayawxnr.cn-shanghai.fcapp.run/api/la-stats";function On(i){return i==null||Number.isNaN(i)?"0":Math.max(0,Math.round(Number(i))).toLocaleString("zh-CN")}const Le={name:"彖渊子",sign:"彖辞破暗，渊澄万象",desc:"是一名 供应链管理师、独立开发者、博主",avatar:"./img/selfhosted/pZRXSc6.jpg",skillsLeft:["🤖️ 数码科技爱好者","🔍 分享与热心帮助","🏠 智能家居小能手","🔨 设计开发一条龙"],skillsRight:["专修交互与设计 🤝","脚踏实地行动派 🏃","团队小组发动机 🧱","壮汉人狠话不多 💢"],careers:[{desc:"EDU，物流管理专业",color:"#357ef5"},{desc:"事业立足",color:"#357ef5"},{desc:"为人类发展做出贡献",color:"#357ef5"}],selfInfo:{born:"2004",school:"武夷学院",major:"物流管理",job:"大四学生"},personality:{type:"INFJ-A",label:"提倡者",photo:"./img/selfhosted/pEcx82D.webp",cutout:"./img/selfhosted/persona-cut.webp",trait:"./img/selfhosted/16personalities_trait_intuitive.svg",dims:[{a:"I",b:"E",name:"内向 · Introversion",desc:"能量在独处中恢复，深度大于广度",anti:"对立端 E 外向：能量在人际互动中获得"},{a:"N",b:"S",name:"直觉 · iNtuition",desc:"关注可能性、联想与未来图景",anti:"对立端 S 实感：关注具体事实与当下细节"},{a:"F",b:"T",name:"情感 · Feeling",desc:"以个人价值观与共情做决策",anti:"对立端 T 思考：以逻辑与客观分析做决策"},{a:"J",b:"P",name:"判断 · Judging",desc:"偏好计划、结构与确定性",anti:"对立端 P 知觉：偏好灵活与保持开放"}]},maxim:{top:"彖辞破暗，",bottom:"渊澄万象"},buff:{top:"脑回路新奇的 酸菜鱼",bottom:"二次元指数 MAX"},game:{title:"铁锈战争",subtitle:"RUSTED WARFARE · 作战指挥室",uid:"Unnamed677",coords:"GRID 41.08°N · 122.06°E",feeds:[{src:"./img/selfhosted/rw-battle-01.webp",cam:"CAM-01 · 主战场",w:1600,h:1216},{src:"./img/selfhosted/rw-battle-02.webp",cam:"CAM-02 · 前线推进",w:1600,h:1055},{src:"./img/selfhosted/rw-battle-03.webp",cam:"CAM-03 · 阵地攻防",w:1600,h:896}],briefs:[">> SCOUT 报告：东线装甲集群正在推进，请求空中支援",">> 防空火力网已就位，航线清空，迫击炮阵地展开",">> 资金充裕，指挥官。第二梯队增援已在路上",">> 主战场进入白热化，双方指挥点持续攀升",">> 前线阵地交火中，工程单位正在抢修防御工事"],stats:[{k:"指挥官",v:"Unnamed677"},{k:"资金",v:"$4,851"},{k:"帧率",v:"121 FPS"},{k:"战线",v:"2 条"}]},comic:Xu,like:{title:"我的关注宇宙",intro:"每颗行星都是我的一项热爱 —— 悬停查看，移动鼠标推近这片星空",sun:{name:"彖渊子",desc:"一切热爱的引力中心"},planets:[{key:"mercury",name:"物流与供应链",interest:"🚚 物流 / 供应链管理",desc:"专业底色，让复杂流转变得有序",color:"#b7a98f",a:.387,e:.206,inc:7,T:.241,size:.26,link:"/archives"},{key:"venus",name:"智能家居",interest:"💡 智能家居小能手",desc:"让家听懂人的节奏",color:"#e6c27a",a:.723,e:.007,inc:3.4,T:.615,size:.45,link:"/archives"},{key:"earth",name:"设计开发",interest:"🎨 设计开发一条龙",desc:"从想法到落地的全链路",color:"#4a90d9",a:1,e:.017,inc:0,T:1,size:.5,link:"/archives"},{key:"mars",name:"游戏 · 铁锈战争",interest:"🎮 游戏 · 铁锈战争",desc:"UID: Unnamed677 的战场",color:"#d9603a",a:1.524,e:.093,inc:1.85,T:1.881,size:.38,link:"/archives"},{key:"jupiter",name:"音乐",interest:"🎵 电音 / 梵音 / 轻音乐",desc:"最大的一颗，最爱的一颗",color:"#d8a878",a:5.203,e:.048,inc:1.31,T:11.86,size:1.4,link:"/life/music/"},{key:"saturn",name:"宇宙、神秘",interest:"🌌 宇宙、神秘",desc:"望着深邃，才懂自己的渺小与辽阔",color:"#e8d3a0",a:9.537,e:.054,inc:2.49,T:29.46,size:1.2,link:"/archives"},{key:"uranus",name:"数码科技",interest:"📷 数码科技爱好者",desc:"对新玩意永远好奇",color:"#9fd8e0",a:19.19,e:.047,inc:.77,T:84,size:.8,link:"/archives"},{key:"neptune",name:"二次元",interest:"🌸 二次元 / 动漫",desc:"二次元指数 MAX",color:"#4f7fe0",a:30.07,e:.009,inc:1.77,T:164.8,size:.78,link:"/archives"}]},music:{title:"电音、梵音、轻音乐",bg:"./img/selfhosted/pVVZFot.jpg",link:"/life/music/",playlist:qu.map(i=>{const t=i.url,e=t.startsWith("https://aqqmusic.tc.qq.com")?"/qq"+t.slice(26):t;return{title:i.name,src:e,raw:t}})},stats:{layers:[{items:[{num:"1,284,567",label:"总访问 PV",meta:"页面浏览总量 · 较上月 +8.4%"},{num:"386,204",label:"独立访客 UV",meta:"去重后的访客数 · 较上月 +6.1%"}]},{items:[{num:"3,417",label:"今日 PV",meta:"截至今天的浏览量"},{num:"3,902",label:"昨日 PV",meta:"较前一日 -12.4%"},{num:"8",label:"文章数",meta:"累计已发布文章（实时）"}]},{items:[{num:"0",label:"评论数",meta:"全站评论互动总量（twikoo）"},{num:"4m12s",label:"平均停留",meta:"单次访问平均时长 · ↑ +0:18"}]},{items:[{num:"68%",label:"移动端占比",meta:"手机 / 平板访问占比"},{num:"54%",label:"搜索引擎来源",meta:"来自搜索的流量占比"}]},{items:[{num:"23%",label:"福建访客",meta:"访客地域排名第一"},{num:"18%",label:"广东访客",meta:"访客地域排名第二"},{num:"11%",label:"浙江访客",meta:"访客地域排名第三"}]}]},map:{title:"我现在住在",place:"中国，宁德市",bg:"./img/about/map.webp",bgDark:"./img/about/map-dark.webp"},rewards:[{name:"乐儿",amount:25,date:"2025-04-22"},{name:"阿柚",amount:12,date:"2025-06-03"},{name:"星野",amount:18,date:"2025-07-11"},{name:"半糖去冰",amount:8,date:"2025-08-19"},{name:"木木夕",amount:30,date:"2025-09-27"},{name:"小满",amount:20,date:"2025-11-05"},{name:"云野",amount:28,date:"2025-12-14"},{name:"晚风",amount:6,date:"2026-01-23"},{name:"猫町",amount:22,date:"2026-03-08"},{name:"拾光",amount:16,date:"2026-04-16"},{name:"竹里",amount:24,date:"2026-06-02"},{name:"一只鱼",amount:10,date:"2026-08-21"}],thanks:{title:"感谢",sub:"每一份善意，都被认真记着",charge:"为我充电",chargeNote:"电量来自每一颗星",sheetTitle:"请彖渊子喝一杯",sheetSub:"THANKS FOR YOUR SUPPORT",sheetNote:"金额随意 · 心意最重要 ☕",qr:{wx:{label:"微信",matrix:Zu,png:"./img/selfhosted/qr-wechat-art.webp",color:"#07c160",copyable:!1},ali:{label:"支付宝",matrix:td,png:"./img/selfhosted/qr-alipay-art.webp",color:"#1677ff",copyable:!0}}},secret:{realName:"（待补充）",city:"中国 · 宁德市",born:"2004",email:"站内私信可见",wechat:"（待补充）"}},nd=["/2025/05/13/各类降本增效免费AI工具/","/2022/10/29/在线数据分析平台/","/2025/04/01/学会用消费者权益维护自己的利益/","/2025/03/09/寒窑赋/","/2026/07/26/自动化爬取Cookie服务搭建/","/2026/07/04/自动化跟踪表搭建/","/2025/04/01/论文写作资源网站/","/2025/06/22/设计素材网站/"],id="/about-home/json/site-meta.json",sd="https://exquisite-pegasus-15130d.netlify.app/.netlify/functions/twikoo";async function rd(){try{const i=await fetch(id,{credentials:"omit"});if(!i.ok)throw new Error("meta "+i.status);const t=await i.json();if(t&&typeof t.posts=="number"&&t.posts>0)return t.posts}catch(i){console.warn("[home-app] fetchPostCount failed:",i&&i.message)}return null}async function od(){try{const i=typeof AbortController<"u"?new AbortController:null,t=i?setTimeout(()=>i.abort(),6e3):null,e=await fetch(sd,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:"GET_COMMENT_COUNTS",version:"2.0.11",urls:nd,lang:"zh-CN"}),signal:i?i.signal:void 0,credentials:"omit"});if(t&&clearTimeout(t),!e.ok)throw new Error("twikoo "+e.status);const n=await e.json();if(n&&n.code===0&&n.data){if(Array.isArray(n.data))return n.data.reduce((s,r)=>s+(Number(r)||0),0);if(typeof n.data=="object")return Object.values(n.data).reduce((s,r)=>s+(Number(r)||0),0)}}catch(i){console.warn("[home-app] fetchCommentCount failed（twikoo 云函数可能需升级）:",i&&i.message)}return null}async function ad(i=8e3){const t=typeof AbortController<"u"?new AbortController:null;let e=null;try{t&&(e=setTimeout(()=>t.abort(),i));const n=await fetch(ed,{method:"GET",signal:t?t.signal:void 0,credentials:"omit"});if(clearTimeout(e),!n.ok)throw new Error("stats upstream "+n.status);const s=await n.json();if(s.error)throw new Error(s.error);const r=s.todayPv||0,o=s.yesterdayPv||1,a=o>0?((r-o)/o*100).toFixed(1):"0.0",l=Number(a)>=0?"+":"",c=await rd(),h=await od();return Le.stats.layers=[{items:[{num:On(s.widgetTotal),label:"累计访客",meta:"自统计以来的独立访客总数 · 来自 51la"},{num:On(s.widgetMonth),label:"本月访客",meta:"本月累计访客数 · 来自 51la"}]},{items:[{num:On(s.todayPv),label:"今日 PV",meta:"今日页面浏览量 · 来自 51la"},{num:On(s.todayUv),label:"今日 UV",meta:"今日独立访客数 · 来自 51la"},{num:On(s.predictPv),label:"预计今日 PV",meta:"51la 根据当前趋势预估的全天 PV"}]},{items:[{num:On(s.yesterdayPv),label:"昨日 PV",meta:"昨日页面浏览量 · 来自 51la"},{num:On(s.yesterdayUv),label:"昨日 UV",meta:"昨日独立访客数 · 来自 51la"},{num:l+a+"%",label:"日环比",meta:"今日 PV 较昨日变化 · 来自 51la"}]},{items:[{num:c!=null?On(c):"8",label:"文章数",meta:"累计已发布文章（实时）"},{num:h!=null?On(h):"0",label:"评论数",meta:"全站评论互动总量（twikoo）"}]},{items:[{num:"68%",label:"移动端占比",meta:"手机 / 平板访问占比"},{num:"54%",label:"搜索引擎来源",meta:"来自搜索的流量占比"}]}],Le.stats.layers}catch(n){return clearTimeout(e),console.warn("[home-app] fetchStats failed, keeping placeholder:",n&&n.message),Le.stats.layers}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dl="169",ld=0,Gl=1,cd=2,gh=1,vh=2,Vn=3,vi=0,on=1,rn=2,fi=0,ms=1,gn=2,Vl=3,Wl=4,hd=5,Li=100,ud=101,dd=102,fd=103,pd=104,md=200,gd=201,vd=202,_d=203,xa=204,ya=205,xd=206,yd=207,Md=208,Sd=209,bd=210,wd=211,Ed=212,Td=213,Ad=214,Ma=0,Sa=1,ba=2,_s=3,wa=4,Ea=5,Ta=6,Aa=7,_h=0,Cd=1,Rd=2,pi=0,Pd=1,Ld=2,Dd=3,Id=4,Nd=5,Ud=6,Fd=7,xh=300,xs=301,ys=302,Ca=303,Ra=304,po=306,Pa=1e3,Ni=1001,La=1002,vn=1003,Od=1004,dr=1005,Sn=1006,Co=1007,Ui=1008,Zn=1009,yh=1010,Mh=1011,Zs=1012,fl=1013,zi=1014,Yn=1015,rr=1016,pl=1017,ml=1018,Ms=1020,Sh=35902,bh=1021,wh=1022,En=1023,Eh=1024,Th=1025,gs=1026,Ss=1027,Ah=1028,gl=1029,Ch=1030,vl=1031,_l=1033,Yr=33776,$r=33777,Kr=33778,Zr=33779,Da=35840,Ia=35841,Na=35842,Ua=35843,Fa=36196,Oa=37492,Ba=37496,za=37808,ka=37809,Ha=37810,Ga=37811,Va=37812,Wa=37813,Xa=37814,qa=37815,Ya=37816,$a=37817,Ka=37818,Za=37819,Ja=37820,ja=37821,Jr=36492,Qa=36494,tl=36495,Rh=36283,el=36284,nl=36285,il=36286,Bd=3200,zd=3201,Ph=0,kd=1,ui="",nn="srgb",xi="srgb-linear",xl="display-p3",mo="display-p3-linear",ro="linear",Me="srgb",oo="rec709",ao="p3",Xi=7680,Xl=519,Hd=512,Gd=513,Vd=514,Lh=515,Wd=516,Xd=517,qd=518,Yd=519,sl=35044,ql="300 es",$n=2e3,lo=2001;class Es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const $e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jr=Math.PI/180,rl=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function We(i,t,e){return Math.max(t,Math.min(e,i))}function $d(i,t){return(i%t+t)%t}function Ro(i,t,e){return(1-e)*i+e*t}function Ln(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ge(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(We(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class se{constructor(t,e,n,s,r,o,a,l,c){se.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],p=n[7],m=n[2],g=n[5],u=n[8],_=s[0],d=s[3],f=s[6],S=s[1],M=s[4],y=s[7],B=s[2],D=s[5],P=s[8];return r[0]=o*_+a*S+l*B,r[3]=o*d+a*M+l*D,r[6]=o*f+a*y+l*P,r[1]=c*_+h*S+p*B,r[4]=c*d+h*M+p*D,r[7]=c*f+h*y+p*P,r[2]=m*_+g*S+u*B,r[5]=m*d+g*M+u*D,r[8]=m*f+g*y+u*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],p=h*o-a*c,m=a*l-h*r,g=c*r-o*l,u=e*p+n*m+s*g;if(u===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/u;return t[0]=p*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=m*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=g*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Po.makeScale(t,e)),this}rotate(t){return this.premultiply(Po.makeRotation(-t)),this}translate(t,e){return this.premultiply(Po.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Po=new se;function Dh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Js(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Kd(){const i=Js("canvas");return i.style.display="block",i}const Yl={};function Qr(i){i in Yl||(Yl[i]=!0,console.warn(i))}function Zd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Jd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function jd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $l=new se().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Kl=new se().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ns={[xi]:{transfer:ro,primaries:oo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[nn]:{transfer:Me,primaries:oo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[mo]:{transfer:ro,primaries:ao,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Kl),fromReference:i=>i.applyMatrix3($l)},[xl]:{transfer:Me,primaries:ao,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Kl),fromReference:i=>i.applyMatrix3($l).convertLinearToSRGB()}},Qd=new Set([xi,mo]),ue={enabled:!0,_workingColorSpace:xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Qd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ns[t].toReference,s=Ns[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ns[i].primaries},getTransfer:function(i){return i===ui?ro:Ns[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Ns[t].luminanceCoefficients)}};function vs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Lo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qi;class tf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{qi===void 0&&(qi=Js("canvas")),qi.width=t.width,qi.height=t.height;const n=qi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Js("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=vs(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vs(e[n]/255)*255):e[n]=vs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ef=0;class Ih{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Do(s[o].image)):r.push(Do(s[o]))}else r=Do(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Do(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?tf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let nf=0;class Ze extends Es{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,n=Ni,s=Ni,r=Sn,o=Ui,a=En,l=Zn,c=Ze.DEFAULT_ANISOTROPY,h=ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Kn(),this.name="",this.source=new Ih(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new se,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pa:t.x=t.x-Math.floor(t.x);break;case Ni:t.x=t.x<0?0:1;break;case La:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pa:t.y=t.y-Math.floor(t.y);break;case Ni:t.y=t.y<0?0:1;break;case La:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=xh;Ze.DEFAULT_ANISOTROPY=1;class ve{constructor(t=0,e=0,n=0,s=1){ve.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],p=l[8],m=l[1],g=l[5],u=l[9],_=l[2],d=l[6],f=l[10];if(Math.abs(h-m)<.01&&Math.abs(p-_)<.01&&Math.abs(u-d)<.01){if(Math.abs(h+m)<.1&&Math.abs(p+_)<.1&&Math.abs(u+d)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,y=(g+1)/2,B=(f+1)/2,D=(h+m)/4,P=(p+_)/4,z=(u+d)/4;return M>y&&M>B?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=D/n,r=P/n):y>B?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=D/s,r=z/s):B<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(B),n=P/r,s=z/r),this.set(n,s,r,e),this}let S=Math.sqrt((d-u)*(d-u)+(p-_)*(p-_)+(m-h)*(m-h));return Math.abs(S)<.001&&(S=1),this.x=(d-u)/S,this.y=(p-_)/S,this.z=(m-h)/S,this.w=Math.acos((c+g+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sf extends Es{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ze(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ih(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ki extends sf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Nh extends Ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class rf extends Ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ts{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],p=n[s+3];const m=r[o+0],g=r[o+1],u=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p;return}if(a===1){t[e+0]=m,t[e+1]=g,t[e+2]=u,t[e+3]=_;return}if(p!==_||l!==m||c!==g||h!==u){let d=1-a;const f=l*m+c*g+h*u+p*_,S=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const B=Math.sqrt(M),D=Math.atan2(B,f*S);d=Math.sin(d*D)/B,a=Math.sin(a*D)/B}const y=a*S;if(l=l*d+m*y,c=c*d+g*y,h=h*d+u*y,p=p*d+_*y,d===1-a){const B=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=B,c*=B,h*=B,p*=B}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],p=r[o],m=r[o+1],g=r[o+2],u=r[o+3];return t[e]=a*u+h*p+l*g-c*m,t[e+1]=l*u+h*m+c*p-a*g,t[e+2]=c*u+h*g+a*m-l*p,t[e+3]=h*u-a*p-l*m-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),p=a(r/2),m=l(n/2),g=l(s/2),u=l(r/2);switch(o){case"XYZ":this._x=m*h*p+c*g*u,this._y=c*g*p-m*h*u,this._z=c*h*u+m*g*p,this._w=c*h*p-m*g*u;break;case"YXZ":this._x=m*h*p+c*g*u,this._y=c*g*p-m*h*u,this._z=c*h*u-m*g*p,this._w=c*h*p+m*g*u;break;case"ZXY":this._x=m*h*p-c*g*u,this._y=c*g*p+m*h*u,this._z=c*h*u+m*g*p,this._w=c*h*p-m*g*u;break;case"ZYX":this._x=m*h*p-c*g*u,this._y=c*g*p+m*h*u,this._z=c*h*u-m*g*p,this._w=c*h*p+m*g*u;break;case"YZX":this._x=m*h*p+c*g*u,this._y=c*g*p+m*h*u,this._z=c*h*u-m*g*p,this._w=c*h*p-m*g*u;break;case"XZY":this._x=m*h*p-c*g*u,this._y=c*g*p-m*h*u,this._z=c*h*u+m*g*p,this._w=c*h*p+m*g*u;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],p=e[10],m=n+a+p;if(m>0){const g=.5/Math.sqrt(m+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(o-s)*g}else if(n>a&&n>p){const g=2*Math.sqrt(1+n-a-p);this._w=(h-l)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+c)/g}else if(a>p){const g=2*Math.sqrt(1+a-n-p);this._w=(r-c)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+p-n-a);this._w=(o-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(We(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const g=1-e;return this._w=g*o+e*this._w,this._x=g*n+e*this._x,this._y=g*s+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),p=Math.sin((1-e)*h)/c,m=Math.sin(e*h)/c;return this._w=o*p+this._w*m,this._x=n*p+this._x*m,this._y=s*p+this._y*m,this._z=r*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(t=0,e=0,n=0){q.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+l*c+o*p-a*h,this.y=n+l*h+a*c-r*p,this.z=s+l*p+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Io.copy(this).projectOnVector(t),this.sub(Io)}reflect(t){return this.sub(Io.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(We(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Io=new q,Zl=new Ts;class or{constructor(t=new q(1/0,1/0,1/0),e=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,xn):xn.fromBufferAttribute(r,o),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fr.copy(n.boundingBox)),fr.applyMatrix4(t.matrixWorld),this.union(fr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Us),pr.subVectors(this.max,Us),Yi.subVectors(t.a,Us),$i.subVectors(t.b,Us),Ki.subVectors(t.c,Us),ei.subVectors($i,Yi),ni.subVectors(Ki,$i),bi.subVectors(Yi,Ki);let e=[0,-ei.z,ei.y,0,-ni.z,ni.y,0,-bi.z,bi.y,ei.z,0,-ei.x,ni.z,0,-ni.x,bi.z,0,-bi.x,-ei.y,ei.x,0,-ni.y,ni.x,0,-bi.y,bi.x,0];return!No(e,Yi,$i,Ki,pr)||(e=[1,0,0,0,1,0,0,0,1],!No(e,Yi,$i,Ki,pr))?!1:(mr.crossVectors(ei,ni),e=[mr.x,mr.y,mr.z],No(e,Yi,$i,Ki,pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Bn=[new q,new q,new q,new q,new q,new q,new q,new q],xn=new q,fr=new or,Yi=new q,$i=new q,Ki=new q,ei=new q,ni=new q,bi=new q,Us=new q,pr=new q,mr=new q,wi=new q;function No(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){wi.fromArray(i,r);const a=s.x*Math.abs(wi.x)+s.y*Math.abs(wi.y)+s.z*Math.abs(wi.z),l=t.dot(wi),c=e.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const of=new or,Fs=new q,Uo=new q;class ar{constructor(t=new q,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):of.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);const e=Fs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(Uo)),this.expandByPoint(Fs.copy(t.center).sub(Uo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zn=new q,Fo=new q,gr=new q,ii=new q,Oo=new q,vr=new q,Bo=new q;class go{constructor(t=new q,e=new q(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zn.copy(this.origin).addScaledVector(this.direction,e),zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Fo.copy(t).add(e).multiplyScalar(.5),gr.copy(e).sub(t).normalize(),ii.copy(this.origin).sub(Fo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(gr),a=ii.dot(this.direction),l=-ii.dot(gr),c=ii.lengthSq(),h=Math.abs(1-o*o);let p,m,g,u;if(h>0)if(p=o*l-a,m=o*a-l,u=r*h,p>=0)if(m>=-u)if(m<=u){const _=1/h;p*=_,m*=_,g=p*(p+o*m+2*a)+m*(o*p+m+2*l)+c}else m=r,p=Math.max(0,-(o*m+a)),g=-p*p+m*(m+2*l)+c;else m=-r,p=Math.max(0,-(o*m+a)),g=-p*p+m*(m+2*l)+c;else m<=-u?(p=Math.max(0,-(-o*r+a)),m=p>0?-r:Math.min(Math.max(-r,-l),r),g=-p*p+m*(m+2*l)+c):m<=u?(p=0,m=Math.min(Math.max(-r,-l),r),g=m*(m+2*l)+c):(p=Math.max(0,-(o*r+a)),m=p>0?r:Math.min(Math.max(-r,-l),r),g=-p*p+m*(m+2*l)+c);else m=o>0?-r:r,p=Math.max(0,-(o*m+a)),g=-p*p+m*(m+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Fo).addScaledVector(gr,m),g}intersectSphere(t,e){zn.subVectors(t.center,this.origin);const n=zn.dot(this.direction),s=zn.dot(zn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,m=this.origin;return c>=0?(n=(t.min.x-m.x)*c,s=(t.max.x-m.x)*c):(n=(t.max.x-m.x)*c,s=(t.min.x-m.x)*c),h>=0?(r=(t.min.y-m.y)*h,o=(t.max.y-m.y)*h):(r=(t.max.y-m.y)*h,o=(t.min.y-m.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-m.z)*p,l=(t.max.z-m.z)*p):(a=(t.max.z-m.z)*p,l=(t.min.z-m.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,zn)!==null}intersectTriangle(t,e,n,s,r){Oo.subVectors(e,t),vr.subVectors(n,t),Bo.crossVectors(Oo,vr);let o=this.direction.dot(Bo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ii.subVectors(this.origin,t);const l=a*this.direction.dot(vr.crossVectors(ii,vr));if(l<0)return null;const c=a*this.direction.dot(Oo.cross(ii));if(c<0||l+c>o)return null;const h=-a*ii.dot(Bo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,n,s,r,o,a,l,c,h,p,m,g,u,_,d){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,p,m,g,u,_,d)}set(t,e,n,s,r,o,a,l,c,h,p,m,g,u,_,d){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=p,f[14]=m,f[3]=g,f[7]=u,f[11]=_,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Zi.setFromMatrixColumn(t,0).length(),r=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){const m=o*h,g=o*p,u=a*h,_=a*p;e[0]=l*h,e[4]=-l*p,e[8]=c,e[1]=g+u*c,e[5]=m-_*c,e[9]=-a*l,e[2]=_-m*c,e[6]=u+g*c,e[10]=o*l}else if(t.order==="YXZ"){const m=l*h,g=l*p,u=c*h,_=c*p;e[0]=m+_*a,e[4]=u*a-g,e[8]=o*c,e[1]=o*p,e[5]=o*h,e[9]=-a,e[2]=g*a-u,e[6]=_+m*a,e[10]=o*l}else if(t.order==="ZXY"){const m=l*h,g=l*p,u=c*h,_=c*p;e[0]=m-_*a,e[4]=-o*p,e[8]=u+g*a,e[1]=g+u*a,e[5]=o*h,e[9]=_-m*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const m=o*h,g=o*p,u=a*h,_=a*p;e[0]=l*h,e[4]=u*c-g,e[8]=m*c+_,e[1]=l*p,e[5]=_*c+m,e[9]=g*c-u,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const m=o*l,g=o*c,u=a*l,_=a*c;e[0]=l*h,e[4]=_-m*p,e[8]=u*p+g,e[1]=p,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=g*p+u,e[10]=m-_*p}else if(t.order==="XZY"){const m=o*l,g=o*c,u=a*l,_=a*c;e[0]=l*h,e[4]=-p,e[8]=c*h,e[1]=m*p+_,e[5]=o*h,e[9]=g*p-u,e[2]=u*p-g,e[6]=a*h,e[10]=_*p+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(af,t,lf)}lookAt(t,e,n){const s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),si.crossVectors(n,ln),si.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),si.crossVectors(n,ln)),si.normalize(),_r.crossVectors(ln,si),s[0]=si.x,s[4]=_r.x,s[8]=ln.x,s[1]=si.y,s[5]=_r.y,s[9]=ln.y,s[2]=si.z,s[6]=_r.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],p=n[5],m=n[9],g=n[13],u=n[2],_=n[6],d=n[10],f=n[14],S=n[3],M=n[7],y=n[11],B=n[15],D=s[0],P=s[4],z=s[8],et=s[12],v=s[1],x=s[5],I=s[9],C=s[13],E=s[2],A=s[6],w=s[10],F=s[14],T=s[3],R=s[7],k=s[11],G=s[15];return r[0]=o*D+a*v+l*E+c*T,r[4]=o*P+a*x+l*A+c*R,r[8]=o*z+a*I+l*w+c*k,r[12]=o*et+a*C+l*F+c*G,r[1]=h*D+p*v+m*E+g*T,r[5]=h*P+p*x+m*A+g*R,r[9]=h*z+p*I+m*w+g*k,r[13]=h*et+p*C+m*F+g*G,r[2]=u*D+_*v+d*E+f*T,r[6]=u*P+_*x+d*A+f*R,r[10]=u*z+_*I+d*w+f*k,r[14]=u*et+_*C+d*F+f*G,r[3]=S*D+M*v+y*E+B*T,r[7]=S*P+M*x+y*A+B*R,r[11]=S*z+M*I+y*w+B*k,r[15]=S*et+M*C+y*F+B*G,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],p=t[6],m=t[10],g=t[14],u=t[3],_=t[7],d=t[11],f=t[15];return u*(+r*l*p-s*c*p-r*a*m+n*c*m+s*a*g-n*l*g)+_*(+e*l*g-e*c*m+r*o*m-s*o*g+s*c*h-r*l*h)+d*(+e*c*p-e*a*g-r*o*p+n*o*g+r*a*h-n*c*h)+f*(-s*a*h-e*l*p+e*a*m+s*o*p-n*o*m+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],p=t[9],m=t[10],g=t[11],u=t[12],_=t[13],d=t[14],f=t[15],S=p*d*c-_*m*c+_*l*g-a*d*g-p*l*f+a*m*f,M=u*m*c-h*d*c-u*l*g+o*d*g+h*l*f-o*m*f,y=h*_*c-u*p*c+u*a*g-o*_*g-h*a*f+o*p*f,B=u*p*l-h*_*l-u*a*m+o*_*m+h*a*d-o*p*d,D=e*S+n*M+s*y+r*B;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/D;return t[0]=S*P,t[1]=(_*m*r-p*d*r-_*s*g+n*d*g+p*s*f-n*m*f)*P,t[2]=(a*d*r-_*l*r+_*s*c-n*d*c-a*s*f+n*l*f)*P,t[3]=(p*l*r-a*m*r-p*s*c+n*m*c+a*s*g-n*l*g)*P,t[4]=M*P,t[5]=(h*d*r-u*m*r+u*s*g-e*d*g-h*s*f+e*m*f)*P,t[6]=(u*l*r-o*d*r-u*s*c+e*d*c+o*s*f-e*l*f)*P,t[7]=(o*m*r-h*l*r+h*s*c-e*m*c-o*s*g+e*l*g)*P,t[8]=y*P,t[9]=(u*p*r-h*_*r-u*n*g+e*_*g+h*n*f-e*p*f)*P,t[10]=(o*_*r-u*a*r+u*n*c-e*_*c-o*n*f+e*a*f)*P,t[11]=(h*a*r-o*p*r-h*n*c+e*p*c+o*n*g-e*a*g)*P,t[12]=B*P,t[13]=(h*_*s-u*p*s+u*n*m-e*_*m-h*n*d+e*p*d)*P,t[14]=(u*a*s-o*_*s-u*n*l+e*_*l+o*n*d-e*a*d)*P,t[15]=(o*p*s-h*a*s+h*n*l-e*p*l-o*n*m+e*a*m)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,p=a+a,m=r*c,g=r*h,u=r*p,_=o*h,d=o*p,f=a*p,S=l*c,M=l*h,y=l*p,B=n.x,D=n.y,P=n.z;return s[0]=(1-(_+f))*B,s[1]=(g+y)*B,s[2]=(u-M)*B,s[3]=0,s[4]=(g-y)*D,s[5]=(1-(m+f))*D,s[6]=(d+S)*D,s[7]=0,s[8]=(u+M)*P,s[9]=(d-S)*P,s[10]=(1-(m+_))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Zi.set(s[0],s[1],s[2]).length();const o=Zi.set(s[4],s[5],s[6]).length(),a=Zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],yn.copy(this);const c=1/r,h=1/o,p=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=p,yn.elements[9]*=p,yn.elements[10]*=p,e.setFromRotationMatrix(yn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=$n){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),p=(e+t)/(e-t),m=(n+s)/(n-s);let g,u;if(a===$n)g=-(o+r)/(o-r),u=-2*o*r/(o-r);else if(a===lo)g=-o/(o-r),u=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=u,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=$n){const l=this.elements,c=1/(e-t),h=1/(n-s),p=1/(o-r),m=(e+t)*c,g=(n+s)*h;let u,_;if(a===$n)u=(o+r)*p,_=-2*p;else if(a===lo)u=r*p,_=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-m,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=_,l[14]=-u,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Zi=new q,yn=new de,af=new q(0,0,0),lf=new q(1,1,1),si=new q,_r=new q,ln=new q,Jl=new de,jl=new Ts;class Dn{constructor(t=0,e=0,n=0,s=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],p=s[2],m=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Jl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jl.setFromEuler(this),this.setFromQuaternion(jl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class yl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let cf=0;const Ql=new q,Ji=new Ts,kn=new de,xr=new q,Os=new q,hf=new q,uf=new Ts,tc=new q(1,0,0),ec=new q(0,1,0),nc=new q(0,0,1),ic={type:"added"},df={type:"removed"},ji={type:"childadded",child:null},zo={type:"childremoved",child:null};class De extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new q,e=new Dn,n=new Ts,s=new q(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new se}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.premultiply(Ji),this}rotateX(t){return this.rotateOnAxis(tc,t)}rotateY(t){return this.rotateOnAxis(ec,t)}rotateZ(t){return this.rotateOnAxis(nc,t)}translateOnAxis(t,e){return Ql.copy(t).applyQuaternion(this.quaternion),this.position.add(Ql.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tc,t)}translateY(t){return this.translateOnAxis(ec,t)}translateZ(t){return this.translateOnAxis(nc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?xr.copy(t):xr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Os,xr,this.up):kn.lookAt(xr,Os,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),Ji.setFromRotationMatrix(kn),this.quaternion.premultiply(Ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ic),ji.child=t,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(df),zo.child=t,this.dispatchEvent(zo),zo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ic),ji.child=t,this.dispatchEvent(ji),ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,hf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,uf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),p=o(t.shapes),m=o(t.skeletons),g=o(t.animations),u=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),g.length>0&&(n.animations=g),u.length>0&&(n.nodes=u)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}De.DEFAULT_UP=new q(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new q,Hn=new q,ko=new q,Gn=new q,Qi=new q,ts=new q,sc=new q,Ho=new q,Go=new q,Vo=new q,Wo=new ve,Xo=new ve,qo=new ve;class hn{constructor(t=new q,e=new q,n=new q){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Mn.subVectors(t,e),s.cross(Mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Mn.subVectors(s,e),Hn.subVectors(n,e),ko.subVectors(t,e);const o=Mn.dot(Mn),a=Mn.dot(Hn),l=Mn.dot(ko),c=Hn.dot(Hn),h=Hn.dot(ko),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;const m=1/p,g=(c*l-a*h)*m,u=(o*h-a*l)*m;return r.set(1-g-u,u,g)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Gn.x),l.addScaledVector(o,Gn.y),l.addScaledVector(a,Gn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Wo.setScalar(0),Xo.setScalar(0),qo.setScalar(0),Wo.fromBufferAttribute(t,e),Xo.fromBufferAttribute(t,n),qo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Wo,r.x),o.addScaledVector(Xo,r.y),o.addScaledVector(qo,r.z),o}static isFrontFacing(t,e,n,s){return Mn.subVectors(n,e),Hn.subVectors(t,e),Mn.cross(Hn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),Mn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Qi.subVectors(s,n),ts.subVectors(r,n),Ho.subVectors(t,n);const l=Qi.dot(Ho),c=ts.dot(Ho);if(l<=0&&c<=0)return e.copy(n);Go.subVectors(t,s);const h=Qi.dot(Go),p=ts.dot(Go);if(h>=0&&p<=h)return e.copy(s);const m=l*p-h*c;if(m<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Qi,o);Vo.subVectors(t,r);const g=Qi.dot(Vo),u=ts.dot(Vo);if(u>=0&&g<=u)return e.copy(r);const _=g*c-l*u;if(_<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(ts,a);const d=h*u-g*p;if(d<=0&&p-h>=0&&g-u>=0)return sc.subVectors(r,s),a=(p-h)/(p-h+(g-u)),e.copy(s).addScaledVector(sc,a);const f=1/(d+_+m);return o=_*f,a=m*f,e.copy(n).addScaledVector(Qi,o).addScaledVector(ts,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},yr={h:0,s:0,l:0};function Yo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ue.workingColorSpace){return this.r=t,this.g=e,this.b=n,ue.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ue.workingColorSpace){if(t=$d(t,1),e=We(e,0,1),n=We(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Yo(o,r,t+1/3),this.g=Yo(o,r,t),this.b=Yo(o,r,t-1/3)}return ue.toWorkingColorSpace(this,s),this}setStyle(t,e=nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){const n=Uh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}copyLinearToSRGB(t){return this.r=Lo(t.r),this.g=Lo(t.g),this.b=Lo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return ue.fromWorkingColorSpace(Ke.copy(this),t),Math.round(We(Ke.r*255,0,255))*65536+Math.round(We(Ke.g*255,0,255))*256+Math.round(We(Ke.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ue.workingColorSpace){ue.fromWorkingColorSpace(Ke.copy(this),e);const n=Ke.r,s=Ke.g,r=Ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const p=o-a;switch(c=h<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ue.workingColorSpace){return ue.fromWorkingColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=nn){ue.fromWorkingColorSpace(Ke.copy(this),t);const e=Ke.r,n=Ke.g,s=Ke.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(yr);const n=Ro(ri.h,yr.h,e),s=Ro(ri.s,yr.s,e),r=Ro(ri.l,yr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ke=new ee;ee.NAMES=Uh;let ff=0;class yi extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=ms,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xa,this.blendDst=ya,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xa&&(n.blendSrc=this.blendSrc),this.blendDst!==ya&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Tn extends yi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=_h,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ne=new q,Mr=new Et;class Je{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=sl,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Mr.fromBufferAttribute(this,e),Mr.applyMatrix3(t),this.setXY(e,Mr.x,Mr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ge(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sl&&(t.usage=this.usage),t}}class Fh extends Je{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Oh extends Je{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class fe extends Je{constructor(t,e,n){super(new Float32Array(t),e,n)}}let pf=0;const fn=new de,$o=new De,es=new q,cn=new or,Bs=new or,ke=new q;class Se extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dh(t)?Oh:Fh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new se().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return $o.lookAt(t),$o.updateMatrix(),this.applyMatrix4($o.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new fe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new or);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ar);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(t){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(ke.addVectors(cn.min,Bs.min),cn.expandByPoint(ke),ke.addVectors(cn.max,Bs.max),cn.expandByPoint(ke)):(cn.expandByPoint(Bs.min),cn.expandByPoint(Bs.max))}cn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ke));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ke.fromBufferAttribute(a,c),l&&(es.fromBufferAttribute(t,c),ke.add(es)),s=Math.max(s,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let z=0;z<n.count;z++)a[z]=new q,l[z]=new q;const c=new q,h=new q,p=new q,m=new Et,g=new Et,u=new Et,_=new q,d=new q;function f(z,et,v){c.fromBufferAttribute(n,z),h.fromBufferAttribute(n,et),p.fromBufferAttribute(n,v),m.fromBufferAttribute(r,z),g.fromBufferAttribute(r,et),u.fromBufferAttribute(r,v),h.sub(c),p.sub(c),g.sub(m),u.sub(m);const x=1/(g.x*u.y-u.x*g.y);isFinite(x)&&(_.copy(h).multiplyScalar(u.y).addScaledVector(p,-g.y).multiplyScalar(x),d.copy(p).multiplyScalar(g.x).addScaledVector(h,-u.x).multiplyScalar(x),a[z].add(_),a[et].add(_),a[v].add(_),l[z].add(d),l[et].add(d),l[v].add(d))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let z=0,et=S.length;z<et;++z){const v=S[z],x=v.start,I=v.count;for(let C=x,E=x+I;C<E;C+=3)f(t.getX(C+0),t.getX(C+1),t.getX(C+2))}const M=new q,y=new q,B=new q,D=new q;function P(z){B.fromBufferAttribute(s,z),D.copy(B);const et=a[z];M.copy(et),M.sub(B.multiplyScalar(B.dot(et))).normalize(),y.crossVectors(D,et);const x=y.dot(l[z])<0?-1:1;o.setXYZW(z,M.x,M.y,M.z,x)}for(let z=0,et=S.length;z<et;++z){const v=S[z],x=v.start,I=v.count;for(let C=x,E=x+I;C<E;C+=3)P(t.getX(C+0)),P(t.getX(C+1)),P(t.getX(C+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,g=n.count;m<g;m++)n.setXYZ(m,0,0,0);const s=new q,r=new q,o=new q,a=new q,l=new q,c=new q,h=new q,p=new q;if(t)for(let m=0,g=t.count;m<g;m+=3){const u=t.getX(m+0),_=t.getX(m+1),d=t.getX(m+2);s.fromBufferAttribute(e,u),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,d),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),a.fromBufferAttribute(n,u),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,d),a.add(h),l.add(h),c.add(h),n.setXYZ(u,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let m=0,g=e.count;m<g;m+=3)s.fromBufferAttribute(e,m+0),r.fromBufferAttribute(e,m+1),o.fromBufferAttribute(e,m+2),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,p=a.normalized,m=new c.constructor(l.length*h);let g=0,u=0;for(let _=0,d=l.length;_<d;_++){a.isInterleavedBufferAttribute?g=l[_]*a.data.stride+a.offset:g=l[_]*h;for(let f=0;f<h;f++)m[u++]=c[g++]}return new Je(m,h,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,p=c.length;h<p;h++){const m=c[h],g=t(m,n);l.push(g)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let p=0,m=c.length;p<m;p++){const g=c[p];h.push(g.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],p=r[c];for(let m=0,g=p.length;m<g;m++)h.push(p[m].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rc=new de,Ei=new go,Sr=new ar,oc=new q,br=new q,wr=new q,Er=new q,Ko=new q,Tr=new q,ac=new q,Ar=new q;class Ee extends De{constructor(t=new Se,e=new Tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Tr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],p=r[l];h!==0&&(Ko.fromBufferAttribute(p,t),o?Tr.addScaledVector(Ko,h):Tr.addScaledVector(Ko.sub(e),h))}e.add(Tr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(r),Ei.copy(t.ray).recast(t.near),!(Sr.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Sr,oc)===null||Ei.origin.distanceToSquared(oc)>(t.far-t.near)**2))&&(rc.copy(r).invert(),Ei.copy(t.ray).applyMatrix4(rc),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,m=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let u=0,_=m.length;u<_;u++){const d=m[u],f=o[d.materialIndex],S=Math.max(d.start,g.start),M=Math.min(a.count,Math.min(d.start+d.count,g.start+g.count));for(let y=S,B=M;y<B;y+=3){const D=a.getX(y),P=a.getX(y+1),z=a.getX(y+2);s=Cr(this,f,t,n,c,h,p,D,P,z),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const u=Math.max(0,g.start),_=Math.min(a.count,g.start+g.count);for(let d=u,f=_;d<f;d+=3){const S=a.getX(d),M=a.getX(d+1),y=a.getX(d+2);s=Cr(this,o,t,n,c,h,p,S,M,y),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let u=0,_=m.length;u<_;u++){const d=m[u],f=o[d.materialIndex],S=Math.max(d.start,g.start),M=Math.min(l.count,Math.min(d.start+d.count,g.start+g.count));for(let y=S,B=M;y<B;y+=3){const D=y,P=y+1,z=y+2;s=Cr(this,f,t,n,c,h,p,D,P,z),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const u=Math.max(0,g.start),_=Math.min(l.count,g.start+g.count);for(let d=u,f=_;d<f;d+=3){const S=d,M=d+1,y=d+2;s=Cr(this,o,t,n,c,h,p,S,M,y),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}}}function mf(i,t,e,n,s,r,o,a){let l;if(t.side===on?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===vi,a),l===null)return null;Ar.copy(a),Ar.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ar);return c<e.near||c>e.far?null:{distance:c,point:Ar.clone(),object:i}}function Cr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,br),i.getVertexPosition(l,wr),i.getVertexPosition(c,Er);const h=mf(i,t,e,n,br,wr,Er,ac);if(h){const p=new q;hn.getBarycoord(ac,br,wr,Er,p),s&&(h.uv=hn.getInterpolatedAttribute(s,a,l,c,p,new Et)),r&&(h.uv1=hn.getInterpolatedAttribute(r,a,l,c,p,new Et)),o&&(h.normal=hn.getInterpolatedAttribute(o,a,l,c,p,new q),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const m={a,b:l,c,normal:new q,materialIndex:0};hn.getNormal(br,wr,Er,m.normal),h.face=m,h.barycoord=p}return h}class mi extends Se{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],p=[];let m=0,g=0;u("z","y","x",-1,-1,n,e,t,o,r,0),u("z","y","x",1,-1,n,e,-t,o,r,1),u("x","z","y",1,1,t,n,e,s,o,2),u("x","z","y",1,-1,t,n,-e,s,o,3),u("x","y","z",1,-1,t,e,n,s,r,4),u("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(p,2));function u(_,d,f,S,M,y,B,D,P,z,et){const v=y/P,x=B/z,I=y/2,C=B/2,E=D/2,A=P+1,w=z+1;let F=0,T=0;const R=new q;for(let k=0;k<w;k++){const G=k*x-C;for(let st=0;st<A;st++){const X=st*v-I;R[_]=X*S,R[d]=G*M,R[f]=E,c.push(R.x,R.y,R.z),R[_]=0,R[d]=0,R[f]=D>0?1:-1,h.push(R.x,R.y,R.z),p.push(st/P),p.push(1-k/z),F+=1}}for(let k=0;k<z;k++)for(let G=0;G<P;G++){const st=m+G+A*k,X=m+G+A*(k+1),O=m+(G+1)+A*(k+1),W=m+(G+1)+A*k;l.push(st,X,W),l.push(X,O,W),T+=6}a.addGroup(g,T,et),g+=T,m+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function en(i){const t={};for(let e=0;e<i.length;e++){const n=bs(i[e]);for(const s in n)t[s]=n[s]}return t}function gf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Bh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}const vf={clone:bs,merge:en};var _f=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends yi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_f,this.fragmentShader=xf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bs(t.uniforms),this.uniformsGroups=gf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class zh extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const oi=new q,lc=new Et,cc=new Et;class Xe extends zh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rl*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(oi.x,oi.y).multiplyScalar(-t/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-t/oi.z)}getViewSize(t,e){return this.getViewBounds(t,lc,cc),e.subVectors(cc,lc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(jr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ns=-90,is=1;class yf extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Xe(ns,is,t,e);s.layers=this.layers,this.add(s);const r=new Xe(ns,is,t,e);r.layers=this.layers,this.add(r);const o=new Xe(ns,is,t,e);o.layers=this.layers,this.add(o);const a=new Xe(ns,is,t,e);a.layers=this.layers,this.add(a);const l=new Xe(ns,is,t,e);l.layers=this.layers,this.add(l);const c=new Xe(ns,is,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===$n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===lo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,p=t.getRenderTarget(),m=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),u=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(p,m,g),t.xr.enabled=u,n.texture.needsPMREMUpdate=!0}}class kh extends Ze{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:xs,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Mf extends ki{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new kh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Sn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new mi(5,5,5),r=new _i({name:"CubemapFromEquirect",uniforms:bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:fi});r.uniforms.tEquirect.value=e;const o=new Ee(s,r),a=e.minFilter;return e.minFilter===Ui&&(e.minFilter=Sn),new yf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Zo=new q,Sf=new q,bf=new se;class Ri{constructor(t=new q(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Zo.subVectors(n,e).cross(Sf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Zo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||bf.getNormalMatrix(t),s=this.coplanarPoint(Zo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new ar,Rr=new q;class Ml{constructor(t=new Ri,e=new Ri,n=new Ri,s=new Ri,r=new Ri,o=new Ri){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=$n){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],p=s[6],m=s[7],g=s[8],u=s[9],_=s[10],d=s[11],f=s[12],S=s[13],M=s[14],y=s[15];if(n[0].setComponents(l-r,m-c,d-g,y-f).normalize(),n[1].setComponents(l+r,m+c,d+g,y+f).normalize(),n[2].setComponents(l+o,m+h,d+u,y+S).normalize(),n[3].setComponents(l-o,m-h,d-u,y-S).normalize(),n[4].setComponents(l-a,m-p,d-_,y-M).normalize(),e===$n)n[5].setComponents(l+a,m+p,d+_,y+M).normalize();else if(e===lo)n[5].setComponents(a,p,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(t){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Rr.x=s.normal.x>0?t.max.x:t.min.x,Rr.y=s.normal.y>0?t.max.y:t.min.y,Rr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Rr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Hh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function wf(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,p=c.byteLength,m=i.createBuffer();i.bindBuffer(l,m),i.bufferData(l,c,h),a.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:m,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,c){const h=l.array,p=l.updateRanges;if(i.bindBuffer(c,a),p.length===0)i.bufferSubData(c,0,h);else{p.sort((g,u)=>g.start-u.start);let m=0;for(let g=1;g<p.length;g++){const u=p[m],_=p[g];_.start<=u.start+u.count+1?u.count=Math.max(u.count,_.start+_.count-u.start):(++m,p[m]=_)}p.length=m+1;for(let g=0,u=p.length;g<u;g++){const _=p[g];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Hi extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,p=t/a,m=e/l,g=[],u=[],_=[],d=[];for(let f=0;f<h;f++){const S=f*m-o;for(let M=0;M<c;M++){const y=M*p-r;u.push(y,-S,0),_.push(0,0,1),d.push(M/a),d.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<a;S++){const M=S+c*f,y=S+c*(f+1),B=S+1+c*(f+1),D=S+1+c*f;g.push(M,y,D),g.push(y,B,D)}this.setIndex(g),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(_,3)),this.setAttribute("uv",new fe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hi(t.width,t.height,t.widthSegments,t.heightSegments)}}var Ef=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Af=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Df=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,If=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Nf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Uf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Of=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$f=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Jf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,e0="gl_FragColor = linearToOutputTexel( gl_FragColor );",n0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,i0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,s0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,r0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,o0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,a0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,l0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,c0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,u0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,d0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,f0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,p0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,m0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,g0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,v0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,y0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,M0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,S0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,b0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,w0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,E0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,T0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,A0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,C0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,R0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,L0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,N0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,U0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,F0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,O0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,B0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,z0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,H0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,G0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,V0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,W0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Y0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,K0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Z0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,J0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,j0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Q0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,np=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ip=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,op=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ap=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,up=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_p=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ep=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Lp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Dp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ip=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Up=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Op=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Kp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ie={alphahash_fragment:Ef,alphahash_pars_fragment:Tf,alphamap_fragment:Af,alphamap_pars_fragment:Cf,alphatest_fragment:Rf,alphatest_pars_fragment:Pf,aomap_fragment:Lf,aomap_pars_fragment:Df,batching_pars_vertex:If,batching_vertex:Nf,begin_vertex:Uf,beginnormal_vertex:Ff,bsdfs:Of,iridescence_fragment:Bf,bumpmap_pars_fragment:zf,clipping_planes_fragment:kf,clipping_planes_pars_fragment:Hf,clipping_planes_pars_vertex:Gf,clipping_planes_vertex:Vf,color_fragment:Wf,color_pars_fragment:Xf,color_pars_vertex:qf,color_vertex:Yf,common:$f,cube_uv_reflection_fragment:Kf,defaultnormal_vertex:Zf,displacementmap_pars_vertex:Jf,displacementmap_vertex:jf,emissivemap_fragment:Qf,emissivemap_pars_fragment:t0,colorspace_fragment:e0,colorspace_pars_fragment:n0,envmap_fragment:i0,envmap_common_pars_fragment:s0,envmap_pars_fragment:r0,envmap_pars_vertex:o0,envmap_physical_pars_fragment:v0,envmap_vertex:a0,fog_vertex:l0,fog_pars_vertex:c0,fog_fragment:h0,fog_pars_fragment:u0,gradientmap_pars_fragment:d0,lightmap_pars_fragment:f0,lights_lambert_fragment:p0,lights_lambert_pars_fragment:m0,lights_pars_begin:g0,lights_toon_fragment:_0,lights_toon_pars_fragment:x0,lights_phong_fragment:y0,lights_phong_pars_fragment:M0,lights_physical_fragment:S0,lights_physical_pars_fragment:b0,lights_fragment_begin:w0,lights_fragment_maps:E0,lights_fragment_end:T0,logdepthbuf_fragment:A0,logdepthbuf_pars_fragment:C0,logdepthbuf_pars_vertex:R0,logdepthbuf_vertex:P0,map_fragment:L0,map_pars_fragment:D0,map_particle_fragment:I0,map_particle_pars_fragment:N0,metalnessmap_fragment:U0,metalnessmap_pars_fragment:F0,morphinstance_vertex:O0,morphcolor_vertex:B0,morphnormal_vertex:z0,morphtarget_pars_vertex:k0,morphtarget_vertex:H0,normal_fragment_begin:G0,normal_fragment_maps:V0,normal_pars_fragment:W0,normal_pars_vertex:X0,normal_vertex:q0,normalmap_pars_fragment:Y0,clearcoat_normal_fragment_begin:$0,clearcoat_normal_fragment_maps:K0,clearcoat_pars_fragment:Z0,iridescence_pars_fragment:J0,opaque_fragment:j0,packing:Q0,premultiplied_alpha_fragment:tp,project_vertex:ep,dithering_fragment:np,dithering_pars_fragment:ip,roughnessmap_fragment:sp,roughnessmap_pars_fragment:rp,shadowmap_pars_fragment:op,shadowmap_pars_vertex:ap,shadowmap_vertex:lp,shadowmask_pars_fragment:cp,skinbase_vertex:hp,skinning_pars_vertex:up,skinning_vertex:dp,skinnormal_vertex:fp,specularmap_fragment:pp,specularmap_pars_fragment:mp,tonemapping_fragment:gp,tonemapping_pars_fragment:vp,transmission_fragment:_p,transmission_pars_fragment:xp,uv_pars_fragment:yp,uv_pars_vertex:Mp,uv_vertex:Sp,worldpos_vertex:bp,background_vert:wp,background_frag:Ep,backgroundCube_vert:Tp,backgroundCube_frag:Ap,cube_vert:Cp,cube_frag:Rp,depth_vert:Pp,depth_frag:Lp,distanceRGBA_vert:Dp,distanceRGBA_frag:Ip,equirect_vert:Np,equirect_frag:Up,linedashed_vert:Fp,linedashed_frag:Op,meshbasic_vert:Bp,meshbasic_frag:zp,meshlambert_vert:kp,meshlambert_frag:Hp,meshmatcap_vert:Gp,meshmatcap_frag:Vp,meshnormal_vert:Wp,meshnormal_frag:Xp,meshphong_vert:qp,meshphong_frag:Yp,meshphysical_vert:$p,meshphysical_frag:Kp,meshtoon_vert:Zp,meshtoon_frag:Jp,points_vert:jp,points_frag:Qp,shadow_vert:tm,shadow_frag:em,sprite_vert:nm,sprite_frag:im},Lt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new se}},envmap:{envMap:{value:null},envMapRotation:{value:new se},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new se}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new se}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new se},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new se},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new se},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new se}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new se}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new se}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0},uvTransform:{value:new se}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}}},Pn={basic:{uniforms:en([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:en([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:en([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:en([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:en([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:en([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:en([Lt.points,Lt.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:en([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:en([Lt.common,Lt.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:en([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:en([Lt.sprite,Lt.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new se},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new se}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distanceRGBA:{uniforms:en([Lt.common,Lt.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distanceRGBA_vert,fragmentShader:ie.distanceRGBA_frag},shadow:{uniforms:en([Lt.lights,Lt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};Pn.physical={uniforms:en([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new se},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new se},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new se},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new se},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new se},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new se},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new se},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new se},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new se},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new se},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new se},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new se}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};const Pr={r:0,b:0,g:0},Ai=new Dn,sm=new de;function rm(i,t,e,n,s,r,o){const a=new ee(0);let l=r===!0?0:1,c,h,p=null,m=0,g=null;function u(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?e:t).get(M)),M}function _(S){let M=!1;const y=u(S);y===null?f(a,l):y&&y.isColor&&(f(y,1),M=!0);const B=i.xr.getEnvironmentBlendMode();B==="additive"?n.buffers.color.setClear(0,0,0,1,o):B==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(S,M){const y=u(M);y&&(y.isCubeTexture||y.mapping===po)?(h===void 0&&(h=new Ee(new mi(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:bs(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(B,D,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ai.copy(M.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(sm.makeRotationFromEuler(Ai)),h.material.toneMapped=ue.getTransfer(y.colorSpace)!==Me,(p!==y||m!==y.version||g!==i.toneMapping)&&(h.material.needsUpdate=!0,p=y,m=y.version,g=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ee(new Hi(2,2),new _i({name:"BackgroundMaterial",uniforms:bs(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=ue.getTransfer(y.colorSpace)!==Me,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(p!==y||m!==y.version||g!==i.toneMapping)&&(c.material.needsUpdate=!0,p=y,m=y.version,g=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,M){S.getRGB(Pr,Bh(i)),n.buffers.color.setClear(Pr.r,Pr.g,Pr.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),l=M,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(a,l)},render:_,addToRenderList:d}}function om(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=m(null);let r=s,o=!1;function a(v,x,I,C,E){let A=!1;const w=p(C,I,x);r!==w&&(r=w,c(r.object)),A=g(v,C,I,E),A&&u(v,C,I,E),E!==null&&t.update(E,i.ELEMENT_ARRAY_BUFFER),(A||o)&&(o=!1,y(v,x,I,C),E!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(E).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function p(v,x,I){const C=I.wireframe===!0;let E=n[v.id];E===void 0&&(E={},n[v.id]=E);let A=E[x.id];A===void 0&&(A={},E[x.id]=A);let w=A[C];return w===void 0&&(w=m(l()),A[C]=w),w}function m(v){const x=[],I=[],C=[];for(let E=0;E<e;E++)x[E]=0,I[E]=0,C[E]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:x,enabledAttributes:I,attributeDivisors:C,object:v,attributes:{},index:null}}function g(v,x,I,C){const E=r.attributes,A=x.attributes;let w=0;const F=I.getAttributes();for(const T in F)if(F[T].location>=0){const k=E[T];let G=A[T];if(G===void 0&&(T==="instanceMatrix"&&v.instanceMatrix&&(G=v.instanceMatrix),T==="instanceColor"&&v.instanceColor&&(G=v.instanceColor)),k===void 0||k.attribute!==G||G&&k.data!==G.data)return!0;w++}return r.attributesNum!==w||r.index!==C}function u(v,x,I,C){const E={},A=x.attributes;let w=0;const F=I.getAttributes();for(const T in F)if(F[T].location>=0){let k=A[T];k===void 0&&(T==="instanceMatrix"&&v.instanceMatrix&&(k=v.instanceMatrix),T==="instanceColor"&&v.instanceColor&&(k=v.instanceColor));const G={};G.attribute=k,k&&k.data&&(G.data=k.data),E[T]=G,w++}r.attributes=E,r.attributesNum=w,r.index=C}function _(){const v=r.newAttributes;for(let x=0,I=v.length;x<I;x++)v[x]=0}function d(v){f(v,0)}function f(v,x){const I=r.newAttributes,C=r.enabledAttributes,E=r.attributeDivisors;I[v]=1,C[v]===0&&(i.enableVertexAttribArray(v),C[v]=1),E[v]!==x&&(i.vertexAttribDivisor(v,x),E[v]=x)}function S(){const v=r.newAttributes,x=r.enabledAttributes;for(let I=0,C=x.length;I<C;I++)x[I]!==v[I]&&(i.disableVertexAttribArray(I),x[I]=0)}function M(v,x,I,C,E,A,w){w===!0?i.vertexAttribIPointer(v,x,I,E,A):i.vertexAttribPointer(v,x,I,C,E,A)}function y(v,x,I,C){_();const E=C.attributes,A=I.getAttributes(),w=x.defaultAttributeValues;for(const F in A){const T=A[F];if(T.location>=0){let R=E[F];if(R===void 0&&(F==="instanceMatrix"&&v.instanceMatrix&&(R=v.instanceMatrix),F==="instanceColor"&&v.instanceColor&&(R=v.instanceColor)),R!==void 0){const k=R.normalized,G=R.itemSize,st=t.get(R);if(st===void 0)continue;const X=st.buffer,O=st.type,W=st.bytesPerElement,H=O===i.INT||O===i.UNSIGNED_INT||R.gpuType===fl;if(R.isInterleavedBufferAttribute){const K=R.data,ct=K.stride,mt=R.offset;if(K.isInstancedInterleavedBuffer){for(let ht=0;ht<T.locationSize;ht++)f(T.location+ht,K.meshPerAttribute);v.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ht=0;ht<T.locationSize;ht++)d(T.location+ht);i.bindBuffer(i.ARRAY_BUFFER,X);for(let ht=0;ht<T.locationSize;ht++)M(T.location+ht,G/T.locationSize,O,k,ct*W,(mt+G/T.locationSize*ht)*W,H)}else{if(R.isInstancedBufferAttribute){for(let K=0;K<T.locationSize;K++)f(T.location+K,R.meshPerAttribute);v.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let K=0;K<T.locationSize;K++)d(T.location+K);i.bindBuffer(i.ARRAY_BUFFER,X);for(let K=0;K<T.locationSize;K++)M(T.location+K,G/T.locationSize,O,k,G*W,G/T.locationSize*K*W,H)}}else if(w!==void 0){const k=w[F];if(k!==void 0)switch(k.length){case 2:i.vertexAttrib2fv(T.location,k);break;case 3:i.vertexAttrib3fv(T.location,k);break;case 4:i.vertexAttrib4fv(T.location,k);break;default:i.vertexAttrib1fv(T.location,k)}}}}S()}function B(){z();for(const v in n){const x=n[v];for(const I in x){const C=x[I];for(const E in C)h(C[E].object),delete C[E];delete x[I]}delete n[v]}}function D(v){if(n[v.id]===void 0)return;const x=n[v.id];for(const I in x){const C=x[I];for(const E in C)h(C[E].object),delete C[E];delete x[I]}delete n[v.id]}function P(v){for(const x in n){const I=n[x];if(I[v.id]===void 0)continue;const C=I[v.id];for(const E in C)h(C[E].object),delete C[E];delete I[v.id]}}function z(){et(),o=!0,r!==s&&(r=s,c(r.object))}function et(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:z,resetDefaultState:et,dispose:B,releaseStatesOfGeometry:D,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:d,disableUnusedAttributes:S}}function am(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,p){p!==0&&(i.drawArraysInstanced(n,c,h,p),e.update(h,n,p))}function a(c,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,p);let g=0;for(let u=0;u<p;u++)g+=h[u];e.update(g,n,1)}function l(c,h,p,m){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let u=0;u<c.length;u++)o(c[u],h[u],m[u]);else{g.multiDrawArraysInstancedWEBGL(n,c,0,h,0,m,0,p);let u=0;for(let _=0;_<p;_++)u+=h[_];for(let _=0;_<m.length;_++)e.update(u,n,m[_])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function lm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==En&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const z=P===rr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Zn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Yn&&!z)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const p=e.logarithmicDepthBuffer===!0,m=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(m===!0){const P=t.get("EXT_clip_control");P.clipControlEXT(P.LOWER_LEFT_EXT,P.ZERO_TO_ONE_EXT)}const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),B=u>0,D=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:p,reverseDepthBuffer:m,maxTextures:g,maxVertexTextures:u,maxTextureSize:_,maxCubemapSize:d,maxAttributes:f,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:B,maxSamples:D}}function cm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Ri,a=new se,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const g=p.length!==0||m||n!==0||s;return s=m,n=p.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,m){e=h(p,m,0)},this.setState=function(p,m,g){const u=p.clippingPlanes,_=p.clipIntersection,d=p.clipShadows,f=i.get(p);if(!s||u===null||u.length===0||r&&!d)r?h(null):c();else{const S=r?0:n,M=S*4;let y=f.clippingState||null;l.value=y,y=h(u,m,M,g);for(let B=0;B!==M;++B)y[B]=e[B];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,m,g,u){const _=p!==null?p.length:0;let d=null;if(_!==0){if(d=l.value,u!==!0||d===null){const f=g+_*4,S=m.matrixWorldInverse;a.getNormalMatrix(S),(d===null||d.length<f)&&(d=new Float32Array(f));for(let M=0,y=g;M!==_;++M,y+=4)o.copy(p[M]).applyMatrix4(S,a),o.normal.toArray(d,y),d[y+3]=o.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,d}}function hm(i){let t=new WeakMap;function e(o,a){return a===Ca?o.mapping=xs:a===Ra&&(o.mapping=ys),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ca||a===Ra)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Mf(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Gh extends zh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const us=4,hc=[.125,.215,.35,.446,.526,.582],Di=20,Jo=new Gh,uc=new ee;let jo=null,Qo=0,ta=0,ea=!1;const Pi=(1+Math.sqrt(5))/2,ss=1/Pi,dc=[new q(-Pi,ss,0),new q(Pi,ss,0),new q(-ss,0,Pi),new q(ss,0,Pi),new q(0,Pi,-ss),new q(0,Pi,ss),new q(-1,1,-1),new q(1,1,-1),new q(-1,1,1),new q(1,1,1)];class fc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(jo,Qo,ta),this._renderer.xr.enabled=ea,t.scissorTest=!1,Lr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:rr,format:En,colorSpace:xi,depthBuffer:!1},s=pc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=um(r)),this._blurMaterial=dm(r,t,e)}return s}_compileMaterial(t){const e=new Ee(this._lodPlanes[0],t);this._renderer.compile(e,Jo)}_sceneToCubeUV(t,e,n,s){const a=new Xe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,m=h.toneMapping;h.getClearColor(uc),h.toneMapping=pi,h.autoClear=!1;const g=new Tn({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),u=new Ee(new mi,g);let _=!1;const d=t.background;d?d.isColor&&(g.color.copy(d),t.background=null,_=!0):(g.color.copy(uc),_=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):S===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const M=this._cubeSize;Lr(s,S*M,f>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(u,a),h.render(t,a)}u.geometry.dispose(),u.material.dispose(),h.toneMapping=m,h.autoClear=p,t.background=d}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===xs||t.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ee(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Lr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Jo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=dc[(s-r-1)%dc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,p=new Ee(this._lodPlanes[s],c),m=c.uniforms,g=this._sizeLods[n]-1,u=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Di-1),_=r/u,d=isFinite(r)?1+Math.floor(h*_):Di;d>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Di}`);const f=[];let S=0;for(let P=0;P<Di;++P){const z=P/_,et=Math.exp(-z*z/2);f.push(et),P===0?S+=et:P<d&&(S+=2*et)}for(let P=0;P<f.length;P++)f[P]=f[P]/S;m.envMap.value=t.texture,m.samples.value=d,m.weights.value=f,m.latitudinal.value=o==="latitudinal",a&&(m.poleAxis.value=a);const{_lodMax:M}=this;m.dTheta.value=u,m.mipInt.value=M-n;const y=this._sizeLods[s],B=3*y*(s>M-us?s-M+us:0),D=4*(this._cubeSize-y);Lr(e,B,D,3*y,2*y),l.setRenderTarget(e),l.render(p,Jo)}}function um(i){const t=[],e=[],n=[];let s=i;const r=i-us+1+hc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-us?l=hc[o-i+us-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,p=1+c,m=[h,h,p,h,p,p,h,h,p,p,h,p],g=6,u=6,_=3,d=2,f=1,S=new Float32Array(_*u*g),M=new Float32Array(d*u*g),y=new Float32Array(f*u*g);for(let D=0;D<g;D++){const P=D%3*2/3-1,z=D>2?0:-1,et=[P,z,0,P+2/3,z,0,P+2/3,z+1,0,P,z,0,P+2/3,z+1,0,P,z+1,0];S.set(et,_*u*D),M.set(m,d*u*D);const v=[D,D,D,D,D,D];y.set(v,f*u*D)}const B=new Se;B.setAttribute("position",new Je(S,_)),B.setAttribute("uv",new Je(M,d)),B.setAttribute("faceIndex",new Je(y,f)),t.push(B),s>us&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function pc(i,t,e){const n=new ki(i,t,e);return n.texture.mapping=po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Lr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function dm(i,t,e){const n=new Float32Array(Di),s=new q(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function mc(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function gc(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ca||l===Ra,h=l===xs||l===ys;if(c||h){let p=t.get(a);const m=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==m)return e===null&&(e=new fc(i)),p=c?e.fromEquirectangular(a,p):e.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),p.texture;if(p!==void 0)return p.texture;{const g=a.image;return c&&g&&g.height>0||h&&g&&s(g)?(e===null&&(e=new fc(i)),p=c?e.fromEquirectangular(a):e.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function pm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Qr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mm(i,t,e,n){const s={},r=new WeakMap;function o(p){const m=p.target;m.index!==null&&t.remove(m.index);for(const u in m.attributes)t.remove(m.attributes[u]);for(const u in m.morphAttributes){const _=m.morphAttributes[u];for(let d=0,f=_.length;d<f;d++)t.remove(_[d])}m.removeEventListener("dispose",o),delete s[m.id];const g=r.get(m);g&&(t.remove(g),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function a(p,m){return s[m.id]===!0||(m.addEventListener("dispose",o),s[m.id]=!0,e.memory.geometries++),m}function l(p){const m=p.attributes;for(const u in m)t.update(m[u],i.ARRAY_BUFFER);const g=p.morphAttributes;for(const u in g){const _=g[u];for(let d=0,f=_.length;d<f;d++)t.update(_[d],i.ARRAY_BUFFER)}}function c(p){const m=[],g=p.index,u=p.attributes.position;let _=0;if(g!==null){const S=g.array;_=g.version;for(let M=0,y=S.length;M<y;M+=3){const B=S[M+0],D=S[M+1],P=S[M+2];m.push(B,D,D,P,P,B)}}else if(u!==void 0){const S=u.array;_=u.version;for(let M=0,y=S.length/3-1;M<y;M+=3){const B=M+0,D=M+1,P=M+2;m.push(B,D,D,P,P,B)}}else return;const d=new(Dh(m)?Oh:Fh)(m,1);d.version=_;const f=r.get(p);f&&t.remove(f),r.set(p,d)}function h(p){const m=r.get(p);if(m){const g=p.index;g!==null&&m.version<g.version&&c(p)}else c(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:h}}function gm(i,t,e){let n;function s(m){n=m}let r,o;function a(m){r=m.type,o=m.bytesPerElement}function l(m,g){i.drawElements(n,g,r,m*o),e.update(g,n,1)}function c(m,g,u){u!==0&&(i.drawElementsInstanced(n,g,r,m*o,u),e.update(g,n,u))}function h(m,g,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,g,0,r,m,0,u);let d=0;for(let f=0;f<u;f++)d+=g[f];e.update(d,n,1)}function p(m,g,u,_){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<m.length;f++)c(m[f]/o,g[f],_[f]);else{d.multiDrawElementsInstancedWEBGL(n,g,0,r,m,0,_,0,u);let f=0;for(let S=0;S<u;S++)f+=g[S];for(let S=0;S<_.length;S++)e.update(f,n,_[S])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function vm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function _m(i,t,e){const n=new WeakMap,s=new ve;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=h!==void 0?h.length:0;let m=n.get(a);if(m===void 0||m.count!==p){let v=function(){z.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var g=v;m!==void 0&&m.texture.dispose();const u=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let y=0;u===!0&&(y=1),_===!0&&(y=2),d===!0&&(y=3);let B=a.attributes.position.count*y,D=1;B>t.maxTextureSize&&(D=Math.ceil(B/t.maxTextureSize),B=t.maxTextureSize);const P=new Float32Array(B*D*4*p),z=new Nh(P,B,D,p);z.type=Yn,z.needsUpdate=!0;const et=y*4;for(let x=0;x<p;x++){const I=f[x],C=S[x],E=M[x],A=B*D*4*x;for(let w=0;w<I.count;w++){const F=w*et;u===!0&&(s.fromBufferAttribute(I,w),P[A+F+0]=s.x,P[A+F+1]=s.y,P[A+F+2]=s.z,P[A+F+3]=0),_===!0&&(s.fromBufferAttribute(C,w),P[A+F+4]=s.x,P[A+F+5]=s.y,P[A+F+6]=s.z,P[A+F+7]=0),d===!0&&(s.fromBufferAttribute(E,w),P[A+F+8]=s.x,P[A+F+9]=s.y,P[A+F+10]=s.z,P[A+F+11]=E.itemSize===4?s.w:1)}}m={count:p,texture:z,size:new Et(B,D)},n.set(a,m),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let u=0;for(let d=0;d<c.length;d++)u+=c[d];const _=a.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",m.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:r}}function xm(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,p=t.get(l,h);if(s.get(p)!==c&&(t.update(p),s.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==c&&(m.update(),s.set(m,c))}return p}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Vh extends Ze{constructor(t,e,n,s,r,o,a,l,c,h=gs){if(h!==gs&&h!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gs&&(n=zi),n===void 0&&h===Ss&&(n=Ms),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:vn,this.minFilter=l!==void 0?l:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Wh=new Ze,vc=new Vh(1,1),Xh=new Nh,qh=new rf,Yh=new kh,_c=[],xc=[],yc=new Float32Array(16),Mc=new Float32Array(9),Sc=new Float32Array(4);function As(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=_c[s];if(r===void 0&&(r=new Float32Array(s),_c[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vo(i,t){let e=xc[t];e===void 0&&(e=new Int32Array(t),xc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function ym(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Mm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function Sm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function wm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Sc.set(n),i.uniformMatrix2fv(this.addr,!1,Sc),Oe(e,n)}}function Em(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Mc.set(n),i.uniformMatrix3fv(this.addr,!1,Mc),Oe(e,n)}}function Tm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;yc.set(n),i.uniformMatrix4fv(this.addr,!1,yc),Oe(e,n)}}function Am(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function Rm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function Lm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function Im(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function Nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function Um(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(vc.compareFunction=Lh,r=vc):r=Wh,e.setTexture2D(t||r,s)}function Fm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||qh,s)}function Om(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Yh,s)}function Bm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Xh,s)}function zm(i){switch(i){case 5126:return ym;case 35664:return Mm;case 35665:return Sm;case 35666:return bm;case 35674:return wm;case 35675:return Em;case 35676:return Tm;case 5124:case 35670:return Am;case 35667:case 35671:return Cm;case 35668:case 35672:return Rm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Dm;case 36295:return Im;case 36296:return Nm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Bm}}function km(i,t){i.uniform1fv(this.addr,t)}function Hm(i,t){const e=As(t,this.size,2);i.uniform2fv(this.addr,e)}function Gm(i,t){const e=As(t,this.size,3);i.uniform3fv(this.addr,e)}function Vm(i,t){const e=As(t,this.size,4);i.uniform4fv(this.addr,e)}function Wm(i,t){const e=As(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Xm(i,t){const e=As(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function qm(i,t){const e=As(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ym(i,t){i.uniform1iv(this.addr,t)}function $m(i,t){i.uniform2iv(this.addr,t)}function Km(i,t){i.uniform3iv(this.addr,t)}function Zm(i,t){i.uniform4iv(this.addr,t)}function Jm(i,t){i.uniform1uiv(this.addr,t)}function jm(i,t){i.uniform2uiv(this.addr,t)}function Qm(i,t){i.uniform3uiv(this.addr,t)}function t1(i,t){i.uniform4uiv(this.addr,t)}function e1(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Wh,r[o])}function n1(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||qh,r[o])}function i1(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Yh,r[o])}function s1(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Xh,r[o])}function r1(i){switch(i){case 5126:return km;case 35664:return Hm;case 35665:return Gm;case 35666:return Vm;case 35674:return Wm;case 35675:return Xm;case 35676:return qm;case 5124:case 35670:return Ym;case 35667:case 35671:return $m;case 35668:case 35672:return Km;case 35669:case 35673:return Zm;case 5125:return Jm;case 36294:return jm;case 36295:return Qm;case 36296:return t1;case 35678:case 36198:case 36298:case 36306:case 35682:return e1;case 35679:case 36299:case 36307:return n1;case 35680:case 36300:case 36308:case 36293:return i1;case 36289:case 36303:case 36311:case 36292:return s1}}class o1{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=zm(e.type)}}class a1{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=r1(e.type)}}class l1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const na=/(\w+)(\])?(\[|\.)?/g;function bc(i,t){i.seq.push(t),i.map[t.id]=t}function c1(i,t,e){const n=i.name,s=n.length;for(na.lastIndex=0;;){const r=na.exec(n),o=na.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){bc(e,c===void 0?new o1(a,i,t):new a1(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new l1(a),bc(e,p)),e=p}}}class to{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);c1(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function wc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const h1=37297;let u1=0;function d1(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function f1(i){const t=ue.getPrimaries(ue.workingColorSpace),e=ue.getPrimaries(i);let n;switch(t===e?n="":t===ao&&e===oo?n="LinearDisplayP3ToLinearSRGB":t===oo&&e===ao&&(n="LinearSRGBToLinearDisplayP3"),i){case xi:case mo:return[n,"LinearTransferOETF"];case nn:case xl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ec(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+d1(i.getShaderSource(t),o)}else return s}function p1(i,t){const e=f1(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function m1(i,t){let e;switch(t){case Pd:e="Linear";break;case Ld:e="Reinhard";break;case Dd:e="Cineon";break;case Id:e="ACESFilmic";break;case Ud:e="AgX";break;case Fd:e="Neutral";break;case Nd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Dr=new q;function g1(){ue.getLuminanceCoefficients(Dr);const i=Dr.x.toFixed(4),t=Dr.y.toFixed(4),e=Dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xs).join(`
`)}function _1(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function x1(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Xs(i){return i!==""}function Tc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ac(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const y1=/^[ \t]*#include +<([\w\d./]+)>/gm;function ol(i){return i.replace(y1,S1)}const M1=new Map;function S1(i,t){let e=ie[t];if(e===void 0){const n=M1.get(t);if(n!==void 0)e=ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ol(e)}const b1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cc(i){return i.replace(b1,w1)}function w1(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Rc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function E1(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===gh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===vh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Vn&&(t="SHADOWMAP_TYPE_VSM"),t}function T1(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case xs:case ys:t="ENVMAP_TYPE_CUBE";break;case po:t="ENVMAP_TYPE_CUBE_UV";break}return t}function A1(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ys:t="ENVMAP_MODE_REFRACTION";break}return t}function C1(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case _h:t="ENVMAP_BLENDING_MULTIPLY";break;case Cd:t="ENVMAP_BLENDING_MIX";break;case Rd:t="ENVMAP_BLENDING_ADD";break}return t}function R1(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function P1(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=E1(e),c=T1(e),h=A1(e),p=C1(e),m=R1(e),g=v1(e),u=_1(r),_=s.createProgram();let d,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(Xs).join(`
`),d.length>0&&(d+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(Xs).join(`
`),f.length>0&&(f+=`
`)):(d=[Rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xs).join(`
`),f=[Rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==pi?"#define TONE_MAPPING":"",e.toneMapping!==pi?ie.tonemapping_pars_fragment:"",e.toneMapping!==pi?m1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,p1("linearToOutputTexel",e.outputColorSpace),g1(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xs).join(`
`)),o=ol(o),o=Tc(o,e),o=Ac(o,e),a=ol(a),a=Tc(a,e),a=Ac(a,e),o=Cc(o),a=Cc(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,d=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["#define varying in",e.glslVersion===ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=S+d+o,y=S+f+a,B=wc(s,s.VERTEX_SHADER,M),D=wc(s,s.FRAGMENT_SHADER,y);s.attachShader(_,B),s.attachShader(_,D),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(x){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(_).trim(),C=s.getShaderInfoLog(B).trim(),E=s.getShaderInfoLog(D).trim();let A=!0,w=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(A=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,B,D);else{const F=Ec(s,B,"vertex"),T=Ec(s,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+x.name+`
Material Type: `+x.type+`

Program Info Log: `+I+`
`+F+`
`+T)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(C===""||E==="")&&(w=!1);w&&(x.diagnostics={runnable:A,programLog:I,vertexShader:{log:C,prefix:d},fragmentShader:{log:E,prefix:f}})}s.deleteShader(B),s.deleteShader(D),z=new to(s,_),et=x1(s,_)}let z;this.getUniforms=function(){return z===void 0&&P(this),z};let et;this.getAttributes=function(){return et===void 0&&P(this),et};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,h1)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=u1++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=B,this.fragmentShader=D,this}let L1=0;class D1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new I1(t),e.set(t,n)),n}}class I1{constructor(t){this.id=L1++,this.code=t,this.usedTimes=0}}function N1(i,t,e,n,s,r,o){const a=new yl,l=new D1,c=new Set,h=[],p=s.logarithmicDepthBuffer,m=s.reverseDepthBuffer,g=s.vertexTextures;let u=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(v){return c.add(v),v===0?"uv":`uv${v}`}function f(v,x,I,C,E){const A=C.fog,w=E.geometry,F=v.isMeshStandardMaterial?C.environment:null,T=(v.isMeshStandardMaterial?e:t).get(v.envMap||F),R=T&&T.mapping===po?T.image.height:null,k=_[v.type];v.precision!==null&&(u=s.getMaxPrecision(v.precision),u!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const G=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,st=G!==void 0?G.length:0;let X=0;w.morphAttributes.position!==void 0&&(X=1),w.morphAttributes.normal!==void 0&&(X=2),w.morphAttributes.color!==void 0&&(X=3);let O,W,H,K;if(k){const Ie=Pn[k];O=Ie.vertexShader,W=Ie.fragmentShader}else O=v.vertexShader,W=v.fragmentShader,l.update(v),H=l.getVertexShaderID(v),K=l.getFragmentShaderID(v);const ct=i.getRenderTarget(),mt=E.isInstancedMesh===!0,ht=E.isBatchedMesh===!0,St=!!v.map,nt=!!v.matcap,N=!!T,lt=!!v.aoMap,ut=!!v.lightMap,gt=!!v.bumpMap,At=!!v.normalMap,Ot=!!v.displacementMap,_t=!!v.emissiveMap,U=!!v.metalnessMap,b=!!v.roughnessMap,j=v.anisotropy>0,dt=v.clearcoat>0,vt=v.dispersion>0,ft=v.iridescence>0,zt=v.sheen>0,Ct=v.transmission>0,Nt=j&&!!v.anisotropyMap,re=dt&&!!v.clearcoatMap,bt=dt&&!!v.clearcoatNormalMap,Ut=dt&&!!v.clearcoatRoughnessMap,qt=ft&&!!v.iridescenceMap,Yt=ft&&!!v.iridescenceThicknessMap,Bt=zt&&!!v.sheenColorMap,oe=zt&&!!v.sheenRoughnessMap,Kt=!!v.specularMap,me=!!v.specularColorMap,$=!!v.specularIntensityMap,Mt=Ct&&!!v.transmissionMap,tt=Ct&&!!v.thicknessMap,yt=!!v.gradientMap,Dt=!!v.alphaMap,Pt=v.alphaTest>0,Qt=!!v.alphaHash,pe=!!v.extensions;let Ce=pi;v.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(Ce=i.toneMapping);const te={shaderID:k,shaderType:v.type,shaderName:v.name,vertexShader:O,fragmentShader:W,defines:v.defines,customVertexShaderID:H,customFragmentShaderID:K,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:ht,batchingColor:ht&&E._colorsTexture!==null,instancing:mt,instancingColor:mt&&E.instanceColor!==null,instancingMorph:mt&&E.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:ct===null?i.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:xi,alphaToCoverage:!!v.alphaToCoverage,map:St,matcap:nt,envMap:N,envMapMode:N&&T.mapping,envMapCubeUVHeight:R,aoMap:lt,lightMap:ut,bumpMap:gt,normalMap:At,displacementMap:g&&Ot,emissiveMap:_t,normalMapObjectSpace:At&&v.normalMapType===kd,normalMapTangentSpace:At&&v.normalMapType===Ph,metalnessMap:U,roughnessMap:b,anisotropy:j,anisotropyMap:Nt,clearcoat:dt,clearcoatMap:re,clearcoatNormalMap:bt,clearcoatRoughnessMap:Ut,dispersion:vt,iridescence:ft,iridescenceMap:qt,iridescenceThicknessMap:Yt,sheen:zt,sheenColorMap:Bt,sheenRoughnessMap:oe,specularMap:Kt,specularColorMap:me,specularIntensityMap:$,transmission:Ct,transmissionMap:Mt,thicknessMap:tt,gradientMap:yt,opaque:v.transparent===!1&&v.blending===ms&&v.alphaToCoverage===!1,alphaMap:Dt,alphaTest:Pt,alphaHash:Qt,combine:v.combine,mapUv:St&&d(v.map.channel),aoMapUv:lt&&d(v.aoMap.channel),lightMapUv:ut&&d(v.lightMap.channel),bumpMapUv:gt&&d(v.bumpMap.channel),normalMapUv:At&&d(v.normalMap.channel),displacementMapUv:Ot&&d(v.displacementMap.channel),emissiveMapUv:_t&&d(v.emissiveMap.channel),metalnessMapUv:U&&d(v.metalnessMap.channel),roughnessMapUv:b&&d(v.roughnessMap.channel),anisotropyMapUv:Nt&&d(v.anisotropyMap.channel),clearcoatMapUv:re&&d(v.clearcoatMap.channel),clearcoatNormalMapUv:bt&&d(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ut&&d(v.clearcoatRoughnessMap.channel),iridescenceMapUv:qt&&d(v.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&d(v.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&d(v.sheenColorMap.channel),sheenRoughnessMapUv:oe&&d(v.sheenRoughnessMap.channel),specularMapUv:Kt&&d(v.specularMap.channel),specularColorMapUv:me&&d(v.specularColorMap.channel),specularIntensityMapUv:$&&d(v.specularIntensityMap.channel),transmissionMapUv:Mt&&d(v.transmissionMap.channel),thicknessMapUv:tt&&d(v.thicknessMap.channel),alphaMapUv:Dt&&d(v.alphaMap.channel),vertexTangents:!!w.attributes.tangent&&(At||j),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,pointsUvs:E.isPoints===!0&&!!w.attributes.uv&&(St||Dt),fog:!!A,useFog:v.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:m,skinning:E.isSkinnedMesh===!0,morphTargets:w.morphAttributes.position!==void 0,morphNormals:w.morphAttributes.normal!==void 0,morphColors:w.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:X,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ce,decodeVideoTexture:St&&v.map.isVideoTexture===!0&&ue.getTransfer(v.map.colorSpace)===Me,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===rn,flipSided:v.side===on,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:pe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&v.extensions.multiDraw===!0||ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return te.vertexUv1s=c.has(1),te.vertexUv2s=c.has(2),te.vertexUv3s=c.has(3),c.clear(),te}function S(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)x.push(I),x.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(M(x,v),y(x,v),x.push(i.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function M(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function y(v,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.alphaToCoverage&&a.enable(20),v.push(a.mask)}function B(v){const x=_[v.type];let I;if(x){const C=Pn[x];I=vf.clone(C.uniforms)}else I=v.uniforms;return I}function D(v,x){let I;for(let C=0,E=h.length;C<E;C++){const A=h[C];if(A.cacheKey===x){I=A,++I.usedTimes;break}}return I===void 0&&(I=new P1(i,x,v,r),h.push(I)),I}function P(v){if(--v.usedTimes===0){const x=h.indexOf(v);h[x]=h[h.length-1],h.pop(),v.destroy()}}function z(v){l.remove(v)}function et(){l.dispose()}return{getParameters:f,getProgramCacheKey:S,getUniforms:B,acquireProgram:D,releaseProgram:P,releaseShaderCache:z,programs:h,dispose:et}}function U1(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function F1(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Pc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Lc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p,m,g,u,_,d){let f=i[t];return f===void 0?(f={id:p.id,object:p,geometry:m,material:g,groupOrder:u,renderOrder:p.renderOrder,z:_,group:d},i[t]=f):(f.id=p.id,f.object=p,f.geometry=m,f.material=g,f.groupOrder=u,f.renderOrder=p.renderOrder,f.z=_,f.group=d),t++,f}function a(p,m,g,u,_,d){const f=o(p,m,g,u,_,d);g.transmission>0?n.push(f):g.transparent===!0?s.push(f):e.push(f)}function l(p,m,g,u,_,d){const f=o(p,m,g,u,_,d);g.transmission>0?n.unshift(f):g.transparent===!0?s.unshift(f):e.unshift(f)}function c(p,m){e.length>1&&e.sort(p||F1),n.length>1&&n.sort(m||Pc),s.length>1&&s.sort(m||Pc)}function h(){for(let p=t,m=i.length;p<m;p++){const g=i[p];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function O1(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Lc,i.set(n,[o])):s>=r.length?(o=new Lc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function B1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new q,color:new ee};break;case"SpotLight":e={position:new q,direction:new q,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new q,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new q,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new q,halfWidth:new q,halfHeight:new q};break}return i[t.id]=e,e}}}function z1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let k1=0;function H1(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function G1(i){const t=new B1,e=z1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new q);const s=new q,r=new de,o=new de;function a(c){let h=0,p=0,m=0;for(let et=0;et<9;et++)n.probe[et].set(0,0,0);let g=0,u=0,_=0,d=0,f=0,S=0,M=0,y=0,B=0,D=0,P=0;c.sort(H1);for(let et=0,v=c.length;et<v;et++){const x=c[et],I=x.color,C=x.intensity,E=x.distance,A=x.shadow&&x.shadow.map?x.shadow.map.texture:null;if(x.isAmbientLight)h+=I.r*C,p+=I.g*C,m+=I.b*C;else if(x.isLightProbe){for(let w=0;w<9;w++)n.probe[w].addScaledVector(x.sh.coefficients[w],C);P++}else if(x.isDirectionalLight){const w=t.get(x);if(w.color.copy(x.color).multiplyScalar(x.intensity),x.castShadow){const F=x.shadow,T=e.get(x);T.shadowIntensity=F.intensity,T.shadowBias=F.bias,T.shadowNormalBias=F.normalBias,T.shadowRadius=F.radius,T.shadowMapSize=F.mapSize,n.directionalShadow[g]=T,n.directionalShadowMap[g]=A,n.directionalShadowMatrix[g]=x.shadow.matrix,S++}n.directional[g]=w,g++}else if(x.isSpotLight){const w=t.get(x);w.position.setFromMatrixPosition(x.matrixWorld),w.color.copy(I).multiplyScalar(C),w.distance=E,w.coneCos=Math.cos(x.angle),w.penumbraCos=Math.cos(x.angle*(1-x.penumbra)),w.decay=x.decay,n.spot[_]=w;const F=x.shadow;if(x.map&&(n.spotLightMap[B]=x.map,B++,F.updateMatrices(x),x.castShadow&&D++),n.spotLightMatrix[_]=F.matrix,x.castShadow){const T=e.get(x);T.shadowIntensity=F.intensity,T.shadowBias=F.bias,T.shadowNormalBias=F.normalBias,T.shadowRadius=F.radius,T.shadowMapSize=F.mapSize,n.spotShadow[_]=T,n.spotShadowMap[_]=A,y++}_++}else if(x.isRectAreaLight){const w=t.get(x);w.color.copy(I).multiplyScalar(C),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),n.rectArea[d]=w,d++}else if(x.isPointLight){const w=t.get(x);if(w.color.copy(x.color).multiplyScalar(x.intensity),w.distance=x.distance,w.decay=x.decay,x.castShadow){const F=x.shadow,T=e.get(x);T.shadowIntensity=F.intensity,T.shadowBias=F.bias,T.shadowNormalBias=F.normalBias,T.shadowRadius=F.radius,T.shadowMapSize=F.mapSize,T.shadowCameraNear=F.camera.near,T.shadowCameraFar=F.camera.far,n.pointShadow[u]=T,n.pointShadowMap[u]=A,n.pointShadowMatrix[u]=x.shadow.matrix,M++}n.point[u]=w,u++}else if(x.isHemisphereLight){const w=t.get(x);w.skyColor.copy(x.color).multiplyScalar(C),w.groundColor.copy(x.groundColor).multiplyScalar(C),n.hemi[f]=w,f++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Lt.LTC_FLOAT_1,n.rectAreaLTC2=Lt.LTC_FLOAT_2):(n.rectAreaLTC1=Lt.LTC_HALF_1,n.rectAreaLTC2=Lt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=m;const z=n.hash;(z.directionalLength!==g||z.pointLength!==u||z.spotLength!==_||z.rectAreaLength!==d||z.hemiLength!==f||z.numDirectionalShadows!==S||z.numPointShadows!==M||z.numSpotShadows!==y||z.numSpotMaps!==B||z.numLightProbes!==P)&&(n.directional.length=g,n.spot.length=_,n.rectArea.length=d,n.point.length=u,n.hemi.length=f,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+B-D,n.spotLightMap.length=B,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=P,z.directionalLength=g,z.pointLength=u,z.spotLength=_,z.rectAreaLength=d,z.hemiLength=f,z.numDirectionalShadows=S,z.numPointShadows=M,z.numSpotShadows=y,z.numSpotMaps=B,z.numLightProbes=P,n.version=k1++)}function l(c,h){let p=0,m=0,g=0,u=0,_=0;const d=h.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const M=c[f];if(M.isDirectionalLight){const y=n.directional[p];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),p++}else if(M.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),g++}else if(M.isRectAreaLight){const y=n.rectArea[u];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),o.identity(),r.copy(M.matrixWorld),r.premultiply(d),o.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),u++}else if(M.isPointLight){const y=n.point[m];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),m++}else if(M.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(d),_++}}}return{setup:a,setupView:l,state:n}}function Dc(i){const t=new G1(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function V1(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Dc(i),t.set(s,[a])):r>=o.length?(a=new Dc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class W1 extends yi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class X1 extends yi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const q1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $1(i,t,e){let n=new Ml;const s=new Et,r=new Et,o=new ve,a=new W1({depthPacking:zd}),l=new X1,c={},h=e.maxTextureSize,p={[vi]:on,[on]:vi,[rn]:rn},m=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:q1,fragmentShader:Y1}),g=m.clone();g.defines.HORIZONTAL_PASS=1;const u=new Se;u.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ee(u,m),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gh;let f=this.type;this.render=function(D,P,z){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||D.length===0)return;const et=i.getRenderTarget(),v=i.getActiveCubeFace(),x=i.getActiveMipmapLevel(),I=i.state;I.setBlending(fi),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const C=f!==Vn&&this.type===Vn,E=f===Vn&&this.type!==Vn;for(let A=0,w=D.length;A<w;A++){const F=D[A],T=F.shadow;if(T===void 0){console.warn("THREE.WebGLShadowMap:",F,"has no shadow.");continue}if(T.autoUpdate===!1&&T.needsUpdate===!1)continue;s.copy(T.mapSize);const R=T.getFrameExtents();if(s.multiply(R),r.copy(T.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/R.x),s.x=r.x*R.x,T.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/R.y),s.y=r.y*R.y,T.mapSize.y=r.y)),T.map===null||C===!0||E===!0){const G=this.type!==Vn?{minFilter:vn,magFilter:vn}:{};T.map!==null&&T.map.dispose(),T.map=new ki(s.x,s.y,G),T.map.texture.name=F.name+".shadowMap",T.camera.updateProjectionMatrix()}i.setRenderTarget(T.map),i.clear();const k=T.getViewportCount();for(let G=0;G<k;G++){const st=T.getViewport(G);o.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),I.viewport(o),T.updateMatrices(F,G),n=T.getFrustum(),y(P,z,T.camera,F,this.type)}T.isPointLightShadow!==!0&&this.type===Vn&&S(T,z),T.needsUpdate=!1}f=this.type,d.needsUpdate=!1,i.setRenderTarget(et,v,x)};function S(D,P){const z=t.update(_);m.defines.VSM_SAMPLES!==D.blurSamples&&(m.defines.VSM_SAMPLES=D.blurSamples,g.defines.VSM_SAMPLES=D.blurSamples,m.needsUpdate=!0,g.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new ki(s.x,s.y)),m.uniforms.shadow_pass.value=D.map.texture,m.uniforms.resolution.value=D.mapSize,m.uniforms.radius.value=D.radius,i.setRenderTarget(D.mapPass),i.clear(),i.renderBufferDirect(P,null,z,m,_,null),g.uniforms.shadow_pass.value=D.mapPass.texture,g.uniforms.resolution.value=D.mapSize,g.uniforms.radius.value=D.radius,i.setRenderTarget(D.map),i.clear(),i.renderBufferDirect(P,null,z,g,_,null)}function M(D,P,z,et){let v=null;const x=z.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(x!==void 0)v=x;else if(v=z.isPointLight===!0?l:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const I=v.uuid,C=P.uuid;let E=c[I];E===void 0&&(E={},c[I]=E);let A=E[C];A===void 0&&(A=v.clone(),E[C]=A,P.addEventListener("dispose",B)),v=A}if(v.visible=P.visible,v.wireframe=P.wireframe,et===Vn?v.side=P.shadowSide!==null?P.shadowSide:P.side:v.side=P.shadowSide!==null?P.shadowSide:p[P.side],v.alphaMap=P.alphaMap,v.alphaTest=P.alphaTest,v.map=P.map,v.clipShadows=P.clipShadows,v.clippingPlanes=P.clippingPlanes,v.clipIntersection=P.clipIntersection,v.displacementMap=P.displacementMap,v.displacementScale=P.displacementScale,v.displacementBias=P.displacementBias,v.wireframeLinewidth=P.wireframeLinewidth,v.linewidth=P.linewidth,z.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const I=i.properties.get(v);I.light=z}return v}function y(D,P,z,et,v){if(D.visible===!1)return;if(D.layers.test(P.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&v===Vn)&&(!D.frustumCulled||n.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,D.matrixWorld);const C=t.update(D),E=D.material;if(Array.isArray(E)){const A=C.groups;for(let w=0,F=A.length;w<F;w++){const T=A[w],R=E[T.materialIndex];if(R&&R.visible){const k=M(D,R,et,v);D.onBeforeShadow(i,D,P,z,C,k,T),i.renderBufferDirect(z,null,C,k,D,T),D.onAfterShadow(i,D,P,z,C,k,T)}}}else if(E.visible){const A=M(D,E,et,v);D.onBeforeShadow(i,D,P,z,C,A,null),i.renderBufferDirect(z,null,C,A,D,null),D.onAfterShadow(i,D,P,z,C,A,null)}}const I=D.children;for(let C=0,E=I.length;C<E;C++)y(I[C],P,z,et,v)}function B(D){D.target.removeEventListener("dispose",B);for(const z in c){const et=c[z],v=D.target.uuid;v in et&&(et[v].dispose(),delete et[v])}}}const K1={[Ma]:Sa,[ba]:Ta,[wa]:Aa,[_s]:Ea,[Sa]:Ma,[Ta]:ba,[Aa]:wa,[Ea]:_s};function Z1(i){function t(){let $=!1;const Mt=new ve;let tt=null;const yt=new ve(0,0,0,0);return{setMask:function(Dt){tt!==Dt&&!$&&(i.colorMask(Dt,Dt,Dt,Dt),tt=Dt)},setLocked:function(Dt){$=Dt},setClear:function(Dt,Pt,Qt,pe,Ce){Ce===!0&&(Dt*=pe,Pt*=pe,Qt*=pe),Mt.set(Dt,Pt,Qt,pe),yt.equals(Mt)===!1&&(i.clearColor(Dt,Pt,Qt,pe),yt.copy(Mt))},reset:function(){$=!1,tt=null,yt.set(-1,0,0,0)}}}function e(){let $=!1,Mt=!1,tt=null,yt=null,Dt=null;return{setReversed:function(Pt){Mt=Pt},setTest:function(Pt){Pt?H(i.DEPTH_TEST):K(i.DEPTH_TEST)},setMask:function(Pt){tt!==Pt&&!$&&(i.depthMask(Pt),tt=Pt)},setFunc:function(Pt){if(Mt&&(Pt=K1[Pt]),yt!==Pt){switch(Pt){case Ma:i.depthFunc(i.NEVER);break;case Sa:i.depthFunc(i.ALWAYS);break;case ba:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case wa:i.depthFunc(i.EQUAL);break;case Ea:i.depthFunc(i.GEQUAL);break;case Ta:i.depthFunc(i.GREATER);break;case Aa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=Pt}},setLocked:function(Pt){$=Pt},setClear:function(Pt){Dt!==Pt&&(i.clearDepth(Pt),Dt=Pt)},reset:function(){$=!1,tt=null,yt=null,Dt=null}}}function n(){let $=!1,Mt=null,tt=null,yt=null,Dt=null,Pt=null,Qt=null,pe=null,Ce=null;return{setTest:function(te){$||(te?H(i.STENCIL_TEST):K(i.STENCIL_TEST))},setMask:function(te){Mt!==te&&!$&&(i.stencilMask(te),Mt=te)},setFunc:function(te,Ie,je){(tt!==te||yt!==Ie||Dt!==je)&&(i.stencilFunc(te,Ie,je),tt=te,yt=Ie,Dt=je)},setOp:function(te,Ie,je){(Pt!==te||Qt!==Ie||pe!==je)&&(i.stencilOp(te,Ie,je),Pt=te,Qt=Ie,pe=je)},setLocked:function(te){$=te},setClear:function(te){Ce!==te&&(i.clearStencil(te),Ce=te)},reset:function(){$=!1,Mt=null,tt=null,yt=null,Dt=null,Pt=null,Qt=null,pe=null,Ce=null}}}const s=new t,r=new e,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},p=new WeakMap,m=[],g=null,u=!1,_=null,d=null,f=null,S=null,M=null,y=null,B=null,D=new ee(0,0,0),P=0,z=!1,et=null,v=null,x=null,I=null,C=null;const E=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let A=!1,w=0;const F=i.getParameter(i.VERSION);F.indexOf("WebGL")!==-1?(w=parseFloat(/^WebGL (\d)/.exec(F)[1]),A=w>=1):F.indexOf("OpenGL ES")!==-1&&(w=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),A=w>=2);let T=null,R={};const k=i.getParameter(i.SCISSOR_BOX),G=i.getParameter(i.VIEWPORT),st=new ve().fromArray(k),X=new ve().fromArray(G);function O($,Mt,tt,yt){const Dt=new Uint8Array(4),Pt=i.createTexture();i.bindTexture($,Pt),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Qt=0;Qt<tt;Qt++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(Mt,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,Dt):i.texImage2D(Mt+Qt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Dt);return Pt}const W={};W[i.TEXTURE_2D]=O(i.TEXTURE_2D,i.TEXTURE_2D,1),W[i.TEXTURE_CUBE_MAP]=O(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[i.TEXTURE_2D_ARRAY]=O(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),W[i.TEXTURE_3D]=O(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),H(i.DEPTH_TEST),r.setFunc(_s),ut(!1),gt(Gl),H(i.CULL_FACE),N(fi);function H($){c[$]!==!0&&(i.enable($),c[$]=!0)}function K($){c[$]!==!1&&(i.disable($),c[$]=!1)}function ct($,Mt){return h[$]!==Mt?(i.bindFramebuffer($,Mt),h[$]=Mt,$===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Mt),$===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Mt),!0):!1}function mt($,Mt){let tt=m,yt=!1;if($){tt=p.get(Mt),tt===void 0&&(tt=[],p.set(Mt,tt));const Dt=$.textures;if(tt.length!==Dt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let Pt=0,Qt=Dt.length;Pt<Qt;Pt++)tt[Pt]=i.COLOR_ATTACHMENT0+Pt;tt.length=Dt.length,yt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,yt=!0);yt&&i.drawBuffers(tt)}function ht($){return g!==$?(i.useProgram($),g=$,!0):!1}const St={[Li]:i.FUNC_ADD,[ud]:i.FUNC_SUBTRACT,[dd]:i.FUNC_REVERSE_SUBTRACT};St[fd]=i.MIN,St[pd]=i.MAX;const nt={[md]:i.ZERO,[gd]:i.ONE,[vd]:i.SRC_COLOR,[xa]:i.SRC_ALPHA,[bd]:i.SRC_ALPHA_SATURATE,[Md]:i.DST_COLOR,[xd]:i.DST_ALPHA,[_d]:i.ONE_MINUS_SRC_COLOR,[ya]:i.ONE_MINUS_SRC_ALPHA,[Sd]:i.ONE_MINUS_DST_COLOR,[yd]:i.ONE_MINUS_DST_ALPHA,[wd]:i.CONSTANT_COLOR,[Ed]:i.ONE_MINUS_CONSTANT_COLOR,[Td]:i.CONSTANT_ALPHA,[Ad]:i.ONE_MINUS_CONSTANT_ALPHA};function N($,Mt,tt,yt,Dt,Pt,Qt,pe,Ce,te){if($===fi){u===!0&&(K(i.BLEND),u=!1);return}if(u===!1&&(H(i.BLEND),u=!0),$!==hd){if($!==_||te!==z){if((d!==Li||M!==Li)&&(i.blendEquation(i.FUNC_ADD),d=Li,M=Li),te)switch($){case ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gn:i.blendFunc(i.ONE,i.ONE);break;case Vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}f=null,S=null,y=null,B=null,D.set(0,0,0),P=0,_=$,z=te}return}Dt=Dt||Mt,Pt=Pt||tt,Qt=Qt||yt,(Mt!==d||Dt!==M)&&(i.blendEquationSeparate(St[Mt],St[Dt]),d=Mt,M=Dt),(tt!==f||yt!==S||Pt!==y||Qt!==B)&&(i.blendFuncSeparate(nt[tt],nt[yt],nt[Pt],nt[Qt]),f=tt,S=yt,y=Pt,B=Qt),(pe.equals(D)===!1||Ce!==P)&&(i.blendColor(pe.r,pe.g,pe.b,Ce),D.copy(pe),P=Ce),_=$,z=!1}function lt($,Mt){$.side===rn?K(i.CULL_FACE):H(i.CULL_FACE);let tt=$.side===on;Mt&&(tt=!tt),ut(tt),$.blending===ms&&$.transparent===!1?N(fi):N($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),r.setFunc($.depthFunc),r.setTest($.depthTest),r.setMask($.depthWrite),s.setMask($.colorWrite);const yt=$.stencilWrite;o.setTest(yt),yt&&(o.setMask($.stencilWriteMask),o.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),o.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),Ot($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?H(i.SAMPLE_ALPHA_TO_COVERAGE):K(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut($){et!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),et=$)}function gt($){$!==ld?(H(i.CULL_FACE),$!==v&&($===Gl?i.cullFace(i.BACK):$===cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):K(i.CULL_FACE),v=$}function At($){$!==x&&(A&&i.lineWidth($),x=$)}function Ot($,Mt,tt){$?(H(i.POLYGON_OFFSET_FILL),(I!==Mt||C!==tt)&&(i.polygonOffset(Mt,tt),I=Mt,C=tt)):K(i.POLYGON_OFFSET_FILL)}function _t($){$?H(i.SCISSOR_TEST):K(i.SCISSOR_TEST)}function U($){$===void 0&&($=i.TEXTURE0+E-1),T!==$&&(i.activeTexture($),T=$)}function b($,Mt,tt){tt===void 0&&(T===null?tt=i.TEXTURE0+E-1:tt=T);let yt=R[tt];yt===void 0&&(yt={type:void 0,texture:void 0},R[tt]=yt),(yt.type!==$||yt.texture!==Mt)&&(T!==tt&&(i.activeTexture(tt),T=tt),i.bindTexture($,Mt||W[$]),yt.type=$,yt.texture=Mt)}function j(){const $=R[T];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function dt(){try{i.compressedTexImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function vt(){try{i.compressedTexImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ft(){try{i.texSubImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function zt(){try{i.texSubImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Nt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function re(){try{i.texStorage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function bt(){try{i.texStorage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ut(){try{i.texImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function qt(){try{i.texImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Yt($){st.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),st.copy($))}function Bt($){X.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),X.copy($))}function oe($,Mt){let tt=l.get(Mt);tt===void 0&&(tt=new WeakMap,l.set(Mt,tt));let yt=tt.get($);yt===void 0&&(yt=i.getUniformBlockIndex(Mt,$.name),tt.set($,yt))}function Kt($,Mt){const yt=l.get(Mt).get($);a.get(Mt)!==yt&&(i.uniformBlockBinding(Mt,yt,$.__bindingPointIndex),a.set(Mt,yt))}function me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},T=null,R={},h={},p=new WeakMap,m=[],g=null,u=!1,_=null,d=null,f=null,S=null,M=null,y=null,B=null,D=new ee(0,0,0),P=0,z=!1,et=null,v=null,x=null,I=null,C=null,st.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:H,disable:K,bindFramebuffer:ct,drawBuffers:mt,useProgram:ht,setBlending:N,setMaterial:lt,setFlipSided:ut,setCullFace:gt,setLineWidth:At,setPolygonOffset:Ot,setScissorTest:_t,activeTexture:U,bindTexture:b,unbindTexture:j,compressedTexImage2D:dt,compressedTexImage3D:vt,texImage2D:Ut,texImage3D:qt,updateUBOMapping:oe,uniformBlockBinding:Kt,texStorage2D:re,texStorage3D:bt,texSubImage2D:ft,texSubImage3D:zt,compressedTexSubImage2D:Ct,compressedTexSubImage3D:Nt,scissor:Yt,viewport:Bt,reset:me}}function Ic(i,t,e,n){const s=J1(n);switch(e){case bh:return i*t;case Eh:return i*t;case Th:return i*t*2;case Ah:return i*t/s.components*s.byteLength;case gl:return i*t/s.components*s.byteLength;case Ch:return i*t*2/s.components*s.byteLength;case vl:return i*t*2/s.components*s.byteLength;case wh:return i*t*3/s.components*s.byteLength;case En:return i*t*4/s.components*s.byteLength;case _l:return i*t*4/s.components*s.byteLength;case Yr:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:case Ua:return Math.max(i,16)*Math.max(t,8)/4;case Da:case Na:return Math.max(i,8)*Math.max(t,8)/2;case Fa:case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case za:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case $a:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ja:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Jr:case Qa:case tl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Rh:case el:return Math.ceil(i/4)*Math.ceil(t/4)*8;case nl:case il:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function J1(i){switch(i){case Zn:case yh:return{byteLength:1,components:1};case Zs:case Mh:case rr:return{byteLength:2,components:1};case pl:case ml:return{byteLength:2,components:4};case zi:case fl:case Yn:return{byteLength:4,components:1};case Sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function j1(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,h=new WeakMap;let p;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function u(U,b){return g?new OffscreenCanvas(U,b):Js("canvas")}function _(U,b,j){let dt=1;const vt=_t(U);if((vt.width>j||vt.height>j)&&(dt=j/Math.max(vt.width,vt.height)),dt<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const ft=Math.floor(dt*vt.width),zt=Math.floor(dt*vt.height);p===void 0&&(p=u(ft,zt));const Ct=b?u(ft,zt):p;return Ct.width=ft,Ct.height=zt,Ct.getContext("2d").drawImage(U,0,0,ft,zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+vt.width+"x"+vt.height+") to ("+ft+"x"+zt+")."),Ct}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+vt.width+"x"+vt.height+")."),U;return U}function d(U){return U.generateMipmaps&&U.minFilter!==vn&&U.minFilter!==Sn}function f(U){i.generateMipmap(U)}function S(U,b,j,dt,vt=!1){if(U!==null){if(i[U]!==void 0)return i[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ft=b;if(b===i.RED&&(j===i.FLOAT&&(ft=i.R32F),j===i.HALF_FLOAT&&(ft=i.R16F),j===i.UNSIGNED_BYTE&&(ft=i.R8)),b===i.RED_INTEGER&&(j===i.UNSIGNED_BYTE&&(ft=i.R8UI),j===i.UNSIGNED_SHORT&&(ft=i.R16UI),j===i.UNSIGNED_INT&&(ft=i.R32UI),j===i.BYTE&&(ft=i.R8I),j===i.SHORT&&(ft=i.R16I),j===i.INT&&(ft=i.R32I)),b===i.RG&&(j===i.FLOAT&&(ft=i.RG32F),j===i.HALF_FLOAT&&(ft=i.RG16F),j===i.UNSIGNED_BYTE&&(ft=i.RG8)),b===i.RG_INTEGER&&(j===i.UNSIGNED_BYTE&&(ft=i.RG8UI),j===i.UNSIGNED_SHORT&&(ft=i.RG16UI),j===i.UNSIGNED_INT&&(ft=i.RG32UI),j===i.BYTE&&(ft=i.RG8I),j===i.SHORT&&(ft=i.RG16I),j===i.INT&&(ft=i.RG32I)),b===i.RGB_INTEGER&&(j===i.UNSIGNED_BYTE&&(ft=i.RGB8UI),j===i.UNSIGNED_SHORT&&(ft=i.RGB16UI),j===i.UNSIGNED_INT&&(ft=i.RGB32UI),j===i.BYTE&&(ft=i.RGB8I),j===i.SHORT&&(ft=i.RGB16I),j===i.INT&&(ft=i.RGB32I)),b===i.RGBA_INTEGER&&(j===i.UNSIGNED_BYTE&&(ft=i.RGBA8UI),j===i.UNSIGNED_SHORT&&(ft=i.RGBA16UI),j===i.UNSIGNED_INT&&(ft=i.RGBA32UI),j===i.BYTE&&(ft=i.RGBA8I),j===i.SHORT&&(ft=i.RGBA16I),j===i.INT&&(ft=i.RGBA32I)),b===i.RGB&&j===i.UNSIGNED_INT_5_9_9_9_REV&&(ft=i.RGB9_E5),b===i.RGBA){const zt=vt?ro:ue.getTransfer(dt);j===i.FLOAT&&(ft=i.RGBA32F),j===i.HALF_FLOAT&&(ft=i.RGBA16F),j===i.UNSIGNED_BYTE&&(ft=zt===Me?i.SRGB8_ALPHA8:i.RGBA8),j===i.UNSIGNED_SHORT_4_4_4_4&&(ft=i.RGBA4),j===i.UNSIGNED_SHORT_5_5_5_1&&(ft=i.RGB5_A1)}return(ft===i.R16F||ft===i.R32F||ft===i.RG16F||ft===i.RG32F||ft===i.RGBA16F||ft===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ft}function M(U,b){let j;return U?b===null||b===zi||b===Ms?j=i.DEPTH24_STENCIL8:b===Yn?j=i.DEPTH32F_STENCIL8:b===Zs&&(j=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===zi||b===Ms?j=i.DEPTH_COMPONENT24:b===Yn?j=i.DEPTH_COMPONENT32F:b===Zs&&(j=i.DEPTH_COMPONENT16),j}function y(U,b){return d(U)===!0||U.isFramebufferTexture&&U.minFilter!==vn&&U.minFilter!==Sn?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function B(U){const b=U.target;b.removeEventListener("dispose",B),P(b),b.isVideoTexture&&h.delete(b)}function D(U){const b=U.target;b.removeEventListener("dispose",D),et(b)}function P(U){const b=n.get(U);if(b.__webglInit===void 0)return;const j=U.source,dt=m.get(j);if(dt){const vt=dt[b.__cacheKey];vt.usedTimes--,vt.usedTimes===0&&z(U),Object.keys(dt).length===0&&m.delete(j)}n.remove(U)}function z(U){const b=n.get(U);i.deleteTexture(b.__webglTexture);const j=U.source,dt=m.get(j);delete dt[b.__cacheKey],o.memory.textures--}function et(U){const b=n.get(U);if(U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(b.__webglFramebuffer[dt]))for(let vt=0;vt<b.__webglFramebuffer[dt].length;vt++)i.deleteFramebuffer(b.__webglFramebuffer[dt][vt]);else i.deleteFramebuffer(b.__webglFramebuffer[dt]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[dt])}else{if(Array.isArray(b.__webglFramebuffer))for(let dt=0;dt<b.__webglFramebuffer.length;dt++)i.deleteFramebuffer(b.__webglFramebuffer[dt]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let dt=0;dt<b.__webglColorRenderbuffer.length;dt++)b.__webglColorRenderbuffer[dt]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[dt]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const j=U.textures;for(let dt=0,vt=j.length;dt<vt;dt++){const ft=n.get(j[dt]);ft.__webglTexture&&(i.deleteTexture(ft.__webglTexture),o.memory.textures--),n.remove(j[dt])}n.remove(U)}let v=0;function x(){v=0}function I(){const U=v;return U>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+s.maxTextures),v+=1,U}function C(U){const b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function E(U,b){const j=n.get(U);if(U.isVideoTexture&&At(U),U.isRenderTargetTexture===!1&&U.version>0&&j.__version!==U.version){const dt=U.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(j,U,b);return}}e.bindTexture(i.TEXTURE_2D,j.__webglTexture,i.TEXTURE0+b)}function A(U,b){const j=n.get(U);if(U.version>0&&j.__version!==U.version){X(j,U,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,j.__webglTexture,i.TEXTURE0+b)}function w(U,b){const j=n.get(U);if(U.version>0&&j.__version!==U.version){X(j,U,b);return}e.bindTexture(i.TEXTURE_3D,j.__webglTexture,i.TEXTURE0+b)}function F(U,b){const j=n.get(U);if(U.version>0&&j.__version!==U.version){O(j,U,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture,i.TEXTURE0+b)}const T={[Pa]:i.REPEAT,[Ni]:i.CLAMP_TO_EDGE,[La]:i.MIRRORED_REPEAT},R={[vn]:i.NEAREST,[Od]:i.NEAREST_MIPMAP_NEAREST,[dr]:i.NEAREST_MIPMAP_LINEAR,[Sn]:i.LINEAR,[Co]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},k={[Hd]:i.NEVER,[Yd]:i.ALWAYS,[Gd]:i.LESS,[Lh]:i.LEQUAL,[Vd]:i.EQUAL,[qd]:i.GEQUAL,[Wd]:i.GREATER,[Xd]:i.NOTEQUAL};function G(U,b){if(b.type===Yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Sn||b.magFilter===Co||b.magFilter===dr||b.magFilter===Ui||b.minFilter===Sn||b.minFilter===Co||b.minFilter===dr||b.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(U,i.TEXTURE_WRAP_S,T[b.wrapS]),i.texParameteri(U,i.TEXTURE_WRAP_T,T[b.wrapT]),(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)&&i.texParameteri(U,i.TEXTURE_WRAP_R,T[b.wrapR]),i.texParameteri(U,i.TEXTURE_MAG_FILTER,R[b.magFilter]),i.texParameteri(U,i.TEXTURE_MIN_FILTER,R[b.minFilter]),b.compareFunction&&(i.texParameteri(U,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(U,i.TEXTURE_COMPARE_FUNC,k[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===vn||b.minFilter!==dr&&b.minFilter!==Ui||b.type===Yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const j=t.get("EXT_texture_filter_anisotropic");i.texParameterf(U,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function st(U,b){let j=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",B));const dt=b.source;let vt=m.get(dt);vt===void 0&&(vt={},m.set(dt,vt));const ft=C(b);if(ft!==U.__cacheKey){vt[ft]===void 0&&(vt[ft]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,j=!0),vt[ft].usedTimes++;const zt=vt[U.__cacheKey];zt!==void 0&&(vt[U.__cacheKey].usedTimes--,zt.usedTimes===0&&z(b)),U.__cacheKey=ft,U.__webglTexture=vt[ft].texture}return j}function X(U,b,j){let dt=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(dt=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(dt=i.TEXTURE_3D);const vt=st(U,b),ft=b.source;e.bindTexture(dt,U.__webglTexture,i.TEXTURE0+j);const zt=n.get(ft);if(ft.version!==zt.__version||vt===!0){e.activeTexture(i.TEXTURE0+j);const Ct=ue.getPrimaries(ue.workingColorSpace),Nt=b.colorSpace===ui?null:ue.getPrimaries(b.colorSpace),re=b.colorSpace===ui||Ct===Nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let bt=_(b.image,!1,s.maxTextureSize);bt=Ot(b,bt);const Ut=r.convert(b.format,b.colorSpace),qt=r.convert(b.type);let Yt=S(b.internalFormat,Ut,qt,b.colorSpace,b.isVideoTexture);G(dt,b);let Bt;const oe=b.mipmaps,Kt=b.isVideoTexture!==!0,me=zt.__version===void 0||vt===!0,$=ft.dataReady,Mt=y(b,bt);if(b.isDepthTexture)Yt=M(b.format===Ss,b.type),me&&(Kt?e.texStorage2D(i.TEXTURE_2D,1,Yt,bt.width,bt.height):e.texImage2D(i.TEXTURE_2D,0,Yt,bt.width,bt.height,0,Ut,qt,null));else if(b.isDataTexture)if(oe.length>0){Kt&&me&&e.texStorage2D(i.TEXTURE_2D,Mt,Yt,oe[0].width,oe[0].height);for(let tt=0,yt=oe.length;tt<yt;tt++)Bt=oe[tt],Kt?$&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,Bt.width,Bt.height,Ut,qt,Bt.data):e.texImage2D(i.TEXTURE_2D,tt,Yt,Bt.width,Bt.height,0,Ut,qt,Bt.data);b.generateMipmaps=!1}else Kt?(me&&e.texStorage2D(i.TEXTURE_2D,Mt,Yt,bt.width,bt.height),$&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt.width,bt.height,Ut,qt,bt.data)):e.texImage2D(i.TEXTURE_2D,0,Yt,bt.width,bt.height,0,Ut,qt,bt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Kt&&me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Yt,oe[0].width,oe[0].height,bt.depth);for(let tt=0,yt=oe.length;tt<yt;tt++)if(Bt=oe[tt],b.format!==En)if(Ut!==null)if(Kt){if($)if(b.layerUpdates.size>0){const Dt=Ic(Bt.width,Bt.height,b.format,b.type);for(const Pt of b.layerUpdates){const Qt=Bt.data.subarray(Pt*Dt/Bt.data.BYTES_PER_ELEMENT,(Pt+1)*Dt/Bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Pt,Bt.width,Bt.height,1,Ut,Qt,0,0)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,Bt.width,Bt.height,bt.depth,Ut,Bt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,Yt,Bt.width,Bt.height,bt.depth,0,Bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?$&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,Bt.width,Bt.height,bt.depth,Ut,qt,Bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,Yt,Bt.width,Bt.height,bt.depth,0,Ut,qt,Bt.data)}else{Kt&&me&&e.texStorage2D(i.TEXTURE_2D,Mt,Yt,oe[0].width,oe[0].height);for(let tt=0,yt=oe.length;tt<yt;tt++)Bt=oe[tt],b.format!==En?Ut!==null?Kt?$&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,Bt.width,Bt.height,Ut,Bt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,Yt,Bt.width,Bt.height,0,Bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?$&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,Bt.width,Bt.height,Ut,qt,Bt.data):e.texImage2D(i.TEXTURE_2D,tt,Yt,Bt.width,Bt.height,0,Ut,qt,Bt.data)}else if(b.isDataArrayTexture)if(Kt){if(me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Yt,bt.width,bt.height,bt.depth),$)if(b.layerUpdates.size>0){const tt=Ic(bt.width,bt.height,b.format,b.type);for(const yt of b.layerUpdates){const Dt=bt.data.subarray(yt*tt/bt.data.BYTES_PER_ELEMENT,(yt+1)*tt/bt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,yt,bt.width,bt.height,1,Ut,qt,Dt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,bt.width,bt.height,bt.depth,Ut,qt,bt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Yt,bt.width,bt.height,bt.depth,0,Ut,qt,bt.data);else if(b.isData3DTexture)Kt?(me&&e.texStorage3D(i.TEXTURE_3D,Mt,Yt,bt.width,bt.height,bt.depth),$&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,bt.width,bt.height,bt.depth,Ut,qt,bt.data)):e.texImage3D(i.TEXTURE_3D,0,Yt,bt.width,bt.height,bt.depth,0,Ut,qt,bt.data);else if(b.isFramebufferTexture){if(me)if(Kt)e.texStorage2D(i.TEXTURE_2D,Mt,Yt,bt.width,bt.height);else{let tt=bt.width,yt=bt.height;for(let Dt=0;Dt<Mt;Dt++)e.texImage2D(i.TEXTURE_2D,Dt,Yt,tt,yt,0,Ut,qt,null),tt>>=1,yt>>=1}}else if(oe.length>0){if(Kt&&me){const tt=_t(oe[0]);e.texStorage2D(i.TEXTURE_2D,Mt,Yt,tt.width,tt.height)}for(let tt=0,yt=oe.length;tt<yt;tt++)Bt=oe[tt],Kt?$&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,Ut,qt,Bt):e.texImage2D(i.TEXTURE_2D,tt,Yt,Ut,qt,Bt);b.generateMipmaps=!1}else if(Kt){if(me){const tt=_t(bt);e.texStorage2D(i.TEXTURE_2D,Mt,Yt,tt.width,tt.height)}$&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ut,qt,bt)}else e.texImage2D(i.TEXTURE_2D,0,Yt,Ut,qt,bt);d(b)&&f(dt),zt.__version=ft.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function O(U,b,j){if(b.image.length!==6)return;const dt=st(U,b),vt=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+j);const ft=n.get(vt);if(vt.version!==ft.__version||dt===!0){e.activeTexture(i.TEXTURE0+j);const zt=ue.getPrimaries(ue.workingColorSpace),Ct=b.colorSpace===ui?null:ue.getPrimaries(b.colorSpace),Nt=b.colorSpace===ui||zt===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);const re=b.isCompressedTexture||b.image[0].isCompressedTexture,bt=b.image[0]&&b.image[0].isDataTexture,Ut=[];for(let yt=0;yt<6;yt++)!re&&!bt?Ut[yt]=_(b.image[yt],!0,s.maxCubemapSize):Ut[yt]=bt?b.image[yt].image:b.image[yt],Ut[yt]=Ot(b,Ut[yt]);const qt=Ut[0],Yt=r.convert(b.format,b.colorSpace),Bt=r.convert(b.type),oe=S(b.internalFormat,Yt,Bt,b.colorSpace),Kt=b.isVideoTexture!==!0,me=ft.__version===void 0||dt===!0,$=vt.dataReady;let Mt=y(b,qt);G(i.TEXTURE_CUBE_MAP,b);let tt;if(re){Kt&&me&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,oe,qt.width,qt.height);for(let yt=0;yt<6;yt++){tt=Ut[yt].mipmaps;for(let Dt=0;Dt<tt.length;Dt++){const Pt=tt[Dt];b.format!==En?Yt!==null?Kt?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt,0,0,Pt.width,Pt.height,Yt,Pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt,oe,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt,0,0,Pt.width,Pt.height,Yt,Bt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt,oe,Pt.width,Pt.height,0,Yt,Bt,Pt.data)}}}else{if(tt=b.mipmaps,Kt&&me){tt.length>0&&Mt++;const yt=_t(Ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,oe,yt.width,yt.height)}for(let yt=0;yt<6;yt++)if(bt){Kt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Ut[yt].width,Ut[yt].height,Yt,Bt,Ut[yt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,oe,Ut[yt].width,Ut[yt].height,0,Yt,Bt,Ut[yt].data);for(let Dt=0;Dt<tt.length;Dt++){const Qt=tt[Dt].image[yt].image;Kt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt+1,0,0,Qt.width,Qt.height,Yt,Bt,Qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt+1,oe,Qt.width,Qt.height,0,Yt,Bt,Qt.data)}}else{Kt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Yt,Bt,Ut[yt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,oe,Yt,Bt,Ut[yt]);for(let Dt=0;Dt<tt.length;Dt++){const Pt=tt[Dt];Kt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt+1,0,0,Yt,Bt,Pt.image[yt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt+1,oe,Yt,Bt,Pt.image[yt])}}}d(b)&&f(i.TEXTURE_CUBE_MAP),ft.__version=vt.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function W(U,b,j,dt,vt,ft){const zt=r.convert(j.format,j.colorSpace),Ct=r.convert(j.type),Nt=S(j.internalFormat,zt,Ct,j.colorSpace);if(!n.get(b).__hasExternalTextures){const bt=Math.max(1,b.width>>ft),Ut=Math.max(1,b.height>>ft);vt===i.TEXTURE_3D||vt===i.TEXTURE_2D_ARRAY?e.texImage3D(vt,ft,Nt,bt,Ut,b.depth,0,zt,Ct,null):e.texImage2D(vt,ft,Nt,bt,Ut,0,zt,Ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,U),gt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,vt,n.get(j).__webglTexture,0,ut(b)):(vt===i.TEXTURE_2D||vt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&vt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,dt,vt,n.get(j).__webglTexture,ft),e.bindFramebuffer(i.FRAMEBUFFER,null)}function H(U,b,j){if(i.bindRenderbuffer(i.RENDERBUFFER,U),b.depthBuffer){const dt=b.depthTexture,vt=dt&&dt.isDepthTexture?dt.type:null,ft=M(b.stencilBuffer,vt),zt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=ut(b);gt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ct,ft,b.width,b.height):j?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,ft,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ft,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,zt,i.RENDERBUFFER,U)}else{const dt=b.textures;for(let vt=0;vt<dt.length;vt++){const ft=dt[vt],zt=r.convert(ft.format,ft.colorSpace),Ct=r.convert(ft.type),Nt=S(ft.internalFormat,zt,Ct,ft.colorSpace),re=ut(b);j&&gt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,Nt,b.width,b.height):gt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,Nt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Nt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function K(U,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),E(b.depthTexture,0);const dt=n.get(b.depthTexture).__webglTexture,vt=ut(b);if(b.depthTexture.format===gs)gt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,dt,0,vt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,dt,0);else if(b.depthTexture.format===Ss)gt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,dt,0,vt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,dt,0);else throw new Error("Unknown depthTexture format")}function ct(U){const b=n.get(U),j=U.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==U.depthTexture){const dt=U.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),dt){const vt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,dt.removeEventListener("dispose",vt)};dt.addEventListener("dispose",vt),b.__depthDisposeCallback=vt}b.__boundDepthTexture=dt}if(U.depthTexture&&!b.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");K(b.__webglFramebuffer,U)}else if(j){b.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[dt]),b.__webglDepthbuffer[dt]===void 0)b.__webglDepthbuffer[dt]=i.createRenderbuffer(),H(b.__webglDepthbuffer[dt],U,!1);else{const vt=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=b.__webglDepthbuffer[dt];i.bindRenderbuffer(i.RENDERBUFFER,ft),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,ft)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),H(b.__webglDepthbuffer,U,!1);else{const dt=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,vt),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,vt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(U,b,j){const dt=n.get(U);b!==void 0&&W(dt.__webglFramebuffer,U,U.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),j!==void 0&&ct(U)}function ht(U){const b=U.texture,j=n.get(U),dt=n.get(b);U.addEventListener("dispose",D);const vt=U.textures,ft=U.isWebGLCubeRenderTarget===!0,zt=vt.length>1;if(zt||(dt.__webglTexture===void 0&&(dt.__webglTexture=i.createTexture()),dt.__version=b.version,o.memory.textures++),ft){j.__webglFramebuffer=[];for(let Ct=0;Ct<6;Ct++)if(b.mipmaps&&b.mipmaps.length>0){j.__webglFramebuffer[Ct]=[];for(let Nt=0;Nt<b.mipmaps.length;Nt++)j.__webglFramebuffer[Ct][Nt]=i.createFramebuffer()}else j.__webglFramebuffer[Ct]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){j.__webglFramebuffer=[];for(let Ct=0;Ct<b.mipmaps.length;Ct++)j.__webglFramebuffer[Ct]=i.createFramebuffer()}else j.__webglFramebuffer=i.createFramebuffer();if(zt)for(let Ct=0,Nt=vt.length;Ct<Nt;Ct++){const re=n.get(vt[Ct]);re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture(),o.memory.textures++)}if(U.samples>0&&gt(U)===!1){j.__webglMultisampledFramebuffer=i.createFramebuffer(),j.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let Ct=0;Ct<vt.length;Ct++){const Nt=vt[Ct];j.__webglColorRenderbuffer[Ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,j.__webglColorRenderbuffer[Ct]);const re=r.convert(Nt.format,Nt.colorSpace),bt=r.convert(Nt.type),Ut=S(Nt.internalFormat,re,bt,Nt.colorSpace,U.isXRRenderTarget===!0),qt=ut(U);i.renderbufferStorageMultisample(i.RENDERBUFFER,qt,Ut,U.width,U.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,j.__webglColorRenderbuffer[Ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),U.depthBuffer&&(j.__webglDepthRenderbuffer=i.createRenderbuffer(),H(j.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ft){e.bindTexture(i.TEXTURE_CUBE_MAP,dt.__webglTexture),G(i.TEXTURE_CUBE_MAP,b);for(let Ct=0;Ct<6;Ct++)if(b.mipmaps&&b.mipmaps.length>0)for(let Nt=0;Nt<b.mipmaps.length;Nt++)W(j.__webglFramebuffer[Ct][Nt],U,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,Nt);else W(j.__webglFramebuffer[Ct],U,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0);d(b)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(zt){for(let Ct=0,Nt=vt.length;Ct<Nt;Ct++){const re=vt[Ct],bt=n.get(re);e.bindTexture(i.TEXTURE_2D,bt.__webglTexture),G(i.TEXTURE_2D,re),W(j.__webglFramebuffer,U,re,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,0),d(re)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let Ct=i.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ct=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Ct,dt.__webglTexture),G(Ct,b),b.mipmaps&&b.mipmaps.length>0)for(let Nt=0;Nt<b.mipmaps.length;Nt++)W(j.__webglFramebuffer[Nt],U,b,i.COLOR_ATTACHMENT0,Ct,Nt);else W(j.__webglFramebuffer,U,b,i.COLOR_ATTACHMENT0,Ct,0);d(b)&&f(Ct),e.unbindTexture()}U.depthBuffer&&ct(U)}function St(U){const b=U.textures;for(let j=0,dt=b.length;j<dt;j++){const vt=b[j];if(d(vt)){const ft=U.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,zt=n.get(vt).__webglTexture;e.bindTexture(ft,zt),f(ft),e.unbindTexture()}}}const nt=[],N=[];function lt(U){if(U.samples>0){if(gt(U)===!1){const b=U.textures,j=U.width,dt=U.height;let vt=i.COLOR_BUFFER_BIT;const ft=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,zt=n.get(U),Ct=b.length>1;if(Ct)for(let Nt=0;Nt<b.length;Nt++)e.bindFramebuffer(i.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,zt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,zt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,zt.__webglFramebuffer);for(let Nt=0;Nt<b.length;Nt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(vt|=i.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(vt|=i.STENCIL_BUFFER_BIT)),Ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,zt.__webglColorRenderbuffer[Nt]);const re=n.get(b[Nt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,j,dt,0,0,j,dt,vt,i.NEAREST),l===!0&&(nt.length=0,N.length=0,nt.push(i.COLOR_ATTACHMENT0+Nt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(nt.push(ft),N.push(ft),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Ct)for(let Nt=0;Nt<b.length;Nt++){e.bindFramebuffer(i.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,zt.__webglColorRenderbuffer[Nt]);const re=n.get(b[Nt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,zt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,re,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,zt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){const b=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ut(U){return Math.min(s.maxSamples,U.samples)}function gt(U){const b=n.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function At(U){const b=o.render.frame;h.get(U)!==b&&(h.set(U,b),U.update())}function Ot(U,b){const j=U.colorSpace,dt=U.format,vt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||j!==xi&&j!==ui&&(ue.getTransfer(j)===Me?(dt!==En||vt!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),b}function _t(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=x,this.setTexture2D=E,this.setTexture2DArray=A,this.setTexture3D=w,this.setTextureCube=F,this.rebindTextures=mt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=W,this.useMultisampledRTT=gt}function Q1(i,t){function e(n,s=ui){let r;const o=ue.getTransfer(s);if(n===Zn)return i.UNSIGNED_BYTE;if(n===pl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ml)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yh)return i.BYTE;if(n===Mh)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===fl)return i.INT;if(n===zi)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===rr)return i.HALF_FLOAT;if(n===bh)return i.ALPHA;if(n===wh)return i.RGB;if(n===En)return i.RGBA;if(n===Eh)return i.LUMINANCE;if(n===Th)return i.LUMINANCE_ALPHA;if(n===gs)return i.DEPTH_COMPONENT;if(n===Ss)return i.DEPTH_STENCIL;if(n===Ah)return i.RED;if(n===gl)return i.RED_INTEGER;if(n===Ch)return i.RG;if(n===vl)return i.RG_INTEGER;if(n===_l)return i.RGBA_INTEGER;if(n===Yr||n===$r||n===Kr||n===Zr)if(o===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Da||n===Ia||n===Na||n===Ua)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Da)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fa||n===Oa||n===Ba)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Fa||n===Oa)return o===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ba)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===za||n===ka||n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya||n===$a||n===Ka||n===Za||n===Ja||n===ja)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===za)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ka)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ha)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ga)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Va)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wa)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xa)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qa)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ya)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$a)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ka)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Za)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ja)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Jr||n===Qa||n===tl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Jr)return o===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rh||n===el||n===nl||n===il)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Jr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===nl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class tg extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class _n extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const eg={type:"move"};class ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const d=e.getJointPose(_,n),f=this._getHandJoint(c,_);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}const h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],m=h.position.distanceTo(p.position),g=.02,u=.005;c.inputState.pinching&&m>g+u?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&m<=g-u&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(eg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const ng=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ig=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ze,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new _i({vertexShader:ng,fragmentShader:ig,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ee(new Hi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rg extends Es{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,p=null,m=null,g=null,u=null;const _=new sg,d=e.getContextAttributes();let f=null,S=null;const M=[],y=[],B=new Et;let D=null;const P=new Xe;P.layers.enable(1),P.viewport=new ve;const z=new Xe;z.layers.enable(2),z.viewport=new ve;const et=[P,z],v=new tg;v.layers.enable(1),v.layers.enable(2);let x=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let W=M[O];return W===void 0&&(W=new ia,M[O]=W),W.getTargetRaySpace()},this.getControllerGrip=function(O){let W=M[O];return W===void 0&&(W=new ia,M[O]=W),W.getGripSpace()},this.getHand=function(O){let W=M[O];return W===void 0&&(W=new ia,M[O]=W),W.getHandSpace()};function C(O){const W=y.indexOf(O.inputSource);if(W===-1)return;const H=M[W];H!==void 0&&(H.update(O.inputSource,O.frame,c||o),H.dispatchEvent({type:O.type,data:O.inputSource}))}function E(){s.removeEventListener("select",C),s.removeEventListener("selectstart",C),s.removeEventListener("selectend",C),s.removeEventListener("squeeze",C),s.removeEventListener("squeezestart",C),s.removeEventListener("squeezeend",C),s.removeEventListener("end",E),s.removeEventListener("inputsourceschange",A);for(let O=0;O<M.length;O++){const W=y[O];W!==null&&(y[O]=null,M[O].disconnect(W))}x=null,I=null,_.reset(),t.setRenderTarget(f),g=null,m=null,p=null,s=null,S=null,X.stop(),n.isPresenting=!1,t.setPixelRatio(D),t.setSize(B.width,B.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return m!==null?m:g},this.getBinding=function(){return p},this.getFrame=function(){return u},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",C),s.addEventListener("selectstart",C),s.addEventListener("selectend",C),s.addEventListener("squeeze",C),s.addEventListener("squeezestart",C),s.addEventListener("squeezeend",C),s.addEventListener("end",E),s.addEventListener("inputsourceschange",A),d.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(B),s.renderState.layers===void 0){const W={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,W),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new ki(g.framebufferWidth,g.framebufferHeight,{format:En,type:Zn,colorSpace:t.outputColorSpace,stencilBuffer:d.stencil})}else{let W=null,H=null,K=null;d.depth&&(K=d.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,W=d.stencil?Ss:gs,H=d.stencil?Ms:zi);const ct={colorFormat:e.RGBA8,depthFormat:K,scaleFactor:r};p=new XRWebGLBinding(s,e),m=p.createProjectionLayer(ct),s.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),S=new ki(m.textureWidth,m.textureHeight,{format:En,type:Zn,depthTexture:new Vh(m.textureWidth,m.textureHeight,H,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:d.stencil,colorSpace:t.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),X.setContext(s),X.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function A(O){for(let W=0;W<O.removed.length;W++){const H=O.removed[W],K=y.indexOf(H);K>=0&&(y[K]=null,M[K].disconnect(H))}for(let W=0;W<O.added.length;W++){const H=O.added[W];let K=y.indexOf(H);if(K===-1){for(let mt=0;mt<M.length;mt++)if(mt>=y.length){y.push(H),K=mt;break}else if(y[mt]===null){y[mt]=H,K=mt;break}if(K===-1)break}const ct=M[K];ct&&ct.connect(H)}}const w=new q,F=new q;function T(O,W,H){w.setFromMatrixPosition(W.matrixWorld),F.setFromMatrixPosition(H.matrixWorld);const K=w.distanceTo(F),ct=W.projectionMatrix.elements,mt=H.projectionMatrix.elements,ht=ct[14]/(ct[10]-1),St=ct[14]/(ct[10]+1),nt=(ct[9]+1)/ct[5],N=(ct[9]-1)/ct[5],lt=(ct[8]-1)/ct[0],ut=(mt[8]+1)/mt[0],gt=ht*lt,At=ht*ut,Ot=K/(-lt+ut),_t=Ot*-lt;if(W.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(_t),O.translateZ(Ot),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),ct[10]===-1)O.projectionMatrix.copy(W.projectionMatrix),O.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{const U=ht+Ot,b=St+Ot,j=gt-_t,dt=At+(K-_t),vt=nt*St/b*U,ft=N*St/b*U;O.projectionMatrix.makePerspective(j,dt,vt,ft,U,b),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function R(O,W){W===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(W.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;let W=O.near,H=O.far;_.texture!==null&&(_.depthNear>0&&(W=_.depthNear),_.depthFar>0&&(H=_.depthFar)),v.near=z.near=P.near=W,v.far=z.far=P.far=H,(x!==v.near||I!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),x=v.near,I=v.far);const K=O.parent,ct=v.cameras;R(v,K);for(let mt=0;mt<ct.length;mt++)R(ct[mt],K);ct.length===2?T(v,P,z):v.projectionMatrix.copy(P.projectionMatrix),k(O,v,K)};function k(O,W,H){H===null?O.matrix.copy(W.matrixWorld):(O.matrix.copy(H.matrixWorld),O.matrix.invert(),O.matrix.multiply(W.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(W.projectionMatrix),O.projectionMatrixInverse.copy(W.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=rl*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(m===null&&g===null))return l},this.setFoveation=function(O){l=O,m!==null&&(m.fixedFoveation=O),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=O)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let G=null;function st(O,W){if(h=W.getViewerPose(c||o),u=W,h!==null){const H=h.views;g!==null&&(t.setRenderTargetFramebuffer(S,g.framebuffer),t.setRenderTarget(S));let K=!1;H.length!==v.cameras.length&&(v.cameras.length=0,K=!0);for(let mt=0;mt<H.length;mt++){const ht=H[mt];let St=null;if(g!==null)St=g.getViewport(ht);else{const N=p.getViewSubImage(m,ht);St=N.viewport,mt===0&&(t.setRenderTargetTextures(S,N.colorTexture,m.ignoreDepthValues?void 0:N.depthStencilTexture),t.setRenderTarget(S))}let nt=et[mt];nt===void 0&&(nt=new Xe,nt.layers.enable(mt),nt.viewport=new ve,et[mt]=nt),nt.matrix.fromArray(ht.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(ht.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(St.x,St.y,St.width,St.height),mt===0&&(v.matrix.copy(nt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),K===!0&&v.cameras.push(nt)}const ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")){const mt=p.getDepthInformation(H[0]);mt&&mt.isValid&&mt.texture&&_.init(t,mt,s.renderState)}}for(let H=0;H<M.length;H++){const K=y[H],ct=M[H];K!==null&&ct!==void 0&&ct.update(K,W,c||o)}G&&G(O,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),u=null}const X=new Hh;X.setAnimationLoop(st),this.setAnimationLoop=function(O){G=O},this.dispose=function(){}}}const Ci=new Dn,og=new de;function ag(i,t){function e(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function n(d,f){f.color.getRGB(d.fogColor.value,Bh(i)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function s(d,f,S,M,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(d,f):f.isMeshToonMaterial?(r(d,f),p(d,f)):f.isMeshPhongMaterial?(r(d,f),h(d,f)):f.isMeshStandardMaterial?(r(d,f),m(d,f),f.isMeshPhysicalMaterial&&g(d,f,y)):f.isMeshMatcapMaterial?(r(d,f),u(d,f)):f.isMeshDepthMaterial?r(d,f):f.isMeshDistanceMaterial?(r(d,f),_(d,f)):f.isMeshNormalMaterial?r(d,f):f.isLineBasicMaterial?(o(d,f),f.isLineDashedMaterial&&a(d,f)):f.isPointsMaterial?l(d,f,S,M):f.isSpriteMaterial?c(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,e(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,e(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,e(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===on&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,e(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===on&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,e(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,e(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);const S=t.get(f),M=S.envMap,y=S.envMapRotation;M&&(d.envMap.value=M,Ci.copy(y),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),d.envMapRotation.value.setFromMatrix4(og.makeRotationFromEuler(Ci)),d.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap&&(d.lightMap.value=f.lightMap,d.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,d.lightMapTransform)),f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,d.aoMapTransform))}function o(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,e(f.map,d.mapTransform))}function a(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function l(d,f,S,M){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*S,d.scale.value=M*.5,f.map&&(d.map.value=f.map,e(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,e(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,e(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,e(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function h(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function p(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function m(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,d.roughnessMapTransform)),f.envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function g(d,f,S){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===on&&d.clearcoatNormalScale.value.negate())),f.dispersion>0&&(d.dispersion.value=f.dispersion),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=S.texture,d.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,d.specularIntensityMapTransform))}function u(d,f){f.matcap&&(d.matcap.value=f.matcap)}function _(d,f){const S=t.get(f).light;d.referencePosition.value.setFromMatrixPosition(S.matrixWorld),d.nearDistance.value=S.shadow.camera.near,d.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lg(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const y=M.program;n.uniformBlockBinding(S,y)}function c(S,M){let y=s[S.id];y===void 0&&(u(S),y=h(S),s[S.id]=y,S.addEventListener("dispose",d));const B=M.program;n.updateUBOMapping(S,B);const D=t.render.frame;r[S.id]!==D&&(m(S),r[S.id]=D)}function h(S){const M=p();S.__bindingPointIndex=M;const y=i.createBuffer(),B=S.__size,D=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,B,D),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function p(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(S){const M=s[S.id],y=S.uniforms,B=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let D=0,P=y.length;D<P;D++){const z=Array.isArray(y[D])?y[D]:[y[D]];for(let et=0,v=z.length;et<v;et++){const x=z[et];if(g(x,D,et,B)===!0){const I=x.__offset,C=Array.isArray(x.value)?x.value:[x.value];let E=0;for(let A=0;A<C.length;A++){const w=C[A],F=_(w);typeof w=="number"||typeof w=="boolean"?(x.__data[0]=w,i.bufferSubData(i.UNIFORM_BUFFER,I+E,x.__data)):w.isMatrix3?(x.__data[0]=w.elements[0],x.__data[1]=w.elements[1],x.__data[2]=w.elements[2],x.__data[3]=0,x.__data[4]=w.elements[3],x.__data[5]=w.elements[4],x.__data[6]=w.elements[5],x.__data[7]=0,x.__data[8]=w.elements[6],x.__data[9]=w.elements[7],x.__data[10]=w.elements[8],x.__data[11]=0):(w.toArray(x.__data,E),E+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,x.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(S,M,y,B){const D=S.value,P=M+"_"+y;if(B[P]===void 0)return typeof D=="number"||typeof D=="boolean"?B[P]=D:B[P]=D.clone(),!0;{const z=B[P];if(typeof D=="number"||typeof D=="boolean"){if(z!==D)return B[P]=D,!0}else if(z.equals(D)===!1)return z.copy(D),!0}return!1}function u(S){const M=S.uniforms;let y=0;const B=16;for(let P=0,z=M.length;P<z;P++){const et=Array.isArray(M[P])?M[P]:[M[P]];for(let v=0,x=et.length;v<x;v++){const I=et[v],C=Array.isArray(I.value)?I.value:[I.value];for(let E=0,A=C.length;E<A;E++){const w=C[E],F=_(w),T=y%B,R=T%F.boundary,k=T+R;y+=R,k!==0&&B-k<F.storage&&(y+=B-k),I.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=F.storage}}}const D=y%B;return D>0&&(y+=B-D),S.__size=y,S.__cache={},this}function _(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function d(S){const M=S.target;M.removeEventListener("dispose",d);const y=o.indexOf(M.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class _o{constructor(t={}){const{canvas:e=Kd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),u=new Int32Array(4);let _=null,d=null;const f=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nn,this.toneMapping=pi,this.toneMappingExposure=1;const M=this;let y=!1,B=0,D=0,P=null,z=-1,et=null;const v=new ve,x=new ve;let I=null;const C=new ee(0);let E=0,A=e.width,w=e.height,F=1,T=null,R=null;const k=new ve(0,0,A,w),G=new ve(0,0,A,w);let st=!1;const X=new Ml;let O=!1,W=!1;const H=new de,K=new de,ct=new q,mt=new ve,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let St=!1;function nt(){return P===null?F:1}let N=n;function lt(L,Z){return e.getContext(L,Z)}try{const L={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${dl}`),e.addEventListener("webglcontextlost",yt,!1),e.addEventListener("webglcontextrestored",Dt,!1),e.addEventListener("webglcontextcreationerror",Pt,!1),N===null){const Z="webgl2";if(N=lt(Z,L),N===null)throw lt(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let ut,gt,At,Ot,_t,U,b,j,dt,vt,ft,zt,Ct,Nt,re,bt,Ut,qt,Yt,Bt,oe,Kt,me,$;function Mt(){ut=new pm(N),ut.init(),Kt=new Q1(N,ut),gt=new lm(N,ut,t,Kt),At=new Z1(N),gt.reverseDepthBuffer&&At.buffers.depth.setReversed(!0),Ot=new vm(N),_t=new U1,U=new j1(N,ut,At,_t,gt,Kt,Ot),b=new hm(M),j=new fm(M),dt=new wf(N),me=new om(N,dt),vt=new mm(N,dt,Ot,me),ft=new xm(N,vt,dt,Ot),Yt=new _m(N,gt,U),bt=new cm(_t),zt=new N1(M,b,j,ut,gt,me,bt),Ct=new ag(M,_t),Nt=new O1,re=new V1(ut),qt=new rm(M,b,j,At,ft,m,l),Ut=new $1(M,ft,gt),$=new lg(N,Ot,gt,At),Bt=new am(N,ut,Ot),oe=new gm(N,ut,Ot),Ot.programs=zt.programs,M.capabilities=gt,M.extensions=ut,M.properties=_t,M.renderLists=Nt,M.shadowMap=Ut,M.state=At,M.info=Ot}Mt();const tt=new rg(M,N);this.xr=tt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const L=ut.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=ut.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(L){L!==void 0&&(F=L,this.setSize(A,w,!1))},this.getSize=function(L){return L.set(A,w)},this.setSize=function(L,Z,rt=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}A=L,w=Z,e.width=Math.floor(L*F),e.height=Math.floor(Z*F),rt===!0&&(e.style.width=L+"px",e.style.height=Z+"px"),this.setViewport(0,0,L,Z)},this.getDrawingBufferSize=function(L){return L.set(A*F,w*F).floor()},this.setDrawingBufferSize=function(L,Z,rt){A=L,w=Z,F=rt,e.width=Math.floor(L*rt),e.height=Math.floor(Z*rt),this.setViewport(0,0,L,Z)},this.getCurrentViewport=function(L){return L.copy(v)},this.getViewport=function(L){return L.copy(k)},this.setViewport=function(L,Z,rt,ot){L.isVector4?k.set(L.x,L.y,L.z,L.w):k.set(L,Z,rt,ot),At.viewport(v.copy(k).multiplyScalar(F).round())},this.getScissor=function(L){return L.copy(G)},this.setScissor=function(L,Z,rt,ot){L.isVector4?G.set(L.x,L.y,L.z,L.w):G.set(L,Z,rt,ot),At.scissor(x.copy(G).multiplyScalar(F).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(L){At.setScissorTest(st=L)},this.setOpaqueSort=function(L){T=L},this.setTransparentSort=function(L){R=L},this.getClearColor=function(L){return L.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor.apply(qt,arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha.apply(qt,arguments)},this.clear=function(L=!0,Z=!0,rt=!0){let ot=0;if(L){let Q=!1;if(P!==null){const Rt=P.texture.format;Q=Rt===_l||Rt===vl||Rt===gl}if(Q){const Rt=P.texture.type,It=Rt===Zn||Rt===zi||Rt===Zs||Rt===Ms||Rt===pl||Rt===ml,kt=qt.getClearColor(),Ht=qt.getClearAlpha(),Xt=kt.r,$t=kt.g,Vt=kt.b;It?(g[0]=Xt,g[1]=$t,g[2]=Vt,g[3]=Ht,N.clearBufferuiv(N.COLOR,0,g)):(u[0]=Xt,u[1]=$t,u[2]=Vt,u[3]=Ht,N.clearBufferiv(N.COLOR,0,u))}else ot|=N.COLOR_BUFFER_BIT}Z&&(ot|=N.DEPTH_BUFFER_BIT,N.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),rt&&(ot|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",yt,!1),e.removeEventListener("webglcontextrestored",Dt,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),Nt.dispose(),re.dispose(),_t.dispose(),b.dispose(),j.dispose(),ft.dispose(),me.dispose(),$.dispose(),zt.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Nn),tt.removeEventListener("sessionend",qe),Ge.stop()};function yt(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function Dt(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const L=Ot.autoReset,Z=Ut.enabled,rt=Ut.autoUpdate,ot=Ut.needsUpdate,Q=Ut.type;Mt(),Ot.autoReset=L,Ut.enabled=Z,Ut.autoUpdate=rt,Ut.needsUpdate=ot,Ut.type=Q}function Pt(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Qt(L){const Z=L.target;Z.removeEventListener("dispose",Qt),pe(Z)}function pe(L){Ce(L),_t.remove(L)}function Ce(L){const Z=_t.get(L).programs;Z!==void 0&&(Z.forEach(function(rt){zt.releaseProgram(rt)}),L.isShaderMaterial&&zt.releaseShaderCache(L))}this.renderBufferDirect=function(L,Z,rt,ot,Q,Rt){Z===null&&(Z=ht);const It=Q.isMesh&&Q.matrixWorld.determinant()<0,kt=Si(L,Z,rt,ot,Q);At.setMaterial(ot,It);let Ht=rt.index,Xt=1;if(ot.wireframe===!0){if(Ht=vt.getWireframeAttribute(rt),Ht===void 0)return;Xt=2}const $t=rt.drawRange,Vt=rt.attributes.position;let ce=$t.start*Xt,he=($t.start+$t.count)*Xt;Rt!==null&&(ce=Math.max(ce,Rt.start*Xt),he=Math.min(he,(Rt.start+Rt.count)*Xt)),Ht!==null?(ce=Math.max(ce,0),he=Math.min(he,Ht.count)):Vt!=null&&(ce=Math.max(ce,0),he=Math.min(he,Vt.count));const be=he-ce;if(be<0||be===1/0)return;me.setup(Q,ot,kt,rt,Ht);let Ve,le=Bt;if(Ht!==null&&(Ve=dt.get(Ht),le=oe,le.setIndex(Ve)),Q.isMesh)ot.wireframe===!0?(At.setLineWidth(ot.wireframeLinewidth*nt()),le.setMode(N.LINES)):le.setMode(N.TRIANGLES);else if(Q.isLine){let Wt=ot.linewidth;Wt===void 0&&(Wt=1),At.setLineWidth(Wt*nt()),Q.isLineSegments?le.setMode(N.LINES):Q.isLineLoop?le.setMode(N.LINE_LOOP):le.setMode(N.LINE_STRIP)}else Q.isPoints?le.setMode(N.POINTS):Q.isSprite&&le.setMode(N.TRIANGLES);if(Q.isBatchedMesh)if(Q._multiDrawInstances!==null)le.renderMultiDrawInstances(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount,Q._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))le.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const Wt=Q._multiDrawStarts,Be=Q._multiDrawCounts,Jt=Q._multiDrawCount,Ye=Ht?dt.get(Ht).bytesPerElement:1,jn=_t.get(ot).currentProgram.getUniforms();for(let Qe=0;Qe<Jt;Qe++)jn.setValue(N,"_gl_DrawID",Qe),le.render(Wt[Qe]/Ye,Be[Qe])}else if(Q.isInstancedMesh)le.renderInstances(ce,be,Q.count);else if(rt.isInstancedBufferGeometry){const Wt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,Be=Math.min(rt.instanceCount,Wt);le.renderInstances(ce,be,Be)}else le.render(ce,be)};function te(L,Z,rt){L.transparent===!0&&L.side===rn&&L.forceSinglePass===!1?(L.side=on,L.needsUpdate=!0,Jn(L,Z,rt),L.side=vi,L.needsUpdate=!0,Jn(L,Z,rt),L.side=rn):Jn(L,Z,rt)}this.compile=function(L,Z,rt=null){rt===null&&(rt=L),d=re.get(rt),d.init(Z),S.push(d),rt.traverseVisible(function(Q){Q.isLight&&Q.layers.test(Z.layers)&&(d.pushLight(Q),Q.castShadow&&d.pushShadow(Q))}),L!==rt&&L.traverseVisible(function(Q){Q.isLight&&Q.layers.test(Z.layers)&&(d.pushLight(Q),Q.castShadow&&d.pushShadow(Q))}),d.setupLights();const ot=new Set;return L.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Rt=Q.material;if(Rt)if(Array.isArray(Rt))for(let It=0;It<Rt.length;It++){const kt=Rt[It];te(kt,rt,Q),ot.add(kt)}else te(Rt,rt,Q),ot.add(Rt)}),S.pop(),d=null,ot},this.compileAsync=function(L,Z,rt=null){const ot=this.compile(L,Z,rt);return new Promise(Q=>{function Rt(){if(ot.forEach(function(It){_t.get(It).currentProgram.isReady()&&ot.delete(It)}),ot.size===0){Q(L);return}setTimeout(Rt,10)}ut.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let Ie=null;function je(L){Ie&&Ie(L)}function Nn(){Ge.stop()}function qe(){Ge.start()}const Ge=new Hh;Ge.setAnimationLoop(je),typeof self<"u"&&Ge.setContext(self),this.setAnimationLoop=function(L){Ie=L,tt.setAnimationLoop(L),L===null?Ge.stop():Ge.start()},tt.addEventListener("sessionstart",Nn),tt.addEventListener("sessionend",qe),this.render=function(L,Z){if(Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(Z),Z=tt.getCamera()),L.isScene===!0&&L.onBeforeRender(M,L,Z,P),d=re.get(L,S.length),d.init(Z),S.push(d),K.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),X.setFromProjectionMatrix(K),W=this.localClippingEnabled,O=bt.init(this.clippingPlanes,W),_=Nt.get(L,f.length),_.init(),f.push(_),tt.enabled===!0&&tt.isPresenting===!0){const Rt=M.xr.getDepthSensingMesh();Rt!==null&&An(Rt,Z,-1/0,M.sortObjects)}An(L,Z,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(T,R),St=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,St&&qt.addToRenderList(_,L),this.info.render.frame++,O===!0&&bt.beginShadows();const rt=d.state.shadowsArray;Ut.render(rt,L,Z),O===!0&&bt.endShadows(),this.info.autoReset===!0&&this.info.reset();const ot=_.opaque,Q=_.transmissive;if(d.setupLights(),Z.isArrayCamera){const Rt=Z.cameras;if(Q.length>0)for(let It=0,kt=Rt.length;It<kt;It++){const Ht=Rt[It];an(ot,Q,L,Ht)}St&&qt.render(L);for(let It=0,kt=Rt.length;It<kt;It++){const Ht=Rt[It];Un(_,L,Ht,Ht.viewport)}}else Q.length>0&&an(ot,Q,L,Z),St&&qt.render(L),Un(_,L,Z);P!==null&&(U.updateMultisampleRenderTarget(P),U.updateRenderTargetMipmap(P)),L.isScene===!0&&L.onAfterRender(M,L,Z),me.resetDefaultState(),z=-1,et=null,S.pop(),S.length>0?(d=S[S.length-1],O===!0&&bt.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function An(L,Z,rt,ot){if(L.visible===!1)return;if(L.layers.test(Z.layers)){if(L.isGroup)rt=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(Z);else if(L.isLight)d.pushLight(L),L.castShadow&&d.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||X.intersectsSprite(L)){ot&&mt.setFromMatrixPosition(L.matrixWorld).applyMatrix4(K);const It=ft.update(L),kt=L.material;kt.visible&&_.push(L,It,kt,rt,mt.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||X.intersectsObject(L))){const It=ft.update(L),kt=L.material;if(ot&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),mt.copy(L.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),mt.copy(It.boundingSphere.center)),mt.applyMatrix4(L.matrixWorld).applyMatrix4(K)),Array.isArray(kt)){const Ht=It.groups;for(let Xt=0,$t=Ht.length;Xt<$t;Xt++){const Vt=Ht[Xt],ce=kt[Vt.materialIndex];ce&&ce.visible&&_.push(L,It,ce,rt,mt.z,Vt)}}else kt.visible&&_.push(L,It,kt,rt,mt.z,null)}}const Rt=L.children;for(let It=0,kt=Rt.length;It<kt;It++)An(Rt[It],Z,rt,ot)}function Un(L,Z,rt,ot){const Q=L.opaque,Rt=L.transmissive,It=L.transparent;d.setupLightsView(rt),O===!0&&bt.setGlobalState(M.clippingPlanes,rt),ot&&At.viewport(v.copy(ot)),Q.length>0&&Fn(Q,Z,rt),Rt.length>0&&Fn(Rt,Z,rt),It.length>0&&Fn(It,Z,rt),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function an(L,Z,rt,ot){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[ot.id]===void 0&&(d.state.transmissionRenderTarget[ot.id]=new ki(1,1,{generateMipmaps:!0,type:ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float")?rr:Zn,minFilter:Ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ue.workingColorSpace}));const Rt=d.state.transmissionRenderTarget[ot.id],It=ot.viewport||v;Rt.setSize(It.z,It.w);const kt=M.getRenderTarget();M.setRenderTarget(Rt),M.getClearColor(C),E=M.getClearAlpha(),E<1&&M.setClearColor(16777215,.5),M.clear(),St&&qt.render(rt);const Ht=M.toneMapping;M.toneMapping=pi;const Xt=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),d.setupLightsView(ot),O===!0&&bt.setGlobalState(M.clippingPlanes,ot),Fn(L,rt,ot),U.updateMultisampleRenderTarget(Rt),U.updateRenderTargetMipmap(Rt),ut.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Vt=0,ce=Z.length;Vt<ce;Vt++){const he=Z[Vt],be=he.object,Ve=he.geometry,le=he.material,Wt=he.group;if(le.side===rn&&be.layers.test(ot.layers)){const Be=le.side;le.side=on,le.needsUpdate=!0,Mi(be,rt,ot,Ve,le,Wt),le.side=Be,le.needsUpdate=!0,$t=!0}}$t===!0&&(U.updateMultisampleRenderTarget(Rt),U.updateRenderTargetMipmap(Rt))}M.setRenderTarget(kt),M.setClearColor(C,E),Xt!==void 0&&(ot.viewport=Xt),M.toneMapping=Ht}function Fn(L,Z,rt){const ot=Z.isScene===!0?Z.overrideMaterial:null;for(let Q=0,Rt=L.length;Q<Rt;Q++){const It=L[Q],kt=It.object,Ht=It.geometry,Xt=ot===null?It.material:ot,$t=It.group;kt.layers.test(rt.layers)&&Mi(kt,Z,rt,Ht,Xt,$t)}}function Mi(L,Z,rt,ot,Q,Rt){L.onBeforeRender(M,Z,rt,ot,Q,Rt),L.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),Q.onBeforeRender(M,Z,rt,ot,L,Rt),Q.transparent===!0&&Q.side===rn&&Q.forceSinglePass===!1?(Q.side=on,Q.needsUpdate=!0,M.renderBufferDirect(rt,Z,ot,Q,L,Rt),Q.side=vi,Q.needsUpdate=!0,M.renderBufferDirect(rt,Z,ot,Q,L,Rt),Q.side=rn):M.renderBufferDirect(rt,Z,ot,Q,L,Rt),L.onAfterRender(M,Z,rt,ot,Q,Rt)}function Jn(L,Z,rt){Z.isScene!==!0&&(Z=ht);const ot=_t.get(L),Q=d.state.lights,Rt=d.state.shadowsArray,It=Q.state.version,kt=zt.getParameters(L,Q.state,Rt,Z,rt),Ht=zt.getProgramCacheKey(kt);let Xt=ot.programs;ot.environment=L.isMeshStandardMaterial?Z.environment:null,ot.fog=Z.fog,ot.envMap=(L.isMeshStandardMaterial?j:b).get(L.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&L.envMap===null?Z.environmentRotation:L.envMapRotation,Xt===void 0&&(L.addEventListener("dispose",Qt),Xt=new Map,ot.programs=Xt);let $t=Xt.get(Ht);if($t!==void 0){if(ot.currentProgram===$t&&ot.lightsStateVersion===It)return hr(L,kt),$t}else kt.uniforms=zt.getUniforms(L),L.onBeforeCompile(kt,M),$t=zt.acquireProgram(kt,Ht),Xt.set(Ht,$t),ot.uniforms=kt.uniforms;const Vt=ot.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Vt.clippingPlanes=bt.uniform),hr(L,kt),ot.needsLights=ur(L),ot.lightsStateVersion=It,ot.needsLights&&(Vt.ambientLightColor.value=Q.state.ambient,Vt.lightProbe.value=Q.state.probe,Vt.directionalLights.value=Q.state.directional,Vt.directionalLightShadows.value=Q.state.directionalShadow,Vt.spotLights.value=Q.state.spot,Vt.spotLightShadows.value=Q.state.spotShadow,Vt.rectAreaLights.value=Q.state.rectArea,Vt.ltc_1.value=Q.state.rectAreaLTC1,Vt.ltc_2.value=Q.state.rectAreaLTC2,Vt.pointLights.value=Q.state.point,Vt.pointLightShadows.value=Q.state.pointShadow,Vt.hemisphereLights.value=Q.state.hemi,Vt.directionalShadowMap.value=Q.state.directionalShadowMap,Vt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Vt.spotShadowMap.value=Q.state.spotShadowMap,Vt.spotLightMatrix.value=Q.state.spotLightMatrix,Vt.spotLightMap.value=Q.state.spotLightMap,Vt.pointShadowMap.value=Q.state.pointShadowMap,Vt.pointShadowMatrix.value=Q.state.pointShadowMatrix),ot.currentProgram=$t,ot.uniformsList=null,$t}function Vi(L){if(L.uniformsList===null){const Z=L.currentProgram.getUniforms();L.uniformsList=to.seqWithValue(Z.seq,L.uniforms)}return L.uniformsList}function hr(L,Z){const rt=_t.get(L);rt.outputColorSpace=Z.outputColorSpace,rt.batching=Z.batching,rt.batchingColor=Z.batchingColor,rt.instancing=Z.instancing,rt.instancingColor=Z.instancingColor,rt.instancingMorph=Z.instancingMorph,rt.skinning=Z.skinning,rt.morphTargets=Z.morphTargets,rt.morphNormals=Z.morphNormals,rt.morphColors=Z.morphColors,rt.morphTargetsCount=Z.morphTargetsCount,rt.numClippingPlanes=Z.numClippingPlanes,rt.numIntersection=Z.numClipIntersection,rt.vertexAlphas=Z.vertexAlphas,rt.vertexTangents=Z.vertexTangents,rt.toneMapping=Z.toneMapping}function Si(L,Z,rt,ot,Q){Z.isScene!==!0&&(Z=ht),U.resetTextureUnits();const Rt=Z.fog,It=ot.isMeshStandardMaterial?Z.environment:null,kt=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:xi,Ht=(ot.isMeshStandardMaterial?j:b).get(ot.envMap||It),Xt=ot.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,$t=!!rt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Vt=!!rt.morphAttributes.position,ce=!!rt.morphAttributes.normal,he=!!rt.morphAttributes.color;let be=pi;ot.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(be=M.toneMapping);const Ve=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,le=Ve!==void 0?Ve.length:0,Wt=_t.get(ot),Be=d.state.lights;if(O===!0&&(W===!0||L!==et)){const V=L===et&&ot.id===z;bt.setState(ot,L,V)}let Jt=!1;ot.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Be.state.version||Wt.outputColorSpace!==kt||Q.isBatchedMesh&&Wt.batching===!1||!Q.isBatchedMesh&&Wt.batching===!0||Q.isBatchedMesh&&Wt.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&Wt.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&Wt.instancing===!1||!Q.isInstancedMesh&&Wt.instancing===!0||Q.isSkinnedMesh&&Wt.skinning===!1||!Q.isSkinnedMesh&&Wt.skinning===!0||Q.isInstancedMesh&&Wt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Wt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Wt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Wt.instancingMorph===!1&&Q.morphTexture!==null||Wt.envMap!==Ht||ot.fog===!0&&Wt.fog!==Rt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==bt.numPlanes||Wt.numIntersection!==bt.numIntersection)||Wt.vertexAlphas!==Xt||Wt.vertexTangents!==$t||Wt.morphTargets!==Vt||Wt.morphNormals!==ce||Wt.morphColors!==he||Wt.toneMapping!==be||Wt.morphTargetsCount!==le)&&(Jt=!0):(Jt=!0,Wt.__version=ot.version);let Ye=Wt.currentProgram;Jt===!0&&(Ye=Jn(ot,Z,Q));let jn=!1,Qe=!1,Rs=!1;const we=Ye.getUniforms(),un=Wt.uniforms;if(At.useProgram(Ye.program)&&(jn=!0,Qe=!0,Rs=!0),ot.id!==z&&(z=ot.id,Qe=!0),jn||et!==L){gt.reverseDepthBuffer?(H.copy(L.projectionMatrix),Jd(H),jd(H),we.setValue(N,"projectionMatrix",H)):we.setValue(N,"projectionMatrix",L.projectionMatrix),we.setValue(N,"viewMatrix",L.matrixWorldInverse);const V=we.map.cameraPosition;V!==void 0&&V.setValue(N,ct.setFromMatrixPosition(L.matrixWorld)),gt.logarithmicDepthBuffer&&we.setValue(N,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&we.setValue(N,"isOrthographic",L.isOrthographicCamera===!0),et!==L&&(et=L,Qe=!0,Rs=!0)}if(Q.isSkinnedMesh){we.setOptional(N,Q,"bindMatrix"),we.setOptional(N,Q,"bindMatrixInverse");const V=Q.skeleton;V&&(V.boneTexture===null&&V.computeBoneTexture(),we.setValue(N,"boneTexture",V.boneTexture,U))}Q.isBatchedMesh&&(we.setOptional(N,Q,"batchingTexture"),we.setValue(N,"batchingTexture",Q._matricesTexture,U),we.setOptional(N,Q,"batchingIdTexture"),we.setValue(N,"batchingIdTexture",Q._indirectTexture,U),we.setOptional(N,Q,"batchingColorTexture"),Q._colorsTexture!==null&&we.setValue(N,"batchingColorTexture",Q._colorsTexture,U));const Ps=rt.morphAttributes;if((Ps.position!==void 0||Ps.normal!==void 0||Ps.color!==void 0)&&Yt.update(Q,rt,Ye),(Qe||Wt.receiveShadow!==Q.receiveShadow)&&(Wt.receiveShadow=Q.receiveShadow,we.setValue(N,"receiveShadow",Q.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(un.envMap.value=Ht,un.flipEnvMap.value=Ht.isCubeTexture&&Ht.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&Z.environment!==null&&(un.envMapIntensity.value=Z.environmentIntensity),Qe&&(we.setValue(N,"toneMappingExposure",M.toneMappingExposure),Wt.needsLights&&sn(un,Rs),Rt&&ot.fog===!0&&Ct.refreshFogUniforms(un,Rt),Ct.refreshMaterialUniforms(un,ot,F,w,d.state.transmissionRenderTarget[L.id]),to.upload(N,Vi(Wt),un,U)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(to.upload(N,Vi(Wt),un,U),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&we.setValue(N,"center",Q.center),we.setValue(N,"modelViewMatrix",Q.modelViewMatrix),we.setValue(N,"normalMatrix",Q.normalMatrix),we.setValue(N,"modelMatrix",Q.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){const V=ot.uniformsGroups;for(let Y=0,it=V.length;Y<it;Y++){const J=V[Y];$.update(J,Ye),$.bind(J,Ye)}}return Ye}function sn(L,Z){L.ambientLightColor.needsUpdate=Z,L.lightProbe.needsUpdate=Z,L.directionalLights.needsUpdate=Z,L.directionalLightShadows.needsUpdate=Z,L.pointLights.needsUpdate=Z,L.pointLightShadows.needsUpdate=Z,L.spotLights.needsUpdate=Z,L.spotLightShadows.needsUpdate=Z,L.rectAreaLights.needsUpdate=Z,L.hemisphereLights.needsUpdate=Z}function ur(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(L,Z,rt){_t.get(L.texture).__webglTexture=Z,_t.get(L.depthTexture).__webglTexture=rt;const ot=_t.get(L);ot.__hasExternalTextures=!0,ot.__autoAllocateDepthBuffer=rt===void 0,ot.__autoAllocateDepthBuffer||ut.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ot.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,Z){const rt=_t.get(L);rt.__webglFramebuffer=Z,rt.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(L,Z=0,rt=0){P=L,B=Z,D=rt;let ot=!0,Q=null,Rt=!1,It=!1;if(L){const Ht=_t.get(L);if(Ht.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(N.FRAMEBUFFER,null),ot=!1;else if(Ht.__webglFramebuffer===void 0)U.setupRenderTarget(L);else if(Ht.__hasExternalTextures)U.rebindTextures(L,_t.get(L.texture).__webglTexture,_t.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const Vt=L.depthTexture;if(Ht.__boundDepthTexture!==Vt){if(Vt!==null&&_t.has(Vt)&&(L.width!==Vt.image.width||L.height!==Vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(L)}}const Xt=L.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(It=!0);const $t=_t.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray($t[Z])?Q=$t[Z][rt]:Q=$t[Z],Rt=!0):L.samples>0&&U.useMultisampledRTT(L)===!1?Q=_t.get(L).__webglMultisampledFramebuffer:Array.isArray($t)?Q=$t[rt]:Q=$t,v.copy(L.viewport),x.copy(L.scissor),I=L.scissorTest}else v.copy(k).multiplyScalar(F).floor(),x.copy(G).multiplyScalar(F).floor(),I=st;if(At.bindFramebuffer(N.FRAMEBUFFER,Q)&&ot&&At.drawBuffers(L,Q),At.viewport(v),At.scissor(x),At.setScissorTest(I),Rt){const Ht=_t.get(L.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ht.__webglTexture,rt)}else if(It){const Ht=_t.get(L.texture),Xt=Z||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ht.__webglTexture,rt||0,Xt)}z=-1},this.readRenderTargetPixels=function(L,Z,rt,ot,Q,Rt,It){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=_t.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&It!==void 0&&(kt=kt[It]),kt){At.bindFramebuffer(N.FRAMEBUFFER,kt);try{const Ht=L.texture,Xt=Ht.format,$t=Ht.type;if(!gt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=L.width-ot&&rt>=0&&rt<=L.height-Q&&N.readPixels(Z,rt,ot,Q,Kt.convert(Xt),Kt.convert($t),Rt)}finally{const Ht=P!==null?_t.get(P).__webglFramebuffer:null;At.bindFramebuffer(N.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(L,Z,rt,ot,Q,Rt,It){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=_t.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&It!==void 0&&(kt=kt[It]),kt){const Ht=L.texture,Xt=Ht.format,$t=Ht.type;if(!gt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Z>=0&&Z<=L.width-ot&&rt>=0&&rt<=L.height-Q){At.bindFramebuffer(N.FRAMEBUFFER,kt);const Vt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Vt),N.bufferData(N.PIXEL_PACK_BUFFER,Rt.byteLength,N.STREAM_READ),N.readPixels(Z,rt,ot,Q,Kt.convert(Xt),Kt.convert($t),0);const ce=P!==null?_t.get(P).__webglFramebuffer:null;At.bindFramebuffer(N.FRAMEBUFFER,ce);const he=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Zd(N,he,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Vt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Rt),N.deleteBuffer(Vt),N.deleteSync(he),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(L,Z=null,rt=0){L.isTexture!==!0&&(Qr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Z=arguments[0]||null,L=arguments[1]);const ot=Math.pow(2,-rt),Q=Math.floor(L.image.width*ot),Rt=Math.floor(L.image.height*ot),It=Z!==null?Z.x:0,kt=Z!==null?Z.y:0;U.setTexture2D(L,0),N.copyTexSubImage2D(N.TEXTURE_2D,rt,0,0,It,kt,Q,Rt),At.unbindTexture()},this.copyTextureToTexture=function(L,Z,rt=null,ot=null,Q=0){L.isTexture!==!0&&(Qr("WebGLRenderer: copyTextureToTexture function signature has changed."),ot=arguments[0]||null,L=arguments[1],Z=arguments[2],Q=arguments[3]||0,rt=null);let Rt,It,kt,Ht,Xt,$t;rt!==null?(Rt=rt.max.x-rt.min.x,It=rt.max.y-rt.min.y,kt=rt.min.x,Ht=rt.min.y):(Rt=L.image.width,It=L.image.height,kt=0,Ht=0),ot!==null?(Xt=ot.x,$t=ot.y):(Xt=0,$t=0);const Vt=Kt.convert(Z.format),ce=Kt.convert(Z.type);U.setTexture2D(Z,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,Z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,Z.unpackAlignment);const he=N.getParameter(N.UNPACK_ROW_LENGTH),be=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ve=N.getParameter(N.UNPACK_SKIP_PIXELS),le=N.getParameter(N.UNPACK_SKIP_ROWS),Wt=N.getParameter(N.UNPACK_SKIP_IMAGES),Be=L.isCompressedTexture?L.mipmaps[Q]:L.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,Be.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Be.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,kt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ht),L.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Q,Xt,$t,Rt,It,Vt,ce,Be.data):L.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Q,Xt,$t,Be.width,Be.height,Vt,Be.data):N.texSubImage2D(N.TEXTURE_2D,Q,Xt,$t,Rt,It,Vt,ce,Be),N.pixelStorei(N.UNPACK_ROW_LENGTH,he),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,be),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ve),N.pixelStorei(N.UNPACK_SKIP_ROWS,le),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Wt),Q===0&&Z.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),At.unbindTexture()},this.copyTextureToTexture3D=function(L,Z,rt=null,ot=null,Q=0){L.isTexture!==!0&&(Qr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,ot=arguments[1]||null,L=arguments[2],Z=arguments[3],Q=arguments[4]||0);let Rt,It,kt,Ht,Xt,$t,Vt,ce,he;const be=L.isCompressedTexture?L.mipmaps[Q]:L.image;rt!==null?(Rt=rt.max.x-rt.min.x,It=rt.max.y-rt.min.y,kt=rt.max.z-rt.min.z,Ht=rt.min.x,Xt=rt.min.y,$t=rt.min.z):(Rt=be.width,It=be.height,kt=be.depth,Ht=0,Xt=0,$t=0),ot!==null?(Vt=ot.x,ce=ot.y,he=ot.z):(Vt=0,ce=0,he=0);const Ve=Kt.convert(Z.format),le=Kt.convert(Z.type);let Wt;if(Z.isData3DTexture)U.setTexture3D(Z,0),Wt=N.TEXTURE_3D;else if(Z.isDataArrayTexture||Z.isCompressedArrayTexture)U.setTexture2DArray(Z,0),Wt=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,Z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,Z.unpackAlignment);const Be=N.getParameter(N.UNPACK_ROW_LENGTH),Jt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ye=N.getParameter(N.UNPACK_SKIP_PIXELS),jn=N.getParameter(N.UNPACK_SKIP_ROWS),Qe=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,be.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,be.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ht),N.pixelStorei(N.UNPACK_SKIP_ROWS,Xt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,$t),L.isDataTexture||L.isData3DTexture?N.texSubImage3D(Wt,Q,Vt,ce,he,Rt,It,kt,Ve,le,be.data):Z.isCompressedArrayTexture?N.compressedTexSubImage3D(Wt,Q,Vt,ce,he,Rt,It,kt,Ve,be.data):N.texSubImage3D(Wt,Q,Vt,ce,he,Rt,It,kt,Ve,le,be),N.pixelStorei(N.UNPACK_ROW_LENGTH,Be),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Jt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ye),N.pixelStorei(N.UNPACK_SKIP_ROWS,jn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Qe),Q===0&&Z.generateMipmaps&&N.generateMipmap(Wt),At.unbindTexture()},this.initRenderTarget=function(L){_t.get(L).__webglFramebuffer===void 0&&U.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?U.setTextureCube(L,0):L.isData3DTexture?U.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?U.setTexture2DArray(L,0):U.setTexture2D(L,0),At.unbindTexture()},this.resetState=function(){B=0,D=0,P=null,At.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===xl?"display-p3":"srgb",e.unpackColorSpace=ue.workingColorSpace===mo?"display-p3":"srgb"}}class bl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ee(t),this.near=e,this.far=n}clone(){return new bl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class lr extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class cg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=sl,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const tn=new q;class co{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.applyMatrix4(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.applyNormalMatrix(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)tn.fromBufferAttribute(this,e),tn.transformDirection(t),this.setXYZ(e,tn.x,tn.y,tn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ge(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),n=ge(n,this.array),s=ge(s,this.array),r=ge(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Je(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new co(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Fi extends yi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let rs;const zs=new q,os=new q,as=new q,ls=new Et,ks=new Et,$h=new de,Ir=new q,Hs=new q,Nr=new q,Nc=new Et,sa=new Et,Uc=new Et;class ds extends De{constructor(t=new Fi){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new Se;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new cg(e,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new co(n,3,0,!1)),rs.setAttribute("uv",new co(n,2,3,!1))}this.geometry=rs,this.material=t,this.center=new Et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),$h.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-as.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ur(Ir.set(-.5,-.5,0),as,o,os,s,r),Ur(Hs.set(.5,-.5,0),as,o,os,s,r),Ur(Nr.set(.5,.5,0),as,o,os,s,r),Nc.set(0,0),sa.set(1,0),Uc.set(1,1);let a=t.ray.intersectTriangle(Ir,Hs,Nr,!1,zs);if(a===null&&(Ur(Hs.set(-.5,.5,0),as,o,os,s,r),sa.set(0,1),a=t.ray.intersectTriangle(Ir,Nr,Hs,!1,zs),a===null))return;const l=t.ray.origin.distanceTo(zs);l<t.near||l>t.far||e.push({distance:l,point:zs.clone(),uv:hn.getInterpolation(zs,Ir,Hs,Nr,Nc,sa,Uc,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ur(i,t,e,n,s,r){ls.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ks.x=r*ls.x-s*ls.y,ks.y=s*ls.x+r*ls.y):ks.copy(ls),i.copy(t),i.x+=ks.x,i.y+=ks.y,i.applyMatrix4($h)}class xo extends yi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ho=new q,uo=new q,Fc=new de,Gs=new go,Fr=new ar,ra=new q,Oc=new q;class wl extends De{constructor(t=new Se,e=new xo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ho.fromBufferAttribute(e,s-1),uo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ho.distanceTo(uo);t.setAttribute("lineDistance",new fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(s),Fr.radius+=r,t.ray.intersectsSphere(Fr)===!1)return;Fc.copy(s).invert(),Gs.copy(t.ray).applyMatrix4(Fc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,m=n.attributes.position;if(h!==null){const g=Math.max(0,o.start),u=Math.min(h.count,o.start+o.count);for(let _=g,d=u-1;_<d;_+=c){const f=h.getX(_),S=h.getX(_+1),M=Or(this,t,Gs,l,f,S);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(u-1),d=h.getX(g),f=Or(this,t,Gs,l,_,d);f&&e.push(f)}}else{const g=Math.max(0,o.start),u=Math.min(m.count,o.start+o.count);for(let _=g,d=u-1;_<d;_+=c){const f=Or(this,t,Gs,l,_,_+1);f&&e.push(f)}if(this.isLineLoop){const _=Or(this,t,Gs,l,u-1,g);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Or(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(ho.fromBufferAttribute(o,s),uo.fromBufferAttribute(o,r),e.distanceSqToSegment(ho,uo,ra,Oc)>n)return;ra.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ra);if(!(l<t.near||l>t.far))return{distance:l,point:Oc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Bc=new q,zc=new q;class hg extends wl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Bc.fromBufferAttribute(e,s),zc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bc.distanceTo(zc);t.setAttribute("lineDistance",new fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ug extends wl{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class ws extends yi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const kc=new de,al=new go,Br=new ar,zr=new q;class js extends De{constructor(t=new Se,e=new ws){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(s),Br.radius+=r,t.ray.intersectsSphere(Br)===!1)return;kc.copy(s).invert(),al.copy(t.ray).applyMatrix4(kc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,p=n.attributes.position;if(c!==null){const m=Math.max(0,o.start),g=Math.min(c.count,o.start+o.count);for(let u=m,_=g;u<_;u++){const d=c.getX(u);zr.fromBufferAttribute(p,d),Hc(zr,d,l,s,t,e,this)}}else{const m=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let u=m,_=g;u<_;u++)zr.fromBufferAttribute(p,u),Hc(zr,u,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Hc(i,t,e,n,s,r,o){const a=al.distanceSqToPoint(i);if(a<e){const l=new q;al.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class bn extends Ze{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class In{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],m=n[s+1]-h,g=(o-h)/m;return(s+g)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Et:new q);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new q,s=[],r=[],o=[],a=new q,l=new de;for(let g=0;g<=t;g++){const u=g/t;s[g]=this.getTangentAt(u,new q)}r[0]=new q,o[0]=new q;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),p=Math.abs(s[0].y),m=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),m<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let g=1;g<=t;g++){if(r[g]=r[g-1].clone(),o[g]=o[g-1].clone(),a.crossVectors(s[g-1],s[g]),a.length()>Number.EPSILON){a.normalize();const u=Math.acos(We(s[g-1].dot(s[g]),-1,1));r[g].applyMatrix4(l.makeRotationAxis(a,u))}o[g].crossVectors(s[g],r[g])}if(e===!0){let g=Math.acos(We(r[0].dot(r[t]),-1,1));g/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(g=-g);for(let u=1;u<=t;u++)r[u].applyMatrix4(l.makeRotationAxis(s[u],g*u)),o[u].crossVectors(s[u],r[u])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class El extends In{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Et){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=l-this.aX,g=c-this.aY;l=m*h-g*p+this.aX,c=m*p+g*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class dg extends El{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Tl(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,p){let m=(o-r)/c-(a-r)/(c+h)+(a-o)/h,g=(a-o)/h-(l-o)/(h+p)+(l-a)/p;m*=h,g*=h,s(o,a,m,g)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const kr=new q,oa=new Tl,aa=new Tl,la=new Tl;class fg extends In{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new q){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(kr.subVectors(s[0],s[1]).add(s[0]),c=kr);const p=s[a%r],m=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(kr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=kr),this.curveType==="centripetal"||this.curveType==="chordal"){const g=this.curveType==="chordal"?.5:.25;let u=Math.pow(c.distanceToSquared(p),g),_=Math.pow(p.distanceToSquared(m),g),d=Math.pow(m.distanceToSquared(h),g);_<1e-4&&(_=1),u<1e-4&&(u=_),d<1e-4&&(d=_),oa.initNonuniformCatmullRom(c.x,p.x,m.x,h.x,u,_,d),aa.initNonuniformCatmullRom(c.y,p.y,m.y,h.y,u,_,d),la.initNonuniformCatmullRom(c.z,p.z,m.z,h.z,u,_,d)}else this.curveType==="catmullrom"&&(oa.initCatmullRom(c.x,p.x,m.x,h.x,this.tension),aa.initCatmullRom(c.y,p.y,m.y,h.y,this.tension),la.initCatmullRom(c.z,p.z,m.z,h.z,this.tension));return n.set(oa.calc(l),aa.calc(l),la.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new q().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Gc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function pg(i,t){const e=1-i;return e*e*t}function mg(i,t){return 2*(1-i)*i*t}function gg(i,t){return i*i*t}function $s(i,t,e,n){return pg(i,t)+mg(i,e)+gg(i,n)}function vg(i,t){const e=1-i;return e*e*e*t}function _g(i,t){const e=1-i;return 3*e*e*i*t}function xg(i,t){return 3*(1-i)*i*i*t}function yg(i,t){return i*i*i*t}function Ks(i,t,e,n,s){return vg(i,t)+_g(i,e)+xg(i,n)+yg(i,s)}class Kh extends In{constructor(t=new Et,e=new Et,n=new Et,s=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Et){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ks(t,s.x,r.x,o.x,a.x),Ks(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Mg extends In{constructor(t=new q,e=new q,n=new q,s=new q){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new q){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ks(t,s.x,r.x,o.x,a.x),Ks(t,s.y,r.y,o.y,a.y),Ks(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zh extends In{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sg extends In{constructor(t=new q,e=new q){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new q){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jh extends In{constructor(t=new Et,e=new Et,n=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Et){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set($s(t,s.x,r.x,o.x),$s(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class bg extends In{constructor(t=new q,e=new q,n=new q){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new q){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set($s(t,s.x,r.x,o.x),$s(t,s.y,r.y,o.y),$s(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jh extends In{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return n.set(Gc(a,l.x,c.x,h.x,p.x),Gc(a,l.y,c.y,h.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Et().fromArray(s))}return this}}var ll=Object.freeze({__proto__:null,ArcCurve:dg,CatmullRomCurve3:fg,CubicBezierCurve:Kh,CubicBezierCurve3:Mg,EllipseCurve:El,LineCurve:Zh,LineCurve3:Sg,QuadraticBezierCurve:Jh,QuadraticBezierCurve3:bg,SplineCurve:jh});class wg extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ll[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ll[s.type]().fromJSON(s))}return this}}class Vc extends wg{constructor(t){super(),this.type="Path",this.currentPoint=new Et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Zh(this.currentPoint.clone(),new Et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Jh(this.currentPoint.clone(),new Et(t,e),new Et(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Kh(this.currentPoint.clone(),new Et(t,e),new Et(n,s),new Et(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new jh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new El(t,e,n,s,r,o,a,l);if(this.curves.length>0){const p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Al extends Se{constructor(t=[new Et(0,-.5),new Et(.5,0),new Et(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=We(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,p=new q,m=new Et,g=new q,u=new q,_=new q;let d=0,f=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:d=t[S+1].x-t[S].x,f=t[S+1].y-t[S].y,g.x=f*1,g.y=-d,g.z=f*0,_.copy(g),g.normalize(),l.push(g.x,g.y,g.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:d=t[S+1].x-t[S].x,f=t[S+1].y-t[S].y,g.x=f*1,g.y=-d,g.z=f*0,u.copy(g),g.x+=_.x,g.y+=_.y,g.z+=_.z,g.normalize(),l.push(g.x,g.y,g.z),_.copy(u)}for(let S=0;S<=e;S++){const M=n+S*h*s,y=Math.sin(M),B=Math.cos(M);for(let D=0;D<=t.length-1;D++){p.x=t[D].x*y,p.y=t[D].y,p.z=t[D].x*B,o.push(p.x,p.y,p.z),m.x=S/e,m.y=D/(t.length-1),a.push(m.x,m.y);const P=l[3*D+0]*y,z=l[3*D+1],et=l[3*D+0]*B;c.push(P,z,et)}}for(let S=0;S<e;S++)for(let M=0;M<t.length-1;M++){const y=M+S*t.length,B=y,D=y+t.length,P=y+t.length+1,z=y+1;r.push(B,D,z),r.push(P,z,D)}this.setIndex(r),this.setAttribute("position",new fe(o,3)),this.setAttribute("uv",new fe(a,2)),this.setAttribute("normal",new fe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Al(t.points,t.segments,t.phiStart,t.phiLength)}}class cr extends Se{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],p=[],m=[],g=[];let u=0;const _=[],d=n/2;let f=0;S(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new fe(p,3)),this.setAttribute("normal",new fe(m,3)),this.setAttribute("uv",new fe(g,2));function S(){const y=new q,B=new q;let D=0;const P=(e-t)/n;for(let z=0;z<=r;z++){const et=[],v=z/r,x=v*(e-t)+t;for(let I=0;I<=s;I++){const C=I/s,E=C*l+a,A=Math.sin(E),w=Math.cos(E);B.x=x*A,B.y=-v*n+d,B.z=x*w,p.push(B.x,B.y,B.z),y.set(A,P,w).normalize(),m.push(y.x,y.y,y.z),g.push(C,1-v),et.push(u++)}_.push(et)}for(let z=0;z<s;z++)for(let et=0;et<r;et++){const v=_[et][z],x=_[et+1][z],I=_[et+1][z+1],C=_[et][z+1];t>0&&(h.push(v,x,C),D+=3),e>0&&(h.push(x,I,C),D+=3)}c.addGroup(f,D,0),f+=D}function M(y){const B=u,D=new Et,P=new q;let z=0;const et=y===!0?t:e,v=y===!0?1:-1;for(let I=1;I<=s;I++)p.push(0,d*v,0),m.push(0,v,0),g.push(.5,.5),u++;const x=u;for(let I=0;I<=s;I++){const E=I/s*l+a,A=Math.cos(E),w=Math.sin(E);P.x=et*w,P.y=d*v,P.z=et*A,p.push(P.x,P.y,P.z),m.push(0,v,0),D.x=A*.5+.5,D.y=w*.5*v+.5,g.push(D.x,D.y),u++}for(let I=0;I<s;I++){const C=B+I,E=x+I;y===!0?h.push(E,E+1,C):h.push(E+1,E,C),z+=3}c.addGroup(f,z,y===!0?1:2),f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Cl extends cr{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Cl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const Hr=new q,Gr=new q,ca=new q,Vr=new hn;class Eg extends Se{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(jr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],p=new Array(3),m={},g=[];for(let u=0;u<l;u+=3){o?(c[0]=o.getX(u),c[1]=o.getX(u+1),c[2]=o.getX(u+2)):(c[0]=u,c[1]=u+1,c[2]=u+2);const{a:_,b:d,c:f}=Vr;if(_.fromBufferAttribute(a,c[0]),d.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),Vr.getNormal(ca),p[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,p[1]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,p[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const M=(S+1)%3,y=p[S],B=p[M],D=Vr[h[S]],P=Vr[h[M]],z=`${y}_${B}`,et=`${B}_${y}`;et in m&&m[et]?(ca.dot(m[et].normal)<=r&&(g.push(D.x,D.y,D.z),g.push(P.x,P.y,P.z)),m[et]=null):z in m||(m[z]={index0:c[S],index1:c[M],normal:ca.clone()})}}for(const u in m)if(m[u]){const{index0:_,index1:d}=m[u];Hr.fromBufferAttribute(a,_),Gr.fromBufferAttribute(a,d),g.push(Hr.x,Hr.y,Hr.z),g.push(Gr.x,Gr.y,Gr.z)}this.setAttribute("position",new fe(g,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class yo extends Vc{constructor(t){super(t),this.uuid=Kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Vc().fromJSON(s))}return this}}const Tg={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Qh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,p,m,g;if(n&&(r=Lg(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let u=e;u<s;u+=e)p=i[u],m=i[u+1],p<a&&(a=p),m<l&&(l=m),p>c&&(c=p),m>h&&(h=m);g=Math.max(c-a,h-l),g=g!==0?32767/g:0}return Qs(r,o,e,a,l,g,0),o}};function Qh(i,t,e,n,s){let r,o;if(s===Gg(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Wc(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Wc(r,i[r],i[r+1],o);return o&&Mo(o,o.next)&&(er(o),o=o.next),o}function Gi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Mo(e,e.next)||Ae(e.prev,e,e.next)===0)){if(er(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Qs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Fg(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Cg(i,n,s,r):Ag(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),er(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Rg(Gi(i),t,e),Qs(i,t,e,n,s,r,2)):o===2&&Pg(i,t,e,n,s,r):Qs(Gi(i),t,e,n,s,r,1);break}}}function Ag(i){const t=i.prev,e=i,n=i.next;if(Ae(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,p=a<l?a<c?a:c:l<c?l:c,m=s>r?s>o?s:o:r>o?r:o,g=a>l?a>c?a:c:l>c?l:c;let u=n.next;for(;u!==t;){if(u.x>=h&&u.x<=m&&u.y>=p&&u.y<=g&&fs(s,a,r,l,o,c,u.x,u.y)&&Ae(u.prev,u,u.next)>=0)return!1;u=u.next}return!0}function Cg(i,t,e,n){const s=i.prev,r=i,o=i.next;if(Ae(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,p=r.y,m=o.y,g=a<l?a<c?a:c:l<c?l:c,u=h<p?h<m?h:m:p<m?p:m,_=a>l?a>c?a:c:l>c?l:c,d=h>p?h>m?h:m:p>m?p:m,f=cl(g,u,t,e,n),S=cl(_,d,t,e,n);let M=i.prevZ,y=i.nextZ;for(;M&&M.z>=f&&y&&y.z<=S;){if(M.x>=g&&M.x<=_&&M.y>=u&&M.y<=d&&M!==s&&M!==o&&fs(a,h,l,p,c,m,M.x,M.y)&&Ae(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=g&&y.x<=_&&y.y>=u&&y.y<=d&&y!==s&&y!==o&&fs(a,h,l,p,c,m,y.x,y.y)&&Ae(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=f;){if(M.x>=g&&M.x<=_&&M.y>=u&&M.y<=d&&M!==s&&M!==o&&fs(a,h,l,p,c,m,M.x,M.y)&&Ae(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=S;){if(y.x>=g&&y.x<=_&&y.y>=u&&y.y<=d&&y!==s&&y!==o&&fs(a,h,l,p,c,m,y.x,y.y)&&Ae(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Rg(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Mo(s,r)&&tu(s,n,n.next,r)&&tr(s,r)&&tr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),er(n),er(n.next),n=i=r),n=n.next}while(n!==i);return Gi(n)}function Pg(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&zg(o,a)){let l=eu(o,a);o=Gi(o,o.next),l=Gi(l,l.next),Qs(o,t,e,n,s,r,0),Qs(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Lg(i,t,e,n){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Qh(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Bg(c));for(s.sort(Dg),r=0;r<s.length;r++)e=Ig(s[r],e);return e}function Dg(i,t){return i.x-t.x}function Ig(i,t){const e=Ng(i,t);if(!e)return t;const n=eu(e,i);return Gi(n,n.next),Gi(e,e.next)}function Ng(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const m=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(m<=r&&m>n&&(n=m,s=e.x<e.next.x?e:e.next,m===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,p;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&fs(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(p=Math.abs(o-e.y)/(r-e.x),tr(e,i)&&(p<h||p===h&&(e.x>s.x||e.x===s.x&&Ug(s,e)))&&(s=e,h=p)),e=e.next;while(e!==a);return s}function Ug(i,t){return Ae(i.prev,i,t.prev)<0&&Ae(t.next,i,i.next)<0}function Fg(i,t,e,n){let s=i;do s.z===0&&(s.z=cl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Og(s)}function Og(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function cl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Bg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fs(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function zg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!kg(i,t)&&(tr(i,t)&&tr(t,i)&&Hg(i,t)&&(Ae(i.prev,i,t.prev)||Ae(i,t.prev,t))||Mo(i,t)&&Ae(i.prev,i,i.next)>0&&Ae(t.prev,t,t.next)>0)}function Ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Mo(i,t){return i.x===t.x&&i.y===t.y}function tu(i,t,e,n){const s=Xr(Ae(i,t,e)),r=Xr(Ae(i,t,n)),o=Xr(Ae(e,n,i)),a=Xr(Ae(e,n,t));return!!(s!==r&&o!==a||s===0&&Wr(i,e,t)||r===0&&Wr(i,n,t)||o===0&&Wr(e,i,n)||a===0&&Wr(e,t,n))}function Wr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Xr(i){return i>0?1:i<0?-1:0}function kg(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&tu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function tr(i,t){return Ae(i.prev,i,i.next)<0?Ae(i,t,i.next)>=0&&Ae(i,i.prev,t)>=0:Ae(i,t,i.prev)<0||Ae(i,i.next,t)<0}function Hg(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function eu(i,t){const e=new hl(i.i,i.x,i.y),n=new hl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Wc(i,t,e,n){const s=new hl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function er(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function hl(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Gg(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class gi{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return gi.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Xc(t),qc(n,t);let o=t.length;e.forEach(Xc);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,qc(n,e[l]);const a=Tg.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Xc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function qc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class So extends Se{constructor(t=new yo([new Et(.5,.5),new Et(-.5,.5),new Et(-.5,-.5),new Et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new fe(s,3)),this.setAttribute("uv",new fe(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let m=e.bevelEnabled!==void 0?e.bevelEnabled:!0,g=e.bevelThickness!==void 0?e.bevelThickness:.2,u=e.bevelSize!==void 0?e.bevelSize:g-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,d=e.bevelSegments!==void 0?e.bevelSegments:3;const f=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:Vg;let M,y=!1,B,D,P,z;f&&(M=f.getSpacedPoints(h),y=!0,m=!1,B=f.computeFrenetFrames(h,!1),D=new q,P=new q,z=new q),m||(d=0,g=0,u=0,_=0);const et=a.extractPoints(c);let v=et.shape;const x=et.holes;if(!gi.isClockWise(v)){v=v.reverse();for(let nt=0,N=x.length;nt<N;nt++){const lt=x[nt];gi.isClockWise(lt)&&(x[nt]=lt.reverse())}}const C=gi.triangulateShape(v,x),E=v;for(let nt=0,N=x.length;nt<N;nt++){const lt=x[nt];v=v.concat(lt)}function A(nt,N,lt){return N||console.error("THREE.ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(N,lt)}const w=v.length,F=C.length;function T(nt,N,lt){let ut,gt,At;const Ot=nt.x-N.x,_t=nt.y-N.y,U=lt.x-nt.x,b=lt.y-nt.y,j=Ot*Ot+_t*_t,dt=Ot*b-_t*U;if(Math.abs(dt)>Number.EPSILON){const vt=Math.sqrt(j),ft=Math.sqrt(U*U+b*b),zt=N.x-_t/vt,Ct=N.y+Ot/vt,Nt=lt.x-b/ft,re=lt.y+U/ft,bt=((Nt-zt)*b-(re-Ct)*U)/(Ot*b-_t*U);ut=zt+Ot*bt-nt.x,gt=Ct+_t*bt-nt.y;const Ut=ut*ut+gt*gt;if(Ut<=2)return new Et(ut,gt);At=Math.sqrt(Ut/2)}else{let vt=!1;Ot>Number.EPSILON?U>Number.EPSILON&&(vt=!0):Ot<-Number.EPSILON?U<-Number.EPSILON&&(vt=!0):Math.sign(_t)===Math.sign(b)&&(vt=!0),vt?(ut=-_t,gt=Ot,At=Math.sqrt(j)):(ut=Ot,gt=_t,At=Math.sqrt(j/2))}return new Et(ut/At,gt/At)}const R=[];for(let nt=0,N=E.length,lt=N-1,ut=nt+1;nt<N;nt++,lt++,ut++)lt===N&&(lt=0),ut===N&&(ut=0),R[nt]=T(E[nt],E[lt],E[ut]);const k=[];let G,st=R.concat();for(let nt=0,N=x.length;nt<N;nt++){const lt=x[nt];G=[];for(let ut=0,gt=lt.length,At=gt-1,Ot=ut+1;ut<gt;ut++,At++,Ot++)At===gt&&(At=0),Ot===gt&&(Ot=0),G[ut]=T(lt[ut],lt[At],lt[Ot]);k.push(G),st=st.concat(G)}for(let nt=0;nt<d;nt++){const N=nt/d,lt=g*Math.cos(N*Math.PI/2),ut=u*Math.sin(N*Math.PI/2)+_;for(let gt=0,At=E.length;gt<At;gt++){const Ot=A(E[gt],R[gt],ut);K(Ot.x,Ot.y,-lt)}for(let gt=0,At=x.length;gt<At;gt++){const Ot=x[gt];G=k[gt];for(let _t=0,U=Ot.length;_t<U;_t++){const b=A(Ot[_t],G[_t],ut);K(b.x,b.y,-lt)}}}const X=u+_;for(let nt=0;nt<w;nt++){const N=m?A(v[nt],st[nt],X):v[nt];y?(P.copy(B.normals[0]).multiplyScalar(N.x),D.copy(B.binormals[0]).multiplyScalar(N.y),z.copy(M[0]).add(P).add(D),K(z.x,z.y,z.z)):K(N.x,N.y,0)}for(let nt=1;nt<=h;nt++)for(let N=0;N<w;N++){const lt=m?A(v[N],st[N],X):v[N];y?(P.copy(B.normals[nt]).multiplyScalar(lt.x),D.copy(B.binormals[nt]).multiplyScalar(lt.y),z.copy(M[nt]).add(P).add(D),K(z.x,z.y,z.z)):K(lt.x,lt.y,p/h*nt)}for(let nt=d-1;nt>=0;nt--){const N=nt/d,lt=g*Math.cos(N*Math.PI/2),ut=u*Math.sin(N*Math.PI/2)+_;for(let gt=0,At=E.length;gt<At;gt++){const Ot=A(E[gt],R[gt],ut);K(Ot.x,Ot.y,p+lt)}for(let gt=0,At=x.length;gt<At;gt++){const Ot=x[gt];G=k[gt];for(let _t=0,U=Ot.length;_t<U;_t++){const b=A(Ot[_t],G[_t],ut);y?K(b.x,b.y+M[h-1].y,M[h-1].x+lt):K(b.x,b.y,p+lt)}}}O(),W();function O(){const nt=s.length/3;if(m){let N=0,lt=w*N;for(let ut=0;ut<F;ut++){const gt=C[ut];ct(gt[2]+lt,gt[1]+lt,gt[0]+lt)}N=h+d*2,lt=w*N;for(let ut=0;ut<F;ut++){const gt=C[ut];ct(gt[0]+lt,gt[1]+lt,gt[2]+lt)}}else{for(let N=0;N<F;N++){const lt=C[N];ct(lt[2],lt[1],lt[0])}for(let N=0;N<F;N++){const lt=C[N];ct(lt[0]+w*h,lt[1]+w*h,lt[2]+w*h)}}n.addGroup(nt,s.length/3-nt,0)}function W(){const nt=s.length/3;let N=0;H(E,N),N+=E.length;for(let lt=0,ut=x.length;lt<ut;lt++){const gt=x[lt];H(gt,N),N+=gt.length}n.addGroup(nt,s.length/3-nt,1)}function H(nt,N){let lt=nt.length;for(;--lt>=0;){const ut=lt;let gt=lt-1;gt<0&&(gt=nt.length-1);for(let At=0,Ot=h+d*2;At<Ot;At++){const _t=w*At,U=w*(At+1),b=N+ut+_t,j=N+gt+_t,dt=N+gt+U,vt=N+ut+U;mt(b,j,dt,vt)}}}function K(nt,N,lt){l.push(nt),l.push(N),l.push(lt)}function ct(nt,N,lt){ht(nt),ht(N),ht(lt);const ut=s.length/3,gt=S.generateTopUV(n,s,ut-3,ut-2,ut-1);St(gt[0]),St(gt[1]),St(gt[2])}function mt(nt,N,lt,ut){ht(nt),ht(N),ht(ut),ht(N),ht(lt),ht(ut);const gt=s.length/3,At=S.generateSideWallUV(n,s,gt-6,gt-3,gt-2,gt-1);St(At[0]),St(At[1]),St(At[3]),St(At[1]),St(At[2]),St(At[3])}function ht(nt){s.push(l[nt*3+0]),s.push(l[nt*3+1]),s.push(l[nt*3+2])}function St(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Wg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ll[s.type]().fromJSON(s)),new So(n,t.options)}}const Vg={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new Et(r,o),new Et(a,l),new Et(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],p=t[n*3+2],m=t[s*3],g=t[s*3+1],u=t[s*3+2],_=t[r*3],d=t[r*3+1],f=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new Et(o,1-l),new Et(c,1-p),new Et(m,1-u),new Et(_,1-f)]:[new Et(a,1-l),new Et(h,1-p),new Et(g,1-u),new Et(d,1-f)]}};function Wg(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class bo extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let p=t;const m=(e-t)/s,g=new q,u=new Et;for(let _=0;_<=s;_++){for(let d=0;d<=n;d++){const f=r+d/n*o;g.x=p*Math.cos(f),g.y=p*Math.sin(f),l.push(g.x,g.y,g.z),c.push(0,0,1),u.x=(g.x/e+1)/2,u.y=(g.y/e+1)/2,h.push(u.x,u.y)}p+=m}for(let _=0;_<s;_++){const d=_*(n+1);for(let f=0;f<n;f++){const S=f+d,M=S,y=S+n+1,B=S+n+2,D=S+1;a.push(M,y,D),a.push(y,B,D)}}this.setIndex(a),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(c,3)),this.setAttribute("uv",new fe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Rl extends Se{constructor(t=new yo([new Et(0,.5),new Et(-.5,-.5),new Et(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new fe(s,3)),this.setAttribute("normal",new fe(r,3)),this.setAttribute("uv",new fe(o,2));function c(h){const p=s.length/3,m=h.extractPoints(e);let g=m.shape;const u=m.holes;gi.isClockWise(g)===!1&&(g=g.reverse());for(let d=0,f=u.length;d<f;d++){const S=u[d];gi.isClockWise(S)===!0&&(u[d]=S.reverse())}const _=gi.triangulateShape(g,u);for(let d=0,f=u.length;d<f;d++){const S=u[d];g=g.concat(S)}for(let d=0,f=g.length;d<f;d++){const S=g[d];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let d=0,f=_.length;d<f;d++){const S=_[d],M=S[0]+p,y=S[1]+p,B=S[2]+p;n.push(M,y,B),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Xg(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Rl(n,t.curveSegments)}}function Xg(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class nr extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],p=new q,m=new q,g=[],u=[],_=[],d=[];for(let f=0;f<=n;f++){const S=[],M=f/n;let y=0;f===0&&o===0?y=.5/e:f===n&&l===Math.PI&&(y=-.5/e);for(let B=0;B<=e;B++){const D=B/e;p.x=-t*Math.cos(s+D*r)*Math.sin(o+M*a),p.y=t*Math.cos(o+M*a),p.z=t*Math.sin(s+D*r)*Math.sin(o+M*a),u.push(p.x,p.y,p.z),m.copy(p).normalize(),_.push(m.x,m.y,m.z),d.push(D+y,1-M),S.push(c++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<e;S++){const M=h[f][S+1],y=h[f][S],B=h[f+1][S],D=h[f+1][S+1];(f!==0||o>0)&&g.push(M,y,D),(f!==n-1||l<Math.PI)&&g.push(y,B,D)}this.setIndex(g),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(_,3)),this.setAttribute("uv",new fe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Pl extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new q,p=new q,m=new q;for(let g=0;g<=n;g++)for(let u=0;u<=s;u++){const _=u/s*r,d=g/n*Math.PI*2;p.x=(t+e*Math.cos(d))*Math.cos(_),p.y=(t+e*Math.cos(d))*Math.sin(_),p.z=e*Math.sin(d),a.push(p.x,p.y,p.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),m.subVectors(p,h).normalize(),l.push(m.x,m.y,m.z),c.push(u/s),c.push(g/n)}for(let g=1;g<=n;g++)for(let u=1;u<=s;u++){const _=(s+1)*g+u-1,d=(s+1)*(g-1)+u-1,f=(s+1)*(g-1)+u,S=(s+1)*g+u;o.push(_,d,S),o.push(d,f,S)}this.setIndex(o),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(l,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Wn extends yi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ph,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Yc={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class qg{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){const p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,m=c.length;p<m;p+=2){const g=c[p],u=c[p+1];if(g.global&&(g.lastIndex=0),g.test(h))return u}return null}}}const Yg=new qg;class Ll{constructor(t){this.manager=t!==void 0?t:Yg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ll.DEFAULT_MATERIAL_NAME="__DEFAULT";class $g extends Ll{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Yc.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=Js("img");function l(){h(),Yc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(p){h(),s&&s(p),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Kg extends Ll{constructor(t){super(t)}load(t,e,n,s){const r=new Ze,o=new $g(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class wo extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class nu extends wo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ha=new de,$c=new q,Kc=new q;class iu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ml,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;$c.setFromMatrixPosition(t.matrixWorld),e.position.copy($c),Kc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kc),e.updateMatrixWorld(),ha.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ha),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ha)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Zc=new de,Vs=new q,ua=new q;class Zg extends iu{constructor(){super(new Xe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new ve(2,1,1,1),new ve(0,1,1,1),new ve(3,1,1,1),new ve(1,1,1,1),new ve(3,0,1,1),new ve(1,0,1,1)],this._cubeDirections=[new q(1,0,0),new q(-1,0,0),new q(0,0,1),new q(0,0,-1),new q(0,1,0),new q(0,-1,0)],this._cubeUps=[new q(0,1,0),new q(0,1,0),new q(0,1,0),new q(0,1,0),new q(0,0,1),new q(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Vs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Vs),ua.copy(n.position),ua.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ua),n.updateMatrixWorld(),s.makeTranslation(-Vs.x,-Vs.y,-Vs.z),Zc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zc)}}class su extends wo{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Zg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Jg extends iu{constructor(){super(new Gh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jc extends wo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Jg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class jg extends wo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const jc=new de;class Eo{constructor(t,e,n=0,s=1/0){this.ray=new go(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new yl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return jc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jc),this}intersectObject(t,e=!0,n=[]){return ul(t,this,n,e),n.sort(Qc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ul(t[s],this,n,e);return n.sort(Qc),n}}function Qc(i,t){return i.distance-t.distance}function ul(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ul(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dl);const th=new q,Qg=new Ts,eh=new q;class tv extends De{constructor(t=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this}}const Cn=new de,ev=new de;class nv{constructor(t={}){const e=this;let n,s,r,o;const a={camera:{style:""},objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;const c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);const h=document.createElement("div");h.style.transformStyle="preserve-3d",c.appendChild(h),this.getSize=function(){return{width:n,height:s}},this.render=function(d,f){const S=f.projectionMatrix.elements[5]*o;f.view&&f.view.enabled?(c.style.transform=`translate( ${-f.view.offsetX*(n/f.view.width)}px, ${-f.view.offsetY*(s/f.view.height)}px )`,c.style.transform+=`scale( ${f.view.fullWidth/f.view.width}, ${f.view.fullHeight/f.view.height} )`):c.style.transform="",d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),f.parent===null&&f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld();let M,y;f.isOrthographicCamera&&(M=-(f.right+f.left)/2,y=(f.top+f.bottom)/2);const B=f.view&&f.view.enabled?f.view.height/f.view.fullHeight:1,D=f.isOrthographicCamera?`scale( ${B} )scale(`+S+")translate("+p(M)+"px,"+p(y)+"px)"+m(f.matrixWorldInverse):`scale( ${B} )translateZ(`+S+"px)"+m(f.matrixWorldInverse),z=(f.isPerspectiveCamera?"perspective("+S+"px) ":"")+D+"translate("+r+"px,"+o+"px)";a.camera.style!==z&&(h.style.transform=z,a.camera.style=z),_(d,d,f)},this.setSize=function(d,f){n=d,s=f,r=n/2,o=s/2,l.style.width=d+"px",l.style.height=f+"px",c.style.width=d+"px",c.style.height=f+"px",h.style.width=d+"px",h.style.height=f+"px"};function p(d){return Math.abs(d)<1e-10?0:d}function m(d){const f=d.elements;return"matrix3d("+p(f[0])+","+p(-f[1])+","+p(f[2])+","+p(f[3])+","+p(f[4])+","+p(-f[5])+","+p(f[6])+","+p(f[7])+","+p(f[8])+","+p(-f[9])+","+p(f[10])+","+p(f[11])+","+p(f[12])+","+p(-f[13])+","+p(f[14])+","+p(f[15])+")"}function g(d){const f=d.elements;return"translate(-50%,-50%)"+("matrix3d("+p(f[0])+","+p(f[1])+","+p(f[2])+","+p(f[3])+","+p(-f[4])+","+p(-f[5])+","+p(-f[6])+","+p(-f[7])+","+p(f[8])+","+p(f[9])+","+p(f[10])+","+p(f[11])+","+p(f[12])+","+p(f[13])+","+p(f[14])+","+p(f[15])+")")}function u(d){d.isCSS3DObject&&(d.element.style.display="none");for(let f=0,S=d.children.length;f<S;f++)u(d.children[f])}function _(d,f,S,M){if(d.visible===!1){u(d);return}if(d.isCSS3DObject){const y=d.layers.test(S.layers)===!0,B=d.element;if(B.style.display=y===!0?"":"none",y===!0){d.onBeforeRender(e,f,S);let D;d.isCSS3DSprite?(Cn.copy(S.matrixWorldInverse),Cn.transpose(),d.rotation2D!==0&&Cn.multiply(ev.makeRotationZ(d.rotation2D)),d.matrixWorld.decompose(th,Qg,eh),Cn.setPosition(th),Cn.scale(eh),Cn.elements[3]=0,Cn.elements[7]=0,Cn.elements[11]=0,Cn.elements[15]=1,D=g(Cn)):D=g(d.matrixWorld);const P=a.objects.get(d);if(P===void 0||P.style!==D){B.style.transform=D;const z={style:D};a.objects.set(d,z)}B.parentNode!==h&&h.appendChild(B),d.onAfterRender(e,f,S)}}for(let y=0,B=d.children.length;y<B;y++)_(d.children[y],f,S)}}}const iv=[{type:"Feature",properties:{name:"福州市"},geometry:{type:"MultiPolygon",coordinates:[[[[119.8,26.5468],[119.7287,26.5595],[119.6379,26.5282],[119.5655,26.5465],[119.5066,26.6072],[119.4085,26.6344],[119.3796,26.6115],[119.3355,26.5852],[119.2851,26.5704],[119.2045,26.5634],[119.1413,26.5379],[119.0904,26.566],[119.0578,26.6037],[119.0061,26.5557],[118.9538,26.5256],[118.9503,26.4695],[118.8602,26.4534],[118.8047,26.4683],[118.7469,26.5024],[118.7533,26.3985],[118.7535,26.3343],[118.6966,26.2915],[118.6633,26.2279],[118.6097,26.2049],[118.568,26.1764],[118.5837,26.0985],[118.5919,26.0522],[118.5139,25.9767],[118.5077,25.9015],[118.4711,25.8986],[118.4325,25.9176],[118.4212,25.8546],[118.398,25.801],[118.4544,25.7207],[118.5401,25.6616],[118.5838,25.6778],[118.6255,25.6974],[118.6744,25.6949],[118.7233,25.6698],[118.7724,25.6864],[118.8389,25.7089],[118.9203,25.7263],[118.955,25.7327],[119.0488,25.7471],[119.1329,25.7528],[119.1443,25.6849],[119.1515,25.6187],[119.1636,25.5872],[119.2039,25.545],[119.2238,25.4897],[119.2726,25.4778],[119.3436,25.4725],[119.4356,25.4995],[119.4384,25.4274],[119.4859,25.4224],[119.5008,25.3664],[119.5649,25.3853],[119.573,25.4503],[119.5964,25.3529],[119.6585,25.354],[119.6602,25.366],[119.6701,25.4355],[119.6411,25.4444],[119.7031,25.4405],[119.7836,25.4115],[119.8265,25.4653],[119.8639,25.4797],[119.811,25.5071],[119.8873,25.5524],[119.8417,25.5921],[119.7919,25.6539],[119.7125,25.6237],[119.7134,25.5362],[119.6918,25.5016],[119.644,25.4856],[119.6198,25.5372],[119.5708,25.5822],[119.5257,25.6243],[119.4893,25.668],[119.612,25.7036],[119.6276,25.7683],[119.6952,25.9044],[119.6758,26.0258],[119.6329,26.1156],[119.6435,26.1958],[119.6691,26.257],[119.8147,26.2803],[119.8626,26.3076],[119.9545,26.3527],[119.8809,26.3728],[119.8,26.5468]]],[[[119.5799,25.6271],[119.5877,25.6366],[119.6011,25.641],[119.6101,25.6539],[119.6132,25.6685],[119.5984,25.662],[119.5808,25.6499],[119.5725,25.6339],[119.5679,25.6461],[119.5607,25.635],[119.5799,25.6271]]],[[[120.0063,26.2152],[120.0163,26.2085],[120.0201,26.2257],[120.0009,26.2362],[119.9881,26.2244],[119.9707,26.2172],[119.9696,26.1911],[119.9784,26.1935],[119.9807,26.2084],[120.0063,26.2152]]],[[[119.9295,26.1343],[119.9366,26.1401],[119.945,26.1392],[119.9559,26.1489],[119.96,26.1472],[119.9701,26.1628],[119.9508,26.1637],[119.9457,26.1561],[119.9288,26.1603],[119.933,26.1688],[119.9183,26.1696],[119.9189,26.1544],[119.913,26.1402],[119.9295,26.1343]]],[[[119.6429,26.1293],[119.6549,26.1326],[119.6534,26.1442],[119.6572,26.1521],[119.6429,26.1572],[119.6273,26.1731],[119.6071,26.1697],[119.6054,26.1548],[119.6186,26.139],[119.6424,26.1338],[119.6429,26.1293]]],[[[119.6624,25.6466],[119.6621,25.6412],[119.6736,25.6326],[119.698,25.6364],[119.7027,25.6401],[119.713,25.6342],[119.7219,25.6398],[119.7169,25.6648],[119.7059,25.6564],[119.6826,25.65],[119.6756,25.6587],[119.6624,25.6466]]]]}},{type:"Feature",properties:{name:"厦门市"},geometry:{type:"MultiPolygon",coordinates:[[[[118.049,24.4183],[118.0522,24.4451],[118.0646,24.464],[118.0984,24.5481],[118.1059,24.5517],[118.1505,24.5835],[118.162,24.5722],[118.1694,24.5593],[118.2429,24.5125],[118.2899,24.5227],[118.3635,24.5302],[118.3755,24.5364],[118.3735,24.5476],[118.3635,24.5682],[118.3738,24.5756],[118.3531,24.5851],[118.3418,24.5924],[118.3412,24.6073],[118.3296,24.6053],[118.337,24.6173],[118.347,24.6306],[118.3433,24.6421],[118.3521,24.6643],[118.3387,24.6738],[118.3388,24.682],[118.322,24.6982],[118.3365,24.7184],[118.3222,24.7332],[118.3169,24.7489],[118.3351,24.7525],[118.3448,24.7717],[118.338,24.7804],[118.3226,24.7838],[118.3256,24.7982],[118.312,24.8049],[118.2844,24.8325],[118.2637,24.8253],[118.2432,24.8249],[118.2318,24.826],[118.2258,24.8508],[118.1971,24.8664],[118.1973,24.88],[118.195,24.8926],[118.1769,24.8932],[118.1507,24.8917],[118.1379,24.8948],[118.1255,24.8885],[118.1097,24.8752],[118.0856,24.8637],[118.0725,24.8619],[118.0719,24.8744],[118.0658,24.8754],[118.0421,24.8831],[118.0368,24.8997],[118.0091,24.8928],[117.997,24.8998],[118.0046,24.8878],[118.0145,24.8797],[118.0117,24.8752],[117.9915,24.8669],[117.999,24.8599],[117.9578,24.8682],[117.9474,24.8711],[117.9364,24.8664],[117.9177,24.8795],[117.913,24.8703],[117.9404,24.8447],[117.9564,24.8451],[117.963,24.8412],[117.9613,24.7881],[117.9552,24.7656],[117.941,24.7425],[117.9484,24.7117],[117.9654,24.671],[117.9578,24.6661],[117.9547,24.6492],[117.9207,24.6142],[117.8924,24.6116],[117.886,24.5902],[117.9136,24.5686],[117.9085,24.5553],[117.9121,24.5334],[117.9313,24.5267],[117.9586,24.5013],[117.9624,24.4804],[117.9568,24.4592],[117.975,24.4349],[117.9851,24.4335],[118.0055,24.4186],[118.0285,24.4205],[118.049,24.4183]]],[[[118.2045,24.5048],[118.2016,24.5256],[118.1917,24.5368],[118.1702,24.5459],[118.1556,24.5478],[118.1426,24.5616],[118.1117,24.5553],[118.1003,24.5481],[118.0891,24.5325],[118.0757,24.4947],[118.069,24.4677],[118.0704,24.4552],[118.0889,24.4313],[118.1062,24.4244],[118.1346,24.4197],[118.1432,24.4208],[118.1565,24.4344],[118.1989,24.4683],[118.2068,24.4815],[118.2045,24.5048]]]]}},{type:"Feature",properties:{name:"莆田市"},geometry:{type:"MultiPolygon",coordinates:[[[[118.8998,25.2414],[118.9301,25.2559],[118.9837,25.2697],[119.0236,25.2679],[118.9969,25.2663],[118.9784,25.2228],[119.0125,25.2044],[119.0647,25.2067],[119.0628,25.1739],[119.0285,25.1645],[119.0523,25.1125],[119.1343,25.1061],[119.1073,25.0753],[119.0969,25.0561],[119.1067,25.033],[119.1258,25.0211],[119.1418,25.0827],[119.1658,25.1454],[119.1383,25.1519],[119.1081,25.1941],[119.1385,25.2247],[119.199,25.1764],[119.261,25.1756],[119.301,25.178],[119.2934,25.2351],[119.3409,25.2409],[119.3851,25.2757],[119.3357,25.2855],[119.2926,25.3312],[119.2483,25.3162],[119.2271,25.3449],[119.1953,25.3683],[119.1517,25.383],[119.1516,25.4265],[119.2322,25.4423],[119.2127,25.472],[119.2308,25.5039],[119.235,25.5427],[119.1807,25.5551],[119.157,25.5842],[119.1691,25.5932],[119.1552,25.6031],[119.1333,25.6463],[119.1443,25.6849],[119.1441,25.7099],[119.1522,25.7447],[119.0906,25.7496],[119.0711,25.7527],[119.0148,25.7355],[118.955,25.7327],[118.9424,25.7485],[118.9203,25.7263],[118.8744,25.6983],[118.8264,25.7198],[118.8065,25.7096],[118.7604,25.6891],[118.7378,25.6782],[118.7263,25.6947],[118.6911,25.695],[118.6682,25.7085],[118.6319,25.698],[118.612,25.6991],[118.5877,25.69],[118.5778,25.6773],[118.5435,25.6715],[118.5313,25.6424],[118.5331,25.6079],[118.4901,25.55],[118.4647,25.5163],[118.4666,25.4829],[118.4713,25.4666],[118.4822,25.4255],[118.5033,25.3846],[118.5298,25.3581],[118.5129,25.3176],[118.5357,25.3208],[118.5719,25.2867],[118.6157,25.2931],[118.6557,25.302],[118.6501,25.2745],[118.662,25.2657],[118.6848,25.2447],[118.6824,25.2124],[118.6736,25.2007],[118.692,25.1693],[118.7175,25.1694],[118.7651,25.195],[118.7819,25.2138],[118.8277,25.2183],[118.8695,25.2276],[118.8998,25.2414]]],[[[119.471,25.1971],[119.5085,25.1819],[119.5094,25.1709],[119.5212,25.1666],[119.5236,25.1581],[119.5545,25.1644],[119.5477,25.1812],[119.5557,25.1832],[119.5546,25.1931],[119.5709,25.1934],[119.5784,25.2048],[119.5666,25.21],[119.5551,25.2035],[119.5451,25.2103],[119.5405,25.2021],[119.5182,25.208],[119.5148,25.2146],[119.5062,25.2147],[119.4992,25.2218],[119.4994,25.2403],[119.4885,25.247],[119.479,25.2435],[119.479,25.2577],[119.4715,25.2596],[119.4677,25.2463],[119.4517,25.2423],[119.4539,25.2366],[119.4392,25.2368],[119.4466,25.2225],[119.441,25.2116],[119.4441,25.2021],[119.471,25.1971]]]]}},{type:"Feature",properties:{name:"三明市"},geometry:{type:"MultiPolygon",coordinates:[[[[117.7181,25.512],[117.7865,25.482],[117.8405,25.4919],[117.9626,25.5288],[118.0337,25.5881],[118.0036,25.6169],[117.9534,25.6557],[118.0001,25.6858],[117.9832,25.7596],[118.0264,25.8314],[118.0495,25.8583],[118.1298,25.9],[118.2155,25.8979],[118.2755,25.9298],[118.3503,25.937],[118.4185,25.8924],[118.4769,25.882],[118.5077,25.9015],[118.5191,25.9865],[118.601,26.0552],[118.5868,26.1324],[118.5785,26.204],[118.6314,26.2347],[118.6305,26.2887],[118.5638,26.3362],[118.4949,26.3642],[118.4369,26.3927],[118.3934,26.3942],[118.323,26.4196],[118.2999,26.4198],[118.2408,26.396],[118.1814,26.3889],[118.1133,26.3942],[118.0655,26.4536],[118.0338,26.4976],[117.9947,26.5515],[117.9504,26.5635],[117.8725,26.5812],[117.8551,26.6403],[117.8186,26.6718],[117.7445,26.6586],[117.6628,26.6463],[117.601,26.7088],[117.6715,26.7839],[117.6198,26.8721],[117.5443,26.9226],[117.5349,26.9832],[117.4852,27.0226],[117.4478,27.0298],[117.3955,27.0675],[117.3017,27.1199],[117.2854,27.0759],[117.2253,27.0501],[117.1223,27.0933],[117.0324,27.0897],[116.8943,27.0327],[116.7573,26.9844],[116.569,26.859],[116.5586,26.7668],[116.5505,26.6512],[116.5409,26.5564],[116.6012,26.4905],[116.6107,26.4333],[116.5711,26.371],[116.5194,26.4104],[116.4538,26.3316],[116.4018,26.2749],[116.3994,26.1899],[116.4821,26.1601],[116.4217,26.0657],[116.4744,26.0097],[116.5935,25.9915],[116.6507,25.9611],[116.7198,25.9065],[116.781,25.832],[116.8852,25.8242],[116.9863,25.8543],[117.0582,25.7473],[117.058,25.686],[117.14,25.6422],[117.2123,25.5703],[117.2539,25.6428],[117.2667,25.7249],[117.3758,25.7824],[117.4018,25.6904],[117.4703,25.7201],[117.494,25.7226],[117.5596,25.6979],[117.6461,25.6707],[117.7258,25.5476],[117.7181,25.512]]]]}},{type:"Feature",properties:{name:"泉州市"},geometry:{type:"MultiPolygon",coordinates:[[[[118.8998,25.2414],[118.8487,25.2249],[118.7785,25.1954],[118.7047,25.1576],[118.6736,25.2007],[118.6848,25.2447],[118.6464,25.2684],[118.6256,25.2935],[118.5635,25.2903],[118.5129,25.3176],[118.5033,25.3846],[118.4601,25.4436],[118.4736,25.4913],[118.51,25.5619],[118.5313,25.6424],[118.48,25.7071],[118.425,25.7614],[118.3927,25.8254],[118.4098,25.8894],[118.3503,25.937],[118.2959,25.9226],[118.2481,25.8962],[118.1802,25.8842],[118.0966,25.8865],[118.0495,25.8583],[118.0301,25.8234],[117.9987,25.7667],[118.0095,25.7242],[117.9597,25.6721],[117.9565,25.6406],[118.0036,25.6169],[118.0395,25.5922],[117.9943,25.5374],[117.8929,25.4974],[117.8202,25.5171],[117.7696,25.4994],[117.7338,25.5141],[117.6976,25.4557],[117.6783,25.3553],[117.6046,25.2842],[117.5958,25.2218],[117.5732,25.1889],[117.6266,25.1384],[117.7076,25.0679],[117.7384,25.0373],[117.6851,24.9885],[117.6043,24.9479],[117.6167,24.8771],[117.6834,24.849],[117.7702,24.8686],[117.8126,24.85],[117.8498,24.8739],[117.913,24.8703],[117.9711,24.8481],[118.0046,24.8878],[118.0368,24.8997],[118.0778,24.8543],[118.1507,24.8917],[118.1971,24.8664],[118.2521,24.8314],[118.3226,24.7838],[118.3169,24.7489],[118.3388,24.682],[118.347,24.6306],[118.3418,24.5924],[118.403,24.5781],[118.5573,24.5729],[118.5664,24.5206],[118.6254,24.5351],[118.6803,24.5822],[118.655,24.6337],[118.6859,24.6626],[118.7398,24.7063],[118.7658,24.7346],[118.7314,24.8009],[118.6909,24.7999],[118.6877,24.8566],[118.7349,24.8261],[118.8197,24.869],[118.8477,24.8757],[118.9489,24.8762],[118.9421,24.9082],[118.9456,24.954],[119.0325,24.9614],[118.9886,24.9955],[118.999,25.0556],[118.9463,25.0431],[118.9165,25.099],[118.9515,25.1494],[118.9504,25.2062],[118.8998,25.2414]]],[[[118.4125,24.5143],[118.395,24.5089],[118.3999,24.4907],[118.3837,24.4807],[118.3904,24.4749],[118.3895,24.4655],[118.3746,24.4588],[118.3453,24.4686],[118.3187,24.4866],[118.2957,24.4753],[118.294,24.4668],[118.3048,24.4546],[118.312,24.4246],[118.2901,24.4231],[118.2907,24.415],[118.2819,24.4104],[118.2943,24.4015],[118.2995,24.3924],[118.3188,24.3836],[118.3331,24.3837],[118.3398,24.3902],[118.3507,24.4123],[118.3723,24.4264],[118.4053,24.4281],[118.4161,24.4217],[118.4324,24.4189],[118.437,24.411],[118.4307,24.4036],[118.4577,24.4123],[118.4595,24.4201],[118.4698,24.4253],[118.4656,24.4342],[118.477,24.4375],[118.479,24.448],[118.4675,24.4593],[118.4679,24.4704],[118.4735,24.4773],[118.4629,24.4785],[118.4549,24.5044],[118.4385,24.5077],[118.4305,24.5213],[118.4146,24.5267],[118.4125,24.5143]]],[[[118.2304,24.4013],[118.2382,24.4082],[118.2467,24.4073],[118.2528,24.4173],[118.27,24.4214],[118.2734,24.4411],[118.2557,24.4519],[118.2339,24.4458],[118.2291,24.428],[118.2207,24.4258],[118.2179,24.4056],[118.2304,24.4013]]]]}},{type:"Feature",properties:{name:"漳州市"},geometry:{type:"MultiPolygon",coordinates:[[[[116.9039,24.3699],[116.9082,24.3418],[116.9143,24.2877],[116.9354,24.248],[116.9713,24.1981],[116.9904,24.1684],[116.9471,24.1349],[116.937,24.0546],[116.9552,24.0202],[116.97,24.0075],[116.9826,23.9593],[116.9593,23.9145],[116.9755,23.8723],[116.9846,23.8613],[117.0267,23.8199],[117.0425,23.7638],[117.054,23.7085],[117.0741,23.6909],[117.133,23.6515],[117.1859,23.6362],[117.2913,23.5712],[117.3618,23.5563],[117.454,23.575],[117.4547,23.6282],[117.4986,23.6673],[117.5027,23.7046],[117.5899,23.7018],[117.6394,23.7678],[117.6585,23.8518],[117.7626,23.887],[117.8076,23.9474],[117.8901,24.0048],[117.925,24.0752],[117.9748,24.1345],[118.0194,24.1973],[118.0747,24.2255],[118.1434,24.2518],[118.1444,24.2938],[118.1269,24.3331],[118.0814,24.3563],[118.0863,24.4103],[118.0055,24.4186],[117.9641,24.444],[117.9375,24.5134],[117.9085,24.5553],[117.8924,24.6116],[117.9578,24.6661],[117.941,24.7425],[117.9592,24.824],[117.9247,24.8643],[117.8936,24.8872],[117.8498,24.8739],[117.8221,24.858],[117.79,24.8572],[117.7626,24.8684],[117.7116,24.8636],[117.6449,24.8589],[117.6149,24.898],[117.607,24.9303],[117.6548,24.9813],[117.6951,24.9922],[117.7371,25.0265],[117.7267,25.0712],[117.6775,25.088],[117.6266,25.1384],[117.5967,25.1714],[117.5622,25.1875],[117.5482,25.1922],[117.4974,25.1743],[117.4788,25.1278],[117.5039,25.0415],[117.4931,24.9621],[117.3937,24.9807],[117.3413,24.9787],[117.3009,24.9757],[117.2797,24.9877],[117.2459,24.954],[117.2196,24.9084],[117.1966,24.9008],[117.1544,24.8133],[117.0807,24.781],[117.0567,24.8237],[117.028,24.7802],[117.0269,24.6939],[117.0435,24.6336],[117.0252,24.602],[116.9968,24.5406],[116.9356,24.5219],[116.9173,24.4903],[116.9349,24.39],[116.9039,24.3699]]]]}},{type:"Feature",properties:{name:"南平市"},geometry:{type:"MultiPolygon",coordinates:[[[[119.2621,27.4206],[119.1685,27.4249],[119.1313,27.4631],[119.0208,27.4979],[118.9492,27.4564],[118.8736,27.5178],[118.9025,27.5916],[118.8746,27.6828],[118.854,27.7743],[118.8357,27.8665],[118.7542,27.9427],[118.7203,28.0454],[118.8023,28.1173],[118.7821,28.1932],[118.7394,28.2774],[118.6403,28.2735],[118.5475,28.2866],[118.4907,28.2384],[118.4243,28.2915],[118.3194,28.2145],[118.3618,28.1404],[118.292,28.0826],[118.1538,28.0619],[118.0899,27.965],[117.9981,27.9912],[117.891,27.9485],[117.7884,27.8829],[117.7164,27.8162],[117.6036,27.8859],[117.5605,27.9473],[117.4747,27.9305],[117.3666,27.8824],[117.3034,27.8722],[117.3056,27.7755],[117.2277,27.7192],[117.1066,27.6861],[117.0787,27.6509],[117.017,27.6117],[117.0849,27.5641],[117.1102,27.4588],[117.1041,27.3667],[117.1602,27.2957],[117.1067,27.2036],[117.064,27.1098],[117.161,27.1103],[117.2764,27.0578],[117.2866,27.1292],[117.3955,27.0675],[117.4443,27.0229],[117.5125,27.009],[117.5039,26.9437],[117.5894,26.893],[117.6706,26.8048],[117.601,26.7088],[117.6676,26.6347],[117.769,26.6555],[117.854,26.6796],[117.8565,26.6013],[117.9228,26.5595],[118.0111,26.5696],[118.0385,26.4885],[118.067,26.4273],[118.1361,26.3657],[118.2151,26.4046],[118.2795,26.4225],[118.3326,26.426],[118.3934,26.3942],[118.427,26.3799],[118.5264,26.3361],[118.5993,26.3045],[118.6731,26.2518],[118.6239,26.3662],[118.5509,26.3914],[118.6086,26.4896],[118.5887,26.6052],[118.5723,26.6834],[118.6241,26.7712],[118.6633,26.8631],[118.6718,26.9473],[118.7922,26.9531],[118.8603,27.0222],[118.9464,27.105],[118.934,27.1599],[119.0014,27.0972],[119.0938,27.0829],[119.1604,27.0921],[119.1883,27.1698],[119.2472,27.2015],[119.2118,27.2633],[119.2474,27.3453],[119.2621,27.4206]]]]}},{type:"Feature",properties:{name:"龙岩市"},geometry:{type:"MultiPolygon",coordinates:[[[[116.4001,26.0331],[116.368,25.9749],[116.3024,25.9226],[116.2251,25.9085],[116.1307,25.8587],[116.1816,25.7764],[116.146,25.7596],[116.107,25.7011],[116.0562,25.6824],[116.051,25.6276],[116.0628,25.5633],[116.0158,25.5082],[116.0221,25.4379],[115.996,25.3796],[116.0058,25.3309],[115.9747,25.2899],[115.9395,25.254],[115.8705,25.2212],[115.8551,25.1532],[115.8739,25.1218],[115.9139,25.0607],[115.8882,25.0229],[115.9171,24.9743],[115.883,24.9767],[115.8973,24.9371],[116.0031,24.8965],[116.0628,24.8599],[116.116,24.8514],[116.2109,24.8545],[116.2337,24.8062],[116.3,24.8029],[116.3497,24.8567],[116.3939,24.8569],[116.3997,24.794],[116.4461,24.7145],[116.505,24.667],[116.573,24.6301],[116.6671,24.6586],[116.7538,24.6545],[116.7989,24.624],[116.7561,24.555],[116.7968,24.5021],[116.8517,24.4528],[116.8635,24.4098],[116.9284,24.3826],[116.9173,24.4903],[116.9477,24.545],[117.0252,24.602],[117.0469,24.6533],[117.0235,24.7736],[117.0721,24.8077],[117.1442,24.7904],[117.1886,24.9039],[117.2374,24.9234],[117.2797,24.9877],[117.318,24.9683],[117.3937,24.9807],[117.4906,25.0168],[117.4788,25.1278],[117.5158,25.1757],[117.5707,25.2202],[117.6211,25.2475],[117.6616,25.3364],[117.699,25.4222],[117.7224,25.4814],[117.6889,25.5351],[117.7185,25.5905],[117.6353,25.6664],[117.5596,25.6979],[117.5069,25.7029],[117.4617,25.7358],[117.4358,25.6657],[117.3962,25.7337],[117.3758,25.7824],[117.2846,25.7374],[117.2745,25.6873],[117.2208,25.6035],[117.1972,25.5593],[117.14,25.6422],[117.0717,25.6843],[117.055,25.7156],[117.0563,25.7862],[116.9528,25.8421],[116.8852,25.8242],[116.7782,25.8185],[116.7481,25.8541],[116.6834,25.9299],[116.6447,25.98],[116.5935,25.9915],[116.4805,25.999],[116.4001,26.0331]]]]}},{type:"Feature",properties:{name:"宁德市"},geometry:{type:"MultiPolygon",coordinates:[[[[119.8,26.5468],[119.7401,26.6107],[119.6363,26.6018],[119.6282,26.6763],[119.6569,26.7281],[119.7876,26.691],[119.8739,26.6429],[119.9298,26.7255],[119.9689,26.7861],[120.0595,26.7662],[119.9706,26.6916],[119.9464,26.612],[119.8444,26.5689],[119.8847,26.5101],[119.938,26.5765],[120.0681,26.6275],[120.131,26.6619],[120.1658,26.7315],[120.137,26.7882],[120.1024,26.8268],[120.0835,26.8715],[120.1384,26.9153],[120.2319,26.9072],[120.2786,26.9858],[120.2869,27.0625],[120.3589,27.0857],[120.4384,27.161],[120.4018,27.2509],[120.3748,27.3293],[120.3318,27.3961],[120.2582,27.4127],[120.2024,27.4284],[120.1216,27.3974],[120.0276,27.3423],[119.9603,27.3661],[119.9033,27.3176],[119.8462,27.3241],[119.7957,27.3105],[119.7691,27.3454],[119.7325,27.3898],[119.7034,27.4473],[119.6846,27.5412],[119.6454,27.5782],[119.6352,27.6687],[119.5493,27.6701],[119.5012,27.6499],[119.4747,27.5393],[119.395,27.5393],[119.2764,27.4355],[119.2679,27.3694],[119.2288,27.3125],[119.2334,27.2353],[119.235,27.2241],[119.1918,27.1618],[119.1439,27.0879],[119.0938,27.0829],[119.0139,27.0964],[118.9438,27.1715],[118.9478,27.1413],[118.916,27.0969],[118.8418,27.0135],[118.7827,26.9471],[118.6718,26.9473],[118.6726,26.8595],[118.6375,26.7947],[118.5879,26.7094],[118.6006,26.6598],[118.5909,26.5532],[118.6017,26.4775],[118.5509,26.3914],[118.6095,26.362],[118.666,26.2938],[118.7205,26.3404],[118.7663,26.3927],[118.7469,26.5024],[118.8047,26.4683],[118.8548,26.4395],[118.9503,26.4695],[118.9682,26.5325],[119.0157,26.5898],[119.0654,26.5794],[119.1159,26.5389],[119.1961,26.5689],[119.2792,26.5351],[119.3355,26.5852],[119.3804,26.6215],[119.4491,26.6306],[119.5348,26.5611],[119.6104,26.5274],[119.6994,26.5693],[119.8,26.5468]]],[[[119.9068,26.6898],[119.9047,26.6823],[119.9168,26.6747],[119.9256,26.675],[119.9268,26.6646],[119.934,26.6666],[119.9467,26.6598],[119.9392,26.6706],[119.9437,26.6841],[119.9508,26.6925],[119.9196,26.6922],[119.9068,26.6898]]],[[[120.0344,26.4888],[120.0481,26.4946],[120.062,26.4945],[120.0713,26.5089],[120.0716,26.5213],[120.0603,26.5224],[120.0575,26.5163],[120.0492,26.5202],[120.0361,26.5159],[120.0328,26.5009],[120.0264,26.4975],[120.0344,26.4888]]],[[[119.7609,26.6133],[119.767,26.6043],[119.7765,26.5998],[119.7921,26.6055],[119.7978,26.6114],[119.8115,26.6088],[119.8188,26.621],[119.7989,26.6312],[119.7603,26.6209],[119.7609,26.6133]]],[[[120.1359,26.551],[120.1504,26.5602],[120.1507,26.5687],[120.167,26.5715],[120.1711,26.5989],[120.1629,26.6056],[120.1508,26.6026],[120.1368,26.5881],[120.1346,26.5814],[120.1179,26.5691],[120.1264,26.5547],[120.1359,26.551]]],[[[120.3606,26.9169],[120.3802,26.9274],[120.3956,26.9264],[120.3944,26.9339],[120.3805,26.9403],[120.3705,26.9619],[120.3542,26.9709],[120.339,26.9704],[120.3209,26.9561],[120.3223,26.9402],[120.3431,26.9222],[120.3606,26.9169]]],[[[119.6682,26.6285],[119.6945,26.6301],[119.7207,26.6361],[119.7588,26.6595],[119.7628,26.675],[119.749,26.6811],[119.7129,26.6685],[119.6917,26.671],[119.674,26.6808],[119.6662,26.6795],[119.6569,26.6699],[119.6519,26.6489],[119.6586,26.6344],[119.6682,26.6285]]]]}}],sv={features:iv},nh={go:"围棋",wuzi:"五子棋",xq:"中国象棋",chess:"国际象棋"},ir=i=>Math.random()*i|0;function rv(i,t){const n=new Map,s=(u,_)=>u+","+_,r=(u,_)=>u>=0&&_>=0&&u<19&&_<19,o=(u,_)=>[[u+1,_],[u-1,_],[u,_+1],[u,_-1]].filter(([d,f])=>r(d,f));function a(u,_){const d=n.get(s(u,_)),f=new Set([s(u,_)]),S=new Set,M=[[u,_]];for(;M.length;){const[y,B]=M.pop();for(const[D,P]of o(y,B)){const z=s(D,P),et=n.get(z);et===void 0?S.add(z):et===d&&!f.has(z)&&(f.add(z),M.push([D,P]))}}return{group:f,libs:S}}function l(u){const _=new Set,d=new Map;let f=0,S=0;for(const y of n.keys()){if(_.has(y))continue;const B=n.get(y),[D,P]=y.split(",").map(Number),z=a(D,P);for(const et of z.group)_.add(et);if(z.libs.size===1)if(B===u){f+=z.group.size;const et=z.libs.values().next().value;d.set(et,(d.get(et)||0)+z.group.size)}else S+=z.group.size}let M=0;for(const y of d.values())y>M&&(M=y);return{own:f,opp:S,loss:M}}function c(u,_,d){if(!r(u,_)||n.has(s(u,_)))return null;n.set(s(u,_),d);const f=[];for(const[S,M]of o(u,_))if(n.get(s(S,M))===1-d){const y=a(S,M);if(y.libs.size===0)for(const B of y.group)n.delete(B),f.push(B)}return!f.length&&a(u,_).libs.size===0?(n.delete(s(u,_)),null):f}const h="ABCDEFGHJKLMNOPQRST",p=[3.2,1.5,.15][i],m=[1.4,.6,0][i],g={name:"围棋",cols:19,rows:19,turn:0,pieces:[],last:null,over:!1,build(){n.clear(),g.sync()},sync(){g.pieces=[];for(const[u,_]of n){const[d,f]=u.split(",").map(Number);g.pieces.push({gx:d,gy:f,c:_,uid:"s"+u})}},tryHuman(u,_){const d=c(u,_,g.turn);return d?(g.after(u,_,d),!0):!1},after(u,_,d){g.sync(),g.last=[u,_];const f=d.map(S=>S.split(",").map(Number));t.onPlace&&t.onPlace(u,_,g.turn,f),t.onCap&&t.onCap((g.turn?"黑":"白")+" "+h[u]+(19-_)+(d.length?" · 提 "+d.length+" 子":"")),g.turn=1-g.turn},stepAI(){const u=new Set;for(const B of n.keys()){const[D,P]=B.split(",").map(Number);for(let z=-2;z<=2;z++)for(let et=-2;et<=2;et++){if(Math.abs(z)+Math.abs(et)>2)continue;const v=D+z,x=P+et;r(v,x)&&!n.has(s(v,x))&&u.add(s(v,x))}}if(!u.size)for(const[B,D]of[[3,3],[9,3],[15,3],[3,9],[9,9],[15,9],[3,15],[9,15],[15,15],[7,7],[11,11]])n.has(s(B,D))||u.add(s(B,D));if(!u.size||g.pieces.length>19*19*.62){g.over=!0,t.onEnd&&t.onEnd("终局 · 收子");return}let _=[],d=-1,f=null;if(i===2){f=new Set;const B=new Set;for(const D of n.keys()){if(B.has(D)||n.get(D)!==g.turn)continue;const[P,z]=D.split(",").map(Number),et=a(P,z);for(const v of et.group)B.add(v);if(et.libs.size===1&&et.group.size>=2)for(const v of et.libs)f.add(v)}}for(const B of u){const[D,P]=B.split(",").map(Number);n.set(B,g.turn);let z=0;for(const[x,I]of o(D,P))if(n.get(s(x,I))===1-g.turn){const C=a(x,I);C.libs.size===0?z+=(12+C.group.size)*(i===2?3:1):C.libs.size===1&&(z+=5)}const et=a(D,P);et.libs.size===0&&(z-=1e6),z+=Math.min(et.libs.size,4),et.libs.size===1&&(z-=7);const v=Math.min(D,P,18-D,18-P);if((v===2||v===3)&&(z+=1.5),i===2){let x=0;for(const[C,E]of o(D,P)){const A=n.get(s(C,E));if(A===g.turn)x++;else if(A===1-g.turn){const w=a(C,E);z+=(4-Math.min(w.libs.size,4))*1.1}}z+=x*.8,f&&f.has(B)&&(z+=12);const I=l(g.turn);z+=I.opp*2.4,z-=Math.max(0,I.loss-2)*3.5,z-=I.own*.5}n.delete(B),z+=Math.random()*p,z>d?(d=z,_=[[D,P]]):z>d-m&&_.push([D,P])}let S=0,M=0,y=null;if(_.length){const[B,D]=_[ir(_.length)];S=B,M=D,y=c(S,M,g.turn)}if(!y){const B=[...u];for(;!y&&B.length;){const D=B.splice(ir(B.length),1)[0],[P,z]=D.split(",").map(Number);y=c(P,z,g.turn),y&&(S=P,M=z)}}y?g.after(S,M,y):(g.over=!0,t.onEnd&&t.onEnd("终局 · 无可用着点"))}};return g}function ov(i,t){const n=new Map,s=(g,u)=>g+","+u,r=(g,u)=>g>=0&&u>=0&&g<15&&u<15,o=[[1,0],[0,1],[1,1],[1,-1]],a="ABCDEFGHIJKLMNO";function l(g,u,_){let d=0;for(const[f,S]of o){let M=1,y=1;for(;r(g+f*y,u+S*y)&&n.get(s(g+f*y,u+S*y))===_;)M++,y++;const B=r(g+f*y,u+S*y)&&!n.has(s(g+f*y,u+S*y))?1:0;for(y=1;r(g-f*y,u-S*y)&&n.get(s(g-f*y,u-S*y))===_;)M++,y++;const D=r(g-f*y,u-S*y)&&!n.has(s(g-f*y,u-S*y))?1:0,P=B+D;M>=5?d+=1e6:M===4?d+=P>=2?6e4:P===1?9e3:0:M===3?d+=P>=2?7e3:P===1?600:0:M===2?d+=P>=2?140:18:d+=P*6}return d}function c(g,u){const _=n.get(s(g,u));for(const[d,f]of o){let S=1;for(;n.get(s(g+d*S,u+f*S))===_;)S++;let M=1;for(;n.get(s(g-d*M,u-f*M))===_;)M++;if(S+M-1>=5)return[[g-d*(M-1),u-f*(M-1)],[g+d*(S-1),u+f*(S-1)]]}return null}const h=[.45,.9,1.3][i],p=[90,40,0][i],m={name:"五子棋",cols:15,rows:15,turn:0,pieces:[],last:null,over:!1,winLine:null,build(){n.clear(),m.sync(),m.winLine=null},sync(){m.pieces=[];for(const[g,u]of n){const[_,d]=g.split(",").map(Number);m.pieces.push({gx:_,gy:d,c:u,uid:"s"+g})}},tryHuman(g,u){return n.has(s(g,u))?!1:(m.place(g,u,m.turn),!0)},place(g,u,_){n.set(s(g,u),_),m.sync(),m.last=[g,u],t.onPlace&&t.onPlace(g,u,_,[]);const d=c(g,u);if(d){m.winLine=d,m.over=!0,t.onCap&&t.onCap((_?"白":"黑")+" 五连 —— 胜"),t.onEnd&&t.onEnd((_?"白":"黑")+" 胜");return}t.onCap&&t.onCap((_?"黑":"白")+" "+a[g]+(15-u)),m.turn=1-_},stepAI(){if(!n.size){m.place(7,7,0);return}let g=[];if(i===0)for(let M=0;M<15;M++)for(let y=0;y<15;y++)g.push([M,y]);else{const M=new Set;for(const y of n.keys()){const[B,D]=y.split(",").map(Number);for(let P=-2;P<=2;P++)for(let z=-2;z<=2;z++){const et=B+P,v=D+z;r(et,v)&&!n.has(s(et,v))&&M.add(s(et,v))}}g=[...M].map(y=>y.split(",").map(Number))}const u=(M,y)=>r(M,y)&&!n.has(s(M,y));for(const[M,y]of g)if(u(M,y)&&l(M,y,m.turn)>=1e6){m.place(M,y,m.turn);return}for(const[M,y]of g)if(u(M,y)&&l(M,y,1-m.turn)>=1e6){m.place(M,y,m.turn);return}let _=[],d=-1;for(const[M,y]of g){if(n.has(s(M,y)))continue;const B=l(M,y,m.turn)*1.05+l(M,y,1-m.turn)*h+Math.random()*p;B>d?(d=B,_=[[M,y]]):B>d-60&&_.push([M,y])}if(!_.length){m.over=!0,t.onEnd&&t.onEnd("和局");return}const[f,S]=_[ir(_.length)];m.place(f,S,m.turn)}};return m}function av(i,t){const s=(C,E)=>C+","+E,r=(C,E)=>C>=0&&E>=0&&C<9&&E<10,o=(C,E,A)=>C>=3&&C<=5&&(A===0?E>=7:E<=2),a=(C,E)=>E===0?C<=4:C>=5,l=new Map;let c=0;function h(){l.clear(),c=0,["R","N","B","A","K","A","B","N","R"].forEach((E,A)=>{l.set(s(A,0),{t:E,c:1,uid:"u"+c++}),l.set(s(A,9),{t:E,c:0,uid:"u"+c++})}),l.set(s(1,2),{t:"C",c:1,uid:"u"+c++}),l.set(s(7,2),{t:"C",c:1,uid:"u"+c++}),l.set(s(1,7),{t:"C",c:0,uid:"u"+c++}),l.set(s(7,7),{t:"C",c:0,uid:"u"+c++});for(const E of[0,2,4,6,8])l.set(s(E,3),{t:"P",c:1,uid:"u"+c++}),l.set(s(E,6),{t:"P",c:0,uid:"u"+c++})}function p(C,E){const A=l.get(s(C,E));if(!A)return[];const w=[],F=(k,G)=>{if(r(k,G)){const st=l.get(s(k,G));(!st||st.c!==A.c)&&w.push([k,G])}},T=(k,G,st)=>{let X=C+k,O=E+G,W=!1;for(;r(X,O);){const H=l.get(s(X,O));if(st){if(!W)H?W=!0:w.push([X,O]);else if(H){H.c!==A.c&&w.push([X,O]);break}}else if(!H)w.push([X,O]);else{H.c!==A.c&&w.push([X,O]);break}X+=k,O+=G}},R=A.t;if(R==="R")T(1,0,0),T(-1,0,0),T(0,1,0),T(0,-1,0);else if(R==="C")T(1,0,1),T(-1,0,1),T(0,1,1),T(0,-1,1);else if(R==="N")for(const[k,G]of[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]){const st=Math.abs(k)===2?C+k/2:C,X=Math.abs(G)===2?E+G/2:E;r(st,X)&&!l.get(s(st,X))&&F(C+k,E+G)}else if(R==="B")for(const[k,G]of[[2,2],[2,-2],[-2,2],[-2,-2]]){const st=C+k/2,X=E+G/2;!r(st,X)||l.get(s(st,X))||a(E+G,A.c)||F(C+k,E+G)}else if(R==="A")for(const[k,G]of[[1,1],[1,-1],[-1,1],[-1,-1]]){const st=C+k,X=E+G;o(st,X,A.c)&&F(st,X)}else if(R==="K")for(const[k,G]of[[1,0],[-1,0],[0,1],[0,-1]]){const st=C+k,X=E+G;o(st,X,A.c)&&F(st,X)}else if(R==="P"){const k=A.c===0?-1:1;F(C,E+k),a(E,A.c)&&(F(C+1,E),F(C-1,E))}return w}const m={K:1e6,R:90,C:85,N:40,B:20,A:20,P:10},g={K:"帅",A:"仕",B:"相",N:"马",R:"车",C:"炮",P:"兵"},u="abcdefghi",_=(C,E)=>u[C]+(10-E),d=[.3,.75,1][i],f=[14,8,2][i],S=[0,.55,.95][i],M=[0,0,.5][i];function y(C,E,A){for(const[w,F]of l)if(F.c===A){const[T,R]=w.split(",").map(Number);for(const[k,G]of p(T,R))if(k===C&&G===E)return!0}return!1}function B(C,E,A,w){for(const[F,T]of l)if(T.c===A&&T!==w){const[R,k]=F.split(",").map(Number);for(const[G,st]of p(R,k))if(G===C&&st===E)return!0}return!1}function D(C,E,A,w,F,T){const R=s(E,A),k=s(w,F);l.delete(R),T&&l.delete(k),l.set(k,C);const G=y(w,F,1-C.c),st=G?B(w,F,C.c,C):!1;return l.delete(k),l.set(R,C),T&&l.set(k,T),G?st?.35:1:0}function P(){let C=null,E=null;for(const[F,T]of l)if(T.t==="K"){const[R,k]=F.split(",").map(Number);T.c===0?C=[R,k]:E=[R,k]}if(!C||!E||C[0]!==E[0])return!1;const A=Math.min(C[1],E[1]),w=Math.max(C[1],E[1]);for(let F=A+1;F<w;F++)if(l.has(s(C[0],F)))return!1;return!0}function z(C){if(P())return!1;for(const[E,A]of l)if(A.c===C&&A.t==="K"){const[w,F]=E.split(",").map(Number);return!y(w,F,1-C)}return!0}function et(C,E,A,w,F,T){const R=s(E,A),k=s(w,F);l.delete(R),T&&l.delete(k),l.set(k,C);const G=!z(C.c);return l.delete(k),l.set(R,C),T&&l.set(k,T),G}function v(C,E,A){return!C||C.c!==I.turn?[]:p(E,A).filter(([w,F])=>!et(C,E,A,w,F,l.get(s(w,F))))}function x(){const C=[];for(const[E,A]of[...l])if(A.c===I.turn){const[w,F]=E.split(",").map(Number);for(const[T,R]of v(A,w,F))C.push({x:w,y:F,tx:T,ty:R,p:A})}return C}const I={name:"中国象棋",cols:9,rows:10,turn:0,pieces:[],last:null,over:!1,build(){h(),I.sync()},sync(){I.pieces=[];for(const[C,E]of l){const[A,w]=C.split(",").map(Number);I.pieces.push({gx:A,gy:w,t:E.t,c:E.c,uid:E.uid})}},legalFrom(C){return v(C,C.gx,C.gy)},at(C,E){return l.get(s(C,E))},inCheck(C){return!z(C)},endText(){const C=!z(I.turn),E=I.turn?"红":"黑",A=I.turn?"黑":"红";return C?E+" 胜 · 将死":E+" 胜 · 困毙（"+A+" 无着可走）"},tryHuman(C,E){const A=l.get(s(C,E));return A&&A.c===I.turn?{select:I.pieces.find(w=>w.gx===C&&w.gy===E)}:!1},moveTo(C,E,A){const w=l.get(s(E,A)),F=C.gx,T=C.gy;if(C.px=F,C.py=T,l.delete(s(F,T)),w&&l.delete(s(E,A)),l.set(s(E,A),C),C.gx=E,C.gy=A,I.sync(),I.last=[E,A],t.onMove&&t.onMove(C.uid,F,T,E,A,w?w.uid:null),t.onCap&&t.onCap((C.c?"黑":"红")+" "+g[C.t]+" "+_(F,T)+"→"+_(E,A)+(w?" 吃"+g[w.t]:"")),w&&w.t==="K"){I.over=!0,t.onEnd&&t.onEnd((C.c?"黑":"红")+" 胜 · 将死");return}I.turn=1-C.c,x().length||(I.over=!0,t.onEnd&&t.onEnd(I.endText()))},stepAI(){const C=x();if(!C.length){I.over=!0,t.onEnd&&t.onEnd(I.endText());return}const E=[];for(const F of C){const{p:T,x:R,y:k,tx:G,ty:st}=F,X=l.get(s(G,st)),O=X?m[X.t]:0;let W=O+Math.random()*f;X&&X.t==="K"&&(W+=1e5);const H=O>0?S:M;if(H>0&&(W-=m[T.t]*H*D(T,R,k,G,st,X)),i===2&&T.px===G&&T.py===st&&(W-=4),i===2&&O===0&&T.t!=="P"){const K=Math.abs(G-4)+Math.abs(st-4.5);W+=(8-K)*.25}i===2&&O>0&&B(G,st,1-T.c,X)&&(W-=O*.3),E.push({x:R,y:k,tx:G,ty:st,s:W})}E.sort((F,T)=>T.s-F.s);const A=Math.random()<d?E[0]:E[Math.min(E.length-1,1+ir(3))],w=I.pieces.find(F=>F.gx===A.x&&F.gy===A.y);w&&I.moveTo(w,A.tx,A.ty)}};return I}function lv(i,t){const n=(x,I)=>x+","+I,s=(x,I)=>x>=0&&I>=0&&x<8&&I<8,r=new Map;let o=0;function a(){r.clear(),o=0,["R","N","B","Q","K","B","N","R"].forEach((I,C)=>{r.set(n(C,0),{t:I,c:1,uid:"u"+o++,moved:!1}),r.set(n(C,7),{t:I,c:0,uid:"u"+o++,moved:!1})});for(let I=0;I<8;I++)r.set(n(I,1),{t:"P",c:1,uid:"u"+o++,moved:!1}),r.set(n(I,6),{t:"P",c:0,uid:"u"+o++,moved:!1})}function l(x,I){const C=r.get(n(x,I));if(!C)return[];const E=[],A=(T,R)=>{if(s(T,R)){const k=r.get(n(T,R));(!k||k.c!==C.c)&&E.push([T,R])}},w=(T,R)=>{let k=x+T,G=I+R;for(;s(k,G);){const st=r.get(n(k,G));if(!st)E.push([k,G]);else{st.c!==C.c&&E.push([k,G]);break}k+=T,G+=R}},F=C.t;if(F==="R")w(1,0),w(-1,0),w(0,1),w(0,-1);else if(F==="B")w(1,1),w(1,-1),w(-1,1),w(-1,-1);else if(F==="Q")w(1,0),w(-1,0),w(0,1),w(0,-1),w(1,1),w(1,-1),w(-1,1),w(-1,-1);else if(F==="N")for(const[T,R]of[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]])A(x+T,I+R);else if(F==="K"){for(let T=-1;T<=1;T++)for(let R=-1;R<=1;R++)(T||R)&&A(x+T,I+R);h(C,x,I,E)}else if(F==="P"){const T=C.c===0?-1:1;if(s(x,I+T)&&!r.has(n(x,I+T))){E.push([x,I+T]);const R=C.c===0?6:1;I===R&&!r.has(n(x,I+2*T))&&E.push([x,I+2*T])}for(const R of[-1,1])if(s(x+R,I+T)){const k=r.get(n(x+R,I+T));k&&k.c!==C.c?E.push([x+R,I+T]):v.ep&&v.ep[0]===x+R&&v.ep[1]===I+T&&E.push([x+R,I+T])}}return E}let c=!1;function h(x,I,C,E){if(!(c||x.moved)){c=!0;try{if(!B(x.c))return;const A=1-x.c;for(const[w,F]of[[7,1],[0,-1]]){const T=r.get(n(w,C));if(!T||T.t!=="R"||T.c!==x.c||T.moved)continue;const R=Math.min(w,I),k=Math.max(w,I);let G=!0;for(let O=R+1;O<k;O++)if(r.has(n(O,C))){G=!1;break}if(!G)continue;const st=I+F,X=I+2*F;S(st,C,A)||S(X,C,A)||E.push([X,C])}}finally{c=!1}}}const p={K:1e6,Q:90,R:50,B:32,N:30,P:10},m={K:"K",Q:"Q",R:"R",B:"B",N:"N",P:""},g=(x,I)=>"abcdefgh"[x]+(8-I),u=[.3,.75,1][i],_=[12,6,2][i],d=[0,.55,.95][i],f=[0,0,.5][i];function S(x,I,C){for(const[E,A]of r)if(A.c===C){const[w,F]=E.split(",").map(Number);for(const[T,R]of l(w,F))if(T===x&&R===I)return!0}return!1}function M(x,I,C,E){for(const[A,w]of r)if(w.c===C&&w!==E){const[F,T]=A.split(",").map(Number);for(const[R,k]of l(F,T))if(R===x&&k===I)return!0}return!1}function y(x,I,C,E,A,w){const F=n(I,C),T=n(E,A);r.delete(F),w&&r.delete(T),r.set(T,x);const R=S(E,A,1-x.c),k=R?M(E,A,x.c,x):!1;return r.delete(T),r.set(F,x),w&&r.set(T,w),R?k?.35:1:0}function B(x){for(const[I,C]of r)if(C.c===x&&C.t==="K"){const[E,A]=I.split(",").map(Number);return!S(E,A,1-x)}return!0}function D(x,I,C,E,A,w,F){const T=n(I,C),R=n(E,A);r.delete(T),w&&r.delete(R),F&&r.delete(n(F.gx,F.gy)),r.set(R,x);const k=!B(x.c);return r.delete(R),r.set(T,x),w&&r.set(R,w),F&&r.set(n(F.gx,F.gy),F),k}function P(x,I,C,E,A){return x.t!=="P"||E===I?null:v.ep&&v.ep[0]===E&&v.ep[1]===A&&r.get(n(E,C))||null}function z(x,I,C){return!x||x.c!==v.turn?[]:l(I,C).filter(([E,A])=>{const w=r.get(n(E,A));if(x.t==="K"&&A===C&&Math.abs(E-I)===2){const F=I+(E>I?1:-1),T=n(I,C);r.delete(T),r.set(n(F,C),x);const R=S(F,C,1-x.c);if(r.delete(n(F,C)),r.set(T,x),R)return!1}return!D(x,I,C,E,A,w||null,P(x,I,C,E,A))})}function et(){const x=[];for(const[I,C]of[...r])if(C.c===v.turn){const[E,A]=I.split(",").map(Number);for(const[w,F]of z(C,E,A))x.push({x:E,y:A,tx:w,ty:F,p:C})}return x}const v={name:"国际象棋",cols:8,rows:8,turn:0,pieces:[],last:null,over:!1,ep:null,build(){a(),v.ep=null,v.sync()},sync(){v.pieces=[];for(const[x,I]of r){const[C,E]=x.split(",").map(Number);v.pieces.push({gx:C,gy:E,t:I.t,c:I.c,uid:I.uid})}},legalFrom(x){return z(x,x.gx,x.gy)},at(x,I){return r.get(n(x,I))},inCheck(x){return!B(x)},endText(){const x=!B(v.turn),I=v.turn?"白":"黑";return x?I+" 胜 · 将杀":"和棋 · 逼和（"+(v.turn?"黑":"白")+" 无着可走但未被将）"},tryHuman(x,I){const C=r.get(n(x,I));return C&&C.c===v.turn?{select:v.pieces.find(E=>E.gx===x&&E.gy===I)}:!1},moveTo(x,I,C){let E=r.get(n(I,C))||null;const A=x.gx,w=x.gy,F=P(x,A,w,I,C);if(!E&&F&&(E=F),x.px=A,x.py=w,r.delete(n(A,w)),E&&r.delete(n(E.gx,E.gy)),x.t==="P"&&(C===0||C===7)&&(x.t="Q"),r.set(n(I,C),x),x.gx=I,x.gy=C,x.moved=!0,x.t==="K"&&C===w&&Math.abs(I-A)===2){const T=I>A?1:-1,R=T>0?7:0,k=r.get(n(R,w));k&&k.t==="R"&&k.c===x.c&&(r.delete(n(R,w)),k.gx=A+T,k.gy=w,k.moved=!0,r.set(n(k.gx,k.gy),k),t.onMove&&t.onMove(k.uid,R,w,k.gx,k.gy,null))}if(v.ep=x.t==="P"&&Math.abs(C-w)===2?[A,(w+C)/2]:null,v.sync(),v.last=[I,C],t.onMove&&t.onMove(x.uid,A,w,I,C,E?E.uid:null),t.onCap&&t.onCap((x.c?"黑":"白")+" "+(Math.abs(I-A)===2&&x.t==="K"?I>A?"O-O":"O-O-O":m[x.t]+g(I,C))+(E?" x"+(m[E.t]||"p"):"")),E&&E.t==="K"){v.over=!0,t.onEnd&&t.onEnd((x.c?"黑":"白")+" 胜 · 将杀");return}v.turn=1-x.c,et().length||(v.over=!0,t.onEnd&&t.onEnd(v.endText()))},stepAI(){const x=et();if(!x.length){v.over=!0,t.onEnd&&t.onEnd(v.endText());return}const I=[];for(const A of x){const{p:w,x:F,y:T,tx:R,ty:k}=A,G=r.get(n(R,k)),st=G?p[G.t]:0;let X=st+Math.random()*_;G&&G.t==="K"&&(X+=1e5),w.t==="P"&&(X+=(w.c===0?k:7-k)*.9),w.t!=="K"&&w.t!=="P"&&(X+=(6-Math.abs(R-3.5)-Math.abs(k-3.5))*.35),w.t==="K"&&Math.abs(R-F)===2&&(X+=6);const O=st>0?d:f;O>0&&(X-=p[w.t]*O*y(w,F,T,R,k,G)),i===2&&w.px===R&&w.py===k&&(X-=4),i===2&&st===0&&(w.t==="N"||w.t==="B")&&(X+=1.2),i===2&&st>0&&M(R,k,1-w.c,G)&&(X-=st*.3),I.push({x:F,y:T,tx:R,ty:k,s:X})}I.sort((A,w)=>w.s-A.s);const C=Math.random()<u?I[0]:I[Math.min(I.length-1,1+ir(3))],E=v.pieces.find(A=>A.gx===C.x&&A.gy===C.y);E&&v.moveTo(E,C.tx,C.ty)}};return v}function cv(i,t={}){const e=hv(t.difficulty??1),n=t.hooks||{};return i==="go"?rv(e,n):i==="wuzi"?ov(e,n):i==="xq"?av(e,n):lv(e,n)}function hv(i){return i=Number(i),i===0?0:i===2?2:1}function uv(){try{const i=location.pathname,t=i.endsWith("/")?i:i.replace(/\/[^/]*$/,"")+"/";return location.origin+t}catch{return"/"}}const ru=uv(),dv="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";function fv(i,t,e,n,s,r){if(i==="chess"){const a=(l,c)=>"abcdefgh"[l]+(8-c);return a(t,e)+a(n,s)+(r?"q":"")}const o=(a,l)=>"abcdefghi"[a]+(9-l);return o(t,e)+o(n,s)}function pv(i,t){if(!t||t.length<4)return null;const e=t.charCodeAt(0)-97,n=i==="chess"?8-+t[1]:9-+t[1],s=t.charCodeAt(2)-97,r=i==="chess"?8-+t[3]:9-+t[3];return{fx:e,fy:n,tx:s,ty:r}}class ih{constructor(t,e){this.ready=!1,this.failed=!1,this.pending=null;const s=ru+t;this.worker=new Worker(s),this.worker.onmessage=r=>this._line(r.data),this.worker.onerror=()=>this._fail(),this.worker.postMessage("uci")}_fail(){if(this.failed=!0,this.pending){const t=this.pending;this.pending=null,t.reject(new Error("worker error"))}}_line(t){if(!(!t||typeof t!="string")){if(t==="uciok"){this.ready=!0;return}if(t.startsWith("bestmove")){const e=t.split(/\s+/)[1]||null;if(this.pending){const n=this.pending;this.pending=null,n.resolve(e)}}}}clearPending(){this.pending=null}ready_p(){return this.ready?Promise.resolve():this.failed?Promise.reject(new Error("engine failed")):new Promise((t,e)=>{const n=setTimeout(()=>e(new Error("init timeout")),12e3),s=setInterval(()=>{this.ready?(clearInterval(s),clearTimeout(n),t()):this.failed&&(clearInterval(s),clearTimeout(n),e(new Error("engine failed")))},40)})}bestMove(t){return this.ready_p().then(()=>new Promise((e,n)=>{this.pending={resolve:e,reject:n};const s=t.moves&&t.moves.length?" moves "+t.moves.join(" "):"";t.fen?this.worker.postMessage("position fen "+t.fen+s):this.worker.postMessage("position startpos"+s),this.worker.postMessage(t.depth?"go depth "+t.depth:"go movetime "+(t.movetime||300))}))}}let eo=null,no=null,Ws=null;async function mv(){if(Ws!==null)return Ws;try{const i=await fetch(ru+"engines/pikafish.js",{method:"HEAD"}),t=(i.headers.get("content-type")||"").toLowerCase();Ws=i.ok&&!t.includes("text/html")}catch{Ws=!1}return Ws}function gv(i){return i==="chess"?(eo||(eo=new ih("engines/stockfish.js","engines/stockfish.wasm")),eo.ready_p()):i==="xq"?mv().then(t=>{if(!t)throw new Error("pikafish not present");return no||(no=new ih("engines/pikafish.js","engines/pikafish.wasm")),no.ready_p()}):Promise.reject(new Error("no engine for "+i))}function vv(i,t){const e=i==="chess"?eo:no;if(!e)return Promise.reject(new Error("engine not ready"));const n=(t.movetime||300)+2500;return Promise.race([e.bestMove(t),new Promise((s,r)=>setTimeout(()=>{e.clearPending(),r(new Error("engine timeout"))},n))])}function _v(i){return dv}function xv(i){const t=Math.PI*2,e=(V,Y,it)=>Math.max(Y,Math.min(it,V)),n=(V,Y,it)=>V+(Y-V)*it,s=V=>1-Math.pow(1-V,3),r=V=>(V-=1,Math.max(0,V*V*((1.7+1)*V+1.7)+1)),o=matchMedia("(prefers-reduced-motion: reduce)").matches,a=V=>"#"+Math.round(V).toString(16).padStart(6,"0"),l={dark:{bg:461592,fog:461592,amb:4015712,rim:7049215,plate:6048309,plateTop:"#7c6245",line:"rgba(230,210,170,.55)",text:"rgba(230,210,170,.8)",sqA:"#3d2f20",sqB:"#2e2115",stoneB:1184536,stoneW:15393744,wood:10254926,red:15227984,blk:1579552,wp:16249571,bp:3027517,accent:9427455,gold:16765286,b2bg:"#0d1730",b2board:"#1a2133"},light:{bg:15397371,fog:15397371,amb:15261904,rim:16758891,plate:12886890,plateTop:"#e6d0a0",line:"rgba(100,70,35,.58)",text:"rgba(90,60,20,.82)",sqA:"#f0d9a8",sqB:"#d4b87a",stoneB:1711398,stoneW:16052712,wood:14203e3,red:12727598,blk:1974569,wp:16776694,bp:4014930,accent:2845951,gold:13998874,b2bg:"#e9f0fb",b2board:"#f3e6c8"}};let c=document.documentElement.getAttribute("data-theme")||"dark";const h=()=>l[c],p=document.createElement("div");p.className="chess-room",p.innerHTML=`
    <canvas class="cr-gl"></canvas>
    <div class="cr-gal">
      <div class="gal-head">
        <h2>弈 · 四方棋台</h2>
      </div>
      <div class="cr-labels"></div>
    </div>
    <div class="cr-play">
      <div class="play-bar">
        <button class="back cr-back" type="button">← 返回星台</button>
        <h3 class="cr-name">围棋</h3>
        <span class="mv cr-mv">第 0 手</span>
      </div>
      <canvas class="cr-b2"></canvas>
      <div class="cr-score" hidden></div>
      <div class="cr-cap">双 AI 自动对弈中…</div>
      <div class="set">
        <span class="sw on cr-auto"><i></i>AI 自动对局</span>
        <span class="seg cr-diff">
          <button data-d="0">休闲</button><button data-d="1">标准</button><button data-d="2" class="on">大师</button>
        </span>
        <button class="mini cr-new">重开</button>
      </div>
      <div class="cr-result" hidden>
        <div class="res-card">
          <div class="res-title"></div>
          <div class="res-sub"></div>
          <div class="res-actions">
            <button class="mini cr-again" type="button">再来一局</button>
            <button class="mini cr-leave" type="button">返回星台</button>
          </div>
        </div>
      </div>
    </div>`,i.appendChild(p);const m=p.querySelector(".cr-gl"),g=p.querySelector(".cr-b2"),u=g.getContext("2d"),_=p.querySelector(".cr-play"),d=p.querySelector(".cr-gal"),f=p.querySelector(".cr-labels"),S=p.querySelector(".cr-name"),M=p.querySelector(".cr-mv"),y=p.querySelector(".cr-cap"),B=p.querySelector(".cr-auto"),D=p.querySelector(".cr-diff"),P=p.querySelector(".cr-back"),z=p.querySelector(".cr-new"),et=p.querySelector(".cr-score"),v=p.querySelector(".cr-result"),x=p.querySelector(".res-title"),I=p.querySelector(".res-sub"),C=p.querySelector(".cr-again"),E=p.querySelector(".cr-leave");let A=null;try{A=new _o({canvas:m,antialias:!0,alpha:!0})}catch{const Y=document.createElement("div");return Y.className="holo-fallback",Y.textContent="当前环境不支持 WebGL，棋台暂不可用",i.appendChild(Y),{frame(){}}}A.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),A.shadowMap.enabled=!0,A.shadowMap.type=vh;const w=new lr,F=new Xe(50,1,.1,200),T={dist:26,elev:.32,azim:0,tDist:26,tElev:.32,tAzim:0,look:new q(0,0,0)};function R(){T.azim=n(T.azim,T.tAzim,.08),T.elev=n(T.elev,T.tElev,.08),T.dist=n(T.dist,T.tDist,.06),F.position.set(Math.sin(T.azim)*Math.cos(T.elev)*T.dist,Math.sin(T.elev)*T.dist,Math.cos(T.azim)*Math.cos(T.elev)*T.dist),F.lookAt(T.look)}const k=new nu(16777215,h().plate,.7);w.add(k);const G=new Jc(16775408,1.25);G.position.set(8,22,14),G.castShadow=!0,G.shadow.mapSize.set(2048,2048);const st=G.shadow.camera;st.left=-22,st.right=22,st.top=22,st.bottom=-22,st.near=1,st.far=70,G.shadow.bias=-7e-4,w.add(G);const X=new Jc(16772306,.85);X.position.set(0,10,-14),w.add(X);const O=new su(h().rim,26,48,2);O.position.set(-12,7,-10),w.add(O);const W=new Se,H=new Float32Array(600*3);for(let V=0;V<600;V++){const Y=16+Math.random()*34,it=Math.random()*t,J=(Math.random()-.5)*1.4;H[V*3]=Math.cos(it)*Y*Math.cos(J),H[V*3+1]=Math.sin(J)*Y*.7+4,H[V*3+2]=Math.sin(it)*Y*Math.cos(J)}W.setAttribute("position",new Je(H,3));const K=new js(W,new ws({color:10470655,size:.12,transparent:!0,opacity:.55}));w.add(K);function ct(V){const Y=h(),it=document.createElement("canvas"),J=640,pt=V==="xq"?720:640;it.width=J,it.height=pt;const at=it.getContext("2d"),xt=V==="chess"?8:V==="xq"?9:V==="go"?19:15,Tt=V==="chess"?8:V==="xq"?10:xt,ae=xt-(V==="chess"?0:1),wt=Tt-(V==="chess"?0:1),xe=34,Pe=Math.min((J-xe*2)/ae,(pt-xe*2)/wt),jt=ze=>xe+ze*Pe,Ft=ze=>xe+ze*Pe;if(V==="chess"){at.fillStyle=Y.plateTop,at.fillRect(0,0,J,pt);for(let ze=0;ze<8;ze++)for(let ne=0;ne<8;ne++)at.fillStyle=(ze+ne)%2?Y.sqB:Y.sqA,at.fillRect(jt(ze),Ft(ne),Pe+1,Pe+1)}else{if(at.fillStyle=Y.plateTop,at.fillRect(0,0,J,pt),at.strokeStyle=Y.line,at.lineWidth=2.2,at.beginPath(),V==="xq"){for(let ne=0;ne<10;ne++)at.moveTo(jt(0),Ft(ne)),at.lineTo(jt(8),Ft(ne));for(let ne=0;ne<9;ne++)ne===0||ne===8?(at.moveTo(jt(ne),Ft(0)),at.lineTo(jt(ne),Ft(9))):(at.moveTo(jt(ne),Ft(0)),at.lineTo(jt(ne),Ft(4)),at.moveTo(jt(ne),Ft(5)),at.lineTo(jt(ne),Ft(9)));at.moveTo(jt(3),Ft(0)),at.lineTo(jt(5),Ft(2)),at.moveTo(jt(5),Ft(0)),at.lineTo(jt(3),Ft(2)),at.moveTo(jt(3),Ft(7)),at.lineTo(jt(5),Ft(9)),at.moveTo(jt(5),Ft(7)),at.lineTo(jt(3),Ft(9))}else{for(let ne=0;ne<xt;ne++)at.moveTo(jt(ne),Ft(0)),at.lineTo(jt(ne),Ft(xt-1));for(let ne=0;ne<Tt;ne++)at.moveTo(jt(0),Ft(ne)),at.lineTo(jt(Tt-1),Ft(ne))}at.stroke(),at.fillStyle=Y.line;const ze=V==="go"?[[3,3],[9,3],[15,3],[3,9],[9,9],[15,9],[3,15],[9,15],[15,15]]:[[3,3],[11,3],[7,7],[3,11],[11,11]];for(const[ne,dn]of ze)at.beginPath(),at.arc(jt(ne),Ft(dn),Pe*.12,0,t),at.fill();V==="xq"&&(at.fillStyle=Y.text,at.font=`${Pe*.62}px 'KaiTi','STKaiti','SimSun',serif`,at.textAlign="center",at.textBaseline="middle",at.fillText("楚  河",jt(2),Ft(4.5)),at.fillText("漢  界",jt(6),Ft(4.5)))}const ye=new bn(it);return ye.colorSpace=nn,ye}const mt={sphere:new nr(1,26,14),cyl:new cr(1,1,1,36),torus:new Pl(1,.16,8,20),box:new mi(1,1,1),cone:new Cl(1,1,20)};let ht={};function St(){const V=h();ht={stoneB:new Wn({color:V.stoneB,roughness:.35}),stoneW:new Wn({color:V.stoneW,roughness:.28}),wood:new Wn({color:V.wood,roughness:.55}),wp:new Wn({color:V.wp,roughness:.1,metalness:.2,clearcoat:.6,clearcoatRoughness:.1}),bp:new Wn({color:V.bp,roughness:.1,metalness:.35,clearcoat:1,clearcoatRoughness:.08})}}St();const nt={K:"帥",A:"仕",B:"相",N:"馬",R:"車",C:"炮",P:"兵",k:"將",a:"士",b:"象",r:"車",c:"砲",p:"卒"},N={};function lt(V,Y){const it=V+(Y?"r":"b");if(N[it])return N[it];const J=h(),pt=document.createElement("canvas");pt.width=pt.height=192;const at=pt.getContext("2d");at.fillStyle=a(J.wood),at.fillRect(0,0,192,192),at.strokeStyle=a(J.blk)+"80",at.lineWidth=5,at.beginPath(),at.arc(96,96,84,0,t),at.stroke(),at.fillStyle=a(Y?J.red:J.blk),at.font="112px 'KaiTi','STKaiti','SimSun',serif",at.textAlign="center",at.textBaseline="middle",at.fillText(V,96,100);const xt=new bn(pt);return xt.colorSpace=nn,N[it]=xt,xt}function ut(V,Y){const it=new Ee(mt.sphere,V?ht.stoneW:ht.stoneB),J=Y*.46;return it.scale.set(J,J*.34,J),it.castShadow=!0,it.userData.y=J*.34,it}function gt(V,Y,it){const J=it*.45,pt=it*.2,at=new Wn({map:lt(nt[V]||V,Y),roughness:.5}),xt=new Ee(mt.cyl,[ht.wood,at,ht.wood]);return xt.scale.set(J,pt,J),xt.castShadow=!0,xt.userData.y=pt/2,xt}const At=[[0,0],[.98,0],[1.04,.06],[1.04,.15],[.95,.19],[.84,.21],[.84,.27],[.74,.31],[.74,.35]],Ot={P:[[.44,.42],[.47,.6],[.4,.84],[.38,1],[.44,1.06],[.55,1.11],[.55,1.15],[.44,1.19]],R:[[.56,.42],[.59,.66],[.55,.96],[.49,1.16],[.56,1.22],[.66,1.28],[.66,1.34],[.7,1.4],[.73,1.48],[.73,1.96],[.69,2],[0,2]],N:[[.56,.42],[.6,.62],[.56,.8],[.6,.92],[.63,1],[0,1]],B:[[.54,.42],[.56,.66],[.44,.96],[.38,1.2],[.43,1.34],[.56,1.4],[.56,1.46],[.44,1.52],[.42,1.6],[.47,1.76],[.41,1.96],[.3,2.14],[.18,2.28],[.1,2.36],[0,2.4]],Q:[[.56,.42],[.59,.66],[.5,.96],[.45,1.26],[.46,1.46],[.56,1.54],[.7,1.58],[.7,1.64],[.62,1.68],[.62,1.76],[.68,1.82],[.7,1.9],[0,1.9]],K:[[.58,.42],[.61,.66],[.52,.98],[.48,1.3],[.5,1.54],[.58,1.62],[.72,1.68],[.72,1.76],[.62,1.8],[.62,1.9],[.68,1.96],[.7,2.04],[0,2.04]]},_t=[[-.36,0],[-.44,.22],[-.46,.48],[-.38,.72],[-.28,.92],[-.16,1.06],[.02,1.14],[.09,1.34],[.2,1.14],[.31,1.08],[.45,1],[.55,.88],[.58,.76],[.5,.7],[.4,.71],[.32,.78],[.25,.64],[.31,.46],[.27,.24],[.12,.06]],U={};function b(V){if(U[V])return U[V];const Y=At.concat(Ot[V]||Ot.P),it=new Al(Y.map(([J,pt])=>new Et(J,pt)),56);return it.computeVertexNormals(),U[V]=it}let j=null;function dt(){if(j)return j;const V=new yo;V.setFromPoints(_t.map(([it,J])=>new Et(it,J)));const Y=new So(V,{depth:.4,curveSegments:12,bevelEnabled:!0,bevelThickness:.05,bevelSize:.05,bevelSegments:3});return Y.translate(0,0,-.2),Y.computeVertexNormals(),j=Y}function vt(V,Y,it){const J=String(V).toUpperCase(),pt=it*.48,at=Y?ht.wp:ht.bp,xt=new _n,Tt=(ae,wt,xe=0,Pe=0,jt=null,Ft=null)=>{const ye=new Ee(ae,at);return ye.position.set(xe,wt,Pe),jt&&ye.rotation.set(jt[0],jt[1],jt[2]),Ft&&ye.scale.set(Ft[0],Ft[1],Ft[2]),ye.castShadow=!0,ye.receiveShadow=!0,xt.add(ye),ye};if(Tt(b(J),0),J==="P")Tt(mt.sphere,1.43,0,0,null,[.3,.33,.3]),Tt(mt.torus,1.24,0,0,[Math.PI/2,0,0],[.3,.3,.3]);else if(J==="R"){for(let ae=0;ae<8;ae++){const wt=ae*t/8;Tt(mt.box,2.1,Math.cos(wt)*.6,Math.sin(wt)*.6,[0,-wt,0],[.26,.26,.12])}Tt(mt.torus,1.97,0,0,[Math.PI/2,0,0],[.71,.71,.71])}else if(J==="N")Tt(dt(),.94,0,0,[0,-Math.PI/2,0],[.9,.9,.9]),Tt(mt.torus,1,0,0,[Math.PI/2,0,0],[.5,.5,.5]);else if(J==="B")Tt(mt.sphere,2.45,0,0,null,[.095,.095,.095]);else if(J==="Q"){for(let ae=0;ae<9;ae++){const wt=ae*t/9;Tt(mt.cone,2.02,Math.cos(wt)*.62,Math.sin(wt)*.62,[Math.sin(wt)*.18,0,-Math.cos(wt)*.18],[.115,.32,.115])}Tt(mt.sphere,2.01,0,0,null,[.115,.115,.115])}else J==="K"&&(Tt(mt.box,2.28,0,0,null,[.13,.46,.13]),Tt(mt.box,2.32,0,0,null,[.36,.12,.13]));return xt.scale.set(pt,pt*.78,pt),xt.userData.y=0,xt}const ft=[{mode:"go",pos:[-5.45,.33,3.61],desc:"19 路 · 提子与做眼"},{mode:"wuzi",pos:[-2.94,-.59,-3.61],desc:"15 路 · 五连即胜"},{mode:"xq",pos:[2.94,-.59,-3.61],desc:"9×10 · 楚河汉界"},{mode:"chess",pos:[5.45,.33,3.61],desc:"8×8 · 含王车易位与吃过路兵"}],zt=5.2,Ct=[];function Nt(){const V=document.createElement("canvas");V.width=V.height=256;const Y=V.getContext("2d"),it=Y.createRadialGradient(128,128,8,128,128,128);it.addColorStop(0,"rgba(150,200,255,.55)"),it.addColorStop(.5,"rgba(120,170,255,.18)"),it.addColorStop(1,"rgba(80,140,255,0)"),Y.fillStyle=it,Y.fillRect(0,0,256,256);const J=new bn(V);return J.colorSpace=nn,J}const re=Nt();for(const V of ft){const Y=new _n,it=V.mode==="xq"?9/8:1,J=zt,pt=zt*it,at=new Ee(new mi(J,.34,pt),new Wn({color:h().plate,roughness:.7}));at.castShadow=!0,at.receiveShadow=!0,Y.add(at);const xt=new Ee(new Hi(J,pt),new Wn({map:ct(V.mode),roughness:.6}));xt.rotation.x=-Math.PI/2,xt.position.y=.172,xt.receiveShadow=!0,Y.add(xt);const Tt=V.mode==="chess"?8:V.mode==="xq"?9:V.mode==="go"?19:15,ae=V.mode==="chess"?8:V.mode==="xq"?10:Tt,wt=Math.min(J/(Tt-(V.mode==="chess"?0:1)),pt/(ae-(V.mode==="chess"?0:1))),xe=-wt*(Tt-(V.mode==="chess"?0:1))/2,Pe=-wt*(ae-(V.mode==="chess"?0:1))/2,jt=(dn,Qn)=>[xe+(V.mode==="chess"?dn+.5:dn)*wt,Pe+(V.mode==="chess"?Qn+.5:Qn)*wt],Ft=(dn,Qn,Ls)=>{const[hu,uu]=jt(Qn,Ls);dn.position.set(hu,.172+(dn.userData.y||0),uu),Y.add(dn)};V.mode==="go"&&[[3,3,1],[4,4,0],[3,15,0],[15,3,1],[9,9,0],[10,9,1],[9,10,0],[15,15,1]].forEach(([dn,Qn,Ls])=>Ft(ut(Ls,wt),dn,Qn)),V.mode==="wuzi"&&[[7,7,0],[8,8,1],[6,6,0],[9,9,1],[5,5,0],[10,10,0]].forEach(([dn,Qn,Ls])=>Ft(ut(Ls,wt),dn,Qn)),V.mode==="xq"&&(Ft(gt("K",!1,wt),4,9),Ft(gt("R",!1,wt),0,9),Ft(gt("N",!1,wt),1,9),Ft(gt("k",!1,wt),4,0),Ft(gt("r",!1,wt),0,0),Ft(gt("c",!1,wt),1,2),Ft(gt("P",!0,wt),4,6)),V.mode==="chess"&&(Ft(vt("K",!0,wt),4,7),Ft(vt("Q",!0,wt),3,7),Ft(vt("N",!0,wt),6,7),Ft(vt("k",!1,wt),4,0),Ft(vt("r",!1,wt),0,0),Ft(vt("p",!1,wt),4,1));const ye=new Ee(new Hi(J*1.9,pt*1.9),new Tn({map:re,transparent:!0,opacity:.5,blending:gn,depthWrite:!1}));ye.rotation.x=-Math.PI/2,ye.position.y=-.6,Y.add(ye);const ze=new Ee(new mi(J+1.2,2.4,pt+1.2),new Tn({visible:!1}));Y.add(ze),Y.position.set(...V.pos),w.add(Y);const ne=document.createElement("div");ne.className="isl-label",ne.innerHTML=`${nh[V.mode]}<small>${V.desc}</small>`,f.appendChild(ne),Ct.push({...V,grp:Y,hit:ze,glow:ye,lab:ne,phase:Math.random()*t,base:Y.position.clone(),hover:0})}const bt=new Eo,Ut=new Et;let qt=!1,Yt=0,Bt=0,oe=0;m.addEventListener("pointerdown",V=>{if($==="gallery"){qt=!0,Yt=0,Bt=V.clientX,oe=V.clientY;try{m.setPointerCapture(V.pointerId)}catch{}}}),m.addEventListener("pointermove",V=>{const Y=m.getBoundingClientRect();if(!(Y.width===0||Y.height===0)&&(Ut.set((V.clientX-Y.left)/Y.width*2-1,-((V.clientY-Y.top)/Y.height)*2+1),qt)){const it=V.clientX-Bt,J=V.clientY-oe;Yt+=Math.abs(it)+Math.abs(J),T.tAzim-=it*.005,T.tElev=e(T.tElev+J*.004,.12,1.2),Bt=V.clientX,oe=V.clientY}}),m.addEventListener("pointerup",()=>{const V=qt;if(qt=!1,Yt>8||$!=="gallery"||!V){if($==="gallery"&&Yt<=8){bt.setFromCamera(Ut,F);const it=bt.intersectObjects(Ct.map(J=>J.hit),!1);if(it.length){const J=Ct.find(pt=>pt.hit===it[0].object);J&&Ve(J)}}return}bt.setFromCamera(Ut,F);const Y=bt.intersectObjects(Ct.map(it=>it.hit),!1);if(Y.length){const it=Ct.find(J=>J.hit===Y[0].object);it&&Ve(it)}}),m.addEventListener("pointerleave",()=>{qt=!1});const Kt=new q;function me(V,Y){for(const it of Ct){o||(it.grp.position.y=it.base.y+Math.sin(V*.5+it.phase)*.22,it.grp.rotation.y=Math.sin(V*.12+it.phase)*.13,it.grp.rotation.z=Math.sin(V*.31+it.phase)*.014),bt.setFromCamera(Ut,F);const J=bt.intersectObject(it.hit,!1).length>0;it.hover=n(it.hover,J&&$==="gallery"?1:0,.12);const pt=1+it.hover*.07;it.grp.scale.setScalar(pt),it.glow.material.opacity=.42+it.hover*.5,m.style.cursor=Ct.some(Tt=>Tt.hover>.5)?"pointer":"grab",Kt.set(0,1.15,0).applyMatrix4(it.grp.matrixWorld).project(F);const at=(Kt.x*.5+.5)*Jn,xt=(-Kt.y*.5+.5)*Vi;it.lab.style.transform=`translate(-50%,-50%) translate(${at}px,${xt}px)`,it.lab.style.opacity=$==="gallery"?String(.55+it.hover*.45):"0"}}let $="gallery",Mt="go",tt=null,yt=0,Dt=2,Pt=!0,Qt=!1,pe=0,Ce=0,te=null,Ie=[],je=!1,Nn=!1;const qe=new Map;let Ge=[],An=[],Un=[],an=[0,0],Fn=0,Mi=null,Jn=i.clientWidth||window.innerWidth,Vi=i.clientHeight||window.innerHeight;function hr(){const V=Math.min(Jn*.86,Vi*.62,620),Y=Math.min(2,window.devicePixelRatio||1);g.width=V*Y,g.height=V*Y,g.style.width=V+"px",g.style.height=V+"px",u.setTransform(Y,0,0,Y,0,0),g._side=V}const Si=()=>{const V=g._side,Y=tt.cols,it=tt.rows,J=Mt==="chess",pt=Y-(J?0:1),at=it-(J?0:1),xt=V*.07,Tt=Math.min((V-xt*2)/pt,(V-xt*2)/at),ae=pt*Tt,wt=at*Tt;return{x0:(V-ae)/2,y0:(V-wt)/2,cell:Tt,s:V}},sn=(V,Y)=>{const it=Si(),J=Mt==="chess"?V+.5:V,pt=Mt==="chess"?Y+.5:Y;return[it.x0+J*it.cell,it.y0+pt*it.cell]},ur=(V,Y)=>{const it=Si(),J=Mt==="chess",pt=(V-it.x0)/it.cell,at=(Y-it.y0)/it.cell,xt=J?Math.floor(pt):Math.round(pt),Tt=J?Math.floor(at):Math.round(at);return xt<0||Tt<0||xt>=tt.cols||Tt>=tt.rows?null:[xt,Tt]},L={R:1,N:1,C:1};function Z(){return{onPlace(V,Y,it,J){const pt=tt.pieces.find(at=>at.gx===V&&at.gy===Y);if(pt){const at=qe.get(pt.uid);at&&(at.born=Jt)}Mt==="go"&&J&&(an[it]+=J.length),yt++},onMove(V,Y,it,J,pt,at){const xt=qe.get(V);if(xt&&!o&&Ge.push({v:xt,fx:Y,fy:it,tx:J,ty:pt,t:0,dur:.34}),at){const Tt=qe.get(at);if(Tt){const[ae,wt]=sn(J,pt);Mt==="xq"&&!o&&L[Tt.t]?(Un.push({x:ae,y:wt,c:Tt.c,t:Tt.t,life:0,dur:.62,delay:.22}),rt(ae,wt,22)):rt(ae,wt,Mt==="xq"?10:16),qe.delete(at)}}yt++,(Mt==="chess"||Mt==="xq")&&Ps(Y,it,J,pt)},onCap(V){y.textContent="第 "+yt+" 手 · "+V},onEnd(V){y.textContent=V,Ht(V)}}}function rt(V,Y,it){if(!o)for(let J=0;J<it;J++){const pt=Math.random()*t,at=40+Math.random()*140;An.push({x:V,y:Y,vx:Math.cos(pt)*at,vy:Math.sin(pt)*at-40,life:1})}}function ot(){const V=new Set;for(const Y of tt.pieces){V.add(Y.uid);let it=qe.get(Y.uid);it?Q(Y.uid)||(it.gx=Y.gx,it.gy=Y.gy):(it={gx:Y.gx,gy:Y.gy,born:Jt,settled:!1},qe.set(Y.uid,it)),it.t=Y.t,it.c=Y.c}for(const Y of[...qe.keys()])V.has(Y)||qe.delete(Y)}function Q(V){return Ge.some(Y=>Y.v===qe.get(V))}const Rt={go:"黑",wuzi:"黑",xq:"红",chess:"白"},It=V=>Math.abs(Math.round(V*2)-V*2)<1e-9?String(Math.round(V*2)/2):V.toFixed(2);function kt(){const Y=new Map;for(const pt of tt.pieces)Y.set(pt.gx+","+pt.gy,pt.c);const it=new Set,J=[0,0];for(let pt=0;pt<19;pt++)for(let at=0;at<19;at++){const xt=pt+","+at;if(Y.has(xt)||it.has(xt))continue;const Tt=[[pt,at]];it.add(xt);let ae=0,wt=-1,xe=!1;for(;Tt.length;){const[Pe,jt]=Tt.pop();ae++;for(const[Ft,ye]of[[Pe+1,jt],[Pe-1,jt],[Pe,jt+1],[Pe,jt-1]]){if(Ft<0||ye<0||Ft>=19||ye>=19)continue;const ze=Ft+","+ye;if(Y.has(ze)){const ne=Y.get(ze);wt===-1?wt=ne:wt!==ne&&(xe=!0)}else it.has(ze)||(it.add(ze),Tt.push([Ft,ye]))}}wt!==-1&&!xe&&(J[wt]+=ae)}return{b:J[0]+an[0],w:J[1]+an[1]+6.5}}function Ht(V){const Y=Rt[Mt];let it=V,J=Pt?"双 AI 对局结束":"";if(Mt==="go"){const pt=kt(),at=pt.b-pt.w,xt=Math.abs(at)<1e-9?"和棋":at>0?"黑 胜":"白 胜";it=(Pt?xt:Math.abs(at)<1e-9?"和棋":at>0?"你赢了":"你输了")+" · 黑 "+It(pt.b)+" 目，白 "+It(pt.w)+" 目",J="数目法 · 白贴 6.5 目 · 提子 黑"+an[0]+"/白"+an[1]}else Pt||(it=/胜/.test(V)?V.indexOf(Y)===0?"你赢了":"你输了":"和棋",J=V);x.textContent=it,I.textContent=J,v.hidden=!1,requestAnimationFrame(()=>v.classList.add("on")),Ce=Pt?Ye()+6:0}function Xt(V){Mt=V,tt=cv(V,{difficulty:Dt,hooks:Z()}),tt.build(),yt=0,Ce=0,te=null,Qt=!1,Ie=[],je=!1,qe.clear(),Ge=[],An=[],Un=[],an=[0,0],Fn=0,v.classList.remove("on"),v.hidden=!0,et.hidden=V!=="go",pe=Ye()+.35,ot(),S.textContent=nh[V]+(V==="go"?" · 练习":""),y.textContent=Pt?"双 AI 自动对弈中…":"人机对局 · 你先走",M.textContent="第 0 手",Nn=!1,(V==="chess"||V==="xq")&&gv(V).then(()=>{Nn=!0,$==="play"&&!tt.over&&(pe=Jt+.05)}).catch(()=>{Nn=!1})}function $t(){const V=h(),Y=Si(),it=Y.s,J=u.createRadialGradient(it/2,it/2,10,it/2,it/2,it*.72);J.addColorStop(0,V.b2board),J.addColorStop(1,c==="dark"?"#101a34":"#e6d8b8"),u.fillStyle=J,u.fillRect(0,0,it,it);const pt=tt.cols,at=tt.rows,xt=wt=>Y.x0+wt*Y.cell,Tt=wt=>Y.y0+wt*Y.cell;if(Mt==="chess"){for(let wt=0;wt<8;wt++)for(let xe=0;xe<8;xe++)u.fillStyle=(wt+xe)%2?V.sqB:V.sqA,u.fillRect(xt(wt),Tt(xe),Y.cell+.5,Y.cell+.5);u.fillStyle=V.text,u.font=`${Y.cell*.2}px system-ui`,u.textAlign="center",u.textBaseline="middle";for(let wt=0;wt<8;wt++)u.fillText("abcdefgh"[wt],xt(wt+.5),Tt(8)-Y.cell*.32),u.fillText(String(8-wt),Y.x0-Y.cell*.34,Tt(wt+.5));return}if(u.strokeStyle=V.line,u.lineWidth=Math.max(1,Y.cell*.04),u.beginPath(),Mt==="xq"){for(let wt=0;wt<10;wt++)u.moveTo(xt(0),Tt(wt)),u.lineTo(xt(8),Tt(wt));for(let wt=0;wt<9;wt++)wt===0||wt===8?(u.moveTo(xt(wt),Tt(0)),u.lineTo(xt(wt),Tt(9))):(u.moveTo(xt(wt),Tt(0)),u.lineTo(xt(wt),Tt(4)),u.moveTo(xt(wt),Tt(5)),u.lineTo(xt(wt),Tt(9)));u.moveTo(xt(3),Tt(0)),u.lineTo(xt(5),Tt(2)),u.moveTo(xt(5),Tt(0)),u.lineTo(xt(3),Tt(2)),u.moveTo(xt(3),Tt(7)),u.lineTo(xt(5),Tt(9)),u.moveTo(xt(5),Tt(7)),u.lineTo(xt(3),Tt(9))}else{for(let wt=0;wt<pt;wt++)u.moveTo(xt(wt),Tt(0)),u.lineTo(xt(wt),Tt(pt-1));for(let wt=0;wt<at;wt++)u.moveTo(xt(0),Tt(wt)),u.lineTo(xt(at-1),Tt(wt))}u.stroke(),u.fillStyle=V.line;const ae=Mt==="go"?[[3,3],[9,3],[15,3],[3,9],[9,9],[15,9],[3,15],[9,15],[15,15]]:[[3,3],[11,3],[7,7],[3,11],[11,11]];for(const[wt,xe]of ae)u.beginPath(),u.arc(xt(wt),Tt(xe),Math.max(2,Y.cell*.11),0,t),u.fill();Mt==="xq"&&(u.fillStyle=V.text,u.font=`${Y.cell*.55}px 'KaiTi','STKaiti','SimSun',serif`,u.textAlign="center",u.textBaseline="middle",u.fillText("楚  河",xt(2),Tt(4.5)),u.fillText("漢  界",xt(6),Tt(4.5)))}const Vt={P:{h:1.6,shine:[-.15,-1.24,.15],body:"M -0.70 -0.02 C -0.72 -0.14 -0.66 -0.24 -0.58 -0.30 C -0.46 -0.52 -0.34 -0.72 -0.30 -0.92 C -0.30 -0.99 -0.26 -1.03 -0.20 -1.03 L 0.20 -1.03 C 0.26 -1.03 0.30 -0.99 0.30 -0.92 C 0.34 -0.72 0.46 -0.52 0.58 -0.30 C 0.66 -0.24 0.72 -0.14 0.70 -0.02 Z",extra:[{k:"circle",x:0,y:-1.28,r:.29}]},R:{h:1.42,shine:[-.2,-.78,.18],body:"M -0.70 -0.02 C -0.72 -0.14 -0.66 -0.24 -0.58 -0.30 L -0.50 -1.00 L -0.58 -1.06 L -0.58 -1.40 L -0.34 -1.40 L -0.34 -1.24 L -0.12 -1.24 L -0.12 -1.40 L 0.12 -1.40 L 0.12 -1.24 L 0.34 -1.24 L 0.34 -1.40 L 0.58 -1.40 L 0.58 -1.06 L 0.50 -1.00 L 0.58 -0.30 C 0.66 -0.24 0.72 -0.14 0.70 -0.02 Z"},N:{h:1.5,shine:[-.1,-1.02,.17],body:"M -0.70 -0.02 C -0.72 -0.14 -0.66 -0.24 -0.58 -0.30 C -0.60 -0.54 -0.52 -0.74 -0.34 -0.90 C -0.22 -1.00 -0.04 -1.06 0.08 -1.20 L 0.16 -1.42 C 0.22 -1.50 0.34 -1.48 0.38 -1.38 C 0.46 -1.16 0.40 -0.94 0.24 -0.80 C 0.16 -0.73 0.12 -0.66 0.14 -0.58 C 0.18 -0.46 0.28 -0.37 0.42 -0.30 C 0.52 -0.24 0.60 -0.14 0.70 -0.02 Z",mark:[{k:"circle",x:-.02,y:-1.06,r:.055,fill:"edge"}]},B:{h:1.78,shine:[-.12,-1.42,.16],body:"M -0.70 -0.02 C -0.72 -0.14 -0.66 -0.24 -0.58 -0.30 C -0.46 -0.54 -0.34 -0.76 -0.28 -0.96 L -0.30 -1.02 L 0.30 -1.02 L 0.28 -0.96 C 0.34 -0.76 0.46 -0.54 0.58 -0.30 C 0.66 -0.24 0.72 -0.14 0.70 -0.02 Z",extra:[{k:"path",d:"M 0 -1.06 C -0.16 -1.18 -0.26 -1.34 -0.24 -1.48 C -0.22 -1.60 -0.12 -1.68 0 -1.68 C 0.12 -1.68 0.22 -1.60 0.24 -1.48 C 0.26 -1.34 0.16 -1.18 0 -1.06 Z"},{k:"circle",x:0,y:-1.73,r:.07}],mark:[{k:"line",d:"M 0.01 -1.20 L 0.15 -1.46"}]},Q:{h:1.72,shine:[-.12,-1.38,.16],body:"M -0.70 -0.02 C -0.72 -0.14 -0.66 -0.24 -0.58 -0.30 C -0.46 -0.54 -0.34 -0.76 -0.28 -0.96 L -0.30 -1.02 L 0.30 -1.02 L 0.28 -0.96 C 0.34 -0.76 0.46 -0.54 0.58 -0.30 C 0.66 -0.24 0.72 -0.14 0.70 -0.02 Z",extra:[{k:"path",d:"M -0.46 -1.02 C -0.56 -1.14 -0.60 -1.28 -0.56 -1.40 L -0.40 -1.26 L -0.26 -1.48 L -0.12 -1.24 L 0 -1.50 L 0.12 -1.24 L 0.26 -1.48 L 0.40 -1.26 L 0.56 -1.40 C 0.60 -1.28 0.56 -1.14 0.46 -1.02 Z"},{k:"circle",x:-.56,y:-1.44,r:.055},{k:"circle",x:-.26,y:-1.52,r:.05},{k:"circle",x:0,y:-1.55,r:.055},{k:"circle",x:.26,y:-1.52,r:.05},{k:"circle",x:.56,y:-1.44,r:.055}]},K:{h:1.95,shine:[-.12,-1.4,.16],body:"M -0.70 -0.02 C -0.72 -0.14 -0.66 -0.24 -0.58 -0.30 C -0.46 -0.54 -0.34 -0.76 -0.28 -0.96 L -0.30 -1.02 L 0.30 -1.02 L 0.28 -0.96 C 0.34 -0.76 0.46 -0.54 0.58 -0.30 C 0.66 -0.24 0.72 -0.14 0.70 -0.02 Z",extra:[{k:"path",d:"M -0.44 -1.02 C -0.54 -1.12 -0.56 -1.26 -0.50 -1.36 L -0.26 -1.22 L 0 -1.44 L 0.26 -1.22 L 0.50 -1.36 C 0.56 -1.26 0.54 -1.12 0.44 -1.02 Z"},{k:"rect",x:-.036,y:-1.92,w:.072,h:.5},{k:"rect",x:-.16,y:-1.8,w:.32,h:.072}]}};function ce(V,Y,it){const J=Vt[V]||Vt.P,pt=!it,at=pt?{hi:"#ffffff",lt:"#f7fbff",mid:"#dde6f4",dk:"#93a4be",deep:"#5a6a86",edge:"rgba(48,62,88,.55)"}:{hi:"#a4b5cd",lt:"#697992",mid:"#3a4359",dk:"#1b2432",deep:"#070c14",edge:"rgba(0,0,0,.6)"};u.save(),u.save(),u.translate(0,.04*Y),u.scale(1,.3);const xt=u.createRadialGradient(0,0,Y*.08,0,0,Y*1.02);xt.addColorStop(0,"rgba(0,0,0,.46)"),xt.addColorStop(.55,"rgba(0,0,0,.18)"),xt.addColorStop(1,"rgba(0,0,0,0)"),u.fillStyle=xt,u.beginPath(),u.arc(0,0,Y*1.02,0,t),u.fill(),u.restore();const Tt=u.createRadialGradient(-.4*Y,-J.h*.6*Y,Y*.06,-.05*Y,-J.h*.42*Y,J.h*1.05*Y);Tt.addColorStop(0,at.hi),Tt.addColorStop(.24,at.lt),Tt.addColorStop(.5,at.mid),Tt.addColorStop(.76,at.dk),Tt.addColorStop(1,at.deep),u.fillStyle=Tt;const ae=new Path2D;ae.addPath(new Path2D(J.body),new DOMMatrix([Y,0,0,Y,0,0])),u.fill(ae);for(const Ft of J.extra||[]){const ye=new Path2D;Ft.k==="circle"?ye.arc(Ft.x*Y,Ft.y*Y,Ft.r*Y,0,t):Ft.k==="rect"?ye.rect(Ft.x*Y,Ft.y*Y,Ft.w*Y,Ft.h*Y):Ft.k==="path"&&ye.addPath(new Path2D(Ft.d),new DOMMatrix().scale(Y)),u.fill(ye)}u.lineWidth=Math.max(.6,Y*.045),u.strokeStyle=at.edge,u.stroke(ae);const[wt,xe,Pe]=J.shine;u.save(),u.translate(wt*Y,xe*Y),u.scale(1,.62);const jt=u.createRadialGradient(0,0,0,0,0,Pe*Y);jt.addColorStop(0,pt?"rgba(255,255,255,.95)":"rgba(226,236,250,.55)"),jt.addColorStop(.55,pt?"rgba(255,255,255,.38)":"rgba(210,224,244,.18)"),jt.addColorStop(1,"rgba(255,255,255,0)"),u.fillStyle=jt,u.beginPath(),u.arc(0,0,Pe*Y,0,t),u.fill(),u.restore();for(const Ft of J.mark||[])Ft.k==="circle"?(u.fillStyle=Ft.fill==="edge"?at.edge:at.deep,u.beginPath(),u.arc(Ft.x*Y,Ft.y*Y,Ft.r*Y,0,t),u.fill()):Ft.k==="line"&&(u.strokeStyle=at.edge,u.lineWidth=Math.max(.7,Y*.05),u.stroke(new Path2D(Ft.d,new DOMMatrix().scale(Y))));u.strokeStyle=pt?"rgba(90,110,140,.35)":"rgba(0,0,0,.45)",u.lineWidth=Math.max(.6,Y*.035),u.beginPath(),u.ellipse(0,-.3*Y,Y*.6,Y*.11,0,0,t),u.stroke(),u.restore()}function he(V,Y,it,J){const pt=h(),xt=Si().cell*(Mt==="go"||Mt==="wuzi"?.47:Mt==="xq"?.44:.42)*J;if(!(xt<.5)){if(u.save(),u.translate(Y,it),Mt==="go"||Mt==="wuzi"){const Tt=u.createRadialGradient(-xt*.35,-xt*.35,xt*.1,0,0,xt);V.c===0?(Tt.addColorStop(0,c==="dark"?"#39424e":"#3a4658"),Tt.addColorStop(1,c==="dark"?"#0b0f16":"#12182a")):(Tt.addColorStop(0,"#f7faff"),Tt.addColorStop(1,c==="dark"?"#b7c4d9":"#cdd8ea")),u.fillStyle=Tt,u.shadowColor="rgba(0,0,0,.4)",u.shadowBlur=xt*.5,u.shadowOffsetY=xt*.18,u.beginPath(),u.arc(0,0,xt,0,t),u.fill(),u.shadowColor="transparent"}else if(Mt==="xq"){u.shadowColor="rgba(0,0,0,.35)",u.shadowBlur=xt*.5,u.shadowOffsetY=xt*.18,u.fillStyle=a(pt.wood),u.beginPath(),u.arc(0,0,xt,0,t),u.fill(),u.shadowColor="transparent",u.strokeStyle=a(pt.blk)+"80",u.lineWidth=Math.max(1,xt*.09),u.beginPath(),u.arc(0,0,xt*.85,0,t),u.stroke();const Tt={K:"帥",A:"仕",B:"相",N:"馬",R:"車",C:"炮",P:"兵"}[V.t]||"兵";u.fillStyle=a(V.c===0?pt.red:pt.blk),u.font=`${xt*1.15}px 'KaiTi','STKaiti','SimSun',serif`,u.textAlign="center",u.textBaseline="middle",u.fillText(Tt,0,xt*.06)}else u.translate(0,xt*.52),ce(V.t,xt,V.c);u.restore()}}function be(){var it;if(!tt)return;const V=h(),Y=Si();if(u.clearRect(0,0,Y.s,Y.s),$t(),tt.last){const[J,pt]=sn(tt.last[0],tt.last[1]);u.strokeStyle=V.gold,u.lineWidth=1.6,u.globalAlpha=.85,u.beginPath(),u.arc(J,pt,Y.cell*.52,0,t),u.stroke(),u.globalAlpha=1}if(tt.winLine){const[J,pt]=tt.winLine,[at,xt]=sn(J[0],J[1]),[Tt,ae]=sn(pt[0],pt[1]);u.strokeStyle=V.gold,u.lineWidth=3,u.globalAlpha=.8,u.beginPath(),u.moveTo(at,xt),u.lineTo(Tt,ae),u.stroke(),u.globalAlpha=1}if(Mi&&!tt.over){const[J,pt]=Mi;if(Mt==="go"||Mt==="wuzi"){if(!tt.pieces.some(at=>at.gx===J&&at.gy===pt)){const[at,xt]=sn(J,pt);u.globalAlpha=.38,he({c:tt.turn},at,xt,1),u.globalAlpha=1}}else if(te){u.fillStyle=V.gold;for(const[Tt,ae]of te.targets){const[wt,xe]=sn(Tt,ae);u.globalAlpha=.45+Math.sin(Jt*6)*.22,u.beginPath(),u.arc(wt,xe,Y.cell*.13,0,t),u.fill()}u.globalAlpha=1;const[at,xt]=sn(te.p.gx,te.p.gy);u.strokeStyle=V.gold,u.lineWidth=2,u.beginPath(),u.arc(at,xt,Y.cell*.52,0,t),u.stroke()}else{const at=tt.pieces.find(xt=>xt.gx===J&&xt.gy===pt);if(at&&at.c===tt.turn){const[xt,Tt]=sn(J,pt);u.strokeStyle=V.accent,u.lineWidth=1.5,u.globalAlpha=.5,u.beginPath(),u.arc(xt,Tt,Y.cell*.5,0,t),u.stroke(),u.globalAlpha=1}}}for(const[J,pt]of qe){if(Ge.some(xe=>xe.v===pt))continue;const xt=pt.born!==void 0?(Jt-pt.born)/.38:1,Tt=xt<1?r(Math.max(0,xt)):1,[ae,wt]=sn(pt.gx,pt.gy);he({c:pt.c,t:pt.t},ae,wt,Tt)}for(const J of Ge){const pt=s(Math.min(1,J.t)),[at,xt]=sn(J.fx,J.fy),[Tt,ae]=sn(J.tx,J.ty),wt=n(at,Tt,pt),xe=n(xt,ae,pt)-Math.sin(Math.PI*pt)*Y.cell*.45,Pe=qe.get((it=[...qe.entries()].find(([,jt])=>jt===J.v))==null?void 0:it[0])||J.v;he({c:Pe.c,t:Pe.t},wt,xe,1.05)}for(const J of Un){if(J.delay>0)continue;const pt=e(J.life/J.dur,0,1);if(pt>=1)continue;const at=Y.cell*(.34+pt*.82),xt=u.createRadialGradient(J.x,J.y,0,J.x,J.y,at);xt.addColorStop(0,c==="dark"?"rgba(255,209,102,.5)":"rgba(213,155,26,.42)"),xt.addColorStop(1,"rgba(255,209,102,0)"),u.globalAlpha=(1-pt)*.9,u.fillStyle=xt,u.beginPath(),u.arc(J.x,J.y,at,0,t),u.fill(),u.strokeStyle=V.gold,u.lineWidth=Math.max(1,Y.cell*.05*(1-pt)),u.beginPath(),u.arc(J.x,J.y,at,0,t),u.stroke(),u.globalAlpha=Math.pow(1-pt,1.4),he({c:J.c,t:J.t},J.x,J.y,1+.38*s(pt)),u.globalAlpha=1}for(const J of An)u.globalAlpha=Math.max(0,J.life),u.fillStyle=V.gold,u.beginPath(),u.arc(J.x,J.y,2.2,0,t),u.fill();u.globalAlpha=1}g.addEventListener("pointermove",V=>{const Y=g.getBoundingClientRect();Y.width!==0&&(Mi=ur(V.clientX-Y.left,V.clientY-Y.top))}),g.addEventListener("pointerleave",()=>{Mi=null}),g.addEventListener("pointerdown",V=>{if(!tt||tt.over||Ce)return;const Y=g.getBoundingClientRect(),it=ur(V.clientX-Y.left,V.clientY-Y.top);if(!it)return;const[J,pt]=it;if(Mt==="go"||Mt==="wuzi")if(tt.tryHuman(J,pt))ot(),Qt=!0,pe=Ye()+.45;else{const[at,xt]=sn(J,pt);rt(at,xt,4)}else if(te&&te.targets.some(([at,xt])=>at===J&&xt===pt)){const at=te.p;te=null,tt.moveTo(at,J,pt),ot(),Qt=!0,pe=Ye()+.45}else{const at=tt.tryHuman(J,pt);te=at&&at.select?{p:at.select,targets:tt.legalFrom(at.select)}:null}});function Ve(V){$="play",T.tDist=15,T.tElev=.3,T.look.set(V.grp.position.x*.5,0,V.grp.position.z*.5),d.classList.add("hidden"),_.classList.add("on"),Xt(V.mode)}function le(){$="gallery",_.classList.remove("on"),d.classList.remove("hidden"),T.tDist=26,T.tElev=.32,T.tAzim=0,T.look.set(0,0,0)}P.addEventListener("click",le),z.addEventListener("click",()=>Xt(Mt)),C.addEventListener("click",()=>Xt(Mt)),E.addEventListener("click",le),B.addEventListener("click",()=>{Pt=!Pt,B.classList.toggle("on",Pt),y.textContent=Pt?"双 AI 自动对弈中…":"人机对局 · 你先走",Qt=!1}),D.addEventListener("click",V=>{const Y=V.target.closest("button");Y&&(Dt=+Y.dataset.d,[...D.querySelectorAll("button")].forEach(it=>it.classList.toggle("on",it===Y)),Xt(Mt))}),document.addEventListener("keydown",V=>{V.key==="Escape"&&$==="play"&&le()});function Wt(){const V=document.documentElement.getAttribute("data-theme")||"dark";if(V===c)return;c=V;const Y=h();w.background=null,w.fog.color=new ee(Y.fog),w.fog.near=24,w.fog.far=70,O.color.set(Y.rim),k.color.setHex(Y.amb),k.groundColor.setHex(Y.plate),St();for(const it in N)delete N[it]}new MutationObserver(Wt).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),w.background=null,w.fog=new bl(h().fog,24,70),O.color.set(h().rim),k.color.setHex(h().amb),k.groundColor.setHex(h().plate);let Jt=0;function Ye(){return performance.now()/1e3}function jn(V){for(let it=An.length-1;it>=0;it--){const J=An[it];J.x+=J.vx*V,J.y+=J.vy*V,J.vy+=220*V,J.life-=V*1.6,J.life<=0&&An.splice(it,1)}for(let it=Ge.length-1;it>=0;it--){const J=Ge[it];if(J.t+=V/J.dur,J.t>=1){const pt=J.v;pt.gx=J.tx,pt.gy=J.ty,Ge.splice(it,1)}}for(let it=Un.length-1;it>=0;it--){const J=Un[it];if(J.delay>0){J.delay-=V;continue}J.life+=V,J.life>=J.dur&&Un.splice(it,1)}if(Mt==="go"&&tt&&(Fn-=V,Fn<=0)){Fn=.3;const it=tt.pieces.filter(pt=>!pt.c).length,J=tt.pieces.length-it;if(tt.pieces.length/361<.2)et.textContent="布局阶段 · 黑 "+it+" 子 / 白 "+J+" 子 · 提子 "+an[0]+"/"+an[1];else{const pt=kt();et.innerHTML="黑 <b>"+It(pt.b)+"</b> 目　白 <b>"+It(pt.w)+'</b> 目<span class="dim">贴目 6.5 · 提子 '+an[0]+"/"+an[1]+"</span>"}}if(Ce&&Jt>Ce&&$==="play"&&Xt(Mt),!tt||tt.over||Ce)return;if((Pt||Qt)&&Ge.length===0&&Jt>pe&&!je)if(Nn&&(Mt==="chess"||Mt==="xq")){je=!0;const J=Dt===2?350:Dt===1?220:120,pt=Mt==="xq"?_v():null;vv(Mt,{fen:pt,moves:Ie,movetime:J}).then(at=>{je=!1,we(at)}).catch(()=>{je=!1,we(null)})}else tt.stepAI(),ot(),Qt=!1,pe=Jt+(Pt?.22+Math.random()*.28:.2)}function Qe(V,Y,it,J){Jt=J/1e3,Wt(),R(),o||(K.rotation.y+=.01/60),me(Jt),$==="play"&&(jn(.016),be(),M.textContent="第 "+yt+" 手"),A.render(w,F)}function Rs(V,Y){V<=0||Y<=0||(Jn=V,Vi=Y,A.setSize(V,Y,!1),F.aspect=V/Y,F.updateProjectionMatrix(),hr())}function we(V){if(!V){un();return}const Y=pv(Mt,V);if(!Y){un();return}const it=tt.pieces.find(J=>J.gx===Y.fx&&J.gy===Y.fy);if(!it){un();return}tt.moveTo(it,Y.tx,Y.ty),ot(),Qt=!1,pe=Jt+(Pt?.18+Math.random()*.22:.25)}function un(){tt.stepAI(),ot(),Qt=!1,pe=Jt+(Pt?.22+Math.random()*.28:.2)}function Ps(V,Y,it,J){const pt=Mt==="chess"&&Math.abs(J-Y)===1&&(J===0||J===7);Ie.push(fv(Mt,V,Y,it,J,pt))}return window.__chessEnter=V=>{const Y=Ct.find(it=>it.mode===V);Y&&Ve(Y)},window.__chessDbg=()=>{let V=0;if(tt)for(const Y of tt.pieces)V=Math.max(V,Math.abs(Y.gx));return{view:$,mode:Mt,moveNo:yt,pieces:tt?tt.pieces.length:0,over:!!Ce,maxX:+V.toFixed(2),engineOk:Nn,uciLen:Ie.length}},window.__chessEngineOn=()=>Nn,window.__chessUCI=()=>Ie.slice(),{frame:Qe,resize:Rs}}const Te=window.matchMedia("(prefers-reduced-motion: reduce)").matches,_e=(i,t)=>i+Math.random()*(t-i),Ue=(i,t,e)=>i+(t-i)*e,Re=Math.PI*2;function yv(i,t){const e=Math.min(window.devicePixelRatio||1,2),n=t.clientWidth||window.innerWidth,s=t.clientHeight||window.innerHeight;i.width=Math.max(1,Math.round(n*e)),i.height=Math.max(1,Math.round(s*e)),i.style.width=n+"px",i.style.height=s+"px";const r=i.getContext("2d");return r.setTransform(e,0,0,e,0,0),{ctx:r,w:n,h:s}}function fo(i,t){const e=i.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-e.left+n.width/2,y:n.top-e.top+n.height/2,w:n.width,h:n.height}}function Cs(){return document.documentElement.getAttribute("data-theme")!=="light"?{a:"123,224,255",b:"120,180,255",c:"123,200,255",g:"180,210,255"}:{a:"0,144,212",b:"43,108,255",c:"43,108,255",g:"40,90,180"}}function Mv(){let i=[];function t(e,n){i=Array.from({length:70},()=>({x:_e(0,e),y:_e(0,n),ox:_e(0,e),oy:_e(0,n),r:_e(.6,2),ph:_e(0,Re),a:_e(.2,.7)}))}return{resize:t,frame(e,n,s,r){e.clearRect(0,0,n,s);const o=Cs(),a=n/2,l=s*.32;for(const h of i){h.x=Ue(h.x,Ue(h.ox,a,.35),.02),h.y=Ue(h.y,Ue(h.oy,l,.35),.02),h.ox+=Math.cos(r*3e-4+h.ph)*.3,h.oy+=Math.sin(r*3e-4+h.ph)*.3;const p=h.a*(.6+.4*Math.sin(r*.002+h.ph));e.beginPath(),e.arc(h.x,h.y,h.r,0,Re),e.fillStyle=`rgba(${o.g},${p})`,e.fill()}const c=e.createRadialGradient(a,l,0,a,l,n*.28);c.addColorStop(0,`rgba(${o.a},0.10)`),c.addColorStop(1,`rgba(${o.a},0)`),e.fillStyle=c,e.fillRect(0,0,n,s)}}}function Sv(i){const t=i.querySelector(".avatar");let e=[],n={x:0,y:0,r:90};function s(o,a){if(t){const l=fo(i,t);n={x:l.x,y:l.y,r:Math.max(70,l.w/2+34)}}else n={x:o/2,y:a/2,r:90};e=Array.from({length:60},()=>({x:_e(0,o),y:_e(0,a),tx:0,ty:0,a:_e(.3,.9),ph:_e(0,Re)}))}function r(){e.forEach((o,a)=>{const l=a/e.length*Re;o.tx=n.x+Math.cos(l)*n.r,o.ty=n.y+Math.sin(l)*n.r})}return{resize(o,a){s(o,a),r()},frame(o,a,l,c){o.clearRect(0,0,a,l);const h=Cs();r();for(const p of e){p.x=Ue(p.x,p.tx,.06),p.y=Ue(p.y,p.ty,.06),Math.atan2(p.y-n.y,p.x-n.x);const m=p.a*(.6+.4*Math.sin(c*.003+p.ph));o.beginPath(),o.arc(p.x,p.y,1.8,0,Re),o.fillStyle=`rgba(${h.a},${m})`,o.shadowBlur=8,o.shadowColor=`rgba(${h.a},${m})`,o.fill(),o.shadowBlur=0}}}}const qr="·:*○●★☆→←↑↓/\\|=+<>░▒▓日月星辰光渊象".split("");function bv(){let i=[];function t(e,n){i=Array.from({length:40},()=>({x:_e(0,e),y:_e(-n,0),s:_e(12,22),sp:_e(.6,1.8),a:_e(.15,.5)}))}return{resize:t,frame(e,n,s,r){e.clearRect(0,0,n,s);const o=Cs();e.font='16px "Courier New", monospace';for(const a of i){a.y+=a.sp,a.y>s+20&&(a.y=_e(-40,0),a.x=_e(0,n));const l=qr[(Math.floor(r*.01+a.x)%qr.length+qr.length)%qr.length];e.fillStyle=`rgba(${o.a},${a.a})`,e.fillText(l,a.x,a.y)}}}}const sh=["♪","♫","♬","♩"];function wv(i){const t=i.querySelector(".music-play"),e=()=>document.documentElement.getAttribute("data-theme")!=="light",n=()=>e()?{a:"123,224,255",b:"120,180,255",g:"180,210,255"}:{a:"0,144,212",b:"43,108,255",g:"40,90,180"},s=v=>{let x=v>>>0;return()=>(x=x*1664525+1013904223>>>0,x/4294967296)};let r=[];function o(v,x){const I=s(987654321),C=v<560?14:24;r=[];let E=0;for(;r.length<C&&E<C*240;){E++;const A=I()*2-1,w=I()*2-1,F=I()*2-1;let T=!0;for(const R of r){const k=R.nx-A,G=R.ny-w,st=(R.nz-F)*1.4;if(Math.hypot(k,G,st)<.26){T=!1;break}}T&&r.push({nx:A,ny:w,nz:F,g:sh[I()*sh.length|0],sizeBase:18+I()*26,ph:I()*Math.PI*2,sp:.4+I()*.8})}}const a=900;function l(v,x,I,C,E){const A=a+I;if(A<60)return null;const w=a/A;return{x:C+v*w,y:E+x*w,s:w}}let c=null,h=!1,p=-1,m=0,g=0;function u(){if(c)return c;try{const v=window.AudioContext||window.webkitAudioContext;if(!v)return null;const x=new v,I=x.createAnalyser();I.fftSize=256;const C=new Uint8Array(I.frequencyBinCount),E=new Audio;E.preload="auto",E.crossOrigin="anonymous",E.addEventListener("ended",()=>{h&&S(!0)}),E.addEventListener("playing",()=>{g=0}),E.addEventListener("error",()=>{if(h){if(g++,g>=3){d();return}f()}}),c={ctx:x,analyser:I,bins:C,el:E,srcNode:null},E.addEventListener("play",function(){if(window.parent&&window.parent!==window)try{window.parent.postMessage({type:"endy:audioFocus",owner:"home-app"},"*")}catch{}}),window.addEventListener("message",function(A){if(A.data&&A.data.type==="endy:audioFocus"&&A.data.owner==="blog"){try{E.paused||E.pause()}catch{}document.querySelectorAll("audio, video").forEach(function(w){try{w.paused||w.pause()}catch{}})}})}catch{c=null}return c}function _(){if(!(!c||c.srcNode))try{const v=c.ctx.createMediaElementSource(c.el);v.connect(c.analyser),c.analyser.connect(c.ctx.destination),c.srcNode=v}catch{}}function d(){h=!1,g=0;try{c.el.pause()}catch{}t&&(t.textContent="▶ 试听",t.setAttribute("aria-label","试听随机歌曲"))}function f(){const v=Le.music&&Le.music.playlist,x=v&&v[p];if(!x||!x.raw||x._rawTried){d();return}x._rawTried=!0,c.el.src=x.raw,c.el.play().catch(()=>{})}function S(v){const x=Le.music&&Le.music.playlist;if(!x||!x.length)return!1;let I=p;if(!v||x.length===1)I=Math.floor(Math.random()*x.length);else do I=Math.floor(Math.random()*x.length);while(I===p);p=I;const C=x[I];return c.el.src=C.src,c.el.title=C.title||"未知曲目",_(),t&&(t.textContent="♪ "+(C.title||"播放中"),t.setAttribute("aria-label","正在播放："+(C.title||"未知曲目")+"，点击停止")),c.el.play().catch(()=>{}),!0}function M(){if(Te)return;const v=u();if(v)if(h=!h,h){const x=Le.music&&Le.music.playlist;if(x&&x.forEach(I=>{I._rawTried=!1}),g=0,v.ctx.state==="suspended"&&v.ctx.resume(),!S(!1)){h=!1;return}}else v.el.pause(),t&&(t.textContent="▶ 试听",t.setAttribute("aria-label","试听随机歌曲"))}t&&!Te&&t.addEventListener("click",M);function y(v){const x=v*96/6e4*Math.PI*2,I=Math.pow(Math.max(0,Math.sin(x)),6),C=.5+.5*Math.sin(v*.0011);return{kick:I,bass:C}}const B={sx:0,sy:0,tsx:0,tsy:0},D={x:0,y:0,tx:0,ty:0};window.addEventListener("pointermove",v=>{D.tx=(v.clientX/window.innerWidth-.5)*2,D.ty=(v.clientY/window.innerHeight-.5)*2},{passive:!0});const P=48;function z(v,x){o(v)}z(0);function et(v,x,I,C){v.clearRect(0,0,x,I);const E=n(),A=x*.5,w=I*.46,F=!!(c&&h&&c.el&&!c.el.paused),T=F&&c.el?c.el.currentTime*1e3:0,{kick:R,bass:k}=F?y(T):{kick:0,bass:0};let G=null;if(m=0,c&&h&&c.srcNode&&c.el&&!c.el.paused){c.analyser.getByteFrequencyData(c.bins),G=c.bins;let _t=0;for(let U=0;U<G.length;U++)_t+=G[U];m=_t/G.length/255}const st=i.getBoundingClientRect(),X=window.innerHeight||1,O=(st.top+st.height/2-X/2)/X;D.x+=(D.tx-D.x)*.06,D.y+=(D.ty-D.y)*.06,B.tsx=O*x*.08+D.x*x*.04,B.tsy=O*I*.05+D.y*I*.03,B.sx+=(B.tsx-B.sx)*.08,B.sy+=(B.tsy-B.sy)*.08;const W=.42;v.save(),v.translate(A+B.sx*.35,w+B.sy*.35);const H=[{r:150,sp:18e-5,dots:5,c:E.a,w:1.2},{r:104,sp:-26e-5,dots:4,c:E.b,w:1},{r:62,sp:34e-5,dots:3,c:E.g,w:.9}];for(const _t of H){v.save(),v.scale(1,W),v.beginPath(),v.arc(0,0,_t.r,0,Math.PI*2),v.strokeStyle=`rgba(${_t.c},0.3)`,v.lineWidth=_t.w,v.stroke();for(let U=0;U<_t.dots;U++){const b=C*_t.sp+U/_t.dots*Math.PI*2;v.beginPath(),v.arc(Math.cos(b)*_t.r,Math.sin(b)*_t.r,2.4,0,Math.PI*2),v.fillStyle=`rgba(${_t.c},0.9)`,v.shadowBlur=10,v.shadowColor=`rgba(${_t.c},0.9)`,v.fill(),v.shadowBlur=0}v.restore()}const K=178,ct=C*2e-4;for(let _t=0;_t<P;_t++){const U=_t/P*Math.PI*2+ct;let b;if(G&&m>.01){const vt=Math.floor(_t/P*(G.length*.7));b=6+G[vt]/255*46}else F?b=6+(.5+.5*Math.sin(T*.004+_t*.5))*(10+26*(.6+.4*R)):b=6;const j=Math.cos(U),dt=Math.sin(U);v.beginPath(),v.moveTo(j*K,dt*K*W),v.lineTo(j*(K+b),dt*(K+b)*W),v.strokeStyle=`rgba(${_t%2?E.a:E.b},${.5+.4*(b/52)})`,v.lineWidth=2,v.shadowBlur=6,v.shadowColor=`rgba(${E.a},0.6)`,v.stroke()}v.shadowBlur=0;const mt=14+R*10+k*6+m*14,ht=v.createRadialGradient(0,0,0,0,0,mt*3);ht.addColorStop(0,`rgba(${E.g},${.5+.3*R})`),ht.addColorStop(1,`rgba(${E.g},0)`),v.fillStyle=ht,v.beginPath(),v.arc(0,0,mt*3,0,Math.PI*2),v.fill(),v.restore();const St=Math.min(x,I)*.9,nt=St/2,N=x*.86/2,lt=I*.7/2,ut=C*6e-5,gt=Math.cos(ut),At=Math.sin(ut),Ot=[];for(const _t of r){const U=_t.nx*N,b=_t.ny*lt,j=_t.nz*nt,dt=U*gt-j*At,vt=U*At+j*gt,ft=(j+nt)/St,zt=dt+B.sx*(.5+ft)*.7,Ct=b+B.sy*(.5+ft)*.7,Nt=l(zt,Ct,vt,A,w);if(!Nt)continue;const re=1+Math.min(.3,R*.12+k*.06+m*.22),bt=_t.sizeBase*Nt.s*re;bt<3||Ot.push({n:_t,p:Nt,size:bt,depthF:ft})}Ot.sort((_t,U)=>_t.p.s-U.p.s);for(const _t of Ot){const U=_t.n,b=.35+_t.depthF*.55,j=Math.sin(C*5e-4*U.sp+U.ph)*.5;v.save(),v.translate(_t.p.x,_t.p.y),v.rotate(j),v.font=`${_t.size.toFixed(1)}px "Segoe UI Symbol","Apple Symbols",serif`,v.textAlign="center",v.textBaseline="middle",v.fillStyle=`rgba(${_t.depthF>.5?E.a:E.b},${b.toFixed(2)})`,v.shadowBlur=8*_t.depthF,v.shadowColor=`rgba(${E.a},${.5*_t.depthF})`,v.fillText(U.g,0,0),v.restore()}}return{frame:et,resize:z}}function Ev(i){const t=document.createElement("div");t.className="holo-host",i.appendChild(t);let e;try{e=new _o({antialias:!0,alpha:!0})}catch{const R=document.createElement("div");return R.className="holo-fallback",R.textContent="当前环境不支持 WebGL，全息投影暂不可用",i.appendChild(R),{frame(){}}}e.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(e.domElement);const n=i.clientWidth||window.innerWidth,s=i.clientHeight||window.innerHeight;e.setSize(n,s,!1);const r=new lr,o=new Xe(45,n/s,.1,2e3),a=new q(0,46,84);o.position.copy(a),o.lookAt(0,0,0);const l=new _n,c=new _n;l.add(c),r.add(l);const h={dragging:!1,sx:0,sy:0,tilt0:0,spin0:0,tTilt:.62,tilt:.62,tSpin:0,spin:0,mx:-2,my:-2,tipX:0,tipY:0,started:0,prog:0,theme:"",nx:0,ny:0,dustMat:null},p={dark:{fill:2861311,fillOp:.1,edge:7332863,edgeOp:.85,scan:10481919,beam:5767113,dust:10470655,dustOp:.4},light:{fill:2845951,fillOp:.12,edge:683220,edgeOp:.9,scan:2845951,beam:43138,dust:3824266,dustOp:.28}};let m=p.dark;const g=118.35,u=26.05,_=15,d=(T,R)=>[(T-g)*_*Math.cos(u*Math.PI/180),(R-u)*_],f=[],S=[],M=[],y=[];let B=null,D=null,P=null,z=null;function et(){for(const X of sv.features){const O=X.geometry.coordinates,W=[];for(const ht of O){const St=ht[0];if(!St||St.length<3)continue;const nt=St.map(([N,lt])=>{const[ut,gt]=d(N,lt);return new Et(ut,gt)});W.push(new yo(nt))}if(!W.length)continue;y.push(W);const H=new So(W,{depth:1.7,bevelEnabled:!1}),K=new Tn({color:m.fill,transparent:!0,opacity:0,blending:gn,depthWrite:!1,side:rn}),ct=new Ee(H,K);ct.userData.name=X.properties.name,c.add(ct),f.push(ct);const mt=new xo({color:m.edge,transparent:!0,opacity:0});S.push(mt),c.add(new hg(new Eg(H,18),mt))}h.scanMat=new Tn({color:m.scan,transparent:!0,opacity:0,blending:gn,depthWrite:!1,side:rn}),B=new _n;for(const X of y)B.add(new Ee(new Rl(X),h.scanMat));c.add(B);const[T,R]=d(119.548,26.657);h.nx=T,h.ny=R,D=new Ee(new cr(.22,.34,16,16,1,!0),new Tn({color:m.beam,transparent:!0,opacity:0,blending:gn,depthWrite:!1,side:rn})),D.rotation.x=Math.PI/2,D.position.set(T,R,8),c.add(D);for(let X=0;X<2;X++){const O=new Ee(new bo(.9,1.02,48),new Tn({color:m.beam,transparent:!0,opacity:0,blending:gn,depthWrite:!1,side:rn}));O.rotation.x=Math.PI/2,O.position.set(T,R,.15),O.userData.phase=X*.5,c.add(O),M.push(O)}const k=500,G=new Float32Array(k*3);for(let X=0;X<k;X++)G[X*3]=(Math.random()-.5)*300,G[X*3+1]=Math.random()*90-15,G[X*3+2]=(Math.random()-.5)*300;const st=new Se;st.setAttribute("position",new Je(G,3)),h.dustMat=new ws({color:m.dust,size:1.1,sizeAttenuation:!1,transparent:!0,opacity:0}),r.add(new js(st,h.dustMat)),P=document.createElement("div"),P.className="holo-label",P.textContent="我在这里",i.appendChild(P),z=document.createElement("div"),z.className="holo-tip",i.appendChild(z)}const v=e.domElement;v.addEventListener("pointerdown",T=>{if(!(T.pointerType!=="mouse"||T.button!==0)){h.dragging=!0,h.sx=T.clientX,h.sy=T.clientY,h.tilt0=h.tTilt,h.spin0=h.tSpin;try{v.setPointerCapture(T.pointerId)}catch{}}}),v.addEventListener("pointermove",T=>{const R=i.getBoundingClientRect();h.mx=(T.clientX-R.left)/R.width*2-1,h.my=-((T.clientY-R.top)/R.height*2-1),h.tipX=T.clientX-R.left,h.tipY=T.clientY-R.top,h.dragging&&(h.tSpin=h.spin0-(T.clientX-h.sx)*.005,h.tTilt=Math.max(.06,Math.min(1.32,h.tilt0+(T.clientY-h.sy)*.004)))}),v.addEventListener("pointerup",T=>{h.dragging=!1;try{v.releasePointerCapture(T.pointerId)}catch{}}),v.addEventListener("pointerleave",()=>{h.dragging=!1,h.mx=-2,h.my=-2});function x(){const T=i.getBoundingClientRect(),R=T.top+T.height/2,k=window.innerHeight/2;h.prog=Math.max(0,Math.min(1,1-Math.abs(R-k)/(window.innerHeight*.9)))}function I(){const T=document.documentElement.getAttribute("data-theme")||"dark";if(T!==h.theme){h.theme=T,m=p[T]||p.dark;for(const R of f)R.material.color.setHex(m.fill);for(const R of S)R.color.setHex(m.edge);h.scanMat&&h.scanMat.color.setHex(m.scan),D&&D.material.color.setHex(m.beam);for(const R of M)R.material.color.setHex(m.beam);h.dustMat&&h.dustMat.color.setHex(m.dust)}}const C=new Eo,E=new Et;function A(){if(!z)return;if(h.dragging||h.mx<-1.5){z.classList.remove("show");return}C.setFromCamera(E.set(h.mx,h.my),o);const T=C.intersectObjects(f,!1)[0];T?(z.textContent=T.object.userData.name,z.style.left=h.tipX+"px",z.style.top=h.tipY+"px",z.classList.add("show")):z.classList.remove("show")}et();const w=T=>1-Math.pow(1-T,3),F=new q;return{resize(T,R){e.setSize(T,R,!1),o.aspect=T/R,o.updateProjectionMatrix()},frame(T,R,k,G){I(),h.started||(h.started=G),x();const st=G-h.started,X=Te?1:w(Math.min(1,st/1900)),O=Te?1:.92+.08*Math.sin(G*.02)*Math.sin(G*.013);c.position.y=-14*(1-X)+(Te?0:Math.sin(G*.0011)*.7*X);for(const W of f)W.material.opacity=m.fillOp*O*X;for(const W of S)W.opacity=m.edgeOp*X;if(h.dustMat&&(h.dustMat.opacity=m.dustOp*X),X>=1&&P&&P.classList.add("show"),!h.dragging&&!Te&&(h.tSpin+=.0016),h.spin=Ue(h.spin,h.tSpin,.07),h.tilt=Ue(h.tilt,h.tTilt,.07),c.rotation.y=h.spin,l.rotation.x=-Math.PI/2+h.tilt,o.position.copy(a).multiplyScalar(1.35-h.prog*.35),o.lookAt(0,0,0),B){const W=G*35e-5%1;B.position.z=-1.5+W*5,h.scanMat.opacity=.38*(1-Math.abs(W-.5)*1.2)*X*O}for(const W of M){const H=(G*6e-4+W.userData.phase)%1,K=.6+H*7;W.scale.set(K,K,1),W.material.opacity=(1-H)*.55*X}D&&(D.material.opacity=(.35+.15*Math.sin(G*.004))*X),P&&(F.set(h.nx,h.ny,16),c.updateWorldMatrix(!0,!1),F.applyMatrix4(c.matrixWorld),F.project(o),P.style.left=(F.x*.5+.5)*R+"px",P.style.top=(-F.y*.5+.5)*k+"px"),A(),e.render(r,o)}}}function Tv(i){const t=Le.personality||{},e=t.dims||[],n=document.createElement("div");n.className="persona-host",i.appendChild(n);let s;try{s=new _o({antialias:!0,alpha:!0})}catch{const O=document.createElement("div");return O.className="persona-fallback",O.textContent="当前环境不支持 WebGL，人格星核暂不可用",i.appendChild(O),{frame(){}}}s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.appendChild(s.domElement);const r=i.clientWidth||window.innerWidth,o=i.clientHeight||window.innerHeight;s.setSize(r,o,!1);const a=new lr,l=new Xe(42,r/o,.1,500);l.position.set(0,0,96);const c=new _n;a.add(c);const h={drag:!1,sx:0,sy:0,tilt0:0,spin0:0,tTilt:.1,tilt:.1,tSpin:0,spin:0,started:0,mx:-2,my:-2,tipX:0,tipY:0,theme:""},p={dark:{glow:6992639,orbit:8373503,letA:"#b8f0ff",letB:"rgba(160,200,255,0.55)",bgA:"#0b1226",bgB:"#1a0f2e",bgC:"#03111c"},light:{glow:10273023,orbit:2845951,letA:"#1d4fc0",letB:"rgba(60,90,140,0.45)",bgA:"#e9f0fb",bgB:"#f0e9fb",bgC:"#e0f0ff"}};let m=p.dark;const g=30,u=[{tiltX:0,tiltY:0,speed:.3},{tiltX:Math.PI/2,tiltY:0,speed:-.22},{tiltX:0,tiltY:Math.PI/2,speed:.17},{tiltX:Math.PI/4,tiltY:Math.PI/4,speed:-.13}],_=X=>u[X]||u[u.length-1];function d(X,O,W=220){const H=document.createElement("canvas");H.width=H.height=W;const K=H.getContext("2d");return K.font=`800 ${W*.56}px -apple-system, 'Segoe UI', sans-serif`,K.textAlign="center",K.textBaseline="middle",K.shadowColor=O,K.shadowBlur=W*.12,K.fillStyle=O,K.fillText(X,W/2,W/2+W*.03),K.fillText(X,W/2,W/2+W*.03),new bn(H)}let f=null,S=null,M=null,y=null,B=null,D=null,P=null,z=null,et=null;const v=[],x=[];function I(X,O){const W=parseInt(X.replace("#",""),16);return`rgba(${W>>16&255}, ${W>>8&255}, ${W&255}, ${O})`}function C(X){const O=document.createElement("canvas");O.width=1024,O.height=1024;const W=O.getContext("2d"),H=X.bgA==="#e9f0fb",K=H?.12:.42,ct=H?.05:.18,mt=W.createRadialGradient(512,512,0,512,512,720);mt.addColorStop(0,I(X.bgA,0)),mt.addColorStop(.35,I(X.bgA,K)),mt.addColorStop(.65,I(X.bgB,ct)),mt.addColorStop(1,I(X.bgC,0)),W.fillStyle=mt,W.fillRect(0,0,1024,1024);for(let St=0;St<5;St++){const nt=120+Math.random()*784,N=120+Math.random()*784,lt=80+Math.random()*180,ut=W.createRadialGradient(nt,N,0,nt,N,lt),gt=St%2===0?X.bgB:X.bgC;ut.addColorStop(0,I(gt,H?.06:.16)),ut.addColorStop(1,I(gt,0)),W.fillStyle=ut,W.fillRect(0,0,1024,1024)}const ht=new bn(O);return ht.colorSpace=nn,ht}function E(){const O=new Float32Array(960),W=new Float32Array(320*3);for(let ct=0;ct<320;ct++){const mt=60+Math.random()*120,ht=Math.random()*Re,St=(Math.random()-.5)*1.2;O[ct*3]=Math.cos(ht)*mt*Math.cos(St),O[ct*3+1]=Math.sin(St)*mt,O[ct*3+2]=Math.sin(ht)*mt*Math.cos(St)-60,W[ct*3]=(Math.random()-.5)*.012,W[ct*3+1]=(Math.random()-.5)*.008,W[ct*3+2]=(Math.random()-.5)*.012}const H=new Se;H.setAttribute("position",new Je(O,3)),H.userData={vel:W,orig:O.slice()};const K=new ws({color:12903679,size:.55,transparent:!0,opacity:0,depthWrite:!1,blending:gn});return new js(H,K)}function A(){P=new Fi({map:C(m),transparent:!0,opacity:0,depthWrite:!1,blending:gn}),z=new ds(P),z.position.z=-180,z.scale.set(420,420,1),a.add(z),et=E(),a.add(et);const X=t.cutout||"./img/selfhosted/persona-cut.webp";f=new Tn({transparent:!0,opacity:0,depthWrite:!1}),new Kg().load(X,St=>{const nt=St.image;if(!nt||!nt.width)return;const N=document.createElement("canvas");N.width=nt.width,N.height=nt.height;const lt=N.getContext("2d");lt.filter="contrast(1.26) saturate(1.14) brightness(0.97)",lt.drawImage(nt,0,0);const ut=new bn(N);ut.colorSpace=nn,f.map=ut,f.needsUpdate=!0}),S=new Ee(new Hi(14.5,14.5*580/583),f),c.add(S);const O=document.createElement("canvas");O.width=O.height=256;const W=O.getContext("2d"),H=W.createRadialGradient(128,128,0,128,128,128);H.addColorStop(0,"rgba(150,190,255,0.55)"),H.addColorStop(1,"rgba(150,190,255,0)"),W.fillStyle=H,W.fillRect(0,0,256,256),M=new Fi({map:new bn(O),color:m.glow,transparent:!0,opacity:0,depthWrite:!1,blending:gn});const K=new ds(M);K.position.z=-3,K.scale.set(48,48,1),c.add(K);const ct=document.createElement("canvas");ct.width=ct.height=256;const mt=ct.getContext("2d"),ht=mt.createRadialGradient(128,128,20,128,128,126);ht.addColorStop(0,"rgba(255,255,255,0.9)"),ht.addColorStop(.55,"rgba(255,255,255,0.34)"),ht.addColorStop(1,"rgba(255,255,255,0)"),mt.fillStyle=ht,mt.fillRect(0,0,256,256),B=new Fi({map:new bn(ct),color:0,transparent:!0,opacity:0,depthWrite:!1}),D=new ds(B),D.position.z=-2,D.scale.set(40,40,1),c.add(D),e.forEach((St,nt)=>{const N=_(nt),lt=new _n;lt.rotation.x=N.tiltX,lt.rotation.y=N.tiltY,c.add(lt);const ut=[],gt=g;for(let _t=0;_t<=120;_t++){const U=_t/120*Re;ut.push(new q(g*Math.cos(U),0,gt*Math.sin(U)))}const At=new xo({color:m.orbit,transparent:!0,opacity:0});v.push(At),lt.add(new wl(new Se().setFromPoints(ut),At));const Ot=(_t,U)=>{const b=new Fi({map:d(_t,U?m.letA:m.letB),transparent:!0,opacity:0,depthWrite:!1}),j=new ds(b);j.scale.setScalar(U?4.6:3.6),j.userData={dim:St,isA:U,orbit:nt,phase:U?0:Math.PI},lt.add(j),x.push(j)};Ot(St.a,!0),Ot(St.b,!1)}),y=document.createElement("div"),y.className="persona-tip",y.innerHTML="<b></b><span></span><em></em>",i.appendChild(y)}const w=s.domElement;w.addEventListener("pointerdown",X=>{if(!(X.pointerType!=="mouse"||X.button!==0)){h.drag=!0,h.sx=X.clientX,h.sy=X.clientY,h.tilt0=h.tTilt,h.spin0=h.tSpin;try{w.setPointerCapture(X.pointerId)}catch{}}}),w.addEventListener("pointermove",X=>{const O=i.getBoundingClientRect();h.mx=(X.clientX-O.left)/O.width*2-1,h.my=-((X.clientY-O.top)/O.height*2-1),h.tipX=X.clientX-O.left,h.tipY=X.clientY-O.top,h.drag&&(h.tSpin=h.spin0-(X.clientX-h.sx)*.005,h.tTilt=Math.max(-.7,Math.min(.7,h.tilt0+(X.clientY-h.sy)*.004)))}),w.addEventListener("pointerup",X=>{h.drag=!1;try{w.releasePointerCapture(X.pointerId)}catch{}}),w.addEventListener("pointerleave",()=>{h.drag=!1,h.mx=-2,h.my=-2});function F(){const X=document.documentElement.getAttribute("data-theme")||"dark";if(X!==h.theme){h.theme=X,m=p[X]||p.dark;for(const O of v)O.color.setHex(m.orbit);for(const O of x){const W=O.userData.isA;O.material.map=d(W?O.userData.dim.a:O.userData.dim.b,W?m.letA:m.letB),O.material.needsUpdate=!0}M&&M.color.setHex(m.glow),P&&(P.map=C(m),P.needsUpdate=!0)}}const T=new Eo,R=new Et;let k=null;function G(){if(!y)return;if(h.drag||h.mx<-1.5){y.classList.remove("show"),k=null;return}T.setFromCamera(R.set(h.mx,h.my),l);const X=T.intersectObjects(x,!1)[0],O=X?X.object:null;if(O!==k)if(k=O,O){const W=O.userData.dim,H=W.anti.split("：");y.querySelector("b").textContent=O.userData.isA?W.name:H[0],y.querySelector("span").textContent=O.userData.isA?W.desc:H[1]||"",y.querySelector("em").textContent=O.userData.isA?`对立端 → ${W.anti}`:"你的 INFJ 选择了另一端",y.classList.add("show")}else y.classList.remove("show");O&&(y.style.left=h.tipX+"px",y.style.top=h.tipY+"px")}A();const st=X=>1-Math.pow(1-X,3);return{resize(X,O){s.setSize(X,O,!1),l.aspect=X/O,l.updateProjectionMatrix()},frame(X,O,W,H){F(),h.started||(h.started=H);const K=H-h.started,ct=Te?1:st(Math.min(1,K/2e3)),mt=h.theme==="light"?.22:.9;P&&(P.opacity=mt*ct),et&&(et.material.opacity=.55*ct),f.opacity=ct,S.scale.setScalar(.72+.28*ct);for(const ht of v)ht.opacity=.55*ct;if(x.forEach((ht,St)=>{const nt=Te?1:st(Math.max(0,Math.min(1,(K-500-St*110)/600)));ht.material.opacity=(ht.userData.isA?1:.5)*nt}),M.opacity=.75*ct,B&&(B.opacity=(h.theme==="light"?.34:.22)*ct,D&&(D.position.y=S.position.y)),z&&(z.rotation.z=H*2e-4),et){const ht=et.geometry.attributes.position.array,St=et.geometry.userData.vel,nt=et.geometry.userData.orig;for(let N=0;N<320;N++){const lt=N*3;ht[lt]+=St[lt],ht[lt+1]+=St[lt+1],ht[lt+2]+=St[lt+2];const ut=ht[lt]-nt[lt],gt=ht[lt+1]-nt[lt+1],At=ht[lt+2]-nt[lt+2];ut*ut+gt*gt+At*At>900&&(ht[lt]=nt[lt],ht[lt+1]=nt[lt+1],ht[lt+2]=nt[lt+2])}et.geometry.attributes.position.needsUpdate=!0}S.position.y=Te?0:Math.sin(H*.0011)*.7,Te||(S.rotation.y=h.mx>-1.5?h.mx*.16:0,S.rotation.x=h.mx>-1.5?-h.my*.08:0),x.forEach(ht=>{const St=_(ht.userData.orbit),nt=(Te?0:H*.001*St.speed)+ht.userData.phase;ht.position.set(g*Math.cos(nt),0,g*Math.sin(nt))}),h.spin=Ue(h.spin,h.tSpin,.07),h.tilt=Ue(h.tilt,h.tTilt,.07),c.rotation.y=h.spin,c.rotation.x=h.tilt,G(),s.render(a,l)}}}function Av(){let i=[],t=0;return{frame(e,n,s,r){e.clearRect(0,0,n,s);const o=Cs(),a=n/2,l=s*.62;r-t>760&&(t=r,i.push({r:0,a:.5}));for(const c of i)c.r+=2.4,c.a-=.006;i=i.filter(c=>c.a>0);for(const c of i)e.beginPath(),e.arc(a,l,c.r,0,Re),e.fillStyle=`rgba(${o.b},${Math.max(0,c.a)*.12})`,e.fill()}}}function Cv(i){const t=Le.game||{},e=t.feeds&&t.feeds.length?t.feeds:[],n=t.briefs&&t.briefs.length?t.briefs:[],s=t.stats&&t.stats.length?t.stats:[],r=i.querySelector("#cr-monitor"),o=i.querySelector("#cr-brief"),a=i.querySelector("#cr-stats");if(!r||e.length===0)return{frame(){}};r.textContent="";const l=e.map((F,T)=>{const R=document.createElement("div");R.className="cr-feed",R.dataset.cam=F.cam||"CAM-0"+(T+1);const k=document.createElement("img");return k.src=F.src,k.alt="铁锈战争实机画面 · "+(F.cam||"镜头 "+(T+1)),k.loading=T===0?"eager":"lazy",k.decoding="async",F.w&&F.h&&(k.width=F.w,k.height=F.h),R.appendChild(k),r.appendChild(R),R});["cr-lines","cr-sweep","cr-vignette"].forEach(F=>{const T=document.createElement("div");T.className=F,r.appendChild(T)});const h=document.createElement("div");h.className="cr-hud",h.innerHTML='<i class="cr-corner tl"></i><i class="cr-corner tr"></i><i class="cr-corner bl"></i><i class="cr-corner br"></i><div class="cr-rec"><i></i><span class="cr-reclabel">REC</span></div><div class="cr-camtag">SIGNAL ▮▮▮▯</div><div class="cr-coords"></div><div class="cr-timecode">00:00:00:00</div><div class="cr-cambar"></div>',r.appendChild(h);const p=h.querySelector(".cr-reclabel"),m=h.querySelector(".cr-coords"),g=h.querySelector(".cr-timecode"),u=h.querySelector(".cr-cambar");t.coords&&(m.textContent=t.coords),a&&(a.textContent="",s.forEach(F=>{const T=document.createElement("li"),R=document.createElement("span");R.textContent=F.k+" ";const k=document.createElement("b");k.textContent=F.v,T.appendChild(R),T.appendChild(k),a.appendChild(T)}));const _=7e3,d=1900;let f=0,S=0,M=0,y=0,B=0,D=0,P=!1,z=0,et=!1,v=0;const x=[];let I=0;const C=e.map((F,T)=>{const R=document.createElement("button");return R.type="button",R.title=F.cam||"镜头 "+(T+1),R.setAttribute("aria-label","切换到"+(F.cam||"镜头 "+(T+1))),R.addEventListener("click",()=>{A(T),S=0}),u.appendChild(R),R});let E=0;function A(F){f=F,l.forEach((T,R)=>T.classList.toggle("is-on",R===F)),C.forEach((T,R)=>T.classList.toggle("is-on",R===F)),p&&(p.textContent="REC · "+String(e[F].cam||"").slice(0,6)),r.classList.remove("cr-glitch"),r.offsetWidth,r.classList.add("cr-glitch"),E=I+340}function w(){const F=r.clientWidth||0,T=r.clientHeight||0;if(F<120||T<120)return;const R=74,k=56,G=document.createElement("div");G.className="cr-lock",G.innerHTML="<i></i><b>TARGET · "+(1e3+Math.floor(Math.random()*9e3))+"</b>",G.style.left=Math.round(Math.random()*Math.max(0,F-R-24)+12)+"px",G.style.top=Math.round(Math.random()*Math.max(0,T-k-24)+12)+"px",r.appendChild(G),x.push({el:G,die:I+d})}return A(0),p&&(p.textContent="REC · "+String(e[0].cam||"").slice(0,6)),r.addEventListener("pointerenter",()=>{et=!0}),r.addEventListener("pointerleave",()=>{et=!1}),Te?(o&&n.length&&(o.textContent=n[0]),{frame(){}}):{frame(F,T,R,k){v||(v=k);let G=k-v;if(v=k,G>100&&(G=16),!(G<=0)){I+=G,E&&I>=E&&(r.classList.remove("cr-glitch"),E=0),l.length>1&&(et||(S+=G),S>=_&&(S=0,A((f+1)%l.length))),M+=G,M>=(et?1400:2600+Math.random()*1400)&&(M=0,w());for(let st=x.length-1;st>=0;st--)I>=x[st].die&&(x[st].el.remove(),x.splice(st,1));if(z+=G/40,g){const st=Math.floor(z)%25,X=Math.floor(z/25)%60,O=Math.floor(z/(25*60))%60,W=Math.floor(z/(25*3600));g.textContent=[W,O,X,st].map(H=>String(H).padStart(2,"0")).join(":")}if(o&&n.length){y+=G;const st=n[B],X=P?14:52;for(;y>=X;)if(y-=X,P)D--,D<=0&&(D=0,P=!1,B=(B+1)%n.length);else if(D++,D>st.length){D=st.length,P=!0,y=-2600;break}o.textContent=st.slice(0,D)}}}}}function Rv(i){const t=Le.like,e=t&&t.planets||[],n=7,s=12e3,r=A=>Math.pow(A,.55)*n;let o,a,l,c,h,p,m=[],g=[],u,_=null;const d={mouseX:0,mouseY:0,tMouseX:0,tMouseY:0,cam:{r:120,theta:0,phi:1.22,tR:120,tTheta:0,tPhi:1.22,dragging:!1,dragStartX:0,dragStartY:0,startTheta:0,startPhi:0},w:i.clientWidth||window.innerWidth,h:i.clientHeight||window.innerHeight,start:performance.now(),hovered:-1};function f(){const A=document.createElement("canvas");A.width=A.height=128;const w=A.getContext("2d"),F=w.createRadialGradient(64,64,0,64,64,64);return F.addColorStop(0,"rgba(255,255,255,0.95)"),F.addColorStop(.4,"rgba(255,255,255,0.35)"),F.addColorStop(1,"rgba(255,255,255,0)"),w.fillStyle=F,w.fillRect(0,0,128,128),new bn(A)}function S(){const A=document.createElement("canvas");A.width=256,A.height=1;const w=A.getContext("2d"),F=w.createLinearGradient(0,0,256,0);return F.addColorStop(0,"rgba(255,255,255,0)"),F.addColorStop(.18,"rgba(255,255,255,0.9)"),F.addColorStop(.82,"rgba(255,255,255,0.9)"),F.addColorStop(1,"rgba(255,255,255,0)"),w.fillStyle=F,w.fillRect(0,0,256,1),new bn(A)}function M(A){const F=document.createElement("canvas");F.width=F.height=256;const T=F.getContext("2d");T.fillStyle=A.color,T.fillRect(0,0,256,256);const R=new ee(A.color),k=W=>"#"+W.getHexString(),G=W=>R.clone().offsetHSL(0,0,W),st=W=>R.clone().offsetHSL(0,0,-W),X=(W,H)=>W+Math.random()*(H-W);function O(W,H,K,ct,mt){const ht=T.createRadialGradient(W,H,0,W,H,K),St=new ee(ct);ht.addColorStop(0,`rgba(${St.r*255|0},${St.g*255|0},${St.b*255|0},${mt})`),ht.addColorStop(1,`rgba(${St.r*255|0},${St.g*255|0},${St.b*255|0},0)`),T.fillStyle=ht,T.beginPath(),T.arc(W,H,K,0,Re),T.fill()}switch(A.key){case"mercury":for(let H=0;H<45;H++)O(X(0,256),X(0,256),X(5,24),k(st(.22)),X(.2,.55));break;case"venus":for(let H=0;H<10;H++)O(X(0,256),X(0,256),X(45,100),k(G(.12)),.28);for(let H=0;H<6;H++)O(X(0,256),X(0,256),X(30,70),k(st(.1)),.18);break;case"earth":for(let H=0;H<14;H++)O(X(0,256),X(0,256),X(28,72),"#5c9a5c",.42);for(let H=0;H<10;H++)O(X(0,256),X(0,256),X(18,42),"#9a7c5a",.32);for(let H=0;H<6;H++)T.fillStyle="rgba(255,255,255,0.20)",T.fillRect(0,X(20,236),256,X(4,12));T.fillStyle="rgba(255,255,255,0.7)",T.beginPath(),T.arc(256/2,0,26,0,Re),T.fill(),T.beginPath(),T.arc(256/2,256,32,0,Re),T.fill();break;case"mars":for(let H=0;H<22;H++)O(X(0,256),X(0,256),X(12,48),k(st(.25)),.38);for(let H=0;H<12;H++)O(X(0,256),X(0,256),X(10,28),k(G(.18)),.22);break;case"jupiter":case"saturn":const W=A.key==="jupiter"?12:9;for(let H=0;H<W;H++){const K=(H+.5)*256/W,ct=H%2===0;T.fillStyle=`rgba(${ct?120:230},${ct?95:205},${ct?70:160},${ct?.5:.28})`,T.fillRect(0,K-256/W/2-2,256,256/W+4)}A.key==="jupiter"&&(T.fillStyle="rgba(190, 80, 60, 0.65)",T.beginPath(),T.ellipse(256*.35,256*.58,22,12,0,0,Re),T.fill());break;case"uranus":case"neptune":for(let H=0;H<7;H++)T.fillStyle="rgba(255,255,255,0.13)",T.fillRect(0,X(20,236),256,X(6,18));break}return new bn(F)}function y(A,w,F){return new q(A*Math.sin(F)*Math.sin(w),A*Math.cos(F),A*Math.sin(F)*Math.cos(w))}function B(){const A=document.createElement("canvas");A.className="solar-canvas",i.appendChild(A);try{o=new _o({canvas:A,antialias:!0,alpha:!0})}catch{const W=document.createElement("div");return W.className="solar-fallback",W.textContent="当前环境不支持 WebGL，关注宇宙暂不可用",i.appendChild(W),!1}o.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),a=new lr,l=new Xe(55,d.w/d.h,.1,4e3),l.position.copy(y(d.cam.r,d.cam.theta,d.cam.phi)),l.lookAt(0,0,0),a.add(new jg(4213350,1.7)),a.add(new nu(16777215,1712176,.7)),a.add(new su(16773836,3.2,0,0));const w=f();p=new Ee(new nr(3.6,64,64),new Tn({color:16765562})),a.add(p);for(let O=0;O<3;O++){const W=new ds(new Fi({map:w,color:16765562,transparent:!0,opacity:.22-O*.05,blending:gn,depthWrite:!1}));W.scale.set(14+O*9,14+O*9,1),p.add(W)}m=[];const F=S();e.forEach((O,W)=>{const H=new Ee(new nr(O.size,40,40),new Wn({map:M(O),color:16777215,emissive:new ee(O.color),emissiveIntensity:.1,roughness:.8,metalness:.05}));H.userData={idx:W,a:O.a,e:O.e,inc:O.inc*Math.PI/180,node:W*47*Math.PI/180,baseAngle:W*1.7},a.add(H),m.push(H);const K=new ds(new Fi({map:w,color:new ee(O.color),transparent:!0,opacity:.22,blending:gn,depthWrite:!1}));if(K.scale.set(O.size*2.6,O.size*2.6,1),H.add(K),O.key==="saturn"){const nt=new Ee(new bo(O.size*1.35,O.size*2.45,96),new Tn({color:15258528,alphaMap:F,transparent:!0,opacity:.88,side:rn,depthWrite:!1}));nt.rotation.x=Math.PI/2-.38,H.add(nt)}const ct=[],mt=180,ht=r(O.a);for(let nt=0;nt<=mt;nt++){const N=nt/mt*Re,lt=ht*(1-O.e*O.e)/(1+O.e*Math.cos(N));let ut=lt*Math.cos(N),gt=lt*Math.sin(N);const At=Math.cos(H.userData.inc),Ot=Math.sin(H.userData.inc),_t=-gt*Ot,U=gt*At,b=Math.cos(H.userData.node),j=Math.sin(H.userData.node);ct.push(new q(ut*b+U*j,_t,-ut*j+U*b))}const St=new Se().setFromPoints(ct);a.add(new ug(St,new xo({color:new ee(O.color),transparent:!0,opacity:.28})))});const T=900,R=new Float32Array(T*3),k=r(2),G=r(3.4),st=2.4;for(let O=0;O<T;O++){const W=Math.random()*Re,H=k+Math.random()*(G-k),K=(Math.random()-.5)*st;R[O*3]=H*Math.cos(W),R[O*3+1]=K,R[O*3+2]=H*Math.sin(W)}const X=new Se;X.setAttribute("position",new Je(R,3)),u=new js(X,new ws({color:10135480,size:1.2,sizeAttenuation:!1,transparent:!0,opacity:.55})),a.add(u),g=[];for(let O=0;O<3;O++){const H=new Float32Array(2100),K=400+O*220;for(let ht=0;ht<700;ht++){const St=Math.random()*Re,nt=Math.acos(2*Math.random()-1),N=K*(.7+Math.random()*.3);H[ht*3]=N*Math.sin(nt)*Math.cos(St),H[ht*3+1]=N*Math.sin(nt)*Math.sin(St),H[ht*3+2]=N*Math.cos(nt)}const ct=new Se;ct.setAttribute("position",new Je(H,3));const mt=new js(ct,new ws({color:O===0?15266047:12571903,size:1.3+O*.5,sizeAttenuation:!1,transparent:!0,opacity:.45+O*.16}));a.add(mt),g.push(mt)}return _=document.createElement("div"),_.className="solar-label",_.setAttribute("role","status"),_.setAttribute("aria-live","polite"),i.appendChild(_),c=new Eo,h=new Et(-2,-2),A.addEventListener("pointerdown",D),A.addEventListener("pointermove",P),A.addEventListener("pointerup",z),A.addEventListener("pointerleave",et),window.addEventListener("scroll",v,{passive:!0}),v(),!0}function D(A){if(!(A.pointerType!=="mouse"||A.button!==0)){A.preventDefault(),d.cam.dragging=!0,d.cam.dragStartX=A.clientX,d.cam.dragStartY=A.clientY,d.cam.startTheta=d.cam.tTheta,d.cam.startPhi=d.cam.tPhi;try{A.target.setPointerCapture(A.pointerId)}catch{}}}function P(A){const w=i.getBoundingClientRect();if(d.tMouseX=(A.clientX-w.left)/w.width*2-1,d.tMouseY=(A.clientY-w.top)/w.height*2-1,h.x=d.tMouseX,h.y=-d.tMouseY,d.cam.dragging){const F=A.clientX-d.cam.dragStartX,T=A.clientY-d.cam.dragStartY;d.cam.tTheta=d.cam.startTheta-F*.004,d.cam.tPhi=d.cam.startPhi-T*.004}}function z(A){if(d.cam.dragging){d.cam.dragging=!1;try{A.target.releasePointerCapture(A.pointerId)}catch{}}}function et(){d.tMouseX=0,d.tMouseY=0,h.x=-2,h.y=-2,d.cam.dragging=!1}function v(){const A=i.getBoundingClientRect(),w=A.top+A.height/2,F=window.innerHeight/2,T=Math.max(0,Math.min(1,1-Math.abs(w-F)/(window.innerHeight*.9)));d.cam.tR=150-T*55}function x(){if(!c||!_)return;c.setFromCamera(h,l);const A=c.intersectObjects(m,!1),w=A.length?A[0].object.userData.idx:-1;if(w!==d.hovered)if(d.hovered=w,w>=0){const F=e[w];_.innerHTML=`<b style="color:${F.color}">${F.interest||F.name}</b><span>${F.desc||""}</span>`,_.classList.add("show")}else _.classList.remove("show");if(w>=0){const F=m[w].position.clone().project(l);_.style.left=(F.x*.5+.5)*d.w+"px",_.style.top=(-F.y*.5+.5)*d.h+"px"}}function I(A,w,F,T){if(!o)return;const R=(T-d.start)/s;d.mouseX=Ue(d.mouseX,d.tMouseX,.06),d.mouseY=Ue(d.mouseY,d.tMouseY,.06),d.cam.r=Ue(d.cam.r,d.cam.tR,.06),d.cam.theta=Ue(d.cam.theta,d.cam.tTheta,.08),d.cam.phi=Ue(d.cam.phi,d.cam.tPhi,.08),!d.cam.dragging&&!Te&&(d.cam.tTheta+=2e-4),l.position.copy(y(d.cam.r,d.cam.theta,d.cam.phi)),l.lookAt(d.mouseX*3,d.mouseY*3,0);for(const k of m){const G=k.userData,st=e[G.idx].T,X=(Te?0:R)/st,O=G.baseAngle+X*Re;let W=O;for(let gt=0;gt<5;gt++)W=W-(W-G.e*Math.sin(W)-O)/(1-G.e*Math.cos(W));const H=2*Math.atan2(Math.sqrt(1+G.e)*Math.sin(W/2),Math.sqrt(1-G.e)*Math.cos(W/2)),K=r(G.a)*(1-G.e*Math.cos(W)),ct=K*Math.cos(H),mt=K*Math.sin(H),ht=Math.cos(G.inc),St=Math.sin(G.inc),nt=-mt*St,N=mt*ht,lt=Math.cos(G.node),ut=Math.sin(G.node);k.position.set(ct*lt+N*ut,nt,-ct*ut+N*lt),k.rotation.y+=.0012}p.rotation.y+=8e-4,u&&(u.rotation.y+=15e-5);for(let k=0;k<g.length;k++)g[k].rotation.y+=1e-4*(k+1),g[k].rotation.x=d.mouseY*.05*(k+1);x(),o.render(a,l)}function C(A,w){d.w=A||i.clientWidth||window.innerWidth,d.h=w||i.clientHeight||window.innerHeight,o&&(o.setSize(d.w,d.h,!1),l.aspect=d.w/d.h,l.updateProjectionMatrix())}return B()?(C(d.w,d.h),{frame:I,resize:C}):{frame(){},resize(){}}}function Pv(i){const t=Le.thanks||{},e=Le.rewards&&Le.rewards.length?Le.rewards:[],n=i.querySelector("#th-charge"),s=i.querySelector("#th-wall"),r=i.querySelector("#th-tip"),o=i.querySelector("#th-overlay"),a=i.querySelector("#th-sheet"),l=i.querySelector("#th-qr"),c=i.querySelector("#th-seg"),h=i.querySelector("#th-seg-thumb"),p=i.querySelector("#th-qr-scan"),m=i.querySelector("#th-copy"),g=i.querySelector("#th-close");if(s&&(s.textContent="",e.forEach(R=>{const k=document.createElement("li"),G=document.createElement("b");G.textContent=R.name;const st=document.createElement("span");st.textContent=` 投喂了 ${R.amount} 元 · ${R.date}`,k.appendChild(G),k.appendChild(st),s.appendChild(k)})),!n||!o||!l)return{frame(){},resize(){}};const u=[],_=[],d=[];let f=-1,S={x:-9999,y:-9999},M={x:-9999,y:-9999},y=0,B=!1,D=0;const P={wx:null,ali:null};["wx","ali"].forEach(R=>{const k=t.qr&&t.qr[R]&&t.qr[R].matrix;k&&k.bits&&(P[R]=k)});let z="wx";function et(R,k){const G="http://www.w3.org/2000/svg",st=document.createElementNS(G,"svg");st.setAttribute("viewBox",`0 0 ${R} ${R}`),st.setAttribute("shape-rendering","geometricPrecision"),st.setAttribute("aria-hidden","true");const X=document.createElementNS(G,"defs"),O=document.createElementNS(G,"radialGradient");O.setAttribute("id","thQrGrad"),O.setAttribute("cx","50%"),O.setAttribute("cy","50%"),O.setAttribute("r","72%"),[["0%","#2b6cff"],["60%","#6a5bff"],["100%","#c06bff"]].forEach(([N,lt])=>{const ut=document.createElementNS(G,"stop");ut.setAttribute("offset",N),ut.setAttribute("stop-color",lt),O.appendChild(ut)}),X.appendChild(O),st.appendChild(X);const W=(R-1)/2,H=Math.hypot(W,W),K=document.createDocumentFragment();for(let N=0;N<R;N++)for(let lt=0;lt<R;lt++){if(k.charAt(N*R+lt)!=="1")continue;const ut=document.createElementNS(G,"rect");ut.setAttribute("x",lt),ut.setAttribute("y",N),ut.setAttribute("width",1),ut.setAttribute("height",1),ut.setAttribute("rx",.32),ut.setAttribute("fill","url(#thQrGrad)"),ut.setAttribute("class","th-qr-mod"),ut.style.setProperty("--d",Math.round(Math.hypot(lt-W,N-W)/H*460)+"ms"),ut.style.setProperty("--d2",Math.round(lt/R*260+Math.random()*60)+"ms"),K.appendChild(ut)}st.appendChild(K);const ct=R*.2,mt=document.createElementNS(G,"circle");mt.setAttribute("cx",R/2),mt.setAttribute("cy",R/2),mt.setAttribute("r",ct/2+.7),mt.setAttribute("fill","#fff"),st.appendChild(mt);const ht=document.createElementNS(G,"clipPath");ht.setAttribute("id","thQrClip");const St=document.createElementNS(G,"circle");St.setAttribute("cx",R/2),St.setAttribute("cy",R/2),St.setAttribute("r",ct/2),ht.appendChild(St),st.appendChild(ht);const nt=document.createElementNS(G,"image");return nt.setAttribute("x",(R-ct)/2),nt.setAttribute("y",(R-ct)/2),nt.setAttribute("width",ct),nt.setAttribute("height",ct),nt.setAttribute("href","./img/selfhosted/pZRXSc6.jpg"),nt.setAttribute("clip-path","url(#thQrClip)"),nt.setAttribute("preserveAspectRatio","xMidYMid slice"),st.appendChild(nt),st}function v(R){if(!l)return;const k=t.qr&&t.qr[R]||{},G=l.querySelector("svg, img");G&&G.remove();const st=P[R];if(st&&!Te)l.appendChild(et(st.n,st.bits));else if(k.png){const X=document.createElement("img");X.className="th-qr-img",X.src=k.png,X.alt=(k.label||"收款")+"收款码",X.width=1034,X.height=1034,X.loading="lazy",X.decoding="async",l.appendChild(X)}}function x(R,k){z=R;const G=t.qr&&t.qr[R]||{};c&&Array.from(c.querySelectorAll("button")).forEach(X=>X.classList.toggle("on",X.dataset.pay===R)),h&&(h.className="th-seg-thumb "+R);const st=G.color||"#07c160";if(p&&p.style.setProperty("--scan",st),l&&l.querySelectorAll(".qbk").forEach(X=>X.style.setProperty("--scan",st)),m&&(m.style.display=G.copyable?"":"none",m.classList.remove("done"),m.textContent="复制链接"),!k||Te){v(R),l&&l.classList.add("is-in");return}l&&(l.classList.remove("is-in"),l.classList.add("is-out"),setTimeout(()=>{l.classList.remove("is-out"),v(R),requestAnimationFrame(()=>l.classList.add("is-in"))},380))}["wx","ali"].forEach(R=>{const k=t.qr&&t.qr[R]&&t.qr[R].matrix;if(k){if(k.bits){P[R]=k,R===z&&!B&&v(R);return}typeof k=="string"&&fetch(k).then(G=>G.ok?G.json():null).then(G=>{!G||!G.bits||(P[R]=G,R===z&&!B&&v(R))}).catch(()=>{})}}),x("wx",!1);let I=null;function C(){B||(B=!0,I=document.activeElement,o.classList.add("open"),i.classList.add("sheet-open"),l&&l.classList.remove("is-in"),setTimeout(()=>{v(z),requestAnimationFrame(()=>l&&l.classList.add("is-in"))},460),g&&g.focus())}function E(){B&&(B=!1,l&&l.classList.add("is-out"),o.classList.remove("open"),i.classList.remove("sheet-open"),a&&(a.style.transform=""),I&&I.focus&&I.focus(),setTimeout(()=>{l&&l.classList.remove("is-out","is-in")},400))}n.addEventListener("click",()=>{Te||w(n),n.classList.add("pulsing"),setTimeout(()=>n.classList.remove("pulsing"),440),C()}),g&&g.addEventListener("click",E),o.addEventListener("click",R=>{R.target===o&&E()});const A=R=>{R.key==="Escape"&&E()};document.addEventListener("keydown",A),c&&c.addEventListener("click",R=>{const k=R.target.closest("button[data-pay]");k&&k.dataset.pay!==z&&x(k.dataset.pay,!0)}),m&&m.addEventListener("click",()=>{const R=P[z];if(!R||!navigator.clipboard){m.textContent="复制失败";return}navigator.clipboard.writeText(R.payload).then(()=>{m.classList.add("done"),m.textContent="已复制"}).catch(()=>{m.textContent="复制失败"})}),a&&!Te&&(a.addEventListener("pointermove",R=>{const k=a.getBoundingClientRect(),G=(R.clientX-(k.left+k.width/2))/k.width,st=(R.clientY-(k.top+k.height/2))/k.height;a.style.transform=`perspective(900px) rotateY(${G*5}deg) rotateX(${-st*5}deg)`}),a.addEventListener("pointerleave",()=>{a.style.transform=""}));function w(R){const k=R.getBoundingClientRect(),G=document.createElement("span");G.className="th-ripple",G.style.left=k.left+k.width*.5-55+"px",G.style.top=k.top+k.height*.5-55+"px",document.body.appendChild(G),setTimeout(()=>G.remove(),880)}addEventListener("pointermove",R=>{M.x=R.clientX,M.y=R.clientY},{passive:!0}),addEventListener("pointerleave",()=>{M.x=M.y=-9999},{passive:!0});function F(R,k){u.length=0;const G=.6180339887,st=.7548776662;e.forEach((X,O)=>{const W=R*(.36+.58*((O*G+.13)%1)),H=k*(.12+.54*((O*st+.07)%1));u.push({x:W,y:H,vx:0,vy:0,ax:W,ay:H,tw:_e(0,Re)})})}function T(R,k,G,st){u.length!==e.length&&F(k,G),R.clearRect(0,0,k,G);const X=Cs(),O=i.getBoundingClientRect();S.x=M.x-O.left,S.y=M.y-O.top,f=-1;for(let H=0;H<u.length;H++){const K=u[H];if(!B){const ct=S.x-K.x,mt=S.y-K.y,ht=Math.hypot(ct,mt);if(ht<230&&ht>.5){const St=(1-ht/230)*.55;K.vx+=-mt/ht*St*.34+ct/ht*St*.1,K.vy+=ct/ht*St*.34+mt/ht*St*.1}}K.vx+=(K.ax-K.x)*.006,K.vy+=(K.ay-K.y)*.006,K.vx*=.93,K.vy*=.93,K.x+=K.vx,K.y+=K.vy,Math.hypot(S.x-K.x,S.y-K.y)<28&&(f=H)}if(f>=0&&r){const H=e[f];if(r.dataset.i!==String(f)){r.dataset.i=String(f),r.textContent="";const K=document.createElement("b");K.textContent=H.name,r.appendChild(K),r.appendChild(document.createTextNode(` 投喂了 ${H.amount} 元 · ${H.date}`))}r.style.left=Math.min(S.x+16,k-230)+"px",r.style.top=S.y-42+"px",r.classList.add("show"),!Te&&_.length===0&&D<=0&&Math.random()<.06&&(_.push({t:0}),D=1200)}else r&&(r.classList.remove("show"),r.dataset.i="");D=Math.max(0,D-16);for(let H=0;H<u.length-1;H++){const K=u[H],ct=u[H+1],mt=Math.max(0,1-Math.hypot(S.x-(K.x+ct.x)/2,S.y-(K.y+ct.y)/2)/300);R.beginPath(),R.moveTo(K.x,K.y),R.lineTo(ct.x,ct.y),R.strokeStyle=`rgba(${X.a},${(.12+mt*.4)*(B?.35:1)})`,R.lineWidth=1,R.stroke()}let W={x:k*.5,y:G*.86};if(n){const H=fo(i,n);W={x:H.x,y:H.y}}for(let H=_.length-1;H>=0;H--){const K=_[H];if(K.t+=.012,K.t>=1){_.splice(H,1),n.classList.add("pulsing"),setTimeout(()=>n.classList.remove("pulsing"),440);continue}const ct=u.concat([W]),mt=ct.length-1;if(mt<1)continue;const ht=K.t*mt,St=Math.min(mt-1,Math.floor(ht)),nt=ht-St,N=ct[St],lt=ct[St+1];!N||!lt||(R.beginPath(),R.arc(N.x+(lt.x-N.x)*nt,N.y+(lt.y-N.y)*nt,3.2,0,Re),R.fillStyle=`rgba(255,209,102,${B?.3:.9})`,R.shadowBlur=14,R.shadowColor="rgba(255,209,102,0.9)",R.fill(),R.shadowBlur=0)}for(let H=0;H<u.length;H++){const K=u[H],ct=.72+.28*Math.sin(st/720+K.tw),mt=f===H?7:4.6,ht=R.createRadialGradient(K.x,K.y,0,K.x,K.y,mt*5);ht.addColorStop(0,`rgba(255,209,102,${.5*ct*(B?.35:1)})`),ht.addColorStop(1,"rgba(255,209,102,0)"),R.fillStyle=ht,R.beginPath(),R.arc(K.x,K.y,mt*5,0,Re),R.fill(),R.beginPath(),R.arc(K.x,K.y,mt,0,Re),R.fillStyle=`rgba(255,228,168,${(f===H?1:.9)*(B?.4:1)})`,R.fill()}!Te&&!B&&st-y>210&&(y=st,d.push({x:_e(k*.2,k*.85),y:G*.88,vy:_e(.35,1),vx:_e(-.25,.25),a:_e(.5,1),s:_e(1.4,3.2)}));for(const H of d)H.y-=H.vy,H.x+=H.vx,H.a-=.0035;for(let H=d.length-1;H>=0;H--)d[H].a<=0&&d.splice(H,1);for(const H of d)R.beginPath(),R.arc(H.x,H.y,H.s,0,Re),R.fillStyle=`rgba(${X.a},${H.a*.8*(B?.3:1)})`,R.fill()}return{frame:T,resize:F}}function Lv(i){const t=i.querySelector(".home-cta");let e=[];function n(s,r){e=Array.from({length:90},()=>({x:_e(0,s),y:_e(0,r),a:_e(.3,.9)}))}return{resize:n,frame(s,r,o,a){s.clearRect(0,0,r,o);const l=Cs(),c=t?fo(i,t).x:r/2,h=t?fo(i,t).y:o/2;for(const p of e)p.x=Ue(p.x,c,.012),p.y=Ue(p.y,h,.012),s.beginPath(),s.arc(p.x,p.y,1.6,0,Re),s.fillStyle=`rgba(${l.a},${p.a})`,s.fill()}}}function Dv(i){const t=i.querySelector("#comic-grid");if(!t)return{frame(){},resize(){}};const e=Array.from(t.querySelectorAll(".comic-card"));if(e.length<2)return{frame(){},resize(){}};const n=e.slice(0,36);e.slice(36).forEach(E=>{E.style.display="none"}),t.classList.add("is-album");const s=n.length,o=(E=>{let A=E>>>0;return()=>(A=A*1664525+1013904223>>>0,A/4294967296)})(1234567),a=[];for(let E=0;E<s;E++){let A=0,w,F,T,R;for(;A<160;){w=o()*2-1,F=o()*2-1,T=o()*2-1,R=(T+1)/2;const k=(1-E/(s-1||1))*.22;let G;E<s*.18?G=.72+o()*.28:E<s*.6?G=.3+o()*.52:G=o()*.36,R=Math.max(0,Math.min(1,G+k)),T=R*2-1;let st=!0;for(const X of a){const O=X.nx-w,W=X.ny-F,H=(X.nz-T)*2;if(Math.hypot(O,W,H)<.18){st=!1;break}}if(st)break;A++}a.push({nx:w,ny:F,nz:T,d:R,rx:(o()*2-1)*18,ry:(o()*2-1)*22,rz:(o()*2-1)*10,ph:o()*Math.PI*2,amp:(6+o()*9)*(Te?0:1)})}const l=n.map(()=>({x:0,y:0,z:0,s:.9,rx:0,ry:0,rz:0,op:0})),c=n.map(()=>({x:0,y:0,z:0,s:0,rx:0,ry:0,rz:0}));let h=[];function p(){const E=t.clientWidth,A=t.clientHeight,w=E*.78,F=A*.48,T=Math.min(E,A)*.95;h=a.map(R=>{const k=.38+.72*R.d;return{sx:R.nx*w/2,sy:R.ny*F/2,sz:R.nz*T/2,sBase:k,rx:R.rx,ry:R.ry,rz:R.rz,ph:R.ph,amp:R.amp,opBase:.4+.6*R.d,zIdx:Math.round(R.d*1e3)}}),n.forEach((R,k)=>{R.style.filter=`brightness(${.62+.38*a[k].d})`})}p();let m="scatter",g=-1,u=0;const _=4.2,d=.1,f=.78,S={rx:0,ry:0,tRx:0,tRy:0},M={x:0,y:0,tx:0,ty:0},y={active:!1,lx:0,ly:0,yaw:0,pitch:0,moved:0};let B=!1;function D(E){if(M.tx=(E.clientX/window.innerWidth-.5)*18,M.ty=(E.clientY/window.innerHeight-.5)*-10,!y.active)return;const A=E.clientX-y.lx,w=E.clientY-y.ly;y.yaw+=A*.18,y.pitch=Math.max(-22,Math.min(22,y.pitch+w*.12)),y.lx=E.clientX,y.ly=E.clientY,y.moved+=Math.abs(A)+Math.abs(w)}window.addEventListener("mousemove",D,{passive:!0}),t.addEventListener("mousedown",E=>{m!=="focus"&&(y.active=!0,y.lx=E.clientX,y.ly=E.clientY,y.moved=0,t.classList.add("is-dragging"))}),window.addEventListener("mouseup",()=>{y.active&&(y.active=!1,t.classList.remove("is-dragging"),y.moved>6&&(B=!0))});function P(E){m=E,t.classList.toggle("is-focus-mode",E==="focus"),n.forEach((A,w)=>{A.classList.toggle("is-stacked",E==="stack"),A.classList.toggle("is-scattered",E!=="stack"&&w!==g),A.classList.toggle("is-focused",w===g),A.style.zIndex=w===g?"100000":"auto"})}P("scatter");function z(){g=-1,P("scatter")}function et(){g=-1,P("scatter")}function v(E){const A=g!==-1&&g!==E;g=E,u=performance.now()+(A?180:0),P("focus")}function x(E,A){const w=h[E],F=a[E];if(m==="stack"){const G=(E*37%7-3)*2.5,st=(E*53%11-5)*1.8;return{x:G,y:st,z:0,s:.88,rx:(E*13%5-2)*1.2,ry:(E*17%5-2)*1.5,rz:(E%7-3)*1.4,op:1}}if(m==="scatter"){const G=w.sx+Math.sin(A*55e-5+F.ph)*w.amp,st=w.sy+Math.cos(A*45e-5+F.ph*1.3)*w.amp,X=w.sBase*(1+Math.sin(A*7e-4+F.ph)*.04);return{x:G,y:st,z:w.sz,s:X,rx:w.rx,ry:w.ry,rz:w.rz,op:w.opBase}}if(E===g){if(A<u){const G=w.sx+Math.sin(A*55e-5+F.ph)*w.amp,st=w.sy+Math.cos(A*45e-5+F.ph*1.3)*w.amp,X=w.sBase*(1+Math.sin(A*7e-4+F.ph)*.04);return{x:G,y:st,z:w.sz,s:X,rx:w.rx,ry:w.ry,rz:w.rz,op:w.opBase}}return{x:0,y:0,z:0,s:_,rx:0,ry:0,rz:0,op:1}}const T=w.sx+Math.sin(A*55e-5+F.ph)*w.amp,R=w.sy+Math.cos(A*45e-5+F.ph*1.3)*w.amp,k=w.sBase*.96*(1+Math.sin(A*7e-4+F.ph)*.04);return{x:T,y:R,z:w.sz,s:k,rx:w.rx,ry:w.ry,rz:w.rz,op:w.opBase*.35}}function I(E,A,w,F){M.x+=(M.tx-M.x)*.06,M.y+=(M.ty-M.y)*.06;const T=i.getBoundingClientRect(),R=window.innerHeight||1,k=(T.top+T.height/2-R/2)/R,G=k*72,st=k*70,X=k*-24;m!=="focus"?(S.tRx=y.pitch,S.tRy=Math.sin(F*45e-5)*42+G+M.x+y.yaw):(S.tRx=0,S.tRy=0),S.rx+=(S.tRx-S.rx)*.045,S.ry+=(S.tRy-S.ry)*.045,t.style.transform=`translate(${st.toFixed(1)}px, ${X.toFixed(1)}px) rotateX(${S.rx.toFixed(2)}deg) rotateY(${S.ry.toFixed(2)}deg)`;for(let W=0;W<s;W++){const H=l[W],K=c[W],ct=x(W,F);K.x=(K.x+(ct.x-H.x)*d)*f,H.x+=K.x,K.y=(K.y+(ct.y-H.y)*d)*f,H.y+=K.y,K.z=(K.z+(ct.z-H.z)*d)*f,H.z+=K.z,K.s=(K.s+(ct.s-H.s)*d)*f,H.s+=K.s,K.rx=(K.rx+(ct.rx-H.rx)*d)*f,H.rx+=K.rx,K.ry=(K.ry+(ct.ry-H.ry)*d)*f,H.ry+=K.ry,K.rz=(K.rz+(ct.rz-H.rz)*d)*f,H.rz+=K.rz,H.op+=(ct.op-H.op)*.18;const mt=n[W],ht=H.rx,St=H.ry;mt.style.transform=`translate(-50%, -50%) translate3d(${H.x.toFixed(2)}px, ${H.y.toFixed(2)}px, ${H.z.toFixed(2)}px) scale(${H.s.toFixed(3)}) rotateX(${ht.toFixed(2)}deg) rotateY(${St.toFixed(2)}deg) rotateZ(${H.rz.toFixed(2)}deg)`,mt.style.opacity=H.op.toFixed(3)}const O=window.__endyComicDebug||(window.__endyComicDebug={});O.state=m,O.focusedIndex=g,O.count=s,O.S=h,O.cur=l,O.points=a,O.drag=y,O.box={W:t.clientWidth,H:t.clientHeight},O.timestamp=performance.now()}t.addEventListener("click",E=>{if(B){B=!1;return}const A=E.target.closest(".comic-card");if(m==="stack"){E.preventDefault(),z();return}if(!A){E.preventDefault(),m==="focus"&&et();return}const w=n.indexOf(A);if(!(w<0)){if(m==="scatter"){E.preventDefault(),v(w);return}if(m==="focus"){if(w===g)return;E.preventDefault(),v(w)}}}),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label","追番画廊：点单卡看大图，再点一次前往 B 站，点空白归位"),t.addEventListener("keydown",E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),m==="stack"?z():m==="scatter"?v(0):et())});function C(){p()}for(let E=0;E<s;E++){const A=x(E,performance.now());l[E]={x:A.x,y:A.y,z:A.z,s:A.s,rx:A.rx,ry:A.ry,rz:A.rz,op:A.op}}return{frame:I,resize:C}}function Iv(i){const t=Le.stats&&Le.stats.layers||[],e=document.createElement("div");e.className="data-galaxy",i.appendChild(e);const n=new nv;n.setSize(i.clientWidth||window.innerWidth,i.clientHeight||window.innerHeight),e.appendChild(n.domElement);const s=new lr,r=new Xe(50,1,1,6e3);r.position.set(0,0,1500);const o=new _n;s.add(o);const a=[{z:360,speed:1,gap:360,vPad:240},{z:150,speed:.72,gap:320,vPad:0},{z:-60,speed:.46,gap:320,vPad:0},{z:-280,speed:.26,gap:300,vPad:0},{z:-520,speed:.12,gap:300,vPad:-240}],l=[];t.forEach((_,d)=>{const f=a[d]||a[a.length-1],S=_.items||[],M=S.length;S.forEach((y,B)=>{const D=document.createElement("div");D.className="dg-stat",D.innerHTML=`<div class="dg-num">${y.num}</div><div class="dg-label">${y.label||""}</div>`+(y.meta?`<div class="dg-meta">${y.meta}</div>`:"");const P=new tv(D),z=(B-(M-1)/2)*f.gap;P.position.set(z,f.vPad,f.z),P.userData={baseY:f.vPad,speed:f.speed},o.add(P),l.push(P)})});let c=0;function h(){const _=i.getBoundingClientRect(),d=_.top+_.height/2,f=window.innerHeight/2;c=Math.max(0,Math.min(1,1-Math.abs(d-f)/(window.innerHeight*.9)))}let p=0,m=0,g=0,u=0;return i.addEventListener("pointermove",_=>{const d=i.getBoundingClientRect(),f=(_.clientX-d.left)/d.width*2-1,S=(_.clientY-d.top)/d.height*2-1;m=f*.32,p=-S*.2}),i.addEventListener("pointerleave",()=>{p=0,m=0}),{resize(_,d){n.setSize(_,d),r.aspect=_/d,r.updateProjectionMatrix()},frame(_,d,f,S){h();const M=!Te;r.position.z=M?1500-c*500:1250,l.forEach(y=>{const B=y.userData.speed;y.position.y=M?y.userData.baseY+(c-.5)*700*B:y.userData.baseY,y.element.style.opacity=(.4+.6*(1-Math.abs(c-.5)*1.3*(1-B*.5))).toFixed(3)}),g=Ue(g,M?p:0,.06),u=Ue(u,M?m:0,.06),o.rotation.x=g,o.rotation.y=u,n.render(s,r)}}}const Nv={1:Mv,2:Sv,3:bv,4:Dv,5:wv,8:Iv,9:Ev,10:Tv,11:Av,12:xv,13:Cv,14:Rv,15:Pv,20:Lv};function rh(){const i=document.querySelectorAll(".screen"),t=[];i.forEach(s=>{const r=s.getAttribute("data-screen"),o=Nv[r];if(!o)return;const a=o(s),l=r==="4"||r==="14"||r==="8"||r==="9"||r==="10"||r==="12"||r==="13",c={sec:s,canvas:null,inst:a,ctx:null,w:0,h:0,raf:0,running:!1,isDom:l};if(!l){const p=document.createElement("canvas");p.className="sig-canvas",s.appendChild(p),c.canvas=p}const h=()=>{if(c.canvas){const p=yv(c.canvas,s);c.ctx=p.ctx,c.w=p.w,c.h=p.h}else c.w=s.clientWidth,c.h=s.clientHeight;a.resize&&a.resize(c.w,c.h)};c.refit=h,h(),s._sig=c,t.push(c)});function e(s){s.running&&(s.inst.frame(s.ctx,s.w,s.h,performance.now()),s.raf=requestAnimationFrame(()=>e(s)))}window.addEventListener("resize",()=>t.forEach(s=>s.refit()));const n=new IntersectionObserver(s=>{s.forEach(r=>{const o=r.target._sig;if(o)if(r.isIntersecting&&r.intersectionRatio>.25){if(!o.running){if(Te&&!o.isDom){o.inst.frame(o.ctx,o.w,o.h,performance.now());return}o.running=!0,e(o)}}else o.running&&(o.running=!1,cancelAnimationFrame(o.raf))})},{threshold:[0,.25,.5]});t.forEach(s=>n.observe(s.sec))}const ou="endy-home-theme",au=document.documentElement;let Xn=localStorage.getItem(ou)||"dark";au.setAttribute("data-theme",Xn);uh(Xn);fh(Xn);const da=document.getElementById("theme-toggle");da==null||da.addEventListener("click",()=>{Xn=Xn==="dark"?"light":"dark",au.setAttribute("data-theme",Xn),localStorage.setItem(ou,Xn),uh(Xn),fh(Xn)});const Dl=new Su({lerp:.09,smoothWheel:!0,syncTouch:!1,overscroll:!1});function lu(i){Dl.raf(i),requestAnimationFrame(lu)}requestAnimationFrame(lu);const cu=ku(),Uv=Hu(),Fv=Gu();Vu();Wu(Le);cu.play();const Il=Array.from(document.querySelectorAll(".screen")),Ov=document.getElementById("dots"),Bv=Il.map((i,t)=>{const e=document.createElement("button");return e.className="dot",e.setAttribute("aria-label",`第 ${t+1} 屏`),e.addEventListener("click",()=>{cu.play(()=>Dl.scrollTo(i,{offset:0,immediate:!0}))}),Ov.appendChild(e),e}),oh=document.querySelector("#progress i");Dl.on("scroll",({scroll:i,limit:t})=>{const e=t>0?i/t:0;oh&&(oh.style.transform=`scaleX(${e})`),Tu(e),Nu(e),Fv.update()});const zv=new IntersectionObserver(i=>{i.forEach(t=>{const e=Il.indexOf(t.target);t.isIntersecting&&t.intersectionRatio>.4?(t.target.classList.add("is-in"),Bv.forEach((n,s)=>n.classList.toggle("active",s===e)),t.target.querySelector("[data-ascii]")&&Uv.runIn(t.target)):t.isIntersecting||t.target.classList.remove("is-in")})},{threshold:[.4]});Il.forEach(i=>zv.observe(i));const ah=document.getElementById("comic-grid");ah&&Le.comic&&Le.comic.forEach(i=>{const t=document.createElement("a");t.className="comic-card",t.href=i.href,t.target="_blank",t.rel="noopener";const e=document.createElement("img");e.src=i.cover,e.alt=i.name,e.loading="lazy";const n=document.createElement("span");n.className="comic-name",n.textContent=i.name;const s=document.createElement("span");s.className="comic-badge",s.textContent=(i.score?"★ "+i.score:"")+(i.status?"  "+i.status:"");const r=document.createElement("div");r.className="comic-card-front",r.append(e,n,s),t.append(r),ah.appendChild(t)});Au(document.getElementById("bg"));Uu(document.getElementById("spine"));Fu();ad().then(()=>rh(),()=>rh())(function(){const t=document.querySelector(".avatar");if(!t)return;let e=[];t.style.cursor="pointer",t.addEventListener("click",function(){const n=Date.now();e.push(n),e=e.filter(function(s){return n-s<=1600}),e.length>=3&&(e=[],window.parent&&window.parent!==window&&window.parent.postMessage({type:"endy:revertAbout"},"*"))})})();window.parent&&window.parent!==window&&document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(function(i){i.target="_top"});
