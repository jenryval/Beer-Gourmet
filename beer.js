
// var for button
var searchBtn = document.querySelector(".search-input")

searchBtn.addEventListener("keypress" , submit)

function submit(e){ 
    if (e.keyCode == 13) {
    console.log(searchBtn.value)
    // beerResults{searchBtn.value}
    }
}



// searchBox.addEventListener("click", search)
// function search(event){
//     return (event.innertext.value)
// }
