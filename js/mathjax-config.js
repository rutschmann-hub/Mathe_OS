// MathJax Configuration
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
    },
    startup: {
        ready() {
            MathJax.startup.defaultReady();
            MathJax.startup.document.menu.settings.inTabOrder = false;
        }
    },
    chtml: {
        displayAlign: 'center'
    }
};
