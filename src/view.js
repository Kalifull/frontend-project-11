import renderFeeds from './render/renderFeeds.js';
import renderPosts from './render/renderPosts.js';
import handleProcessState from './render/handleProcessState.js';
import handleProcessStateError from './render/handleProcessStateError.js';
import handleLoadingProcessState from './render/handleLoadingProcessState.js';
import handleLoadingProcessError from './render/handleLoadingProcessError.js';

export default (elements, i18nInstance) => (path, value) => {
  switch (path) {
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
