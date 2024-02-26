export function createHtmlElement(tag, id) {
  const newElement = document.createElement(tag);
  newElement.id = id;
  return newElement;
}
