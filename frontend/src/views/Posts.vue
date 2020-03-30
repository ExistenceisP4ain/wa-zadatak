<template>
  <div v-if="store.authenticated">
    <h1>Nema upisa u search nego je sve u created()</h1>
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
    this.search('iva','rijeka')
    //this.search('nikola,null')
    //this.search(null,'kopno')
    //this.search()
  },
  name: "posts",
  methods: {
    fetchPosts(term, poCemu) {
      term = term || store.searchTerm
      fetch(`http://localhost:3000/posts?${poCemu}=${term}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log("Podaci s backenda", data)
          this.cards = data.map(doc => {
            return {id: doc.id, url: doc.source, email: doc.createdBy, title: doc.title, posted_at: Number(doc.postedAt)}
          })
          console.log(this.cards);
        })
    },
    search(title, createdBy){
      if(!title){
        this.fetchPosts(createdBy,"createdBy")
      }
      else if(!createdBy){
        this.fetchPosts(title, "title")
      }
      else if(!title && !createdBy){
      }
      else{
        let term = title + " " +createdBy
        this.fetchPosts(term, '_any')
      }
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