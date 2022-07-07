//// init
let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
document.getElementById("a").innerHTML = width;
if (width > 900)
    document.getElementById("tableOfBasic").style.width = width*0.7 + "px";
console.log(width);
// init end



var data = "";
var conutName = 0;

loaddata0();

var allNames = firebaseGET("names/ALL");
console.log(allNames.split(",")[0]);
var countAllName = allNames.split(",").length;


let nowTotal = 20;
for (var i = 0 ; i < nowTotal +1 ; i++)
    document.getElementById("op" + i.toString()).disabled = true;
    

for (var i = 0 ; i < countAllName ; i++){
    let realName = firebaseGET( "names/" + allNames.split(",")[i] + "/name");
    document.getElementById("op" + i.toString()).disabled = false;
    document.getElementById("op" + i.toString()).innerHTML = realName;
}

function loaddata0 (){
    document.getElementById("nextAppo").innerHTML = "Next Apponiment : " ;
    document.getElementById("job").innerHTML = "Job : " ;
    document.getElementById("phone").innerHTML = "Phone : " ;
    document.getElementById("email").innerHTML = "E-mail : " ;
    document.getElementById("address").innerHTML = "Address : " ;
    document.getElementById("foodLike").innerHTML = "" ;
    document.getElementById("foodhate").innerHTML = "" ;
    document.getElementById("chatLike").innerHTML = "" ;
    document.getElementById("chathate").innerHTML = "" ;
    document.getElementById("IdeaGift").innerHTML = "" ;
    document.getElementById("IdeaTrip").innerHTML = "" ;
    document.getElementById("note").innerHTML = "- empty -" ;
}
function loaddata (sel){
    let index = sel.selectedIndex -1;
    console.log(index);
    
    if (index < 0){
        loaddata0();
        return;
    }
    
    let nextAppo = firebaseGET("names/" + allNames.split(",")[index] + "/nextAppo" );
    document.getElementById("nextAppo").innerHTML = "Next Apponiment : " + nextAppo;
    
    let job = firebaseGET("names/" + allNames.split(",")[index] + "/job" );
    document.getElementById("job").innerHTML = "Job : " + job;
    
    let phone = firebaseGET("names/" + allNames.split(",")[index] + "/phone" );
    document.getElementById("phone").innerHTML = "Phone : " + nextAppo;
    
    let email = firebaseGET("names/" + allNames.split(",")[index] + "/email" );
    document.getElementById("email").innerHTML = "E-mail : " + email;
    
    let address = firebaseGET("names/" + allNames.split(",")[index] + "/address" );
    document.getElementById("address").innerHTML = "Address : " + address;
    
    let foodLike = firebaseGET("names/" + allNames.split(",")[index] + "/food_like" );
    document.getElementById("foodLike").innerHTML = foodLike;
    
    let foodhate = firebaseGET("names/" + allNames.split(",")[index] + "/food_hate" );
    document.getElementById("foodhate").innerHTML = foodhate;
    
    let chatLike = firebaseGET("names/" + allNames.split(",")[index] + "/chat_like" );
    document.getElementById("chatLike").innerHTML = chatLike;
    
    let chathate = firebaseGET("names/" + allNames.split(",")[index] + "/chat_hate" );
    document.getElementById("chathate").innerHTML = chathate;
    
    let idea_gift = firebaseGET("names/" + allNames.split(",")[index] + "/idea_gift" );
    document.getElementById("IdeaGift").innerHTML = idea_gift
    
    let IdeaTrip = firebaseGET("names/" + allNames.split(",")[index] + "/idea_trip" );
    document.getElementById("IdeaTrip").innerHTML = IdeaTrip;
    
    let note = firebaseGET("names/" + allNames.split(",")[index] + "/note" );
    if (note == "")
        document.getElementById("note").innerHTML =  "- empty -";
    else
        document.getElementById("note").innerHTML =  dehyperNote(note);
}
