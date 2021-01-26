export const clearNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};
