
let authPage = "https://patrickc26.github.io/websites/root/RFID_auth/RFID_auth.html?code=";

let access = "aQ2Zh96618D";

let auth = new URLSearchParams(window.location.search).get("auth");

console.log(auth);

if (auth == null || auth == ""){
    window.alert("Please log in");
    window.location.href = authPage + access;
}
else if (auth == firebaseGET("Access/" + access + "/ac")){
    var nowM = (new Date).getMinutes();
    if ( nowM < 2)
        nowM += 60;
    nowM -= 2;
    console.log(nowM)
    if (nowM < parseInt(auth.substring(auth.indexOf("T")+1, auth.length))){
        console.log("SUCCESS");
        
        const nextState = { additionalInformation: 'Updated the URL with JS' };
        window.history.replaceState("","RM",location.href.substring(0, location.href.indexOf("?") ).toString());
        
        firebasePUT("Access/" + access + "/ac", "");
    }
}
else{
    window.alert("Please log in");
    window.location.href = authPage + access;
}
