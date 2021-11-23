<template>
  <div id="graph-echart" class="graph-box" />
</template>
<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    const chartRatio = document.getElementById('graph-echart')
    const myGraph = echarts.init(chartRatio)
    const option = {
      title: {
        text: '合作伙伴',
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        formatter: function (x) {
          return x.data.name
        }
      },
      series: [
        {
          type: 'graph',
          layout: 'circular',
          symbolSize: 40,
          height: '60%',
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],

          force: {
            repulsion: 600,
            edgeLength: [10, 50]
          },
          lineStyle: {
            normal: {
              width: 1,
              color: 'rgba(255, 166, 120, 1)'
            }
          },
          label: {
            normal: {
              show: true
            }
          },
          data: [
            {
              name: '鲍虎军',
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: 'rgba(40, 120, 255, 1)'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            },
            {
              name: '周昆',
              itemStyle: {
                normal: {
                  color: '#01aa40'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            },
            {
              name: '金小刚',
              itemStyle: {
                normal: {
                  color: '#01aa40'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            },
            {
              name: '徐超',
              itemStyle: {
                normal: {
                  color: 'rgba(255, 166, 120, 1)'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            },
            {
              name: '陈为',
              itemStyle: {
                normal: {
                  color: 'rgba(255, 166, 120, 1)'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            },
            {
              name: '章国锋',
              itemStyle: {
                normal: {
                  color: 'rgba(40, 120, 255, 1)'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            },
            {
              name: '王勋',
              itemStyle: {
                normal: {
                  color: 'rgba(40, 120, 255, 1)'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            },
            {
              name: '刘和刚',
              itemStyle: {
                normal: {
                  color: '#01aa40'
                }
              },
              label: {
                fontSize: 10,
                color: '#fff'
              }
            }
          ],
          links: [
            {
              source: '鲍虎军',
              target: '周昆',
              name: '项目',
              label: {
                fontSize: 10,
                color: '#01aa40'
              },
              lineStyle: {
                color: '#01aa40'
              }
            },
            {
              source: '鲍虎军',
              target: '章国锋',
              name: '论文',
              label: {
                fontSize: 10,
                color: 'rgba(40, 120, 255, 1)'
              },
              lineStyle: {
                color: 'rgba(40, 120, 255, 1)'
              }
            },
            {
              source: '鲍虎军',
              target: '金小刚',
              name: '项目',
              label: {
                fontSize: 10,
                color: '#01aa40'
              },
              lineStyle: {
                color: '#01aa40'
              }
            },
            {
              source: '鲍虎军',
              target: '徐超',
              name: '专利',
              label: {
                fontSize: 10,
                color: 'rgba(255, 166, 120, 1)'
              },
              lineStyle: {
                color: 'rgba(255, 166, 120, 1)'
              }
            },
            {
              source: '鲍虎军',
              target: '刘和刚',
              name: '项目',
              label: {
                fontSize: 10,
                color: '#01aa40'
              },
              lineStyle: {
                color: '#01aa40'
              }
            },
             {
              source: '鲍虎军',
              target: '陈为',
              name: '专利',
              label: {
                fontSize: 10,
                color: 'rgba(255, 166, 120, 1)'
              },
              lineStyle: {
                color: 'rgba(255, 166, 120, 1)'
              }
            },
            {
              source: '鲍虎军',
              target: '王勋',
              name: '论文',
              label: {
                fontSize: 10,
                color: 'rgba(40, 120, 255, 1)'
              },
              lineStyle: {
                color: 'rgba(40, 120, 255, 1)'
              }
            }
          ]
        }
      ]
    }
    myGraph.clear()
    myGraph.setOption(option)
    window.addEventListener('resize', function () {
      myGraph.resize()
    })
  }
}
</script>
