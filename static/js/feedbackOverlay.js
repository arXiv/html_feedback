function detectColorScheme() {
    var theme="light";
    var current_theme = localStorage.getItem("ar5iv_theme");
    if(current_theme){
      if(current_theme == "dark"){
        theme = "dark";
      } }
    else if(!window.matchMedia) { return false; }
    else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark"; }
    if (theme=="dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light"); } 
}

detectColorScheme();

function toggleColorScheme(){
    var current_theme = localStorage.getItem("ar5iv_theme");
    if (current_theme) {
      if (current_theme == "light") {
        localStorage.setItem("ar5iv_theme", "dark"); }
      else {
        localStorage.setItem("ar5iv_theme", "light"); } }
    else {
        localStorage.setItem("ar5iv_theme", "dark"); }
    detectColorScheme(); 
}

function addBugReportForm() {
    const theme = document.documentElement.getAttribute("data-theme");
    // Create the button element
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("id", "openForm");
    button.appendChild(document.createTextNode("Report Bug"));

    // Create the modal container element
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", "myForm");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "modal-title");

    // Create the modal dialog element
    const modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog");

    // Create the form element
    const form = document.createElement("form");
    form.setAttribute("class", "modal-content");
    form.setAttribute("id", "myFormContent");
    form.setAttribute("enctype", "multipart/form-data");

    // Create the modal header
    const modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    // Create the modal title
    const modalTitle = document.createElement("h5");
    modalTitle.setAttribute("class", "modal-title");
    modalTitle.appendChild(document.createTextNode("Bug Report Form"));

    // Create the close button for the modal
    const closeButton = document.createElement("button");
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
    const modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");

    // Create the description input field
    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    //descriptionLabel.setAttribute("class", "form-label");
    descriptionLabel.appendChild(document.createTextNode("Description*:"));

    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.setAttribute("class", "form-control");
    descriptionTextarea.setAttribute("id", "description");
    descriptionTextarea.setAttribute("name", "description");
    descriptionTextarea.setAttribute("required", "required");
    descriptionTextarea.setAttribute("style", "height: 80px;");
    descriptionTextarea.setAttribute("maxlength", "1000"); // Set the maximum length to 200 characters
    descriptionTextarea.setAttribute("placeholder","1000 characters maximum");

    // Create the file input field
    const fileDiv = document.createElement("div");
    fileDiv.setAttribute("class", "mb-3");

    const fileLabel = document.createElement("label");
    fileLabel.setAttribute("for", "file");
    fileLabel.setAttribute("class", "form-label");
    fileLabel.appendChild(document.createTextNode("Image File(optional):"));

    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("class", "form-control");
    fileInput.setAttribute("id", "file");
    fileInput.setAttribute("name", "file");
    fileInput.setAttribute("accept", "image/*"); // Specify the allowed file types

    fileDiv.appendChild(fileLabel);
    fileDiv.appendChild(fileInput);

    // Create the take screenshot button
    const takeScreenshotButton = document.createElement("button");
    takeScreenshotButton.setAttribute("type", "button");
    takeScreenshotButton.setAttribute("class", "btn btn-outline-secondary");
    takeScreenshotButton.setAttribute("id", "take-screenshot");
    takeScreenshotButton.appendChild(document.createTextNode("Take Screenshot"));

    // Create the hidden input field for the screenshot
    const screenshotInput = document.createElement("input");
    screenshotInput.setAttribute("type", "hidden");
    screenshotInput.setAttribute("id", "screenshot");
    screenshotInput.setAttribute("name", "screenshot");

    // Create the screenshot image element
    const screenshotImage = document.createElement("img");
    screenshotImage.setAttribute("id", "screenshot-image");
    screenshotImage.setAttribute("class", "img-fluid");
    screenshotImage.setAttribute("src", "");

    // Create the modal footer
    const modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer d-flex justify-content-end");

    // Create the submit button
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary");
    submitButton.setAttribute("id", "modal-submit");
    submitButton.setAttribute("style", "background-color: #b31b1b;");
    submitButton.appendChild(document.createTextNode("Submit"));

    // Create a container div for the buttons
    const buttonsContainer = document.createElement("div");
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

    document.body.appendChild(button);
    document.body.appendChild(modal);

    button.onclick = (e) => showModal(modal, 'button');
    closeButton.onclick = (e) => hideModal(modal);

    return modal;
}

