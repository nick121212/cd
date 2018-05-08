import React from "react";
import { hocFactory } from "fx-schema-form-react";
import merge from "lodash.merge";
import { compose, shouldUpdate } from "recompose";

const config = Object.assign({}, {
    icon: "BarChartVertical",
    label: "BAR",

    uiSchema: {
        field: "design",
        widget: "echart",
        "ui:temp": ["none"]
    },
    dnd: {
        target: {
            type: [],
            config: {

            }
        },
        source: {
            type: "chart",
            config: {
                beginDrag(props: any) {
                    return {};
                },
                endDrag(props, monitor) {
                    const item = monitor.getItem();
                    const dropResult = monitor.getDropResult();

                    if (dropResult && dropResult.cb) {
                        dropResult.cb(config);
                    }
                }
            }
        }
    },

    design: {
        className: "ba b--dashed b--gray",
    },
    data: {
        notMerge: true,
        lazyUpdate: true,
        theme: "",
        className: "",
        option: {
            "title": {
                "text": "标题",
                "x": "left",
                "show": true
            },
            "tooltip": {
                "trigger": "axis"
            },
            "legend": {
                "data": []
            },
            "xAxis": [{
                "type": "category",
                "name": "",
                "data": []
            }],
            "yAxis": [{
                "type": "value",
                "name": ""
            }],
            "series": []
        }
    },
    edit: {
        schema: {
            type: "object",
            $ref: "dnd-echart1"
        },
        uiSchemaPrd: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "option", "xAxis"]).join("/"),
            "ui:temp": [],
            items: [{
                key: parentKeys.concat(["data", "option", "xAxis", "-"]).join("/"),
                "ui:temp": ["none"],
                items: [{
                    key: parentKeys.concat(["data", "option", "xAxis", "-", "dataDeg"]).join("/"),
                    "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                        paths: [{ path: "/dsModelData/data" }],
                        hoc: compose(hocFactory.get("jsonataDeg")({
                            dataPath: "/dsModelData/data",
                            mergePath: "../../../../../",
                            pathKeys: ["formItemData", "option", "xAxis", "-", "data"],
                            removeKeys: ["formItemData", "option", "xAxis", "-"],
                        }), hocFactory.get("jsonPath")({
                            dataPath: "/dsModelData/data"
                        }), shouldUpdate(() => false))
                    })],
                    widget: "null",
                    field: "string"
                }]
            }]
        }, {
            key: parentKeys.concat(["data", "option", "series", "-"]).join("/"),
            "ui:temp": [],
            items: [{
                key: parentKeys.concat(["data", "option", "series", "-", "dataDeg"]).join("/"),
                "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                    paths: [{ path: "/dsModelData/data" }],
                    hoc: compose(hocFactory.get("jsonataDeg")({
                        dataPath: "/dsModelData/data",
                        mergePath: "../../../../../",
                        pathKeys: ["formItemData", "option", "series", "-", "data"],
                        removeKeys: ["formItemData", "option", "series", "-"],
                    }), hocFactory.get("jsonPath")({
                        dataPath: "/dsModelData/data"
                    }), shouldUpdate(() => false))
                })],
                widget: "null",
                field: "string"
            }]
        }],
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "option", "title"]).join("/"),
            items: [
                parentKeys.concat(["data", "option", "title", "show"]).join("/"),
                parentKeys.concat(["data", "option", "title", "text"]).join("/")
            ]
        }, {
            key: parentKeys.concat(["data", "option", "xAxis"]).join("/"),
            "ui:temp": ["card"],
            title: "横轴设置",
            options: {
                hoc: {
                    array: {
                        add: true
                    }
                }
            },
            items: [{
                key: parentKeys.concat(["data", "option", "xAxis", "-"]).join("/"),
                "ui:temp": ["none"],
                items: [{
                    key: parentKeys.concat(["data", "option", "xAxis", "-", "type"]).join("/"),
                    "ui:temp": ["formItem"]
                }, {
                    key: parentKeys.concat(["data", "option", "xAxis", "-", "name"]).join("/"),
                    "ui:temp": ["formItem"]
                }, {
                    key: parentKeys.concat(["data", "option", "xAxis", "-", "dataDeg"]).join("/"),
                    "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                        paths: [{ path: "/dsModelData/data" }],
                        hoc: compose(hocFactory.get("jsonataDeg")({
                            dataPath: "/dsModelData/data",
                            mergePath: "../../../../../",
                            pathKeys: ["formItemData", "option", "xAxis", "-", "data"],
                            removeKeys: ["formItemData", "option", "xAxis", "-"],
                        }), hocFactory.get("jsonPath")({
                            dataPath: "/dsModelData/data"
                        }), shouldUpdate(() => false))
                    })],
                    widget: "mention",
                    field: "string",
                    options: {
                        field: {
                            normal: {
                                hocs: [hocFactory.get("meta")({ keys: ["widgetOptions"] })]
                            }
                        },
                        widget: {
                            mention: {
                                mention: {
                                    data: []
                                }
                            }
                        }
                    }
                }]
            }]
        }, {
            key: parentKeys.concat(["data", "option", "yAxis"]).join("/"),
            "ui:temp": ["card"],
            title: "纵轴设置",
            options: {
                hoc: {
                    array: {
                        add: true
                    }
                }
            },
            items: [{
                key: parentKeys.concat(["data", "option", "yAxis", "-"]).join("/"),
                "ui:temp": ["none"],
                items: [{
                    key: parentKeys.concat(["data", "option", "yAxis", "-", "type"]).join("/"),
                    "ui:temp": ["formItem"]
                }, {
                    key: parentKeys.concat(["data", "option", "yAxis", "-", "name"]).join("/"),
                    "ui:temp": ["formItem"]
                }]
            }]
        }, {
            key: parentKeys.concat(["data", "option", "series"]).join("/"),
            "ui:temp": ["card"],
            title: "曲线设置",
            options: {
                hoc: {
                    array: {
                        itemFormatData: {
                            type: "bar"
                        }
                    }
                }
            },
            items: [{
                key: parentKeys.concat(["data", "option", "series", "-"]).join("/"),
                "ui:temp": ["card"],
                items: [{
                    key: parentKeys.concat(["data", "option", "series", "-", "name"]).join("/"),
                }, {
                    key: parentKeys.concat(["data", "option", "series", "-", "dataDeg"]).join("/"),
                    "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                        paths: [{ path: "/dsModelData/data" }],
                        hoc: compose(hocFactory.get("jsonataDeg")({
                            dataPath: "/dsModelData/data",
                            mergePath: "../../../../../",
                            pathKeys: ["formItemData", "option", "series", "-", "data"],
                            removeKeys: ["formItemData", "option", "series", "-"],
                        }), hocFactory.get("jsonPath")({
                            dataPath: "/dsModelData/data"
                        }), shouldUpdate(() => false))
                    })],
                    widget: "mention",
                    field: "string",
                    options: {
                        field: {
                            normal: {
                                hocs: [hocFactory.get("meta")({ keys: ["widgetOptions"] })]
                            }
                        },
                        widget: {
                            mention: {
                                mention: {
                                    data: []
                                }
                            }
                        }
                    }
                }]
            }]
        }]
    }
});

export default config;
