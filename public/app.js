

console.log('client side java script file is loaded')
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.getElementById('output-1');
const message2=document.getElementById('output-2');
const countryFlag=document.getElementById('countryFlag')
weatherForm.addEventListener('submit',(event)=>{
event.preventDefault()
message1.textContent='Loading....'
const address=search.value
//console.log(address)
fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
        }
        else{
            //message2.textContent=data.location
            message1.textContent=data.foreCast
            console.log(data.country);
            
            countryFlag.src='https://www.countryflags.io/'+data.country+'/flat/64.png'
        }
        
    })
})
})
