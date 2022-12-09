"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[64],{53064:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var r=n(72791),a=n(59434),o=n(81814),s=n(56534),u=n(28927),c=n(6705),i=n(38302),p=n(16856),d=n(72326),l=n(36548),f=n(57689),m=n(11087),v=n(80184),h=function(){var e=(0,a.I0)(),t=(0,s.VY)(),n=(0,f.s0)(),h=(0,a.v9)((function(e){return e.user})),y=h.user,x=h.isAuthenticated,g=h.loading,Z=(0,a.v9)((function(e){return e.myOrders})),w=Z.loading,k=Z.error,b=Z.orders,j=[{field:"id",headerName:"Order ID",minWidth:300,flex:.5},{field:"status",headerName:"Status",minWidth:150,flex:.2,cellClassName:function(e){return"Delivered"===e.getValue(e.id,"status")?"greenColor":"redColor"}},{field:"noOfItems",headerName:"No of Items",type:"number",minWidth:150,flex:.2},{field:"amount",headerName:"Amount",type:"number",minWidth:150,flex:.3},{field:"action",headerName:"Action",type:"number",minWidth:150,flex:.2,sortable:!1,renderCell:function(e){return(0,v.jsx)(m.Link,{to:"/order/".concat(e.getValue(e.id,"id")),children:(0,v.jsx)(p.wgi,{size:window.innerWidth>=600?25:20})})}}],C=[];return b&&b.forEach((function(e,t){C.push({noOfItems:e.orderItems.length,id:e._id,status:e.orderStatus,amount:e.totalPrice})})),(0,r.useEffect)((function(){k&&(t.error(k),e((0,d.b9)())),e((0,d.TG)()),(0,l.l)(x,n)}),[k,e,t,x,n]),(0,v.jsx)(r.Fragment,{children:w&&g?(0,v.jsx)(u.Z,{}):(0,v.jsxs)("div",{className:"myOrdersPage",children:[(0,v.jsx)(c.Z,{title:"".concat(y.name," - Orders")}),(0,v.jsx)(o._$r,{rows:C,columns:j,pageSize:10,disableSelectionOnClick:!0,className:"myOrdersTable",autoHeight:!0}),(0,v.jsx)(i.Z,{id:"myOrdersHeading",children:"".concat(y.name,"'s Orders")})]})})}},6705:function(e,t,n){var r=n(54270),a=n(80184);t.Z=function(e){var t=e.title;return(0,a.jsx)(r.Z,{children:(0,a.jsx)("title",{children:t})})}},72326:function(e,t,n){n.d(t,{Cs:function(){return l},LV:function(){return c},TG:function(){return i},b9:function(){return m},s$:function(){return p},wH:function(){return f},zk:function(){return d}});var r=n(74165),a=n(15861),o=n(74569),s=n.n(o),u=n(17234),c=function(e){return function(){var t=(0,a.Z)((0,r.Z)().mark((function t(n){var a,o,c;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:u.ib}),a={headers:{"Content-Type":"application/json"}},t.next=5,s().post("/api/v1/order/new",e,a);case 5:o=t.sent,c=o.data,n({type:u.mr,payload:c}),localStorage.removeItem("cartItems"),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),n({type:u.Sr,payload:t.t0.response.data.message});case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},i=function(){return function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:u.A4}),e.next=4,s().get("/api/v1/orders/me");case 4:n=e.sent,a=n.data,t({type:u.SJ,payload:a.orders}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t({type:u.ut,payload:e.t0.response.data.message});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()},p=function(e){return function(){var t=(0,a.Z)((0,r.Z)().mark((function t(n){var a,o;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:u.YO}),t.next=4,s().get("/api/v1/order/".concat(e));case 4:a=t.sent,o=a.data,n({type:u.um,payload:o.order}),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),n({type:u.Ab,payload:t.t0.response.data.message});case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},d=function(){return function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:u.Ux}),e.next=4,s().get("/api/v1/admin/orders");case 4:n=e.sent,a=n.data,t({type:u.g6,payload:a.orders}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t({type:u.xH,payload:e.t0.response.data.message});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()},l=function(e,t){return function(){var n=(0,a.Z)((0,r.Z)().mark((function n(a){var o,c,i;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,a({type:u.Mi}),o={headers:{"Content-Type":"application/json"}},n.next=5,s().put("/api/v1/admin/order/".concat(e),t,o);case 5:c=n.sent,i=c.data,a({type:u.Bx,payload:i.success}),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),a({type:u.vs,payload:n.t0.response.data.message});case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()},f=function(e){return function(){var t=(0,a.Z)((0,r.Z)().mark((function t(n){var a,o;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:u.B6}),t.next=4,s().delete("/api/v1/admin/order/".concat(e));case 4:a=t.sent,o=a.data,n({type:u.Sn,payload:o.success}),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),n({type:u.gq,payload:t.t0.response.data.message});case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},m=function(){return function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t({type:u.pp});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},36548:function(e,t,n){n.d(t,{C:function(){return a},l:function(){return r}});var r=function(e,t){void 0!==e&&setTimeout((function(){!1===e&&(console.log("userAuth",e),t("/login"))}),500)},a=function(e,t,n,r){!0===e&&t&&void 0!==t.role&&"admin"!==t.role&&(console.log("adminAuth"),n("/login"),r.error("Cannot Access Admin Authorities"))}}}]);
//# sourceMappingURL=64.819aeea0.chunk.js.map