// function addBugReportForm() {
//   // Create the button element
//   var button = document.createElement("button");
//   button.setAttribute("type", "button");
//   button.setAttribute("class", "btn btn-primary");
//   button.setAttribute("id", "openForm");
//   button.appendChild(document.createTextNode("Report Bug"));

//   // Create the modal container element
//   var modal = document.createElement("div");
//   modal.setAttribute("class", "modal");
//   modal.setAttribute("id", "myForm");

//   // Create the modal dialog element
//   var modalDialog = document.createElement("div");
//   modalDialog.setAttribute("class", "modal-dialog");

//   // Create the form element
//   var form = document.createElement("form");
//   form.setAttribute("class", "modal-content");
//   form.setAttribute("id", "myFormContent");
//   form.setAttribute("enctype", "multipart/form-data");

//   // Create the modal header
//   var modalHeader = document.createElement("div");
//   modalHeader.setAttribute("class", "modal-header");

//   // Create the modal title
//   var modalTitle = document.createElement("h5");
//   modalTitle.setAttribute("class", "modal-title");
//   modalTitle.appendChild(document.createTextNode("Bug Report Form"));

//   // Create the close button for the modal
//   var closeButton = document.createElement("button");
//   closeButton.setAttribute("type", "button");
//   closeButton.setAttribute("class", "btn-close");
//   closeButton.setAttribute("data-bs-dismiss", "modal");
//   closeButton.setAttribute("aria-label", "Close");

//   // Append the title and close button to the modal header
//   modalHeader.appendChild(modalTitle);
//   modalHeader.appendChild(closeButton);

//   // Create the modal body
//   var modalBody = document.createElement("div");
//   modalBody.setAttribute("class", "modal-body");

//   // Create the description input field
//   var descriptionLabel = document.createElement("label");
//   descriptionLabel.setAttribute("for", "description");
//   descriptionLabel.setAttribute("class", "form-label");
//   descriptionLabel.appendChild(document.createTextNode("Description*:"));

//   var descriptionTextarea = document.createElement("textarea");
//   descriptionTextarea.setAttribute("class", "form-control");
//   descriptionTextarea.setAttribute("id", "description");
//   descriptionTextarea.setAttribute("name", "description");
//   descriptionTextarea.setAttribute("required", "required");
//   descriptionTextarea.setAttribute("style", "height: 80px;");

//   // Create the file input field
//   var fileDiv = document.createElement("div");
//   fileDiv.setAttribute("class", "mb-3");

//   var fileLabel = document.createElement("label");
//   fileLabel.setAttribute("for", "file");
//   fileLabel.setAttribute("class", "form-label");
//   fileLabel.appendChild(document.createTextNode("File(optional):"));

//   var fileInput = document.createElement("input");
//   fileInput.setAttribute("type", "file");
//   fileInput.setAttribute("class", "form-control");
//   fileInput.setAttribute("id", "file");
//   fileInput.setAttribute("name", "file");

//   fileDiv.appendChild(fileLabel);
//   fileDiv.appendChild(fileInput);

//   // Create the take screenshot button
//   var takeScreenshotButton = document.createElement("button");
//   takeScreenshotButton.setAttribute("type", "button");
//   takeScreenshotButton.setAttribute("class", "btn btn-outline-secondary");
//   takeScreenshotButton.setAttribute("id", "take-screenshot");
//   takeScreenshotButton.appendChild(document.createTextNode("Take Screenshot"));

//   // Create the hidden input field for the screenshot
//   var screenshotInput = document.createElement("input");
//   screenshotInput.setAttribute("type", "hidden");
//   screenshotInput.setAttribute("id", "screenshot");
//   screenshotInput.setAttribute("name", "screenshot");

//   // Create the screenshot image element
//   var screenshotImage = document.createElement("img");
//   screenshotImage.setAttribute("id", "screenshot-image");
//   screenshotImage.setAttribute("class", "img-fluid");
//   screenshotImage.setAttribute("src", "");

//   // Create the modal footer
//   var modalFooter = document.createElement("div");
//   modalFooter.setAttribute("class", "modal-footer d-flex justify-content-end");

