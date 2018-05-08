import React from "react";
import { SchemaForm } from "fx-schema-form-react";
import { shouldUpdate } from "recompose";

import { BaseComponent } from "../../../common/component";
import { SourceCreateProps, formOptions, reducerKeys } from "./constant";
import { designHoc as hoc } from "./container";

@(shouldUpdate(() => false) as any)
export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { } = this.props;

        return (
            <SchemaForm schemaKey={formOptions.schemaKey}
                schemaFormOptions={formOptions.schemaFormOptions}
                schema={formOptions.schema}
                key={formOptions.schemaKey}
                reducerKeys={reducerKeys.concat([formOptions.schemaKey, "present"])}
                RootComponent={({ children }) => children}
                uiSchema={formOptions.uiSchema}
                globalOptions={formOptions.globalOptions}>
            </SchemaForm>
        );
    }
}

export const ComponentWithHoc = hoc(Component);
