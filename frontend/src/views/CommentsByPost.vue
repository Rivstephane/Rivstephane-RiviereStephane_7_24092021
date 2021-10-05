<template>
<!-- publication avec ses commentaires -->
  <Post v-bind="post"></Post>
    <!-- Ajout d'un commentaire -->
  <form class="mx-auto col-4">
    <input v-model="newComment.body" placeholder="Votre commentaire..." type="text" class="form-control" />
    <button @click.prevent="addComment" type="submit">ok</button>
  </form>
  <!-- Affichage des commentaires -->
  <div v-for="comment of comments"
  :key="comment.id"
  :id="comment.id"
  :UserId="comment.userId"
  :pseudo="comment.pseudo"
  :content="comment.content">
    <div class="container">
      <div class="comment text-center mx-auto col-4">
        <div ><em>{{comment.pseudo}}: </em>
          <p>{{comment.content}}</p>
        </div>
        <router-link :to='`/ModifyComment/${comment.id}`' v-if="comment.UserId == UserId">Modifier
        </router-link>
        <router-link :to='`/DeleteComment/${comment.id}`' v-if="comment.UserId == UserId || Admin === 'true'">Supprimer
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import Post from '../components/posts/Post.vue'
export default {
  components: { Post },
  data () {
    return {
      comments: [],
      comment: {},
      id: this.$route.params.id,
      post: {},
      newComment: {
        body: ''
      },
      UserId: localStorage.getItem('UserId'),
      Admin: localStorage.getItem('Admin')
    }
  },
  created () {
    fetch(`http://localhost:3000/api/posts/${this.id}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.post = response })

    fetch(`http://localhost:3000/api/comments/post/${this.id}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.comments = response })
  },
  methods: {
    addComment () {
      if (this.newComment.body === '') {
        console.log('champ requis')
      } else {
        this.comment = {
          content: this.newComment.body,
          pseudo: localStorage.getItem('pseudo'),
          UserId: localStorage.getItem('UserId'),
          PostId: this.id
        }
        fetch('http://localhost:3000/api/comments', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.comment)
        })
          .then(res => res.json())
          .then(() => console.log('commentaire ajouté'))
      }
      router.go()
    }
  }
}

</script>

<style>
.comment{
  background-color: white;
  border: 1px dotted #0b1c39;
  box-shadow: 1px 1px ;
}

</style>
