let create_header = () => {
    let header = document.createElement('header');
    let ABS_URL_BASE = 'https://arxiv.org/abs';
    let id = window.location.pathname.split('/')[2];
    if (id === 'submission') {
        header.innerHTML =
        '<a href="#main" class="skip">Skip to main content</a> \
        <img src="images/arxiv-logo-one-color-white.svg" alt="logo" role="presentation" class="logo"> \
        <img src="images/arxiv-logomark-small-white.svg" alt="logo" role="presentation" class="logomark"> \
        <div role="banner" class="header-message"> \
            <strong>Experimental HTML</strong>. Report rendering errors with the "Open Issue" button or click <strong>option/Alt+Y</strong> to toggle accessible section reporting links on and <strong>Shift+option/Alt+Y</strong> off. <a href="#footer">Reference all keyboard commands</a> in the footer. \
        </div> \
        <div></div>';
    } else {
        header.innerHTML =
        `<a href="#main" class="skip">Skip to main content</a> \
        <img src="images/arxiv-logo-one-color-white.svg" alt="logo" role="presentation" class="logo"> \
        <img src="images/arxiv-logomark-small-white.svg" alt="logo" role="presentation" class="logomark"> \
        <div role="banner" class="header-message"> \
            <strong>Experimental HTML</strong>. Report rendering errors with the "Open Issue" button or click <strong>option/Alt+Y</strong> to toggle accessible section reporting links on and <strong>Shift+option/Alt+Y</strong> off. <a href="#footer">Reference all keyboard commands</a> in the footer. \
        </div> \
        <a href="${ABS_URL_BASE}/${id}"> \
            Back to Abstract \
            <svg id="back-arrow" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#ffffff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg> \
        </a>`;
    }

    document.body.insertBefore(header, document.body.firstChild);
}

let create_footer = () => {
    let footer = document.createElement('footer');
    footer.setAttribute('id', 'footer');
    footer.setAttribute('class', 'ltx_document');
    footer.innerHTML =
    '<div class="ltx_page_footer"> \
        <div class="ltx_page_logo"> \
            Generated  on Tue Jul 25 18:10:32 2023 by \
            <a class="ltx_LaTeXML_logo" href="http://dlmf.nist.gov/LaTeXML/"> \
                <span style="letter-spacing:-0.2em; margin-right:0.1em;">L \
                <span style="font-size:70%;position:relative; bottom:2.2pt;">A \
                </span>T \
                <span style="position:relative; bottom:-0.4ex;">E \
                </span></span><span class="ltx_font_smallcaps">xml</span> \
                <img alt="[LOGO]" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQZLWTEaOUAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAdpJREFUKM9tkL+L2nAARz9fPZNCKFapUn8kyI0e4iRHSR1Kb8ng0lJw6FYHFwv2LwhOpcWxTjeUunYqOmqd6hEoRDhtDWdA8ApRYsSUCDHNt5ul13vz4w0vWCgUnnEc975arX6ORqN3VqtVZbfbTQC4uEHANM3jSqXymFI6yWazP2KxWAXAL9zCUa1Wy2tXVxheKA9YNoR8Pt+aTqe4FVVVvz05O6MBhqUIBGk8Hn8HAOVy+T+XLJfLS4ZhTiRJgqIoVBRFIoric47jPnmeB1mW/9rr9ZpSSn3Lsmir1fJZlqWlUonKsvwWwD8ymc/nXwVBeLjf7xEKhdBut9Hr9WgmkyGEkJwsy5eHG5vN5g0AKIoCAEgkEkin0wQAfN9/cXPdheu6P33fBwB4ngcAcByHJpPJl+fn54mD3Gg0NrquXxeLRQAAwzAYj8cwTZPwPH9/sVg8PXweDAauqqr2cDjEer1GJBLBZDJBs9mE4zjwfZ85lAGg2+06hmGgXq+j3+/DsixYlgVN03a9Xu8jgCNCyIegIAgx13Vfd7vdu+FweG8YRkjXdWy329+dTgeSJD3ieZ7RNO0VAXAPwDEAO5VKndi2fWrb9jWl9Esul6PZbDY9Go1OZ7PZ9z/lyuD3OozU2wAAAABJRU5ErkJggg=="> \
            </a> \
        </div> \
    </div> \
    <div class="keyboard-glossary ltx_page_content"> \
        <h2>Keyboard commands and instructions for reporting errors</h2> \
        <p>HTML versions of papers are experimental and a step towards improving accessibility and mobile device support. We appreciate feedback on errors in the HTML that will help us improve the conversion and rendering. Use the methods listed below to report errors:</p> \
        <ul> \
            <li>Use the "Open Issue" button.</li> \
            <li><strong>Ctrl + ?</strong> will open the report feedback form via keyboard.</li> \
            <li>If using a screen reader, <strong>option/Alt+Y</strong> will toggle individual reporting buttons at each section on and <strong>Shift+option/Alt+Y</strong> off. Useful when you want to report an issue just within a specific section, as highligting is not screen reader compatible.</li> \
            <li>You can also highlight any text and click the "Open Issue" button that will display near your cursor. Highlighting is not screen reader compatible so the method above is also available.</li> \
            <li>Reporting will prompt you to login to Github to complete the process. Need an account? <a href="https://github.com/account/organizations/new?plan=free" target="_blank">Create a GitHub account for free</a>.</li> \
        </ul> \
        <p>We appreciate your time reviewing and reporting rendering errors in the HTML. It will help us improve the HTML versions for all readers and make papers more accessible, because disability should not be a barrier to accessing the research in your field. <a href="https://info.arxiv.org/about/accessible_HTML.html" target="_blank">Why is it important that research papers be accessible?</a>.</p> \
    </div>';

    document.body.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", () => {
    create_header();
    create_footer();
});