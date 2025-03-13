function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  }
}
loadCategories();

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div
          class="col-span-full flex justify-center flex-col items-center py-20"
        >
          <img class="w-[200px]" src="assets/Icon.png" alt="" />
          <h2 class="text-3xl font-semibold mt-5">
            Oops!! Sorry,There is no content here
          </h2>
        </div>
    `;
  }
  videos.forEach((video) => {
    console.log(video);
    const videoCart = document.createElement("div");
    videoCart.innerHTML = `
    <div class="card bg-base-100">
          <figure class="relative">
            <img class="w-full h-[250px] object-cover" src="${video.thumbnail}" alt="Shoes" />
            <span
              class="absolute bottom-2 right-2 text-white rounded-md text-sm bg-black px-2"
              >3 hours ago</span
            >
          </figure>
          <div class="flex gap-3 px-0 py-5">
            <div class="profile">
              <div class="avatar">
                <div class="w-6 ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                  <img
                    src="${video.authors[0].profile_picture}"
                  />
                </div>
              </div>
            </div>
            <div class="intro">
              <h2 class="text-sm font-semibold">${video.title}</h2>
              <p class="text-sm text-gray-400 flex gap-1">
               ${video.authors[0].profile_name}
                <img
                  class="w-5 h-5"
                  src="assets/icons8-verified-48.png"
                  alt=""
                />
              </p>
              <p class="text-sm text-gray-400">${video.others.views} views</p>
            </div>
          </div>
        </div>
    `;
    videoContainer.appendChild(videoCart);
  });
};

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category));
};
