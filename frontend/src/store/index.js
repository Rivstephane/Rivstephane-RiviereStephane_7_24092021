import { createStore } from 'vuex'

const store = createStore({
  state: {
    connection : false,
    connecter : false,
    User:[],
    userName : '',
    userId : '0',
    bio : '',
    getadmin : '',
    token:''
  },
  getters:{

  },
  mutations: {
    getConnection(state, verif){
      if(verif)
      {
        state.connection =  true
      }
    },
    getadmin(state, isAdmin){
      state.connecter = isAdmin;
    },
    user(state, User){
      state.User = User;
    },
    userName(state, name){
      state.name = name;
    },
    userToken(state, token){
      state.token = token;
    },
    userId(state, id){
      state.userId = id;
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