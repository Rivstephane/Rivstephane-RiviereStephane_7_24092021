<template>
  <div id='home'>
    <div>
      <img id="logoHome" alt="Groupomania"  src='../assets/icon-above-font.svg' /><br/>
      <h1> Bienvenue sur le réseau social Groupomania ! </h1>
      <h2> Connectez-vous pour découvrir toutes les publications </h2>
    </div>
    <div id='login'>
      <Login/>
    </div>
    <div class='signup'>
      <router-link to ='./SignUp'><button type="submit" class="btn" ><em> Pas encore inscrit ?</em></button></router-link>
    </div>
  </div>
</template>

<script>
import Login from '../components/users/Login.vue'
export default {
  components: {
    Login
  }
}
</script>

<style lang="scss" scoped>
#home {
  background-color: #fb9e9e55;
  padding: 15px;
  margin-bottom: 10px; 
  & input {
    height: 20px;
    padding: 10px
  }
  & button {
    padding: 10px;
    background-color: #0b1c39;
    color:white;
    border-radius:15px
  }
  & #login {
    padding: 20px
  }
}

</style>
