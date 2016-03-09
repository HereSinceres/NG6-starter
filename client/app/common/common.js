import angular from 'angular';
import ngCookies from 'angular-cookies';
import Navbar from './navbar/navbar';  
import showcurrentrouterstate from './showcurrentrouterstate/showcurrentrouterstate';  
  import curProRouter from './router/router';   
import authHttpModule from './authHttpModule/authHttpModule';
import httpInterceptor from './httpInterceptor/httpInterceptor'; 
let commonModule = angular.module('app.common', [
  ngCookies,
  Navbar.name,  
  showcurrentrouterstate.name,
  curProRouter.name,
  httpInterceptor.name,
  authHttpModule.name
])

  
export default commonModule;
 