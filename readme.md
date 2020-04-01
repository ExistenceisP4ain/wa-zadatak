## backend not needed, same as wa-backend - week 3


#### all magic is in views/Home.vue, radjeno bez upaljenog backenda tako da generalno prikazuje tablicu s podacima, ukoliko se pokrene i backend moguć je breakdown stranice 🙄😰


### magic code
```
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
      /* Na kraju sam zaboravio total, which is {{ btceur * kuna }} */
    })
}
```

