import handleProcessState from './handleProcessState.js';
import handleProcessStateError from './handleProcessStateError.js';
import handleLoadingProcessState from './handleLoadingProcessState.js';
import handleLoadingProcessError from './handleLoadingProcessError.js';

export default (elements, i18nInstance) => (state, value) => {
  switch (state) {
    case 'form.valid':
      elements.rssForm.submitButton.disabled = !value;
      break;

    case 'form.processState':
      handleProcessState(elements, value);
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

    default:
      break;
  }
};
