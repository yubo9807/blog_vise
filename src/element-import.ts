import { App } from 'vue';
import 'element-plus/dist/index.css';

import {
  ElMenu,
  ElIcon,
  ElLink,
  ElTable,
  ElDialog,
  ElButton,
  ElSwitch,
  ElForm,
  ElInput,
} from 'element-plus';

export default (app: App<Element>) => {

  app.use(ElMenu)
     .use(ElIcon)
     .use(ElLink)
     .use(ElTable)
     .use(ElDialog)
     .use(ElButton)
     .use(ElSwitch)
     .use(ElForm)
     .use(ElInput)

}