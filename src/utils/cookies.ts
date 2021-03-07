import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

// User
const tokenKey = 'Admin-Token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

// Tab
const tabKey = 'current-tab';
export const getCurrentTab = () => Cookies.get(tabKey);
export const setCurrentTab = (tab:object) => Cookies.set(tabKey,JSON.stringify(tab));

