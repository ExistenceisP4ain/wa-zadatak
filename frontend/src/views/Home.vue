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
	
	 <table class="container" style="">
	  <tr><th>BTC</th><th>Euro</th><th>USD</th></tr>
	  <tr> <td>1</td>  <td>{{btceur}} €</td><td>{{btcusd}} $</td></tr>
	  </table>
<table style="">
	  <tr><th>HRK</th><th>EUR</th></tr>
	  <tr> <td>1 HRK</td>  <td>{{kuna}} €</td></tr>
	  </table>	
	  <table style="margin-left: 20px;">
	  <tr><th>BTC</th><th>HRK</th></tr>
	  <tr> <td>1 </td>  <td>{{kuna*btceur}} HRK</td></tr>
	  </table>
	  
	  
	  <br><br><br><br>
	 
  </div>
  
</template>

<script>
import store from "@/store.js";

export default {
  props: ["term"],
  data() {
    return store;
  },
  mounted(){
    fetch("https://api.exchangeratesapi.io/latest?symbols=HRK")
    .then((response)=>{
      return response.json()
    })
    .then((json)=>{
      console.log("[1 € ] = ", json.rates.HRK, " HRK")
      this.kuna=Number(json.rates.HRK)
    })
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((response)=>{
      return response.json()
    })
    .then((json)=>{
      console.log("Cijena BTC $:  ", json.bpi.USD.rate)
      this.btcusd=json.bpi.USD.rate;
		console.log("Cijena BTC €:  ", json.bpi.EUR.rate)
      this.btceur=json.bpi.EUR.rate_float; // ne dela bez float za mnozenje *saduwu*	
	  console.log("Ukupno: ", this.btceur*this.kuna)// total 1btc price in hrk
    })
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
