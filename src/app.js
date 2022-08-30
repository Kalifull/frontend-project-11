import i18n from 'i18next';
import _ from 'lodash';
import onChange from 'on-change';
import resources from './locales/index.js';
import initView from './render/view.js';
import validate from './utils/validate.js';

export default async () => {
  const defaultLanguage = 'ru';

  const i18nInstance = i18n.createInstance();

  await i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  });

  const elements = {
    rssForm: {
      form: document.querySelector('.rss-form'),
      submitButton: document.querySelector('button[type="submit"]'),
      input: document.querySelector('.form-control'),
      feedback: document.querySelector('.feedback'),
    },
  };

  const state = {
    form: {
      valid: true,
      processState: 'filling',
      processStateError: null,
    },
    // loadingProcess: {
    //   status: 'idle',
    //   error: null,
    // },
    // modal: {
    //   postId: null,
    // },
    // uiState: {
    //   seenPosts: new Set(),
    // },
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, initView(elements, i18nInstance));

  const { form } = elements.rssForm;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    watchedState.form.processState = 'sending';
    watchedState.form.processStateError = null;

    const formData = new FormData(event.target);
    const url = formData.get('url').trim();
    const errors = validate(url, watchedState.feeds, i18nInstance);

    watchedState.form.valid = _.isEmpty(errors);
    watchedState.form.processStateError = errors;

    if (watchedState.form.valid === false) {
      watchedState.form.processState = 'failed';
      return;
    }

    watchedState.feeds = [{ url }, ...watchedState.feeds];
    watchedState.form.processState = 'filling';
  });
};
