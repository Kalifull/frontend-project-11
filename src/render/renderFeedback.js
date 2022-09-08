export default (elements, feedback, i18nInstance) => {
  const messageFeedback = i18nInstance.t(feedback);
  elements.rssForm.feedback.textContent = messageFeedback;
};
