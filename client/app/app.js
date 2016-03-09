import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
let menu=[
{ 
    text:'我的首页',
    hasSubItems:false, 
    topItems:[
        {
            text:'我的首页',
            state:'home'
        } 
    ]
},
{ 
    text:'直播',
    hasSubItems:true,isShowSubItems:false,
    subItems:[
        { 
            text:'直播频道',
            topItems:[ 
                {
                    text:'直播概况',
                    state:'liveSum'
                } ,
                {
                    text:'直播时期分析',
                    state:'liveAnaly'
                }  
                        
            ]},
            { 
                text:'频道分析',
                topItems:[
                {
                    text:'频道单日分析',
                    state:'channelSingle', 
                }  
                ]
            }
    ]
}
];
angular.module('app', [
    ngCookies,
    uiRouter,
    Common.name,
    Components.name
])
    .config(($locationProvider) => {
        "ngInject";
        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        $locationProvider.html5Mode(true).hashPrefix('!');
    }) 
    .component('app', AppComponent);
//开启程序
function bootstrapApplication() {
    angular.element(document).ready(function () {
        //手动启动应用
        angular.bootstrap(document, ['app']);
    });
}
fetchData().then(bootstrapApplication);
//获取数据
function fetchData() {
    var initInjector = angular.injector(['ng', 'ngCookies']);
    var $cookies = initInjector.get('$cookies');
    var $http = initInjector.get("$http");
    var $q = initInjector.get('$q');
    $cookies.put('currentHostServicesHost', "http://api-rd.gridsumdissector.com/api/SATVChannelTask/Query?ed=2015-02-07&pd=1&sd=2015-02-07");
    $cookies.put('Authorization', "RD-Authorization-Ticket 9FC0E9BB7C835C0F6C8231DD04870E191D46F8BB179CA32D71AA863DEE6725C04A8BF5AF13BBB1536CB1FA1E329BE74E87362C9600F772D4C857B9383348476691FAB6A79DB3F5A02961155FC312A9A7B7EB515ADBC27BE565B8201331D0FB0D594733EAC555A96941803CBB58EBF9C9");
    var serviceHost =  $cookies.get("currentHostServicesHost");
    var token =  $cookies.get("Authorization");
    var config = {
        headers: {
            Authorization: token
        }
    }; 
    if (serviceHost && serviceHost.charAt(serviceHost.length - 1) != '/') {
        serviceHost = serviceHost + '/';
    };
     
    return $q.all([
        $http.get(serviceHost, config)
    ]).then(function (results) {
        if (angular.isArray(results)) {
            if (results[0]) {
                angular.module('app').constant('account', {name:"lis"}); 
                angular.module('app').constant('currentProMenu',menu);
        
                angular.module('curProRouter').constant('account', {name:"lis"});
                angular.module('curProRouter').constant('currentProMenu',menu);
            }
        }
    }, function (error) {
        angular.module('app').constant('account', {name:"lis"}); 
        angular.module('app').constant('currentProMenu',menu);
        
        angular.module('curProRouter').constant('account', {name:"lis"});
        angular.module('curProRouter').constant('currentProMenu',menu);
    });
}