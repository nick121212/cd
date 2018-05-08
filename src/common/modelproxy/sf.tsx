export default {
    "engine": "jsonp",
    "interfaces": [{
        "key": "queryFilter",
        "method": "get",
        "path": "/queryFilter/list",
        "title": "调用scehma的插件"
    }, {
        "key": "checklogin",
        "method": "get",
        "path": "/login/isLogin",
        "title": "是否登录"
    }, {
        "key": "findUserRole",
        "method": "get",
        "path": "/user/findUserRole",
        "title": "获取权限"
    }],
    "key": "sf",
    "mockDir": "./mocks/",
    "state": "dev",
    "states": {
        "dev": "http://authority.uat1.rs.com/api",
        "stg": "http://authority.uat1.rs.com/api",
        "prd": "//authority.mmall.com/api"
    },
    "title": "webapi接口数据"
};
