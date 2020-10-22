/*
 * @Description: echarts公共方法（重构）
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月4日 09:26:38
 * @LastEditTime: 2020-10-22 11:48:50
 */
import echarts from 'echarts'
import '../utils/echarts.theme' //自定义主题mytheme
import autoResize from './autoResize'

export default {
  mixins: [autoResize],
  props: {
    options: {
      //参数
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  computed: {
    myOptions() {
      return new this.Config(this.options).options
    },
    jsonStrOptions() {
      //转下字符串以防无法监听
      return JSON.stringify(this.options)
    }
  },
  watch: {
    jsonStrOptions() {
      this.chartRender() //数据改变实时渲染
    }
  },
  mounted() {
    this.initChart() //初始化chart
  },
  methods: {
    /* 初始化chart */
    async initChart() {
      const { $el, getMyChart, chartRender } = this

      //获取chart对象
      this.myChart = getMyChart($el)

      //渲染图表
      chartRender()
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
    chartRender() {
      const { myChart, getEchartsOptions } = this
      myChart.hideLoading()
      myChart.setOption(getEchartsOptions())
    },

    /* 窗口缩放后重新调整图标尺寸 */
    onResize() {
      const { myChart } = this
      if (!myChart) return
      myChart.resize()
    }
  }
}
