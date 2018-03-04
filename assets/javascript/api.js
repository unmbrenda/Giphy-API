var toys = ["She-ra", "Popple", "Troll Doll", "Legos", "Barbie and the Rockers",
  "Care Bears", "My Little Pony", "Strawberry Shortcake", "Cabbage Patch Kid", "Light-Brite",
  "Pound Puppies", "Monchhichi"];

function appendButton(btnName) {
  var btn = $("<button>");
  $(btn).addClass("toy-btn");
  $(btn).attr('data-name', btnName);
  $(btn).text(btnName);
  $("#buttons-view").append(btn);
};

function setDefaultBtns() {
  for (var i = 0; i < toys.length; i++) {
    appendButton(toys[i]);

  }
};

setDefaultBtns();

$("#add-toy").on("click", function (event) {
  event.preventDefault();
  var toy = $("#toy-input").val().trim();
  appendButton(toy);

});

$(document).on("click", ".toy-btn", function () {
  var toyButtonName = $(this).attr("data-name");
  callGiphyAPI(toyButtonName);
});

function callGiphyAPI(toy) {
  var baseURL = "http://api.giphy.com/v1/gifs/search?";
  var queryString = "q=" + toy + "&api_key=ZrY7WS6QsMCJiN6isca1dv8QswGKI1Po&limit=10";
  var queryURL = baseURL + encodeURI(queryString);


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#toys-view").empty();
    for (var i = 0; i < response.data.length; i++) {
      var newDiv = $("<div>");
      $(newDiv).addClass("inlinePic");
      var image = $("<img>");
      $(image).addClass("toggle");
      $(image).attr("data-still", response.data[i].images.fixed_height_still.url);
      $(image).attr("data-animated", response.data[i].images.fixed_height.url);
      $(image).attr("src", response.data[i].images.fixed_height_still.url);
      $(newDiv).append(image);
      $("#toys-view").append(newDiv);
    }
  });
}
$(document).on("click", ".toggle", function()  {
var currentImageSrc = $(this).attr("src");
var animatedImageSrc = $(this).attr("data-animated");
var stillImageSrc = $(this).attr("data-still");
if(currentImageSrc === stillImageSrc){
  $(this).attr("src", animatedImageSrc);
}else{
  $(this).attr("src", stillImageSrc);
}
  
});

