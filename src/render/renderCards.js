const buildCard = (i18nInstance, title) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18nInstance.t(title);
  cardBody.replaceChildren(cardTitle);

  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group', 'border-0', 'rounded-0');

  card.replaceChildren(cardBody, ulElement);
  return card;
};

export default (elements, i18nInstance) => {
  const { feeds, posts } = elements.containers;
  feeds.replaceChildren(buildCard(i18nInstance, 'feeds'));
  posts.replaceChildren(buildCard(i18nInstance, 'posts'));
};
