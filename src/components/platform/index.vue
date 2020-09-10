<!--
 * @Description: 工作台
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:08:29
 * @LastEditTime: 2020-09-10 13:45:03
-->
<template>
    <div class="platform"
         ref="platform">
        <!-- 网格 -->
        <div class="grid"></div>
        <!-- 视图面板层 -->
        <ViewPanel />
        <!-- 缩略图层 -->
        <Thumbnail :platformSize="[width,height]" />
        <!-- 配置项侧栏 -->
        <OptionPanel />
    </div>
</template>

<script>
import ViewPanel from './inc/viewPanel'
import OptionPanel from './inc/optionPanel'
import Thumbnail from './inc/thumbnail'
import autoResize from '../mixin/autoResize'
export default {
    name: 'platform',
    mixins: [autoResize],
    components: {
        ViewPanel,
        OptionPanel,
        Thumbnail,
    },
    data() {
        return {}
    },
}
</script>
<style lang="scss" scoped>
.platform {
    height: 100%;
    background-color: #2a2e33;
    position: relative;
    overflow: hidden;
    .grid {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: linear-gradient(to top, transparent 19px, #444 20px),
            linear-gradient(to left, transparent 19px, #444 20px);
        background-size: 20px 20px;
        z-index: 10;
    }
}
</style>