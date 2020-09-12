<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:31:45
 * @LastEditTime: 2020-09-12 18:25:27
-->
<template>
    <div class="asideCont">
        侧边栏
        <div class="asideItem"
             ref="asideItem"
             @mousedown="asideItemDown"
             @mouseup="asideItemDown"></div>
    </div>
</template>

<script>
export default {
    name: 'asideCont',
    data() {
        return {
            bodyMouseEnter: false,
            asideItemEnter: false,
            curMouseOffset: [0, 0],
            cloneItem: null,
        }
    },
    methods: {
        asideItemDown({ type, clientX, clientY, offsetX, offsetY, target }) {
            this.asideItemEnter = type == 'mousedown'
            this.curMouseOffset = [offsetX, offsetY]
            this.cloneItem = target.cloneNode(true) // 克隆元素（拖拽时跟随鼠标效果）
            this.cloneItem.style = `position: absolute;
                                    left:${clientX - offsetX}px;
                                    top:${clientY - offsetY}px;   
                                    opacity:.5; 
                                `
            document.body.appendChild(this.cloneItem)
        },
    },
    mounted() {
        /* body 鼠标事件绑定 */
        let dom = document.body
        dom.onmousedown = () => {
            this.bodyMouseEnter = true
        }
        dom.onmouseup = () => {
            // 状态还原
            if (this.asideItemEnter) {
                this.bodyMouseEnter = false
                this.asideItemEnter = false
                // 移除克隆dom
                this.cloneItem.remove()
                // 清内存
                this.cloneItem = null
            }
        }
        dom.onmousemove = ({ clientX, clientY }) => {
            const { bodyMouseEnter, asideItemEnter, curMouseOffset } = this
            if (asideItemEnter && bodyMouseEnter) {
                // 克隆元素跟随
                this.cloneItem.style.left = `${clientX - curMouseOffset[0]}px`
                this.cloneItem.style.top = `${clientY - curMouseOffset[1]}px`
            }
            // 阻止默认事件
            return false
        }
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
</style>