document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const mediaInput = document.getElementById('media');
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const link = document.getElementById('gameLink').value;
  const role = document.getElementById('role').value;

  const file = mediaInput.files[0];
  if (!file) return;

  const postContainer = document.createElement('div');
  postContainer.className = 'post';

  const fileURL = URL.createObjectURL(file);
  const isVideo = file.type.startsWith('video');

  const mediaElement = isVideo
    ? <video controls src="${fileURL}"></video>
    : <img src="${fileURL}" alt="Proof">;

  postContainer.innerHTML = `
    ${mediaElement}
    <h3>${name} (${role})</h3>
    <p>${description}</p>
    <a href="${link}" target="_blank">Tingnan kung saan siya nanalo</a>
  `;

  document.getElementById('posts-container').prepend(postContainer);

  // Reset form
  this.reset();
});
