let worker;

var readingAuth = false;
var readCount = 0;
var access = "";

let SUCCESS = 0, NO_ACCESS = 2,FAIL = 1, LOCKED = 3,TIMEOUT = 4;


access = new URLSearchParams(window.location.search).get("code")

let name = firebaseGET("Access/" + access + "/name");

console.log(name);

if (name == ""){
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
//    console.log(readCount);
    console.log(readingAuth);
    
    
    if (readingAuth){
        readCount++;
        
        if (readCount > 1000){
            firebasePUT("request/requestScan", "0", false);
            
            if (confirm("login fail (time out : 1000) \nlogin again?"))
                rfidAuth_load();
            else{
                document.getElementById('rfidAuth_button').disabled = false;
                readingAuth = false;
            }
                
            return TIMEOUT; // time out
        }

        
        if (firebaseGET("request/requestScan") == "0") {
            let scanUID = firebaseGET("request/scanUID");
            console.log(scanUID);
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

            console.log(firebaseGET("Access/" + access + "/inuse"));
            console.log("Access/" + access + "/inuse");
            
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
                if (confirm("login fail (err code : badTime) \nlogin again?"))
                    rfidAuth_load();
                else
                    document.getElementById('rfidAuth_button').disabled = false;
                return badTime;
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
        firebasePUT("request/requestScan", "1", false);
        firebasePUT("request/isNew", "0", false);
        firebasePUT("request/scanUID", "", false);

        for (let j = 0 ; j < 50000 ; j++);
        
        readingAuth = true;
        
        readCount = 0;
        
        return SUCCESS;
    }
    catch ( e) {
        console.log("ERROR");
        console.log(e);
        firebasePUT("request/requestScan", "0", false);
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
    if (access == "internet")
        window.alert("LOGIN SUCCESS");
    else{
        let redirectURL = firebaseGET("Access/" + access + "/url");
        window.location.href = redirectURL;
    }
}


function login(){
    let pswd = firebaseGET("Access/" + access + "/pswd");
    console.log(pswd);
    if (document.querySelector('.editor').value == pswd)
        successF();
    else
        window.alert("password incorrect");
}
