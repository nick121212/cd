
const types = ["sourcetype", "apptype", "dataconn", "dsmodel", "infographic", "preview"];

const interfaces = [];

types.forEach((type: string) => {
    interfaces.push({
        "key": type + "All",
        "method": "get",
        "path": `/${type}/getall`,
        "title": ""
    });
    interfaces.push({
        "key": type + "Detail",
        "method": "get",
        "path": `/${type}/get`,
        "title": ""
    });
    interfaces.push({
        "key": type + "Update",
        "method": "post",
        "path": `/${type}/update`,
        "title": ""
    });
    interfaces.push({
        "key": type + "Remove",
        "method": "post",
        "path": `/${type}/delete`,
        "title": ""
    });
    interfaces.push({
        "key": type + "Add",
        "method": "post",
        "path": `/${type}/add`,
        "title": ""
    });
});

interfaces.push({
    "key": "infodataOne",
    "method": "get",
    "path": "/infodata/getone"
});
interfaces.push({
    "key": "previewOne",
    "method": "get",
    "path": "/infodata/previewone"
});
interfaces.push({
    "key": "checklogin",
    "method": "get",
    "path": "/account/checklogin"
});
interfaces.push({
    "key": "getuseable",
    "method": "get",
    "path": "/dsmodel/getuseable"
});

export default {
    "engine": "fetch",
    "interfaces": interfaces,
    "key": "design",
    "mockDir": "./mocks/",
    "state": "dev",
    "states": {
        "dev": "/api1",
        "stg": "http://rsinfo-d.uat1.rs.com/api",
        "prd": "//rsinfo-d.mmall.com/api"
    },
    "title": "李晨接口配置信息"
};
