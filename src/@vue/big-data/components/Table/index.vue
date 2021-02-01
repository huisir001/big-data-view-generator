<!--
 * @Description: 表格组件-支持简单展示功能和样式调整
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-02-01 18:34:42
-->
<template>
    <div style="width: 500px; height: 300px">
        <TableView
            :headers="columns"
            :rows="items"
            :pagination="pagination"
        ></TableView>
    </div>
</template>

<script>
import Config from './inc/Config'
import { columns, rows } from './data'
import TableView from './components/TableView'

export default {
    name: 'App',
    components: {
        TableView,
    },
    data() {
        return {
            columns: columns,
            // items: rows,
            items: [],
            pagination: {
                itemsPerPage: 7,
                align: 'center',
                // enabled: false,//允许分页
                // visualStyle: 'select',
            },
        }
    },
}
</script>
