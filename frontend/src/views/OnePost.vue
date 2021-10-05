<template>
<!-- post selectionné avec modif ou sup si util est auteur du post -->
  <Post v-bind="post"></Post>
    <div v-if="post.UserId == UserId">
      <button @click="btnMmodifier" class='btn'>Modifier</button>
    </div>
    <div v-if="post.UserId == UserId || Admin === 'true'">
      <button @click="btnSupprimer" class='btn'> supprimer </button>
    </div>
  <div>
    <!-- modification du post -->
    <form class="jumbotron mx-auto col-5" v-show="openMod" @submit.prevent="modify">
      <p class="col-auto">
        <label for="title">titre </label><br/>
        <input id="title" type="text" v-model="title" name="{{title}}" />
      </p>
      <p class="col-auto">
        <label for="content"> </label>
        <textarea id="content" type="text" v-model="content" name="{{content}}" class="form-control" rows="5" />
      </p>
      <button type="submit">enregistrer la modification</button>
      <div v-show="isInvalid" class="text-danger" >{{errorMessage}}</div>
    </form>
    <!-- suppression du post -->
    <form class="jumbotron  mx-auto col-5" v-show="openSup" @submit.prevent='sup' >
      <h6> Confirmez vous la suppression de cette publication ?</h6>
      <p> Les commentaires seront également supprimés </p>
      <router-link to='/Posts'><button type='submit' class="btn-info">Non</button></router-link>
      <button type='submit' class="btn-danger">Suppression</button>
      <div v-show="isInvalid" class="text-danger">{{errorMessage}}</div>
    </form>
  </div>
</template>

<script>
import Post from '../components/posts/Post.vue'
export default {
  components: { Post },
  data () {
    return {
      id: this.$route.params.id,
      post: {},
      title: '',
      content: '',
      openSup: false,
      openMod: false,
      UserId: localStorage.getItem('UserId'),
      Admin: localStorage.getItem('Admin'),
      isInvalid: '',
      errorMessage: ''
    }
  },
  created () {
    fetch(`http://localhost:3000/api/posts/${this.id}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.post = response })
  },
  methods: {
    btnMmodifier () {
      this.openMod = !this.openMod
      this.openSup = false
    },
    btnSupprimer () {
      this.openSup = !this.opensSup
      this.openMod = false
    },
    sup () {
      fetch(`http://localhost:3000/api/posts/${this.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          const data = response.data
          console.log(data)
          this.data = alert('Le post a bien été supprimé !')
          this.$router.replace({ name: 'Posts' })
        })
    },
    modify () {
      if (this.content === '' || this.title === '') {
        this.isInvalid = true
        this.errorMessage = 'merci de compléter les champs'
      } else {
        this.post = {
          content: this.content,
          title: this.title,
          UserId: localStorage.getItem('UserId')
        }
        fetch(`http://localhost:3000/api/posts/${this.id}`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.post)
        })
          .then(res => res.json())
          .then(() => alert(`Article "${this.title}" modifié`))
        this.$router.replace({ name: 'Posts' })
      }
    }
  }
}

</script>

<style >

</style>
