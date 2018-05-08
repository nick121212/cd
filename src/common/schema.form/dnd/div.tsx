import React from "react";

const config = {
    icon: "Checkbox",
    label: "DIV",

    uiSchema: {
        field: "design",
        "ui:temp": ["rnd"]
    },
    dnd: {
        target: {
            type: ["chart", "content", "row", "image", "hr", "html"],
            config: {

            }
        },
        source: {
            type: "div",
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
        className: "overflow-auto",
        size: {
            width: 100,
            height: 100
        },
        position: {
            x: 0, y: 0
        }
    },

    edit: {
        schema: {
            type: "object",
            $ref: "dnd-div"
        },
        uiSchemaPrd: () => [],
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "position"]).join("/"),
            field: "object",
            title: "位置信息",
            "ui:temp": ["card", "row"],
            items: [{
                key: parentKeys.concat(["data", "position", "x"]).join("/"),
                title: "x",
                "ui:temp": ["col", "formItem"],
            }, {
                key: parentKeys.concat(["data", "position", "y"]).join("/"),
                title: "y",
                "ui:temp": ["col", "formItem"],
            }]
        }, {
            key: parentKeys.concat(["data", "size"]).join("/"),
            field: "object",
            title: "尺寸信息",
            "ui:temp": ["card", "row"],
            items: [{
                key: parentKeys.concat(["data", "size", "width"]).join("/"),
                title: "宽度",
                "ui:temp": ["col", "formItem"],
            }, {
                key: parentKeys.concat(["data", "size", "height"]).join("/"),
                title: "高度",
                "ui:temp": ["col", "formItem"],
            }]
        }]
    }
};

export default config;
