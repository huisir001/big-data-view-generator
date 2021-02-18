<!--
 * @Description: 内置图框
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-18 11:03:28
 * @LastEditTime: 2021-02-18 11:51:23
-->
<template>
    <component :is="myOptions.borderBoxId"></component>
</template>

<script>
// import Config from './inc/Config'
import others from '../../mixins/others'
import autoResize from '../../mixins/autoResize'
import {
    BorderBox1,
    BorderBox2,
    BorderBox3,
    BorderBox4,
    BorderBox5,
    BorderBox6,
    BorderBox7,
    BorderBox8,
    BorderBox9,
    BorderBox10,
    BorderBox11,
    BorderBox12,
    BorderBox13,
} from './components'

export default {
    name: 'BorderBox',
    mixins: [autoResize, others],
    components: {
        BorderBox1,
        BorderBox2,
        BorderBox3,
        BorderBox4,
        BorderBox5,
        BorderBox6,
        BorderBox7,
        BorderBox8,
        BorderBox9,
        BorderBox10,
        BorderBox11,
        BorderBox12,
        BorderBox13,
    },
    data() {
        // return { Config }
    },
}
</script>
