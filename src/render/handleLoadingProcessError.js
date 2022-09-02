import isEmpty from 'lodash/isEmpty.js';

export default (elements, error, i18nInstance) => {
  const { input, feedback } = elements.rssForm;

  const errorName = error?.name || error;

  if (isEmpty(error)) {
    return;
  }

  switch (errorName) {
    case 'ParserError': {
      input.classList.remove('is-invalid');

      feedback.classList.add('text-danger');
      const errorMessage = i18nInstance.t('form.errorMessages.notContainValidRss');
      feedback.textContent = errorMessage;
      break;
    }

    case 'AxiosError': {
      input.classList.remove('is-invalid');

      feedback.classList.add('text-danger');
      const errorMessage = i18nInstance.t('form.errorMessages.networkError');
      feedback.textContent = errorMessage;
      break;
    }

    default:
      throw new Error(`Unknown process loading error name: ${errorName}`);
  }
};
