var selectionAnchorNode;
var bugReportState = {
    initiateWay: null,
    setInitiateWay: (value) => this.initiateWay = value,
    getInitiateWay: () => this.initiateWay,
    selectedHtml: null,
    elementIdentifier: null,
    setSelectedHtmlSRB: (value) => {
        this.selectedHtml = "data:text/html;charset=utf-8," + encodeURIComponent(value.innerHTML);
        this.elementIdentifier = value.id;
    },
    setSelectedHtmlSmallButton: (value) => {
        const range = value.getRangeAt(0);
        const container = document.createElement('div');
        container.appendChild(range.cloneContents());
        this.selectedHtml = 'data:text/html;charset=utf-8,' + encodeURIComponent(container.innerHTML);
    },
    getSelectedHtml: () => this.selectedHtml,
    getElementIdentifier: () => this.elementIdentifier,
    clear: () => {
        this.selectedHtml = "undefined";
        this.elementIdentifier = "undefined";
        this.initiateWay = "undefined";
    }
};

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

    const SettingIssueContainer = document.createElement("div");
    SettingIssueContainer.setAttribute("id", "SettingIssueContainer");
    SettingIssueContainer.setAttribute("class", "d-flex flex-column");

    // Create the button element
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("id", "openForm");
    button.setAttribute("style", "");
    button.appendChild(document.createTextNode("Open Issue"));

    // Create the settings button
    const settings = document.createElement("button");
    settings.setAttribute("type", "button");
    settings.setAttribute("class", "btn btn-primary");
    settings.setAttribute("id", "openSettings");
    settings.style.padding = "5px";

    const settingsImage = document.createElement("img");
    settingsImage.setAttribute("src", "static/img/setting-button.png");
    settingsImage.setAttribute("alt", "Settings");
    settingsImage.style.width = "50px";
    settingsImage.style.height = "50px";
    settingsImage.style.backgroundColor = "transparent";

    settings.appendChild(settingsImage);

    SettingIssueContainer.appendChild(button);
    SettingIssueContainer.appendChild(settings);

    settings.onclick = (e) => {
        currentAnchorNode = null;
        const settingsModal = createSettingsModal();
        showSettingsModal(settingsModal);
        bugReportState.setInitiateWay("SettingsButton");
    };

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
    modalTitle.appendChild(document.createTextNode("Open Github Issue"));

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

    // Update: Add warning label. Need add format in style.css.
    const warningLabel = document.createElement("div");
    warningLabel.id = "warningLabel";
    warningLabel.setAttribute('class', 'form-text');
    warningLabel.textContent = "Warning: Issue reports are not private. If you are an author submitting feedback about a pre-release submission, be advised that the contents of the bug report will be publicly available on Github.";

    // Create the description input field
    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    //descriptionLabel.setAttribute("class", "form-label");
    descriptionLabel.appendChild(document.createTextNode("Description*"));

    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.setAttribute("class", "form-control");
    descriptionTextarea.setAttribute("id", "description");
    descriptionTextarea.setAttribute("name", "description");
    descriptionTextarea.setAttribute("required", "required");
    descriptionTextarea.setAttribute("style", "height: 80px;");
    // Update: Change to 500 for next two lines.
    descriptionTextarea.setAttribute("maxlength", "500"); // Set the maximum length to 200 characters
    descriptionTextarea.setAttribute("placeholder","500 characters maximum");

    // Create the modal footer
    const modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer d-flex justify-content-end");

    // Create the submit button
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary");
    submitButton.setAttribute("id", "modal-submit");
    submitButton.setAttribute("style", "background-color: #b31b1b;", "border-color: #690604;" );
    submitButton.appendChild(document.createTextNode("Submit in Github"));

    // Update: ScreenReader Submit Buttons. Needed for Submit without Github Function.
    const srSubmit = document.createElement("button");
    srSubmit.setAttribute("type", "submit");
    srSubmit.setAttribute("class", "sr-only button");
    srSubmit.setAttribute("id", "modal-submit-sr");
    srSubmit.appendChild(document.createTextNode("Submit without Github"));

    // Create a container div for the buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "d-flex justify-content-between");

    // Append the elements to their respective parents
    // Update: Add warning label (next line)
    modalBody.appendChild(warningLabel);
    modalBody.appendChild(descriptionLabel);
    modalBody.appendChild(descriptionTextarea);

    // Update: Add buttonsContainer (next line)
    modalFooter.appendChild(srSubmit);
    modalFooter.appendChild(submitButton);

    form.appendChild(modalHeader);
    form.appendChild(modalBody);
    form.appendChild(modalFooter);

    modalDialog.appendChild(form);

    modal.appendChild(modalDialog);

    document.body.appendChild(SettingIssueContainer);
    document.body.appendChild(modal);

    button.onclick = (e) => {
        currentAnchorNode = null;
        showModal(modal, 'button');
        bugReportState.setInitiateWay("Fixedbutton");
    }
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
        if (content.classList.contains("header-message") || content.classList.contains("logomark")) return;

        const button = document.createElement("button");
        button.setAttribute("class", "sr-only button");
        button.style.display = "none";
        button.textContent = "Open Issue on Github";

        button.onfocus = () => previousFocusElement = document.activeElement;

        button.onclick = (e) => {
            /*
                Comment: Need add a variable named initiateWay, so we can know how users initiate the report.

                For addSRbutton, initiateWay = "srButton"
                For smallReportButton, initiateWay = "smallButton"
                For ShortCut, initiateWay = "ShortCut"
                For click the button(right bi button) created in the modal, initiateWay = "FixedButton".

                So you may need to create a global variable. I have checked showModal it cannot send any parameter to modal.
            */
            showModal(modal);
            bugReportState.setSelectedHtmlSRB(content);
            bugReportState.setInitiateWay("SRButton");
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

function hideModal (modal) {
    modal.style.display = 'none';
}

function showSettingsModal(settingsModal) {
    settingsModal.style.display = 'block';
    settingsModal.setAttribute('tabindex', '-1');
    settingsModal.focus();
}

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
    headerMessage.className = 'header-message centered-message';
    headerMessage.setAttribute('role', 'banner');
    headerMessage.innerHTML = '<strong>Experimental HTML</strong>. Report rendering errors with the "Open Issue" button or click <strong>Shift+b</strong> to toggle accessible section reporting links. <a href="#footer">Reference all keyboard commands</a> in the footer.';

    var Links = document.createElement('div');
    Links.setAttribute('class', 'headerLinks');

    // Create "open issue" link
    var issueLink = document.createElement('a');
    issueLink.setAttribute('class', 'ar5iv-footer-button');
    issueLink.setAttribute('target', '_blank');
    issueLink.style.color = 'white'
    issueLink.href = '#myForm';
    issueLink.textContent = 'Open Issue';

    // Create "setting" link
    // var settingLink = document.createElement('a');
    // settingLink.href = '#settingsModal';
    // settingLink.textContent = 'Settings';

    // Create "back to abstract" link
    var backLink = document.createElement('a');
    backLink.setAttribute('class', 'ar5iv-footer-button');
    backLink.setAttribute('target', '_blank');
    backLink.style.color = 'white'
    backLink.href = '';
    backLink.textContent = 'Back to Abstract';
    backLink.style.paddingLeft = '10px';

        //font toggle
    var changeFontButton = document.createElement('a');
    changeFontButton.setAttribute('class', 'ar5iv-toggle-color-scheme');
    changeFontButton.setAttribute('href', 'javascript:toggleFont()');
    var fontImage = document.createElement('img');
    fontImage.setAttribute('src', 'static/img/font-icon.png');
    fontImage.style.width = '20px';
    fontImage.style.backgroundColor = 'transparent';
    changeFontButton.appendChild(fontImage)
    changeFontButton.style.float = 'right'

    var hamburger = document.createElement('a');
    hamburger.className = 'hamburger-button';
    hamburger.setAttribute('aria-label', 'Toggle Menu');
    var hamburgerImage = document.createElement('img');
    hamburgerImage.setAttribute('src', 'static/img/hamburger.png');
    hamburgerImage.style.width = '20px';
    hamburgerImage.style.backgroundColor = 'transparent';
    hamburger.appendChild(hamburgerImage)
    hamburger.addEventListener('click', toggleMenu);
    var menuContainer = document.createElement('div');
    menuContainer.className = 'menu-container';
    var menuItem1 = document.createElement('a');
    menuItem1.href = '#myForm';
    menuItem1.textContent = 'Open Issue';
    var menuItem2 = document.createElement('a');
    menuItem2.href = '';
    menuItem2.textContent = 'Back to Abstract';

    menuContainer.appendChild(menuItem1);
    menuContainer.appendChild(menuItem2);

    //night mode toggle
    var night = document.createElement('a');
    night.setAttribute('class', 'ar5iv-toggle-color-scheme');
    night.setAttribute('href', 'javascript:toggleColorScheme()');
    night.setAttribute('title', 'Toggle ar5iv color scheme');
    var nightSpan = document.createElement('span');
    nightSpan.setAttribute('class', 'color-scheme-icon');
    night.appendChild(nightSpan);
    night.style.float = 'right'

    Links.appendChild(issueLink);
    Links.appendChild(backLink);
    Links.appendChild(night);
    Links.appendChild(changeFontButton);
    Links.appendChild(hamburger);
    Links.appendChild(menuContainer);

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
    header.appendChild(Links);
    header.appendChild(invisibleElement);

    // Get the <body> element and append the header element to it
    var body = document.querySelector('body');
    body.insertBefore(header, body.firstChild);

    var header = document.querySelector('header');
    
    issueLink.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = document.getElementById('myForm');
        showModal(modal);
        bugReportState.setInitiateWay("FixedButton");
    });

    function toggleMenu() {
        menuContainer.classList.toggle('menu-open');
    }
  };

