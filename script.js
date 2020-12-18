// JavaScript function that wraps everything and runs when DOM is ready
// Notes:


$(document).ready(function () {
    //
    // saved api key 

    var apikey = "";
    //
    // Examples

    var punkbeer_api = "https://api.punkapi.com/v2/beers?"
    var punkbeer_api_beforedate = "https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6";
    var punkbeer_api_name = "https://api.punkapi.com/v2/beers?beer_name=punk";
    var punkbeer_api_food = "https://api.punkapi.com/v2/beers?food=chicken";
    var punkbeer_api_attribute = "https://api.punkapi.com/v2/beers?hops=bitter";

    var openbrew_api = "https://api.openbrewerydb.org/breweries";
    var openbrew_api_name = "https://api.openbrewerydb.org/breweries?by_name=Buzz";

    var brewerydb_key = "fc9c93c3da50a4389512134d4f5b506f"
    var brewerydb_api = "http://sandbox-api.brewerydb.com/v2/beers/?key=" + brewerydb_key;

    var brewerydb_api = "https://sandbox-api.brewerydb.com/v2/random/?key=5417f05a8a5701a1a63af9a7ff8aec8f";

    var spoonacular_key = "873062e3e17f4030a94a2f81ccdb4281";
    //var spoonacular_api = "https://api.spoonacular.com/food/menuItems/search?apiKey=873062e3e17f4030a94a2f81ccdb4281&query=chicken%20wings"
    var spoonacular_api = "https://api.spoonacular.com/food/menuItems/search?apiKey=873062e3e17f4030a94a2f81ccdb4281"




    function get_punkbeer(by_name, attribute_type, malt_type) {

        // determine the search query if any
        var query_string = punkbeer_api;
        if (by_name)
            query_string = query_string + "&beer_name=" + by_name;
        if (attribute_type)
            query_string = query_string + "&hops=" + attribute_type;
        if (malt_type)
            query_string = query_string + "&malt=" + malt_type;


        console.log(query_string);

        $.ajax({
            url: query_string,
            method: "GET"
        }).then(function (beerdata) {

            console.log("Punk data:");
            console.log(beerdata);

            for (var i = 0; i < beerdata.length; i++) {
                console.log(beerdata[i].name);
                console.log(beerdata[i].image_url);
                console.log("Hops");
                console.log(beerdata[i].ingredients.hops);
                console.log("Malt");
                console.log(beerdata[i].ingredients.malt);
                console.log("Food Pairing");
                console.log(beerdata[i].food_pairing);


                $('.list-beers').prepend("<li>" + beerdata[i].name + "</li>").on("click", "li", function () {
                    // var city = $(this).text();
                    //get_beerdata;
                });
            }
        })
    }


    function get_spoonacular(menu_item) {

        var query_string = spoonacular_api;
        query_string = query_string + "&query=" + menu_item;
        console.log(query_string);

        $.ajax({
            url: query_string,
            method: "GET"
        }).then(function (fooddata) {

            console.log(fooddata);

            for (var i = 0; i < fooddata.menuItems.length; i++) {
                console.log(fooddata.menuItems[i].restaurantChain);
            }

        })
    }


    get_punkbeer("Dog", "", "Dark");

    get_spoonacular("cherry");


    //
    // Not being used - keeping for reference

    function get_openbrew() {

        $.ajax({
            url: openbrew_api_name,
            method: "GET"
        }).then(function (beerdata) {

            console.log("Brewery location:");
            console.log(beerdata);

            //    for (var i=0; i<10; i++) {
            //        console.log(beerdata[i].brewery_type)
            //    }

        })
    }

    function get_brewerydb() {

        $.ajax({
            url: brewerydb_api,
            method: "GET"
        }).then(function (beerdata) {

            console.log(beerdata);

            //    for (var i=0; i<10; i++) {
            //        console.log(beerdata[i].brewery_type)
            //    }

        })
    }
})

