document.addEventListener('DOMContentLoaded', () => {
   /* ----------------------------timer--start------------------------------- */
   const newData = new Date('january 1 2024 00:00:00');
  

   const daysVal = document.querySelector('.timer-dlock_days .span');
   const hoursVal = document.querySelector('.timer-dlock_hours .span');
   const minutesVal = document.querySelector('.timer-dlock_minutes .span');
   const secondsVal = document.querySelector('.timer-dlock_seconds .span');

   const timeCount = () => {
    let now = new Date();
    let leftUntil = newData - now;
    
    let days = Math.floor(leftUntil /1000 / 60 / 60 / 24);
    let hours = Math.floor(leftUntil /1000 / 60 / 60) % 24;
    let minutes = Math.floor(leftUntil /1000 / 60) % 60 ;
    let seconds = Math.floor(leftUntil /1000) % 60;
    
    daysVal.innerHTML = days;
    hoursVal.innerHTML = hours;
    minutesVal.innerHTML = minutes;
    secondsVal.innerHTML = seconds;

   };

   timeCount();
   setInterval(timeCount, 1000);
/* ----------------------------timer--end---------------------------- */
/* --------------------------modal----start--------------------------- */

const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal');


        function openModel() {
          modal.classList.add('show');
          modal.classList.remove('hide');
          document.body.style.overflow = 'hidden';
          clearInterval(modelTimerId);
        }

            modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModel)
        });

                  function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

modal.addEventListener('click', (e) => {
if (e.target === modal || e.target.getAttribute('data-close') == '') {
    closeModal();
}
});
document.addEventListener('keydown', (e) => {
if (e.code === "Escape" && modal.classList.contains('show')) { 
    closeModal();
}
});
const modelTimerId = setTimeout(openModel, 50000);

function showModalByScroll() {
if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
openModel();
window.removeEventListener('scroll', showModalByScroll);
}
}
window.addEventListener('scroll', showModalByScroll);



/* ------------------------------Modal----end---------------------------- */
/* ------------------------form---start---------------------- */

const forms = document.querySelectorAll('form');

const message = {
  loading: "загрузка",
  success: "спасибо! скоро мы с вами свяжемся",
  failure: "что-то пошло не так..."
};

forms.forEach(item => {
  postData(item)
})

function postData(form) {
   form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key) {
        object[key] = value;
      });

      fetch('server.php', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
      }).then(data => data.text())
        .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      })
   });
}
function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal__dialog');

  prevModalDialog.classList.add('hide');
  openModel();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML =`
  <div class="modal__content">
  <div class="modal__close" data-close>×</div>
  <div class="modal__title">${message}</div>
  </div>

  `;
  document.querySelector('.modal').append(thanksModal);
  setTimeout(() => {
thanksModal.remove();
prevModalDialog.classList.add('show');
prevModalDialog.classList.remove('hide');
closeModal();
  }, 4000);
}
/* --------------------------form--end------------------------------ */


});