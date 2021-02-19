<!--
 * @Description: 内置图框
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-18 11:03:28
 * @LastEditTime: 2021-02-19 10:37:41
-->
<template>
    <component
        :is="`BorderBox${myOptions.borderBoxId}`"
        :color="myOptions.useDefaultColor ? undefined : myOptions.colors"
        :backgroundColor="myOptions.bgColor"
        :reverse="myOptions.reverse"
        :dur="myOptions.transDur"
        :titleWidth="myOptions.titleWidth"
        :title="myOptions.title"
        :width="width"
        :height="height"
    ></component>
</template>

<script>
import Config from './Config'
import others from '../../mixins/others'
import { debounce, observerDomRestyle } from '../../utils/myUtils'
import {
    BorderBox1,
    BorderBox2,
    BorderBox3,
    BorderBox4,
    BorderBox5,
    BorderBox6,
    BorderBox7,
    BorderBox8,
    BorderBox9,
    BorderBox10,
    BorderBox11,
    BorderBox12,
    BorderBox13,
} from './components'

export default {
    name: 'BorderBox',
    mixins: [others],
    components: {
        BorderBox1,
        BorderBox2,
        BorderBox3,
        BorderBox4,
        BorderBox5,
        BorderBox6,
        BorderBox7,
        BorderBox8,
        BorderBox9,
        BorderBox10,
        BorderBox11,
        BorderBox12,
        BorderBox13,
    },
    data() {
        return {
            Config,
            dom: null,
            width: 0,
            height: 0,
            debounceInitWHFun: null, //防抖回调
            domObserver: null, //dom监听器
        }
    },
    mounted() {
        this.autoResizeMixinInit() //初始化
    },
    beforeDestroy() {
        this.unbindDomResizeCallback() //vm销毁前取消监听
    },
    methods: {
        async autoResizeMixinInit() {
            const { initWH, getDebounceInitWHFun, bindDomResizeCallback } = this
            //初始化宽高
            await initWH(false)
            //防抖
            getDebounceInitWHFun()
            //开启监听
            bindDomResizeCallback()
        },
        initWH(resize = true) {
            const { $nextTick, $el } = this
            return new Promise((resolve) => {
                //$nextTick延时执行避免在DOM未初始化时触发resize监听器
                $nextTick((e) => {
                    //获取当前dom
                    const dom = (this.dom = $el.parentNode)
                    //宽高变动
                    this.width = dom ? dom.clientWidth : 0
                    this.height = dom ? dom.clientHeight : 0
                    resolve()
                })
            })
        },
        getDebounceInitWHFun() {
            this.debounceInitWHFun = debounce(this.initWH, 200) //防抖
        },
        bindDomResizeCallback() {
            const { dom, debounceInitWHFun } = this
            this.domObserver = observerDomRestyle(dom, debounceInitWHFun) //DoM变化执行
        },
        unbindDomResizeCallback() {
            //断开监听
            let { domObserver, debounceInitWHFun } = this
            if (!domObserver) return //避免多次执行
            domObserver.takeRecords() //清空监听队列
            domObserver.disconnect() //取消DOM监听
            domObserver = null //清内存
        },
    },
}
</script>
