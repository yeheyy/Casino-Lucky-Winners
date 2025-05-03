document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const mediaInput = document.getElementById('media');
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const link = document.getElementById('gameLink').value.trim();
  const role = document.getElementById('role').value;

  if (!mediaInput.files.length || !name || !description || !link || !role) {
    alert("Paki-fill out lahat ng fields at mag-upload ng media.");
    return;
  }

  const file = mediaInput.files[0];
  const fileURL = URL.createObjectURL(file);
  const isVideo = file.type.startsWith('video');

  const postContainer = document.createElement('div');
  postContainer.className = 'post';

  postContainer.innerHTML = `
    ${isVideo ? <video controls src="${fileURL}"></video> : `<img src="${fileURL}" alt="Proof">`}
    <h3>${name} (${role})</h3>
    <p>${description}</p>
    <a href="${link}" target="_blank">Tingnan kung saan siya nanalo</a>
  `;

  const postsContainer = document.getElementById('posts-container');
  postsContainer.prepend(postContainer);

  this.reset();
});
