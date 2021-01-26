import makeRequests from './makeRequests.js';

window.clickHandler = () => {
  const input = document.getElementById('urls').value.split('\n').filter(x => x.length > 0);

  if (input.length === 0 || document.getElementById('max_num').value.length === 0) {
    return;
  }

  const urls = new Map();

  for (let i = 0; i < input.length; i++) {
    if (urls.has(input[i])) {
      const toPush = urls.get(input[i]);

      toPush.push(i);
      urls.set(input[i], toPush);
    } else {
      urls.set(input[i], [i]);
    }
  }

  document.getElementById('main').style.display = 'none';

  createPlaceForResponse(urls);
  document.getElementById('process').style.display = 'block';

  makeRequests(Array.from(urls.keys()), parseInt(document.getElementById('max_num').value, 10)).then(
    result => showResults(input, result),
    reason => showError(input, reason)
  );
};

function createPlaceForResponse(urls) {
  for (const url of urls.keys()) {
    const div = document.createElement('div');

    div.className = 'url';
    div.id = url;
    div.innerText = url;
    div.style.display = 'block';
    document.getElementById('process').append(div);
  }
}

function showError(input, reason) {
  for (const url of input) {
    document.getElementById(url).style.display = 'none';
  }
  const textArea = document.createElement('textarea');

  console.log(reason.error);
  textArea.value = reason.error;
  document.getElementById(reason.url).style.display = 'block';
  document.getElementById(reason.url).append(textArea);
}

function showResults(input, results) {
  document.getElementById('process').style.display = 'block';
  for (const url of input) {
    document.getElementById(url).style.display = 'none';
  }
  for (const url of input) {
    const textArea = document.createElement('textarea');

    const div = document.createElement('div');

    const p = document.createElement('p');

    div.style.display = 'block';
    p.innerText = url;
    p.style.color = document.getElementById(url).style.color;
    textArea.value = results.get(url);

    div.append(p);
    div.append(textArea);

    document.getElementById('process').append(div);
  }
}
