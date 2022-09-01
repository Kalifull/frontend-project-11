export default (response) => {
  const parser = new DOMParser();
  const XMLDocument = parser.parseFromString(response.data.contents, 'application/xml');

  const parserError = XMLDocument.querySelector('parsererror');

  if (parserError) {
    const errorMessages = parserError.textContent;
    const error = new Error(errorMessages);
    error.name = 'ParserError';
    throw error;
  }

  return XMLDocument;
};
