
document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    
    signUpButton.addEventListener('click', function() {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', function() {
        container.classList.remove('right-panel-active');
    });
});
// document.getElementById('signupForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the form from submitting immediately
//     document.getElementById('mailVerificationForm').style.display = 'block'; // Show the email verification form
//     // Here you can add code to submit the form and handle the response
//     document.getElementsByClassName('form-container sign-up-container').style.opacity=50;
    
// });
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(event.target);

    // Convert form data to JSON
    const data = Object.fromEntries(formData.entries());

    // Send form data to the server
    fetch('/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text()) // Assuming the server sends a text response
    .then(data => {
        // Display the server response on the email verification form
        document.getElementById('mailVerificationForm').style.display = 'block';
        document.getElementById('response').innerHTML = data; // Assuming you have a div with id 'response'
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
