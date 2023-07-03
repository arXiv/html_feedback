document.addEventListener("DOMContentLoaded", () => {
  // Need to build the modal and the button first.
  addFloatingBanner();
  addBugReportForm();

  const modal = document.getElementById('myForm')
  const close = modal.querySelector('.btn-close')

  var isCommandKeyDown = false;
  var selectedHtml;
  var elementIdentifier;
  var topLayer;
  var previousFocusElement;
  var initiationWay;

  addSRButton();
  handleKeyDown();
  handleKeyUp();
  handleOpenFormClick();
  handleHighlight();
  handleFormSubmit();
  handleCloseClick();
  handleClickOutsideModal();

  // Create the Report Bug Form. Defualt is hidden.
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
    if (theme === 'dark') {
      modalHeader.setAttribute('data-bs-theme', "dark");
    }

    // Create the modal body
    var modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");

    const warningLabel = document.createElement("div");
    warningLabel.id = "warningLabel";
    warningLabel.setAttribute('class', 'form-text');
    warningLabel.textContent = "Warning: Issue reports are not private. If you are an author submitting feedback about a pre-release submission, be advised that the contents of the bug report will be publicly available.";

    // Create the description input field
    var descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    //descriptionLabel.setAttribute("class", "form-label");
    descriptionLabel.appendChild(document.createTextNode("Description*:"));

    var descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.setAttribute("class", "form-control");
    descriptionTextarea.setAttribute("id", "description");
    descriptionTextarea.setAttribute("name", "description");
    descriptionTextarea.setAttribute("required", "required");
    descriptionTextarea.setAttribute("style", "height: 80px;");
    descriptionTextarea.setAttribute("maxlength", "500"); // Set the maximum length to 200 characters
    descriptionTextarea.setAttribute("placeholder", "500 characters maximum");

    // Create the file input field
    var fileDiv = document.createElement("div");
    fileDiv.setAttribute("class", "mb-3");

    //Image Text Label.
    var fileLabel = document.createElement("label");
    fileLabel.setAttribute("for", "file");
    fileLabel.setAttribute("class", "form-label");
    fileLabel.appendChild(document.createTextNode("Image File(optional):"));
    fileDiv.appendChild(fileLabel);

    //Create the file input field
    var fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("class", "form-control");
    fileInput.setAttribute("id", "file");
    fileInput.setAttribute("name", "file");
    fileInput.setAttribute("accept", "image/*"); // Specify the allowed file types
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
    submitButton.appendChild(document.createTextNode("Report with Github"));

    var srSubmit = document.createElement("button");
    srSubmit.setAttribute("type", "submit");
    srSubmit.setAttribute("class", "sr-only button");
    srSubmit.setAttribute("id", "modal-submit-sr");
    srSubmit.appendChild(document.createTextNode("Submit without Github"));


    // Create a container div for the buttons
    var buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "d-flex justify-content-between");

    // Append the elements to their respective parents
    modalBody.appendChild(warningLabel);
    modalBody.appendChild(descriptionLabel);
    modalBody.appendChild(descriptionTextarea);
    // Hide for Phase1.
    // modalBody.appendChild(fileDiv);
    // modalBody.appendChild(takeScreenshotButton);
    // modalBody.appendChild(screenshotInput);
    // modalBody.appendChild(screenshotImage);

    modalFooter.appendChild(srSubmit);
    modalFooter.appendChild(submitButton);

    form.appendChild(modalHeader);
    form.appendChild(modalBody);
    form.appendChild(modalFooter);

    modalDialog.appendChild(form);

    modal.appendChild(modalDialog);

    document.body.appendChild(button);
    document.body.appendChild(modal);
  }

  // Create SRButton.
  function addSRButton() {
    // Get all the paragraphs in the document
    var contents = document.querySelectorAll('p, svg, figure, .ltx_title, .ltx_authors,.ltx_eqn_row');
  
    // Add a hidden button after each paragraph
    contents.forEach(function (content) {
      if (content === contents[0] || content === contents[1] || content === contents[2] || content === contents[4] || content.classList.contains("logomark")) {
        return;
      }
      var button = document.createElement("button");
      button.setAttribute("class", "sr-only button");
      button.style.display = "none";
      button.appendChild(document.createTextNode("Report Bug"));

      // handle the focus
      button.addEventListener("focus", function () {
        previousFocusElement = document.activeElement;
      });
  
      // Insert the button after the paragraph
      content.parentNode.insertBefore(button, content.nextSibling);
      
      // Get the HTML content and its location when the button is clicked
      button.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "block";
        modal.setAttribute("tabindex", "-1"); // Ensure the modal is focusable
        modal.focus();
        initiationWay = 'screen reader';
        
        // Get the HTML content
        var htmlContent = content.innerHTML;
        
        // Print the HTML content and its location
        selectedHtml="data:text/html;charset=utf-8," + encodeURIComponent(htmlContent);
        elementIdentifier=content.id;
      });
    });
  
    // Add an event listener to the document to listen for keydown events
    document.addEventListener('keydown', showButtons);
  }

  // Show or hide the SR buttons.
  function showButtons(event) {
    var key = event.key;
    // Check if the pressed key is the specified key (in this case, 'b')
    if (event.shiftKey && (key === 'b' || key === 'B')) {
      event.preventDefault();
      // Get all the hidden buttons
      // var buttons = document.getElementsByClassName('hidden-button');
      var buttons = document.getElementsByClassName('sr-only button');

      // Show or hide the buttons
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].style.display === 'none') {
          buttons[i].style.display = 'inline';
        } else {
          buttons[i].style.display = 'none';
        }
      }
    }
  }

  // Add floating banner.
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

  // Shortcut to open and close the report box modal.
  function handleKeyDown() {
    document.addEventListener('keydown', function (event) {

      if (event.key === 'Meta' || event.key === 'Command') {
        isCommandKeyDown = true;
      }

      if (isCommandKeyDown && (event.key === '{' || event.key === '[')) {
        event.preventDefault();
        modal.style.display = 'block';
        initiationWay = 'shortcut';
      }

      if (isCommandKeyDown && (event.key === '}' || event.key === ']')) {
        event.preventDefault();
        modal.style.display = 'none';
      }
    });
  }

  // Keyboard detection. (Support other functions)
  function handleKeyUp() {
    document.addEventListener('keyup', function (event) {
      if (event.key === 'Meta' || event.key === 'Command') {
        isCommandKeyDown = false;
      }
    });
  }

  // Open modal when click right-bottom report button.
  function handleOpenFormClick() {
    document.getElementById('openForm').addEventListener("click", () => {
      modal.style.display = 'block';
      initiationWay = 'button';
    });
  }

  // Hanlde the text selection.
  function handleHighlight() {
    document.addEventListener("mouseup", function (event) {
      if (event.target.id === "small-report-button") {
        return;
      }

      var selection = window.getSelection();
      if (selection.toString().trim()) {
        var range = selection.getRangeAt(0);
        removePreviousButton();
        smallButton(selection, range);
        //generate_selected_text(selection,range);
      } else {
        //大问题
        removePreviousButton();
      }
    });
  }

  // Get the info of selected text.
  function generate_selected_text(selection, range) {
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
      selectedHtml = "data:text/html;charset=utf-8," + encodeURIComponent(selectedHtml);
    }
  }

  // Remove the previous small report button.
  function removePreviousButton() {
    const previousButtons = document.querySelectorAll(
      "button[id='small-report-button']"
    );
    for (const button of previousButtons) {
      button.remove();
    }
  }

  // Generate the small report button for bug report.
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
      initiationWay = 'highlight';
      generate_selected_text(selection, range);
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

  // Handle submit form.
  function handleFormSubmit() {
    //users use screen reader click the hidden button
    document.getElementById('modal-submit-sr').addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the form from submitting
      const metaElement = document.querySelector('meta[property="og:url"]');
      const article_url = metaElement ? metaElement.getAttribute('content') : null;
      const user_info = "account:test contact:test@cornll.edu "
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

      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomString = Math.random().toString(36).substring(3, 7); // Random string of 4 characters
      const uniqueId=`${timestamp}_${randomString}`;

      reportDB({
        article_url,
        user_info,
        currentTime,
        browserInfo,
        conversion_report,
        source_file,
        data_description,
        uniqueId
      });
      reportWithoutGitHub({
        article_url,
        user_info,
        currentTime,
        browserInfo,
        conversion_report,
        source_file,
        data_description,
        uniqueId
      });
    });

    //signhted users click on submit button
    document.getElementById('modal-submit').addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the form from submitting

      const metaElement = document.querySelector('meta[property="og:url"]');
      const article_url = metaElement ? metaElement.getAttribute('content') : null;
      const user_info = "account:test contact:test@cornll.edu "
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

      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomString = Math.random().toString(36).substring(3, 7); // Random string of 4 characters
      const uniqueId=`${timestamp}_${randomString}`;
      console.log("uniqueId",uniqueId);

      reportDB({
        article_url,
        user_info,
        currentTime,
        browserInfo,
        conversion_report,
        source_file,
        data_description,
        uniqueId
      });
      reportWithGitHub({
        article_url,
        user_info,
        currentTime,
        browserInfo,
        conversion_report,
        source_file,
        data_description,
        uniqueId
      });
    });
  }

  //Report info to databse
  function reportDB(obj) {
    //add the info to form
    const formData = new FormData();
    formData.append('article_url', obj.article_url);
    formData.append('user_info', obj.user_info);
    formData.append('reportTime', obj.currentTime);
    formData.append('browserInfo', obj.browserInfo);
    formData.append('conversion_report', obj.conversion_report);
    formData.append('source_file', obj.source_file);
    formData.append('description', obj.data_description);
    formData.append('selectedHtml', selectedHtml);
    formData.append('location_low', elementIdentifier);
    formData.append('location_high', topLayer);
    formData.append('initiationWay', initiationWay);
    formData.append('uniqueId',obj.uniqueId);

    //post
    fetch('/', {
        method: 'POST',
        body: formData
      })
      .then(function (response) {
        if (response.ok) {
          alert('Report submitted');
          document.querySelector('#myFormContent').reset(); // Reset the form
          modal.style.display = 'none'
          if (previousFocusElement) {
            previousFocusElement.focus();
          }
        } else {
          alert('Error occurs when submitting report');
        }
      })
      .catch(function (error) {
        console.error('An error occurred:', error);
      });
  }

  // Hadnle github report issue when click visible the button(Report with GitHub).
  function reportWithGitHub(obj) {
    const article_url_issue = "**article_url**: " + obj.article_url + "\n\n";
    const user_info_issue = "**user_info**: " + obj.user_info + "\n\n";
    const reportTime_issue = "**reportTime**: " + obj.currentTime + "\n\n";
    const browserInfo_issue = "**browserInfo**: " + obj.browserInfo + "\n\n";
    const conversion_report_issue = "**conversion_report**: " + obj.conversion_report + "\n\n";
    const source_file_issue = "**source_file**: " + obj.source_file + "\n\n";
    const description_issue = "**description**: " + obj.data_description + "\n\n";
    var htmlText_issue = "**htmlText**: " + selectedHtml + "\n\n"; // Make sure saved_dataURI is defined
    const location_low_issue = "**location_low**: " + elementIdentifier + "\n\n"; // Make sure elementIdentifier is defined
    const location_high_issue = "**location_high**: " + topLayer + "\n\n"; // Make sure topLayer is defined
    const initiationWay_issue = "**initiationWay**: " + initiationWay + "\n\n"; // Make sure initiationWay is defined
    const uniqueId_issue= "**uniqueId**: " + obj.uniqueId + "\n\n";
  
    // Add all GitHub issue variables to the body.
    var autoFillData = "\n# Auto Fill Data \n\n" + article_url_issue + reportTime_issue + browserInfo_issue + description_issue + conversion_report_issue + source_file_issue + htmlText_issue + location_low_issue + location_high_issue + initiationWay_issue+uniqueId_issue;
    const userDescription = "Feel free attach a screenshot (or document) link below:.\n\n";
    var body = userDescription + autoFillData;
    const article_number = obj.article_url.substring(obj.article_url.lastIndexOf('/') + 1);
    const encodedTitle = encodeURIComponent("Improve article " + article_number);
    var encodedBody = encodeURIComponent(body);

    var link = "https://github.com/arXiv/html_feedback/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=" + encodedTitle + "&body=" + encodedBody;
    //console.log("previous link length",link.length);

    if(link.length>=8000){
      htmlText_issue= "**htmlText**: " + selectedHtml.substring(0, 4000) + "\n\n";
      //console.log("html_?length",htmlText_issue.length);
      autoFillData = "\n# Auto Fill Data \n\n" + article_url_issue + reportTime_issue + browserInfo_issue + description_issue + conversion_report_issue + source_file_issue + htmlText_issue + location_low_issue + location_high_issue + initiationWay_issue+uniqueId_issue;
      body = userDescription + autoFillData;
      encodedBody=encodeURIComponent(body);
      //console.log("auto_fill",autoFillData.length);
      //console.log("body",body.length);

      link="https://github.com/arXiv/html_feedback/issues/newassignees=&labels=bug&projects=&template=bug_report.md&title=" + encodedTitle + "&body=" + encodedBody;
    }
    //console.log("link length now",link.length);
    window.open(link, '_blank');
  }

  // Handle github report issue when click invisible the button(Report without GitHub).
  async function reportWithoutGitHub(obj) {
    try {
      // Get the info
      const article_url_issue = "**article_url**: " + obj.article_url + "\n\n";
      const user_info_issue = "**user_info**: " + obj.user_info + "\n\n";
      const reportTime_issue = "**reportTime**: " + obj.currentTime + "\n\n";
      const browserInfo_issue = "**browserInfo**: " + obj.browserInfo + "\n\n";
      const conversion_report_issue = "**conversion_report**: " + obj.conversion_report + "\n\n";
      const source_file_issue = "**source_file**: " + obj.source_file + "\n\n";
      const description_issue = "**description**: " + obj.data_description + "\n\n";
      const htmlText_issue = "**htmlText**: " + selectedHtml + "\n\n";
      const location_low_issue = "**location_low**: " + elementIdentifier + "\n\n";
      const location_high_issue = "**location_high**: " + topLayer + "\n\n";
      const initiationWay_issue = "**initiationWay**: " + initiationWay + "\n\n";
      const uniqueId_issue= "**uniqueId**: " + obj.uniqueId + "\n\n";
  
      // Add all GitHub issue variables to the body.
      const autoFillData = "\n## Auto Fill Data \n\n" + article_url_issue + reportTime_issue + browserInfo_issue + description_issue + conversion_report_issue + source_file_issue + htmlText_issue + location_low_issue + location_high_issue + initiationWay_issue+uniqueId_issue;
      const userDescription = "\n## Description \n\n" + "Description of issue:\n\n Please attach a screenshot (or document) if possible.\n\n";
      const title_issue = "# Bug Report \n ";
      const body = title_issue + userDescription + autoFillData;
      const title = "Improve article " + obj.article_url.substring(obj.article_url.lastIndexOf('/') + 1);

      // Need to update the token
      const owner = "yaxuanhuang0710";
      const repo = "test";
      //const accessToken = 'Replace with Token';
      const accessToken='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'
      const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/vnd.github.v3+json',
      };
      const data = {
        title: title,
        body: body
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });

      if (response.status === 201) {
        // GitHub issue created successfully.
      } else {
        throw new Error('Error occurs when submitting report using GitHub.');
      }
    } catch (error) {
      if (error.message.includes("Unchecked runtime.lastError")) {
        // Handle the specific error scenario you mentioned
        alert("An error occurred: The message channel closed before a response was received.");
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  // Close the report box modal and reset value
  function handleCloseClick() {
    close.addEventListener('click', function (event) {
      modal.style.display = 'none';
      if (previousFocusElement) {
        previousFocusElement.focus();
      }
      // Delay the execution of the modal close code by 3 second
      // Hide for Phase1
      //document.getElementById("screenshot").value = "";
      //document.getElementById("screenshot-image").src = "";
    });
  }

  // Hanlde click outside the report box modal.
  function handleClickOutsideModal() {
    window.addEventListener('click', function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  }

});