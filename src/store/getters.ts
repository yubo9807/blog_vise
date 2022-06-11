type State = any

const getters = {
  token: (state: State) => state.user.token,
  userInfo: (state: State) => state.user.info,
  role: (state: State) => state.user.role,
  slider: (state: State) => state.slider.hiddenSlider,
}
export default getters
