<!--
 * @Description: 用于生成html页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月25日 18:27:45
 * @LastEditTime: 2021-03-02 23:38:23
-->
<template>
    <div class="container">
        <div class="preview"
             :style="{
                width: pageOptions.screenSize[0] + 'px',
                height: pageOptions.screenSize[1] + 'px',
                backgroundImage:
                    pageOptions.showGrid || !pageOptions.useBgImage
                        ? 'none'
                        : `url(${pageOptions.bgImage})`,
                backgroundColor: pageOptions.showGrid
                    ? 'transparent'
                    : pageOptions.bgColor,
            }">
            <!-- 图层渲染(采用动态组件) -->
            <div v-for="(item, index) in layers"
                 v-show="item.show"
                 :key="index"
                 class="viewItem"
                 :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`">
                <!-- 动态组件 -->
                <component :is="item.type"
                           :options="item.compOptions"></component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'preview',
    data() {
        return {
            layers: window.layers,
            pageOptions: window.pageOptions,
        }
    },
    watch: {
        /* 监听图层事件变化，执行图表联动事件 */
        layerChartEventsString(val, oldVal) {
            const valObj = JSON.parse(val),
                oldValObj = JSON.parse(oldVal)
            valObj.forEach((item, index) => {
                if (item) {
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
                }
            })
        },
        /* 监听图层变化，执行基础组件图层联动事件 */
        layerBaseEventsString(val, oldVal) {
            const valObj = JSON.parse(val),
                oldValObj = JSON.parse(oldVal)

            valObj.forEach((item, index) => {
                if (item.linkageLayers && item.linkageLayers.length > 0) {
                    const curEventVal = valObj[index].value,
                        oldEventVal = oldValObj[index].value

                    if (curEventVal != oldEventVal) {
                        //找到联动的图层
                        let linkageLayers = this.layers.filter((layer) =>
                            item.linkageLayers.includes(layer.id)
                        )

                        const transmitObj = {
                            [item.field]: item.value,
                        }

                        //合并传参
                        linkageLayers.forEach((layer) => {
                            if (
                                layer.compOptions &&
                                layer.compOptions.apiParam
                            ) {
                                layer.compOptions.apiParam = {
                                    ...layer.compOptions.apiParam,
                                    ...transmitObj,
                                }
                                console.log(layer.compOptions.apiParam)
                            }
                        })
                    }
                }
            })
        },
    },
    computed: {
        /* 找到图表事件数据并转为字符串方便监听 */
        layerChartEventsString() {
            return JSON.stringify(
                this.layers.map((item) => item.compOptions.chartEvents)
            )
        },
        /* 找到基础组件事件数据转为字符串方便监听 */
        layerBaseEventsString() {
            return JSON.stringify(
                this.layers.map(({ compOptions }) => {
                    const { field, value, linkageLayers } = compOptions
                    return {
                        field,
                        value,
                        linkageLayers,
                    }
                })
            )
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
        position: relative;
        background-position: center top;
        background-size: cover;
        background-repeat: no-repeat;
        .viewItem {
            position: absolute;
        }
    }
}
</style>