//   // Create the submit button
//   var submitButton = document.createElement("button");
//   submitButton.setAttribute("type", "submit");
//   submitButton.setAttribute("class", "btn btn-primary");
//   submitButton.setAttribute("id", "modal-submit");
//   submitButton.setAttribute("style", "background-color: #b31b1b;");
//   submitButton.appendChild(document.createTextNode("Submit"));

//   // Create a container div for the buttons
//   var buttonsContainer = document.createElement("div");
//   buttonsContainer.setAttribute("class", "d-flex justify-content-between");

//   // Append the elements to their respective parents
//   modalBody.appendChild(descriptionLabel);
//   modalBody.appendChild(descriptionTextarea);
//   modalBody.appendChild(fileDiv);
//   modalBody.appendChild(takeScreenshotButton);
//   modalBody.appendChild(screenshotInput);
//   modalBody.appendChild(screenshotImage);

//   modalFooter.appendChild(submitButton);

//   form.appendChild(modalHeader);
//   form.appendChild(modalBody);
//   form.appendChild(modalFooter);

//   modalDialog.appendChild(form);

//   modal.appendChild(modalDialog);

//   // Append the button and modal to the document body
//   document.body.appendChild(button);
//   document.body.appendChild(modal);
// }

// function addSRButton() {
//   // Get all the paragraphs in the document
//   var contents = document.querySelectorAll('p,svg,figure');

//   // Add a hidden button after each paragraph
//   // Add a hidden button after each paragraph
//   contents.forEach(function (content) {
//     if (content === contents[0] || content === contents[1] || content === contents[2] || content === contents[4] || content.classList.contains("logomark")) {
//       return;
//     }
//     var button = document.createElement("button");
//     //button.setAttribute("class", "hidden-button");
//     button.setAttribute("class", "sr-only button");
//     button.style.display = "none";
//     button.appendChild(document.createTextNode("Report Bug"));

//     // Insert the button after the paragraph
//     content.parentNode.insertBefore(button, content.nextSibling);

//     var modal = document.getElementById("myForm");
//     modal.setAttribute("role", "dialog");
//     modal.setAttribute("aria-labelledby", "modal-title");
//     // Add click event listener to the hidden button
//     button.addEventListener("click", function (event) {
//       event.preventDefault();
//       modal.style.display = "block";
//       modal.setAttribute("tabindex", "-1"); // Ensure the modal is focusable
//       modal.focus();
//     });
//   });

//   // Add an event listener to the document to listen for keydown events
//   document.addEventListener('keydown', showButtons);
// }

// // Function to show the buttons when the specified key is pressed
// function showButtons(event) {
//   var key = event.key;
//   // Check if the pressed key is the specified key (in this case, 'b')
//   if (key === 'i' || key === 'I') {
//     // Get all the hidden buttons
//     // var buttons = document.getElementsByClassName('hidden-button');
//     var buttons = document.getElementsByClassName('sr-only button');

//     // Show the buttons
//     for (var i = 0; i < buttons.length; i++) {
//       if (buttons[i].style.display === 'none') {
//         buttons[i].style.display = 'inline';
//       } else {
//         buttons[i].style.display = 'none';
//       }
//     }
//   }
// }

// //add a floating banner
// function addFloatingBanner() {
//   // Create header element
//   var header = document.createElement('header');

//   // Create "skip" link
//   var skipLink = document.createElement('a');
//   skipLink.className = 'skip';
//   skipLink.href = '#main';
//   skipLink.textContent = 'Skip to main content';

//   // Create logo image with background color set to transparent
//   var logoImage = document.createElement('img');
//   logoImage.alt = 'logo';
//   logoImage.className = 'logo';
//   logoImage.setAttribute('role', 'presentation');
//   logoImage.style.backgroundColor = 'transparent';
//   logoImage.src = '/static/img/arxiv-logo-one-color-white.svg';

//   // Create logomark image
//   var logomarkImage = document.createElement('img');
//   logomarkImage.alt = 'logo';
//   logomarkImage.className = 'logomark';
//   logomarkImage.setAttribute('role', 'presentation');
//   logomarkImage.src = '/static/img/arxiv-logomark-small-white.svg';

//   // Create header message
//   var headerMessage = document.createElement('div');
//   headerMessage.className = 'header-message';
//   headerMessage.setAttribute('role', 'banner');
//   headerMessage.textContent = 'HTML Beta. We invite your feedback. Click on \'feedback\' button or [keyboard shorcut] to view a list of keyboard commands.';

