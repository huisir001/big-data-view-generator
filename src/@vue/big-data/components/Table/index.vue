<!--
 * @Description: 表格组件-支持简单展示功能和样式调整
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-01-29 14:45:08
-->
<template>
    <div style="width: 500px; height: 300px">
        <TableView :headers="columns" :rows="items" :pagination="pagination">
            <template v-slot:no-data>
                <div class="no_data">暂无数据</div>
            </template>
        </TableView>
    </div>
</template>

<script>
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
            items: rows,
            // items: [],
            pagination: {
                itemsPerPage: 7,
                align: 'center',
                // visualStyle: 'select',
            },
        }
    },
}
</script>

<style lang="scss" scoped>
.no_data {
    text-align: center;
}
</style>
