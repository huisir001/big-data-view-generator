<template>
    <div
        class="hs-paginator"
        :class="alignClass"
        :style="{
            fontSize: paginationOptions.fontSize + 'px',
            color: paginationOptions.fontColor,
            '--btnBgColor': btnBgColor,
            '--btnFontColor': btnFontColor,
            '--btnFontSize': paginationOptions.fontSize - 4 + 'px',
            '--btnHeight': paginationOptions.fontSize + 4 + 'px',
            '--navHeight': paginationOptions.fontSize + 6 + 'px',
        }"
    >
        <template v-if="paginationOptions.visualStyle === 'select'">
            <span style="margin-right: 5px">第</span>
            <select @change="onChange">
                <option
                    v-for="index in totalPages"
                    :value="index"
                    :key="index"
                    :selected="index == page"
                >
                    {{ index }}
                </option>
            </select>
            <span style="margin-left: 5px">页 共{{ totalPages }}页</span>
        </template>
        <template v-else>
            <button
                :class="{ 'hs-prev': true, disable: prevPage <= 0 }"
                @click="prevPage > 0 && goToPage(prevPage)"
            >
                <span class="caret">◀</span>
            </button>
            <span>第{{ page }}页 共{{ totalPages }}页</span>
            <button
                :class="{ 'hs-next': true, disable: nextPage > totalPages }"
                @click="nextPage <= totalPages && goToPage(nextPage)"
            >
                <span class="caret">▶</span>
            </button>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TablePagination',
    props: {
        page: Number,
        totalPages: Number,
        paginationOptions: Object,
        btnBgColor: String,
        btnFontColor: String,
    },
    data() {
        return {}
    },
    computed: {
        prevPage() {
            return this.page - 1
        },
        nextPage() {
            return this.page + 1
        },
        alignClass() {
            return `hs-${this.paginationOptions.align}`
        },
    },
    methods: {
        goToPage(newPage) {
            this.$emit('new-page', parseInt(newPage))
        },
        onChange(event) {
            this.goToPage(event.target.value)
        },
    },
}
</script>

<style lang="scss" scoped>
button {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    .caret {
        transform: scaleX(0.6);
        display: inline-block;
    }
    &.hs-prev {
        margin-right: 10px;
        .caret {
            margin-right: 2px;
        }
    }
    &.hs-next {
        margin-left: 10px;
        .caret {
            margin-left: 2px;
        }
    }
    &.disable {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
.hs-paginator {
    height: var(--navHeight);
    line-height: var(--navHeight);
    margin-top: 8px;
    font-family: Arial;
    display: flex;
    justify-content: center;
    align-items: center;
    &.hs-left {
        text-align: left;
        justify-content: flex-start;
    }
    &.hs-right {
        text-align: right;
        justify-content: flex-end;
    }
    &.hs-center {
        text-align: center;
    }
    select,
    button {
        color: var(--btnFontColor);
        background-color: var(--btnBgColor);
        height: var(--btnHeight);
        line-height: var(--btnHeight);
        font-size: var(--btnFontSize);
        border: none;
        border-radius: 8px;
        outline: none;
    }
}
</style>