//   // Create "back to abstract" link
//   var backLink = document.createElement('a');
//   backLink.href = '';
//   backLink.textContent = 'Back to Abstract';

//   //invisible element
//   const invisibleElement = document.createElement('div');
//   invisibleElement.className = 'sr-only keyboard-glossary';

//   // Create the <h2> element
//   const heading = document.createElement('h2');
//   heading.textContent = 'Keyboard commands glossary';

//   // Create the <ul> element
//   const list = document.createElement('ul');

//   // Create the list items and add them to the <ul> element
//   const listItem1 = document.createElement('li');
//   listItem1.textContent = 'List a command here';
//   list.appendChild(listItem1);

//   const listItem2 = document.createElement('li');
//   listItem2.textContent = 'A second command';
//   list.appendChild(listItem2);

//   const listItem3 = document.createElement('li');
//   listItem3.textContent = 'List a third command here';
//   list.appendChild(listItem3);

//   // Append the child elements to the invisible element
//   invisibleElement.appendChild(heading);
//   invisibleElement.appendChild(list);

//   // Append all elements to the header element
//   header.appendChild(skipLink);
//   header.appendChild(logoImage);
//   header.appendChild(logomarkImage);
//   header.appendChild(headerMessage);
//   header.appendChild(backLink);
//   header.appendChild(invisibleElement);

//   // Get the <body> element and append the header element to it
//   var body = document.querySelector('body');
//   body.insertBefore(header, body.firstChild);

//   // Create body-message element for desktop
//   var bodyMessageDesktop = document.createElement('div');
//   bodyMessageDesktop.className = 'body-message';
//   bodyMessageDesktop.setAttribute('role', 'status');

//   // Create close icon
//   var closeIcon = document.createElement('svg');
//   closeIcon.className = 'close-icon';
//   closeIcon.setAttribute('height', '1em');
//   closeIcon.setAttribute('viewBox', '0 0 512 512');
//   closeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//   closeIcon.innerHTML = '<!-- SVG path for close icon -->';

//   // Create paragraph element
//   var paragraph = document.createElement('p');
//   paragraph.textContent = 'The HTML has finished loading. We appreciate your feedback on the accessibility of this content. Use [keyboard shortcut] to view a list of keyboard commands for providing feedback, or click on the “feedback” button.';

//   // Append close icon and paragraph to body-message element
//   bodyMessageDesktop.appendChild(closeIcon);
//   bodyMessageDesktop.appendChild(paragraph);

//   // Create body-message element for mobile
//   var bodyMessageMobile = document.createElement('div');
//   bodyMessageMobile.className = 'body-message-mobile';
//   bodyMessageMobile.setAttribute('role', 'status');

//   // Create mobile close icon
//   var mobileCloseIcon = document.createElement('svg');
//   mobileCloseIcon.className = 'close-icon';
//   mobileCloseIcon.setAttribute('height', '1em');
//   mobileCloseIcon.setAttribute('viewBox', '0 0 512 512');
//   mobileCloseIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//   mobileCloseIcon.innerHTML = '<!-- SVG path for close icon -->';

//   // Create paragraph element for mobile
//   var mobileParagraph = document.createElement('p');
//   mobileParagraph.innerHTML = 'Loading complete. <br><a href=""><svg height="1em" role="presentation" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>We love feedback</a>.';

//   // Append mobile close icon and paragraph to body-message-mobile element
//   bodyMessageMobile.appendChild(mobileCloseIcon);
//   bodyMessageMobile.appendChild(mobileParagraph);

//   var header = document.querySelector('header');
//   var firstElementAfterHeader = header.nextElementSibling;

//   // Insert the new element behind the header
//   document.body.insertBefore(bodyMessageDesktop, firstElementAfterHeader);
//   document.body.insertBefore(bodyMessageMobile, firstElementAfterHeader);
// };

