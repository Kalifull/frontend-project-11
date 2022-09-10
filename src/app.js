import i18n from 'i18next';
import onChange from 'on-change';
import isEmpty from 'lodash/isEmpty.js';
import Modal from 'bootstrap/js/dist/modal';

import initView from './view.js';
import updater from './utils/updater.js';
import displayData from './controller.js';
import validate from './utils/validate.js';
import resources from './locales/index.js';
import switchLanguage from './utils/switchLanguage.js';

export default async () => {
  const defaultLanguage = 'ru';
  const timeout = 5000;

  const state = {
    lng: defaultLanguage,
    form: {
      valid: true,
      processState: 'filling',
      processStateError: null,
      feedback: null,
    },
    loadingProcess: {
      status: null,
      loadingProcessError: null,
    },
    modal: {
      postId: null,
    },
    uiState: {
      seenPosts: new Set(),
    },
    feedsСontainer: [],
    postsСontainer: [],
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
      feedback: document.querySelector('.feedback'),
      input: document.querySelector('.form-control'),
      submitButton: document.querySelector('button[type="submit"]'),
    },
    containers: {
      feeds: document.querySelector('.feeds'),
      posts: document.querySelector('.posts'),
    },
    modal: {
      window: document.querySelector('.modal'),
      body: document.querySelector('.modal-body'),
      title: document.querySelector('.modal-title'),
      link: document.querySelector('.full-article'),
    },
    initialTexts: {
      header: document.querySelector('.header'),
      description: document.querySelector('.lead'),
      examples: document.querySelector('.text-muted'),
      input: document.querySelector('label[for="url-input"]'),
      closeButton: document.querySelector('.btn-secondary'),
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

    updater(watchedState, timeout);
  });

  elements.containers.posts.addEventListener('click', ({ target }) => {
    const { id } = target.dataset;
    if (id) {
      watchedState.uiState.seenPosts.add(id);
    }
  });

  Modal.getInstance(elements.modal);

  elements.modal.window.addEventListener('show.bs.modal', ({ relatedTarget }) => {
    const { id } = relatedTarget.dataset;
    if (id) {
      watchedState.modal.postId = id;
    }
  });

  switchLanguage(elements, watchedState);
};
