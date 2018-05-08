import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import CodeMirror from "react-codemirror";
import { Button } from "office-ui-fabric-react/lib/Button";
import { BaseComponent } from "../../component/index";

export interface Props extends SchemaFormItemProps {
    actions: any;
}

export class CodeWidget extends BaseComponent<Props, any> {
    constructor(props: Props, context?: any) {
        super(props, context);

        this.state = {
            val: ""
        };
    }

    private doSubmit() {
        const { mergeSchema, updateItemData, actions } = this.props;

        if (!this.state.val) {
            return;
        }
        try {
            if (mergeSchema.type === "object" || mergeSchema.type === "array") {
                updateItemData(JSON.parse(this.state.val), { isValid: true });
            } else {
                updateItemData(this.state.val, { isValid: true });
            }
            this.setState({
                val: ""
            });
        } catch (e) {
            actions.updateItemMeta({
                keys: mergeSchema.keys,
                meta: {
                    isValid: false,
                    errorText: e.message
                }
            });
        }
    }

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions, actions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly, ...widgetOptions } = getWidgetOptions(this.props, "code");

        return <div>
            <CodeMirror
                style={{
                    minHeight: 250
                }}
                onChange={(val: string) => {
                    this.setState({ val });
                }}
                readonly={readonly}
                placeholder={getTitle(this.props)}
                {...widgetOptions}
                {...this.setDefaultProps() }
            />
            {
                readonly === true ? null : <Button className="w-100"
                    disabled={!this.state.val}
                    onClick={() => {
                        this.doSubmit();
                    }}>提交</Button>
            }

        </div>;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.state.val) {
            props.value = this.state.val;
        } else {
            if (this.props.formItemData !== undefined) {
                if (mergeSchema.type === "object" || mergeSchema.type === "array") {
                    props.value = JSON.stringify(this.props.formItemData, null, 2);
                } else {
                    props.value = this.props.formItemData;
                }
            }
        }

        return props;
    }
}