// Code for handling key press to open/close modal
const handleKeyDown = (e, modal, buttons) => {
    const ctrlOrMeta = e.metaKey || e.ctrlKey;

    if (e.shiftKey && e.code === 'KeyB') {
        showButtons(buttons);
    } else if (ctrlOrMeta && (e.key === '/' || e.key === '?')) {
        showModal(modal)
        bugReportState.setInitiateWay("ShortCut");
    } else if (ctrlOrMeta && (e.key === '}' || e.key === ']')) {
        hideModal(modal);
    }
}

//The highlight initiation way
function handleMouseUp (e, smallButton) {
        if (e.target.id === "small-report-button")
            return;
        if (!window.getSelection().isCollapsed) {
            selection = window.getSelection();
            currentAnchorNode = selection.anchorNode;
            bugReportState.setSelectedHtmlSmallButton(selection);
            // var range = selection.getRangeAt(0);
            // var container = document.createElement('div');
            // container.appendChild(range.cloneContents());
            // // Use the selected text to generate the dataURI
            // selectedHtml = 'data:text/html;charset=utf-8,' + encodeURIComponent(container.innerHTML);
            //Comment: Need to get the selected text and pass it to the backend
            //reference: var selectedhtml in app.js
            showSmallButton(smallButton);
        }
        else hideSmallButton(smallButton);
}

