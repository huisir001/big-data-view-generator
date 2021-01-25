/*
 * @Description: 表单配置项
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-22 10:14:38
 * @LastEditTime: 2021-01-25 17:24:54
 */

import { publicOpts } from './common'

export default {
    ...publicOpts,
    type: 'text',
    field: 'field',
    value: '',
    placeholder: '请输入...',
    formWidth: 160,
    formHeight: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#333333',
    selectOptions: [],
    dateType: '1',
    linkageLayers: [],
}
