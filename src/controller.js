import axios from 'axios';

import parse from './utils/parser.js';
import buildRequest from './utils/buildRequest.js';
import makePostList from './utils/makePostList.js';

const routes = {
  usersPath: (url) => buildRequest(url),
};

export default async (url, watchedState) => {
  try {
    watchedState.loadingProcess.status = 'loading';

    const response = await axios.get(routes.usersPath(url));

    const { channel, posts } = parse(response, url);

    watchedState.loadingProcess.status = 'idle';
    watchedState.form.processState = 'loaded';

    watchedState.feedsСontainer.unshift(channel);
    const postList = makePostList(channel, posts);
    watchedState.postsСontainer.unshift(...postList);
  } catch (error) {
    watchedState.loadingProcess.status = 'failed';
    watchedState.loadingProcess.loadingProcessError = error;
  }
};
