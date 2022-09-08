import axios from 'axios';
import { uniqueId, differenceBy, isEmpty } from 'lodash';

import parse from './parser.js';
import buildRequest from './buildRequest.js';

const routes = {
  usersPath: (url) => buildRequest(url),
};

const updater = (state) => {
  const { feedsСontainer, postsСontainer } = state;

  feedsСontainer.map(async ({ url, id }) => {
    const response = await axios.get(routes.usersPath(url));
    const { posts } = parse(response, url);

    const addedPostList = posts.map((post) => ({ feedId: id, postId: uniqueId(), ...post }));
    const currentPostList = postsСontainer.filter((post) => post.feedId === id);
    const newPostList = differenceBy(addedPostList, currentPostList, 'link');

    if (!isEmpty(newPostList)) {
      postsСontainer.unshift(...newPostList);
    }
  });

  setTimeout(() => updater(state), 5000);
};

export default updater;
