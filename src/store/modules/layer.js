/*
 * @Description: 视图面板图层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月14日 10:10:38
 * @LastEditTime: 2020-09-28 14:27:08
 */
import { getRanId } from '@/utils/myUtils'

export default {
  namespaced: true,
  state: {
    layers: [], //所有图层
    copyLayer: null //已复制图层（剪贴板）
  },
  mutations: {
    //修改某个图层
    setLayer(state, layer) {
      state.layers.forEach(item => {
        item.id == layer.id && Object.assign(item, layer)
      })
    },
    //新增图层
    addLayer(state, layer) {
      const ranId = getRanId()
      layer.id = `L-${ranId}` //赋值id，若已有id会被覆盖
      layer.title += `_${ranId}` //图层初始标题用id区分
      layer.locked = false //解锁图层
      state.layers.forEach(item => item.active && (item.active = false)) //移除之前已选定图层
      layer.active = true //是否选定，默认刚新增的图层是选定的
      const NewLayer = {
        show: true, //图层显隐，默认显示
        zIndex: 99, //默认层级
        width: 300, //默认宽
        height: 200, //默认高
        ...layer
      }
      //新增
      state.layers.push(NewLayer)
    },
    //删除图层
    delLayer(state, layer) {
      let delIndex = state.layers.findIndex(({ id }) => id == layer.id) //找到图层位置
      state.layers.splice(delIndex, 1) //删除
    },
    //上移图层
    moveupLayer(state, layer) {
      let index = state.layers.findIndex(({ id }) => id == layer.id) //找到图层位置
      //底部元素不下移
      if (index != state.layers.length - 1) {
        state.layers[index] = state.layers.splice(
          index + 1,
          1,
          state.layers[index]
        )[0]
      }
    },
    //下移图层
    movedownLayer(state, layer) {
      let index = state.layers.findIndex(({ id }) => id == layer.id) //找到图层位置
      //第一个元素不上移
      if (index != 0) {
        //删除前一个图层，用当前图层替换，并将删除的图层赋值当前位置
        state.layers[index] = state.layers.splice(
          index - 1,
          1,
          state.layers[index]
        )[0]
      }
    },
    //置顶图层
    toTopLayer(state, layer) {
      let index = state.layers.findIndex(({ id }) => id == layer.id) //找到图层位置
      index != state.layers.length - 1 &&
        state.layers.push(state.layers.splice(index, 1)[0])
    },
    //置底图层
    toBotLayer(state, layer) {
      let index = state.layers.findIndex(({ id }) => id == layer.id) //找到图层位置
      index != 0 && state.layers.unshift(state.layers.splice(index, 1)[0]) //删除当前图层并将其推到顶部
    },
    //复制图层
    setCopyLayer(state, layer) {
      state.copyLayer = layer
    },
    //粘贴图层
    pasteLayer(state, pos) {
      //新增复制的图层
      state.copyLayer.pos = pos
      this.commit('layer/addLayer', state.copyLayer)
      //清空复制的图层
      state.copyLayer = null
    }
  },
  getters: {},
  actions: {}
}
