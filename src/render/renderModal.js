export default (elements, currentPostId, state) => {
  const currentPost = state.postsСontainer.find(({ postId }) => postId === currentPostId);

  const { title, description, link } = currentPost;

  elements.modal.title.textContent = title;
  elements.modal.body.textContent = description;
  elements.modal.link.setAttribute('href', link);
};
