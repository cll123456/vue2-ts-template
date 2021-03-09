import { IRUserData } from "@/api/login/types";
import { getUserData } from "@/utils/cookies";
import { NavigationGuardNext, Route } from "vue-router/types/router";

const whiteList = ['/Login']; 

export function matchRouteMenu(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  // 
  console.log(to, from, next);
  const userData:IRUserData = JSON.parse(getUserData() as string);
  // if()
  next()
}