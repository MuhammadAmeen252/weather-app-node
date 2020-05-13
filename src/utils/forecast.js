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
          callback(undefined,`Its ${weather.main.temp} degrees in ${weather.name},${weather.sys.country} and it has ${weather.weather[0].description}`)
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