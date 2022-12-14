import isEmpty from 'lodash/isEmpty.js';

import renderCards from './render/renderCards.js';
import renderFeeds from './render/renderFeeds.js';
import renderPosts from './render/renderPosts.js';
import renderModal from './render/renderModal.js';
import renderFeedback from './render/renderFeedback.js';
import renderSeenPosts from './render/renderSeenPosts.js';
import handleProcessState from './render/handleProcessState.js';
import handleProcessStateError from './render/handleProcessStateError.js';
import handleLoadingProcessState from './render/handleLoadingProcessState.js';
import handleLoadingProcessError from './render/handleLoadingProcessError.js';

const renderInitialTexts = (elements, i18nInstance) => {
  const {
    input, header, examples, description, closeButton,
  } = elements.initialTexts;

  const { submitButton } = elements.rssForm;

  const { link } = elements.modal;

  link.textContent = i18nInstance.t('initialTexts.link');
  input.textContent = i18nInstance.t('initialTexts.input');
  header.textContent = i18nInstance.t('initialTexts.header');
  examples.textContent = i18nInstance.t('initialTexts.examples');
  closeButton.textContent = i18nInstance.t('initialTexts.closeButton');
  description.textContent = i18nInstance.t('initialTexts.description');
  submitButton.textContent = i18nInstance.t('initialTexts.submitButton');
};

const renderTextLanguage = (state, elements, i18nInstance) => {
  renderInitialTexts(elements, i18nInstance);
  renderFeedback(elements, state.form.feedback, i18nInstance);

  if (!isEmpty(state.feedsСontainer)) {
    renderCards(elements, i18nInstance);
    renderFeeds(state.feedsСontainer);
    renderPosts(state.postsСontainer, i18nInstance, state);
  }

  elements.rssForm.input.focus();
};

export default (elements, i18nInstance, state) => (path, value) => {
  switch (path) {
    case 'lng':
      i18nInstance
        .changeLanguage(value)
        .then(() => renderTextLanguage(state, elements, i18nInstance));
      break;

    case 'form.valid':
      elements.rssForm.submitButton.disabled = !value;
      break;

    case 'form.processState':
      handleProcessState(elements, value, i18nInstance);
      break;

    case 'form.processStateError':
      handleProcessStateError(elements, value, state);
      break;

    case 'loadingProcess.status':
      handleLoadingProcessState(elements, value, state);
      break;

    case 'loadingProcess.loadingProcessError':
      handleLoadingProcessError(elements, value, state);
      break;

    case 'feedsСontainer':
      renderFeeds(value);
      break;

    case 'postsСontainer':
      renderPosts(value, i18nInstance, state);
      break;

    case 'modal.postId':
      renderModal(elements, value, state);
      break;

    case 'uiState.seenPosts':
      renderSeenPosts(value);
      break;

    default:
      break;
  }
  renderFeedback(elements, state.form.feedback, i18nInstance);
};
