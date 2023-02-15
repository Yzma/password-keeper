
const fetchOrganizationOutgoingInvites = (org, callback) => {
  $.get(`/organizations/${org.id}/invites`)
    .then((result) => {
      callback(null, result);
    }).catch((e) => {
      callback(e, null);
    });
};

const renderInvite = (invite) => {
  return `<div class="grid-item">
    <a>ID: ${invite.id}</a>
    <a>Created At: ${invite.created_at}</a>
    <a>User ID: ${invite.user_id}</a>
  </div>`;
};

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

  fetchOrganizationOutgoingInvites(org, (error, result) => {
    if (error) {
      console.log('error loading pending invites', error);
      return;
    }

    console.log('loaded: ', result);

    const outgoingInvites = $("#outgoing-invites");
    if (result.length > 0) {
      outgoingInvites.removeClass('hidden');
      for (let i of result) {
        console.log(i);
        outgoingInvites.append(renderInvite(i));
      }
    }
  });

  console.log(org);
});