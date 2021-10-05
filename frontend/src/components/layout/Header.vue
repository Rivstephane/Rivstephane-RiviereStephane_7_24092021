<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <router-link to="/" class="navbar-brand">
                    <img src="../../assets/icon-left-font.png" alt="groupomania-logo">
                </router-link>
                <router-link to="/posts">  Publications </router-link>
                <router-link to="/Profil"> Profil  </router-link>
                <router-link to="/deconnect" v-if="!isConnected" @v-on:click="logout()" >Se déconnecter</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
</script>

<style lang="scss">
.navbar {
    overflow: hidden;
    width: 100%;
    max-width: 1024px;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    padding: 0px;
    margin: 0px;
    img{
        height: 150px;
    }
    a {
        padding: 0 5px 0 5px;
        text-decoration: none;
        font-weight: bold;
        color: #0b1c39;
    }
    a:hover {
        color: #FD2D01;
    }
}
</style>