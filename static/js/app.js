document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('myForm')
  //const close = modal.querySelector('.close')
  const close= modal.querySelector('.btn-close')

// Control Report Box based on the button
document.addEventListener('keydown', function(event) {
  // Press "p" to open report box
  if (event.key === 'p'|| event.key === 'P') {
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

document.addEventListener('keyup', function(event) {
  if (event.key === 'Meta' || event.key === 'Command') {
    isCommandKeyDown = false;
  }
});

//click the button and the modal appear
document.getElementById('openForm').addEventListener("click", () => {
  modal.style.display = 'block'
});
//reportBtn.addEventListener("click", () => {

let saved_dataURI;
// Generate the screenshot for capture the selected area.
function generate_selected_screenshot() {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Get the selected text
  const selection = window.getSelection();
  const range = selection.getRangeAt(0); 

  // Create a span element to wrap the selected text
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
    // const screenshotImage = document.getElementById("screenshot-image");
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

  let downloadButton = document.createElement("a");
  downloadButton.id = "download-screenshot";
  saved_dataURI = "data:text/html;charset=utf-8," + encodeURIComponent(selectedHtml);
  downloadButton.href = saved_dataURI
  downloadButton.download = "visible-content.html";
  downloadButton.textContent = "Download Selected Content";
  downloadButton.style.display = "block";
  downloadButton.style.margin = "10px";
  document.getElementById("myFormContent").appendChild(downloadButton);
}








let selectedText;
let smallReportButton;

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
      var elementIdentifier = id || classList[0] || 'Unknown';

      //get the topLayer of id
      if (elementIdentifier.startsWith('S0')) {
        var topLayer = id ? id.split('.').slice(0, 2).join('.') : classList[0];
        }
      else{
        var topLayer = id ? id.split('.')[0] : classList[0];
      }

      //print the current element identifier and its toplayer
      console.log('Selected element identifier:', elementIdentifier);
      console.log('Top layer identifier:', topLayer);
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
    console.log("Report button added!");
    // Handle the report button click event
    smallReportButton.addEventListener("click", function () {
      console.log("Report button clicked!");
      generate_selected_screenshot();
      modal.style.display = 'block';
      smallReportButton.remove();
    });

    // Handle the window scroll event
    window.onscroll = function() {
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


function getFullPageContent() {
  return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
}
  //click the button to generate the screenshot, next step: use external library to fasten the process
  // This is different from the screenshot of the selected area.
  document.getElementById("take-screenshot").addEventListener("click", function() {
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
    document.getElementById('notification').style= 'display: block';


    event.preventDefault();
    const formData  =new FormData();
    const article_title = document.querySelector('h1.ltx_title_document').textContent;
    const user_info = "account:yc2455 contact:@cornll.edu "
    const data_description = document.getElementById("description").value;
    const screenshotImage = document.getElementById("screenshot").value;
    const attachment = document.querySelector('#file').files[0]; 
    // add to the form data
    formData.append('article_title', article_title);
    formData.append('user_info', user_info);
    formData.append('description', data_description);
    formData.append('attachment', attachment);
    formData.append('screenshotImage', screenshotImage);
    formData.append('url', saved_dataURI);
    fetch('/', {
      method: 'POST',
      body: formData})
    .then(function(response) {
      if (response.ok) {
        alert('报告已提交');
      } else {
        alert('提交报告时发生错误');
      }
    })
    .catch(function(error) {
      alert('提交报告时发生错误');
    });
  }

  //submit process, next step: finish
  document.getElementById("myFormContent").addEventListener("submit", function(event) {
    submitBugReport(event)
    
    // Extract the browser name and version information
    var userAgent = navigator.userAgent;
    var browserInfo = userAgent.match(/(firefox|edge|opr|chrome|safari)[\/]([\d.]+)/i);
    var browserName = browserInfo[1];
    var browserVersion = browserInfo[2];
  
    //Capitalize the first letter of the browser name
    browserName = browserName.charAt(0).toUpperCase() + browserName.slice(1);
  
    // Print the browser name and version information
    console.log('Browser:', browserName, browserVersion);
  });

  //Hide the modal
  close.addEventListener('click', function(event) {
    modal.style.display = 'none';
    // Delay the execution of the modal close code by 3 second
    document.getElementById("screenshot").value = "";
    document.getElementById("screenshot-image").src = "";

    const downloadButton = document.getElementById("download-screenshot");
    if (downloadButton) {
      downloadButton.remove();
    }

    const downloadButton2 = document.getElementById("download-screenshot");
    if (downloadButton2) {
      downloadButton2.remove();
    }
  });
  
  // Hide the modal if clicked outside
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  })
});
