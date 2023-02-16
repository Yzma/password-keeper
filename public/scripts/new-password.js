
$(document).ready(function() {

  const tags = JSON.parse($("#tags-json").text());

  tags.forEach(element => {
    $('#tags-list').append($(`<option>${element.name}</option>`)
      .attr("value", element.name).text(element.name));
  });
  
  const createPasswordForm = $("#create-password-form");
  createPasswordForm.submit((event) => {

    // Stop Javascript from submitting the form
    event.preventDefault();

    const createPasswordData = createPasswordForm.serialize();
    console.log(createPasswordForm);

    $.post(`/users/passwords`, createPasswordData)
      .then((result) => {
        console.log('RESULT creating password:', result);
      }).catch((e) => {
        console.error('Error creating password:', e);
      });
  });

});