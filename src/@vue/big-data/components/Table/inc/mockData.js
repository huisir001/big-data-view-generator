/*
 * @Description: 模拟数据 Table
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2021-02-01 17:59:22
 * @LastEditTime: 2021-02-02 16:22:39
 */
export const tableColsMock = [
    {
        label: '姓名',
        field: 'name',
        fixed: 'left',
        width: 120, //设置宽度在tableLayoutAuto自动布局为false时才绝对有效，若为自动布局，当宽高小于设置的宽度时会自动调整宽度
    },
    { label: '邮箱', field: 'email' },
    { label: '年龄', field: 'age' },
]

export const compDataMock = [
    {
        name: '张三',
        email: 'zhangsan@aaa.edu',
        age: 20,
    },
    {
        name: '李四',
        email: 'lisi@bbb.vi',
        age: 32,
    },
    {
        name: '王五',
        email: 'wangwu@ccc.com',
        age: 54,
    },
    {
        name: '郑丽',
        email: 'wangwu@ccc.com',
        age: 22,
    },
    {
        name: '于平',
        email: 'wangwu@ccc.com',
        age: 44,
    },
    {
        name: '龚娟',
        email: 'wangwu@ccc.com',
        age: 43,
    },
    {
        name: '杜强',
        email: 'wangwu@ccc.com',
        age: 18,
    },
]
