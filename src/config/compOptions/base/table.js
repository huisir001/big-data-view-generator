/*
 * @Description: 表格配置项默认值
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-02 18:22:13
 * @LastEditTime: 2021-02-02 18:22:46
 */
import { publicOpts } from './common'

export default {
    ...publicOpts,
    nowrap: true,
    tableLayoutAuto: true,
    cellCentered: false,
    thHeight: 40,
    tdHeight: 40,
    thBgColor: '#7cc3fd',
    tdOddBgColor: '#e9f5ff',
    tdEvenBgColor: '#fafaeb',
    thFontColor: '#ffffff',
    tdFontColor: '#444444',
    thFontSize: 13,
    tdFontSize: 12,
    showTableOutBorder: false,
    tableOutBorderStyle: 'solid',
    tableOutBorderWidth: 1,
    tableOutBorderColor: '#333333',
    showTableCelBorder: false,
    tableCelBorderStyle: 'solid',
    tableCelBorderWidth: 1,
    tableCelBorderColor: '#333333',
    showPage: true,
    itemsPerPage: 10,
    pageNavAlign: 'center',
    pageNavStyle: 'select',
    pageNavFontSize: 15,
    pageNavFontColor: '#444444',
}
