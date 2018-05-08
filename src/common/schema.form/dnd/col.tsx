import React from "react";

const config = {
    icon: "TripleColumn",
    label: "COL",

    uiSchema: {
        field: "design",
        // widget: "",
        "ui:temp": ["col"]
    },
    dnd: {
        target: {
            type: ["chart", "image", "content", "row", "hr", "html"],
            config: {

            }
        },
        source: {
            type: "col",
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
        className: "ma0 pa0",
        style: {
            height: 100,
            // width: 100
        },
        small: {
            span: 4,
            pull: 0,
            push: 0
        },
        large: {
            span: 0,
            pull: 0,
            push: 0
        },
        medium: {
            span: 0,
            pull: 0,
            push: 0
        }, eLarge: {
            span: 0,
            pull: 0,
            push: 0
        }, eeLarge: {
            span: 0,
            pull: 0,
            push: 0
        }, eeeLarge: {
            span: 0,
            pull: 0,
            push: 0
        }
    },

    edit: {
        schema: {
            type: "object",
            $ref: "dnd-col#"
        },
        uiSchemaPrd: (parentKeys: string[]) => [],
        uiSchema: (parentKeys: string[]) => [
            parentKeys.concat(["data", "className"]).join("/"),
            {
                key: parentKeys.concat(["data", "style"]).join("/"),
                "ui:temp": ["card"],
                title: "属性设置",
                items: [{
                    key: parentKeys.concat(["data", "style", "width"]).join("/")
                }, {
                    key: parentKeys.concat(["data", "style", "height"]).join("/")
                }]
            },
            {
                field: "object",
                title: "",
                "ui:temp": ["row"],
                options: {
                    col: {
                        className: "pa0 ma0"
                    }
                },
                items: [{
                    key: parentKeys.concat(["data", "small"]).join("/"),
                    "ui:temp": ["col", "card", "row"],
                    options: {
                        col: {
                            className: "ms-sm12"
                        }
                    },
                    items: [{
                        key: parentKeys.concat(["data", "small", "span"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }, {
                        key: parentKeys.concat(["data", "small", "pull"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }, {
                        key: parentKeys.concat(["data", "small", "push"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }]
                }, {
                    key: parentKeys.concat(["data", "medium"]).join("/"),
                    "ui:temp": ["col", "card", "row"],
                    options: {
                        col: {
                            className: "ms-sm12"
                        }
                    },
                    items: [{
                        key: parentKeys.concat(["data", "medium", "span"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }, {
                        key: parentKeys.concat(["data", "medium", "pull"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }, {
                        key: parentKeys.concat(["data", "medium", "push"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }]
                }, {
                    key: parentKeys.concat(["data", "large"]).join("/"),
                    "ui:temp": ["col", "card", "row"],
                    options: {
                        col: {
                            className: "ms-sm12"
                        }
                    },
                    items: [{
                        key: parentKeys.concat(["data", "large", "span"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }, {
                        key: parentKeys.concat(["data", "large", "pull"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }, {
                        key: parentKeys.concat(["data", "large", "push"]).join("/"),
                        "ui:temp": ["col", "formItem"],
                        options: {
                            col: {
                                className: "ms-sm4"
                            }
                        },
                    }]
                }]
            }
        ]
    }
};

export default config;
