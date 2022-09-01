import axios from 'axios';
import i18n from 'i18next';
import onChange from 'on-change';
import isEmpty from 'lodash/isEmpty.js';

import parse from './utils/parser.js';
import initView from './render/view.js';
import validate from './utils/validate.js';
import buildUrl from './utils/buildUrl.js';
import resources from './locales/index.js';

const routes = {
  usersPath: (url) => buildUrl(url),
};

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

    watchedState.form.processState = 'sending';

    try {
      const validationError = await validate(url, watchedState.feeds, i18nInstance);

      watchedState.form.valid = isEmpty(validationError);
      watchedState.form.processStateError = validationError;

      if (!watchedState.form.valid) {
        watchedState.form.processState = 'failed';
        return;
      }

      const response = await axios.get(routes.usersPath(url));
      watchedState.form.processState = 'loaded';

      const data = parse(response);
      watchedState.feeds.push({ url });
      console.log(data);
    } catch (errors) {
      watchedState.form.processState = 'failed';
      watchedState.form.processStateError = errors;
    } finally {
      watchedState.form.processState = 'filling';
    }
  });
};
