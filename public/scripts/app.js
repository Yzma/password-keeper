// Client facing scripts here

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
  console.log("view TEXT", $("#view_password_button"));
  $("#view_password_button").click(function (event) {
    alert(
      "Handler for .click() called.",
      $("#view_password_button").data("id")
    );
  });
});
