import col from "./col";
import row from "./row";
import root from "./root";
import div from "./div";
import line from "./line";
import bar from "./bar";
import bar1 from "./bar1";
import pie from "./pie";
import image from "./image";
import label from "./label";
import hr from "./hr";
import timeline from "./timeline";
import list from "./list";
import html from "./html";

const children: any[] = [
    row,
    col,
    div,
    label,
    list,
    html,
    // echart,
    // ty,
    hr,
    line,
    bar,
    bar1,
    timeline,
    pie,
    image
];

export default children;

const map = {

};

children.concat([root]).forEach((child: any) => {
    map[child.label] = child;
});

export { map };
