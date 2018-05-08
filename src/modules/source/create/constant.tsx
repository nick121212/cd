import React from "react";
import Immutable from "immutable";
import { RouteComponentProps } from "react-router-dom";
import { FormReducer, createForms, SchemaFormItemProps } from "fx-schema-form-react";
import { hocFactory } from "fx-schema-form-react/libs/hocs";

import proxy from "../../../libs/proxy";
import { ModelProxyReducer } from "../../../common/reducer/proxy";
import { rootReducerKey } from "../constant";
import { PaginationReducer } from "../../../common/reducer/pagination";
import { ConfirmComponent, ConfirmWidgetProps } from "../../../common/widgets/confirm/index";
import { globalOptions, schemaFormOptions, ajv } from "../../../common/schema.form/index";

export const reducerKey = "create";
export const reducerKeys = ["modules", rootReducerKey, reducerKey];
export interface SourceCreatePropsRaw {
    /**
     * 更细数据
     */
    $updateProxyModel?: Immutable.Map<string, any>;
    /**
     * 更新数据
     */
    updateHandle?: () => Promise<any>;
    createHandle?: () => Promise<any>;
    saveHandle?: () => Promise<any>;
    validateForm?: (data: any) => Promise<any>;

    $schemaForm?: Immutable.Map<string, any>;
}
export interface SourceCreateProps extends SourceCreatePropsRaw, RouteComponentProps<any> {

}
export const proxySettings = {
    create: { ns: "design", key: "dsmodelAdd" },
    update: { ns: "design", key: "dsmodelUpdate" },
    detail: { ns: "design", key: "dsmodelDetail" }
};
export const $InitialState = Immutable.fromJS({
});
export const updateProxyModel = new ModelProxyReducer();

