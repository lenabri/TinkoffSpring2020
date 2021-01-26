import capitalize from './capitalize.js';

window.capitalize = () => {
  const v1 = document.getElementById('input').value;

  document.getElementById('answer').textContent = capitalize(v1);
};
