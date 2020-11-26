/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-26 17:17:06
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
}
