<!--
 * @Description: 表格组件-不支持排序，排序让后端去处理
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-28 10:22:59
 * @LastEditTime: 2021-02-04 18:20:12
-->
<template>
    <div class="hs-table" :style="tableStyleVar">
        <div
            :class="{
                borderBox: true,
                outBorder: tableStyles.showTableOutBorder,
            }"
        >
            <div
                class="tableBox"
                @scroll="tableBoxScroll"
                :class="{
                    scrollLeft,
                    scrollRight,
                    nowrap: tableStyles.nowrap,
                    cellcenter: tableStyles.cellCentered,
                    celBorder: tableStyles.showTableCelBorder,
                }"
            >
                <table
                    :class="{
                        'hs-table': true,
                        layoutAuto: tableStyles.tableLayoutAuto,
                    }"
                >
                    <thead>
                        <tr>
                            <th
                                v-for="(col, idx) in headersArrange"
                                :key="idx"
                                :class="{
                                    fixed: col.fixed,
                                    left: col.fixed && col.fixed == 'left',
                                    right: col.fixed && col.fixed == 'right',
                                    last: fixedLeftHeadersLast == col.field,
                                    first: fixedRightHeadersLast == col.field,
                                }"
                                :ref="col.fixed ? col.fixed : 'th_other'"
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
                                        left: col.fixed && col.fixed == 'left',
                                        right:
                                            col.fixed && col.fixed == 'right',
                                        last: fixedLeftHeadersLast == col.field,
                                        first:
                                            fixedRightHeadersLast == col.field,
                                    }"
                                    :ref="
                                        col.fixed
                                            ? col.fixed + '_' + i
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
                                    <div class="no_data">暂无数据</div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <TablePagination
            v-if="paginationEnabled"
            :page="page"
            :total-pages="totalPages"
            :pagination-options="pagination"
            :btn-bg-color="tableStyles.thBgColor"
            :btn-font-color="tableStyles.thFontColor"
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
        tableStyles: {
            type: Object,
            default() {
                return {
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
                    tableCelBorderColor: '#ffffff',
                }
            },
        },
        pagination: {
            type: Object,
            default() {
                return {
                    enabled: true, //允许分页
                    itemsPerPage: 5,
                    align: 'right',
                    visualStyle: 'buttons',
                    fontSize: 15,
                    fontColor: '#444444',
                }
            },
        },
    },
    data() {
        return {
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
        page(val, oldVal) {
            const { totalPages, $nextTick, fixedColSetPos } = this
            //如若上一页是最后一页，那么重新执行列位置固定
            if (oldVal == totalPages) {
                //页面完全渲染结束之后调用,否则会找不到元素
                $nextTick(() => {
                    fixedColSetPos()
                })
            }
        },
    },
    computed: {
        //hearder 根据固定列排序
        headersArrange() {
            const headers = this.headers
            let leftArr = headers.filter((h) => h.fixed && h.fixed == 'left'),
                rightArr = headers.filter((h) => h.fixed && h.fixed == 'right'),
                midArr = headers.filter((h) => !h.fixed)
            return leftArr.concat(midArr).concat(rightArr)
        },
        paginationEnabled() {
            return (
                this.pagination.enabled &&
                this.pagination.itemsPerPage > 0 &&
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
                ? Math.ceil(this.numRows / this.pagination.itemsPerPage)
                : null
        },
        //固定在左侧的最后一列
        fixedLeftHeadersLast() {
            var cols = this.headers.filter((h) => h.fixed && h.fixed == 'left')
            return cols.length > 0 ? cols[cols.length - 1].field : null
        },
        //固定在右侧的第一列
        fixedRightHeadersLast() {
            var cols = this.headers.filter((h) => h.fixed && h.fixed == 'right')
            return cols.length > 0 ? cols[0].field : null
        },
        //表格样式动态变量
        tableStyleVar() {
            const {
                thHeight,
                tdHeight,
                thBgColor,
                tdOddBgColor,
                tdEvenBgColor,
                thFontColor,
                tdFontColor,
                thFontSize,
                tdFontSize,
                tableOutBorderStyle,
                tableOutBorderWidth,
                tableOutBorderColor,
                tableCelBorderStyle,
                tableCelBorderWidth,
                tableCelBorderColor,
            } = this.tableStyles
            return {
                '--thHeight': thHeight + 'px',
                '--tdHeight': tdHeight + 'px',
                '--thBgColor': thBgColor,
                '--tdOddBgColor': tdOddBgColor,
                '--tdEvenBgColor': tdEvenBgColor,
                '--thFontColor': thFontColor,
                '--tdFontColor': tdFontColor,
                '--thFontSize': thFontSize + 'px',
                '--tdFontSize': tdFontSize + 'px',
                '--tableOutBorder': `${tableOutBorderWidth}px ${tableOutBorderStyle} ${tableOutBorderColor}`,
                '--tableCelBorder': `${tableCelBorderWidth}px ${tableCelBorderStyle} ${tableCelBorderColor}`,
            }
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
                    this.page * this.pagination.itemsPerPage -
                    this.pagination.itemsPerPage
                const rowLast = this.page * this.pagination.itemsPerPage
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
        right: -7px;
        background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0),
            rgba(165, 165, 165, 0.2)
        );
    }
    &.right.first::after {
        left: -7px;
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(165, 165, 165, 0.2)
        );
    }
}
.hs-table {
    height: 100%;
    width: 100%;
    .borderBox {
        height: calc(100% - 30px);
        &.outBorder {
            border: var(--tableOutBorder);
        }
    }
    .tableBox {
        height: 100%;
        overflow: auto;
        background: var(--thBgColor);
        line-height: 1.2;
        /* 设置滚动条的样式 */
        &::-webkit-scrollbar {
            display: block;
            width: 10px;
            height: 10px;
        }
        /*滚动槽*/
        &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            margin-top: var(--thHeight);
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
        }
        /* 横向纵向滚动条交汇处 */
        &::-webkit-scrollbar-corner {
            background: rgba(0, 0, 0, 0);
        }
        .hs-table {
            border-collapse: collapse;
            width: 100%;
            table-layout: fixed; /* 单元格尺寸自定义 */
            min-height: 100%;
            &.layoutAuto {
                table-layout: auto !important; /* 单元格尺寸自适应 */
            }
            thead {
                th {
                    height: var(--thHeight);
                    font-size: var(--thFontSize);
                    background-color: var(--thBgColor);
                    color: var(--thFontColor);
                    padding: 0 10px;
                    text-align: left;
                    position: sticky;
                    top: 0;
                    z-index: 2;
                    &.fixed {
                        z-index: 3;
                        @include fixed-shandow;
                    }
                    &:first-child {
                        border-left: none !important;
                    }
                }
            }
            tbody {
                tr {
                    &:nth-child(odd) > td {
                        background-color: var(--tdOddBgColor);
                    }
                    &:nth-child(even) > td {
                        background-color: var(--tdEvenBgColor);
                    }
                    &:last-child > td {
                        border-bottom: none !important;
                    }
                }
                td {
                    height: var(--tdHeight);
                    font-size: var(--tdFontSize);
                    color: var(--tdFontColor);
                    padding: 0 10px;
                    &:first-child {
                        border-left: none !important;
                    }
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
        &.nowrap {
            th,
            td {
                white-space: nowrap !important; /* 不换行 */
            }
        }
        &.cellcenter {
            th,
            td {
                text-align: center !important;
            }
        }
        &.celBorder {
            th,
            td {
                border-bottom: var(--tableCelBorder);
                border-left: var(--tableCelBorder);
            }
        }
    }
}
.no_data {
    text-align: center;
}
</style>
