window.onload = function () {
    
    var numLevel = 1;
    document.getElementsByClassName("square")[0].addEventListener(
        "click", function(){levelUp()})
    document.getElementById("totClick").innerHTML = parseInt(
        document.getElementById("totClick").innerHTML) + 1;

    function getCookie(cname) {
        // source: http://www.w3schools.com/js/js_cookies.asp
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // get cookie for total clicks
    if (getCookie("totClick") != "" && getCookie("totClick") != null) 
        {document.getElementById("totClick").innerHTML = getCookie("totClick")};

    function levelUp () {
        // set the cookie for total clicks 
        var totClick = parseInt(document.getElementById("totClick").innerHTML)
        document.cookie = "totClick" + "=" + totClick; 
        // console.log("leveling up")
        // change difficulty
        numLevel ++; 
        // re-ini the board
        screen = document.getElementById("screen");
        screen.innerHTML = "";
        var idx = 1;
        for (i=0; i<numLevel; i++) {
            // console.log(i,numLevel,"working on one row...")
            row = document.createElement("div")
            row.className = "row"
            for (a=0; a<numLevel; a++) {
                // console.log(i,numLevel,"working on one column...")
                sq = document.createElement("div")
                sq.className = "square"
                sq.style = "width: " + (594-numLevel*6)/numLevel + "px; height: "
                 + (594-numLevel*6)/numLevel + "px;";
                sq.id = idx;
                // console.log(idx)
                sq.addEventListener("click", function(){flipColors()});
                row.appendChild(sq);
                idx ++;
            }
            screen.appendChild(row)
        }
        // currentClick = 0; currentLevel += 1
         document.getElementById("curLevel").innerHTML = numLevel;
         document.getElementById("curClick").innerHTML = 0;
         // maxLevel = max(maxLevel, currentLevel) [todo if time permits: cache]
         // document.getElementById("maxLevel").innerHTML = 0;
    }

    function flipColors () {
        // console.log(event.target.id);
        // flip id and 4 at most adjacent squares;
        var id = parseInt(event.target.id);
        var up =  id-numLevel;
        var down = id+numLevel;
        var left = id-1;
        var right = id+1;
        var toFlip = [id, up, down].filter(
            function (num) {if (num >= 1 & num <= numLevel*numLevel) {return num}}
        )
        if (left%numLevel != 0) {toFlip.push(left)};
        if (right%numLevel != 1) {toFlip.push(right)};
        // console.log([id, up, down, right, left])
        
        // console.log("to flip:", toFlip)
        toFlip.map(
            function(id){
                // console.log(id)
                var flipped = (document.getElementById(id).className == "square")
                 ? "square square-active":"square";
                // console.log("id:",id,"ele-class:",document.getElementById(id)
                // .className,"flipped-class:",flipped)
                document.getElementById(id).className = flipped;
                // console.log("new-ele-class:",document.getElementById(id).className)
            }
        )
        // currentClick += 1; totalClick += 1
        document.getElementById("totClick").innerHTML = parseInt(
            document.getElementById("totClick").innerHTML) + 1;
        document.getElementById("curClick").innerHTML = parseInt(
            document.getElementById("curClick").innerHTML) + 1;
        // if checkPass -> levelUp; 
        if (checkPass()) {levelUp()};
    }

    function checkPass () {
        // console.log("checking pass")
        // check current playground
        // console.log(document.getElementsByClassName(
        // "square square-active").length, numLevel*numLevel)
        return (document.getElementsByClassName(
            "square square-active").length == numLevel*numLevel)
    }
}