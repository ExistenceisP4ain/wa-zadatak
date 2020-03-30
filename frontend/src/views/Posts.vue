<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
      <InstagramCard :info="card"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
import {test, posts} from '@/services';


export default {
  data() {
    return {
      store,
      cards: [],
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchPosts(val)}, 500)
    //"store.searchTerm": function(val) {this.fetchPosts(val)}
  },
  created() {
    this.fetchPosts()
  },
  name: "posts",
  methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm
      this.cards=await posts.getAll(term)
    },
    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'newpost'}).catch(err => console.log(err))
    }
  },
  components: {
    InstagramCard
  },
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>