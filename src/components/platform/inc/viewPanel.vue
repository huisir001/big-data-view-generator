<!--
 * @Description: 视图面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-09-15 11:58:03
-->
<template>
    <div class="viewPanel"
         :style="viewPanelStyle">
        <div class="contBox">
            <div class="viewItem"
                 :style="viewItemStyle"></div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import autoResize from '@/components/mixin/autoResize'
const {
    mapState: mapStateSystem,
    mapMutations: mapMutationSystem,
} = createNamespacedHelpers('system')
const { mapState: mapStateLayer } = createNamespacedHelpers('layer')
export default {
    name: 'viewPanel',
    mixins: [autoResize],
    data() {
        return {}
    },
    computed: {
        ...mapStateSystem(['screenSize', 'viewPanelPos', 'viewPanelScale']), //系统信息
        ...mapStateLayer(['layers']), //图层信息
        viewPanelStyle() {
            const { screenSize, viewPanelPos, viewPanelScale } = this
            return {
                width: screenSize[0] + 'px',
                height: screenSize[1] + 'px',
                left: viewPanelPos[0] + 'px',
                top: viewPanelPos[1] + 'px',
                transform: `scale(${viewPanelScale})`,
                // backgroundImage: 'url(assets/img/bg.jpg)',
            }
        },
        viewItemStyle() {
            return {}
        },
    },
    methods: {
        ...mapMutationSystem(['setViewPanelDomRect']),
        afterAutoResizeMixinInit() {
            //初始化钩子
            //更新视图操作面板实际参数
            this.setViewPanelDomRect()
        },
        onResize() {
            //dom变化及窗口调整钩子
            //更新视图操作面板实际参数
            this.setViewPanelDomRect()
        },
    },
}
</script>
<style lang="scss" scoped>
.viewPanel {
    position: absolute;
    border-color: #409eff;
    border-style: dashed;
    border-width: 2px;
    background-image: url(../../../assets/img/bg.jpg);
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    transform-origin: 0 0 0; //缩放参考点
    .contBox {
        position: absolute;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        top: -2px;
        left: -2px;
        z-index: 11;
    }
}
</style>