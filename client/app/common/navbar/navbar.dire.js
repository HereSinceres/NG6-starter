import template from './navbar.dire.html';
import './navbar.dire.css';
//Menu文件注意事项
//1、State只在topItems里有
//2、当路由改变是获取路由State改变当前Menu的样式
//3、从menu变量中Copy的副本
//4、Copy的副本中的所有属性控制当前页面Nav指令的显示状况（包括CSS）

Directive.$inject = ['$state', '$rootScope', '$timeout','currentProMenu' ];
export default 
function Directive($state, $rootScope, $timeout,currentProMenu) {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        controller: ControllerController,
        controllerAs: 'vm',
        link: link,
        template: template,
        restrict: 'AE',
        scope: {
        }
    };
    return directive;

    function link(scope, element, attrs) {
        let menu=  currentProMenu;
     
        //三级菜单
        scope.currentTopMenu={}; 
        scope.currentTopMenus=[]; 
        //二级菜单
        scope.currentSubItem={};
        //最顶级菜单
        scope.currentTopLevelMenu= {};
        //第一次渲染获取当前路由
        $timeout(() => { 
            scope.findRootMenuOrderByState($state.current.name);
        }, 100);
        //状态只在topItems里有
        scope.menu=angular.copy(menu);
        scope.toggleMenu=function(item){
            item.isShowSubItems=!item.isShowSubItems; 
        } 
        //根据状态查询父级,状态只在topItems里有 
        scope.findRootMenuOrderByState=function(state){ 
            scope.menu.map((v)=>{ 
                if(v.topItems){ 
                    v.topItems.map((topItem)=>{
                        if(topItem.state==state)
                        { 
                            scope.currentTopLevelMenu= v;
                            scope.currentSubItem={};
                            scope.currentTopMenus= v.topItems;
                            scope.currentTopMenu =  topItem;
                        }
                    })
                } 
                if(v.subItems){
                    v.subItems.map((subitem)=>{
                        if(subitem.topItems){
                        subitem.topItems.map((topItem)=>{
                            if(topItem.state==state)
                            { 
                                scope.currentTopLevelMenu= v;
                                scope.currentSubItem=subitem;
                                scope.currentTopMenus= subitem.topItems;
                                scope.currentTopMenu =  topItem;
                            }
                        })
                        }
                    })
                }
            }) 
            scope.changeMenuStyle();
        } 
        //点击左侧menu跳转到TopItemsMenu第一个状态
        scope.clkMenu=(item)=>{ 
            scope.goState( item.topItems[0].state);
        }
        scope.goState=(state)=>{ 
            $state.go(state); 
            scope.clearActiveState();
            scope.findRootMenuOrderByState(state);
        }
        scope.changeMenuStyle=()=>{
            scope.currentSubItem.active="link-active";
            scope.currentTopLevelMenu.active="link-active";
            scope.currentTopMenu.active="link-active";
            scope.currentTopMenus.active="link-active"; 
        }
        scope.clearActiveState=function(){ 
            scope.menu.map((v)=>{  
                v.active=""; 
                if(v.topItems){
                    v.topItems.map((topItem)=>{
                        topItem.active=""; 
                    }) }
                if(v.subItems){
                    v.subItems.map((subitem)=>{
                        subitem.active=""; 
                        subitem.topItems.map((topItem)=>{
                            topItem.active=""; 
                        })
                    })
                }
                
            })  
        } 

    }
}
/* @ngInject */
function ControllerController() {

} 



 