<!--
 * @Description: 侧边栏
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:31:45
 * @LastEditTime: 2020-09-17 09:50:00
-->
<template>
    <div class="asideCont">
        <h2>组件库</h2>
        <el-collapse v-model="cpActiveName"
                     accordion>
            <el-collapse-item title="柱状图/条形图"
                              name="1"
                              class="collapseItem">
                <div class="asideItem"
                     data-type="lineChart"
                     @mousedown="asideItemDown"
                     @mouseup="asideItemDown"></div>
            </el-collapse-item>
            <el-collapse-item title="折线图/曲线图"
                              name="2"
                              class="collapseItem">
                <div class="asideItem"
                     data-type="lineChart"
                     @mousedown="asideItemDown"
                     @mouseup="asideItemDown"></div>
            </el-collapse-item>
            <el-collapse-item title="饼状图/扇形图"
                              name="3"
                              class="collapseItem">
                <div class="asideItem"
                     data-type="lineChart"
                     @mousedown="asideItemDown"
                     @mouseup="asideItemDown"></div>
            </el-collapse-item>
            <el-collapse-item title="柱线复合图"
                              name="4"
                              class="collapseItem">
                <div class="asideItem"
                     data-type="lineChart"
                     @mousedown="asideItemDown"
                     @mouseup="asideItemDown"></div>
            </el-collapse-item>
            <el-collapse-item title="雷达图"
                              name="5"
                              class="collapseItem">
                <div class="asideItem"
                     data-type="lineChart"
                     @mousedown="asideItemDown"
                     @mouseup="asideItemDown"></div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { getRanId } from '@/utils/myUtils'
const {
    mapState: mapStateSystem,
    mapActions: mapActionSystem,
} = createNamespacedHelpers('system')
const { mapMutations: mapMutationsLayer } = createNamespacedHelpers('layer')
export default {
    name: 'asideCont',
    data() {
        return {
            bodyMouseEnter: false, //body层鼠标按下
            asideItemEnter: false, //侧边组件item层鼠标按下
            cloneItemMoveInPane: false, //克隆元素移入操作面板状态
            curMouseOffset: [0, 0],
            cloneItem: null,
            cpActiveName: '1', //折叠面板当前激活项
        }
    },
    computed: {
        ...mapStateSystem(['viewPanelDomRect', 'viewPanelScale']), //操作面板信息
    },
    methods: {
        ...mapMutationsLayer(['addLayer']), //新增图层
        ...mapActionSystem(['domAddEventListener']), //body添加监听事件
        asideItemDown({
            type,
            button,
            clientX,
            clientY,
            offsetX,
            offsetY,
            target,
        }) {
            if (button != 0) return false //非鼠标左键return
            this.asideItemEnter = type == 'mousedown'
            this.curMouseOffset = [offsetX, offsetY]
            this.cloneItem = target.cloneNode(true) // 克隆元素（拖拽时跟随鼠标效果）
            this.cloneItem.style = `position: absolute;
                                    left:${clientX - offsetX}px;
                                    top:${clientY - offsetY}px;   
                                    opacity:.5; 
                                    z-index:2;
                                `
            document.body.appendChild(this.cloneItem)
        },
        domMousedown({ button }) {
            if (button != 0) return false //非鼠标左键return
            this.bodyMouseEnter = true
        },
        domMouseup({ button }) {
            if (button != 0) return false //非鼠标左键return
            // 状态还原
            const {
                asideItemEnter,
                cloneItemMoveInPane,
                viewPanelDomRect,
                cloneItem,
                addLayer,
                viewPanelScale,
            } = this
            if (asideItemEnter) {
                this.bodyMouseEnter = false
                this.asideItemEnter = false
                //确认移入组件-新增图层
                if (cloneItemMoveInPane) {
                    const { x: cx, y: cy } = cloneItem.getBoundingClientRect() //克隆元素位置
                    const { x: vx, y: vy } = viewPanelDomRect //视图操作面板位置
                    addLayer({
                        id: `L-${getRanId()}`,
                        type: cloneItem.getAttribute('data-type'), //组件类型
                        pos: [
                            //组件相对于实际视图的位置
                            (cx - vx) / viewPanelScale,
                            (cy - vy) / viewPanelScale,
                        ],
                    })
                }
                // 移除克隆dom
                this.cloneItem.remove()
                // 清内存
                this.cloneItem = null
            }
        },
        domMousemove({ button, clientX, clientY }) {
            if (button != 0) return false //非鼠标左键return
            const {
                bodyMouseEnter,
                asideItemEnter,
                curMouseOffset,
                viewPanelDomRect,
            } = this
            if (asideItemEnter && bodyMouseEnter) {
                // 克隆元素跟随
                let [_left, _top] = [
                    clientX - curMouseOffset[0],
                    clientY - curMouseOffset[1],
                ]
                this.cloneItem.style.left = `${_left}px`
                this.cloneItem.style.top = `${_top}px`
                //判断是否移入视图操作面板
                const { width, height, x, y } = viewPanelDomRect
                if (
                    _left >= x &&
                    _top >= y &&
                    _left <= x + width &&
                    _top <= y + height
                ) {
                    //移入时克隆元素添加轴线
                    this.cloneItem.className = 'asideItem act'
                    //层级改变
                    this.cloneItem.style['z-index'] = 0
                    //状态改变
                    this.cloneItemMoveInPane = true
                } else {
                    //移出时恢复class
                    this.cloneItem.className = 'asideItem'
                    //层级恢复
                    this.cloneItem.style['z-index'] = 2
                    //状态改变
                    this.cloneItemMoveInPane = false
                }
            }
        },
    },
    mounted() {
        /* body 鼠标事件绑定 */
        const {
            domAddEventListener,
            domMousedown,
            domMousemove,
            domMouseup,
        } = this
        domAddEventListener({
            evType: 'onmousedown',
            func: domMousedown,
        })
        domAddEventListener({
            evType: 'onmousemove',
            func: domMousemove,
        })
        domAddEventListener({
            evType: 'onmouseup',
            func: domMouseup,
        })
    },
}
</script>
<style lang="scss" scoped>
$actColor: #3c4650;
.asideCont {
    border-top: 1px solid #999;
    h2 {
        margin: 0;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: $actColor;
    }
}
.asideItem {
    width: 100px;
    height: 100px;
    background: #ff0;
    @mixin act {
        content: '';
        display: block;
        position: absolute;
    }
    $border-act: 1px dashed #0ff;
    &.act {
        border: $border-act;
        &::before {
            @include act;
            width: 1px;
            height: 200vh;
            border-left: $border-act;
            left: -1px;
            bottom: -100vh;
        }
        &::after {
            @include act;
            width: 200vw;
            height: 1px;
            border-top: $border-act;
            top: -1px;
            right: -100vw;
        }
    }
}
</style>