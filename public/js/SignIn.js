
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
document.getElementById('signupForm').addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();

    // Validate email
    var email = document.getElementById('signupEmail').value;
    if (!/^[a-z0-9._%+-]+@gmail\.com$/.test(email)) {
        alert('Please enter a valid Gmail address.');
        document.getElementById('signupEmail').value="";
        return;
    }

    // Validate password
    var password = document.getElementById('signupPassword').value;
    if (!/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,}$/.test(password)) {
        alert('Password must contain at least one lowercase letter, one uppercase letter, and be at least 8 characters long.');
        document.getElementById('signupPassword').value="";
        return;
    }

    // Validate mobile number
    var mobile = document.getElementById('signupMobile').value;
    if (!/^\d{11}$/.test(mobile)) {
        alert('Mobile number must be 11 digits long.');
        document.getElementById('signupMobile').value="";
        return;
    }

    // Validate CNIC
    var cnic = document.getElementById('signupCNIC').value;
    if (!/^\d{13}$/.test(cnic)) {
        alert('CNIC must be 13 digits long.');
        document.getElementById('signupCNIC').value="";
        return;
    }

    // If all validations pass, submit the form
    this.submit();
});


