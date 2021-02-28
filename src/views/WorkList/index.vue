<!--
 * @Description: 作品列表
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-01-13 10:29:54
 * @LastEditTime: 2021-02-28 20:03:58
-->
<template>
    <div class="workList">
        <div class="header">
            <h1>大数据视图生成器</h1>
            <h2>Big data view generator</h2>
            <el-menu :default-active="$route.params.comp"
                     class="topMenu"
                     mode="horizontal"
                     @select="handleTopMenuSelect">
                <el-menu-item index="Works"><i class="el-icon-menu"></i>我的作品</el-menu-item>
                <el-menu-item index="Templet"><i class="el-icon-s-platform"></i>模板库</el-menu-item>
                <el-menu-item index="Map"><i class="el-icon-location"></i>地图管理</el-menu-item>
                <el-menu-item index="User"><i class="el-icon-s-custom"></i>用户中心</el-menu-item>
            </el-menu>
            <div class="mask"></div>
        </div>
        <div class="content">
            <component :is="$route.params.comp"></component>
        </div>
    </div>
</template>

<script>
import Works from './components/Works'
import Templet from './components/Templet'
import Map from './components/Map'
import User from './components/User'
export default {
    name: 'WorkList',
    components: {
        Works,
        Templet,
        Map,
        User,
    },
    data() {
        return {
            activeComponet: 'Works',
        }
    },
    methods: {
        handleTopMenuSelect(key, keyPath) {
            this.$router.replace(key)
            // this.activeComponet = key
        },
    },
}
</script>
<style lang="scss" scoped>
.workList {
    background: #1a172c;
    height: 100%;
    .header {
        position: relative;
        background-image: url(../../assets/img/banner_1.png);
        height: 10.416vw;
        width: 100vw;
        background-size: auto 100%;
        background-repeat: no-repeat;
        padding: 0 15px;
        min-height: 130px;
        background-position: right bottom;
        h1 {
            color: #6b92f2;
            font-size: 1.8vw;
            margin: 0;
            position: absolute;
            top: 1.8vw;
            left: 26px;
        }
        h2 {
            margin: 0;
            position: absolute;
            top: 3.8vw;
            left: 26px;
            font-size: 1.4vw;
            color: #6192f285;
        }
        .topMenu {
            position: absolute;
            bottom: 10px;
            left: 15px;
            border: 0;
            background-color: transparent;
            z-index: 1;
            li.el-menu-item {
                color: #fff;
                height: 52px;
                line-height: 52px;
                padding: 0 15px;
                margin-right: 5px;
                border-bottom: 0;
                i {
                    color: #fff;
                    margin-left: -5px;
                    margin-top: -2px;
                }
            }
            li.el-menu-item:hover,
            li.el-menu-item.is-active {
                background-color: transparent;
                color: #da77ff;
                i {
                    color: #da77ff;
                }
            }
        }
        .mask {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 15px;
            box-shadow: 0 1px 17px 11px #1a172cb5;
            background: #1a172cb5;
        }
    }
}
</style>
