/*
 * @Description: 其他非图表组件公共方法
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月4日 09:26:38
 * @LastEditTime: 2021-01-26 16:50:09
 */
import autoResize from './autoResize'
import Axios from '../utils/axios'
import { myLoading } from '../utils/myUtils'

export default {
    mixins: [autoResize],
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
            // refreshTimer: null,
        }
    },
    computed: {
        myOptions() {
            return new this.Config(this.options).options
        },
        jsonStrOptions() {
            //转下字符串以防无法监听
            return JSON.stringify(this.options)
        },
    },
    watch: {
        jsonStrOptions(val) {
            //实时数据改变
            console.log(val)
        },
    },
    mounted() {
        this.getData()
    },
    methods: {
        /* 数据获取及处理 */
        async getData() {
            const { $el, options, apiRequest, timingRefresh } = this
            // //这里处理数据请求
            if (options.useApiData) {
                //loading
                //如果开启定时刷新的话不显示loading
                options.openTimingRefresh || myLoading.show($el)

                let res = await apiRequest()
                if (!options.apiResHandle) {
                    this.options.dynamicData = res
                } else if (typeof options.apiResHandle == 'string') {
                    const apiResHandle = eval(`(${options.apiResHandle})`)
                    this.options.dynamicData = apiResHandle(res)
                } else {
                    this.options.dynamicData = options.apiResHandle(res)
                }

                //关闭loading
                options.openTimingRefresh || myLoading.hide($el)
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
            // //定时刷新
            // timingRefresh()
            // //重置尺寸
            // myChart.resize()
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
