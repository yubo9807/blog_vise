import { graphic } from 'echarts';

export default {
  grid: {
    top: '40px',
    right: '0',
    bottom: '10px',
    left: '30px',
    show: true,
    borderColor: 'transparent'
  },
  title: {
    text: '内存压力',
    textStyle: {
      fontSize: 14,
    }
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisTick: { show: false },
    axisLabel: { showMaxLabel: true, },
    axisLine: { lineStyle: { color: '#cccccc' }},
  },
  yAxis: {
    type: 'value',
    max: 1,
  },
  series: [
    {
      type: 'line',
      symbol: 'none',
      // smooth: true,
      data: [],
      lineStyle: {
        color: 'orange',
        width: 1,
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'orange' },
          { offset: 1, color: 'transparent' }
        ])
      },
    }
  ]
};
