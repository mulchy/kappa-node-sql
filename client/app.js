// register event listeners and render the initial page
$(document).ready(function() {
  $('form').on('submit', saveToDB);
  getAllPeopleAndRender();
});

function saveToDB(event) {
  // stop the browser's default submit action
  event.preventDefault();

  // store the information in the form in this object
  var formData = {};

  // serialize the form and loop through it's info,
  // creating keys in the formData object as we go
  var formArray = $('form').serializeArray();
  formArray.forEach(function(element){
    formData[element.name] = element.value;
  });

  // send the data to the server to be saved
  $.ajax({
    type: 'POST',
    url: '/people',
    data: formData,
    success: handleSaveResponse
  });
}

function handleSaveResponse(serverResponse) {
  console.log(serverResponse);
  getAllPeopleAndRender();
}

// function to request all the people the server knows about and show them on the page
function getAllPeopleAndRender() {
  $.ajax({
    type: 'GET',
    url: '/people',
    success: render
  });
}

// expects a list of objects with name and address fields
function render(serverResponse) {
  console.log(serverResponse);
  var $people = $('.people');
  $people.empty();
  $people.append('<ol></ol>');
  var $list = $people.children().last();
  serverResponse.forEach(function (element) {
    $list.append('<li>Name: ' + element.name +'\tAddress: ' + element.address + '</li>');
  });
}
