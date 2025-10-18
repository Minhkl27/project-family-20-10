document.addEventListener('DOMContentLoaded', function () {
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');
    const eventsCollection = db.collection('events'); // 'events' là tên bộ sưu tập trên Firestore

    // --- HÀM ĐỂ HIỂN THỊ MỘT SỰ KIỆN LÊN GIAO DIỆN ---
    function renderEvent(doc) {
        const data = doc.data();

        const newEventItem = document.createElement('li');
        newEventItem.classList.add('event-item');
        newEventItem.setAttribute('data-id', doc.id);

        // Tạo nội dung HTML cho sự kiện mới
        newEventItem.innerHTML = `
            <div class="event-date">
                <span class="day">${data.day}</span>
                <span class="month">Tháng ${data.month}</span>
            </div>
            <div class="event-details">
                <h3 class="title">${data.title}</h3>
                <p class="description">${data.description}</p>
            </div>
        `;

        // Thêm sự kiện mới vào danh sách (sắp xếp theo timestamp)
        eventList.appendChild(newEventItem);
    }

    // --- TẢI VÀ HIỂN THỊ TẤT CẢ SỰ KIỆN KHI MỞ TRANG ---
    eventsCollection.orderBy('timestamp', 'asc').onSnapshot(snapshot => {
        // Xóa danh sách cũ trước khi hiển thị danh sách mới
        eventList.innerHTML = '';
        snapshot.docs.forEach(doc => {
            renderEvent(doc);
        });
    });

    // --- XỬ LÝ KHI GỬI FORM ---
    if (eventForm) {
        eventForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Ngăn không cho trang tải lại

            // Lấy giá trị từ các ô nhập liệu
            const day = document.getElementById('event-day').value.trim();
            const month = document.getElementById('event-month').value.trim();
            const title = document.getElementById('event-title').value.trim();
            const description = document.getElementById('event-description').value.trim();

            if (!day || !month || !title) {
                alert('Vui lòng điền Ngày, Tháng và Tên sự kiện nhé!');
                return;
            }

            // Gửi dữ liệu lên Firestore
            eventsCollection.add({
                day: day,
                month: month,
                title: title,
                description: description,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            eventForm.reset();
        });
    }
});