let create_header = () => {
    let header = document.createElement('header');
    let ABS_URL_BASE = 'https://arxiv.org/abs';
    let id = window.location.pathname.split('/')[2];
    if (id === 'submission') {
        header.innerHTML =
        '<a href="#main" class="skip">Skip to main content</a> \
        <img src="https://services.dev.arxiv.org/html/arxiv-logo-one-color-white.svg" alt="logo" role="presentation" class="logo"> \
        <img src="https://services.dev.arxiv.org/html/arxiv-logomark-small-white.svg" alt="logo" role="presentation" class="logomark"> \
        <div role="banner" class="header-message"> \
            <strong>Experimental HTML</strong>.Use Alt+Y to enable accessible section reporting links and Alt+Shift+Y to disable. \
        </div> \
        <div></div>';
    } else {
        header.innerHTML =
        `<a href="#main" class="skip">Skip to main content</a> \
        <img src="https://services.dev.arxiv.org/html/arxiv-logo-one-color-white.svg" alt="logo" role="presentation" class="logo"> \
        <img src="https://services.dev.arxiv.org/html/arxiv-logomark-small-white.svg" alt="logo" role="presentation" class="logomark"> \
        <div role="banner" class="header-message"> \
            <strong>Experimental HTML</strong>. Report rendering errors with the "Open Issue" button. <a href="#footer">Reference all keyboard commands</a> in the footer. \
        </div>`;
    }
    var issueLink = document.createElement('a');
    issueLink.setAttribute('class', 'ar5iv-footer-button');
    issueLink.setAttribute('target', '_blank');
    issueLink.style.color = 'white'
    issueLink.href = '#myForm';
    issueLink.textContent = 'Open Issue';

    var night = document.createElement('a');
    night.setAttribute('class', 'ar5iv-toggle-color-scheme');
    night.setAttribute('href', 'javascript:toggleColorScheme()');
    night.setAttribute('title', 'Toggle ar5iv color scheme');
    var nightSpan = document.createElement('span');
    nightSpan.setAttribute('class', 'color-scheme-icon');
    night.appendChild(nightSpan);
    night.style.float = 'right'

    document.body.insertBefore(header, document.body.firstChild);
    header.appendChild(issueLink)
    header.appendChild(night)
}

let create_footer = () => {
    let footer = document.createElement('footer');
    let footer1 = document.createElement('footer');
    footer.setAttribute('id', 'footer');
    footer.setAttribute('class', 'ltx_document');
    footer.innerHTML =
    // '<div class="ltx_page_footer"> \
    //     <div class="ltx_page_logo"> \
    //         Generated  on Tue Jul 25 18:10:32 2023 by \
    //         <a class="ltx_LaTeXML_logo" href="http://dlmf.nist.gov/LaTeXML/"> \
    //             <span style="letter-spacing:-0.2em; margin-right:0.1em;">L \
    //             <span style="font-size:70%;position:relative; bottom:2.2pt;">A \
    //             </span>T \
    //             <span style="position:relative; bottom:-0.4ex;">E \
    //             </span></span><span class="ltx_font_smallcaps">xml</span> \
    //             <img alt="[LOGO]" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAOCAYAAAD5YeaVAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQZLWTEaOUAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAdpJREFUKM9tkL+L2nAARz9fPZNCKFapUn8kyI0e4iRHSR1Kb8ng0lJw6FYHFwv2LwhOpcWxTjeUunYqOmqd6hEoRDhtDWdA8ApRYsSUCDHNt5ul13vz4w0vWCgUnnEc975arX6ORqN3VqtVZbfbTQC4uEHANM3jSqXymFI6yWazP2KxWAXAL9zCUa1Wy2tXVxheKA9YNoR8Pt+aTqe4FVVVvz05O6MBhqUIBGk8Hn8HAOVy+T+XLJfLS4ZhTiRJgqIoVBRFIoric47jPnmeB1mW/9rr9ZpSSn3Lsmir1fJZlqWlUonKsvwWwD8ymc/nXwVBeLjf7xEKhdBut9Hr9WgmkyGEkJwsy5eHG5vN5g0AKIoCAEgkEkin0wQAfN9/cXPdheu6P33fBwB4ngcAcByHJpPJl+fn54mD3Gg0NrquXxeLRQAAwzAYj8cwTZPwPH9/sVg8PXweDAauqqr2cDjEer1GJBLBZDJBs9mE4zjwfZ85lAGg2+06hmGgXq+j3+/DsixYlgVN03a9Xu8jgCNCyIegIAgx13Vfd7vdu+FweG8YRkjXdWy329+dTgeSJD3ieZ7RNO0VAXAPwDEAO5VKndi2fWrb9jWl9Esul6PZbDY9Go1OZ7PZ9z/lyuD3OozU2wAAAABJRU5ErkJggg=="> \
    //         </a> \
    //     </div> \
    // </div> \
    '<div class="keyboard-glossary ltx_page_content"> \
        <h2>Keyboard commands and instructions for reporting errors</h2> \
        <p>HTML versions of papers are experimental and a step towards improving accessibility and mobile device support. We appreciate feedback on errors in the HTML that will help us improve the conversion and rendering. Use the methods listed below to report errors:</p> \
        <ul> \
            <li>Use the "Open Issue" button.</li> \
            <li><strong>Ctrl + ?</strong> will open the report feedback form via keyboard.</li> \
            <li>If using a screen reader, <strong>Shift + b</strong> will toggle individual reporting buttons at each section on and off. Useful when you want to report an issue just within a specific section, as highligting is not screen reader compatible.</li> \
            <li>You can also highlight any text and click the "Open Issue" button that will display near your cursor. Highlighting is not screen reader compatible so the method above is also available.</li> \
            <li>Reporting will prompt you to login to Github to complete the process. Need an account? <a href="https://github.com/account/organizations/new?plan=free" target="_blank">Create a GitHub account for free</a>.</li> \
        </ul> \
        <p>We appreciate your time reviewing and reporting rendering errors in the HTML. It will help us improve the HTML versions for all readers and make papers more accessible, because disability should not be a barrier to accessing the research in your field. <a href="https://info.arxiv.org/about/accessible_HTML.html" target="_blank">Why is it important that research papers be accessible?</a>.</p> \
    </div>';

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

    var HTMLLink = document.createElement('a');
    HTMLLink.setAttribute('class', 'ar5iv-footer-button');
    HTMLLink.setAttribute('href', 'https://info.arxiv.org/about/accessible_HTML.html');
    HTMLLink.setAttribute('target', '_blank');
    HTMLLink.appendChild(document.createTextNode('Why HTML?'));

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

    document.body.appendChild(footer);
    document.body.appendChild(footer1);
    //footer.appendChild(footer1);
    footer1.appendChild(night)
    footer1.appendChild(copyLink)
    footer1.appendChild(policyLink)
    footer1.appendChild(HTMLLink)
    footer1.appendChild(TimeLogo)
    footer1.setAttribute('class', 'ltx_page_footer');
}

document.addEventListener("DOMContentLoaded", () => {
    create_header();
    create_footer();
});