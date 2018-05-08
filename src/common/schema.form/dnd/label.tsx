import React from "react";
import { hocFactory } from "fx-schema-form-react";
import { compose, shouldUpdate } from "recompose";

const config = {
    icon: "Label",
    label: "LABEL",

    uiSchema: {
        field: "design",
        widget: "label",
        "ui:temp": ["none"]
    },
    dnd: {
        target: {
            type: [],
            config: {

            }
        },
        source: {
            type: "content",
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
        text: "LABEL",
        style: {
            fontSize: 12,
            height: "auto",
            minHeight: 20
        }
    },

    edit: {
        schema: {
            type: "object",
            properties: {
                text: {
                    $ref: "dnd-common#/properties/deg",
                    title: "显示文本"
                },
                style: {
                    type: "object",
                    $ref: "dnd-style#/"
                }
            }
        },
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "text"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonataDeg")({
                    dataPath: "/dsModelData/data",
                    mergePath: "../../",
                    pathKeys: ["formItemData", "text"],
                    removeKeys: ["formItemData", "text"],
                    replace: true
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
            key: parentKeys.concat(["data", "style"]).join("/"),
            "ui:temp": ["card"],
            title: "属性设置",
            items: [{
                key: parentKeys.concat(["data", "style", "fontSize"]).join("/")
            }, {
                key: parentKeys.concat(["data", "style", "textAlign"]).join("/")
            }]
        }]
    }
};

export default config;
