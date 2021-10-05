<template>
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
import Post from './Post.vue'
export default {
  components: { Post },
  data () {
    return {
      posts: [],
      id: this.$route.params.id

    }
  },
  created () {
    fetch(`http://localhost:3000/api/posts/user/${this.id}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.posts = response })
  }

}
</script>

<style>

</style>
