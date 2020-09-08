/*
 * @Description: 标准柱图数据格式
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 15:50:28
 * @LastEditTime: 2020-08-12 09:45:35
 */
const stateRes = { code: 0, msg: 'ok' } //状态码

//1柱
export const Bar1 = {
  data: {
    'xAxis|6': ['@cname'],
    series: [{ 'data|6': ['@integer(100, 1000)'] }]
  },
  ...stateRes
}

//多柱
export const Bar2 = {
  data: {
    'xAxis|6': ['@cname'],
    'series|3': [
      {
        name: '@cword(3)',
        'data|6': ['@integer(100, 1000)']
      }
    ]
  },
  ...stateRes
}

//多柱(测试堆叠)
export const Bar3 = {
  data: {
    'xAxis|6': ['@cname'],
    'series|6': [
      {
        'name|+1': ['产品1', '产品2', '产品3', '产品4', '产品5', '产品6'],
        'data|6': ['@integer(100, 1000)']
      }
    ]
  },
  ...stateRes
}

//测试正负数据轴-1柱
export const Bar4 = {
  data: {
    'xAxis|6': ['@cname'],
    series: [{ 'data|6': ['@integer(-1000, 1000)'] }]
  },
  ...stateRes
}
