/*
 * @Description: 系统层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-10 11:32:19
 * @LastEditTime: 2021-02-27 14:30:52
 */
export default {
    namespaced: true,
    state: {
        pageOptions: {
            title: '',
            screenSize: [1920, 1080],
            bgColor: 'rgba(5, 26, 69, 1)',
            useBgImage: false,
            showGrid: false,
            bgImage: '',
            pid: '',
        },
        asideShow: true, //侧边栏开关
        optionPanelShow: true, //配置栏开关
        blueprintPos: [60, 60], //视图层位置(左上顶点left,top)
        blueprintScale: 1, //视图层缩放
        platformPos: [0, 0], //工作台位置
        blueprintDomRect: null, //视图操作层实际参数getBoundingClientRect（尺寸、位置）
        curkeydownCodes: [], //当前键盘按下的按键
        showLayerCtxMenu: false, //显示图层右键菜单
        layerCtxMenu: {
            pos: [0, 0], //图层右键菜单位置
            layer: null, //当前图层
        },
        domEventFncs: {
            //document.body上添加的事件(避免多个事件覆盖或重复)
            onmousedown: [],
            onmouseup: [],
            onmousemove: [],
        },
    },
    mutations: {
        setPageOptions(state, data) {
            state.pageOptions = {
                ...state.pageOptions,
                ...data,
            }
        },
        setAsideShow(state) {
            state.asideShow = !state.asideShow
        },
        setOptionPanel(state) {
            state.optionPanelShow = !state.optionPanelShow
        },
        setBlueprintPos(state, pos) {
            state.blueprintPos = pos
        },
        setBlueprintScale(state, num) {
            state.blueprintScale =
                Math.round((state.blueprintScale + num) * 10) / 10
            if (num == 0) {
                state.blueprintScale = 1
            }
            if (state.blueprintScale < 0.1) {
                state.blueprintScale = 0.1
                this._vm.$message({
                    message: '不能再继续缩小了',
                    type: 'warning',
                })
            }
            if (state.blueprintScale > 1.5) {
                state.blueprintScale = 1.5
                this._vm.$message({
                    message: '不能再继续放大了',
                    type: 'warning',
                })
            }
        },
        setPlatformPos(state, pos) {
            //设置工作台位置
            state.platformPos = pos
        },
        setBlueprintDomRect(state) {
            //更新视图操作面板实际参数
            const { width, height, x, y } = document
                .querySelector('.blueprint')
                .getBoundingClientRect()
            state.blueprintDomRect = { width, height, x, y }
        },
        //更新按键
        setCurkeydownCodes(state, keyCode) {
            let codes = state.curkeydownCodes
            codes.includes(keyCode)
                ? codes.splice(codes.indexOf(keyCode), 1)
                : state.curkeydownCodes.push(keyCode)
        },
        //图层右键菜单显隐
        setShowLayerCtxMenu(state, bool) {
            state.showLayerCtxMenu = bool
        },
        //设置图层右键菜单
        setLayerCtxMenu(state, data) {
            state.layerCtxMenu = data
        },
        //设置dom事件
        setDomEventFncs(state, { evType, func }) {
            //无方法添加方法
            if (state.domEventFncs[evType]) {
                state.domEventFncs[evType].includes(func) ||
                    state.domEventFncs[evType].push(func)
            } else {
                state.domEventFncs[evType] = [func]
            }
        },
    },
    actions: {
        //document添加监听事件
        domAddEventListener({ state, commit }, { evType, func }) {
            commit('setDomEventFncs', { evType, func }) //设置body事件
            document[evType] = (e) => {
                //执行所有方法
                state.domEventFncs[evType].forEach((func) => {
                    func(e)
                })
                //阻止默认事件
                // e.preventDefault()
                // return false
            }
        },
    },
    getters: {
        pageOptionsStr: (state) => JSON.stringify(state.pageOptions),
    },
}
