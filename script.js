// Contact Form Validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    // Validate inputs
    if (!name || !email || !message) {
      alert('All fields are required!');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset(); // Clear the form after submission
  });
}

// Email Validation Helper Function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Hover Effects for Images (optional animations)
document.querySelectorAll('.service-card img, .project-card img').forEach(img => {
  img.addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
  });
  img.addEventListener('mouseout', function () {
    this.style.transform = 'scale(1)';
  });
});

// Ensure the script runs after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS
  emailjs.init("kV6PGPuwnTGUt4CQq"); // Replace with your EmailJS User ID

  // Handle form submission
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form behavior

    // Get the submit button to change text later
    const submitButton = document.querySelector("button[type='submit']");
    
    // Change the button text to "Sending..."
    submitButton.innerHTML = "Sending...";

    // Use EmailJS to send form data
    emailjs.sendForm("service_wshsc3q", "template_8itgg0i", this)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        
        // Change button text to "Sent"
        submitButton.innerHTML = "Sent";

        // Reset the form after successful submission
        document.getElementById("contact-form").reset();

        // Reset button text to "Send Message" after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = "Send Message";
        }, 3000); // 3 seconds delay
      })
      .catch(function (error) {
        console.error("FAILED...", error);
        alert("There was an error sending your message. Please try again.");

        // Reset the button text to "Send Message" in case of failure
        submitButton.innerHTML = "Send Message";
      });
  });
});
