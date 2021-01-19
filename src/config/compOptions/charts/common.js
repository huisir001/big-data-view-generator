/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-19 10:39:37
 */
export const publicOpts = {
    lastChangeTime: Date.now(),
    /* 数据 */
    useApiData: false,
    apiReqUrl: 'http://localhost/api',
    apiMethod: 'get',
    apiParam: {},
    apiResHandle: `function(res){\n  console.log(res)\n  return res\n}`,
    openTimingRefresh: false,
    refreshPeriod: 3,
    /* 事件 */
    chartEvents: [],
    /* 标题 */
    titleSize: 16,
    titleFontWeight: 'bold',
    titleFontFamily: 'Microsoft YaHei',
    titleColor: '#ffffff',
    titlePosLeft: 'center',
    titlePosTop: 5,
}

export const legendOpts = {
    showLegend: true,
    legendFontColor: '#ddd',
    legendFontWeight: 'normal',
    legendFontSize: 10,
    legendItemWidth: 18,
    legendItemHeight: 12,
    legendItemGap: 8,
}
