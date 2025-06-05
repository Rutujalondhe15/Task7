function fetchUserData() {
  const userList = document.getElementById("user-list");
  const errorMessage = document.getElementById("error-message");

  userList.innerHTML = "";
  errorMessage.textContent = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(users => {
      // Shuffle array
      const shuffled = users.sort(() => 0.5 - Math.random());
      // Get 5 random users
      const selected = shuffled.slice(0, 5);

      selected.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        userCard.innerHTML = `
          <h2>${user.name}</h2>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city}</p>
        `;

        userList.appendChild(userCard);
      });
    })
    .catch(error => {
      errorMessage.textContent = "⚠️ Failed to fetch user data. Please check your internet connection.";
      console.error("Fetch error:", error);
    });
}
