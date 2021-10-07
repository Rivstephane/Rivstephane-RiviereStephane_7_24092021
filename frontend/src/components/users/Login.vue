<template>
  <div class="jumbotron">
    <form @submit.prevent='login'>
      <div>
        <label for="email">Votre email </label><br/>
        <input id="email" v-model="email" type="text" name="email" />
      </div>
      <div>
        <label for="password">Votre mot de passe </label><br/>
        <input id="password" v-model="password" type="password" name="password" />
      </div>
      <button  type="submit" >Valider</button>
      <div v-show="isInvalid" class="text-danger" >{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import router from '../../router'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: 'erreur',
      isInvalid: false
    }
  },
  methods: {
    login () {
      if (this.email !== '' && this.password !== '') {
        this.user = {
          email: this.email,
          password: this.password
        }
      const body ={
          method: "POST",
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          })
        }
      fetch("http://localhost:3000/api/users/login", body)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          res.text().then(text => {
            this.isInvalid = true
            this.errorMessage = JSON.parse(text).error
          })
        })
        .then((user) => {
          (document.cookie = `user=${JSON.stringify(user)}; max-age=43200 ;pasth=/`)
          localStorage.setItem('token', (user.token))
          router.push({ path: 'Posts' })
        })
      } 
      else {
        this.isInvalid = true
        this.errorMessage = 'les champs Pseudo et mot de passe sont obligatoires'
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.jumbotron{
  & div{
    margin: 5px;
    & input {
      height: 30px;
    }
    & label {
      margin-top: 5px;
      margin-bottom: 0px;
      font-style: italic;
    }
    & label {
      margin-top: 5px;
      margin-bottom: 0px;
      font-style: italic;
    }
    & .btn {
      margin: 15px;
      width: 200px;
      background-color: #ffd7d7;
      border-radius:15px
    }
  }
}
</style>
