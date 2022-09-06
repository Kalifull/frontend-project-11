const handleSwitchLanguage = (state) => ({ target }) => {
  state.lng = target.dataset.lng;

  if (target.classList.contains('btn-primary')) {
    return;
  }

  const currentActiveElement = document.querySelector('.btn-group .btn-primary');
  currentActiveElement.classList.remove('btn-primary');
  currentActiveElement.classList.add('btn-outline-primary');

  target.classList.remove('btn-outline-primary');
  target.classList.add('btn-primary');
};

export default (elements, watchedState) => {
  elements.languageSelector.forEach((button) => {
    button.addEventListener('click', handleSwitchLanguage(watchedState));
  });
};
