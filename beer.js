
// var for button
var searchBtn = document.querySelector(".search-input")
var button = document.querySelector(".button")


searchBtn.addEventListener("keypress", submit)
function submit(e){ 
    if (e.keyCode == 13) {
    console.log(searchBtn.value)
    // beerResults{searchBtn.value}
    }
}



button.addEventListener("click", search)
function search(){
    
}
