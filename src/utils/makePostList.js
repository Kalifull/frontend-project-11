import { uniqueId } from 'lodash';

export default (channel, posts) => {
  channel.id = uniqueId();

  const postsList = posts.map((post) => Object.assign(post, {
    feedId: channel.id,
    postId: uniqueId(),
  }));

  return postsList;
};
