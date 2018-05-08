import React from "react";

const config = {
    icon: "RowsGroup",
    label: "ROW",

    uiSchema: {
        field: "design",
        // widget: "",
        "ui:temp": ["row"]
    },
    dnd: {
        target: {
            type: ["col"],
            config: {

            }
        },
        source: {
            type: "row",
            config: {
                beginDrag(props: any) {
                    console.log(props);
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
        className: "",
        style: {
            height: 100,
            width: "100%"
        }
    },

    edit: {
        schema: {
            type: "object",
            $ref: "dnd-row#"
        },
        uiSchemaPrd: (parentKeys: string[]) => [],
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
