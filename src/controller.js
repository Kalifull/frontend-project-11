import axios from 'axios';

import parse from './utils/parser.js';
import buildRequest from './utils/buildRequest.js';
import makePostList from './utils/makePostList.js';

const routes = {
  usersPath: (url, watchedState) => buildRequest(url, watchedState),
};

export default async (url, watchedState) => {
  try {
    const response = await axios.get(routes.usersPath(url, watchedState));

    const { channel, items } = parse(response, url);

    watchedState.loadingProcess.status = 'idle';

    watchedState.form.processState = 'loaded';

    watchedState.feeds.unshift(channel);

    makePostList(channel, items, watchedState);
  } catch (error) {
    watchedState.loadingProcess.status = 'failed';
    watchedState.loadingProcess.loadingProcessError = error;
  }
};
