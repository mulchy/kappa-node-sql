$(document).ready(function() {
  $('form').on('submit', saveToDB);
  getAllPeopleAndRender();
});

function saveToDB(event) {
  event.preventDefault();

  var formData = {};
  var formArray = $('form').serializeArray();
  formArray.forEach(function(element){
    formData[element.name] = element.value;
  });

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

function getAllPeopleAndRender() {
  $.ajax({
    type: 'GET',
    url: '/people',
    success: render
  });
}

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