document.addEventListener("DOMContentLoaded", () => {
  addFloatingBanner();
  addBugReportForm();
  

  const modal = document.getElementById('myForm')
  const close = modal.querySelector('.btn-close')

  var isCommandKeyDown = false;
  var saved_dataURI;
  var elementIdentifier;
  var topLayer;
  var previousFocusElement;
  var initiationWay;

  addSRButton();
  handleKeyDown();
  handleKeyUp();
  handleOpenFormClick();
  handleHighlight();
  handleScreenshotClick();
  handleFormSubmit();
  handleCloseClick();
  handleClickOutsideModal();

  function addBugReportForm() {
    var theme = document.documentElement.getAttribute("data-theme");
    // Create the button element
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("id", "openForm");
    button.appendChild(document.createTextNode("Report Bug"));
  
    // Create the modal container element
    var modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", "myForm");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "modal-title");
  
    // Create the modal dialog element
    var modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog");
  
    // Create the form element
    var form = document.createElement("form");
    form.setAttribute("class", "modal-content");
    form.setAttribute("id", "myFormContent");
    form.setAttribute("enctype", "multipart/form-data");
  
    // Create the modal header
    var modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");
  
    // Create the modal title
    var modalTitle = document.createElement("h5");
    modalTitle.setAttribute("class", "modal-title");
    modalTitle.appendChild(document.createTextNode("Bug Report Form"));
  
    // Create the close button for the modal
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    // Append the title and close button to the modal header
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    if(theme==='dark'){
      modalHeader.setAttribute('data-bs-theme',"dark");
    }
  
    // Create the modal body
    var modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
  
    // Create the description input field
    var descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.setAttribute("class", "form-label");
    descriptionLabel.appendChild(document.createTextNode("Description*:"));
  
    var descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.setAttribute("class", "form-control");
    descriptionTextarea.setAttribute("id", "description");
    descriptionTextarea.setAttribute("name", "description");
    descriptionTextarea.setAttribute("required", "required");
    descriptionTextarea.setAttribute("style", "height: 80px;");
  
    // Create the file input field
    var fileDiv = document.createElement("div");
    fileDiv.setAttribute("class", "mb-3");
  
    var fileLabel = document.createElement("label");
    fileLabel.setAttribute("for", "file");
    fileLabel.setAttribute("class", "form-label");
    fileLabel.appendChild(document.createTextNode("File(optional):"));
  
    var fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("class", "form-control");
    fileInput.setAttribute("id", "file");
    fileInput.setAttribute("name", "file");
  
    fileDiv.appendChild(fileLabel);
    fileDiv.appendChild(fileInput);
  
    // Create the take screenshot button
    var takeScreenshotButton = document.createElement("button");
    takeScreenshotButton.setAttribute("type", "button");
    takeScreenshotButton.setAttribute("class", "btn btn-outline-secondary");
    takeScreenshotButton.setAttribute("id", "take-screenshot");
    takeScreenshotButton.appendChild(document.createTextNode("Take Screenshot"));
  
    // Create the hidden input field for the screenshot
    var screenshotInput = document.createElement("input");
    screenshotInput.setAttribute("type", "hidden");
    screenshotInput.setAttribute("id", "screenshot");
    screenshotInput.setAttribute("name", "screenshot");
  
    // Create the screenshot image element
    var screenshotImage = document.createElement("img");
    screenshotImage.setAttribute("id", "screenshot-image");
    screenshotImage.setAttribute("class", "img-fluid");
    screenshotImage.setAttribute("src", "");
  
    // Create the modal footer
    var modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer d-flex justify-content-end");
  
    // Create the submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary");
    submitButton.setAttribute("id", "modal-submit");
    submitButton.setAttribute("style", "background-color: #b31b1b;");
    submitButton.appendChild(document.createTextNode("Submit"));
  
    // Create a container div for the buttons
    var buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "d-flex justify-content-between");
  
    // Append the elements to their respective parents
    modalBody.appendChild(descriptionLabel);
    modalBody.appendChild(descriptionTextarea);
    modalBody.appendChild(fileDiv);
    modalBody.appendChild(takeScreenshotButton);
    modalBody.appendChild(screenshotInput);
    modalBody.appendChild(screenshotImage);
  
    modalFooter.appendChild(submitButton);
  
    form.appendChild(modalHeader);
    form.appendChild(modalBody);
    form.appendChild(modalFooter);
  
    modalDialog.appendChild(form);
  
    modal.appendChild(modalDialog);
  
    // Append the button and modal to the document body
    var theme = document.documentElement.getAttribute("data-theme");

    if(theme==='dark'){
      
    }

    document.body.appendChild(button);
    document.body.appendChild(modal);
  }
  
  // Create SRButton that can open the report modal
  function addSRButton() {
    // Get all the paragraphs in the document
    var contents = document.querySelectorAll('p, svg, figure, .ltx_title, .ltx_authors');
  
    // Add a hidden button after each paragraph
    // Add a hidden button after each paragraph
    contents.forEach(function (content) {
      if (content === contents[0] || content === contents[1] || content === contents[2] || content === contents[4] || content.classList.contains("logomark")) {
        return;
      }
      var button = document.createElement("button");
      //button.setAttribute("class", "hidden-button");
      button.setAttribute("class", "sr-only button");
      button.style.display = "none";
      button.appendChild(document.createTextNode("Report Bug"));

      // handle the focus
      button.addEventListener("focus", function () {
        previousFocusElement = document.activeElement;
      });
  
      // Insert the button after the paragraph
      content.parentNode.insertBefore(button, content.nextSibling);
      // Add click event listener to the hidden button
      button.addEventListener("click", function (event) {
        event.preventDefault();
        generate_whole_screenshot();
        modal.style.display = "block";
        modal.setAttribute("tabindex", "-1"); // Ensure the modal is focusable
        modal.focus();
        initiationWay='screen reader';
      });
    });
  
    // Add an event listener to the document to listen for keydown events
    document.addEventListener('keydown', showButtons);
  }
  
  // Function to show the buttons when the specified key is pressed
  function showButtons(event) {
    var key = event.key;
    // Check if the pressed key is the specified key (in this case, 'b')
    if (key === 'i' || key === 'I') {
      // Get all the hidden buttons
      // var buttons = document.getElementsByClassName('hidden-button');
      var buttons = document.getElementsByClassName('sr-only button');
  
      // Show the buttons
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].style.display === 'none') {
          buttons[i].style.display = 'inline';
        } else {
          buttons[i].style.display = 'none';
        }
      }
    }
  }
  
  //add a floating banner
  function addFloatingBanner() {
    // Create header element
    var header = document.createElement('header');
  
    // Create "skip" link
    var skipLink = document.createElement('a');
    skipLink.className = 'skip';
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
  
    // Create logo image with background color set to transparent
    var logoImage = document.createElement('img');
    logoImage.alt = 'logo';
    logoImage.className = 'logo';
    logoImage.setAttribute('role', 'presentation');
    logoImage.style.backgroundColor = 'transparent';
    logoImage.src = '/static/img/arxiv-logo-one-color-white.svg';
  
    // Create logomark image
    var logomarkImage = document.createElement('img');
    logomarkImage.alt = 'logo';
    logomarkImage.className = 'logomark';
    logomarkImage.setAttribute('role', 'presentation');
    logomarkImage.src = '/static/img/arxiv-logomark-small-white.svg';
  
    // Create header message
    var headerMessage = document.createElement('div');
    headerMessage.className = 'header-message';
    headerMessage.setAttribute('role', 'banner');
    headerMessage.textContent = 'HTML Beta. We invite your feedback. Click on \'feedback\' button or [keyboard shorcut] to view a list of keyboard commands.';
  
    // Create "back to abstract" link
    var backLink = document.createElement('a');
    backLink.href = '';
    backLink.textContent = 'Back to Abstract';
  
    //invisible element
    const invisibleElement = document.createElement('div');
    invisibleElement.className = 'sr-only keyboard-glossary';
  
    // Create the <h2> element
    const heading = document.createElement('h2');
    heading.textContent = 'Keyboard commands glossary';
  
    // Create the <ul> element
    const list = document.createElement('ul');
  
    // Create the list items and add them to the <ul> element
    const listItem1 = document.createElement('li');
    listItem1.textContent = 'List a command here';
    list.appendChild(listItem1);
  
    const listItem2 = document.createElement('li');
    listItem2.textContent = 'A second command';
    list.appendChild(listItem2);
  
    const listItem3 = document.createElement('li');
    listItem3.textContent = 'List a third command here';
    list.appendChild(listItem3);
  
    // Append the child elements to the invisible element
    invisibleElement.appendChild(heading);
    invisibleElement.appendChild(list);
  
    // Append all elements to the header element
    header.appendChild(skipLink);
    header.appendChild(logoImage);
    header.appendChild(logomarkImage);
    header.appendChild(headerMessage);
    header.appendChild(backLink);
    header.appendChild(invisibleElement);
  
    // Get the <body> element and append the header element to it
    var body = document.querySelector('body');
    body.insertBefore(header, body.firstChild);
  
    // Create body-message element for desktop
    var bodyMessageDesktop = document.createElement('div');
    bodyMessageDesktop.className = 'body-message';
    bodyMessageDesktop.setAttribute('role', 'status');
  
    // Create close icon
    var closeIcon = document.createElement('svg');
    closeIcon.className = 'close-icon';
    closeIcon.setAttribute('height', '1em');
    closeIcon.setAttribute('viewBox', '0 0 512 512');
    closeIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    closeIcon.innerHTML = '<!-- SVG path for close icon -->';
  
    // Create paragraph element
    var paragraph = document.createElement('p');
    paragraph.textContent = 'The HTML has finished loading. We appreciate your feedback on the accessibility of this content. Use [keyboard shortcut] to view a list of keyboard commands for providing feedback, or click on the “feedback” button.';
  
    // Append close icon and paragraph to body-message element
    bodyMessageDesktop.appendChild(closeIcon);
    bodyMessageDesktop.appendChild(paragraph);
  
    // Create body-message element for mobile
    var bodyMessageMobile = document.createElement('div');
    bodyMessageMobile.className = 'body-message-mobile';
    bodyMessageMobile.setAttribute('role', 'status');
  
    // Create mobile close icon
    var mobileCloseIcon = document.createElement('svg');
    mobileCloseIcon.className = 'close-icon';
    mobileCloseIcon.setAttribute('height', '1em');
    mobileCloseIcon.setAttribute('viewBox', '0 0 512 512');
    mobileCloseIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    mobileCloseIcon.innerHTML = '<!-- SVG path for close icon -->';
  
    // Create paragraph element for mobile
    var mobileParagraph = document.createElement('p');
    mobileParagraph.innerHTML = 'Loading complete. <br><a href=""><svg height="1em" role="presentation" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>We love feedback</a>.';
  
    // Append mobile close icon and paragraph to body-message-mobile element
    bodyMessageMobile.appendChild(mobileCloseIcon);
    bodyMessageMobile.appendChild(mobileParagraph);
  
    var header = document.querySelector('header');
    var firstElementAfterHeader = header.nextElementSibling;
  
    // Insert the new element behind the header
    document.body.insertBefore(bodyMessageDesktop, firstElementAfterHeader);
    document.body.insertBefore(bodyMessageMobile, firstElementAfterHeader);
  };

  // Code for handling key press to open/close modal
  function handleKeyDown() {
    document.addEventListener('keydown', function (event) {
      // if (event.key.toLowerCase() === 'p') {
      //   //const modal = document.getElementById('myForm')
      //   modal.style.display = 'block';
      // }

      // if (event.key.toLowerCase() === 'i') {
      //   //const modal = document.getElementById('myForm')
      //   modal.style.display = 'none';
      // }

      if (event.key === 'Meta' || event.key === 'Command') {
        isCommandKeyDown = true;
      }

      if (isCommandKeyDown && (event.key === '/' || event.key === '?')) {
        modal.style.display = 'block';
        initiationWay='shortcut';
      }

      if (isCommandKeyDown && (event.key === '}' || event.key === ']')) {
        modal.style.display = 'none';
      }
    });
  }

  // Code for handling key press to open/close modal
  function handleKeyUp() {
    document.addEventListener('keyup', function (event) {
      if (event.key === 'Meta' || event.key === 'Command') {
        isCommandKeyDown = false;
      }
    });
  }

  //click the button and open the modal
  function handleOpenFormClick() {
    document.getElementById('openForm').addEventListener("click", () => {
      modal.style.display = 'block';
      initiationWay='button';
    });
  }

  //The highlight initiation way
  function handleHighlight() {
    document.addEventListener("mouseup", function (event) {
      if (event.target.id === "small-report-button") {
        return;
      }

      var selection = window.getSelection();
      if (selection.toString().trim()) {
        var range=selection.getRangeAt(0);
        removePreviousButton();
        smallButton(selection,range);
        //generate_selected_text(selection,range);
      } else {
        //大问题
        removePreviousButton();
      }
    });
  }

  // Generate the screenshot capturing the selected area.
  function generate_selected_screenshot(range) {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Highlight
    const selectedTextSpan = document.createElement("span");
    selectedTextSpan.style.backgroundColor = "yellow";
    selectedTextSpan.style.color = "black";
    selectedTextSpan.appendChild(range.cloneContents());
    range.deleteContents();
    range.insertNode(selectedTextSpan);

    // Take the screenshot
    html2canvas(document.body, {
      width: viewportWidth,
      height: viewportHeight,
      scrollX: -scrollX,
      scrollY: -scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      scale: 1.0,
      useCORS: true
    }).then((canvas) => {
      // Remove the div element from the DOM
      selectedTextSpan.outerHTML = selectedTextSpan.innerHTML;

      var imageData = canvas.toDataURL("image/png");
      modal.style.display = "block";
      document.getElementById("screenshot").value = imageData;
      const screenshotImage = document.querySelector("#screenshot-image");
      screenshotImage.src = imageData;
      screenshotImage.style = "display: block";
      screenshotImage.style.maxWidth = "300px";
      screenshotImage.style.maxHeight = "300px";

      const enlargedImage = document.createElement("img");
      screenshotImage.addEventListener("click", () => {
        enlargedImage.src = screenshotImage.src;
        enlargedImage.style.position = "fixed";
        enlargedImage.style.top = "50%";
        enlargedImage.style.left = "50%";
        enlargedImage.style.transform = "translate(-50%, -50%)";
        enlargedImage.style.maxWidth = "50%";
        enlargedImage.style.maxHeight = "50%";
        enlargedImage.style.zIndex = "99999";
        enlargedImage.style.cursor = "zoom-out";
        document.body.appendChild(enlargedImage);

        function removeEnlargedImage() {
          document.body.removeChild(enlargedImage);
          document.removeEventListener("click", removeEnlargedImage);
        }

        document.addEventListener("click", (event) => {
          if (event.target !== screenshotImage && event.target !== enlargedImage) {
            removeEnlargedImage();
          }
        });

        enlargedImage.addEventListener("click", () => {
          removeEnlargedImage();
        });
      });

    });
  }

  //get the info of selected text, reset the global variable's value
  function generate_selected_text(selection,range) {
    if (selection.type === 'Range') {
      var anchorNode = selection.anchorNode;
      var parentNode = anchorNode.parentNode;
      var id = parentNode.id;
      var classList = parentNode.classList;
      //if there is no id, than use class to identify
      elementIdentifier = id || classList[0] || 'Unknown';

      //get the topLayer of id
      if (elementIdentifier.match(/^S\d/)) {
        topLayer = id ? id.split('.')[1] : classList[0];
      } else {
        topLayer = id ? id.split('.')[0] : classList[0];
      }

      // Prepare for selected HTML.
      var selectedHtml = '';
      var container = document.createElement('div');
      container.appendChild(range.cloneContents());
      selectedHtml = container.innerHTML;
      // Use the selected text to generate the dataURI
      saved_dataURI = "data:text/html;charset=utf-8," + encodeURIComponent(selectedHtml);
    }
  }

  //remove the previous small button
  function removePreviousButton() {
    const previousButtons = document.querySelectorAll(
      "button[id='small-report-button']"
    );
    for (const button of previousButtons) {
      button.remove();
    }
  }

  //Generate the smallButton for bug report, click and scroll included
  function smallButton(selection) {
    //create small button
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const smallReportButton = document.createElement("button");
    smallReportButton.id = "small-report-button";
    smallReportButton.type = 'button';
    smallReportButton.className = 'btn btn-secondary btn-sm';
    smallReportButton.style.backgroundColor = '#b31b1b';
    smallReportButton.innerHTML = "Report";
    smallReportButton.style.position = "fixed";
    smallReportButton.style.left = `${rect.left + rect.width / 2}px`;

    // Check if there is enough space above the selected text
    if (rect.top > 40) {
      smallReportButton.style.top = `${rect.top}px`;
      smallReportButton.style.transform = "translate(-50%, -100%)";
    } else {
      smallReportButton.style.top = `${rect.top}px`;
      smallReportButton.style.transform = "translate(-50%, 100%)";
    }
    document.body.appendChild(smallReportButton);

    //click small button
    smallReportButton.addEventListener("click", function () {
      initiationWay='highlight';
      generate_selected_screenshot(range);
      generate_selected_text(selection,range);
      modal.style.display = 'block';
      smallReportButton.remove();
    });

    // Handle the window scroll event
    window.onscroll = function () {
      if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        smallReportButton.style.display = "none";
      } else {
        smallReportButton.style.display = "block";
      }
    }
  }

