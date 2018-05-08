import React from "react";

import { BaseComponent } from "../../../common/component/base";


export class Component extends BaseComponent<any, any> {
    public render() {
        const { children } = this.props;

        return (
            <footer className="pv5 pv6-l ph4 tc">
                <p className="f6">
                    <span className="dib">红星大数据平台</span>
                </p>
            </footer>
        );
    }
}

export const ComponentWithHoc: React.ComponentClass<any> = (Component);
