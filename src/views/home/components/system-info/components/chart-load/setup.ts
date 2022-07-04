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

  watch(() => props.loadList, value => {
    if (!chart) {
      setTimeout(() => {
        chart = echarts.init((current.refs.chart as HTMLElement));
        render(value);
      }, 0)
    } else {
      render(value);
    }
  }, { immediate: true, deep: true })
  

  function render(value: number[]) {
    option.series[0].data = value;
    chart.setOption(option);
  }

  return {
  }
}
