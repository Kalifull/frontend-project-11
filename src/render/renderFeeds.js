export default (feeds) => {
  const feedsContainer = document.querySelector('.feeds ul');

  const liElements = feeds.map(({ feedTitle, descriptionTitle }) => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item', 'border-0', 'border-end-0');

    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feedTitle;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = descriptionTitle;

    liElement.append(title, description);

    return liElement;
  });

  feedsContainer.replaceChildren(...liElements);
};
