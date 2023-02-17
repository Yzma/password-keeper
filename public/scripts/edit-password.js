
$(document).ready(function() {

  const tags = JSON.parse($("#tags-json").text());
  const org = $("#org-json").length > 0 ? JSON.parse($("#org-json").text())[0] : undefined;

  const password = JSON.parse($("#password-json").text());

  console.log(password[0]);

  $("#websiteName").val(password[0].website_name);
  $("#username").val(password[0].username);
  $("#password").val(password[0].password);
  $("#tagId").val(password[0].tag_name);

  console.log(org);

  tags.forEach(element => {
    $('#tags-list').append($(`<option>${element.name}</option>`)
      .attr("value", element.name).text(element.name));
  });

  const createPasswordForm = $("#create-password-form");
  createPasswordForm.submit((event) => {

    // Stop Javascript from submitting the form
    event.preventDefault();

    const createPasswordData = createPasswordForm.serialize();
    console.log(createPasswordData);

    $.ajax({
      url: org ? `/organizations/${org.id}/passwords` : `/users/passwords`,
      type: 'PATCH',
      success: (result) => {
        console.log('result', result);
        //$(newGridItem).remove();
      },
      error: (e) => {
        console.log('failed to update', e);
      },
      data:
        createPasswordData
      
    });

    // $.post(org ? `/organizations/${org.id}/passwords` : `/users/passwords`, createPasswordData)
    //   .then((result) => {
    //     console.log('RESULT creating password:', result);
    //     window.location.href = org ? `/orgs/${org.id}/passwords` : `/passwords`;
    //   }).catch((e) => {
    //     console.error('Error creating password:', e);
    //   });
  });

  const options = {
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
    length: 8
  };

  const pm = new PasswordGenerator(options);
  const passwordField = $("#password");

  $("#password-length-output").text(`(${pm.options.length})`);
  $("#lowercase").attr('checked', pm.options.lowercase);
  $("#uppercase").attr('checked', pm.options.uppercase);
  $("#numbers").attr('checked', pm.options.numbers);
  $("#symbols").attr('checked', pm.options.symbols);

  $("#password-checkbox-options").on('change', (e) => {
    console.log($("#symbols").is(":checked"));
    pm.setOptions({
      ...pm.options,
      lowercase: $("#lowercase").is(":checked"),
      uppercase: $("#uppercase").is(":checked"),
      numbers: $("#numbers").is(":checked"),
      symbols: $("#symbols").is(":checked"),
    });
    console.log(pm.options);
  });

  $('#generate-password').click((event) => {
    const pass = pm.generatePassword();
    passwordField.val(pass);
  });

  $('#toggle_visibility_button').click((event) => {
    const type = passwordField.attr('type');
    if (type === "password") {
      passwordField.attr('type', 'text');
    } else {
      passwordField.attr('type', 'password');
    }
  });

  $("#password-length").on('input', (e) => {
    const passLength = $("#password-length").val();
    $("#password-length-output").text(`(${passLength})`);
    pm.setOptions({
      ...pm.options,
      length: passLength
    });
  });
});



class PasswordGenerator {

  constructor(options) {
    this.setOptions(options);
  }

  setOptions(options) {
    this.options = options;

    let result = [];
    const uppercaseCodePoints = this.range(65, 90);
    const lowercaseCodePoints = this.range(97, 122);
    const numberCodePoints = this.range(49, 57);
    const symbolCodePoints = [this.range(33, 47), this.range(58, 64), this.range(91, 96)];

    if (this.options.uppercase) {
      result = result.concat(uppercaseCodePoints);
    }

    if (this.options.lowercase) {
      result = result.concat(lowercaseCodePoints);
    }

    if (this.options.numbers) {
      result = result.concat(numberCodePoints);
    }

    if (this.options.symbols) {
      result = result.concat(symbolCodePoints.flat());
    }

    this.shuffleArray(result);

    this.cachedPasswordArray = result;
  }

  generatePassword() {

    let password = '';
    for (let i = 0; i < this.options.length; i++) {
      password += this.cachedPasswordArray[this.randomInt(0, this.cachedPasswordArray.length)];
    }

    return password;
  }

  // ref: https://stackoverflow.com/a/12646864/1090359
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.randomInt(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  range(num1, num2) {
    let result = [];
    let counter = 0;
    for (let i = num1; i <= num2; i++) {
      result[counter++] = String.fromCharCode(i);
    }
    return result;
  }

  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}