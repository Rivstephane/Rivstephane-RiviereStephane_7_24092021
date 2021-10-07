<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <div id="img">
                    <router-link to="/" class="navbar-brand">
                        <img src="../../assets/icon-left-font.png" alt="groupomania-logo">
                    </router-link>
                </div>
                <router-link to="/posts" v-if="getConnection" >  Publications </router-link>
                <router-link to="/Profil" v-if="getConnection" > Profil  </router-link>
                <router-link to="/deconnect" v-if="getConnection" >Se déconnecter</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data () {
        return {
        Connection: localStorage.getItem('token'),
        }
    },
    computed:{
        getConnection(){
            if(this.Connection !=null){
                return true;
            }
            else{
                return false
            }
        }
    }
}

</script>

<style lang="scss">
.navbar {
    overflow: hidden;
    display: flex;
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
    @media only screen and (max-width: 550px){        
        height: auto;
        #img{
            height: 100px;
        }

    }
}
</style>