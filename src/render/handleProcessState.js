export default (elements, processState, i18nInstance) => {
  const {
    form, submitButton, input, feedback,
  } = elements.rssForm;

  switch (processState) {
    case 'filling':
      submitButton.disabled = false;
      input.disabled = false;
      input.focus();
      form.reset();
      break;

    case 'sending':
      submitButton.disabled = true;
      input.disabled = true;
      break;

    case 'loaded': {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');

      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');

      const successMessages = i18nInstance.t('form.successMessages.validUrl');
      feedback.textContent = successMessages;
      break;
    }

    case 'failed':
      submitButton.disabled = false;
      input.focus();
      form.reset();
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};
