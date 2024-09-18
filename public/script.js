document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const confirmMessage = document.getElementById('confirm-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        confirmMessage.classList.remove('hidden');

        form.reset();
    })

    
})