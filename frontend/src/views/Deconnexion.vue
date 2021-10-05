<template>
  <div class=" jumbotron">
    <img alt="logo Groupomania"  src='../assets/icon-left-font-monochrome-white.png' />
    <h1> A bientôt ! </h1>
  </div>
  <div>
    <hr/>
    <router-link to='/'> Retour à l'accueil </router-link>
    <hr/>
  </div>
</template>

<script>
export default {
  created () {
    localStorage.clear()
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
</style>
