/*
 * @Description: 视图面板图层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月14日 10:10:38
 * @LastEditTime: 2020-09-14 11:43:20
 */
export default {
  namespaced: true,
  state: {
    layers: [
      {
        id: 'l-dasdaskld121',
        type: 'lineChart',
        width: 300,
        height: 200,
        left: 12,
        top: 15,
        zIndex: 12
      }
    ]
  },
  mutations: {
    setLayer(state, layer) {
      state.layers.forEach(item => {
        item.id == layer.id && Object.assign(item, layer)
      })
    },
    addLayer(state, layer) {
      state.layers.push(layer)
    }
  },
  getters: {},
  actions: {}
}
