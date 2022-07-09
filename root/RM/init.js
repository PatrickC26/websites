
let authPage = "https://patrickc26.github.io/websites/root/RFID_auth/RFID_auth.html?code=";

let access = "aQ2Zh96618D"; // should only edit HERE



console.log(auth);

window.history.replaceState("","",location.href.substring(0, location.href.indexOf("?") ).toString());

if (auth == null || auth == ""){
//    window.location.href = authPage + access;
}

else if (auth == firebaseGET("Access/" + access + "/ac")){
    var nowM = (new Date).getMinutes();
    if ( nowM < 2)
        nowM += 60;
    nowM -= 2;
    
    console.log(nowM);
    firebasePUT("Access/" + access + "/ac", "");
    
    console.log(parseInt(auth.substring(auth.lastIndexOf("T")+1, auth.length)));
    
    if (nowM < parseInt(auth.substring(auth.lastIndexOf("T")+1, auth.length))){
        console.log("Auth SUCCESS");
    }
    else {
        window.alert("Time out\nPlease Login again");
        window.location.href = authPage + access;
    }
}

else{
    window.location.href = "";//authPage + access;
}
