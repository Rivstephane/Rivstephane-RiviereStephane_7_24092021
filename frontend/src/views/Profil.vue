<template>
  <div class="jumbotron">
    <div class="logoGroupomania">
      <img alt="logo Groupomania"  src='../assets/icon-left-font-monochrome-white.png' />
    </div>
    <h1> Votre profil </h1>
    <div >
      <label>Nom ou Pseudo: </label>
      <p id="userName">{{ user.username }}</p>
    </div>
    <div>
      <label>Email: </label>
      <p id="email">{{ user.email }}</p>
    </div>
    <div>
      <label>Bio: </label>
      <p id="bio" >{{ user.bio }}</p>
    </div>
    <div>
      <button id="btnChoixSup" @click="displaySuprimer"> Voulez vous suprimer ce profil </button>
    </div>
    <div v-show="display">
      <button id="btnSup" type='submit' @click="deletedUser" class="btn-danger" >Supprimer profil</button>
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  data () {
    return {
      user: [],
      display: false
    }
  },
  created () {
    const id = localStorage.getItem('userId')
    fetch(`http://localhost:3000/api/users/${id}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.user = response })
  },
  methods: {
    displaySuprimer () {
      this.display = !this.display
    },
    deletedUser () {
      const body ={
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('token') }, 
          body: JSON.stringify({
            id : localStorage.getItem('userId')
          })
        }
      fetch(`http://localhost:3000/api/users`, body)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          res.text().then(text => {
            this.isInvalid = true
            this.errorMessage = text.error
          })
        })
      localStorage.clear()
      router.push({ path: '/' })
    }
  }
}

</script>

<style lang="scss" scoped>
.jumbotron{
  & div{
    margin: 15px;
  }
  & label{
    font-weight: bold;
  }
  & #btnChoixSup{
    color: white;
    background-color: #0b1c39;
    border-radius: 20px;
    padding: 5px 15px 5px 15px;
  }
  & #btnSup{
    border-radius: 20px;
    padding: 5px 15px 5px 15px;

  }
}


</style>
