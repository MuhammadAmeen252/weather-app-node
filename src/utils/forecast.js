const request=require('request')
const forecast=(city,callback)=>{
    let apiKey='b54267c23e30731ef43f1e2d37ae48ed'
    //let city = 'rawalpindi'
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&appid=${apiKey}`
      request(url,(err, response, body)=> {
      if(err){
        callback('error: Unable to connect to internet',undefined)
      }
      else if(body.error){
        console.log('error: Unable to get weather',undefined)
      }
      else {
        let weather=JSON.parse(body)
        if(weather.cod===200){
          callback(undefined,`${weather.weather[0].icon} Its ${weather.main.temp}°C in ${weather.name},${weather.sys.country} and
           it feels like ${weather.main.feels_like}°C, it has ${weather.weather[0].description}, \n
           Minimum temp: ${weather.main.temp_min}°C, Maximum temp: ${weather.main.temp_max}°C , Humidity: ${weather.main.humidity}%
            Wind: ${weather.wind.speed} meter/sec.`)
        }
        else{
          callback('error: location not found',undefined)
        }
        
      }
    
      })
    }

module.exports= forecast


/*const forecast=(long,lat,callback)=>{
let apiKey='b54267c23e30731ef43f1e2d37ae48ed'
let city = 'rawalpindi'
let url = `http://api.openweathermap.org/data/2.5/weather?lat=${long}&lon=${lat}&appid=${apiKey}&units=metric`
  request({url:url,json:true},(err, response, body)=> {
  if(err){
    callback('error: Unable to connect to internet',undefined)
  }
  else if(body.error){
    callback('error: Unable to get weather',undefined)
  }
  else {
    callback(undefined,`Its ${body.main.temp} degrees in ${body.name} and there are ${body.weather[0].description}`)
  }

  })
}*/