;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory)
  } else if (
    typeof exports === 'object' &&
    typeof exports.nodeName !== 'string'
  ) {
    // CommonJS
    factory(exports, require('echarts'))
  } else {
    // Browser globals
    factory({}, root.echarts)
  }
})(this, function(exports, echarts) {
  var log = function(msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded')
    return
  }
  echarts.registerTheme('mytheme', {
    color: [
      '#5ef5ff',
      '#27bf99',
      '#00BCD4',
      '#2d8ebf',
      '#1d88eb',
      '#6268f2',
      '#f2b3c9',
      '#f58db2',
      '#d0648a',
      '#cc70af'
    ],
    backgroundColor: 'rgba(255,255,255,0)',
    textStyle: {},
    title: {
      x: 'center',
      y: 10,
      textStyle: {
        color: '#ffffff',
        fontSize: 14
      },
      subtextStyle: {
        color: '#eeeeee'
      }
    },
    line: {
      itemStyle: {
        normal: {
          borderWidth: '2'
        }
      },
      lineStyle: {
        normal: {
          width: '3'
        }
      },
      symbol: 'circle',
      symbolSize: '4'
    },
    radar: {
      itemStyle: {
        normal: {
          borderWidth: '2'
        }
      },
      lineStyle: {
        normal: {
          width: '3'
        }
      },
      symbolSize: '8',
      symbol: 'circle',
      smooth: false
    },
    bar: {
      itemStyle: {
        normal: {
          barBorderWidth: '0',
          barBorderColor: '#ccc'
        },
        emphasis: {
          barBorderWidth: '0',
          barBorderColor: '#ccc'
        }
      }
    },
    pie: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    scatter: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    boxplot: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    parallel: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    sankey: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    funnel: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    gauge: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#fff'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#fff'
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#7d83f7',
          color0: '#ffffff',
          borderColor: '#9b5eff',
          borderColor0: '#797fba',
          borderWidth: '1'
        }
      }
    },
    graph: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      },
      lineStyle: {
        normal: {
          width: '1',
          color: '#ccc'
        }
      },
      symbolSize: '8',
      smooth: false,
      color: ['#5ef5ff', '#1d88eb', '#27bf99', '#6268f2', '#2d8ebf'],
      label: {
        normal: {
          textStyle: {
            color: '#ccc'
          }
        }
      }
    },
    map: {
      itemStyle: {
        normal: {
          areaColor: '#ccc',
          borderColor: '#ccc',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,175,81,0.5)',
          borderColor: '#ffaf51',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#ffffff'
          }
        },
        emphasis: {
          textStyle: {
            color: '#ffee51'
          }
        }
      }
    },
    geo: {
      itemStyle: {
        normal: {
          areaColor: '#555555',
          borderColor: '#999999',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,175,81,0.5)',
          borderColor: '#ffaf51',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#ffffff'
          }
        },
        emphasis: {
          textStyle: {
            color: '#ffee51'
          }
        }
      }
    },
    categoryAxis: {
      nameTextStyle: {
        fontSize: 11
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#c4e2e7'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        lineHeight: 12,
        textStyle: {
          color: '#ddd',
          fontSize: 10
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#555555']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    valueAxis: {
      nameTextStyle: {
        fontSize: 11
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#c4e2e7'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ddd',
          fontSize: 10
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#555555'],
          type: 'dashed'
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#c4e2e7'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ddd',
          fontSize: 10
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#555555']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#c4e2e7'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ddd',
          fontSize: 10
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#555555']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: '#999999'
        },
        emphasis: {
          borderColor: '#c4e2e7'
        }
      }
    },
    legend: {
      itemHeight: 12,
      itemWidth: 18,
      textStyle: {
        color: '#ddd',
        fontSize: 10
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#cccccc',
          width: 1,
          type: 'dotted'
        },
        crossStyle: {
          color: '#cccccc',
          width: 1
        }
      },
      trigger: 'axis' //显示虚线
    },
    timeline: {
      lineStyle: {
        color: '#518cff',
        width: 1
      },
      itemStyle: {
        normal: {
          color: '#95b4ff',
          borderWidth: 1
        },
        emphasis: {
          color: '#518cff'
        }
      },
      controlStyle: {
        normal: {
          color: '#51e0ff',
          borderColor: '#516dff',
          borderWidth: '0.5'
        },
        emphasis: {
          color: '#51e0ff',
          borderColor: '#516dff',
          borderWidth: '0.5'
        }
      },
      checkpointStyle: {
        color: '#ffef5e',
        borderColor: 'rgba(97,94,255,0.4)'
      },
      label: {
        normal: {
          textStyle: {
            color: '#5ef5ff'
          }
        },
        emphasis: {
          textStyle: {
            color: '#5ef5ff'
          }
        }
      }
    },
    visualMap: {
      textStyle: {
        color: '#eee',
        fontSize: 10
      },
      itemGap: 4,
      textGap: 4,
      itemHeight: 12,
      color: ['#7e0023', '#660099', '#ff715e', '#ff9933', '#ffee51'],
      outOfRange: {
        color: '#5ef5ff'
      }
    },
    dataZoom: {
      backgroundColor: 'rgba(255,255,255,0)',
      dataBackgroundColor: 'rgba(222,222,222,1)',
      fillerColor: 'rgba(94,149,255,0.4)',
      handleColor: '#cccccc',
      handleSize: '100%',
      textStyle: {
        color: '#eee',
        fontSize: 10
      }
    },
    markPoint: {
      label: {
        fontSize: 11,
        normal: {
          textStyle: {
            color: '#333333'
          }
        },
        emphasis: {
          textStyle: {
            color: '#333333'
          }
        }
      }
    },
    markLine: {
      label: {
        fontSize: 11
      }
    },
    markArea: {
      label: {
        fontSize: 11
      }
    }
  })
})
