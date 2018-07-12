function saveTarget(){
	var targ = JSON.stringify(target)
	localStorage.setItem("target", targ);
}