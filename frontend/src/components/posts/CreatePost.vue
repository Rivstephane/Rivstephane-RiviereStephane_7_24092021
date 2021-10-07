<template>
  <form @submit="create" >
    <p >
      <input id="title" v-model="title" type="text" name="title" placeholder="Titres"/>
    </p>
    <p class="col-auto">
      <label >Publication </label>
      <textarea id="descriptif" v-model="descriptif" type="text" name="descriptif" class="form-control" rows="10" maxlength="254"/>
    </p>
    <button type="submit">Enregistrer</button>
  </form>
</template>

<script>
import router from '../../router'
export default {
  name: 'CreatePost',
  data () {
    return {
      title: '',
      descriptif: '',
      UserId: '',
      username: ''
    }
  },
  methods: {
    create: function (e) {
      e.preventDefault()
      if (this.descriptif == null || this.descriptif== ''|| this.title == null || this.title== '') {
        alert("Le contenu du post n'est pas valide ou est inexistant ")
      }
      else{
        this.UserId = localStorage.getItem('userId');
        this.userName = localStorage.getItem('userName');
        const body ={
            method: "POST",
            headers: { "Content-Type": "application/json",Authorization: 'Bearer ' + localStorage.getItem('token') }, 
            body: JSON.stringify({
              descriptif: this.descriptif,
              title: this.title,
              UserId: this.UserId,
              username: this.userName
            })
          }
          fetch('http://localhost:3000/api/posts', body)
            .then(res => res.json())
            .then(() => alert(`Article "${this.title}" créé`))
        router.go()
      }
    }
  }
}

</script>

<style>

</style>
