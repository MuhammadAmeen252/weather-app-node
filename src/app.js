const express = require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
//const geoCode=require('./geoCode.js')
const foreCast=require('./utils/forecast.js')

//define paths for express configuration
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup static directory to serve
app.use(express.static(publicDirPath)) 
//hbs(handlebars) are used to display dynmaic web pages(i.e page content chages according to user)
//wheras static web pages have same content for every user
//handle bar views should be in views name folder in directory

//setup handle bars engine and views path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

let country=''
//app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
        
    }
    const address=req.query.address
    foreCast(address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        else{
            let temp=data.split(",")
            country=temp[1].split(" ")
            
            
            res.send({
                location:address,
                foreCast:data,
                country:country[0]
            })
        }
    })
    
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Muhammad Ameen'
    }) 
})


//app.com.about
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Muhammad Ameen'
    })
})
//app.com.help
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Muhammad Ameen'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

//app.com.error

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title:'Help article not found',
        name:'Muhammad Ameen'
    })
})

app.get('/about/*',(req,res)=>{
    res.render('error404',{
        title:'About article not found',
        name:'Muhammad Ameen'
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        title:'error 404 Page not found',
        name:'Muhammad Ameen'
    })
})

//setting upserver on port 3000
app.listen(3000,()=>{
console.log('server is up on port 3000')
})

