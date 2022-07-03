import { getCurrentInstance, watch } from 'vue';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent } from 'echarts/components';
import option from './option';

echarts.use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LineChart,
  CanvasRenderer
]);

export default (props) => {
  const current = getCurrentInstance();

  let chart = null;

  watch(() => props.memory, value => {
    if (!chart) {
      setTimeout(() => {
        chart = echarts.init((current.refs.chart as HTMLElement));
        render(value);
      }, 0)
    } else {
      render(value);
    }
  }, { immediate: true })
  
  function render(value) {
    const seriesData = Object.assign([], option.series[0].data);
    if (seriesData.length >= 5) {
      seriesData.shift();
    }
    seriesData.push(value.toFixed(2));

    option.series[0].data = seriesData;
    chart.setOption(option);
  }

  return {
  }
}
