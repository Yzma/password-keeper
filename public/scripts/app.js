// Client facing scripts here
let endpoint = "/new_password";

function copyPassword() {
  let copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}

$(document).ready(function () {
  $("#copy_password_button").click(copyPassword);
});

function viewPassword() {
  let viewText = document.getElementById("password");
  viewText.select();
  console.log("view TEXT", $({ viewText }));
  navigator.clipboard.writeText(viewText.value);
  alert("Password Info: " + viewText.value);
}

$(document).ready(function () {
  console.log("document", document);
  const user = JSON.parse($("#user-json").text());
  const passwords = JSON.parse($("#passwords-json").text());
  console.log("view TEXT", $(".view_password_button"));
  $(".view_password_button").click(function () {
    console.log("showing");
    $(this).next().toggleClass("hide");
    console.log($(".password"));
    if (user.id) {
    } else {
      res.redirect("/passwords");
    }
  });
});

///////////////// CREATE NEW TAG //////////////////////////////////////////////////

$(document).ready(() => {
  const renderTags = function (tag) {
    tags.forEach((tag) => {
      const $newTag = createTagElement(tag);
      $("#tag-options").append($newTag);
    });
  };

  $("#tag-options").on("submit", function (e) {
    e.preventDefault();
    $(this).find("p").hide().slideDown("slow");
    const characTextarea = $(this).find("textarea").val().length;

    if (characTextarea < 1) {
      const error_msg = "You cannot create an empty tag.";
      return displayError(error_msg);
    }
    $.ajax({
      method: "POST",
      url: endpoint,
      type: "application/json",
      data: $(this).serialize(),
      success: function () {
        const apiAddress = "http://localhost:8080/organizations";
        $("textarea").val("");
        $(".error_msg").hide();
        $.get(apiAddress, (data) => {
          const newTag = [data.slice(-1).pop()];
          renderTags(newTag);
        });
      },
    });
  });

  const loadTags = function () {
    $.ajax("/orgs", { method: "GET" }).then(function (tag) {
      renderTags(tag);
    });
  };
  loadTags();

  const createTagElement = (tagData) => {
    const { user, content, created_at } = tagData;
    let singleTagElement = $(`
    <article class="tag-component">
      <!-- image-username-refkey -->
      <div class="image-username-refkey">
        <div class="image-username">
          <span>${user.name}</span>
        </div>
        <div>${user.handle}</div>
        </div>
      <!-- tag content -->
      <div class="tag-content">
        <!-- <p>${content.text}</p> -->
        ${$("<p>").text(content.text).html()}
      </div>
    </article>
    `);
    return singleTagElement;
  };
  $(".new-tag").hide();
});

////////////////////////////////////////////////////////////////////////////
// const generateBoxPassword = (passwords) => {
//   const newBoxItem = $(`<div class="password-item">
//     <a href="/passwords/${passwords.id}/passwords">ID: ${passwords.website_name}</a><br>
//   </div>`);
//   console.log("Passwords:   :", passwords);
//   return newBoxItem;
// };

// $(document).ready(function() {
//   const newBox = JSON.parse($("#passwords-json").text());

//   organizations.forEach(element => {
//     $("#passwords").append(renderOrganization(element));
//   });

//   const newBoxForm = $('#new_password_form');

//   newBoxForm.submit((event) => {

//     // Stop Javascript from submitting the form
//     event.preventDefault();

//     const boxFormData = newBoxForm.serialize();
//     console.log(boxFormData);

//     $.post(`/passwords/`, boxFormData)
//       .then((result) => {
//         console.log('RESULT: ', result);
//         window.location.href = `/passwords/${result.rows[0].data.passwords}/passwords`;
//       }).catch((e) => {
//         console.error('Error posting new box:', e);
//       });
//   });
// });

////////////////////////////////////////////////////////////////////////////

// const renderBoxPassword = (passwords) => {
//   const newBoxItem = $(`<div class="password-item">
//     <a>ID: ${passwords.id}</a><br>
//     <a>User ID: ${passwords.website_name}</a><br>
//     <button>Open</button>
//   </div>`);

//   newBoxItem.click('button', () => {

//     const passwordItem = passwords.id;
//     $.ajax({
//       url: `/passwords/${passwords.id}`,
//       type: 'DELETE',
//       success: (result) => {
//         console.log('result', result);
//         $(newBoxItem).remove();
//       },
//       error: (e) => {
//         console.log('failed to delete', e);
//       },
//       data: {
//         passwordId: passwordId
//       }
//     });
//   });
//   return newBoxItem;
// };

// $(document).ready(function() {

//   const passwords = JSON.parse($("#passwords-json").text());
//   const website_name = JSON.parse($("#website_name-json").text());
//   const passwordForm = $('#passwordForm-form');

//   passwordForm.submit((event) => {

//     // Stop Javascript from submitting the form
//     event.preventDefault();

//     const userPasswordData = passwordForm.serialize();
//     console.log(userPasswordData);

//     $.post(`/passwords/${passwords.id}`, userPasswordData)
//       .then((result) => {
//         console.log('RESULT: ', result);
//         // TODO: This doesn't return the correct data to render, we would need to fetch from the invites table again
//         // $("#outgoing-invites").append(renderInvite(org, result));
//       }).catch((e) => {
//         console.error('Error creating box:', e);
//       });
//   });

//   const createBoxPassword = $("#createBoxPassword");
//   if (passwords.length > 0) {
//     createBoxPassword.empty();
//     createBoxPassword.removeClass('hidden');
//     for (let i of passwords) {
//       console.log(i);
//       createBoxPassword.append(renderBoxPassword(passwords, i));
//     }
//   }

//   console.log(passwords);
// });

const userLogout = function () {
  return $.ajax({
    method: "POST",
    url: "/auth/logout",
  });
};

const userRegistration = function (data) {
  return $.ajax({
    method: "POST",
    url: "/auth/register",
    data,
  });
};

const getUserOrgs = function () {
  return $.ajax({
    url: "/users/organizations",
  });
};

const joinOrg = function (data) {
  return $.ajax({
    method: "POST",
    url: "/users/invites",
    data,
  });
};

const orgRegistration = function (data) {
  return $.ajax({
    method: "POST",
    url: "/organizations/register",
    data,
  });
};

const getUserInfo = function () {
  return $.ajax({
    url: "/api/user",
  });
};

const generatePassword = function (data) {
  return $.ajax({
    method: "POST",
    url: "/api/generate-password",
    data,
  });
};

const getOrgInfo = function () {
  return $.ajax({
    url: "/api/organization",
  });
};

const getUsersInOrg = function () {
  return $.ajax({
    url: "/api/manage",
  });
};

const removeUserFromOrg = function (data) {
  return $.ajax({
    method: "DELETE",
    url: "/api/manage",
    data,
  });
};
