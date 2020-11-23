/*
 * @Description: 配置公共Option
 * @Autor: HuiSir<273250950@qq.com>
 * @Date: 2020-09-29 18:13:39
 * @LastEditTime: 2020-11-23 18:38:43
 */
export default {
    lastChangeTime: Date.now(),
    useApiData: false,
    apiReqUrl: 'http://localhost/api',
    apiMethod: 'get',
    apiParam: {},
    apiResHandle: `(function(res){\n  console.log(res)\n  return res\n})`,
    valEnding: '',
    label: false,
    showValAxisLabel: true,
    showValAxisLine: true,
    showValSplitLine: true,
    showCatAxisLine: true,
    catLabelRowLen: 4,
}
