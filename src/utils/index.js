export const $ = (selector, parent = document) => {
  return parent.querySelector(selector);
};

export const deepClone = (data) => JSON.parse(JSON.stringify(data));
