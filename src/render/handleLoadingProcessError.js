import isEmpty from 'lodash/isEmpty.js';

export default (elements, error, state) => {
  const { input } = elements.rssForm;

  const errorName = error?.name || error;

  if (isEmpty(error)) {
    return;
  }

  switch (errorName) {
    case 'ParserError': {
      input.classList.remove('is-invalid');
      state.form.feedback = 'form.errorMessages.notContainValidRss';
      break;
    }

    case 'AxiosError': {
      input.classList.remove('is-invalid');
      state.form.feedback = 'form.errorMessages.networkError';
      break;
    }

    default:
      throw new Error(`Unknown process loading error name: ${errorName}`);
  }
};
