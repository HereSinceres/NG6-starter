import angular from 'angular';
Directive.$inject = ['$state','showcurrentrouterstateServ','smgLocalityService'];
function Directive($state,showcurrentrouterstateServ,smgLocalityService) {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        // bindToController: true,测试使用  开发注释
        controller: ControllerController,
        controllerAs: 'vm',
        link: link,
        restrict: 'AE',
        template: "<div>{{linkvalue}} 这里是内容</div>",
        scope: {
        }
    };
    return directive;

    function link(scope, element, attrs) {
        scope.linkvalue = $state.current;
        var condtion = {};
        condtion.phoneNum ="15022313913";
        condtion.password = "xk15022313913";
        showcurrentrouterstateServ.account.phoneLogin(condtion).then(function (res) { 
        })
        var cons={cg:1,cn:"上海东方卫视",ed:"2016-03-08",pd:0,sd:"2016-03-08"}
        smgLocalityService.getAssessment(cons, function () {
    
        }, function () {
    
        });
    }
}
/* @ngInject */
function ControllerController() {
   
}
export default Directive;