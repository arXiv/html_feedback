document.addEventListener("DOMContentLoaded", () => {
  const reportBtn = document.querySelector(".report-btn");
  const content = document.querySelector(".content");
  let reportBox;
  let closeBtn;
  let textReport;
  const modal = document.getElementById('myForm')
  //const close = modal.querySelector('.close')
  const close= modal.querySelector('.btn-close')
  

//click the button and the modal appear
document.getElementById('openForm').addEventListener("click", () => {
  modal.style.display = 'block'
});
//reportBtn.addEventListener("click", () => {

// Generate the screenshot. Only capture the selected area.
// next step: create screenshot of only highlighted area, use existing library to write that
function generate_selected_screenshot() {
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
    scale: 1.0, // Set the scale to 30% to reduce image size
    useCORS: true // Use CORS to speed up screenshot generation
  }).then((canvas) => {
    var imageData = canvas.toDataURL("image/png");
    modal.style.display = "block";
    // Set screenshot data in hidden input field or image element
    document.getElementById("screenshot").value = imageData;
    const screenshotImage = document.getElementById("screenshot-image");
    screenshotImage.src = imageData;

    // Show screenshot image or input field
    screenshotImage.style = "display: block";
    screenshotImage.style.maxWidth = "300px";
    screenshotImage.style.maxHeight = "300px";

    // Add event listener to enlarge the image when clicked
    screenshotImage.addEventListener("click", () => {
      const enlargedImage = document.createElement("img");
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

      // Add event listener to remove enlarged image when clicked
      enlargedImage.addEventListener("click", () => {
        document.body.removeChild(enlargedImage);
      });
    });
  });
}



//highlight selection, next step:optimize the selection element layer, like Table S1.T1, optimize the button format and area, optimize the sensitivity of selection(like mouseup)
document.onselectionchange = function () {
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
      smallReportButton.type='button'
      smallReportButton.className='btn btn-secondary btn-sm'
      smallReportButton.style.backgroundColor='#b31b1b'
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

      // Handle the report button click event
      smallReportButton.addEventListener("click", function () {
        //createReportBox();
        generate_selected_screenshot()
        modal.style.display = 'block'
        smallReportButton.remove();
      });
    } else {
      // Remove the report button
      const smallReportButton = document.querySelector(
        "button[id='small-report-button']"
      );
      if (smallReportButton) {
        smallReportButton.remove();
      }
    }
  };

  
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
  
      // Create or update a download button
      let downloadButton = document.getElementById("download-screenshot");
      if (!downloadButton) {
        downloadButton = document.createElement("a");
        downloadButton.id = "download-screenshot";
        downloadButton.style.display = "block";
        downloadButton.style.margin = "10px";
  
        // Append the download button to the modal content
        document.getElementById("myFormContent").appendChild(downloadButton);
      }
      downloadButton.href = dataUrl;
      downloadButton.download = "screenshot.png";
      downloadButton.textContent = "Download Screenshot";
    });
  });
  
  
  //submit to the backend, next step: finish
  function submitBugReport() {
    document.getElementById('notification').style= 'display: block';
  }

  //submit process, next step: finish
  document.getElementById("myFormContent").addEventListener("submit", function(event) {
    submitBugReport()
    
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
  });
  
  // Hide the modal if clicked outside
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  })
});