<!--
 * @Description: 图层面板(图层列表)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:21:50
 * @LastEditTime: 2021-02-19 17:13:56
-->
<template>
    <div class="layerList">
        <div
            v-for="(layer, index) in layers"
            :class="{ layer: true, act: layer.active }"
            :key="index"
            :data-layerindex="index"
            @mouseenter.prevent="layerHover"
            @mouseleave.prevent="layerHover"
            @click="layerSelect"
        >
            <img class="icon" :src="iconImgs[layer.type]" />
            <div class="cont">
                <div class="name">{{ layer.name }}</div>
                <div class="layerid">ID：{{ layer.id }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('system')
const {
    mapState: mapStateLayer,
    mapMutations,
    mapGetters,
} = createNamespacedHelpers('layer')
export default {
    name: 'LayerList',
    data() {
        return {
            iconImgs: {
                BarChart: require('@/assets/img/compList/bar_1.png'),
                BorderBox: require('@/assets/img/compList/borderBox_1.png'),
                Form: require('@/assets/img/compList/form_1.png'),
                GaugeChart: require('@/assets/img/compList/gauge_1.png'),
                LineChart: require('@/assets/img/compList/line_1.png'),
                PieChart: require('@/assets/img/compList/pie_1.png'),
                RadarChart: require('@/assets/img/compList/radar_1.png'),
                ScatterChart: require('@/assets/img/compList/scatter_1.png'),
                Table: require('@/assets/img/compList/table_1.png'),
                TimeText: require('@/assets/img/compList/timeText_1.png'),
                BasicText: require('@/assets/img/compList/basicText_1.png'),
                TwoYAxis: require('@/assets/img/compList/twoYAxis_1.png'),
            },
        }
    },
    computed: {
        ...mapStateLayer(['layers']),
        ...mapGetters(['activeLayers']),
    },
    methods: {
        ...mapMutations(['setLayer']), //修改图层，设置选定图层
        //改变图层选定状态
        setActiveLayer(layer, bool) {
            let newLayer = { ...layer }
            newLayer.active = bool
            this.setLayer(newLayer)
        },
        //改变图层选定状态
        setHoverLayer(layer, bool) {
            let newLayer = { ...layer }
            newLayer.hover = bool
            this.setLayer(newLayer)
        },
        layerHover({ type, target }) {
            let { setHoverLayer, layers } = this
            if (type == 'mouseenter') {
                setHoverLayer(layers[target.dataset.layerindex], true)
            } else {
                setHoverLayer(layers[target.dataset.layerindex], false)
            }
        },
        layerSelect({ target }) {
            let { setActiveLayer, layers, activeLayers } = this
            //单选时只选定一个，取消其他选定的图层
            activeLayers.forEach((item) => {
                setActiveLayer(item, false)
            })
            setActiveLayer(layers[target.dataset.layerindex], true)
        },
    },
}
</script>
<style lang="scss" scoped>
.layerList {
    padding-top: 5px;
    .layer {
        position: relative;
        transition: all 0.3s;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }

        img.icon {
            width: 58px;
            height: 38px;
            border: 1px solid #607d8b;
            padding: 5px 10px;
            background: #33434f;
        }
        .cont {
            width: 158px;
            margin-left: 10px;
            > * {
                height: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                word-break: break-all;
            }
            .name {
                font-size: 13px;
                color: #a2c1e1;
                font-family: auto, songti;
            }
            .layerid {
                color: #898989;
                font-size: 12px;
            }
        }
        &:hover {
            background: #3e4a57;
        }
        &.act {
            background: #409eff;
            img.icon {
                border: 1px solid #33434f;
            }
            .cont .name {
                color: #33434f;
            }
            .cont .layerid {
                color: #777;
            }
        }
    }
}
</style>
