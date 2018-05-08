import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import Immutable from "immutable";
import merge from "lodash.merge";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    buildColumns,
    IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { BaseComponent } from "../../component/index";

export interface Props extends SchemaFormItemProps {
    actions: any;
}

export class DetailListWidget extends BaseComponent<Props, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions(this.props, "detailList");
        const defaultOptions = this.setDefaultProps();

        return <DetailsList
            items={defaultOptions.items || []}
            compact={false}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selectionPreservedOnEmptyClick={true}
            enterModalSelectionOnTouch={true}
            {...defaultOptions}
        />;
    }

    public componentDidUpdate() {
        const widgetOptions = this.props.getWidgetOptions(this.props, "detailList");
        const defaultOptions = this.setDefaultProps();

        if (!((widgetOptions.columns && widgetOptions.columns.length) ||
            (defaultOptions.columns && defaultOptions.columns.length))) {
            defaultOptions.columns = this._buildColumns(defaultOptions.items || []);

            if (defaultOptions.columns && defaultOptions.columns.length) {
                this.props.actions.updateItem({
                    keys: this.props.mergeSchema.keys.concat(["columns"]),
                    data: defaultOptions.columns
                });
            }
        }
    }

    private _buildColumns(items: any[]) {
        let columns = buildColumns(items);

        return columns;
    }

    private setDefaultProps(): any {
        const { mergeSchema, meta } = this.props;
        let props: any = {};
        const { formItemData = {} } = meta ? meta.toJS() : {};

        if (this.props.formItemData !== undefined) {
            if (Immutable.Map.isMap(this.props.formItemData)) {
                props = this.props.formItemData.toJS();
            } else {
                props = this.props.formItemData;
            }
        }

        props = merge({}, props, formItemData || {});

        return props;
    }
}
