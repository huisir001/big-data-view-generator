<!--
 * @Description: 表格组件-不支持排序，排序让后端去处理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-01-28 18:14:11
-->
<template>
    <div class="hs-component" :class="cssStyle">
        <table class="hs-table">
            <thead>
                <tr>
                    <th v-for="(col, idx) in headers" :key="idx">
                        <span>{{ col.label }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- 有数据时 -->
                <template v-if="numRows > 0">
                    <tr v-for="(row, idx) in visibleRows" :key="idx">
                        <slot name="items" :row="row"></slot>
                    </tr>
                </template>
                <!-- 数据为空时 -->
                <template v-else>
                    <tr>
                        <td :colspan="numColumns">
                            <slot name="no-data"></slot>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>

        <TablePagination
            v-if="paginationEnabled"
            :page="page"
            :total-pages="totalPages"
            :pagination-options="paginationOptions"
            @new-page="onNewPage"
        />
    </div>
</template>

<script>
import TablePagination from './TablePagination'

export default {
    name: 'TableView',
    components: {
        TablePagination,
    },
    props: {
        headers: {
            type: Array,
            default() {
                return []
            },
            required: true,
        },
        rows: {
            type: Array,
            default() {
                return []
            },
            required: true,
        },
        pagination: {
            type: Object,
            default() {
                return {}
            },
        },
        cssStyle: {
            type: String,
            default: 'ozn',
        },
    },
    data() {
        return {
            paginationDefault: {
                enabled: true,
                itemsPerPage: 5,
                align: 'right',
                visualStyle: 'buttons',
            },
            visibleRows: {},
            tableRows: {},
            page: 1,
        }
    },
    watch: {
        rows: function () {
            this.tableRows = this.rows.slice(0)
            this.selectVisibleRows()
        },
    },
    computed: {
        paginationOptions() {
            return Object.assign(this.paginationDefault, this.pagination)
        },
        paginationEnabled() {
            return (
                this.paginationOptions.enabled &&
                this.paginationOptions.itemsPerPage > 0 &&
                this.numRows > 0
            )
        },
        //数据条数
        numRows() {
            return this.rows.length
        },
        numColumns() {
            return this.headers.length
        },
        totalPages() {
            return this.paginationEnabled
                ? Math.ceil(this.numRows / this.paginationOptions.itemsPerPage)
                : null
        },
    },
    mounted() {
        this.tableRows = this.rows.slice(0) // Para que haga una copia del array
        this.selectVisibleRows()
    },
    methods: {
        onNewPage: function (newPage) {
            this.page = newPage
            this.selectVisibleRows()
        },
        selectVisibleRows: function () {
            if (this.paginationEnabled) {
                const rowFirst =
                    this.page * this.paginationOptions.itemsPerPage -
                    this.paginationOptions.itemsPerPage
                const rowLast = this.page * this.paginationOptions.itemsPerPage
                this.visibleRows = this.tableRows.slice(rowFirst, rowLast)
            } else this.visibleRows = this.tableRows.slice(0)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ozn {
    .hs-table {
        border-collapse: collapse;
        width: 100%;
        thead {
            th {
                border-bottom: 2px solid #ccc;
                padding: 0 10px;
                height: 48px;
                text-align: left;
                font-size: 1em;
                i {
                    color: #aaa;
                    &.active {
                        color: #ff6633;
                        + span {
                            color: #ff6633;
                        }
                    }
                }
            }
        }
        tbody {
            tr {
                &:nth-child(odd) {
                    background-color: #fafafa;
                }
            }
            td {
                border-bottom: 1px dotted #ccc;
                padding: 0 10px;
                height: 48px;
                font-size: 1em;
            }
        }
    }
}
</style>
