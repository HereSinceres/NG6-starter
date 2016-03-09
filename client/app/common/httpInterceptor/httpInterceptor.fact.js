
/// <summary>
/// 统一定制http请求，发送前添加相同的头信息，出错时进行统一错误处理
/// </summary>



httpInterceptor.$inject = ['$q', '$injector', '$cookies', '$log'];
export default
    function httpInterceptor($q, $injector, $cookies, $log) {
   

    return {
        //interceptors get called with http config object. The function is free to modify the config or create a new one. 
        //The function needs to return the config directly or as a promise.
        'request': function(config) {  
            extendHeaders(config);
            return config || $q.when(config);
        },

        //interceptor gets called when a previous interceptor threw an error or resolved with a rejection.
        'requestError': function(rejection) {
            return $q.reject(rejection);
        },

        // interceptors get called with http response object. The function is free to modify the response or create a new one. 
        //The function needs to return the response directly or as a promise.
        'response': function(response) {
            return response || $q.when(response);
        },

        //interceptor gets called when a previous interceptor threw an error or resolved with a rejection.
        'responseError': function(rejection) {
            responseErrorHandling(rejection);
            return $q.reject(rejection);
        }
    };

    /**
     *为请求头部信息添加身份认证信息
     *config: 请求配置信息
     */
    function extendHeaders(config) {   
        //var token = $cookies.Authorization;
        //config.headers = config.headers || {};
        //if (token) {
        //    config.headers['Authorization'] = token;
        //}
    };

    /**
     *响应出错时进行错误处理
     *response: 响应信息
     */
    function responseErrorHandling(response) {   
        var result = response.data,
            errorList = [],
            msg = '';
        //根据状态码
        switch (response.status) {
            //语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。 　　
            //请求参数有误。
            case 400:
                if (result.Message) {
                    if (result.ModelState) {
                        for (var error in result.ModelState) {
                            errorList.push(result.ModelState[error]);
                        }
                    }
                }
                msg = errorList.join('<br />');
                break;

            //当前请求需要用户验证。该响应必须包含一个适用于被请求资源的 WWW-Authenticate 信息头用以询问用户信息。
            //客户端可以重复提交一个包含恰当的 Authorization 头信息的请求。如果当前请求已经包含了 Authorization 证书，
            //那么401响应代表着服务器验证已经拒绝了那些证书。如果401响应包含了与前一个响应相同的身份验证询问，
            //且浏览器已经至少尝试了一次验证，那么浏览器应当向用户展示响应中包含的实体信息，因为这个实体信息中可能包含了相关诊断信息。参见RFC 2617。
            case 401:
                msg = '您没有权限查看或者登录超时，请重新登录。';
                break;

            //服务器已经理解请求，但是拒绝执行它。与401响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。
            //如果这不是一个 HEAD 请求，而且服务器希望能够讲清楚为何请求不能被执行，那么就应该在实体内描述拒绝的原因。
            //当然服务器也可以返回一个404响应，假如它不希望让客户端获得任何信息。
            case 403:
                msg = response.data;
                break;

            //请求失败，请求所希望得到的资源未被在服务器上发现。没有信息能够告诉用户这个状况到底是暂时的还是永久的。
            //假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，
            //而且没有任何可以跳转的地址。404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下。
            case 404:
                result.Message && errorList.push(result.Message);
                result.MessageDetail && errorList.push(result.MessageDetail);

                msg = errorList.join('<br />');
                break;

            //服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。
            case 500:
                msg = '系统内部错误，请联系管理员。';
                break;

            //默认错误处理
            default:
                msg = '系统错误，请联系管理员。';
        }

        if (response.status !== 0) {
            $log.log(response.config.url, msg);
        }

       
    }
}
