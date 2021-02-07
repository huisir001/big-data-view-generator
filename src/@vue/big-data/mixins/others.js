/*
 * @Description: 其他非图表组件公共方法
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月4日 09:26:38
 * @LastEditTime: 2021-02-07 18:52:59
 */
import Axios from '../utils/axios'
import { myLoading } from '../utils/myUtils'

export default {
    props: {
        options: {
            //参数
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            refreshTimer: null,
            compLoading: null,
        }
    },
    computed: {
        myOptions() {
            return new this.Config(this.options).options
        },
        jsonStrOptions() {
            return JSON.stringify(this.options)
        },
    },
    watch: {
        jsonStrOptions() {
            //实时数据改变
            this.getData()
        },
    },
    mounted() {
        this.getData()
    },
    methods: {
        /* 数据获取及处理 */
        async getData() {
            const { $el, options, apiRequest, timingRefresh } = this

            //表单组件非下拉选项时不请求
            if (
                options.selectOptions &&
                options.type != 'select' &&
                options.useApiData
            ) {
                this.options.useApiData = false
                window.alert('请在表单类型为“下拉选框”时开启数据请求!')
                return
            }

            //关闭先前loading
            myLoading.hide(this.compLoading)

            //这里处理数据请求
            if (options.useApiData) {
                //loading
                //如果开启定时刷新的话不显示loading
                options.openTimingRefresh ||
                    (this.compLoading = myLoading.show($el))

                let res = await apiRequest()
                if (!options.apiResHandle) {
                    if (options.selectOptions) {
                        this.options.selectOptions = res
                    } else {
                        this.options.dynamicData = res
                    }
                } else {
                    const apiResHandle =
                        typeof options.apiResHandle == 'string'
                            ? eval(`(${options.apiResHandle})`)
                            : options.apiResHandle

                    if (options.selectOptions) {
                        this.options.selectOptions = apiResHandle(res)
                    } else {
                        this.options.dynamicData = apiResHandle(res)
                    }
                }

                //关闭loading
                options.openTimingRefresh || myLoading.hide(this.compLoading)
            }

            // //事件绑定
            // if (options.chartEvents && options.chartEvents.length > 0) {
            //     options.chartEvents.forEach((item) => {
            //         //事件解绑，防止事件重复绑定
            //         myChart.off(item.event)
            //         //重新绑定
            //         const cb = item.diyCallback
            //             ? typeof item.callback == 'string'
            //                 ? eval(`(${item.callback})`)
            //                 : item.callback
            //             : eval(
            //                   `(function(e){item.transmitObj = ${item.transmit}})`
            //               )
            //         if (item.setQuery) {
            //             myChart.on(item.event, item.query, cb)
            //         } else {
            //             myChart.on(item.event, cb)
            //         }
            //     })
            // }
            //定时刷新
            timingRefresh()
        },
        /* 处理数据请求 */
        apiRequest() {
            const { apiReqUrl, apiMethod, apiParam } = this.options
            const method = apiMethod || 'get'
            return Axios({
                method: method,
                url: apiReqUrl || 'http://localhost/api',
                data: apiParam || {},
                [method == 'get' && 'params']: apiParam || {},
            })
        },
        /* 定时刷新 */
        timingRefresh() {
            const {
                useApiData,
                openTimingRefresh,
                refreshPeriod,
            } = this.options

            if (useApiData && openTimingRefresh) {
                //先清空
                clearInterval(this.refreshTimer)
                this.refreshTimer = null
                //开始刷新
                this.refreshTimer = setInterval(() => {
                    this.options.lastChangeTime = Date.now()
                }, refreshPeriod * 1000)
            } else {
                //关闭刷新
                clearInterval(this.refreshTimer)
                this.refreshTimer = null
            }
        },
    },
}
