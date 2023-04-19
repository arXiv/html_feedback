document.addEventListener("DOMContentLoaded", () => {
  const reportBtn = document.querySelector(".report-btn");
  const content = document.querySelector(".content");
  let reportBox;
  let closeBtn;
  let textReport;
  const modal = document.getElementById('myForm')
  const close = modal.querySelector('.close')
  

reportBtn.addEventListener("click", () => {
    //createReportBox();
    modal.style.display = 'block'
  });

function generate_selected_screenshot(){
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
    scale: 0.5 // Set the scale to 50% (or any other value you want)
  }).then((canvas) => {
    var imageData = canvas.toDataURL("image/png");
    modal.style.display = 'block';
    // Set screenshot data in hidden input field or image element
    document.getElementById("screenshot").value = imageData;
    document.getElementById("screenshot-image").src = imageData;

    // Show screenshot image or input field
    document.getElementById("screenshot-image").style= "display: block";
  });
};

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

  // Rest of the code remains the same (createReportBox, closeReportBox, takeScreenshot)

/*document.addEventListener("keydown", (e) => {
    if (e.key === "s") {
      createReportBox();
    } else if (e.key === "c") {
      closeReportBox();
    }
  });*/


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
      scale:0.5
    }).then((canvas) => {
      var imageData = canvas.toDataURL("image/png");
      modal.style.display = 'block';
      // Set screenshot data in hidden input field or image element
      document.getElementById("screenshot").value = imageData;
      document.getElementById("screenshot-image").src = imageData;

      // Show screenshot image or input field
      document.getElementById("screenshot-image").style= "display: block";
    });
  });
  
  function submitBugReport() {
    document.getElementById('notification').style= 'display: block';
    /*
    // Capture a screenshot of the visible portion of the page using html2canvas
    html2canvas(document.body).then(function(canvas) {
      // Send the bug report data to the server (you'll need to update the URL and data values)
      fetch('/submit-bug-report', {
        method: 'POST',
        body: JSON.stringify({
          description: document.getElementById('description').value,
          screenshot: canvas.toDataURL(),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        // Hide the modal and show the notification
        //document.getElementById('my-modal').style.display = 'none';
        document.getElementById('notification').style= 'display: block';
      });*/
  }

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

  close.addEventListener('click', function(event) {
    // Hide the modal
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      // Hide the modal if clicked outside
      modal.style.display = 'none';
    }
  })
  
  /*
  document.getElementById("myFormContent").addEventListener("submit", function(event) {
    // Prevent form from submitting normally
    event.preventDefault();
  
    // Send form data and screenshot to backend using AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        //console.log(xhr.responseText);
        console.log("send data")
      }
    };
    var formData = new FormData(document.getElementById("myFormContent"));
    xhr.send(formData);
    
    // Extract the browser name and version information
    var userAgent = navigator.userAgent;
    var browserInfo = userAgent.match(/(firefox|edge|opr|chrome|safari)[\/]([\d.]+)/i);
    var browserName = browserInfo[1];
    var browserVersion = browserInfo[2];
  
    //Capitalize the first letter of the browser name
    browserName = browserName.charAt(0).toUpperCase() + browserName.slice(1);
  
    // Print the browser name and version information
    console.log('Browser:', browserName, browserVersion);

    // Hide modal
    document.getElementById("myForm").style.display = "none";
  });

  close.addEventListener('click', function(event) {
    // Hide the modal
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      // Hide the modal if clicked outside
      modal.style.display = 'none';
    }
  })*/


/*function createReportBox(x = null, y = null) {
    if (!reportBox) {
      reportBox = document.createElement("div");
      reportBox.classList.add("report-box");

      closeBtn = document.createElement("span");
      closeBtn.textContent = "x";
      closeBtn.classList.add("close-btn");

      const descriptionLabel = document.createElement("label");
      descriptionLabel.textContent = "Description:";
      descriptionLabel.setAttribute("for", "description");

      textReport = document.createElement("textarea");
      textReport.classList.add("text-report");

      const takeScreenshotBtn = document.createElement("button");
      takeScreenshotBtn.textContent = "Take Screenshot";
      takeScreenshotBtn.classList.add("take-screenshot");
      takeScreenshotBtn.addEventListener("click", takeScreenshot);

      reportBox.appendChild(closeBtn);
      reportBox.appendChild(descriptionLabel);
      reportBox.appendChild(textReport);
      reportBox.appendChild(takeScreenshotBtn);
      document.body.appendChild(reportBox);

      closeBtn.addEventListener("click", closeReportBox);
    }

    if (x !== null && y !== null) {
      reportBox.style.left = `${x}px`;
      reportBox.style.top = `${y}px`;
      reportBox.style.transform = "none";
    } else {
      reportBox.style.left = "";
      reportBox.style.top = "50%";
      reportBox.style.transform = "translateY(-50%)";
    }

    reportBox.style.display = "block";
  }

  function closeReportBox() {
    if (reportBox) {
      reportBox.style.display = "none";
    }
  }
  function takeScreenshot() {
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
    }).then((canvas) => {
      // const img = document.createElement("img");
      // img.id = "screenshot";
      // img.src = canvas.toDataURL();
      // img.style.position = "fixed";
      // img.style.zIndex = "-1"; // Hide the image from the user's view
      // img.style.width = "100%";
      // img.style.height = "auto";
      // img.style.maxWidth = "none";
      // img.style.maxHeight = "none";
      // document.body.appendChild(img);

      // getting vars
      const base64Screenshot = canvas.toDataURL();
      const description = document.querySelector(".text-report").value;
      if (description) {
        sendData(description, base64Screenshot);
      } else {
        console.error("description not defiend");
      }

      // const a = document.createElement("a");
      // a.href = img.src;
      // a.download = "screenshot.png";
      // a.click();
    });
  }
  function sendData(description, base64Screenshot) {
    // submit to server
    const formData = new FormData();
    formData.append("description", description);
    formData.append("screenshot-data", base64Screenshot);
    // Send to server
    fetch("http://localhost:5000/", {
      method: "POST",
      // headers: {
      //   "Content-Type": "applications/x-www-form-urlencoded",
      // },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      })
      .then((data) => {
        // Handle the response, e.g., show a success message or redirect to another page
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Remove the image from the DOM after the download is triggered
    // setTimeout(() => {
    //   img.remove();
    // }, 100);
  }
  // function submitScreenshot() {
  //   // Capture the screenshot as a base64 encoded image
  //   html2canvas(document.querySelector(".content")).then(function (canvas) {
  //     const base64Screenshot = canvas.toDataURL();

  //     // Set the value of the hidden input field
  //     document.getElementById("screenshot-data").value = base64Screenshot;

  //     // Submit the form
  //     document.getElementById("upload-form").submit();
  //   });
  // }

  // const takeScreenshotBtn = document.querySelector(".take-screenshot");
  // takeScreenshotBtn.removeEventListener("click", takeScreenshot);
  // takeScreenshotBtn.addEventListener("click", submitScreenshot);
  close.addEventListener('click', function(event) {
    // Hide the modal
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      // Hide the modal if clicked outside
      modal.style.display = 'none';
    }
  })*/
});