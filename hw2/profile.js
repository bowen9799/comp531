window.onload = function () {

	// i need to store id and regex in arrays for easy access
	var ids = ["name", "email", "phone", "zipcode"];

	var req = {"name": /^[a-zA-Z]+[a-zA-Z0-9]*/, 
	"email": /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 
	"phone": /\d\d\d\d\d\d\d\d\d\d/, "zipcode": /\d\d\d\d\d/};

	document.getElementById("update").onclick = function () {

		// the alert area clears for every update the user makes 
		document.getElementById("alert").innerHTML = "";

		// the passwords need to be dealt seperately due to confirmation requirements;
		var pw = document.getElementsByName("password");
		var pc = document.getElementsByName("pc");
		if (pw[0].value != "" & pw[0].value == pc[0].value & pw[0].value != pw[1].innerHTML) {
			document.getElementById("alert").innerHTML += "You have updated your password.<br>";
		}
		if (pw[0].value != pc[0].value) {
			document.getElementById("alert").innerHTML += "Please confirm your password.<br>";
		}
		pw[0].value = "";
		pc[0].value = ""; 

		// for the rest of the entries I check them one by one using regex
		ids.map(function(id){
			var new_v = document.getElementsByName(id)[0];
			var old_v = document.getElementsByName(id)[1];
			if (new_v.value != "" & req[id].test(new_v.value) == false){
				document.getElementById("alert").innerHTML += "Please correct your " + id + ".<br>";
				return
			}
			console.log(old_v.innerHTML, new_v.value);
			var old = old_v.innerHTML;
			if (new_v.value != "" & new_v.value != old){
				old_v.innerHTML = new_v.value;
				document.getElementById("alert").innerHTML += 
				"You have updated your " + id + " from " + old + " to " + new_v.value + ".<br>";
			new_v.value = "";
			}	
		})
	}
}