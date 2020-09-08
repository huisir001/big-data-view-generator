/*
 * @Description: echarts公共方法（重构）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月4日 09:26:38
 * @LastEditTime: 2020-09-07 17:29:30
 */
import echarts from 'echarts'
import '@/utils/echarts.theme' //自定义主题mytheme
import autoResize from './autoResize'

export default {
  mixins: [autoResize],
  props: {
    apiMethod: Function, //API请求数据方法（父传子），必传
    apiParam: Object | String, //请求数据传参，必传
    staticData: Object | Array //无需请求，直接给定数据(静态数据),或者自定义请求接口
  },
  data() {
    return {
      myChart: null,
      curChartData: null
    }
  },
  watch: {
    staticData(newVal) {
      this.chartRender(newVal) //数据改变实时渲染
    }
  },
  mounted() {
    this.initChart() //初始化chart
  },
  methods: {
    /* 初始化chart */
    async initChart() {
      const {
        $el,
        staticData,
        apiMethod,
        apiParam,
        getMyChart,
        chartRender
      } = this

      //获取chart对象
      this.myChart = getMyChart($el)

      //请求数据
      this.curChartData = staticData || (await apiMethod(apiParam))

      //子父传参
      this.$emit('getChartData', this.curChartData) //父组件通过@getChartData事件获取

      //渲染图表
      chartRender(this.curChartData)
    },

    /* 获取chart对象 */
    getMyChart: ele => {
      let myChart = echarts.init(ele, 'mytheme')
      //loading
      myChart.showLoading({
        color: '#dcfffe',
        text: '',
        maskColor: 'rgba(0, 0, 0, 0)'
      })
      return myChart
    },

    /* chart渲染 */
    chartRender(curChartData) {
      const { myChart, getOptions } = this
      myChart.hideLoading()
      myChart.setOption(getOptions(curChartData))
    },

    /* 窗口缩放后重新调整图标尺寸 */
    onResize() {
      const { myChart } = this
      if (!myChart) return
      myChart.resize()
    }
  }
}
