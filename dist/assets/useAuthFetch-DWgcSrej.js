import{j as u,r as t}from"./index-DlOiFrJ8.js";function f(){return u.jsx("span",{className:"loading loading-md"})}function h(s){const[r,o]=t.useState(!0),[a,n]=t.useState(""),[c,i]=t.useState(null);return t.useEffect(()=>{fetch(s,{method:"GET",credentials:"include"}).then(e=>e.json()).then(e=>{e.error?n(e.error):i(e)}).catch(()=>n("Something went wrong!")).finally(()=>o(!1))},[s]),{loading:r,error:a,response:c}}export{f as S,h as u};