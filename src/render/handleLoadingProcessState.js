export default (elements, status, state) => {
  const { feedback } = elements.rssForm;

  if (!status) {
    return;
  }

  switch (status) {
    case 'idle': {
      feedback.classList.add('text-success');
      state.form.feedback = `loadingProcess.${status}`;
      break;
    }

    case 'loading': {
      feedback.classList.remove('text-danger');
      feedback.classList.remove('text-success');
      state.form.feedback = `loadingProcess.${status}`;
      break;
    }

    case 'failed': {
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      break;
    }

    default:
      throw new Error(`Unknown process loading status: ${status}`);
  }
};
