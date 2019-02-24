import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import History from "./views/History.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/history",
      name: "history",
      component: History
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
