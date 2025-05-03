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
  if (isVideo) {
    mediaElement.controls = true;
    mediaElement.src = fileURL;
  } else {
    mediaElement.src = fileURL;
    mediaElement.alt = "Proof of Winning";
  }
  mediaElement.style.width = '100%';
  mediaElement.style.borderRadius = '8px';

  const descriptionElement = document.createElement('p');
  descriptionElement.innerText = description;
  descriptionElement.style.marginTop = '1rem';
  descriptionElement.style.color = '#ddd';

  const linkElement = document.createElement('a');
  linkElement.href = link;
  linkElement.target = '_blank';
  linkElement.innerText = 'Tingnan kung saan siya nanalo';
  linkElement.style.display = 'block';
  linkElement.style.marginTop = '0.5rem';
  linkElement.style.color = '#ff0055';
  linkElement.style.fontWeight = 'bold';

  postContainer.appendChild(mediaElement);
  postContainer.appendChild(descriptionElement);
  postContainer.appendChild(linkElement);

  const postsContainer = document.getElementById('posts-container');
  postsContainer.appendChild(postContainer); // Sa ibaba ipinopost

  this.reset(); // clear form after posting
});
