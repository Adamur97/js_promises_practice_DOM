// src/scripts/main.js

// Deklaracja zmiennych globalnych do obietnic
let firstPromise;
let secondPromise;
let thirdPromise;

// Funkcja inicjalizująca obietnice po załadowaniu DOM
window.addEventListener('DOMContentLoaded', () => {

  // Pierwsza obietnica
  firstPromise = new Promise((resolve) => {
    const triggerFirst = document.querySelector('#firstButton');
    triggerFirst.addEventListener('click', () => {
      resolve('firstPromise resolved');
    });
  });

  // Druga obietnica
  secondPromise = new Promise((resolve) => {
    const triggerSecond = document.querySelector('#secondButton');
    triggerSecond.addEventListener('click', () => {
      resolve('secondPromise resolved');
    });
  });

  // Trzecia obietnica
  thirdPromise = new Promise((resolve) => {
    const triggerThird = document.querySelector('#thirdButton');
    triggerThird.addEventListener('click', () => {
      resolve('thirdPromise resolved');
    });
  });

});

// Funkcja, którą testy mogą wywołać, aby pobrać promisy
export function getPromises() {
  return { firstPromise, secondPromise, thirdPromise };
}
