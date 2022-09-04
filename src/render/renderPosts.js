export default (posts, i18nInstance) => {
  const postsContainer = document.querySelector('.posts ul');

  const liElements = posts.map(({ title, link, postId }) => {
    const liElement = document.createElement('li');
    liElement.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', link);
    linkElement.classList.add('fw-bold');
    linkElement.dataset.id = postId;
    linkElement.setAttribute('target', '_blank');
    linkElement.textContent = title;
    linkElement.setAttribute('rel', 'noopener noreferrer');

    const previewButton = document.createElement('button');
    previewButton.setAttribute('type', 'button');
    previewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    previewButton.dataset.id = postId;
    previewButton.dataset.bsToggle = 'modal';
    previewButton.dataset.bsTarget = '#modal';
    previewButton.textContent = i18nInstance.t('previewButton');

    liElement.append(linkElement, previewButton);

    return liElement;
  });

  postsContainer.replaceChildren(...liElements);
};
