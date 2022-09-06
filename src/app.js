import i18n from 'i18next';
import onChange from 'on-change';
import isEmpty from 'lodash/isEmpty.js';

import initView from './view.js';
import displayData from './controller.js';
import validate from './utils/validate.js';
import resources from './locales/index.js';
import switchLanguage from './utils/switchLanguage.js';

export default async () => {
  const defaultLanguage = 'ru';

  const state = {
    lng: defaultLanguage,
    form: {
      valid: true,
      processState: 'filling',
      processStateError: null,
    },
    loadingProcess: {
      status: null,
      loadingProcessError: null,
    },
    // modal: {
    //   postId: null,
    // },
    // uiState: {
    //   seenPosts: new Set(),
    // },
    feeds: [],
    posts: [],
  };

  const i18nInstance = i18n.createInstance();

  await i18nInstance.init({
    lng: state.lng,
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
    containers: {
      feeds: document.querySelector('.feeds'),
      posts: document.querySelector('.posts'),
    },
    languageSelector: document.querySelectorAll('[data-lng]'),
  };

  const watchedState = onChange(state, initView(elements, i18nInstance, state));

  const { form } = elements.rssForm;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get('url').trim();

    watchedState.loadingProcess.status = null;
    watchedState.loadingProcess.loadingProcessError = null;

    const validationError = await validate(url, watchedState);

    watchedState.form.valid = isEmpty(validationError);
    watchedState.form.processStateError = validationError;

    if (!watchedState.form.valid) {
      watchedState.form.processState = 'failed';
      return;
    }

    await displayData(url, watchedState);
    watchedState.form.processState = 'filling';
  });

  switchLanguage(elements, watchedState);
};
