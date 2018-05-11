# Echart属性说明

## title

echart标题设置项。

|属性|显示名|类型|默认值|说明|
|------|----|-----|--------|----:|
|show|是否显示标题组件|boolean|true|是否显示标题组件|
|zlevel|所有图形的 zlevel 值|number|无|所有图形的 zlevel 值|
|z|组件的所有图形的z值|number|6|二级层叠控制，同一个canvas（相同zlevel）上z越高约靠顶层。|
|text|主标题文本|string|无|主标题文本|
|link|主标题文本超链接|string|无|主标题文本超链接|
|target|指定窗口打开主标题超链接|string|blank|指定窗口打开主标题超链接|
|subtext|副标题文本|string|无|副标题文本||sublink|副标题文本超链接|string|无|副标题文本超链接|
|subtarget|指定窗口打开主标题超链接|string|blank|指定窗口打开主标题超链接|
|x|水平安放位置|string|left|默认为左侧，可选为：'center' 、 'left' 、 'right' 、 {number}（x坐标，单位px）|
|y|垂直安放位置|string|top|默认为全图顶端，可选为：'top' 、 'bottom' 、 'center' 、 {number}（y坐标，单位px）||textAlign|水平对齐方式|string|left|默认根据x设置自动调整，可选为： 'left' 、 'right' 、 'center'|
|backgroundColor|标题背景色|string|transparent|默认透明。|
|borderColor|标题的边框颜色|string|#ccc|支持的颜色格式同 backgroundColor。|
|borderWidth|标题的边框线宽|number|2|标题的边框线宽|
|padding|标题内边距|string|无|单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。|
|itemGap|主副标题之间的间距|string|无|主副标题之间的间距|

## axis

轴配置属性，这里有横轴和纵轴。

|属性|显示名|类型|默认值|说明|
|------|----|-----|--------|----:|
|zlevel|所有图形的 zlevel 值|number|无|所有图形的 zlevel 值|
|z|组件的所有图形的z值|number|6|二级层叠控制，同一个canvas（相同zlevel）上z越高约靠顶层。|
|show|显示策略|boolean|true|显示策略|
|type|坐标轴类型|string|无|横轴默认为类目型'category'，纵轴默认为数值型'value'|
|position|坐标轴类型|string|无|横轴默认为类目型'bottom'，纵轴默认为数值型'left'，可选为：'bottom' 、 'top' 、 'left' 、 'right'|
|name|坐标轴名称，默认为空|string|无|坐标轴名称，默认为空|
|nameLocation|坐标轴名称位置|string|start|默认为'end'，可选为：'start' 、 'end'||boundaryGap|类目起始和结束两端空白策略|boolean|true|类目起始和结束两端空白策略|
|min|最小值|number|无|最小值|
|max|最大值|number|无|最大值|
|scale|脱离0值比例，放大聚焦到最终_min，_max区间|boolean|无|脱离0值比例，放大聚焦到最终_min，_max区间||data|轴数据|array|无|格式为['1','2']|

## legend

图例配置属性。

|属性|显示名|类型|默认值|说明|
|------|----|-----|--------|----:|
|show|是否显示标题组件|boolean|true|是否显示标题组件|
|zlevel|所有图形的 zlevel 值|number|无|所有图形的 zlevel 值|
|z|组件的所有图形的z值|number|6|二级层叠控制，同一个canvas（相同zlevel）上z越高约靠顶层。|
|orient|布局方式|string|无|布局方式|
|x|水平安放位置|string|left|默认为左侧，可选为：'center' 、 'left' 、 'right' 、 {number}（x坐标，单位px）|
|y|垂直安放位置|string|top|默认为全图顶端，可选为：'top' 、 'bottom' 、 'center' 、 {number}（y坐标，单位px）|
|backgroundColor|标题背景色|string|transparent|默认透明。|
|borderColor|标题的边框颜色|string|#ccc|支持的颜色格式同 backgroundColor。|
|borderWidth|标题的边框线宽|number|2|标题的边框线宽|
|padding|标题内边距|string|无|单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。|
|itemGap|主副标题之间的间距|string|无|主副标题之间的间距|
|itemWidth|图例图形宽度|number|20|图例图形宽度|
|itemHeight|图例图形高度|number|14|图例图形高度|

## series

曲线设置。

