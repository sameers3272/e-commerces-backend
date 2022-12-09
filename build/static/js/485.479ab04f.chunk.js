"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[485],{82955:function(e,n,i){i.d(n,{Z:function(){return c}});var r=i(96338),s=i(11087),l=i(16856),t=i(78842),d=i(70912),o=i(80184),c=function(){return(0,o.jsxs)("div",{className:"sideBar",children:[(0,o.jsx)(s.Link,{to:"/",children:(0,o.jsx)("img",{src:r,alt:"Ecommerces"})}),(0,o.jsxs)(s.Link,{to:"/admin/dashboard",children:[(0,o.jsx)(l.bUq,{}),(0,o.jsx)("p",{children:"DashBoard"})]}),(0,o.jsx)(t.Z,{defaultCollapseIcon:(0,o.jsx)(l.Yc6,{}),defaultExpandIcon:(0,o.jsx)(l.x8E,{}),children:(0,o.jsxs)(d.Z,{nodeId:"1",label:"Products",children:[(0,o.jsx)(s.Link,{to:"/admin/products",children:(0,o.jsx)(d.Z,{nodeId:"2",label:"All",icon:(0,o.jsx)(l.cfK,{})})}),(0,o.jsx)(s.Link,{to:"/admin/product",children:(0,o.jsx)(d.Z,{nodeId:"3",label:"Create",icon:(0,o.jsx)(l.x06,{})})})]})}),(0,o.jsxs)(s.Link,{to:"/admin/orders",children:[(0,o.jsx)(l.r4W,{}),(0,o.jsx)("p",{children:"Orders"})]}),(0,o.jsxs)(s.Link,{to:"/admin/users",children:[(0,o.jsx)(l.J8I,{}),(0,o.jsx)("p",{children:"Users"})]}),(0,o.jsxs)(s.Link,{to:"/admin/reviews",children:[(0,o.jsx)(l._YV,{}),(0,o.jsx)("p",{children:"Reviews"})]})]})}},21485:function(e,n,i){i.r(n),i.d(n,{default:function(){return k}});var r=i(29439),s=i(26513),l=i(83837),t=i(85159),d=i(94026),o=i(20269),c=i(81814),a=i(72791),u=i(56534),h=i(16856),x=i(59434),m=i(57689),f=i(11087),j=i(91265),p=i(30288),g=i(36548),Z=i(28927),v=i(6705),C=i(82955),b=i(80184),k=function(){var e=(0,m.s0)(),n=(0,x.I0)(),i=(0,u.VY)(),k=(0,x.v9)((function(e){return e.user})),A=k.isAuthenticated,N=k.user,L=(0,x.v9)((function(e){return e.getAllUsers})),D=L.error,I=L.users,U=(0,x.v9)((function(e){return e.deleteUser})),W=U.error,y=U.isDeleted,w=U.loading,E=(0,a.useState)(!1),V=(0,r.Z)(E,2),_=V[0],S=V[1],P=function(){S((function(e){return!e}))},Y=[{field:"id",headerName:"User Id",flex:.5,minWidth:180},{field:"name",headerName:"Name",flex:.3,minWidth:130},{field:"email",headerName:"Email",flex:.3,minWidth:130},{field:"role",headerName:"Role",flex:.2,minWidth:130,cellClassName:function(e){return"admin"===e.getValue(e.id,"role")?"greenColor":"redColor"}},{field:"actions",headerName:"Actions",flex:.2,minWidth:130,type:"number",sortable:!1,renderCell:function(e){return(0,b.jsxs)(a.Fragment,{children:[(0,b.jsx)(f.Link,{to:"/admin/user/".concat(e.getValue(e.id,"id")),children:(0,b.jsx)(h.zmo,{})}),(0,b.jsx)(s.Z,{onClick:P,children:(0,b.jsx)(h.ZkW,{})}),(0,b.jsxs)(l.Z,{"aria-labelledby":"simple-dialog-title",open:_,onClose:P,children:[(0,b.jsx)(t.Z,{children:"Delete Product"}),(0,b.jsxs)(d.Z,{className:"submitDailog",children:["Do you want to Delete this User"," ",e.getValue(e.id,"name")]}),(0,b.jsxs)(o.Z,{children:[(0,b.jsx)(s.Z,{onClick:P,color:"primary",children:"Cancel"}),(0,b.jsx)(s.Z,{onClick:function(){return i=e.getValue(e.id,"id"),n((0,j.h8)(i)),void S(!1);var i},color:"secondary",children:"Delete"})]})]})]})}}],z=[];return I&&I.forEach((function(e){z.push({id:e._id,name:e.name,email:e.email,role:e.role})})),(0,a.useEffect)((function(){(0,g.l)(A,e),(0,g.C)(!0,N,e,i),D&&(i.error(D),n((0,j.b9)())),W&&(i.error(W),n((0,j.b9)())),y&&(i.success("User Deleted Successfully"),n({type:p.aG})),n((0,j.AW)())}),[A,e,i,N,n,D,W,y]),(0,b.jsxs)(a.Fragment,{children:[(0,b.jsx)(v.Z,{title:"All Products - Admin"}),(0,b.jsxs)("div",{className:"dashboard",children:[(0,b.jsx)(C.Z,{}),(0,b.jsxs)("div",{className:"productListContainer",children:[(0,b.jsx)("h1",{id:"productListHeading",children:"All Users"}),w?(0,b.jsx)(Z.Z,{}):(0,b.jsx)(c._$r,{columns:Y,rows:z,pageSize:10,disableSelectionOnClick:!0,className:"productListTable",autoHeight:!0})]})]})]})}},6705:function(e,n,i){var r=i(54270),s=i(80184);n.Z=function(e){var n=e.title;return(0,s.jsx)(r.Z,{children:(0,s.jsx)("title",{children:n})})}},36548:function(e,n,i){i.d(n,{C:function(){return s},l:function(){return r}});var r=function(e,n){void 0!==e&&setTimeout((function(){!1===e&&(console.log("userAuth",e),n("/login"))}),500)},s=function(e,n,i,r){!0===e&&n&&void 0!==n.role&&"admin"!==n.role&&(console.log("adminAuth"),i("/login"),r.error("Cannot Access Admin Authorities"))}}}]);
//# sourceMappingURL=485.479ab04f.chunk.js.map