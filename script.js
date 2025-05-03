let posts = [];

function postWin() {
  const fileInput = document.getElementById("mediaFile");
  const description = document.getElementById("description").value;
  const casinoLink = document.getElementById("casinoLink").value;

  const file = fileInput.files[0];
  if (!file || !description || !casinoLink) {
    alert("Please fill in all fields.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const mediaURL = reader.result;
    posts.unshift({ mediaURL, description, casinoLink, type: file.type.startsWith("video") ? "video" : "image" });
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Naipost na!");
    window.location.href = "index.html";
  };
  reader.readAsDataURL(file);
}

function displayPosts() {
  const postContainer = document.getElementById("latest-posts");
  if (!postContainer) return;
  posts = JSON.parse(localStorage.getItem("posts")) || [];

  postContainer.innerHTML = posts.map(post => `
    <div class="post">
      ${post.type === "image"
        ? <img src="${post.mediaURL}" alt="Proof of Win">
        : <video src="${post.mediaURL}" controls></video>
      }
      <p>${post.description}</p>
      <a href="${post.casinoLink}" target="_blank">Tingnan kung saan siya nanalo</a>
    </div>
  `).join("");
}

window.onload = displayPosts;
