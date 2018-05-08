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

import div from "../../../common/schema.form/dnd/div";
import { map } from "../../../common/schema.form/dnd/index";

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
    create: { ns: "design", key: "infographicAdd" },
    update: { ns: "design", key: "infographicUpdate" },
    detail: { ns: "design", key: "infographicDetail" }
};
export const $InitialState = {
    infoOptions: [],
    dsModelIds: [],
    dsModelData: {
        data: {},
        ids: {}
    }
};
export const updateProxyModel = new ModelProxyReducer();

export const formOptions = {
    schemaKey: "$previewCreateSchemaForm",
    schema: {
        type: "object",
        $id: "preview",
        required: ["name", "dsModelIds"],
        properties: {
            name: {
                type: "string",
            },
            dsModelIds: {
                type: "array",
                items: {
                    type: "number"
                }
            },
            dsModelData: {
                type: "object",
                properties: {
                    data: {
                        type: "object",
                        additionalProperties: false,
                    },
                    ids: {
                        type: "object",
                        additionalProperties: false,
                    }
                }
            },
            infoOptions: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        data: {
                            type: "object",
                            properties: {}
                        },
                        infoOptions: {
                            $ref: "preview#/properties/infoOptions"
                        }
                    }
                }
            }
        }
    },
    uiSchema: [{
        key: "infoOptions",
        items: [
            { key: "infoOptions/-" }
        ]
    }],
    globalOptions: {
        "hoc": {
            "array": {},
            "extraTemp": {
                "design": false,
            },
            "designForm": {
                "design": false
            },
            "extraField": {
                "widgets": map
            }
        },
        "field": {
            "string": {
                "ui:temp": [],
            },
            "number": {
                "ui:temp": [],
            },
            "object": {
                "ui:temp": [],
                "root": ({ children }) => children,
                "ui:item.hoc": ["theme", "validate", "extraField", "field", "extraTemp", "temp", "designForm"]
            },
            "array": {
                "ui:temp": [],
                "root": ({ children }) => children,
                // "ui:item.hoc": ["theme", "validate", "array", "extraField", "field", "extraTemp", "temp", "designForm"]
            },
            "design": {
                "root": ({ children }) => children
            },
            "normal": {
                hocs: [hocFactory.get("meta")({ keys: ["formItemData"] })]
            }
        },
        template: {
            "rnd": {
                enableResizing: false,
                disableDragging: true
            }
        }
    },
    schemaFormOptions: Object.assign({}, schemaFormOptions)
};
export const formOptions1 = Object.assign({}, formOptions, {
    uiSchema: [{
        title: "数据源中的数据",
        keys: ["dsModelData"],
        "ui:temp": ["none"],
        "ui:item.hoc": ["theme", "field", "validate", hocFactory.get("con")({
            paths: [{ path: "./dsModelIds" }],
            hoc: hocFactory.get("dsmodel")({
                path: "./dsModelIds",
                proxyInfo: { ns: "design", key: "infodataOne" }
            })
        })],
        field: "string",
        widget: "null"
    }],
    globalOptions: globalOptions
});
export const formOptions2 = Object.assign({}, formOptions, {
    uiSchema: [{
        title: "数据源中的数据",
        keys: ["dsModelData"],
        "ui:temp": ["none"],
        "ui:item.hoc": ["theme", "field", "validate", hocFactory.get("con")({
            paths: [{ path: "/dsModelIds" }],
            hoc: hocFactory.get("dsmodel")({
                path: "/dsModelIds",
                proxyInfo: { ns: "design", key: "infodataOne" }
            })
        })],
        field: "string",
        widget: "null"
    }],
    globalOptions: globalOptions
});
export const schemaFormModel: FormReducer<any> = createForms.createOne(formOptions.schemaKey, $InitialState, {
    reducerKeys: []
}, "immu", ajv, formOptions.schema);
