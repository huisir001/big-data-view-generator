/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-04 17:43:16
 */
export default {
    lastChangeTime: Date.now(),
    /* 数据 */
    useApiData: false,
    apiReqUrl: 'http://localhost/api',
    apiMethod: 'get',
    apiParam: {},
    apiResHandle: `function(res){\n  console.log(res)\n  return res\n}`,
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
