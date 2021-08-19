// select elements and assign value
const $imageArea = $("#image-area");
const $searchInput = $("#search");

// http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym
// console.log("Let's get this party started!");

// 1. use ajax result to add a gif
function addImage(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newImage = $("<img>", {
      src: res.data[randomIdx].image.original.url,
    });
   // in solution, it created a new div here so we append new img to div and then imageArea, but why?
    $imageArea.append($newImage);
  }
}

// 2. handle user form submission: make ajax call & clear search box
$("form").on("submit", async function (evt) {
  evt.preventDefault();
  let searchTerm = $searchInput.val();
  $searchInput.val("");
// why is this line a thing, I tried without it 
  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  addImage(response.data);
});

// 3. remove images
$("#remove").on("click", function () {
  $imageArea.empty();
});
