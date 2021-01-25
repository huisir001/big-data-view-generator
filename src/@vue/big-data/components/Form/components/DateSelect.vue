<!--
 * @Description: 日期选择组件
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-21 17:36:59
 * @LastEditTime: 2021-01-25 16:32:36
-->
<template>
    <div
        :class="['sel-input', 'date', { 'name-input': name }]"
        :style="{ width: width + 'px', height: height + 'px' }"
    >
        <span v-if="name">{{ name }}</span>
        <input
            type="text"
            :placeholder="placeholder"
            @focus="inputFocus"
            @blur="inputBlur"
            @mousedown="inputMD"
            v-model="val"
            readonly
            :style="{
                lineHeight: height + 'px',
                border,
                color,
                background,
                fontSize: height / 2 + 'px',
            }"
        />
        <i
            class="i-date"
            :style="{
                width: height + 'px',
                borderLeft: border,
                right: height / 2 + 1 + 'px',
            }"
        ></i>
        <div
            class="sel-date"
            v-show="show"
            tabindex="99"
            @blur="dateBlur"
            @mousedown="dateMD"
            :style="`top:${height}px`"
        >
            <template v-if="active != 4">
                <div class="sd-top" v-if="top && top.length > 0">
                    <a class="a-prev" @click="pnClick(-1)"></a>
                    <a class="a-ym" @click="ymClick">{{ top }}</a>
                    <a class="a-next" @click="pnClick(1)"></a>
                </div>
                <div class="list-day" v-if="active == 1 || active == 5">
                    <div class="week">
                        <span v-for="(w, i) in week" :key="i">{{ w }}</span>
                    </div>
                    <div class="days">
                        <a
                            :class="['a-day', { active: getDayActive(d) }]"
                            v-for="(d, i) in days"
                            :key="i"
                            :style="{ marginLeft: d == 1 ? DFstyle : '6px' }"
                            @click="dayClick(d)"
                            >{{ d }}</a
                        >
                    </div>
                </div>
                <div class="list-month" v-else-if="active == 2">
                    <a
                        :class="['a-month', { active: i + 1 == month }]"
                        v-for="(m, i) in monthArr"
                        :key="i"
                        @click="monthClick(i)"
                        >{{ m }}</a
                    >
                </div>
                <div
                    :class="['list-year', { ly2: active == 4 }]"
                    v-else-if="active == 3"
                >
                    <a
                        :class="['a-year', { active: yCloud(y) }]"
                        v-for="(y, i) in yearArr"
                        :key="i"
                        @click="yearClick(y)"
                        >{{ y }}</a
                    >
                </div>
            </template>
            <div class="hhmm" v-if="dateType == 4 || active == 6">
                <div class="hh" v-show="hms == 1">
                    <a
                        v-for="(a, i) in 24"
                        :key="i"
                        :style="hhPst(a)"
                        :class="{ active: a == parseInt(hhmm[0]) }"
                        @click="hhClick(a)"
                        ><span :style="hhtRt(a)">{{
                            a == 24 ? '00' : a
                        }}</span></a
                    >
                    <span class="a-line" :style="hhlPst"></span>
                </div>
                <div class="mm" v-show="hms == 2">
                    <a
                        v-for="(a, i) in 59"
                        :key="i"
                        :style="mmPst(a)"
                        :class="{ active: a == parseInt(hhmm[1]) }"
                        @click="mmClick(a)"
                    >
                        <span v-if="a < 10" :style="mmtRt(a)">{{
                            '0' + a
                        }}</span>
                        <span v-else :style="mmtRt(a)">{{ a }}</span>
                    </a>
                    <a
                        :style="mmPst(0)"
                        :class="{ active: hhmm[1] == '00' }"
                        @click="mmClick(0)"
                        ><span :style="mmtRt(0)">00</span>
                    </a>
                    <span class="a-line" :style="mmlPst"></span>
                </div>
            </div>
            <div class="hmsave" v-if="dateType == 4">
                <span
                    >时:<a @click="hms = 1">{{ hhmm[0] }}</a></span
                ><span
                    >分:<a @click="hms = 2">{{
                        hhmm[1] == 60 ? '00' : hhmm[1]
                    }}</a></span
                >
                <a @click="mmClick(-1)">确定</a>
            </div>
            <div class="ymdhmsave" v-if="dateType == 5">
                <a @click="active = 5">{{
                    year +
                    '-' +
                    month.toString().padStart(2, '0') +
                    '-' +
                    day.toString().padStart(2, '0')
                }}</a>
                <a
                    @click="
                        active = 6
                        hms = 1
                    "
                    >{{ hhmm.join(':') }}</a
                >
                <a @click="mmClick(-1)">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DateSelect',
    props: {
        name: { default: '' },
        selVal: { default: '' },
        selObj: { default: null },
        selKey: { default: 'Id' },
        dateType: { default: 1 },
        width: { default: 160 },
        height: { default: 30 },
        border: { default: '1px solid #333' },
        color: { default: '#333333' },
        background: { default: '#ffffff' },
        placeholder: { default: '请选择日期' },
    },
    data() {
        return {
            val: '',
            show: false,
            evTag: '',
            week: ['日', '一', '二', '三', '四', '五', '六'],
            monthArr: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月',
            ],
            active: parseInt(this.dateType),
            year: 0,
            month: 0,
            day: 0,
            ys: 0,
            hhmm: [],
            hms: 1,
        }
    },
    computed: {
        objVal() {
            return this.selVal
                ? this.selVal
                : this.selObj && this.selKey
                ? this.selObj[this.selKey]
                : ''
        },
        sp() {
            return this.objVal && this.objVal.toString().indexOf('/') > 0
                ? '/'
                : '-'
        },
        top() {
            let ysp = [...(this.year + '')]
            if (this.active == 1 || this.active == 5) {
                return (
                    this.year + ' / ' + this.month.toString().padStart(2, '0')
                )
            } else if (this.active == 2) {
                return this.year
            } else if (this.active == 3) {
                return this.ys + ' - ' + (this.ys + 11)
            } else if (this.active == 4) {
                return this.ys + ' - ' + (this.ys + 119)
            }
        },
        days() {
            if ([1, 3, 5, 7, 8, 10, 12].indexOf(this.month) >= 0) return 31
            else if ([4, 6, 9, 11].indexOf(this.month) >= 0) return 30
            else {
                if (
                    (this.year % 4 == 0 && this.year % 100 != 0) ||
                    this.year % 400 == 0
                )
                    return 29
                else return 28
            }
        },
        yearArr() {
            let result = new Array(12).fill(0)
            if (this.active == 3) {
                result = result.map((o, i) => this.ys + i)
            } else if (this.active == 4) {
                result = result.map(
                    (o, i) => i * 10 + this.ys + '-' + (i * 10 + this.ys + 9)
                )
            }
            return result
        },
        DFstyle() {
            let df = new Date(this.year, this.month - 1, 1).getDay()
            return 34 * df + 6 + 'px'
        },
        hhlPst() {
            let hh = parseInt(this.hhmm[0]),
                h12 = hh < 13 ? hh : hh - 12,
                rt = (h12 - 1) * 30 - 60,
                w = hh < 13 ? 78 : 48
            return {
                transform: 'rotate(' + rt + 'deg)',
                width: w + 'px',
            }
        },
        mmlPst() {
            let mm = parseInt(this.hhmm[1]),
                rt = mm * 6 - 90
            return {
                transform: 'rotate(' + rt + 'deg)',
            }
        },
    },
    methods: {
        inputFocus() {
            if (this.evTag != 'imd') this.show = true
            else this.evTag = ''
        },
        inputMD() {
            this.evTag = 'imd'
            this.show = !this.show
        },
        inputBlur() {
            if (this.evTag != 'lmd') this.show = false
        },
        dateMD() {
            this.evTag = 'lmd'
        },
        dateBlur() {
            this.show = false
        },
        pnClick(i) {
            if (this.active < 3) this.year += i
            else if (this.active == 3) this.ys += i * 12
            else if (this.active == 4) this.ys += i * 120
        },
        ymClick() {
            if (this.active < 4) this.active += 1
            if (this.active == 3) this.ys = this.year - 4
            else if (this.active == 4)
                this.ys =
                    parseInt(this.year.toString().substring(0, 3) + '1') - 40
        },
        monthClick(v) {
            this.month = v + 1
            if (this.dateType == 1) {
                this.active = 1
            } else {
                this.val = [
                    this.year,
                    this.month.toString().padStart(2, '0'),
                ].join(this.sp)
                this.show = false
            }
        },
        yearClick(v) {
            if (this.active == 3) {
                this.year = v
                if (this.dateType == 3) {
                    this.val = v
                    this.show = false
                } else this.active--
            } else {
                this.active--
                this.ys = parseInt(v.split('-')[0])
            }
        },
        dayClick(d) {
            this.day = d
            if (this.dateType == 5) {
                this.active++
            } else {
                this.val = [
                    this.year,
                    this.month.toString().padStart(2, '0'),
                    this.day.toString().padStart(2, '0'),
                ].join(this.sp)
                this.show = false
            }
        },
        getDayActive(d) {
            let sd = [
                    this.year,
                    this.month.toString().padStart(2, '0'),
                    d.toString().padStart(2, '0'),
                ].join(this.sp),
                cv = this.val
                    ? this.dateType == 5
                        ? this.val.split(' ')[0]
                        : this.val
                    : this.date()
            return sd == cv
        },
        yCloud(y) {
            y += ''
            if (y.indexOf('-').length > 0) {
                let arr = y.split('-')
                if (
                    parseInt(arr[0]) <= this.year &&
                    parseInt(arr[1]) >= this.year
                )
                    return true
                else return false
            } else return y == this.year
        },
        date(t) {
            let date = new Date(),
                year = date.getFullYear(),
                month = (date.getMonth() + 1).toString().padStart(2, '0'),
                dd = date.getDate().toString().padStart(2, '0'),
                hm =
                    date.getHours().toString().padStart(2, '0') +
                    ':' +
                    date.getMinutes().toString().padStart(2, '0')
            return t == 1
                ? hm
                : [year, month, dd].join(this.sp) + (t == 2 ? ' ' + hm : '')
        },
        hhPst(i) {
            let h12 = i < 13 ? i : i - 12,
                rt = h12 * 30 - 90,
                tx = i < 13 ? 92 : 62
            return {
                transform: 'rotate(' + rt + 'deg) translate(' + tx + 'px)',
            }
        },
        hhtRt(i) {
            let h12 = i < 13 ? i : i - 12,
                rt = 60 - (h12 - 1) * 30
            return {
                transform: 'rotate(' + rt + 'deg)',
            }
        },
        mmPst(i) {
            let rt = i * 6 - 90
            return {
                transform: 'rotate(' + rt + 'deg) translate(82px)',
            }
        },
        mmtRt(i) {
            let rt = 90 - i * 6
            return {
                transform: 'rotate(' + rt + 'deg)',
            }
        },
        hhClick(a) {
            this.hhmm = [a < 10 ? '0' + a : a, this.hhmm[1]]
            this.hms = 2
        },
        mmClick(a) {
            if (a > 0) this.hhmm[1] = a < 10 ? '0' + a : a
            this.val =
                (this.dateType == 4
                    ? ''
                    : [
                          this.year,
                          this.month.toString().padStart(2, '0'),
                          this.day.toString().padStart(2, '0'),
                      ].join(this.sp) + ' ') + this.hhmm.join(':')
            this.show = false
        },
        setValue() {
            let v = ''
            this.hms = 1
            if (this.dateType == 4) {
                //时、分
                v = this.val || this.date(1)
                this.hhmm = v.split(':')
            } else {
                v = this.val || this.date(2)
                let ymd = v
                if (this.dateType == 5) {
                    ymd = v.split(' ')[0]
                    this.hhmm = v.split(' ')[1].split(':')
                }
                let darr = v.toString().split(this.sp)
                this.year = parseInt(darr[0])
                this.ys = this.year - 4
                if ([1, 2, 5].includes(this.dateType)) {
                    this.month = parseInt(darr[1])
                }
                if ([1, 5].includes(this.dateType)) {
                    this.day = parseInt(darr[2])
                }
            }
        },
    },
    watch: {
        show(v) {
            if (v) {
                this.active = this.dateType
                this.setValue()
            }
        },
        objVal: {
            handler(v) {
                this.val = v || ''
                this.setValue()
            },
            immediate: true,
        },
        val(v) {
            if (this.selObj && this.selKey) this.selObj[this.selKey] = v
            this.$emit('change', this.val)
        },
    },
}
</script>
<style lang="scss" scoped>
$select-color: #04bbb7;
.sel-input {
    position: relative;
    a {
        cursor: pointer;
        text-decoration: none;
        color: unset;
    }
    > input {
        width: 100%;
        height: 100%;
        padding: 2px 5px;
    }
}
.name-input .sel-list {
    left: 80px;
}
.sel-input.date i {
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNEEyQUFFOUJCMDkxMUU4OEU4NEE1QUNBODUxNzk5MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNEEyQUFFQUJCMDkxMUU4OEU4NEE1QUNBODUxNzk5MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM0QTJBQUU3QkIwOTExRTg4RTg0QTVBQ0E4NTE3OTkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM0QTJBQUU4QkIwOTExRTg4RTg0QTVBQ0E4NTE3OTkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+nE/kxwAAAENJREFUeNpiWXz2DAMU/AdiRgbsAC7HgkXhfzTFKHJMOCQYcGliwWEqAy4bmRhIBCxEOIcBlx+IAsNBAzHxgAIAAgwATyULXUGrhFQAAAAASUVORK5CYII=');
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40%;
}
.sel-input.date .sel-date {
    position: absolute;
    background: #fcfcfc;
    border: #bbb;
    width: 254px;
    left: 0;
    margin-top: 2px;
    font-size: 14px;
    z-index: 99;
    color: #444;
}
.name-input.sel-input.date .sel-date {
    right: 0;
    left: unset;
}
.sd-top {
    line-height: 32px;
    display: flex;
    align-content: stretch;
    align-items: stretch;
}
.sd-top .a-prev,
.sd-top .a-next {
    width: 50px;
    color: #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
}
.sd-top .a-prev:hover,
.sd-top .a-next:hover {
    color: $select-color;
}
.sd-top .a-prev:before,
.sd-top .a-next:before {
    content: '';
    display: inline-block;
    vertical-align: top;
    width: 8px;
    height: 8px;
    border-left: solid 1px;
    border-bottom: solid 1px;
}
.sd-top .a-prev:before {
    transform: rotate(45deg);
}
.sd-top .a-next:before {
    transform: rotate(-135deg);
}
.sd-top .a-ym {
    flex: 1;
    overflow: hidden;
    text-align: center;
}
.list-day > .week {
    height: 24px;
    padding: 0 10px;
    background: #ededed;
}
.list-day > .week > span {
    width: 28px;
    line-height: 24px;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    margin-left: 6px;
    color: #666;
    text-align: center;
}
.list-day > .week > span:first-child {
    margin-left: 0;
}
.list-day > .days {
    padding: 10px 10px 4px 4px;
}
.list-day > .days > a {
    width: 28px;
    height: 28px;
    margin-left: 6px;
    margin-bottom: 6px;
    border-radius: 14px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    line-height: 28px;
}
.list-day > .days > a.enable {
    color: #5b7f8c;
}
.list-day > .days > a.enable:hover {
    background: none;
    cursor: default;
}
.list-month,
.list-year {
    padding: 20px 37px 12px 37px;
}
.list-month > a,
.list-year > a {
    width: 42px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    display: inline-block;
    vertical-align: top;
    margin: 0 26px 8px 0;
    border-radius: 21px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}