function createSmallButton (modal) {
    const smallReportButton = document.createElement('button');
    smallReportButton.id = 'small-report-button';
    smallReportButton.type = 'button';
    smallReportButton.className = 'btn btn-secondary btn-sm';
    smallReportButton.style.backgroundColor = '#b31b1b';
    smallReportButton.textContent = 'Open Issue';
    smallReportButton.style.position = 'fixed';

    document.body.appendChild(smallReportButton);

    smallReportButton.onclick = (e) => {
        showModal(modal); // do something with window.getSelection()
        bugReportState.setInitiateWay("selectedText-smallButton");
    }

    smallReportButton.addEventListener("focusout", function (e) {
        hideSmallButton(this);
    });

    return smallReportButton;
}

function createSettingsModal() {
    // Create the modal container element for settings
    const settingsModal = document.createElement("div");
    settingsModal.setAttribute("class", "modal");
    settingsModal.setAttribute("id", "settingsModal");
    settingsModal.setAttribute("role", "dialog");
    settingsModal.setAttribute("aria-labelledby", "modal-title");

    // Create the modal dialog element
    const settingsModalDialog = document.createElement("div");
    settingsModalDialog.setAttribute("class", "modal-dialog");

    // Create the modal content
    const settingsModalContent = document.createElement("div");
    settingsModalContent.setAttribute("class", "modal-content");

    // Create the modal header for settings
    const settingsModalHeader = document.createElement("div");
    settingsModalHeader.setAttribute("class", "modal-header");

    // Create the modal title for settings
    const settingsModalTitle = document.createElement("h5");
    settingsModalTitle.setAttribute("class", "modal-title");
    settingsModalTitle.appendChild(document.createTextNode("Settings"));

    // Create the close button for the settings modal
    const settingsCloseButton = document.createElement("button");
    settingsCloseButton.setAttribute("type", "button");
    settingsCloseButton.setAttribute("class", "btn-close");
    settingsCloseButton.setAttribute("data-bs-dismiss", "modal");
    settingsCloseButton.setAttribute("aria-label", "Close");

    settingsModalHeader.appendChild(settingsModalTitle);
    settingsModalHeader.appendChild(settingsCloseButton);
    settingsModalContent.appendChild(settingsModalHeader);
    settingsModalDialog.appendChild(settingsModalContent);
    settingsModal.appendChild(settingsModalDialog);
    document.body.appendChild(settingsModal);

    // Add event listener to the settings link in the header
    const settingLink = document.querySelector('a[href="#settingsModal"]');
    settingLink.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.getElementById('settingsModal');
        showSettingsModal(modal); 
    });

    settingsCloseButton.addEventListener("click", () => {
        hideModal(settingsModal); 
    });

    return settingsModal;
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
    e.preventDefault();
    //document.getElementById('notification').style = 'display: block';
    const issueData = {};

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
    let elementIdentifier = bugReportState.getElementIdentifier();
    let topLayer = 'Unknown';
    console.log(currentAnchorNode);
    if (currentAnchorNode !== null) {
        const parentNode = currentAnchorNode.parentNode;
        const id = parentNode.id;
        const classList = parentNode.classList;
        //if there is no id, than use class to identify
        elementIdentifier = id || classList[0] || 'Unknown';
        console.log(elementIdentifier);

        //get the topLayer of id
        if (elementIdentifier.match(/^S\d/)) {
            topLayer = id ? id.split('.')[1] : classList[0];
        } else {
            topLayer = id ? id.split('.')[0] : classList[0];
        }
    }

    const dataDescription = document.getElementById('description').value;

    const uniqueId = window.crypto.randomUUID();

    // add to the form data
    // issueData['template'] = 'bug_report.md'); // TODO: Change this to a template with fields matching the ones below
    issueData['uniqueId'] = uniqueId;
    issueData['canonicalURL'] = canonicalURL;
    issueData['conversionURL'] = window.location.origin + window.location.pathname;
    issueData['reportTime'] = currentTime;
    issueData['browserInfo'] = browserInfo;
    issueData['description'] = dataDescription;
    issueData['locationLow'] = elementIdentifier;
    issueData['locationHigh'] = topLayer;
    issueData['selectedHtml'] = bugReportState.getSelectedHtml();
    issueData['initiationWay'] = bugReportState.getInitiateWay();

    form = new FormData();
    form.append('template', 'bug_report.md');
    form.append('title',`Improve article : ${arxivIdv}`)
    form.append('body', makeGithubBody(issueData));

    const GITHUB_BASE_URL = 'https://github.com/arXiv/html_feedback/issues/new?'
    const queryString = new URLSearchParams(form).toString()
    const link = GITHUB_BASE_URL + queryString;

    postToDB(issueData);

    window.open(link, '_blank');

    document.querySelector('#myFormContent').reset();
    bugReportState.clear();
    hideModal(document.getElementById('myForm'));
}

