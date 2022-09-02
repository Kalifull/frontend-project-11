export default (elements, processState) => {
  const { form, submitButton, input } = elements.rssForm;

  switch (processState) {
    case 'filling':
      submitButton.disabled = false;
      input.disabled = false;
      input.focus();
      break;

    case 'sending':
      submitButton.disabled = true;
      input.classList.remove('is-invalid');
      input.disabled = true;
      break;

    case 'loaded': {
      form.reset();
      break;
    }

    case 'failed':
      submitButton.disabled = false;
      input.disabled = false;
      input.focus();
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};
