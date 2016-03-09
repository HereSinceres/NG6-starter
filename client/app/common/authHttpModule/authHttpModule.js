
import angular from 'angular';
import uiRouter from 'angular-ui-router'; 
import ngResource from 'angular-resource';
import authHttpFact from './authHttp.fact'; 
let module = angular.module('authHttpModule', [
      ngResource,
    uiRouter
]).factory('authHttp', authHttpFact.authHttp)
 .factory('resource', authHttpFact.resource);
 
export default module;
