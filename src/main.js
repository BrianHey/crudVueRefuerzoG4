import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCgyt06qPnfWMzQAb9lXeUsEAcWXXHClYU",
  authDomain: "crud-vue-firebase-3af18.firebaseapp.com",
  databaseURL: "https://crud-vue-firebase-3af18.firebaseio.com",
  projectId: "crud-vue-firebase-3af18",
  storageBucket: "crud-vue-firebase-3af18.appspot.com",
  messagingSenderId: "563994405254",
  appId: "1:563994405254:web:de40d82cd665edde68a407",
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
