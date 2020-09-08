/*
 * @Description: 数据模拟
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-08-06 13:59:49
 * @LastEditTime: 2020-09-08 18:04:38
 */
import Mock from 'mockjs'
import { Bar1, Bar2, Bar3, Bar4 } from './roles/defaultChart/bar'

//延时
Mock.setup({
  timeout: '0-300'
})

//柱图
Mock.mock(/\/getBar1/, 'get', Bar1)
Mock.mock(/\/getBar2/, 'get', Bar2)
Mock.mock(/\/getBar3/, 'get', Bar3)
Mock.mock(/\/getBar4/, 'get', Bar4)
