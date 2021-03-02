/*
 * @Description: 项目工具库
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-03 17:10:28
 * @LastEditTime: 2021-03-02 18:07:43
 */

//延时防抖
export function debounce(callback, delay) {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}

//监听DOM样式变化
export function observerDomRestyle(dom, callback) {
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
export function getRanId(randomLength = 5) {
    return Number(Math.random().toString().substr(3, randomLength) + Date.now())
        .toString(36)
        .slice(0, randomLength)
}

//16进制颜色转为RGBA格式
export function colorToRgba(sHex, alpha = 1) {
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

// 时间格式化
export const formatDate = (timeStamp, timeType) => {
    //统一按24小时制
    if (
        !timeStamp instanceof Date &&
        timeStamp.constructor.name != 'String' &&
        timeStamp.constructor.name != 'Number'
    ) {
        throw new Error(`Type check failed for argument "${timeStamp}".`)
    }
    const date =
        timeStamp instanceof Date ? timeStamp : new Date(parseInt(timeStamp))
    const getFullNum = (num) => (num < 10 ? '0' + num : num) //小于两位补零
    const format = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: getFullNum(date.getMonth() + 1),
        dd: getFullNum(date.getDate()),
        hh: getFullNum(date.getHours()),
        mm: getFullNum(date.getMinutes()),
        ss: getFullNum(date.getSeconds()),
        day: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
    }
    let reformat = function (typeStr, str) {
        if (typeStr.includes(str) && typeStr.split(str).length - 1 == 1) {
            return typeStr.replace(str, format[str])
        } else {
            return typeStr
        }
    }

    let result
    for (let key in format) {
        result = reformat(result || timeType || 'yyyy-MM-dd', key)
    }
    return result
}

// 点击按钮防抖 1.5秒
// 注册：Vue.use(clickPreventShake)
// 使用 v-preventshake="1500"
export const ClickPreventShake = {
    install: (Vue) => {
        Vue.directive('preventshake', {
            inserted(el, binding) {
                let time = binding.value || 1500
                if (typeof time != 'number') {
                    throw new Error(
                        '按钮防抖指令传值延时时间（毫秒）必须是数字'
                    )
                }
                el.addEventListener('click', (e) => {
                    if (!el.disabled) {
                        el.disabled = true
                        el.style.cursor = 'not-allowed'
                        setTimeout(() => {
                            el.style.cursor = 'pointer'
                            el.disabled = false
                        }, time)
                    }
                })
            },
        })
    },
}

//将字符串转存为文件下载
export const exportStr2File = (name, data) => {
    var urlObject = window.URL || window.webkitURL || window
    var export_blob = new Blob([data])
    var save_link = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'a'
    )
    save_link.href = urlObject.createObjectURL(export_blob)
    save_link.download = name
    var ev = document.createEvent('MouseEvents')
    ev.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    )
    save_link.dispatchEvent(ev)
}

//将File对象转为base64（一般为图片）
export const blob2Base64 = (blob) => {
    return new Promise((resolve, reject) => {
        try {
            // 转为base64
            var fr = new FileReader()
            //读取完成回调
            fr.onloadend = (e) => {
                //转为base64
                resolve(e.target.result)
            }
            //执行读取
            fr.readAsDataURL(blob)
        } catch (error) {
            reject(error)
        }
    })
}
