import{R as v,r as f,j as o,M as S,u as L,b as _,L as D}from"./index-DlOiFrJ8.js";import{u as j,S as y}from"./useAuthFetch-DWgcSrej.js";import{p as P,u as Y,d as C}from"./blog.services-B9F6rO5L.js";/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var w=function(n,r){return w=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])},w(n,r)};function N(n,r){w(n,r);function t(){this.constructor=n}n.prototype=r===null?Object.create(r):(t.prototype=r.prototype,new t)}var g=function(){return g=Object.assign||function(r){for(var t,e=1,s=arguments.length;e<s;e++){t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},g.apply(this,arguments)};function M(n,r,t,e){var s,i=!1,l=0;function p(){s&&clearTimeout(s)}function d(){p(),i=!0}typeof r!="boolean"&&(e=t,t=r,r=void 0);function u(){var a=this,h=Date.now()-l,x=arguments;if(i)return;function c(){l=Date.now(),t.apply(a,x)}function b(){s=void 0}e&&!s&&c(),p(),e===void 0&&h>n?c():r!==!0&&(s=setTimeout(e?b:c,e===void 0?n-h:n))}return u.cancel=d,u}var m={Pixel:"Pixel",Percent:"Percent"},E={unit:m.Percent,value:.8};function T(n){return typeof n=="number"?{unit:m.Percent,value:n*100}:typeof n=="string"?n.match(/^(\d*(\.\d+)?)px$/)?{unit:m.Pixel,value:parseFloat(n)}:n.match(/^(\d*(\.\d+)?)%$/)?{unit:m.Percent,value:parseFloat(n)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),E):(console.warn("scrollThreshold should be string or number"),E)}var B=function(n){N(r,n);function r(t){var e=n.call(this,t)||this;return e.lastScrollTop=0,e.actionTriggered=!1,e.startY=0,e.currentY=0,e.dragging=!1,e.maxPullDownDistance=0,e.getScrollableTarget=function(){return e.props.scrollableTarget instanceof HTMLElement?e.props.scrollableTarget:typeof e.props.scrollableTarget=="string"?document.getElementById(e.props.scrollableTarget):(e.props.scrollableTarget===null&&console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `),null)},e.onStart=function(s){e.lastScrollTop||(e.dragging=!0,s instanceof MouseEvent?e.startY=s.pageY:s instanceof TouchEvent&&(e.startY=s.touches[0].pageY),e.currentY=e.startY,e._infScroll&&(e._infScroll.style.willChange="transform",e._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},e.onMove=function(s){e.dragging&&(s instanceof MouseEvent?e.currentY=s.pageY:s instanceof TouchEvent&&(e.currentY=s.touches[0].pageY),!(e.currentY<e.startY)&&(e.currentY-e.startY>=Number(e.props.pullDownToRefreshThreshold)&&e.setState({pullToRefreshThresholdBreached:!0}),!(e.currentY-e.startY>e.maxPullDownDistance*1.5)&&e._infScroll&&(e._infScroll.style.overflow="visible",e._infScroll.style.transform="translate3d(0px, "+(e.currentY-e.startY)+"px, 0px)")))},e.onEnd=function(){e.startY=0,e.currentY=0,e.dragging=!1,e.state.pullToRefreshThresholdBreached&&(e.props.refreshFunction&&e.props.refreshFunction(),e.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame(function(){e._infScroll&&(e._infScroll.style.overflow="auto",e._infScroll.style.transform="none",e._infScroll.style.willChange="unset")})},e.onScrollListener=function(s){typeof e.props.onScroll=="function"&&setTimeout(function(){return e.props.onScroll&&e.props.onScroll(s)},0);var i=e.props.height||e._scrollableNode?s.target:document.documentElement.scrollTop?document.documentElement:document.body;if(!e.actionTriggered){var l=e.props.inverse?e.isElementAtTop(i,e.props.scrollThreshold):e.isElementAtBottom(i,e.props.scrollThreshold);l&&e.props.hasMore&&(e.actionTriggered=!0,e.setState({showLoader:!0}),e.props.next&&e.props.next()),e.lastScrollTop=i.scrollTop}},e.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},e.throttledOnScrollListener=M(150,e.onScrollListener).bind(e),e.onStart=e.onStart.bind(e),e.onMove=e.onMove.bind(e),e.onEnd=e.onEnd.bind(e),e}return r.prototype.componentDidMount=function(){if(typeof this.props.dataLength>"u")throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),typeof this.props.initialScrollY=="number"&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),typeof this.props.refreshFunction!="function"))throw new Error(`Mandatory prop "refreshFunction" missing.
          Pull Down To Refresh functionality will not work
          as expected. Check README.md for usage'`)},r.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},r.prototype.componentDidUpdate=function(t){this.props.dataLength!==t.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},r.getDerivedStateFromProps=function(t,e){var s=t.dataLength!==e.prevDataLength;return s?g(g({},e),{prevDataLength:t.dataLength}):null},r.prototype.isElementAtTop=function(t,e){e===void 0&&(e=.8);var s=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,i=T(e);return i.unit===m.Pixel?t.scrollTop<=i.value+s-t.scrollHeight+1:t.scrollTop<=i.value/100+s-t.scrollHeight+1},r.prototype.isElementAtBottom=function(t,e){e===void 0&&(e=.8);var s=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,i=T(e);return i.unit===m.Pixel?t.scrollTop+s>=t.scrollHeight-i.value:t.scrollTop+s>=i.value/100*t.scrollHeight},r.prototype.render=function(){var t=this,e=g({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),s=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),i=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return v.createElement("div",{style:i,className:"infinite-scroll-component__outerdiv"},v.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(l){return t._infScroll=l},style:e},this.props.pullDownToRefresh&&v.createElement("div",{style:{position:"relative"},ref:function(l){return t._pullDown=l}},v.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!s&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},r}(f.Component);const R=B;function z({endpoint:n,Card:r}){const[t,e]=f.useState(!0),[s,i]=f.useState(1),[l,p]=f.useState([]),{error:d,loading:u,response:a}=j(`${n}?page=${s}`);return f.useEffect(()=>{a&&(a.data.length<10?(e(!1),p([...l,...a.data])):p([...l,...a.data]))},[a]),o.jsxs("div",{className:"w-full",children:[u&&o.jsx(S,{}),a&&o.jsx(R,{dataLength:a==null?void 0:a.data.length,hasMore:t,next:()=>i(s+1),loader:o.jsx(S,{}),endMessage:o.jsx("h3",{}),children:l.map(h=>o.jsx(r,{blog:h},h._id))}),d&&o.jsx("p",{className:"text-red-700 font-bold text-lg",children:d})]})}function H({removeBlog:n,isLoading:r}){const[t,e]=f.useState(!1);return o.jsx(o.Fragment,{children:t?o.jsx("button",{className:"btn btn-error flex-1",onClick:n,children:r?o.jsx(y,{}):"Click again to delete"}):o.jsx("button",{className:"btn btn-error flex-1",onClick:()=>{e(!0),setTimeout(()=>e(!1),1e4)},children:"Delete"})})}function k({publish:n,isLoading:r}){return o.jsx("button",{className:"btn btn-ghost bg-zinc-900 flex-1",onClick:n,children:r?o.jsx(y,{}):"Publish"})}function A({unPublish:n,isLoading:r}){return o.jsx("button",{className:"btn btn-ghost bg-zinc-900 flex-1",onClick:n,children:r?o.jsx(y,{}):"Un-publish"})}function O({tag:n}){return o.jsx("span",{className:"text-sm font-medium bg-transparent border-2 border-cyan-400 px-4 py-1 text-cyan-400 rounded-full",children:n})}function U({tags:n}){return o.jsx("div",{className:"flex flex-wrap gap-1 mt-2",children:n.map((r,t)=>o.jsx(O,{tag:r},t))})}function W({blog:n}){const r=L(),{showErrorToast:t,showSuccessToast:e}=_(),[s,i]=f.useState({isDeleting:!1,isPublishing:!1,isUnpublishing:!1}),l=u(P,"isPublishing","Published successfully"),p=u(Y,"isUnpublishing","Un-published successfully"),d=u(C,"isDeleting","Deleted successfully");return o.jsxs("div",{className:"flex flex-col p-3 my-4 w-full",children:[o.jsx(D,{to:`/${n.slug}`,children:o.jsx("h1",{className:"text-3xl font-bold inline text-gray-100 hover:underline",children:n.title})}),o.jsx("i",{className:"text-gray-500 font-medium mt-2",children:n.published_on}),o.jsx(U,{tags:n.tags}),o.jsx("p",{className:"text-gray-400 mt-4 mb-12 leading-6 font-normal",children:n.summary}),o.jsxs("div",{className:"flex flex-wrap gap-2 items-center w-full p-3",children:[o.jsx(k,{publish:l,isLoading:s.isPublishing}),o.jsx(A,{unPublish:p,isLoading:s.isUnpublishing}),o.jsx("button",{className:"btn btn-ghost bg-zinc-900 flex-1",onClick:()=>r(`/admin/edit/${n._id}`),children:"Edit"}),o.jsx(H,{removeBlog:d,isLoading:s.isDeleting})]}),o.jsx("hr",{className:"border-gray-800"})]});function u(a,h,x){return async function(){try{i(b=>({...b,[h]:!0}));const c=await a(n._id);if(c)throw new Error(c);e(x)}catch(c){t(c.message)}finally{i(c=>({...c,[h]:!1}))}}}}export{W as A,z as I};
