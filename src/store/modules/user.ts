import { getCookie } from "@/utils/cookie";

export const VALID = Symbol('valid');
export const OVERDUE = Symbol('overdue');
const TOKEN = 'token';
const ROLE = 'role';

interface State {
  login: number
  role: string | number
  token: string
  info: any
}

const state: State = {
  login: 0,  // 登录状态  0: 未登录，1: 已登陆，2: 已退出
  role: sessionStorage.getItem(ROLE),  // 角色
  token: getCookie(TOKEN) || '',  // token
  info: {},  // 用户信息
}

const mutations = {

  // 设置登录状态
  set_login(state: State, value: number) {
    state.login = value;
  },

  // 设置角色
  set_role(state: State, value: string | number) {
    state.role = value;
    sessionStorage.setItem(ROLE, value.toString());
  },
  
  // 设置 token
  set_token(state: State, action: { type: symbol, payload?: string }) {
    switch (action.type) {
      case VALID:
        state.token = action.payload ?? '';
        document.cookie = `${TOKEN}=${action.payload};max-age=${60 * 60 * 2}`;
        break;
      case OVERDUE:
        state.token = '';
        document.cookie = `${TOKEN}='';max-age=-1`;
        break;
      default:
        return state.token;
    }
  },
  
  // 设置用户信息
  set_info(state: State, info: any) {
    state.info = info;
  }

}

export default {
  namespaced: true,
  state,
  mutations,
}