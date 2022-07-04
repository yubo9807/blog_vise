import { createColor } from '@/utils/string';
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
    text: 'Redis 储存情况',
    subtext: 'Redis storage situation'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: { show: false },
    axisLabel: {
      formatter(value) {
        if (value.length < 9) return value;
        return value.slice(0, 9) + '...';
      }
    }
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '缓存时间',
      type: 'bar',
      stack: 'total',
      symbol: 'none',
      smooth: true,
      data: [],
    },
    {
      name: '过期时间',
      type: 'bar',
      stack: 'total',
      symbol: 'none',
      smooth: true,
      data: [],
    },
    {
      name: '大小',
      type: 'bar',
      stack: 'total',
      symbol: 'none',
      smooth: true,
      data: [],
      itemStyle: {
        color: function () {
          return createColor() + '99'
        }
      },
    },
  ]
};
