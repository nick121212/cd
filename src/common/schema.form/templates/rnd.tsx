import React from "react";
import classNames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";
import Rnd from "react-rnd";
import { connect } from "react-redux";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseComponent } from "../../component/index";

export interface DivTempProps extends SchemaFormItemProps {
    tempKey: string;
    actions: any;
}

@connect(mapFormItemDataProps)
export class RndTemp extends BaseComponent<DivTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, actions, tempKey, uiSchemaOptions, mergeSchema, getTempOptions } = this.props;
        const { className, ...tempOptions } = getTempOptions(this.props, tempKey);

        return <div className="">
            <Rnd
                style={{
                    zIndex: 1000,
                    position: "absolute"
                }}
                bounds=".root"
                className={classNames("rnd", className)}
                default={{
                    x: 0,
                    y: 0
                }}
                // resizeHandleWrapperClass="db absolute"
                {...tempOptions}
                onResize={(e, direction, ref, delta, position) => {
                    actions.updateItem({
                        keys: mergeSchema.keys.concat(["data", "position"]),
                        data: position
                    });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    actions.updateItem({
                        keys: mergeSchema.keys.concat(["data", "size"]),
                        data: {
                            width: ref.offsetWidth,
                            height: ref.offsetHeight
                        }
                    });
                }}
                onDragStop={(e: any, data: any) => {
                    actions.updateItem({
                        keys: mergeSchema.keys.concat(["data", "position"]),
                        data: {
                            x: data.x,
                            y: data.y
                        }
                    });
                }}>
                {children}
            </Rnd>
        </div>;
    }
}
