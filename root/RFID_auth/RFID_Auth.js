let worker;

function load(){
//    firebaseGET("admin");
//    console.log(readAuth("internet"));
//    putTime();

    
    worker = new Worker("auth.js")
    // pass data to worker thread
    worker.postMessage(name)
    // listen to any data passed from worker thread
    worker.addEventListener("message", event => {
        
    })
}

let SUCCESS = 0, NO_ACCESS = 2,FAIL = 1, LOCKED = 3,TIMEOUT = 4;

let isLogin = false;