|属性|显示名|类型|默认值|说明|
|------|----|-----|--------|----:|
|zlevel|所有图形的 zlevel 值|number|无|所有图形的 zlevel 值|
|z|组件的所有图形的z值|number|6|二级层叠控制，同一个canvas（相同zlevel）上z越高约靠顶层。|
|type|图表类型|string|line|可选为： 'line'（折线图） 、 'bar'（柱状图） 、 'scatter'（散点图） 、 'k'（K线图） 、 'pie'（饼图） 、 'radar'（雷达图） 、 'chord'（和弦图） 、 'force'（力导向布局图） 、 'map'（地图）|
|name|系列名称|string|无|如启用legend，该值将被legend.data索引相关|
|clickable|数据图形是否可点击，默认开启，如果没有click事件响应可以关闭|boolean|true|数据图形是否可点击，默认开启，如果没有click事件响应可以关闭|
|selectedMode|选中模式|string|single|默认关闭，可选single，multiple|
|label|label|object|无||
|color|颜色组|array|无|颜色组|

## toolbox

工具栏配置属性

|属性|显示名|类型|默认值|说明|
|------|----|-----|--------|----:|
|show|是否显示工具箱|boolean|true|是否显示工具箱|
|showTitle|是否显示工具箱文字提示|boolean|true|是否显示工具箱文字提示|
|zlevel|一级层叠控制|number|无|一级层叠控制|
|z|组件的所有图形的z值|number|6|组件的所有图形的z值|
|orient|布局方式|string|无|布局方式|
|x|水平安放位置|string|left|默认为全图居中，可选为：'center' 、 'left' 、 'right' 、 {number}（x坐标，单位px）|
|y|垂直安放位置|string|top|默认为全图顶端，可选为：'top' 、 'bottom' 、 'center' 、 {number}（y坐标，单位px）|
|backgroundColor|标题背景色|string|transparent|默认透明。|
|borderColor|标题的边框颜色|string|#ccc|支持的颜色格式同 backgroundColor。|
|borderWidth|标题的边框线宽|number|2|标题的边框线宽|
|padding|标题内边距|string|无|单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。|
|itemGap|主副标题之间的间距|string|无|主副标题之间的间距|
|itemSize|工具箱icon大小，单位（px）|number|16|工具箱icon大小，单位（px）|
|color|工具箱icon颜色序列，循环使用，同时支持在具体feature内指定color|array|无|工具箱icon颜色序列，循环使用，同时支持在具体feature内指定color|
|disableColor|禁用颜色定义|string|#ddd|禁用颜色定义|
|effectiveColor|生效颜色定义|string|red|生效颜色定义|

## tooltip

鼠标以上的显示设置属性。

|属性|显示名|类型|默认值|说明|
|------|----|-----|--------|----:|
|show|是否显示|boolean|true|是否显示|
|zlevel|所有图形的 zlevel 值|number|无|所有图形的 zlevel 值|
|z|组件的所有图形的z值|number|6|二级层叠控制，同一个canvas（相同zlevel）上z越高约靠顶层。|
|showContent|tooltip主体内容显示策略|boolean|true|tooltip主体内容显示策略|
|trigger|触发类型，默认数据触发，见下图，可选为：'item' | 'axis'|string|item|触发类型，默认数据触发，见下图，可选为：'item' 、 'axis'|
|showDelay|显示延迟，添加显示延迟可以避免频繁切换，特别是在详情内容需要异步获取的场景，单位ms|number|20|显示延迟，添加显示延迟可以避免频繁切换，特别是在详情内容需要异步获取的场景，单位ms|
|hideDelay|隐藏延迟，单位ms|number|100|隐藏延迟，单位ms|
|transitionDuration|动画变换时长，单位s|number|0.4|如果你希望tooltip的跟随实时响应，showDelay设置为0是关键，同时transitionDuration设0也会有交互体验上的差别|
|enterable|鼠标是否可进入详情气泡中，默认为false，如需详情内交互，如添加链接，按钮，可设置为true。|boolean|无|鼠标是否可进入详情气泡中，默认为false，如需详情内交互，如添加链接，按钮，可设置为true。|
|backgroundColor|标题背景色|string|transparent|默认透明|
|borderColor|标题的边框颜色|string|#ccc|支持的颜色格式同 backgroundColor|
|borderWidth|标题的边框线宽|number|2|标题的边框线宽|
|borderRadius|提示边框圆角，单位px，默认为4|number|4|提示边框圆角，单位px，默认为4|
|padding|标题内边距|string|无|单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。|
