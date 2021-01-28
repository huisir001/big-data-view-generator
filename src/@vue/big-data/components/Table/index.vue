<!--
 * @Description: 表格组件-支持简单展示功能和样式调整
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-01-28 18:13:43
-->
<template>
    <div style="width: 500px; height: 200px">
        <TableView
            :headers="columns"
            :rows="items"
            :sort="sort1"
            :pagination="pagination"
            css-style="custom-style"
        >
            <template v-slot:items="{ row }">
                <td>{{ row.first_name }}</td>
                <td>{{ row.last_name }}</td>
                <td>{{ row.email }}</td>
                <td>{{ row.age }}</td>
                <td>{{ row.country }}</td>
                <td>{{ row.category }}</td>
                <td>{{ row.last_update }}</td>
            </template>

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
            sort1: {
                field: 'first_name',
                order: 'asc',
            },
            pagination: {
                itemsPerPage: 7,
                align: 'center',
                // visualStyle: 'select',
            },
        }
    },
}
</script>

<style lang="scss">
.no_data {
    text-align: center;
}
.custom-style {
    // Table styles
    .hs-table {
        border-collapse: collapse;
        width: 100%;
        thead {
            th {
                border-bottom: 1px solid #ffffff;
                padding: 0 10px;
                height: 48px;
                text-align: left;
                font-size: 1em;
                color: #fff;
                background-color: #7cc3fd;
                i {
                    color: #ffffff;
                    &.active {
                        color: #ff00aa;
                        + span {
                            color: #a9237c;
                        }
                    }
                }
            }
        }
        tbody {
            tr {
                &:nth-child(odd) {
                    background-color: #e9f5ff;
                }
                &:nth-child(even) {
                    background-color: #fafaeb;
                }
            }
            td {
                border-bottom: 1px solid #ffffff;
                padding: 0 10px;
                height: 48px;
                font-size: 1em;
            }
        }
    }
    // Paginator styles
    .hs-paginator {
        margin-top: 0.5em;
        select {
            border: 1px solid #7cc3fd;
            border-radius: 8px;
            color: #ffffff;
            background-color: #7cc3fd;
            outline: none;
        }
        button {
            border: 1px solid #7cc3fd;
            border-radius: 8px;
            color: #ffffff;
            background-color: #7cc3fd;
            outline: none;
        }
    }
}
</style>