// Create SRButton that can open the report modal
function addSRButton() {
    const contents = document.querySelectorAll('p, svg, figure, .ltx_title, .ltx_authors');
    const buttons = [];

    // Get all the paragraphs in the document
    // Add a hidden button after each paragraph
    // Add a hidden button after each paragraph
    contents.forEach((content, i) => {

        if (i < 5 || content.classList.contains("logomark")) return;

        const button = document.createElement("button");
        button.setAttribute("class", "sr-only button");
        button.style.display = "none";
        button.textContent = "Report Bug";

        // handle the focus
        button.onfocus = () => previousFocusElement = document.activeElement;

        // Add click event listener to the hidden button
        // TODO: Make function for showing modal
        button.onclick = (e) => {
            showModal('screen reader')
            e.preventDefault();
        };

        // Insert the button after the paragraph
        content.parentNode.insertBefore(button, content.nextSibling);

        buttons.push(button);
    });

    return buttons;
}

function showModal (modal, initiationMode) {
    modal.style.display = 'block';
    modal.setAttribute('tabindex', '-1'); // Ensure the modal is focusable
    modal.focus();
}

function hideModal (modal) { modal.style.display = 'none'; }

function showButtons (buttons) {
    buttons.forEach((button) => {
        console.log(button);
        console.log(button.style.display);
        button.style.display === 'none' ?
            button.style.display = 'inline' :
            button.style.display = 'none';
    })
}

function hideButtons (buttons) {
    buttons.forEach((button) => button.style.display = 'none');
}

// Code for handling key press to open/close modal
const handleKeyDown = (e, modal, buttons) => {
    const ctrlOrMeta = e.metaKey || e.ctrlKey;

    console.log(e.code);
    console.log(e.shiftKey);
    if (e.shiftKey && e.code === 'KeyB') { 
        console.log('Got HERe');
        showButtons(buttons);
    }

    if (ctrlOrMeta && (e.key === '/' || e.key === '?')) {
        showModal(modal, 'shortcut')
    }

    if (ctrlOrMeta && (e.key === '}' || e.key === ']')) {
        hideModal(modal);
    }
}

//The highlight initiation way
function handleHighlight (e, modal) {
        if (e.target.id === "small-report-button") 
            return;

        // hideButtons(buttons);

        const selection = window.getSelection();

        if (!selection.isCollapsed) {
            showSmallButton(selection, modal);
        }
}

    //get the info of selected text, reset the global constiable's value
function generate_selected_text(selection, range) {
    if (selection.type === 'Range') {
        const anchorNode = selection.anchorNode;
        const parentNode = anchorNode.parentNode;
        const id = parentNode.id;
        const classList = parentNode.classList;
        //if there is no id, than use class to identify
        elementIdentifier = id || classList[0] || 'Unknown';

        //get the topLayer of id
        if (elementIdentifier.match(/^S\d/)) {
            topLayer = id ? id.split('.')[1] : classList[0];
        } else {
            topLayer = id ? id.split('.')[0] : classList[0];
        }

        // Prepare for selected HTML.
        const container = document.createElement('div');
        container.appendChild(range.cloneContents());
        const selectedHtml = container.innerHTML;
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
function showSmallButton(selection, modal) {
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
        generate_selected_text(selection,range);
        modal.style.display = 'block';
        smallReportButton.remove();
    });

    smallReportButton.addEventListener("focusout", function (e) {
        this.parentNode.removeChild(this);
    });

    smallReportButton.focus();

    // Handle the window scroll event
    window.onscroll = function () {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        smallReportButton.style.display = "none";
        } else {
        smallReportButton.style.display = "block";
        }
    }
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
    const userAgent = navigator.userAgent;
    const browser = userAgent.match(/(firefox|edge|opr|chrome|safari)[\/]([\d.]+)/i)
    const browserName = browser[1];
    const browserVersion = browser[2];
    const browserInfo = browserName + '/' + browserVersion;

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
    //console.log(initiationWay);
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
        console.log(error);
        alert('Error occurs when submitting report');
    });
}

function handleClickOutsideModal(e, modal) {
    if (e.target == modal)
        modal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {

    const modal = addBugReportForm();
    const reportButtons = addSRButton();

    document.onkeydown = (e) => handleKeyDown(e, modal, reportButtons);
    document.onclick = (e) => handleClickOutsideModal(e, modal);
    document.onmouseup = (e) => handleHighlight(e, modal);
    // const close = modal.querySelector('.btn-close')


    // const isCommandKeyDown = false;
    // let saved_dataURI;
    // let elementIdentifier;
    // let topLayer;
    // let previousFocusElement;
    // let initiationWay;

    handleFormSubmit();
});