import { graphic } from 'echarts';

export default {
  grid: {
    top: '80px',
    right: '0',
    bottom: '24px',
    left: '50px',
    show: true,
    borderColor: 'transparent'
  },
  title: {
    text: '站点访客量',
    subtext: 'Site visitors number'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: [],
    axisTick: { show: false }
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      // symbol: 'none',
      smooth: true,
      data: [],
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#5470C6' },
          { offset: 1, color: 'transparent' }
        ])
      },
    }
  ]
};
