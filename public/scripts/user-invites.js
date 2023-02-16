
const renderInvite = (invite) => {
  const newGridItem = $(`<div class="grid-item">
    <a>ID: ${invite.id}</a><br>
    <a>Created At: ${ new Date(invite.created_at).toLocaleString() }</a><br>
    <a>User ID: ${invite.email}</a><br>
    <button id="decline">Cancel Invite</button>
    <button id="accept">Accept Invite</button>
  </div>`);

  newGridItem.click('button', () => {
    
    const inviteId = invite.id;
    $.ajax({
      url: `/users/invites`,
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

  const invites = JSON.parse($("#invites-json").text());

  const outgoingInvites = $("#pending-invites");
  if (invites.length > 0) {
    outgoingInvites.removeClass('hidden');
    for (let i of invites) {
      console.log(i);
      outgoingInvites.append(renderInvite(i));
    }
  }
});