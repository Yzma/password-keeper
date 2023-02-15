$(document).ready(function() {

  const org = JSON.parse($("#org-json").text());
  const inviteUserForm = $('#invite-user-form');

  inviteUserForm.submit((event) => {

    // Stop Javascript from submitting the form
    event.preventDefault();

    const usernameData = inviteUserForm.serialize();
    console.log(usernameData);

    $.post(`/organizations/${org.id}/invites`, usernameData)
      .then((result) => {
        console.log('RESULT: ', result);
        // TODO: Show HTML that the user was invited
      }).catch((e) => {
        // TODO: Show HTML that the user was not found
        console.error('Error posting tweet:', e);
      });
  });

  console.log(org);
});