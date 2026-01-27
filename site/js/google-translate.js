// Google Translate Integration
const GoogleTranslateManager = {
    init() {
        this.loadGoogleTranslate();
    },
    
    loadGoogleTranslate() {
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            script.onerror = function() {
                console.error('Failed to load Google Translate script. Retrying...');
                setTimeout(() => GoogleTranslateManager.loadGoogleTranslate(), 2000);
            };
            document.body.appendChild(script);
        }
    },
    
    applyTranslateStyles() {
        const translateElements = document.querySelectorAll('.goog-te-gadget, .goog-te-gadget-simple, .goog-te-menu-value');
        translateElements.forEach(el => {
            if (el) {
                el.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
            }
        });
        
        // Force style updates
        const style = document.createElement('style');
        style.textContent = `
            .goog-te-gadget-simple {
                background-color: ${getComputedStyle(document.documentElement).getPropertyValue('--hover')} !important;
                border-color: ${getComputedStyle(document.documentElement).getPropertyValue('--border')} !important;
            }
            .goog-te-menu-value span {
                color: ${getComputedStyle(document.documentElement).getPropertyValue('--text-primary')} !important;
            }
        `;
        document.head.appendChild(style);
    }
};

// Google Translate callback function
function googleTranslateElementInit() {
    if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            includedLanguages: 'en,ar,fr,es,ur,id,tr'
        }, 'google_translate_element');
        
        // Apply custom styles after initialization
        setTimeout(() => GoogleTranslateManager.applyTranslateStyles(), 500);
    } else {
        console.log('Google Translate API not loaded yet, retrying...');
        setTimeout(googleTranslateElementInit, 300);
    }
}