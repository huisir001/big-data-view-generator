<!--
 * @Description: 表格组件-支持简单展示功能和样式调整
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-02-05 10:16:44
-->
<template>
    <TableView
        :headers="myOptions.tableCols"
        :rows="rows"
        :tableStyles="tableStyles"
        :pagination="pagination"
    ></TableView>
</template>

<script>
import Config from './inc/Config'
import others from '../../mixins/others'
import TableView from './components/TableView'

export default {
    name: 'Table',
    mixins: [others],
    components: {
        TableView,
    },
    data() {
        return { Config }
    },
    computed: {
        rows() {
            const { myOptions } = this
            return myOptions.useApiData
                ? myOptions.dynamicData || []
                : myOptions.staticData
        },
        tableStyles() {
            const {
                nowrap,
                tableLayoutAuto,
                cellCentered,
                thHeight,
                tdHeight,
                thBgColor,
                tdOddBgColor,
                tdEvenBgColor,
                thFontColor,
                tdFontColor,
                thFontSize,
                tdFontSize,
                showTableOutBorder,
                tableOutBorderStyle,
                tableOutBorderWidth,
                tableOutBorderColor,
                showTableCelBorder,
                tableCelBorderStyle,
                tableCelBorderWidth,
                tableCelBorderColor,
            } = this.myOptions
            return {
                nowrap,
                tableLayoutAuto,
                cellCentered,
                thHeight,
                tdHeight,
                thBgColor,
                tdOddBgColor,
                tdEvenBgColor,
                thFontColor,
                tdFontColor,
                thFontSize,
                tdFontSize,
                showTableOutBorder,
                tableOutBorderStyle,
                tableOutBorderWidth,
                tableOutBorderColor,
                showTableCelBorder,
                tableCelBorderStyle,
                tableCelBorderWidth,
                tableCelBorderColor,
            }
        },
        pagination() {
            const {
                showPage,
                itemsPerPage,
                pageNavAlign,
                pageNavStyle,
                pageNavFontSize,
                pageNavFontColor,
            } = this.myOptions
            return {
                enabled: showPage, //允许分页
                itemsPerPage,
                align: pageNavAlign,
                visualStyle: pageNavStyle,
                fontSize: pageNavFontSize,
                fontColor: pageNavFontColor,
            }
        },
    },
}
</script>
