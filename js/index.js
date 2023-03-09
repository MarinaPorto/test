alert("Script")

function fillSelect(field, items) {

  items.forEach((el) => {
    let option = document.createElement("option");
    option.value = el;
    option.text = el;
    field.append(option);
  })
}


function fillSelectWithNumericData(field, min, max) {

  for (var i = min; i <= max; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    field.append(option);
  }
}


// Filling out the dropdown list 'nationality'

const nationalityField = document.getElementById("nationality");

const nationality = ["Australian", "Belgian", "Chinese", "German", "Australian", "Belgian", "Chinese", "German"];

fillSelect(nationalityField, nationality);

// Filling out the dropdown list 'Date of Birth'

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dayField = document.getElementById("day");
const monthField = document.getElementById("month");
const yearField = document.getElementById("year");
fillSelectWithNumericData(dayField, 1, 31)

fillSelect(monthField, month);

fillSelectWithNumericData(yearField, 1990, 2005)