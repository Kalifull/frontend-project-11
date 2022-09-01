import handleProcessState from './handleProcessState.js';
import handleProcessStateError from './handleProcessStateError.js';

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

    default:
      break;
  }
};
