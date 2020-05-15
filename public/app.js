

console.log('client side java script file is loaded')
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.getElementById('output-1');
const message2=document.getElementById('output-2');
const countryFlag=document.getElementById('countryFlag')
const weatherIcon=document.getElementById('weatherIcon')
weatherForm.addEventListener('submit',(event)=>{
event.preventDefault()
countryFlag.src=""
weatherIcon.src=""
message2.textContent=""
message1.textContent='Loading....'
const address=search.value
fetch('/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }
        else{
            message2.textContent=data.location+','+data.country+' weather'
            countryFlag.src='https://www.countryflags.io/'+data.country+'/flat/64.png'
            message1.textContent=data.foreCast
            weatherIcon.src='http://openweathermap.org/img/wn/'+data.weatherIcon+'@2x.png'
            
        }
        
    })
})
})
