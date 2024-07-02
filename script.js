function updateTime() {
  const now = new Date();
  const utcTime = now.toUTCString().slice(17, 25);
  const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });

  document.getElementById("date-time").textContent = utcTime + " " + dayOfWeek;
}

updateTime();
setInterval(updateTime, 1000);

const toggleButton = document.querySelector("#theme-toggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.classList.add(savedTheme);
  if (savedTheme === "dark-theme") {
    toggleButton.checked = true;
  }
}

toggleButton.addEventListener("change", () => {
  // Toggle between 'dark-theme' and 'light-theme'
  body.classList.toggle("dark-theme");

  // Save the current theme in local storage
  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
  } else {
    localStorage.removeItem("theme");
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true; // Disable the button to prevent multiple submissions
    button.textContent = "Please wait..."; // Change button text

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset(); // Reset the form fields
          const inputs = form.querySelectorAll("input, textarea");
          inputs.forEach((input) => input.classList.add("hidden"));

          button.textContent = "Thank you, your submission has been received";
          button.style.backgroundColor = "#28a745"; // Optional: Change button color to indicate success
          button.classList.add("success", "disabled");
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              alert("Oops! There was a problem with your submission.");
            }
          });
          button.disabled = false; // Re-enable the button
          button.textContent = "Send"; // Reset button text
        }
      })
      .catch((error) => {
        alert("Oops! There was a problem with your submission.");
        button.disabled = false; // Re-enable the button
        button.textContent = "Send"; // Reset button text
      });
  });

const currentDateElement = document.getElementById("current-date");
const currentDate = new Date();
currentDateElement.textContent = currentDate.toLocaleDateString("en-US", {
  year: "numeric",
});
