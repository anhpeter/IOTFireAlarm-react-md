(this.webpackJsonpfire_alarm=this.webpackJsonpfire_alarm||[]).push([[0],{101:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(54),i=n.n(r),s=(n(65),n(9)),o=(n(66),n(20)),u=n(1);function l(e){var t=e.children,n=e.to;return Object(u.jsx)(o.b,{className:"link-no-style",to:n,children:t})}function b(){return Object(u.jsx)("div",{className:"header",children:Object(u.jsx)("div",{className:"container",children:Object(u.jsx)(l,{to:"/",children:Object(u.jsx)("h2",{children:"Hotel Management"})})})})}var j,d,f,h=n(5),m=n(11),v=n.n(m),O=n(15),g=n(4),x="https://it3-fire-api.herokuapp.com",p={fetchItems:function(){var e=Object(O.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(x,"/room")).then((function(e){return e.json()})).then((function(e){return e.payload})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),fetchItemById:function(){var e=Object(O.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(x,"/room/get-by-id/").concat(t)).then((function(e){return e.json()})).then((function(e){return e.payload})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},y=p,S=n(10),D=n(31),w=S.a.img(j||(j=Object(s.a)(["\n    width: 100%;\n    object-fit:cover;\n    aspect-ratio:3/2;\n"]))),T=S.a.div(d||(d=Object(s.a)(["\n    position: relative;\n    border-radius:10px;\n    overflow:hidden;\n    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;\n"]))),k=S.a.div(f||(f=Object(s.a)(["\n    position: absolute;\n    top:0;\n    bottom:0;\n    right:0;\n    left:0;\n    text-transform: uppercase;\n    display:flex;\n    align-items:center;\n    justify-content:center;\n    color: white;\n    font-size: 22px;\n    background-color: rgba(247,15,15,.7);\n    z-index:1;\n    font-weight: bold;\n"])));function I(e){var t=e.id,n=e.imageUrl,c=e.name,r=Object(D.a)(x),i=Object(g.a)(r,1)[0],s=Object(a.useState)(!1),o=Object(g.a)(s,2),b=o[0],j=o[1];return Object(a.useEffect)((function(){i.on("SERVER_EMIT_ROOM_WITH_STATUS_".concat(t),(function(e){0===e.gas||0===e.flame?j(!0):j(!1)}))}),[t,i,j]),Object(u.jsx)("div",{children:Object(u.jsx)(l,{to:"/room/"+t,children:Object(u.jsxs)(T,{children:[Object(u.jsx)(w,{src:n,alt:""}),b?Object(u.jsx)(k,{children:c}):null,b?null:Object(u.jsx)("h5",{className:"text-center py-2",children:c})]})})})}function _(){var e=Object(a.useState)([]),t=Object(g.a)(e,2),n=t[0],c=t[1];Object(a.useEffect)((function(){var e=function(){var e=Object(O.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.fetchItems();case 3:t=e.sent,c(t),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[c]);var r=n.map((function(e){return Object(u.jsx)("div",{className:"col-md-4 vitri mb-4",children:Object(u.jsx)(I,{id:e._id,imageUrl:e.imageUrl,name:e.name})},e._id)}));return Object(u.jsx)("div",{className:"container",children:Object(u.jsx)("div",{className:"row",children:r})})}function N(){return Object(u.jsx)(_,{})}var L=[{value:-1,text:"Realtime"},{value:1,text:"1 hour"},{value:24,text:"1 day"},{value:168,text:"7 days"},{value:240,text:"10 days"},{value:720,text:"30 days"},{value:2160,text:"90 days"}];function M(e){var t=this,n=e.chartTimeInHour,a=e.onTimeChange,c=L.map((function(e){var c=e.value===n?"btn-primary":"btn-light";return Object(u.jsx)("button",{onClick:a.bind(t,e.value),type:"button",className:"btn ".concat(c),children:e.text},e.value)}));return Object(u.jsx)("div",{children:Object(u.jsx)("div",{className:"btn-group",role:"group","aria-label":"",children:c})})}var E,R={strPad:function(e,t,n){return(e+="")?e.length>=t?e:n.repeat(t-e.length)+e:e}},F=S.a.span(E||(E=Object(s.a)(["\n    font-size:1.5rem;\n"])));function H(e){var t=Object(a.useState)(new Date),n=Object(g.a)(t,2),c=n[0],r=n[1];Object(a.useEffect)((function(){setInterval((function(){r(new Date)}),1e3)}),[r]);var i=R.strPad(c.getHours(),2,"0"),s=R.strPad(c.getMinutes(),2,"0"),o=R.strPad(c.getSeconds(),2,"0");return Object(u.jsxs)(F,{children:[i,":",s,":",o,'"']})}var C=n(6),P={fetchLastItemsByRoomId:function(e,t){return fetch("".concat(x,"/room-status/get-last-items-by-room-id/").concat(e,"?qty=").concat(t)).then((function(e){return e.json()})).then((function(e){return e.payload}))},fetchLastItemsAfterTimeByRoomId:function(e,t){return fetch("".concat(x,"/room-status/get-last-items-after-time/").concat(e,"?time=").concat(t)).then((function(e){return e.json()})).then((function(e){return e.payload}))}},A=n(16),B=n(2),U=n(3),z=function(){function e(t,n){Object(B.a)(this,e),this.time=t,this.items=n,this.timelineLength=this.getTimelineLength()}return Object(U.a)(e,[{key:"genData",value:function(){var t=this.genDefaultData(this.time),n=t.gasData,a=t.flameData,c=t.labels,r=0,i=this.groupStatus(),s=this.getTimelineIndexesForNewStatuses(i);for(var o in i){var u=Object(A.a)(Object(A.a)({},i[o]),{},{date:o}),l=s[r];n[l]=e.getStatus(u,"gas"),a[l]=e.getStatus(u,"flame"),c[l]=e.getLabel(u,this.time),r++}return{gasData:n,flameData:a,labels:c}}},{key:"genDefaultData",value:function(){return e.genDefaultData(this.time)}},{key:"getGroupStatusKey",value:function(e){var t=new Date(e);return this.time>=24&&(t.setMinutes(0),this.time>=720&&t.setHours(0)),t.setSeconds(0),t.setMilliseconds(0),t.toString()}},{key:"groupStatus",value:function(){var e=this,t={};if(this.items.length>0){var n=1,a=1,c=this.getGroupStatusKey(this.items[0].date);this.items.forEach((function(r,i){var s=e.items.length-1===i,o=e.getGroupStatusKey(r.date);t[o]||(c&&(t[c]={gas:n,flame:a}),n=1,a=1,c=o,t[o]=!0),0===r.gas&&(n=0),0===r.flame&&(a=0),s&&(t[o]={gas:n,flame:a})}))}return t}},{key:"getTimelineLength",value:function(){return e.getTimelineLength(this.time)}},{key:"getTimelineIndexesForNewStatuses",value:function(e){var t=[];for(var n in e){var a=6e4;this.time>=24&&(a*=60,this.time>=720&&(a*=24));var c=Math.abs(new Date-new Date(n)),r=Math.ceil(c/a),i=this.timelineLength-r;t.push(i)}return t}}],[{key:"genDefaultData",value:function(t){var n,a,c,r=this;if(t>-1){var i=e.getTimelineLength(t),s=Object(C.a)(Array(i)).map((function(e){return 0}));n=s.slice(0),a=s.slice(0),c=s.slice(0).map((function(e,n){var a=new Date;return t<24?a.setMinutes(a.getMinutes()-(i-n)+1):t<720?a.setHours(a.getHours()-(i-n)+1):a.setDate(a.getDate()-(i-n)+1),r.getLabel({date:a},t)}))}else{var o=Object(C.a)(Array(30)).map((function(e){return 0}));n=o.slice(0),a=o.slice(0),c=o.slice(0).map((function(e){return""}))}return{gasData:n,flameData:a,labels:c}}},{key:"getStatus",value:function(e,t){return 1===e[t]?0:1}},{key:"getLabel",value:function(e,t){var n=new Date(e.date),a=R.strPad(n.getMonth()+1,2,"0"),c=R.strPad(n.getDate(),2,"0"),r=R.strPad(n.getHours(),2,"0"),i=R.strPad(n.getMinutes(),2,"0");return t<24?"".concat(r,":").concat(i):t>=720?"".concat(c,"/").concat(a):"".concat(c,"/").concat(a," ").concat(r,":").concat(i)}},{key:"getFetchTime",value:function(e){var t=new Date,n=t.getHours();return t.setHours(n-e),t.toISOString()}},{key:"getTimelineLength",value:function(e){return e<24?60*e:e>=720?Math.ceil(e/24):e}}]),e}();function G(e){var t=e.children,n=e.color,a=void 0===n?"primary":n;return Object(u.jsx)("div",{className:"alert alert-".concat(a," text-center"),role:"alert",children:t})}var K,V,W,J,q,Z=n(60),Q=S.a.div(K||(K=Object(s.a)(["\n    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;\n"]))),X=function(e){var t=e.labels,n=e.gasData,a=e.flameData,c={maintainAspectRatio:!1,scales:{y:{beginAtZero:!0}},animation:{duration:0},responsive:!0,interaction:{mode:"index",intersect:!1},stacked:!1,plugins:{title:{display:!0,text:e.title,font:{size:22,weight:"bold",lineHeight:1.2}}}},r={labels:t,datasets:[{label:"Gas",data:n,fill:!1,backgroundColor:"#dbdbdb",borderColor:"#8c8c8c",borderDash:[10,5]},{label:"Flame",data:a,fill:!1,backgroundColor:"#FFB1C1",borderColor:"#FF6384"}]};return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(Q,{children:Object(u.jsx)(Z.a,{height:250,data:r,options:c})})})},Y=S.a.div(V||(V=Object(s.a)(["\n    height:400px;\n"])));function $(e){var t=e.item,n=e.chartTimeInHour,c=e.hasDummyRealtimeStatus,r=Object(D.a)(x),i=Object(g.a)(r,1)[0],s=Object(a.useState)(!1),o=Object(g.a)(s,2),l=o[0],b=o[1],j=z.genDefaultData(n),d=j.flameData,f=j.gasData,h=j.labels,m=Object(a.useState)(f),p=Object(g.a)(m,2),y=p[0],S=p[1],w=Object(a.useState)(d),T=Object(g.a)(w,2),k=T[0],I=T[1],_=Object(a.useState)(h),N=Object(g.a)(_,2),M=N[0],E=N[1],R=Object(a.useState)(h),F=Object(g.a)(R,2),H=F[0],A=F[1],B=Object(a.useState)(d),U=Object(g.a)(B,2),K=U[0],V=U[1],W=Object(a.useState)(f),J=Object(g.a)(W,2),q=J[0],Z=J[1];Object(a.useEffect)((function(){return i.on("SERVER_EMIT_ROOM_WITH_STATUS_".concat(t._id),(function(e){console.log("socket data",e),Z((function(t){var n=z.getStatus(e,["gas"]);return 0===t.length?[n]:[].concat(Object(C.a)(t.slice(1)),[n])})),V((function(t){var n=z.getStatus(e,["flame"]);return 0===t.length?[n]:[].concat(Object(C.a)(t.slice(1)),[n])})),A((function(t){var a=z.getLabel(e,n);return 0===t.length?[a]:[].concat(Object(C.a)(t.slice(1)),[a])}))})),function(){i.off("SERVER_EMIT_ROOM_WITH_STATUS_".concat(t._id))}}),[t._id,n,c,i]),Object(a.useEffect)((function(){var e=function(){var e=Object(O.a)(v.a.mark((function e(){var a,c,r,i,s,o;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.prev=1,e.next=4,P.fetchLastItemsAfterTimeByRoomId(t._id,z.getFetchTime(n));case 4:a=(a=e.sent).reverse(),c=new z(n,a),r=c.genData(a),i=r.gasData,s=r.flameData,o=r.labels,S(i),I(s),E(o),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),console.error(e.t0);case 16:return e.prev=16,b(!1),e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[1,13,16,19]])})));return function(){return e.apply(this,arguments)}}();e()}),[t._id,n,S,E,I]);var Q,$,ee,te=L.find((function(e){return e.value===n})),ne=n<24?"Realtime status":"Last ".concat(te.text);return-1===n?(Q=q,$=K,ee=H):(Q=y,$=k,ee=M),Object(u.jsx)("div",{className:"card border-0",children:Object(u.jsx)(Y,{className:"card-body",children:l?Object(u.jsx)(G,{color:"info",children:"Loading ..."}):Object(u.jsx)(X,{title:ne,gasData:Q,flameData:$,labels:ee})})})}var ee=S.a.div(W||(W=Object(s.a)(["\n    display:flex;\n    align-items:center;\n    justify-content:space-between;\n"]))),te=S.a.img(J||(J=Object(s.a)(["\n    aspect-ratio:3/2;\n    border-radius:10px;\n    max-width:100%;\n     box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;\n"]))),ne=S.a.div(q||(q=Object(s.a)(["\n    display:flex;\n    justify-content:space-between;\n    align-items:center;\n    margin-bottom: .5rem;\n    @media (max-width: 576px){ \n        max-width: 800px;\n        flex-direction:column-reverse;\n        align-items:center;\n        >*{\n            margin-bottom:.5rem;\n        }\n    }\n"])));function ae(){var e=Object(h.f)().id,t=Object(a.useState)(void 0),n=Object(g.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)(!1),s=Object(g.a)(i,2),o=s[0],l=(s[1],Object(a.useState)(-1)),b=Object(g.a)(l,2),j=b[0],d=b[1];return Object(a.useEffect)((function(){var t=function(){var t=Object(O.a)(v.a.mark((function t(){var n;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.fetchItemById(e);case 2:n=t.sent,r(n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[e,r]),Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("div",{className:"container",children:c?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"row mb-4",children:Object(u.jsx)("div",{className:"col-12",children:Object(u.jsxs)(ee,{children:[Object(u.jsx)("h1",{children:c.name}),Object(u.jsx)(H,{})]})})}),Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{className:"offset-sm-4 col-sm-4 mb-3",children:Object(u.jsx)(te,{src:c.imageUrl,alt:""})}),Object(u.jsxs)("div",{className:"col-12",children:[Object(u.jsx)(ne,{children:Object(u.jsx)(M,{chartTimeInHour:j,onTimeChange:d})}),Object(u.jsx)($,{chartTimeInHour:j,item:c,hasDummyRealtimeStatus:o})]})]})]}):null})})}var ce;n.p;var re=S.a.div(ce||(ce=Object(s.a)(["\n    display:flex;\n    flex-direction:column;\n    min-height:100vh;\n"])));var ie=function(){return Object(u.jsx)(o.a,{children:Object(u.jsxs)(re,{children:[Object(u.jsx)(b,{}),Object(u.jsx)("div",{className:"main",children:Object(u.jsxs)(h.c,{children:[Object(u.jsx)(h.a,{path:"/room/:id",children:Object(u.jsx)(ae,{})}),Object(u.jsx)(h.a,{path:"/",exact:!0,children:Object(u.jsx)(N,{})})]})})]})})},se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,102)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};i.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(ie,{})}),document.getElementById("root")),se()},65:function(e,t,n){},66:function(e,t,n){},98:function(e,t){}},[[101,1,2]]]);
//# sourceMappingURL=main.4d3d2716.chunk.js.map