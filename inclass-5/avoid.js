window.onload=function(){
	var butt = document.getElementById("click");

	butt.addEventListener("click", button_clicked);

	butt.addEventListener("mouseover", func1);

	function func1(){
		butt.style.position = "absolute";
		butt.style.left = (Math.random()*200)+"px";
		butt.style.top = (Math.random()*200)+"px";
	}

	function button_clicked(){
		if(document.getElementById("click").innerHTML == "Play Again"){
			butt.innerHTML = "Click Me";
			document.getElementById('cong').style.visibility = "hidden";
			butt.addEventListener("mouseover", func1);
		}

		else {
			document.getElementById('cong').style.visibility = "visible";
			butt.innerHTML = "Play Again";
			butt.removeEventListener("mouseover", func1);
		}
	}
}
