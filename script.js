// JavaScript function that wraps everything and runs when DOM is ready
// Notes:

$(document).foundation();
$(document).ready(function () {
    var beer_type;
    var beer_type_num;
    //1 = bitter
    //2 = aroma
    //3 = wheaty
    //4 = chocolate
    //5 = smokey
    //6 = brown or bear
    
    
    //
    // saved api key 

    var apikey = "";
    //
    // Examples

    var test_punkbeer_api = "https://api.punkapi.com/v2/beers"
    var punkbeer_api = "https://api.punkapi.com/v2/beers?"
    var punkbeer_random = "https://api.punkapi.com/v2/beers/random"
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


    $("#beer0").hide();
    $("#beer1").hide();
    $("#beer2").hide();
    $("#beer3").hide();

    function get_punkbeer(hops_type, malt_type) {

        var fid;
        var fnum;
        var random_img_num;
        var max_food_paring;
        var max_beer_page;

        // determine the search query if any
        var query_string = punkbeer_api;

        // if (by_name)
        //     query_string = query_string + "&beer_name=" + by_name;
        console.log("hops = " + hops_type);
        console.log("malt = " + malt_type);
        if (hops_type)
            if (hops_type === "random")
                query_string = punkbeer_random;
            else
                query_string = query_string + "hops=" + hops_type;
        if (malt_type)
            query_string = query_string + "malt=" + malt_type;


        console.log(query_string);

        $.ajax({
            url: query_string,
            //url: test_punkbeer_api,
            method: "GET",
        }).then(function (beerdata) {
            //suceess: function (beerdata) {

            $("#beer0").hide();
            $("#beer1").hide();
            $("#beer2").hide();
            $("#beer3").hide();

            console.log("Punk data:");
            console.log(beerdata);

            // display 4 beers on a page
            //
            max_beer_page = 4;
            if (beerdata.length < 4){
                max_beer_page = beerdata.length;
            }

            for (var i = 0; i < max_beer_page; i++) {

                console.log("Beer #" + i + "name=" + beerdata[i].name);
                console.log(beerdata[i].image_url);
                console.log("Hops");
                console.log(beerdata[i].ingredients.hops);
                console.log("Malt");
                console.log(beerdata[i].ingredients.malt);
                console.log("Food Pairing");
                console.log(beerdata[i].food_pairing);
                //console.log(beerdata[i].food_pairing[0]);

                console.log("beer num " + beer_type_num);

                // randomize the image selection (api images are disappointing)
                //
                min = beer_type_num * 10 + 1;
                max = min + 2;

                random_img_num = Math.floor(Math.random() * (max - min + 1) ) + min

                console.log("random num image " + random_img_num);

                $("#beer" + i).show();
                $("#beer-name" + i).html(beerdata[i].name + " (" + beer_type + ")" );
                $("#beer-desc" + i).text(beerdata[i].description);
                $("#beer-img" + i).attr("src","./images/" + random_img_num + "beer.jpg");

                // limit food paring to 3
                //
                max_food_paring = beerdata[i].food_pairing.length;
                if (beerdata[i].food_pairing.length > 3) {
                    max_food_paring  = 3    
                }

                $("#food-pairing" + i).empty();
                for (var ii = 0; ii < max_food_paring; ii++) {

                    fnum = i*10+ii;
                    fid = "fid" + fnum;

                    $("#food-pairing" + i).append("<li id=" + fid + "><a href='#'>" + beerdata[i].food_pairing[ii] + "</a></li>").on("click", "li", function (e) {                        
                        e.preventDefault();
                        
                        var food_item = $(this).text();
                        get_spoonacular(food_item)                        
                    });
                }
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

    // hops list
    //
    $('.beer-list').on("click", "li", function () {
        console.log("Im here beer list!!!");
        beer_type = $(this).text();

        console.log(beer_type);
        if (beer_type.includes("ittter")) {
            beer_type_num = 1;
            get_punkbeer("bitter", "");
        }
        else if (beer_type.includes("Aroma")) {
            beer_type_num = 2;
            get_punkbeer("aroma", "");           
        }
        else if (beer_type.includes("Randomize")) {
            beer_type_num = 0;
            get_punkbeer("random", "");
        }
    });

    // malt list
    //
    $('.malt-list').on("click", "li", function () {
        console.log("Im here malt!!!");
        beer_type = $(this).text();
        console.log(beer_type);

        if (beer_type.includes("Wheaty")) {
            beer_type_num = 3;                
            get_punkbeer("", "Wheat");
        }
        else if (beer_type.includes("Chocolate")) {
            beer_type_num = 4;
            get_punkbeer("", "chocolate");
        }
        else if (beer_type.includes("Mountains")) {
            beer_type_num = 5;
            get_punkbeer("", "smokey");
        }
        else if (beer_type.includes("Brown")) {
            beer_type_num = 6;
            get_punkbeer("", "brown");
        }
    });


    // testing

    //get_punkbeer("Dog", "", "Dark");
    //get_punkbeer("", "", "");

    //get_spoonacular("ramen");


    // ---------------------------------------
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

