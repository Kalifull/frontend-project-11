export default (response, url) => {
  const parser = new DOMParser();
  const XMLDocument = parser.parseFromString(response.data.contents, 'application/xml');

  const parserError = XMLDocument.querySelector('parsererror');

  if (parserError) {
    const errorMessages = parserError.textContent;
    const error = new Error(errorMessages);
    error.name = 'ParserError';
    throw error;
  }

  const feedTitle = XMLDocument.querySelector('title').textContent;
  const descriptionTitle = XMLDocument.querySelector('description').textContent;

  const rssPosts = [...XMLDocument.querySelectorAll('item')];

  const items = rssPosts.map((item) => ({
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));

  const rss = {
    channel: {
      url,
      feedTitle,
      descriptionTitle,
    },
    items,
  };

  return rss;
};
