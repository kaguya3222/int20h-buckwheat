const defaultLimit = 20

export default {
  namespaced: true,
  state: () => ({
    currentPage: null
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
    async updatePage({ commit, dispatch }, v) {
      commit('setCurrentPage', v)

      await dispatch('search/loadProducts', null, { root: true })
    }
  }
}
