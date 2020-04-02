![Image description](https://i.kym-cdn.com/entries/icons/mobile/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg)


### Zadatak:

* *Implementiraj običnu funkciju koja prima kao parametar prima callback funkciju na koju
dostavlja cijenu Bitcoina izraženu HRK pomoću sljedećih servisa:
https://api.exchangeratesapi.io/latest?symbols=HRK
https://api.coindesk.com/v1/bpi/currentprice.json
Implementiraj sa __asinkronom funkcijom__* 



__frontend/src/views/Home.vue__
```
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
}
  ```
  
