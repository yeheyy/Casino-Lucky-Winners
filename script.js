document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const mediaInput = document.getElementById('media');
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const link = document.getElementById('gameLink').value.trim();
  const role = document.getElementById('role').value;

  const file = mediaInput.files[0];
  if (!file) {
    alert("Paki-upload muna ng photo o video.");
    return;
  }

  const fileURL = URL.createObjectURL(file);
  const isVideo = file.type.startsWith('video');

  const postHTML = `
    <div class="post">
      ${isVideo ? <video controls src="${fileURL}"></video> : `<img src="${fileURL}" alt="Proof">`}
      <h3>${name} (${role})</h3>
      <p>${description}</p>
      <a href="${link}" target="_blank">Tingnan kung saan siya nanalo</a>
    </div>
  `;

  const postsContainer = document.getElementById('posts-container');
  postsContainer.insertAdjacentHTML('afterbegin', postHTML);

  this.reset(); // Clear the form
});
