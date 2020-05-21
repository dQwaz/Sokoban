function Timer() {
    if (BoardCompleted)
        return;
    var Now = new Date();
    var s = Math.floor((Now.getTime() / 1000) - StartTime);
    ElapsedTime = s;
    var h = Math.floor(s / 3600);
    s -= h * 3600;
    if (h < 10)
        h = "0" + h;
    var m = Math.floor(s / 60);
    s -= m * 60;
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;
    $("Time").innerHTML = ((h == "00") ? "" : h + ":") + m + ":" + s;
    }


    