export default (url, watchedState) => {
  watchedState.loadingProcess.status = 'loading';

  const proxy = 'https://allorigins.hexlet.app';
  const parsedUrl = new URL('get', proxy);

  parsedUrl.searchParams.append('disableCache', true);
  parsedUrl.searchParams.append('url', url);

  return parsedUrl.href;
};
