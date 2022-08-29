import * as yup from 'yup';

export default (link, feeds) => {
  const existedFeeds = feeds.map(({ url }) => url);

  const schema = yup.string().url().notOneOf(existedFeeds).required();

  try {
    schema.validateSync(link, { abortEarly: false });
    return null;
  } catch (error) {
    return error;
  }
};
