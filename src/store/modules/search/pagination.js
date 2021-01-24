const defaultLimit = 20

export default {
  namespaced: true,
  state: () => ({
    currentPage: 1
  }),
  getters: {
    pagesCount: (_, __, rootState) =>
      Math.ceil(rootState.search.totalCount / defaultLimit),
    offset: state => (state.currentPage - 1) * defaultLimit
  },
  mutations: {
    setCurrentPage(state, v) {
      state.currentPage = v
    }
  },
  actions: {
    updatePage({ commit, dispatch }, v) {
      commit('setCurrentPage', v)

      dispatch('search/loadProducts', null, { root: true })
    }
  }
}
