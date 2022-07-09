function dehyperNote(inS){
    return inS.replaceAll("`n", "<br>").replaceAll("`t", "\t").replaceAll("`c", "\"").replaceAll("`p","%").replaceAll("`d", ",");
}

function hyperNote(inS) {
    return inS.replaceAll("\n", "`n").replaceAll("\t", "`t").replaceAll("\"", "`c").replaceAll("%","`p").replaceAll(",", "`d");
}

function noteCheck(inS){
    return inS.replaceAll("\\", "").replaceAll("`", "").replaceAll("'", "").replaceAll("\"", "");
}
