<template>
  <div class="jumbotron">
    <div class="logoGroupomania">
      <img alt="logo Groupomania"  src='../assets/icon-left-font-monochrome-white.png' />
    </div>
    <h1> Toutes les actualités </h1>
    <button @click="btncreate" class="btn">Publier un article</button>
    <form v-show="open">
      <CreatePost></CreatePost>
    </form>
    <div class="container">
      <div v-for="post of posts" :key="post">
          <div class=" mx-auto card text-center w-50 ">
            <div class="card-header"> publié le: {{post.createdAt}} par {{post.username}} </div>
            <div class="card-body">
              <router-link :to='`/OnePost/${post.id}`'>
              <h2 class="card-title">{{post.title}}</h2>
              </router-link>
              <p class="card-text">{{post.content}}</p>
            </div>
            <div>
              <router-link :to='`/CommentsByPost/${post.id}`'>Commentaires</router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreatePost from '../components/posts/CreatePost.vue'
import router from '../router'
export default {
  components: {
    CreatePost,
  },
  data () {
    return {
      posts: [],
      open: false
    }
  },
  computed:{
    connecter(){
      return this.$store.state.connecter;
    }
  },
  methods: {
    btncreate () {
      this.open = !this.open
    },
  },
  created () {
    if (localStorage.getItem('userName')) {
      fetch('http://localhost:3000/api/posts',
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then(response => response.json())
        .then(response => { this.posts = response })
    } else {
      router.push({ path: '/' })
    }
  }
}

</script>

<style lang="scss" scoped>
.jumbotron{
  &.btn{
    background-color:white;
    border: 3px solid #0b1c39
  }
  & .card{
    margin-top:20px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: rgba(255, 215, 215, 0.1);
    border-radius: 15px;
    box-shadow: 3px 3px 1px #ffd7d7;
    & .card-header{
      background-color: #ffd7d7
    }
    & a{
    color: #fd2d01 ;
    }
    & h2{
    color: #fd2d01 ;
    font-size: 1.2em;
    }
}
}
</style>
