$(document).ready(function(){
    console.log("starting application...")

    // create  an array to hold all the tv characters
    // characters will be pushed into this array with the on click add button function
    var characters = ["Homer Simpson", "Ron Swanson", "Dwight Shrute", "Jon Snow", "Peter Griffin", "Ragnar Lothbrok", "Michael Scott"];

    var apiKey = "&api_key=7agAYaUCQgvrtQaizkNe7TDyYU6qnkbp&limit=10"


    // create a display button function
    displayButtons = function() {
        // must empty the button display so that that it wont repeat the buttons in the display
        $("#button-display").empty();


        for (i = 0; i < characters.length; i++) {

            var giphyButton = $("<button>");
            giphyButton.addClass("button");
            giphyButton.addClass("character");
            giphyButton.attr("data-name", characters[i]);
            giphyButton.text(characters[i]);
            $("#button-display").append(giphyButton);
        }

    }

    // create an add button function
    addNewButton = function () {

        // this is an event listener for the click of the character search button
        $("#find-character").on("click", function (event){
            // prevent the form from submitting an refreshing the page
            event.preventDefault();
            $("#giphy-display").empty();

            var newCharacter = $("#character-input").val().trim();
            // if a user clicks the button without entering a characters name
            if (newCharacter === "") {
                    // an alert will open, telling them to eneter a name
                alert("Please enter a tv characters name. Thanks!");
                // the return false, does not allow a blank button to be added to the button display or the characters array
                return false;
            }
                // if statement that prevents the user from creating duplicate buttons
                if(!characters.includes(newCharacter)) {

                characters.push(newCharacter);

                displayButtons();

                } else {

                    alert("This character has already been added. Please enter a new character.")
                } 
            // call the formReset function
            formReset();
            

        });
        
    };

    // create a function that resets the form entry after the click
    formReset = function () {
        $("#character-search").each(function(){
            this.reset();
        });
    }
    // create a function that displays the giphy's
    displayGiphy = function () {

        var character = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=7agAYaUCQgvrtQaizkNe7TDyYU6qnkbp&limit=10"

        console.log(queryURL);
        
        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function(response) {

            console.log(response);
            // clear the giphy display so they dont keep adding up
            $("#giphy-display").empty();
            
            var giphyObject = response.data;

             for (var i = 0; i < giphyObject.length; i++) {

                var giphy = $("<div>");

                var ratings = giphyObject[i].rating;

                var ratingText = $("<p style='text-align: center;'>").text("The gif below is Rated: " + ratings);

                giphy.append(ratingText);

                console.log (ratings);

                var giphyURL = giphyObject[i].images.original.url
                
                var image = $("<img>");

                image.addClass("image");

                image.attr("src", giphyURL);

                // image.attr("data-still", giphyObject[i].images.original_still.url);

                // image.attr("data-looping", giphyURL);

                // image.attr("date-state", "still");

                giphy.append(image);

                $("#giphy-display").prepend(giphy);
                
                pauseGif();

             }
        })
        
    }
    
// pauseGif = function () {

//     $(".image").on("click", function() {
        
//         var state = $(this).attr("data-state");
      
//         if (state === "still") {
//           $(this).attr("src", $(this).attr("data-looping"));
//           $(this).attr("data-state", "looping");
//         } else {
//           $(this).attr("src", $(this).attr("data-still"));
//           $(this).attr("data-state", "still");
//         }
//       });
// }
    
    displayButtons();
    addNewButton();

    console.log(characters);
    $(document).on("click", ".character", displayGiphy);
})