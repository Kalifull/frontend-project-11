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

    const data = parse(response, url, watchedState);

    const { channel, items } = data;

    makePostList(channel, items, watchedState);
  } catch (error) {
    watchedState.loadingProcess.status = 'failed';
    watchedState.loadingProcess.loadingProcessError = error;
    console.log(error);
  }
};
