/*
 * @Description: 系统层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-10 11:32:19
 * @LastEditTime: 2020-09-10 17:08:23
 */
export default {
  namespaced: true,
  state: {
    optionPanelShow: true, //配置栏开关
    screenSize: [1920, 1080], //视图层尺寸(默认1920*1080)
    viewPanelPos: [0, 0], //视图层位置(左上顶点left,top)
    viewPanelScale: 1 //视图层缩放
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
        return
      }
      if (state.viewPanelScale < 0.1) {
        state.viewPanelScale = 0.1
        this._vm.$message({
          message: '不能再继续缩小了',
          type: 'warning'
        })
        return
      }
      if (state.viewPanelScale > 1) {
        state.viewPanelScale = 1
        this._vm.$message({
          message: '当前已是最大尺寸',
          type: 'warning'
        })
      }
    }
  },
  getters: {},
  actions: {}
}
