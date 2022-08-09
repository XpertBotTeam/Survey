import { createStore } from 'vuex'
import axiosClient from '../axios';

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    }
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
      .then(res => {
        return new Promise((resolve, reject) => {
          if (res.isAxiosError)
            reject(res.response.data.errors)
          const data = res.data
          commit('setUser', data.user);
          commit('setToken', data.token)
          resolve()
        })
      })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
      .then(res => {
        return new Promise((resolve, reject) => {
          if (res.isAxiosError)
            reject(res.response.data.errors)
          const data = res.data
          commit('setUser', data.user);
          commit('setToken', data.token)
          resolve()
        })
    })
  },
},
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {},
})

export default store;
