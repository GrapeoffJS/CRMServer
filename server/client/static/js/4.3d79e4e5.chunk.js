(this["webpackJsonpcrm-shool-app"]=this["webpackJsonpcrm-shool-app"]||[]).push([[4],{603:function(e,n,t){"use strict";t.r(n);var r,c=t(2),a=t(9),s=t(20),i=t.n(s),d=t(38),o=t(4),l=t(0),u=t(600),j=t(65),b=t(261),p=t(33),h=t(10),O=t(1),f=h.a.div(r||(r=Object(p.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: ",";\n  .lds-ring {\n    display: inline-block;\n    position: relative;\n    width: 80px;\n    height: 80px;\n  }\n  .lds-ring div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 64px;\n    height: 64px;\n    margin: 8px;\n    border: 8px solid #001529;\n    border-radius: 50%;\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: #001529 transparent transparent transparent;\n  }\n  .lds-ring div:nth-of-type(1) {\n    animation-delay: -0.45s;\n  }\n  .lds-ring div:nth-of-type(2) {\n    animation-delay: -0.3s;\n  }\n  .lds-ring div:nth-of-type(3) {\n    animation-delay: -0.15s;\n  }\n  @keyframes lds-ring {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n"])),(function(e){return e.precentage?"100%":"100vh"})),x=function(e){var n=e.precentage;return Object(O.jsx)(f,{precentage:n,children:Object(O.jsxs)("div",{className:"lds-ring",children:[Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{}),Object(O.jsx)("div",{})]})})},m=t(64),g=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:24,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return e+t.length>r?Object(O.jsx)(m.a,{placement:"leftTop",title:"".concat(a).concat(""!==a?" ":"").concat(n),children:Object(O.jsxs)(j.h,{width:c,children:[t," ",n]})}):Object(O.jsxs)(j.h,{children:[t," ",n]})},v=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:24,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return e+t.length>r?Object(O.jsx)(m.a,{placement:"leftTop",title:"".concat(a).concat(""!==a?" ":"").concat(n.surname," ").concat(n.name," ").concat(n.midname),children:Object(O.jsxs)(j.h,{width:c,children:[n.surname," ",n.name," ",n.midname]})}):Object(O.jsxs)(j.h,{children:[n.surname," ",n.name," ",n.midname]})},k=t(15),y=t(37),S=t(342),w=t(195),_=t(24),P=t.n(_),I=function(e){var n=e.closestTask;return Object(O.jsxs)(j.a,{children:[Object(O.jsx)("p",{className:"name",children:n.name}),Object(O.jsxs)("p",{children:["\u0414\u043e: ",P()(n.deadline).format("DD/MM/YYYY | HH:mm")]}),Object(O.jsxs)("p",{children:["\u041e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u0435\u043d: ",n.responsible[0].surname," ",n.responsible[0].name," ",n.responsible[0].midname]}),Object(O.jsx)("div",{children:n.text})]})},F=function(e){e.Url;var n=e.card,t=e.pupils,r=(e.pageSize,t.pupilsList),a=Object(l.useState)(!1),s=Object(o.a)(a,1)[0];return Object(O.jsx)(O.Fragment,{children:s?Object(O.jsx)(x,{precentage:!0}):r.filter((function(e){return e.salesFunnelStep===n._id})).map((function(e,t){if(n._id===e.salesFunnelStep)return Object(O.jsx)(u.b,{draggableId:"".concat(e._id),index:t,children:function(t){return Object(O.jsx)(j.g,Object(c.a)(Object(c.a)(Object(c.a)({background:n.background},t.draggableProps),t.dragHandleProps),{},{ref:t.innerRef,children:Object(O.jsxs)("div",{className:"funnelStepStudent__first--info",children:[Object(O.jsxs)("div",{children:[console.log(e),Object(O.jsx)(y.c,{to:"/student/".concat(e._id),children:v("".concat(e.surname," ").concat(e.name," ").concat(e.midname).length,e,"",25,"230px","\u0424\u0418\u041e:")})]}),Object(O.jsxs)("div",{children:[Object(O.jsx)(j.m,{children:"\u0422\u0435\u043b.\u0420\u043e\u0434\u0438\u0442\u0435\u043b\u044f:"})," ",e.parentPhone]}),Object(O.jsxs)("div",{children:[Object(O.jsx)(j.m,{children:"\u041c\u0438\u043d.\u0410\u0431\u043e\u043d\u0435\u043c\u0435\u043d\u0442:"})," ",e.minPaidSubscription||0,"\u20bd"]}),Object(O.jsx)(j.j,{contains:e.statuses.length,children:e.statuses.map((function(e){return Object(O.jsx)(S.a,{color:e.color,children:e.name},e._id)}))}),e.closestTask.length?Object(O.jsx)(w.a,{overlay:Object(O.jsx)(I,{closestTask:e.closestTask[0]}),children:Object(O.jsx)(j.i,{children:"\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0430\u044f \u0437\u0430\u0434\u0430\u0447\u0430"})}):""]})}))}},e._id)}))})},L=t(109);n.default=function(){var e=k.a,n=Object(l.useState)(!0),t=Object(o.a)(n,2),r=t[0],s=t[1],p=Object(l.useState)([]),h=Object(o.a)(p,2),f=h[0],m=h[1],v=Object(l.useState)([]),y=Object(o.a)(v,2),S=y[0],w=y[1],_=Object(l.useCallback)(Object(d.a)(i.a.mark((function n(){var t;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(L.b)(e);case 2:t=n.sent,m((function(e){return t})),w((function(e){return t.map((function(e){return e.pupils})).flat(2)})),s((function(e){return!1}));case 6:case"end":return n.stop()}}),n)}))),[e]);Object(l.useEffect)((function(){_()}),[e,_]);var P=function(){var n=Object(d.a)(i.a.mark((function n(t){var r,c,s,d,l,u;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.destination){n.next=2;break}return n.abrupt("return",w((function(e){return e})));case 2:if(r=S.filter((function(e){return e.salesFunnelStep===t.source.droppableId})),c=S.filter((function(e){return e.salesFunnelStep===t.destination.droppableId})),s=r.splice(t.source.index,1),d=Object(o.a)(s,1),l=d[0],t.source.droppableId!==t.destination.droppableId){n.next=8;break}return r.splice(t.destination.index,0,l),n.abrupt("return",w((function(e){return Array.from(new Set([].concat(Object(a.a)(e),Object(a.a)(r),Object(a.a)(c))))})));case 8:return u=l.statuses,l.statuses=l.statuses.map((function(e){return e._id})),l.salesFunnelStep=t.destination.droppableId,n.next=13,Object(L.c)(e,l._id,l);case 13:return l.statuses=u,c.splice(t.destination.index,0,l),n.abrupt("return",w((function(e){return Array.from(new Set([].concat(Object(a.a)(e),Object(a.a)(r),Object(a.a)(c))))})));case 16:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(O.jsx)(j.n,{children:r?Object(O.jsx)(x,{}):Object(O.jsx)(j.c,{jstctn:f.length<6,children:Object(O.jsx)(u.a,{onDragEnd:P,children:f.map((function(n){return Object(O.jsxs)(j.d,{style:"\u0417\u0430\u043d\u0438\u043c\u0430\u044e\u0442\u0441\u044f"===n.name||"\u0417\u0430\u043d\u0438\u043c\u0430\u0435\u0442\u0441\u044f"===n.name?{display:"none"}:{display:"block"},className:"card",children:[Object(O.jsxs)(j.f,{background:n.background,children:[g(n.name.length,n.name,"",30,"220px"),1===n.order?Object(O.jsx)(b.a,{loader:{loaded:r,setLoaded:s},status:1,funnel:f,Url:e,pupils:{pupilsList:S,setPupilsList:w}}):""]}),Object(O.jsxs)(j.e,{background:n.background,children:[n.minPaidSubscriptionsAmount||0,"\u0440\u0443\u0431."]}),Object(O.jsx)(u.c,{droppableId:"".concat(n._id),children:function(t){return Object(O.jsxs)("div",Object(c.a)(Object(c.a)({className:"droppable-container"},t.droppableProps),{},{ref:t.innerRef,children:[Object(O.jsx)(F,{card:n,pupils:{pupilsList:S,setPupilsList:w},Url:e}),t.placeholder]}))}})]},n._id)}))})})})}}}]);
//# sourceMappingURL=4.3d79e4e5.chunk.js.map