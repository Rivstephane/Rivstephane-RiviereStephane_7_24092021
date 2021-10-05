<template>
  <div class=" jumbotron">
    <img alt="logo Groupomania"  src='../assets/icon-left-font-monochrome-white.png' />
    <h1> Toutes les actualités </h1>
  </div>
  <button @click="btncreate" class="btn">Publier un article</button>
  <form v-show="open">
    <CreatePost></CreatePost>
  </form>
  <div class="container">
    <Post v-for="post of posts.slice().reverse() "
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :content="post.content"
      :pseudo="post.pseudo"
      :UserId="post.UserId"
      :published="post.published">
    </Post>
  </div>
</template>

<script>
import CreatePost from '../components/posts/CreatePost.vue'
import Post from '../components/posts/Post.vue'
import router from '../router'
export default {
  components: {
    CreatePost,
    Post
  },
  data () {
    return {
      posts: [],
      open: false
    }
  },
  methods: {
    btncreate () {
      this.open = !this.open
    }
  },
  created () {
    if (localStorage.getItem('pseudo')) {
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
  background-color: #0b1c39;
  height: 260px;
  color: white;
  img {
    width: 200px;
    margin-top:-50px
  }
}
.btn{
  background-color:white;
  border: 3px solid #0b1c39
}
</style>
