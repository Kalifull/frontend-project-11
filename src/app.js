import i18n from 'i18next';
import onChange from 'on-change';
import isEmpty from 'lodash/isEmpty.js';

import initView from './view.js';
import displayData from './controller.js';
import validate from './utils/validate.js';
import resources from './locales/index.js';

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
    containers: {
      feeds: document.querySelector('.feeds'),
      posts: document.querySelector('.posts'),
    },
  };

  const state = {
    form: {
      valid: true,
      processState: 'filling',
      processStateError: null,
    },
    loadingProcess: {
      status: 'idle',
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

  const watchedState = onChange(state, initView(elements, i18nInstance));

  const { form } = elements.rssForm;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get('url').trim();

    watchedState.loadingProcess.loadingProcessError = null;
    watchedState.loadingProcess.status = 'idle';

    const validationError = await validate(url, watchedState, i18nInstance);

    watchedState.form.valid = isEmpty(validationError);
    watchedState.form.processStateError = validationError;

    if (!watchedState.form.valid) {
      watchedState.form.processState = 'failed';
      return;
    }

    await displayData(url, watchedState);
    watchedState.form.processState = 'filling';
  });
};
