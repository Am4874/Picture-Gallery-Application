const categoryInput = document.getElementById("category-input");
const searchButton = document.getElementById("searchBTN");
const gallery = document.getElementById("gallery");

const accessKey = "8r8yKNU7vyd3eZ4PRUQzQkvmkqnLcFyNvboYWLoPUds";

function handleSearch() {
  const category = categoryInput.value.trim();
  if (category) {
    searchPicture(category);
    categoryInput.value = "";
  }
}

searchButton.addEventListener("click", handleSearch);

categoryInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Searching category
async function searchPicture(category) {
  const url = `https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayPictures(data.results);
  } catch (error) {
    console.error("Error while fetching Photos: ", error);
    gallery.innerHTML =
      "<p>Error while fetching photos. Please try again later.</p>";
  }
}

// retrieve display picture,descriptions and urls (append to gallery)
function displayPictures(pictures) {
  gallery.innerHTML = "";

  pictures.forEach((picture) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const img = document.createElement("img");
    img.src = picture.urls.small;
    img.alt = picture.alt_description;

    const author = document.createElement("p");
    author.textContent = `Author: ${picture.user.name}`;

    const description = document.createElement("p");
    description.className = "gallery-item-description-link";
    description.textContent =
      picture.description || "No description available for this picture";

    const link = document.createElement("a");
    link.href = picture.links.html;
    link.className = "gallery-link";
    link.textContent = "View picture on Unsplash";
    link.target = "_blank";

    item.appendChild(img);
    item.appendChild(author);
    item.appendChild(description);
    item.appendChild(link);

    gallery.appendChild(item);
  });
}

// Load images on home page
window.addEventListener("load", function () {
  viewPictures();
});

async function viewPictures() {
  const url = `https://api.unsplash.com/photos?page=2&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayPictures(data);
  } catch (error) {
    console.error("Error while fetching Photos: ", error);
    gallery.innerHTML =
      "<p>Error while fetching photos. Please try again later.</p>";
  }
}
