document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body');
    const numberOfFlowers = 50; // Bạn có thể điều chỉnh số lượng hoa ở đây

    // Chỉ tạo hiệu ứng trên màn hình lớn hơn 768px để tránh làm chậm điện thoại
    if (window.innerWidth > 768) {
        for (let i = 0; i < numberOfFlowers; i++) {
            let flower = document.createElement('div');
            flower.className = 'falling-flower';

            // Ngẫu nhiên hóa các thuộc tính để hiệu ứng tự nhiên hơn
            flower.style.left = Math.random() * 100 + 'vw'; // Vị trí ngang ngẫu nhiên
            flower.style.animationDuration = (Math.random() * 5 + 5) + 's'; // Tốc độ rơi ngẫu nhiên (từ 5 đến 10 giây)
            flower.style.animationDelay = Math.random() * 5 + 's'; // Độ trễ ngẫu nhiên (lên đến 5 giây)
            flower.style.opacity = Math.random();
            flower.style.fontSize = (Math.random() * 10 + 10) + 'px'; // Kích thước ngẫu nhiên

            body.appendChild(flower);
        }
    }
});