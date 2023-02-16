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
