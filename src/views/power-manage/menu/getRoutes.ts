import { useRouter } from 'vue-router';

export default () => {

  const routes = Object.assign(useRouter().options.routes);
  const layout: any = routes.filter(val => val.name === 'Layout');
  const newRoutes = layout[0].children;
  
  const routesList = uploadRoutes(newRoutes);
  return routesList;
  
}

const excludes = ['Login', 'NotFound', 'PowerManage'];

function uploadRoutes(routes: any[], arr: any[] = [], parent: string | null = null) {
  routes.forEach(val => {
    if (excludes.includes(val.name)) return;
    const { name, meta } = val;
    arr.push({ name, title: meta.title, parent });
    if (val.children && val.children.length > 0) {
      uploadRoutes(val.children, arr, name);
    }
  })
  return arr;
}