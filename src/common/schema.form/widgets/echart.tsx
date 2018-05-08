import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import ReactEcharts from "echarts-for-react";
import merge from "lodash.merge";
import Immutable from "immutable";
import { shouldUpdate, onlyUpdateForKeys, compose } from "recompose";

import { BaseComponent } from "../../component/index";

export interface Props extends SchemaFormItemProps {
    actions: any;
}

export class EChartWidget extends BaseComponent<Props, any> {
    private echarts_react: any;

    public componentDidCatch(err, info) {
        console.log(err);
    }

    public componentWillUpdate() {
        // if (this.echarts_react) {
        //     let echarts_instance = this.echarts_react.getEchartsInstance();

        //     echarts_instance.clear();
        // }
    }

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions, actions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions(this.props, "echart");

        return <ReactEcharts
            ref={(e) => { this.echarts_react = e; }}
            notMerge={false}
            lazyUpdate={true}
            style={{
                height: "100%"
            }}
            theme="dark"
            onChartReady={() => {
                console.log("chart ready");
            }}
            {...widgetOptions}
            {...this.setDefaultProps() } />;
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

        // console.log(JSON.stringify(props.option.options));

        return props;
    }
}
