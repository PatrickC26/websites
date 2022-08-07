check();
window.setInterval(check, 1300);

var renewTime = "";

function check(){
    var on_off = firebaseGET("on_off");
    if (on_off == "off"){
        document.getElementById('actual_status').innerHTML = '實際關機：已關機';
    }
    else if(on_off == "on"){
        document.getElementById('actual_status').innerHTML = '實際關機：開機';
    }
    else {
        document.getElementById('actual_status').innerHTML = '實際關機：ERROR';
    }
}

function shutDown(){
    firebasePUT("control","OFF");
}
