import isEmpty from 'lodash/isEmpty.js';

export default (elements, error, i18nInstance) => {
  const { input, feedback } = elements.rssForm;

  const errorName = error?.name || error;

  if (isEmpty(error)) {
    return;
  }

  switch (errorName) {
    case 'ValidationError': {
      input.classList.add('is-invalid');

      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      const errorMessage = i18nInstance.t(error.message.key);
      feedback.textContent = errorMessage;
      break;
    }

    default:
      throw new Error(`Unknown process state error name: ${errorName}`);
  }
};
