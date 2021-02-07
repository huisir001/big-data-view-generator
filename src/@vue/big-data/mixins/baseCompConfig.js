/*
 * @Description: 基础组件公共配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-22 11:21:45
 * @LastEditTime: 2021-02-07 10:19:46
 */

export const commonTypes = {
    lastChangeTime: Number, //reset时间戳
    dynamicData: [Object, Array, String], //动态数据
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

/* 数据验证 */
//requireParams Array 必传字段
export const compDataVerify = (options, requireParams) => {
    //数据为必传项，这里验证一下(当父组件传options参数的时候)
    //若未传options参数，这里不验证
    const optionsLen = Object.keys(options).length
    if (optionsLen > 0) {
        requireParams.forEach((param) => {
            switch (param) {
                case 'staticData':
                    if (
                        !options.useApiData &&
                        !options.staticData &&
                        options.staticData != ''
                    ) {
                        throw new Error(
                            'Lack of data, Please send "staticData" in parent component.'
                        )
                    } else if (options.useApiData && !options.apiReqUrl) {
                        throw new Error(
                            'Lack of data, Please send "apiReqUrl" in parent component.'
                        )
                    }
                    break
                default:
                    if (!options[param] && options[param] != '') {
                        throw new Error(
                            `Lack of data, Please send "${param}" in parent component.`
                        )
                    }
                    break
            }
        })
    }
    //返回options长度
    return optionsLen
}
