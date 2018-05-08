import React, { SyntheticEvent } from "react";
import classnames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { onlyUpdateForKeys, compose } from "recompose";
import { MentionWrapper, MentionMenu } from "react-githubish-mentions-nick";
import { BaseComponent } from "../../component/index";

const defaultStyle = ({
    control: {
        backgroundColor: "#fff",

        fontSize: 12,
        fontWeight: "normal",
    },

    input: {
        margin: 0,
    },

    "&singleLine": {
        control: {
            display: "inline-block",

            width: 130,
        },

        highlighter: {
            padding: 1,
            border: "2px inset transparent",
        },

        input: {
            padding: 1,

            border: "2px inset",
        },
    },

    "&multiLine": {
        control: {
            fontFamily: "monospace",

            border: "1px solid silver",
        },

        highlighter: {
            padding: 9,
        },

        input: {
            padding: 9,
            minHeight: 63,
            outline: 0,
            border: 0,
        },
    },

    suggestions: {
        list: {
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 10,
        },

        item: {
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",

            "&focused": {
                backgroundColor: "#cee4e5",
            },
        },
    },
});

export interface Props extends SchemaFormItemProps {
}

class MenuItem extends React.PureComponent<any, any> {
    public render() {
        const { active, name } = this.props;

        return (
            <div onClick={() => {
                alert(2);
            }} className={classnames("pa1 bb b--light-silver", { "bg-light-gray": active })}>
                {name}
            </div>
        );
    }
}

const atQuery = function (query: string) {
    const { meta } = this.props;
    const { options = [] } = meta ? meta.toJS() : {};

    const tm = options.map((teamMember) => ({ ...teamMember, name: teamMember.display, value: teamMember.id }));

    return tm.filter((member) => member.value.startsWith(query));
};


export class MentionWidget extends BaseComponent<Props, any> {
    private _atQuery: any;
    private _onBlur: any;
    private _onChange: any;
    private _timeId: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            value: undefined
        };
        this._atQuery = atQuery;
        this._onBlur = (() => {
            clearTimeout(this._timeId);
            this._timeId = setTimeout(() => {
                if (this.state.value !== undefined) {
                    props.updateItemData(this.state.value);
                    this.setState({
                        value: undefined
                    });
                }
            }, 200);
        }).bind(this);
        this._onChange = ((event: any, newValue: string) => {
            if (newValue) {
                 props.updateItemData(newValue);
            }
            this.setState({
                value: event.target.value || newValue || ""
            });
        }).bind(this);
    }
    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, updateItemMeta,
            updateItemData, formItemData, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const { ...widgetOptions } = getWidgetOptions(this.props, "mention");

        return (
            <MentionWrapper
                component="input"
                className="db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2"
                placeholder={getTitle(this.props)}
                onChange={this._onChange}
                onBlur={() => {
                    this._onBlur();
                }}
                {...widgetOptions}
                {...this.setDefaultProps() }>
                <MentionMenu
                    className="list bg-white pl0 ml0 center mw6 ba b--light-silver br2" style={{
                        zIndex: 9999999
                    }}
                    trigger="$"
                    item={MenuItem}
                    replace={(userObj, trigger) => {
                        return `{{${trigger}.${userObj.value}}}`;
                    }}
                    resolve={(query: string) => {
                        return this._atQuery.call(this, query);
                    }} />
            </MentionWrapper>
        );
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        let props: any = {};

        if (this.state.value !== undefined) {
            props.value = this.state.value;
        } else {
            props.value = this.props.formItemData;
        }

        return props;
    }
}
