// Evento para carregar os dados do usuário ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '../login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById('userEmail').textContent = userData.user_email;
        } else {
            console.error('Error getting user:', response.statusText);
            window.location.href = '../login.html';
        }
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '../login.html';
    }
});

// Evento para atualizar o usuário
document.getElementById('updateUser').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../login.html';
        return;
    }

    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const messageElement = document.getElementById('message');

    const body = {};
    if (newEmail) body.newEmail = newEmail;
    if (newPassword) body.newPassword = newPassword;

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            messageElement.textContent = 'User updated successfully!';
        } else {
            const errorMessage = await response.json();
            messageElement.textContent = errorMessage.message || 'Error deleting user. Verify data and try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'Network error. Unable to connect to the server. Try again later.';
    }
});

// Evento para excluir o usuário
document.getElementById('deleteUser').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../login.html';
        return;
    }

    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            window.location.href = '../login.html';
        } else {
            const errorMessage = await response.json();
            messageElement.textContent = errorMessage.message || 'Error deleting user.';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'Network error. Unable to connect to the server. Try again later.';
    }
});
