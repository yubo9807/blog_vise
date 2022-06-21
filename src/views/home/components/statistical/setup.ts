import { reactive } from "vue"


export default () => {
  
  const list = reactive([
    { key: '', name: '访客量', value: 0 },
    { key: '', name: '恶意访客', value: 0 },
    { key: '', name: 'redis', value: 0 },
    { key: '', name: 'redis 占用', value: 0 },
  ])

  return {}
}