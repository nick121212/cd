import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import classNames from "classnames";
import { BaseComponent } from "../../component/index";

export interface ColTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class ColTemp extends BaseComponent<ColTempProps, any> {
    public render(): JSX.Element {
        const { children, tempKey, getTempOptions } = this.props;
        const { className, style, ...tempOptions } = getTempOptions(this.props, tempKey);

        return <div style={style} className={classNames("relative ms-Grid-col", className, this.getTemplateCls())}>
            {children}
        </div>;
    }

    private getTemplateCls() {
        const { tempKey, getTempOptions } = this.props;
        const { className, ...tempOptions } = getTempOptions(this.props, tempKey);
        let props: any = {};
        let cls = [];
        let types = ["sm", "md", "lg", "Xl", "Xxl", "Xxxl"];
        let { small, medium, large, eLarge, eeLarge, eeeLarge } = tempOptions;

        [small, medium, large, eLarge, eeLarge, eeeLarge].forEach((c: any, index: number) => {
            if (c) {
                if (c.span) {
                    cls.push("ms-" + types[index] + c.span);
                }
                if (c.pull) {
                    cls.push("ms-" + types[index] + "Pull" + c.pull);
                }
                if (c.push) {
                    cls.push("ms-" + types[index] + "Push" + c.push);
                }
            }
        });

        return cls;
    }
}
