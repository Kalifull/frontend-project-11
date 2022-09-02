export default (feedback, status, i18nInstance) => {
  const statusMessage = i18nInstance.t(`loadingProcess.${status}`);
  feedback.textContent = statusMessage;
};
