<!--
 * @Description: 可视区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-22 10:34:00
-->
<template>
    <!-- 可视区域 -->
    <div class="visualArea">
        <!-- 刻度尺 -->
        <Ruler />
        <!-- 工作台 -->
        <div class="platform"
             :style="`width:${platformSize[0]}px;height:${platformSize[1]}px;left:${platformPos[0]}px;top:${platformPos[1]}px`">
            <!-- 视图面板层 -->
            <Blueprint />
            <!-- 缩略图层 -->
            <Thumbnail :visualAreaSize="[width,height]"
                       :platformSize="platformSize" />
            <!-- 图层列表侧栏 -->
            <slot name="layerList"></slot>
            <!-- 配置项侧栏 -->
            <slot name="options"></slot>
        </div>
    </div>
</template>

<script>
import Ruler from './Ruler'
import Blueprint from './Blueprint'
import Thumbnail from './Thumbnail'
import autoResize from '@/mixin/autoResize'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('system')
export default {
    name: 'visualArea',
    mixins: [autoResize],
    components: {
        Ruler,
        Blueprint,
        Thumbnail,
    },
    computed: {
        ...mapState(['screenSize', 'platformPos', 'curkeydownCodes']),
        //工作台尺寸
        platformSize() {
            let { width, height, screenSize } = this
            let myWidth = screenSize[0] * 1.5 + 360,
                myHeight = screenSize[1] * 1.5 + 230
            return [myWidth, myHeight]
        },
    },
    mounted() {
        //document添加全局事件
        const { domAddEventListener } = this
        domAddEventListener({
            evType: 'onkeydown',
            func: ({ keyCode }) => {
                if (!this.curkeydownCodes.includes(keyCode)) {
                    this.setCurkeydownCodes(keyCode)
                }
            },
        })
        domAddEventListener({
            evType: 'onkeyup',
            func: ({ keyCode }) => {
                this.setCurkeydownCodes(keyCode)
            },
        })
    },
    methods: {
        ...mapMutations(['setCurkeydownCodes']),
        ...mapActions(['domAddEventListener']),
    },
}
</script>
<style lang="scss" scoped>
.visualArea {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .platform {
        background-color: #2a2e33;
        position: absolute;
        /* 网格 */
        background-image: linear-gradient(to top, transparent 11px, #444 12px),
            linear-gradient(to left, transparent 11px, #444 12px);
        background-size: 12px 12px;
    }
}
</style>