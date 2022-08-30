import * as yup from 'yup';

export default (link, feeds, i18nInstance) => {
  const existedFeeds = feeds.map(({ url }) => url);

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
    schema.validateSync(link, { abortEarly: false });
    return null;
  } catch (error) {
    return error;
  }
};
