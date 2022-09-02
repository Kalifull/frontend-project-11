import renderFeedback from './renderFeedback.js';

export default (elements, status, i18nInstance) => {
  const { feedback } = elements.rssForm;

  switch (status) {
    case 'idle': {
      feedback.classList.add('text-success');
      renderFeedback(feedback, status, i18nInstance);
      break;
    }

    case 'loading': {
      feedback.classList.remove('text-danger');
      feedback.classList.remove('text-success');
      renderFeedback(feedback, status, i18nInstance);
      break;
    }

    case 'failed': {
      feedback.classList.add('text-danger');
      renderFeedback(feedback, status, i18nInstance);
      break;
    }

    default:
      throw new Error(`Unknown process loading status: ${status}`);
  }
};
