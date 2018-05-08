import React from "react";
import { is } from "immutable";

/**
 * component的基类
 * 更改了shouldComponentUpdate方法
 * 减少rereder的次数，提高效率
 */
export class BaseComponent<P, S> extends React.Component<P, S> {
    public shouldComponentUpdate(nextProps: P, nextState: S) {
        const thisProps: any = this.props || {};
        const thisState: any = this.state || {};

        let ddd = Date.now();

        nextState = nextState || {} as any;
        nextProps = nextProps || {} as any;

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
            return true;
        }

        for (const key in nextProps) {
            if (!is(thisProps[key], nextProps[key])) {
                return true;
            }
        }

        for (const key in nextState) {
            if (!is(thisState[key], nextState[key])) {
                return true;
            }
        }

        return false;
    }
}
