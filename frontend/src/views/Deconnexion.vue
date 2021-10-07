<template>
  <div class=" jumbotron">
    <div class="logoGroupomania">
      <img alt="logo Groupomania"  src='../assets/icon-left-font-monochrome-white.png' />
    </div>
      <h1> A bientôt ! </h1>
    <div>
      <hr/>
        <router-link to='/'> Retour à l'accueil </router-link>
      <hr/>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    document.cookie = 'user; max-age=0.001'
    localStorage.clear()
  }
}
</script>

<style lang="scss" scoped>
.jumbotron{
  color: #0b1c39;
  height: 260px;
}
</style>
