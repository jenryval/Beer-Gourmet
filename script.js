// JavaScript function that wraps everything and runs when DOM is ready
// Notes:

$(document).foundation();
$(document).ready(function () {

    var beer_type;
    //
    // beer types are assigned a number for images

    var beer_type_num;

    //1 = bitter
    //2 = aroma
    //3 = wheaty
    //4 = chocolate
    //5 = smokey
    //6 = brown or bear


    var punkbeer_api = "https://api.punkapi.com/v2/beers?"
    var punkbeer_random = "https://api.punkapi.com/v2/beers/random"

    // have a couple api keys in case we hit our limit of 150 calls
    //
    // var spoonacular_key = "873062e3e17f4030a94a2f81ccdb4281";
    //var spoonacular_api = "https://api.spoonacular.com/food/menuItems/search?apiKey=873062e3e17f4030a94a2f81ccdb4281&query=chicken%20wings"

    var spoonacular_api = "https://api.spoonacular.com/food/menuItems/search?apiKey=873062e3e17f4030a94a2f81ccdb4281";
    //apiKey=0eebf06b3ea84f23a5db250879af45af"
    //apiKey=873062e3e17f4030a94a2f81ccdb4281"

    var newli;

    //
    //define the li event as a variable
    
    var liHandle = function(e){
        e.preventDefault();
                        
        var food_item = $(this).text();
        get_spoonacular(food_item, $(e.target).parent().parent().attr("id"));
    }

    // iniitalize by hiding beers on page
    //
    $("#beer0").hide();
    $("#beer1").hide();
    $("#beer2").hide();
    $("#beer3").hide();

    //
    // api call punkapi

    function get_punkbeer(hops_type, malt_type) {

        var fid;
        var fnum;
        var random_img_num;
        var max_food_paring;
        var max_beer_page;

        //
        // determine the search query if any initialzie with base url

        var query_string = punkbeer_api;

        if (hops_type)
            if (hops_type === "random")
                query_string = punkbeer_random;
            else
                query_string = query_string + "hops=" + hops_type;
        if (malt_type)
            query_string = query_string + "malt=" + malt_type;

        $.ajax({
            url: query_string,
            method: "GET",
        }).then(function (beerdata) {

            // clear previous beers listed
            //
            $("#beer0").hide();
            $("#beer1").hide();
            $("#beer2").hide();
            $("#beer3").hide();

            // display 4 beers on a page max
            //
            max_beer_page = 4;
            if (beerdata.length < 4){
                max_beer_page = beerdata.length;
            }

            for (var i = 0; i < max_beer_page; i++) {
            
                // randomize the image selection (api images are disappointing)
                //
                min = beer_type_num * 10 + 1;
                max = min + 2;

                random_img_num = Math.floor(Math.random() * (max - min + 1) ) + min;

                $("#beer" + i).show();
                $("#beer-name" + i).html(beerdata[i].name + " (" + beer_type + ")" );
                $("#beer-desc" + i).text(beerdata[i].description);
                $("#beer-img" + i).attr("src","./images/" + random_img_num + "beer.jpg");
                $("#beer-img" + i).attr("style","border: 2px solid #643001; max-width: 550px; max-height: 400px;");

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

                    // $("#food-pairing" + i).append("<li id=" + fid + "><a>" + beerdata[i].food_pairing[ii] + "</a></li>").on("click", "#" + fid, function (e) {                        
                    //     e.preventDefault();
                        
                    //     var food_item = $(this).text();
                    //     get_spoonacular(food_item, $(e.target).parent().parent().attr("id"));                    
                    // });
                    $("#food-pairing" + i).append("<li id=" + fid + "><a>" + beerdata[i].food_pairing[ii] + "</a></li>");
                    //.on("click", "#" + fid, liHandle);
                    newli =  $("#food-pairing" + i);
                    //$("#food-pairing" + i).on("click", "#" + fid, liHandle);
                    newli.on("click", "#" + fid, liHandle);
                    
                }
            }
        })
    }
    
    // api list possible restaurante for food paring
    //
    function get_spoonacular(menu_item, beer_obj) {

        var max_restaurant;
        var query_string = spoonacular_api;
        query_string = query_string + "&query=" + menu_item;

        var r = new RegExp("\d+");
        var beer_num = beer_obj.match(/\d+/g).map(Number);

        $("#restaurant" + beer_num).empty();
        
        $.ajax({
            url: query_string,
            method: "GET"
        }).then(function (fooddata) {

            max_restaurant = fooddata.menuItems.length;
            if (fooddata.menuItems.length > 3) {
                max_restaurant  = 3    
            }

            for (var i = 0; i < max_restaurant; i++) {

                $("#restaurant" + beer_num).append("<li class='fa fa-cutlery'>" + "  " + fooddata.menuItems[i].restaurantChain + "  </li>");

            }            
        })
    }

    // hops list event click
    //
    $('.beer-list').on("click", "li", function () {

        beer_type = $(this).text();

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

    // malt list event click
    //
    $('.malt-list').on("click", "li", function () {

        beer_type = $(this).text();

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

    $(".close-button").click(function(){
        $(".reveal-overlay").hide()
    })
   
})

