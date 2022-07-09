function dehyperNote(inS){
    return inS.replace("`n", "<br>").replace("`t", "\t").replace("`c", "\"").replace("`p","%").replace("`d", ",");
}

function hyperNote(inS) {
    return inS.replace("\n", "`n").replace("\t", "`t").replace("\"", "`c").replace("%","`p").replace(",", "`d");
}

function noteCheck(inS){
    return inS.replace("\\", "").replace("`", "").replace("'", "").replace("\"", "");
}
