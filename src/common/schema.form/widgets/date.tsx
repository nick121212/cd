import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { DatePicker, DayOfWeek, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";
import { BaseComponent } from "../../component/index";

let dateFormat = (date: Date, fmt: string) => {
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

export interface DatePickerWidgetProps extends SchemaFormItemProps {
}

export class DatePickerWidget extends BaseComponent<DatePickerWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions(this.props, "date");

        return <DatePicker
            onSelectDate={(val: Date) => {
                updateItemData(dateFormat(val, "yyyy-MM-dd hh:mm:ss"));
            }}
            formatDate={(date: Date) => {
                return dateFormat(date, "yyyy-MM-dd hh:mm:ss");
            }}
            placeholder={getTitle(this.props)}
            {...widgetOptions}
            {...this.setDefaultProps() }
        />;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.props.formItemData !== undefined) {
            try {
                props.value = new Date(this.props.formItemData);
            } catch (e) {
                console.error("转换日期失败");
            }
        } else {
            // props.value = "";
        }

        return props;
    }
}
