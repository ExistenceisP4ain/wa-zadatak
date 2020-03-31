<template>
  <div v-if="store.authenticated">
    <div @click="gotoDetails(card)" :key="card.id" v-for="card in cards">
      <InstagramCard :info="card"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Posts } from "@/services"
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";

export default {
  data() {
    return {
      store,
      cards: [],
    }
  },
  watch: {
    "store.searchTerm": _.debounce(function(val) {this.fetchPosts(val)}, 500)
  },
  created() {
    this.fetchPosts()
  },
  name: "posts",
  methods: {
    async fetchPosts(term) {
      term = term || store.searchTerm
	  
	  let pretraga = async (term) => {
	  let response = await fetch(`http://localhost:3000/posts?title=${term}`)
	  let data = await response.json()
	  return data
	  }
	  
	  let terms = term.split(" ")
	  console.log("terms", terms)
	  
	  let promises = terms.map(e => pretraga(e))
	  console.log ( "promises", promises)
	  
	  let results = await Promise.all(promises)
	  console.log("results", results)
	  
	  let rezultat = results.reduce( (final, e) => final.concat(e), [])
	  
	  
	  let data = rezultat
	  
	  let finalni = {}
	  data.forEach(post => finalni[post.id] = post)
	  console.log(finalni)
	  
	  data = Object.values(finalni)// this is muy importante
	  
	  
	  console.log ("podaci s backenda", data)
	  this.cards = data.map(doc => {
	  return {id: doc.id, url: doc.source, email: doc.createdBy, title: doc.title, posted_at: Number(doc.postedAt)}
	  })	  
	  
    },
    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
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