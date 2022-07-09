//// init
let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
if (width > 900){
    document.getElementById("tableOfBasic").style.width = width*0.7 + "px";
    document.getElementById("tableOfFood").style.width = width*0.7 + "px";
    document.getElementById("tableOfChat").style.width = width*0.7 + "px";
    document.getElementById("tableOfIdea").style.width = width*0.7 + "px";
    document.getElementById("tableOfNote").style.width = width*0.7 + "px";
    document.getElementById("tableOfAppointmentDate").style.width = width*0.7 + "px";
    document.getElementById("tableOfSpecialDate").style.width = width*0.7 + "px";
    document.getElementById("quickNote").style.width = width*0.7 + "px";

}
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



document.getElementById("AppointmentDateButton").addEventListener("click", AppointmentDateFunc);
document.getElementById("SpecialDateButton").addEventListener("click", SpecialDateFunc);
document.getElementById("saveQuickNote").addEventListener("click", saveQuickNoteFunc);


function AppointmentDateFunc(){
    
    let AppointmentDateS = firebaseGET("names/" + allNames.split(",")[document.getElementById("nameSelector").selectedIndex -1] + "/appointment" );
    
    if (document.getElementById("AppointmentDateButton").innerText == "EXPAND"){
        document.getElementById("AppointmentDateButton").innerHTML = "CLOSE" ;
        
        var AppointmentDateArray;
        if (AppointmentDateS == ""){
            document.getElementById("AppointmentDate").innerHTML = "- empty -" ;
            return;
        }
        
        AppointmentDateArray = AppointmentDateS.substring(0, AppointmentDateS.length -1).split(";");
        
        var outS = "";//= new String[AppointmentDateArray.length][];
        for (let i = 0 ; i < AppointmentDateArray.length ; i++){
            if (AppointmentDateArray[i] != "")
                outS = outS + AppointmentDateArray[i].split("`")[0] + "@" + AppointmentDateArray[i].split("`")[1] + "<br>\t" + AppointmentDateArray[i].split("`")[2] + "<br>\t" + AppointmentDateArray[i].split("`")[3] + "<br>";
        }
        document.getElementById("AppointmentDate").innerHTML = outS ;
    }
    else{
        document.getElementById("AppointmentDate").innerHTML = "- collapsed -" ;
        document.getElementById("AppointmentDateButton").innerHTML = "EXPAND" ;
    }
}

function SpecialDateFunc(){
    
    let SpecialDateS = firebaseGET("names/" + allNames.split(",")[document.getElementById("nameSelector").selectedIndex -1] + "specialDate" );
    
    if (document.getElementById("SpecialDateButton").innerText == "EXPAND"){
        document.getElementById("SpecialDateButton").innerHTML = "CLOSE" ;
        
        var SpecialDateArray;
        if (SpecialDateS == ""){
            document.getElementById("SpecialDate").innerHTML = "- empty -" ;
            return;
        }
        
        SpecialDateArray = SpecialDateS.substring(0, SpecialDateS.length -1).split(";");
        
        var outS = "";//= new String[SpecialDateArray.length][];
        for (let i = 0 ; i < SpecialDateArray.length ; i++){
            if (SpecialDateArray[i] != "")
                outS = outS + SpecialDateArray[i].split("`")[0] + "@" + SpecialDateArray[i].split("`")[1] + "<br>\t" + SpecialDateArray[i].split("`")[2] + "<br>\t" + SpecialDateArray[i].split("`")[3] + "<br>";
        }
        document.getElementById("SpecialDate").innerHTML = outS ;
    }
    else{
        document.getElementById("SpecialDate").innerHTML = "- collapsed -" ;
        document.getElementById("SpecialDateButton").innerHTML = "EXPAND" ;
    }
}

function saveQuickNoteFunc(){
    let index = document.getElementById("nameSelector").selectedIndex -1;
    let numfs =firebaseGET("names/" + allNames.split(",")[index] + "/notes/num");
    let num = parseInt(numfs);
    num++;
    let numS = num.toString();
    
    
    firebasePUT("names/" + allNames.split(",")[index] + "/notes/num", numS);
    firebasePUT("names/" + allNames.split(",")[index] + "/notes/" + numS , document.getElementById("quickNote").value);
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
    document.getElementById("AppointmentDate").innerHTML = "- collapsed -" ;
    document.getElementById("SpecialDate").innerHTML = "- collapsed -" ;
    
    document.getElementById("AppointmentDateButton").innerHTML = "EXPAND" ;
    document.getElementById("SpecialDateButton").innerHTML = "EXPAND" ;
    
    document.getElementById("quickNote").innerHTML = "";
}




function loaddata (sel){
    loaddata0();
    
    
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
    document.getElementById("foodLike").innerHTML = dehyperNote(foodLike);
    
    let foodhate = firebaseGET("names/" + allNames.split(",")[index] + "/food_hate" );
    document.getElementById("foodhate").innerHTML = dehyperNote(foodhate);
    
    let chatLike = firebaseGET("names/" + allNames.split(",")[index] + "/chat_like" );
    document.getElementById("chatLike").innerHTML = dehyperNote(chatLike);
    
    let chathate = firebaseGET("names/" + allNames.split(",")[index] + "/chat_hate" );
    document.getElementById("chathate").innerHTML = dehyperNote(chathate);
    
    let idea_gift = firebaseGET("names/" + allNames.split(",")[index] + "/idea_gift" );
    document.getElementById("IdeaGift").innerHTML = dehyperNote(idea_gift);
    
    let IdeaTrip = firebaseGET("names/" + allNames.split(",")[index] + "/idea_trip" );
    document.getElementById("IdeaTrip").innerHTML = dehyperNote(IdeaTrip);
    
    let note = firebaseGET("names/" + allNames.split(",")[index] + "/note" );
    if (note == "")
        document.getElementById("note").innerHTML =  "- empty -";
    else
        document.getElementById("note").innerHTML =  dehyperNote(note);
    
    
    
}
