// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    UIManager.init();
    
    // Show new update indicator randomly
    setTimeout(() => {
        if (Math.random() > 0.5) {
            document.getElementById('new-update-indicator').style.display = 'block';
        }
    }, 3000);
});