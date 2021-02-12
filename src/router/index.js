import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/registro",
    name: "Registro",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/editar/:id",
    name: "Editar",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Edit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // información del usuario activo
  let usuario = firebase.auth().currentUser;
  console.log(usuario);
  //buscamos la ruta que tiene activo un meta, en este caso /home
  let login = to.matched.some((result) => result.meta.requiresAuth);

  if (!usuario && login) {
    // si la ruta tiene activo el meta y no hay usuario conectado
    // no se deje ingresar a la ruta y se envia a login
    next({ name: "Login" });
  } else if (usuario && !login) {
    next();
  } else {
    next();
  }
});

export default router;
