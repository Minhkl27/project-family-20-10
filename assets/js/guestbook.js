document.addEventListener('DOMContentLoaded', function () {
    const messageForm = document.getElementById('message-form');
    const messageList = document.getElementById('message-list');

    // Chỉ thực thi nếu tìm thấy danh sách lời chúc trên trang
    if (messageList) {
        const messagesCollection = db.collection('messages');

        // Tải và hiển thị TẤT CẢ lời chúc cho trang Sổ Tay chung
        messagesCollection.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            messageList.innerHTML = ''; // Xóa danh sách cũ
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const item = document.createElement('li');
                item.className = 'message-item';
                item.setAttribute('data-id', doc.id);

                // Thêm phần "Gửi đến" và nút "Sửa"
                const recipientHTML = data.recipient_name && data.recipient_id !== 'all' ? `<span class="message-recipient">Gửi ${data.recipient_name}</span>` : '';
                const editButtonHTML = `<button class="edit-btn" data-id="${doc.id}" data-message="${data.message}">Sửa</button>`;
                item.innerHTML = `<div class="message-header"><span class="message-author">${data.author}</span><div>${recipientHTML}${editButtonHTML}</div></div><p class="message-body">${data.message}</p>`;
                messageList.appendChild(item);
            });
        });
    }

    // Chỉ xử lý form nếu nó tồn tại trên trang
    if (messageForm) {
        messageForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Ngăn không cho trang tải lại

            // Lấy giá trị từ các ô nhập liệu
            const authorInput = document.getElementById('author');
            const recipientSelect = document.getElementById('recipient');
            const messageInput = document.getElementById('message');

            const recipientId = recipientSelect.value;
            const recipientName = recipientSelect.options[recipientSelect.selectedIndex].dataset.name;

            // Kiểm tra xem các ô bắt buộc có được điền không
            if (!authorInput.value.trim() || !messageInput.value.trim()) {
                alert('Vui lòng điền tên của bạn và lời nhắn nhé!');
                return;
            }

            // Gửi dữ liệu lên Firestore
            db.collection('messages').add({
                author: authorInput.value.trim(),
                recipient_id: recipientId,
                recipient_name: recipientName,
                message: messageInput.value.trim(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Thêm dấu thời gian
            });

            // Xóa nội dung trong form để chuẩn bị cho lần nhập tiếp theo
            messageForm.reset();
        });
    }

    // --- LOGIC CHO MODAL CHỈNH SỬA ---
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-message-form');
    const editMessageText = document.getElementById('edit-message-text');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    let currentMessageId = null;

    // Mở modal khi nhấn nút "Sửa"
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            currentMessageId = event.target.dataset.id;
            const currentMessage = event.target.dataset.message;
            editMessageText.value = currentMessage;
            editModal.classList.add('active');
        }
    });

    // Đóng modal
    const closeModal = () => {
        editModal.classList.remove('active');
        currentMessageId = null;
    };

    closeModalBtn.addEventListener('click', closeModal);
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeModal();
    });

    // Lưu thay đổi khi submit form trong modal
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const updatedMessage = editMessageText.value.trim();
        db.collection('messages').doc(currentMessageId).update({ message: updatedMessage }).then(closeModal);
    });
});