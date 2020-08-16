import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form Event Listener
searchForm.addEventListener("submit", (e) => {
  //Get Search Term
  const searchTerm = searchInput.value;

  // Get Sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  // get limit
  const searchLimit = document.getElementById("limit").value;

  // check input
  if (searchTerm === "") {
    showMessage("Please add a Search Term", "alert-danger");
  }

  // Clear Input
  searchInput.value = "";

  // search reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    console.log(results);
    let output = '<div class="card-columns">';
    //loop through post
    results.forEach((post) => {
      //check for image
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://pmcvariety.files.wordpress.com/2014/10/reddit-logo.jpg";
      output += `<div class="card">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
    <hr/>
    <span class="badge badge-secondary">Surreddit: ${post.surreddit}</span>
    <span class="badge badge-dark">Score: ${post.score}</span>
  </div> 
</div>`;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault();
});

// Show Message
function showMessage(message, className) {
  // create a div
  const div = document.createElement("div");

  // Add Classes
  div.className = `alert ${className}`;

  //Add Text
  div.appendChild(document.createTextNode(message));

  // Get parent Container
  const searchContainer = document.getElementById("search-container");

  // Get Search
  const search = document.getElementById("search");

  //insert Message
  searchContainer.insertBefore(div, search);

  // Timeout Alert
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

// truncate Text

function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