export const formOptions = {
    schemaKey: "$createSchemaForm",
    schema: {
        type: "object",
        required: ["name", "type", "dsOption"],
        properties: {
            id: { type: "number", default: 0 },
            name: { type: "string", minLength: 2, title: "连接名称", description: "连接名称只能是英文，数据和下划线" },
            type: { type: "string", title: "应用类型" },
            timeGap: { type: "number", title: "刷新时长", description: "单位为(ms)" },
            infographicId: { type: "number" },
            dsOption: {
                type: "object",
                default: {},
                properties: {
                    menuId: { type: "number", title: "数坊中数据源ID" },
                    parentMenuId: { type: "number" },
                    p_type: { type: "string", title: "流量报表类型" },
                    sourceType: { type: "string", title: "数据源类型" },
                    params: {
                        type: "array",
                        title: "参数设定",
                        default: [],
                        items: {
                            type: "object",
                            required: ["name", "type", "data"],
                            properties: {
                                name: { type: "string", title: "参数名称" },
                                type: { type: "string", enum: ["period", "dimension", "fixed"], title: "参数类型" },
                                data: {
                                    title: "额外参数配置",
                                    oneOf: [{
                                        default: {},
                                        type: "object",
                                        title: "固定参数-fixed",
                                        required: ["value"],
                                        properties: {
                                            value: { type: "string", title: "参数默认值" }
                                        }
                                    }, {
                                        type: "object",
                                        default: {},
                                        title: "维度参数-dimension",
                                        required: ["dataFieldName", "correspondField"],
                                        properties: {
                                            dataFieldName: { type: "string", title: "数据字段" },
                                            correspondField: {
                                                type: "string", title: "身份字段",
                                                enum: ["mall_code", "city_id"]
                                            }
                                        }
                                    }, {
                                        type: "object",
                                        default: {},
                                        title: "周期性参数-period",
                                        required: ["correspondValue"],
                                        properties: {
                                            correspondValue: {
                                                default: {},
                                                type: "object",
                                                required: ["dataType", "initialValue", "periodGap"],
                                                properties: {
                                                    dataType: { type: "string", title: "类型" },
                                                    initialValue: { type: "string", title: "初始值" },
                                                    periodGap: {
                                                        type: "object",
                                                        required: ["value", "unit"],
                                                        properties: {
                                                            value: { type: "number", title: "增量" },
                                                            unit: { type: "string", title: "单位" }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }]
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    uiSchema: [
        "name",
        "timeGap",
        {
            key: "type",
            "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
            widget: "choice",
            options: {
                hoc: {
                    proxy: {
                        ns: "design",
                        key: "apptypeAll",
                        property: "options",
                        jsonata: `
                        $$.content[].{
                            "key": $.appName,
                            "text": $.description
                        }
                    `,
                        options: {
                            params: {
                                page: 0,
                                size: 10000
                            }
                        }
                    }
                },
                widget: {
                    combobox: {
                        autoComplete: "on",
                        allowFreeform: true
                    }
                }
            }
        },
        // {
        //     key: "dsOption/sourceType",
        //     "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
        //     widget: "combobox",
        //     options: {
        //         hoc: {
        //             proxy: {
        //                 ns: "design",
        //                 key: "sourcetypeAll",
        //                 property: "options",
        //                 jsonata: `
        //                 $$.content[].{
        //                     "key": $.name,
        //                     "text": $.cname
        //                 }
        //             `,
        //                 options: {
        //                     params: {
        //                         page: 0,
        //                         size: 10000
        //                     }
        //                 }
        //             }
        //         },
        //         widget: {
        //             combobox: {
        //                 autoComplete: "on",
        //                 allowFreeform: true
        //             }
        //         }
        //     }
        // },
        // {
        //     key: "infographicId",
        //     "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
        //     widget: "combobox",
        //     options: {
        //         hoc: {
        //             proxy: {
        //                 ns: "design",
        //                 key: "infographicAll",
        //                 property: "options",
        //                 jsonata: `
        //                 $$.content[].{
        //                     "key": $.id,
        //                     "text": $.name & "-" & $.appType
        //                 }
        //             `,
        //                 options: {
        //                     params: {
        //                         page: 0,
        //                         size: 10000
        //                     }
        //                 }
        //             }
        //         },
        //         widget: {
        //             combobox: {
        //                 autoComplete: "on",
        //                 allowFreeform: true
        //             }
        //         }
        //     }
        // },
        {
            key: "dsOption/p_type",
            "ui:item.hoc": ["theme", "field", "validate", hocFactory.get("con")({
                paths: [{ path: "/type" }],
                hoc: hocFactory.get("sh")({ path: "/type", jsonata: "$='APPFLOWDATA'" })
            }), "temp"],
        },
        {
            key: "dsOption/menuId",
            "ui:item.hoc": ["theme", "field", "validate", hocFactory.get("con")({
                paths: [{ path: "/type" }],
                hoc: hocFactory.get("sh")({ path: "/type", jsonata: "$!='APPFLOWDATA'" })
            }), "temp", "proxy"],
            widget: "combobox",
            options: {
                hoc: {
                    proxy: {
                        ns: "design",
                        key: "dataconnAll",
                        property: "options",
                        jsonata: `
                            $$.content[].{
                                "key": $.id,
                                "text": $.connName,
                                "parentMenuId":$.resourceId
                            }
                        `,
                        options: {
                            params: {
                                page: 0,
                                size: 10000
                            }
                        }
                    }
                },
                widget: {
                    combobox: {
                        autoComplete: "on",
                        allowFreeform: true,
                        onChanged: async (props: any, options: any, index: number, value: any) => {
                            if (index !== undefined) {
                                props.actions.updateItem({
                                    keys: props.getPathKeys(props.mergeSchema.keys, "./parentMenuId"),
                                    data: options.parentMenuId
                                });

                                props.actions.removeItemMap({
                                    keys: props.getPathKeys(props.mergeSchema.keys, "./params")
                                });

                                let data: Array<any> = await proxy.execute("sf", "queryFilter", {
                                    params: {
                                        app_key: "sgqphph6YdybP455",
                                        id: options.parentMenuId
                                    }
                                }).then((d: Array<any>) => {
                                    if (d && d.length) {
                                        d.forEach((element, idx) => {
                                            if (element.values) {
                                                props.actions.updateItemMeta({
                                                    keys: props.getPathKeys(props.mergeSchema.keys, "./params")
                                                        .concat([idx, "data", "value"]),
                                                    meta: {
                                                        options: element.values.map((e) => {
                                                            return {
                                                                key: e.code,
                                                                text: e.name
                                                            };
                                                        })
                                                    }
                                                });
                                            }
                                        });
                                    }

                                    return d;
                                });

                                props.actions.updateItem({
                                    keys: props.getPathKeys(props.mergeSchema.keys, "./params"),
                                    data: data ? data.map(element => {
                                        return {
                                            name: element.parameterCode,
                                            widget: element.display,
                                            title: element.parameterName
                                        };
                                    }) : []
                                });
                            }
                        }
                    }
                }
            }
        }, {
            key: "dsOption/params",
            "ui:item.hoc": ["theme", "field", "validate", "array", hocFactory.get("con")({
                paths: [{ path: "./menuId", jsonata: "$>0" }],
                hoc: hocFactory.get("sh")({ path: "./menuId", jsonata: "$" })
            }), "temp"],
            options: {
                hoc: {
                    array: {
                        add: true
                    }
                }
            },
            items: [{
                key: "dsOption/params/-",
                field: "object",
                "ui:temp": ["card"],
                items: [{
                    key: "dsOption/params/-/name",
                    options: {

                        widget: {
                            text: {
                                disabled: true
                            }
                        }
                    }
                }, {
                    key: "dsOption/params/-/type",
                    widget: "combobox",
                    options: {
                        widget: {
                            combobox: {
                                onChanged: (props: any) => {
                                    props.actions.updateItem({
                                        keys: props.getPathKeys(props.mergeSchema.keys, "./data"),
                                        data: {}
                                    });
                                },
                                options: [{
                                    key: "fixed",
                                    iconProps: { iconName: "ReviewResponseSolid" },
                                    text: "固定参数"
                                }, {
                                    key: "period",
                                    iconProps: { iconName: "ReviewRequestMirroredSolid" },
                                    text: "周期性参数"
                                }, {
                                    key: "dimension",
                                    iconProps: { iconName: "ReviewRequestSolid" },
                                    text: "维度参数"
                                }]
                            }
                        }
                    }
                }, {
                    // hocFactory.get("sh")({ path: "./type", jsonata: "$boolean($$)" }
                    key: "dsOption/params/-/data",
                    "ui:item.hoc": ["theme", "field", "validate", hocFactory.get("con")({
                        paths: [{ path: "./", jsonata: "$" }],
                        hoc: hocFactory.get("sh")({ path: "./type", jsonata: "$boolean($$)" })
                    }), "temp", hocFactory.get("con")({
                        paths: [{ path: "./type", jsonata: "$" }],
                        hoc: hocFactory.get("oneof")({
                            path: "./type",
                            uiSchemas: {
                                "fixed": {
                                    index: 0,
                                    uiSchema: [{
                                        key: "dsOption/params/-/data/value",
                                        widget: "combobox",
                                        "ui:item.hoc": ["theme", "field", "validate", "temp", "proxy"],
                                        options: {
                                            hoc: {
                                                proxy: {
                                                    property: "options",
                                                }
                                            },
                                            widget: {
                                                combobox: {
                                                    autoComplete: "on",
                                                    allowFreeform: true
                                                }
                                            }
                                        }
                                    }]
                                },
                                "dimension": {
                                    index: 1,
                                    uiSchema: ["*"]
                                },
                                "period": {
                                    index: 2,
                                    uiSchema: [{
                                        key: "dsOption/params/-/data/correspondValue/dataType",
                                        widget: "choice",
                                        options: {
                                            widget: {
                                                choice: {
                                                    options: [{
                                                        key: "date",
                                                        iconProps: { iconName: "EventDate" },
                                                        text: "日期"
                                                    }, {
                                                        key: "integer",
                                                        iconProps: { iconName: "NumberField" },
                                                        text: "整数"
                                                    }]
                                                }
                                            }
                                        }
                                    }, {
                                        key: "dsOption/params/-/data/correspondValue/initialValue",
                                        widget: "text",
                                        "ui:item.hoc": ["theme", "field", "validate", "temp", hocFactory.get("con")({
                                            paths: [{ path: "./dataType", jsonata: "$" }],
                                            hoc: hocFactory.get("custom")({
                                                path: "./dataType", func: (props, data) => {
                                                    if (data === "date") {
                                                        props.mergeSchema.uiSchema.widget = "date";
                                                    } else if (data === "integer") {
                                                        props.mergeSchema.uiSchema.widget = "text";
                                                    }
                                                }
                                            })
                                        }), "field"]
                                    }, {
                                        key: "dsOption/params/-/data/correspondValue/periodGap/value",
                                    }, {
                                        key: "dsOption/params/-/data/correspondValue/periodGap/unit",
                                        widget: "choice",
                                        options: {
                                            widget: {
                                                choice: {
                                                    options: [{
                                                        key: "year",
                                                        iconProps: { iconName: "DateTime" },
                                                        text: "年"
                                                    }, {
                                                        key: "month",
                                                        iconProps: { iconName: "DateTimeMirrored" },
                                                        text: "月"
                                                    }, {
                                                        key: "week",
                                                        iconProps: { iconName: "DateTime2" },
                                                        text: "周"
                                                    }]
                                                }
                                            }
                                        }
                                    }]
                                }
                            }
                        })
                    }), hocFactory.get("con")({
                        paths: [{ path: "./", jsonata: "$" }],
                        hoc: hocFactory.get("custom")({
                            path: "./",
                            func: (props: any, data) => {
                                data = data.toJS();
                                if (data.type === "fixed") {
                                    props.mergeSchema.uiSchema.items[0].widget = data.widget;
                                }
                            }
                        })
                    })],
                    "ui:temp": "card",
                    field: "object",
                    items: [],
                }]
            }]
        }],
    globalOptions,
    schemaFormOptions: Object.assign({}, schemaFormOptions)
};

export const schemaFormModel: FormReducer<any> = createForms.createOne(formOptions.schemaKey, $InitialState, {
    reducerKeys: []
}, "immu", ajv, formOptions.schema);

// schemaFormModel.reducer
