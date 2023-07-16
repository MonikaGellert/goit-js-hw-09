import Notiflix from 'Notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', submitBtn);

function submitBtn(event) {
  event.preventDefault();
  const el = event.target.elements;

  const amount = el.amount.valueAsNumber;
  const delay = el.delay.valueAsNumber;
  const step = el.step.valueAsNumber;

  if (amount < 0 || delay < 0 || step < 0) {
    return Notiflix.Notify.warning('Cogito ergo sum');
  }

  let setTime = delay;
  for (let i = 1; i <= amount; i += 1) {
    if (i > 1) {
      setTime += step;
    }
    createPromise(i, setTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
