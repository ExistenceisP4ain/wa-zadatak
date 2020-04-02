<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <router-link :to="{name: 'newpost'}">
        <button type="Novi post" style="margin-bottom: 10px" class="btn btn-primary btn-block d-md-none">Post new image</button>
      </router-link>
      <router-view :term="term"/>
    </div>
    <div class="col-4">
	
      <span v-if="authenticated">
        Current account: {{ userEmail }}
        <br/>
        <br/>
      </span>
      <router-link :to="{name: 'newpost'}">
        <button type="Novi post" class="btn btn-primary btn-block d-none d-md-block">Post new image</button>
      </router-link>
    </div>
	
	 1 € = {{kuna}}HRK<br>
	 1BTC = {{btceur}}€<br>
	 1BTC = {{kuna*btceur}}HRK
	 
  </div>
  
</template>

<script>
import store from "@/store.js";

export default {
  props: ["term"],
  data() {
    return {
	store,
	kuna:'',
	btceur:''
	}
  },
  async mounted(){
  
    let response=await fetch("https://api.exchangeratesapi.io/latest?symbols=HRK")
    let data=await response.json()
      .then(a=>{
        this.kuna=Number(a.rates.HRK)
		console.log("1€ = ",this.kuna, "HRK")
      })
    let response2=await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    let data2=await response2.json()
      .then(a=>{
        this.btceur=a.bpi.EUR.rate_float
		console.log("1 BTC = ",this.btceur, "€")
      })
	  console.log("Total 1btc in hrk: ",this.kuna*this.btceur)
},
  name: "home"
};
</script>

<style>

table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
  padding: 20px;
}

</style>