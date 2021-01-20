/*
 * @Description: 其他非图表组件公共方法
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月4日 09:26:38
 * @LastEditTime: 2021-01-20 17:42:33
 */
import autoResize from './autoResize'
import Axios from '../utils/axios'

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
            myChart: null,
            refreshTimer: null,
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
        jsonStrOptions() {
            this.chartRender() //数据改变实时渲染
        },
    },
    mounted() {
        this.initChart() //初始化chart
    },
    methods: {
        /* 初始化chart */
        initChart() {
            const { $el, getMyChart, chartRender } = this

            //获取chart对象
            this.myChart = getMyChart($el)

            //渲染图表
            chartRender()
        },

        /* 获取chart对象 */
        getMyChart(ele) {
            let myChart = echarts.init(ele, 'mytheme')
            //loading
            myChart.showLoading({
                color: '#dcfffe',
                text: 'loading',
                textColor: '#dcfffe',
                maskColor: 'rgba(0, 0, 0, 0)',
            })

            //这里将chart对象暴露给父组件
            this.$emit('getCurChart', myChart)
            return myChart
        },

        /* chart渲染 */
        async chartRender() {
            const {
                myChart,
                getEchartsOptions,
                options,
                apiRequest,
                timingRefresh,
            } = this

            myChart.hideLoading()

            //这里处理数据请求
            if (options.useApiData) {
                //loading
                //如果开启定时刷新的话不显示loading
                options.openTimingRefresh ||
                    myChart.showLoading({
                        color: '#dcfffe',
                        text: '数据请求中',
                        textColor: '#dcfffe',
                        maskColor: 'rgba(0, 0, 0, 0.5)',
                    })

                let res = await apiRequest()

                if (!options.apiResHandle) {
                    this.options.dynamicData = res
                } else if (typeof options.apiResHandle == 'string') {
                    const apiResHandle = eval(`(${options.apiResHandle})`)
                    this.options.dynamicData = apiResHandle(res)
                } else {
                    this.options.dynamicData = options.apiResHandle(res)
                }

                options.openTimingRefresh || myChart.hideLoading()
            }

            myChart.setOption(getEchartsOptions(), true)

            //事件绑定
            if (options.chartEvents && options.chartEvents.length > 0) {
                options.chartEvents.forEach((item) => {
                    //事件解绑，防止事件重复绑定
                    myChart.off(item.event)

                    //重新绑定
                    const cb = item.diyCallback
                        ? typeof item.callback == 'string'
                            ? eval(`(${item.callback})`)
                            : item.callback
                        : eval(
                              `(function(e){item.transmitObj = ${item.transmit}})`
                          )

                    if (item.setQuery) {
                        myChart.on(item.event, item.query, cb)
                    } else {
                        myChart.on(item.event, cb)
                    }
                })
            }

            //定时刷新
            timingRefresh()

            //重置尺寸
            myChart.resize()
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

        /* 窗口缩放后重新调整图标尺寸 */
        // onResize() {
        //     const { myChart } = this
        //     if (!myChart) return
        //     myChart.resize()
        // },
    },
}
