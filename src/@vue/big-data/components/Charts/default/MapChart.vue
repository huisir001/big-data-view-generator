<!--
 * @Description: 标准地图(当前只支持单数据地图)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年8月28日 15:18:18
 * @LastEditTime: 2020-09-25 15:07:30
-->
<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import common from '../../../mixins/charts.common'
export default {
    name: 'MapChart',
    mixins: [common],
    props: {
        mapType: String, //必传，地申明图类型（多个地图不能重复）
        geoJson: Object, //必传，地图地理json
        title: String, //标题，可有可无
        titleDiy: Object, //自定义标题格式（一般用于环饼图中间显示总数据）
        zoom: Number, //当前视角缩放比例
        roam: Boolean, //是否开启平游或缩放，默认不开启，申明即开启
        tooltipFmt: String | Function, //提示框的字符串模板，如`{a} <br/>{b} : {c}%`,或者使用有返回值的函数
        hideVisualMap: Boolean, //是否隐藏地图图例，申明即隐藏
        visualMapX: String, //图例X位置
        visualMapY: String, //图例Y位置
        inRangeColors: Array, //地图颜色排列（按图例层级）
        max: Number, //地图图例最大值（默认为数据中的最大值）
        visualMapText: Array, //地图图例提示，默认['H', 'L']
        visualMapItemHeight: Number, //图例高度，默认80
    },
    data() {
        return {
            series: null,
        }
    },
    mounted() {
        //注册地图类型
        echarts.registerMap(this.mapType, this.geoJson)
    },
    methods: {
        getOptions(series) {
            //所有数据 方便计算最大值
            let allDatas = []
            //配置格式
            series.forEach((item) => {
                allDatas = allDatas.concat(item.data)
                Object.assign(item, {
                    type: 'map',
                    mapType: this.mapType, // 自定义扩展地图类型
                    zoom: this.zoom || 1, //当前视角缩放比例
                    roam: this.roam, //是否开启平游或缩放，默认不开启，申明即开启
                    itemStyle: {
                        normal: { label: { show: true }, color: '#fff' },
                        color: '#fff',
                    },
                })
            })

            //返回配置项
            return {
                title: this.titleDiy || {
                    text: this.title,
                },
                tooltip: {
                    //提示
                    trigger: 'item',
                    [this.tooltipFmt && 'formatter']: this.tooltipFmt,
                },
                [this.hideVisualMap || 'visualMap']: {
                    //地图图例
                    min: 0,
                    //最大值为数据中的最大值
                    max:
                        this.max ||
                        Math.max.apply(
                            null,
                            allDatas.map((item) => item.value)
                        ),
                    x: this.visualMapX || 'right',
                    y: this.visualMapY || 'bottom',
                    itemHeight: this.visualMapItemHeight || 80,
                    text: this.visualMapText || ['H', 'L'],
                    realtime: false,
                    calculable: true,
                    [this.inRangeColors && 'inRange']: {
                        color: this.inRangeColors,
                    },
                },
                series, //数据赋值
            }
        },
    },
}
</script>