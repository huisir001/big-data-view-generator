/*
 * @Description: resize及DOM样式变动监听器
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-02 17:32:53
 * @LastEditTime: 2021-02-19 10:16:28
 */
import {
    debounce, //防抖
    observerDomRestyle, //监听DOM样式变动
} from '../utils/myUtils'

export default {
    data() {
        return {
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
            const {
                initWH,
                getDebounceInitWHFun,
                bindDomResizeCallback,
                afterAutoResizeMixinInit, //自适应初始化后执行钩子
            } = this
            //初始化宽高
            await initWH(false)
            //防抖
            getDebounceInitWHFun()
            //开启监听
            bindDomResizeCallback()
            //钩子执行
            if (
                afterAutoResizeMixinInit &&
                typeof afterAutoResizeMixinInit === 'function'
            ) {
                afterAutoResizeMixinInit()
            }
        },
        initWH(resize = true) {
            const { $nextTick, $el, onResize } = this
            return new Promise((resolve) => {
                //$nextTick延时执行避免在DOM未初始化时触发resize监听器
                $nextTick((e) => {
                    //获取当前dom
                    const dom = (this.dom = $el)
                    //宽高变动
                    this.width = dom ? dom.clientWidth : 0
                    this.height = dom ? dom.clientHeight : 0
                    //异常
                    if (!dom) {
                        console.warn('未能获得dom节点，组件可能出现异常！')
                    } else if (!this.width || !this.height) {
                        console.warn('组件宽度或高度为0px，可能会出现异常！')
                    }
                    //宽高响应后执行钩子（可以放置一些其他需要跟随变动的内容）
                    if (onResize && typeof onResize === 'function' && resize)
                        onResize()
                    resolve()
                })
            })
        },
        getDebounceInitWHFun() {
            this.debounceInitWHFun = debounce(this.initWH, 400) //防抖
        },
        bindDomResizeCallback() {
            const { dom, debounceInitWHFun } = this
            this.domObserver = observerDomRestyle(dom, debounceInitWHFun) //DoM变化执行
            window.addEventListener('resize', debounceInitWHFun) //窗口变化执行
        },
        unbindDomResizeCallback() {
            //断开监听
            let { domObserver, debounceInitWHFun } = this
            if (!domObserver) return //避免多次执行
            domObserver.takeRecords() //清空监听队列
            domObserver.disconnect() //取消DOM监听
            domObserver = null //清内存
            window.removeEventListener('resize', debounceInitWHFun) //取消resize监听
        },
    },
}
