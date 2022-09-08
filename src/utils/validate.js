import * as yup from 'yup';

export default async (link, watchedState) => {
  watchedState.form.processState = 'sending';

  const existedUrl = watchedState.feedsСontainer.map(({ url }) => url);

  yup.setLocale({
    string: {
      url: () => ({ key: 'form.errorMessages.invalidUrl' }),
    },
    mixed: {
      required: () => ({ key: 'form.errorMessages.requiredField' }),
      notOneOf: () => ({ key: 'form.errorMessages.duplicateUrl' }),
    },
  });

  const schema = yup.string().url().notOneOf(existedUrl).required();

  try {
    await schema.validate(link, { abortEarly: false });
    return {};
  } catch (error) {
    return error;
  }
};
