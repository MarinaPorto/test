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

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayField = document.getElementById("select-day-body");
const monthField = document.getElementById("select-month-body");
const yearField = document.getElementById("select-year-body");


fillSelectWithNumericData(dayField, 1, 31);
fillSelect(monthField, month);
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
    currentText.innerText = text;
    select.classList.remove('active');
  }
};

select();