function handleClickOutsideModal(e, modal) {
    if (e.target == modal)
        modal.style.display = 'none';
}

function postToDB (issueData) {
    const DB_BACKEND_URL = 'https://services.arxiv.org/latexml/feedback';
    const queryString = new URLSearchParams(issueData).toString();
    fetch(DB_BACKEND_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString, // body data type must match "Content-Type" header
    });
}

function makeGithubBody (issueData) {
    let body = "## Describe the issue\n\n";
    body += `**Description**: ${issueData.description}\n\n`;
    body += "Feel free to attach a screenshot (or document) link below: \n\n\n\n";
    // Auto Fill Data
    body += "## Auto Fill Data - !!! Please do not edit below this line !!!\n";
    body += "----------------------------------------------------------------------------------------\n\n";
    body += `Id: ${issueData.uniqueId}\n`     
    return body;
}

//An example of changing fonts
function toggleFont() {
    // var elementsWithClassLtx = document.querySelectorAll('[class*="ltx_"]');
    
    // for (var i = 0; i < elementsWithClassLtx.length; i++) {
    //     if (isFontCalibri) {
    //         elementsWithClassLtx[i].style.fontFamily = ''; // Reset to default font (inherit)
    //     } else {
    //         elementsWithClassLtx[i].style.fontFamily = 'Calibri, sans-serif';
    //     }
    // }
    // isFontCalibri = !isFontCalibri;
    changeFont();
}