.ly2 > a {
    font-size: 12px;
    line-height: 16px;
    padding: 4px;
}
.list-month > a:nth-child(3n),
.list-year > a:nth-child(3n) {
    margin-right: 0;
}
.list-day > .days > a:hover,
.list-month > a:hover,
.list-year > a:hover {
    background: #fcfcfc;
}
.list-day > .days > a.active,
.list-month > a.active,
.list-year > a.active {
    background: $select-color;
    color: #fff;
}
.hhmm {
    width: 220px;
    height: 220px;
    position: relative;
    background: #ebebeb;
    border-radius: 120px;
    margin: 17px;
}
.hh,
.mm {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
}
.hh > a,
.mm > a {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    transform-origin: center center;
}
.hh > a > span,
.mm > a span {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    transform-origin: center center;
}
.hh > a:nth-child(n + 13) {
    font-size: 12px;
    color: #888;
}
.hh > a:hover {
    background: #ddd;
}
.hh:after,
.mm:after {
    content: '';
    height: 8px;
    width: 8px;
    background: $select-color;
    border-radius: 4px;
    position: absolute;
    top: 11px;
    left: 11px;
}
.hh > a.active {
    background: $select-color;
    color: #fff;
}
.a-line {
    position: absolute;
    height: 1px;
    transform-origin: left top;
    background: $select-color;
    top: 15px;
    left: 15px;
}
.mm {
    margin-top: -5px;
    margin-left: -14px;
}
.mm > a,
.mm > a span {
    height: 10px;
    width: 28px;
    line-height: 10px;
}
.mm > a {
    font-size: 0;
}
.mm > a:nth-child(5n) {
    font-size: 14px;
}
.mm > a > span {
    pointer-events: none;
    z-index: 19;
    margin-left: 14px;
}
.mm:after {
    left: 10px;
    top: 1px;
}
.mm > a:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    top: 3px;
    left: 12px;
    pointer-events: none;
    background: #ddd;
    z-index: 20;
}
.mm > a:nth-child(5n):before {
    width: 8px;
}
.mm > a:after {
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    top: -9px;
    left: 0;
    pointer-events: none;
    z-index: -1;
}
.mm > a:hover {
    z-index: 17;
}
.mm > a:hover:after {
    z-index: 1;
    background: rgba(0, 0, 0, 0.1);
}
.mm > a:hover:before {
    background: $select-color;
}
.mm > a.active,
.mm > a.active:hover {
    color: $select-color;
}
.mm > a.active:before,
.mm > a.active:hover:before {
    background: $select-color;
}
.mm .a-line {
    width: 82px;
    top: 5px;
    left: 14px;
}
.hmsave,
.ymdhmsave {
    height: 41px;
    border-top: #bbb;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
}
.hmsave > span {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
}
.hmsave > span > a {
    height: 25px;
    line-height: 24px;
    margin-left: 8px;
    padding: 0 6px;
    border-bottom: solid 1px $select-color;
    color: $select-color;
}
.hmsave > a {
    width: 52px;
    color: $select-color;
    text-align: center;
}
.ymdhmsave > a {
    padding: 0 10px;
}
.ymdhmsave > a:nth-child(2) {
    margin-right: 20px;
}
body {
    background: #f3f3f3;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title {
    line-height: 80px;
    font-size: 32px;
    font-weight: bold;
    color: #555;
}
.container {
    flex: 1;
    overflow: hidden;
    width: 1320px;
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.row1 {
    margin-bottom: 15px;
}
.row1 {
    display: flex;
    align-items: stretch;
}
.col {
    width: 50%;
    border-radius: 5px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.col:first-child {
    margin-right: 15px;
}
.col:last-child {
    margin-left: 25%;
}
.col-title {
    line-height: 50px;
    font-weight: bold;
    font-size: 18px;
    color: #777;
    padding-left: 20px;
}
.col-con {
    flex: 1;
    padding: 20px;
}
.row {
    height: 42px;
    padding: 5px 0;
    display: flex;
    line-height: 32px;
}
.row > .key {
    width: 132px;
    text-align: right;
    padding-right: 18px;
}
.row > .val {
    flex: 1;
    padding-right: 52px;
}
.row-console {
    margin-top: 50px;
}
.row-console textarea {
    width: 100%;
    height: 120px;
}
</style>
