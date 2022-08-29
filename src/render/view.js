import handleProcessState from './handleProcessState.js';
import handleProcessStateError from './handleProcessStateError.js';

export default (elements) => (path, value) => {
  switch (path) {
    case 'form.processState':
      handleProcessState(elements, value);
      break;
    case 'form.processStateError':
      handleProcessStateError(elements, value);
      break;
    default:
      break;
  }
};
