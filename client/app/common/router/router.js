import angular from 'angular';
import uiRouter from 'angular-ui-router';


let curProRouterModule = angular.module('curProRouter', [
    uiRouter
])
    .config(config);
config.$inject = ["$stateProvider", "$urlRouterProvider", "account", 'currentProMenu'];
function config($stateProvider, $urlRouterProvider, account, currentProMenu) {
 
    var routes = [];
    //menu   = [
    //     {
    //         state: 'home',
    //         url: '/home',
    //         template: '<showcurrentrouterstate></showcurrentrouterstate>',
    
    //     },
    //     {
    //         state: 'liveSum',
    //         url: '/liveSum',
    //         template: '<showcurrentrouterstate></showcurrentrouterstate>'
    //     }
    //     ,
    //     {
    //         state: 'liveAnaly',
    //         url: '/liveAnaly',
    //         template: '<showcurrentrouterstate></showcurrentrouterstate>'
    //     }
    //     ,
    //     {
    //         state: 'channelSingle',
    //         url: '/channelSingle',
    //         template: '<showcurrentrouterstate></showcurrentrouterstate>'
    //     }
    // ];
    
    
    currentProMenu.map((v) => {
        if (v.topItems) {
            v.topItems.map((topItem) => {
                // scope.currentTopLevelMenu= v;
                // scope.currentSubItem={};
                // scope.currentTopMenus= v.topItems;
                // scope.currentTopMenu =  topItem;
                routes.push({
                    state: topItem.state,
                    url: '/' + topItem.state,
                    template: '<showcurrentrouterstate></showcurrentrouterstate>'

                })
            })
        }
        if (v.subItems) {
            v.subItems.map((subitem) => {
                if (subitem.topItems) {
                    subitem.topItems.map((topItem) => { 
                        // scope.currentTopLevelMenu= v;
                        // scope.currentSubItem=subitem;
                        // scope.currentTopMenus= subitem.topItems;
                        // scope.currentTopMenu =  topItem;
                        routes.push({
                            state: topItem.state,
                            url: '/' + topItem.state,
                            template: '<showcurrentrouterstate></showcurrentrouterstate>'

                        })
                    })
                }
            })
        }
    }) 
    $urlRouterProvider.otherwise('/home');
    function navStateMapFun(params, $stateProvider) {
        params.map((v) => {
            $stateProvider
                .state(v.state, {
                    url: v.url,
                    template: v.template
                })
        })
    }
    navStateMapFun(routes, $stateProvider);
}

export default curProRouterModule;






