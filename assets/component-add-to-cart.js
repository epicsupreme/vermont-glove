!function(){"use strict";var t,e={1886:function(t,e,i){var o=i(7308);function r(t){let e=[];return t.items&&t.items.forEach((i=>{let r=i.featured_image.url;const u=i.price/100,c=t.items.map((t=>t.properties?._cartParent===i.key&&{title:t.product_title,key:t.key,price:t.price/100,id:t.variant_id,options:t.options_with_values,image:t.featured_image.url,qty:t.quantity,properties:t.properties,remove(){n(this.key)},update(t){a(this.key,parseInt(t))}})).filter((t=>t));i.properties?._cartParent||e.push({title:i.product_title,key:i.key,price:u,id:i.variant_id,options:i.options_with_values,propertiesArray:i.properties?Object.entries(i.properties):null,image:r,addOnProducts:c,qty:i.quantity,remove(){n(this.key)},updateProperties(){var t,e;t=this.key,e=this.newProperties,o.fk(t,{properties:e}).then((t=>{s(t)}))},update(t){a(this.key,parseInt(t))}})})),{total:t.items_subtotal_price/100,products:e,note:t.note}}function n(t){let e={};o.Gu().then((i=>{console.log(i),i.items.forEach((i=>{null!=i.properties?._cartParent&&t===i.properties?._cartParent&&(e[i.key]=0)}));const r=i.items.find((e=>t===e.key));e[r.key]=0,fetch(window.Shopify.routes.root+"cart/update.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({updates:e})}).then((()=>{o.Gu().then((t=>{s(t)}))})).catch((t=>{console.log(t)}))}))}function a(t,e){o.fk(t,{quantity:e}).then((t=>{s(t)}))}function s(t){window.dispatchEvent(new CustomEvent("updateproducts",{detail:{cart:r(t)}})),window.dispatchEvent(new CustomEvent("updatecartcount",{detail:{cartTotal:t.item_count}}))}i(6104),o.Gu().then((t=>{s(t)})),window.addEventListener("cartUpdate",(t=>{o.w3(t.target.value)}));var u=i(4590);window.productData=function(){return{price:productJson.variants[0].price/100,disabled:!productJson.variants[0].available,button:productJson.variants[0].available?"Add to Cart":"Sold Out",options:productJson.variants[0].options,product:productJson,formData:{qty:1,id:productJson.variants[0].id},qtyChange(t){this.formData.qty=t},onSubmit(){this.button="Adding to Cart...",this.disabled=!0,o.B5(this.formData.id,{quantity:this.formData.qty}).then((()=>{o.Gu().then((t=>{s(t),this.button="Add to Cart",this.disabled=!1,window.dispatchEvent(new CustomEvent("updatecartstatus",{detail:{cartOpen:!0}}))}))})).catch((()=>{alert("This product is unavailable at the moment"),this.button="Unavailable",this.disabled=!0}))},update(t,e){let i=[];document.getElementById("product-form").querySelectorAll("[name*=options]").forEach((t=>{("SELECT"===t.tagName||t.checked)&&i.push(t.value)}));const o=(r=this.product.variants,n=i,console.log(r),r.filter((t=>(console.log(t.options),console.log(n),console.log((0,u.isEqual)(t.options,n)),(0,u.isEqual)(t.options,n))))[0]||null);var r,n;o?(this.formData.id=o.id,this.price=o.price/100,o.available?(this.disabled=!1,this.button="Add to Cart"):(this.disabled=!0,this.button="Sold Out")):(this.formData.id=null,this.disabled=!0,this.button="Unavailable")}}}}},i={};function o(t){var r=i[t];if(void 0!==r)return r.exports;var n=i[t]={id:t,loaded:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}o.m=e,t=[],o.O=function(e,i,r,n){if(!i){var a=1/0;for(d=0;d<t.length;d++){i=t[d][0],r=t[d][1],n=t[d][2];for(var s=!0,u=0;u<i.length;u++)(!1&n||a>=n)&&Object.keys(o.O).every((function(t){return o.O[t](i[u])}))?i.splice(u--,1):(s=!1,n<a&&(a=n));if(s){t.splice(d--,1);var c=r();void 0!==c&&(e=c)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[i,r,n]},o.d=function(t,e){for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t},o.j=807,function(){var t={807:0};o.O.j=function(e){return 0===t[e]};var e=function(e,i){var r,n,a=i[0],s=i[1],u=i[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(u)var d=u(o)}for(e&&e(i);c<a.length;c++)n=a[c],o.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return o.O(d)},i=self.webpackChunkepicsupreme_shopify=self.webpackChunkepicsupreme_shopify||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var r=o.O(void 0,[96],(function(){return o(1886)}));r=o.O(r)}();