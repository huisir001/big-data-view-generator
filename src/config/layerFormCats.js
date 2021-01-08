/*
 * @Description: 右侧栏图层配置面板表单分类
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-11-13 17:45:47
 * @LastEditTime: 2021-01-08 17:32:00
 */
import compList from './compList'
let allCompType = [] //所有类型
let compTypes_sjpz = [] //需要数据的类型
let compTypes_tb = [] //图表类型

//组件类型分发
compList.forEach((item) => {
    //所有组件类型
    allCompType = allCompType.concat(item.list.map((li) => li.type))

    //需要数据的组件
    item.id != 4 &&
        (compTypes_sjpz = allCompType.concat(item.list.map((li) => li.type)))

    //图表组件
    Array(1, 2).includes(item.id) &&
        (compTypes_tb = allCompType.concat(item.list.map((li) => li.type)))
})

export default [
    {
        category: '图层配置',
        optionsFilter: ['name', 'pos', 'width', 'height'],
        compTypeFilter: allCompType,
    },
    {
        category: '图表基础配置',
        optionsFilter: [
            'title',
            'titleSize',
            'titleFontWeight',
            'titleFontFamily',
            'titleColor',
            'titlePosLeft',
            'titlePosTop',
            'lineWidth',
            'lineType',
            'opacity',
        ],
        compTypeFilter: allCompType,
    },
    {
        category: '数据配置',
        optionsFilter: [
            'useApiData',
            'chartData',
            'apiReqUrl',
            'apiMethod',
            'apiParam',
            'apiResHandle',
        ],
        compTypeFilter: compTypes_sjpz,
    },
    {
        category: '图例配置',
        optionsFilter: [
            'showLegend',
            'legendPosLeft',
            'legendPosTop',
            'legendOrient',
            'legendFontColor',
            'legendFontWeight',
            'legendFontSize',
            'legendItemWidth',
            'legendItemHeight',
            'legendItemGap',
        ],
        compTypeFilter: compTypes_tb.filter((item) => item != 'GaugeChart'), //仪表盘不需要图例
    },
    {
        category: '坐标轴设置',
        optionsFilter: [
            'xName',
            'yName',
            'valEnding',
            'showValAxisLabel',
            'showValAxisLine',
            'showValSplitLine',
            'showCatAxisLine',
            'boundaryGap',
            'catLabelRowLen',
            'limitAxisMinVal',
            'limitAxisMaxVal',
            'axisScopeMin',
            'axisScopeMax',
            'showxAxisLabel',
            'xAxisLabelFmt',
            'showyAxisLabel',
            'yAxisLabelFmt',
            'showxAxisLine',
            'showyAxisLine',
            'showxSplitLine',
            'showySplitLine',
            'limitxAxisMinVal',
            'limitxAxisMaxVal',
            'limityAxisMinVal',
            'limityAxisMaxVal',
            'xAxisScopeMin',
            'xAxisScopeMax',
            'yAxisScopeMin',
            'yAxisScopeMax',
        ],
        compTypeFilter: ['BarChart', 'LineChart', 'ScatterChart', 'TwoYAxis'],
    },
    {
        category: '图表主体配置',
        optionsFilter: [
            'barWidth',
            'stack',
            'smooth',
            'horizontal',
            'barBorderRadius',
            'label',
            'labelPosition',
            'showDataZoom',
            'dataZoomAxis',
            'dataZoomSplitType',
            'dataZoomSplitScope',
            'showVisualMap',
            'visualMap',
            'showMarkPoint',
            'markPoint',
            'showMarkLine',
            'markLine',
            'showMarkArea',
            'markArea',
            'showShadow',
            'shadowBlur',
            'shadowColor',
            'shadowOffsetX',
            'shadowOffsetY',
            'areaFill',
            'areaStyle',
            'labelSize',
            'borderWidth',
            'borderColor',
            'selectedCats',
            'labelLineLength',
            'labelFmt',
            'ringlike',
            'nestification',
            'startAngle',
            'endAngle',
            'min',
            'max',
            'clockwise',
            'showDialTitle',
            'dialTitleCenter',
            'dialTitleSize',
            'dialTitleWeight',
            'dialTitleColor',
            'showDetail',
            'detailFmt',
            'detailCenter',
            'detailSize',
            'detailColorAuto',
            'detailColor',
            'detailFontWeight',
            'maxValOffset',
            'areaOpacity',
            'showCatName',
            'catNameFmt',
            'catNameColor',
            'catNameSize',
            'nameGap',
            'isBubble',
            'minBubbleSize',
            'maxBubbleSize',
            'symbolSize',
            'symbolType',
        ],
        compTypeFilter: compTypes_tb,
    },
    {
        category: '表盘配置',
        optionsFilter: [
            'showAxis',
            'axisWidth',
            'axisShadowBlur',
            'axisShadowColor',
            'axisShadowOffsetX',
            'axisShadowOffsetY',
        ],
        compTypeFilter: ['GaugeChart'], //仪表盘特有
    },
    {
        category: '刻度配置',
        optionsFilter: [
            'showAxisLabel',
            'axisLabelSize',
            'axisLabelStyle',
            'axisLabelWeight',
            'axisLabelFmt',
            'axisLabelColorAuto',
            'axisLabelColor',
            'showAxisTick',
            'axisTickType',
            'axisTickWidth',
            'axisTickLength',
            'axisTickSplitNum',
        ],
        compTypeFilter: ['GaugeChart', 'RadarChart'],
    },
    {
        category: '分割线配置',
        optionsFilter: [
            'splitNumber',
            'showSplitLine',
            'splitLineLength',
            'splitLineWidth',
            'splitLineType',
        ],
        compTypeFilter: ['GaugeChart'],
    },
    {
        category: '指针配置',
        optionsFilter: [
            'pointerLength',
            'pointerWidth',
            'pointerColorAuto',
            'pointerColor',
            'pointerOpacity',
            'pointerBorderColor',
            'pointerBorderWidth',
            'pointerBorderType',
        ],
        compTypeFilter: ['GaugeChart'], //仪表盘特有
    },
    {
        category: '底盘配置',
        optionsFilter: [
            'radarType',
            'showAxisLine',
            'axisLineColor',
            'axisLineWidth',
            'axisLineType',
            'showSplitArea',
            'splitAreaColorAuto',
            'splitAreaColor',
            'splitNumber',
            'showSplitLine',
            'splitLineWidth',
            'splitLineType',
            'splitLineColor',
        ],
        compTypeFilter: ['RadarChart'],
    },
    {
        category: '其他配置',
        optionsFilter: ['tooltipFmt', 'roseType'],
        compTypeFilter: compTypes_tb,
    },
    {
        category: '视区设置',
        optionsFilter: ['left', 'top', 'bottom', 'right', 'radius', 'center'],
        compTypeFilter: compTypes_tb,
    },
    {
        category: '自定义配色',
        optionsFilter: ['colorMode', 'colors'],
        compTypeFilter: compTypes_tb,
    },
    {
        category: '自定义事件',
        optionsFilter: ['chartEvents'],
        compTypeFilter: compTypes_tb,
    },
]
