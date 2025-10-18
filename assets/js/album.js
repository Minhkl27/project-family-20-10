document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active class on button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter images
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const galleryItemsForLightbox = document.querySelectorAll('.gallery-item');

    galleryItemsForLightbox.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = item.querySelector('img').src;
        });
    });

    // Function to close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    // Close lightbox when clicking the close button or the overlay
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Only close if clicking on the overlay itself
            closeLightbox();
        }
    });
});