import React from "react";
import { hocFactory } from "fx-schema-form-react";
import merge from "lodash.merge";
import { compose, shouldUpdate } from "recompose";

const config = Object.assign({}, {
    icon: "PieDouble",
    label: "PIE",

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
                "show": false,
                "type": "category",
                "name": "",
                "data": []
            }],
            "yAxis": [{
                "show": false,
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
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "option", "title"]).join("/"),
            items: [
                parentKeys.concat(["data", "option", "title", "show"]).join("/"),
                parentKeys.concat(["data", "option", "title", "text"]).join("/"),
                parentKeys.concat(["data", "option", "title", "x"]).join("/"),
                parentKeys.concat(["data", "option", "title", "y"]).join("/")
            ]
        }, {
            key: parentKeys.concat(["data", "option", "series"]).join("/"),
            "ui:temp": ["card"],
            title: "曲线设置",
            options: {
                hoc: {
                    array: {
                        itemFormatData: {
                            type: "pie",
                            radius: [
                                "25%",
                                "58%"
                            ],
                            label: {
                                "normal": {
                                    "position": "outer",
                                    "formatter": "{d}%",
                                    "textStyle": {
                                        "color": "#000",
                                        "fontWeight": "bold",
                                        "fontSize": 14
                                    }
                                }
                            },
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
                    key: parentKeys.concat(["data", "option", "series", "-", "color"]).join("/"),
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
