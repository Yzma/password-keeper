// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      const $usersList = $('#users');
      $usersList.empty();

      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});

// $(() => {
//   const $main = $('#main-content');

//   window.views_manager = {};

//   window.views_manager.show = function(item) {
//     $homepage.detach();
//     $loginForm.detach();
//     $signupForm.detach();
//     $orgLoginForm.detach();
//     $orgSignupForm.detach();
//     $editUserForm.detach();
//     $addAccountForm.detach();
//     $generatePasswordForm.detach();
//     $getAllAccounts.detach();
//     $editAccountForm.detach();
//     $editOrgForm.detach();
//     $manageOrg.detach();
//     $joinOrgForm.detach();
//     $footer.detach();

//     switch (item) {
//       case 'homepage':
//         $homepage.appendTo($main);
//         $footer.insertAfter($main);
//         break;
//       case 'signup':
//         $signupForm.appendTo($main);
//         $('.sign-up-org-error').slideUp(10);
//         $('.sign-up-blank-error').slideUp(10);
//         $('.sign-up-exists-error').slideUp(10);
//         $('.first-name').val('');
//         $('.last-name').val('');
//         $('.signup-email').val('');
//         $('.signup-password').val('');
//         $('.org-key').val('');
//         break;
//       case 'login':
//         $loginForm.appendTo($main);
//         $('.login-error').slideUp(10);
//         $('.login-blank-error').slideUp(10);
//         $('.login-email').val('');
//         $('.login-password').val('');
//         break;
//       case 'orgLogin':
//         $orgLoginForm.appendTo($main);
//         $('.login-error').slideUp(10);
//         $('.login-blank-error').slideUp(10);
//         $('.org-login-email').val('');
//         $('.org-login-password').val('');
//         $('.org-login-master-password').val('');
//         break;
//       case 'orgSignup':
//         $orgSignupForm.appendTo($main);
//         $('.sign-up-blank-error').slideUp(10);
//         $('.sign-up-org-exists-error').slideUp(10);
//         $('.org-name').val('');
//         $('.org-abbrev').val('');
//         $('.org-email').val('');
//         $('.org-password').val('');
//         $('.org-master-password').val('');
//         break;
//       case 'allAccounts':
//         addAccountToTable();
//         break;
//       case 'editUser':
//         $editUserForm.appendTo($main);
//         createEditUserForm();
//         break;
//       case 'addAccount':
//         $addAccountForm.appendTo($main);
//         $('.empty-fields-error').slideUp();
//         $('#email-username').val('');
//         $('#account-password-field').val('');
//         $('#website').val('https://');
//         $('#account-type-dropdown').val('1');
//         $('.password-option0').val('12');
//         $('#generate-account-container').hide();
//         $('.password-option').prop('checked', false);
//         $('#password-option1').prop('checked', true);
//         $('#account-password-field').prop('type', 'password');
//         break;
//       case 'generatePassword':
//         $generatePasswordForm.appendTo($main);
//         $('#password-length-value').val('12');
//         $('#password-option0').val('12');
//         $('.password-option').prop('checked', false);
//         $('#password-option1').prop('checked', true);
//         $('#new-password').val('');
//         break;
//       case 'editAccount':
//         $editAccountForm.appendTo($main);
//         break;
//       case 'editOrg':
//         $editOrgForm.appendTo($main);
//         createEditOrgForm();
//         break;
//       case 'manageOrg':
//         $manageOrg.appendTo($main);
//         addUsersToTable();
//         break;
//       case 'joinOrg':
//         $joinOrgForm.appendTo($main);
//         $('.org-key-error').slideUp(10);
//         $('.empty-fields-error').slideUp(10);
//         $('.org-joined-error').slideUp(10);
//         $('#org-key').val('');
//         break;
//     }
//   };

//   const escape = function(content) {
//     const div = document.createElement('div');
//     div.appendChild(document.createTextNode(content));
//     return div.innerHTML;
//   };


//   window.escape = escape;
// });
