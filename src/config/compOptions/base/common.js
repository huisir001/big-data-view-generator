/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2021-01-25 16:55:38
 */

/* 共有 */
export const publicOpts = {
    lastChangeTime: Date.now(),
    color: '#444444',
    background: '#ffffff',
    /* 数据 */
    useApiData: false,
    apiReqUrl: 'http://localhost/api',
    apiMethod: 'get',
    apiParam: {},
    apiResHandle: `function(res){\n  console.log(res)\n  return res\n}`,
    openTimingRefresh: false,
    refreshPeriod: 3,
    // chartEvents: [],
}
