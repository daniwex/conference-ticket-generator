const form = document.getElementsByTagName("form")[0];
const inputs = Array.from(document.querySelectorAll("input[type='text']"));
const email = document.querySelector("input[type='email']");
const file = document.querySelector("input[type='file']");
const infoText = document.getElementById("info-text");
const infoImg = document.getElementById("info-img");
const avatarContainer = document.getElementById("avatar-container");
let fname = "";
let mail = "";
let username = "";

// Error messages
const ERRORS = {
  EMPTY_INPUT: "Please enter a valid entry",
  EMPTY_EMAIL: "Email cannot be empty",
  INVALID_EMAIL: "Email is invalid; email should contain valid characters",
  LARGE_FILE: "File too large. Please upload a photo under 500KB.",
};

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();
  verifyInputs();

  let isValid = true;

  // Check text inputs
  if (!verifyInputs()) {
    isValid = false; // Mark as invalid if inputs fail
  } else {
  }

  // Check email validation
  if (!verifyEmail()) {
    email.style.border = "1px solid #F57463";
    createTextNode(email, ERRORS.EMPTY_EMAIL);
    isValid = false;
  }

  if (isValid) {
    localStorage.setItem("name", fname);
    localStorage.setItem("email", mail);
    localStorage.setItem("username", username);

    window.open("detail.html", "_blank");
  }
});

// Handle file input changes
file.addEventListener("change", (e) => {
  if (e.target.files.length === 0) return; // No file selected

  const fileInput = e.target.files[0];
  const fileSize = fileInput.size;

  if (fileSize > 500000) {
    infoText.classList.add("text-red");
    infoText.innerText = ERRORS.LARGE_FILE;
    infoImg.src = "/assets/images/icon-error.svg";
  } else {
    // Update success message
    infoText.innerText = "File uploaded successfully.";
    infoText.classList.remove("text-red");
    //infoImg.src = "/assets/images/icon-success.svg";

    // Read the file and add it to the DOM
    const reader = new FileReader();
    reader.onload = function (event) {
       localStorage.setItem("avartar", event.target.result); // Save Base64 string
      avatarContainer.src = event.target.result; // Set the image source to the data URL
      avatarContainer.alt = "Uploaded Image";
    };

    reader.readAsDataURL(fileInput); // Read the file as a data URL
  }
});

// Verify text inputs
function verifyInputs() {
  let allValid = true; // Initialize flag for input validation
  inputs.forEach((i) => {
    if (i.value.trim() === "") {
      createTextNode(i, "Please enter a valid entry");
      i.style.border = "1px solid #F57463";
      allValid = false; // Mark as invalid if an input is empty
    } else {
      i.style.border = "1px solid #4B4869"; // Reset border if valid
      switch (i.getAttribute("name")) {
        case "Name":
          fname = i.value; // Store name input
          break;
        case "Username":
          username = i.value; // Store username input
          break;
      }
    }
  });
  return allValid; // Return true if all inputs are valid
}

// Verify email input
function verifyEmail() {
  if (email.value.trim() === "") {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    email.style.border = "1px solid #F57463";
    createTextNode(email, ERRORS.INVALID_EMAIL);
    return false;
  }
  mail = email.value
  return true;
}

// Create error message
function createTextNode(inputElement, message) {
  const parent = inputElement.parentElement;

  // Avoid duplicate error messages
  if (parent.querySelector(".error-text")) return;

  const textNode = document.createElement("span");
  textNode.classList.add("error-text");
  textNode.innerHTML = `
      <span class='grid grid-template-1 items-center text-red pt-1 text-grey-400 small-text'>
        <img src='/assets/images/icon-error.svg' alt=''> ${message}
      </span>
    `;
  parent.appendChild(textNode);
  inputElement.classList.add("input-error");
}

// Clear all errors
function clearErrors() {
  document.querySelectorAll(".error-text").forEach((error) => error.remove());
  document
    .querySelectorAll(".input-error")
    .forEach((input) => input.classList.remove("input-error"));
  email.style.border = "1px solid #4B4869";
  inputs.forEach((el) => (el.style.border = "1px solid #4B4869"));

  // Reset file info only if file input is involved
  if (file.value) {
    infoImg.src = "/assets/images/icon-info.svg";
    infoText.innerText = "Upload your photo (JPG or PNG, max size: 500KB).";
    infoText.classList.remove("text-red");
  }
}
