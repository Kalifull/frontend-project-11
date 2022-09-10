import axios from 'axios';
import { uniqueId, differenceBy, isEmpty } from 'lodash';

import parse from './parser.js';
import buildRequest from './buildRequest.js';

const routes = {
  usersPath: (url) => buildRequest(url),
};

const updater = (state, timeout) => {
  const { feedsСontainer, postsСontainer } = state;

  feedsСontainer.map(async ({ url, id }) => {
    try {
      const response = await axios.get(routes.usersPath(url));

      const { posts } = parse(response, url);

      const addedPostList = posts.map((post) => ({ ...post, feedId: id, postId: uniqueId() }));
      const currentPostList = postsСontainer.filter((post) => post.feedId === id);
      const newPostList = differenceBy(addedPostList, currentPostList, 'link');

      if (!isEmpty(newPostList)) {
        postsСontainer.unshift(...newPostList);
      }
    } catch {
      state.loadingProcess.status = 'failed';
      state.form.feedback = 'form.errorMessages.networkErrorUpdate';
    }
  });

  setTimeout(() => updater(state, timeout), timeout);
};

export default updater;
