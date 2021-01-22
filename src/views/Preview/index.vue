<!--
 * @Description: 预览页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月25日 18:27:45
 * @LastEditTime: 2021-01-22 16:36:39
-->
<template>
    <div class="container">
        <div
            class="preview"
            :style="{
                width: pageOptions.screenSize[0] + 'px',
                height: pageOptions.screenSize[1] + 'px',
                transform,
            }"
        >
            <!-- 图层渲染(采用动态组件) -->
            <div
                v-for="(item, index) in layers"
                v-show="item.show"
                :key="index"
                class="viewItem"
                :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`"
            >
                <!-- 动态组件 -->
                <component
                    :is="item.type"
                    :options="item.compOptions"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import autoResize from '@/mixin/autoResize'

export default {
    name: 'Preview',
    mixins: [autoResize],
    data() {
        return {
            layers: JSON.parse(sessionStorage.getItem(`layers`)),
            pageOptions: JSON.parse(sessionStorage.getItem(`pageOptions`)),
            transform: 'scale(1) translate(-50%,-50%)',
        }
    },
    watch: {
        /* 监听图层事件变化，执行联动事件 */
        layerChartEventsString(val, oldVal) {
            const valObj = JSON.parse(val),
                oldValObj = JSON.parse(oldVal)
            valObj.forEach((item, index) => {
                item.forEach((v, i) => {
                    const valTransmitObj = JSON.stringify(v.transmitObj),
                        oldTransmitObj = JSON.stringify(
                            oldValObj[index][i].transmitObj
                        )

                    if (valTransmitObj != oldTransmitObj) {
                        //找到联动的图层
                        let linkageLayers = this.layers.filter((layer) =>
                            v.linkageLayers.includes(layer.id)
                        )
                        //合并传参
                        linkageLayers.forEach((layer) => {
                            if (
                                layer.compOptions &&
                                layer.compOptions.apiParam
                            ) {
                                layer.compOptions.apiParam = {
                                    ...layer.compOptions.apiParam,
                                    ...v.transmitObj,
                                }
                            }
                        })
                    }
                })
            })
        },
    },
    computed: {
        /* 找到事件数据并转为字符串方便监听 */
        layerChartEventsString() {
            return JSON.stringify(
                this.layers.map((item) => item.compOptions.chartEvents)
            )
        },
    },
    methods: {
        afterAutoResizeMixinInit() {
            //初始化
            this.onResize()
            this.ready = true
        },
        onResize() {
            //计算缩放比例
            const { clientWidth, clientHeight } = document.body
            const scale = Math.min.apply(null, [
                clientWidth / this.pageOptions.screenSize[0],
                clientHeight / this.pageOptions.screenSize[1],
            ])
            //this.transform = `scale(${scale}) translate(-50%,-50%)`
        },
    },
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background: #000;
    .preview {
        position: absolute;
        left: 50%;
        top: 50%;
        background-image: url(../../assets/img/bg.jpg);
        background-position: center top;
        background-size: cover;
        background-repeat: no-repeat;
        transform-origin: 0 0 0;
        .viewItem {
            position: absolute;
        }
    }
}
</style>
