

$(document).ready(function() {
  const password = JSON.parse($("#password-json").text());

  console.log(password[0]);

  $("#websiteName").val(password[0].website_name);
  $("#username").val(password[0].username);
  $("#password").val(password[0].password);
  $("#tagId").val(password[0].tag_name);


  $('#toggle_visibility_button').click((event) => {
    const type = $("#password").attr('type');
    if (type === "password") {
      $("#password").attr('type', 'text');
    } else {
      $("#password").attr('type', 'password');
    }
  });

  // Page address:<br>
  //         <input type="text" name="websiteName" placeholder="Page address" required><br><br>
  //         Username:<br>
  //         <input type="text" name="username" placeholder="Username" required><br><br>
  //         Password:<br>
  //         <input id="password" type="password" name="password" placeholder="Password" required>
  //         <button type="button" class="Copy" id='copy_password_button'>Copy Password</button>
  //         <button type="button" class="" id='toggle_visibility_button'>Toggle Visibility</button><br><br></br>

  //         Tag:<br>
  //           <input type="text" name="tagId" list="tags-list" />
  //           <datalist id="tags-list">
  //           </datalist><br><br>
  //           <button type="submit">Save New password</button>


  // organizations.forEach(element => {
  //   $("#my-organizations").append(renderOrganization(element));
  // });

  // const newOrganizationForm = $('#new_organization_form');

  // newOrganizationForm.submit((event) => {

  //   // Stop Javascript from submitting the form
  //   event.preventDefault();

  //   const formData = newOrganizationForm.serialize();
  //   console.log(formData);

  //   $.post(`/organizations/`, formData)
  //     .then((result) => {
  //       console.log('RESULT: ', result);
  //       window.location.href = `/orgs/${result.rows[0].organization_id}/passwords`;
  //     }).catch((e) => {
  //       console.error('Error posting tweet:', e);
  //     });
  // });
});
