<template>
<!-- post selectionné avec modif ou sup si util est auteur du post -->
  <div class="onePost">
    <div class="post">
      <div class=" mx-auto card text-center w-50 ">
        <div class="card-header"> publié le: par {{post.username}} </div>
        <div class="card-body">
          <h2 class="card-title">{{post.title}}</h2>
          <p class="card-text">{{post.content}}</p>{{post.userid}}
        </div>
        <div>
          <button id="commentPost" type="button" class="btn btn-outline-secondary" v-on:click="displayComment">Commentaires</button>
        </div>
      </div>
      <!-- modification du post -->
      <div class=" mx-auto card text-center w-50 " v-show="connecter">
        <div class="card-body">
          <label for="title">titre </label>
          <br/>
          <input id="title" type="text" v-model="title" name="{{title}}" minlength="3" maxlength="50"/>
          <br/>
          <label for="content"> </label>
          <textarea id="content" type="text" v-model="content" name="{{content}}" class="form-control" minlength="25" maxlength="245" />
        </div>
        <div class="admin">
          <div>
            <button id="modifPost" type="submit" v-on:click="modify"  class="btn btn-success" >enregistrer la modification</button>
          </div>
          <div>
            <button id="btnSup" type='submit' v-on:click="deletedPost" class="btn btn-danger" >Supprimer Post</button>
          </div>
          <div v-show="isInvalid" class="text-danger">{{errorMessage}}</div>
        </div>
      </div>
    </div>
    <div class="comments" >
      <div class=" mx-auto card text-center w-50 "  v-show="display">
        <div>
          <textarea id="commentPost" placeholder="Votre commentaire..." v-model="commentPost" type="text" name="{{commentPost}}" class="form-control" rows="3" maxlength="100"/>
        </div>
        <div>
          <button @click.prevent="addComment" type="submit">Enregistre</button>
        </div>
      </div>
      <div v-for="comment of comments" :key="comment">
        <div class=" mx-auto card text-center w-50 ">
          <div class="card-body">
            <p class="card-text">{{comment.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  data () {
    return {
      id: this.$route.params.id,
      post: {},
      UserId: localStorage.getItem('userId'),
      Admin: localStorage.getItem('Admin'),
      display: false
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
  computed:{
    connecter(){
      if(localStorage.getItem('Admin')==true || localStorage.getItem("userId") == this.post.userid)
      {return true;}
      else
      {return false}
    }
  },
  methods: {
    displayComment(){
      this.display = !this.display
    },
    addComment: function (e) {
      e.preventDefault()
      if (this.descriptif === '' || this.title === '') {
        console.log('champ requis')
      }
      this.userName = localStorage.getItem('userName');
      const body ={
          method: "POST",
          headers: { "Content-Type": "application/json",Authorization: 'Bearer ' + localStorage.getItem('token') }, 
          body: JSON.stringify({
            content: this.commentPost,
            postid: this.post.id,
            userid: this.UserId,
          })
        }
        fetch('http://localhost:3000/api/messages', body)
          .then(res => res.json())
          .then(() => alert(`Article "${this.title}" créé`))
      router.go()
    },
    deletedPost(){
      const body ={
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('token') }, 
          body: JSON.stringify({
            id : this.post.id
          })
        }
      fetch(`http://localhost:3000/api/posts`, body)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          res.text().then(text => {
            this.isInvalid = true
            this.errorMessage = text.error
          })
        })
      router.push({ path: 'Posts' })
    },
    modify(){
      const body ={
          method: "PUT",
          headers: { "Content-Type": "application/json",Authorization: 'Bearer ' + localStorage.getItem('token') }, 
          body: JSON.stringify({
            id: this.post.id,
            content: this.content,
            title: this.title,
          })
        }
        fetch('http://localhost:3000/api/posts', body)
          .then(res => res.json())
          .then(() => alert(`Article "${this.title}" créé`))
    }
  }
}

</script>

<style lang="scss" >
.onePost{
  display: flex;
  flex-direction: column;
  justify-content: center;
  .card{
    margin-top:20px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: rgba(255, 215, 215, 0.1);
    border-radius: 15px;
    box-shadow: 3px 3px 1px #ffd7d7;
    .card-header{
      background-color: #0b1c39;
      color: white;
    }
    a{
    color: #fd2d01 ;
    }
    h2{
    color: #fd2d01 ;
    font-size: 1.2em;
    }
  }
  #content{
    margin: auto;
    max-width: 300px;
  }
  .admin{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

</style>