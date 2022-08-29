export default (elements, error) => {
  const { input } = elements.rssForm;

  const errorName = error === null ? error : error.name;

  switch (errorName) {
    case null:
      input.classList.remove('is-invalid');
      break;

    case 'ValidationError':
      input.classList.add('is-invalid');
      break;

    default:
      throw new Error(`Unknown process error name: ${errorName}`);
  }
};
