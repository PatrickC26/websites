
addEventListener("message", event => {

    
    console.log(readAuth("internet"));
})

function readAuth( access) {
    try {
        firebasePUT("request/requestScan", "1", false);
        firebasePUT("request/isNew", "0", false);
        firebasePUT("request/scanUID", "", false);

        for (let j = 0 ; j < 100000 ; j++);
        
        for(let i = 0 ; i < 1000 ; i++) {
            console.log(i);
            
            for (let j = 0 ; j < 1000 ; j++);

//            if (isLogin) {
//                firebasePUT("request/requestScan", "0", false);
//                return FAIL;
//            }

            
            if (firebaseGET("request/requestScan") == "0") {
                let scanUID = firebaseGET("request/scanUID");
                console.log(scanUID);

                if (!firebaseGET("account/" + scanUID + "/access").includes(access))
                    return NO_ACCESS; // no access

                if (!firebaseGET("Access/" + access + "/inuse") == ("1"))
                    return NO_ACCESS; // no access

                // Now time
                var availableT = new Date().setMinutes(new Date().getMinutes() - 1);


                let badrequest = firebaseGET("account/" + scanUID + "/badTime");
                if (!badrequest == "") {
                    if ( !new Date(badrequest).after(availableT) )
                        return LOCKED; // locked
                }

                let goodrequest = firebaseGET("account/" + scanUID + "/time");
                if (!goodrequest == "") {
                    if ( !new Date(goodrequest).after(availableT) )
                        return SUCCESS; // get Request
                    else
                        return TIMEOUT;
                }

                return FAIL; // fail to read
            }
            
        }
        window.alert("Reading Card out of time");

        firebasePUT("request/requestScan", "0", false);
        return TIMEOUT; // time out
    }
    catch ( e) {
        console.log("ERROR");
        console.log(e);
        firebasePUT("request/requestScan", "0", false);
        return FAIL; // fail to read
    }

}