// Add font change function.
var settingState = {
    currentFontIndex: 0,
    fonts: ["default", "sans-serif", "fontVersion3"], // Add as many versions as you like
    currentFont: function () {
      return this.fonts[this.currentFontIndex];
    },
    changeFont: function () {
      this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
    },
  };
  
  function changeFont() {
    settingState.changeFont();
    document.documentElement.setAttribute(
      "data-font",
      settingState.currentFont()
    );
  }

//     // Create footer element
//     var footer = document.createElement('footer');
//     footer.style.display = 'flex';
//     footer.style.alignItems = 'center';
  
//     // Create the logo column
//     var logoColumn = document.createElement('div');
//     logoColumn.className = 'footer-column';
//     var logoImage = document.createElement('img');
//     logoImage.alt = 'logo';
//     logoImage.className = 'logo';
//     logoImage.setAttribute('role', 'presentation');
//     logoImage.style.backgroundColor = 'transparent';
//     logoImage.src = '/static/img/arxiv-logo-one-color-white.svg'; 
//     logoColumn.appendChild(logoImage);
  
//     // Create the links column
//     var linksColumn = document.createElement('div');
//     linksColumn.className = 'footer-column';
//     linksColumn.style.justifyContent = 'space-evenly';
//     // Create "skip" link in the footer
//     var skipLink = document.createElement('a');
//     skipLink.className = 'skip';
//     skipLink.href = '#main';
//     skipLink.textContent = 'Skip to main content';
  
//     // Create "open issue" link in the footer
//     var issueLink = document.createElement('a');
//     issueLink.href = '#myForm';
//     issueLink.textContent = 'Open Issue';
  
//     // Create "setting" link in the footer
//     var settingLink = document.createElement('a');
//     settingLink.href = '#settingsModal';
//     settingLink.textContent = 'Settings';
  
//     // Create "back to abstract" link in the footer
//     var backLink = document.createElement('a');
//     backLink.href = '';
//     backLink.textContent = 'Back to Abstract';
  
//     // Append the links to the links column
//     linksColumn.appendChild(skipLink);
//     linksColumn.appendChild(issueLink);
//     linksColumn.appendChild(settingLink);
//     linksColumn.appendChild(backLink);
  
//     // Create the timestamp column
//     var timestampColumn = document.createElement('div');
//     timestampColumn.className = 'footer-column';
//     var timestamp = document.createTextNode('Timestamp: ' + new Date().toLocaleString());
//     timestampColumn.appendChild(timestamp);
  
