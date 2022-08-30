export default (elements, processState, i18nInstance) => {
  const {
    form, submitButton, input, feedback,
  } = elements.rssForm;

  switch (processState) {
    case 'filling':
      submitButton.disabled = false;
      form.reset();
      input.focus();
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.textContent = i18nInstance.t('form.successMessages.validUrl');
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
