

fetch('/weather?address=Boston')
  .then(res => res.json())
  .then((res) => {
    if (res.error) {
      console.log(error)
    } else console.log(res);
  });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = '';
  messageTwo.textContent = 'loading';

  fetch(`/weather?address=${search.value}`)
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        messageTwo.textContent = res.error;
      } else {
        messageOne.textContent = res.forecast;
        messageTwo.textContent = res.location;
      };
    });
});