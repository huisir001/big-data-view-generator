/*
 * @Description:element-ui
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:40:40
 * @LastEditTime: 2020-09-22 17:28:13
 */
import Vue from 'vue'
import '@/assets/css/element-variables.scss' //主题样式配置
import {
  Container,
  Header,
  Aside,
  Main,
  Drawer,
  Switch,
  Collapse,
  CollapseItem,
  Tabs,
  TabPane,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  Button,
  Message,
  MessageBox,
  Loading
} from 'element-ui'

//导入组件
Vue.use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Drawer)
  .use(Switch)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tabs)
  .use(TabPane)
  // .use(Dropdown)
  // .use(DropdownMenu)
  // .use(DropdownItem)
  // .use(Menu)
  // .use(Submenu)
  // .use(MenuItem)
  // .use(MenuItemGroup)
  .use(Button)
  .use(Loading.directive) //指令方式加载loading(在组件上使用v-loading)
//.use(Message)
//.use(MessageBox)

//全局挂载方法
Object.assign(Vue.prototype, {
  $ELEMENT: { size: 'small', zIndex: 3000 }, //全局配置element-ui(组件默认尺寸(medium,small,mini),弹窗初始层数)
  $loading: Loading.service, //服务方式加载Loading(用于全局单例Loading)
  $msgbox: MessageBox,
  $alert: MessageBox.alert,
  $confirm: MessageBox.confirm,
  $prompt: MessageBox.prompt,
  $message: Message
})

//范例
// this.$alert('内容',"标题")
// this.$loading({
//     text: 'Loading',
//     // spinner: 'el-icon-loading',
//     // background: 'rgba(0, 0, 0, 0.7)'
// })
