<template>
    <div class="hs-paginator" :class="alignClass">
        <template v-if="paginationOptions.visualStyle === 'select'">
            <span>Page </span>
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
            <span> of {{ totalPages }}</span>
        </template>
        <template v-else>
            <button
                class="hs-prev"
                v-if="prevPage > 0"
                @click="goToPage(prevPage)"
            >
                <span class="caret">◀</span>
            </button>
            <span
                >Page <strong>{{ page }}</strong> of {{ totalPages }}</span
            >
            <button
                class="hs-next"
                v-if="nextPage <= totalPages"
                @click="goToPage(nextPage)"
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
        font-size: 12px;
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
}
.hs-left {
    text-align: left;
}
.hs-right {
    text-align: right;
}
.hs-center {
    text-align: center;
}
.hs-paginator {
    height: 22px;
    margin-top: 8px;
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
</style>
