/*
 * @Description:element-ui
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-09 11:40:40
 * @LastEditTime: 2021-02-27 20:23:44
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
    Select,
    Option,
    Collapse,
    CollapseItem,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Input,
    InputNumber,
    Slider,
    ColorPicker,
    //   Table,
    //   TableColumn,
    Card,
    Row,
    Col,
    // Dropdown,
    // DropdownMenu,
    // DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    // MenuItemGroup,
    Button,
    ButtonGroup,
    Message,
    MessageBox,
    Notification,
    Loading,
    Divider,
    Tooltip,
    Image,
    Dialog,
    Upload,
} from 'element-ui'

//导入组件
Vue.use(Container)
    .use(Header)
    .use(Aside)
    .use(Main)
    .use(Drawer)
    .use(Switch)
    .use(Select)
    .use(Option)
    .use(Collapse)
    .use(CollapseItem)
    .use(Tabs)
    .use(TabPane)
    .use(Form)
    .use(FormItem)
    .use(Input)
    .use(InputNumber)
    .use(Slider)
    .use(ColorPicker)
    //   .use(Table)
    //   .use(TableColumn)
    .use(Card)
    .use(Row)
    .use(Col)
    // .use(Dropdown)
    // .use(DropdownMenu)
    // .use(DropdownItem)
    .use(Menu)
    .use(Submenu)
    .use(MenuItem)
    // .use(MenuItemGroup)
    .use(Button)
    .use(ButtonGroup)
    .use(Divider)
    .use(Tooltip)
    .use(Image)
    .use(Dialog)
    .use(Upload)
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
    $message: Message,
    $notify: Notification,
})

//范例
// this.$alert('内容',"标题")
// this.$loading({
//     text: 'Loading',
//     // spinner: 'el-icon-loading',
//     // background: 'rgba(0, 0, 0, 0.7)'
// })
