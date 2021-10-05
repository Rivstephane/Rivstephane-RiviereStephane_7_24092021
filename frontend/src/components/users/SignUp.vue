<template>
  <form @submit.prevent="signup" id="signup">
    <h2> Créez votre profil </h2>
    <div >
      <label for="username">Nom ou Pseudo </label> <br/>
      <input id="userName" v-model="username" type="text" name="username"/>
    </div>
    <div>
      <label for="email">Votre adresse mail </label> <br/>
      <input id="email" v-model="email" type="text" name="email" />
    </div>
    <div>
      <label for="password">Mot de passe </label> <br/>
      <input id="password" v-model="password" type="password" name="password" /><br/>
      <p class="text-muted">minimum 8 caractères dont 1 majuscule, 1 minuscule et 2 chiffre</p>
    </div>
    <div>
      <label for="bio">Courte Description </label> <br/>
      <textarea id="bio" v-model="bio" type="text" name="bio" maxlength="240"/>
    </div>
    <div>
      <button type="submit">S'inscrire</button>
    </div>
    <div v-show="isInvalid" class="text-danger" > {{ errorMessage }} </div>
  </form>
</template>

<script>
import router from '../../router'
export default {
  name: 'SignUp',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      bio: '',
      isAdmin:"0",
      errorMessage: '',
      isInvalid: false,
    }
  },
  methods: {
    signup () {
      const modEmail = /^[a-zA-Z09.-_]+[@]{1}[a-zA-Z09.-_]+[.]{1}[a-zA-Z]+$/
      const modPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
      if (!(this.username.length > 3 ||
      modEmail.test(this.email) ||
      modPassword.test(this.password))) {
        this.isInvalid = true
        this.errorMessage = 'Merci de remplir chaque champ comme indiqué'
      }
      const body ={
          method: "POST",
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            password: this.password,
            bio: this.bio,
            isAdmin:"0",
          })
        }
      fetch("http://localhost:3000/api/users/signup", body)
        .then(res => {
          if (res.ok) {
            alert('inscription réussie')
            router.push({ path: '/posts' })
          }
          res.text().then(text => {
            this.isInvalid = true
            this.errorMessage = text
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#signup{
  background-color: #fb9e9e55;
  padding: 15px;
  & button{
    margin-top: 30px;
    color: white;
    background-color: #0b1c39;
    border-radius: 20px;
    padding: 5px 15px 5px 15px;
  }
}
</style>
