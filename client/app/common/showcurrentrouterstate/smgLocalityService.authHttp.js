//注入处理后的resource服务
smgLocalityService.$inject = ['resource'];
export default
function smgLocalityService(resource) {
    var actions = {
        //获取本台频道收视情况
        'getAssessment': {
            method: 'GET',
            params: {
                controller: 'CustomQuery',
                action: 'Minute'
            },
            cache: true
        },

        //获取本地市场收视占比
        'getAccountsForLocality': {
            method: 'GET',
            params: {
                controller: 'AccountsForLocality',
                action: 'Model'
            },
            cache: true
        },

        //全台收视走势
        'getChannelViewingDirection': {
            method: 'GET',
            params: {
                controller: 'ChannelViewingDirection',
                action: 'Model'
            },
            cache: true
        },

        //获取卫视全国收视情况
        'getNationalAudienceIndex': {
            method: 'GET',
            params: {
                controller: 'NationalAudienceIndex',
                action: 'Model'
            },
            cache: true
        },

        //获取全国卫视排名
        'getNationalTvRanking': {
            method: 'GET',
            params: {
                controller: 'NationalTvRanking',
                action: 'Model'
            },
            cache: true
        },

        //获取卫视城市收视
        'getChannelCityViewingDirection': {
            method: 'GET',
            params: {
                controller: 'ChannelCityViewingDirection',
                action: 'Model'
            },
            cache: true
        },

        //获取本地市场频道排名
        'getLocalTvRanking': {
            method: 'GET',
            params: {
                controller: 'LocalTvRanking',
                action: 'Model'
            },
            cache: true
        },

        //获取新闻频道本地收视
        'getLocalAudienceIndex': {
            method: 'GET',
            params: {
                controller: 'LocalAudienceIndex',
                action: 'Model'
            },
            cache: true
        }
    };

    return resource.RDplus('api/:controller/:action', {}, actions);
}