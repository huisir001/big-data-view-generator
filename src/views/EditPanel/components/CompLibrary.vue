<!--
 * @Description: 组件库
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月9日 17:31:45
 * @LastEditTime: 2020-09-23 19:34:43
-->
<template>
    <div class="compLibrary">
        <el-collapse v-model="cpActiveName"
                     accordion>
            <el-collapse-item v-for="(item,index) in compList"
                              :key="index"
                              :title="item.category"
                              :name="index+1">
                <div class="collapseItem">
                    <div class="compItem"
                         v-for="(comp,i) in item.list"
                         :key="i"
                         :data-type="comp.type"
                         :data-title="comp.title"
                         @mousedown="compItemDown"
                         @mouseup="compItemDown">
                        <div class="title">{{comp.title}}</div>
                        <img :src="comp.pic">
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import compList from '@/config/compList'
import { createNamespacedHelpers } from 'vuex'
const {
    mapState: mapStateSystem,
    mapActions: mapActionSystem,
} = createNamespacedHelpers('system')
const { mapMutations: mapMutationsLayer } = createNamespacedHelpers('layer')
export default {
    name: 'CompLibrary',
    data() {
        return {
            compList, //组件库数据
            bodyMouseEnter: false, //body层鼠标按下
            compItemEnter: false, //侧边组件item层鼠标按下
            cloneItemMoveInPane: false, //克隆元素移入操作面板状态
            curMouseOffset: [0, 0],
            cloneItem: null,
            cpActiveName: '1', //折叠面板当前激活项
        }
    },
    computed: {
        ...mapStateSystem(['blueprintDomRect', 'blueprintScale']), //操作面板信息
    },
    methods: {
        ...mapMutationsLayer(['addLayer']), //新增图层
        ...mapActionSystem(['domAddEventListener']), //body添加监听事件
        compItemDown({
            type,
            button,
            clientX,
            clientY,
            offsetX,
            offsetY,
            target,
        }) {
            if (button != 0) return false //非鼠标左键return
            this.compItemEnter = type == 'mousedown'
            this.curMouseOffset = [offsetX, offsetY]
            this.cloneItem = target.cloneNode(true) // 克隆元素（拖拽时跟随鼠标效果）
            this.cloneItem.style = `position: absolute;
                                    left:${clientX - offsetX}px;
                                    top:${clientY - offsetY}px;   
                                    margin:0;
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
                compItemEnter,
                cloneItemMoveInPane,
                blueprintDomRect,
                cloneItem,
                addLayer,
                blueprintScale,
            } = this
            if (compItemEnter) {
                this.bodyMouseEnter = false
                this.compItemEnter = false
                //确认移入组件-新增图层
                if (cloneItemMoveInPane) {
                    const { x: cx, y: cy } = cloneItem.getBoundingClientRect() //克隆元素位置
                    const { x: vx, y: vy } = blueprintDomRect //视图操作面板位置
                    addLayer({
                        type: cloneItem.getAttribute('data-type'), //组件类型
                        title: cloneItem.getAttribute('data-title'), //组件标题
                        pos: [
                            //组件相对于实际视图的位置
                            (cx - vx) / blueprintScale,
                            (cy - vy) / blueprintScale,
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
                compItemEnter,
                curMouseOffset,
                blueprintDomRect,
            } = this
            if (compItemEnter && bodyMouseEnter) {
                // 克隆元素跟随
                let [_left, _top] = [
                    clientX - curMouseOffset[0],
                    clientY - curMouseOffset[1],
                ]
                this.cloneItem.style.left = `${_left}px`
                this.cloneItem.style.top = `${_top}px`
                //判断是否移入视图操作面板
                const { width, height, x, y } = blueprintDomRect
                if (
                    _left >= x &&
                    _top >= y &&
                    _left <= x + width &&
                    _top <= y + height
                ) {
                    //移入时克隆元素添加轴线
                    this.cloneItem.className = 'compItem act'
                    //层级改变
                    this.cloneItem.style['z-index'] = 0
                    //状态改变
                    this.cloneItemMoveInPane = true
                } else {
                    //移出时恢复class
                    this.cloneItem.className = 'compItem'
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
.collapseItem {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.compItem {
    width: 100px;
    height: 100px;
    background: #212528;
    margin-top: 15px;
    cursor: move;
    &:nth-child(1),
    &:nth-child(2) {
        margin: 0;
    }
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
    img {
        width: 100%;
    }
}
</style>