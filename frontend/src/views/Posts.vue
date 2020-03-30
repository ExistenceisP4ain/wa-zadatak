<template>
  <div v-if="store.authenticated">
    <button @click="newImage()" type="Novi post" class="btn btn-primary ml-2">Post new image</button>
    <div @click="gotoDetails(post)" :key="post.id" v-for="post in posts">
      <InstagramCard :info="post"/>
    </div>
  </div>
</template>

<script>
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store.js";
import _ from 'lodash'

export default {
  data() {
    return{
      store,
      posts:[],
      term:''
    }
  },
  
  name: "posts",
  mounted(){
    this.search();
  },
  methods: {
    fetchPosts(){
    fetch(`http://localhost:3000/posts?_any=${this.store.searchTerm}`)
    .then(data=>{
      return data.json()
    })
    .then(sjz=>{
      this.posts=sjz.map(doc=>{
        return{
          id:doc.id,
          email:doc.createdBy,
          postedat:Number(doc.postedAt),
          url:doc.source,
          title:doc.title
        }
      })
    })
    },
    gotoDetails(card) {
      this.$router.push({path: `post/${card.id}`})
    },
    newImage() {
      this.$router.push({name: 'newpost'}).catch(err => console.log(err))
    },
    search(title, createdBy){
	
      title=this.store.searchTerm;
      createdBy=this.store.searchTerm;
	  
      if(!title){
        this.fetchPosts(createdBy)
      }
      else if(!createdBy){
        this.fetchPosts(title)
      }
      else if (title && createdBy){
        let nonjo=title+' '+createdBy
        this.fetchPosts(nonjo)
      }
      else{
        return  
      }
    }
  },
  components: {
    InstagramCard
  },
  watch:{
    "store.searchTerm": _.debounce(function(){
        this.search();
    },500)
  }
}
</script>

<style scoped>
  button {
    margin-bottom: 20px
  }
</style>
