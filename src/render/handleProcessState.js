export default (elements, processState) => {
  const { form, submitButton, input } = elements.rssForm;

  switch (processState) {
    case 'filling':
      submitButton.disabled = false;
      form.reset();
      input.focus();
      break;

    case 'sending':
      submitButton.disabled = true;
      break;

    case 'failed':
      submitButton.disabled = false;
      input.focus();
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};
