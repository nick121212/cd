import React from "react";
import { hocFactory } from "fx-schema-form-react";
import { compose, shouldUpdate } from "recompose";

const config = {
    icon: "Split",
    label: "HR",

    uiSchema: {
        field: "design",
        widget: "hr",
        "ui:temp": ["none"]
    },
    dnd: {
        target: {
            type: [],
            config: {

            }
        },
        source: {
            type: "hr",
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
        className: "style-two"
    },

    edit: {
        schema: {
            type: "object",
            properties: {
                className: {
                    type: "string",
                    enum: ["style-one", "style-two", "style-three",
                        "style-four", "style-five", "style-six", "style-server", "style-eight"],
                    title: "内容说明"
                }
            }
        },
        uiSchemaPrd: () => [],
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "className"]).join("/"),
            field: "string",
            widget: "combobox",
            options: {
                widget: {
                    combobox: {
                        options: ["style-one", "style-two", "style-three",
                            "style-four", "style-five", "style-six", "style-server", "style-eight"].map((s: string) => {
                                return {
                                    key: s,
                                    text: s
                                };
                            })
                    }
                }
            }
        }]
    }
};

export default config;
