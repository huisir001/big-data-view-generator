/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-12-05 12:53:15
 */
export default {
    lastChangeTime: Date.now(),
    useApiData: false,
    apiReqUrl: 'http://localhost/api',
    apiMethod: 'get',
    apiParam: {},
    apiResHandle: `function(res){\n  console.log(res)\n  return res\n}`,
    valEnding: '',
    label: false,
    chartEvents: [
        {
            event: 'click',
            setQuery: false,
            callback: (e) => {
                console.log(e)
            },
        },
        {
            event: 'click',
            setQuery: true,
            query: 'series',
            callback: (e) => {
                console.log(e)
            },
        },
    ],
}
