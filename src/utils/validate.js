import * as yup from 'yup';

export default async (link, watchedState, i18nInstance) => {
  watchedState.form.processState = 'sending';

  const existedFeeds = watchedState.feeds.map(({ url }) => url);

  yup.setLocale({
    string: {
      url: i18nInstance.t('form.errorMessages.invalidUrl'),
    },
    mixed: {
      required: i18nInstance.t('form.errorMessages.requiredField'),
      notOneOf: i18nInstance.t('form.errorMessages.duplicateUrl'),
    },
  });

  const schema = yup.string().url().notOneOf(existedFeeds).required();

  try {
    await schema.validate(link, { abortEarly: false });
    return {};
  } catch (error) {
    return error;
  }
};
