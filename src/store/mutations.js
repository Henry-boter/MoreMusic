import * as type from './mutation-types'
const mutations = {
  [type.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default mutations