//     // Append the columns to the footer element
//     footer.appendChild(logoColumn);
//     footer.appendChild(linksColumn);
//     footer.appendChild(timestampColumn);
//     footer.appendChild(logoColumn);
  
//     // Get the <body> element and append the footer element to it
//     var body = document.querySelector('body');
//     body.appendChild(footer);
  
//     // Add an ID to the footer for the keyboard commands reference link to jump to
//     footer.setAttribute('id', 'footer');
//   }
  
  

// RUN THIS CODE ON INITIALIZE
var isFontCalibri = false;
function addFooter(){
    var footer = document.createElement('footer');

    var night = document.createElement('a');
    night.setAttribute('class', 'ar5iv-toggle-color-scheme');
    night.setAttribute('href', 'javascript:toggleColorScheme()');
    night.setAttribute('title', 'Toggle ar5iv color scheme');

    var nightSpan = document.createElement('span');
    nightSpan.setAttribute('class', 'color-scheme-icon');
    night.appendChild(nightSpan);

    // Create the second link with class "ar5iv-footer-button" for "Copyright"
    var copyLink = document.createElement('a');
    copyLink.setAttribute('class', 'ar5iv-footer-button');
    copyLink.setAttribute('href', 'https://arxiv.org/help/license');
    copyLink.setAttribute('target', '_blank');
    copyLink.appendChild(document.createTextNode('Copyright'));

    // Create the third link with class "ar5iv-footer-button" for "Privacy Policy"
    var policyLink = document.createElement('a');
    policyLink.setAttribute('class', 'ar5iv-footer-button');
    policyLink.setAttribute('href', 'https://arxiv.org/help/policies/privacy_policy');
    policyLink.setAttribute('target', '_blank');
    policyLink.appendChild(document.createTextNode('Privacy Policy'));

    // Create "skip" link in the footer
    var skipLink = document.createElement('a');
    skipLink.setAttribute('class', 'ar5iv-footer-button');
    skipLink.setAttribute('target', '_blank');
    skipLink.href = '#main';
    skipLink.textContent = 'Back to Abstract';

    // Create "open issue" link in the footer
    var issueLink = document.createElement('a');
    issueLink.setAttribute('class', 'ar5iv-footer-button');
    issueLink.setAttribute('target', '_blank');
    issueLink.href = '#myForm';
    issueLink.textContent = 'Open Issue';

    var changeFontButton = document.createElement('a');
    changeFontButton.setAttribute('class', 'ar5iv-toggle-color-scheme');
    changeFontButton.setAttribute('href', 'javascript:toggleFont()');
    var fontImage = document.createElement('img');
    fontImage.setAttribute('src', 'static/img/font-icon.png');
    fontImage.style.width = '20px';
    fontImage.style.backgroundColor = 'transparent';
    changeFontButton.appendChild(fontImage)

    // Create "settings" link in the footer
    // var settingLink = document.createElement('a');
    // settingLink.setAttribute('class', 'ar5iv-footer-button');
    // settingLink.setAttribute('target', '_blank');
    // settingLink.href = '#myForm';
    // settingLink.textContent = 'Settings';

    var TimeLogo = document.createElement('div');
    TimeLogo.setAttribute('class','ltx_page_logo');
    // Create the timestamp
    var timestamp = document.createTextNode('Generated on Wed Dec 14 18:01:44 2022 by ');
    TimeLogo.appendChild(timestamp);

    var logoLink = document.createElement('a');
    logoLink.href = 'https://math.nist.gov/~BMiller/LaTeXML/';
    logoLink.setAttribute('class','ltx_LaTeXML_logo');

    var logoSpan1 = document.createElement('span');
    logoSpan1.style.letterSpacing = '-0.2em';
    logoSpan1.style.marginRight = '0.1em';

    var letterL = document.createTextNode('L');
    logoSpan1.appendChild(letterL);

    var letterA = document.createElement('span');
    letterA.style.fontSize = '70%';
    letterA.style.position = 'relative';
    letterA.style.bottom = '2.2pt';
    letterA.appendChild(document.createTextNode('A'));
    logoSpan1.appendChild(letterA);

    var letterT = document.createTextNode('T');
    logoSpan1.appendChild(letterT);

    var letterE = document.createElement('span');
    letterE.style.position = 'relative';
    letterE.style.bottom = '-0.4ex';
    letterE.appendChild(document.createTextNode('E'));
    logoSpan1.appendChild(letterE);

    var logoSpan2 = document.createElement('span');
    logoSpan2.setAttribute('class', 'ltx_font_smallcaps');
    logoSpan2.appendChild(document.createTextNode('xml'));

    var logoImage = document.createElement('img');
    logoImage.alt = '[LOGO]';
    logoImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQZLWTEaOUAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAdpJREFUKM9tkL+L2nAARz9fPZNCKFapUn8kyI0e4iRHSR1Kb8ng0lJw6FYHFwv2LwhOpcWxTjeUunYqOmqd6hEoRDhtDWdA8ApRYsSUCDHNt5ul13vz4w0vWCgUnnEc975arX6ORqN3VqtVZbfbTQC4uEHANM3jSqXymFI6yWazP2KxWAXAL9zCUa1Wy2tXVxheKA9YNoR8Pt+aTqe4FVVVvz05O6MBhqUIBGk8Hn8HAOVy+T+XLJfLS4ZhTiRJgqIoVBRFIoric47jPnmeB1mW/9rr9ZpSSn3Lsmir1fJZlqWlUonKsvwWwD8ymc/nXwVBeLjf7xEKhdBut9Hr9WgmkyGEkJwsy5eHG5vN5g0AKIoCAEgkEkin0wQAfN9/cXPdheu6P33fBwB4ngcAcByHJpPJl+fn54mD3Gg0NrquXxeLRQAAwzAYj8cwTZPwPH9/sVg8PXweDAauqqr2cDjEer1GJBLBZDJBs9mE4zjwfZ85lAGg2+06hmGgXq+j3+/DsixYlgVN03a9Xu8jgCNCyIegIAgx13Vfd7vdu+FweG8YRkjXdWy329+dTgeSJD3ieZ7RNO0VAXAPwDEAO5VKndi2fWrb9jWl9Esul6PZbDY9Go1OZ7PZ9z/lyuD3OozU2wAAAABJRU5ErkJggg==';
    logoLink.appendChild(logoSpan1);
    logoLink.appendChild(logoSpan2);
    logoLink.appendChild(logoImage);

    TimeLogo.appendChild(logoLink);

    footer.appendChild(night)
    footer.appendChild(copyLink)
    footer.appendChild(policyLink)
    footer.appendChild(skipLink)
    footer.appendChild(issueLink)
    footer.appendChild(changeFontButton); 
    // footer.appendChild(settingLink)
    footer.appendChild(TimeLogo)

    var body = document.querySelector('body');
    body.appendChild(footer);

    footer.setAttribute('class', 'ltx_page_footer');
}

detectColorScheme();
document.addEventListener("DOMContentLoaded", () => {
    const modal = addBugReportForm();
    const reportButtons = addSRButton(modal);
    const smallReportButton = createSmallButton(modal);

    // Call the addFloatingBanner function to add the floating banner to the document
    addFloatingBanner();
    addFooter();

    document.onkeydown = (e) => handleKeyDown(e, modal, reportButtons);
    document.onclick = (e) => handleClickOutsideModal(e, modal);
    document.onmouseup = (e) => handleMouseUp(e, smallReportButton);

    let lastScrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScrollPosition > lastScrollPosition || currentScrollPosition < lastScrollPosition) {
            smallReportButton.style.display = "none";
        } else {
            smallReportButton.style.display = "block";
        }
        lastScrollPosition = currentScrollPosition;
    });

    document.getElementById('myFormContent').onsubmit = submitBugReport;
});

