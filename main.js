var users = ["ESL_SC2","cretetion", "P4wnyhof", "Lucksn","Voyboy","freecodecamp","habathcx"];
var searchBox = document.getElementById("Search-Box");



var All = document.getElementById("All");
var Online = document.getElementById("Online");
var Offline = document.getElementById("Offline");

for(var i = 0; i<users.length;i++){
  Request(i);
}

document.addEventListener("DOMContentLoaded",function(){
  
  var resultList = document.querySelectorAll("li.resultList");
  
All.addEventListener("click", function(){

    document.getElementById("offlineRes").classList.remove("Active-Menu"); 
    document.getElementById("onlineRes").classList.remove("Active-Menu");
  
  
});
Online.addEventListener("click", function(){
      document.getElementById("offlineRes").classList.add("Active-Menu"); 
    document.getElementById("onlineRes").classList.remove("Active-Menu"); 
    
});
Offline.addEventListener("click", function(){
    
    document.getElementById("onlineRes").classList.add("Active-Menu"); 
    document.getElementById("offlineRes").classList.remove("Active-Menu");
  
});
  document.getElementById("Search-Box").oninput = searchFunc;

function searchFunc(){
  var resultList = document.querySelectorAll("li.resultList");
  console.log("Hooray");
  console.log(resultList[0]);
  

  var a;  //console.log(searchValue);
  
  var searchValue = document.getElementById("Search-Box").value.toLowerCase();
  
  

  for(i =0;i<resultList.length;i++){

   a = resultList[i].getElementsByTagName('a')[0];
    
    console.log(a);

    if(a.innerHTML.toLowerCase().indexOf(searchValue)>-1){
      

      resultList[i].style.display = "";
    }else{
      
     resultList[i].style.display = "none";

  }
  
  }
  
}
  


});//DOM Content Load end



function Request(a){

var ourRequest = new XMLHttpRequest();
ourRequest.open("GET","https://wind-bow.glitch.me/twitch-api/streams/"+users[a]);

ourRequest.onload = function(){
  resultFunc(a);
  };

ourRequest.send();

 


function resultFunc(b){
  var onlineResult = document.getElementById("onlineRes");
  var offlineResult = document.getElementById("offlineRes");
  var url = "https://www.twitch.tv/"+ users[b];
  
  var JsonResult = JSON.parse(ourRequest.responseText);
  var newRequest = new XMLHttpRequest();
  var Streaming = JsonResult.stream;
  
  
  if(JsonResult.stream === null){


    offlineUserRequest(b);
  }
  

     else{
  var gameName = JsonResult.stream.game;
  var logoUrl = JsonResult.stream.channel.logo;
  //console.log(JsonResult.stream.channel.logo);
  
  onlineResult.innerHTML += "<li class= resultList>" + "<img src = "+ logoUrl + ">" + " "+"<a target = '_blank' class = resultUrl href =" + "'"+url+"'"+">"+ users[b] + "</a>"+" is playing "+ gameName +"</li>";
  
 // console.log(gameName + users[i]);
  
    }

    function offlineUserRequest(user){
      var newRequest = new XMLHttpRequest();
      newRequest.open("GET","https://wind-bow.glitch.me/twitch-api/users/"+users[user]);
      newRequest.onload = function(){

      var newResult = JSON.parse(newRequest.responseText);
      var offlineUserlogoUrl = newResult.logo;
      //console.log(newResult);
      //console.log(offlineUserlogoUrl);


    offlineResult.innerHTML += "<li class= resultList>" +"<img src = "+ offlineUserlogoUrl + ">" + " "+ "<a target = '_blank' class = resultUrl href =" + "'"+url+"'"+">"+ users[b] +"</a>"+ " is offline " +"</li>";
      };
      newRequest.send();
  
 }



 }



}