function postWin() {
  const fileInput = document.getElementById("mediaFile");
  const description = document.getElementById("description").value.trim();
  const casinoLink = document.getElementById("casinoLink").value.trim();
  const file = fileInput.files[0];

  if (!file || !description || !casinoLink) {
    alert("Paki-kumpleto lahat ng fields.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const mediaData = reader.result;
    const post = {
      type: file.type.startsWith("video") ? "video" : "image",
      media: mediaData,
      description,
      link: casinoLink
    };

    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    existingPosts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(existingPosts));

    alert("Naipost na!");
    window.location.href = "index.html";
  };

  reader.readAsDataURL(file);
}

function displayPosts() {
  const postContainer = document.getElementById("latest-posts");
  if (!postContainer) return;

  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  postContainer.innerHTML = "";

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post";

    if (post.type === "video") {
      card.innerHTML = `
        <video src="${post.media}" controls></video>
        <p>${post.description}</p>
        <a href="${post.link}" target="_blank">Tingnan kung saan siya nanalo</a>
      `;
    } else {
      card.innerHTML = `
        <img src="${post.media}" alt="Proof of Win" />
        <p>${post.description}</p>
        <a href="${post.link}" target="_blank">Tingnan kung saan siya nanalo</a>
      `;
    }

    postContainer.appendChild(card);
  });
}

window.onload = displayPosts;
