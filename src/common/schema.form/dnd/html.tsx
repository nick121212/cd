import React from "react";
import { hocFactory } from "fx-schema-form-react";
import { compose, shouldUpdate } from "recompose";

const config = {
    icon: "FileHTML",
    label: "HTML",

    uiSchema: {
        field: "design",
        widget: "html",
        "ui:temp": ["none"]
    },
    dnd: {
        target: {
            type: [],
            config: {

            }
        },
        source: {
            type: "html",
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
        className: "",
    },

    data: {
        html: "<h1>Html parser</h1>"
    },

    edit: {
        schema: {
            type: "object",
            properties: {
                html: {
                    type: "string",
                    title: "HTML内容"
                }
            }
        },
        uiSchemaPrd: () => [],
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "html"]).join("/")
        }]
    }
};

export default config;
