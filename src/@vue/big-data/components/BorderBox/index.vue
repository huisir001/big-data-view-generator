<!--
 * @Description: 内置图框
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-18 11:03:28
 * @LastEditTime: 2021-02-18 16:33:25
-->
<template>
    <component
        :is="`BorderBox${myOptions.borderBoxId}`"
        :color="myOptions.useDefaultColor ? undefined : myOptions.colors"
        :backgroundColor="myOptions.bgColor"
        :reverse="myOptions.reverse"
        :dur="myOptions.transDur"
        :titleWidth="myOptions.titleWidth"
        :title="myOptions.title"
    ></component>
</template>

<script>
import Config from './Config'
import others from '../../mixins/others'
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
    mixins: [others],
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
        return { Config }
    },
}
</script>
