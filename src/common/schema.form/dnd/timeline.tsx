import React from "react";
import { hocFactory } from "fx-schema-form-react";
import merge from "lodash.merge";
import { compose, shouldUpdate } from "recompose";

const config = Object.assign({}, {
    icon: "Timeline",
    label: "TIMELINE",

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
        theme: "dark",
        className: "",
        option: {
            baseOption: {
                timeline: {
                    show: true,
                    axisType: "category",
                    autoPlay: true,
                    playInterval: 1000,
                    data: []
                },
                title: {
                    text: "",
                    show: true
                },
                tooltip: {
                    "trigger": "axis"
                },
                legend: {
                    x: "right",
                    data: [],
                },
                series: [],
                xAxis: [{
                    type: "category",
                    axisLabel: { interval: 0 },
                    data: [],
                    splitLine: { show: false }
                }],
                yAxis: [{
                    type: "value",
                    name: "",
                }]
            },
            options: []
        }
    },
    edit: {
        schema: {
            type: "object",
            $ref: "dnd-echart2"
        },
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "theme"]).join("/")
        }, {
            key: parentKeys.concat(["data", "className"]).join("/")
        }, {
            key: parentKeys.concat(["data", "option", "baseOption"]).join("/"),
            title: "基础设置",
            items: [{
                key: parentKeys.concat(["data", "option", "baseOption", "tooltip"]).join("/"),
                "ui:temp": ["card"],
                title: "提示设置"
            }, {
                key: parentKeys.concat(["data", "option", "baseOption", "series"]).join("/"),
                "ui:temp": ["card"],
                title: "曲线设置",
                items: [{
                    key: parentKeys.concat(["data", "option", "baseOption", "series", "-"]).join("/"),
                    "ui:temp": ["card"],
                    items: [{
                        key: parentKeys.concat(["data", "option", "baseOption", "series", "-", "name"]).join("/"),
                    }, {
                        key: parentKeys.concat(["data", "option", "baseOption", "series", "-", "label"]).join("/"),
                    }, {
                        key: parentKeys.concat(["data", "option", "baseOption", "series", "-", "type"]).join("/"),
                    }]
                }]
            }, {
                key: parentKeys.concat(["data", "option", "baseOption", "xAxis"]).join("/"),
                title: "横轴设置",
                items: [{
                    key: parentKeys.concat(["data", "option", "baseOption", "xAxis", "-"]).join("/"),
                    items: [{
                        key: parentKeys.concat(["data", "option", "baseOption", "xAxis", "-", "type"]).join("/"),
                    }, {
                        key: parentKeys.concat(["data", "option", "baseOption", "xAxis", "-", "name"]).join("/"),
                    }, {
                        key: parentKeys.concat(["data", "option", "baseOption", "xAxis", "-", "dataDeg"]).join("/"),
                        "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                            paths: [{ path: "/dsModelData/data" }],
                            hoc: compose(hocFactory.get("jsonataDeg")({
                                dataPath: "/dsModelData/data",
                                mergePath: "../../../../../../",
                                pathKeys: ["formItemData", "option", "baseOption", "xAxis", "-", "data"],
                                removeKeys: ["formItemData", "option", "baseOption", "xAxis", "-"],
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
                key: parentKeys.concat(["data", "option", "baseOption", "yAxis"]).join("/"),
                title: "纵轴设置",
                items: [{
                    key: parentKeys.concat(["data", "option", "baseOption", "yAxis", "-"]).join("/"),
                    items: [{
                        key: parentKeys.concat(["data", "option", "baseOption", "yAxis", "-", "type"]).join("/"),
                    }, {
                        key: parentKeys.concat(["data", "option", "baseOption", "yAxis", "-", "name"]).join("/"),
                    }, {
                        key: parentKeys.concat(["data", "option", "baseOption", "yAxis", "-", "dataDeg"]).join("/"),
                        "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                            paths: [{ path: "/dsModelData/data" }],
                            hoc: compose(hocFactory.get("jsonataDeg")({
                                dataPath: "/dsModelData/data",
                                mergePath: "../../../../../../",
                                pathKeys: ["formItemData", "option", "baseOption", "yAxis", "-", "data"],
                                removeKeys: ["formItemData", "option", "baseOption", "yAxis", "-"],
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
                key: parentKeys.concat(["data", "option", "baseOption", "legend"]).join("/"),
                title: "标尺设置",
                items: [{
                    key: parentKeys.concat(["data", "option", "baseOption", "legend", "x"]).join("/"),
                }, {
                    key: parentKeys.concat(["data", "option", "baseOption", "legend", "y"]).join("/"),
                }, {
                    key: parentKeys.concat(["data", "option", "baseOption", "legend", "dataDeg"]).join("/"),
                    "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                        paths: [{ path: "/dsModelData/data" }],
                        hoc: compose(hocFactory.get("jsonataDeg")({
                            dataPath: "/dsModelData/data",
                            mergePath: "../../../../../",
                            pathKeys: ["formItemData", "option", "baseOption", "legend", "data"],
                            removeKeys: ["formItemData", "option", "baseOption", "legend"],
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
            }, {
                key: parentKeys.concat(["data", "option", "baseOption", "timeline"]).join("/"),
                items: ["*", {
                    key: parentKeys.concat(["data", "option", "baseOption", "timeline", "data"]).join("/"),
                    widget: "null",
                    field: "string",
                }, {
                        key: parentKeys.concat(["data", "option", "baseOption", "timeline", "dataDeg"]).join("/"),
                        "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                            paths: [{ path: "/dsModelData/data" }],
                            hoc: compose(hocFactory.get("jsonataDeg")({
                                dataPath: "/dsModelData/data",
                                mergePath: "../../../../../",
                                pathKeys: ["formItemData", "option", "baseOption", "timeline", "data"],
                                removeKeys: ["formItemData", "option", "baseOption", "timeline", "data"],
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
            key: parentKeys.concat(["data", "option", "optionsDeg"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonataDeg")({
                    dataPath: "/dsModelData/data",
                    mergePath: "../../../",
                    pathKeys: ["formItemData", "option", "options"],
                    removeKeys: ["formItemData", "option", "options"],
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
        }, {
            key: parentKeys.concat(["data", "option", "options"]).join("/"),
            title: "数据参数设置",
            items: [{
                key: parentKeys.concat(["data", "option", "options", "-"]).join("/"),
                "ui:temp": ["card"],
                items: [{
                    key: parentKeys.concat(["data", "option", "options", "-", "title"]).join("/"),
                    items: [{
                        key: parentKeys.concat(["data", "option", "options", "-", "title", "show"]).join("/")
                    }, {
                        key: parentKeys.concat(["data", "option", "options", "-", "title", "text"]).join("/")
                    }]
                }, {
                    key: parentKeys.concat(["data", "option", "options", "-", "series"]).join("/"),
                    items: [{
                        key: parentKeys.concat(["data", "option", "options", "-", "series", "-"]).join("/"),
                        "ui:temp": ["card"],
                        items: [{
                            key: parentKeys.concat(["data", "option", "options", "-", "series", "-", "name"]).join("/"),
                        }, {
                            key: parentKeys.concat(["data", "option", "options", "-", "series", "-", "data"]).join("/"),
                            widget: "code",
                            field: "string"
                        }]
                    }]
                }]
            }]
        }]
    }
});

export default config;
