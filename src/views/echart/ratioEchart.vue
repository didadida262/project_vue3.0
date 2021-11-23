<template>
  <div id="ratio-echart" class="ratio-box" />
</template>
<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },
  mounted() {
    let chartRatio = document.getElementById('ratio-echart')
    let myRatio = echarts.init(chartRatio)
    const option = {
      title: {
        text: '学术产出力',
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (x) {
          return `${x.data.name}${x.data.value}${x.data.unit}`
        }
      },
      legend: {
        orient: 'vertical',
        align: 'left',
        icon: 'circle',
        top: '18%',
        left: '65%'
      },

      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          width: '70%',
          left: '-5%',
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 4
          },
          label: {
            show: false,
            position: 'center',
          },
          data: [
            { value: 3, name: '期刊论文', unit: '篇' },
            { value: 1, name: '会议论文', unit: '篇' },
            { value: 2, name: '著作', unit: '篇' },
            { value: 4, name: '核心收录', unit: '篇' },
            { value: 5, name: '专利', unit: '项' },
            { value: 1, name: '其他', unit: '项' }
          ]
        }
      ]
    }
    myRatio.clear()
    myRatio.setOption(option)
    window.addEventListener('resize', function () {
      myRatio.resize()
    })
  }
}
</script>
