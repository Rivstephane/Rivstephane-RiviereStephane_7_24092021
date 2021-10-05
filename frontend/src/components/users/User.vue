<template>
  <div class=" card mx-auto text-center" style="width:15rem;">
    <div class="card-header"> {{pseudo}} </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{email}}</li>
      <li class="list-group-item">créé le {{formatedDate}}</li>
    </ul>
    <div class="card-footer">
      <router-link :to='`/findPostsByUser/${pseudo}`' > Voir les posts </router-link><br/>
      <router-link :to='`/DeleteUser/${pseudo}`'>Supprimer posts/profil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    id: {
      type: Number,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    pseudo: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  },
  computed: {
    // conversion date de création
    formatedDate () {
      const createdAt = new Date(this.createdAt)
      return `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  margin-top:20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgba(255, 215, 215, 0.1);
  border-radius: 15px;
  box-shadow: 3px 3px 2px #99c1da;

    .card-header{
      background-color: #99c1da
    }
    a{
      color: #fd2d01 ;
    }

}

</style>
