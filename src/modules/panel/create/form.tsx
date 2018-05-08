import React from "react";
import { SchemaForm } from "fx-schema-form-react";

import { BaseComponent } from "../../../common/component";
import { SourceCreateProps, formOptions1, reducerKeys } from "./constant";
import { hoc } from "./container";
import { shouldUpdate } from "recompose";

@(shouldUpdate(() => false) as any)
export class Component extends BaseComponent<SourceCreateProps, any> {
    public render() {
        const { match } = this.props;
        let formOptions = formOptions1(match.params.id);

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

export const ComponentWithHoc = Component;
