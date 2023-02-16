
const renderOrganization = (org) => {
  const newGridItem = $(`<div class="grid-item">
    <a href="/orgs/${org.id}/passwords">${org.org_name}</a><br>
  </div>`);
  return newGridItem;
};

$(document).ready(function() {
  const organizations = JSON.parse($("#org-json").text());

  organizations.forEach(element => {
    $("#my-organizations").append(renderOrganization(element));
  });

  const newOrganizationForm = $('#new_organization_form');

  newOrganizationForm.submit((event) => {

    // Stop Javascript from submitting the form
    event.preventDefault();

    const formData = newOrganizationForm.serialize();
    console.log(formData);

    $.post(`/organizations/`, formData)
      .then((result) => {
        console.log('RESULT: ', result);
        window.location.href = `/orgs/${result.rows[0].organization_id}/passwords`;
      }).catch((e) => {
        console.error('Error posting tweet:', e);
      });
  });
});
