 
/// <summary>
/// 对angular里的ajax处理服务进行封装，为每个http请求添加host当前服务依赖 'angular-resource'
/// </summary> 
let cookiesRDServicesHost="http://smg-rp.gridsumdissector.com:8081"; 
let cookiesAuthorization ="RD-Authorization-Ticket 9FC0E9BB7C835C0F6C8231DD04870E191D46F8BB179CA32D71AA863DEE6725C04A8BF5AF13BBB1536CB1FA1E329BE74E87362C9600F772D4C857B9383348476691FAB6A79DB3F5A02961155FC312A9A7B7EB515ADBC27BE565B8201331D0FB0D594733EAC555A96941803CBB58EBF9C9";

authHttp.$inject = ['$http', '$cookies'];
resource.$inject = ['$resource', '$cookies']; 
function generateAuthHttp(ServicesHost, Authorization, $http) {
    var authHttp = {},
    serviceHost = ServicesHost;
    token = Authorization;

    if (serviceHost && serviceHost.charAt(serviceHost.length - 1) != '/') {
        serviceHost = serviceHost + '/';
    }

    angular.forEach(['get', 'delete', 'head', 'jsonp'], function (name) {
        authHttp[name] = function (url, config) {
            config = config || {};
            return $http[name](serviceHost + url, config);
        };
    });

    angular.forEach(['put', 'post'], function (name) {
        authHttp[name] = function (url, data, config) {
            config = config || {};
            return $http[name](serviceHost + url, data, config);
        };
    });

    //创建到处服务
    authHttp['export'] = function (url, data) {
        var name,
            form;

        // create the form
        form = Highcharts.createElement('form', {
            method: 'get',
            action: serviceHost + url,
            enctype: 'multipart/form-data'
        }, {
            display: 'none'
        }, document.body);

        data['authorize'] = token;

        // add the data
        for (name in data) {
            Highcharts.createElement('input', {
                type: 'hidden',
                name: name,
                value: data[name]
            }, null, form);
        }

        // submit
        form.submit();

        // clean up
        Highcharts.discardElement(form);
    };
    return authHttp;
}
/**
 * 封装$http服务
 * @param $http angular中http处理服务
 * @param $cookies angular中cookie处理服务
 */
function authHttp($http, $cookies) {
    var result = {
        RD: generateAuthHttp(cookiesRDServicesHost, cookiesAuthorization, $http),
        RDplus: generateAuthHttp(cookiesRDServicesHost, cookiesAuthorization, $http)
    }
    return result;
}
/**
 * 封装$resource服务
 * @param $resource angular基于http的restful处理服务
 * @param $cookies angular中cookie处理服务
 */
function resource($resource, $cookies) {
    return {
        RD: generateResource(cookiesRDServicesHost, cookiesAuthorization, $resource),
        RDplus: generateResource(cookiesRDServicesHost, cookiesAuthorization, $resource)
    };
}

function generateResource(ServicesHost, Authorization, $resource) {
    return function (url, params, methods) {
        var serviceHost = ServicesHost;
        if (serviceHost && serviceHost.charAt(serviceHost.length - 1) != '/') {
            serviceHost = serviceHost + '/';
        }

        if (serviceHost) {
            url = serviceHost + url;
        }

        methods = angular.extend({
            update: { method: 'put', isArray: false },
            create: { method: 'post' }
        }, methods);
        if (serviceHost) {
            for (var i in methods) {
                methods[i].headers = {};
                methods[i].headers['Authorization'] = Authorization;
            }
        } 
        return $resource(url, params, methods);
    };
}


let modulle=  {
    resource:resource,
    authHttp:authHttp
} 

export default  modulle;
 