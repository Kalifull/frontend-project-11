import renderCards from './renderCards.js';

export default (elements, processState, i18nInstance) => {
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
      renderCards(elements, i18nInstance);
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
