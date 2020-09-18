/*
 * @Description: 视图面板图层
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020年9月14日 10:10:38
 * @LastEditTime: 2020-09-18 16:04:20
 */
import { getRanId } from '@/utils/myUtils'

export default {
  namespaced: true,
  state: {
    layers: [], //所有图层
    copyLayer: null, //已复制图层（剪贴板）
    activeLayers: [] //已激活图层（选定图层，只存图层id）
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
      layer.id = `L-${getRanId()}` //赋值id，若已有id会被覆盖
      layer.locked = false //解锁图层
      const NewLayer = {
        zIndex: 99, //默认层级
        width: 300, //默认宽高
        height: 200,
        ...layer
      }
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
    },
    //选择图层
    setActiveLayers(state, layerIds) {
      state.activeLayers = layerIds
    }
  },
  getters: {},
  actions: {}
}
