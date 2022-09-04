import { uniqueId } from 'lodash';

export default (channel, items, watchedState) => {
  channel.id = uniqueId();

  const posts = items.map((item) => Object.assign(item, {
    feedId: channel.id,
    postId: uniqueId(),
  }));

  watchedState.posts.unshift(...posts);
};
