<!--
 * @Description: 预览页
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月25日 18:27:45
 * @LastEditTime: 2020-09-28 10:53:59
-->
<template>
    <div class="container">
        <div class="preview"
             :style="{width:screenSize[0]+'px',height:screenSize[1]+'px',transform}">
            <!-- 图层渲染(采用动态组件) -->
            <div v-for="(item,index) in layers"
                 :key="index"
                 class="viewItem"
                 :style="`width:${item.width}px;height:${item.height}px;left:${item.pos[0]}px;top:${item.pos[1]}px;z-index:${item.zIndex};`">
                <!-- 组件 -->
                <component :is="item.type"></component>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import autoResize from '@/mixin/autoResize'
const { mapState: mapStateSystem } = createNamespacedHelpers('system')
export default {
    name: 'Preview',
    mixins: [autoResize],
    data() {
        return {
            layers: JSON.parse(sessionStorage.getItem(`layers`)),
            transform: 'scale(1) translate(-50%,-50%)',
        }
    },
    computed: {
        ...mapStateSystem(['screenSize']), //系统信息
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
            this.transform = `scale(${scale}) translate(-50%,-50%)`
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