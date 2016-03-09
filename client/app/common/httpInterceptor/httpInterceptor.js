 import angular from 'angular';
import uiRouter from 'angular-ui-router';
import httpInterceptorFact from './httpInterceptor.fact'
let module = angular.module('httpInterceptor', [
    uiRouter
]).factory('httpInterceptorFact', httpInterceptorFact)
.config(config);
config.$inject = ['$httpProvider'];
function config($httpProvider) { 
    //注册http拦截器
    $httpProvider.interceptors.push('httpInterceptorFact');
}
export default module;