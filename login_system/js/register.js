document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const user_email = document.getElementById("email").value;
    const user_password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email, user_password }),
    });

    const messageElement = document.getElementById("message");
    if (response.ok) {
      messageElement.textContent = "User registered successfully!";
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    } else {
      const errorMessage = await response.text();
      messageElement.textContent = errorMessage;
    }
  });
