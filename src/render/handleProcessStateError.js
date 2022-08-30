import isEmpty from 'lodash/isEmpty.js';

export default (elements, error, i18nInstance) => {
  const { input, feedback } = elements.rssForm;

  const errorName = error?.name || error;

  if (isEmpty(error)) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');

    const successMessages = i18nInstance.t('form.successMessages.validUrl');
    feedback.textContent = successMessages;
    return;
  }

  switch (errorName) {
    case 'ValidationError': {
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');

      const errorMessages = i18nInstance.t(error.message);
      feedback.textContent = errorMessages;
      break;
    }

    default:
      throw new Error(`Unknown process error name: ${errorName}`);
  }
};
