import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle, shouldUpdate, } from "recompose";
import Immutable from "immutable";
import { Action } from "redux-act";
import { SchemaFormCreate } from "fx-schema-form-react";
import HTML5Backend from "react-dnd-html5-backend";
import { toastr } from "react-redux-toastr";
import { ActionCreators } from "redux-undo-immutable";

import {
    reducerKey, reducerKeys, SourceCreatePropsRaw, SourceCreateProps,
    updateProxyModel, proxySettings, formOptions, schemaFormModel,
    $InitialState
} from "./constant";
import { DragDropContext } from "react-dnd";
import { getParamsFormLocationSearch } from "../../../libs/proxy";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any): SourceCreatePropsRaw => {
    return {
        $updateProxyModel: state.getIn(reducerKeys.concat(["$updateProxyModel"])),
        $schemaForm: state.getIn(reducerKeys.concat([formOptions.schemaKey, "present"])),
        $schemaFormPast: state.getIn(reducerKeys.concat([formOptions.schemaKey, "past"])),
        $schemaFormFuture: state.getIn(reducerKeys.concat([formOptions.schemaKey, "future"])),
    };
};

export const hoc = compose<SourceCreateProps, any>(
    connect(mapStateToProps, (dispatch: Dispatch<any>) => {
        return {
            undo: () => {
                dispatch(ActionCreators.undo());
            },
            redo: () => {
                dispatch(ActionCreators.redo());
            },
            clear: () => {
                dispatch(ActionCreators.clearHistory());
            }
        };
    }),
    withHandlers({
        validateForm: (propx: SourceCreateProps) => {
            return async (data: any) => {
                let metaData = SchemaFormCreate.metas[formOptions.schemaKey];

                let metaNewData = await metaData.validateAll(data);

                schemaFormModel.actions.updateMetaState({ isLoading: true, isValid: false });
                schemaFormModel.actions.updateMetaState({
                    isLoading: false,
                    meta: metaNewData
                });

                if (!metaData.data.isValid) {
                    toastr.error("验证", metaData.data.errMessage || "验证出错！");
                }

                return metaData;
            };
        }
    }),
    withHandlers({
        createHandle: (props: SourceCreateProps) => {
            return async () => {
                let data = props.$schemaForm.get("data").toJS();
                let metaData = await props.validateForm(data);

                if (metaData.data.isValid) {
                    delete data.id;
                    let serverModelAction: any = await updateProxyModel.actions.execute({
                        data: Object.assign({}, {
                            name: data.name,
                            appType: data.appType,
                            infoOption: JSON.stringify(data.infoOptions),
                            dsIds: JSON.stringify(data.dsModelIds)
                        }),
                        settings: {
                            type: "formdata"
                        }
                    }, Object.assign({}, proxySettings.create, { loading: updateProxyModel.actions.loading }));

                    if (!serverModelAction.error) {
                        schemaFormModel.actions.updateItem({
                            keys: ["id"],
                            data: serverModelAction.payload.id
                        });
                        toastr.success("保存", "保存成功！");
                    }
                }
            };
        },
        updateHandle: (props: SourceCreateProps) => {
            return async () => {
                let data = props.$schemaForm.get("data").toJS();
                let metaData = await props.validateForm(data);

                if (metaData.data.isValid) {
                    let action: any = await updateProxyModel.actions.execute({
                        data: {
                            id: data.id,
                            updatedParams: JSON.stringify(Object.assign({}, {
                                name: data.name,
                                isTest: data.isTest ? 1 : 0,
                                appType: data.appType,
                                infoOption: JSON.stringify(data.infoOptions)
                            })),
                            dsIds: JSON.stringify(data.dsModelIds)
                        },
                        settings: {
                            type: "formdata"
                        }
                    }, Object.assign({}, proxySettings.update, { loading: updateProxyModel.actions.loading }));

                    if (!action.error) {
                        toastr.success("保存", "保存成功！");
                    }
                }
            };
        }
    }),
    withHandlers({
        saveHandle: (props: SourceCreateProps) => {
            return async () => {
                let id = props.$schemaForm.get("data").get("id");

                if (id) {
                    await props.updateHandle();
                } else {
                    await props.createHandle();
                }
            };
        }
    })
);

export const designHoc = compose<SourceCreateProps, any>(
    connect(null, (dispatch: Dispatch<any>) => {
        return {
            clear: () => {
                dispatch(ActionCreators.clearHistory());
            }
        };
    }),
    shouldUpdate(() => false),
    lifecycle<SourceCreateProps, any>({
        componentWillUnmount: function () {
            schemaFormModel.actions.updateData(Object.assign({}, $InitialState, {}) as any);
            // this.props.clear();
        },
        componentDidMount: function () {
            this.props.clear();
        },
        componentWillMount: async function () {
            const { match } = this.props;
            const { id = 0 } = match.params || {};
            const params = getParamsFormLocationSearch();

            if (!id) {
                schemaFormModel.actions.updateData(Object.assign({}, $InitialState, {
                    dsModelData: {
                        data: {
                            params
                        },
                        ids: {}
                    }
                }) as any);
                return;
            }

            let action: Action<any> = await updateProxyModel.actions.execute({
                params: {
                    id: id
                },
                settings: {
                    type: "formdata"
                }
            }, Object.assign({}, proxySettings.detail, { loading: updateProxyModel.actions.loading }));

            if (action.payload.id) {
                let { name, dsModelIds, infoOption, appType, isTest } = action.payload;

                schemaFormModel.actions.updateData({});
                schemaFormModel.actions.updateData(Object.assign({}, $InitialState, {
                    dsModelData: {
                        data: {
                            params
                        },
                        ids: {}
                    }
                }, {
                        id,
                        isTest: !!isTest,
                        name,
                        dsModelIds,
                        appType,
                        infoOptions: JSON.parse(infoOption)
                    }) as any);
            }
        }
    }));
