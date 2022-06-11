import { getCookie } from "@/utils/cookie";

export const VALID = Symbol('valid');
export const OVERDUE = Symbol('overdue');
const token = 'token';

interface State {
  role: string | number
  token: string
  info: any
}

const state: State = {
  role: 'admin',  // 角色
  token: getCookie(token) || '',  // token 也用来判断是否登录
  info: {},  // 用户信息
}

const mutations = {

  // 设置角色
  set_role(state: State, value: string | number) {
    state.role = value;
  },
  
  // 设置 token
  set_token(state: State, action: { type: symbol, payload?: string }) {
    switch (action.type) {
      case VALID:
        state.token = action.payload ?? '';
        document.cookie = `${token}=${action.payload};max-age=${60 * 60 * 2}`;
        break;
      case OVERDUE:
        state.token = '';
        document.cookie = `${token}='';max-age=-1`;
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