$(document).ready(function() {

  const passwords = JSON.parse($("#passwords-json").text());
 
  console.log(passwords);
  if (passwords.length > 0) {
    const passwordContainer = $("#password-container");

    passwords.forEach(i => {
      let category = passwordContainer.find(`#${i.tag_id}`);
      if (!category.length) {
        category = $(`<div class="password-holder" id="${i.tag_id}">
        <div class="password-header">${i.tag_id}</div>
        </div>`).appendTo(passwordContainer);
      }

      category.append(`<div class="grid-item">${i.tag_id}</div>`);
      //category.find(`#${i.tag_id}`).append(`<div class="grid-item">${i.tag_id}- ${i.website_name}</div>`);
      
    });

    // passwords.forEach(i => {
    //   let category = passwordContainer.find(`#${i.tag_id}`);
    //   if (!category.length) {
    //     category = $(`<div class="password-header" id="${i.tag_id}">${i.tag_id}</div>`).appendTo(passwordContainer);
    //   }

    //   category.append(`<div class="grid-item">${i.tag_id}</div>`);
    //   //category.find(`#${i.tag_id}`).append(`<div class="grid-item">${i.tag_id}- ${i.website_name}</div>`);
      
    // });
  }
});


{/* <p>sadddddddddddddddddddddddddddddd</p>
  <div class="grid-container">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
  </div>

  <p>sadddddddddddddddddddddddddddddd</p>
  <div class="grid-container">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
  </div> */}