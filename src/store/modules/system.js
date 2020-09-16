/*
 * @Description: 系统层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-10 11:32:19
 * @LastEditTime: 2020-09-16 17:52:37
 */
export default {
  namespaced: true,
  state: {
    optionPanelShow: true, //配置栏开关
    screenSize: [1920, 1080], //视图层尺寸(默认1920*1080)
    viewPanelPos: [60, 60], //视图层位置(左上顶点left,top)
    viewPanelScale: 1, //视图层缩放
    platformPos: [0, 0], //工作台位置
    viewPanelDomRect: null, //视图操作层实际参数getBoundingClientRect（尺寸、位置）
    curkeydownCodes: [] //当前键盘按下的按键
  },
  mutations: {
    setOptionPanel(state) {
      state.optionPanelShow = !state.optionPanelShow
    },
    setViewPanelPos(state, pos) {
      state.viewPanelPos = pos
    },
    setViewPanelScale(state, num) {
      state.viewPanelScale = Math.round((state.viewPanelScale + num) * 10) / 10
      if (num == 0) {
        state.viewPanelScale = 1
      }
      if (state.viewPanelScale < 0.1) {
        state.viewPanelScale = 0.1
        this._vm.$message({
          message: '不能再继续缩小了',
          type: 'warning'
        })
      }
      if (state.viewPanelScale > 1.5) {
        state.viewPanelScale = 1.5
        this._vm.$message({
          message: '不能再继续放大了',
          type: 'warning'
        })
      }
    },
    setPlatformPos(state, pos) {
      //设置工作台位置
      state.platformPos = pos
    },
    setViewPanelDomRect(state) {
      //更新视图操作面板实际参数
      const { width, height, x, y } = document
        .querySelector('.viewPanel')
        .getBoundingClientRect()
      state.viewPanelDomRect = { width, height, x, y }
    },
    //更新按键
    setCurkeydownCodes(state, keyCode) {
      let codes = state.curkeydownCodes
      codes.includes(keyCode)
        ? codes.splice(codes.indexOf(keyCode), 1)
        : state.curkeydownCodes.push(keyCode)
    }
  },
  getters: {},
  actions: {}
}
