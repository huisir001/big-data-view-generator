/*
 * @Description: 项目工具库
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-03 17:10:28
 * @LastEditTime: 2020-12-31 16:11:07
 */

//延时防抖
export const debounce = (callback, delay) => {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}

//监听DOM样式变化
export const observerDomRestyle = (dom, callback) => {
    //兼容IE11
    const MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver
    const observer = new MutationObserver(callback)
    observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true,
    })
    return observer
}

//生成不重复ID
export const getRanId = (randomLength = 5) => {
    return Number(
        Math.random().toString().substr(3, randomLength) + Date.now()
    ).toString(36)
}

//16进制颜色转为RGBA格式
export const colorToRgba = (sHex, alpha = 1) => {
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    let sColor = sHex.toLowerCase()
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor
                    .slice(i, i + 1)
                    .concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        //  处理六位的颜色值
        var sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
    } else {
        return sHex
    }
}

//对象数据验证
//typeObj:{a:Object,b:Boolean,c:[Number,String]}
//testObj:{a:1,b:true}
export const ObjVerify = (typeObj, testObj) => {
    //循环判断
    for (let key in testObj) {
        let item = testObj[key],
            curType = typeObj[key]

        //错误提示(不存在此参数)
        if (!curType) {
            console.error(
                `[Object type error]: type check failed for prop "${key}". prop do not exist in the current chart.`
            )
            return
        }

        //多个类型（数组）
        if (curType instanceof Array) {
            let temp = []
            curType.forEach((type) => {
                temp.push(item.constructor == type)
            })
            if (!temp.includes(true)) {
                //错误提示
                console.error(
                    `[Object type error]: type check failed for prop "${key}". Expected "${curType
                        .map((item) => item.name)
                        .join('/')}", got "${item.constructor.name}".`
                )
            }
        }
        //单个类型
        else if (item && item.constructor != curType) {
            //错误提示
            console.error(
                `[Object type error]: type check failed for prop "${key}". Expected "${curType.name}", got "${item.constructor.name}".`
            )
        }
    }
}
