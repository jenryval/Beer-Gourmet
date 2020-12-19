
// // var for button
// // var searchBtn = document.querySelector(".search-input")
// // var button = document.querySelector(".button")

// var foods = document.querySelectorAll(".food-pairing")
// var nArray = Array.from(foods)

// // console.log(foods)

// // foods.addEventListener("click", getFoods)
// $('.food-pairing').on("click", function(){
//     return getFoods()
// })
// console.log($('.food-pairing'))

// function getFoods(){
//     var $modal = $('#modal');
//     $.ajax('')
//     .done(function(resp){
//         $modal.html(resp).foundation('open');
//     });
// }
// // console.log(foods);

document.addEventListener("click", function(e){
    console.log(e.target.id)
})
