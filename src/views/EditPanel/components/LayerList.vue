<!--
 * @Description: 图层面板(图层列表)
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月21日 16:21:50
 * @LastEditTime: 2021-02-20 15:16:01
-->
<template>
    <div class="layerList">
        <div
            v-for="(layer, index) in layersReverse"
            :class="{ layer: true, act: layer.active }"
            :key="index"
            :data-layerindex="index"
            @mouseenter.prevent="layerHover"
            @mouseleave.prevent="layerHover"
            @contextmenu.prevent="layerCtxMenu"
            @click="layerSelect"
        >
            <img class="icon" :src="iconImgs[layer.type]" />
            <div class="cont">
                <div class="name">{{ layer.name }}</div>
                <div class="layerid">
                    <span>ID：{{ layer.id }}</span>
                </div>
            </div>
            <div class="indicator">
                <i
                    :class="{
                        'el-icon-view': !layer.show,
                        not: !layer.show,
                    }"
                ></i>
                <i
                    :class="{
                        'el-icon-lock': layer.locked,
                    }"
                ></i>
            </div>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const {
    mapState: mapStateSystem,
    mapMutations: mapMutationSystem,
} = createNamespacedHelpers('system')
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
        ...mapStateSystem(['curkeydownCodes']), //系统信息
        layersReverse() {
            let copyLayer = JSON.parse(JSON.stringify(this.layers))
            return copyLayer.reverse()
        },
    },
    methods: {
        ...mapMutations(['setLayer']), //修改图层，设置选定图层
        ...mapMutationSystem(['setShowLayerCtxMenu', 'setLayerCtxMenu']),
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
        //图层激活
        layerHover({ type, target }) {
            let { setHoverLayer, layersReverse } = this
            if (type == 'mouseenter') {
                setHoverLayer(layersReverse[target.dataset.layerindex], true)
            } else {
                setHoverLayer(layersReverse[target.dataset.layerindex], false)
            }
        },
        //图层选定
        layerSelect({ target }) {
            const {
                setActiveLayer,
                layersReverse,
                activeLayers,
                curkeydownCodes,
            } = this
            const curLayer = layersReverse[target.dataset.layerindex]

            // 若已锁定，提示先解锁
            if (curLayer.locked) {
                this.$message({
                    type: 'error',
                    message: '请先解锁',
                })
                return
            }

            if (curkeydownCodes.includes(17)) {
                //多选(多选时若已选定则取消选定)
                setActiveLayer(curLayer, !target.className.includes('act'))
            } else {
                //单选时若已选定则不执行
                if (target.className.includes('act')) return
                //单选时只选定一个，取消其他选定的图层
                activeLayers.forEach((item) => {
                    setActiveLayer(item, false)
                })
                setActiveLayer(curLayer, true)
            }
        },
        //图层右键菜单事件
        layerCtxMenu({ clientX, clientY, target }) {
            const { setShowLayerCtxMenu, setLayerCtxMenu, layersReverse } = this
            //显示菜单
            setShowLayerCtxMenu(true)
            //设置当前菜单(判断当前右键事件是在图层上点击还是面板上)
            setLayerCtxMenu({
                pos: [clientX, clientY],
                layer: layersReverse[target.dataset.layerindex],
                isSetPanel: true,
            })
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
        border-bottom: 1px solid #212528;
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
            width: 143px;
            margin-left: 10px;
            .name {
                font-size: 13px;
                color: #a2c1e1;
                font-family: auto, songti;
                height: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                word-break: break-all;
            }
            .layerid {
                color: #898989;
                font-size: 12px;
            }
        }
        .indicator {
            color: #607d8b;
            font-size: 12px;
            width: 12px;
            position: absolute;
            right: 8px;
            [class^='el-icon-'].not::after {
                content: '—';
                font-size: 12px;
                transform: rotate(-45deg) translate(-11px, -6px);
                display: inline-block;
                width: 0;
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
            .indicator {
                color: #33434f;
            }
        }
    }
}
</style>
