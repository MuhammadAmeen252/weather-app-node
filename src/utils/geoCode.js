const request=require('request')

//geocoding: adress->lat/long->Weather
const geoCode=(adress,callback)=>{
    const geoCodeURL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1Ijoic2hlaWtoYW1lZW4iLCJhIjoiY2s5b3E5OThpMDMyODNmbWV0eXNuaG82NSJ9.nBI_7PhnKOcfNj222MgZxA&limit=1`
    request({url:geoCodeURL,json:true},(err,response,body)=>{
            if(err){
                callback('error: unable to find the requested URL',undefined)
            }
            else if(body.features.length===0){
                callback('error: unable to find the location',undefined)
            }
            else{
                const data={ 
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                placeName:body.features[0].place_name
                }
                callback(undefined,data)
            }
    })
}
module.exports=geoCode