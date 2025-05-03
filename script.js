if (document.getElementById("loginBtn")) {
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const submitLogin = document.getElementById("submitLogin");

  loginBtn.onclick = () => loginModal.style.display = "block";
  closeModal.onclick = () => loginModal.style.display = "none";
  window.onclick = (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
  };

  submitLogin.onclick = () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    if (username === "admin" && password === "1234") {
      window.location.href = "admin.html";
    } else {
      alert("Invalid credentials.");
    }
  };
}

// Upload post (admin.html)
if (document.getElementById("upload-form")) {
  document.getElementById("upload-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const media = document.getElementById("media").files[0];
    const description = document.getElementById("description").value;
    const link = document.getElementById("gameLink").value;

    if (!media) return alert("Mag-upload muna ng file.");

    const reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      const post = {
        url: dataURL,
        type: media.type.startsWith("video") ? "video" : "image",
        description,
        link
      };

      const existing = JSON.parse(localStorage.getItem("casinoPosts") || "[]");
      existing.unshift(post);
      localStorage.setItem("casinoPosts", JSON.stringify(existing));

      alert("Na-save na!");
      document.getElementById("upload-form").reset();
    };
    reader.readAsDataURL(media);
  });
}

// Load posts on index.html
if (document.getElementById("posts-container")) {
  const posts = JSON.parse(localStorage.getItem("casinoPosts") || "[]");
  const container = document.getElementById("posts-container");

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    const media = document.createElement(post.type === "video" ? "video" : "img");
    media.src = post.url;
    if (post.type === "video") media.controls = true;

    const desc = document.createElement("p");
    desc.innerText = post.description;

    const a = document.createElement("a");
    a.href = post.link;
    a.target = "_blank";
    a.innerText = "Tingnan kung saan siya nanalo";

    div.appendChild(media);
    div.appendChild(desc);
    div.appendChild(a);
    container.appendChild(div);
  });
}
