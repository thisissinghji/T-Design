//this is a global object that can be accessed by the enitre application

/*proxies are used to  create a transparent layer over the state object. 
Proxies allow Valtio to intercept property access and modification, 
enabling it to track changes and trigger updates when necessary.*/ 

import { proxy } from "valtio";
 const state = proxy({
    intro: true, //are we currently in the homepage or not
    color: '#026875', //defalut color
    isLogoTexture: true, //are we currently displaying the logo on our shirt?
    isFullTexture: false,
    logoDecal:'/public/tria.png', //intial logo that will be displayed on the shirt
    fullDecal: '/public/tria.png', //initial full texture shirt
    textDecal: null,
 });

 export default state;