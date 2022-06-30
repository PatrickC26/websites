var data = "";
var conutName = 0;

var allNames = firebaseGET("names/ALL");
console.log(allNames.split(",")[0]);
var countAllName = allNames.split(",").length;

load(0);

function load(type){
    console.log("IN");
    conutName += type;
    
    if (conutName < 1)
        conutName = 1;
    else if (conutName > countAllName)
        conutName = countAllName;
    
    let realName = firebaseGET( "names/" + allNames.split(",")[conutName -1] + "/name");
    
    document.getElementById('name').innerHTML = ("Name : " + realName + "      " );
    document.getElementById('name_id').innerHTML = (conutName + "/" + countAllName);
}
