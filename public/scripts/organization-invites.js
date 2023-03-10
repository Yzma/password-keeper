
const renderInvite = (org, invite) => {
  const newGridItem = $(`<div class="grid-item">
    <a>ID: ${invite.id}</a><br>
    <a>Created At: ${ new Date(invite.created_at).toLocaleString() }</a><br>
    <a>User ID: ${invite.email}</a><br>
    <button>Cancel Invite</button>
  </div>`);

  newGridItem.click('button', () => {

    const inviteId = invite.id;
    $.ajax({
      url: `/organizations/${org.id}/invites`,
      type: 'DELETE',
      success: (result) => {
        console.log('result', result);
        $(newGridItem).remove();
      },
      error: (e) => {
        console.log('failed to delete', e);
      },
      data: {
        inviteId: inviteId
      }
    });
  });
  return newGridItem;
};

$(document).ready(function() {

  const org = JSON.parse($("#org-json").text());
  const invites = JSON.parse($("#invites-json").text());
  const inviteUserForm = $('#invite-user-form');

  inviteUserForm.submit((event) => {

    // Stop Javascript from submitting the form
    event.preventDefault();

    const usernameData = inviteUserForm.serialize();
    console.log(usernameData);

    $.post(`/organizations/${org.id}/invites`, usernameData)
      .then((result) => {
        console.log('RESULT: ', result);
        // TODO: This doesn't return the correct data to render, we would need to fetch from the invites table again
        // $("#outgoing-invites").append(renderInvite(org, result));
      }).catch((e) => {
        console.error('Error posting tweet:', e);
      });
  });

  const outgoingInvites = $("#outgoing-invites");
  if (invites.length > 0) {
    outgoingInvites.empty();
    outgoingInvites.removeClass('hidden');
    for (let i of invites) {
      console.log(i);
      outgoingInvites.append(renderInvite(org, i));
    }
  }

  console.log(org);
});
