var data = "";
var conutName = 0;

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


//// init
let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
document.getElementById("a").innerHTML = width;
if (width > 900)
    document.getElementById("tableOfBasic").style.width = "100%";
console.log(width);
// init end


function loaddata (sel){
    let index = sel.selectedIndex -1;
    console.log(index);
    
    let nextAppo = firebaseGET("names/" + allNames.split(",")[index] + "/nextAppo" );
    document.getElementById("nextAppo").innerHTML = "Next Apponiment : " + nextAppo;
    document.getElementById("nextAppo").style.border = "1px solid black";
    document.getElementById("nextAppo").style.borderRadius = "10px";
    
    let job = firebaseGET("names/" + allNames.split(",")[index] + "/job" );
    document.getElementById("job").innerHTML = "Job : " + job;
    
    let phone = firebaseGET("names/" + allNames.split(",")[index] + "/phone" );
    document.getElementById("phone").innerHTML = "Phone : " + nextAppo;
    
    let email = firebaseGET("names/" + allNames.split(",")[index] + "/email" );
    document.getElementById("email").innerHTML = "E-mail : " + email;
    
    let address = firebaseGET("names/" + allNames.split(",")[index] + "/address" );
    document.getElementById("address").innerHTML = "Address : " + address;
    
    
}
