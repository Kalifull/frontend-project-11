import renderCards from './renderCards.js';

const renderSpinner = (submitButton, i18nInstance) => {
  submitButton.textContent = '';

  const spanSpinner = document.createElement('span');
  spanSpinner.classList.add('spinner-border', 'spinner-border-sm');
  spanSpinner.setAttribute('role', 'status');
  spanSpinner.setAttribute('aria-hidden', 'true');
  submitButton.append(spanSpinner);

  const spanLoading = document.createElement('span');
  spanLoading.classList.add('sr-only');
  spanLoading.textContent = i18nInstance.t('initialTexts.loading');
  submitButton.append(spanLoading);
};

export default (elements, processState, i18nInstance) => {
  const { form, submitButton, input } = elements.rssForm;

  switch (processState) {
    case 'filling':
      submitButton.textContent = i18nInstance.t('initialTexts.submitButton');
      submitButton.disabled = false;

      input.removeAttribute('readonly');
      input.focus();
      break;

    case 'sending': {
      renderSpinner(submitButton, i18nInstance);
      submitButton.disabled = true;

      input.classList.remove('is-invalid');
      input.setAttribute('readonly', true);
      break;
    }

    case 'loaded': {
      submitButton.textContent = i18nInstance.t('initialTexts.submitButton');
      form.reset();
      renderCards(elements, i18nInstance);
      break;
    }

    case 'failed':
      submitButton.textContent = i18nInstance.t('initialTexts.submitButton');
      submitButton.disabled = false;

      input.removeAttribute('readonly');
      input.focus();
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};
