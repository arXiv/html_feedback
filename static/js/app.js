function addBugReportForm() {
  // Create the button element
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-primary");
  button.setAttribute("id", "openForm");
  button.appendChild(document.createTextNode("Report Bug"));

  // Create the floating banner element
  //floating banner
    var floatingBanner = document.createElement("aside");
    floatingBanner.className = 'slider-wrapper bps-banner dark';
  
    var divElement =document.createElement('div')
    divElement.className='copy-donation bps-banner';
    // Create the <h1> element
    var h1Element = document.createElement('h1');
    h1Element.textContent = 'BETA DEMO FOR ARXIV';
    // Create the <p> element
    var pElement = document.createElement('p');
    pElement.textContent = 'This is a beta server for arxiv to demo.';
  
    // Append the <h1> and <p> elements to the <div> element
    divElement.appendChild(h1Element);
    divElement.appendChild(pElement);
    
    // Append the <h1> and <p> elements to the <aside> element
    floatingBanner.appendChild(divElement);
  

  // Create the modal container element
  var modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("id", "myForm");

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
  document.body.prepend(floatingBanner);
  document.body.appendChild(button);
  document.body.appendChild(modal);
}

document.addEventListener("DOMContentLoaded", () => {
  addBugReportForm();
  const modal = document.getElementById('myForm')
  //const close = modal.querySelector('.close')
  const close = modal.querySelector('.btn-close')

  let isCommandKeyDown = false;
  // Control Report Box based on the button
  document.addEventListener('keydown', function (event) {
    // Press "p" to open report box
    if (event.key === 'p' || event.key === 'P') {
      const modal = document.getElementById('myForm')
      modal.style.display = 'block';
    }

    // Press "i" to close report box
    if (event.key === 'i' || event.key === 'I') {
      const modal = document.getElementById('myForm')
      modal.style.display = 'none';
    }
    
    // Combination
    if (event.key === 'Meta' || event.key === 'Command') {
      isCommandKeyDown = true;
    }

    if (isCommandKeyDown && (event.key === '/' || event.key === '?')) {
      const modal = document.getElementById('myForm');
      modal.style.display = 'block';
    }

    if (isCommandKeyDown && (event.key === '.' || event.key === '>')) {
      const modal = document.getElementById('myForm');
      modal.style.display = 'none';
    }
  });

  document.addEventListener('keyup', function (event) {
    if (event.key === 'Meta' || event.key === 'Command') {
      isCommandKeyDown = false;
    }
  });

  //click the button and the modal appear
  document.getElementById('openForm').addEventListener("click", () => {
    modal.style.display = 'block'
  });


  let saved_dataURI;
  // Generate the screenshot for capture the selected area.
  function generate_selected_screenshot() {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Get the selected text and save html to selectedHTML.
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Prepare for selected HTML.
    var selectedHtml = '';
    var container = document.createElement('div');
    container.appendChild(range.cloneContents());
    selectedHtml = container.innerHTML;

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

    // Use the selected text to generate the dataURI
    saved_dataURI = "data:text/html;charset=utf-8," + encodeURIComponent(selectedHtml);
  }


  let elementIdentifier;
  let topLayer;
  //highlight selection, next step:optimize the selection element layer, like Table S1.T1, optimize the button format and area, optimize the sensitivity of selection(like mouseup)
  document.addEventListener("mouseup", function (event) {
    if (event.target.id === "small-report-button") {
      return;
    }

    const selectedText = window.getSelection();
    if (selectedText.toString().trim()) {
      // Remove any previous report buttons
      const previousButtons = document.querySelectorAll(
        "button[id='small-report-button']"
      );
      for (const button of previousButtons) {
        button.remove();
      }

      // Determine the position of the selected text
      const range = selectedText.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (selectedText.type === 'Range') {
        var anchorNode = selectedText.anchorNode;
        var parentNode = anchorNode.parentNode;
        var id = parentNode.id;
        var classList = parentNode.classList;
        //if there is no id, than use class to identify
        elementIdentifier = id || classList[0] || 'Unknown';

        //get the topLayer of id
        if (elementIdentifier.match(/^S\d/)) {
          topLayer = id ? id.split('.')[1]: classList[0];
        } else {
          topLayer = id ? id.split('.')[0] : classList[0];
        }

        //print the current element identifier and its toplayer
        //console.log('Selected element identifier:', elementIdentifier);
        //console.log('Top layer identifier:', topLayer);
      }

      // Show the report button
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
      //console.log("Report button added!");
      // Handle the report button click event
      smallReportButton.addEventListener("click", function () {
        //console.log("Report button clicked!");
        generate_selected_screenshot();
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
    } else {
      // Remove the report button
      const smallReportButton = document.querySelector(
        "button[id='small-report-button']"
      );
      if (smallReportButton) {
        smallReportButton.remove();
      }
    }
  });


  //click the button to generate the screenshot, next step: use external library to fasten the process
  // This is different from the screenshot of the selected area.
  document.getElementById("take-screenshot").addEventListener("click", function () {
    modal.style.display = 'none';

    // Capture screenshot of the whole page
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

    let fullPageContent = getFullPageContent();
    let downloadButton2 = document.createElement("a");
    downloadButton2.id = "download-screenshot2";
    downloadButton2.href = "data:text/html;charset=utf-8," + encodeURIComponent(fullPageContent);
    downloadButton2.download = "full-page-content.html";
    downloadButton2.textContent = "Download Full Page Content";
    downloadButton2.style.display = "block";
    downloadButton2.style.margin = "10px";

    document.getElementById("myFormContent").appendChild(downloadButton2);
  });


  //submit to the backend, next step: finish
  function submitBugReport(event) {
    //document.getElementById('notification').style = 'display: block';

    event.preventDefault();
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
        } else {
          alert('Error occurs when submitting report');
        }
      })
      .catch(function (error) {
        alert('Error occurs when submitting report');
      });
  }


  //submit process, next step: finish
  document.getElementById("myFormContent").addEventListener("submit", function (event) {
    submitBugReport(event);
  });

  //Hide the modal
  close.addEventListener('click', function (event) {
    modal.style.display = 'none';
    // Delay the execution of the modal close code by 3 second
    document.getElementById("screenshot").value = "";
    document.getElementById("screenshot-image").src = "";
  });

  // Hide the modal if clicked outside
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  })
});