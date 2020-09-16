<!--
 * @Description: 可视区
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-16 17:49:46
-->
<template>
    <!-- 可视区域 -->
    <div class="visualArea">
        <!-- 工作台 -->
        <div class="platform"
             :style="`width:${platformSize[0]}px;height:${platformSize[1]}px;left:${platformPos[0]}px;top:${platformPos[1]}px`">
            <!-- 网格 -->
            <div class="grid"></div>
            <!-- 视图面板层 -->
            <ViewPanel />
            <!-- 缩略图层 -->
            <Thumbnail :visualAreaSize="[width,height]"
                       :platformSize="platformSize" />
            <!-- 配置项侧栏 -->
            <OptionPanel />
        </div>
    </div>
</template>

<script>
import ViewPanel from './inc/viewPanel'
import OptionPanel from './inc/optionPanel'
import Thumbnail from './inc/thumbnail'
import autoResize from '../mixin/autoResize'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('system')
export default {
    name: 'visualArea',
    mixins: [autoResize],
    components: {
        ViewPanel,
        OptionPanel,
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
        document.onkeydown = ({ keyCode }) => {
            if (!this.curkeydownCodes.includes(keyCode)) {
                this.setCurkeydownCodes(keyCode)
            }
        }
        document.onkeyup = ({ keyCode }) => {
            this.setCurkeydownCodes(keyCode)
        }
    },
    methods: {
        ...mapMutations(['setCurkeydownCodes']),
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
        .grid {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: linear-gradient(
                    to top,
                    transparent 14px,
                    #444 15px
                ),
                linear-gradient(to left, transparent 14px, #444 15px);
            background-size: 15px 15px;
        }
    }
}
</style>