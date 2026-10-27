var Yh=Object.defineProperty;var $h=(i,t,e)=>t in i?Yh(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Bt=(i,t,e)=>$h(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var gl="1.3.26";function Wc(i,t,e){return Math.max(i,Math.min(t,e))}function Kh(i,t,e){return(1-e)*i+e*t}function Zh(i,t,e,n){return Kh(i,t,1-Math.exp(-e*n))}function Jh(i,t){return(i%t+t)%t}var jh=class{constructor(){Bt(this,"isRunning",!1);Bt(this,"value",0);Bt(this,"from",0);Bt(this,"to",0);Bt(this,"currentTime",0);Bt(this,"lerp");Bt(this,"duration");Bt(this,"easing");Bt(this,"onUpdate")}advance(i){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=i;const n=Wc(0,this.currentTime/this.duration,1);t=n>=1;const s=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=Zh(this.value,this.to,this.lerp*60,i),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(i,t,{lerp:e,duration:n,easing:s,onStart:r,onUpdate:o}){this.from=this.value=i,this.to=t,this.lerp=e,this.duration=n,this.easing=s,this.currentTime=0,this.isRunning=!0,r==null||r(),this.onUpdate=o}};function Qh(i,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,i.apply(this,n)},t)}}var tu=class{constructor(i,t,{autoResize:e=!0,debounce:n=250}={}){Bt(this,"width",0);Bt(this,"height",0);Bt(this,"scrollHeight",0);Bt(this,"scrollWidth",0);Bt(this,"debouncedResize");Bt(this,"wrapperResizeObserver");Bt(this,"contentResizeObserver");Bt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Bt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Bt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=i,this.content=t,e&&(this.debouncedResize=Qh(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var i,t;(i=this.wrapperResizeObserver)==null||i.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Xc=class{constructor(){Bt(this,"events",{})}emit(i,...t){var n;const e=this.events[i]||[];for(let s=0,r=e.length;s<r;s++)(n=e[s])==null||n.call(e,...t)}on(i,t){return this.events[i]?this.events[i].push(t):this.events[i]=[t],()=>{var e;this.events[i]=(e=this.events[i])==null?void 0:e.filter(n=>t!==n)}}off(i,t){var e;this.events[i]=(e=this.events[i])==null?void 0:e.filter(n=>t!==n)}destroy(){this.events={}}};const eu=100/6,Dn={passive:!1};function vl(i,t){return i===1?eu:i===2?t:1}var nu=class{constructor(i,t={wheelMultiplier:1,touchMultiplier:1}){Bt(this,"touchStart",{x:0,y:0});Bt(this,"lastDelta",{x:0,y:0});Bt(this,"window",{width:0,height:0});Bt(this,"emitter",new Xc);Bt(this,"onTouchStart",i=>{const{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:i})});Bt(this,"onTouchMove",i=>{const{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i,n=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:s},this.emitter.emit("scroll",{deltaX:n,deltaY:s,event:i})});Bt(this,"onTouchEnd",i=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:i})});Bt(this,"onWheel",i=>{let{deltaX:t,deltaY:e,deltaMode:n}=i;const s=vl(n,this.window.width),r=vl(n,this.window.height);t*=s,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:i})});Bt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=i,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Dn),this.element.addEventListener("touchstart",this.onTouchStart,Dn),this.element.addEventListener("touchmove",this.onTouchMove,Dn),this.element.addEventListener("touchend",this.onTouchEnd,Dn)}on(i,t){return this.emitter.on(i,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Dn),this.element.removeEventListener("touchstart",this.onTouchStart,Dn),this.element.removeEventListener("touchmove",this.onTouchMove,Dn),this.element.removeEventListener("touchend",this.onTouchEnd,Dn)}};const _l=i=>Math.min(1,1.001-2**(-10*i));var iu=class{constructor({wrapper:i=window,content:t=document.documentElement,eventsTarget:e=i,smoothWheel:n=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:p="vertical",gestureOrientation:d=p==="horizontal"?"both":"vertical",touchMultiplier:g=1,wheelMultiplier:f=1,autoResize:x=!0,prevent:u,virtualScroll:m,overscroll:E=!0,autoRaf:y=!1,anchors:M=!1,autoToggle:k=!1,allowNestedScroll:F=!1,__experimental__naiveDimensions:I=!1,naiveDimensions:q=I,stopInertiaOnNavigate:st=!1,respectReducedMotion:v=!0}={}){Bt(this,"_isScrolling",!1);Bt(this,"_isStopped",!1);Bt(this,"_isLocked",!1);Bt(this,"_preventNextNativeScrollEvent",!1);Bt(this,"_resetVelocityTimeout",null);Bt(this,"_rafId",null);Bt(this,"_isDraggingSelection",!1);Bt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Bt(this,"isTouching");Bt(this,"isIos");Bt(this,"time",0);Bt(this,"userData",{});Bt(this,"lastVelocity",0);Bt(this,"velocity",0);Bt(this,"direction",0);Bt(this,"options");Bt(this,"targetScroll");Bt(this,"animatedScroll");Bt(this,"animate",new jh);Bt(this,"emitter",new Xc);Bt(this,"dimensions");Bt(this,"virtualScroll");Bt(this,"onScrollEnd",i=>{i instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&i.stopPropagation()});Bt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Bt(this,"onTransitionEnd",i=>{var t;(t=i.propertyName)!=null&&t.includes("overflow")&&i.target===this.rootElement&&this.checkOverflow()});Bt(this,"onClick",i=>{const t=i.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){const n=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(n){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(n.hash);this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});Bt(this,"onPointerDown",i=>{i.button===1&&this.reset()});Bt(this,"onVirtualScroll",i=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(i)===!1)return;const{deltaX:t,deltaY:e,event:n}=i;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const s=n.type.includes("touch"),r=n.type.includes("wheel");if(s&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&s&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(f=>{var x,u,m,E,y;return f instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(f))||((x=f.hasAttribute)==null?void 0:x.call(f,"data-lenis-prevent"))||h==="vertical"&&((u=f.hasAttribute)==null?void 0:u.call(f,"data-lenis-prevent-vertical"))||h==="horizontal"&&((m=f.hasAttribute)==null?void 0:m.call(f,"data-lenis-prevent-horizontal"))||s&&((E=f.hasAttribute)==null?void 0:E.call(f,"data-lenis-prevent-touch"))||r&&((y=f.hasAttribute)==null?void 0:y.call(f,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(f,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let p=e;this.options.gestureOrientation==="both"?p=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(p=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const d=s&&this.options.syncTouch,g=s&&n.type==="touchend";g&&(p=Math.sign(p)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+p,{programmatic:!1,...d?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Bt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const i=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-i,this.direction=Math.sign(this.animatedScroll-i),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Bt(this,"raf",i=>{const t=i-(this.time||i);this.time=i,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=gl,window.lenis||(window.lenis={}),window.lenis.version=gl,p==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!i||i===document.documentElement)&&(i=window),typeof a=="number"&&typeof l!="function"?l=_l:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:i,content:t,eventsTarget:e,smoothWheel:n,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:d,orientation:p,touchMultiplier:g,wheelMultiplier:f,autoResize:x,prevent:u,virtualScroll:m,overscroll:E,autoRaf:y,anchors:M,autoToggle:k,allowNestedScroll:F,naiveDimensions:q,stopInertiaOnNavigate:st,respectReducedMotion:v},this.dimensions=new tu(i,t,{autoResize:x}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new nu(e,{touchMultiplier:g,wheelMultiplier:f}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(i,t){return this.emitter.on(i,t)}off(i,t){return this.emitter.off(i,t)}get overflow(){const i=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[i]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(i){this.isHorizontal?this.options.wrapper.scrollTo({left:i,behavior:"instant"}):this.options.wrapper.scrollTo({top:i,behavior:"instant"})}isTouchOnSelectionHandle(i){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=i.targetTouches[0]??i.changedTouches[0];if(!e)return!1;const n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;const s=n[0],r=n[n.length-1],o=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=o,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(i,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:o=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:p}={}){if(this.prefersReducedMotion&&(s?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let d=i,g=t;if(typeof d=="string"&&["top","left","start","#"].includes(d))d=0;else if(typeof d=="string"&&["bottom","right","end"].includes(d))d=this.limit;else{let f=null;if(typeof d=="string"?(f=d.startsWith("#")?document.getElementById(d.slice(1)):document.querySelector(d),f||(d==="#top"?d=0:console.warn("Lenis: Target not found",d))):d instanceof HTMLElement&&(d!=null&&d.nodeType)&&(f=d),f){if(this.options.wrapper!==window){const M=this.rootElement.getBoundingClientRect();g-=this.isHorizontal?M.left:M.top}const x=f.getBoundingClientRect(),u=getComputedStyle(f),m=this.isHorizontal?Number.parseFloat(u.scrollMarginLeft):Number.parseFloat(u.scrollMarginTop),E=getComputedStyle(this.rootElement),y=this.isHorizontal?Number.parseFloat(E.scrollPaddingLeft):Number.parseFloat(E.scrollPaddingTop);d=(this.isHorizontal?x.left:x.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(y)?0:y)}}if(typeof d=="number"){if(d+=g,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const f=d-this.animatedScroll;f>this.limit/2?d-=this.limit:f<-this.limit/2&&(d+=this.limit)}}else d=Wc(0,d,this.limit);if(d===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=p??{},e){this.animatedScroll=this.targetScroll=d,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=d),typeof o=="number"&&typeof a!="function"?a=_l:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,d,{duration:o,easing:a,lerp:r,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(f,x)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),s&&(this.targetScroll=f),x||this.emit(),x&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(i,{deltaX:t,deltaY:e}){const n=Date.now();i._lenis||(i._lenis={});const s=i._lenis;let r,o,a,l,c,h,p,d,g,f;if(n-(s.time??0)>2e3){s.time=Date.now();const F=window.getComputedStyle(i);if(s.computedStyle=F,r=["auto","overlay","scroll"].includes(F.overflowX),o=["auto","overlay","scroll"].includes(F.overflowY),c=["auto"].includes(F.overscrollBehaviorX),h=["auto"].includes(F.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=o,!(r||o))return!1;p=i.scrollWidth,d=i.scrollHeight,g=i.clientWidth,f=i.clientHeight,a=p>g,l=d>f,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=p,s.scrollHeight=d,s.clientWidth=g,s.clientHeight=f,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=h}else a=s.isScrollableX,l=s.isScrollableY,r=s.hasOverflowX,o=s.hasOverflowY,p=s.scrollWidth,d=s.scrollHeight,g=s.clientWidth,f=s.clientHeight,c=s.hasOverscrollBehaviorX,h=s.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;const x=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let u,m,E,y,M,k;if(x==="horizontal")u=Math.round(i.scrollLeft),m=p-g,E=t,y=r,M=a,k=c;else if(x==="vertical")u=Math.round(i.scrollTop),m=d-f,E=e,y=o,M=l,k=h;else return!1;return!k&&(u>=m||u<=0)?!0:(E>0?u<m:u>0)&&y&&M}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const i=this.options.wrapper;return this.isHorizontal?i.scrollX??i.scrollLeft:i.scrollY??i.scrollTop}get scroll(){return this.options.infinite?Jh(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(i){this._isScrolling!==i&&(this._isScrolling=i,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(i){this._isStopped!==i&&(this._isStopped=i,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(i){this._isLocked!==i&&(this._isLocked=i,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let i="lenis";return this.options.autoToggle&&(i+=" lenis-autoToggle"),this.isStopped&&(i+=" lenis-stopped"),this.isLocked&&(i+=" lenis-locked"),this.isScrolling&&(i+=" lenis-scrolling"),this.isScrolling==="smooth"&&(i+=" lenis-smooth"),i}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(i=>{this.rootElement.classList.add(i)})}cleanUpClassName(){for(const i of Array.from(this.rootElement.classList))(i==="lenis"||i.startsWith("lenis-"))&&this.rootElement.classList.remove(i)}};let Ae,Hi,$e,Ke,ls,Yo="dark",ki=[],$o=0,su=performance.now(),Ko=0;const Hn={x:-9999,y:-9999,active:!1},ru={dark:{bg0:"#070b18",bg1:"#0d1b3a",star:"rgba(180,210,255,",glow:"rgba(80,140,255,",link:"rgba(120,170,255,"},light:{bg0:"#eaf1fb",bg1:"#cfe0f7",star:"rgba(40,90,180,",glow:"rgba(60,120,230,",link:"rgba(50,110,220,"}};function xl(){ls=Math.min(window.devicePixelRatio||1,2),$e=window.innerWidth,Ke=window.innerHeight,Hi.width=$e*ls,Hi.height=Ke*ls,Hi.style.width=$e+"px",Hi.style.height=Ke+"px",Ae.setTransform(ls,0,0,ls,0,0)}function yl(){const i=Math.round($e*Ke/22e3);ki=Array.from({length:i},()=>({x:Math.random()*$e,y:Math.random()*Ke,r:Math.random()*1.6+.4,vx0:(Math.random()-.5)*.12,vy0:(Math.random()-.5)*.12,pushx:0,pushy:0,a:Math.random()*.6+.2,ph:Math.random()*Math.PI*2}))}const ro=150,ou=.9,oo=132;function qc(i){const t=(i-su)/1e3,e=ru[Yo],n=Ae.createLinearGradient(0,0,$e,Ke);n.addColorStop(0,e.bg0),n.addColorStop(1,e.bg1),Ae.fillStyle=n,Ae.fillRect(0,0,$e,Ke);for(const c of ki){if(Hn.active){const p=c.x-Hn.x,d=c.y-Hn.y,g=p*p+d*d;if(g<ro*ro&&g>.01){const f=Math.sqrt(g),x=(1-f/ro)*ou;c.pushx+=p/f*x,c.pushy+=d/f*x}}c.x+=c.vx0+c.pushx,c.y+=c.vy0+c.pushy,c.pushx*=.86,c.pushy*=.86,c.x<-10&&(c.x=$e+10),c.x>$e+10&&(c.x=-10),c.y<-10&&(c.y=Ke+10),c.y>Ke+10&&(c.y=-10);const h=c.a*(.6+.4*Math.sin(t*1.5+c.ph));Ae.beginPath(),Ae.arc(c.x,c.y,c.r,0,Math.PI*2),Ae.fillStyle=e.star+h.toFixed(3)+")",Ae.fill()}for(let c=0;c<ki.length;c++){const h=ki[c];for(let p=c+1;p<ki.length;p++){const d=ki[p],g=h.x-d.x,f=h.y-d.y,x=g*g+f*f;if(x<oo*oo){const m=(1-Math.sqrt(x)/oo)*.5;Ae.beginPath(),Ae.moveTo(h.x,h.y),Ae.lineTo(d.x,d.y),Ae.strokeStyle=e.link+m.toFixed(3)+")",Ae.lineWidth=1,Ae.stroke()}}}const s=$e/2,r=Ke*(.42-Ko*.12),o=Math.min($e,Ke)*(.32+.02*Math.sin(t*.4)),a=(Yo==="dark"?.18:.22)+.12*Math.sin(Ko*Math.PI),l=Ae.createRadialGradient(s,r,0,s,r,o);l.addColorStop(0,e.glow+a.toFixed(3)+")"),l.addColorStop(1,e.glow+"0)"),Ae.fillStyle=l,Ae.fillRect(0,0,$e,Ke),$o=requestAnimationFrame(qc)}function Yc(i){Yo=i}function au(i){Ko=Math.max(0,Math.min(1,i))}function lu(i){Hi=i,Ae=Hi.getContext("2d"),xl(),yl(),window.addEventListener("resize",()=>{xl(),yl()}),window.addEventListener("pointermove",t=>{Hn.x=t.clientX,Hn.y=t.clientY,Hn.active=!0}),window.addEventListener("pointerout",()=>{Hn.active=!1}),window.addEventListener("blur",()=>{Hn.active=!1}),cancelAnimationFrame($o),$o=requestAnimationFrame(qc)}let Xt,Gn,hi,Wi,cs,$c="dark",Ss=0,Ir=0,Nr=!1,cu=performance.now(),Mi=0,Ml=!0;const Es=20;let Wn=[],wn=[];const hu={dark:{line:"120,180,255",node:"123,224,255",burst:"123,200,255"},light:{line:"43,108,255",node:"0,144,212",burst:"43,108,255"}};function Sl(){cs=Math.min(window.devicePixelRatio||1,2),hi=window.innerWidth,Wi=window.innerHeight,Gn.width=hi*cs,Gn.height=Wi*cs,Gn.style.width=hi+"px",Gn.style.height=Wi+"px",Xt.setTransform(cs,0,0,cs,0,0),Nr=hi<560,Gn.style.display=Nr?"none":"block",fu()}function uu(){return hi<760?18:Math.max(36,Math.min(hi*.05,64))}function fu(){const i=uu(),t=Wi*.12,e=Wi*.88;Wn=Array.from({length:Es},(n,s)=>({x:i,y:t+(e-t)*s/(Es-1),p:s/(Es-1),glow:0}))}function du(i){if(!i)return;const t=16;for(let e=0;e<t;e++){const n=Math.random()*Math.PI*2,s=.4+Math.random()*1.6;wn.push({x:i.x,y:i.y,vx:Math.cos(n)*s,vy:Math.sin(n)*s-.35,life:1,decay:.01+Math.random()*.02,r:1+Math.random()*2})}wn.length>260&&wn.splice(0,wn.length-260)}function pu(){for(const i of wn)i.x+=i.vx,i.y+=i.vy,i.vy+=.012,i.vx*=.99,i.life-=i.decay;wn.length&&(wn=wn.filter(i=>i.life>0))}function Zo(i){if(Nr){Ir=requestAnimationFrame(Zo);return}const t=(i-cu)/1e3,e=hu[$c];Xt.clearRect(0,0,hi,Wi);const n=Wn[0].x,s=Wn[0].y,r=Wn[Es-1].y,o=s+(r-s)*Ss;Xt.lineWidth=2,Xt.strokeStyle=`rgba(${e.line},0.10)`,Xt.beginPath(),Xt.moveTo(n,s),Xt.lineTo(n,r),Xt.stroke();const a=Xt.createLinearGradient(n,s,n,o||s+1);a.addColorStop(0,`rgba(${e.line},0)`),a.addColorStop(1,`rgba(${e.line},0.9)`),Xt.save(),Xt.shadowBlur=14,Xt.shadowColor=`rgba(${e.line},0.8)`,Xt.strokeStyle=a,Xt.lineWidth=2.4,Xt.beginPath(),Xt.moveTo(n,s),Xt.lineTo(n,o),Xt.stroke(),Xt.restore();const l=.6+.4*Math.sin(t*4);Xt.save(),Xt.shadowBlur=22,Xt.shadowColor=`rgba(${e.node},1)`,Xt.fillStyle=`rgba(${e.node},${l})`,Xt.beginPath(),Xt.arc(n,o,4+2*l,0,Math.PI*2),Xt.fill(),Xt.restore();for(let c=0;c<Es;c++){const h=Wn[c],p=Ss>=h.p-5e-4;let d=p?.5:.16;Math.abs(Ss-h.p)<.014&&(d=1),h.glow+=(d-h.glow)*.12;const g=p?.5*Math.sin(t*2+c):0,f=Math.max(1.5,3.2+h.glow*4+g);Xt.save(),Xt.shadowBlur=8+h.glow*18,Xt.shadowColor=`rgba(${e.node},${.5+.5*h.glow})`,Xt.fillStyle=`rgba(${e.node},${.25+h.glow*.75})`,Xt.beginPath(),Xt.arc(h.x,h.y,f,0,Math.PI*2),Xt.fill(),Xt.restore()}pu();for(const c of wn)Xt.save(),Xt.globalAlpha=Math.max(0,c.life),Xt.shadowBlur=8,Xt.shadowColor=`rgba(${e.burst},${c.life})`,Xt.fillStyle=`rgba(${e.burst},1)`,Xt.beginPath(),Xt.arc(c.x,c.y,c.r,0,Math.PI*2),Xt.fill(),Xt.restore();Ir=requestAnimationFrame(Zo)}function Kc(i){$c=i}function mu(i){if(Ss=Math.max(0,Math.min(1,i)),Nr||Wn.length===0)return;const t=Wn.filter(e=>Ss>=e.p-5e-4).length;if(Ml){Mi=t,Ml=!1;return}if(t>Mi){for(let e=Mi;e<t;e++)du(Wn[e]);Mi=t}else t<Mi&&(Mi=t)}function gu(i){Gn=i,Gn&&(Xt=Gn.getContext("2d"),Sl(),window.addEventListener("resize",Sl),cancelAnimationFrame(Ir),Ir=requestAnimationFrame(Zo))}let cn={x:0,y:0},zn={x:0,y:0},kn={x:0,y:0},di,pi,Ns=!1,Zc=!1,sn=null;const Jo=".cta-links a, .theme-toggle, .dot";function vu(){typeof window>"u"||window.matchMedia("(pointer:fine)").matches&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches||window.innerWidth<760||(Ns=!0,pi=document.createElement("div"),pi.className="cur-dot",di=document.createElement("div"),di.className="cur-ring",document.body.append(di,pi),document.body.classList.add("has-custom-cursor"),cn.x=zn.x=kn.x=window.innerWidth/2,cn.y=zn.y=kn.y=window.innerHeight/2,window.addEventListener("pointermove",_u),document.addEventListener("pointerover",xu),document.addEventListener("pointerout",yu),window.addEventListener("blur",()=>jo(!1)),document.addEventListener("mouseleave",()=>jo(!1)),Jc()))}function jo(i){if(!Ns)return;Zc=i;const t=i?"1":"0";pi&&(pi.style.opacity=t),di&&(di.style.opacity=t)}function _u(i){cn.x=i.clientX,cn.y=i.clientY,Zc||jo(!0);const t=i.target&&i.target.closest?i.target.closest(".screen"):null;let e="dot";if(t){const n=t.getAttribute("data-screen");n==="9"?e="cross":n==="1"&&(e="ring")}sn&&(e="hover"),document.body.dataset.cur!==e&&(document.body.dataset.cur=e)}function xu(i){if(!Ns)return;const t=i.target&&i.target.closest?i.target.closest(Jo):null;t&&t!==sn&&(sn&&(sn.style.transform=""),sn=t)}function yu(i){if(!Ns)return;const t=i.target&&i.target.closest?i.target.closest(Jo):null;if(!t)return;const e=i.relatedTarget;e&&e.closest&&e.closest(Jo)===t||t===sn&&(t.style.transform="",sn=null)}function Jc(){if(Ns){if(zn.x+=(cn.x-zn.x)*.35,zn.y+=(cn.y-zn.y)*.35,kn.x+=(cn.x-kn.x)*.16,kn.y+=(cn.y-kn.y)*.16,sn&&sn.isConnected){const i=sn.getBoundingClientRect(),t=i.left+i.width/2,e=i.top+i.height/2,n=(cn.x-t)*.28,s=(cn.y-e)*.28;sn.style.transform=`translate(${n.toFixed(1)}px, ${s.toFixed(1)}px)`}pi&&(pi.style.transform=`translate3d(${zn.x.toFixed(1)}px, ${zn.y.toFixed(1)}px, 0) translate(-50%, -50%)`),di&&(di.style.transform=`translate3d(${kn.x.toFixed(1)}px, ${kn.y.toFixed(1)}px, 0) translate(-50%, -50%)`),requestAnimationFrame(Jc)}}function Mu(){const i=document.getElementById("blinds");if(!i)return{play(){}};const t=14,e=[];for(let s=0;s<t;s++){const r=document.createElement("span");r.style.width=100/t+"%",r.style.left=100/t*s+"%",i.appendChild(r),e.push(r)}function n(s){return new Promise(r=>{e.forEach(a=>a.style.transformOrigin="top");const o=e.map((a,l)=>a.animate([{transform:"scaleY(0)"},{transform:"scaleY(1)"}],{duration:360,delay:l*20,easing:"cubic-bezier(0.7,0,0.3,1)",fill:"forwards"}));Promise.all(o.map(a=>a.finished)).then(()=>{typeof s=="function"&&s(),e.forEach(l=>l.style.transformOrigin="bottom");const a=e.map((l,c)=>l.animate([{transform:"scaleY(1)"},{transform:"scaleY(0)"}],{duration:420,delay:(t-1-c)*18,easing:"cubic-bezier(0.7,0,0.3,1)",fill:"forwards"}));Promise.all(a.map(l=>l.finished)).then(()=>{e.forEach(l=>l.style.transform="scaleY(0)"),r()})})})}return{play:n}}const El="·:*○●★☆→←↑↓/\\|=+<>ABCDEF0123456789░▒▓".split("");function Su(){const i=Array.from(document.querySelectorAll("[data-ascii]"));function t(e){const n=e.getAttribute("data-ascii")||"",s=24;let r=0;cancelAnimationFrame(e._raf||0);function o(){const a=r/s;let l="";for(let c=0;c<n.length;c++)c/n.length<a?l+=n[c]:l+=El[Math.floor(Math.random()*El.length)];e.textContent=l,r++,r<=s?e._raf=requestAnimationFrame(o):e.textContent=n}o()}return{run:t,nodes:i,runIn(e){e.querySelectorAll("[data-ascii]").forEach(t)}}}function Eu(){const i=Array.from(document.querySelectorAll("[data-parallax]"));function t(){const e=window.innerHeight;for(const n of i){const s=n.getBoundingClientRect(),o=(s.top+s.height/2-e/2)/e,a=parseFloat(n.dataset.parallax)||0;n.style.translate=`0 ${(o*a*-46).toFixed(2)}px`}}return{update:t}}function bu(){const i=document.querySelector(".hero-inner");if(!i)return;let t=0,e=0,n=0,s=0;window.addEventListener("pointermove",o=>{const a=o.clientX/window.innerWidth-.5,l=o.clientY/window.innerHeight-.5;t=a*22,e=l*16});function r(){n+=(t-n)*.08,s+=(e-s)*.08,i.style.translate=`${n.toFixed(2)}px ${s.toFixed(2)}px`,requestAnimationFrame(r)}r()}function wu(i){var c;const t=document.querySelector(".hero-name"),e=document.getElementById("egg");if(!t||!e)return;const n=e.querySelector(".egg-dl"),s=(i==null?void 0:i.secret)||{};if(n){const h=[["真名",s.realName||"（待补充）"],["所在地",s.city||"中国 · 宁德市"],["生年",s.born||"2004"],["邮箱",s.email||"站内私信可见"],["微信",s.wechat||"（待补充）"]];n.innerHTML=h.map(([p,d])=>`<div class="egg-row"><dt>${p}</dt><dd>${d}</dd></div>`).join("")}let r=0,o=0;t.addEventListener("click",()=>{const h=Date.now();h-o>450&&(r=0),r++,o=h,r>=3&&(l(),r=0)});const a=()=>{e.classList.remove("show"),document.body.style.overflow="",document.body.style.paddingRight=""},l=()=>{e.classList.add("show");const h=window.innerWidth-document.documentElement.clientWidth;document.body.style.overflow="hidden",h>0&&(document.body.style.paddingRight=h+"px")};(c=e.querySelector(".egg-close"))==null||c.addEventListener("click",a),e.addEventListener("click",h=>{h.target===e&&a()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&a()}),e._endyOpen=l}const Tu=[{name:"Ｄｒ．ＳＴＯＮＥ 石纪元 (第四季)",href:"https://www.bilibili.com/bangumi/media/md24449643/",cover:"./img/comic/24449643.webp",score:"9.9",status:"在看",area:"日本",type:"番剧"},{name:"葬送的芙莉莲",href:"https://www.bilibili.com/bangumi/media/md21087073/",cover:"./img/comic/21087073.webp",score:"9.9",status:"在看",area:"日本",type:"番剧"},{name:"中国奇谭",href:"https://www.bilibili.com/bangumi/media/md28235401/",cover:"./img/comic/28235401.webp",score:"9.9",status:"在看",area:"中国大陆",type:"国创"},{name:"ReLIFE",href:"https://www.bilibili.com/bangumi/media/md28229193/",cover:"./img/comic/28229193.webp",score:"9.9",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元 (第三季)",href:"https://www.bilibili.com/bangumi/media/md20140807/",cover:"./img/comic/20140807.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"碧蓝之海 第二季",href:"https://www.bilibili.com/bangumi/media/md26714035/",cover:"./img/comic/26714035.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"灵笼 第二季",href:"https://www.bilibili.com/bangumi/media/md21123554/",cover:"./img/comic/21123554.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"测不准的阿波连同学 第二季",href:"https://www.bilibili.com/bangumi/media/md25530455/",cover:"./img/comic/25530455.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"风灵玉秀",href:"https://www.bilibili.com/bangumi/media/md6038/",cover:"./img/comic/6038.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"命运-冠位指定 -神圣圆桌领域卡美洛- 后篇 圣骑士银之臂",href:"https://www.bilibili.com/bangumi/media/md20145263/",cover:"./img/comic/20145263.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"奇幻世界舅舅",href:"https://www.bilibili.com/bangumi/media/md28338491/",cover:"./img/comic/28338491.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"JOJO的奇妙冒险 石之海",href:"https://www.bilibili.com/bangumi/media/md28235123/",cover:"./img/comic/28235123.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元 特别篇：龙水",href:"https://www.bilibili.com/bangumi/media/md28338468/",cover:"./img/comic/28338468.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"时光代理人",href:"https://www.bilibili.com/bangumi/media/md28230742/",cover:"./img/comic/28230742.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"犬夜叉剧场版 穿越时空的思念",href:"https://www.bilibili.com/bangumi/media/md28339205/",cover:"./img/comic/28339205.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"鬼灭之刃 无限列车篇",href:"https://www.bilibili.com/bangumi/media/md28235136/",cover:"./img/comic/28235136.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"命运-冠位嘉年华",href:"https://www.bilibili.com/bangumi/media/md28234639/",cover:"./img/comic/28234639.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"伍六七之玄武国篇",href:"https://www.bilibili.com/bangumi/media/md28232253/",cover:"./img/comic/28232253.webp",score:"9.8",status:"在看",area:"中国大陆",type:"国创"},{name:"Re：从零开始的异世界生活 第二季 后半",href:"https://www.bilibili.com/bangumi/media/md28232073/",cover:"./img/comic/28232073.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"岸边露伴 一动也不动",href:"https://www.bilibili.com/bangumi/media/md28233715/",cover:"./img/comic/28233715.webp",score:"9.8",status:"在看",area:"日本",type:"番剧"},{name:"凡人修仙传",href:"https://www.bilibili.com/bangumi/media/md28223043/",cover:"./img/comic/28223043.webp",score:"9.7",status:"在看",area:"中国大陆",type:"国创"},{name:"间谍过家家 第二季",href:"https://www.bilibili.com/bangumi/media/md21086686/",cover:"./img/comic/21086686.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"黑执事 绿之魔女篇",href:"https://www.bilibili.com/bangumi/media/md25435993/",cover:"./img/comic/25435993.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"克雷瓦提斯-魔兽之王与婴儿与尸之勇者-",href:"https://www.bilibili.com/bangumi/media/md26638078/",cover:"./img/comic/26638078.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"我独自升级 第二季 -起于暗影-",href:"https://www.bilibili.com/bangumi/media/md24474625/",cover:"./img/comic/24474625.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"鬼灭之刃 柱训练篇",href:"https://www.bilibili.com/bangumi/media/md21226899/",cover:"./img/comic/21226899.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"天使的小生意气",href:"https://www.bilibili.com/bangumi/media/md2042/",cover:"./img/comic/2042.png",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"间谍过家家",href:"https://www.bilibili.com/bangumi/media/md28237119/",cover:"./img/comic/28237119.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"绝顶",href:"https://www.bilibili.com/bangumi/media/md28339263/",cover:"./img/comic/28339263.webp",score:"9.7",status:"在看",area:"中国大陆",type:"国创"},{name:"只有我不存在的城市",href:"https://www.bilibili.com/bangumi/media/md28228814/",cover:"./img/comic/28228814.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元  (第二季)",href:"https://www.bilibili.com/bangumi/media/md28231817/",cover:"./img/comic/28231817.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"Ｄｒ．ＳＴＯＮＥ 石纪元",href:"https://www.bilibili.com/bangumi/media/md28221387/",cover:"./img/comic/28221387.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"测不准的阿波连同学",href:"https://www.bilibili.com/bangumi/media/md28234872/",cover:"./img/comic/28234872.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"鬼灭之刃 游郭篇",href:"https://www.bilibili.com/bangumi/media/md28235125/",cover:"./img/comic/28235125.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"与变成了异世界美少女的好友一起冒险",href:"https://www.bilibili.com/bangumi/media/md28236221/",cover:"./img/comic/28236221.webp",score:"9.7",status:"在看",area:"日本",type:"番剧"},{name:"天官赐福 日语版",href:"https://www.bilibili.com/bangumi/media/md28234618/",cover:"./img/comic/28234618.webp",score:"9.7",status:"在看",area:"中国大陆",type:"国创"}],Au=[{name:"江上清风游",artist:"变奏的梦想",id:"003Mb4Eh0X2cN8",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=003Mb4Eh0X2cN8",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=002NgwPy4cyuFI",lrc:""},{name:"YOSEMITE (心平能愈三千疾)",artist:"Knorr",id:"002Z6oqu4LaUWh",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=002Z6oqu4LaUWh",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=000Xbv0B1DH5fP",lrc:""},{name:"夜、萤火虫和你",artist:"AniFace",id:"0021VYHj0M9W8V",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=0021VYHj0M9W8V",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=0007G14R3tMDKG",lrc:""},{name:"明镜菩提",artist:"正版原声",id:"0003kyCF1bXRSH",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=0003kyCF1bXRSH",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=000SyXul49scHZ",lrc:""},{name:"问佛",artist:"纯音乐",id:"002iZSlU4VaRR7",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=002iZSlU4VaRR7",cover:"/img/default_cover.webp",lrc:""},{name:"理想境",artist:"郯隗",id:"000JCy8R0ET4k3",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=000JCy8R0ET4k3",cover:"https://api.injahow.cn/meting/?server=tencent&type=pic&id=000gkCcI2f7sq8",lrc:""},{name:"水墨兰亭",artist:"李志辉",id:"002pDbVN3aopU9",url:"https://api.injahow.cn/meting/?server=tencent&type=url&id=002pDbVN3aopU9",cover:"/img/default_cover.webp",lrc:""}],Cu="wxp://f2f0QQ9lidKpnid-SbZUE5L4Gm5T22ziZT4q2GGU357J5io",Ru=49,Pu="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111110000001100000101000110001001111111000000001000001000111100011000000000010100100000100000000101110101001010010001111000010010010111010000000010111010110010100011000110001011101011101000000001011101001110010011000011111111100101110100000000100000100100000111001110101000001010000010000000011111110101010101010101010101010101111111000000000000000000011111001001110100101010000000000000000000110110110000010001001111111110000011000000000000101001100111001010101101010001010011111000000001011101100100000100000101001101010011100000000000001100000111101001000110100011110100110100000000010000011111110110011100001000101101100001000000000011010000110111111001111100010000011010000000000001000101100111001001001100101111000010010000000011000001100100001001000011101010110101101000000001001011000011000100101011001110111010010000000000111001010011000100101101010110011001110000000000011111011010100010010001110110001110100001000000001100110000000001000110001010011011000011000000000010110111000110100110110110100001011011100000000010001000011000000011011001011010000011110000000000100011000110010001110110001111001001110000000000110001000111111010011010011001101000100110000000001011010001011110100110010010100011010001000000001101100110001111010100000001010011111100000000000101000110111101110000101001101110101110010000000010000000000110111110011011101011000111110000000000100001010000100111001101011010011010100000000000110111001010110010100100010001011100101100000000011001111100001011001000100101101000110011000000001111000110011000100100110101101101101010000000000111000110101100001010011110001111111101000000000000000000100001111100010000010001100011000000000001111111011101100011110100011011110101110000000000100000100001000000010001010001011000100010000000010111010101011010111100100111111111110000000000001011101011111011100100100010100101010111100000000101110100001000001100101011100110100101110000000010000010011100001001010000000000011010101000000001111111001001101101010101001110011011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",Lu={payload:Cu,n:Ru,bits:Pu},Du="https://qr.alipay.com/fkx15483w2iwyhvwoyzwa99",Iu=49,Nu="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111110011101110100100100001110001111111000000001000001000011010010110101000101100100000100000000101110101101111010111101100110001010111010000000010111010101101011111110000000010101011101000000001011101000111101111000101110010100101110100000000100000100111010011001101110011100010000010000000011111110101010101010101010101010101111111000000000000000000011010001001011100100000000000000000000000110110100100111100010101111011000011000000000010111100010000110111100010010101010110001000000001101101111010101111111110011001001000011000000000101000000100100100100010001001011110110110000000001001010000100010100110101100000111100010000000000001110011000101111111001000010101011111100000000001010110111110010010111111101000111000010000000010100000100011011010010110101001010011110000000000111001010011101110110100101000101000101000000000010101000000110010000100000100011100110000000000011110011111101101010010011010001100110001000000000000110000100001011100110101111001101110000000000011100100001100011100101000100010010101110000000011100100000001000110100011111011000101000000000001000101001100110011101011001101001110000000000000100100000101110001111011011001111110011110000000010110111110010010010111100011010101001100000000001001000110110000001001011101111010111011100000000010011111010000000100111100100111001110110000000000001101001001100101011101101011000001111000000000001111010110011100110110101001100110101100000000111000000010111111011101100000000010101100000000011100010101011100100110010001111010100111000000001111110001101101110001001101100110110110000000000110010110011110001110010101001011111111100000000000000000110001000001101101110001100010110000000001111111010111000101101011011011110101000000000000100000100011110110001110101111011000110110000000010111010100001001111100110000111111111010000000001011101010011101101010100001010110010110100000000101110100010010011011100011101011101100110000000010000010000011100000000010101010010010101000000001111111000000011110111100111000010001110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",Uu={payload:Du,n:Iu,bits:Nu},Fu="https://miku-chat-jggayawxnr.cn-shanghai.fcapp.run/api/la-stats";function gn(i){return i==null||Number.isNaN(i)?"0":Math.max(0,Math.round(Number(i))).toLocaleString("zh-CN")}const xe={name:"彖渊子",sign:"彖辞破暗，渊澄万象",desc:"是一名 供应链管理师、独立开发者、博主",avatar:"./img/selfhosted/pZRXSc6.jpg",skillsLeft:["🤖️ 数码科技爱好者","🔍 分享与热心帮助","🏠 智能家居小能手","🔨 设计开发一条龙"],skillsRight:["专修交互与设计 🤝","脚踏实地行动派 🏃","团队小组发动机 🧱","壮汉人狠话不多 💢"],careers:[{desc:"EDU，物流管理专业",color:"#357ef5"},{desc:"事业立足",color:"#357ef5"},{desc:"为人类发展做出贡献",color:"#357ef5"}],selfInfo:{born:"2004",school:"武夷学院",major:"物流管理",job:"大四学生"},personality:{type:"INFJ-A",label:"提倡者",photo:"./img/selfhosted/pEcx82D.webp",cutout:"./img/selfhosted/persona-cut.webp",trait:"./img/selfhosted/16personalities_trait_intuitive.svg",dims:[{a:"I",b:"E",name:"内向 · Introversion",desc:"能量在独处中恢复，深度大于广度",anti:"对立端 E 外向：能量在人际互动中获得"},{a:"N",b:"S",name:"直觉 · iNtuition",desc:"关注可能性、联想与未来图景",anti:"对立端 S 实感：关注具体事实与当下细节"},{a:"F",b:"T",name:"情感 · Feeling",desc:"以个人价值观与共情做决策",anti:"对立端 T 思考：以逻辑与客观分析做决策"},{a:"J",b:"P",name:"判断 · Judging",desc:"偏好计划、结构与确定性",anti:"对立端 P 知觉：偏好灵活与保持开放"}]},maxim:{top:"彖辞破暗，",bottom:"渊澄万象"},buff:{top:"脑回路新奇的 酸菜鱼",bottom:"二次元指数 MAX"},game:{title:"铁锈战争",subtitle:"RUSTED WARFARE · 作战指挥室",uid:"Unnamed677",coords:"GRID 41.08°N · 122.06°E",feeds:[{src:"./img/selfhosted/rw-battle-01.webp",cam:"CAM-01 · 主战场",w:1600,h:1216},{src:"./img/selfhosted/rw-battle-02.webp",cam:"CAM-02 · 前线推进",w:1600,h:1055},{src:"./img/selfhosted/rw-battle-03.webp",cam:"CAM-03 · 阵地攻防",w:1600,h:896}],briefs:[">> SCOUT 报告：东线装甲集群正在推进，请求空中支援",">> 防空火力网已就位，航线清空，迫击炮阵地展开",">> 资金充裕，指挥官。第二梯队增援已在路上",">> 主战场进入白热化，双方指挥点持续攀升",">> 前线阵地交火中，工程单位正在抢修防御工事"],stats:[{k:"指挥官",v:"Unnamed677"},{k:"资金",v:"$4,851"},{k:"帧率",v:"121 FPS"},{k:"战线",v:"2 条"}]},comic:Tu,like:{title:"我的关注宇宙",intro:"每颗行星都是我的一项热爱 —— 悬停查看，移动鼠标推近这片星空",sun:{name:"彖渊子",desc:"一切热爱的引力中心"},planets:[{key:"mercury",name:"物流与供应链",interest:"🚚 物流 / 供应链管理",desc:"专业底色，让复杂流转变得有序",color:"#b7a98f",a:.387,e:.206,inc:7,T:.241,size:.26,link:"/archives"},{key:"venus",name:"智能家居",interest:"💡 智能家居小能手",desc:"让家听懂人的节奏",color:"#e6c27a",a:.723,e:.007,inc:3.4,T:.615,size:.45,link:"/archives"},{key:"earth",name:"设计开发",interest:"🎨 设计开发一条龙",desc:"从想法到落地的全链路",color:"#4a90d9",a:1,e:.017,inc:0,T:1,size:.5,link:"/archives"},{key:"mars",name:"游戏 · 铁锈战争",interest:"🎮 游戏 · 铁锈战争",desc:"UID: Unnamed677 的战场",color:"#d9603a",a:1.524,e:.093,inc:1.85,T:1.881,size:.38,link:"/archives"},{key:"jupiter",name:"音乐",interest:"🎵 电音 / 梵音 / 轻音乐",desc:"最大的一颗，最爱的一颗",color:"#d8a878",a:5.203,e:.048,inc:1.31,T:11.86,size:1.4,link:"/life/music/"},{key:"saturn",name:"宇宙、神秘",interest:"🌌 宇宙、神秘",desc:"望着深邃，才懂自己的渺小与辽阔",color:"#e8d3a0",a:9.537,e:.054,inc:2.49,T:29.46,size:1.2,link:"/archives"},{key:"uranus",name:"数码科技",interest:"📷 数码科技爱好者",desc:"对新玩意永远好奇",color:"#9fd8e0",a:19.19,e:.047,inc:.77,T:84,size:.8,link:"/archives"},{key:"neptune",name:"二次元",interest:"🌸 二次元 / 动漫",desc:"二次元指数 MAX",color:"#4f7fe0",a:30.07,e:.009,inc:1.77,T:164.8,size:.78,link:"/archives"}]},music:{title:"电音、梵音、轻音乐",bg:"./img/selfhosted/pVVZFot.jpg",link:"/life/music/",playlist:Au.map(i=>{const t=i.url,e=t.startsWith("https://aqqmusic.tc.qq.com")?"/qq"+t.slice(26):t;return{title:i.name,src:e,raw:t}})},stats:{layers:[{items:[{num:"1,284,567",label:"总访问 PV",meta:"页面浏览总量 · 较上月 +8.4%"},{num:"386,204",label:"独立访客 UV",meta:"去重后的访客数 · 较上月 +6.1%"}]},{items:[{num:"3,417",label:"今日 PV",meta:"截至今天的浏览量"},{num:"3,902",label:"昨日 PV",meta:"较前一日 -12.4%"},{num:"8",label:"文章数",meta:"累计已发布文章（实时）"}]},{items:[{num:"0",label:"评论数",meta:"全站评论互动总量（twikoo）"},{num:"4m12s",label:"平均停留",meta:"单次访问平均时长 · ↑ +0:18"}]},{items:[{num:"68%",label:"移动端占比",meta:"手机 / 平板访问占比"},{num:"54%",label:"搜索引擎来源",meta:"来自搜索的流量占比"}]},{items:[{num:"23%",label:"福建访客",meta:"访客地域排名第一"},{num:"18%",label:"广东访客",meta:"访客地域排名第二"},{num:"11%",label:"浙江访客",meta:"访客地域排名第三"}]}]},map:{title:"我现在住在",place:"中国，宁德市",bg:"./img/about/map.webp",bgDark:"./img/about/map-dark.webp"},rewards:[{name:"乐儿",amount:25,date:"2025-04-22"}],thanks:{title:"感谢",sub:"每一份善意，都被认真记着",charge:"为我充电",chargeNote:"电量来自每一颗星",sheetTitle:"请彖渊子喝一杯",sheetSub:"THANKS FOR YOUR SUPPORT",sheetNote:"金额随意 · 心意最重要 ☕",qr:{wx:{label:"微信",matrix:Lu,png:"./img/selfhosted/qr-wechat-art.webp",color:"#07c160",copyable:!1},ali:{label:"支付宝",matrix:Uu,png:"./img/selfhosted/qr-alipay-art.webp",color:"#1677ff",copyable:!0}}},secret:{realName:"（待补充）",city:"中国 · 宁德市",born:"2004",email:"站内私信可见",wechat:"（待补充）"}},Ou=["/2025/05/13/各类降本增效免费AI工具/","/2022/10/29/在线数据分析平台/","/2025/04/01/学会用消费者权益维护自己的利益/","/2025/03/09/寒窑赋/","/2026/07/26/自动化爬取Cookie服务搭建/","/2026/07/04/自动化跟踪表搭建/","/2025/04/01/论文写作资源网站/","/2025/06/22/设计素材网站/"],Bu="/about-home/json/site-meta.json",zu="https://exquisite-pegasus-15130d.netlify.app/.netlify/functions/twikoo";async function ku(){try{const i=await fetch(Bu,{credentials:"omit"});if(!i.ok)throw new Error("meta "+i.status);const t=await i.json();if(t&&typeof t.posts=="number"&&t.posts>0)return t.posts}catch(i){console.warn("[home-app] fetchPostCount failed:",i&&i.message)}return null}async function Hu(){try{const i=typeof AbortController<"u"?new AbortController:null,t=i?setTimeout(()=>i.abort(),6e3):null,e=await fetch(zu,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:"GET_COMMENT_COUNTS",version:"2.0.11",urls:Ou,lang:"zh-CN"}),signal:i?i.signal:void 0,credentials:"omit"});if(t&&clearTimeout(t),!e.ok)throw new Error("twikoo "+e.status);const n=await e.json();if(n&&n.code===0&&n.data){if(Array.isArray(n.data))return n.data.reduce((s,r)=>s+(Number(r)||0),0);if(typeof n.data=="object")return Object.values(n.data).reduce((s,r)=>s+(Number(r)||0),0)}}catch(i){console.warn("[home-app] fetchCommentCount failed（twikoo 云函数可能需升级）:",i&&i.message)}return null}async function Gu(i=8e3){const t=typeof AbortController<"u"?new AbortController:null;let e=null;try{t&&(e=setTimeout(()=>t.abort(),i));const n=await fetch(Fu,{method:"GET",signal:t?t.signal:void 0,credentials:"omit"});if(clearTimeout(e),!n.ok)throw new Error("stats upstream "+n.status);const s=await n.json();if(s.error)throw new Error(s.error);const r=s.todayPv||0,o=s.yesterdayPv||1,a=o>0?((r-o)/o*100).toFixed(1):"0.0",l=Number(a)>=0?"+":"",c=await ku(),h=await Hu();return xe.stats.layers=[{items:[{num:gn(s.widgetTotal),label:"累计访客",meta:"自统计以来的独立访客总数 · 来自 51la"},{num:gn(s.widgetMonth),label:"本月访客",meta:"本月累计访客数 · 来自 51la"}]},{items:[{num:gn(s.todayPv),label:"今日 PV",meta:"今日页面浏览量 · 来自 51la"},{num:gn(s.todayUv),label:"今日 UV",meta:"今日独立访客数 · 来自 51la"},{num:gn(s.predictPv),label:"预计今日 PV",meta:"51la 根据当前趋势预估的全天 PV"}]},{items:[{num:gn(s.yesterdayPv),label:"昨日 PV",meta:"昨日页面浏览量 · 来自 51la"},{num:gn(s.yesterdayUv),label:"昨日 UV",meta:"昨日独立访客数 · 来自 51la"},{num:l+a+"%",label:"日环比",meta:"今日 PV 较昨日变化 · 来自 51la"}]},{items:[{num:c!=null?gn(c):"8",label:"文章数",meta:"累计已发布文章（实时）"},{num:h!=null?gn(h):"0",label:"评论数",meta:"全站评论互动总量（twikoo）"}]},{items:[{num:"68%",label:"移动端占比",meta:"手机 / 平板访问占比"},{num:"54%",label:"搜索引擎来源",meta:"来自搜索的流量占比"}]}],xe.stats.layers}catch(n){return clearTimeout(e),console.warn("[home-app] fetchStats failed, keeping placeholder:",n&&n.message),xe.stats.layers}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qa="169",Vu=0,bl=1,Wu=2,jc=1,Qc=2,Sn=3,Kn=0,ke=1,ze=2,Xn=0,Xi=1,Ze=2,wl=3,Tl=4,Xu=5,li=100,qu=101,Yu=102,$u=103,Ku=104,Zu=200,Ju=201,ju=202,Qu=203,Qo=204,ta=205,tf=206,ef=207,nf=208,sf=209,rf=210,of=211,af=212,lf=213,cf=214,ea=0,na=1,ia=2,Ki=3,sa=4,ra=5,oa=6,aa=7,th=0,hf=1,uf=2,qn=0,ff=1,df=2,pf=3,mf=4,gf=5,vf=6,_f=7,eh=300,Zi=301,Ji=302,la=303,ca=304,Vr=306,ha=1e3,ui=1001,ua=1002,Je=1003,xf=1004,Gs=1005,nn=1006,ao=1007,fi=1008,Pn=1009,nh=1010,ih=1011,As=1012,Ya=1013,mi=1014,Tn=1015,Us=1016,$a=1017,Ka=1018,ji=1020,sh=35902,rh=1021,oh=1022,rn=1023,ah=1024,lh=1025,qi=1026,Qi=1027,ch=1028,Za=1029,hh=1030,Ja=1031,ja=1033,Er=33776,br=33777,wr=33778,Tr=33779,fa=35840,da=35841,pa=35842,ma=35843,ga=36196,va=37492,_a=37496,xa=37808,ya=37809,Ma=37810,Sa=37811,Ea=37812,ba=37813,wa=37814,Ta=37815,Aa=37816,Ca=37817,Ra=37818,Pa=37819,La=37820,Da=37821,Ar=36492,Ia=36494,Na=36495,uh=36283,Ua=36284,Fa=36285,Oa=36286,yf=3200,Mf=3201,fh=0,Sf=1,Vn="",Be="srgb",Jn="srgb-linear",Qa="display-p3",Wr="display-p3-linear",Ur="linear",ue="srgb",Fr="rec709",Or="p3",Si=7680,Al=519,Ef=512,bf=513,wf=514,dh=515,Tf=516,Af=517,Cf=518,Rf=519,Ba=35044,Cl="300 es",An=2e3,Br=2001;class ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cr=Math.PI/180,za=180/Math.PI;function Cn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function De(i,t,e){return Math.max(t,Math.min(e,i))}function Pf(i,t){return(i%t+t)%t}function lo(i,t,e){return(1-e)*i+e*t}function un(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ct{constructor(t=0,e=0){Ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,e,n,s,r,o,a,l,c){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],p=n[7],d=n[2],g=n[5],f=n[8],x=s[0],u=s[3],m=s[6],E=s[1],y=s[4],M=s[7],k=s[2],F=s[5],I=s[8];return r[0]=o*x+a*E+l*k,r[3]=o*u+a*y+l*F,r[6]=o*m+a*M+l*I,r[1]=c*x+h*E+p*k,r[4]=c*u+h*y+p*F,r[7]=c*m+h*M+p*I,r[2]=d*x+g*E+f*k,r[5]=d*u+g*y+f*F,r[8]=d*m+g*M+f*I,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],p=h*o-a*c,d=a*l-h*r,g=c*r-o*l,f=e*p+n*d+s*g;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/f;return t[0]=p*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=g*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(co.makeScale(t,e)),this}rotate(t){return this.premultiply(co.makeRotation(-t)),this}translate(t,e){return this.premultiply(co.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const co=new Jt;function ph(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Cs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lf(){const i=Cs("canvas");return i.style.display="block",i}const Rl={};function Rr(i){i in Rl||(Rl[i]=!0,console.warn(i))}function Df(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function If(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Nf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Pl=new Jt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ll=new Jt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),hs={[Jn]:{transfer:Ur,primaries:Fr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Be]:{transfer:ue,primaries:Fr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Wr]:{transfer:Ur,primaries:Or,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Ll),fromReference:i=>i.applyMatrix3(Pl)},[Qa]:{transfer:ue,primaries:Or,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ll),fromReference:i=>i.applyMatrix3(Pl).convertLinearToSRGB()}},Uf=new Set([Jn,Wr]),ne={enabled:!0,_workingColorSpace:Jn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Uf.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=hs[t].toReference,s=hs[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return hs[i].primaries},getTransfer:function(i){return i===Vn?Ur:hs[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(hs[t].luminanceCoefficients)}};function Yi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ho(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ei;class Ff{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ei===void 0&&(Ei=Cs("canvas")),Ei.width=t.width,Ei.height=t.height;const n=Ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Cs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Yi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yi(e[n]/255)*255):e[n]=Yi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Of=0;class mh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=Cn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(uo(s[o].image)):r.push(uo(s[o]))}else r=uo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function uo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ff.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bf=0;class Ie extends ns{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=ui,s=ui,r=nn,o=fi,a=rn,l=Pn,c=Ie.DEFAULT_ANISOTROPY,h=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Cn(),this.name="",this.source=new mh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==eh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ha:t.x=t.x-Math.floor(t.x);break;case ui:t.x=t.x<0?0:1;break;case ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ha:t.y=t.y-Math.floor(t.y);break;case ui:t.y=t.y<0?0:1;break;case ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=eh;Ie.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,s=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],p=l[8],d=l[1],g=l[5],f=l[9],x=l[2],u=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(p-x)<.01&&Math.abs(f-u)<.01){if(Math.abs(h+d)<.1&&Math.abs(p+x)<.1&&Math.abs(f+u)<.1&&Math.abs(c+g+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,M=(g+1)/2,k=(m+1)/2,F=(h+d)/4,I=(p+x)/4,q=(f+u)/4;return y>M&&y>k?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=F/n,r=I/n):M>k?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=F/s,r=q/s):k<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(k),n=I/r,s=q/r),this.set(n,s,r,e),this}let E=Math.sqrt((u-f)*(u-f)+(p-x)*(p-x)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(u-f)/E,this.y=(p-x)/E,this.z=(d-h)/E,this.w=Math.acos((c+g+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zf extends ns{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ie(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new mh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends zf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gh extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class kf extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class is{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],p=n[s+3];const d=r[o+0],g=r[o+1],f=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p;return}if(a===1){t[e+0]=d,t[e+1]=g,t[e+2]=f,t[e+3]=x;return}if(p!==x||l!==d||c!==g||h!==f){let u=1-a;const m=l*d+c*g+h*f+p*x,E=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const k=Math.sqrt(y),F=Math.atan2(k,m*E);u=Math.sin(u*F)/k,a=Math.sin(a*F)/k}const M=a*E;if(l=l*u+d*M,c=c*u+g*M,h=h*u+f*M,p=p*u+x*M,u===1-a){const k=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=k,c*=k,h*=k,p*=k}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],p=r[o],d=r[o+1],g=r[o+2],f=r[o+3];return t[e]=a*f+h*p+l*g-c*d,t[e+1]=l*f+h*d+c*p-a*g,t[e+2]=c*f+h*g+a*d-l*p,t[e+3]=h*f-a*p-l*d-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),p=a(r/2),d=l(n/2),g=l(s/2),f=l(r/2);switch(o){case"XYZ":this._x=d*h*p+c*g*f,this._y=c*g*p-d*h*f,this._z=c*h*f+d*g*p,this._w=c*h*p-d*g*f;break;case"YXZ":this._x=d*h*p+c*g*f,this._y=c*g*p-d*h*f,this._z=c*h*f-d*g*p,this._w=c*h*p+d*g*f;break;case"ZXY":this._x=d*h*p-c*g*f,this._y=c*g*p+d*h*f,this._z=c*h*f+d*g*p,this._w=c*h*p-d*g*f;break;case"ZYX":this._x=d*h*p-c*g*f,this._y=c*g*p+d*h*f,this._z=c*h*f-d*g*p,this._w=c*h*p+d*g*f;break;case"YZX":this._x=d*h*p+c*g*f,this._y=c*g*p+d*h*f,this._z=c*h*f-d*g*p,this._w=c*h*p-d*g*f;break;case"XZY":this._x=d*h*p-c*g*f,this._y=c*g*p-d*h*f,this._z=c*h*f+d*g*p,this._w=c*h*p+d*g*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],p=e[10],d=n+a+p;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(o-s)*g}else if(n>a&&n>p){const g=2*Math.sqrt(1+n-a-p);this._w=(h-l)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+c)/g}else if(a>p){const g=2*Math.sqrt(1+a-n-p);this._w=(r-c)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+p-n-a);this._w=(o-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const g=1-e;return this._w=g*o+e*this._w,this._x=g*n+e*this._x,this._y=g*s+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),p=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*p+this._w*d,this._x=n*p+this._x*d,this._y=s*p+this._y*d,this._z=r*p+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(t=0,e=0,n=0){Y.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Dl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Dl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+l*c+o*p-a*h,this.y=n+l*h+a*c-r*p,this.z=s+l*p+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return fo.copy(this).projectOnVector(t),this.sub(fo)}reflect(t){return this.sub(fo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fo=new Y,Dl=new is;class Fs{constructor(t=new Y(1/0,1/0,1/0),e=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qe):Qe.fromBufferAttribute(r,o),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vs.copy(n.boundingBox)),Vs.applyMatrix4(t.matrixWorld),this.union(Vs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(us),Ws.subVectors(this.max,us),bi.subVectors(t.a,us),wi.subVectors(t.b,us),Ti.subVectors(t.c,us),In.subVectors(wi,bi),Nn.subVectors(Ti,wi),ti.subVectors(bi,Ti);let e=[0,-In.z,In.y,0,-Nn.z,Nn.y,0,-ti.z,ti.y,In.z,0,-In.x,Nn.z,0,-Nn.x,ti.z,0,-ti.x,-In.y,In.x,0,-Nn.y,Nn.x,0,-ti.y,ti.x,0];return!po(e,bi,wi,Ti,Ws)||(e=[1,0,0,0,1,0,0,0,1],!po(e,bi,wi,Ti,Ws))?!1:(Xs.crossVectors(In,Nn),e=[Xs.x,Xs.y,Xs.z],po(e,bi,wi,Ti,Ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const vn=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Qe=new Y,Vs=new Fs,bi=new Y,wi=new Y,Ti=new Y,In=new Y,Nn=new Y,ti=new Y,us=new Y,Ws=new Y,Xs=new Y,ei=new Y;function po(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ei.fromArray(i,r);const a=s.x*Math.abs(ei.x)+s.y*Math.abs(ei.y)+s.z*Math.abs(ei.z),l=t.dot(ei),c=e.dot(ei),h=n.dot(ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Hf=new Fs,fs=new Y,mo=new Y;class Os{constructor(t=new Y,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Hf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fs.subVectors(t,this.center);const e=fs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(fs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(mo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fs.copy(t.center).add(mo)),this.expandByPoint(fs.copy(t.center).sub(mo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new Y,go=new Y,qs=new Y,Un=new Y,vo=new Y,Ys=new Y,_o=new Y;class Xr{constructor(t=new Y,e=new Y(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=_n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_n.copy(this.origin).addScaledVector(this.direction,e),_n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){go.copy(t).add(e).multiplyScalar(.5),qs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(go);const r=t.distanceTo(e)*.5,o=-this.direction.dot(qs),a=Un.dot(this.direction),l=-Un.dot(qs),c=Un.lengthSq(),h=Math.abs(1-o*o);let p,d,g,f;if(h>0)if(p=o*l-a,d=o*a-l,f=r*h,p>=0)if(d>=-f)if(d<=f){const x=1/h;p*=x,d*=x,g=p*(p+o*d+2*a)+d*(o*p+d+2*l)+c}else d=r,p=Math.max(0,-(o*d+a)),g=-p*p+d*(d+2*l)+c;else d=-r,p=Math.max(0,-(o*d+a)),g=-p*p+d*(d+2*l)+c;else d<=-f?(p=Math.max(0,-(-o*r+a)),d=p>0?-r:Math.min(Math.max(-r,-l),r),g=-p*p+d*(d+2*l)+c):d<=f?(p=0,d=Math.min(Math.max(-r,-l),r),g=d*(d+2*l)+c):(p=Math.max(0,-(o*r+a)),d=p>0?r:Math.min(Math.max(-r,-l),r),g=-p*p+d*(d+2*l)+c);else d=o>0?-r:r,p=Math.max(0,-(o*d+a)),g=-p*p+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(go).addScaledVector(qs,d),g}intersectSphere(t,e){_n.subVectors(t.center,this.origin);const n=_n.dot(this.direction),s=_n.dot(_n)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-d.z)*p,l=(t.max.z-d.z)*p):(a=(t.max.z-d.z)*p,l=(t.min.z-d.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,_n)!==null}intersectTriangle(t,e,n,s,r){vo.subVectors(e,t),Ys.subVectors(n,t),_o.crossVectors(vo,Ys);let o=this.direction.dot(_o),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Un.subVectors(this.origin,t);const l=a*this.direction.dot(Ys.crossVectors(Un,Ys));if(l<0)return null;const c=a*this.direction.dot(vo.cross(Un));if(c<0||l+c>o)return null;const h=-a*Un.dot(_o);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,o,a,l,c,h,p,d,g,f,x,u){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,p,d,g,f,x,u)}set(t,e,n,s,r,o,a,l,c,h,p,d,g,f,x,u){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=p,m[14]=d,m[3]=g,m[7]=f,m[11]=x,m[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ai.setFromMatrixColumn(t,0).length(),r=1/Ai.setFromMatrixColumn(t,1).length(),o=1/Ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){const d=o*h,g=o*p,f=a*h,x=a*p;e[0]=l*h,e[4]=-l*p,e[8]=c,e[1]=g+f*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=f+g*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,g=l*p,f=c*h,x=c*p;e[0]=d+x*a,e[4]=f*a-g,e[8]=o*c,e[1]=o*p,e[5]=o*h,e[9]=-a,e[2]=g*a-f,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,g=l*p,f=c*h,x=c*p;e[0]=d-x*a,e[4]=-o*p,e[8]=f+g*a,e[1]=g+f*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,g=o*p,f=a*h,x=a*p;e[0]=l*h,e[4]=f*c-g,e[8]=d*c+x,e[1]=l*p,e[5]=x*c+d,e[9]=g*c-f,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,g=o*c,f=a*l,x=a*c;e[0]=l*h,e[4]=x-d*p,e[8]=f*p+g,e[1]=p,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=g*p+f,e[10]=d-x*p}else if(t.order==="XZY"){const d=o*l,g=o*c,f=a*l,x=a*c;e[0]=l*h,e[4]=-p,e[8]=c*h,e[1]=d*p+x,e[5]=o*h,e[9]=g*p-f,e[2]=f*p-g,e[6]=a*h,e[10]=x*p+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Gf,t,Vf)}lookAt(t,e,n){const s=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Fn.crossVectors(n,He),Fn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Fn.crossVectors(n,He)),Fn.normalize(),$s.crossVectors(He,Fn),s[0]=Fn.x,s[4]=$s.x,s[8]=He.x,s[1]=Fn.y,s[5]=$s.y,s[9]=He.y,s[2]=Fn.z,s[6]=$s.z,s[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],p=n[5],d=n[9],g=n[13],f=n[2],x=n[6],u=n[10],m=n[14],E=n[3],y=n[7],M=n[11],k=n[15],F=s[0],I=s[4],q=s[8],st=s[12],v=s[1],_=s[5],L=s[9],P=s[13],w=s[2],C=s[6],T=s[10],O=s[14],A=s[3],R=s[7],z=s[11],B=s[15];return r[0]=o*F+a*v+l*w+c*A,r[4]=o*I+a*_+l*C+c*R,r[8]=o*q+a*L+l*T+c*z,r[12]=o*st+a*P+l*O+c*B,r[1]=h*F+p*v+d*w+g*A,r[5]=h*I+p*_+d*C+g*R,r[9]=h*q+p*L+d*T+g*z,r[13]=h*st+p*P+d*O+g*B,r[2]=f*F+x*v+u*w+m*A,r[6]=f*I+x*_+u*C+m*R,r[10]=f*q+x*L+u*T+m*z,r[14]=f*st+x*P+u*O+m*B,r[3]=E*F+y*v+M*w+k*A,r[7]=E*I+y*_+M*C+k*R,r[11]=E*q+y*L+M*T+k*z,r[15]=E*st+y*P+M*O+k*B,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],p=t[6],d=t[10],g=t[14],f=t[3],x=t[7],u=t[11],m=t[15];return f*(+r*l*p-s*c*p-r*a*d+n*c*d+s*a*g-n*l*g)+x*(+e*l*g-e*c*d+r*o*d-s*o*g+s*c*h-r*l*h)+u*(+e*c*p-e*a*g-r*o*p+n*o*g+r*a*h-n*c*h)+m*(-s*a*h-e*l*p+e*a*d+s*o*p-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],p=t[9],d=t[10],g=t[11],f=t[12],x=t[13],u=t[14],m=t[15],E=p*u*c-x*d*c+x*l*g-a*u*g-p*l*m+a*d*m,y=f*d*c-h*u*c-f*l*g+o*u*g+h*l*m-o*d*m,M=h*x*c-f*p*c+f*a*g-o*x*g-h*a*m+o*p*m,k=f*p*l-h*x*l-f*a*d+o*x*d+h*a*u-o*p*u,F=e*E+n*y+s*M+r*k;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/F;return t[0]=E*I,t[1]=(x*d*r-p*u*r-x*s*g+n*u*g+p*s*m-n*d*m)*I,t[2]=(a*u*r-x*l*r+x*s*c-n*u*c-a*s*m+n*l*m)*I,t[3]=(p*l*r-a*d*r-p*s*c+n*d*c+a*s*g-n*l*g)*I,t[4]=y*I,t[5]=(h*u*r-f*d*r+f*s*g-e*u*g-h*s*m+e*d*m)*I,t[6]=(f*l*r-o*u*r-f*s*c+e*u*c+o*s*m-e*l*m)*I,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*g+e*l*g)*I,t[8]=M*I,t[9]=(f*p*r-h*x*r-f*n*g+e*x*g+h*n*m-e*p*m)*I,t[10]=(o*x*r-f*a*r+f*n*c-e*x*c-o*n*m+e*a*m)*I,t[11]=(h*a*r-o*p*r-h*n*c+e*p*c+o*n*g-e*a*g)*I,t[12]=k*I,t[13]=(h*x*s-f*p*s+f*n*d-e*x*d-h*n*u+e*p*u)*I,t[14]=(f*a*s-o*x*s-f*n*l+e*x*l+o*n*u-e*a*u)*I,t[15]=(o*p*s-h*a*s+h*n*l-e*p*l-o*n*d+e*a*d)*I,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,p=a+a,d=r*c,g=r*h,f=r*p,x=o*h,u=o*p,m=a*p,E=l*c,y=l*h,M=l*p,k=n.x,F=n.y,I=n.z;return s[0]=(1-(x+m))*k,s[1]=(g+M)*k,s[2]=(f-y)*k,s[3]=0,s[4]=(g-M)*F,s[5]=(1-(d+m))*F,s[6]=(u+E)*F,s[7]=0,s[8]=(f+y)*I,s[9]=(u-E)*I,s[10]=(1-(d+x))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ai.set(s[0],s[1],s[2]).length();const o=Ai.set(s[4],s[5],s[6]).length(),a=Ai.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],tn.copy(this);const c=1/r,h=1/o,p=1/a;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=p,tn.elements[9]*=p,tn.elements[10]*=p,e.setFromRotationMatrix(tn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=An){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),p=(e+t)/(e-t),d=(n+s)/(n-s);let g,f;if(a===An)g=-(o+r)/(o-r),f=-2*o*r/(o-r);else if(a===Br)g=-o/(o-r),f=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=An){const l=this.elements,c=1/(e-t),h=1/(n-s),p=1/(o-r),d=(e+t)*c,g=(n+s)*h;let f,x;if(a===An)f=(o+r)*p,x=-2*p;else if(a===Br)f=r*p,x=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=x,l[14]=-f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ai=new Y,tn=new ie,Gf=new Y(0,0,0),Vf=new Y(1,1,1),Fn=new Y,$s=new Y,He=new Y,Il=new ie,Nl=new is;class fn{constructor(t=0,e=0,n=0,s=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],p=s[2],d=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(De(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-De(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(De(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Il.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Il,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Nl.setFromEuler(this),this.setFromQuaternion(Nl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class tl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Wf=0;const Ul=new Y,Ci=new is,xn=new ie,Ks=new Y,ds=new Y,Xf=new Y,qf=new is,Fl=new Y(1,0,0),Ol=new Y(0,1,0),Bl=new Y(0,0,1),zl={type:"added"},Yf={type:"removed"},Ri={type:"childadded",child:null},xo={type:"childremoved",child:null};class ye extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new Y,e=new fn,n=new is,s=new Y(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Jt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis(Fl,t)}rotateY(t){return this.rotateOnAxis(Ol,t)}rotateZ(t){return this.rotateOnAxis(Bl,t)}translateOnAxis(t,e){return Ul.copy(t).applyQuaternion(this.quaternion),this.position.add(Ul.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Fl,t)}translateY(t){return this.translateOnAxis(Ol,t)}translateZ(t){return this.translateOnAxis(Bl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ks.copy(t):Ks.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(ds,Ks,this.up):xn.lookAt(Ks,ds,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),Ci.setFromRotationMatrix(xn),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(zl),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yf),xo.child=t,this.dispatchEvent(xo),xo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(zl),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,t,Xf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,qf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),p=o(t.shapes),d=o(t.skeletons),g=o(t.animations),f=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),f.length>0&&(n.nodes=f)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ye.DEFAULT_UP=new Y(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new Y,yn=new Y,yo=new Y,Mn=new Y,Pi=new Y,Li=new Y,kl=new Y,Mo=new Y,So=new Y,Eo=new Y,bo=new oe,wo=new oe,To=new oe;class Ve{constructor(t=new Y,e=new Y,n=new Y){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),en.subVectors(t,e),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){en.subVectors(s,e),yn.subVectors(n,e),yo.subVectors(t,e);const o=en.dot(en),a=en.dot(yn),l=en.dot(yo),c=yn.dot(yn),h=yn.dot(yo),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;const d=1/p,g=(c*l-a*h)*d,f=(o*h-a*l)*d;return r.set(1-g-f,f,g)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mn.x),l.addScaledVector(o,Mn.y),l.addScaledVector(a,Mn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return bo.setScalar(0),wo.setScalar(0),To.setScalar(0),bo.fromBufferAttribute(t,e),wo.fromBufferAttribute(t,n),To.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(bo,r.x),o.addScaledVector(wo,r.y),o.addScaledVector(To,r.z),o}static isFrontFacing(t,e,n,s){return en.subVectors(n,e),yn.subVectors(t,e),en.cross(yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),en.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ve.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ve.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ve.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ve.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ve.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Pi.subVectors(s,n),Li.subVectors(r,n),Mo.subVectors(t,n);const l=Pi.dot(Mo),c=Li.dot(Mo);if(l<=0&&c<=0)return e.copy(n);So.subVectors(t,s);const h=Pi.dot(So),p=Li.dot(So);if(h>=0&&p<=h)return e.copy(s);const d=l*p-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Pi,o);Eo.subVectors(t,r);const g=Pi.dot(Eo),f=Li.dot(Eo);if(f>=0&&g<=f)return e.copy(r);const x=g*c-l*f;if(x<=0&&c>=0&&f<=0)return a=c/(c-f),e.copy(n).addScaledVector(Li,a);const u=h*f-g*p;if(u<=0&&p-h>=0&&g-f>=0)return kl.subVectors(r,s),a=(p-h)/(p-h+(g-f)),e.copy(s).addScaledVector(kl,a);const m=1/(u+x+d);return o=x*m,a=d*m,e.copy(n).addScaledVector(Pi,o).addScaledVector(Li,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Zs={h:0,s:0,l:0};function Ao(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ne.workingColorSpace){if(t=Pf(t,1),e=De(e,0,1),n=De(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ao(o,r,t+1/3),this.g=Ao(o,r,t),this.b=Ao(o,r,t-1/3)}return ne.toWorkingColorSpace(this,s),this}setStyle(t,e=Be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=vh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yi(t.r),this.g=Yi(t.g),this.b=Yi(t.b),this}copyLinearToSRGB(t){return this.r=ho(t.r),this.g=ho(t.g),this.b=ho(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return ne.fromWorkingColorSpace(Le.copy(this),t),Math.round(De(Le.r*255,0,255))*65536+Math.round(De(Le.g*255,0,255))*256+Math.round(De(Le.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Le.copy(this),e);const n=Le.r,s=Le.g,r=Le.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const p=o-a;switch(c=h<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=Be){ne.fromWorkingColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,s=Le.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(Zs);const n=lo(On.h,Zs.h,e),s=lo(On.s,Zs.s,e),r=lo(On.l,Zs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new Yt;Yt.NAMES=vh;let $f=0;class jn extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=Xi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qo,this.blendDst=ta,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=Ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qo&&(n.blendSrc=this.blendSrc),this.blendDst!==ta&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ki&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class on extends jn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=th,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new Y,Js=new Ct;class Ne{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ba,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Js.fromBufferAttribute(this,e),Js.applyMatrix3(t),this.setXY(e,Js.x,Js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ba&&(t.usage=this.usage),t}}class _h extends Ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xh extends Ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends Ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Kf=0;const Ye=new ie,Co=new ye,Di=new Y,Ge=new Fs,ps=new Fs,Te=new Y;class de extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ph(t)?xh:_h)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Co.lookAt(t),Co.updateMatrix(),this.applyMatrix4(Co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ce(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Os);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ps.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Ge.min,ps.min),Ge.expandByPoint(Te),Te.addVectors(Ge.max,ps.max),Ge.expandByPoint(Te)):(Ge.expandByPoint(ps.min),Ge.expandByPoint(ps.max))}Ge.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Te.fromBufferAttribute(a,c),l&&(Di.fromBufferAttribute(t,c),Te.add(Di)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let q=0;q<n.count;q++)a[q]=new Y,l[q]=new Y;const c=new Y,h=new Y,p=new Y,d=new Ct,g=new Ct,f=new Ct,x=new Y,u=new Y;function m(q,st,v){c.fromBufferAttribute(n,q),h.fromBufferAttribute(n,st),p.fromBufferAttribute(n,v),d.fromBufferAttribute(r,q),g.fromBufferAttribute(r,st),f.fromBufferAttribute(r,v),h.sub(c),p.sub(c),g.sub(d),f.sub(d);const _=1/(g.x*f.y-f.x*g.y);isFinite(_)&&(x.copy(h).multiplyScalar(f.y).addScaledVector(p,-g.y).multiplyScalar(_),u.copy(p).multiplyScalar(g.x).addScaledVector(h,-f.x).multiplyScalar(_),a[q].add(x),a[st].add(x),a[v].add(x),l[q].add(u),l[st].add(u),l[v].add(u))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let q=0,st=E.length;q<st;++q){const v=E[q],_=v.start,L=v.count;for(let P=_,w=_+L;P<w;P+=3)m(t.getX(P+0),t.getX(P+1),t.getX(P+2))}const y=new Y,M=new Y,k=new Y,F=new Y;function I(q){k.fromBufferAttribute(s,q),F.copy(k);const st=a[q];y.copy(st),y.sub(k.multiplyScalar(k.dot(st))).normalize(),M.crossVectors(F,st);const _=M.dot(l[q])<0?-1:1;o.setXYZW(q,y.x,y.y,y.z,_)}for(let q=0,st=E.length;q<st;++q){const v=E[q],_=v.start,L=v.count;for(let P=_,w=_+L;P<w;P+=3)I(t.getX(P+0)),I(t.getX(P+1)),I(t.getX(P+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);const s=new Y,r=new Y,o=new Y,a=new Y,l=new Y,c=new Y,h=new Y,p=new Y;if(t)for(let d=0,g=t.count;d<g;d+=3){const f=t.getX(d+0),x=t.getX(d+1),u=t.getX(d+2);s.fromBufferAttribute(e,f),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,u),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),a.fromBufferAttribute(n,f),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,u),a.add(h),l.add(h),c.add(h),n.setXYZ(f,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(u,c.x,c.y,c.z)}else for(let d=0,g=e.count;d<g;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,p=a.normalized,d=new c.constructor(l.length*h);let g=0,f=0;for(let x=0,u=l.length;x<u;x++){a.isInterleavedBufferAttribute?g=l[x]*a.data.stride+a.offset:g=l[x]*h;for(let m=0;m<h;m++)d[f++]=c[g++]}return new Ne(d,h,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new de,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,p=c.length;h<p;h++){const d=c[h],g=t(d,n);l.push(g)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let p=0,d=c.length;p<d;p++){const g=c[p];h.push(g.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],p=r[c];for(let d=0,g=p.length;d<g;d++)h.push(p[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hl=new ie,ni=new Xr,js=new Os,Gl=new Y,Qs=new Y,tr=new Y,er=new Y,Ro=new Y,nr=new Y,Vl=new Y,ir=new Y;class fe extends ye{constructor(t=new de,e=new on){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],p=r[l];h!==0&&(Ro.fromBufferAttribute(p,t),o?nr.addScaledVector(Ro,h):nr.addScaledVector(Ro.sub(e),h))}e.add(nr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),js.copy(n.boundingSphere),js.applyMatrix4(r),ni.copy(t.ray).recast(t.near),!(js.containsPoint(ni.origin)===!1&&(ni.intersectSphere(js,Gl)===null||ni.origin.distanceToSquared(Gl)>(t.far-t.near)**2))&&(Hl.copy(r).invert(),ni.copy(t.ray).applyMatrix4(Hl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ni)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,d=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let f=0,x=d.length;f<x;f++){const u=d[f],m=o[u.materialIndex],E=Math.max(u.start,g.start),y=Math.min(a.count,Math.min(u.start+u.count,g.start+g.count));for(let M=E,k=y;M<k;M+=3){const F=a.getX(M),I=a.getX(M+1),q=a.getX(M+2);s=sr(this,m,t,n,c,h,p,F,I,q),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const f=Math.max(0,g.start),x=Math.min(a.count,g.start+g.count);for(let u=f,m=x;u<m;u+=3){const E=a.getX(u),y=a.getX(u+1),M=a.getX(u+2);s=sr(this,o,t,n,c,h,p,E,y,M),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let f=0,x=d.length;f<x;f++){const u=d[f],m=o[u.materialIndex],E=Math.max(u.start,g.start),y=Math.min(l.count,Math.min(u.start+u.count,g.start+g.count));for(let M=E,k=y;M<k;M+=3){const F=M,I=M+1,q=M+2;s=sr(this,m,t,n,c,h,p,F,I,q),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const f=Math.max(0,g.start),x=Math.min(l.count,g.start+g.count);for(let u=f,m=x;u<m;u+=3){const E=u,y=u+1,M=u+2;s=sr(this,o,t,n,c,h,p,E,y,M),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}}}function Zf(i,t,e,n,s,r,o,a){let l;if(t.side===ke?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Kn,a),l===null)return null;ir.copy(a),ir.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ir);return c<e.near||c>e.far?null:{distance:c,point:ir.clone(),object:i}}function sr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Qs),i.getVertexPosition(l,tr),i.getVertexPosition(c,er);const h=Zf(i,t,e,n,Qs,tr,er,Vl);if(h){const p=new Y;Ve.getBarycoord(Vl,Qs,tr,er,p),s&&(h.uv=Ve.getInterpolatedAttribute(s,a,l,c,p,new Ct)),r&&(h.uv1=Ve.getInterpolatedAttribute(r,a,l,c,p,new Ct)),o&&(h.normal=Ve.getInterpolatedAttribute(o,a,l,c,p,new Y),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new Y,materialIndex:0};Ve.getNormal(Qs,tr,er,d.normal),h.face=d,h.barycoord=p}return h}class Yn extends de{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],p=[];let d=0,g=0;f("z","y","x",-1,-1,n,e,t,o,r,0),f("z","y","x",1,-1,n,e,-t,o,r,1),f("x","z","y",1,1,t,n,e,s,o,2),f("x","z","y",1,-1,t,n,-e,s,o,3),f("x","y","z",1,-1,t,e,n,s,r,4),f("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(p,2));function f(x,u,m,E,y,M,k,F,I,q,st){const v=M/I,_=k/q,L=M/2,P=k/2,w=F/2,C=I+1,T=q+1;let O=0,A=0;const R=new Y;for(let z=0;z<T;z++){const B=z*_-P;for(let $=0;$<C;$++){const X=$*v-L;R[x]=X*E,R[u]=B*y,R[m]=w,c.push(R.x,R.y,R.z),R[x]=0,R[u]=0,R[m]=F>0?1:-1,h.push(R.x,R.y,R.z),p.push($/I),p.push(1-z/q),O+=1}}for(let z=0;z<q;z++)for(let B=0;B<I;B++){const $=d+B+C*z,X=d+B+C*(z+1),H=d+(B+1)+C*(z+1),K=d+(B+1)+C*z;l.push($,X,K),l.push(X,H,K),A+=6}a.addGroup(g,A,st),g+=A,d+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ts(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Oe(i){const t={};for(let e=0;e<i.length;e++){const n=ts(i[e]);for(const s in n)t[s]=n[s]}return t}function Jf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function yh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const jf={clone:ts,merge:Oe};var Qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,td=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends jn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qf,this.fragmentShader=td,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ts(t.uniforms),this.uniformsGroups=Jf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Mh extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=An}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new Y,Wl=new Ct,Xl=new Ct;class Ce extends Mh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=za*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return za*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z)}getViewSize(t,e){return this.getViewBounds(t,Wl,Xl),e.subVectors(Xl,Wl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Cr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ii=-90,Ni=1;class ed extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ce(Ii,Ni,t,e);s.layers=this.layers,this.add(s);const r=new Ce(Ii,Ni,t,e);r.layers=this.layers,this.add(r);const o=new Ce(Ii,Ni,t,e);o.layers=this.layers,this.add(o);const a=new Ce(Ii,Ni,t,e);a.layers=this.layers,this.add(a);const l=new Ce(Ii,Ni,t,e);l.layers=this.layers,this.add(l);const c=new Ce(Ii,Ni,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,p=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(p,d,g),t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class Sh extends Ie{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Zi,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nd extends gi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Sh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Yn(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:ts(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:Xn});r.uniforms.tEquirect.value=e;const o=new fe(s,r),a=e.minFilter;return e.minFilter===fi&&(e.minFilter=nn),new ed(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Po=new Y,id=new Y,sd=new Jt;class oi{constructor(t=new Y(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Po.subVectors(n,e).cross(id.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Po),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||sd.getNormalMatrix(t),s=this.coplanarPoint(Po).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new Os,rr=new Y;class el{constructor(t=new oi,e=new oi,n=new oi,s=new oi,r=new oi,o=new oi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],p=s[6],d=s[7],g=s[8],f=s[9],x=s[10],u=s[11],m=s[12],E=s[13],y=s[14],M=s[15];if(n[0].setComponents(l-r,d-c,u-g,M-m).normalize(),n[1].setComponents(l+r,d+c,u+g,M+m).normalize(),n[2].setComponents(l+o,d+h,u+f,M+E).normalize(),n[3].setComponents(l-o,d-h,u-f,M-E).normalize(),n[4].setComponents(l-a,d-p,u-x,M-y).normalize(),e===An)n[5].setComponents(l+a,d+p,u+x,M+y).normalize();else if(e===Br)n[5].setComponents(a,p,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(t){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(rr.x=s.normal.x>0?t.max.x:t.min.x,rr.y=s.normal.y>0?t.max.y:t.min.y,rr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(rr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Eh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function rd(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,p=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,c){const h=l.array,p=l.updateRanges;if(i.bindBuffer(c,a),p.length===0)i.bufferSubData(c,0,h);else{p.sort((g,f)=>g.start-f.start);let d=0;for(let g=1;g<p.length;g++){const f=p[d],x=p[g];x.start<=f.start+f.count+1?f.count=Math.max(f.count,x.start+x.count-f.start):(++d,p[d]=x)}p.length=d+1;for(let g=0,f=p.length;g<f;g++){const x=p[g];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class vi extends de{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,p=t/a,d=e/l,g=[],f=[],x=[],u=[];for(let m=0;m<h;m++){const E=m*d-o;for(let y=0;y<c;y++){const M=y*p-r;f.push(M,-E,0),x.push(0,0,1),u.push(y/a),u.push(1-m/l)}}for(let m=0;m<l;m++)for(let E=0;E<a;E++){const y=E+c*m,M=E+c*(m+1),k=E+1+c*(m+1),F=E+1+c*m;g.push(y,M,F),g.push(M,k,F)}this.setIndex(g),this.setAttribute("position",new ce(f,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.width,t.height,t.widthSegments,t.heightSegments)}}var od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ad=`#ifdef USE_ALPHAHASH
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
#endif`,ld=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ud=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fd=`#ifdef USE_AOMAP
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
#endif`,dd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pd=`#ifdef USE_BATCHING
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
#endif`,md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_d=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xd=`#ifdef USE_IRIDESCENCE
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
#endif`,yd=`#ifdef USE_BUMPMAP
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
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Td=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Rd=`#define PI 3.141592653589793
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
} // validated`,Pd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ld=`vec3 transformedNormal = objectNormal;
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
#endif`,Dd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Id=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ud=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Od=`
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
}`,Bd=`#ifdef USE_ENVMAP
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
#endif`,zd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kd=`#ifdef USE_ENVMAP
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
#endif`,Hd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gd=`#ifdef USE_ENVMAP
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
#endif`,Vd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yd=`#ifdef USE_GRADIENTMAP
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
}`,$d=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jd=`uniform bool receiveShadow;
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
#endif`,jd=`#ifdef USE_ENVMAP
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
#endif`,Qd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,t0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,e0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,n0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,i0=`PhysicalMaterial material;
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
#endif`,s0=`struct PhysicalMaterial {
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
}`,r0=`
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
#endif`,o0=`#if defined( RE_IndirectDiffuse )
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
#endif`,a0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,l0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,c0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,u0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,f0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,p0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,m0=`#if defined( USE_POINTS_UV )
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
#endif`,g0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,v0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,x0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,y0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`#ifdef USE_MORPHTARGETS
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
#endif`,S0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,E0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,b0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,C0=`#ifdef USE_NORMALMAP
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
#endif`,R0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,P0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,L0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,D0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,I0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,U0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,O0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,B0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,z0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,k0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,G0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,V0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,W0=`float getShadowMask() {
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
}`,X0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,q0=`#ifdef USE_SKINNING
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
#endif`,Y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$0=`#ifdef USE_SKINNING
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
#endif`,K0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,J0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,j0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Q0=`#ifdef USE_TRANSMISSION
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
#endif`,tp=`#ifdef USE_TRANSMISSION
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
#endif`,ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,op=`uniform sampler2D t2D;
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
}`,ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`#include <common>
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
}`,fp=`#if DEPTH_PACKING == 3200
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
}`,dp=`#define DISTANCE
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
}`,pp=`#define DISTANCE
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
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`uniform float scale;
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
}`,_p=`uniform vec3 diffuse;
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
}`,xp=`#include <common>
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
}`,yp=`uniform vec3 diffuse;
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
}`,Mp=`#define LAMBERT
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
}`,Sp=`#define LAMBERT
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
}`,Ep=`#define MATCAP
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
}`,bp=`#define MATCAP
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
}`,wp=`#define NORMAL
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
}`,Tp=`#define NORMAL
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
}`,Ap=`#define PHONG
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
}`,Cp=`#define PHONG
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
}`,Rp=`#define STANDARD
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
}`,Pp=`#define STANDARD
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
}`,Lp=`#define TOON
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
}`,Dp=`#define TOON
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
}`,Ip=`uniform float size;
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
}`,Np=`uniform vec3 diffuse;
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
}`,Up=`#include <common>
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
}`,Fp=`uniform vec3 color;
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
}`,Op=`uniform float rotation;
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
}`,Bp=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:od,alphahash_pars_fragment:ad,alphamap_fragment:ld,alphamap_pars_fragment:cd,alphatest_fragment:hd,alphatest_pars_fragment:ud,aomap_fragment:fd,aomap_pars_fragment:dd,batching_pars_vertex:pd,batching_vertex:md,begin_vertex:gd,beginnormal_vertex:vd,bsdfs:_d,iridescence_fragment:xd,bumpmap_pars_fragment:yd,clipping_planes_fragment:Md,clipping_planes_pars_fragment:Sd,clipping_planes_pars_vertex:Ed,clipping_planes_vertex:bd,color_fragment:wd,color_pars_fragment:Td,color_pars_vertex:Ad,color_vertex:Cd,common:Rd,cube_uv_reflection_fragment:Pd,defaultnormal_vertex:Ld,displacementmap_pars_vertex:Dd,displacementmap_vertex:Id,emissivemap_fragment:Nd,emissivemap_pars_fragment:Ud,colorspace_fragment:Fd,colorspace_pars_fragment:Od,envmap_fragment:Bd,envmap_common_pars_fragment:zd,envmap_pars_fragment:kd,envmap_pars_vertex:Hd,envmap_physical_pars_fragment:jd,envmap_vertex:Gd,fog_vertex:Vd,fog_pars_vertex:Wd,fog_fragment:Xd,fog_pars_fragment:qd,gradientmap_pars_fragment:Yd,lightmap_pars_fragment:$d,lights_lambert_fragment:Kd,lights_lambert_pars_fragment:Zd,lights_pars_begin:Jd,lights_toon_fragment:Qd,lights_toon_pars_fragment:t0,lights_phong_fragment:e0,lights_phong_pars_fragment:n0,lights_physical_fragment:i0,lights_physical_pars_fragment:s0,lights_fragment_begin:r0,lights_fragment_maps:o0,lights_fragment_end:a0,logdepthbuf_fragment:l0,logdepthbuf_pars_fragment:c0,logdepthbuf_pars_vertex:h0,logdepthbuf_vertex:u0,map_fragment:f0,map_pars_fragment:d0,map_particle_fragment:p0,map_particle_pars_fragment:m0,metalnessmap_fragment:g0,metalnessmap_pars_fragment:v0,morphinstance_vertex:_0,morphcolor_vertex:x0,morphnormal_vertex:y0,morphtarget_pars_vertex:M0,morphtarget_vertex:S0,normal_fragment_begin:E0,normal_fragment_maps:b0,normal_pars_fragment:w0,normal_pars_vertex:T0,normal_vertex:A0,normalmap_pars_fragment:C0,clearcoat_normal_fragment_begin:R0,clearcoat_normal_fragment_maps:P0,clearcoat_pars_fragment:L0,iridescence_pars_fragment:D0,opaque_fragment:I0,packing:N0,premultiplied_alpha_fragment:U0,project_vertex:F0,dithering_fragment:O0,dithering_pars_fragment:B0,roughnessmap_fragment:z0,roughnessmap_pars_fragment:k0,shadowmap_pars_fragment:H0,shadowmap_pars_vertex:G0,shadowmap_vertex:V0,shadowmask_pars_fragment:W0,skinbase_vertex:X0,skinning_pars_vertex:q0,skinning_vertex:Y0,skinnormal_vertex:$0,specularmap_fragment:K0,specularmap_pars_fragment:Z0,tonemapping_fragment:J0,tonemapping_pars_fragment:j0,transmission_fragment:Q0,transmission_pars_fragment:tp,uv_pars_fragment:ep,uv_pars_vertex:np,uv_vertex:ip,worldpos_vertex:sp,background_vert:rp,background_frag:op,backgroundCube_vert:ap,backgroundCube_frag:lp,cube_vert:cp,cube_frag:hp,depth_vert:up,depth_frag:fp,distanceRGBA_vert:dp,distanceRGBA_frag:pp,equirect_vert:mp,equirect_frag:gp,linedashed_vert:vp,linedashed_frag:_p,meshbasic_vert:xp,meshbasic_frag:yp,meshlambert_vert:Mp,meshlambert_frag:Sp,meshmatcap_vert:Ep,meshmatcap_frag:bp,meshnormal_vert:wp,meshnormal_frag:Tp,meshphong_vert:Ap,meshphong_frag:Cp,meshphysical_vert:Rp,meshphysical_frag:Pp,meshtoon_vert:Lp,meshtoon_frag:Dp,points_vert:Ip,points_frag:Np,shadow_vert:Up,shadow_frag:Fp,sprite_vert:Op,sprite_frag:Bp},Dt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},hn={basic:{uniforms:Oe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Oe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Oe([Dt.common,Dt.specularmap,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,Dt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Oe([Dt.common,Dt.envmap,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.roughnessmap,Dt.metalnessmap,Dt.fog,Dt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Oe([Dt.common,Dt.aomap,Dt.lightmap,Dt.emissivemap,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.gradientmap,Dt.fog,Dt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Oe([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,Dt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Oe([Dt.points,Dt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Oe([Dt.common,Dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Oe([Dt.common,Dt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Oe([Dt.common,Dt.bumpmap,Dt.normalmap,Dt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Oe([Dt.sprite,Dt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Oe([Dt.common,Dt.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Oe([Dt.lights,Dt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};hn.physical={uniforms:Oe([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const or={r:0,b:0,g:0},si=new fn,zp=new ie;function kp(i,t,e,n,s,r,o){const a=new Yt(0);let l=r===!0?0:1,c,h,p=null,d=0,g=null;function f(E){let y=E.isScene===!0?E.background:null;return y&&y.isTexture&&(y=(E.backgroundBlurriness>0?e:t).get(y)),y}function x(E){let y=!1;const M=f(E);M===null?m(a,l):M&&M.isColor&&(m(M,1),y=!0);const k=i.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,o):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function u(E,y){const M=f(y);M&&(M.isCubeTexture||M.mapping===Vr)?(h===void 0&&(h=new fe(new Yn(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:ts(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(k,F,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),si.copy(y.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(zp.makeRotationFromEuler(si)),h.material.toneMapped=ne.getTransfer(M.colorSpace)!==ue,(p!==M||d!==M.version||g!==i.toneMapping)&&(h.material.needsUpdate=!0,p=M,d=M.version,g=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new fe(new vi(2,2),new Zn({name:"BackgroundMaterial",uniforms:ts(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ne.getTransfer(M.colorSpace)!==ue,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(p!==M||d!==M.version||g!==i.toneMapping)&&(c.material.needsUpdate=!0,p=M,d=M.version,g=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function m(E,y){E.getRGB(or,yh(i)),n.buffers.color.setClear(or.r,or.g,or.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(E,y=1){a.set(E),l=y,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,m(a,l)},render:x,addToRenderList:u}}function Hp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(v,_,L,P,w){let C=!1;const T=p(P,L,_);r!==T&&(r=T,c(r.object)),C=g(v,P,L,w),C&&f(v,P,L,w),w!==null&&t.update(w,i.ELEMENT_ARRAY_BUFFER),(C||o)&&(o=!1,M(v,_,L,P),w!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(w).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function p(v,_,L){const P=L.wireframe===!0;let w=n[v.id];w===void 0&&(w={},n[v.id]=w);let C=w[_.id];C===void 0&&(C={},w[_.id]=C);let T=C[P];return T===void 0&&(T=d(l()),C[P]=T),T}function d(v){const _=[],L=[],P=[];for(let w=0;w<e;w++)_[w]=0,L[w]=0,P[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:L,attributeDivisors:P,object:v,attributes:{},index:null}}function g(v,_,L,P){const w=r.attributes,C=_.attributes;let T=0;const O=L.getAttributes();for(const A in O)if(O[A].location>=0){const z=w[A];let B=C[A];if(B===void 0&&(A==="instanceMatrix"&&v.instanceMatrix&&(B=v.instanceMatrix),A==="instanceColor"&&v.instanceColor&&(B=v.instanceColor)),z===void 0||z.attribute!==B||B&&z.data!==B.data)return!0;T++}return r.attributesNum!==T||r.index!==P}function f(v,_,L,P){const w={},C=_.attributes;let T=0;const O=L.getAttributes();for(const A in O)if(O[A].location>=0){let z=C[A];z===void 0&&(A==="instanceMatrix"&&v.instanceMatrix&&(z=v.instanceMatrix),A==="instanceColor"&&v.instanceColor&&(z=v.instanceColor));const B={};B.attribute=z,z&&z.data&&(B.data=z.data),w[A]=B,T++}r.attributes=w,r.attributesNum=T,r.index=P}function x(){const v=r.newAttributes;for(let _=0,L=v.length;_<L;_++)v[_]=0}function u(v){m(v,0)}function m(v,_){const L=r.newAttributes,P=r.enabledAttributes,w=r.attributeDivisors;L[v]=1,P[v]===0&&(i.enableVertexAttribArray(v),P[v]=1),w[v]!==_&&(i.vertexAttribDivisor(v,_),w[v]=_)}function E(){const v=r.newAttributes,_=r.enabledAttributes;for(let L=0,P=_.length;L<P;L++)_[L]!==v[L]&&(i.disableVertexAttribArray(L),_[L]=0)}function y(v,_,L,P,w,C,T){T===!0?i.vertexAttribIPointer(v,_,L,w,C):i.vertexAttribPointer(v,_,L,P,w,C)}function M(v,_,L,P){x();const w=P.attributes,C=L.getAttributes(),T=_.defaultAttributeValues;for(const O in C){const A=C[O];if(A.location>=0){let R=w[O];if(R===void 0&&(O==="instanceMatrix"&&v.instanceMatrix&&(R=v.instanceMatrix),O==="instanceColor"&&v.instanceColor&&(R=v.instanceColor)),R!==void 0){const z=R.normalized,B=R.itemSize,$=t.get(R);if($===void 0)continue;const X=$.buffer,H=$.type,K=$.bytesPerElement,V=H===i.INT||H===i.UNSIGNED_INT||R.gpuType===Ya;if(R.isInterleavedBufferAttribute){const j=R.data,ut=j.stride,gt=R.offset;if(j.isInstancedInterleavedBuffer){for(let xt=0;xt<A.locationSize;xt++)m(A.location+xt,j.meshPerAttribute);v.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let xt=0;xt<A.locationSize;xt++)u(A.location+xt);i.bindBuffer(i.ARRAY_BUFFER,X);for(let xt=0;xt<A.locationSize;xt++)y(A.location+xt,B/A.locationSize,H,z,ut*K,(gt+B/A.locationSize*xt)*K,V)}else{if(R.isInstancedBufferAttribute){for(let j=0;j<A.locationSize;j++)m(A.location+j,R.meshPerAttribute);v.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let j=0;j<A.locationSize;j++)u(A.location+j);i.bindBuffer(i.ARRAY_BUFFER,X);for(let j=0;j<A.locationSize;j++)y(A.location+j,B/A.locationSize,H,z,B*K,B/A.locationSize*j*K,V)}}else if(T!==void 0){const z=T[O];if(z!==void 0)switch(z.length){case 2:i.vertexAttrib2fv(A.location,z);break;case 3:i.vertexAttrib3fv(A.location,z);break;case 4:i.vertexAttrib4fv(A.location,z);break;default:i.vertexAttrib1fv(A.location,z)}}}}E()}function k(){q();for(const v in n){const _=n[v];for(const L in _){const P=_[L];for(const w in P)h(P[w].object),delete P[w];delete _[L]}delete n[v]}}function F(v){if(n[v.id]===void 0)return;const _=n[v.id];for(const L in _){const P=_[L];for(const w in P)h(P[w].object),delete P[w];delete _[L]}delete n[v.id]}function I(v){for(const _ in n){const L=n[_];if(L[v.id]===void 0)continue;const P=L[v.id];for(const w in P)h(P[w].object),delete P[w];delete L[v.id]}}function q(){st(),o=!0,r!==s&&(r=s,c(r.object))}function st(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:q,resetDefaultState:st,dispose:k,releaseStatesOfGeometry:F,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:u,disableUnusedAttributes:E}}function Gp(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,p){p!==0&&(i.drawArraysInstanced(n,c,h,p),e.update(h,n,p))}function a(c,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,p);let g=0;for(let f=0;f<p;f++)g+=h[f];e.update(g,n,1)}function l(c,h,p,d){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<c.length;f++)o(c[f],h[f],d[f]);else{g.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,p);let f=0;for(let x=0;x<p;x++)f+=h[x];for(let x=0;x<d.length;x++)e.update(f,n,d[x])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Vp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==rn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const q=I===Us&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Pn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Tn&&!q)}function l(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const p=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(d===!0){const I=t.get("EXT_clip_control");I.clipControlEXT(I.LOWER_LEFT_EXT,I.ZERO_TO_ONE_EXT)}const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),k=f>0,F=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:p,reverseDepthBuffer:d,maxTextures:g,maxVertexTextures:f,maxTextureSize:x,maxCubemapSize:u,maxAttributes:m,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:k,maxSamples:F}}function Wp(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new oi,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){const g=p.length!==0||d||n!==0||s;return s=d,n=p.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,d){e=h(p,d,0)},this.setState=function(p,d,g){const f=p.clippingPlanes,x=p.clipIntersection,u=p.clipShadows,m=i.get(p);if(!s||f===null||f.length===0||r&&!u)r?h(null):c();else{const E=r?0:n,y=E*4;let M=m.clippingState||null;l.value=M,M=h(f,d,y,g);for(let k=0;k!==y;++k)M[k]=e[k];m.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,d,g,f){const x=p!==null?p.length:0;let u=null;if(x!==0){if(u=l.value,f!==!0||u===null){const m=g+x*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(u===null||u.length<m)&&(u=new Float32Array(m));for(let y=0,M=g;y!==x;++y,M+=4)o.copy(p[y]).applyMatrix4(E,a),o.normal.toArray(u,M),u[M+3]=o.constant}l.value=u,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,u}}function Xp(i){let t=new WeakMap;function e(o,a){return a===la?o.mapping=Zi:a===ca&&(o.mapping=Ji),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===la||a===ca)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new nd(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class bh extends Mh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Gi=4,ql=[.125,.215,.35,.446,.526,.582],ci=20,Lo=new bh,Yl=new Yt;let Do=null,Io=0,No=0,Uo=!1;const ai=(1+Math.sqrt(5))/2,Ui=1/ai,$l=[new Y(-ai,Ui,0),new Y(ai,Ui,0),new Y(-Ui,0,ai),new Y(Ui,0,ai),new Y(0,ai,-Ui),new Y(0,ai,Ui),new Y(-1,1,-1),new Y(1,1,-1),new Y(-1,1,1),new Y(1,1,1)];class Kl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Do=this._renderer.getRenderTarget(),Io=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Do,Io,No),this._renderer.xr.enabled=Uo,t.scissorTest=!1,ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zi||t.mapping===Ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Do=this._renderer.getRenderTarget(),Io=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:Us,format:rn,colorSpace:Jn,depthBuffer:!1},s=Zl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qp(r)),this._blurMaterial=Yp(r,t,e)}return s}_compileMaterial(t){const e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,Lo)}_sceneToCubeUV(t,e,n,s){const a=new Ce(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,d=h.toneMapping;h.getClearColor(Yl),h.toneMapping=qn,h.autoClear=!1;const g=new on({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),f=new fe(new Yn,g);let x=!1;const u=t.background;u?u.isColor&&(g.color.copy(u),t.background=null,x=!0):(g.color.copy(Yl),x=!0);for(let m=0;m<6;m++){const E=m%3;E===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):E===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const y=this._cubeSize;ar(s,E*y,m>2?y:0,y,y),h.setRenderTarget(s),x&&h.render(f,a),h.render(t,a)}f.geometry.dispose(),f.material.dispose(),h.toneMapping=d,h.autoClear=p,t.background=u}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Zi||t.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=jl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Lo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=$l[(s-r-1)%$l.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,p=new fe(this._lodPlanes[s],c),d=c.uniforms,g=this._sizeLods[n]-1,f=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*ci-1),x=r/f,u=isFinite(r)?1+Math.floor(h*x):ci;u>ci&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${ci}`);const m=[];let E=0;for(let I=0;I<ci;++I){const q=I/x,st=Math.exp(-q*q/2);m.push(st),I===0?E+=st:I<u&&(E+=2*st)}for(let I=0;I<m.length;I++)m[I]=m[I]/E;d.envMap.value=t.texture,d.samples.value=u,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=f,d.mipInt.value=y-n;const M=this._sizeLods[s],k=3*M*(s>y-Gi?s-y+Gi:0),F=4*(this._cubeSize-M);ar(e,k,F,3*M,2*M),l.setRenderTarget(e),l.render(p,Lo)}}function qp(i){const t=[],e=[],n=[];let s=i;const r=i-Gi+1+ql.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Gi?l=ql[o-i+Gi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,p=1+c,d=[h,h,p,h,p,p,h,h,p,p,h,p],g=6,f=6,x=3,u=2,m=1,E=new Float32Array(x*f*g),y=new Float32Array(u*f*g),M=new Float32Array(m*f*g);for(let F=0;F<g;F++){const I=F%3*2/3-1,q=F>2?0:-1,st=[I,q,0,I+2/3,q,0,I+2/3,q+1,0,I,q,0,I+2/3,q+1,0,I,q+1,0];E.set(st,x*f*F),y.set(d,u*f*F);const v=[F,F,F,F,F,F];M.set(v,m*f*F)}const k=new de;k.setAttribute("position",new Ne(E,x)),k.setAttribute("uv",new Ne(y,u)),k.setAttribute("faceIndex",new Ne(M,m)),t.push(k),s>Gi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Zl(i,t,e){const n=new gi(i,t,e);return n.texture.mapping=Vr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Yp(i,t,e){const n=new Float32Array(ci),s=new Y(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:nl(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Jl(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nl(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function jl(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function nl(){return`

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
	`}function $p(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===la||l===ca,h=l===Zi||l===Ji;if(c||h){let p=t.get(a);const d=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Kl(i)),p=c?e.fromEquirectangular(a,p):e.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),p.texture;if(p!==void 0)return p.texture;{const g=a.image;return c&&g&&g.height>0||h&&g&&s(g)?(e===null&&(e=new Kl(i)),p=c?e.fromEquirectangular(a):e.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Kp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Zp(i,t,e,n){const s={},r=new WeakMap;function o(p){const d=p.target;d.index!==null&&t.remove(d.index);for(const f in d.attributes)t.remove(d.attributes[f]);for(const f in d.morphAttributes){const x=d.morphAttributes[f];for(let u=0,m=x.length;u<m;u++)t.remove(x[u])}d.removeEventListener("dispose",o),delete s[d.id];const g=r.get(d);g&&(t.remove(g),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(p,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(p){const d=p.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER);const g=p.morphAttributes;for(const f in g){const x=g[f];for(let u=0,m=x.length;u<m;u++)t.update(x[u],i.ARRAY_BUFFER)}}function c(p){const d=[],g=p.index,f=p.attributes.position;let x=0;if(g!==null){const E=g.array;x=g.version;for(let y=0,M=E.length;y<M;y+=3){const k=E[y+0],F=E[y+1],I=E[y+2];d.push(k,F,F,I,I,k)}}else if(f!==void 0){const E=f.array;x=f.version;for(let y=0,M=E.length/3-1;y<M;y+=3){const k=y+0,F=y+1,I=y+2;d.push(k,F,F,I,I,k)}}else return;const u=new(ph(d)?xh:_h)(d,1);u.version=x;const m=r.get(p);m&&t.remove(m),r.set(p,u)}function h(p){const d=r.get(p);if(d){const g=p.index;g!==null&&d.version<g.version&&c(p)}else c(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:h}}function Jp(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,g){i.drawElements(n,g,r,d*o),e.update(g,n,1)}function c(d,g,f){f!==0&&(i.drawElementsInstanced(n,g,r,d*o,f),e.update(g,n,f))}function h(d,g,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,g,0,r,d,0,f);let u=0;for(let m=0;m<f;m++)u+=g[m];e.update(u,n,1)}function p(d,g,f,x){if(f===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let m=0;m<d.length;m++)c(d[m]/o,g[m],x[m]);else{u.multiDrawElementsInstancedWEBGL(n,g,0,r,d,0,x,0,f);let m=0;for(let E=0;E<f;E++)m+=g[E];for(let E=0;E<x.length;E++)e.update(m,n,x[E])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function jp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Qp(i,t,e){const n=new WeakMap,s=new oe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==p){let v=function(){q.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var g=v;d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,u=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let M=0;f===!0&&(M=1),x===!0&&(M=2),u===!0&&(M=3);let k=a.attributes.position.count*M,F=1;k>t.maxTextureSize&&(F=Math.ceil(k/t.maxTextureSize),k=t.maxTextureSize);const I=new Float32Array(k*F*4*p),q=new gh(I,k,F,p);q.type=Tn,q.needsUpdate=!0;const st=M*4;for(let _=0;_<p;_++){const L=m[_],P=E[_],w=y[_],C=k*F*4*_;for(let T=0;T<L.count;T++){const O=T*st;f===!0&&(s.fromBufferAttribute(L,T),I[C+O+0]=s.x,I[C+O+1]=s.y,I[C+O+2]=s.z,I[C+O+3]=0),x===!0&&(s.fromBufferAttribute(P,T),I[C+O+4]=s.x,I[C+O+5]=s.y,I[C+O+6]=s.z,I[C+O+7]=0),u===!0&&(s.fromBufferAttribute(w,T),I[C+O+8]=s.x,I[C+O+9]=s.y,I[C+O+10]=s.z,I[C+O+11]=w.itemSize===4?s.w:1)}}d={count:p,texture:q,size:new Ct(k,F)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let u=0;u<c.length;u++)f+=c[u];const x=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function tm(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,p=t.get(l,h);if(s.get(p)!==c&&(t.update(p),s.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return p}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class wh extends Ie{constructor(t,e,n,s,r,o,a,l,c,h=qi){if(h!==qi&&h!==Qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===qi&&(n=mi),n===void 0&&h===Qi&&(n=ji),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=l!==void 0?l:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Th=new Ie,Ql=new wh(1,1),Ah=new gh,Ch=new kf,Rh=new Sh,tc=[],ec=[],nc=new Float32Array(16),ic=new Float32Array(9),sc=new Float32Array(4);function ss(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=tc[s];if(r===void 0&&(r=new Float32Array(s),tc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function we(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function qr(i,t){let e=ec[t];e===void 0&&(e=new Int32Array(t),ec[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function em(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),we(e,t)}}function im(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),we(e,t)}}function sm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),we(e,t)}}function rm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(be(e,n))return;sc.set(n),i.uniformMatrix2fv(this.addr,!1,sc),we(e,n)}}function om(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(be(e,n))return;ic.set(n),i.uniformMatrix3fv(this.addr,!1,ic),we(e,n)}}function am(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(be(e,n))return;nc.set(n),i.uniformMatrix4fv(this.addr,!1,nc),we(e,n)}}function lm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),we(e,t)}}function hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),we(e,t)}}function um(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),we(e,t)}}function fm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),we(e,t)}}function pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),we(e,t)}}function mm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),we(e,t)}}function gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ql.compareFunction=dh,r=Ql):r=Th,e.setTexture2D(t||r,s)}function vm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ch,s)}function _m(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Rh,s)}function xm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ah,s)}function ym(i){switch(i){case 5126:return em;case 35664:return nm;case 35665:return im;case 35666:return sm;case 35674:return rm;case 35675:return om;case 35676:return am;case 5124:case 35670:return lm;case 35667:case 35671:return cm;case 35668:case 35672:return hm;case 35669:case 35673:return um;case 5125:return fm;case 36294:return dm;case 36295:return pm;case 36296:return mm;case 35678:case 36198:case 36298:case 36306:case 35682:return gm;case 35679:case 36299:case 36307:return vm;case 35680:case 36300:case 36308:case 36293:return _m;case 36289:case 36303:case 36311:case 36292:return xm}}function Mm(i,t){i.uniform1fv(this.addr,t)}function Sm(i,t){const e=ss(t,this.size,2);i.uniform2fv(this.addr,e)}function Em(i,t){const e=ss(t,this.size,3);i.uniform3fv(this.addr,e)}function bm(i,t){const e=ss(t,this.size,4);i.uniform4fv(this.addr,e)}function wm(i,t){const e=ss(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Tm(i,t){const e=ss(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Am(i,t){const e=ss(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Cm(i,t){i.uniform1iv(this.addr,t)}function Rm(i,t){i.uniform2iv(this.addr,t)}function Pm(i,t){i.uniform3iv(this.addr,t)}function Lm(i,t){i.uniform4iv(this.addr,t)}function Dm(i,t){i.uniform1uiv(this.addr,t)}function Im(i,t){i.uniform2uiv(this.addr,t)}function Nm(i,t){i.uniform3uiv(this.addr,t)}function Um(i,t){i.uniform4uiv(this.addr,t)}function Fm(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Th,r[o])}function Om(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ch,r[o])}function Bm(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Rh,r[o])}function zm(i,t,e){const n=this.cache,s=t.length,r=qr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ah,r[o])}function km(i){switch(i){case 5126:return Mm;case 35664:return Sm;case 35665:return Em;case 35666:return bm;case 35674:return wm;case 35675:return Tm;case 35676:return Am;case 5124:case 35670:return Cm;case 35667:case 35671:return Rm;case 35668:case 35672:return Pm;case 35669:case 35673:return Lm;case 5125:return Dm;case 36294:return Im;case 36295:return Nm;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return Om;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return zm}}class Hm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ym(e.type)}}class Gm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=km(e.type)}}class Vm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Fo=/(\w+)(\])?(\[|\.)?/g;function rc(i,t){i.seq.push(t),i.map[t.id]=t}function Wm(i,t,e){const n=i.name,s=n.length;for(Fo.lastIndex=0;;){const r=Fo.exec(n),o=Fo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){rc(e,c===void 0?new Hm(a,i,t):new Gm(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new Vm(a),rc(e,p)),e=p}}}class Pr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Wm(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function oc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Xm=37297;let qm=0;function Ym(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function $m(i){const t=ne.getPrimaries(ne.workingColorSpace),e=ne.getPrimaries(i);let n;switch(t===e?n="":t===Or&&e===Fr?n="LinearDisplayP3ToLinearSRGB":t===Fr&&e===Or&&(n="LinearSRGBToLinearDisplayP3"),i){case Jn:case Wr:return[n,"LinearTransferOETF"];case Be:case Qa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ac(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ym(i.getShaderSource(t),o)}else return s}function Km(i,t){const e=$m(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Zm(i,t){let e;switch(t){case ff:e="Linear";break;case df:e="Reinhard";break;case pf:e="Cineon";break;case mf:e="ACESFilmic";break;case vf:e="AgX";break;case _f:e="Neutral";break;case gf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const lr=new Y;function Jm(){ne.getLuminanceCoefficients(lr);const i=lr.x.toFixed(4),t=lr.y.toFixed(4),e=lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function Qm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function t1(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ms(i){return i!==""}function lc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function cc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const e1=/^[ \t]*#include +<([\w\d./]+)>/gm;function ka(i){return i.replace(e1,i1)}const n1=new Map;function i1(i,t){let e=Zt[t];if(e===void 0){const n=n1.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ka(e)}const s1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hc(i){return i.replace(s1,r1)}function r1(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function o1(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===jc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Qc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(t="SHADOWMAP_TYPE_VSM"),t}function a1(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Zi:case Ji:t="ENVMAP_TYPE_CUBE";break;case Vr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function l1(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ji:t="ENVMAP_MODE_REFRACTION";break}return t}function c1(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case th:t="ENVMAP_BLENDING_MULTIPLY";break;case hf:t="ENVMAP_BLENDING_MIX";break;case uf:t="ENVMAP_BLENDING_ADD";break}return t}function h1(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function u1(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=o1(e),c=a1(e),h=l1(e),p=c1(e),d=h1(e),g=jm(e),f=Qm(r),x=s.createProgram();let u,m,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Ms).join(`
`),u.length>0&&(u+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Ms).join(`
`),m.length>0&&(m+=`
`)):(u=[uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),m=[uc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qn?"#define TONE_MAPPING":"",e.toneMapping!==qn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==qn?Zm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Km("linearToOutputTexel",e.outputColorSpace),Jm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ms).join(`
`)),o=ka(o),o=lc(o,e),o=cc(o,e),a=ka(a),a=lc(a,e),a=cc(a,e),o=hc(o),a=hc(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,u=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,m=["#define varying in",e.glslVersion===Cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=E+u+o,M=E+m+a,k=oc(s,s.VERTEX_SHADER,y),F=oc(s,s.FRAGMENT_SHADER,M);s.attachShader(x,k),s.attachShader(x,F),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function I(_){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(x).trim(),P=s.getShaderInfoLog(k).trim(),w=s.getShaderInfoLog(F).trim();let C=!0,T=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(C=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,k,F);else{const O=ac(s,k,"vertex"),A=ac(s,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+_.name+`
Material Type: `+_.type+`

Program Info Log: `+L+`
`+O+`
`+A)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(P===""||w==="")&&(T=!1);T&&(_.diagnostics={runnable:C,programLog:L,vertexShader:{log:P,prefix:u},fragmentShader:{log:w,prefix:m}})}s.deleteShader(k),s.deleteShader(F),q=new Pr(s,x),st=t1(s,x)}let q;this.getUniforms=function(){return q===void 0&&I(this),q};let st;this.getAttributes=function(){return st===void 0&&I(this),st};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(x,Xm)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=qm++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=k,this.fragmentShader=F,this}let f1=0;class d1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new p1(t),e.set(t,n)),n}}class p1{constructor(t){this.id=f1++,this.code=t,this.usedTimes=0}}function m1(i,t,e,n,s,r,o){const a=new tl,l=new d1,c=new Set,h=[],p=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,g=s.vertexTextures;let f=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,_,L,P,w){const C=P.fog,T=w.geometry,O=v.isMeshStandardMaterial?P.environment:null,A=(v.isMeshStandardMaterial?e:t).get(v.envMap||O),R=A&&A.mapping===Vr?A.image.height:null,z=x[v.type];v.precision!==null&&(f=s.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const B=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,$=B!==void 0?B.length:0;let X=0;T.morphAttributes.position!==void 0&&(X=1),T.morphAttributes.normal!==void 0&&(X=2),T.morphAttributes.color!==void 0&&(X=3);let H,K,V,j;if(z){const Re=hn[z];H=Re.vertexShader,K=Re.fragmentShader}else H=v.vertexShader,K=v.fragmentShader,l.update(v),V=l.getVertexShaderID(v),j=l.getFragmentShaderID(v);const ut=i.getRenderTarget(),gt=w.isInstancedMesh===!0,xt=w.isBatchedMesh===!0,At=!!v.map,nt=!!v.matcap,N=!!A,dt=!!v.aoMap,pt=!!v.lightMap,St=!!v.bumpMap,Tt=!!v.normalMap,Ft=!!v.displacementMap,vt=!!v.emissiveMap,U=!!v.metalnessMap,S=!!v.roughnessMap,tt=v.anisotropy>0,ft=v.clearcoat>0,_t=v.dispersion>0,ht=v.iridescence>0,wt=v.sheen>0,mt=v.transmission>0,Rt=tt&&!!v.anisotropyMap,$t=ft&&!!v.clearcoatMap,Et=ft&&!!v.clearcoatNormalMap,Lt=ft&&!!v.clearcoatRoughnessMap,kt=ht&&!!v.iridescenceMap,Ht=ht&&!!v.iridescenceThicknessMap,It=wt&&!!v.sheenColorMap,Kt=wt&&!!v.sheenRoughnessMap,Vt=!!v.specularMap,te=!!v.specularColorMap,J=!!v.specularIntensityMap,Pt=mt&&!!v.transmissionMap,ct=mt&&!!v.thicknessMap,yt=!!v.gradientMap,Nt=!!v.alphaMap,Ut=v.alphaTest>0,jt=!!v.alphaHash,he=!!v.extensions;let ae=qn;v.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(ae=i.toneMapping);const Qt={shaderID:z,shaderType:v.type,shaderName:v.name,vertexShader:H,fragmentShader:K,defines:v.defines,customVertexShaderID:V,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:xt,batchingColor:xt&&w._colorsTexture!==null,instancing:gt,instancingColor:gt&&w.instanceColor!==null,instancingMorph:gt&&w.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:ut===null?i.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:Jn,alphaToCoverage:!!v.alphaToCoverage,map:At,matcap:nt,envMap:N,envMapMode:N&&A.mapping,envMapCubeUVHeight:R,aoMap:dt,lightMap:pt,bumpMap:St,normalMap:Tt,displacementMap:g&&Ft,emissiveMap:vt,normalMapObjectSpace:Tt&&v.normalMapType===Sf,normalMapTangentSpace:Tt&&v.normalMapType===fh,metalnessMap:U,roughnessMap:S,anisotropy:tt,anisotropyMap:Rt,clearcoat:ft,clearcoatMap:$t,clearcoatNormalMap:Et,clearcoatRoughnessMap:Lt,dispersion:_t,iridescence:ht,iridescenceMap:kt,iridescenceThicknessMap:Ht,sheen:wt,sheenColorMap:It,sheenRoughnessMap:Kt,specularMap:Vt,specularColorMap:te,specularIntensityMap:J,transmission:mt,transmissionMap:Pt,thicknessMap:ct,gradientMap:yt,opaque:v.transparent===!1&&v.blending===Xi&&v.alphaToCoverage===!1,alphaMap:Nt,alphaTest:Ut,alphaHash:jt,combine:v.combine,mapUv:At&&u(v.map.channel),aoMapUv:dt&&u(v.aoMap.channel),lightMapUv:pt&&u(v.lightMap.channel),bumpMapUv:St&&u(v.bumpMap.channel),normalMapUv:Tt&&u(v.normalMap.channel),displacementMapUv:Ft&&u(v.displacementMap.channel),emissiveMapUv:vt&&u(v.emissiveMap.channel),metalnessMapUv:U&&u(v.metalnessMap.channel),roughnessMapUv:S&&u(v.roughnessMap.channel),anisotropyMapUv:Rt&&u(v.anisotropyMap.channel),clearcoatMapUv:$t&&u(v.clearcoatMap.channel),clearcoatNormalMapUv:Et&&u(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Lt&&u(v.clearcoatRoughnessMap.channel),iridescenceMapUv:kt&&u(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ht&&u(v.iridescenceThicknessMap.channel),sheenColorMapUv:It&&u(v.sheenColorMap.channel),sheenRoughnessMapUv:Kt&&u(v.sheenRoughnessMap.channel),specularMapUv:Vt&&u(v.specularMap.channel),specularColorMapUv:te&&u(v.specularColorMap.channel),specularIntensityMapUv:J&&u(v.specularIntensityMap.channel),transmissionMapUv:Pt&&u(v.transmissionMap.channel),thicknessMapUv:ct&&u(v.thicknessMap.channel),alphaMapUv:Nt&&u(v.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(Tt||tt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!T.attributes.uv&&(At||Nt),fog:!!C,useFog:v.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:d,skinning:w.isSkinnedMesh===!0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:X,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:At&&v.map.isVideoTexture===!0&&ne.getTransfer(v.map.colorSpace)===ue,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===ze,flipSided:v.side===ke,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:he&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&v.extensions.multiDraw===!0||xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Qt.vertexUv1s=c.has(1),Qt.vertexUv2s=c.has(2),Qt.vertexUv3s=c.has(3),c.clear(),Qt}function E(v){const _=[];if(v.shaderID?_.push(v.shaderID):(_.push(v.customVertexShaderID),_.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)_.push(L),_.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(y(_,v),M(_,v),_.push(i.outputColorSpace)),_.push(v.customProgramCacheKey),_.join()}function y(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)}function M(v,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.alphaToCoverage&&a.enable(20),v.push(a.mask)}function k(v){const _=x[v.type];let L;if(_){const P=hn[_];L=jf.clone(P.uniforms)}else L=v.uniforms;return L}function F(v,_){let L;for(let P=0,w=h.length;P<w;P++){const C=h[P];if(C.cacheKey===_){L=C,++L.usedTimes;break}}return L===void 0&&(L=new u1(i,_,v,r),h.push(L)),L}function I(v){if(--v.usedTimes===0){const _=h.indexOf(v);h[_]=h[h.length-1],h.pop(),v.destroy()}}function q(v){l.remove(v)}function st(){l.dispose()}return{getParameters:m,getProgramCacheKey:E,getUniforms:k,acquireProgram:F,releaseProgram:I,releaseShaderCache:q,programs:h,dispose:st}}function g1(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function v1(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function fc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p,d,g,f,x,u){let m=i[t];return m===void 0?(m={id:p.id,object:p,geometry:d,material:g,groupOrder:f,renderOrder:p.renderOrder,z:x,group:u},i[t]=m):(m.id=p.id,m.object=p,m.geometry=d,m.material=g,m.groupOrder=f,m.renderOrder=p.renderOrder,m.z=x,m.group=u),t++,m}function a(p,d,g,f,x,u){const m=o(p,d,g,f,x,u);g.transmission>0?n.push(m):g.transparent===!0?s.push(m):e.push(m)}function l(p,d,g,f,x,u){const m=o(p,d,g,f,x,u);g.transmission>0?n.unshift(m):g.transparent===!0?s.unshift(m):e.unshift(m)}function c(p,d){e.length>1&&e.sort(p||v1),n.length>1&&n.sort(d||fc),s.length>1&&s.sort(d||fc)}function h(){for(let p=t,d=i.length;p<d;p++){const g=i[p];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function _1(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new dc,i.set(n,[o])):s>=r.length?(o=new dc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function x1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Y,color:new Yt};break;case"SpotLight":e={position:new Y,direction:new Y,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Y,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Y,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return i[t.id]=e,e}}}function y1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let M1=0;function S1(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function E1(i){const t=new x1,e=y1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Y);const s=new Y,r=new ie,o=new ie;function a(c){let h=0,p=0,d=0;for(let st=0;st<9;st++)n.probe[st].set(0,0,0);let g=0,f=0,x=0,u=0,m=0,E=0,y=0,M=0,k=0,F=0,I=0;c.sort(S1);for(let st=0,v=c.length;st<v;st++){const _=c[st],L=_.color,P=_.intensity,w=_.distance,C=_.shadow&&_.shadow.map?_.shadow.map.texture:null;if(_.isAmbientLight)h+=L.r*P,p+=L.g*P,d+=L.b*P;else if(_.isLightProbe){for(let T=0;T<9;T++)n.probe[T].addScaledVector(_.sh.coefficients[T],P);I++}else if(_.isDirectionalLight){const T=t.get(_);if(T.color.copy(_.color).multiplyScalar(_.intensity),_.castShadow){const O=_.shadow,A=e.get(_);A.shadowIntensity=O.intensity,A.shadowBias=O.bias,A.shadowNormalBias=O.normalBias,A.shadowRadius=O.radius,A.shadowMapSize=O.mapSize,n.directionalShadow[g]=A,n.directionalShadowMap[g]=C,n.directionalShadowMatrix[g]=_.shadow.matrix,E++}n.directional[g]=T,g++}else if(_.isSpotLight){const T=t.get(_);T.position.setFromMatrixPosition(_.matrixWorld),T.color.copy(L).multiplyScalar(P),T.distance=w,T.coneCos=Math.cos(_.angle),T.penumbraCos=Math.cos(_.angle*(1-_.penumbra)),T.decay=_.decay,n.spot[x]=T;const O=_.shadow;if(_.map&&(n.spotLightMap[k]=_.map,k++,O.updateMatrices(_),_.castShadow&&F++),n.spotLightMatrix[x]=O.matrix,_.castShadow){const A=e.get(_);A.shadowIntensity=O.intensity,A.shadowBias=O.bias,A.shadowNormalBias=O.normalBias,A.shadowRadius=O.radius,A.shadowMapSize=O.mapSize,n.spotShadow[x]=A,n.spotShadowMap[x]=C,M++}x++}else if(_.isRectAreaLight){const T=t.get(_);T.color.copy(L).multiplyScalar(P),T.halfWidth.set(_.width*.5,0,0),T.halfHeight.set(0,_.height*.5,0),n.rectArea[u]=T,u++}else if(_.isPointLight){const T=t.get(_);if(T.color.copy(_.color).multiplyScalar(_.intensity),T.distance=_.distance,T.decay=_.decay,_.castShadow){const O=_.shadow,A=e.get(_);A.shadowIntensity=O.intensity,A.shadowBias=O.bias,A.shadowNormalBias=O.normalBias,A.shadowRadius=O.radius,A.shadowMapSize=O.mapSize,A.shadowCameraNear=O.camera.near,A.shadowCameraFar=O.camera.far,n.pointShadow[f]=A,n.pointShadowMap[f]=C,n.pointShadowMatrix[f]=_.shadow.matrix,y++}n.point[f]=T,f++}else if(_.isHemisphereLight){const T=t.get(_);T.skyColor.copy(_.color).multiplyScalar(P),T.groundColor.copy(_.groundColor).multiplyScalar(P),n.hemi[m]=T,m++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Dt.LTC_FLOAT_1,n.rectAreaLTC2=Dt.LTC_FLOAT_2):(n.rectAreaLTC1=Dt.LTC_HALF_1,n.rectAreaLTC2=Dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=d;const q=n.hash;(q.directionalLength!==g||q.pointLength!==f||q.spotLength!==x||q.rectAreaLength!==u||q.hemiLength!==m||q.numDirectionalShadows!==E||q.numPointShadows!==y||q.numSpotShadows!==M||q.numSpotMaps!==k||q.numLightProbes!==I)&&(n.directional.length=g,n.spot.length=x,n.rectArea.length=u,n.point.length=f,n.hemi.length=m,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+k-F,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=I,q.directionalLength=g,q.pointLength=f,q.spotLength=x,q.rectAreaLength=u,q.hemiLength=m,q.numDirectionalShadows=E,q.numPointShadows=y,q.numSpotShadows=M,q.numSpotMaps=k,q.numLightProbes=I,n.version=M1++)}function l(c,h){let p=0,d=0,g=0,f=0,x=0;const u=h.matrixWorldInverse;for(let m=0,E=c.length;m<E;m++){const y=c[m];if(y.isDirectionalLight){const M=n.directional[p];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),p++}else if(y.isSpotLight){const M=n.spot[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(u),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),g++}else if(y.isRectAreaLight){const M=n.rectArea[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(u),o.identity(),r.copy(y.matrixWorld),r.premultiply(u),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),f++}else if(y.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(u),d++}else if(y.isHemisphereLight){const M=n.hemi[x];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(u),x++}}}return{setup:a,setupView:l,state:n}}function pc(i){const t=new E1(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function b1(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new pc(i),t.set(s,[a])):r>=o.length?(a=new pc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class w1 extends jn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class T1 extends jn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const A1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C1=`uniform sampler2D shadow_pass;
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
}`;function R1(i,t,e){let n=new el;const s=new Ct,r=new Ct,o=new oe,a=new w1({depthPacking:Mf}),l=new T1,c={},h=e.maxTextureSize,p={[Kn]:ke,[ke]:Kn,[ze]:ze},d=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:A1,fragmentShader:C1}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const f=new de;f.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new fe(f,d),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jc;let m=this.type;this.render=function(F,I,q){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||F.length===0)return;const st=i.getRenderTarget(),v=i.getActiveCubeFace(),_=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Xn),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const P=m!==Sn&&this.type===Sn,w=m===Sn&&this.type!==Sn;for(let C=0,T=F.length;C<T;C++){const O=F[C],A=O.shadow;if(A===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;s.copy(A.mapSize);const R=A.getFrameExtents();if(s.multiply(R),r.copy(A.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/R.x),s.x=r.x*R.x,A.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/R.y),s.y=r.y*R.y,A.mapSize.y=r.y)),A.map===null||P===!0||w===!0){const B=this.type!==Sn?{minFilter:Je,magFilter:Je}:{};A.map!==null&&A.map.dispose(),A.map=new gi(s.x,s.y,B),A.map.texture.name=O.name+".shadowMap",A.camera.updateProjectionMatrix()}i.setRenderTarget(A.map),i.clear();const z=A.getViewportCount();for(let B=0;B<z;B++){const $=A.getViewport(B);o.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),L.viewport(o),A.updateMatrices(O,B),n=A.getFrustum(),M(I,q,A.camera,O,this.type)}A.isPointLightShadow!==!0&&this.type===Sn&&E(A,q),A.needsUpdate=!1}m=this.type,u.needsUpdate=!1,i.setRenderTarget(st,v,_)};function E(F,I){const q=t.update(x);d.defines.VSM_SAMPLES!==F.blurSamples&&(d.defines.VSM_SAMPLES=F.blurSamples,g.defines.VSM_SAMPLES=F.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new gi(s.x,s.y)),d.uniforms.shadow_pass.value=F.map.texture,d.uniforms.resolution.value=F.mapSize,d.uniforms.radius.value=F.radius,i.setRenderTarget(F.mapPass),i.clear(),i.renderBufferDirect(I,null,q,d,x,null),g.uniforms.shadow_pass.value=F.mapPass.texture,g.uniforms.resolution.value=F.mapSize,g.uniforms.radius.value=F.radius,i.setRenderTarget(F.map),i.clear(),i.renderBufferDirect(I,null,q,g,x,null)}function y(F,I,q,st){let v=null;const _=q.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(_!==void 0)v=_;else if(v=q.isPointLight===!0?l:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const L=v.uuid,P=I.uuid;let w=c[L];w===void 0&&(w={},c[L]=w);let C=w[P];C===void 0&&(C=v.clone(),w[P]=C,I.addEventListener("dispose",k)),v=C}if(v.visible=I.visible,v.wireframe=I.wireframe,st===Sn?v.side=I.shadowSide!==null?I.shadowSide:I.side:v.side=I.shadowSide!==null?I.shadowSide:p[I.side],v.alphaMap=I.alphaMap,v.alphaTest=I.alphaTest,v.map=I.map,v.clipShadows=I.clipShadows,v.clippingPlanes=I.clippingPlanes,v.clipIntersection=I.clipIntersection,v.displacementMap=I.displacementMap,v.displacementScale=I.displacementScale,v.displacementBias=I.displacementBias,v.wireframeLinewidth=I.wireframeLinewidth,v.linewidth=I.linewidth,q.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const L=i.properties.get(v);L.light=q}return v}function M(F,I,q,st,v){if(F.visible===!1)return;if(F.layers.test(I.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&v===Sn)&&(!F.frustumCulled||n.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,F.matrixWorld);const P=t.update(F),w=F.material;if(Array.isArray(w)){const C=P.groups;for(let T=0,O=C.length;T<O;T++){const A=C[T],R=w[A.materialIndex];if(R&&R.visible){const z=y(F,R,st,v);F.onBeforeShadow(i,F,I,q,P,z,A),i.renderBufferDirect(q,null,P,z,F,A),F.onAfterShadow(i,F,I,q,P,z,A)}}}else if(w.visible){const C=y(F,w,st,v);F.onBeforeShadow(i,F,I,q,P,C,null),i.renderBufferDirect(q,null,P,C,F,null),F.onAfterShadow(i,F,I,q,P,C,null)}}const L=F.children;for(let P=0,w=L.length;P<w;P++)M(L[P],I,q,st,v)}function k(F){F.target.removeEventListener("dispose",k);for(const q in c){const st=c[q],v=F.target.uuid;v in st&&(st[v].dispose(),delete st[v])}}}const P1={[ea]:na,[ia]:oa,[sa]:aa,[Ki]:ra,[na]:ea,[oa]:ia,[aa]:sa,[ra]:Ki};function L1(i){function t(){let J=!1;const Pt=new oe;let ct=null;const yt=new oe(0,0,0,0);return{setMask:function(Nt){ct!==Nt&&!J&&(i.colorMask(Nt,Nt,Nt,Nt),ct=Nt)},setLocked:function(Nt){J=Nt},setClear:function(Nt,Ut,jt,he,ae){ae===!0&&(Nt*=he,Ut*=he,jt*=he),Pt.set(Nt,Ut,jt,he),yt.equals(Pt)===!1&&(i.clearColor(Nt,Ut,jt,he),yt.copy(Pt))},reset:function(){J=!1,ct=null,yt.set(-1,0,0,0)}}}function e(){let J=!1,Pt=!1,ct=null,yt=null,Nt=null;return{setReversed:function(Ut){Pt=Ut},setTest:function(Ut){Ut?V(i.DEPTH_TEST):j(i.DEPTH_TEST)},setMask:function(Ut){ct!==Ut&&!J&&(i.depthMask(Ut),ct=Ut)},setFunc:function(Ut){if(Pt&&(Ut=P1[Ut]),yt!==Ut){switch(Ut){case ea:i.depthFunc(i.NEVER);break;case na:i.depthFunc(i.ALWAYS);break;case ia:i.depthFunc(i.LESS);break;case Ki:i.depthFunc(i.LEQUAL);break;case sa:i.depthFunc(i.EQUAL);break;case ra:i.depthFunc(i.GEQUAL);break;case oa:i.depthFunc(i.GREATER);break;case aa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=Ut}},setLocked:function(Ut){J=Ut},setClear:function(Ut){Nt!==Ut&&(i.clearDepth(Ut),Nt=Ut)},reset:function(){J=!1,ct=null,yt=null,Nt=null}}}function n(){let J=!1,Pt=null,ct=null,yt=null,Nt=null,Ut=null,jt=null,he=null,ae=null;return{setTest:function(Qt){J||(Qt?V(i.STENCIL_TEST):j(i.STENCIL_TEST))},setMask:function(Qt){Pt!==Qt&&!J&&(i.stencilMask(Qt),Pt=Qt)},setFunc:function(Qt,Re,We){(ct!==Qt||yt!==Re||Nt!==We)&&(i.stencilFunc(Qt,Re,We),ct=Qt,yt=Re,Nt=We)},setOp:function(Qt,Re,We){(Ut!==Qt||jt!==Re||he!==We)&&(i.stencilOp(Qt,Re,We),Ut=Qt,jt=Re,he=We)},setLocked:function(Qt){J=Qt},setClear:function(Qt){ae!==Qt&&(i.clearStencil(Qt),ae=Qt)},reset:function(){J=!1,Pt=null,ct=null,yt=null,Nt=null,Ut=null,jt=null,he=null,ae=null}}}const s=new t,r=new e,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},p=new WeakMap,d=[],g=null,f=!1,x=null,u=null,m=null,E=null,y=null,M=null,k=null,F=new Yt(0,0,0),I=0,q=!1,st=null,v=null,_=null,L=null,P=null;const w=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let C=!1,T=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(T=parseFloat(/^WebGL (\d)/.exec(O)[1]),C=T>=1):O.indexOf("OpenGL ES")!==-1&&(T=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),C=T>=2);let A=null,R={};const z=i.getParameter(i.SCISSOR_BOX),B=i.getParameter(i.VIEWPORT),$=new oe().fromArray(z),X=new oe().fromArray(B);function H(J,Pt,ct,yt){const Nt=new Uint8Array(4),Ut=i.createTexture();i.bindTexture(J,Ut),i.texParameteri(J,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(J,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let jt=0;jt<ct;jt++)J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?i.texImage3D(Pt,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,Nt):i.texImage2D(Pt+jt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Nt);return Ut}const K={};K[i.TEXTURE_2D]=H(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=H(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=H(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=H(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),V(i.DEPTH_TEST),r.setFunc(Ki),pt(!1),St(bl),V(i.CULL_FACE),N(Xn);function V(J){c[J]!==!0&&(i.enable(J),c[J]=!0)}function j(J){c[J]!==!1&&(i.disable(J),c[J]=!1)}function ut(J,Pt){return h[J]!==Pt?(i.bindFramebuffer(J,Pt),h[J]=Pt,J===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Pt),J===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Pt),!0):!1}function gt(J,Pt){let ct=d,yt=!1;if(J){ct=p.get(Pt),ct===void 0&&(ct=[],p.set(Pt,ct));const Nt=J.textures;if(ct.length!==Nt.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let Ut=0,jt=Nt.length;Ut<jt;Ut++)ct[Ut]=i.COLOR_ATTACHMENT0+Ut;ct.length=Nt.length,yt=!0}}else ct[0]!==i.BACK&&(ct[0]=i.BACK,yt=!0);yt&&i.drawBuffers(ct)}function xt(J){return g!==J?(i.useProgram(J),g=J,!0):!1}const At={[li]:i.FUNC_ADD,[qu]:i.FUNC_SUBTRACT,[Yu]:i.FUNC_REVERSE_SUBTRACT};At[$u]=i.MIN,At[Ku]=i.MAX;const nt={[Zu]:i.ZERO,[Ju]:i.ONE,[ju]:i.SRC_COLOR,[Qo]:i.SRC_ALPHA,[rf]:i.SRC_ALPHA_SATURATE,[nf]:i.DST_COLOR,[tf]:i.DST_ALPHA,[Qu]:i.ONE_MINUS_SRC_COLOR,[ta]:i.ONE_MINUS_SRC_ALPHA,[sf]:i.ONE_MINUS_DST_COLOR,[ef]:i.ONE_MINUS_DST_ALPHA,[of]:i.CONSTANT_COLOR,[af]:i.ONE_MINUS_CONSTANT_COLOR,[lf]:i.CONSTANT_ALPHA,[cf]:i.ONE_MINUS_CONSTANT_ALPHA};function N(J,Pt,ct,yt,Nt,Ut,jt,he,ae,Qt){if(J===Xn){f===!0&&(j(i.BLEND),f=!1);return}if(f===!1&&(V(i.BLEND),f=!0),J!==Xu){if(J!==x||Qt!==q){if((u!==li||y!==li)&&(i.blendEquation(i.FUNC_ADD),u=li,y=li),Qt)switch(J){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ze:i.blendFunc(i.ONE,i.ONE);break;case wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",J);break}else switch(J){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ze:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",J);break}m=null,E=null,M=null,k=null,F.set(0,0,0),I=0,x=J,q=Qt}return}Nt=Nt||Pt,Ut=Ut||ct,jt=jt||yt,(Pt!==u||Nt!==y)&&(i.blendEquationSeparate(At[Pt],At[Nt]),u=Pt,y=Nt),(ct!==m||yt!==E||Ut!==M||jt!==k)&&(i.blendFuncSeparate(nt[ct],nt[yt],nt[Ut],nt[jt]),m=ct,E=yt,M=Ut,k=jt),(he.equals(F)===!1||ae!==I)&&(i.blendColor(he.r,he.g,he.b,ae),F.copy(he),I=ae),x=J,q=!1}function dt(J,Pt){J.side===ze?j(i.CULL_FACE):V(i.CULL_FACE);let ct=J.side===ke;Pt&&(ct=!ct),pt(ct),J.blending===Xi&&J.transparent===!1?N(Xn):N(J.blending,J.blendEquation,J.blendSrc,J.blendDst,J.blendEquationAlpha,J.blendSrcAlpha,J.blendDstAlpha,J.blendColor,J.blendAlpha,J.premultipliedAlpha),r.setFunc(J.depthFunc),r.setTest(J.depthTest),r.setMask(J.depthWrite),s.setMask(J.colorWrite);const yt=J.stencilWrite;o.setTest(yt),yt&&(o.setMask(J.stencilWriteMask),o.setFunc(J.stencilFunc,J.stencilRef,J.stencilFuncMask),o.setOp(J.stencilFail,J.stencilZFail,J.stencilZPass)),Ft(J.polygonOffset,J.polygonOffsetFactor,J.polygonOffsetUnits),J.alphaToCoverage===!0?V(i.SAMPLE_ALPHA_TO_COVERAGE):j(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt(J){st!==J&&(J?i.frontFace(i.CW):i.frontFace(i.CCW),st=J)}function St(J){J!==Vu?(V(i.CULL_FACE),J!==v&&(J===bl?i.cullFace(i.BACK):J===Wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):j(i.CULL_FACE),v=J}function Tt(J){J!==_&&(C&&i.lineWidth(J),_=J)}function Ft(J,Pt,ct){J?(V(i.POLYGON_OFFSET_FILL),(L!==Pt||P!==ct)&&(i.polygonOffset(Pt,ct),L=Pt,P=ct)):j(i.POLYGON_OFFSET_FILL)}function vt(J){J?V(i.SCISSOR_TEST):j(i.SCISSOR_TEST)}function U(J){J===void 0&&(J=i.TEXTURE0+w-1),A!==J&&(i.activeTexture(J),A=J)}function S(J,Pt,ct){ct===void 0&&(A===null?ct=i.TEXTURE0+w-1:ct=A);let yt=R[ct];yt===void 0&&(yt={type:void 0,texture:void 0},R[ct]=yt),(yt.type!==J||yt.texture!==Pt)&&(A!==ct&&(i.activeTexture(ct),A=ct),i.bindTexture(J,Pt||K[J]),yt.type=J,yt.texture=Pt)}function tt(){const J=R[A];J!==void 0&&J.type!==void 0&&(i.bindTexture(J.type,null),J.type=void 0,J.texture=void 0)}function ft(){try{i.compressedTexImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function _t(){try{i.compressedTexImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function ht(){try{i.texSubImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function wt(){try{i.texSubImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function mt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Rt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Et(){try{i.texStorage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Lt(){try{i.texImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function kt(){try{i.texImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Ht(J){$.equals(J)===!1&&(i.scissor(J.x,J.y,J.z,J.w),$.copy(J))}function It(J){X.equals(J)===!1&&(i.viewport(J.x,J.y,J.z,J.w),X.copy(J))}function Kt(J,Pt){let ct=l.get(Pt);ct===void 0&&(ct=new WeakMap,l.set(Pt,ct));let yt=ct.get(J);yt===void 0&&(yt=i.getUniformBlockIndex(Pt,J.name),ct.set(J,yt))}function Vt(J,Pt){const yt=l.get(Pt).get(J);a.get(Pt)!==yt&&(i.uniformBlockBinding(Pt,yt,J.__bindingPointIndex),a.set(Pt,yt))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},A=null,R={},h={},p=new WeakMap,d=[],g=null,f=!1,x=null,u=null,m=null,E=null,y=null,M=null,k=null,F=new Yt(0,0,0),I=0,q=!1,st=null,v=null,_=null,L=null,P=null,$.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:V,disable:j,bindFramebuffer:ut,drawBuffers:gt,useProgram:xt,setBlending:N,setMaterial:dt,setFlipSided:pt,setCullFace:St,setLineWidth:Tt,setPolygonOffset:Ft,setScissorTest:vt,activeTexture:U,bindTexture:S,unbindTexture:tt,compressedTexImage2D:ft,compressedTexImage3D:_t,texImage2D:Lt,texImage3D:kt,updateUBOMapping:Kt,uniformBlockBinding:Vt,texStorage2D:$t,texStorage3D:Et,texSubImage2D:ht,texSubImage3D:wt,compressedTexSubImage2D:mt,compressedTexSubImage3D:Rt,scissor:Ht,viewport:It,reset:te}}function mc(i,t,e,n){const s=D1(n);switch(e){case rh:return i*t;case ah:return i*t;case lh:return i*t*2;case ch:return i*t/s.components*s.byteLength;case Za:return i*t/s.components*s.byteLength;case hh:return i*t*2/s.components*s.byteLength;case Ja:return i*t*2/s.components*s.byteLength;case oh:return i*t*3/s.components*s.byteLength;case rn:return i*t*4/s.components*s.byteLength;case ja:return i*t*4/s.components*s.byteLength;case Er:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wr:case Tr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case da:case ma:return Math.max(i,16)*Math.max(t,8)/4;case fa:case pa:return Math.max(i,8)*Math.max(t,8)/2;case ga:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ya:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ba:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case wa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case La:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ar:case Ia:case Na:return Math.ceil(i/4)*Math.ceil(t/4)*16;case uh:case Ua:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Fa:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function D1(i){switch(i){case Pn:case nh:return{byteLength:1,components:1};case As:case ih:case Us:return{byteLength:2,components:1};case $a:case Ka:return{byteLength:2,components:4};case mi:case Ya:case Tn:return{byteLength:4,components:1};case sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function I1(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,h=new WeakMap;let p;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(U,S){return g?new OffscreenCanvas(U,S):Cs("canvas")}function x(U,S,tt){let ft=1;const _t=vt(U);if((_t.width>tt||_t.height>tt)&&(ft=tt/Math.max(_t.width,_t.height)),ft<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const ht=Math.floor(ft*_t.width),wt=Math.floor(ft*_t.height);p===void 0&&(p=f(ht,wt));const mt=S?f(ht,wt):p;return mt.width=ht,mt.height=wt,mt.getContext("2d").drawImage(U,0,0,ht,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_t.width+"x"+_t.height+") to ("+ht+"x"+wt+")."),mt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_t.width+"x"+_t.height+")."),U;return U}function u(U){return U.generateMipmaps&&U.minFilter!==Je&&U.minFilter!==nn}function m(U){i.generateMipmap(U)}function E(U,S,tt,ft,_t=!1){if(U!==null){if(i[U]!==void 0)return i[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ht=S;if(S===i.RED&&(tt===i.FLOAT&&(ht=i.R32F),tt===i.HALF_FLOAT&&(ht=i.R16F),tt===i.UNSIGNED_BYTE&&(ht=i.R8)),S===i.RED_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ht=i.R8UI),tt===i.UNSIGNED_SHORT&&(ht=i.R16UI),tt===i.UNSIGNED_INT&&(ht=i.R32UI),tt===i.BYTE&&(ht=i.R8I),tt===i.SHORT&&(ht=i.R16I),tt===i.INT&&(ht=i.R32I)),S===i.RG&&(tt===i.FLOAT&&(ht=i.RG32F),tt===i.HALF_FLOAT&&(ht=i.RG16F),tt===i.UNSIGNED_BYTE&&(ht=i.RG8)),S===i.RG_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ht=i.RG8UI),tt===i.UNSIGNED_SHORT&&(ht=i.RG16UI),tt===i.UNSIGNED_INT&&(ht=i.RG32UI),tt===i.BYTE&&(ht=i.RG8I),tt===i.SHORT&&(ht=i.RG16I),tt===i.INT&&(ht=i.RG32I)),S===i.RGB_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ht=i.RGB8UI),tt===i.UNSIGNED_SHORT&&(ht=i.RGB16UI),tt===i.UNSIGNED_INT&&(ht=i.RGB32UI),tt===i.BYTE&&(ht=i.RGB8I),tt===i.SHORT&&(ht=i.RGB16I),tt===i.INT&&(ht=i.RGB32I)),S===i.RGBA_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ht=i.RGBA8UI),tt===i.UNSIGNED_SHORT&&(ht=i.RGBA16UI),tt===i.UNSIGNED_INT&&(ht=i.RGBA32UI),tt===i.BYTE&&(ht=i.RGBA8I),tt===i.SHORT&&(ht=i.RGBA16I),tt===i.INT&&(ht=i.RGBA32I)),S===i.RGB&&tt===i.UNSIGNED_INT_5_9_9_9_REV&&(ht=i.RGB9_E5),S===i.RGBA){const wt=_t?Ur:ne.getTransfer(ft);tt===i.FLOAT&&(ht=i.RGBA32F),tt===i.HALF_FLOAT&&(ht=i.RGBA16F),tt===i.UNSIGNED_BYTE&&(ht=wt===ue?i.SRGB8_ALPHA8:i.RGBA8),tt===i.UNSIGNED_SHORT_4_4_4_4&&(ht=i.RGBA4),tt===i.UNSIGNED_SHORT_5_5_5_1&&(ht=i.RGB5_A1)}return(ht===i.R16F||ht===i.R32F||ht===i.RG16F||ht===i.RG32F||ht===i.RGBA16F||ht===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ht}function y(U,S){let tt;return U?S===null||S===mi||S===ji?tt=i.DEPTH24_STENCIL8:S===Tn?tt=i.DEPTH32F_STENCIL8:S===As&&(tt=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===mi||S===ji?tt=i.DEPTH_COMPONENT24:S===Tn?tt=i.DEPTH_COMPONENT32F:S===As&&(tt=i.DEPTH_COMPONENT16),tt}function M(U,S){return u(U)===!0||U.isFramebufferTexture&&U.minFilter!==Je&&U.minFilter!==nn?Math.log2(Math.max(S.width,S.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?S.mipmaps.length:1}function k(U){const S=U.target;S.removeEventListener("dispose",k),I(S),S.isVideoTexture&&h.delete(S)}function F(U){const S=U.target;S.removeEventListener("dispose",F),st(S)}function I(U){const S=n.get(U);if(S.__webglInit===void 0)return;const tt=U.source,ft=d.get(tt);if(ft){const _t=ft[S.__cacheKey];_t.usedTimes--,_t.usedTimes===0&&q(U),Object.keys(ft).length===0&&d.delete(tt)}n.remove(U)}function q(U){const S=n.get(U);i.deleteTexture(S.__webglTexture);const tt=U.source,ft=d.get(tt);delete ft[S.__cacheKey],o.memory.textures--}function st(U){const S=n.get(U);if(U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(S.__webglFramebuffer[ft]))for(let _t=0;_t<S.__webglFramebuffer[ft].length;_t++)i.deleteFramebuffer(S.__webglFramebuffer[ft][_t]);else i.deleteFramebuffer(S.__webglFramebuffer[ft]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[ft])}else{if(Array.isArray(S.__webglFramebuffer))for(let ft=0;ft<S.__webglFramebuffer.length;ft++)i.deleteFramebuffer(S.__webglFramebuffer[ft]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ft=0;ft<S.__webglColorRenderbuffer.length;ft++)S.__webglColorRenderbuffer[ft]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[ft]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const tt=U.textures;for(let ft=0,_t=tt.length;ft<_t;ft++){const ht=n.get(tt[ft]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),o.memory.textures--),n.remove(tt[ft])}n.remove(U)}let v=0;function _(){v=0}function L(){const U=v;return U>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+s.maxTextures),v+=1,U}function P(U){const S=[];return S.push(U.wrapS),S.push(U.wrapT),S.push(U.wrapR||0),S.push(U.magFilter),S.push(U.minFilter),S.push(U.anisotropy),S.push(U.internalFormat),S.push(U.format),S.push(U.type),S.push(U.generateMipmaps),S.push(U.premultiplyAlpha),S.push(U.flipY),S.push(U.unpackAlignment),S.push(U.colorSpace),S.join()}function w(U,S){const tt=n.get(U);if(U.isVideoTexture&&Tt(U),U.isRenderTargetTexture===!1&&U.version>0&&tt.__version!==U.version){const ft=U.image;if(ft===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(tt,U,S);return}}e.bindTexture(i.TEXTURE_2D,tt.__webglTexture,i.TEXTURE0+S)}function C(U,S){const tt=n.get(U);if(U.version>0&&tt.__version!==U.version){X(tt,U,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,tt.__webglTexture,i.TEXTURE0+S)}function T(U,S){const tt=n.get(U);if(U.version>0&&tt.__version!==U.version){X(tt,U,S);return}e.bindTexture(i.TEXTURE_3D,tt.__webglTexture,i.TEXTURE0+S)}function O(U,S){const tt=n.get(U);if(U.version>0&&tt.__version!==U.version){H(tt,U,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture,i.TEXTURE0+S)}const A={[ha]:i.REPEAT,[ui]:i.CLAMP_TO_EDGE,[ua]:i.MIRRORED_REPEAT},R={[Je]:i.NEAREST,[xf]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[nn]:i.LINEAR,[ao]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},z={[Ef]:i.NEVER,[Rf]:i.ALWAYS,[bf]:i.LESS,[dh]:i.LEQUAL,[wf]:i.EQUAL,[Cf]:i.GEQUAL,[Tf]:i.GREATER,[Af]:i.NOTEQUAL};function B(U,S){if(S.type===Tn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===nn||S.magFilter===ao||S.magFilter===Gs||S.magFilter===fi||S.minFilter===nn||S.minFilter===ao||S.minFilter===Gs||S.minFilter===fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(U,i.TEXTURE_WRAP_S,A[S.wrapS]),i.texParameteri(U,i.TEXTURE_WRAP_T,A[S.wrapT]),(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)&&i.texParameteri(U,i.TEXTURE_WRAP_R,A[S.wrapR]),i.texParameteri(U,i.TEXTURE_MAG_FILTER,R[S.magFilter]),i.texParameteri(U,i.TEXTURE_MIN_FILTER,R[S.minFilter]),S.compareFunction&&(i.texParameteri(U,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(U,i.TEXTURE_COMPARE_FUNC,z[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Je||S.minFilter!==Gs&&S.minFilter!==fi||S.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");i.texParameterf(U,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function $(U,S){let tt=!1;U.__webglInit===void 0&&(U.__webglInit=!0,S.addEventListener("dispose",k));const ft=S.source;let _t=d.get(ft);_t===void 0&&(_t={},d.set(ft,_t));const ht=P(S);if(ht!==U.__cacheKey){_t[ht]===void 0&&(_t[ht]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,tt=!0),_t[ht].usedTimes++;const wt=_t[U.__cacheKey];wt!==void 0&&(_t[U.__cacheKey].usedTimes--,wt.usedTimes===0&&q(S)),U.__cacheKey=ht,U.__webglTexture=_t[ht].texture}return tt}function X(U,S,tt){let ft=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ft=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ft=i.TEXTURE_3D);const _t=$(U,S),ht=S.source;e.bindTexture(ft,U.__webglTexture,i.TEXTURE0+tt);const wt=n.get(ht);if(ht.version!==wt.__version||_t===!0){e.activeTexture(i.TEXTURE0+tt);const mt=ne.getPrimaries(ne.workingColorSpace),Rt=S.colorSpace===Vn?null:ne.getPrimaries(S.colorSpace),$t=S.colorSpace===Vn||mt===Rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let Et=x(S.image,!1,s.maxTextureSize);Et=Ft(S,Et);const Lt=r.convert(S.format,S.colorSpace),kt=r.convert(S.type);let Ht=E(S.internalFormat,Lt,kt,S.colorSpace,S.isVideoTexture);B(ft,S);let It;const Kt=S.mipmaps,Vt=S.isVideoTexture!==!0,te=wt.__version===void 0||_t===!0,J=ht.dataReady,Pt=M(S,Et);if(S.isDepthTexture)Ht=y(S.format===Qi,S.type),te&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,Ht,Et.width,Et.height):e.texImage2D(i.TEXTURE_2D,0,Ht,Et.width,Et.height,0,Lt,kt,null));else if(S.isDataTexture)if(Kt.length>0){Vt&&te&&e.texStorage2D(i.TEXTURE_2D,Pt,Ht,Kt[0].width,Kt[0].height);for(let ct=0,yt=Kt.length;ct<yt;ct++)It=Kt[ct],Vt?J&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,It.width,It.height,Lt,kt,It.data):e.texImage2D(i.TEXTURE_2D,ct,Ht,It.width,It.height,0,Lt,kt,It.data);S.generateMipmaps=!1}else Vt?(te&&e.texStorage2D(i.TEXTURE_2D,Pt,Ht,Et.width,Et.height),J&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et.width,Et.height,Lt,kt,Et.data)):e.texImage2D(i.TEXTURE_2D,0,Ht,Et.width,Et.height,0,Lt,kt,Et.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Vt&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Pt,Ht,Kt[0].width,Kt[0].height,Et.depth);for(let ct=0,yt=Kt.length;ct<yt;ct++)if(It=Kt[ct],S.format!==rn)if(Lt!==null)if(Vt){if(J)if(S.layerUpdates.size>0){const Nt=mc(It.width,It.height,S.format,S.type);for(const Ut of S.layerUpdates){const jt=It.data.subarray(Ut*Nt/It.data.BYTES_PER_ELEMENT,(Ut+1)*Nt/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,Ut,It.width,It.height,1,Lt,jt,0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,It.width,It.height,Et.depth,Lt,It.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,Ht,It.width,It.height,Et.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?J&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,It.width,It.height,Et.depth,Lt,kt,It.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,Ht,It.width,It.height,Et.depth,0,Lt,kt,It.data)}else{Vt&&te&&e.texStorage2D(i.TEXTURE_2D,Pt,Ht,Kt[0].width,Kt[0].height);for(let ct=0,yt=Kt.length;ct<yt;ct++)It=Kt[ct],S.format!==rn?Lt!==null?Vt?J&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,It.width,It.height,Lt,It.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,Ht,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?J&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,It.width,It.height,Lt,kt,It.data):e.texImage2D(i.TEXTURE_2D,ct,Ht,It.width,It.height,0,Lt,kt,It.data)}else if(S.isDataArrayTexture)if(Vt){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Pt,Ht,Et.width,Et.height,Et.depth),J)if(S.layerUpdates.size>0){const ct=mc(Et.width,Et.height,S.format,S.type);for(const yt of S.layerUpdates){const Nt=Et.data.subarray(yt*ct/Et.data.BYTES_PER_ELEMENT,(yt+1)*ct/Et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,yt,Et.width,Et.height,1,Lt,kt,Nt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,Lt,kt,Et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,Et.width,Et.height,Et.depth,0,Lt,kt,Et.data);else if(S.isData3DTexture)Vt?(te&&e.texStorage3D(i.TEXTURE_3D,Pt,Ht,Et.width,Et.height,Et.depth),J&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,Lt,kt,Et.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,Et.width,Et.height,Et.depth,0,Lt,kt,Et.data);else if(S.isFramebufferTexture){if(te)if(Vt)e.texStorage2D(i.TEXTURE_2D,Pt,Ht,Et.width,Et.height);else{let ct=Et.width,yt=Et.height;for(let Nt=0;Nt<Pt;Nt++)e.texImage2D(i.TEXTURE_2D,Nt,Ht,ct,yt,0,Lt,kt,null),ct>>=1,yt>>=1}}else if(Kt.length>0){if(Vt&&te){const ct=vt(Kt[0]);e.texStorage2D(i.TEXTURE_2D,Pt,Ht,ct.width,ct.height)}for(let ct=0,yt=Kt.length;ct<yt;ct++)It=Kt[ct],Vt?J&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,Lt,kt,It):e.texImage2D(i.TEXTURE_2D,ct,Ht,Lt,kt,It);S.generateMipmaps=!1}else if(Vt){if(te){const ct=vt(Et);e.texStorage2D(i.TEXTURE_2D,Pt,Ht,ct.width,ct.height)}J&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Lt,kt,Et)}else e.texImage2D(i.TEXTURE_2D,0,Ht,Lt,kt,Et);u(S)&&m(ft),wt.__version=ht.version,S.onUpdate&&S.onUpdate(S)}U.__version=S.version}function H(U,S,tt){if(S.image.length!==6)return;const ft=$(U,S),_t=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+tt);const ht=n.get(_t);if(_t.version!==ht.__version||ft===!0){e.activeTexture(i.TEXTURE0+tt);const wt=ne.getPrimaries(ne.workingColorSpace),mt=S.colorSpace===Vn?null:ne.getPrimaries(S.colorSpace),Rt=S.colorSpace===Vn||wt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const $t=S.isCompressedTexture||S.image[0].isCompressedTexture,Et=S.image[0]&&S.image[0].isDataTexture,Lt=[];for(let yt=0;yt<6;yt++)!$t&&!Et?Lt[yt]=x(S.image[yt],!0,s.maxCubemapSize):Lt[yt]=Et?S.image[yt].image:S.image[yt],Lt[yt]=Ft(S,Lt[yt]);const kt=Lt[0],Ht=r.convert(S.format,S.colorSpace),It=r.convert(S.type),Kt=E(S.internalFormat,Ht,It,S.colorSpace),Vt=S.isVideoTexture!==!0,te=ht.__version===void 0||ft===!0,J=_t.dataReady;let Pt=M(S,kt);B(i.TEXTURE_CUBE_MAP,S);let ct;if($t){Vt&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Pt,Kt,kt.width,kt.height);for(let yt=0;yt<6;yt++){ct=Lt[yt].mipmaps;for(let Nt=0;Nt<ct.length;Nt++){const Ut=ct[Nt];S.format!==rn?Ht!==null?Vt?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt,0,0,Ut.width,Ut.height,Ht,Ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt,Kt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt,0,0,Ut.width,Ut.height,Ht,It,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt,Kt,Ut.width,Ut.height,0,Ht,It,Ut.data)}}}else{if(ct=S.mipmaps,Vt&&te){ct.length>0&&Pt++;const yt=vt(Lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Pt,Kt,yt.width,yt.height)}for(let yt=0;yt<6;yt++)if(Et){Vt?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Lt[yt].width,Lt[yt].height,Ht,It,Lt[yt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,Kt,Lt[yt].width,Lt[yt].height,0,Ht,It,Lt[yt].data);for(let Nt=0;Nt<ct.length;Nt++){const jt=ct[Nt].image[yt].image;Vt?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt+1,0,0,jt.width,jt.height,Ht,It,jt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt+1,Kt,jt.width,jt.height,0,Ht,It,jt.data)}}else{Vt?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,Ht,It,Lt[yt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,Kt,Ht,It,Lt[yt]);for(let Nt=0;Nt<ct.length;Nt++){const Ut=ct[Nt];Vt?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt+1,0,0,Ht,It,Ut.image[yt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Nt+1,Kt,Ht,It,Ut.image[yt])}}}u(S)&&m(i.TEXTURE_CUBE_MAP),ht.__version=_t.version,S.onUpdate&&S.onUpdate(S)}U.__version=S.version}function K(U,S,tt,ft,_t,ht){const wt=r.convert(tt.format,tt.colorSpace),mt=r.convert(tt.type),Rt=E(tt.internalFormat,wt,mt,tt.colorSpace);if(!n.get(S).__hasExternalTextures){const Et=Math.max(1,S.width>>ht),Lt=Math.max(1,S.height>>ht);_t===i.TEXTURE_3D||_t===i.TEXTURE_2D_ARRAY?e.texImage3D(_t,ht,Rt,Et,Lt,S.depth,0,wt,mt,null):e.texImage2D(_t,ht,Rt,Et,Lt,0,wt,mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,U),St(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ft,_t,n.get(tt).__webglTexture,0,pt(S)):(_t===i.TEXTURE_2D||_t>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&_t<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ft,_t,n.get(tt).__webglTexture,ht),e.bindFramebuffer(i.FRAMEBUFFER,null)}function V(U,S,tt){if(i.bindRenderbuffer(i.RENDERBUFFER,U),S.depthBuffer){const ft=S.depthTexture,_t=ft&&ft.isDepthTexture?ft.type:null,ht=y(S.stencilBuffer,_t),wt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=pt(S);St(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt,ht,S.width,S.height):tt?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,ht,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ht,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,U)}else{const ft=S.textures;for(let _t=0;_t<ft.length;_t++){const ht=ft[_t],wt=r.convert(ht.format,ht.colorSpace),mt=r.convert(ht.type),Rt=E(ht.internalFormat,wt,mt,ht.colorSpace),$t=pt(S);tt&&St(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,Rt,S.width,S.height):St(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,Rt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Rt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function j(U,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,U),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),w(S.depthTexture,0);const ft=n.get(S.depthTexture).__webglTexture,_t=pt(S);if(S.depthTexture.format===qi)St(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ft,0,_t):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ft,0);else if(S.depthTexture.format===Qi)St(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ft,0,_t):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ft,0);else throw new Error("Unknown depthTexture format")}function ut(U){const S=n.get(U),tt=U.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==U.depthTexture){const ft=U.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),ft){const _t=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,ft.removeEventListener("dispose",_t)};ft.addEventListener("dispose",_t),S.__depthDisposeCallback=_t}S.__boundDepthTexture=ft}if(U.depthTexture&&!S.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");j(S.__webglFramebuffer,U)}else if(tt){S.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[ft]),S.__webglDepthbuffer[ft]===void 0)S.__webglDepthbuffer[ft]=i.createRenderbuffer(),V(S.__webglDepthbuffer[ft],U,!1);else{const _t=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=S.__webglDepthbuffer[ft];i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,_t,i.RENDERBUFFER,ht)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),V(S.__webglDepthbuffer,U,!1);else{const ft=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_t),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,_t)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(U,S,tt){const ft=n.get(U);S!==void 0&&K(ft.__webglFramebuffer,U,U.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),tt!==void 0&&ut(U)}function xt(U){const S=U.texture,tt=n.get(U),ft=n.get(S);U.addEventListener("dispose",F);const _t=U.textures,ht=U.isWebGLCubeRenderTarget===!0,wt=_t.length>1;if(wt||(ft.__webglTexture===void 0&&(ft.__webglTexture=i.createTexture()),ft.__version=S.version,o.memory.textures++),ht){tt.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0){tt.__webglFramebuffer[mt]=[];for(let Rt=0;Rt<S.mipmaps.length;Rt++)tt.__webglFramebuffer[mt][Rt]=i.createFramebuffer()}else tt.__webglFramebuffer[mt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){tt.__webglFramebuffer=[];for(let mt=0;mt<S.mipmaps.length;mt++)tt.__webglFramebuffer[mt]=i.createFramebuffer()}else tt.__webglFramebuffer=i.createFramebuffer();if(wt)for(let mt=0,Rt=_t.length;mt<Rt;mt++){const $t=n.get(_t[mt]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),o.memory.textures++)}if(U.samples>0&&St(U)===!1){tt.__webglMultisampledFramebuffer=i.createFramebuffer(),tt.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let mt=0;mt<_t.length;mt++){const Rt=_t[mt];tt.__webglColorRenderbuffer[mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,tt.__webglColorRenderbuffer[mt]);const $t=r.convert(Rt.format,Rt.colorSpace),Et=r.convert(Rt.type),Lt=E(Rt.internalFormat,$t,Et,Rt.colorSpace,U.isXRRenderTarget===!0),kt=pt(U);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,Lt,U.width,U.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,tt.__webglColorRenderbuffer[mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),U.depthBuffer&&(tt.__webglDepthRenderbuffer=i.createRenderbuffer(),V(tt.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,ft.__webglTexture),B(i.TEXTURE_CUBE_MAP,S);for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Rt=0;Rt<S.mipmaps.length;Rt++)K(tt.__webglFramebuffer[mt][Rt],U,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Rt);else K(tt.__webglFramebuffer[mt],U,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);u(S)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let mt=0,Rt=_t.length;mt<Rt;mt++){const $t=_t[mt],Et=n.get($t);e.bindTexture(i.TEXTURE_2D,Et.__webglTexture),B(i.TEXTURE_2D,$t),K(tt.__webglFramebuffer,U,$t,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,0),u($t)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let mt=i.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(mt=U.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,ft.__webglTexture),B(mt,S),S.mipmaps&&S.mipmaps.length>0)for(let Rt=0;Rt<S.mipmaps.length;Rt++)K(tt.__webglFramebuffer[Rt],U,S,i.COLOR_ATTACHMENT0,mt,Rt);else K(tt.__webglFramebuffer,U,S,i.COLOR_ATTACHMENT0,mt,0);u(S)&&m(mt),e.unbindTexture()}U.depthBuffer&&ut(U)}function At(U){const S=U.textures;for(let tt=0,ft=S.length;tt<ft;tt++){const _t=S[tt];if(u(_t)){const ht=U.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,wt=n.get(_t).__webglTexture;e.bindTexture(ht,wt),m(ht),e.unbindTexture()}}}const nt=[],N=[];function dt(U){if(U.samples>0){if(St(U)===!1){const S=U.textures,tt=U.width,ft=U.height;let _t=i.COLOR_BUFFER_BIT;const ht=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(U),mt=S.length>1;if(mt)for(let Rt=0;Rt<S.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let Rt=0;Rt<S.length;Rt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(_t|=i.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(_t|=i.STENCIL_BUFFER_BIT)),mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[Rt]);const $t=n.get(S[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,tt,ft,0,0,tt,ft,_t,i.NEAREST),l===!0&&(nt.length=0,N.length=0,nt.push(i.COLOR_ATTACHMENT0+Rt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(nt.push(ht),N.push(ht),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),mt)for(let Rt=0;Rt<S.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,wt.__webglColorRenderbuffer[Rt]);const $t=n.get(S[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){const S=U.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function pt(U){return Math.min(s.maxSamples,U.samples)}function St(U){const S=n.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Tt(U){const S=o.render.frame;h.get(U)!==S&&(h.set(U,S),U.update())}function Ft(U,S){const tt=U.colorSpace,ft=U.format,_t=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||tt!==Jn&&tt!==Vn&&(ne.getTransfer(tt)===ue?(ft!==rn||_t!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),S}function vt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=_,this.setTexture2D=w,this.setTexture2DArray=C,this.setTexture3D=T,this.setTextureCube=O,this.rebindTextures=gt,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=K,this.useMultisampledRTT=St}function N1(i,t){function e(n,s=Vn){let r;const o=ne.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===$a)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ka)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===nh)return i.BYTE;if(n===ih)return i.SHORT;if(n===As)return i.UNSIGNED_SHORT;if(n===Ya)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===Us)return i.HALF_FLOAT;if(n===rh)return i.ALPHA;if(n===oh)return i.RGB;if(n===rn)return i.RGBA;if(n===ah)return i.LUMINANCE;if(n===lh)return i.LUMINANCE_ALPHA;if(n===qi)return i.DEPTH_COMPONENT;if(n===Qi)return i.DEPTH_STENCIL;if(n===ch)return i.RED;if(n===Za)return i.RED_INTEGER;if(n===hh)return i.RG;if(n===Ja)return i.RG_INTEGER;if(n===ja)return i.RGBA_INTEGER;if(n===Er||n===br||n===wr||n===Tr)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fa||n===da||n===pa||n===ma)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ga||n===va||n===_a)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ga||n===va)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_a)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===xa||n===ya||n===Ma||n===Sa||n===Ea||n===ba||n===wa||n===Ta||n===Aa||n===Ca||n===Ra||n===Pa||n===La||n===Da)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ya)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ma)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ea)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ba)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ta)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Aa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ca)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ra)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===La)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Da)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ar||n===Ia||n===Na)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ar)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uh||n===Ua||n===Fa||n===Oa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ar)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class U1 extends Ce{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class je extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const F1={type:"move"};class Oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const u=e.getJointPose(x,n),m=this._getHandJoint(c,x);u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=u.radius),m.visible=u!==null}const h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=h.position.distanceTo(p.position),g=.02,f=.005;c.inputState.pinching&&d>g+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=g-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(F1)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new je;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const O1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,B1=`
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

}`;class z1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ie,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Zn({vertexShader:O1,fragmentShader:B1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new vi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k1 extends ns{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,p=null,d=null,g=null,f=null;const x=new z1,u=e.getContextAttributes();let m=null,E=null;const y=[],M=[],k=new Ct;let F=null;const I=new Ce;I.layers.enable(1),I.viewport=new oe;const q=new Ce;q.layers.enable(2),q.viewport=new oe;const st=[I,q],v=new U1;v.layers.enable(1),v.layers.enable(2);let _=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let K=y[H];return K===void 0&&(K=new Oo,y[H]=K),K.getTargetRaySpace()},this.getControllerGrip=function(H){let K=y[H];return K===void 0&&(K=new Oo,y[H]=K),K.getGripSpace()},this.getHand=function(H){let K=y[H];return K===void 0&&(K=new Oo,y[H]=K),K.getHandSpace()};function P(H){const K=M.indexOf(H.inputSource);if(K===-1)return;const V=y[K];V!==void 0&&(V.update(H.inputSource,H.frame,c||o),V.dispatchEvent({type:H.type,data:H.inputSource}))}function w(){s.removeEventListener("select",P),s.removeEventListener("selectstart",P),s.removeEventListener("selectend",P),s.removeEventListener("squeeze",P),s.removeEventListener("squeezestart",P),s.removeEventListener("squeezeend",P),s.removeEventListener("end",w),s.removeEventListener("inputsourceschange",C);for(let H=0;H<y.length;H++){const K=M[H];K!==null&&(M[H]=null,y[H].disconnect(K))}_=null,L=null,x.reset(),t.setRenderTarget(m),g=null,d=null,p=null,s=null,E=null,X.stop(),n.isPresenting=!1,t.setPixelRatio(F),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return p},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",P),s.addEventListener("selectstart",P),s.addEventListener("selectend",P),s.addEventListener("squeeze",P),s.addEventListener("squeezestart",P),s.addEventListener("squeezeend",P),s.addEventListener("end",w),s.addEventListener("inputsourceschange",C),u.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(k),s.renderState.layers===void 0){const K={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,K),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),E=new gi(g.framebufferWidth,g.framebufferHeight,{format:rn,type:Pn,colorSpace:t.outputColorSpace,stencilBuffer:u.stencil})}else{let K=null,V=null,j=null;u.depth&&(j=u.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,K=u.stencil?Qi:qi,V=u.stencil?ji:mi);const ut={colorFormat:e.RGBA8,depthFormat:j,scaleFactor:r};p=new XRWebGLBinding(s,e),d=p.createProjectionLayer(ut),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new gi(d.textureWidth,d.textureHeight,{format:rn,type:Pn,depthTexture:new wh(d.textureWidth,d.textureHeight,V,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:u.stencil,colorSpace:t.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),X.setContext(s),X.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function C(H){for(let K=0;K<H.removed.length;K++){const V=H.removed[K],j=M.indexOf(V);j>=0&&(M[j]=null,y[j].disconnect(V))}for(let K=0;K<H.added.length;K++){const V=H.added[K];let j=M.indexOf(V);if(j===-1){for(let gt=0;gt<y.length;gt++)if(gt>=M.length){M.push(V),j=gt;break}else if(M[gt]===null){M[gt]=V,j=gt;break}if(j===-1)break}const ut=y[j];ut&&ut.connect(V)}}const T=new Y,O=new Y;function A(H,K,V){T.setFromMatrixPosition(K.matrixWorld),O.setFromMatrixPosition(V.matrixWorld);const j=T.distanceTo(O),ut=K.projectionMatrix.elements,gt=V.projectionMatrix.elements,xt=ut[14]/(ut[10]-1),At=ut[14]/(ut[10]+1),nt=(ut[9]+1)/ut[5],N=(ut[9]-1)/ut[5],dt=(ut[8]-1)/ut[0],pt=(gt[8]+1)/gt[0],St=xt*dt,Tt=xt*pt,Ft=j/(-dt+pt),vt=Ft*-dt;if(K.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(vt),H.translateZ(Ft),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),ut[10]===-1)H.projectionMatrix.copy(K.projectionMatrix),H.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const U=xt+Ft,S=At+Ft,tt=St-vt,ft=Tt+(j-vt),_t=nt*At/S*U,ht=N*At/S*U;H.projectionMatrix.makePerspective(tt,ft,_t,ht,U,S),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function R(H,K){K===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(K.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let K=H.near,V=H.far;x.texture!==null&&(x.depthNear>0&&(K=x.depthNear),x.depthFar>0&&(V=x.depthFar)),v.near=q.near=I.near=K,v.far=q.far=I.far=V,(_!==v.near||L!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),_=v.near,L=v.far);const j=H.parent,ut=v.cameras;R(v,j);for(let gt=0;gt<ut.length;gt++)R(ut[gt],j);ut.length===2?A(v,I,q):v.projectionMatrix.copy(I.projectionMatrix),z(H,v,j)};function z(H,K,V){V===null?H.matrix.copy(K.matrixWorld):(H.matrix.copy(V.matrixWorld),H.matrix.invert(),H.matrix.multiply(K.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(K.projectionMatrix),H.projectionMatrixInverse.copy(K.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=za*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(H){l=H,d!==null&&(d.fixedFoveation=H),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=H)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let B=null;function $(H,K){if(h=K.getViewerPose(c||o),f=K,h!==null){const V=h.views;g!==null&&(t.setRenderTargetFramebuffer(E,g.framebuffer),t.setRenderTarget(E));let j=!1;V.length!==v.cameras.length&&(v.cameras.length=0,j=!0);for(let gt=0;gt<V.length;gt++){const xt=V[gt];let At=null;if(g!==null)At=g.getViewport(xt);else{const N=p.getViewSubImage(d,xt);At=N.viewport,gt===0&&(t.setRenderTargetTextures(E,N.colorTexture,d.ignoreDepthValues?void 0:N.depthStencilTexture),t.setRenderTarget(E))}let nt=st[gt];nt===void 0&&(nt=new Ce,nt.layers.enable(gt),nt.viewport=new oe,st[gt]=nt),nt.matrix.fromArray(xt.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(xt.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(At.x,At.y,At.width,At.height),gt===0&&(v.matrix.copy(nt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),j===!0&&v.cameras.push(nt)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){const gt=p.getDepthInformation(V[0]);gt&&gt.isValid&&gt.texture&&x.init(t,gt,s.renderState)}}for(let V=0;V<y.length;V++){const j=M[V],ut=y[V];j!==null&&ut!==void 0&&ut.update(j,K,c||o)}B&&B(H,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),f=null}const X=new Eh;X.setAnimationLoop($),this.setAnimationLoop=function(H){B=H},this.dispose=function(){}}}const ri=new fn,H1=new ie;function G1(i,t){function e(u,m){u.matrixAutoUpdate===!0&&u.updateMatrix(),m.value.copy(u.matrix)}function n(u,m){m.color.getRGB(u.fogColor.value,yh(i)),m.isFog?(u.fogNear.value=m.near,u.fogFar.value=m.far):m.isFogExp2&&(u.fogDensity.value=m.density)}function s(u,m,E,y,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(u,m):m.isMeshToonMaterial?(r(u,m),p(u,m)):m.isMeshPhongMaterial?(r(u,m),h(u,m)):m.isMeshStandardMaterial?(r(u,m),d(u,m),m.isMeshPhysicalMaterial&&g(u,m,M)):m.isMeshMatcapMaterial?(r(u,m),f(u,m)):m.isMeshDepthMaterial?r(u,m):m.isMeshDistanceMaterial?(r(u,m),x(u,m)):m.isMeshNormalMaterial?r(u,m):m.isLineBasicMaterial?(o(u,m),m.isLineDashedMaterial&&a(u,m)):m.isPointsMaterial?l(u,m,E,y):m.isSpriteMaterial?c(u,m):m.isShadowMaterial?(u.color.value.copy(m.color),u.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(u,m){u.opacity.value=m.opacity,m.color&&u.diffuse.value.copy(m.color),m.emissive&&u.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(u.map.value=m.map,e(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.bumpMap&&(u.bumpMap.value=m.bumpMap,e(m.bumpMap,u.bumpMapTransform),u.bumpScale.value=m.bumpScale,m.side===ke&&(u.bumpScale.value*=-1)),m.normalMap&&(u.normalMap.value=m.normalMap,e(m.normalMap,u.normalMapTransform),u.normalScale.value.copy(m.normalScale),m.side===ke&&u.normalScale.value.negate()),m.displacementMap&&(u.displacementMap.value=m.displacementMap,e(m.displacementMap,u.displacementMapTransform),u.displacementScale.value=m.displacementScale,u.displacementBias.value=m.displacementBias),m.emissiveMap&&(u.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,u.emissiveMapTransform)),m.specularMap&&(u.specularMap.value=m.specularMap,e(m.specularMap,u.specularMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest);const E=t.get(m),y=E.envMap,M=E.envMapRotation;y&&(u.envMap.value=y,ri.copy(M),ri.x*=-1,ri.y*=-1,ri.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),u.envMapRotation.value.setFromMatrix4(H1.makeRotationFromEuler(ri)),u.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=m.reflectivity,u.ior.value=m.ior,u.refractionRatio.value=m.refractionRatio),m.lightMap&&(u.lightMap.value=m.lightMap,u.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,u.lightMapTransform)),m.aoMap&&(u.aoMap.value=m.aoMap,u.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,u.aoMapTransform))}function o(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,m.map&&(u.map.value=m.map,e(m.map,u.mapTransform))}function a(u,m){u.dashSize.value=m.dashSize,u.totalSize.value=m.dashSize+m.gapSize,u.scale.value=m.scale}function l(u,m,E,y){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.size.value=m.size*E,u.scale.value=y*.5,m.map&&(u.map.value=m.map,e(m.map,u.uvTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function c(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.rotation.value=m.rotation,m.map&&(u.map.value=m.map,e(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,e(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function h(u,m){u.specular.value.copy(m.specular),u.shininess.value=Math.max(m.shininess,1e-4)}function p(u,m){m.gradientMap&&(u.gradientMap.value=m.gradientMap)}function d(u,m){u.metalness.value=m.metalness,m.metalnessMap&&(u.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,u.metalnessMapTransform)),u.roughness.value=m.roughness,m.roughnessMap&&(u.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,u.roughnessMapTransform)),m.envMap&&(u.envMapIntensity.value=m.envMapIntensity)}function g(u,m,E){u.ior.value=m.ior,m.sheen>0&&(u.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),u.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(u.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,u.sheenColorMapTransform)),m.sheenRoughnessMap&&(u.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,u.sheenRoughnessMapTransform))),m.clearcoat>0&&(u.clearcoat.value=m.clearcoat,u.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(u.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,u.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(u.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ke&&u.clearcoatNormalScale.value.negate())),m.dispersion>0&&(u.dispersion.value=m.dispersion),m.iridescence>0&&(u.iridescence.value=m.iridescence,u.iridescenceIOR.value=m.iridescenceIOR,u.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(u.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,u.iridescenceMapTransform)),m.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),m.transmission>0&&(u.transmission.value=m.transmission,u.transmissionSamplerMap.value=E.texture,u.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(u.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,u.transmissionMapTransform)),u.thickness.value=m.thickness,m.thicknessMap&&(u.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=m.attenuationDistance,u.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(u.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(u.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=m.specularIntensity,u.specularColor.value.copy(m.specularColor),m.specularColorMap&&(u.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,u.specularColorMapTransform)),m.specularIntensityMap&&(u.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,u.specularIntensityMapTransform))}function f(u,m){m.matcap&&(u.matcap.value=m.matcap)}function x(u,m){const E=t.get(m).light;u.referencePosition.value.setFromMatrixPosition(E.matrixWorld),u.nearDistance.value=E.shadow.camera.near,u.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function V1(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,y){const M=y.program;n.uniformBlockBinding(E,M)}function c(E,y){let M=s[E.id];M===void 0&&(f(E),M=h(E),s[E.id]=M,E.addEventListener("dispose",u));const k=y.program;n.updateUBOMapping(E,k);const F=t.render.frame;r[E.id]!==F&&(d(E),r[E.id]=F)}function h(E){const y=p();E.__bindingPointIndex=y;const M=i.createBuffer(),k=E.__size,F=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,k,F),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function p(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const y=s[E.id],M=E.uniforms,k=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let F=0,I=M.length;F<I;F++){const q=Array.isArray(M[F])?M[F]:[M[F]];for(let st=0,v=q.length;st<v;st++){const _=q[st];if(g(_,F,st,k)===!0){const L=_.__offset,P=Array.isArray(_.value)?_.value:[_.value];let w=0;for(let C=0;C<P.length;C++){const T=P[C],O=x(T);typeof T=="number"||typeof T=="boolean"?(_.__data[0]=T,i.bufferSubData(i.UNIFORM_BUFFER,L+w,_.__data)):T.isMatrix3?(_.__data[0]=T.elements[0],_.__data[1]=T.elements[1],_.__data[2]=T.elements[2],_.__data[3]=0,_.__data[4]=T.elements[3],_.__data[5]=T.elements[4],_.__data[6]=T.elements[5],_.__data[7]=0,_.__data[8]=T.elements[6],_.__data[9]=T.elements[7],_.__data[10]=T.elements[8],_.__data[11]=0):(T.toArray(_.__data,w),w+=O.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,_.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(E,y,M,k){const F=E.value,I=y+"_"+M;if(k[I]===void 0)return typeof F=="number"||typeof F=="boolean"?k[I]=F:k[I]=F.clone(),!0;{const q=k[I];if(typeof F=="number"||typeof F=="boolean"){if(q!==F)return k[I]=F,!0}else if(q.equals(F)===!1)return q.copy(F),!0}return!1}function f(E){const y=E.uniforms;let M=0;const k=16;for(let I=0,q=y.length;I<q;I++){const st=Array.isArray(y[I])?y[I]:[y[I]];for(let v=0,_=st.length;v<_;v++){const L=st[v],P=Array.isArray(L.value)?L.value:[L.value];for(let w=0,C=P.length;w<C;w++){const T=P[w],O=x(T),A=M%k,R=A%O.boundary,z=A+R;M+=R,z!==0&&k-z<O.storage&&(M+=k-z),L.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=O.storage}}}const F=M%k;return F>0&&(M+=k-F),E.__size=M,E.__cache={},this}function x(E){const y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),y}function u(E){const y=E.target;y.removeEventListener("dispose",u);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function m(){for(const E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class Yr{constructor(t={}){const{canvas:e=Lf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),f=new Int32Array(4);let x=null,u=null;const m=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Be,this.toneMapping=qn,this.toneMappingExposure=1;const y=this;let M=!1,k=0,F=0,I=null,q=-1,st=null;const v=new oe,_=new oe;let L=null;const P=new Yt(0);let w=0,C=e.width,T=e.height,O=1,A=null,R=null;const z=new oe(0,0,C,T),B=new oe(0,0,C,T);let $=!1;const X=new el;let H=!1,K=!1;const V=new ie,j=new ie,ut=new Y,gt=new oe,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let At=!1;function nt(){return I===null?O:1}let N=n;function dt(D,Q){return e.getContext(D,Q)}try{const D={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",yt,!1),e.addEventListener("webglcontextrestored",Nt,!1),e.addEventListener("webglcontextcreationerror",Ut,!1),N===null){const Q="webgl2";if(N=dt(Q,D),N===null)throw dt(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let pt,St,Tt,Ft,vt,U,S,tt,ft,_t,ht,wt,mt,Rt,$t,Et,Lt,kt,Ht,It,Kt,Vt,te,J;function Pt(){pt=new Kp(N),pt.init(),Vt=new N1(N,pt),St=new Vp(N,pt,t,Vt),Tt=new L1(N),St.reverseDepthBuffer&&Tt.buffers.depth.setReversed(!0),Ft=new jp(N),vt=new g1,U=new I1(N,pt,Tt,vt,St,Vt,Ft),S=new Xp(y),tt=new $p(y),ft=new rd(N),te=new Hp(N,ft),_t=new Zp(N,ft,Ft,te),ht=new tm(N,_t,ft,Ft),Ht=new Qp(N,St,U),Et=new Wp(vt),wt=new m1(y,S,tt,pt,St,te,Et),mt=new G1(y,vt),Rt=new _1,$t=new b1(pt),kt=new kp(y,S,tt,Tt,ht,d,l),Lt=new R1(y,ht,St),J=new V1(N,Ft,St,Tt),It=new Gp(N,pt,Ft),Kt=new Jp(N,pt,Ft),Ft.programs=wt.programs,y.capabilities=St,y.extensions=pt,y.properties=vt,y.renderLists=Rt,y.shadowMap=Lt,y.state=Tt,y.info=Ft}Pt();const ct=new k1(y,N);this.xr=ct,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const D=pt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=pt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(D){D!==void 0&&(O=D,this.setSize(C,T,!1))},this.getSize=function(D){return D.set(C,T)},this.setSize=function(D,Q,rt=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}C=D,T=Q,e.width=Math.floor(D*O),e.height=Math.floor(Q*O),rt===!0&&(e.style.width=D+"px",e.style.height=Q+"px"),this.setViewport(0,0,D,Q)},this.getDrawingBufferSize=function(D){return D.set(C*O,T*O).floor()},this.setDrawingBufferSize=function(D,Q,rt){C=D,T=Q,O=rt,e.width=Math.floor(D*rt),e.height=Math.floor(Q*rt),this.setViewport(0,0,D,Q)},this.getCurrentViewport=function(D){return D.copy(v)},this.getViewport=function(D){return D.copy(z)},this.setViewport=function(D,Q,rt,at){D.isVector4?z.set(D.x,D.y,D.z,D.w):z.set(D,Q,rt,at),Tt.viewport(v.copy(z).multiplyScalar(O).round())},this.getScissor=function(D){return D.copy(B)},this.setScissor=function(D,Q,rt,at){D.isVector4?B.set(D.x,D.y,D.z,D.w):B.set(D,Q,rt,at),Tt.scissor(_.copy(B).multiplyScalar(O).round())},this.getScissorTest=function(){return $},this.setScissorTest=function(D){Tt.setScissorTest($=D)},this.setOpaqueSort=function(D){A=D},this.setTransparentSort=function(D){R=D},this.getClearColor=function(D){return D.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor.apply(kt,arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha.apply(kt,arguments)},this.clear=function(D=!0,Q=!0,rt=!0){let at=0;if(D){let b=!1;if(I!==null){const W=I.texture.format;b=W===ja||W===Ja||W===Za}if(b){const W=I.texture.type,Z=W===Pn||W===mi||W===As||W===ji||W===$a||W===Ka,G=kt.getClearColor(),ot=kt.getClearAlpha(),it=G.r,et=G.g,lt=G.b;Z?(g[0]=it,g[1]=et,g[2]=lt,g[3]=ot,N.clearBufferuiv(N.COLOR,0,g)):(f[0]=it,f[1]=et,f[2]=lt,f[3]=ot,N.clearBufferiv(N.COLOR,0,f))}else at|=N.COLOR_BUFFER_BIT}Q&&(at|=N.DEPTH_BUFFER_BIT,N.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),rt&&(at|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(at)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",yt,!1),e.removeEventListener("webglcontextrestored",Nt,!1),e.removeEventListener("webglcontextcreationerror",Ut,!1),Rt.dispose(),$t.dispose(),vt.dispose(),S.dispose(),tt.dispose(),ht.dispose(),te.dispose(),J.dispose(),wt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",pn),ct.removeEventListener("sessionend",ks),Xe.stop()};function yt(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Nt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const D=Ft.autoReset,Q=Lt.enabled,rt=Lt.autoUpdate,at=Lt.needsUpdate,b=Lt.type;Pt(),Ft.autoReset=D,Lt.enabled=Q,Lt.autoUpdate=rt,Lt.needsUpdate=at,Lt.type=b}function Ut(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function jt(D){const Q=D.target;Q.removeEventListener("dispose",jt),he(Q)}function he(D){ae(D),vt.remove(D)}function ae(D){const Q=vt.get(D).programs;Q!==void 0&&(Q.forEach(function(rt){wt.releaseProgram(rt)}),D.isShaderMaterial&&wt.releaseShaderCache(D))}this.renderBufferDirect=function(D,Q,rt,at,b,W){Q===null&&(Q=xt);const Z=b.isMesh&&b.matrixWorld.determinant()<0,G=yi(D,Q,rt,at,b);Tt.setMaterial(at,Z);let ot=rt.index,it=1;if(at.wireframe===!0){if(ot=_t.getWireframeAttribute(rt),ot===void 0)return;it=2}const et=rt.drawRange,lt=rt.attributes.position;let zt=et.start*it,Mt=(et.start+et.count)*it;W!==null&&(zt=Math.max(zt,W.start*it),Mt=Math.min(Mt,(W.start+W.count)*it)),ot!==null?(zt=Math.max(zt,0),Mt=Math.min(Mt,ot.count)):lt!=null&&(zt=Math.max(zt,0),Mt=Math.min(Mt,lt.count));const Wt=Mt-zt;if(Wt<0||Wt===1/0)return;te.setup(b,at,G,rt,ot);let se,Ot=It;if(ot!==null&&(se=ft.get(ot),Ot=Kt,Ot.setIndex(se)),b.isMesh)at.wireframe===!0?(Tt.setLineWidth(at.wireframeLinewidth*nt()),Ot.setMode(N.LINES)):Ot.setMode(N.TRIANGLES);else if(b.isLine){let bt=at.linewidth;bt===void 0&&(bt=1),Tt.setLineWidth(bt*nt()),b.isLineSegments?Ot.setMode(N.LINES):b.isLineLoop?Ot.setMode(N.LINE_LOOP):Ot.setMode(N.LINE_STRIP)}else b.isPoints?Ot.setMode(N.POINTS):b.isSprite&&Ot.setMode(N.TRIANGLES);if(b.isBatchedMesh)if(b._multiDrawInstances!==null)Ot.renderMultiDrawInstances(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount,b._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))Ot.renderMultiDraw(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount);else{const bt=b._multiDrawStarts,ee=b._multiDrawCounts,qt=b._multiDrawCount,Gt=ot?ft.get(ot).bytesPerElement:1,Se=vt.get(at).currentProgram.getUniforms();for(let ve=0;ve<qt;ve++)Se.setValue(N,"_gl_DrawID",ve),Ot.render(bt[ve]/Gt,ee[ve])}else if(b.isInstancedMesh)Ot.renderInstances(zt,Wt,b.count);else if(rt.isInstancedBufferGeometry){const bt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,ee=Math.min(rt.instanceCount,bt);Ot.renderInstances(zt,Wt,ee)}else Ot.render(zt,Wt)};function Qt(D,Q,rt){D.transparent===!0&&D.side===ze&&D.forceSinglePass===!1?(D.side=ke,D.needsUpdate=!0,Qn(D,Q,rt),D.side=Kn,D.needsUpdate=!0,Qn(D,Q,rt),D.side=ze):Qn(D,Q,rt)}this.compile=function(D,Q,rt=null){rt===null&&(rt=D),u=$t.get(rt),u.init(Q),E.push(u),rt.traverseVisible(function(b){b.isLight&&b.layers.test(Q.layers)&&(u.pushLight(b),b.castShadow&&u.pushShadow(b))}),D!==rt&&D.traverseVisible(function(b){b.isLight&&b.layers.test(Q.layers)&&(u.pushLight(b),b.castShadow&&u.pushShadow(b))}),u.setupLights();const at=new Set;return D.traverse(function(b){if(!(b.isMesh||b.isPoints||b.isLine||b.isSprite))return;const W=b.material;if(W)if(Array.isArray(W))for(let Z=0;Z<W.length;Z++){const G=W[Z];Qt(G,rt,b),at.add(G)}else Qt(W,rt,b),at.add(W)}),E.pop(),u=null,at},this.compileAsync=function(D,Q,rt=null){const at=this.compile(D,Q,rt);return new Promise(b=>{function W(){if(at.forEach(function(Z){vt.get(Z).currentProgram.isReady()&&at.delete(Z)}),at.size===0){b(D);return}setTimeout(W,10)}pt.get("KHR_parallel_shader_compile")!==null?W():setTimeout(W,10)})};let Re=null;function We(D){Re&&Re(D)}function pn(){Xe.stop()}function ks(){Xe.start()}const Xe=new Eh;Xe.setAnimationLoop(We),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(D){Re=D,ct.setAnimationLoop(D),D===null?Xe.stop():Xe.start()},ct.addEventListener("sessionstart",pn),ct.addEventListener("sessionend",ks),this.render=function(D,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(Q),Q=ct.getCamera()),D.isScene===!0&&D.onBeforeRender(y,D,Q,I),u=$t.get(D,E.length),u.init(Q),E.push(u),j.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),X.setFromProjectionMatrix(j),K=this.localClippingEnabled,H=Et.init(this.clippingPlanes,K),x=Rt.get(D,m.length),x.init(),m.push(x),ct.enabled===!0&&ct.isPresenting===!0){const W=y.xr.getDepthSensingMesh();W!==null&&os(W,Q,-1/0,y.sortObjects)}os(D,Q,0,y.sortObjects),x.finish(),y.sortObjects===!0&&x.sort(A,R),At=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,At&&kt.addToRenderList(x,D),this.info.render.frame++,H===!0&&Et.beginShadows();const rt=u.state.shadowsArray;Lt.render(rt,D,Q),H===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset();const at=x.opaque,b=x.transmissive;if(u.setupLights(),Q.isArrayCamera){const W=Q.cameras;if(b.length>0)for(let Z=0,G=W.length;Z<G;Z++){const ot=W[Z];Hs(at,b,D,ot)}At&&kt.render(D);for(let Z=0,G=W.length;Z<G;Z++){const ot=W[Z];xi(x,D,ot,ot.viewport)}}else b.length>0&&Hs(at,b,D,Q),At&&kt.render(D),xi(x,D,Q);I!==null&&(U.updateMultisampleRenderTarget(I),U.updateRenderTargetMipmap(I)),D.isScene===!0&&D.onAfterRender(y,D,Q),te.resetDefaultState(),q=-1,st=null,E.pop(),E.length>0?(u=E[E.length-1],H===!0&&Et.setGlobalState(y.clippingPlanes,u.state.camera)):u=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function os(D,Q,rt,at){if(D.visible===!1)return;if(D.layers.test(Q.layers)){if(D.isGroup)rt=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(Q);else if(D.isLight)u.pushLight(D),D.castShadow&&u.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||X.intersectsSprite(D)){at&&gt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(j);const Z=ht.update(D),G=D.material;G.visible&&x.push(D,Z,G,rt,gt.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||X.intersectsObject(D))){const Z=ht.update(D),G=D.material;if(at&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),gt.copy(D.boundingSphere.center)):(Z.boundingSphere===null&&Z.computeBoundingSphere(),gt.copy(Z.boundingSphere.center)),gt.applyMatrix4(D.matrixWorld).applyMatrix4(j)),Array.isArray(G)){const ot=Z.groups;for(let it=0,et=ot.length;it<et;it++){const lt=ot[it],zt=G[lt.materialIndex];zt&&zt.visible&&x.push(D,Z,zt,rt,gt.z,lt)}}else G.visible&&x.push(D,Z,G,rt,gt.z,null)}}const W=D.children;for(let Z=0,G=W.length;Z<G;Z++)os(W[Z],Q,rt,at)}function xi(D,Q,rt,at){const b=D.opaque,W=D.transmissive,Z=D.transparent;u.setupLightsView(rt),H===!0&&Et.setGlobalState(y.clippingPlanes,rt),at&&Tt.viewport(v.copy(at)),b.length>0&&Ln(b,Q,rt),W.length>0&&Ln(W,Q,rt),Z.length>0&&Ln(Z,Q,rt),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Hs(D,Q,rt,at){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[at.id]===void 0&&(u.state.transmissionRenderTarget[at.id]=new gi(1,1,{generateMipmaps:!0,type:pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float")?Us:Pn,minFilter:fi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const W=u.state.transmissionRenderTarget[at.id],Z=at.viewport||v;W.setSize(Z.z,Z.w);const G=y.getRenderTarget();y.setRenderTarget(W),y.getClearColor(P),w=y.getClearAlpha(),w<1&&y.setClearColor(16777215,.5),y.clear(),At&&kt.render(rt);const ot=y.toneMapping;y.toneMapping=qn;const it=at.viewport;if(at.viewport!==void 0&&(at.viewport=void 0),u.setupLightsView(at),H===!0&&Et.setGlobalState(y.clippingPlanes,at),Ln(D,rt,at),U.updateMultisampleRenderTarget(W),U.updateRenderTargetMipmap(W),pt.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let lt=0,zt=Q.length;lt<zt;lt++){const Mt=Q[lt],Wt=Mt.object,se=Mt.geometry,Ot=Mt.material,bt=Mt.group;if(Ot.side===ze&&Wt.layers.test(at.layers)){const ee=Ot.side;Ot.side=ke,Ot.needsUpdate=!0,as(Wt,rt,at,se,Ot,bt),Ot.side=ee,Ot.needsUpdate=!0,et=!0}}et===!0&&(U.updateMultisampleRenderTarget(W),U.updateRenderTargetMipmap(W))}y.setRenderTarget(G),y.setClearColor(P,w),it!==void 0&&(at.viewport=it),y.toneMapping=ot}function Ln(D,Q,rt){const at=Q.isScene===!0?Q.overrideMaterial:null;for(let b=0,W=D.length;b<W;b++){const Z=D[b],G=Z.object,ot=Z.geometry,it=at===null?Z.material:at,et=Z.group;G.layers.test(rt.layers)&&as(G,Q,rt,ot,it,et)}}function as(D,Q,rt,at,b,W){D.onBeforeRender(y,Q,rt,at,b,W),D.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),b.onBeforeRender(y,Q,rt,at,D,W),b.transparent===!0&&b.side===ze&&b.forceSinglePass===!1?(b.side=ke,b.needsUpdate=!0,y.renderBufferDirect(rt,Q,at,b,D,W),b.side=Kn,b.needsUpdate=!0,y.renderBufferDirect(rt,Q,at,b,D,W),b.side=ze):y.renderBufferDirect(rt,Q,at,b,D,W),D.onAfterRender(y,Q,rt,at,b,W)}function Qn(D,Q,rt){Q.isScene!==!0&&(Q=xt);const at=vt.get(D),b=u.state.lights,W=u.state.shadowsArray,Z=b.state.version,G=wt.getParameters(D,b.state,W,Q,rt),ot=wt.getProgramCacheKey(G);let it=at.programs;at.environment=D.isMeshStandardMaterial?Q.environment:null,at.fog=Q.fog,at.envMap=(D.isMeshStandardMaterial?tt:S).get(D.envMap||at.environment),at.envMapRotation=at.environment!==null&&D.envMap===null?Q.environmentRotation:D.envMapRotation,it===void 0&&(D.addEventListener("dispose",jt),it=new Map,at.programs=it);let et=it.get(ot);if(et!==void 0){if(at.currentProgram===et&&at.lightsStateVersion===Z)return Ue(D,G),et}else G.uniforms=wt.getUniforms(D),D.onBeforeCompile(G,y),et=wt.acquireProgram(G,ot),it.set(ot,et),at.uniforms=G.uniforms;const lt=at.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(lt.clippingPlanes=Et.uniform),Ue(D,G),at.needsLights=no(D),at.lightsStateVersion=Z,at.needsLights&&(lt.ambientLightColor.value=b.state.ambient,lt.lightProbe.value=b.state.probe,lt.directionalLights.value=b.state.directional,lt.directionalLightShadows.value=b.state.directionalShadow,lt.spotLights.value=b.state.spot,lt.spotLightShadows.value=b.state.spotShadow,lt.rectAreaLights.value=b.state.rectArea,lt.ltc_1.value=b.state.rectAreaLTC1,lt.ltc_2.value=b.state.rectAreaLTC2,lt.pointLights.value=b.state.point,lt.pointLightShadows.value=b.state.pointShadow,lt.hemisphereLights.value=b.state.hemi,lt.directionalShadowMap.value=b.state.directionalShadowMap,lt.directionalShadowMatrix.value=b.state.directionalShadowMatrix,lt.spotShadowMap.value=b.state.spotShadowMap,lt.spotLightMatrix.value=b.state.spotLightMatrix,lt.spotLightMap.value=b.state.spotLightMap,lt.pointShadowMap.value=b.state.pointShadowMap,lt.pointShadowMatrix.value=b.state.pointShadowMatrix),at.currentProgram=et,at.uniformsList=null,et}function to(D){if(D.uniformsList===null){const Q=D.currentProgram.getUniforms();D.uniformsList=Pr.seqWithValue(Q.seq,D.uniforms)}return D.uniformsList}function Ue(D,Q){const rt=vt.get(D);rt.outputColorSpace=Q.outputColorSpace,rt.batching=Q.batching,rt.batchingColor=Q.batchingColor,rt.instancing=Q.instancing,rt.instancingColor=Q.instancingColor,rt.instancingMorph=Q.instancingMorph,rt.skinning=Q.skinning,rt.morphTargets=Q.morphTargets,rt.morphNormals=Q.morphNormals,rt.morphColors=Q.morphColors,rt.morphTargetsCount=Q.morphTargetsCount,rt.numClippingPlanes=Q.numClippingPlanes,rt.numIntersection=Q.numClipIntersection,rt.vertexAlphas=Q.vertexAlphas,rt.vertexTangents=Q.vertexTangents,rt.toneMapping=Q.toneMapping}function yi(D,Q,rt,at,b){Q.isScene!==!0&&(Q=xt),U.resetTextureUnits();const W=Q.fog,Z=at.isMeshStandardMaterial?Q.environment:null,G=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Jn,ot=(at.isMeshStandardMaterial?tt:S).get(at.envMap||Z),it=at.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,et=!!rt.attributes.tangent&&(!!at.normalMap||at.anisotropy>0),lt=!!rt.morphAttributes.position,zt=!!rt.morphAttributes.normal,Mt=!!rt.morphAttributes.color;let Wt=qn;at.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Wt=y.toneMapping);const se=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Ot=se!==void 0?se.length:0,bt=vt.get(at),ee=u.state.lights;if(H===!0&&(K===!0||D!==st)){const qe=D===st&&at.id===q;Et.setState(at,D,qe)}let qt=!1;at.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==ee.state.version||bt.outputColorSpace!==G||b.isBatchedMesh&&bt.batching===!1||!b.isBatchedMesh&&bt.batching===!0||b.isBatchedMesh&&bt.batchingColor===!0&&b.colorTexture===null||b.isBatchedMesh&&bt.batchingColor===!1&&b.colorTexture!==null||b.isInstancedMesh&&bt.instancing===!1||!b.isInstancedMesh&&bt.instancing===!0||b.isSkinnedMesh&&bt.skinning===!1||!b.isSkinnedMesh&&bt.skinning===!0||b.isInstancedMesh&&bt.instancingColor===!0&&b.instanceColor===null||b.isInstancedMesh&&bt.instancingColor===!1&&b.instanceColor!==null||b.isInstancedMesh&&bt.instancingMorph===!0&&b.morphTexture===null||b.isInstancedMesh&&bt.instancingMorph===!1&&b.morphTexture!==null||bt.envMap!==ot||at.fog===!0&&bt.fog!==W||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==Et.numPlanes||bt.numIntersection!==Et.numIntersection)||bt.vertexAlphas!==it||bt.vertexTangents!==et||bt.morphTargets!==lt||bt.morphNormals!==zt||bt.morphColors!==Mt||bt.toneMapping!==Wt||bt.morphTargetsCount!==Ot)&&(qt=!0):(qt=!0,bt.__version=at.version);let Gt=bt.currentProgram;qt===!0&&(Gt=Qn(at,Q,b));let Se=!1,ve=!1,mn=!1;const pe=Gt.getUniforms(),an=bt.uniforms;if(Tt.useProgram(Gt.program)&&(Se=!0,ve=!0,mn=!0),at.id!==q&&(q=at.id,ve=!0),Se||st!==D){St.reverseDepthBuffer?(V.copy(D.projectionMatrix),If(V),Nf(V),pe.setValue(N,"projectionMatrix",V)):pe.setValue(N,"projectionMatrix",D.projectionMatrix),pe.setValue(N,"viewMatrix",D.matrixWorldInverse);const qe=pe.map.cameraPosition;qe!==void 0&&qe.setValue(N,ut.setFromMatrixPosition(D.matrixWorld)),St.logarithmicDepthBuffer&&pe.setValue(N,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(at.isMeshPhongMaterial||at.isMeshToonMaterial||at.isMeshLambertMaterial||at.isMeshBasicMaterial||at.isMeshStandardMaterial||at.isShaderMaterial)&&pe.setValue(N,"isOrthographic",D.isOrthographicCamera===!0),st!==D&&(st=D,ve=!0,mn=!0)}if(b.isSkinnedMesh){pe.setOptional(N,b,"bindMatrix"),pe.setOptional(N,b,"bindMatrixInverse");const qe=b.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),pe.setValue(N,"boneTexture",qe.boneTexture,U))}b.isBatchedMesh&&(pe.setOptional(N,b,"batchingTexture"),pe.setValue(N,"batchingTexture",b._matricesTexture,U),pe.setOptional(N,b,"batchingIdTexture"),pe.setValue(N,"batchingIdTexture",b._indirectTexture,U),pe.setOptional(N,b,"batchingColorTexture"),b._colorsTexture!==null&&pe.setValue(N,"batchingColorTexture",b._colorsTexture,U));const io=rt.morphAttributes;if((io.position!==void 0||io.normal!==void 0||io.color!==void 0)&&Ht.update(b,rt,Gt),(ve||bt.receiveShadow!==b.receiveShadow)&&(bt.receiveShadow=b.receiveShadow,pe.setValue(N,"receiveShadow",b.receiveShadow)),at.isMeshGouraudMaterial&&at.envMap!==null&&(an.envMap.value=ot,an.flipEnvMap.value=ot.isCubeTexture&&ot.isRenderTargetTexture===!1?-1:1),at.isMeshStandardMaterial&&at.envMap===null&&Q.environment!==null&&(an.envMapIntensity.value=Q.environmentIntensity),ve&&(pe.setValue(N,"toneMappingExposure",y.toneMappingExposure),bt.needsLights&&eo(an,mn),W&&at.fog===!0&&mt.refreshFogUniforms(an,W),mt.refreshMaterialUniforms(an,at,O,T,u.state.transmissionRenderTarget[D.id]),Pr.upload(N,to(bt),an,U)),at.isShaderMaterial&&at.uniformsNeedUpdate===!0&&(Pr.upload(N,to(bt),an,U),at.uniformsNeedUpdate=!1),at.isSpriteMaterial&&pe.setValue(N,"center",b.center),pe.setValue(N,"modelViewMatrix",b.modelViewMatrix),pe.setValue(N,"normalMatrix",b.normalMatrix),pe.setValue(N,"modelMatrix",b.matrixWorld),at.isShaderMaterial||at.isRawShaderMaterial){const qe=at.uniformsGroups;for(let so=0,qh=qe.length;so<qh;so++){const ml=qe[so];J.update(ml,Gt),J.bind(ml,Gt)}}return Gt}function eo(D,Q){D.ambientLightColor.needsUpdate=Q,D.lightProbe.needsUpdate=Q,D.directionalLights.needsUpdate=Q,D.directionalLightShadows.needsUpdate=Q,D.pointLights.needsUpdate=Q,D.pointLightShadows.needsUpdate=Q,D.spotLights.needsUpdate=Q,D.spotLightShadows.needsUpdate=Q,D.rectAreaLights.needsUpdate=Q,D.hemisphereLights.needsUpdate=Q}function no(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(D,Q,rt){vt.get(D.texture).__webglTexture=Q,vt.get(D.depthTexture).__webglTexture=rt;const at=vt.get(D);at.__hasExternalTextures=!0,at.__autoAllocateDepthBuffer=rt===void 0,at.__autoAllocateDepthBuffer||pt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),at.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,Q){const rt=vt.get(D);rt.__webglFramebuffer=Q,rt.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(D,Q=0,rt=0){I=D,k=Q,F=rt;let at=!0,b=null,W=!1,Z=!1;if(D){const ot=vt.get(D);if(ot.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(N.FRAMEBUFFER,null),at=!1;else if(ot.__webglFramebuffer===void 0)U.setupRenderTarget(D);else if(ot.__hasExternalTextures)U.rebindTextures(D,vt.get(D.texture).__webglTexture,vt.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const lt=D.depthTexture;if(ot.__boundDepthTexture!==lt){if(lt!==null&&vt.has(lt)&&(D.width!==lt.image.width||D.height!==lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(D)}}const it=D.texture;(it.isData3DTexture||it.isDataArrayTexture||it.isCompressedArrayTexture)&&(Z=!0);const et=vt.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(et[Q])?b=et[Q][rt]:b=et[Q],W=!0):D.samples>0&&U.useMultisampledRTT(D)===!1?b=vt.get(D).__webglMultisampledFramebuffer:Array.isArray(et)?b=et[rt]:b=et,v.copy(D.viewport),_.copy(D.scissor),L=D.scissorTest}else v.copy(z).multiplyScalar(O).floor(),_.copy(B).multiplyScalar(O).floor(),L=$;if(Tt.bindFramebuffer(N.FRAMEBUFFER,b)&&at&&Tt.drawBuffers(D,b),Tt.viewport(v),Tt.scissor(_),Tt.setScissorTest(L),W){const ot=vt.get(D.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ot.__webglTexture,rt)}else if(Z){const ot=vt.get(D.texture),it=Q||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,ot.__webglTexture,rt||0,it)}q=-1},this.readRenderTargetPixels=function(D,Q,rt,at,b,W,Z){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let G=vt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Z!==void 0&&(G=G[Z]),G){Tt.bindFramebuffer(N.FRAMEBUFFER,G);try{const ot=D.texture,it=ot.format,et=ot.type;if(!St.textureFormatReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=D.width-at&&rt>=0&&rt<=D.height-b&&N.readPixels(Q,rt,at,b,Vt.convert(it),Vt.convert(et),W)}finally{const ot=I!==null?vt.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(N.FRAMEBUFFER,ot)}}},this.readRenderTargetPixelsAsync=async function(D,Q,rt,at,b,W,Z){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let G=vt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Z!==void 0&&(G=G[Z]),G){const ot=D.texture,it=ot.format,et=ot.type;if(!St.textureFormatReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Q>=0&&Q<=D.width-at&&rt>=0&&rt<=D.height-b){Tt.bindFramebuffer(N.FRAMEBUFFER,G);const lt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,lt),N.bufferData(N.PIXEL_PACK_BUFFER,W.byteLength,N.STREAM_READ),N.readPixels(Q,rt,at,b,Vt.convert(it),Vt.convert(et),0);const zt=I!==null?vt.get(I).__webglFramebuffer:null;Tt.bindFramebuffer(N.FRAMEBUFFER,zt);const Mt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Df(N,Mt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,lt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,W),N.deleteBuffer(lt),N.deleteSync(Mt),W}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,Q=null,rt=0){D.isTexture!==!0&&(Rr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Q=arguments[0]||null,D=arguments[1]);const at=Math.pow(2,-rt),b=Math.floor(D.image.width*at),W=Math.floor(D.image.height*at),Z=Q!==null?Q.x:0,G=Q!==null?Q.y:0;U.setTexture2D(D,0),N.copyTexSubImage2D(N.TEXTURE_2D,rt,0,0,Z,G,b,W),Tt.unbindTexture()},this.copyTextureToTexture=function(D,Q,rt=null,at=null,b=0){D.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture function signature has changed."),at=arguments[0]||null,D=arguments[1],Q=arguments[2],b=arguments[3]||0,rt=null);let W,Z,G,ot,it,et;rt!==null?(W=rt.max.x-rt.min.x,Z=rt.max.y-rt.min.y,G=rt.min.x,ot=rt.min.y):(W=D.image.width,Z=D.image.height,G=0,ot=0),at!==null?(it=at.x,et=at.y):(it=0,et=0);const lt=Vt.convert(Q.format),zt=Vt.convert(Q.type);U.setTexture2D(Q,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,Q.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,Q.unpackAlignment);const Mt=N.getParameter(N.UNPACK_ROW_LENGTH),Wt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),se=N.getParameter(N.UNPACK_SKIP_PIXELS),Ot=N.getParameter(N.UNPACK_SKIP_ROWS),bt=N.getParameter(N.UNPACK_SKIP_IMAGES),ee=D.isCompressedTexture?D.mipmaps[b]:D.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,ee.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ee.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,G),N.pixelStorei(N.UNPACK_SKIP_ROWS,ot),D.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,b,it,et,W,Z,lt,zt,ee.data):D.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,b,it,et,ee.width,ee.height,lt,ee.data):N.texSubImage2D(N.TEXTURE_2D,b,it,et,W,Z,lt,zt,ee),N.pixelStorei(N.UNPACK_ROW_LENGTH,Mt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Wt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,se),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ot),N.pixelStorei(N.UNPACK_SKIP_IMAGES,bt),b===0&&Q.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),Tt.unbindTexture()},this.copyTextureToTexture3D=function(D,Q,rt=null,at=null,b=0){D.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,at=arguments[1]||null,D=arguments[2],Q=arguments[3],b=arguments[4]||0);let W,Z,G,ot,it,et,lt,zt,Mt;const Wt=D.isCompressedTexture?D.mipmaps[b]:D.image;rt!==null?(W=rt.max.x-rt.min.x,Z=rt.max.y-rt.min.y,G=rt.max.z-rt.min.z,ot=rt.min.x,it=rt.min.y,et=rt.min.z):(W=Wt.width,Z=Wt.height,G=Wt.depth,ot=0,it=0,et=0),at!==null?(lt=at.x,zt=at.y,Mt=at.z):(lt=0,zt=0,Mt=0);const se=Vt.convert(Q.format),Ot=Vt.convert(Q.type);let bt;if(Q.isData3DTexture)U.setTexture3D(Q,0),bt=N.TEXTURE_3D;else if(Q.isDataArrayTexture||Q.isCompressedArrayTexture)U.setTexture2DArray(Q,0),bt=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,Q.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,Q.unpackAlignment);const ee=N.getParameter(N.UNPACK_ROW_LENGTH),qt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Gt=N.getParameter(N.UNPACK_SKIP_PIXELS),Se=N.getParameter(N.UNPACK_SKIP_ROWS),ve=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Wt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Wt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ot),N.pixelStorei(N.UNPACK_SKIP_ROWS,it),N.pixelStorei(N.UNPACK_SKIP_IMAGES,et),D.isDataTexture||D.isData3DTexture?N.texSubImage3D(bt,b,lt,zt,Mt,W,Z,G,se,Ot,Wt.data):Q.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,b,lt,zt,Mt,W,Z,G,se,Wt.data):N.texSubImage3D(bt,b,lt,zt,Mt,W,Z,G,se,Ot,Wt),N.pixelStorei(N.UNPACK_ROW_LENGTH,ee),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Gt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Se),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ve),b===0&&Q.generateMipmaps&&N.generateMipmap(bt),Tt.unbindTexture()},this.initRenderTarget=function(D){vt.get(D).__webglFramebuffer===void 0&&U.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?U.setTextureCube(D,0):D.isData3DTexture?U.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?U.setTexture2DArray(D,0):U.setTexture2D(D,0),Tt.unbindTexture()},this.resetState=function(){k=0,F=0,I=null,Tt.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Qa?"display-p3":"srgb",e.unpackColorSpace=ne.workingColorSpace===Wr?"display-p3":"srgb"}}class il{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Yt(t),this.near=e,this.far=n}clone(){return new il(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bs extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class W1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ba,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Fe=new Y;class zr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new zr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class $i extends jn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Fi;const ms=new Y,Oi=new Y,Bi=new Y,zi=new Ct,gs=new Ct,Ph=new ie,cr=new Y,vs=new Y,hr=new Y,gc=new Ct,Bo=new Ct,vc=new Ct;class bs extends ye{constructor(t=new $i){if(super(),this.isSprite=!0,this.type="Sprite",Fi===void 0){Fi=new de;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new W1(e,5);Fi.setIndex([0,1,2,0,2,3]),Fi.setAttribute("position",new zr(n,3,0,!1)),Fi.setAttribute("uv",new zr(n,2,3,!1))}this.geometry=Fi,this.material=t,this.center=new Ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Oi.setFromMatrixScale(this.matrixWorld),Ph.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Bi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Oi.multiplyScalar(-Bi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;ur(cr.set(-.5,-.5,0),Bi,o,Oi,s,r),ur(vs.set(.5,-.5,0),Bi,o,Oi,s,r),ur(hr.set(.5,.5,0),Bi,o,Oi,s,r),gc.set(0,0),Bo.set(1,0),vc.set(1,1);let a=t.ray.intersectTriangle(cr,vs,hr,!1,ms);if(a===null&&(ur(vs.set(-.5,.5,0),Bi,o,Oi,s,r),Bo.set(0,1),a=t.ray.intersectTriangle(cr,hr,vs,!1,ms),a===null))return;const l=t.ray.origin.distanceTo(ms);l<t.near||l>t.far||e.push({distance:l,point:ms.clone(),uv:Ve.getInterpolation(ms,cr,vs,hr,gc,Bo,vc,new Ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ur(i,t,e,n,s,r){zi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(gs.x=r*zi.x-s*zi.y,gs.y=s*zi.x+r*zi.y):gs.copy(zi),i.copy(t),i.x+=gs.x,i.y+=gs.y,i.applyMatrix4(Ph)}class $r extends jn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const kr=new Y,Hr=new Y,_c=new ie,_s=new Xr,fr=new Os,zo=new Y,xc=new Y;class sl extends ye{constructor(t=new de,e=new $r){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)kr.fromBufferAttribute(e,s-1),Hr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=kr.distanceTo(Hr);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),fr.radius+=r,t.ray.intersectsSphere(fr)===!1)return;_c.copy(s).invert(),_s.copy(t.ray).applyMatrix4(_c);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const g=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let x=g,u=f-1;x<u;x+=c){const m=h.getX(x),E=h.getX(x+1),y=dr(this,t,_s,l,m,E);y&&e.push(y)}if(this.isLineLoop){const x=h.getX(f-1),u=h.getX(g),m=dr(this,t,_s,l,x,u);m&&e.push(m)}}else{const g=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let x=g,u=f-1;x<u;x+=c){const m=dr(this,t,_s,l,x,x+1);m&&e.push(m)}if(this.isLineLoop){const x=dr(this,t,_s,l,f-1,g);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function dr(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(kr.fromBufferAttribute(o,s),Hr.fromBufferAttribute(o,r),e.distanceSqToSegment(kr,Hr,zo,xc)>n)return;zo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(zo);if(!(l<t.near||l>t.far))return{distance:l,point:xc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const yc=new Y,Mc=new Y;class X1 extends sl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)yc.fromBufferAttribute(e,s),Mc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+yc.distanceTo(Mc);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class q1 extends sl{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class es extends jn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Sc=new ie,Ha=new Xr,pr=new Os,mr=new Y;class Rs extends ye{constructor(t=new de,e=new es){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),pr.radius+=r,t.ray.intersectsSphere(pr)===!1)return;Sc.copy(s).invert(),Ha.copy(t.ray).applyMatrix4(Sc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,p=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),g=Math.min(c.count,o.start+o.count);for(let f=d,x=g;f<x;f++){const u=c.getX(f);mr.fromBufferAttribute(p,u),Ec(mr,u,l,s,t,e,this)}}else{const d=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let f=d,x=g;f<x;f++)mr.fromBufferAttribute(p,f),Ec(mr,f,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ec(i,t,e,n,s,r,o){const a=Ha.distanceSqToPoint(i);if(a<e){const l=new Y;Ha.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Rn extends Ie{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,g=(o-h)/d;return(s+g)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Ct:new Y);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new Y,s=[],r=[],o=[],a=new Y,l=new ie;for(let g=0;g<=t;g++){const f=g/t;s[g]=this.getTangentAt(f,new Y)}r[0]=new Y,o[0]=new Y;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),p=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let g=1;g<=t;g++){if(r[g]=r[g-1].clone(),o[g]=o[g-1].clone(),a.crossVectors(s[g-1],s[g]),a.length()>Number.EPSILON){a.normalize();const f=Math.acos(De(s[g-1].dot(s[g]),-1,1));r[g].applyMatrix4(l.makeRotationAxis(a,f))}o[g].crossVectors(s[g],r[g])}if(e===!0){let g=Math.acos(De(r[0].dot(r[t]),-1,1));g/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(g=-g);for(let f=1;f<=t;f++)r[f].applyMatrix4(l.makeRotationAxis(s[f],g*f)),o[f].crossVectors(s[f],r[f])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class rl extends dn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Ct){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),d=l-this.aX,g=c-this.aY;l=d*h-g*p+this.aX,c=d*p+g*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Y1 extends rl{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ol(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,p){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,g=(a-o)/h-(l-o)/(h+p)+(l-a)/p;d*=h,g*=h,s(o,a,d,g)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const gr=new Y,ko=new ol,Ho=new ol,Go=new ol;class $1 extends dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new Y){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(gr.subVectors(s[0],s[1]).add(s[0]),c=gr);const p=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(gr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=gr),this.curveType==="centripetal"||this.curveType==="chordal"){const g=this.curveType==="chordal"?.5:.25;let f=Math.pow(c.distanceToSquared(p),g),x=Math.pow(p.distanceToSquared(d),g),u=Math.pow(d.distanceToSquared(h),g);x<1e-4&&(x=1),f<1e-4&&(f=x),u<1e-4&&(u=x),ko.initNonuniformCatmullRom(c.x,p.x,d.x,h.x,f,x,u),Ho.initNonuniformCatmullRom(c.y,p.y,d.y,h.y,f,x,u),Go.initNonuniformCatmullRom(c.z,p.z,d.z,h.z,f,x,u)}else this.curveType==="catmullrom"&&(ko.initCatmullRom(c.x,p.x,d.x,h.x,this.tension),Ho.initCatmullRom(c.y,p.y,d.y,h.y,this.tension),Go.initCatmullRom(c.z,p.z,d.z,h.z,this.tension));return n.set(ko.calc(l),Ho.calc(l),Go.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Y().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function bc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function K1(i,t){const e=1-i;return e*e*t}function Z1(i,t){return 2*(1-i)*i*t}function J1(i,t){return i*i*t}function ws(i,t,e,n){return K1(i,t)+Z1(i,e)+J1(i,n)}function j1(i,t){const e=1-i;return e*e*e*t}function Q1(i,t){const e=1-i;return 3*e*e*i*t}function tg(i,t){return 3*(1-i)*i*i*t}function eg(i,t){return i*i*i*t}function Ts(i,t,e,n,s){return j1(i,t)+Q1(i,e)+tg(i,n)+eg(i,s)}class Lh extends dn{constructor(t=new Ct,e=new Ct,n=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ct){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ts(t,s.x,r.x,o.x,a.x),Ts(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ng extends dn{constructor(t=new Y,e=new Y,n=new Y,s=new Y){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Y){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ts(t,s.x,r.x,o.x,a.x),Ts(t,s.y,r.y,o.y,a.y),Ts(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dh extends dn{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ig extends dn{constructor(t=new Y,e=new Y){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new Y){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Y){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ih extends dn{constructor(t=new Ct,e=new Ct,n=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ct){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ws(t,s.x,r.x,o.x),ws(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sg extends dn{constructor(t=new Y,e=new Y,n=new Y){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Y){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ws(t,s.x,r.x,o.x),ws(t,s.y,r.y,o.y),ws(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nh extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return n.set(bc(a,l.x,c.x,h.x,p.x),bc(a,l.y,c.y,h.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}}var Ga=Object.freeze({__proto__:null,ArcCurve:Y1,CatmullRomCurve3:$1,CubicBezierCurve:Lh,CubicBezierCurve3:ng,EllipseCurve:rl,LineCurve:Dh,LineCurve3:ig,QuadraticBezierCurve:Ih,QuadraticBezierCurve3:sg,SplineCurve:Nh});class rg extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ga[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Ga[s.type]().fromJSON(s))}return this}}class wc extends rg{constructor(t){super(),this.type="Path",this.currentPoint=new Ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Dh(this.currentPoint.clone(),new Ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Ih(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Lh(this.currentPoint.clone(),new Ct(t,e),new Ct(n,s),new Ct(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Nh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new rl(t,e,n,s,r,o,a,l);if(this.curves.length>0){const p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class zs extends de{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],p=[],d=[],g=[];let f=0;const x=[],u=n/2;let m=0;E(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(d,3)),this.setAttribute("uv",new ce(g,2));function E(){const M=new Y,k=new Y;let F=0;const I=(e-t)/n;for(let q=0;q<=r;q++){const st=[],v=q/r,_=v*(e-t)+t;for(let L=0;L<=s;L++){const P=L/s,w=P*l+a,C=Math.sin(w),T=Math.cos(w);k.x=_*C,k.y=-v*n+u,k.z=_*T,p.push(k.x,k.y,k.z),M.set(C,I,T).normalize(),d.push(M.x,M.y,M.z),g.push(P,1-v),st.push(f++)}x.push(st)}for(let q=0;q<s;q++)for(let st=0;st<r;st++){const v=x[st][q],_=x[st+1][q],L=x[st+1][q+1],P=x[st][q+1];t>0&&(h.push(v,_,P),F+=3),e>0&&(h.push(_,L,P),F+=3)}c.addGroup(m,F,0),m+=F}function y(M){const k=f,F=new Ct,I=new Y;let q=0;const st=M===!0?t:e,v=M===!0?1:-1;for(let L=1;L<=s;L++)p.push(0,u*v,0),d.push(0,v,0),g.push(.5,.5),f++;const _=f;for(let L=0;L<=s;L++){const w=L/s*l+a,C=Math.cos(w),T=Math.sin(w);I.x=st*T,I.y=u*v,I.z=st*C,p.push(I.x,I.y,I.z),d.push(0,v,0),F.x=C*.5+.5,F.y=T*.5*v+.5,g.push(F.x,F.y),f++}for(let L=0;L<s;L++){const P=k+L,w=_+L;M===!0?h.push(w,w+1,P):h.push(w+1,w,P),q+=3}c.addGroup(m,q,M===!0?1:2),m+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class al extends zs{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new al(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const vr=new Y,_r=new Y,Vo=new Y,xr=new Ve;class og extends de{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Cr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],p=new Array(3),d={},g=[];for(let f=0;f<l;f+=3){o?(c[0]=o.getX(f),c[1]=o.getX(f+1),c[2]=o.getX(f+2)):(c[0]=f,c[1]=f+1,c[2]=f+2);const{a:x,b:u,c:m}=xr;if(x.fromBufferAttribute(a,c[0]),u.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),xr.getNormal(Vo),p[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,p[1]=`${Math.round(u.x*s)},${Math.round(u.y*s)},${Math.round(u.z*s)}`,p[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let E=0;E<3;E++){const y=(E+1)%3,M=p[E],k=p[y],F=xr[h[E]],I=xr[h[y]],q=`${M}_${k}`,st=`${k}_${M}`;st in d&&d[st]?(Vo.dot(d[st].normal)<=r&&(g.push(F.x,F.y,F.z),g.push(I.x,I.y,I.z)),d[st]=null):q in d||(d[q]={index0:c[E],index1:c[y],normal:Vo.clone()})}}for(const f in d)if(d[f]){const{index0:x,index1:u}=d[f];vr.fromBufferAttribute(a,x),_r.fromBufferAttribute(a,u),g.push(vr.x,vr.y,vr.z),g.push(_r.x,_r.y,_r.z)}this.setAttribute("position",new ce(g,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class ll extends wc{constructor(t){super(t),this.uuid=Cn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new wc().fromJSON(s))}return this}}const ag={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Uh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,p,d,g;if(n&&(r=fg(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let f=e;f<s;f+=e)p=i[f],d=i[f+1],p<a&&(a=p),d<l&&(l=d),p>c&&(c=p),d>h&&(h=d);g=Math.max(c-a,h-l),g=g!==0?32767/g:0}return Ps(r,o,e,a,l,g,0),o}};function Uh(i,t,e,n,s){let r,o;if(s===Eg(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Tc(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Tc(r,i[r],i[r+1],o);return o&&Kr(o,o.next)&&(Ds(o),o=o.next),o}function _i(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Kr(e,e.next)||ge(e.prev,e,e.next)===0)){if(Ds(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ps(i,t,e,n,s,r,o){if(!i)return;!o&&r&&vg(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?cg(i,n,s,r):lg(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Ds(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=hg(_i(i),t,e),Ps(i,t,e,n,s,r,2)):o===2&&ug(i,t,e,n,s,r):Ps(_i(i),t,e,n,s,r,1);break}}}function lg(i){const t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,p=a<l?a<c?a:c:l<c?l:c,d=s>r?s>o?s:o:r>o?r:o,g=a>l?a>c?a:c:l>c?l:c;let f=n.next;for(;f!==t;){if(f.x>=h&&f.x<=d&&f.y>=p&&f.y<=g&&Vi(s,a,r,l,o,c,f.x,f.y)&&ge(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function cg(i,t,e,n){const s=i.prev,r=i,o=i.next;if(ge(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,p=r.y,d=o.y,g=a<l?a<c?a:c:l<c?l:c,f=h<p?h<d?h:d:p<d?p:d,x=a>l?a>c?a:c:l>c?l:c,u=h>p?h>d?h:d:p>d?p:d,m=Va(g,f,t,e,n),E=Va(x,u,t,e,n);let y=i.prevZ,M=i.nextZ;for(;y&&y.z>=m&&M&&M.z<=E;){if(y.x>=g&&y.x<=x&&y.y>=f&&y.y<=u&&y!==s&&y!==o&&Vi(a,h,l,p,c,d,y.x,y.y)&&ge(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=g&&M.x<=x&&M.y>=f&&M.y<=u&&M!==s&&M!==o&&Vi(a,h,l,p,c,d,M.x,M.y)&&ge(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=m;){if(y.x>=g&&y.x<=x&&y.y>=f&&y.y<=u&&y!==s&&y!==o&&Vi(a,h,l,p,c,d,y.x,y.y)&&ge(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=E;){if(M.x>=g&&M.x<=x&&M.y>=f&&M.y<=u&&M!==s&&M!==o&&Vi(a,h,l,p,c,d,M.x,M.y)&&ge(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function hg(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Kr(s,r)&&Fh(s,n,n.next,r)&&Ls(s,r)&&Ls(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Ds(n),Ds(n.next),n=i=r),n=n.next}while(n!==i);return _i(n)}function ug(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&yg(o,a)){let l=Oh(o,a);o=_i(o,o.next),l=_i(l,l.next),Ps(o,t,e,n,s,r,0),Ps(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function fg(i,t,e,n){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Uh(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(xg(c));for(s.sort(dg),r=0;r<s.length;r++)e=pg(s[r],e);return e}function dg(i,t){return i.x-t.x}function pg(i,t){const e=mg(i,t);if(!e)return t;const n=Oh(e,i);return _i(n,n.next),_i(e,e.next)}function mg(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,p;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Vi(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(p=Math.abs(o-e.y)/(r-e.x),Ls(e,i)&&(p<h||p===h&&(e.x>s.x||e.x===s.x&&gg(s,e)))&&(s=e,h=p)),e=e.next;while(e!==a);return s}function gg(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function vg(i,t,e,n){let s=i;do s.z===0&&(s.z=Va(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,_g(s)}function _g(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function Va(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function xg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Vi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function yg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Mg(i,t)&&(Ls(i,t)&&Ls(t,i)&&Sg(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||Kr(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Kr(i,t){return i.x===t.x&&i.y===t.y}function Fh(i,t,e,n){const s=Mr(ge(i,t,e)),r=Mr(ge(i,t,n)),o=Mr(ge(e,n,i)),a=Mr(ge(e,n,t));return!!(s!==r&&o!==a||s===0&&yr(i,e,t)||r===0&&yr(i,n,t)||o===0&&yr(e,i,n)||a===0&&yr(e,t,n))}function yr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Mr(i){return i>0?1:i<0?-1:0}function Mg(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Fh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ls(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function Sg(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Oh(i,t){const e=new Wa(i.i,i.x,i.y),n=new Wa(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Tc(i,t,e,n){const s=new Wa(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ds(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Wa(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Eg(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class $n{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return $n.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Ac(t),Cc(n,t);let o=t.length;e.forEach(Ac);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Cc(n,e[l]);const a=ag.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Ac(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Cc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class cl extends de{constructor(t=new ll([new Ct(.5,.5),new Ct(-.5,.5),new Ct(-.5,-.5),new Ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new ce(s,3)),this.setAttribute("uv",new ce(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,g=e.bevelThickness!==void 0?e.bevelThickness:.2,f=e.bevelSize!==void 0?e.bevelSize:g-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,u=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:bg;let y,M=!1,k,F,I,q;m&&(y=m.getSpacedPoints(h),M=!0,d=!1,k=m.computeFrenetFrames(h,!1),F=new Y,I=new Y,q=new Y),d||(u=0,g=0,f=0,x=0);const st=a.extractPoints(c);let v=st.shape;const _=st.holes;if(!$n.isClockWise(v)){v=v.reverse();for(let nt=0,N=_.length;nt<N;nt++){const dt=_[nt];$n.isClockWise(dt)&&(_[nt]=dt.reverse())}}const P=$n.triangulateShape(v,_),w=v;for(let nt=0,N=_.length;nt<N;nt++){const dt=_[nt];v=v.concat(dt)}function C(nt,N,dt){return N||console.error("THREE.ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(N,dt)}const T=v.length,O=P.length;function A(nt,N,dt){let pt,St,Tt;const Ft=nt.x-N.x,vt=nt.y-N.y,U=dt.x-nt.x,S=dt.y-nt.y,tt=Ft*Ft+vt*vt,ft=Ft*S-vt*U;if(Math.abs(ft)>Number.EPSILON){const _t=Math.sqrt(tt),ht=Math.sqrt(U*U+S*S),wt=N.x-vt/_t,mt=N.y+Ft/_t,Rt=dt.x-S/ht,$t=dt.y+U/ht,Et=((Rt-wt)*S-($t-mt)*U)/(Ft*S-vt*U);pt=wt+Ft*Et-nt.x,St=mt+vt*Et-nt.y;const Lt=pt*pt+St*St;if(Lt<=2)return new Ct(pt,St);Tt=Math.sqrt(Lt/2)}else{let _t=!1;Ft>Number.EPSILON?U>Number.EPSILON&&(_t=!0):Ft<-Number.EPSILON?U<-Number.EPSILON&&(_t=!0):Math.sign(vt)===Math.sign(S)&&(_t=!0),_t?(pt=-vt,St=Ft,Tt=Math.sqrt(tt)):(pt=Ft,St=vt,Tt=Math.sqrt(tt/2))}return new Ct(pt/Tt,St/Tt)}const R=[];for(let nt=0,N=w.length,dt=N-1,pt=nt+1;nt<N;nt++,dt++,pt++)dt===N&&(dt=0),pt===N&&(pt=0),R[nt]=A(w[nt],w[dt],w[pt]);const z=[];let B,$=R.concat();for(let nt=0,N=_.length;nt<N;nt++){const dt=_[nt];B=[];for(let pt=0,St=dt.length,Tt=St-1,Ft=pt+1;pt<St;pt++,Tt++,Ft++)Tt===St&&(Tt=0),Ft===St&&(Ft=0),B[pt]=A(dt[pt],dt[Tt],dt[Ft]);z.push(B),$=$.concat(B)}for(let nt=0;nt<u;nt++){const N=nt/u,dt=g*Math.cos(N*Math.PI/2),pt=f*Math.sin(N*Math.PI/2)+x;for(let St=0,Tt=w.length;St<Tt;St++){const Ft=C(w[St],R[St],pt);j(Ft.x,Ft.y,-dt)}for(let St=0,Tt=_.length;St<Tt;St++){const Ft=_[St];B=z[St];for(let vt=0,U=Ft.length;vt<U;vt++){const S=C(Ft[vt],B[vt],pt);j(S.x,S.y,-dt)}}}const X=f+x;for(let nt=0;nt<T;nt++){const N=d?C(v[nt],$[nt],X):v[nt];M?(I.copy(k.normals[0]).multiplyScalar(N.x),F.copy(k.binormals[0]).multiplyScalar(N.y),q.copy(y[0]).add(I).add(F),j(q.x,q.y,q.z)):j(N.x,N.y,0)}for(let nt=1;nt<=h;nt++)for(let N=0;N<T;N++){const dt=d?C(v[N],$[N],X):v[N];M?(I.copy(k.normals[nt]).multiplyScalar(dt.x),F.copy(k.binormals[nt]).multiplyScalar(dt.y),q.copy(y[nt]).add(I).add(F),j(q.x,q.y,q.z)):j(dt.x,dt.y,p/h*nt)}for(let nt=u-1;nt>=0;nt--){const N=nt/u,dt=g*Math.cos(N*Math.PI/2),pt=f*Math.sin(N*Math.PI/2)+x;for(let St=0,Tt=w.length;St<Tt;St++){const Ft=C(w[St],R[St],pt);j(Ft.x,Ft.y,p+dt)}for(let St=0,Tt=_.length;St<Tt;St++){const Ft=_[St];B=z[St];for(let vt=0,U=Ft.length;vt<U;vt++){const S=C(Ft[vt],B[vt],pt);M?j(S.x,S.y+y[h-1].y,y[h-1].x+dt):j(S.x,S.y,p+dt)}}}H(),K();function H(){const nt=s.length/3;if(d){let N=0,dt=T*N;for(let pt=0;pt<O;pt++){const St=P[pt];ut(St[2]+dt,St[1]+dt,St[0]+dt)}N=h+u*2,dt=T*N;for(let pt=0;pt<O;pt++){const St=P[pt];ut(St[0]+dt,St[1]+dt,St[2]+dt)}}else{for(let N=0;N<O;N++){const dt=P[N];ut(dt[2],dt[1],dt[0])}for(let N=0;N<O;N++){const dt=P[N];ut(dt[0]+T*h,dt[1]+T*h,dt[2]+T*h)}}n.addGroup(nt,s.length/3-nt,0)}function K(){const nt=s.length/3;let N=0;V(w,N),N+=w.length;for(let dt=0,pt=_.length;dt<pt;dt++){const St=_[dt];V(St,N),N+=St.length}n.addGroup(nt,s.length/3-nt,1)}function V(nt,N){let dt=nt.length;for(;--dt>=0;){const pt=dt;let St=dt-1;St<0&&(St=nt.length-1);for(let Tt=0,Ft=h+u*2;Tt<Ft;Tt++){const vt=T*Tt,U=T*(Tt+1),S=N+pt+vt,tt=N+St+vt,ft=N+St+U,_t=N+pt+U;gt(S,tt,ft,_t)}}}function j(nt,N,dt){l.push(nt),l.push(N),l.push(dt)}function ut(nt,N,dt){xt(nt),xt(N),xt(dt);const pt=s.length/3,St=E.generateTopUV(n,s,pt-3,pt-2,pt-1);At(St[0]),At(St[1]),At(St[2])}function gt(nt,N,dt,pt){xt(nt),xt(N),xt(pt),xt(N),xt(dt),xt(pt);const St=s.length/3,Tt=E.generateSideWallUV(n,s,St-6,St-3,St-2,St-1);At(Tt[0]),At(Tt[1]),At(Tt[3]),At(Tt[1]),At(Tt[2]),At(Tt[3])}function xt(nt){s.push(l[nt*3+0]),s.push(l[nt*3+1]),s.push(l[nt*3+2])}function At(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return wg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ga[s.type]().fromJSON(s)),new cl(n,t.options)}}const bg={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new Ct(r,o),new Ct(a,l),new Ct(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],p=t[n*3+2],d=t[s*3],g=t[s*3+1],f=t[s*3+2],x=t[r*3],u=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new Ct(o,1-l),new Ct(c,1-p),new Ct(d,1-f),new Ct(x,1-m)]:[new Ct(a,1-l),new Ct(h,1-p),new Ct(g,1-f),new Ct(u,1-m)]}};function wg(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Zr extends de{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let p=t;const d=(e-t)/s,g=new Y,f=new Ct;for(let x=0;x<=s;x++){for(let u=0;u<=n;u++){const m=r+u/n*o;g.x=p*Math.cos(m),g.y=p*Math.sin(m),l.push(g.x,g.y,g.z),c.push(0,0,1),f.x=(g.x/e+1)/2,f.y=(g.y/e+1)/2,h.push(f.x,f.y)}p+=d}for(let x=0;x<s;x++){const u=x*(n+1);for(let m=0;m<n;m++){const E=m+u,y=E,M=E+n+1,k=E+n+2,F=E+1;a.push(y,M,F),a.push(M,k,F)}}this.setIndex(a),this.setAttribute("position",new ce(l,3)),this.setAttribute("normal",new ce(c,3)),this.setAttribute("uv",new ce(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hl extends de{constructor(t=new ll([new Ct(0,.5),new Ct(-.5,-.5),new Ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new ce(s,3)),this.setAttribute("normal",new ce(r,3)),this.setAttribute("uv",new ce(o,2));function c(h){const p=s.length/3,d=h.extractPoints(e);let g=d.shape;const f=d.holes;$n.isClockWise(g)===!1&&(g=g.reverse());for(let u=0,m=f.length;u<m;u++){const E=f[u];$n.isClockWise(E)===!0&&(f[u]=E.reverse())}const x=$n.triangulateShape(g,f);for(let u=0,m=f.length;u<m;u++){const E=f[u];g=g.concat(E)}for(let u=0,m=g.length;u<m;u++){const E=g[u];s.push(E.x,E.y,0),r.push(0,0,1),o.push(E.x,E.y)}for(let u=0,m=x.length;u<m;u++){const E=x[u],y=E[0]+p,M=E[1]+p,k=E[2]+p;n.push(y,M,k),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Tg(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new hl(n,t.curveSegments)}}function Tg(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Is extends de{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],p=new Y,d=new Y,g=[],f=[],x=[],u=[];for(let m=0;m<=n;m++){const E=[],y=m/n;let M=0;m===0&&o===0?M=.5/e:m===n&&l===Math.PI&&(M=-.5/e);for(let k=0;k<=e;k++){const F=k/e;p.x=-t*Math.cos(s+F*r)*Math.sin(o+y*a),p.y=t*Math.cos(o+y*a),p.z=t*Math.sin(s+F*r)*Math.sin(o+y*a),f.push(p.x,p.y,p.z),d.copy(p).normalize(),x.push(d.x,d.y,d.z),u.push(F+M,1-y),E.push(c++)}h.push(E)}for(let m=0;m<n;m++)for(let E=0;E<e;E++){const y=h[m][E+1],M=h[m][E],k=h[m+1][E],F=h[m+1][E+1];(m!==0||o>0)&&g.push(y,M,F),(m!==n-1||l<Math.PI)&&g.push(M,k,F)}this.setIndex(g),this.setAttribute("position",new ce(f,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Is(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ul extends de{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new Y,p=new Y,d=new Y;for(let g=0;g<=n;g++)for(let f=0;f<=s;f++){const x=f/s*r,u=g/n*Math.PI*2;p.x=(t+e*Math.cos(u))*Math.cos(x),p.y=(t+e*Math.cos(u))*Math.sin(x),p.z=e*Math.sin(u),a.push(p.x,p.y,p.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(p,h).normalize(),l.push(d.x,d.y,d.z),c.push(f/s),c.push(g/n)}for(let g=1;g<=n;g++)for(let f=1;f<=s;f++){const x=(s+1)*g+f-1,u=(s+1)*(g-1)+f-1,m=(s+1)*(g-1)+f,E=(s+1)*g+f;o.push(x,u,E),o.push(u,m,E)}this.setIndex(o),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(l,3)),this.setAttribute("uv",new ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ul(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class En extends jn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fh,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Rc={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Ag{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){const p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,d=c.length;p<d;p+=2){const g=c[p],f=c[p+1];if(g.global&&(g.lastIndex=0),g.test(h))return f}return null}}}const Cg=new Ag;class fl{constructor(t){this.manager=t!==void 0?t:Cg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}fl.DEFAULT_MATERIAL_NAME="__DEFAULT";class Rg extends fl{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Rc.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=Cs("img");function l(){h(),Rc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(p){h(),s&&s(p),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Pg extends fl{constructor(t){super(t)}load(t,e,n,s){const r=new Ie,o=new Rg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class Jr extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Bh extends Jr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Wo=new ie,Pc=new Y,Lc=new Y;class zh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new el,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Pc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Pc),Lc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lc),e.updateMatrixWorld(),Wo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Dc=new ie,xs=new Y,Xo=new Y;class Lg extends zh{constructor(){super(new Ce(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new Y(1,0,0),new Y(-1,0,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,1,0),new Y(0,-1,0)],this._cubeUps=[new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,0,1),new Y(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),xs.setFromMatrixPosition(t.matrixWorld),n.position.copy(xs),Xo.copy(n.position),Xo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Xo),n.updateMatrixWorld(),s.makeTranslation(-xs.x,-xs.y,-xs.z),Dc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dc)}}class kh extends Jr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Lg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Dg extends zh{constructor(){super(new bh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ic extends Jr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new Dg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ig extends Jr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Nc=new ie;class jr{constructor(t,e,n=0,s=1/0){this.ray=new Xr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new tl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Nc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nc),this}intersectObject(t,e=!0,n=[]){return Xa(t,this,n,e),n.sort(Uc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Xa(t[s],this,n,e);return n.sort(Uc),n}}function Uc(i,t){return i.distance-t.distance}function Xa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Xa(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);const Fc=new Y,Ng=new is,Oc=new Y;class Ug extends ye{constructor(t=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this}}const ln=new ie,Fg=new ie;class Og{constructor(t={}){const e=this;let n,s,r,o;const a={camera:{style:""},objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;const c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);const h=document.createElement("div");h.style.transformStyle="preserve-3d",c.appendChild(h),this.getSize=function(){return{width:n,height:s}},this.render=function(u,m){const E=m.projectionMatrix.elements[5]*o;m.view&&m.view.enabled?(c.style.transform=`translate( ${-m.view.offsetX*(n/m.view.width)}px, ${-m.view.offsetY*(s/m.view.height)}px )`,c.style.transform+=`scale( ${m.view.fullWidth/m.view.width}, ${m.view.fullHeight/m.view.height} )`):c.style.transform="",u.matrixWorldAutoUpdate===!0&&u.updateMatrixWorld(),m.parent===null&&m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld();let y,M;m.isOrthographicCamera&&(y=-(m.right+m.left)/2,M=(m.top+m.bottom)/2);const k=m.view&&m.view.enabled?m.view.height/m.view.fullHeight:1,F=m.isOrthographicCamera?`scale( ${k} )scale(`+E+")translate("+p(y)+"px,"+p(M)+"px)"+d(m.matrixWorldInverse):`scale( ${k} )translateZ(`+E+"px)"+d(m.matrixWorldInverse),q=(m.isPerspectiveCamera?"perspective("+E+"px) ":"")+F+"translate("+r+"px,"+o+"px)";a.camera.style!==q&&(h.style.transform=q,a.camera.style=q),x(u,u,m)},this.setSize=function(u,m){n=u,s=m,r=n/2,o=s/2,l.style.width=u+"px",l.style.height=m+"px",c.style.width=u+"px",c.style.height=m+"px",h.style.width=u+"px",h.style.height=m+"px"};function p(u){return Math.abs(u)<1e-10?0:u}function d(u){const m=u.elements;return"matrix3d("+p(m[0])+","+p(-m[1])+","+p(m[2])+","+p(m[3])+","+p(m[4])+","+p(-m[5])+","+p(m[6])+","+p(m[7])+","+p(m[8])+","+p(-m[9])+","+p(m[10])+","+p(m[11])+","+p(m[12])+","+p(-m[13])+","+p(m[14])+","+p(m[15])+")"}function g(u){const m=u.elements;return"translate(-50%,-50%)"+("matrix3d("+p(m[0])+","+p(m[1])+","+p(m[2])+","+p(m[3])+","+p(-m[4])+","+p(-m[5])+","+p(-m[6])+","+p(-m[7])+","+p(m[8])+","+p(m[9])+","+p(m[10])+","+p(m[11])+","+p(m[12])+","+p(m[13])+","+p(m[14])+","+p(m[15])+")")}function f(u){u.isCSS3DObject&&(u.element.style.display="none");for(let m=0,E=u.children.length;m<E;m++)f(u.children[m])}function x(u,m,E,y){if(u.visible===!1){f(u);return}if(u.isCSS3DObject){const M=u.layers.test(E.layers)===!0,k=u.element;if(k.style.display=M===!0?"":"none",M===!0){u.onBeforeRender(e,m,E);let F;u.isCSS3DSprite?(ln.copy(E.matrixWorldInverse),ln.transpose(),u.rotation2D!==0&&ln.multiply(Fg.makeRotationZ(u.rotation2D)),u.matrixWorld.decompose(Fc,Ng,Oc),ln.setPosition(Fc),ln.scale(Oc),ln.elements[3]=0,ln.elements[7]=0,ln.elements[11]=0,ln.elements[15]=1,F=g(ln)):F=g(u.matrixWorld);const I=a.objects.get(u);if(I===void 0||I.style!==F){k.style.transform=F;const q={style:F};a.objects.set(u,q)}k.parentNode!==h&&h.appendChild(k),u.onAfterRender(e,m,E)}}for(let M=0,k=u.children.length;M<k;M++)x(u.children[M],m,E)}}}const Bg=[{type:"Feature",properties:{name:"福州市"},geometry:{type:"MultiPolygon",coordinates:[[[[119.8,26.5468],[119.7287,26.5595],[119.6379,26.5282],[119.5655,26.5465],[119.5066,26.6072],[119.4085,26.6344],[119.3796,26.6115],[119.3355,26.5852],[119.2851,26.5704],[119.2045,26.5634],[119.1413,26.5379],[119.0904,26.566],[119.0578,26.6037],[119.0061,26.5557],[118.9538,26.5256],[118.9503,26.4695],[118.8602,26.4534],[118.8047,26.4683],[118.7469,26.5024],[118.7533,26.3985],[118.7535,26.3343],[118.6966,26.2915],[118.6633,26.2279],[118.6097,26.2049],[118.568,26.1764],[118.5837,26.0985],[118.5919,26.0522],[118.5139,25.9767],[118.5077,25.9015],[118.4711,25.8986],[118.4325,25.9176],[118.4212,25.8546],[118.398,25.801],[118.4544,25.7207],[118.5401,25.6616],[118.5838,25.6778],[118.6255,25.6974],[118.6744,25.6949],[118.7233,25.6698],[118.7724,25.6864],[118.8389,25.7089],[118.9203,25.7263],[118.955,25.7327],[119.0488,25.7471],[119.1329,25.7528],[119.1443,25.6849],[119.1515,25.6187],[119.1636,25.5872],[119.2039,25.545],[119.2238,25.4897],[119.2726,25.4778],[119.3436,25.4725],[119.4356,25.4995],[119.4384,25.4274],[119.4859,25.4224],[119.5008,25.3664],[119.5649,25.3853],[119.573,25.4503],[119.5964,25.3529],[119.6585,25.354],[119.6602,25.366],[119.6701,25.4355],[119.6411,25.4444],[119.7031,25.4405],[119.7836,25.4115],[119.8265,25.4653],[119.8639,25.4797],[119.811,25.5071],[119.8873,25.5524],[119.8417,25.5921],[119.7919,25.6539],[119.7125,25.6237],[119.7134,25.5362],[119.6918,25.5016],[119.644,25.4856],[119.6198,25.5372],[119.5708,25.5822],[119.5257,25.6243],[119.4893,25.668],[119.612,25.7036],[119.6276,25.7683],[119.6952,25.9044],[119.6758,26.0258],[119.6329,26.1156],[119.6435,26.1958],[119.6691,26.257],[119.8147,26.2803],[119.8626,26.3076],[119.9545,26.3527],[119.8809,26.3728],[119.8,26.5468]]],[[[119.5799,25.6271],[119.5877,25.6366],[119.6011,25.641],[119.6101,25.6539],[119.6132,25.6685],[119.5984,25.662],[119.5808,25.6499],[119.5725,25.6339],[119.5679,25.6461],[119.5607,25.635],[119.5799,25.6271]]],[[[120.0063,26.2152],[120.0163,26.2085],[120.0201,26.2257],[120.0009,26.2362],[119.9881,26.2244],[119.9707,26.2172],[119.9696,26.1911],[119.9784,26.1935],[119.9807,26.2084],[120.0063,26.2152]]],[[[119.9295,26.1343],[119.9366,26.1401],[119.945,26.1392],[119.9559,26.1489],[119.96,26.1472],[119.9701,26.1628],[119.9508,26.1637],[119.9457,26.1561],[119.9288,26.1603],[119.933,26.1688],[119.9183,26.1696],[119.9189,26.1544],[119.913,26.1402],[119.9295,26.1343]]],[[[119.6429,26.1293],[119.6549,26.1326],[119.6534,26.1442],[119.6572,26.1521],[119.6429,26.1572],[119.6273,26.1731],[119.6071,26.1697],[119.6054,26.1548],[119.6186,26.139],[119.6424,26.1338],[119.6429,26.1293]]],[[[119.6624,25.6466],[119.6621,25.6412],[119.6736,25.6326],[119.698,25.6364],[119.7027,25.6401],[119.713,25.6342],[119.7219,25.6398],[119.7169,25.6648],[119.7059,25.6564],[119.6826,25.65],[119.6756,25.6587],[119.6624,25.6466]]]]}},{type:"Feature",properties:{name:"厦门市"},geometry:{type:"MultiPolygon",coordinates:[[[[118.049,24.4183],[118.0522,24.4451],[118.0646,24.464],[118.0984,24.5481],[118.1059,24.5517],[118.1505,24.5835],[118.162,24.5722],[118.1694,24.5593],[118.2429,24.5125],[118.2899,24.5227],[118.3635,24.5302],[118.3755,24.5364],[118.3735,24.5476],[118.3635,24.5682],[118.3738,24.5756],[118.3531,24.5851],[118.3418,24.5924],[118.3412,24.6073],[118.3296,24.6053],[118.337,24.6173],[118.347,24.6306],[118.3433,24.6421],[118.3521,24.6643],[118.3387,24.6738],[118.3388,24.682],[118.322,24.6982],[118.3365,24.7184],[118.3222,24.7332],[118.3169,24.7489],[118.3351,24.7525],[118.3448,24.7717],[118.338,24.7804],[118.3226,24.7838],[118.3256,24.7982],[118.312,24.8049],[118.2844,24.8325],[118.2637,24.8253],[118.2432,24.8249],[118.2318,24.826],[118.2258,24.8508],[118.1971,24.8664],[118.1973,24.88],[118.195,24.8926],[118.1769,24.8932],[118.1507,24.8917],[118.1379,24.8948],[118.1255,24.8885],[118.1097,24.8752],[118.0856,24.8637],[118.0725,24.8619],[118.0719,24.8744],[118.0658,24.8754],[118.0421,24.8831],[118.0368,24.8997],[118.0091,24.8928],[117.997,24.8998],[118.0046,24.8878],[118.0145,24.8797],[118.0117,24.8752],[117.9915,24.8669],[117.999,24.8599],[117.9578,24.8682],[117.9474,24.8711],[117.9364,24.8664],[117.9177,24.8795],[117.913,24.8703],[117.9404,24.8447],[117.9564,24.8451],[117.963,24.8412],[117.9613,24.7881],[117.9552,24.7656],[117.941,24.7425],[117.9484,24.7117],[117.9654,24.671],[117.9578,24.6661],[117.9547,24.6492],[117.9207,24.6142],[117.8924,24.6116],[117.886,24.5902],[117.9136,24.5686],[117.9085,24.5553],[117.9121,24.5334],[117.9313,24.5267],[117.9586,24.5013],[117.9624,24.4804],[117.9568,24.4592],[117.975,24.4349],[117.9851,24.4335],[118.0055,24.4186],[118.0285,24.4205],[118.049,24.4183]]],[[[118.2045,24.5048],[118.2016,24.5256],[118.1917,24.5368],[118.1702,24.5459],[118.1556,24.5478],[118.1426,24.5616],[118.1117,24.5553],[118.1003,24.5481],[118.0891,24.5325],[118.0757,24.4947],[118.069,24.4677],[118.0704,24.4552],[118.0889,24.4313],[118.1062,24.4244],[118.1346,24.4197],[118.1432,24.4208],[118.1565,24.4344],[118.1989,24.4683],[118.2068,24.4815],[118.2045,24.5048]]]]}},{type:"Feature",properties:{name:"莆田市"},geometry:{type:"MultiPolygon",coordinates:[[[[118.8998,25.2414],[118.9301,25.2559],[118.9837,25.2697],[119.0236,25.2679],[118.9969,25.2663],[118.9784,25.2228],[119.0125,25.2044],[119.0647,25.2067],[119.0628,25.1739],[119.0285,25.1645],[119.0523,25.1125],[119.1343,25.1061],[119.1073,25.0753],[119.0969,25.0561],[119.1067,25.033],[119.1258,25.0211],[119.1418,25.0827],[119.1658,25.1454],[119.1383,25.1519],[119.1081,25.1941],[119.1385,25.2247],[119.199,25.1764],[119.261,25.1756],[119.301,25.178],[119.2934,25.2351],[119.3409,25.2409],[119.3851,25.2757],[119.3357,25.2855],[119.2926,25.3312],[119.2483,25.3162],[119.2271,25.3449],[119.1953,25.3683],[119.1517,25.383],[119.1516,25.4265],[119.2322,25.4423],[119.2127,25.472],[119.2308,25.5039],[119.235,25.5427],[119.1807,25.5551],[119.157,25.5842],[119.1691,25.5932],[119.1552,25.6031],[119.1333,25.6463],[119.1443,25.6849],[119.1441,25.7099],[119.1522,25.7447],[119.0906,25.7496],[119.0711,25.7527],[119.0148,25.7355],[118.955,25.7327],[118.9424,25.7485],[118.9203,25.7263],[118.8744,25.6983],[118.8264,25.7198],[118.8065,25.7096],[118.7604,25.6891],[118.7378,25.6782],[118.7263,25.6947],[118.6911,25.695],[118.6682,25.7085],[118.6319,25.698],[118.612,25.6991],[118.5877,25.69],[118.5778,25.6773],[118.5435,25.6715],[118.5313,25.6424],[118.5331,25.6079],[118.4901,25.55],[118.4647,25.5163],[118.4666,25.4829],[118.4713,25.4666],[118.4822,25.4255],[118.5033,25.3846],[118.5298,25.3581],[118.5129,25.3176],[118.5357,25.3208],[118.5719,25.2867],[118.6157,25.2931],[118.6557,25.302],[118.6501,25.2745],[118.662,25.2657],[118.6848,25.2447],[118.6824,25.2124],[118.6736,25.2007],[118.692,25.1693],[118.7175,25.1694],[118.7651,25.195],[118.7819,25.2138],[118.8277,25.2183],[118.8695,25.2276],[118.8998,25.2414]]],[[[119.471,25.1971],[119.5085,25.1819],[119.5094,25.1709],[119.5212,25.1666],[119.5236,25.1581],[119.5545,25.1644],[119.5477,25.1812],[119.5557,25.1832],[119.5546,25.1931],[119.5709,25.1934],[119.5784,25.2048],[119.5666,25.21],[119.5551,25.2035],[119.5451,25.2103],[119.5405,25.2021],[119.5182,25.208],[119.5148,25.2146],[119.5062,25.2147],[119.4992,25.2218],[119.4994,25.2403],[119.4885,25.247],[119.479,25.2435],[119.479,25.2577],[119.4715,25.2596],[119.4677,25.2463],[119.4517,25.2423],[119.4539,25.2366],[119.4392,25.2368],[119.4466,25.2225],[119.441,25.2116],[119.4441,25.2021],[119.471,25.1971]]]]}},{type:"Feature",properties:{name:"三明市"},geometry:{type:"MultiPolygon",coordinates:[[[[117.7181,25.512],[117.7865,25.482],[117.8405,25.4919],[117.9626,25.5288],[118.0337,25.5881],[118.0036,25.6169],[117.9534,25.6557],[118.0001,25.6858],[117.9832,25.7596],[118.0264,25.8314],[118.0495,25.8583],[118.1298,25.9],[118.2155,25.8979],[118.2755,25.9298],[118.3503,25.937],[118.4185,25.8924],[118.4769,25.882],[118.5077,25.9015],[118.5191,25.9865],[118.601,26.0552],[118.5868,26.1324],[118.5785,26.204],[118.6314,26.2347],[118.6305,26.2887],[118.5638,26.3362],[118.4949,26.3642],[118.4369,26.3927],[118.3934,26.3942],[118.323,26.4196],[118.2999,26.4198],[118.2408,26.396],[118.1814,26.3889],[118.1133,26.3942],[118.0655,26.4536],[118.0338,26.4976],[117.9947,26.5515],[117.9504,26.5635],[117.8725,26.5812],[117.8551,26.6403],[117.8186,26.6718],[117.7445,26.6586],[117.6628,26.6463],[117.601,26.7088],[117.6715,26.7839],[117.6198,26.8721],[117.5443,26.9226],[117.5349,26.9832],[117.4852,27.0226],[117.4478,27.0298],[117.3955,27.0675],[117.3017,27.1199],[117.2854,27.0759],[117.2253,27.0501],[117.1223,27.0933],[117.0324,27.0897],[116.8943,27.0327],[116.7573,26.9844],[116.569,26.859],[116.5586,26.7668],[116.5505,26.6512],[116.5409,26.5564],[116.6012,26.4905],[116.6107,26.4333],[116.5711,26.371],[116.5194,26.4104],[116.4538,26.3316],[116.4018,26.2749],[116.3994,26.1899],[116.4821,26.1601],[116.4217,26.0657],[116.4744,26.0097],[116.5935,25.9915],[116.6507,25.9611],[116.7198,25.9065],[116.781,25.832],[116.8852,25.8242],[116.9863,25.8543],[117.0582,25.7473],[117.058,25.686],[117.14,25.6422],[117.2123,25.5703],[117.2539,25.6428],[117.2667,25.7249],[117.3758,25.7824],[117.4018,25.6904],[117.4703,25.7201],[117.494,25.7226],[117.5596,25.6979],[117.6461,25.6707],[117.7258,25.5476],[117.7181,25.512]]]]}},{type:"Feature",properties:{name:"泉州市"},geometry:{type:"MultiPolygon",coordinates:[[[[118.8998,25.2414],[118.8487,25.2249],[118.7785,25.1954],[118.7047,25.1576],[118.6736,25.2007],[118.6848,25.2447],[118.6464,25.2684],[118.6256,25.2935],[118.5635,25.2903],[118.5129,25.3176],[118.5033,25.3846],[118.4601,25.4436],[118.4736,25.4913],[118.51,25.5619],[118.5313,25.6424],[118.48,25.7071],[118.425,25.7614],[118.3927,25.8254],[118.4098,25.8894],[118.3503,25.937],[118.2959,25.9226],[118.2481,25.8962],[118.1802,25.8842],[118.0966,25.8865],[118.0495,25.8583],[118.0301,25.8234],[117.9987,25.7667],[118.0095,25.7242],[117.9597,25.6721],[117.9565,25.6406],[118.0036,25.6169],[118.0395,25.5922],[117.9943,25.5374],[117.8929,25.4974],[117.8202,25.5171],[117.7696,25.4994],[117.7338,25.5141],[117.6976,25.4557],[117.6783,25.3553],[117.6046,25.2842],[117.5958,25.2218],[117.5732,25.1889],[117.6266,25.1384],[117.7076,25.0679],[117.7384,25.0373],[117.6851,24.9885],[117.6043,24.9479],[117.6167,24.8771],[117.6834,24.849],[117.7702,24.8686],[117.8126,24.85],[117.8498,24.8739],[117.913,24.8703],[117.9711,24.8481],[118.0046,24.8878],[118.0368,24.8997],[118.0778,24.8543],[118.1507,24.8917],[118.1971,24.8664],[118.2521,24.8314],[118.3226,24.7838],[118.3169,24.7489],[118.3388,24.682],[118.347,24.6306],[118.3418,24.5924],[118.403,24.5781],[118.5573,24.5729],[118.5664,24.5206],[118.6254,24.5351],[118.6803,24.5822],[118.655,24.6337],[118.6859,24.6626],[118.7398,24.7063],[118.7658,24.7346],[118.7314,24.8009],[118.6909,24.7999],[118.6877,24.8566],[118.7349,24.8261],[118.8197,24.869],[118.8477,24.8757],[118.9489,24.8762],[118.9421,24.9082],[118.9456,24.954],[119.0325,24.9614],[118.9886,24.9955],[118.999,25.0556],[118.9463,25.0431],[118.9165,25.099],[118.9515,25.1494],[118.9504,25.2062],[118.8998,25.2414]]],[[[118.4125,24.5143],[118.395,24.5089],[118.3999,24.4907],[118.3837,24.4807],[118.3904,24.4749],[118.3895,24.4655],[118.3746,24.4588],[118.3453,24.4686],[118.3187,24.4866],[118.2957,24.4753],[118.294,24.4668],[118.3048,24.4546],[118.312,24.4246],[118.2901,24.4231],[118.2907,24.415],[118.2819,24.4104],[118.2943,24.4015],[118.2995,24.3924],[118.3188,24.3836],[118.3331,24.3837],[118.3398,24.3902],[118.3507,24.4123],[118.3723,24.4264],[118.4053,24.4281],[118.4161,24.4217],[118.4324,24.4189],[118.437,24.411],[118.4307,24.4036],[118.4577,24.4123],[118.4595,24.4201],[118.4698,24.4253],[118.4656,24.4342],[118.477,24.4375],[118.479,24.448],[118.4675,24.4593],[118.4679,24.4704],[118.4735,24.4773],[118.4629,24.4785],[118.4549,24.5044],[118.4385,24.5077],[118.4305,24.5213],[118.4146,24.5267],[118.4125,24.5143]]],[[[118.2304,24.4013],[118.2382,24.4082],[118.2467,24.4073],[118.2528,24.4173],[118.27,24.4214],[118.2734,24.4411],[118.2557,24.4519],[118.2339,24.4458],[118.2291,24.428],[118.2207,24.4258],[118.2179,24.4056],[118.2304,24.4013]]]]}},{type:"Feature",properties:{name:"漳州市"},geometry:{type:"MultiPolygon",coordinates:[[[[116.9039,24.3699],[116.9082,24.3418],[116.9143,24.2877],[116.9354,24.248],[116.9713,24.1981],[116.9904,24.1684],[116.9471,24.1349],[116.937,24.0546],[116.9552,24.0202],[116.97,24.0075],[116.9826,23.9593],[116.9593,23.9145],[116.9755,23.8723],[116.9846,23.8613],[117.0267,23.8199],[117.0425,23.7638],[117.054,23.7085],[117.0741,23.6909],[117.133,23.6515],[117.1859,23.6362],[117.2913,23.5712],[117.3618,23.5563],[117.454,23.575],[117.4547,23.6282],[117.4986,23.6673],[117.5027,23.7046],[117.5899,23.7018],[117.6394,23.7678],[117.6585,23.8518],[117.7626,23.887],[117.8076,23.9474],[117.8901,24.0048],[117.925,24.0752],[117.9748,24.1345],[118.0194,24.1973],[118.0747,24.2255],[118.1434,24.2518],[118.1444,24.2938],[118.1269,24.3331],[118.0814,24.3563],[118.0863,24.4103],[118.0055,24.4186],[117.9641,24.444],[117.9375,24.5134],[117.9085,24.5553],[117.8924,24.6116],[117.9578,24.6661],[117.941,24.7425],[117.9592,24.824],[117.9247,24.8643],[117.8936,24.8872],[117.8498,24.8739],[117.8221,24.858],[117.79,24.8572],[117.7626,24.8684],[117.7116,24.8636],[117.6449,24.8589],[117.6149,24.898],[117.607,24.9303],[117.6548,24.9813],[117.6951,24.9922],[117.7371,25.0265],[117.7267,25.0712],[117.6775,25.088],[117.6266,25.1384],[117.5967,25.1714],[117.5622,25.1875],[117.5482,25.1922],[117.4974,25.1743],[117.4788,25.1278],[117.5039,25.0415],[117.4931,24.9621],[117.3937,24.9807],[117.3413,24.9787],[117.3009,24.9757],[117.2797,24.9877],[117.2459,24.954],[117.2196,24.9084],[117.1966,24.9008],[117.1544,24.8133],[117.0807,24.781],[117.0567,24.8237],[117.028,24.7802],[117.0269,24.6939],[117.0435,24.6336],[117.0252,24.602],[116.9968,24.5406],[116.9356,24.5219],[116.9173,24.4903],[116.9349,24.39],[116.9039,24.3699]]]]}},{type:"Feature",properties:{name:"南平市"},geometry:{type:"MultiPolygon",coordinates:[[[[119.2621,27.4206],[119.1685,27.4249],[119.1313,27.4631],[119.0208,27.4979],[118.9492,27.4564],[118.8736,27.5178],[118.9025,27.5916],[118.8746,27.6828],[118.854,27.7743],[118.8357,27.8665],[118.7542,27.9427],[118.7203,28.0454],[118.8023,28.1173],[118.7821,28.1932],[118.7394,28.2774],[118.6403,28.2735],[118.5475,28.2866],[118.4907,28.2384],[118.4243,28.2915],[118.3194,28.2145],[118.3618,28.1404],[118.292,28.0826],[118.1538,28.0619],[118.0899,27.965],[117.9981,27.9912],[117.891,27.9485],[117.7884,27.8829],[117.7164,27.8162],[117.6036,27.8859],[117.5605,27.9473],[117.4747,27.9305],[117.3666,27.8824],[117.3034,27.8722],[117.3056,27.7755],[117.2277,27.7192],[117.1066,27.6861],[117.0787,27.6509],[117.017,27.6117],[117.0849,27.5641],[117.1102,27.4588],[117.1041,27.3667],[117.1602,27.2957],[117.1067,27.2036],[117.064,27.1098],[117.161,27.1103],[117.2764,27.0578],[117.2866,27.1292],[117.3955,27.0675],[117.4443,27.0229],[117.5125,27.009],[117.5039,26.9437],[117.5894,26.893],[117.6706,26.8048],[117.601,26.7088],[117.6676,26.6347],[117.769,26.6555],[117.854,26.6796],[117.8565,26.6013],[117.9228,26.5595],[118.0111,26.5696],[118.0385,26.4885],[118.067,26.4273],[118.1361,26.3657],[118.2151,26.4046],[118.2795,26.4225],[118.3326,26.426],[118.3934,26.3942],[118.427,26.3799],[118.5264,26.3361],[118.5993,26.3045],[118.6731,26.2518],[118.6239,26.3662],[118.5509,26.3914],[118.6086,26.4896],[118.5887,26.6052],[118.5723,26.6834],[118.6241,26.7712],[118.6633,26.8631],[118.6718,26.9473],[118.7922,26.9531],[118.8603,27.0222],[118.9464,27.105],[118.934,27.1599],[119.0014,27.0972],[119.0938,27.0829],[119.1604,27.0921],[119.1883,27.1698],[119.2472,27.2015],[119.2118,27.2633],[119.2474,27.3453],[119.2621,27.4206]]]]}},{type:"Feature",properties:{name:"龙岩市"},geometry:{type:"MultiPolygon",coordinates:[[[[116.4001,26.0331],[116.368,25.9749],[116.3024,25.9226],[116.2251,25.9085],[116.1307,25.8587],[116.1816,25.7764],[116.146,25.7596],[116.107,25.7011],[116.0562,25.6824],[116.051,25.6276],[116.0628,25.5633],[116.0158,25.5082],[116.0221,25.4379],[115.996,25.3796],[116.0058,25.3309],[115.9747,25.2899],[115.9395,25.254],[115.8705,25.2212],[115.8551,25.1532],[115.8739,25.1218],[115.9139,25.0607],[115.8882,25.0229],[115.9171,24.9743],[115.883,24.9767],[115.8973,24.9371],[116.0031,24.8965],[116.0628,24.8599],[116.116,24.8514],[116.2109,24.8545],[116.2337,24.8062],[116.3,24.8029],[116.3497,24.8567],[116.3939,24.8569],[116.3997,24.794],[116.4461,24.7145],[116.505,24.667],[116.573,24.6301],[116.6671,24.6586],[116.7538,24.6545],[116.7989,24.624],[116.7561,24.555],[116.7968,24.5021],[116.8517,24.4528],[116.8635,24.4098],[116.9284,24.3826],[116.9173,24.4903],[116.9477,24.545],[117.0252,24.602],[117.0469,24.6533],[117.0235,24.7736],[117.0721,24.8077],[117.1442,24.7904],[117.1886,24.9039],[117.2374,24.9234],[117.2797,24.9877],[117.318,24.9683],[117.3937,24.9807],[117.4906,25.0168],[117.4788,25.1278],[117.5158,25.1757],[117.5707,25.2202],[117.6211,25.2475],[117.6616,25.3364],[117.699,25.4222],[117.7224,25.4814],[117.6889,25.5351],[117.7185,25.5905],[117.6353,25.6664],[117.5596,25.6979],[117.5069,25.7029],[117.4617,25.7358],[117.4358,25.6657],[117.3962,25.7337],[117.3758,25.7824],[117.2846,25.7374],[117.2745,25.6873],[117.2208,25.6035],[117.1972,25.5593],[117.14,25.6422],[117.0717,25.6843],[117.055,25.7156],[117.0563,25.7862],[116.9528,25.8421],[116.8852,25.8242],[116.7782,25.8185],[116.7481,25.8541],[116.6834,25.9299],[116.6447,25.98],[116.5935,25.9915],[116.4805,25.999],[116.4001,26.0331]]]]}},{type:"Feature",properties:{name:"宁德市"},geometry:{type:"MultiPolygon",coordinates:[[[[119.8,26.5468],[119.7401,26.6107],[119.6363,26.6018],[119.6282,26.6763],[119.6569,26.7281],[119.7876,26.691],[119.8739,26.6429],[119.9298,26.7255],[119.9689,26.7861],[120.0595,26.7662],[119.9706,26.6916],[119.9464,26.612],[119.8444,26.5689],[119.8847,26.5101],[119.938,26.5765],[120.0681,26.6275],[120.131,26.6619],[120.1658,26.7315],[120.137,26.7882],[120.1024,26.8268],[120.0835,26.8715],[120.1384,26.9153],[120.2319,26.9072],[120.2786,26.9858],[120.2869,27.0625],[120.3589,27.0857],[120.4384,27.161],[120.4018,27.2509],[120.3748,27.3293],[120.3318,27.3961],[120.2582,27.4127],[120.2024,27.4284],[120.1216,27.3974],[120.0276,27.3423],[119.9603,27.3661],[119.9033,27.3176],[119.8462,27.3241],[119.7957,27.3105],[119.7691,27.3454],[119.7325,27.3898],[119.7034,27.4473],[119.6846,27.5412],[119.6454,27.5782],[119.6352,27.6687],[119.5493,27.6701],[119.5012,27.6499],[119.4747,27.5393],[119.395,27.5393],[119.2764,27.4355],[119.2679,27.3694],[119.2288,27.3125],[119.2334,27.2353],[119.235,27.2241],[119.1918,27.1618],[119.1439,27.0879],[119.0938,27.0829],[119.0139,27.0964],[118.9438,27.1715],[118.9478,27.1413],[118.916,27.0969],[118.8418,27.0135],[118.7827,26.9471],[118.6718,26.9473],[118.6726,26.8595],[118.6375,26.7947],[118.5879,26.7094],[118.6006,26.6598],[118.5909,26.5532],[118.6017,26.4775],[118.5509,26.3914],[118.6095,26.362],[118.666,26.2938],[118.7205,26.3404],[118.7663,26.3927],[118.7469,26.5024],[118.8047,26.4683],[118.8548,26.4395],[118.9503,26.4695],[118.9682,26.5325],[119.0157,26.5898],[119.0654,26.5794],[119.1159,26.5389],[119.1961,26.5689],[119.2792,26.5351],[119.3355,26.5852],[119.3804,26.6215],[119.4491,26.6306],[119.5348,26.5611],[119.6104,26.5274],[119.6994,26.5693],[119.8,26.5468]]],[[[119.9068,26.6898],[119.9047,26.6823],[119.9168,26.6747],[119.9256,26.675],[119.9268,26.6646],[119.934,26.6666],[119.9467,26.6598],[119.9392,26.6706],[119.9437,26.6841],[119.9508,26.6925],[119.9196,26.6922],[119.9068,26.6898]]],[[[120.0344,26.4888],[120.0481,26.4946],[120.062,26.4945],[120.0713,26.5089],[120.0716,26.5213],[120.0603,26.5224],[120.0575,26.5163],[120.0492,26.5202],[120.0361,26.5159],[120.0328,26.5009],[120.0264,26.4975],[120.0344,26.4888]]],[[[119.7609,26.6133],[119.767,26.6043],[119.7765,26.5998],[119.7921,26.6055],[119.7978,26.6114],[119.8115,26.6088],[119.8188,26.621],[119.7989,26.6312],[119.7603,26.6209],[119.7609,26.6133]]],[[[120.1359,26.551],[120.1504,26.5602],[120.1507,26.5687],[120.167,26.5715],[120.1711,26.5989],[120.1629,26.6056],[120.1508,26.6026],[120.1368,26.5881],[120.1346,26.5814],[120.1179,26.5691],[120.1264,26.5547],[120.1359,26.551]]],[[[120.3606,26.9169],[120.3802,26.9274],[120.3956,26.9264],[120.3944,26.9339],[120.3805,26.9403],[120.3705,26.9619],[120.3542,26.9709],[120.339,26.9704],[120.3209,26.9561],[120.3223,26.9402],[120.3431,26.9222],[120.3606,26.9169]]],[[[119.6682,26.6285],[119.6945,26.6301],[119.7207,26.6361],[119.7588,26.6595],[119.7628,26.675],[119.749,26.6811],[119.7129,26.6685],[119.6917,26.671],[119.674,26.6808],[119.6662,26.6795],[119.6569,26.6699],[119.6519,26.6489],[119.6586,26.6344],[119.6682,26.6285]]]]}}],zg={features:Bg},Bc={go:"围棋",wuzi:"五子棋",xq:"中国象棋",chess:"国际象棋"},Qr=i=>Math.random()*i|0;function kg(i,t){const n=new Map,s=(g,f)=>g+","+f,r=(g,f)=>g>=0&&f>=0&&g<19&&f<19,o=(g,f)=>[[g+1,f],[g-1,f],[g,f+1],[g,f-1]].filter(([x,u])=>r(x,u));function a(g,f){const x=n.get(s(g,f)),u=new Set([s(g,f)]),m=new Set,E=[[g,f]];for(;E.length;){const[y,M]=E.pop();for(const[k,F]of o(y,M)){const I=s(k,F),q=n.get(I);q===void 0?m.add(I):q===x&&!u.has(I)&&(u.add(I),E.push([k,F]))}}return{group:u,libs:m}}function l(g,f,x){if(!r(g,f)||n.has(s(g,f)))return null;n.set(s(g,f),x);const u=[];for(const[m,E]of o(g,f))if(n.get(s(m,E))===1-x){const y=a(m,E);if(y.libs.size===0)for(const M of y.group)n.delete(M),u.push(M)}return!u.length&&a(g,f).libs.size===0?(n.delete(s(g,f)),null):u}const c="ABCDEFGHJKLMNOPQRST",h=[3.2,1.5,.15][i],p=[1.4,.6,0][i],d={name:"围棋",cols:19,rows:19,turn:0,pieces:[],last:null,over:!1,build(){n.clear(),d.sync()},sync(){d.pieces=[];for(const[g,f]of n){const[x,u]=g.split(",").map(Number);d.pieces.push({gx:x,gy:u,c:f,uid:"s"+g})}},tryHuman(g,f){const x=l(g,f,d.turn);return x?(d.after(g,f,x),!0):!1},after(g,f,x){d.sync(),d.last=[g,f];const u=x.map(m=>m.split(",").map(Number));t.onPlace&&t.onPlace(g,f,d.turn,u),t.onCap&&t.onCap((d.turn?"黑":"白")+" "+c[g]+(19-f)+(x.length?" · 提 "+x.length+" 子":"")),d.turn=1-d.turn},stepAI(){const g=new Set;for(const y of n.keys()){const[M,k]=y.split(",").map(Number);for(let F=-2;F<=2;F++)for(let I=-2;I<=2;I++){if(Math.abs(F)+Math.abs(I)>2)continue;const q=M+F,st=k+I;r(q,st)&&!n.has(s(q,st))&&g.add(s(q,st))}}if(!g.size)for(const[y,M]of[[3,3],[9,3],[15,3],[3,9],[9,9],[15,9],[3,15],[9,15],[15,15],[7,7],[11,11]])n.has(s(y,M))||g.add(s(y,M));if(!g.size||d.pieces.length>19*19*.62){d.over=!0,t.onEnd&&t.onEnd("终局 · 收子");return}let f=[],x=-1;for(const y of g){const[M,k]=y.split(",").map(Number);n.set(y,d.turn);let F=0;for(const[st,v]of o(M,k))if(n.get(s(st,v))===1-d.turn){const _=a(st,v);_.libs.size===0?F+=12+_.group.size:_.libs.size===1&&(F+=5)}const I=a(M,k);F+=Math.min(I.libs.size,4),I.libs.size===1&&(F-=7);const q=Math.min(M,k,18-M,18-k);if((q===2||q===3)&&(F+=1.5),i===2){let st=0;for(const[v,_]of o(M,k))n.get(s(v,_))===d.turn&&st++;F+=st*.8}n.delete(y),F+=Math.random()*h,F>x?(x=F,f=[[M,k]]):F>x-p&&f.push([M,k])}const[u,m]=f[Qr(f.length)],E=l(u,m,d.turn);E&&d.after(u,m,E)}};return d}function Hg(i,t){const n=new Map,s=(g,f)=>g+","+f,r=(g,f)=>g>=0&&f>=0&&g<15&&f<15,o=[[1,0],[0,1],[1,1],[1,-1]],a="ABCDEFGHIJKLMNO";function l(g,f,x){let u=0;for(const[m,E]of o){let y=1,M=1;for(;r(g+m*M,f+E*M)&&n.get(s(g+m*M,f+E*M))===x;)y++,M++;const k=r(g+m*M,f+E*M)&&!n.has(s(g+m*M,f+E*M))?1:0;for(M=1;r(g-m*M,f-E*M)&&n.get(s(g-m*M,f-E*M))===x;)y++,M++;const F=r(g-m*M,f-E*M)&&!n.has(s(g-m*M,f-E*M))?1:0,I=k+F;y>=5?u+=1e6:y===4?u+=I>=2?6e4:I===1?9e3:0:y===3?u+=I>=2?7e3:I===1?600:0:y===2?u+=I>=2?140:18:u+=I*6}return u}function c(g,f){const x=n.get(s(g,f));for(const[u,m]of o){let E=1;for(;n.get(s(g+u*E,f+m*E))===x;)E++;let y=1;for(;n.get(s(g-u*y,f-m*y))===x;)y++;if(E+y-1>=5)return[[g-u*(y-1),f-m*(y-1)],[g+u*(E-1),f+m*(E-1)]]}return null}const h=[.45,.9,1.3][i],p=[90,40,0][i],d={name:"五子棋",cols:15,rows:15,turn:0,pieces:[],last:null,over:!1,winLine:null,build(){n.clear(),d.sync(),d.winLine=null},sync(){d.pieces=[];for(const[g,f]of n){const[x,u]=g.split(",").map(Number);d.pieces.push({gx:x,gy:u,c:f,uid:"s"+g})}},tryHuman(g,f){return n.has(s(g,f))?!1:(d.place(g,f,d.turn),!0)},place(g,f,x){n.set(s(g,f),x),d.sync(),d.last=[g,f],t.onPlace&&t.onPlace(g,f,x,[]);const u=c(g,f);if(u){d.winLine=u,d.over=!0,t.onCap&&t.onCap((x?"白":"黑")+" 五连 —— 胜"),t.onEnd&&t.onEnd((x?"白":"黑")+" 胜");return}t.onCap&&t.onCap((x?"黑":"白")+" "+a[g]+(15-f)),d.turn=1-x},stepAI(){if(!n.size){d.place(7,7,0);return}let g=[];if(i===0)for(let y=0;y<15;y++)for(let M=0;M<15;M++)g.push([y,M]);else{const y=new Set;for(const M of n.keys()){const[k,F]=M.split(",").map(Number);for(let I=-2;I<=2;I++)for(let q=-2;q<=2;q++){const st=k+I,v=F+q;r(st,v)&&!n.has(s(st,v))&&y.add(s(st,v))}}g=[...y].map(M=>M.split(",").map(Number))}const f=(y,M)=>r(y,M)&&!n.has(s(y,M));for(const[y,M]of g)if(f(y,M)&&l(y,M,d.turn)>=1e6){d.place(y,M,d.turn);return}for(const[y,M]of g)if(f(y,M)&&l(y,M,1-d.turn)>=1e6){d.place(y,M,d.turn);return}let x=[],u=-1;for(const[y,M]of g){if(n.has(s(y,M)))continue;const k=l(y,M,d.turn)*1.05+l(y,M,1-d.turn)*h+Math.random()*p;k>u?(u=k,x=[[y,M]]):k>u-60&&x.push([y,M])}if(!x.length){d.over=!0,t.onEnd&&t.onEnd("和局");return}const[m,E]=x[Qr(x.length)];d.place(m,E,d.turn)}};return d}function Gg(i,t){const s=(P,w)=>P+","+w,r=(P,w)=>P>=0&&w>=0&&P<9&&w<10,o=(P,w,C)=>P>=3&&P<=5&&(C===0?w>=7:w<=2),a=(P,w)=>w===0?P<=4:P>=5,l=new Map;let c=0;function h(){l.clear(),c=0,["R","N","B","A","K","A","B","N","R"].forEach((w,C)=>{l.set(s(C,0),{t:w,c:1,uid:"u"+c++}),l.set(s(C,9),{t:w,c:0,uid:"u"+c++})}),l.set(s(1,2),{t:"C",c:1,uid:"u"+c++}),l.set(s(7,2),{t:"C",c:1,uid:"u"+c++}),l.set(s(1,7),{t:"C",c:0,uid:"u"+c++}),l.set(s(7,7),{t:"C",c:0,uid:"u"+c++});for(const w of[0,2,4,6,8])l.set(s(w,3),{t:"P",c:1,uid:"u"+c++}),l.set(s(w,6),{t:"P",c:0,uid:"u"+c++})}function p(P,w){const C=l.get(s(P,w));if(!C)return[];const T=[],O=(z,B)=>{if(r(z,B)){const $=l.get(s(z,B));(!$||$.c!==C.c)&&T.push([z,B])}},A=(z,B,$)=>{let X=P+z,H=w+B,K=!1;for(;r(X,H);){const V=l.get(s(X,H));if($){if(!K)V?K=!0:T.push([X,H]);else if(V){V.c!==C.c&&T.push([X,H]);break}}else if(!V)T.push([X,H]);else{V.c!==C.c&&T.push([X,H]);break}X+=z,H+=B}},R=C.t;if(R==="R")A(1,0,0),A(-1,0,0),A(0,1,0),A(0,-1,0);else if(R==="C")A(1,0,1),A(-1,0,1),A(0,1,1),A(0,-1,1);else if(R==="N")for(const[z,B]of[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]){const $=Math.abs(z)===2?P+z/2:P,X=Math.abs(B)===2?w+B/2:w;r($,X)&&!l.get(s($,X))&&O(P+z,w+B)}else if(R==="B")for(const[z,B]of[[2,2],[2,-2],[-2,2],[-2,-2]]){const $=P+z/2,X=w+B/2;!r($,X)||l.get(s($,X))||a(w+B,C.c)||O(P+z,w+B)}else if(R==="A")for(const[z,B]of[[1,1],[1,-1],[-1,1],[-1,-1]]){const $=P+z,X=w+B;o($,X,C.c)&&O($,X)}else if(R==="K")for(const[z,B]of[[1,0],[-1,0],[0,1],[0,-1]]){const $=P+z,X=w+B;o($,X,C.c)&&O($,X)}else if(R==="P"){const z=C.c===0?-1:1;O(P,w+z),a(w,C.c)&&(O(P+1,w),O(P-1,w))}return T}const d={K:1e6,R:90,C:85,N:40,B:20,A:20,P:10},g={K:"帅",A:"仕",B:"相",N:"马",R:"车",C:"炮",P:"兵"},f="abcdefghi",x=(P,w)=>f[P]+(10-w),u=[.3,.75,1][i],m=[14,8,2][i],E=[0,.55,.95][i],y=[0,0,.5][i];function M(P,w,C){for(const[T,O]of l)if(O.c===C){const[A,R]=T.split(",").map(Number);for(const[z,B]of p(A,R))if(z===P&&B===w)return!0}return!1}function k(P,w,C,T){for(const[O,A]of l)if(A.c===C&&A!==T){const[R,z]=O.split(",").map(Number);for(const[B,$]of p(R,z))if(B===P&&$===w)return!0}return!1}function F(P,w,C,T,O,A){const R=s(w,C),z=s(T,O);l.delete(R),A&&l.delete(z),l.set(z,P);const B=M(T,O,1-P.c),$=B?k(T,O,P.c,P):!1;return l.delete(z),l.set(R,P),A&&l.set(z,A),B?$?.35:1:0}function I(){let P=null,w=null;for(const[O,A]of l)if(A.t==="K"){const[R,z]=O.split(",").map(Number);A.c===0?P=[R,z]:w=[R,z]}if(!P||!w||P[0]!==w[0])return!1;const C=Math.min(P[1],w[1]),T=Math.max(P[1],w[1]);for(let O=C+1;O<T;O++)if(l.has(s(P[0],O)))return!1;return!0}function q(P){if(I())return!1;for(const[w,C]of l)if(C.c===P&&C.t==="K"){const[T,O]=w.split(",").map(Number);return!M(T,O,1-P)}return!0}function st(P,w,C,T,O,A){const R=s(w,C),z=s(T,O);l.delete(R),A&&l.delete(z),l.set(z,P);const B=!q(P.c);return l.delete(z),l.set(R,P),A&&l.set(z,A),B}function v(P,w,C){return!P||P.c!==L.turn?[]:p(w,C).filter(([T,O])=>!st(P,w,C,T,O,l.get(s(T,O))))}function _(){const P=[];for(const[w,C]of[...l])if(C.c===L.turn){const[T,O]=w.split(",").map(Number);for(const[A,R]of v(C,T,O))P.push({x:T,y:O,tx:A,ty:R,p:C})}return P}const L={name:"中国象棋",cols:9,rows:10,turn:0,pieces:[],last:null,over:!1,build(){h(),L.sync()},sync(){L.pieces=[];for(const[P,w]of l){const[C,T]=P.split(",").map(Number);L.pieces.push({gx:C,gy:T,t:w.t,c:w.c,uid:w.uid})}},legalFrom(P){return v(P,P.gx,P.gy)},at(P,w){return l.get(s(P,w))},inCheck(P){return!q(P)},endText(){const P=!q(L.turn),w=L.turn?"红":"黑",C=L.turn?"黑":"红";return P?w+" 胜 · 将死":w+" 胜 · 困毙（"+C+" 无着可走）"},tryHuman(P,w){const C=l.get(s(P,w));return C&&C.c===L.turn?{select:L.pieces.find(T=>T.gx===P&&T.gy===w)}:!1},moveTo(P,w,C){const T=l.get(s(w,C)),O=P.gx,A=P.gy;if(P.px=O,P.py=A,l.delete(s(O,A)),T&&l.delete(s(w,C)),l.set(s(w,C),P),P.gx=w,P.gy=C,L.sync(),L.last=[w,C],t.onMove&&t.onMove(P.uid,O,A,w,C,T?T.uid:null),t.onCap&&t.onCap((P.c?"黑":"红")+" "+g[P.t]+" "+x(O,A)+"→"+x(w,C)+(T?" 吃"+g[T.t]:"")),T&&T.t==="K"){L.over=!0,t.onEnd&&t.onEnd((P.c?"黑":"红")+" 胜 · 将死");return}L.turn=1-P.c,_().length||(L.over=!0,t.onEnd&&t.onEnd(L.endText()))},stepAI(){const P=_();if(!P.length){L.over=!0,t.onEnd&&t.onEnd(L.endText());return}const w=[];for(const O of P){const{p:A,x:R,y:z,tx:B,ty:$}=O,X=l.get(s(B,$)),H=X?d[X.t]:0;let K=H+Math.random()*m;X&&X.t==="K"&&(K+=1e5);const V=H>0?E:y;if(V>0&&(K-=d[A.t]*V*F(A,R,z,B,$,X)),i===2&&A.px===B&&A.py===$&&(K-=4),i===2&&H===0&&A.t!=="P"){const j=Math.abs(B-4)+Math.abs($-4.5);K+=(8-j)*.25}i===2&&H>0&&k(B,$,1-A.c,X)&&(K-=H*.3),w.push({x:R,y:z,tx:B,ty:$,s:K})}w.sort((O,A)=>A.s-O.s);const C=Math.random()<u?w[0]:w[Math.min(w.length-1,1+Qr(3))],T=L.pieces.find(O=>O.gx===C.x&&O.gy===C.y);T&&L.moveTo(T,C.tx,C.ty)}};return L}function Vg(i,t){const n=(_,L)=>_+","+L,s=(_,L)=>_>=0&&L>=0&&_<8&&L<8,r=new Map;let o=0;function a(){r.clear(),o=0,["R","N","B","Q","K","B","N","R"].forEach((L,P)=>{r.set(n(P,0),{t:L,c:1,uid:"u"+o++,moved:!1}),r.set(n(P,7),{t:L,c:0,uid:"u"+o++,moved:!1})});for(let L=0;L<8;L++)r.set(n(L,1),{t:"P",c:1,uid:"u"+o++,moved:!1}),r.set(n(L,6),{t:"P",c:0,uid:"u"+o++,moved:!1})}function l(_,L){const P=r.get(n(_,L));if(!P)return[];const w=[],C=(A,R)=>{if(s(A,R)){const z=r.get(n(A,R));(!z||z.c!==P.c)&&w.push([A,R])}},T=(A,R)=>{let z=_+A,B=L+R;for(;s(z,B);){const $=r.get(n(z,B));if(!$)w.push([z,B]);else{$.c!==P.c&&w.push([z,B]);break}z+=A,B+=R}},O=P.t;if(O==="R")T(1,0),T(-1,0),T(0,1),T(0,-1);else if(O==="B")T(1,1),T(1,-1),T(-1,1),T(-1,-1);else if(O==="Q")T(1,0),T(-1,0),T(0,1),T(0,-1),T(1,1),T(1,-1),T(-1,1),T(-1,-1);else if(O==="N")for(const[A,R]of[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]])C(_+A,L+R);else if(O==="K"){for(let A=-1;A<=1;A++)for(let R=-1;R<=1;R++)(A||R)&&C(_+A,L+R);h(P,_,L,w)}else if(O==="P"){const A=P.c===0?-1:1;if(s(_,L+A)&&!r.has(n(_,L+A))){w.push([_,L+A]);const R=P.c===0?6:1;L===R&&!r.has(n(_,L+2*A))&&w.push([_,L+2*A])}for(const R of[-1,1])if(s(_+R,L+A)){const z=r.get(n(_+R,L+A));z&&z.c!==P.c?w.push([_+R,L+A]):v.ep&&v.ep[0]===_+R&&v.ep[1]===L+A&&w.push([_+R,L+A])}}return w}let c=!1;function h(_,L,P,w){if(!(c||_.moved)){c=!0;try{if(!k(_.c))return;const C=1-_.c;for(const[T,O]of[[7,1],[0,-1]]){const A=r.get(n(T,P));if(!A||A.t!=="R"||A.c!==_.c||A.moved)continue;const R=Math.min(T,L),z=Math.max(T,L);let B=!0;for(let H=R+1;H<z;H++)if(r.has(n(H,P))){B=!1;break}if(!B)continue;const $=L+O,X=L+2*O;E($,P,C)||E(X,P,C)||w.push([X,P])}}finally{c=!1}}}const p={K:1e6,Q:90,R:50,B:32,N:30,P:10},d={K:"K",Q:"Q",R:"R",B:"B",N:"N",P:""},g=(_,L)=>"abcdefgh"[_]+(8-L),f=[.3,.75,1][i],x=[12,6,2][i],u=[0,.55,.95][i],m=[0,0,.5][i];function E(_,L,P){for(const[w,C]of r)if(C.c===P){const[T,O]=w.split(",").map(Number);for(const[A,R]of l(T,O))if(A===_&&R===L)return!0}return!1}function y(_,L,P,w){for(const[C,T]of r)if(T.c===P&&T!==w){const[O,A]=C.split(",").map(Number);for(const[R,z]of l(O,A))if(R===_&&z===L)return!0}return!1}function M(_,L,P,w,C,T){const O=n(L,P),A=n(w,C);r.delete(O),T&&r.delete(A),r.set(A,_);const R=E(w,C,1-_.c),z=R?y(w,C,_.c,_):!1;return r.delete(A),r.set(O,_),T&&r.set(A,T),R?z?.35:1:0}function k(_){for(const[L,P]of r)if(P.c===_&&P.t==="K"){const[w,C]=L.split(",").map(Number);return!E(w,C,1-_)}return!0}function F(_,L,P,w,C,T,O){const A=n(L,P),R=n(w,C);r.delete(A),T&&r.delete(R),O&&r.delete(n(O.gx,O.gy)),r.set(R,_);const z=!k(_.c);return r.delete(R),r.set(A,_),T&&r.set(R,T),O&&r.set(n(O.gx,O.gy),O),z}function I(_,L,P,w,C){return _.t!=="P"||w===L?null:v.ep&&v.ep[0]===w&&v.ep[1]===C&&r.get(n(w,P))||null}function q(_,L,P){return!_||_.c!==v.turn?[]:l(L,P).filter(([w,C])=>{const T=r.get(n(w,C));if(_.t==="K"&&C===P&&Math.abs(w-L)===2){const O=L+(w>L?1:-1),A=n(L,P);r.delete(A),r.set(n(O,P),_);const R=E(O,P,1-_.c);if(r.delete(n(O,P)),r.set(A,_),R)return!1}return!F(_,L,P,w,C,T||null,I(_,L,P,w,C))})}function st(){const _=[];for(const[L,P]of[...r])if(P.c===v.turn){const[w,C]=L.split(",").map(Number);for(const[T,O]of q(P,w,C))_.push({x:w,y:C,tx:T,ty:O,p:P})}return _}const v={name:"国际象棋",cols:8,rows:8,turn:0,pieces:[],last:null,over:!1,ep:null,build(){a(),v.ep=null,v.sync()},sync(){v.pieces=[];for(const[_,L]of r){const[P,w]=_.split(",").map(Number);v.pieces.push({gx:P,gy:w,t:L.t,c:L.c,uid:L.uid})}},legalFrom(_){return q(_,_.gx,_.gy)},at(_,L){return r.get(n(_,L))},inCheck(_){return!k(_)},endText(){const _=!k(v.turn),L=v.turn?"白":"黑";return _?L+" 胜 · 将杀":"和棋 · 逼和（"+(v.turn?"黑":"白")+" 无着可走但未被将）"},tryHuman(_,L){const P=r.get(n(_,L));return P&&P.c===v.turn?{select:v.pieces.find(w=>w.gx===_&&w.gy===L)}:!1},moveTo(_,L,P){let w=r.get(n(L,P))||null;const C=_.gx,T=_.gy,O=I(_,C,T,L,P);if(!w&&O&&(w=O),_.px=C,_.py=T,r.delete(n(C,T)),w&&r.delete(n(w.gx,w.gy)),_.t==="P"&&(P===0||P===7)&&(_.t="Q"),r.set(n(L,P),_),_.gx=L,_.gy=P,_.moved=!0,_.t==="K"&&P===T&&Math.abs(L-C)===2){const A=L>C?1:-1,R=A>0?7:0,z=r.get(n(R,T));z&&z.t==="R"&&z.c===_.c&&(r.delete(n(R,T)),z.gx=C+A,z.gy=T,z.moved=!0,r.set(n(z.gx,z.gy),z),t.onMove&&t.onMove(z.uid,R,T,z.gx,z.gy,null))}if(v.ep=_.t==="P"&&Math.abs(P-T)===2?[C,(T+P)/2]:null,v.sync(),v.last=[L,P],t.onMove&&t.onMove(_.uid,C,T,L,P,w?w.uid:null),t.onCap&&t.onCap((_.c?"黑":"白")+" "+(Math.abs(L-C)===2&&_.t==="K"?L>C?"O-O":"O-O-O":d[_.t]+g(L,P))+(w?" x"+(d[w.t]||"p"):"")),w&&w.t==="K"){v.over=!0,t.onEnd&&t.onEnd((_.c?"黑":"白")+" 胜 · 将杀");return}v.turn=1-_.c,st().length||(v.over=!0,t.onEnd&&t.onEnd(v.endText()))},stepAI(){const _=st();if(!_.length){v.over=!0,t.onEnd&&t.onEnd(v.endText());return}const L=[];for(const C of _){const{p:T,x:O,y:A,tx:R,ty:z}=C,B=r.get(n(R,z)),$=B?p[B.t]:0;let X=$+Math.random()*x;B&&B.t==="K"&&(X+=1e5),T.t==="P"&&(X+=(T.c===0?z:7-z)*.9),T.t!=="K"&&T.t!=="P"&&(X+=(6-Math.abs(R-3.5)-Math.abs(z-3.5))*.35),T.t==="K"&&Math.abs(R-O)===2&&(X+=6);const H=$>0?u:m;H>0&&(X-=p[T.t]*H*M(T,O,A,R,z,B)),i===2&&T.px===R&&T.py===z&&(X-=4),i===2&&$===0&&(T.t==="N"||T.t==="B")&&(X+=1.2),i===2&&$>0&&y(R,z,1-T.c,B)&&(X-=$*.3),L.push({x:O,y:A,tx:R,ty:z,s:X})}L.sort((C,T)=>T.s-C.s);const P=Math.random()<f?L[0]:L[Math.min(L.length-1,1+Qr(3))],w=v.pieces.find(C=>C.gx===P.x&&C.gy===P.y);w&&v.moveTo(w,P.tx,P.ty)}};return v}function Wg(i,t={}){const e=Xg(t.difficulty??1),n=t.hooks||{};return i==="go"?kg(e,n):i==="wuzi"?Hg(e,n):i==="xq"?Gg(e,n):Vg(e,n)}function Xg(i){return i=Number(i),i===0?0:i===2?2:1}function qg(){try{const i=location.pathname,t=i.endsWith("/")?i:i.replace(/\/[^/]*$/,"")+"/";return location.origin+t}catch{return"/"}}const Hh=qg(),Yg="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";function $g(i,t,e,n,s,r){if(i==="chess"){const a=(l,c)=>"abcdefgh"[l]+(8-c);return a(t,e)+a(n,s)+(r?"q":"")}const o=(a,l)=>"abcdefghi"[a]+(9-l);return o(t,e)+o(n,s)}function Kg(i,t){if(!t||t.length<4)return null;const e=t.charCodeAt(0)-97,n=i==="chess"?8-+t[1]:9-+t[1],s=t.charCodeAt(2)-97,r=i==="chess"?8-+t[3]:9-+t[3];return{fx:e,fy:n,tx:s,ty:r}}class zc{constructor(t,e){this.ready=!1,this.failed=!1,this.pending=null;const s=Hh+t;this.worker=new Worker(s),this.worker.onmessage=r=>this._line(r.data),this.worker.onerror=()=>this._fail(),this.worker.postMessage("uci")}_fail(){if(this.failed=!0,this.pending){const t=this.pending;this.pending=null,t.reject(new Error("worker error"))}}_line(t){if(!(!t||typeof t!="string")){if(t==="uciok"){this.ready=!0;return}if(t.startsWith("bestmove")){const e=t.split(/\s+/)[1]||null;if(this.pending){const n=this.pending;this.pending=null,n.resolve(e)}}}}clearPending(){this.pending=null}ready_p(){return this.ready?Promise.resolve():this.failed?Promise.reject(new Error("engine failed")):new Promise((t,e)=>{const n=setTimeout(()=>e(new Error("init timeout")),12e3),s=setInterval(()=>{this.ready?(clearInterval(s),clearTimeout(n),t()):this.failed&&(clearInterval(s),clearTimeout(n),e(new Error("engine failed")))},40)})}bestMove(t){return this.ready_p().then(()=>new Promise((e,n)=>{this.pending={resolve:e,reject:n};const s=t.moves&&t.moves.length?" moves "+t.moves.join(" "):"";t.fen?this.worker.postMessage("position fen "+t.fen+s):this.worker.postMessage("position startpos"+s),this.worker.postMessage(t.depth?"go depth "+t.depth:"go movetime "+(t.movetime||300))}))}}let Lr=null,Dr=null,ys=null;async function Zg(){if(ys!==null)return ys;try{const i=await fetch(Hh+"engines/pikafish.js",{method:"HEAD"}),t=(i.headers.get("content-type")||"").toLowerCase();ys=i.ok&&!t.includes("text/html")}catch{ys=!1}return ys}function Jg(i){return i==="chess"?(Lr||(Lr=new zc("engines/stockfish.js","engines/stockfish.wasm")),Lr.ready_p()):i==="xq"?Zg().then(t=>{if(!t)throw new Error("pikafish not present");return Dr||(Dr=new zc("engines/pikafish.js","engines/pikafish.wasm")),Dr.ready_p()}):Promise.reject(new Error("no engine for "+i))}function jg(i,t){const e=i==="chess"?Lr:Dr;if(!e)return Promise.reject(new Error("engine not ready"));const n=(t.movetime||300)+2500;return Promise.race([e.bestMove(t),new Promise((s,r)=>setTimeout(()=>{e.clearPending(),r(new Error("engine timeout"))},n))])}function Qg(i){return Yg}function tv(i){const t=Math.PI*2,e=(b,W,Z)=>Math.max(W,Math.min(Z,b)),n=(b,W,Z)=>b+(W-b)*Z,s=b=>1-Math.pow(1-b,3),r=b=>(b-=1,Math.max(0,b*b*((1.7+1)*b+1.7)+1)),o=matchMedia("(prefers-reduced-motion: reduce)").matches,a=b=>"#"+Math.round(b).toString(16).padStart(6,"0"),l={dark:{bg:461592,fog:461592,amb:4015712,rim:7049215,plate:6048309,plateTop:"#7c6245",line:"rgba(230,210,170,.55)",text:"rgba(230,210,170,.8)",sqA:"#3d2f20",sqB:"#2e2115",stoneB:1184536,stoneW:15393744,wood:10254926,red:15227984,blk:1579552,wp:16249571,bp:3027517,accent:9427455,gold:16765286,b2bg:"#0d1730",b2board:"#1a2133"},light:{bg:15397371,fog:15397371,amb:15261904,rim:16758891,plate:12886890,plateTop:"#e6d0a0",line:"rgba(100,70,35,.58)",text:"rgba(90,60,20,.82)",sqA:"#f0d9a8",sqB:"#d4b87a",stoneB:1711398,stoneW:16052712,wood:14203e3,red:12727598,blk:1974569,wp:16776694,bp:4014930,accent:2845951,gold:13998874,b2bg:"#e9f0fb",b2board:"#f3e6c8"}};let c=document.documentElement.getAttribute("data-theme")||"dark";const h=()=>l[c],p=document.createElement("div");p.className="chess-room",p.innerHTML=`
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
      <div class="cr-cap">双 AI 自动对弈中…</div>
      <div class="set">
        <span class="sw on cr-auto"><i></i>AI 自动对局</span>
        <span class="seg cr-diff">
          <button data-d="0">休闲</button><button data-d="1">标准</button><button data-d="2" class="on">大师</button>
        </span>
        <button class="mini cr-new">重开</button>
      </div>
    </div>`,i.appendChild(p);const d=p.querySelector(".cr-gl"),g=p.querySelector(".cr-b2"),f=g.getContext("2d"),x=p.querySelector(".cr-play"),u=p.querySelector(".cr-gal"),m=p.querySelector(".cr-labels"),E=p.querySelector(".cr-name"),y=p.querySelector(".cr-mv"),M=p.querySelector(".cr-cap"),k=p.querySelector(".cr-auto"),F=p.querySelector(".cr-diff"),I=p.querySelector(".cr-back"),q=p.querySelector(".cr-new");let st=null;try{st=new Yr({canvas:d,antialias:!0,alpha:!0})}catch{const W=document.createElement("div");return W.className="holo-fallback",W.textContent="当前环境不支持 WebGL，棋台暂不可用",i.appendChild(W),{frame(){}}}st.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),st.shadowMap.enabled=!0,st.shadowMap.type=Qc;const v=new Bs,_=new Ce(50,1,.1,200),L={dist:26,elev:.32,azim:0,tDist:26,tElev:.32,tAzim:0,look:new Y(0,0,0)};function P(){L.azim=n(L.azim,L.tAzim,.08),L.elev=n(L.elev,L.tElev,.08),L.dist=n(L.dist,L.tDist,.06),_.position.set(Math.sin(L.azim)*Math.cos(L.elev)*L.dist,Math.sin(L.elev)*L.dist,Math.cos(L.azim)*Math.cos(L.elev)*L.dist),_.lookAt(L.look)}const w=new Bh(16777215,h().plate,.7);v.add(w);const C=new Ic(16775408,1.25);C.position.set(8,22,14),C.castShadow=!0,C.shadow.mapSize.set(2048,2048);const T=C.shadow.camera;T.left=-22,T.right=22,T.top=22,T.bottom=-22,T.near=1,T.far=70,C.shadow.bias=-7e-4,v.add(C);const O=new Ic(16772306,.85);O.position.set(0,10,-14),v.add(O);const A=new kh(h().rim,26,48,2);A.position.set(-12,7,-10),v.add(A);const R=new de,z=new Float32Array(600*3);for(let b=0;b<600;b++){const W=16+Math.random()*34,Z=Math.random()*t,G=(Math.random()-.5)*1.4;z[b*3]=Math.cos(Z)*W*Math.cos(G),z[b*3+1]=Math.sin(G)*W*.7+4,z[b*3+2]=Math.sin(Z)*W*Math.cos(G)}R.setAttribute("position",new Ne(z,3));const B=new Rs(R,new es({color:10470655,size:.12,transparent:!0,opacity:.55}));v.add(B);function $(b){const W=h(),Z=document.createElement("canvas"),G=640,ot=b==="xq"?720:640;Z.width=G,Z.height=ot;const it=Z.getContext("2d"),et=b==="chess"?8:b==="xq"?9:b==="go"?19:15,lt=b==="chess"?8:b==="xq"?10:et,zt=et-(b==="chess"?0:1),Mt=lt-(b==="chess"?0:1),Wt=34,se=Math.min((G-Wt*2)/zt,(ot-Wt*2)/Mt),Ot=qt=>Wt+qt*se,bt=qt=>Wt+qt*se;if(b==="chess"){it.fillStyle=W.plateTop,it.fillRect(0,0,G,ot);for(let qt=0;qt<8;qt++)for(let Gt=0;Gt<8;Gt++)it.fillStyle=(qt+Gt)%2?W.sqB:W.sqA,it.fillRect(Ot(qt),bt(Gt),se+1,se+1)}else{if(it.fillStyle=W.plateTop,it.fillRect(0,0,G,ot),it.strokeStyle=W.line,it.lineWidth=2.2,it.beginPath(),b==="xq"){for(let Gt=0;Gt<10;Gt++)it.moveTo(Ot(0),bt(Gt)),it.lineTo(Ot(8),bt(Gt));for(let Gt=0;Gt<9;Gt++)Gt===0||Gt===8?(it.moveTo(Ot(Gt),bt(0)),it.lineTo(Ot(Gt),bt(9))):(it.moveTo(Ot(Gt),bt(0)),it.lineTo(Ot(Gt),bt(4)),it.moveTo(Ot(Gt),bt(5)),it.lineTo(Ot(Gt),bt(9)));it.moveTo(Ot(3),bt(0)),it.lineTo(Ot(5),bt(2)),it.moveTo(Ot(5),bt(0)),it.lineTo(Ot(3),bt(2)),it.moveTo(Ot(3),bt(7)),it.lineTo(Ot(5),bt(9)),it.moveTo(Ot(5),bt(7)),it.lineTo(Ot(3),bt(9))}else{for(let Gt=0;Gt<et;Gt++)it.moveTo(Ot(Gt),bt(0)),it.lineTo(Ot(Gt),bt(et-1));for(let Gt=0;Gt<lt;Gt++)it.moveTo(Ot(0),bt(Gt)),it.lineTo(Ot(lt-1),bt(Gt))}it.stroke(),it.fillStyle=W.line;const qt=b==="go"?[[3,3],[9,3],[15,3],[3,9],[9,9],[15,9],[3,15],[9,15],[15,15]]:[[3,3],[11,3],[7,7],[3,11],[11,11]];for(const[Gt,Se]of qt)it.beginPath(),it.arc(Ot(Gt),bt(Se),se*.12,0,t),it.fill();b==="xq"&&(it.fillStyle=W.text,it.font=`${se*.62}px 'KaiTi','STKaiti','SimSun',serif`,it.textAlign="center",it.textBaseline="middle",it.fillText("楚  河",Ot(2),bt(4.5)),it.fillText("漢  界",Ot(6),bt(4.5)))}const ee=new Rn(Z);return ee.colorSpace=Be,ee}const X={sphere:new Is(1,26,14),cyl:new zs(1,1,1,36),torus:new ul(1,.16,8,20),box:new Yn(1,1,1),cone:new al(1,1,20)};let H={};function K(){const b=h();H={stoneB:new En({color:b.stoneB,roughness:.35}),stoneW:new En({color:b.stoneW,roughness:.28}),wood:new En({color:b.wood,roughness:.55}),wp:new En({color:b.wp,roughness:.1,metalness:.2,clearcoat:.6,clearcoatRoughness:.1}),bp:new En({color:b.bp,roughness:.1,metalness:.35,clearcoat:1,clearcoatRoughness:.08})}}K();const V={K:"帥",A:"仕",B:"相",N:"馬",R:"車",C:"炮",P:"兵",k:"將",a:"士",b:"象",r:"車",c:"砲",p:"卒"},j={};function ut(b,W){const Z=b+(W?"r":"b");if(j[Z])return j[Z];const G=h(),ot=document.createElement("canvas");ot.width=ot.height=192;const it=ot.getContext("2d");it.fillStyle=a(G.wood),it.fillRect(0,0,192,192),it.strokeStyle=a(G.blk)+"80",it.lineWidth=5,it.beginPath(),it.arc(96,96,84,0,t),it.stroke(),it.fillStyle=a(W?G.red:G.blk),it.font="112px 'KaiTi','STKaiti','SimSun',serif",it.textAlign="center",it.textBaseline="middle",it.fillText(b,96,100);const et=new Rn(ot);return et.colorSpace=Be,j[Z]=et,et}function gt(b,W){const Z=new fe(X.sphere,b?H.stoneW:H.stoneB),G=W*.46;return Z.scale.set(G,G*.34,G),Z.castShadow=!0,Z.userData.y=G*.34,Z}function xt(b,W,Z){const G=Z*.45,ot=Z*.2,it=new En({map:ut(V[b]||b,W),roughness:.5}),et=new fe(X.cyl,[H.wood,it,H.wood]);return et.scale.set(G,ot,G),et.castShadow=!0,et.userData.y=ot/2,et}function At(b,W,Z){const G=Z*.52,ot=W?H.wp:H.bp,it=new je,et=(lt,zt,Mt,Wt,se,Ot=0,bt=0)=>{const ee=new fe(lt,ot);return ee.scale.set(zt,Mt,Wt),ee.position.set(0,se,0),ee.rotation.set(Ot,0,bt),ee.castShadow=!0,it.add(ee),ee};if(et(X.cyl,G*1.12,.1,G*1.12,.05),et(X.cyl,G*.78,.14,G*.78,.16),et(X.torus,G*.8,G*.8,G*.8,.24,Math.PI/2),b==="P")et(X.cyl,G*.58,.42,G*.44,.46),et(X.sphere,G*.52,G*.52,G*.52,.82);else if(b==="R"){et(X.cyl,G*.68,.7,G*.68,.56),et(X.cyl,G*.88,.16,G*.88,1.02);for(let lt=0;lt<6;lt++){const zt=lt*t/6;et(X.box,G*.24,.24,G*.24,1.22).position.set(Math.cos(zt)*G*.7,1.22,Math.sin(zt)*G*.7)}}else if(b==="N"){et(X.cyl,G*.46,G*.95,G*.46,.58).rotation.set(.38,0,-.12),et(X.box,G*.55,G*.52,G*.78,1.18).rotation.set(.55,0,-.08),et(X.box,G*.42,G*.3,G*.6,1.42).rotation.set(.95,0,-.08),et(X.cone,G*.14,G*.38,G*.14,1.58).rotation.set(.18,0,-.08);const se=et(X.sphere,G*.24,G*.24,G*.24,.98);se.position.z=-G*.38}else if(b==="B"){et(X.cyl,G*.55,.62,G*.32,.52);for(let lt of[-1,1]){const zt=et(X.cone,G*.32,.62,G*.32,1);zt.rotation.z=lt*.16}et(X.sphere,G*.2,G*.2,G*.2,1.36)}else if(b==="Q"){et(X.cyl,G*.62,.7,G*.5,.58),et(X.torus,G*.64,G*.64,G*.64,1.02,Math.PI/2);for(let lt=0;lt<6;lt++){const zt=lt*t/6,Mt=et(X.cone,G*.13,.34,G*.13,1.24);Mt.position.set(Math.cos(zt)*G*.58,1.24,Math.sin(zt)*G*.58),Mt.rotation.x=-.25}et(X.sphere,G*.28,G*.28,G*.28,1.24)}else b==="K"&&(et(X.cyl,G*.66,.78,G*.54,.62),et(X.torus,G*.66,G*.66,G*.66,1.08,Math.PI/2),et(X.box,G*.18,.58,G*.18,1.44),et(X.box,G*.58,.18,G*.18,1.44));return it.scale.set(1,1.35,1),it.userData.y=0,it}const nt=[{mode:"go",pos:[-5.45,.33,3.61],desc:"19 路 · 提子与做眼"},{mode:"wuzi",pos:[-2.94,-.59,-3.61],desc:"15 路 · 五连即胜"},{mode:"xq",pos:[2.94,-.59,-3.61],desc:"9×10 · 楚河汉界"},{mode:"chess",pos:[5.45,.33,3.61],desc:"8×8 · 含王车易位与吃过路兵"}],N=5.2,dt=[];function pt(){const b=document.createElement("canvas");b.width=b.height=256;const W=b.getContext("2d"),Z=W.createRadialGradient(128,128,8,128,128,128);Z.addColorStop(0,"rgba(150,200,255,.55)"),Z.addColorStop(.5,"rgba(120,170,255,.18)"),Z.addColorStop(1,"rgba(80,140,255,0)"),W.fillStyle=Z,W.fillRect(0,0,256,256);const G=new Rn(b);return G.colorSpace=Be,G}const St=pt();for(const b of nt){const W=new je,Z=b.mode==="xq"?9/8:1,G=N,ot=N*Z,it=new fe(new Yn(G,.34,ot),new En({color:h().plate,roughness:.7}));it.castShadow=!0,it.receiveShadow=!0,W.add(it);const et=new fe(new vi(G,ot),new En({map:$(b.mode),roughness:.6}));et.rotation.x=-Math.PI/2,et.position.y=.172,et.receiveShadow=!0,W.add(et);const lt=b.mode==="chess"?8:b.mode==="xq"?9:b.mode==="go"?19:15,zt=b.mode==="chess"?8:b.mode==="xq"?10:lt,Mt=Math.min(G/(lt-(b.mode==="chess"?0:1)),ot/(zt-(b.mode==="chess"?0:1))),Wt=-Mt*(lt-(b.mode==="chess"?0:1))/2,se=-Mt*(zt-(b.mode==="chess"?0:1))/2,Ot=(Se,ve)=>[Wt+(b.mode==="chess"?Se+.5:Se)*Mt,se+(b.mode==="chess"?ve+.5:ve)*Mt],bt=(Se,ve,mn)=>{const[pe,an]=Ot(ve,mn);Se.position.set(pe,.172+(Se.userData.y||0),an),W.add(Se)};b.mode==="go"&&[[3,3,1],[4,4,0],[3,15,0],[15,3,1],[9,9,0],[10,9,1],[9,10,0],[15,15,1]].forEach(([Se,ve,mn])=>bt(gt(mn,Mt),Se,ve)),b.mode==="wuzi"&&[[7,7,0],[8,8,1],[6,6,0],[9,9,1],[5,5,0],[10,10,0]].forEach(([Se,ve,mn])=>bt(gt(mn,Mt),Se,ve)),b.mode==="xq"&&(bt(xt("K",!1,Mt),4,9),bt(xt("R",!1,Mt),0,9),bt(xt("N",!1,Mt),1,9),bt(xt("k",!1,Mt),4,0),bt(xt("r",!1,Mt),0,0),bt(xt("c",!1,Mt),1,2),bt(xt("P",!0,Mt),4,6)),b.mode==="chess"&&(bt(At("K",!0,Mt),4,7),bt(At("Q",!0,Mt),3,7),bt(At("N",!0,Mt),6,7),bt(At("k",!1,Mt),4,0),bt(At("r",!1,Mt),0,0),bt(At("p",!1,Mt),4,1));const ee=new fe(new vi(G*1.9,ot*1.9),new on({map:St,transparent:!0,opacity:.5,blending:Ze,depthWrite:!1}));ee.rotation.x=-Math.PI/2,ee.position.y=-.6,W.add(ee);const qt=new fe(new Yn(G+1.2,2.4,ot+1.2),new on({visible:!1}));W.add(qt),W.position.set(...b.pos),v.add(W);const Gt=document.createElement("div");Gt.className="isl-label",Gt.innerHTML=`${Bc[b.mode]}<small>${b.desc}</small>`,m.appendChild(Gt),dt.push({...b,grp:W,hit:qt,glow:ee,lab:Gt,phase:Math.random()*t,base:W.position.clone(),hover:0})}const Tt=new jr,Ft=new Ct;let vt=!1,U=0,S=0,tt=0;d.addEventListener("pointerdown",b=>{if(ht==="gallery"){vt=!0,U=0,S=b.clientX,tt=b.clientY;try{d.setPointerCapture(b.pointerId)}catch{}}}),d.addEventListener("pointermove",b=>{const W=d.getBoundingClientRect();if(!(W.width===0||W.height===0)&&(Ft.set((b.clientX-W.left)/W.width*2-1,-((b.clientY-W.top)/W.height)*2+1),vt)){const Z=b.clientX-S,G=b.clientY-tt;U+=Math.abs(Z)+Math.abs(G),L.tAzim-=Z*.005,L.tElev=e(L.tElev+G*.004,.12,1.2),S=b.clientX,tt=b.clientY}}),d.addEventListener("pointerup",()=>{const b=vt;if(vt=!1,U>8||ht!=="gallery"||!b){if(ht==="gallery"&&U<=8){Tt.setFromCamera(Ft,_);const Z=Tt.intersectObjects(dt.map(G=>G.hit),!1);if(Z.length){const G=dt.find(ot=>ot.hit===Z[0].object);G&&Ln(G)}}return}Tt.setFromCamera(Ft,_);const W=Tt.intersectObjects(dt.map(Z=>Z.hit),!1);if(W.length){const Z=dt.find(G=>G.hit===W[0].object);Z&&Ln(Z)}}),d.addEventListener("pointerleave",()=>{vt=!1});const ft=new Y;function _t(b,W){for(const Z of dt){o||(Z.grp.position.y=Z.base.y+Math.sin(b*.5+Z.phase)*.22,Z.grp.rotation.y=Math.sin(b*.12+Z.phase)*.13,Z.grp.rotation.z=Math.sin(b*.31+Z.phase)*.014),Tt.setFromCamera(Ft,_);const G=Tt.intersectObject(Z.hit,!1).length>0;Z.hover=n(Z.hover,G&&ht==="gallery"?1:0,.12);const ot=1+Z.hover*.07;Z.grp.scale.setScalar(ot),Z.glow.material.opacity=.42+Z.hover*.5,d.style.cursor=dt.some(lt=>lt.hover>.5)?"pointer":"grab",ft.set(0,1.15,0).applyMatrix4(Z.grp.matrixWorld).project(_);const it=(ft.x*.5+.5)*Nt,et=(-ft.y*.5+.5)*Ut;Z.lab.style.transform=`translate(-50%,-50%) translate(${it}px,${et}px)`,Z.lab.style.opacity=ht==="gallery"?String(.55+Z.hover*.45):"0"}}let ht="gallery",wt="go",mt=null,Rt=0,$t=2,Et=!0,Lt=!1,kt=0,Ht=0,It=null,Kt=[],Vt=!1,te=!1;const J=new Map;let Pt=[],ct=[],yt=null,Nt=i.clientWidth||window.innerWidth,Ut=i.clientHeight||window.innerHeight;function jt(){const b=Math.min(Nt*.86,Ut*.62,620),W=Math.min(2,window.devicePixelRatio||1);g.width=b*W,g.height=b*W,g.style.width=b+"px",g.style.height=b+"px",f.setTransform(W,0,0,W,0,0),g._side=b}const he=()=>{const b=g._side,W=mt.cols,Z=mt.rows,G=wt==="chess",ot=W-(G?0:1),it=Z-(G?0:1),et=b*.07,lt=Math.min((b-et*2)/ot,(b-et*2)/it),zt=ot*lt,Mt=it*lt;return{x0:(b-zt)/2,y0:(b-Mt)/2,cell:lt,s:b}},ae=(b,W)=>{const Z=he(),G=wt==="chess"?b+.5:b,ot=wt==="chess"?W+.5:W;return[Z.x0+G*Z.cell,Z.y0+ot*Z.cell]},Qt=(b,W)=>{const Z=he(),G=wt==="chess",ot=(b-Z.x0)/Z.cell,it=(W-Z.y0)/Z.cell,et=G?Math.floor(ot):Math.round(ot),lt=G?Math.floor(it):Math.round(it);return et<0||lt<0||et>=mt.cols||lt>=mt.rows?null:[et,lt]};function Re(){return{onPlace(b,W,Z){const G=mt.pieces.find(ot=>ot.gx===b&&ot.gy===W);if(G){const ot=J.get(G.uid);ot&&(ot.born=Ue)}Rt++},onMove(b,W,Z,G,ot,it){const et=J.get(b);if(et&&!o&&Pt.push({v:et,fx:W,fy:Z,tx:G,ty:ot,t:0,dur:.34}),it&&J.get(it)){const[zt,Mt]=ae(G,ot);We(zt,Mt,16),J.delete(it)}Rt++,(wt==="chess"||wt==="xq")&&at(W,Z,G,ot)},onCap(b){M.textContent="第 "+Rt+" 手 · "+b},onEnd(b){Ht=yi()+2.6,M.textContent=b}}}function We(b,W,Z){if(!o)for(let G=0;G<Z;G++){const ot=Math.random()*t,it=40+Math.random()*140;ct.push({x:b,y:W,vx:Math.cos(ot)*it,vy:Math.sin(ot)*it-40,life:1})}}function pn(){const b=new Set;for(const W of mt.pieces){b.add(W.uid);let Z=J.get(W.uid);Z?ks(W.uid)||(Z.gx=W.gx,Z.gy=W.gy):(Z={gx:W.gx,gy:W.gy,born:Ue,settled:!1},J.set(W.uid,Z)),Z.t=W.t,Z.c=W.c}for(const W of[...J.keys()])b.has(W)||J.delete(W)}function ks(b){return Pt.some(W=>W.v===J.get(b))}function Xe(b){wt=b,mt=Wg(b,{difficulty:$t,hooks:Re()}),mt.build(),Rt=0,Ht=0,It=null,Lt=!1,Kt=[],Vt=!1,J.clear(),Pt=[],ct=[],kt=yi()+.35,pn(),E.textContent=Bc[b]+(b==="go"?" · 练习":""),M.textContent=Et?"双 AI 自动对弈中…":"人机对局 · 你先走",y.textContent="第 0 手",te=!1,(b==="chess"||b==="xq")&&Jg(b).then(()=>{te=!0,ht==="play"&&!mt.over&&(kt=Ue+.05)}).catch(()=>{te=!1})}function os(){const b=h(),W=he(),Z=W.s,G=f.createRadialGradient(Z/2,Z/2,10,Z/2,Z/2,Z*.72);G.addColorStop(0,b.b2board),G.addColorStop(1,c==="dark"?"#101a34":"#e6d8b8"),f.fillStyle=G,f.fillRect(0,0,Z,Z);const ot=mt.cols,it=mt.rows,et=Mt=>W.x0+Mt*W.cell,lt=Mt=>W.y0+Mt*W.cell;if(wt==="chess"){for(let Mt=0;Mt<8;Mt++)for(let Wt=0;Wt<8;Wt++)f.fillStyle=(Mt+Wt)%2?b.sqB:b.sqA,f.fillRect(et(Mt),lt(Wt),W.cell+.5,W.cell+.5);f.fillStyle=b.text,f.font=`${W.cell*.2}px system-ui`,f.textAlign="center",f.textBaseline="middle";for(let Mt=0;Mt<8;Mt++)f.fillText("abcdefgh"[Mt],et(Mt+.5),lt(8)-W.cell*.32),f.fillText(String(8-Mt),W.x0-W.cell*.34,lt(Mt+.5));return}if(f.strokeStyle=b.line,f.lineWidth=Math.max(1,W.cell*.04),f.beginPath(),wt==="xq"){for(let Mt=0;Mt<10;Mt++)f.moveTo(et(0),lt(Mt)),f.lineTo(et(8),lt(Mt));for(let Mt=0;Mt<9;Mt++)Mt===0||Mt===8?(f.moveTo(et(Mt),lt(0)),f.lineTo(et(Mt),lt(9))):(f.moveTo(et(Mt),lt(0)),f.lineTo(et(Mt),lt(4)),f.moveTo(et(Mt),lt(5)),f.lineTo(et(Mt),lt(9)));f.moveTo(et(3),lt(0)),f.lineTo(et(5),lt(2)),f.moveTo(et(5),lt(0)),f.lineTo(et(3),lt(2)),f.moveTo(et(3),lt(7)),f.lineTo(et(5),lt(9)),f.moveTo(et(5),lt(7)),f.lineTo(et(3),lt(9))}else{for(let Mt=0;Mt<ot;Mt++)f.moveTo(et(Mt),lt(0)),f.lineTo(et(Mt),lt(ot-1));for(let Mt=0;Mt<it;Mt++)f.moveTo(et(0),lt(Mt)),f.lineTo(et(it-1),lt(Mt))}f.stroke(),f.fillStyle=b.line;const zt=wt==="go"?[[3,3],[9,3],[15,3],[3,9],[9,9],[15,9],[3,15],[9,15],[15,15]]:[[3,3],[11,3],[7,7],[3,11],[11,11]];for(const[Mt,Wt]of zt)f.beginPath(),f.arc(et(Mt),lt(Wt),Math.max(2,W.cell*.11),0,t),f.fill();wt==="xq"&&(f.fillStyle=b.text,f.font=`${W.cell*.55}px 'KaiTi','STKaiti','SimSun',serif`,f.textAlign="center",f.textBaseline="middle",f.fillText("楚  河",et(2),lt(4.5)),f.fillText("漢  界",et(6),lt(4.5)))}function xi(b,W,Z,G){const ot=h(),et=he().cell*(wt==="go"||wt==="wuzi"?.47:wt==="xq"?.44:.42)*G;if(!(et<.5)){if(f.save(),f.translate(W,Z),wt==="go"||wt==="wuzi"){const lt=f.createRadialGradient(-et*.35,-et*.35,et*.1,0,0,et);b.c===0?(lt.addColorStop(0,c==="dark"?"#39424e":"#3a4658"),lt.addColorStop(1,c==="dark"?"#0b0f16":"#12182a")):(lt.addColorStop(0,"#f7faff"),lt.addColorStop(1,c==="dark"?"#b7c4d9":"#cdd8ea")),f.fillStyle=lt,f.shadowColor="rgba(0,0,0,.4)",f.shadowBlur=et*.5,f.shadowOffsetY=et*.18,f.beginPath(),f.arc(0,0,et,0,t),f.fill(),f.shadowColor="transparent"}else if(wt==="xq"){f.shadowColor="rgba(0,0,0,.35)",f.shadowBlur=et*.5,f.shadowOffsetY=et*.18,f.fillStyle=a(ot.wood),f.beginPath(),f.arc(0,0,et,0,t),f.fill(),f.shadowColor="transparent",f.strokeStyle=a(ot.blk)+"80",f.lineWidth=Math.max(1,et*.09),f.beginPath(),f.arc(0,0,et*.85,0,t),f.stroke();const lt={K:"帥",A:"仕",B:"相",N:"馬",R:"車",C:"炮",P:"兵"}[b.t]||"兵";f.fillStyle=a(b.c===0?ot.red:ot.blk),f.font=`${et*1.15}px 'KaiTi','STKaiti','SimSun',serif`,f.textAlign="center",f.textBaseline="middle",f.fillText(lt,0,et*.06)}else{const lt={K:"♚",Q:"♛",R:"♜",B:"♝",N:"♞",P:"♟"}[b.t]||"♟";f.font=`${et*1.5}px system-ui,'Segoe UI Symbol'`,f.textAlign="center",f.textBaseline="middle",f.lineWidth=Math.max(1.2,et*.15),f.strokeStyle=b.c?"rgba(225,238,255,.9)":"rgba(10,16,30,.9)",f.fillStyle=b.c?"#182234":"#eef4fd",f.strokeText(lt,0,et*.08),f.fillText(lt,0,et*.08)}f.restore()}}function Hs(){var Z;if(!mt)return;const b=h(),W=he();if(f.clearRect(0,0,W.s,W.s),os(),mt.last){const[G,ot]=ae(mt.last[0],mt.last[1]);f.strokeStyle=b.gold,f.lineWidth=1.6,f.globalAlpha=.85,f.beginPath(),f.arc(G,ot,W.cell*.52,0,t),f.stroke(),f.globalAlpha=1}if(mt.winLine){const[G,ot]=mt.winLine,[it,et]=ae(G[0],G[1]),[lt,zt]=ae(ot[0],ot[1]);f.strokeStyle=b.gold,f.lineWidth=3,f.globalAlpha=.8,f.beginPath(),f.moveTo(it,et),f.lineTo(lt,zt),f.stroke(),f.globalAlpha=1}if(yt&&!mt.over){const[G,ot]=yt;if(wt==="go"||wt==="wuzi"){if(!mt.pieces.some(it=>it.gx===G&&it.gy===ot)){const[it,et]=ae(G,ot);f.globalAlpha=.38,xi({c:mt.turn},it,et,1),f.globalAlpha=1}}else if(It){f.fillStyle=b.gold;for(const[lt,zt]of It.targets){const[Mt,Wt]=ae(lt,zt);f.globalAlpha=.45+Math.sin(Ue*6)*.22,f.beginPath(),f.arc(Mt,Wt,W.cell*.13,0,t),f.fill()}f.globalAlpha=1;const[it,et]=ae(It.p.gx,It.p.gy);f.strokeStyle=b.gold,f.lineWidth=2,f.beginPath(),f.arc(it,et,W.cell*.52,0,t),f.stroke()}else{const it=mt.pieces.find(et=>et.gx===G&&et.gy===ot);if(it&&it.c===mt.turn){const[et,lt]=ae(G,ot);f.strokeStyle=b.accent,f.lineWidth=1.5,f.globalAlpha=.5,f.beginPath(),f.arc(et,lt,W.cell*.5,0,t),f.stroke(),f.globalAlpha=1}}}for(const[G,ot]of J){if(Pt.some(Wt=>Wt.v===ot))continue;const et=ot.born!==void 0?(Ue-ot.born)/.38:1,lt=et<1?r(Math.max(0,et)):1,[zt,Mt]=ae(ot.gx,ot.gy);xi({c:ot.c,t:ot.t},zt,Mt,lt)}for(const G of Pt){const ot=s(Math.min(1,G.t)),[it,et]=ae(G.fx,G.fy),[lt,zt]=ae(G.tx,G.ty),Mt=n(it,lt,ot),Wt=n(et,zt,ot)-Math.sin(Math.PI*ot)*W.cell*.45,se=J.get((Z=[...J.entries()].find(([,Ot])=>Ot===G.v))==null?void 0:Z[0])||G.v;xi({c:se.c,t:se.t},Mt,Wt,1.05)}for(const G of ct)f.globalAlpha=Math.max(0,G.life),f.fillStyle=b.gold,f.beginPath(),f.arc(G.x,G.y,2.2,0,t),f.fill();f.globalAlpha=1}g.addEventListener("pointermove",b=>{const W=g.getBoundingClientRect();W.width!==0&&(yt=Qt(b.clientX-W.left,b.clientY-W.top))}),g.addEventListener("pointerleave",()=>{yt=null}),g.addEventListener("pointerdown",b=>{if(!mt||mt.over||Ht)return;const W=g.getBoundingClientRect(),Z=Qt(b.clientX-W.left,b.clientY-W.top);if(!Z)return;const[G,ot]=Z;if(wt==="go"||wt==="wuzi")if(mt.tryHuman(G,ot))pn(),Lt=!0,kt=yi()+.45;else{const[it,et]=ae(G,ot);We(it,et,4)}else if(It&&It.targets.some(([it,et])=>it===G&&et===ot)){const it=It.p;It=null,mt.moveTo(it,G,ot),pn(),Lt=!0,kt=yi()+.45}else{const it=mt.tryHuman(G,ot);It=it&&it.select?{p:it.select,targets:mt.legalFrom(it.select)}:null}});function Ln(b){ht="play",L.tDist=15,L.tElev=.3,L.look.set(b.grp.position.x*.5,0,b.grp.position.z*.5),u.classList.add("hidden"),x.classList.add("on"),Xe(b.mode)}function as(){ht="gallery",x.classList.remove("on"),u.classList.remove("hidden"),L.tDist=26,L.tElev=.32,L.tAzim=0,L.look.set(0,0,0)}I.addEventListener("click",as),q.addEventListener("click",()=>Xe(wt)),k.addEventListener("click",()=>{Et=!Et,k.classList.toggle("on",Et),M.textContent=Et?"双 AI 自动对弈中…":"人机对局 · 你先走",Lt=!1}),F.addEventListener("click",b=>{const W=b.target.closest("button");W&&($t=+W.dataset.d,[...F.querySelectorAll("button")].forEach(Z=>Z.classList.toggle("on",Z===W)),Xe(wt))}),document.addEventListener("keydown",b=>{b.key==="Escape"&&ht==="play"&&as()});function Qn(){const b=document.documentElement.getAttribute("data-theme")||"dark";if(b===c)return;c=b;const W=h();v.background=null,v.fog.color=new Yt(W.fog),v.fog.near=24,v.fog.far=70,A.color.set(W.rim),w.color.setHex(W.amb),w.groundColor.setHex(W.plate),K();for(const Z in j)delete j[Z]}new MutationObserver(Qn).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),v.background=null,v.fog=new il(h().fog,24,70),A.color.set(h().rim),w.color.setHex(h().amb),w.groundColor.setHex(h().plate);let Ue=0;function yi(){return performance.now()/1e3}function eo(b){for(let Z=ct.length-1;Z>=0;Z--){const G=ct[Z];G.x+=G.vx*b,G.y+=G.vy*b,G.vy+=220*b,G.life-=b*1.6,G.life<=0&&ct.splice(Z,1)}for(let Z=Pt.length-1;Z>=0;Z--){const G=Pt[Z];if(G.t+=b/G.dur,G.t>=1){const ot=G.v;ot.gx=G.tx,ot.gy=G.ty,Pt.splice(Z,1)}}if(Ht&&Ue>Ht&&ht==="play"&&Xe(wt),!mt||mt.over||Ht)return;if((Et||Lt)&&Pt.length===0&&Ue>kt&&!Vt)if(te&&(wt==="chess"||wt==="xq")){Vt=!0;const G=$t===2?350:$t===1?220:120,ot=wt==="xq"?Qg():null;jg(wt,{fen:ot,moves:Kt,movetime:G}).then(it=>{Vt=!1,Q(it)}).catch(()=>{Vt=!1,Q(null)})}else mt.stepAI(),pn(),Lt=!1,kt=Ue+(Et?.22+Math.random()*.28:.2)}function no(b,W,Z,G){Ue=G/1e3,Qn(),P(),o||(B.rotation.y+=.01/60),_t(Ue),ht==="play"&&(eo(.016),Hs(),y.textContent="第 "+Rt+" 手"),st.render(v,_)}function D(b,W){b<=0||W<=0||(Nt=b,Ut=W,st.setSize(b,W,!1),_.aspect=b/W,_.updateProjectionMatrix(),jt())}function Q(b){if(!b){rt();return}const W=Kg(wt,b);if(!W){rt();return}const Z=mt.pieces.find(G=>G.gx===W.fx&&G.gy===W.fy);if(!Z){rt();return}mt.moveTo(Z,W.tx,W.ty),pn(),Lt=!1,kt=Ue+(Et?.18+Math.random()*.22:.25)}function rt(){mt.stepAI(),pn(),Lt=!1,kt=Ue+(Et?.22+Math.random()*.28:.2)}function at(b,W,Z,G){const ot=wt==="chess"&&Math.abs(G-W)===1&&(G===0||G===7);Kt.push($g(wt,b,W,Z,G,ot))}return window.__chessEnter=b=>{const W=dt.find(Z=>Z.mode===b);W&&Ln(W)},window.__chessDbg=()=>{let b=0;if(mt)for(const W of mt.pieces)b=Math.max(b,Math.abs(W.gx));return{view:ht,mode:wt,moveNo:Rt,pieces:mt?mt.pieces.length:0,over:!!Ht,maxX:+b.toFixed(2),engineOk:te,uciLen:Kt.length}},window.__chessEngineOn=()=>te,window.__chessUCI=()=>Kt.slice(),{frame:no,resize:D}}const me=window.matchMedia("(prefers-reduced-motion: reduce)").matches,le=(i,t)=>i+Math.random()*(t-i),Ee=(i,t,e)=>i+(t-i)*e,_e=Math.PI*2;function ev(i,t){const e=Math.min(window.devicePixelRatio||1,2),n=t.clientWidth||window.innerWidth,s=t.clientHeight||window.innerHeight;i.width=Math.max(1,Math.round(n*e)),i.height=Math.max(1,Math.round(s*e)),i.style.width=n+"px",i.style.height=s+"px";const r=i.getContext("2d");return r.setTransform(e,0,0,e,0,0),{ctx:r,w:n,h:s}}function Gr(i,t){const e=i.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-e.left+n.width/2,y:n.top-e.top+n.height/2,w:n.width,h:n.height}}function rs(){return document.documentElement.getAttribute("data-theme")!=="light"?{a:"123,224,255",b:"120,180,255",c:"123,200,255",g:"180,210,255"}:{a:"0,144,212",b:"43,108,255",c:"43,108,255",g:"40,90,180"}}function nv(){let i=[];function t(e,n){i=Array.from({length:70},()=>({x:le(0,e),y:le(0,n),ox:le(0,e),oy:le(0,n),r:le(.6,2),ph:le(0,_e),a:le(.2,.7)}))}return{resize:t,frame(e,n,s,r){e.clearRect(0,0,n,s);const o=rs(),a=n/2,l=s*.32;for(const h of i){h.x=Ee(h.x,Ee(h.ox,a,.35),.02),h.y=Ee(h.y,Ee(h.oy,l,.35),.02),h.ox+=Math.cos(r*3e-4+h.ph)*.3,h.oy+=Math.sin(r*3e-4+h.ph)*.3;const p=h.a*(.6+.4*Math.sin(r*.002+h.ph));e.beginPath(),e.arc(h.x,h.y,h.r,0,_e),e.fillStyle=`rgba(${o.g},${p})`,e.fill()}const c=e.createRadialGradient(a,l,0,a,l,n*.28);c.addColorStop(0,`rgba(${o.a},0.10)`),c.addColorStop(1,`rgba(${o.a},0)`),e.fillStyle=c,e.fillRect(0,0,n,s)}}}function iv(i){const t=i.querySelector(".avatar");let e=[],n={x:0,y:0,r:90};function s(o,a){if(t){const l=Gr(i,t);n={x:l.x,y:l.y,r:Math.max(70,l.w/2+34)}}else n={x:o/2,y:a/2,r:90};e=Array.from({length:60},()=>({x:le(0,o),y:le(0,a),tx:0,ty:0,a:le(.3,.9),ph:le(0,_e)}))}function r(){e.forEach((o,a)=>{const l=a/e.length*_e;o.tx=n.x+Math.cos(l)*n.r,o.ty=n.y+Math.sin(l)*n.r})}return{resize(o,a){s(o,a),r()},frame(o,a,l,c){o.clearRect(0,0,a,l);const h=rs();r();for(const p of e){p.x=Ee(p.x,p.tx,.06),p.y=Ee(p.y,p.ty,.06),Math.atan2(p.y-n.y,p.x-n.x);const d=p.a*(.6+.4*Math.sin(c*.003+p.ph));o.beginPath(),o.arc(p.x,p.y,1.8,0,_e),o.fillStyle=`rgba(${h.a},${d})`,o.shadowBlur=8,o.shadowColor=`rgba(${h.a},${d})`,o.fill(),o.shadowBlur=0}}}}const Sr="·:*○●★☆→←↑↓/\\|=+<>░▒▓日月星辰光渊象".split("");function sv(){let i=[];function t(e,n){i=Array.from({length:40},()=>({x:le(0,e),y:le(-n,0),s:le(12,22),sp:le(.6,1.8),a:le(.15,.5)}))}return{resize:t,frame(e,n,s,r){e.clearRect(0,0,n,s);const o=rs();e.font='16px "Courier New", monospace';for(const a of i){a.y+=a.sp,a.y>s+20&&(a.y=le(-40,0),a.x=le(0,n));const l=Sr[(Math.floor(r*.01+a.x)%Sr.length+Sr.length)%Sr.length];e.fillStyle=`rgba(${o.a},${a.a})`,e.fillText(l,a.x,a.y)}}}}const kc=["♪","♫","♬","♩"];function rv(i){const t=i.querySelector(".music-play"),e=()=>document.documentElement.getAttribute("data-theme")!=="light",n=()=>e()?{a:"123,224,255",b:"120,180,255",g:"180,210,255"}:{a:"0,144,212",b:"43,108,255",g:"40,90,180"},s=v=>{let _=v>>>0;return()=>(_=_*1664525+1013904223>>>0,_/4294967296)};let r=[];function o(v,_){const L=s(987654321),P=v<560?14:24;r=[];let w=0;for(;r.length<P&&w<P*240;){w++;const C=L()*2-1,T=L()*2-1,O=L()*2-1;let A=!0;for(const R of r){const z=R.nx-C,B=R.ny-T,$=(R.nz-O)*1.4;if(Math.hypot(z,B,$)<.26){A=!1;break}}A&&r.push({nx:C,ny:T,nz:O,g:kc[L()*kc.length|0],sizeBase:18+L()*26,ph:L()*Math.PI*2,sp:.4+L()*.8})}}const a=900;function l(v,_,L,P,w){const C=a+L;if(C<60)return null;const T=a/C;return{x:P+v*T,y:w+_*T,s:T}}let c=null,h=!1,p=-1,d=0,g=0;function f(){if(c)return c;try{const v=window.AudioContext||window.webkitAudioContext;if(!v)return null;const _=new v,L=_.createAnalyser();L.fftSize=256;const P=new Uint8Array(L.frequencyBinCount),w=new Audio;w.preload="auto",w.crossOrigin="anonymous",w.addEventListener("ended",()=>{h&&E(!0)}),w.addEventListener("playing",()=>{g=0}),w.addEventListener("error",()=>{if(h){if(g++,g>=3){u();return}m()}}),c={ctx:_,analyser:L,bins:P,el:w,srcNode:null},w.addEventListener("play",function(){if(window.parent&&window.parent!==window)try{window.parent.postMessage({type:"endy:audioFocus",owner:"home-app"},"*")}catch{}}),window.addEventListener("message",function(C){if(C.data&&C.data.type==="endy:audioFocus"&&C.data.owner==="blog"){try{w.paused||w.pause()}catch{}document.querySelectorAll("audio, video").forEach(function(T){try{T.paused||T.pause()}catch{}})}})}catch{c=null}return c}function x(){if(!(!c||c.srcNode))try{const v=c.ctx.createMediaElementSource(c.el);v.connect(c.analyser),c.analyser.connect(c.ctx.destination),c.srcNode=v}catch{}}function u(){h=!1,g=0;try{c.el.pause()}catch{}t&&(t.textContent="▶ 试听",t.setAttribute("aria-label","试听随机歌曲"))}function m(){const v=xe.music&&xe.music.playlist,_=v&&v[p];if(!_||!_.raw||_._rawTried){u();return}_._rawTried=!0,c.el.src=_.raw,c.el.play().catch(()=>{})}function E(v){const _=xe.music&&xe.music.playlist;if(!_||!_.length)return!1;let L=p;if(!v||_.length===1)L=Math.floor(Math.random()*_.length);else do L=Math.floor(Math.random()*_.length);while(L===p);p=L;const P=_[L];return c.el.src=P.src,c.el.title=P.title||"未知曲目",x(),t&&(t.textContent="♪ "+(P.title||"播放中"),t.setAttribute("aria-label","正在播放："+(P.title||"未知曲目")+"，点击停止")),c.el.play().catch(()=>{}),!0}function y(){if(me)return;const v=f();if(v)if(h=!h,h){const _=xe.music&&xe.music.playlist;if(_&&_.forEach(L=>{L._rawTried=!1}),g=0,v.ctx.state==="suspended"&&v.ctx.resume(),!E(!1)){h=!1;return}}else v.el.pause(),t&&(t.textContent="▶ 试听",t.setAttribute("aria-label","试听随机歌曲"))}t&&!me&&t.addEventListener("click",y);function M(v){const _=v*96/6e4*Math.PI*2,L=Math.pow(Math.max(0,Math.sin(_)),6),P=.5+.5*Math.sin(v*.0011);return{kick:L,bass:P}}const k={sx:0,sy:0,tsx:0,tsy:0},F={x:0,y:0,tx:0,ty:0};window.addEventListener("pointermove",v=>{F.tx=(v.clientX/window.innerWidth-.5)*2,F.ty=(v.clientY/window.innerHeight-.5)*2},{passive:!0});const I=48;function q(v,_){o(v)}q(0);function st(v,_,L,P){v.clearRect(0,0,_,L);const w=n(),C=_*.5,T=L*.46,O=!!(c&&h&&c.el&&!c.el.paused),A=O&&c.el?c.el.currentTime*1e3:0,{kick:R,bass:z}=O?M(A):{kick:0,bass:0};let B=null;if(d=0,c&&h&&c.srcNode&&c.el&&!c.el.paused){c.analyser.getByteFrequencyData(c.bins),B=c.bins;let vt=0;for(let U=0;U<B.length;U++)vt+=B[U];d=vt/B.length/255}const $=i.getBoundingClientRect(),X=window.innerHeight||1,H=($.top+$.height/2-X/2)/X;F.x+=(F.tx-F.x)*.06,F.y+=(F.ty-F.y)*.06,k.tsx=H*_*.08+F.x*_*.04,k.tsy=H*L*.05+F.y*L*.03,k.sx+=(k.tsx-k.sx)*.08,k.sy+=(k.tsy-k.sy)*.08;const K=.42;v.save(),v.translate(C+k.sx*.35,T+k.sy*.35);const V=[{r:150,sp:18e-5,dots:5,c:w.a,w:1.2},{r:104,sp:-26e-5,dots:4,c:w.b,w:1},{r:62,sp:34e-5,dots:3,c:w.g,w:.9}];for(const vt of V){v.save(),v.scale(1,K),v.beginPath(),v.arc(0,0,vt.r,0,Math.PI*2),v.strokeStyle=`rgba(${vt.c},0.3)`,v.lineWidth=vt.w,v.stroke();for(let U=0;U<vt.dots;U++){const S=P*vt.sp+U/vt.dots*Math.PI*2;v.beginPath(),v.arc(Math.cos(S)*vt.r,Math.sin(S)*vt.r,2.4,0,Math.PI*2),v.fillStyle=`rgba(${vt.c},0.9)`,v.shadowBlur=10,v.shadowColor=`rgba(${vt.c},0.9)`,v.fill(),v.shadowBlur=0}v.restore()}const j=178,ut=P*2e-4;for(let vt=0;vt<I;vt++){const U=vt/I*Math.PI*2+ut;let S;if(B&&d>.01){const _t=Math.floor(vt/I*(B.length*.7));S=6+B[_t]/255*46}else O?S=6+(.5+.5*Math.sin(A*.004+vt*.5))*(10+26*(.6+.4*R)):S=6;const tt=Math.cos(U),ft=Math.sin(U);v.beginPath(),v.moveTo(tt*j,ft*j*K),v.lineTo(tt*(j+S),ft*(j+S)*K),v.strokeStyle=`rgba(${vt%2?w.a:w.b},${.5+.4*(S/52)})`,v.lineWidth=2,v.shadowBlur=6,v.shadowColor=`rgba(${w.a},0.6)`,v.stroke()}v.shadowBlur=0;const gt=14+R*10+z*6+d*14,xt=v.createRadialGradient(0,0,0,0,0,gt*3);xt.addColorStop(0,`rgba(${w.g},${.5+.3*R})`),xt.addColorStop(1,`rgba(${w.g},0)`),v.fillStyle=xt,v.beginPath(),v.arc(0,0,gt*3,0,Math.PI*2),v.fill(),v.restore();const At=Math.min(_,L)*.9,nt=At/2,N=_*.86/2,dt=L*.7/2,pt=P*6e-5,St=Math.cos(pt),Tt=Math.sin(pt),Ft=[];for(const vt of r){const U=vt.nx*N,S=vt.ny*dt,tt=vt.nz*nt,ft=U*St-tt*Tt,_t=U*Tt+tt*St,ht=(tt+nt)/At,wt=ft+k.sx*(.5+ht)*.7,mt=S+k.sy*(.5+ht)*.7,Rt=l(wt,mt,_t,C,T);if(!Rt)continue;const $t=1+Math.min(.3,R*.12+z*.06+d*.22),Et=vt.sizeBase*Rt.s*$t;Et<3||Ft.push({n:vt,p:Rt,size:Et,depthF:ht})}Ft.sort((vt,U)=>vt.p.s-U.p.s);for(const vt of Ft){const U=vt.n,S=.35+vt.depthF*.55,tt=Math.sin(P*5e-4*U.sp+U.ph)*.5;v.save(),v.translate(vt.p.x,vt.p.y),v.rotate(tt),v.font=`${vt.size.toFixed(1)}px "Segoe UI Symbol","Apple Symbols",serif`,v.textAlign="center",v.textBaseline="middle",v.fillStyle=`rgba(${vt.depthF>.5?w.a:w.b},${S.toFixed(2)})`,v.shadowBlur=8*vt.depthF,v.shadowColor=`rgba(${w.a},${.5*vt.depthF})`,v.fillText(U.g,0,0),v.restore()}}return{frame:st,resize:q}}function ov(i){const t=document.createElement("div");t.className="holo-host",i.appendChild(t);let e;try{e=new Yr({antialias:!0,alpha:!0})}catch{const R=document.createElement("div");return R.className="holo-fallback",R.textContent="当前环境不支持 WebGL，全息投影暂不可用",i.appendChild(R),{frame(){}}}e.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.appendChild(e.domElement);const n=i.clientWidth||window.innerWidth,s=i.clientHeight||window.innerHeight;e.setSize(n,s,!1);const r=new Bs,o=new Ce(45,n/s,.1,2e3),a=new Y(0,46,84);o.position.copy(a),o.lookAt(0,0,0);const l=new je,c=new je;l.add(c),r.add(l);const h={dragging:!1,sx:0,sy:0,tilt0:0,spin0:0,tTilt:.62,tilt:.62,tSpin:0,spin:0,mx:-2,my:-2,tipX:0,tipY:0,started:0,prog:0,theme:"",nx:0,ny:0,dustMat:null},p={dark:{fill:2861311,fillOp:.1,edge:7332863,edgeOp:.85,scan:10481919,beam:5767113,dust:10470655,dustOp:.4},light:{fill:2845951,fillOp:.12,edge:683220,edgeOp:.9,scan:2845951,beam:43138,dust:3824266,dustOp:.28}};let d=p.dark;const g=118.35,f=26.05,x=15,u=(A,R)=>[(A-g)*x*Math.cos(f*Math.PI/180),(R-f)*x],m=[],E=[],y=[],M=[];let k=null,F=null,I=null,q=null;function st(){for(const X of zg.features){const H=X.geometry.coordinates,K=[];for(const xt of H){const At=xt[0];if(!At||At.length<3)continue;const nt=At.map(([N,dt])=>{const[pt,St]=u(N,dt);return new Ct(pt,St)});K.push(new ll(nt))}if(!K.length)continue;M.push(K);const V=new cl(K,{depth:1.7,bevelEnabled:!1}),j=new on({color:d.fill,transparent:!0,opacity:0,blending:Ze,depthWrite:!1,side:ze}),ut=new fe(V,j);ut.userData.name=X.properties.name,c.add(ut),m.push(ut);const gt=new $r({color:d.edge,transparent:!0,opacity:0});E.push(gt),c.add(new X1(new og(V,18),gt))}h.scanMat=new on({color:d.scan,transparent:!0,opacity:0,blending:Ze,depthWrite:!1,side:ze}),k=new je;for(const X of M)k.add(new fe(new hl(X),h.scanMat));c.add(k);const[A,R]=u(119.548,26.657);h.nx=A,h.ny=R,F=new fe(new zs(.22,.34,16,16,1,!0),new on({color:d.beam,transparent:!0,opacity:0,blending:Ze,depthWrite:!1,side:ze})),F.rotation.x=Math.PI/2,F.position.set(A,R,8),c.add(F);for(let X=0;X<2;X++){const H=new fe(new Zr(.9,1.02,48),new on({color:d.beam,transparent:!0,opacity:0,blending:Ze,depthWrite:!1,side:ze}));H.rotation.x=Math.PI/2,H.position.set(A,R,.15),H.userData.phase=X*.5,c.add(H),y.push(H)}const z=500,B=new Float32Array(z*3);for(let X=0;X<z;X++)B[X*3]=(Math.random()-.5)*300,B[X*3+1]=Math.random()*90-15,B[X*3+2]=(Math.random()-.5)*300;const $=new de;$.setAttribute("position",new Ne(B,3)),h.dustMat=new es({color:d.dust,size:1.1,sizeAttenuation:!1,transparent:!0,opacity:0}),r.add(new Rs($,h.dustMat)),I=document.createElement("div"),I.className="holo-label",I.textContent="我在这里",i.appendChild(I),q=document.createElement("div"),q.className="holo-tip",i.appendChild(q)}const v=e.domElement;v.addEventListener("pointerdown",A=>{if(!(A.pointerType!=="mouse"||A.button!==0)){h.dragging=!0,h.sx=A.clientX,h.sy=A.clientY,h.tilt0=h.tTilt,h.spin0=h.tSpin;try{v.setPointerCapture(A.pointerId)}catch{}}}),v.addEventListener("pointermove",A=>{const R=i.getBoundingClientRect();h.mx=(A.clientX-R.left)/R.width*2-1,h.my=-((A.clientY-R.top)/R.height*2-1),h.tipX=A.clientX-R.left,h.tipY=A.clientY-R.top,h.dragging&&(h.tSpin=h.spin0-(A.clientX-h.sx)*.005,h.tTilt=Math.max(.06,Math.min(1.32,h.tilt0+(A.clientY-h.sy)*.004)))}),v.addEventListener("pointerup",A=>{h.dragging=!1;try{v.releasePointerCapture(A.pointerId)}catch{}}),v.addEventListener("pointerleave",()=>{h.dragging=!1,h.mx=-2,h.my=-2});function _(){const A=i.getBoundingClientRect(),R=A.top+A.height/2,z=window.innerHeight/2;h.prog=Math.max(0,Math.min(1,1-Math.abs(R-z)/(window.innerHeight*.9)))}function L(){const A=document.documentElement.getAttribute("data-theme")||"dark";if(A!==h.theme){h.theme=A,d=p[A]||p.dark;for(const R of m)R.material.color.setHex(d.fill);for(const R of E)R.color.setHex(d.edge);h.scanMat&&h.scanMat.color.setHex(d.scan),F&&F.material.color.setHex(d.beam);for(const R of y)R.material.color.setHex(d.beam);h.dustMat&&h.dustMat.color.setHex(d.dust)}}const P=new jr,w=new Ct;function C(){if(!q)return;if(h.dragging||h.mx<-1.5){q.classList.remove("show");return}P.setFromCamera(w.set(h.mx,h.my),o);const A=P.intersectObjects(m,!1)[0];A?(q.textContent=A.object.userData.name,q.style.left=h.tipX+"px",q.style.top=h.tipY+"px",q.classList.add("show")):q.classList.remove("show")}st();const T=A=>1-Math.pow(1-A,3),O=new Y;return{resize(A,R){e.setSize(A,R,!1),o.aspect=A/R,o.updateProjectionMatrix()},frame(A,R,z,B){L(),h.started||(h.started=B),_();const $=B-h.started,X=me?1:T(Math.min(1,$/1900)),H=me?1:.92+.08*Math.sin(B*.02)*Math.sin(B*.013);c.position.y=-14*(1-X)+(me?0:Math.sin(B*.0011)*.7*X);for(const K of m)K.material.opacity=d.fillOp*H*X;for(const K of E)K.opacity=d.edgeOp*X;if(h.dustMat&&(h.dustMat.opacity=d.dustOp*X),X>=1&&I&&I.classList.add("show"),!h.dragging&&!me&&(h.tSpin+=.0016),h.spin=Ee(h.spin,h.tSpin,.07),h.tilt=Ee(h.tilt,h.tTilt,.07),c.rotation.y=h.spin,l.rotation.x=-Math.PI/2+h.tilt,o.position.copy(a).multiplyScalar(1.35-h.prog*.35),o.lookAt(0,0,0),k){const K=B*35e-5%1;k.position.z=-1.5+K*5,h.scanMat.opacity=.38*(1-Math.abs(K-.5)*1.2)*X*H}for(const K of y){const V=(B*6e-4+K.userData.phase)%1,j=.6+V*7;K.scale.set(j,j,1),K.material.opacity=(1-V)*.55*X}F&&(F.material.opacity=(.35+.15*Math.sin(B*.004))*X),I&&(O.set(h.nx,h.ny,16),c.updateWorldMatrix(!0,!1),O.applyMatrix4(c.matrixWorld),O.project(o),I.style.left=(O.x*.5+.5)*R+"px",I.style.top=(-O.y*.5+.5)*z+"px"),C(),e.render(r,o)}}}function av(i){const t=xe.personality||{},e=t.dims||[],n=document.createElement("div");n.className="persona-host",i.appendChild(n);let s;try{s=new Yr({antialias:!0,alpha:!0})}catch{const $=document.createElement("div");return $.className="persona-fallback",$.textContent="当前环境不支持 WebGL，人格星核暂不可用",i.appendChild($),{frame(){}}}s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.appendChild(s.domElement);const r=i.clientWidth||window.innerWidth,o=i.clientHeight||window.innerHeight;s.setSize(r,o,!1);const a=new Bs,l=new Ce(42,r/o,.1,500);l.position.set(0,0,96);const c=new je;a.add(c);const h={drag:!1,sx:0,sy:0,tilt0:0,spin0:0,tTilt:.1,tilt:.1,tSpin:0,spin:0,started:0,mx:-2,my:-2,tipX:0,tipY:0,theme:""},p={dark:{glow:6992639,orbit:8373503,letA:"#b8f0ff",letB:"rgba(160,200,255,0.55)",bgA:"#0b1226",bgB:"#1a0f2e",bgC:"#03111c"},light:{glow:10273023,orbit:2845951,letA:"#1d4fc0",letB:"rgba(60,90,140,0.45)",bgA:"#e9f0fb",bgB:"#f0e9fb",bgC:"#e0f0ff"}};let d=p.dark;const g=30,f=[{tiltX:0,tiltY:0,speed:.3},{tiltX:Math.PI/2,tiltY:0,speed:-.22},{tiltX:0,tiltY:Math.PI/2,speed:.17},{tiltX:Math.PI/4,tiltY:Math.PI/4,speed:-.13}],x=B=>f[B]||f[f.length-1];function u(B,$,X=220){const H=document.createElement("canvas");H.width=H.height=X;const K=H.getContext("2d");return K.font=`800 ${X*.56}px -apple-system, 'Segoe UI', sans-serif`,K.textAlign="center",K.textBaseline="middle",K.shadowColor=$,K.shadowBlur=X*.12,K.fillStyle=$,K.fillText(B,X/2,X/2+X*.03),K.fillText(B,X/2,X/2+X*.03),new Rn(H)}let m=null,E=null,y=null,M=null,k=null,F=null,I=null;const q=[],st=[];function v(B,$){const X=parseInt(B.replace("#",""),16);return`rgba(${X>>16&255}, ${X>>8&255}, ${X&255}, ${$})`}function _(B){const $=document.createElement("canvas");$.width=1024,$.height=1024;const X=$.getContext("2d"),H=B.bgA==="#e9f0fb",K=H?.12:.42,V=H?.05:.18,j=X.createRadialGradient(512,512,0,512,512,720);j.addColorStop(0,v(B.bgA,0)),j.addColorStop(.35,v(B.bgA,K)),j.addColorStop(.65,v(B.bgB,V)),j.addColorStop(1,v(B.bgC,0)),X.fillStyle=j,X.fillRect(0,0,1024,1024);for(let gt=0;gt<5;gt++){const xt=120+Math.random()*784,At=120+Math.random()*784,nt=80+Math.random()*180,N=X.createRadialGradient(xt,At,0,xt,At,nt),dt=gt%2===0?B.bgB:B.bgC;N.addColorStop(0,v(dt,H?.06:.16)),N.addColorStop(1,v(dt,0)),X.fillStyle=N,X.fillRect(0,0,1024,1024)}const ut=new Rn($);return ut.colorSpace=Be,ut}function L(){const $=new Float32Array(960),X=new Float32Array(320*3);for(let V=0;V<320;V++){const j=60+Math.random()*120,ut=Math.random()*_e,gt=(Math.random()-.5)*1.2;$[V*3]=Math.cos(ut)*j*Math.cos(gt),$[V*3+1]=Math.sin(gt)*j,$[V*3+2]=Math.sin(ut)*j*Math.cos(gt)-60,X[V*3]=(Math.random()-.5)*.012,X[V*3+1]=(Math.random()-.5)*.008,X[V*3+2]=(Math.random()-.5)*.012}const H=new de;H.setAttribute("position",new Ne($,3)),H.userData={vel:X,orig:$.slice()};const K=new es({color:12903679,size:.55,transparent:!0,opacity:0,depthWrite:!1,blending:Ze});return new Rs(H,K)}function P(){k=new $i({map:_(d),transparent:!0,opacity:0,depthWrite:!1,blending:Ze}),F=new bs(k),F.position.z=-180,F.scale.set(420,420,1),a.add(F),I=L(),a.add(I);const B=new Pg().load(t.cutout||"./img/selfhosted/persona-cut.webp");m=new on({map:B,transparent:!0,opacity:0,depthWrite:!1}),E=new fe(new vi(11,11*580/583),m),c.add(E);const $=document.createElement("canvas");$.width=$.height=256;const X=$.getContext("2d"),H=X.createRadialGradient(128,128,0,128,128,128);H.addColorStop(0,"rgba(150,190,255,0.55)"),H.addColorStop(1,"rgba(150,190,255,0)"),X.fillStyle=H,X.fillRect(0,0,256,256),y=new $i({map:new Rn($),color:d.glow,transparent:!0,opacity:0,depthWrite:!1,blending:Ze});const K=new bs(y);K.position.z=-3,K.scale.set(48,48,1),c.add(K),e.forEach((V,j)=>{const ut=x(j),gt=new je;gt.rotation.x=ut.tiltX,gt.rotation.y=ut.tiltY,c.add(gt);const xt=[],At=g;for(let dt=0;dt<=120;dt++){const pt=dt/120*_e;xt.push(new Y(g*Math.cos(pt),0,At*Math.sin(pt)))}const nt=new $r({color:d.orbit,transparent:!0,opacity:0});q.push(nt),gt.add(new sl(new de().setFromPoints(xt),nt));const N=(dt,pt)=>{const St=new $i({map:u(dt,pt?d.letA:d.letB),transparent:!0,opacity:0,depthWrite:!1}),Tt=new bs(St);Tt.scale.setScalar(pt?4.6:3.6),Tt.userData={dim:V,isA:pt,orbit:j,phase:pt?0:Math.PI},gt.add(Tt),st.push(Tt)};N(V.a,!0),N(V.b,!1)}),M=document.createElement("div"),M.className="persona-tip",M.innerHTML="<b></b><span></span><em></em>",i.appendChild(M)}const w=s.domElement;w.addEventListener("pointerdown",B=>{if(!(B.pointerType!=="mouse"||B.button!==0)){h.drag=!0,h.sx=B.clientX,h.sy=B.clientY,h.tilt0=h.tTilt,h.spin0=h.tSpin;try{w.setPointerCapture(B.pointerId)}catch{}}}),w.addEventListener("pointermove",B=>{const $=i.getBoundingClientRect();h.mx=(B.clientX-$.left)/$.width*2-1,h.my=-((B.clientY-$.top)/$.height*2-1),h.tipX=B.clientX-$.left,h.tipY=B.clientY-$.top,h.drag&&(h.tSpin=h.spin0-(B.clientX-h.sx)*.005,h.tTilt=Math.max(-.7,Math.min(.7,h.tilt0+(B.clientY-h.sy)*.004)))}),w.addEventListener("pointerup",B=>{h.drag=!1;try{w.releasePointerCapture(B.pointerId)}catch{}}),w.addEventListener("pointerleave",()=>{h.drag=!1,h.mx=-2,h.my=-2});function C(){const B=document.documentElement.getAttribute("data-theme")||"dark";if(B!==h.theme){h.theme=B,d=p[B]||p.dark;for(const $ of q)$.color.setHex(d.orbit);for(const $ of st){const X=$.userData.isA;$.material.map=u(X?$.userData.dim.a:$.userData.dim.b,X?d.letA:d.letB),$.material.needsUpdate=!0}y&&y.color.setHex(d.glow),k&&(k.map=_(d),k.needsUpdate=!0)}}const T=new jr,O=new Ct;let A=null;function R(){if(!M)return;if(h.drag||h.mx<-1.5){M.classList.remove("show"),A=null;return}T.setFromCamera(O.set(h.mx,h.my),l);const B=T.intersectObjects(st,!1)[0],$=B?B.object:null;if($!==A)if(A=$,$){const X=$.userData.dim,H=X.anti.split("：");M.querySelector("b").textContent=$.userData.isA?X.name:H[0],M.querySelector("span").textContent=$.userData.isA?X.desc:H[1]||"",M.querySelector("em").textContent=$.userData.isA?`对立端 → ${X.anti}`:"你的 INFJ 选择了另一端",M.classList.add("show")}else M.classList.remove("show");$&&(M.style.left=h.tipX+"px",M.style.top=h.tipY+"px")}P();const z=B=>1-Math.pow(1-B,3);return{resize(B,$){s.setSize(B,$,!1),l.aspect=B/$,l.updateProjectionMatrix()},frame(B,$,X,H){C(),h.started||(h.started=H);const K=H-h.started,V=me?1:z(Math.min(1,K/2e3)),j=h.theme==="light"?.38:.9;k&&(k.opacity=j*V),I&&(I.material.opacity=.55*V),m.opacity=V,E.scale.setScalar(.7+.3*V);for(const ut of q)ut.opacity=.55*V;if(st.forEach((ut,gt)=>{const xt=me?1:z(Math.max(0,Math.min(1,(K-500-gt*110)/600)));ut.material.opacity=(ut.userData.isA?1:.5)*xt}),y.opacity=.75*V,F&&(F.rotation.z=H*2e-4),I){const ut=I.geometry.attributes.position.array,gt=I.geometry.userData.vel,xt=I.geometry.userData.orig;for(let At=0;At<320;At++){const nt=At*3;ut[nt]+=gt[nt],ut[nt+1]+=gt[nt+1],ut[nt+2]+=gt[nt+2];const N=ut[nt]-xt[nt],dt=ut[nt+1]-xt[nt+1],pt=ut[nt+2]-xt[nt+2];N*N+dt*dt+pt*pt>900&&(ut[nt]=xt[nt],ut[nt+1]=xt[nt+1],ut[nt+2]=xt[nt+2])}I.geometry.attributes.position.needsUpdate=!0}E.position.y=me?0:Math.sin(H*.0011)*.7,me||(E.rotation.y=h.mx>-1.5?h.mx*.16:0,E.rotation.x=h.mx>-1.5?-h.my*.08:0),st.forEach(ut=>{const gt=x(ut.userData.orbit),xt=(me?0:H*.001*gt.speed)+ut.userData.phase;ut.position.set(g*Math.cos(xt),0,g*Math.sin(xt))}),h.spin=Ee(h.spin,h.tSpin,.07),h.tilt=Ee(h.tilt,h.tTilt,.07),c.rotation.y=h.spin,c.rotation.x=h.tilt,R(),s.render(a,l)}}}function lv(){let i=[],t=0;return{frame(e,n,s,r){e.clearRect(0,0,n,s);const o=rs(),a=n/2,l=s*.62;r-t>760&&(t=r,i.push({r:0,a:.5}));for(const c of i)c.r+=2.4,c.a-=.006;i=i.filter(c=>c.a>0);for(const c of i)e.beginPath(),e.arc(a,l,c.r,0,_e),e.fillStyle=`rgba(${o.b},${Math.max(0,c.a)*.12})`,e.fill()}}}function cv(i){const t=xe.game||{},e=t.feeds&&t.feeds.length?t.feeds:[],n=t.briefs&&t.briefs.length?t.briefs:[],s=t.stats&&t.stats.length?t.stats:[],r=i.querySelector("#cr-monitor"),o=i.querySelector("#cr-brief"),a=i.querySelector("#cr-stats");if(!r||e.length===0)return{frame(){}};r.textContent="";const l=e.map((O,A)=>{const R=document.createElement("div");R.className="cr-feed",R.dataset.cam=O.cam||"CAM-0"+(A+1);const z=document.createElement("img");return z.src=O.src,z.alt="铁锈战争实机画面 · "+(O.cam||"镜头 "+(A+1)),z.loading=A===0?"eager":"lazy",z.decoding="async",O.w&&O.h&&(z.width=O.w,z.height=O.h),R.appendChild(z),r.appendChild(R),R});["cr-lines","cr-sweep","cr-vignette"].forEach(O=>{const A=document.createElement("div");A.className=O,r.appendChild(A)});const h=document.createElement("div");h.className="cr-hud",h.innerHTML='<i class="cr-corner tl"></i><i class="cr-corner tr"></i><i class="cr-corner bl"></i><i class="cr-corner br"></i><div class="cr-rec"><i></i><span class="cr-reclabel">REC</span></div><div class="cr-camtag">SIGNAL ▮▮▮▯</div><div class="cr-coords"></div><div class="cr-timecode">00:00:00:00</div><div class="cr-cambar"></div>',r.appendChild(h);const p=h.querySelector(".cr-reclabel"),d=h.querySelector(".cr-coords"),g=h.querySelector(".cr-timecode"),f=h.querySelector(".cr-cambar");t.coords&&(d.textContent=t.coords),a&&(a.textContent="",s.forEach(O=>{const A=document.createElement("li"),R=document.createElement("span");R.textContent=O.k+" ";const z=document.createElement("b");z.textContent=O.v,A.appendChild(R),A.appendChild(z),a.appendChild(A)}));const x=7e3,u=1900;let m=0,E=0,y=0,M=0,k=0,F=0,I=!1,q=0,st=!1,v=0;const _=[];let L=0;const P=e.map((O,A)=>{const R=document.createElement("button");return R.type="button",R.title=O.cam||"镜头 "+(A+1),R.setAttribute("aria-label","切换到"+(O.cam||"镜头 "+(A+1))),R.addEventListener("click",()=>{C(A),E=0}),f.appendChild(R),R});let w=0;function C(O){m=O,l.forEach((A,R)=>A.classList.toggle("is-on",R===O)),P.forEach((A,R)=>A.classList.toggle("is-on",R===O)),p&&(p.textContent="REC · "+String(e[O].cam||"").slice(0,6)),r.classList.remove("cr-glitch"),r.offsetWidth,r.classList.add("cr-glitch"),w=L+340}function T(){const O=r.clientWidth||0,A=r.clientHeight||0;if(O<120||A<120)return;const R=74,z=56,B=document.createElement("div");B.className="cr-lock",B.innerHTML="<i></i><b>TARGET · "+(1e3+Math.floor(Math.random()*9e3))+"</b>",B.style.left=Math.round(Math.random()*Math.max(0,O-R-24)+12)+"px",B.style.top=Math.round(Math.random()*Math.max(0,A-z-24)+12)+"px",r.appendChild(B),_.push({el:B,die:L+u})}return C(0),p&&(p.textContent="REC · "+String(e[0].cam||"").slice(0,6)),r.addEventListener("pointerenter",()=>{st=!0}),r.addEventListener("pointerleave",()=>{st=!1}),me?(o&&n.length&&(o.textContent=n[0]),{frame(){}}):{frame(O,A,R,z){v||(v=z);let B=z-v;if(v=z,B>100&&(B=16),!(B<=0)){L+=B,w&&L>=w&&(r.classList.remove("cr-glitch"),w=0),l.length>1&&(st||(E+=B),E>=x&&(E=0,C((m+1)%l.length))),y+=B,y>=(st?1400:2600+Math.random()*1400)&&(y=0,T());for(let $=_.length-1;$>=0;$--)L>=_[$].die&&(_[$].el.remove(),_.splice($,1));if(q+=B/40,g){const $=Math.floor(q)%25,X=Math.floor(q/25)%60,H=Math.floor(q/(25*60))%60,K=Math.floor(q/(25*3600));g.textContent=[K,H,X,$].map(V=>String(V).padStart(2,"0")).join(":")}if(o&&n.length){M+=B;const $=n[k],X=I?14:52;for(;M>=X;)if(M-=X,I)F--,F<=0&&(F=0,I=!1,k=(k+1)%n.length);else if(F++,F>$.length){F=$.length,I=!0,M=-2600;break}o.textContent=$.slice(0,F)}}}}}function hv(i){const t=xe.like,e=t&&t.planets||[],n=7,s=12e3,r=C=>Math.pow(C,.55)*n;let o,a,l,c,h,p,d=[],g=[],f,x=null;const u={mouseX:0,mouseY:0,tMouseX:0,tMouseY:0,cam:{r:120,theta:0,phi:1.22,tR:120,tTheta:0,tPhi:1.22,dragging:!1,dragStartX:0,dragStartY:0,startTheta:0,startPhi:0},w:i.clientWidth||window.innerWidth,h:i.clientHeight||window.innerHeight,start:performance.now(),hovered:-1};function m(){const C=document.createElement("canvas");C.width=C.height=128;const T=C.getContext("2d"),O=T.createRadialGradient(64,64,0,64,64,64);return O.addColorStop(0,"rgba(255,255,255,0.95)"),O.addColorStop(.4,"rgba(255,255,255,0.35)"),O.addColorStop(1,"rgba(255,255,255,0)"),T.fillStyle=O,T.fillRect(0,0,128,128),new Rn(C)}function E(){const C=document.createElement("canvas");C.width=256,C.height=1;const T=C.getContext("2d"),O=T.createLinearGradient(0,0,256,0);return O.addColorStop(0,"rgba(255,255,255,0)"),O.addColorStop(.18,"rgba(255,255,255,0.9)"),O.addColorStop(.82,"rgba(255,255,255,0.9)"),O.addColorStop(1,"rgba(255,255,255,0)"),T.fillStyle=O,T.fillRect(0,0,256,1),new Rn(C)}function y(C){const O=document.createElement("canvas");O.width=O.height=256;const A=O.getContext("2d");A.fillStyle=C.color,A.fillRect(0,0,256,256);const R=new Yt(C.color),z=K=>"#"+K.getHexString(),B=K=>R.clone().offsetHSL(0,0,K),$=K=>R.clone().offsetHSL(0,0,-K),X=(K,V)=>K+Math.random()*(V-K);function H(K,V,j,ut,gt){const xt=A.createRadialGradient(K,V,0,K,V,j),At=new Yt(ut);xt.addColorStop(0,`rgba(${At.r*255|0},${At.g*255|0},${At.b*255|0},${gt})`),xt.addColorStop(1,`rgba(${At.r*255|0},${At.g*255|0},${At.b*255|0},0)`),A.fillStyle=xt,A.beginPath(),A.arc(K,V,j,0,_e),A.fill()}switch(C.key){case"mercury":for(let V=0;V<45;V++)H(X(0,256),X(0,256),X(5,24),z($(.22)),X(.2,.55));break;case"venus":for(let V=0;V<10;V++)H(X(0,256),X(0,256),X(45,100),z(B(.12)),.28);for(let V=0;V<6;V++)H(X(0,256),X(0,256),X(30,70),z($(.1)),.18);break;case"earth":for(let V=0;V<14;V++)H(X(0,256),X(0,256),X(28,72),"#5c9a5c",.42);for(let V=0;V<10;V++)H(X(0,256),X(0,256),X(18,42),"#9a7c5a",.32);for(let V=0;V<6;V++)A.fillStyle="rgba(255,255,255,0.20)",A.fillRect(0,X(20,236),256,X(4,12));A.fillStyle="rgba(255,255,255,0.7)",A.beginPath(),A.arc(256/2,0,26,0,_e),A.fill(),A.beginPath(),A.arc(256/2,256,32,0,_e),A.fill();break;case"mars":for(let V=0;V<22;V++)H(X(0,256),X(0,256),X(12,48),z($(.25)),.38);for(let V=0;V<12;V++)H(X(0,256),X(0,256),X(10,28),z(B(.18)),.22);break;case"jupiter":case"saturn":const K=C.key==="jupiter"?12:9;for(let V=0;V<K;V++){const j=(V+.5)*256/K,ut=V%2===0;A.fillStyle=`rgba(${ut?120:230},${ut?95:205},${ut?70:160},${ut?.5:.28})`,A.fillRect(0,j-256/K/2-2,256,256/K+4)}C.key==="jupiter"&&(A.fillStyle="rgba(190, 80, 60, 0.65)",A.beginPath(),A.ellipse(256*.35,256*.58,22,12,0,0,_e),A.fill());break;case"uranus":case"neptune":for(let V=0;V<7;V++)A.fillStyle="rgba(255,255,255,0.13)",A.fillRect(0,X(20,236),256,X(6,18));break}return new Rn(O)}function M(C,T,O){return new Y(C*Math.sin(O)*Math.sin(T),C*Math.cos(O),C*Math.sin(O)*Math.cos(T))}function k(){const C=document.createElement("canvas");C.className="solar-canvas",i.appendChild(C);try{o=new Yr({canvas:C,antialias:!0,alpha:!0})}catch{const K=document.createElement("div");return K.className="solar-fallback",K.textContent="当前环境不支持 WebGL，关注宇宙暂不可用",i.appendChild(K),!1}o.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),a=new Bs,l=new Ce(55,u.w/u.h,.1,4e3),l.position.copy(M(u.cam.r,u.cam.theta,u.cam.phi)),l.lookAt(0,0,0),a.add(new Ig(4213350,1.7)),a.add(new Bh(16777215,1712176,.7)),a.add(new kh(16773836,3.2,0,0));const T=m();p=new fe(new Is(3.6,64,64),new on({color:16765562})),a.add(p);for(let H=0;H<3;H++){const K=new bs(new $i({map:T,color:16765562,transparent:!0,opacity:.22-H*.05,blending:Ze,depthWrite:!1}));K.scale.set(14+H*9,14+H*9,1),p.add(K)}d=[];const O=E();e.forEach((H,K)=>{const V=new fe(new Is(H.size,40,40),new En({map:y(H),color:16777215,emissive:new Yt(H.color),emissiveIntensity:.1,roughness:.8,metalness:.05}));V.userData={idx:K,a:H.a,e:H.e,inc:H.inc*Math.PI/180,node:K*47*Math.PI/180,baseAngle:K*1.7},a.add(V),d.push(V);const j=new bs(new $i({map:T,color:new Yt(H.color),transparent:!0,opacity:.22,blending:Ze,depthWrite:!1}));if(j.scale.set(H.size*2.6,H.size*2.6,1),V.add(j),H.key==="saturn"){const nt=new fe(new Zr(H.size*1.35,H.size*2.45,96),new on({color:15258528,alphaMap:O,transparent:!0,opacity:.88,side:ze,depthWrite:!1}));nt.rotation.x=Math.PI/2-.38,V.add(nt)}const ut=[],gt=180,xt=r(H.a);for(let nt=0;nt<=gt;nt++){const N=nt/gt*_e,dt=xt*(1-H.e*H.e)/(1+H.e*Math.cos(N));let pt=dt*Math.cos(N),St=dt*Math.sin(N);const Tt=Math.cos(V.userData.inc),Ft=Math.sin(V.userData.inc),vt=-St*Ft,U=St*Tt,S=Math.cos(V.userData.node),tt=Math.sin(V.userData.node);ut.push(new Y(pt*S+U*tt,vt,-pt*tt+U*S))}const At=new de().setFromPoints(ut);a.add(new q1(At,new $r({color:new Yt(H.color),transparent:!0,opacity:.28})))});const A=900,R=new Float32Array(A*3),z=r(2),B=r(3.4),$=2.4;for(let H=0;H<A;H++){const K=Math.random()*_e,V=z+Math.random()*(B-z),j=(Math.random()-.5)*$;R[H*3]=V*Math.cos(K),R[H*3+1]=j,R[H*3+2]=V*Math.sin(K)}const X=new de;X.setAttribute("position",new Ne(R,3)),f=new Rs(X,new es({color:10135480,size:1.2,sizeAttenuation:!1,transparent:!0,opacity:.55})),a.add(f),g=[];for(let H=0;H<3;H++){const V=new Float32Array(2100),j=400+H*220;for(let xt=0;xt<700;xt++){const At=Math.random()*_e,nt=Math.acos(2*Math.random()-1),N=j*(.7+Math.random()*.3);V[xt*3]=N*Math.sin(nt)*Math.cos(At),V[xt*3+1]=N*Math.sin(nt)*Math.sin(At),V[xt*3+2]=N*Math.cos(nt)}const ut=new de;ut.setAttribute("position",new Ne(V,3));const gt=new Rs(ut,new es({color:H===0?15266047:12571903,size:1.3+H*.5,sizeAttenuation:!1,transparent:!0,opacity:.45+H*.16}));a.add(gt),g.push(gt)}return x=document.createElement("div"),x.className="solar-label",x.setAttribute("role","status"),x.setAttribute("aria-live","polite"),i.appendChild(x),c=new jr,h=new Ct(-2,-2),C.addEventListener("pointerdown",F),C.addEventListener("pointermove",I),C.addEventListener("pointerup",q),C.addEventListener("pointerleave",st),window.addEventListener("scroll",v,{passive:!0}),v(),!0}function F(C){if(!(C.pointerType!=="mouse"||C.button!==0)){C.preventDefault(),u.cam.dragging=!0,u.cam.dragStartX=C.clientX,u.cam.dragStartY=C.clientY,u.cam.startTheta=u.cam.tTheta,u.cam.startPhi=u.cam.tPhi;try{C.target.setPointerCapture(C.pointerId)}catch{}}}function I(C){const T=i.getBoundingClientRect();if(u.tMouseX=(C.clientX-T.left)/T.width*2-1,u.tMouseY=(C.clientY-T.top)/T.height*2-1,h.x=u.tMouseX,h.y=-u.tMouseY,u.cam.dragging){const O=C.clientX-u.cam.dragStartX,A=C.clientY-u.cam.dragStartY;u.cam.tTheta=u.cam.startTheta-O*.004,u.cam.tPhi=u.cam.startPhi-A*.004}}function q(C){if(u.cam.dragging){u.cam.dragging=!1;try{C.target.releasePointerCapture(C.pointerId)}catch{}}}function st(){u.tMouseX=0,u.tMouseY=0,h.x=-2,h.y=-2,u.cam.dragging=!1}function v(){const C=i.getBoundingClientRect(),T=C.top+C.height/2,O=window.innerHeight/2,A=Math.max(0,Math.min(1,1-Math.abs(T-O)/(window.innerHeight*.9)));u.cam.tR=150-A*55}function _(){if(!c||!x)return;c.setFromCamera(h,l);const C=c.intersectObjects(d,!1),T=C.length?C[0].object.userData.idx:-1;if(T!==u.hovered)if(u.hovered=T,T>=0){const O=e[T];x.innerHTML=`<b style="color:${O.color}">${O.interest||O.name}</b><span>${O.desc||""}</span>`,x.classList.add("show")}else x.classList.remove("show");if(T>=0){const O=d[T].position.clone().project(l);x.style.left=(O.x*.5+.5)*u.w+"px",x.style.top=(-O.y*.5+.5)*u.h+"px"}}function L(C,T,O,A){if(!o)return;const R=(A-u.start)/s;u.mouseX=Ee(u.mouseX,u.tMouseX,.06),u.mouseY=Ee(u.mouseY,u.tMouseY,.06),u.cam.r=Ee(u.cam.r,u.cam.tR,.06),u.cam.theta=Ee(u.cam.theta,u.cam.tTheta,.08),u.cam.phi=Ee(u.cam.phi,u.cam.tPhi,.08),!u.cam.dragging&&!me&&(u.cam.tTheta+=2e-4),l.position.copy(M(u.cam.r,u.cam.theta,u.cam.phi)),l.lookAt(u.mouseX*3,u.mouseY*3,0);for(const z of d){const B=z.userData,$=e[B.idx].T,X=(me?0:R)/$,H=B.baseAngle+X*_e;let K=H;for(let St=0;St<5;St++)K=K-(K-B.e*Math.sin(K)-H)/(1-B.e*Math.cos(K));const V=2*Math.atan2(Math.sqrt(1+B.e)*Math.sin(K/2),Math.sqrt(1-B.e)*Math.cos(K/2)),j=r(B.a)*(1-B.e*Math.cos(K)),ut=j*Math.cos(V),gt=j*Math.sin(V),xt=Math.cos(B.inc),At=Math.sin(B.inc),nt=-gt*At,N=gt*xt,dt=Math.cos(B.node),pt=Math.sin(B.node);z.position.set(ut*dt+N*pt,nt,-ut*pt+N*dt),z.rotation.y+=.0012}p.rotation.y+=8e-4,f&&(f.rotation.y+=15e-5);for(let z=0;z<g.length;z++)g[z].rotation.y+=1e-4*(z+1),g[z].rotation.x=u.mouseY*.05*(z+1);_(),o.render(a,l)}function P(C,T){u.w=C||i.clientWidth||window.innerWidth,u.h=T||i.clientHeight||window.innerHeight,o&&(o.setSize(u.w,u.h,!1),l.aspect=u.w/u.h,l.updateProjectionMatrix())}return k()?(P(u.w,u.h),{frame:L,resize:P}):{frame(){},resize(){}}}function uv(i){const t=xe.thanks||{},e=xe.rewards&&xe.rewards.length?xe.rewards:[],n=i.querySelector("#th-charge"),s=i.querySelector("#th-wall"),r=i.querySelector("#th-tip"),o=i.querySelector("#th-overlay"),a=i.querySelector("#th-sheet"),l=i.querySelector("#th-qr"),c=i.querySelector("#th-seg"),h=i.querySelector("#th-seg-thumb"),p=i.querySelector("#th-qr-scan"),d=i.querySelector("#th-copy"),g=i.querySelector("#th-close");if(s&&(s.textContent="",e.forEach(R=>{const z=document.createElement("li"),B=document.createElement("b");B.textContent=R.name;const $=document.createElement("span");$.textContent=` 投喂了 ${R.amount} 元 · ${R.date}`,z.appendChild(B),z.appendChild($),s.appendChild(z)})),!n||!o||!l)return{frame(){},resize(){}};const f=[],x=[],u=[];let m=-1,E={x:-9999,y:-9999},y={x:-9999,y:-9999},M=0,k=!1,F=0;const I={wx:null,ali:null};["wx","ali"].forEach(R=>{const z=t.qr&&t.qr[R]&&t.qr[R].matrix;z&&z.bits&&(I[R]=z)});let q="wx";function st(R,z){const B="http://www.w3.org/2000/svg",$=document.createElementNS(B,"svg");$.setAttribute("viewBox",`0 0 ${R} ${R}`),$.setAttribute("shape-rendering","geometricPrecision"),$.setAttribute("aria-hidden","true");const X=document.createElementNS(B,"defs"),H=document.createElementNS(B,"radialGradient");H.setAttribute("id","thQrGrad"),H.setAttribute("cx","50%"),H.setAttribute("cy","50%"),H.setAttribute("r","72%"),[["0%","#2b6cff"],["60%","#6a5bff"],["100%","#c06bff"]].forEach(([N,dt])=>{const pt=document.createElementNS(B,"stop");pt.setAttribute("offset",N),pt.setAttribute("stop-color",dt),H.appendChild(pt)}),X.appendChild(H),$.appendChild(X);const K=(R-1)/2,V=Math.hypot(K,K),j=document.createDocumentFragment();for(let N=0;N<R;N++)for(let dt=0;dt<R;dt++){if(z.charAt(N*R+dt)!=="1")continue;const pt=document.createElementNS(B,"rect");pt.setAttribute("x",dt),pt.setAttribute("y",N),pt.setAttribute("width",1),pt.setAttribute("height",1),pt.setAttribute("rx",.32),pt.setAttribute("fill","url(#thQrGrad)"),pt.setAttribute("class","th-qr-mod"),pt.style.setProperty("--d",Math.round(Math.hypot(dt-K,N-K)/V*460)+"ms"),pt.style.setProperty("--d2",Math.round(dt/R*260+Math.random()*60)+"ms"),j.appendChild(pt)}$.appendChild(j);const ut=R*.2,gt=document.createElementNS(B,"circle");gt.setAttribute("cx",R/2),gt.setAttribute("cy",R/2),gt.setAttribute("r",ut/2+.7),gt.setAttribute("fill","#fff"),$.appendChild(gt);const xt=document.createElementNS(B,"clipPath");xt.setAttribute("id","thQrClip");const At=document.createElementNS(B,"circle");At.setAttribute("cx",R/2),At.setAttribute("cy",R/2),At.setAttribute("r",ut/2),xt.appendChild(At),$.appendChild(xt);const nt=document.createElementNS(B,"image");return nt.setAttribute("x",(R-ut)/2),nt.setAttribute("y",(R-ut)/2),nt.setAttribute("width",ut),nt.setAttribute("height",ut),nt.setAttribute("href","./img/selfhosted/pZRXSc6.jpg"),nt.setAttribute("clip-path","url(#thQrClip)"),nt.setAttribute("preserveAspectRatio","xMidYMid slice"),$.appendChild(nt),$}function v(R){if(!l)return;const z=t.qr&&t.qr[R]||{},B=l.querySelector("svg, img");B&&B.remove();const $=I[R];if($&&!me)l.appendChild(st($.n,$.bits));else if(z.png){const X=document.createElement("img");X.className="th-qr-img",X.src=z.png,X.alt=(z.label||"收款")+"收款码",X.width=1034,X.height=1034,X.loading="lazy",X.decoding="async",l.appendChild(X)}}function _(R,z){q=R;const B=t.qr&&t.qr[R]||{};c&&Array.from(c.querySelectorAll("button")).forEach(X=>X.classList.toggle("on",X.dataset.pay===R)),h&&(h.className="th-seg-thumb "+R);const $=B.color||"#07c160";if(p&&p.style.setProperty("--scan",$),l&&l.querySelectorAll(".qbk").forEach(X=>X.style.setProperty("--scan",$)),d&&(d.style.display=B.copyable?"":"none",d.classList.remove("done"),d.textContent="复制链接"),!z||me){v(R),l&&l.classList.add("is-in");return}l&&(l.classList.remove("is-in"),l.classList.add("is-out"),setTimeout(()=>{l.classList.remove("is-out"),v(R),requestAnimationFrame(()=>l.classList.add("is-in"))},380))}["wx","ali"].forEach(R=>{const z=t.qr&&t.qr[R]&&t.qr[R].matrix;if(z){if(z.bits){I[R]=z,R===q&&!k&&v(R);return}typeof z=="string"&&fetch(z).then(B=>B.ok?B.json():null).then(B=>{!B||!B.bits||(I[R]=B,R===q&&!k&&v(R))}).catch(()=>{})}}),_("wx",!1);let L=null;function P(){k||(k=!0,L=document.activeElement,o.classList.add("open"),i.classList.add("sheet-open"),l&&l.classList.remove("is-in"),setTimeout(()=>{v(q),requestAnimationFrame(()=>l&&l.classList.add("is-in"))},460),g&&g.focus())}function w(){k&&(k=!1,l&&l.classList.add("is-out"),o.classList.remove("open"),i.classList.remove("sheet-open"),a&&(a.style.transform=""),L&&L.focus&&L.focus(),setTimeout(()=>{l&&l.classList.remove("is-out","is-in")},400))}n.addEventListener("click",()=>{me||T(n),n.classList.add("pulsing"),setTimeout(()=>n.classList.remove("pulsing"),440),P()}),g&&g.addEventListener("click",w),o.addEventListener("click",R=>{R.target===o&&w()});const C=R=>{R.key==="Escape"&&w()};document.addEventListener("keydown",C),c&&c.addEventListener("click",R=>{const z=R.target.closest("button[data-pay]");z&&z.dataset.pay!==q&&_(z.dataset.pay,!0)}),d&&d.addEventListener("click",()=>{const R=I[q];if(!R||!navigator.clipboard){d.textContent="复制失败";return}navigator.clipboard.writeText(R.payload).then(()=>{d.classList.add("done"),d.textContent="已复制"}).catch(()=>{d.textContent="复制失败"})}),a&&!me&&(a.addEventListener("pointermove",R=>{const z=a.getBoundingClientRect(),B=(R.clientX-(z.left+z.width/2))/z.width,$=(R.clientY-(z.top+z.height/2))/z.height;a.style.transform=`perspective(900px) rotateY(${B*5}deg) rotateX(${-$*5}deg)`}),a.addEventListener("pointerleave",()=>{a.style.transform=""}));function T(R){const z=R.getBoundingClientRect(),B=document.createElement("span");B.className="th-ripple",B.style.left=z.left+z.width*.5-55+"px",B.style.top=z.top+z.height*.5-55+"px",document.body.appendChild(B),setTimeout(()=>B.remove(),880)}addEventListener("pointermove",R=>{y.x=R.clientX,y.y=R.clientY},{passive:!0}),addEventListener("pointerleave",()=>{y.x=y.y=-9999},{passive:!0});function O(R,z){f.length=0,e.forEach((B,$)=>{const X=R*(.66+.07*Math.sin($*2.1)),H=z*(.3+.3*($/Math.max(1,e.length)))+Math.cos($*1.7)*z*.05;f.push({x:X,y:H,vx:0,vy:0,ax:X,ay:H,tw:le(0,_e)})})}function A(R,z,B,$){f.length!==e.length&&O(z,B),R.clearRect(0,0,z,B);const X=rs(),H=i.getBoundingClientRect();E.x=y.x-H.left,E.y=y.y-H.top,m=-1;for(let V=0;V<f.length;V++){const j=f[V];if(!k){const ut=E.x-j.x,gt=E.y-j.y,xt=Math.hypot(ut,gt);if(xt<230&&xt>.5){const At=(1-xt/230)*.55;j.vx+=-gt/xt*At*.34+ut/xt*At*.1,j.vy+=ut/xt*At*.34+gt/xt*At*.1}}j.vx+=(j.ax-j.x)*.006,j.vy+=(j.ay-j.y)*.006,j.vx*=.93,j.vy*=.93,j.x+=j.vx,j.y+=j.vy,Math.hypot(E.x-j.x,E.y-j.y)<28&&(m=V)}if(m>=0&&r){const V=e[m];if(r.dataset.i!==String(m)){r.dataset.i=String(m),r.textContent="";const j=document.createElement("b");j.textContent=V.name,r.appendChild(j),r.appendChild(document.createTextNode(` 投喂了 ${V.amount} 元 · ${V.date}`))}r.style.left=Math.min(E.x+16,z-230)+"px",r.style.top=E.y-42+"px",r.classList.add("show"),!me&&x.length===0&&F<=0&&Math.random()<.06&&(x.push({t:0}),F=1200)}else r&&(r.classList.remove("show"),r.dataset.i="");F=Math.max(0,F-16);for(let V=0;V<f.length-1;V++){const j=f[V],ut=f[V+1],gt=Math.max(0,1-Math.hypot(E.x-(j.x+ut.x)/2,E.y-(j.y+ut.y)/2)/300);R.beginPath(),R.moveTo(j.x,j.y),R.lineTo(ut.x,ut.y),R.strokeStyle=`rgba(${X.a},${(.12+gt*.4)*(k?.35:1)})`,R.lineWidth=1,R.stroke()}let K={x:z*.5,y:B*.86};if(n){const V=Gr(i,n);K={x:V.x,y:V.y}}for(let V=x.length-1;V>=0;V--){const j=x[V];if(j.t+=.012,j.t>=1){x.splice(V,1),n.classList.add("pulsing"),setTimeout(()=>n.classList.remove("pulsing"),440);continue}const ut=f.concat([K]),gt=ut.length-1;if(gt<1)continue;const xt=j.t*gt,At=Math.min(gt-1,Math.floor(xt)),nt=xt-At,N=ut[At],dt=ut[At+1];!N||!dt||(R.beginPath(),R.arc(N.x+(dt.x-N.x)*nt,N.y+(dt.y-N.y)*nt,3.2,0,_e),R.fillStyle=`rgba(255,209,102,${k?.3:.9})`,R.shadowBlur=14,R.shadowColor="rgba(255,209,102,0.9)",R.fill(),R.shadowBlur=0)}for(let V=0;V<f.length;V++){const j=f[V],ut=.72+.28*Math.sin($/720+j.tw),gt=m===V?7:4.6,xt=R.createRadialGradient(j.x,j.y,0,j.x,j.y,gt*5);xt.addColorStop(0,`rgba(255,209,102,${.5*ut*(k?.35:1)})`),xt.addColorStop(1,"rgba(255,209,102,0)"),R.fillStyle=xt,R.beginPath(),R.arc(j.x,j.y,gt*5,0,_e),R.fill(),R.beginPath(),R.arc(j.x,j.y,gt,0,_e),R.fillStyle=`rgba(255,228,168,${(m===V?1:.9)*(k?.4:1)})`,R.fill()}!me&&!k&&$-M>210&&(M=$,u.push({x:le(z*.2,z*.85),y:B*.88,vy:le(.35,1),vx:le(-.25,.25),a:le(.5,1),s:le(1.4,3.2)}));for(const V of u)V.y-=V.vy,V.x+=V.vx,V.a-=.0035;for(let V=u.length-1;V>=0;V--)u[V].a<=0&&u.splice(V,1);for(const V of u)R.beginPath(),R.arc(V.x,V.y,V.s,0,_e),R.fillStyle=`rgba(${X.a},${V.a*.8*(k?.3:1)})`,R.fill()}return{frame:A,resize:O}}function fv(i){const t=i.querySelector(".home-cta");let e=[];function n(s,r){e=Array.from({length:90},()=>({x:le(0,s),y:le(0,r),a:le(.3,.9)}))}return{resize:n,frame(s,r,o,a){s.clearRect(0,0,r,o);const l=rs(),c=t?Gr(i,t).x:r/2,h=t?Gr(i,t).y:o/2;for(const p of e)p.x=Ee(p.x,c,.012),p.y=Ee(p.y,h,.012),s.beginPath(),s.arc(p.x,p.y,1.6,0,_e),s.fillStyle=`rgba(${l.a},${p.a})`,s.fill()}}}function dv(i){const t=i.querySelector("#comic-grid");if(!t)return{frame(){},resize(){}};const e=Array.from(t.querySelectorAll(".comic-card"));if(e.length<2)return{frame(){},resize(){}};const n=e.slice(0,36);e.slice(36).forEach(w=>{w.style.display="none"}),t.classList.add("is-album");const s=n.length,o=(w=>{let C=w>>>0;return()=>(C=C*1664525+1013904223>>>0,C/4294967296)})(1234567),a=[];for(let w=0;w<s;w++){let C=0,T,O,A,R;for(;C<160;){T=o()*2-1,O=o()*2-1,A=o()*2-1,R=(A+1)/2;const z=(1-w/(s-1||1))*.22;let B;w<s*.18?B=.72+o()*.28:w<s*.6?B=.3+o()*.52:B=o()*.36,R=Math.max(0,Math.min(1,B+z)),A=R*2-1;let $=!0;for(const X of a){const H=X.nx-T,K=X.ny-O,V=(X.nz-A)*2;if(Math.hypot(H,K,V)<.18){$=!1;break}}if($)break;C++}a.push({nx:T,ny:O,nz:A,d:R,rx:(o()*2-1)*18,ry:(o()*2-1)*22,rz:(o()*2-1)*10,ph:o()*Math.PI*2,amp:(6+o()*9)*(me?0:1)})}const l=n.map(()=>({x:0,y:0,z:0,s:.9,rx:0,ry:0,rz:0,op:0})),c=n.map(()=>({x:0,y:0,z:0,s:0,rx:0,ry:0,rz:0}));let h=[];function p(){const w=t.clientWidth,C=t.clientHeight,T=w*.78,O=C*.48,A=Math.min(w,C)*.95;h=a.map(R=>{const z=.38+.72*R.d;return{sx:R.nx*T/2,sy:R.ny*O/2,sz:R.nz*A/2,sBase:z,rx:R.rx,ry:R.ry,rz:R.rz,ph:R.ph,amp:R.amp,opBase:.4+.6*R.d,zIdx:Math.round(R.d*1e3)}}),n.forEach((R,z)=>{R.style.filter=`brightness(${.62+.38*a[z].d})`})}p();let d="scatter",g=-1,f=0;const x=4.2,u=.1,m=.78,E={rx:0,ry:0,tRx:0,tRy:0},y={x:0,y:0,tx:0,ty:0},M={active:!1,lx:0,ly:0,yaw:0,pitch:0,moved:0};let k=!1;function F(w){if(y.tx=(w.clientX/window.innerWidth-.5)*18,y.ty=(w.clientY/window.innerHeight-.5)*-10,!M.active)return;const C=w.clientX-M.lx,T=w.clientY-M.ly;M.yaw+=C*.18,M.pitch=Math.max(-22,Math.min(22,M.pitch+T*.12)),M.lx=w.clientX,M.ly=w.clientY,M.moved+=Math.abs(C)+Math.abs(T)}window.addEventListener("mousemove",F,{passive:!0}),t.addEventListener("mousedown",w=>{d!=="focus"&&(M.active=!0,M.lx=w.clientX,M.ly=w.clientY,M.moved=0,t.classList.add("is-dragging"))}),window.addEventListener("mouseup",()=>{M.active&&(M.active=!1,t.classList.remove("is-dragging"),M.moved>6&&(k=!0))});function I(w){d=w,t.classList.toggle("is-focus-mode",w==="focus"),n.forEach((C,T)=>{C.classList.toggle("is-stacked",w==="stack"),C.classList.toggle("is-scattered",w!=="stack"&&T!==g),C.classList.toggle("is-focused",T===g),C.style.zIndex=T===g?"100000":"auto"})}I("scatter");function q(){g=-1,I("scatter")}function st(){g=-1,I("scatter")}function v(w){const C=g!==-1&&g!==w;g=w,f=performance.now()+(C?180:0),I("focus")}function _(w,C){const T=h[w],O=a[w];if(d==="stack"){const B=(w*37%7-3)*2.5,$=(w*53%11-5)*1.8;return{x:B,y:$,z:0,s:.88,rx:(w*13%5-2)*1.2,ry:(w*17%5-2)*1.5,rz:(w%7-3)*1.4,op:1}}if(d==="scatter"){const B=T.sx+Math.sin(C*55e-5+O.ph)*T.amp,$=T.sy+Math.cos(C*45e-5+O.ph*1.3)*T.amp,X=T.sBase*(1+Math.sin(C*7e-4+O.ph)*.04);return{x:B,y:$,z:T.sz,s:X,rx:T.rx,ry:T.ry,rz:T.rz,op:T.opBase}}if(w===g){if(C<f){const B=T.sx+Math.sin(C*55e-5+O.ph)*T.amp,$=T.sy+Math.cos(C*45e-5+O.ph*1.3)*T.amp,X=T.sBase*(1+Math.sin(C*7e-4+O.ph)*.04);return{x:B,y:$,z:T.sz,s:X,rx:T.rx,ry:T.ry,rz:T.rz,op:T.opBase}}return{x:0,y:0,z:0,s:x,rx:0,ry:0,rz:0,op:1}}const A=T.sx+Math.sin(C*55e-5+O.ph)*T.amp,R=T.sy+Math.cos(C*45e-5+O.ph*1.3)*T.amp,z=T.sBase*.96*(1+Math.sin(C*7e-4+O.ph)*.04);return{x:A,y:R,z:T.sz,s:z,rx:T.rx,ry:T.ry,rz:T.rz,op:T.opBase*.35}}function L(w,C,T,O){y.x+=(y.tx-y.x)*.06,y.y+=(y.ty-y.y)*.06;const A=i.getBoundingClientRect(),R=window.innerHeight||1,z=(A.top+A.height/2-R/2)/R,B=z*72,$=z*70,X=z*-24;d!=="focus"?(E.tRx=M.pitch,E.tRy=Math.sin(O*45e-5)*42+B+y.x+M.yaw):(E.tRx=0,E.tRy=0),E.rx+=(E.tRx-E.rx)*.045,E.ry+=(E.tRy-E.ry)*.045,t.style.transform=`translate(${$.toFixed(1)}px, ${X.toFixed(1)}px) rotateX(${E.rx.toFixed(2)}deg) rotateY(${E.ry.toFixed(2)}deg)`;for(let K=0;K<s;K++){const V=l[K],j=c[K],ut=_(K,O);j.x=(j.x+(ut.x-V.x)*u)*m,V.x+=j.x,j.y=(j.y+(ut.y-V.y)*u)*m,V.y+=j.y,j.z=(j.z+(ut.z-V.z)*u)*m,V.z+=j.z,j.s=(j.s+(ut.s-V.s)*u)*m,V.s+=j.s,j.rx=(j.rx+(ut.rx-V.rx)*u)*m,V.rx+=j.rx,j.ry=(j.ry+(ut.ry-V.ry)*u)*m,V.ry+=j.ry,j.rz=(j.rz+(ut.rz-V.rz)*u)*m,V.rz+=j.rz,V.op+=(ut.op-V.op)*.18;const gt=n[K],xt=V.rx,At=V.ry;gt.style.transform=`translate(-50%, -50%) translate3d(${V.x.toFixed(2)}px, ${V.y.toFixed(2)}px, ${V.z.toFixed(2)}px) scale(${V.s.toFixed(3)}) rotateX(${xt.toFixed(2)}deg) rotateY(${At.toFixed(2)}deg) rotateZ(${V.rz.toFixed(2)}deg)`,gt.style.opacity=V.op.toFixed(3)}const H=window.__endyComicDebug||(window.__endyComicDebug={});H.state=d,H.focusedIndex=g,H.count=s,H.S=h,H.cur=l,H.points=a,H.drag=M,H.box={W:t.clientWidth,H:t.clientHeight},H.timestamp=performance.now()}t.addEventListener("click",w=>{if(k){k=!1;return}const C=w.target.closest(".comic-card");if(d==="stack"){w.preventDefault(),q();return}if(!C){w.preventDefault(),d==="focus"&&st();return}const T=n.indexOf(C);if(!(T<0)){if(d==="scatter"){w.preventDefault(),v(T);return}if(d==="focus"){if(T===g)return;w.preventDefault(),v(T)}}}),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label","追番画廊：点单卡看大图，再点一次前往 B 站，点空白归位"),t.addEventListener("keydown",w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),d==="stack"?q():d==="scatter"?v(0):st())});function P(){p()}for(let w=0;w<s;w++){const C=_(w,performance.now());l[w]={x:C.x,y:C.y,z:C.z,s:C.s,rx:C.rx,ry:C.ry,rz:C.rz,op:C.op}}return{frame:L,resize:P}}function pv(i){const t=xe.stats&&xe.stats.layers||[],e=document.createElement("div");e.className="data-galaxy",i.appendChild(e);const n=new Og;n.setSize(i.clientWidth||window.innerWidth,i.clientHeight||window.innerHeight),e.appendChild(n.domElement);const s=new Bs,r=new Ce(50,1,1,6e3);r.position.set(0,0,1500);const o=new je;s.add(o);const a=[{z:360,speed:1,gap:360,vPad:240},{z:150,speed:.72,gap:320,vPad:0},{z:-60,speed:.46,gap:320,vPad:0},{z:-280,speed:.26,gap:300,vPad:0},{z:-520,speed:.12,gap:300,vPad:-240}],l=[];t.forEach((x,u)=>{const m=a[u]||a[a.length-1],E=x.items||[],y=E.length;E.forEach((M,k)=>{const F=document.createElement("div");F.className="dg-stat",F.innerHTML=`<div class="dg-num">${M.num}</div><div class="dg-label">${M.label||""}</div>`+(M.meta?`<div class="dg-meta">${M.meta}</div>`:"");const I=new Ug(F),q=(k-(y-1)/2)*m.gap;I.position.set(q,m.vPad,m.z),I.userData={baseY:m.vPad,speed:m.speed},o.add(I),l.push(I)})});let c=0;function h(){const x=i.getBoundingClientRect(),u=x.top+x.height/2,m=window.innerHeight/2;c=Math.max(0,Math.min(1,1-Math.abs(u-m)/(window.innerHeight*.9)))}let p=0,d=0,g=0,f=0;return i.addEventListener("pointermove",x=>{const u=i.getBoundingClientRect(),m=(x.clientX-u.left)/u.width*2-1,E=(x.clientY-u.top)/u.height*2-1;d=m*.32,p=-E*.2}),i.addEventListener("pointerleave",()=>{p=0,d=0}),{resize(x,u){n.setSize(x,u),r.aspect=x/u,r.updateProjectionMatrix()},frame(x,u,m,E){h();const y=!me;r.position.z=y?1500-c*500:1250,l.forEach(M=>{const k=M.userData.speed;M.position.y=y?M.userData.baseY+(c-.5)*700*k:M.userData.baseY,M.element.style.opacity=(.4+.6*(1-Math.abs(c-.5)*1.3*(1-k*.5))).toFixed(3)}),g=Ee(g,y?p:0,.06),f=Ee(f,y?d:0,.06),o.rotation.x=g,o.rotation.y=f,n.render(s,r)}}}const mv={1:nv,2:iv,3:sv,4:dv,5:rv,8:pv,9:ov,10:av,11:lv,12:tv,13:cv,14:hv,15:uv,20:fv};function Hc(){const i=document.querySelectorAll(".screen"),t=[];i.forEach(s=>{const r=s.getAttribute("data-screen"),o=mv[r];if(!o)return;const a=o(s),l=r==="4"||r==="14"||r==="8"||r==="9"||r==="10"||r==="12"||r==="13",c={sec:s,canvas:null,inst:a,ctx:null,w:0,h:0,raf:0,running:!1,isDom:l};if(!l){const p=document.createElement("canvas");p.className="sig-canvas",s.appendChild(p),c.canvas=p}const h=()=>{if(c.canvas){const p=ev(c.canvas,s);c.ctx=p.ctx,c.w=p.w,c.h=p.h}else c.w=s.clientWidth,c.h=s.clientHeight;a.resize&&a.resize(c.w,c.h)};c.refit=h,h(),s._sig=c,t.push(c)});function e(s){s.running&&(s.inst.frame(s.ctx,s.w,s.h,performance.now()),s.raf=requestAnimationFrame(()=>e(s)))}window.addEventListener("resize",()=>t.forEach(s=>s.refit()));const n=new IntersectionObserver(s=>{s.forEach(r=>{const o=r.target._sig;if(o)if(r.isIntersecting&&r.intersectionRatio>.25){if(!o.running){if(me&&!o.isDom){o.inst.frame(o.ctx,o.w,o.h,performance.now());return}o.running=!0,e(o)}}else o.running&&(o.running=!1,cancelAnimationFrame(o.raf))})},{threshold:[0,.25,.5]});t.forEach(s=>n.observe(s.sec))}const Gh="endy-home-theme",Vh=document.documentElement;let bn=localStorage.getItem(Gh)||"dark";Vh.setAttribute("data-theme",bn);Yc(bn);Kc(bn);const qo=document.getElementById("theme-toggle");qo==null||qo.addEventListener("click",()=>{bn=bn==="dark"?"light":"dark",Vh.setAttribute("data-theme",bn),localStorage.setItem(Gh,bn),Yc(bn),Kc(bn)});const dl=new iu({lerp:.09,smoothWheel:!0,syncTouch:!1,overscroll:!1});function Wh(i){dl.raf(i),requestAnimationFrame(Wh)}requestAnimationFrame(Wh);const Xh=Mu(),gv=Su(),vv=Eu();bu();wu(xe);Xh.play();const pl=Array.from(document.querySelectorAll(".screen")),_v=document.getElementById("dots"),xv=pl.map((i,t)=>{const e=document.createElement("button");return e.className="dot",e.setAttribute("aria-label",`第 ${t+1} 屏`),e.addEventListener("click",()=>{Xh.play(()=>dl.scrollTo(i,{offset:0,immediate:!0}))}),_v.appendChild(e),e}),Gc=document.querySelector("#progress i");dl.on("scroll",({scroll:i,limit:t})=>{const e=t>0?i/t:0;Gc&&(Gc.style.transform=`scaleX(${e})`),au(e),mu(e),vv.update()});const yv=new IntersectionObserver(i=>{i.forEach(t=>{const e=pl.indexOf(t.target);t.isIntersecting&&t.intersectionRatio>.4?(t.target.classList.add("is-in"),xv.forEach((n,s)=>n.classList.toggle("active",s===e)),t.target.querySelector("[data-ascii]")&&gv.runIn(t.target)):t.isIntersecting||t.target.classList.remove("is-in")})},{threshold:[.4]});pl.forEach(i=>yv.observe(i));const Vc=document.getElementById("comic-grid");Vc&&xe.comic&&xe.comic.forEach(i=>{const t=document.createElement("a");t.className="comic-card",t.href=i.href,t.target="_blank",t.rel="noopener";const e=document.createElement("img");e.src=i.cover,e.alt=i.name,e.loading="lazy";const n=document.createElement("span");n.className="comic-name",n.textContent=i.name;const s=document.createElement("span");s.className="comic-badge",s.textContent=(i.score?"★ "+i.score:"")+(i.status?"  "+i.status:"");const r=document.createElement("div");r.className="comic-card-front",r.append(e,n,s),t.append(r),Vc.appendChild(t)});lu(document.getElementById("bg"));gu(document.getElementById("spine"));vu();Gu().then(()=>Hc(),()=>Hc())(function(){const t=document.querySelector(".avatar");if(!t)return;let e=[];t.style.cursor="pointer",t.addEventListener("click",function(){const n=Date.now();e.push(n),e=e.filter(function(s){return n-s<=1600}),e.length>=3&&(e=[],window.parent&&window.parent!==window&&window.parent.postMessage({type:"endy:revertAbout"},"*"))})})();window.parent&&window.parent!==window&&document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(function(i){i.target="_top"});
