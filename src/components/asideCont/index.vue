<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:31:45
 * @LastEditTime: 2020-09-10 18:17:53
-->
<template>
    <div class="asideCont">
        侧边栏
        <div class="asideItem"
             ref="asideItem"
             @mousemove="asideItemMove"
             @mousedown="asideItemDown"
             @mouseup="asideItemDown"
             @mouseleave="asideItemLeave"></div>
    </div>
</template>

<script>
export default {
    name: 'asideCont',
    data() {
        return {
            asideItemEnter: false,
            asideItemOffset: [0, 0],
        }
    },
    methods: {
        asideItemDown({ type, offsetX, offsetY }) {
            this.asideItemEnter = type == 'mousedown'
            this.asideItemOffset = [offsetX, offsetY]
            let { left, top } = this.$refs.asideItem.getBoundingClientRect() //相对屏幕位置
        },
        asideItemMove({ offsetX, offsetY }) {
            if (this.asideItemEnter) {
                console.log(offsetX, offsetY)
            }
        },
        //鼠标区域离开
        asideItemLeave() {
            this.asideItemEnter = false
        },
    },
}
</script>
<style lang="scss" scoped>
.asideCont {
    margin-top: 30px;
}
.asideItem {
    width: 100px;
    height: 100px;
    background: #ff0;
}
#aaa {
    opacity: 0.5;
    position: absolute;
}
</style>