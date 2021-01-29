<!--
 * @Description: 表格组件-不支持排序，排序让后端去处理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-01-29 18:42:09
-->
<template>
    <div class="hs-component">
        <div
            class="tableBox"
            @scroll="tableBoxScroll"
            :class="{ scrollLeft, scrollRight }"
        >
            <table class="hs-table">
                <thead>
                    <tr>
                        <th
                            v-for="(col, idx) in headersArrange"
                            :key="idx"
                            :class="{
                                fixed: col.fixed,
                                left: col.fixed && col.fixedPos == 'left',
                                right: col.fixed && col.fixedPos == 'right',
                                last: fixedLeftHeadersLast == col.field,
                                first: fixedRightHeadersLast == col.field,
                            }"
                            :ref="col.fixed ? col.fixedPos : 'th_other'"
                            :style="{ width: col.width + 'px' }"
                        >
                            <span>{{ col.label }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 有数据时 -->
                    <template v-if="numRows > 0">
                        <tr
                            v-for="(row, i) in visibleRows"
                            :key="i"
                            :class="'row_' + i"
                        >
                            <td
                                v-for="(col, j) in headersArrange"
                                :key="j"
                                :class="{
                                    fixed: col.fixed,
                                    left: col.fixed && col.fixedPos == 'left',
                                    right: col.fixed && col.fixedPos == 'right',
                                    last: fixedLeftHeadersLast == col.field,
                                    first: fixedRightHeadersLast == col.field,
                                }"
                                :ref="
                                    col.fixed
                                        ? col.fixedPos + '_' + i
                                        : 'td_other'
                                "
                            >
                                {{ row[col.field] }}
                            </td>
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
        </div>

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
            default: [],
            required: true,
        },
        rows: {
            type: Array,
            default: [],
            required: true,
        },
        pagination: {
            type: Object,
            default: [],
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
            scrollLeft: true,
            scrollRight: false,
        }
    },
    watch: {
        rows: function () {
            this.tableRows = this.rows.slice(0)
            this.selectVisibleRows()
        },
    },
    computed: {
        //hearder 根据固定列排序
        headersArrange() {
            const headers = this.headers
            let leftArr = headers.filter(
                    (h) => h.fixed && h.fixedPos == 'left'
                ),
                rightArr = headers.filter(
                    (h) => h.fixed && h.fixedPos == 'right'
                ),
                midArr = headers.filter((h) => !h.fixed)
            return leftArr.concat(midArr).concat(rightArr)
        },
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
        //固定在左侧的最后一列
        fixedLeftHeadersLast() {
            var cols = this.headers.filter(
                (h) => h.fixed && h.fixedPos == 'left'
            )
            return cols.length > 0 ? cols[cols.length - 1].field : null
        },
        //固定在右侧的第一列
        fixedRightHeadersLast() {
            var cols = this.headers.filter(
                (h) => h.fixed && h.fixedPos == 'right'
            )
            return cols.length > 0 ? cols[0].field : null
        },
    },
    mounted() {
        const { rows, selectVisibleRows, $nextTick, fixedColSetPos } = this
        this.tableRows = rows.slice(0) // Para que haga una copia del array
        selectVisibleRows()
        //页面完全渲染结束之后调用
        $nextTick(() => {
            fixedColSetPos()
        })
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
        //滚动事件
        tableBoxScroll(e) {
            let { scrollLeft, scrollWidth, clientWidth } = e.target
            this.scrollLeft = scrollLeft == 0
            this.scrollRight = scrollLeft == scrollWidth - clientWidth
        },
        //固定列控制位置
        fixedColSetPos() {
            const leftCols = this.$refs.left,
                rightCols = this.$refs.right

            if (leftCols) {
                let leftWidth = 0
                leftCols.forEach((el, edx) => {
                    Object.keys(this.$refs).forEach((ref) => {
                        if (ref.includes('left')) {
                            this.$refs[ref][edx].style.left = leftWidth + 'px'
                        }
                    })
                    leftWidth += el.clientWidth
                })
            }
            if (rightCols) {
                //逆序数组，这里不用reverse()方法是因为其会改变原数组内存
                function getReverseArr(arr) {
                    let reverseArr = []
                    arr.forEach((item) => {
                        reverseArr.unshift(item)
                    })
                    return reverseArr
                }
                //定位算法
                let rightWidth = 0
                getReverseArr(rightCols).forEach((el, edx) => {
                    Object.keys(this.$refs).forEach((ref) => {
                        if (ref.includes('right')) {
                            getReverseArr(this.$refs[ref])[edx].style.right =
                                rightWidth + 'px'
                        }
                    })
                    rightWidth += el.clientWidth
                })
            }
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin fixed-shandow {
    &.left.last::after,
    &.right.first::after {
        content: '';
        display: block;
        position: absolute;
        height: calc(100% + 2px);
        width: 6px;
        top: -1px;
    }
    &.left.last::after {
        right: -6px;
        background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0),
            rgba(165, 165, 165, 0.2)
        );
    }
    &.right.first::after {
        left: -6px;
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(165, 165, 165, 0.2)
        );
    }
}
.hs-component {
    height: 100%;
    width: 100%;
    .tableBox {
        height: calc(100% - 30px);
        overflow: auto;
        background: #7cc3fd;
        &::-webkit-scrollbar {
            display: none;
        }
        &:hover {
            /* 设置滚动条的样式 */
            &::-webkit-scrollbar {
                display: block;
                width: 10px;
                height: 10px;
            }
            /*滚动槽*/
            &::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.1);
                margin-top: 48px;
            }
            /* 滚动条滑块 */
            &::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.2);
            }
            /* 横向纵向滚动条交汇处 */
            &::-webkit-scrollbar-corner {
                background: rgba(0, 0, 0, 0);
            }
        }
        .hs-table {
            border-collapse: collapse;
            width: 100%;
            table-layout: auto; /* 单元格尺寸自适应 */
            // table-layout: fixed; /* 单元格尺寸自定义 */
            thead {
                th {
                    border-bottom: 1px solid #ffffff;
                    padding: 0 10px;
                    height: 48px;
                    text-align: left;
                    font-size: 12px;
                    color: #fff;
                    background-color: #7cc3fd;
                    position: sticky;
                    top: 0;
                    z-index: 2;
                    white-space: nowrap; /* 不允许换行 */
                    &.fixed {
                        position: sticky;
                        z-index: 3;
                        @include fixed-shandow;
                    }
                }
            }
            tbody {
                tr {
                    &:nth-child(odd) > td {
                        background-color: #e9f5ff;
                    }
                    &:nth-child(even) > td {
                        background-color: #fafaeb;
                    }
                }
                td {
                    border-bottom: 1px solid #ffffff;
                    padding: 0 10px;
                    height: 48px;
                    font-size: 12px;
                    white-space: nowrap; /* 不允许换行 */
                    &.fixed {
                        position: sticky;
                        z-index: 1;
                        @include fixed-shandow;
                    }
                }
            }
        }
        &.scrollLeft .left,
        &.scrollRight .right {
            &::after {
                display: none !important;
            }
        }
    }
}
</style>
