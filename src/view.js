import isEmpty from 'lodash/isEmpty.js';

import renderCards from './render/renderCards.js';
import renderFeeds from './render/renderFeeds.js';
import renderPosts from './render/renderPosts.js';
import handleProcessState from './render/handleProcessState.js';
import handleProcessStateError from './render/handleProcessStateError.js';
import handleLoadingProcessState from './render/handleLoadingProcessState.js';
import handleLoadingProcessError from './render/handleLoadingProcessError.js';

const renderTextLanguage = (state, elements, i18nInstance) => {
  handleProcessStateError(elements, state.form.processStateError, i18nInstance);
  handleLoadingProcessState(elements, state.loadingProcess.status, i18nInstance);
  handleLoadingProcessError(elements, state.loadingProcess.loadingProcessError, i18nInstance);

  if (!isEmpty(state.posts)) {
    renderCards(elements, i18nInstance);
    renderPosts(state.posts, i18nInstance);
  }
};

export default (elements, i18nInstance, state) => (path, value) => {
  switch (path) {
    case 'lng':
      i18nInstance.changeLanguage(value);
      renderTextLanguage(state, elements, i18nInstance);
      break;

    case 'form.valid':
      elements.rssForm.submitButton.disabled = !value;
      break;

    case 'form.processState':
      handleProcessState(elements, value, i18nInstance);
      break;

    case 'form.processStateError':
      handleProcessStateError(elements, value, i18nInstance);
      break;

    case 'loadingProcess.status':
      handleLoadingProcessState(elements, value, i18nInstance);
      break;

    case 'loadingProcess.loadingProcessError':
      handleLoadingProcessError(elements, value, i18nInstance);
      break;

    case 'feeds':
      renderFeeds(value);
      break;

    case 'posts':
      renderPosts(value, i18nInstance);
      break;

    default:
      break;
  }
};
