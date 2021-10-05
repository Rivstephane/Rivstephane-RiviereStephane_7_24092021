<template>
  <div id="body">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'body',
  components: {
    Header,
    Footer
  },
}
</script>

<style lang="scss">
#app{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  margin: auto;
  font-family: Georgia, Arial, sans-serif;
  text-align: center;
  color: #0b1c39;
}
p{
  font-size: 16px;
}
.logoGroupomania{
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #0b1c39;
  height: 60px;
  & img{
    width: 150px;
  }
}
</style>
