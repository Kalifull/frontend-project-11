export default (seenPostsId) => {
  seenPostsId.forEach((postId) => {
    const seenPosts = document.querySelector(`a[data-id="${postId}"`);

    seenPosts.classList.remove('fw-bold');
    seenPosts.classList.add('fw-normal', 'link-secondary');
  });
};
