/*
 * @Description: 基础组件公共配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-22 11:21:45
 * @LastEditTime: 2021-01-26 14:29:45
 */

export const commonTypes = {
    lastChangeTime: Number, //reset时间戳
    dynamicData: [Object, Array, String], //图表动态数据
    useApiData: Boolean, //使用接口请求的动态数据，默认使用静态数据
    apiReqUrl: String, //完整接口地址如`http://192.168.1.1/api/users`
    apiMethod: String, //这里只能为get或者post，默认get
    apiParam: Object, //请求传参，空为{}空对象
    apiResHandle: [String, Function], //数据处理，若为字符串，则为`(function(x){return xxx})`格式，传入请求结果，返回新的数据
    openTimingRefresh: Boolean, //开启定时刷新
    refreshPeriod: Number, //刷新周期，单位秒
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
}
