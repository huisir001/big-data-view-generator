<!--
 * @Description: 视图面板
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月10日 09:33:27
 * @LastEditTime: 2020-09-12 17:59:34
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
const { mapState } = createNamespacedHelpers('system')
export default {
    name: 'viewPanel',
    data() {
        return {}
    },
    computed: {
        ...mapState(['screenSize', 'viewPanelPos', 'viewPanelScale']),
        viewPanelStyle() {
            const { screenSize, viewPanelPos, viewPanelScale } = this
            return {
                width: screenSize[0] + 'px',
                height: screenSize[1] + 'px',
                borderWidth: '2px',
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
}
</script>
<style lang="scss" scoped>
.viewPanel {
    position: absolute;
    border-color: #409eff;
    border-style: dashed;
    background-image: url(../../../assets/img/bg.jpg);
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    .contBox {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 11;
    }
}
</style>