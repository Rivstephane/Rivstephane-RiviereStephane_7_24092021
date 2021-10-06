<template>
  <div class="jumbotron">
    <div class="logoGroupomania">
      <img alt="logo Groupomania"  src='../assets/icon-left-font-monochrome-white.png' />
    </div>
    <h1> Toutes les actualités </h1>
    <button @click="btncreate" class="btn btn-outline-dark">Publier un article</button>
    <form v-show="open">
      <CreatePost></CreatePost>
    </form>
      <Post></Post>
  </div>
</template>

<script>
import CreatePost from '../components/posts/CreatePost.vue'
import Post from '../components/posts/Post.vue'
export default {
  components: {
    CreatePost,
    Post
  },
  data () {
    return {
      posts: [],
      open: false,
    }
  },
  methods: {
    btncreate () {
      this.open = !this.open
    },
  },
}

</script>

<style lang="scss" scoped>
.jumbotron{
  &.btn{
    background-color:white;
    border: 3px solid #0b1c39
  }
}
</style>
