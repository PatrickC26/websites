
let authPage = "https://patrickc26.github.io/websites/root/RFID_auth/RFID_auth.html?code=";

let access = "aQ2Zh96618D"; // should only edit HERE


let auth = new URLSearchParams(window.location.search).get("auth");
console.log(auth);



if (auth == httpGET("https://rfid-auth-sloth-default-rtdb.firebaseio.com/Access/" + access + "/ac.json?auth=M3GknnMe2xY1LWQ01OCSXHZsLSFdq4f7phEyXKOP")){
    window.history.replaceState("","",location.href.substring(0, location.href.indexOf("?") ).toString());
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
    window.location.href = authPage + access;
}
