import React from "react";
import { hocFactory } from "fx-schema-form-react";
import { compose, shouldUpdate } from "recompose";

const config = {
    icon: "list",
    label: "LIST",

    uiSchema: {
        field: "design",
        widget: "list",
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
        items: [],
        columns: []
    },

    edit: {
        schema: {
            type: "object",
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "object"
                    }
                },
                itemsDeg: {
                    type: "string",
                    $ref: "dnd-common#/properties/deg"
                },
                columns: {
                    type: "array",
                    title: "表格列",
                    items: {
                        type: "object",
                        properties: {
                            fieldName: { type: "string" },
                            key: { type: "string" },
                            name: { type: "string" },
                            currentWidth: { type: "number" }
                        }
                    }
                }
            }
        },
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "itemsDeg"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonataDeg")({
                    dataPath: "/dsModelData/data",
                    mergePath: "../../",
                    pathKeys: ["formItemData", "items"],
                    removeKeys: ["formItemData", "items"]
                }), shouldUpdate(() => false))
            }), hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonPath")({
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
            key: parentKeys.concat(["data", "columns"]).join("/"),
            items: [{
                key: parentKeys.concat(["data", "columns", "-"]).join("/"),
            }]
        }]
    }
};

export default config;
