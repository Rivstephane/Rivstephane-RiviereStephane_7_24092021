<template>
<!-- post selectionné avec modif ou sup si util est auteur du post ou admin -->
  <div class="onePost">
    <div class="post">
      <div class=" mx-auto card text-center">
        <div class="card-header">
          <h2 class="card-title">{{post.title}}</h2>
        </div>
        <div class="card-body">
          <p> publié le: {{((((post.createdAt.split("T",1))[0]).split("-")).reverse())[0]}} {{((((post.createdAt.split("T",1))[0]).split("-")).reverse())[1]}} {{((((post.createdAt.split("T",1))[0]).split("-")).reverse())[2]}} par {{post.username}} 
          </p>
          <p class="card-text">{{post.content}}</p>
        </div>
        <div>
          <button id="commentPost" type="button" class="btn btn-outline-secondary" v-on:click="displayComment">Commentaires</button>
        </div>
      </div>
      <!-- modification du post -->
      <div class="mx-auto card text-center" v-show="connecter">
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
            <button id="btnSupPost" type='submit' v-on:click="deletedPost" class="btn btn-danger" >Supprimer Post</button>
          </div>
          <div v-show="isInvalid" class="text-danger">{{errorMessage}}</div>
        </div>
      </div>
    </div>
      <!-- commentaire du post -->
    <div class="comments" >
      <div v-show="display">
        <div class=" mx-auto card text-center"  >
          <div>
            <textarea id="commentPost" placeholder="Votre commentaire..." v-model="commentPost" type="text" name="{{commentPost}}" class="form-control" rows="3" maxlength="100"></textarea>
          </div>
          <div>
            <button @click.prevent="addComment" type="submit">Enregistre</button>
          </div>
        </div>
        <div v-for="comment of messages" :key="comment">
          <div v-if="comment.postid == this.id">
            <div class="message mx-auto card text-center">
              <div class="card-body">
                <p class="card-text">{{comment.content}}</p>
              </div>
              <div v-if="cookie.isAdmin">
                <button id="btnSupcom" type='submit' v-on:click="deletedComment(comment.id)" class="btn btn-danger btn_Comment" >X</button>
              </div>
            </div>
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
      display: false,
    }
  },
  created () {
    this.cookie= JSON.parse(document.cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1])
    fetch(`http://localhost:3000/api/posts/${this.id}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.post = response })
      
    fetch('http://localhost:3000/api/messages',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.messages = response })
  },
  computed:{
    connecter(){
      if(this.Admin==true || this.UserId == this.post.userid)
      {return true;}
      else
      {return false}
    },
    isAdmin(){
      if(this.Admin)
      {return true;}
      else
      {return false}
    }
  },
  methods: {
    displayComment(){
      this.display = !this.display
    },
    addComment() {
      if (this.commentPost == null || this.commentPost == '') {
        alert("Le contenu du message n'est pas valide ou est inexistant ")
      }
      else{
        this.userName = localStorage.getItem('userName');
        const body ={
            method: "POST",
            headers: { "Content-Type": "application/json",Authorization: 'Bearer ' + localStorage.getItem('token') }, 
            body: JSON.stringify({
              content: this.commentPost,
              postid: this.post.id,
              userid: this.UserId,
              username: this.userName 
            })
          }
          fetch('http://localhost:3000/api/messages', body)
            .then(res => res.json())
            .then(() => alert(`Message édité`))
            router.push({ path: '/'})
      }
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
        .then(() => alert(`Post suprimer`))
      router.push({ path: '/' })
    },
    deletedComment(id){
      const body ={
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('token') }, 
          body: JSON.stringify({
            id : id
          })
        }
      fetch('http://localhost:3000/api/messages', body)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          res.text().then(text => {
            this.isInvalid = true
            this.errorMessage = text.error
          })
        })
        .then(() => alert(`Message suprimer`))
        router.push({ path: '/' })
    },
    modify(){
      if (this.content == null || this.content== ''|| this.title == null || this.title == '') {
        alert("Le contenu du post n'est pas valide ou est inexistant ")
      }
      else{
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
            .then(() => alert(`Message rédité`))
        router.push({ path: '/' })
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.onePost{
  display: flex;
  flex-direction: column;
  justify-content: center;
  .card{
    width:60%;
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
    .admin{
      div{
        margin: 10px;
      }
    }
  }
  @media only screen and (max-width: 900px){
    .card{
      width: 80%;
    }
  }
  @media only screen and (max-width: 600px){
    .card{
      width: 95%;
      input{
        width: 100%;
      }
      .admin{
        display: flex;
        flex-direction: column;
      }
    }
    .message{
      flex-wrap: wrap;
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
  .message{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
  }
  .btn_Comment{
    border-radius: 360%;
  }
  
}

</style>