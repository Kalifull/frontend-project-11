export default (elements, error, i18nInstance) => {
  const { input, feedback } = elements.rssForm;
  const errorName = error === null ? error : error.name;

  switch (errorName) {
    case null:
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      break;

    case 'ValidationError':
      input.classList.add('is-invalid');
      feedback.classList.add('text-danger');
      feedback.textContent = i18nInstance.t(error.message);
      break;

    default:
      throw new Error(`Unknown process error name: ${errorName}`);
  }
};
