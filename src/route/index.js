import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home/Home";
import Food from "@/components/Food/Food";
import Car from "@/components/Car/Car";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    }
  ]
})