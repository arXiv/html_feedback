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
function addSRButton(modal) {
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

        button.onfocus = () => previousFocusElement = document.activeElement;

        button.onclick = (e) => {
            showModal(modal);
            e.preventDefault();
        };

        // Insert the button after the paragraph
        content.parentNode.insertBefore(button, content.nextSibling);

        buttons.push(button);
    });

    return buttons;
}

function showModal (modal) {
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

    if (e.shiftKey && e.code === 'KeyB') { 
        showButtons(buttons);
    } else if (ctrlOrMeta && (e.key === '/' || e.key === '?')) {
        showModal(modal)
    } else if (ctrlOrMeta && (e.key === '}' || e.key === ']')) {
        hideModal(modal);
    }
}

//The highlight initiation way
function handleMouseUp (e, smallButton) {
        if (e.target.id === "small-report-button") 
            return;
        if (!window.getSelection().isCollapsed)
            showSmallButton(smallButton);
        else hideSmallButton(smallButton);
}

function createSmallButton (modal) {
    const smallReportButton = document.createElement('button');
    smallReportButton.id = 'small-report-button';
    smallReportButton.type = 'button';
    smallReportButton.className = 'btn btn-secondary btn-sm';
    smallReportButton.style.backgroundColor = '#b31b1b';
    smallReportButton.textContent = 'Report';
    smallReportButton.style.position = 'fixed';

    document.body.appendChild(smallReportButton);

    smallReportButton.onclick = (e) => {
        showModal(modal); // do something with window.getSelection()
    }

    smallReportButton.addEventListener("focusout", function (e) {
        hideSmallButton(this);
    });

    return smallReportButton;
}

// Display the smallButton for bug report, click and scroll included
function showSmallButton(smallReportButton) {
    selection = window.getSelection();

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    smallReportButton.style.left = `${rect.left + rect.width / 2}px`;

    // Check if there is enough space above the selected text
    smallReportButton.style.top = `${rect.top}px`;
    smallReportButton.style.transform = 'translate(-50%, -100%)';

    smallReportButton.style.display = 'inline';
}

function hideSmallButton (smallReportButton) {
    smallReportButton.style.display = 'none';
}

//submit to the backend, next step: finish
function submitBugReport (e) {
    //document.getElementById('notification').style = 'display: block';
    const formData = new FormData();

    // Canonical URL
    ARXIV_ABS_PATH = 'https://arxiv.org/abs/';
    const arxivIdv = window.location.pathname.split('/')[2]; // pathname ex: '/html/2306.16433v1/2306.16433v1.html'
    const canonicalURL = ARXIV_ABS_PATH + arxivIdv;

    // const user_info = "account:yc2455 contact:@cornll.edu "

    // Report Time
    const currentTime = Date.now();

    // Browser Version
    const userAgent = navigator.userAgent;
    const browser = userAgent.match(/(firefox|edge|opr|chrome|safari)[\/]([\d.]+)/i)
    const browserName = browser[1];
    const browserVersion = browser[2];
    const browserInfo = browserName + '/' + browserVersion;

    // Relevant Selection
    const selection = window.getSelection();
    let elementIdentifier = 'Unknown';
    let topLayer = 'Unknown';
    let dataURI = 'Unknown';
    if (!selection.isCollapsed) {
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
        dataURI = "data:text/html;charset=utf-8," + encodeURIComponent(selectedHtml);
    }
    
    const dataDescription = document.getElementById('description').value;

    // add to the form data
    formData.append('template', 'bug_report.md'); // TODO: Change this to a template with fields matching the ones below
    formData.append('canonicalURL', canonicalURL);
    formData.append('conversionURL', window.location.origin + window.location.pathname);
    formData.append('dataURI', dataURI);
    formData.append('reportTime', currentTime);
    formData.append('browserInfo', browserInfo)
    formData.append('description', dataDescription);
    formData.append('locationLow', elementIdentifier);
    formData.append('locationHigh', topLayer)

    const GITHUB_BASE_URL = 'https://github.com/arXiv/html_feedback/issues/new?' 
    const queryString = new URLSearchParams(formData).toString()
    const link = GITHUB_BASE_URL + queryString;

    window.open(link, '_blank');

    e.preventDefault();
}

function handleClickOutsideModal(e, modal) {
    if (e.target == modal)
        modal.style.display = 'none';
}


// RUN THIS CODE ON INITIALIZE
detectColorScheme();
document.addEventListener("DOMContentLoaded", () => {

    const modal = addBugReportForm();
    const reportButtons = addSRButton(modal);
    const smallReportButton = createSmallButton(modal);

    document.onkeydown = (e) => handleKeyDown(e, modal, reportButtons);
    document.onclick = (e) => handleClickOutsideModal(e, modal);
    document.onmouseup = (e) => handleMouseUp(e, smallReportButton);
    // const close = modal.querySelector('.btn-close')

    // Handle the window scroll event
    window.onscroll = () => {
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40)
            hideSmallButton(smallReportButton);
    }

    document.getElementById('myFormContent').onsubmit = submitBugReport;
});