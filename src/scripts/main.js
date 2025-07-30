'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;

  const root = document.getElementById('root');

  root.innerHTML = '';
  root.appendChild(div);
}

let leftClicked = false;
let rightClicked = false;

// First Promise
const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (evt) => {
    if (evt.button === 0) {
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
    document.removeEventListener('mousedown', handleClick);
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

// Second Promise
const secondPromise = new Promise((resolve) => {
  const handleAnyClick = (evt) => {
    if (evt.button === 0 || evt.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleAnyClick);
    }
  };

  document.addEventListener('mousedown', handleAnyClick);
});

secondPromise.then((msg) => showNotification(msg, 'success'));

// Third Promise
let resolveThird;
const thirdPromise = new Promise((resolve) => {
  resolveThird = resolve;
});

const thirdHandler = (evt) => {
  if (evt.button === 0) {
    leftClicked = true;
  }

  if (evt.button === 2) {
    rightClicked = true;
  }

  if (leftClicked && rightClicked) {
    resolveThird('Third promise resolved after both left and right clicks');
    document.removeEventListener('mousedown', thirdHandler);
  }
};

document.addEventListener('mousedown', thirdHandler);

thirdPromise.then((msg) => showNotification(msg, 'success'));
