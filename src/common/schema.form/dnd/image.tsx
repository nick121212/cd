import React from "react";
import { hocFactory } from "fx-schema-form-react";
import { compose, shouldUpdate } from "recompose";

const config = {
    icon: "FileImage",
    label: "IMAGE",

    uiSchema: {
        field: "design",
        widget: "image",
        "ui:temp": ["none"]
    },
    dnd: {
        target: {
            type: [],
            config: {

            }
        },
        source: {
            type: "image",
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
        className: "",
        imageFit: 3,
        style: {
            minHeight: "100%"
        }
    },

    edit: {
        schema: {
            type: "object",
            properties: {
                className: {
                    type: "string"
                },
                coverStyle: {
                    type: "number"
                },
                imageFit: {
                    type: "number"
                },
                link: {
                    type: "string"
                },
                srcs: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                title: {
                    type: "string",
                    $ref: "dnd-common#/properties/deg",
                },
                srcsDeg: {
                    type: "string",
                    $ref: "dnd-common#/properties/deg",
                },
                style: {
                    type: "object",
                    properties: {
                        width: { type: "string" },
                        height: { type: "string" }
                    }
                }
            }
        },
        uiSchemaPrd: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "srcsDeg"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonataDeg")({
                    dataPath: "/dsModelData/data",
                    mergePath: "../../",
                    pathKeys: ["formItemData", "srcs"],
                    removeKeys: ["formItemData", "srcs"]
                }), shouldUpdate(() => false))
            })],
            widget: "null",
            field: "string"
        }, {
            key: parentKeys.concat(["data", "title"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonataDeg")({
                    dataPath: "/dsModelData/data",
                    mergePath: "../../",
                    pathKeys: ["formItemData", "title"],
                    removeKeys: ["formItemData", "title"],
                    replace: true
                }), shouldUpdate(() => false))
            })],
            widget: "null",
            field: "string"
        }],
        uiSchema: (parentKeys: string[]) => [{
            key: parentKeys.concat(["data", "className"]).join("/")
        }, {
            key: parentKeys.concat(["data", "link"]).join("/")
        }, {
            key: parentKeys.concat(["data", "imageFit"]).join("/"),
            widget: "combobox",
            options: {
                widget: {
                    combobox: {
                        options: [{
                            key: 0,
                            text: "center"
                        }, {
                            key: 1,
                            text: "contain"
                        }, {
                            key: 2,
                            text: "cover"
                        }, {
                            key: 3,
                            text: "none"
                        }]
                    }
                }
            }
        },
        {
            key: parentKeys.concat(["data", "coverStyle"]).join("/"),
            widget: "combobox",
            options: {
                widget: {
                    combobox: {
                        options: [{
                            key: 0,
                            text: "landscape"
                        }, {
                            key: 1,
                            text: "portrait"
                        }]
                    }
                }
            }
        },
        {
            key: parentKeys.concat(["data", "srcsDeg"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonataDeg")({
                    dataPath: "/dsModelData/data",
                    mergePath: "../../",
                    pathKeys: ["formItemData", "srcs"],
                    removeKeys: ["formItemData", "srcs"]
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
        },
        {
            key: parentKeys.concat(["data", "title"]).join("/"),
            "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                paths: [{ path: "/dsModelData/data" }],
                hoc: compose(hocFactory.get("jsonataDeg")({
                    dataPath: "/dsModelData/data",
                    mergePath: "../../",
                    pathKeys: ["formItemData", "title"],
                    removeKeys: ["formItemData", "title"],
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
        }]
    }
};

export default config;
