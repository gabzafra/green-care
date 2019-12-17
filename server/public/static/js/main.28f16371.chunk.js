(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{44:function(e,n,t){e.exports=t(77)},49:function(e,n,t){},50:function(e,n,t){},70:function(e,n,t){},71:function(e,n,t){},72:function(e,n,t){},73:function(e,n,t){},76:function(e,n,t){},77:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(36),i=t.n(o),c=(t(49),t(4)),l=t(5),u=t(9),s=t(11),m=t(10),d=t(12),h=(t(50),t(17)),p=t(15),g=t(1),f=t(2),b={green:"#6AA76F",white:"#FFFFFF",red:"#A78F6A",blue:"#1B8ECF",gray:"#A0A0A0"};function v(){var e=Object(g.a)(["\n        border: none;\n        background-color: ",";\n        background-image: ",";\n        background-position: center;\n        background-repeat: no-repeat;\n        width: 10vw;\n        height: 5vh;\n        margin-right: 1rem;\n        margin-top: 1rem;\n"]);return v=function(){return e},e}var w=f.a.button(v(),b.green,(function(e){return"white"===e.btnColor?"url(../images/close_w.svg)":"url(./images/close_g.svg)"})),E=function(e){var n=e.btnColor;return r.a.createElement(w,{btnColor:n})};function x(){var e=Object(g.a)(["\n  width: 70vw;\n  height: 10vh;\n"]);return x=function(){return e},e}function j(){var e=Object(g.a)(["\n  width: 100vw;\n  display: flex;\n  justify-content: space-between;\n  padding-left: 1rem;\n  box-sizing: border-box;\n"]);return j=function(){return e},e}var O=f.a.div(j()),y=f.a.img(x()),k=function(e){return r.a.createElement(O,null,r.a.createElement(y,{src:e.src,alt:e.alt}),r.a.createElement(E,{btnColor:"white"}))},C=t(19),P=t.n(C),S=function e(){var n=this;Object(l.a)(this,e),this.signup=function(e){return n.instance.post("/signup",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.login=function(e){return n.instance.post("/login",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.loggedInUser=function(){return n.instance.get("/loggedin").then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.logout=function(){return n.instance.post("/logout").then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.upload=function(e){return n.instance.post("/upload",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.instance=P.a.create({baseURL:"".concat("https://green-care.herokuapp.com/api","/auth"),withCredentials:!0})};t(70);function U(){var e=Object(g.a)(['\n  font-family: "Encode Sans";\n  font-weight: 400;\n  font-size: 2em;\n  color: ',";\n  margin-top: 1rem;\n  margin-bottom: 0.5rem;\n"]);return U=function(){return e},e}function z(){var e=Object(g.a)(["\n  color: ",";\n  font-size: 1.2rem;\n  border: none;\n  border-radius: 22px;\n  height: 50px;\n  min-width: 230px;\n  max-width: 350px;\n  padding: 10px;\n  margin: 5px;\n  box-sizing: border-box;\n  ::placeholder {\n    color: ",";\n  }\n"]);return z=function(){return e},e}function F(){var e=Object(g.a)(["\n  display: flex;\n  align-items: center;\n  flex-flow: column;\n  width: 100vw;\n  height: 50vh;\n  margin: 0 auto;\n  .button-box {\n    display: flex;\n    flex-direction: column;\n    margin-top: 2rem;\n    button {\n      background: ",";\n      color: ",";\n      font-size: 1.2rem;\n      font-weight: 600;\n      border: none;\n      border-radius: 25px;\n      height: 50px;\n      min-width: 230px;\n      max-width: 350px;\n      padding: 10px;\n      margin: .5rem;\n      box-sizing: border-box;\n      input {\n        color: ",";\n        font-size: 1.2rem;\n        font-weight: 600;\n      }\n    }\n    .btn-green {\n      background: ",";\n      border: 1px solid ",";\n    }\n  }\n"]);return F=function(){return e},e}var _=f.a.div(F(),b.white,b.green,b.white,b.green,b.white),N=f.a.input(z(),b.gray,b.gray),I=f.a.label(U(),b.white),R=function(e){var n=e.username,t=e.password,a=e.handleChange,o=e.placeholder;return r.a.createElement(_,null,r.a.createElement(I,{htmlFor:"username"},"User name: "),r.a.createElement(N,{type:"text",name:"username",value:n,onChange:a,placeholder:o}),r.a.createElement(I,{htmlFor:"password"},"Password: "),r.a.createElement(N,{type:"password",name:"password",value:t,onChange:a}),r.a.createElement("div",{className:"button-box"},r.a.createElement("button",{className:"btn-green"},r.a.createElement("input",{type:"submit",value:"Enter"})),r.a.createElement("button",null,"New user")))},T=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(s.a)(this,Object(m.a)(n).call(this,e))).state={username:"bob",password:"12345678"},t.handleChange=function(e){var n=e.target,a=n.name,r=n.value;t.setState(Object(c.a)({},t.state,Object(p.a)({},a,r)))},t.handleLogin=function(e){var n=t.props,a=n.setUser,r=n.history;e.preventDefault(),t.authService.login(t.state).then((function(e){a(e),r.push("/main")}),(function(e){console.error(e)}))},t.authService=new S,t}return Object(d.a)(n,e),Object(u.a)(n,[{key:"render",value:function(){var e=this.state,n=e.username,t=e.password;return r.a.createElement("div",{className:"login-wrapper"},r.a.createElement(k,{src:"./images/green_care_w.svg",alt:"green care logo"}),r.a.createElement("img",{src:"./images/leaf_w.svg",alt:"green care"}),r.a.createElement("form",{onSubmit:this.handleLogin},r.a.createElement(R,{username:n,password:t,handleChange:this.handleChange,handleLogin:this.handleLogin,placeholder:"User name"})))}}]),n}(a.Component);t(71);function A(){var e=Object(g.a)(['\n  font-family: "Roboto";\n  font-weight: 300;\n  font-size: 1em;\n  font-style: italic;\n  color: ',";\n  background-color: "," ;\n  padding: 2px 5px;\n  border-radius: 5px;\n"]);return A=function(){return e},e}function D(){var e=Object(g.a)(['\n  font-family: "Encode Sans";\n  font-weight: 400;\n  font-size: 2em;\n  color: ',";\n  margin-top: 1rem;\n  margin-bottom: 0.5rem;\n"]);return D=function(){return e},e}function L(){var e=Object(g.a)(["\n  color: ",";\n  font-size: 1.2rem;\n  border: none;\n  border-radius: 22px;\n  height: 50px;\n  min-width: 230px;\n  max-width: 350px;\n  padding: 10px;\n  margin: 5px;\n  box-sizing: border-box;\n  ::placeholder {\n    color: ",";\n  }\n"]);return L=function(){return e},e}function B(){var e=Object(g.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: column;\n  width: 100vw;\n  height: 50vh;\n  .button-box {\n    display: flex;\n    flex-direction: column;\n    margin-top: 2rem;\n    button {\n      background: ",";\n      color: ",";\n      font-size: 1.2rem;\n      font-weight: 600;\n      border: none;\n      border-radius: 25px;\n      height: 50px;\n      min-width: 230px;\n      max-width: 350px;\n      padding: 10px;\n      margin: .5rem;\n      box-sizing: border-box;\n      input {\n        color: ",";\n        font-size: 1.2rem;\n        font-weight: 600;\n      }\n    }\n    .btn-green {\n      background: ",";\n      border: 1px solid ",";\n    }\n\n    .btn-red {\n      background: ",";\n      border: 1px solid ",";\n      color: ",";\n    }\n  }\n"]);return B=function(){return e},e}var M=f.a.div(B(),b.white,b.green,b.white,b.green,b.white,b.red,b.white,b.white),W=f.a.input(L(),b.gray,b.gray),H=f.a.label(D(),b.white),J=f.a.p(A(),b.white,b.red),Y=function(e){var n=e.username,t=e.password,a=e.passwordR,o=e.handleChange,i=e.placeholder,c=e.error;return r.a.createElement(M,null,r.a.createElement(H,{htmlFor:"username"},"New user name: "),r.a.createElement(W,{type:"text",name:"username",value:n,onChange:o,placeholder:i}),r.a.createElement(H,{htmlFor:"password"},"New password: "),r.a.createElement(W,{type:"password",name:"password",value:t,onChange:o}),r.a.createElement(H,{htmlFor:"passwordR"},"Repeat password: "),r.a.createElement(W,{type:"password",name:"passwordR",value:a,onChange:o}),c&&r.a.createElement(J,null,c),r.a.createElement("div",{className:"button-box"},r.a.createElement("button",{className:"btn-green"},r.a.createElement("input",{type:"submit",value:"Create User"})),r.a.createElement("button",{className:"btn-red"},"Cancel")))},q=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(s.a)(this,Object(m.a)(n).call(this,e))).state={username:"",password:"",passwordR:"",error:""},t.handleChange=function(e){var n=e.target,a=n.name,r=n.value;t.setState(Object(c.a)({},t.state,Object(p.a)({},a,r)))},t.handleSignUp=function(e){if(e.preventDefault(),t.state.password===t.state.passwordR){var n=t.props,a=n.history,r=n.setUser;t.authService.signup(t.state).then((function(e){r(e),a.push("/")}),(function(e){t.setState(Object(c.a)({},t.state,{error:e}))}))}else t.setState(Object(c.a)({},t.state,{error:"Password don't match"}))},t.authService=new S,t}return Object(d.a)(n,e),Object(u.a)(n,[{key:"render",value:function(){var e=this.state,n=e.username,t=e.password,a=e.passwordR,o=e.error;return r.a.createElement(r.a.Fragment,null,r.a.createElement(k,{src:"./images/green_care_w.svg",alt:"green care logo"}),r.a.createElement("form",{className:"form-wrapper",onSubmit:this.handleSignUp},r.a.createElement(Y,{username:n,password:t,passwordR:a,handleChange:this.handleChange,placeholder:"User name",error:o})))}}]),n}(a.Component),$=(t(72),function e(){var n=this;Object(l.a)(this,e),this.getPlantById=function(e){return n.instance.get("/".concat(e)).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.getUserPlants=function(e){return n.instance.get("/user/".concat(e)).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.createPlant=function(e){return n.instance.post("/create",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.deletePlant=function(e){return n.instance.delete("/delete/".concat(e)).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.updatePlant=function(e){return n.instance.put("/delete",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.uploadPlantImage=function(e){return n.instance.post("/upload",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.instance=P.a.create({baseURL:"".concat("https://green-care.herokuapp.com/api","/plants"),withCredentials:!0})}),G=function e(){var n=this;Object(l.a)(this,e),this.createTask=function(e,t){return t.plantId=e,n.instance.post("/create",t).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.updateTask=function(e){return n.instance.put("/update",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.deleteTask=function(e){return n.instance.put("/delete",e).then((function(e){return Promise.resolve(e.data)})).catch((function(e){return console.error(e)}))},this.instance=P.a.create({baseURL:"".concat("https://green-care.herokuapp.com/api","/plants"),withCredentials:!0})},K=(t(73),t(16));function Q(){var e=Object(g.a)(["\n  display: flex;\n  button {\n    border: none;\n    background-color: ",";\n    background-position: center-top;\n    background-repeat: no-repeat;\n    background-size: cover;\n    width: 2rem;\n    height: 2rem;\n    margin-top: 2rem;\n  }\n  .btn-edit {\n    background-image: url(./images/edit_w.svg);\n  }\n  .btn-delete {\n    background-image: url(./images/trash_w.svg);\n    margin-left: 2rem;\n  }\n"]);return Q=function(){return e},e}function V(){var e=Object(g.a)(["\n  color: ",';\n\n  h2 {\n    font-size: 1.6rem;\n    margin-bottom: 1rem;\n  }\n  p {\n    font-size: 1rem;\n    font-family: "Roboto";\n    font-style: italic;\n  }\n']);return V=function(){return e},e}function X(){var e=Object(g.a)(["\n  width: 140px;\n  height: 140px;\n  border-radius: 50%;\n  border: 8px solid ",";\n  box-sizing: border-box;\n"]);return X=function(){return e},e}function Z(){var e=Object(g.a)(["\n  display: flex;\n  align-items: center;\n  margin: 2rem 1rem;\n"]);return Z=function(){return e},e}var ee=f.a.div(Z()),ne=f.a.img(X(),b.white),te=f.a.div(V(),b.white),ae=f.a.div(Q(),b.green),re=function(e){var n=e.plant,t=n.id,a=n.picture,o=n.name,i=n.common_name,c=n.deletePlant;return r.a.createElement(ee,null,r.a.createElement(K.b,{to:"/plant-detail/".concat(t)},r.a.createElement(ne,{id:t,src:a})),r.a.createElement("div",{className:"side-wrapper"},r.a.createElement(K.b,{to:"/plant-detail/".concat(t)},r.a.createElement(te,{id:t},r.a.createElement("h2",null,o),r.a.createElement("p",null,i))),r.a.createElement(ae,null,r.a.createElement(K.b,{to:"/plant-update/".concat(t)},r.a.createElement("button",{className:"btn-edit"})),r.a.createElement("button",{className:"btn-delete",id:t,onClick:function(e){return c(e)}}))))},oe=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(s.a)(this,Object(m.a)(n).call(this,e))).updatePlants=function(){t.plantService.getUserPlants(t.props.loggedInUser.id).then((function(e){t.setState(Object(c.a)({},t.state,{plants:e}))}),(function(e){var n=e.message;console.error(n)}))},t.deletePlant=function(e){e.preventDefault();var n=t.state.plants.find((function(n){return n.id===e.target.id}));t.plantService.deletePlant(n.id).then((function(){t.updatePlants()}),(function(e){var n=e.message;console.error(n)}))},t.plantService=new $,t.taskService=new G,t.state={plants:[]},t}return Object(d.a)(n,e),Object(u.a)(n,[{key:"componentDidMount",value:function(){this.updatePlants()}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(k,{src:"./images/green_care_w.svg",alt:"green care logo"}),this.state.plants.map((function(n){return r.a.createElement(re,{key:n.id,plant:Object(c.a)({},n,{deletePlant:e.deletePlant})})})))}}]),n}(a.Component);function ie(){var e=Object(g.a)(["\n  width: 178px;\n  height: 178px;\n  border-radius: 50%;\n  border: 8px solid ",";\n  box-sizing: border-box;\n"]);return ie=function(){return e},e}function ce(){var e=Object(g.a)(["\n  cursor: pointer;\n"]);return ce=function(){return e},e}function le(){var e=Object(g.a)(["\n  display: none;\n"]);return le=function(){return e},e}var ue=f.a.input(le()),se=f.a.label(ce()),me=f.a.img(ie(),b.white),de=function(e){var n=e.picture,t=e.handleUpload;return r.a.createElement(r.a.Fragment,null,r.a.createElement(se,{htmlFor:"file-upload",className:"custom-file-upload"},r.a.createElement(me,{src:n})),r.a.createElement(ue,{id:"file-upload",type:"file",onChange:t}))};function he(){var e=Object(g.a)(["\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color : rgba(0,0,0,.2);\n  background-image : url(../images/Spinner-1s-200px.svg);\n  background-position: center;\n  background-repeat: no-repeat;\n  z-index : 1000;\n  }\n"]);return he=function(){return e},e}var pe=f.a.div(he());function ge(){var e=Object(g.a)(["\n  font-size: 2rem;\n"]);return ge=function(){return e},e}function fe(){var e=Object(g.a)(["\n  width: 100vw;\n  display: flex;\n  align-items: center;\n"]);return fe=function(){return e},e}function be(){var e=Object(g.a)(["\n"]);return be=function(){return e},e}function ve(){var e=Object(g.a)(["\n  font-size: 1.8rem;\n  align-self: flex-start;\n  margin-left: 1rem;  \n"]);return ve=function(){return e},e}var we=f.a.label(ve()),Ee=f.a.input(be()),xe=f.a.div(fe()),je=f.a.p(ge()),Oe=function(e){var n=e.name,t=e.handleChange,a=e.value,o=e.id,i=e.labelText;return r.a.createElement(r.a.Fragment,null,r.a.createElement(we,{forHtml:o,name:n},i),r.a.createElement(xe,null,r.a.createElement(Ee,{id:o,type:"range",name:n,step:1,value:a,min:1,max:15,onChange:t}),r.a.createElement(je,null,a)))};function ye(){var e=Object(g.a)(["\n  border: none;\n  background-color: ",";\n  background-image: url(",");\n  background-position: center;\n  background-repeat: no-repeat;\n  width: 4rem;\n  height: 4rem;\n  margin-right: 1rem;\n  margin-top: 1rem;\n"]);return ye=function(){return e},e}var ke=f.a.button(ye(),b.green,(function(e){return e.img})),Ce=function(e){var n=e.img,t=e.clicked;return r.a.createElement(r.a.Fragment,null,r.a.createElement(ke,{img:n,onClick:function(e){return t(e)}}))};function Pe(){var e=Object(g.a)(["\n  background-color: ",';\n  font-family: "Encode Sans"; \n  font-size: 1.7rem;\n  padding: 1rem;\n']);return Pe=function(){return e},e}function Se(){var e=Object(g.a)(["\ncolor: ",";\n  font-size: 1.2rem;\n  border: none;\n  border-radius: 22px;\n  height: 50px;\n  min-width: 230px;\n  max-width: 350px;\n  padding: 10px;\n  margin: 5px;\n  box-sizing: border-box;\n  ::placeholder {\n    color: ",";\n  }"]);return Se=function(){return e},e}var Ue=f.a.input(Se(),b.gray,b.gray),ze=f.a.p(Pe(),b.green),Fe=function(e){var n=e.name,t=e.value,a=e.handleChange,o=e.job,i=e.placeholder;return r.a.createElement(r.a.Fragment,null,"readonly"===o?r.a.createElement(ze,null,t):r.a.createElement(Ue,{name:n,value:t,handleChange:a,placeholder:i}))};function _e(){var e=Object(g.a)(["\n    display: flex;\n    justify-content: space-evenly;\n    margin-top: 1rem;\n  .btn-green {\n    background: ",";\n    border: 1px solid ",";\n  }\n  .btn-red {\n    background: ",";\n  }\n"]);return _e=function(){return e},e}function Ne(){var e=Object(g.a)(['\n  font-family: "Encode Sans";\n  color: ',";\n  font-size: 1.2rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 25px;\n  height: 40px;\n  min-width: 140px;\n  max-width: 350px;\n  padding: 5px 10px 10px;\n  margin: 0.5rem;\n  box-sizing: border-box;\n"]);return Ne=function(){return e},e}var Ie=f.a.button(Ne(),b.white),Re=f.a.div(_e(),b.green,b.white,b.red),Te=function(e){e.handleClick;return r.a.createElement(Re,null,r.a.createElement(Ie,{className:"btn-red"},"Cancel"),r.a.createElement(Ie,{className:"btn-green"},"Update"))};t(76);function Ae(){var e=Object(g.a)(["\n  width: 100vw;\n  display: flex;\n  justify-content: space-evenly;\n  margin-bottom: 1rem;\n"]);return Ae=function(){return e},e}function De(){var e=Object(g.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);return De=function(){return e},e}var Le=f.a.form(De()),Be=f.a.div(Ae()),Me=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(s.a)(this,Object(m.a)(n).call(this,e))).handleChange=function(e){var n=e.target,a=n.name,r=n.value;t.setState(Object(c.a)({},t.state,Object(p.a)({},a,r)))},t.toggleInfo=function(e){e.preventDefault(),t.setState(Object(c.a)({},t.state,{infoToggle:!t.state.infoToggle}))},t.handleUpload=function(e){var n=new FormData;n.append("picture",e.target.files[0]),t.setState(Object(c.a)({},t.state,{loadingFlag:!0})),t.plantService.uploadPlantImage(n).then((function(e){t.setState(Object(c.a)({},t.state,{plant:{picture:e.secure_url},loadingFlag:!1}))}),(function(e){console.error(e)}))},t.getPlant=function(){var e=t.props.match.params;t.plantService.getPlantById(e.plantId).then((function(e){t.setState(Object(c.a)({},t.state,{plant:e}))}),(function(e){var n=e.message;console.error(n)}))},t.plantService=new $,t.state={plant:null,loadingFlag:!1,waterInterval:7,fertilizerInterval:7,infoToggle:!1},t}return Object(d.a)(n,e),Object(u.a)(n,[{key:"componentDidMount",value:function(){this.getPlant()}},{key:"render",value:function(){var e=this.state.plant;return r.a.createElement(r.a.Fragment,null,this.state.plant&&r.a.createElement(r.a.Fragment,null,this.state.loadingFlag&&r.a.createElement(pe,null),r.a.createElement("aside",{className:this.state.infoToggle?"show-aside":"",onClick:this.toggleInfo},r.a.createElement("h2",null,e.common_name),r.a.createElement("p",null,e.scientific_name),r.a.createElement("div",{className:"row"},r.a.createElement("h3",null,"Soil preference"),r.a.createElement("p",null,e.soils_adaptation.join(" "))),r.a.createElement("div",{className:"row"},r.a.createElement("h3",null,"Temperature minimun"),r.a.createElement("p",null,e.temperature_minimun,"\xb0C")),r.a.createElement("div",{className:"row"},r.a.createElement("h3",null,"Shade tolerance"),r.a.createElement("p",null,e.shade_tolerance)),r.a.createElement("div",{className:"row"},r.a.createElement("h3",null,"Yearly precipitation rate"),r.a.createElement("p",null,e.year_rain_range)),r.a.createElement("div",{className:"row"},r.a.createElement("h3",null,"pH range"),r.a.createElement("p",null,e.ph_range)),r.a.createElement("div",{className:"row"},r.a.createElement("h3",null,"Fertilizer needs"),r.a.createElement("p",null,e.fertilizer_req)),r.a.createElement("div",{className:"row"},r.a.createElement("h3",null,"Perennial"),r.a.createElement("p",null,e.perennial?"Yes":"No"))),r.a.createElement(k,{src:"../images/green_care_w.svg",alt:"green care logo"}),r.a.createElement(Le,null,r.a.createElement(Fe,{name:"name",value:e.name,handleChange:this.handleChange,job:"readonly",placeholder:"Plant name"}),r.a.createElement(de,{picture:e.picture,handleUpload:this.handleUpload}),r.a.createElement(Fe,{className:"sub-text",name:"common_name",value:e.common_name,handleChange:this.handleChange,job:"readonly",placeholder:"Plant species"}),r.a.createElement(Be,null,r.a.createElement(Ce,{img:"../images/map_w.svg"}),r.a.createElement(Ce,{img:"../images/info_w.svg",clicked:this.toggleInfo}),r.a.createElement(Ce,{img:"../images/trash_b_w.svg"})),r.a.createElement(Oe,{id:"waterSlider",name:"waterInterval",value:this.state.waterInterval,handleChange:this.handleChange,labelText:"Watering interval"}),r.a.createElement(Oe,{id:"fertSlider",name:"fertilizerInterval",value:this.state.fertilizerInterval,handleChange:this.handleChange,labelText:"Fertilizer"})),r.a.createElement(Te,null)))}}]),n}(a.Component),We=t(41);function He(e){var n=e.component,t=e.user,a=e.redirectPath,o=Object(We.a)(e,["component","user","redirectPath"]);return r.a.createElement(h.b,Object.assign({},o,{render:function(e){return t?r.a.createElement(n,Object.assign({loggedInUser:t},e)):r.a.createElement(h.a,{to:{pathname:a}})}}))}var Je=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(s.a)(this,Object(m.a)(n).call(this,e))).setUser=function(e){t.setState(Object(c.a)({},t.state,{user:e}))},t.fetchUser=function(){null===t.state.user&&t.authService.loggedInUser().then((function(e){t.setUser(e)}),(function(e){t.setUser(!1)})).catch((function(){t.setUser(!1)}))},t.logout=function(e){t.authService.logout().then((function(n){t.setState(Object(c.a)({},t.state,{user:null})),e.history.push("/login")}))},t.authService=new S,t.state={user:null,flag:!1},t}return Object(d.a)(n,e),Object(u.a)(n,[{key:"componentDidMount",value:function(){this.fetchUser()}},{key:"render",value:function(){var e=this,n=this.state.user;return r.a.createElement("div",{className:"App"},n&&r.a.createElement(h.d,null,r.a.createElement(h.b,{exact:!0,path:"/login",render:function(n){return r.a.createElement(T,Object.assign({},n,{setUser:e.setUser}))}}),r.a.createElement(h.b,{exact:!0,path:"/signup",render:function(n){return r.a.createElement(q,Object.assign({},n,{setUser:e.setUser}))}}),r.a.createElement(h.b,{exact:!0,path:"/logout",render:function(n){return e.logout(n)}}),r.a.createElement(He,{exact:!0,path:"/main",user:n,component:oe}),r.a.createElement(He,{path:"/plant-detail/:plantId",user:n,component:Me})),!n&&r.a.createElement(h.d,null,r.a.createElement(h.b,{exact:!0,path:"/login",render:function(n){return r.a.createElement(T,Object.assign({},n,{setUser:e.setUser}))}}),r.a.createElement(h.b,{exact:!0,path:"/signup",render:function(n){return r.a.createElement(q,Object.assign({},n,{setUser:e.setUser}))}}),r.a.createElement(He,{exact:!0,path:"/",user:n,component:oe,redirectPath:"/login"})))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(K.a,null,r.a.createElement(Je,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[44,1,2]]]);
//# sourceMappingURL=main.28f16371.chunk.js.map