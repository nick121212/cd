import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle, shouldUpdate, } from "recompose";
import Immutable from "immutable";
import { Action } from "redux-act";
import { SchemaFormCreate } from "fx-schema-form-react";
import HTML5Backend from "react-dnd-html5-backend";

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
        $schemaForm: state.getIn(reducerKeys.concat([formOptions.schemaKey]))
    };
};

export const hoc = compose<SourceCreateProps, any>(
    connect(mapStateToProps)
);

export const designHoc = compose<SourceCreateProps, any>(
    hoc,
    shouldUpdate(() => false),
    lifecycle<SourceCreateProps, any>({
        componentWillUnmount: function () {
            schemaFormModel.actions.updateData(Object.assign({}, $InitialState, {}) as any);
        },
        componentDidMount: async function () {
            const { match } = this.props;
            const { id = 0 } = match.params || {};
            const params = getParamsFormLocationSearch();

            if (!id) {
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
                let { name, dsModelIds, infoOption } = action.payload;

                schemaFormModel.actions.updateData(Object.assign({}, $InitialState, {
                    dsModelData: {
                        data: {
                            params
                        },
                        ids: {}
                    }
                }, {
                        dsModelIds,
                        infoOptions: JSON.parse(infoOption)
                    }) as any);
            } else {
                // alert();
            }
        }
    }));
