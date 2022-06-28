

var readingAuth = false;
var readCount = 0;
var access = "";
var redirectI = 0;
var finalRedirect = "";


let SUCCESS = 0, NO_ACCESS = 2,FAIL = 1, LOCKED = 3,TIMEOUT = 4;


access = new URLSearchParams(window.location.search).get("code");

let name = firebaseGET("Access/" + access + "/name");

console.log(name);

if (access == "" || name == ""){
    access = "internet";
    name = firebaseGET("Access/" + access + "/name");
    console.log(name);
}

if (name != ""){
    document.getElementById('name').innerHTML = 'Access : ' + name;

    rfidAuth_load();
    window.setInterval(checkAuth, 500);
}


function rfidAuth_load(){
    console.log(startAuth());
}


function checkAuth() {
    console.log(readingAuth);
    
    if (redirectI != 0){
    redirectI++;
    console.log(redirectI);
    if (redirectI >= 3)
        window.location.href = finalRedirect;
    }
    
    if (readingAuth){
        readCount++;
        
        if (readCount > 100){
            firebasePUT("request/requestScan", "0");
            
            if (confirm("login fail (time out : 100) \nlogin again?"))
                rfidAuth_load();
            else{
                document.getElementById('rfidAuth_button').disabled = false;
                readingAuth = false;
            }
                
            return TIMEOUT; // time out
        }

        
        if (firebaseGET("request/requestScan") == "0") {
            let scanUID = firebaseGET("request/scanUID");
            if (scanUID == "")
                startAuth();
            
            readingAuth = false;

            if (!firebaseGET("account/" + scanUID + "/access").includes(access)){
                if (confirm("login fail (err code : NO_ACCESS) \nlogin again?"))
                    rfidAuth_load();
                else
                    document.getElementById('rfidAuth_button').disabled = false;
                return NO_ACCESS; // no access
            }
            
            if (firebaseGET("Access/" + access + "/inuse") != ("1")){
                if (confirm("login fail (err code : NO_ACCESS) \nlogin again?"))
                    rfidAuth_load();
                else
                    document.getElementById('rfidAuth_button').disabled = false;
                return NO_ACCESS; // no access
            }
            
            // Now time
            var availableT = new Date().setMinutes(new Date().getMinutes() - 1);


            let badrequest = firebaseGET("account/" + scanUID + "/badTime");
            if (avaliableTimeCompare(badrequest, 2) == SUCCESS){
                if (confirm("login fail (err code : LOCK) \nlogin again?"))
                    rfidAuth_load();
                else
                    document.getElementById('rfidAuth_button').disabled = false;
                return LOCK;
            }

            let goodrequest = firebaseGET("account/" + scanUID + "/time");
            let requestCode = avaliableTimeCompare(goodrequest, 2);
            if (requestCode == SUCCESS){
//                window.alert("SUCCESS");
                successF();
                return SUCCESS;
            }
            else if (requestCode == TIMEOUT){
                if (confirm("login fail (time out : 000) \nlogin again?"))
                    rfidAuth_load();
                else
                    document.getElementById('rfidAuth_button').disabled = false;
                return TIMEOUT;
            }
                
            
            
            if (confirm("login fail (err code : 6) \nlogin again?"))
                rfidAuth_load();
            else
                document.getElementById('rfidAuth_button').disabled = false;
            return FAIL; // fail to read
        }
    }
}


function startAuth() {
    document.getElementById('rfidAuth_button').disabled = true;
    
    try {
        firebasePUT("request/requestScan", "1");
        firebasePUT("request/isNew", "0");
        firebasePUT("request/scanUID", "");

        for (let j = 0 ; j < 50000 ; j++);
        
        readingAuth = true;
        
        readCount = 0;
        
        return SUCCESS;
    }
    catch ( e) {
        console.log("ERROR");
        console.log(e);
        firebasePUT("request/requestScan", "0");
        return FAIL; // fail to read
    }

}


function avaliableTimeCompare(time , availableGap){
    try{
        if (time == "")
            return NO_ACCESS;
        
        let dateT = time.substring(0, time.indexOf(" ")).split("-");
        let timeT = time.substring(time.indexOf(" ") +1 , time.length).split(":");
        
        
        var nowT = new Date();
        if ( parseInt(dateT[0]) == nowT.getFullYear()
              && parseInt(dateT[1]) == (nowT.getMonth()+1)
              && parseInt(dateT[2]) == nowT.getDate()  ){
            if (parseInt(timeT[0]) == nowT.getHours()){
                let nowTotal = nowT.getMinutes()*60 + nowT.getSeconds() - availableGap*60;
                let dateTotal = parseInt(timeT[1])*60 + parseInt(timeT[2]) ;
                if (nowTotal < dateTotal)
                    return SUCCESS;
            }
            else if (parseInt(timeT[0]) == nowT.getHours()-1){
                let nowTotal = 3600 + nowT.getMinutes()*60 + nowT.getSeconds() - availableGap*60;
                let dateTotal = parseInt(timeT[1])*60 + parseInt(timeT[2]) ;
                if (nowTotal < dateTotal)
                    return SUCCESS;
            }
            return TIMEOUT;
        }
        else
            return TIMEOUT;
        
    }
    catch (e){console.log(e);}
    return FAIL;
}


function successF(){
    let redirectURL = firebaseGET("Access/" + access + "/url");
    if (redirectURL == "-"){
        window.alert("LOGIN SUCCESS");
    }
    else{
        
        var authToken = "";
        var alphabet = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789123456789";
        
        for (let j = 0 ; j <  Math.abs(Math.random()*7) +20 ; j ++) {
            var int_random = Math.abs(Math.random()* 64);
            console.log(int_random);
            authToken += alphabet.charAt(int_random);
        }
        
        var nowT1 = new Date();
        
        authToken = authToken + "T" + (nowT1.getMinutes()).toString();
        
        firebasePUT("Access/" + access + "/ac", authToken);
        
        
        finalRedirect = redirectURL + "?auth=" + authToken;

        redirectI = 1;

    }
}



function login(){
    let pswd = firebaseGET("Access/" + access + "/pswd");
    if (document.querySelector('.editor').value == pswd){
        firebasePUT("request/requestScan", "0");
        successF();
    }
    else
        window.alert("password incorrect");
}
