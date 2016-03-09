import angular from 'angular';
import uiRouter from 'angular-ui-router';
import showcurrentrouterstatedirective from './showcurrentrouterstate.directive';
import showcurrentrouterstateServ from './showcurrentrouterstate.serv';
import smgLocalityService from './smgLocalityService.authHttp';
let showcurrentrouterstateModule = angular.module('showcurrentrouterstate', [ 
  
    uiRouter
]) 
    .directive('showcurrentrouterstate', showcurrentrouterstatedirective)
    .factory('showcurrentrouterstateServ', showcurrentrouterstateServ)
    .factory('smgLocalityService', smgLocalityService);
export default showcurrentrouterstateModule;
 