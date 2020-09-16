/*
 * @Description: 视图面板图层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月14日 10:10:38
 * @LastEditTime: 2020-09-16 09:13:32
 */
export default {
  namespaced: true,
  state: {
    layers: [
      // {
      //   id: 'L-dasdaskld121',
      //   type: 'lineChart',
      //   width: 300,
      //   height: 200,
      //   pos:[12,15],
      //   zIndex: 12
      // }
    ]
  },
  mutations: {
    setLayer(state, layer) {
      //修改某个图层
      state.layers.forEach(item => {
        item.id == layer.id && Object.assign(item, layer)
      })
    },
    addLayer(state, layer) {
      const NewLayer = {
        zIndex: 500, //默认层级
        width: 300, //默认宽高
        height: 200,
        ...layer
      }
      state.layers.push(NewLayer)
    }
  },
  getters: {},
  actions: {}
}
