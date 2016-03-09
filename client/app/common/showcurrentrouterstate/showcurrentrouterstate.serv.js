let baseUrl="http://baidu.com"; 

Service.$inject = ['$http'];
export default
function Service($http) {
    return { 
        //1:发送手机验证码{'phoneNum':'手机号码'} 
        //2:注册,不需要密码{'phoneNum':'手机号码','yanZhengMa':'手机验证码'} 
        //3:注册,需要密码{'phoneNum':'手机号码','yanZhengMa':'手机验证码','password':'注册登陆密码'} 
        //4:手机号登陆,验证码方式{'phoneNum':'手机号码','yanZhengMa':'手机验证码'} 
        //5:手机号登陆,密码方式{'phoneNum':'手机号码','password':'注册登陆密码'} 
        //6:邮箱注册,发送注册链接{'email':'注册的电子邮箱'} 
        //7:邮箱注册,验证邮箱中的链接{'email':'注册的电子邮箱','password':'注册登陆密码','tempKey':'邮箱链接中的临时码'} 
        //8:邮箱登陆{'email':'注册的电子邮箱','password':'注册登陆密码'}
        //9:手机重置密码,验证手机号是否注册，并发送验证码{'phoneNum':'手机号码'} 
        //10:手机重置密码,检测验证码并重置密码{'phoneNum':'手机号码','yanZhengMa':'手机验证码','password':'注册登陆密码'} 
        //11:邮箱重置密码,发送邮件{'email':'注册的电子邮箱'}
        //12:邮箱重置密码,验证邮箱中的链接并重置密码{'email':'注册的电子邮箱','password':'注册登陆密码','tempKey':'邮箱链接中的临时码'} 
        //13：登陆状态下重置密码，head里面带token{'Password':'原密码','newPassword':'新密码'}
        account: {
            //发送邮件到注册邮箱
            sendRegisterEmail: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=6";
                return $http.post(url, conditions)
            },
            //邮箱注册
            emailRegisterIng: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=7";
                return $http.post(url, conditions)
            },
            //邮箱登陆
            emailLogin: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=8";
                return $http.post(url, conditions)
            },
            //获取手机验证码
            getVerifyCode: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=1";
                return $http.post(url, conditions)
            },
            //手机号注册接口
            phoneRegister: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=3";
                return $http.post(url, conditions)
            },
            //手机登录
            phoneLogin: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=5";
                return $http.post(url, conditions)
            },
            phoneResetPwd: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=10";
                return $http.post(url, conditions)
            },
            emailResetPwd: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=11";
                return $http.post(url, conditions)
            },
            emailResetPwdIng: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=12";
                return $http.post(url, conditions)
            },
            changePwd: function (conditions) {
                var url = baseUrl + "/api/Account/AccountService?apiType=13";
                return $http.post(url, conditions)
            }
        }
    };
} 