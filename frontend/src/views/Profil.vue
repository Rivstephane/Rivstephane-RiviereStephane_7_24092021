<template>
  <div class="jumbotron">
    <img alt="logo Groupomania"  src='../assets/icon-left-font-monochrome-white.png' />
    <h1> Votre profil </h1>
  </div>
  <div>
    <User v-for="user of users"
      :key="user.id"
      :id="user.id"
      :pseudo="user.pseudo"
      :email="user.email"
      :createdAt="user.createdAt">
    </User>
  </div>
</template>

<script>
import User from '../components/users/User.vue'
export default {
  components: { User },
  data () {
    return {
      users: []
    }
  },
  created () {
    const id = localStorage.getItem('pseudo')
    fetch(`http://localhost:3000/api/users/${id}`,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(response => response.json())
      .then(response => { this.users = response })
  }

}

</script>

<style lang="scss" scoped>
.jumbotron{
  background-color: #0b1c39;
  height: 200px;
  color: white;
  img {
    width: 130px;
    margin-top:0px
  }
}

</style>
