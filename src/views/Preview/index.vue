<!--
 * @Description: 预览页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月25日 18:27:45
 * @LastEditTime: 2020-09-25 19:01:43
-->
<template>
    <div class="preview"
         :style="{width:screenSize[0]+'px',height:screenSize[1]+'px',transform}">
        <!-- 图层渲染(采用动态组件) -->
        <div v-for="(item,index) in layers"
             v-show="item.show"
             :key="index"
             :class="{viewItem:true,act:item.active}"
             :data-index="index"
             @mousemove.prevent="layerMove"
             @mousedown.prevent="layerClick"
             @mouseup.prevent="layerClick"
             @mouseleave.prevent="layerLeave"
             :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`">
            <!-- 组件 -->
            <component :is="item.type"
                       :staticData="aaa"></component>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import autoResize from '@/mixin/autoResize'
const { mapState: mapStateSystem } = createNamespacedHelpers('system')
const { mapState: mapStateLayer } = createNamespacedHelpers('layer')
export default {
    name: 'Preview',
    mixins: [autoResize],
    data() {
        return {
            aaa: {
                xAxis: ['罗娜', '田明', '贾平', '彭刚', '张洋', '叶丽'],
                series: [{ data: [683, 542, 864, 279, 885, 916] }],
            },
            transform: 'scale(1)',
        }
    },
    computed: {
        ...mapStateSystem(['screenSize']), //系统信息
        ...mapStateLayer(['layers']), //图层信息
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
                clientWidth / this.screenSize[0],
                clientHeight / this.screenSize[1],
            ])
            this.transform = `scale(${scale})`
        },
    },
}
</script>
<style lang="scss" scoped>
.preview {
    position: fixed;
    left: 0;
    top: 0;
    background-image: url(../../assets/img/bg.jpg);
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    transform-origin: 0 0 0;
    .viewItem {
        position: absolute;
    }
}
</style>