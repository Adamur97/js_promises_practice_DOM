'use strict';

<<<<<<< HEAD
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
=======
// Helper to show messages in the notification div
function showNotification(message, isSuccess) {
  const notification = document.querySelector('[data-qa="notification"]');

  if (!notification) {
    return;
  }

  notification.textContent = message;
  notification.className = isSuccess ? 'success' : 'error';
}

// First promise: resolve on left click, reject after 3 seconds if no click
const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  function onClick(e) {
    if (e.button === 0) {
      clicked = true;
      document.removeEventListener('click', onClick);
      clearTimeout(timeoutId);

      resolve('First promise was resolved on a left click in the document');
    }
  }

  document.addEventListener('click', onClick);

  const timeoutId = setTimeout(() => {
    if (!clicked) {
      document.removeEventListener('click', onClick);

      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
>>>>>>> 7f9df5e (Finalize solution and pass lint/test checks)
  }, 3000);
});

firstPromise
<<<<<<< HEAD
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
=======
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false));

// Second promise: resolve on left or right click, never rejected
const secondPromise = new Promise((resolve) => {
  function onClick(e) {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', onClick);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('mousedown', onClick);
});

secondPromise.then((msg) => showNotification(msg, true));

// Third promise: resolve only after both left AND right clicks
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function onClick(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', onClick);

      resolve(
        'Third promise was resolved only after both left and right clicks ' +
          'happened',
      );
    }
  }

  document.addEventListener('mousedown', onClick);
});

thirdPromise.then((msg) => showNotification(msg, true));
>>>>>>> 7f9df5e (Finalize solution and pass lint/test checks)
