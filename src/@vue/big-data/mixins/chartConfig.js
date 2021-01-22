/*
 * @Description: 图表公共配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-19 10:55:19
 * @LastEditTime: 2021-01-22 11:22:08
 */

export const commonChartTypes = {
    lastChangeTime: Number, //reset时间戳
    chartData: [Object, Array, String], //图表静态数据
    dynamicData: [Object, Array, String], //图表动态数据
    useApiData: Boolean, //使用接口请求的动态数据，默认使用静态数据
    apiReqUrl: String, //完整接口地址如`http://192.168.1.1/api/users`
    apiMethod: String, //这里只能为get或者post，默认get
    apiParam: Object, //请求传参，空为{}空对象
    apiResHandle: [String, Function], //数据处理，若为字符串，则为`(function(x){return xxx})`格式，传入请求结果，返回新的数据
    openTimingRefresh: Boolean, //开启定时刷新
    refreshPeriod: Number, //刷新周期，单位秒
    chartEvents: Array,
    title: String, //标题，可有可无,若没有则为""
    titleSize: Number, //标题字号
    titleFontWeight: String, //标题粗细 bold/normal/bolder/lighter
    titleFontFamily: String, //标题字体
    titleColor: String, //标题颜色
    titlePosLeft: [String, Number], //标题左边距,
    titlePosTop: [String, Number], //标题上边距,
    titlePosRight: [String, Number], //标题右边距,
    titlePosBottom: [String, Number], //标题下边距,
    tooltipFmt: String, //提示框的字符串模板，如`{a} <br/>{b} : {c} ({d}%)`
    colors: Array, //自定义颜色
}

//chartEvents事件绑定格式
//其中的 query 可为 string 或者 Object，具体看echarts文档
// ```
// [
//     {
//         callback: (e)=>{console.log(e)},
//         diyCallback: true,
//         event: "click",
//         setQuery: false,
//     },
//     {
//         callback: (e)=>{console.log(e)},
//         diyCallback: true,
//         event: "click",
//         setQuery: true,
//         query: "series",
//     }
// ]
// ```

export const positionTypes = {
    left: [String, Number], //左边距
    top: [String, Number], //上边距
    right: [String, Number], //右边距
    bottom: [String, Number], //下边距
}

export const legendTypes = {
    showLegend: Boolean, //显示图例
    legendPosLeft: [String, Number], //图例左边距,可以为数字像素，也可以为字符串`center/left/right`
    legendPosTop: [String, Number], //图例上边距,可以为数字像素，也可以为字符串`center/top/bottom`
    legendPosRight: [String, Number], //图例右边距
    legendPosBottom: [String, Number], //图例下边距
    legendOrient: String, //图例布局 vertical/horizontal 默认horizontal
    legendFontColor: String, //图例字体颜色
    legendFontWeight: String, //图例字体粗细 bold/normal/bolder/lighter
    legendFontSize: Number, //图例字号
    legendItemWidth: Number, //图例图标宽
    legendItemHeight: Number, //图例图标高
    legendItemGap: Number, //图例项目间隔
}

export const commonDefaultVal = {
    useApiData: false,
    apiMethod: 'get',
    apiParam: {},
    apiResHandle: function (res) {
        console.log(res)
        return res
    },
    openTimingRefresh: false,
    refreshPeriod: 3,
    chartEvents: [],
    title: '',
    titleSize: 10,
    titleFontWeight: 'bold',
    titleFontFamily: 'Microsoft YaHei',
    titleColor: '#ffffff',
    titlePosLeft: 'center',
    titlePosTop: 'bottom',
    titlePosRight: 'auto',
    titlePosBottom: 'auto',
    tooltipFmt: '', //这里给空字符串，实际按echarts默认提示
}

export const legendDefaultVal = {
    showLegend: true,
    legendPosLeft: 'center',
    legendPosTop: 35,
    legendPosRight: 'auto',
    legendPosBottom: 'auto',
    legendOrient: 'horizontal',
    legendFontColor: '#ddd',
    legendFontWeight: 'normal',
    legendFontSize: 10,
    legendItemWidth: 18,
    legendItemHeight: 12,
    legendItemGap: 14,
}

/* 数据验证 */
export const chartDataVerify = (options) => {
    //数据为必传项，这里验证一下(当父组件传options参数的时候)
    //若未传options参数，这里不验证
    const optionsLen = Object.keys(options).length
    if (optionsLen > 0) {
        if (options.useApiData && !options.apiReqUrl) {
            throw new Error(
                'Lack of data, Please send "apiReqUrl" in parent component.'
            )
        }
        if (!options.useApiData && !options.chartData) {
            throw new Error(
                'Lack of data, Please send "chartData" in parent component.'
            )
        }
    }
    //返回options长度
    return optionsLen
}