//click screenshot button
function handleScreenshotClick() {
  document.getElementById("take-screenshot").addEventListener("click", function () {
    modal.style.display = 'none';
    generate_whole_screenshot(modal);
  });
}

function generate_whole_screenshot() {
  // Code for taking screenshot and creating download button
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  html2canvas(document.body, {
    width: viewportWidth,
    height: viewportHeight,
    scrollX: -scrollX,
    scrollY: -scrollY,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
    //scale:0.5
  }).then((canvas) => {
    const dataUrl = canvas.toDataURL("image/png");
    modal.style.display = 'block'; // Make sure to display the modal again

    // Set screenshot data in hidden input field or image element
    document.getElementById("screenshot").value = dataUrl;
    document.getElementById("screenshot-image").src = dataUrl;

    // Show screenshot image or input field
    document.getElementById("screenshot-image").style = "display: block";
  });
}

//submit report
function handleFormSubmit() {
  document.getElementById("myFormContent").addEventListener("submit", function (event) {
    event.preventDefault();
    submitBugReport();
  });
}

//submit to the backend, next step: finish
function submitBugReport() {
  //document.getElementById('notification').style = 'display: block';
  const formData = new FormData();
  const metaElement = document.querySelector('meta[property="og:url"]');
  const article_url = metaElement ? metaElement.getAttribute('content') : null;
  const user_info = "account:yc2455 contact:@cornll.edu "
  //report time
  const currentTime = new Date();
  //browser version
  var userAgent = navigator.userAgent;
  var browser = userAgent.match(/(firefox|edge|opr|chrome|safari)[\/]([\d.]+)/i)
  var browserName = browser[1];
  var browserVersion = browser[2];
  var browserInfo = browserName + '/' + browserVersion;

  //device info(system)--give up for now
  //conversion report link
  const start_index = article_url.lastIndexOf('/') + 1;
  const number = article_url.substring(start_index);
  const conversion_report = "https://ar5iv.labs.arxiv.org/log/" + number;
  //source file link
  const source_file = "https://arxiv.org/abs/" + number;
  //location-low
  //location-high
  const data_description = document.getElementById("description").value;
  const screenshotImage = document.getElementById("screenshot").value;
  const attachment = document.querySelector('#file').files[0];
  // add to the form data
  formData.append('article_url', article_url);
  formData.append('user_info', user_info);
  formData.append('reportTime', currentTime);
  formData.append('browserInfo', browserInfo)
  formData.append('conversion_report', conversion_report)
  formData.append('source_file', source_file)
  formData.append('description', data_description);
  formData.append('attachment', attachment);
  formData.append('screenshotImage', screenshotImage);
  formData.append('url', saved_dataURI);
  formData.append('location_low', elementIdentifier);
  formData.append('location_high', topLayer)

  console.log(initiationWay);
  formData.append('initiationWay',initiationWay);
  fetch('/', {
      method: 'POST',
      body: formData
    })
    .then(function (response) {
      if (response.ok) {
        alert('Report submitted');
        document.getElementById("screenshot-image").style = "display: none";
        document.querySelector('#myFormContent').reset(); // Reset the form
        modal.style.display = 'none'
        if(previousFocusElement){
          previousFocusElement.focus();
        }
      } else {
        alert('Error occurs when submitting report');
      }
    })
    .catch(function (error) {
      console.log(error)
      alert('Error occurs when submitting report');
    });
}

//close the modal and reset value
function handleCloseClick() {
  close.addEventListener('click', function (event) {
    modal.style.display = 'none';
    previousFocusElement.focus();
    // Delay the execution of the modal close code by 3 second
    document.getElementById("screenshot").value = "";
    document.getElementById("screenshot-image").src = "";
  });
}

function handleClickOutsideModal() {
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
}

});