document.getElementById('toggleAdminBtn').addEventListener('click', function () {
  const uploadSection = document.getElementById('upload-section');
  const isVisible = uploadSection.style.display === 'block';

  uploadSection.style.display = isVisible ? 'none' : 'block';
  this.innerText = isVisible ? 'Admin Mode' : 'Exit Admin Mode';
});

// Posting logic
document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const mediaInput = document.getElementById('media');
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const link = document.getElementById('gameLink').value.trim();
  const role = document.getElementById('role').value;

  const file = mediaInput.files[0];
  if (!file || !name || !description || !link || !role) {
    alert("Paki-fill out lahat ng fields.");
    return;
  }

  const fileURL = URL.createObjectURL(file);
  const isVideo = file.type.startsWith('video');

  const postContainer = document.createElement('div');
  postContainer.className = 'post';

  const mediaElement = document.createElement(isVideo ? 'video' : 'img');
  mediaElement.src = fileURL;
  if (isVideo) mediaElement.controls = true;
  mediaElement.style.width = '100%';
  mediaElement.style.borderRadius = '8px';

  const desc = document.createElement('p');
  desc.innerText = description;

  const linkEl = document.createElement('a');
  linkEl.href = link;
  linkEl.target = '_blank';
  linkEl.innerText = 'Tingnan kung saan siya nanalo';

  postContainer.appendChild(mediaElement);
  postContainer.appendChild(desc);
  postContainer.appendChild(linkEl);

  document.getElementById('posts-container').appendChild(postContainer);
  this.reset();
});
