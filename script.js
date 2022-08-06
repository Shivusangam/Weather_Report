let fullrow=document.querySelector('.fullpage')
let jsondata=[]
let countrylist=async()=>{
    try{
        let api=await fetch(`https://restcountries.com/v2/all`)
        jsondata=await api.json()
        console.log(jsondata)
        jsondata.forEach((countrylist,ind)=>{
            //create new tag div
            let newdiv=document.createElement('div')
            //set atteribute class name col-lg-4
            newdiv.setAttribute('class','col-lg-4')
            newdiv.innerHTML=""
            let eachdivcard=""
            eachdivcard+=`
            <div class="card m-2">
            <div class="card-header">
            <h5 class="card-title"> ${countrylist.name}</h5>
          </div>
         
  <div class="card-body m-1">
  <div id="weather-model-${ind}" class="appendmodel"></div>
  <img src="${countrylist.flag}" class="card-img" alt="image loading ...">
    <p class="card-text">Capital : ${countrylist.capital}</p>
    <p class="card-text">Region : ${countrylist.region}</p> 
    <p class="card-text">Country code : ${countrylist.alpha3Code}</p> 
    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" onclick="loadweather(${countrylist.latlng},${ind})" data-target="#weatherModel-${ind}" id="weather-${ind}">
    Click for Weather</button>
  </div>
</div>
            `
            newdiv.innerHTML=eachdivcard;
            fullrow.appendChild(newdiv)

        })
    }catch(error){
        console.log(error)
    }
}


//weather api
let loadweather=async(lat,lng,id)=>{
  try{
    
    let weatherdat=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6ade6843e66699649ba4ea7b1f707451`)
    let weatherinfo=await weatherdat.json()
    console.log(weatherinfo)
    displyWeather([weatherinfo],id)
  }
  catch{
    console.log("no weather data available")

  }
}


let displyWeather=(weatherInfo,id)=>{
  let modelbody=document.querySelector('#weather-model-'+id)
  let allmodelbtn=document.querySelectorAll('div[id*="weather-model"]')
  allmodelbtn.forEach(allmodelbtn=>{
    allmodelbtn.innerHTML=""
  })
  modelbody.innerHTML=""
let modeldetal=""
  modeldetal+=`
  <div class="modal fade fullmodels" id="weatherModel-${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Weather info</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closebtn(${id})">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <p class="modal-subtitl"><label>Country Name </label>: ${weatherInfo[0].sys["country"]}</p>
        <ul class="list">
          <li class="list-text"><label>Humidity </label>: ${weatherInfo[0].main["humidity"]}</li>
          <li class="list-text"><label>Temperature </label>: ${weatherInfo[0].main["temp"]}</li>
          <li class="list-text"><label>Pressure </label>: ${weatherInfo[0].main["pressure"]}</li>
          <li class="list-text"><label>Wind Info </label>: deg: ${weatherInfo[0].wind["deg"]} gust: ${weatherInfo[0].wind["gust"]}</li>
          <li class="list-text"><label>Clouds </label>: ${weatherInfo[0].weather[0].description}</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary closebtn" data-dismiss="modal" onclick="closebtn(${id})">Close</button>
          
        </div>
      </div>
    </div>
  </div>`
  modelbody.innerHTML = modeldetal;
  document.querySelector('.fullmodels').style.display="block"
  document.querySelector('.fullmodels').style.opacity="1"
}

let closebtn=(id)=>{
  let modelbody=document.querySelector('#weather-model-'+id)
  modelbody.innerHTML=""
}

countrylist()