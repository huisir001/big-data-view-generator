<!--
 * @Description: 表格组件-支持简单展示功能和样式调整
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-02-02 15:30:06
-->
<template>
    <div style="width: 500px; height: 200px">
        <TableView
            :headers="myOptions.tableCols"
            :rows="rows"
            :tableStyles="tableStyles"
            :pagination="pagination"
        ></TableView>
    </div>
</template>

<script>
import Config from './inc/Config'
import others from '../../mixins/others'
import TableView from './components/TableView'

export default {
    name: 'App',
    components: {
        TableView,
    },
    mixins: [others],
    data() {
        return { Config }
    },
    computed: {
        rows() {
            const { myOptions } = this
            return myOptions.useApiData
                ? myOptions.dynamicData
                : myOptions.compData
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
    mounted() {
        console.log(this.myOptions)
    },
}
</script>
