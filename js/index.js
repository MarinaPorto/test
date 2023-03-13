function fillSelect(field, items) {
  items.forEach((el) => {
    let option = document.createElement("div");
    option.classList.add('select__item')
    option.innerText = el;
    field.appendChild(option);
  })
}


function fillSelectWithNumericData(field, min, max) {
  for (var i = min; i <= max; i++) {
    let option = document.createElement("div");
    option.classList.add('select__item')
    option.innerText = i;
    field.appendChild(option);
  }
}


// Filling out the dropdown list 'nationality'

const nationalityField = document.getElementById("select-nationality-body");
const nationality = ["Australian", "Belgian", "Chinese", "German", "Australian", "Belgian", "Chinese", "German"];

fillSelect(nationalityField, nationality);

// Filling out the dropdown list 'Date of Birth'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayField = document.getElementById("select-day-body");
const monthField = document.getElementById("select-month-body");
const yearField = document.getElementById("select-year-body");


fillSelectWithNumericData(dayField, 1, 31);
fillSelect(monthField, months);
fillSelectWithNumericData(yearField, 1990, 2005);

//icon animation

const iconBg = document.getElementById("user-icon-bg");

const showIconFill = () => {
  iconBg.classList.add("fill-color")
};

const userIcon = new Vivus(
  'user-icon',
  {
    type: 'oneByOne',
    duration: 250,
  }, showIconFill
)

// create custom select

let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(el => {
    el.addEventListener('click', function () {
      this.parentElement.classList.toggle('active')
    })
  })

  selectItem.forEach(el => {
    el.addEventListener('click', selectValue)
  })

  function selectValue() {
    let text = this.innerText;
    select = this.closest('.select');
    currentText = select.querySelector('.select__current');
    currentText.value = text;
    select.classList.remove('active');
    if (currentText.classList.contains('empty_field')) {
      currentText.classList.remove('empty_field')
    }
  }
};

select();

// fields check

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector(".form__main");

  let userName = document.getElementById('firstName');
  let userSurname = document.getElementById('lastName');
  let userNationality = document.getElementById('nationality-input');
  let userEmail = document.getElementById('email');
  let userPassword = document.getElementById('password');
  let userPasswordConfirmed = document.getElementById('passwordConfirmed');
  let btnSignUp = document.getElementById("btn");
  let btnClear = document.getElementById("clear");
  let radioBtns = document.getElementsByName('gender');
  let gender = "";
  let emptyFields = document.querySelectorAll('.req_field');
  let selectItems = document.querySelectorAll('.select__item');

  const EMAIL_REGEXP = /(.+)@(.+){2,}\.(.+){2,}/;
  const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
  let isValidFields = true;

  function addErrorMessage(field, text) {
    let error = document.createElement("div");
    error.className = 'error';
    error.innerHTML = text;
    field.append(error)
  }


  function removeErrorMessage(field) {
    if (field.querySelector('.error')) {
      field.querySelector('.error').remove()
    }
  }


  form.addEventListener('submit', sendForm);

  async function sendForm(e) {

    e.preventDefault();
  }

  function checkGender() {
    const errorFieldGender = document.querySelector('.filed-title-gender');
    radioBtns.forEach(item => {
      if (item.checked) {
        gender = item.value;
        removeErrorMessage(errorFieldGender);
      }
    })
    if (gender === "") {
      removeErrorMessage(errorFieldGender);
      addErrorMessage(errorFieldGender, "This field is required");
      isValidFields = false;
    }
  }

  radioBtns.forEach(el => {
    el.addEventListener('click', () => {
      removeErrorMessage(document.querySelector('.filed-title-gender'));
    })
  })

  function checkEmptyFields() {
    emptyFields.forEach((el, index) => {
      if (el.value === "" || el.value == undefined) {
        el.classList.add('empty_field')
        isValidFields = false;
      }
      el.addEventListener("change", () => {
        el.classList.remove('empty_field')
      });
    })
  }

  userEmail.addEventListener("focusout", isEmailValid);

  function isEmailValid() {
    const errorFieldEmail = document.querySelector('.filed-title-email');
    if (userEmail.value.match(EMAIL_REGEXP)) {
      removeErrorMessage(errorFieldEmail);
    } else {
      removeErrorMessage(errorFieldEmail);
      addErrorMessage(errorFieldEmail, "Invalid email");
      isValidFields = false;;
    }
  }

  function isPasswordValid() {
    const passwordFied = document.querySelector('.filed-title-password');
    const warningPassword = document.querySelector('.warning');
    warningPassword.style.display = "none";
    if (userPassword.value.match(PASSWORD_REGEXP)) {
      removeErrorMessage(passwordFied);
    } else {
      removeErrorMessage(passwordFied);
      addErrorMessage(passwordFied, "Invalid password");
      isValidFields = false;
    }
  }

  userPassword.addEventListener("focusout", isPasswordValid);
  userPassword.addEventListener("focus", () => {
    const warningPassword = document.querySelector('.warning');
    warningPassword.style.display = "block";
  })
  userPasswordConfirmed.addEventListener("focusout", checkPasswordConfirmed);

  function checkPasswordConfirmed() {
    const warningPasswordConfirmed = document.querySelector('.warning-confirmed ');
    if (userPassword.value !== userPasswordConfirmed.value) {
      warningPasswordConfirmed.style.display = "block";
      isValidFields = false;
    } else {
      warningPasswordConfirmed.style.display = "none";
    }
  }
  const dateField = document.querySelector('.filed-title-date');
  function checkDate() {
    let day = document.getElementById('day').value
    let month = document.getElementById('month').value
    let year = document.getElementById('year').value
    const numberOfMonth = months.findIndex(function (currentValue) {
      return currentValue === month
    })
    let date = new Date(year, numberOfMonth, day)
    if (date.getFullYear() == year && date.getMonth() == numberOfMonth && date.getDate() == day) {
      removeErrorMessage(dateField);
    } else {
      removeErrorMessage(dateField);
      addErrorMessage(dateField, "Invalid date");
      isValidFields = false;
    }
  }

  selectItems.forEach(el => {
    el.addEventListener('click', () => {
      removeErrorMessage(dateField)
    })
  }
  )

  btnSignUp.addEventListener('click', () => {
    isValidFields = true;
    checkGender()
    checkEmptyFields()
    isEmailValid()
    isPasswordValid()
    checkPasswordConfirmed()
    checkDate()
    if (isValidFields) {
    } else {
      btnSignUp.classList.add('btn_animation')
      btnSignUp.addEventListener("animationend", removeBtnAnimation, false);
    }
  })

  function removeBtnAnimation() {
    btnSignUp.classList.remove('btn_animation');
  }
})