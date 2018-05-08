import React from "react";

const config = {
    icon: "Checkbox",
    label: "ROOT",

    uiSchema: {
        field: "design",
        "ui:temp": ["div"]
    },
    dnd: {
        target: {
            type: ["div", "chart", "row", "content", "image", "hr", "html"],
            config: {

            }
        },
        source: {
            type: "root",
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
        className: "ba b--dashed b--gray root",
    },

    data: {
        className: "w-100 overflow-auto h-auto root",
        style: {
            height: "100%"
        }
    },

    edit: {
        schema: {
            type: "object",
            $ref: "dnd-row#"
        },
        uiSchemaPrd: () => [],
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "className"]).join("/")
        }, {
            key: parentKeys.concat(["data", "style"]).join("/"),
            "ui:temp": ["card"],
            title: "属性设置",
            items: [{
                key: parentKeys.concat(["data", "style", "width"]).join("/")
            }, {
                key: parentKeys.concat(["data", "style", "height"]).join("/")
            }]
        }]
    }
};

export default config;
