import { createStore } from 'vuex'

const store = createStore({
  state: {
    connecter : false,
    User:[],
    userName : '',
    userId : '',
    bio : '',
    getadmin : '',
  },
  getters:{

  },
  mutations: {
    getadmin(state, isAdmin){
      state.connecter = isAdmin;
    },
    user(state, User){
      state.User = User;
    },
    userName(state, name){
      state.name = name;
    },
    userId(state, id){
      state.id= id;
    },
    bio(state, bio){
      state.bio = bio;
    }
  },
  actions: {
  },
  modules:{
  }
})
    
export default store;