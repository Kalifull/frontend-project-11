import isEmpty from 'lodash/isEmpty.js';

export default (elements, error, i18nInstance) => {
  const { input, feedback } = elements.rssForm;

  const errorName = error?.name || error;

  if (isEmpty(error)) {
    return;
  }

  switch (errorName) {
    case 'ValidationError': {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');

      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');

      const errorMessages = i18nInstance.t(error.message);
      feedback.textContent = errorMessages;
      break;
    }

    case 'ParserError': {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');

      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');

      const errorMessages = i18nInstance.t('form.errorMessages.notContainValidRss');
      feedback.textContent = errorMessages;
      break;
    }

    default:
      throw new Error(`Unknown process error name: ${errorName}`);
  }
};
