//jshint esversion:6
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res)
{const query=req.body.cityName;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=092f0bfe2aeeb01a741ae0dee05c21a8";
  https.get(url,function(response)
  {
   console.log(response.statusCode);
   response.on("data",function(data)
  {
   const weatherData=JSON.parse(data);
   const icon = weatherData.weather[0].icon;
   console.log(weatherData.main.temp);
   console.log(weatherData.weather[0].description);
   res.write("<p>The Current weather is : "+ weatherData.weather[0].description+"</p>");
   res.write('<h1>Temperature in '+query+' is: '+weatherData.main.temp+' degrees Celcius </h1>');
   res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>");
   res.send();
  });
  });

});


app.listen(3000,function()
{
  console.log("Server running at port 3000");
});
