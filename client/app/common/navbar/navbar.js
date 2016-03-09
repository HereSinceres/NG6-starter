import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.dire';

let navbarModule = angular.module('navbar', [
  uiRouter
])
 
.directive('navbar', navbarComponent);
export default navbarModule;
