function draggable(element) {
    var isMouseDown = false;
    var mouseX, mouseY;
    var elementX = 0;
    var elementY = 0;

    element.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    function onMouseDown(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseDown = true;
    }

    function onMouseUp() {
        isMouseDown = false;
        elementX = parseInt(element.style.left) || 0;
        elementY = parseInt(element.style.top) || 0;
    }

    function onMouseMove(event) {
        if (!isMouseDown) return;
        var deltaX = event.clientX - mouseX;
        var deltaY = event.clientY - mouseY;
        element.style.left = elementX + deltaX + 'px';
        element.style.top = elementY + deltaY + 'px';
    }
}

// Make the mail verification form draggable
draggable(document.getElementById('mailVerificationForm'));

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately
    document.getElementById('mailVerificationForm').style.display = 'block'; // Show the email verification form
   // Here you can add code to submit the form and handle the response
    document.getElementsByClassName('form-container sign-up-container').style.opacity=50;
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately
    document.getElementById('mailVerificationForm').style.display = 'block'; // Show the email verification form
    // Here you can add code to submit the form and handle the response
    document.getElementsByClassName('form-container sign-up-container').style.opacity=50;
    
 });


$(document).ready(function() {
    $('#signupForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Serialize form data
        var formData = $(this).serialize();

        // Send AJAX request
        $.ajax({
            type: 'POST',
            url: '/send-otp',
            data: formData,
            success: function(response) {
                alert('Email sent successfully');
               // $('#response').text(response);
               // $('#mailVerificationForm').style.display='block'; // Update the response message
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});

$(document).ready(function() {
    $('#resendButton').click(function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Select the form containing the input fields
        var formData = $('#signupForm').serialize();

        // Send AJAX request
        $.ajax({
            type: 'POST',
            url: '/send-otp',
            data: formData,
            success: function(response) {
                alert('Email resent successfully')
                console.log('Email resent successfully');
                // Optionally, you can provide feedback to the user here
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                // Optionally, you can handle errors and provide feedback to the user here
            }
        });
    });
});

$(document).ready(function() {
$('#verificationInput').on('input', function() {
$('#response').empty(); // Empty the response section when input is entered
});

$('#verificationInput').on('input', function() {
var inputValue = $(this).val();
if (inputValue.length > 6) {
    $(this).val(inputValue.slice(0, 6)); // Limit input to maximum of 6 characters
}
});
});


$(document).ready(function() {
// Event listener for the "Email Verification" button
$('#emailVerificationButton').click(function(event) {
event.preventDefault(); // Prevent default form submission

// Get the entered OTP from the input field
var enteredOTP = $('#verificationInput').val(); // Get the generated OTP stored in the form's data attribute

// Send AJAX request to verify OTP
$.ajax({
    type: 'POST',
    url: '/verify-otp', // Replace with your server endpoint for OTP verification
    data: {
        otp: enteredOTP,
    },
    success: function(response) {
        if (response.success) {
            //$('#response').text('OTP matched. Account created.');
            alert('OTP matched.')
            var formData = {
                name: $('#signupName').val(),
                email: $('#signupEmail').val(),
                password: $('#signupPassword').val(),
                mobile: $('#signupMobile').val(),
                cnic: $('#signupCNIC').val(),
                nearestStation: $('#signupNearestStation').val()
            };

            // Construct a new form dynamically with hidden inputs
            var newForm = $('<form action="/SignIn" method="post"></form>');
            newForm.append('<input type="text" name="name" value="' + formData.name + '">');
            newForm.append('<input type="email" name="email" value="' + formData.email + '">');
            newForm.append('<input type="password" name="password" value="' + formData.password + '">');
            newForm.append('<input type="text" name="mobile" value="' + formData.mobile + '">');
            newForm.append('<input type="text" name="cnic" value="' + formData.cnic + '">');
            newForm.append('<input type="hidden" name="nearestStation" value="' + formData.nearestStation + '">');

            // Append the new form to the body and submit it
            $('body').append(newForm);
            newForm.submit();

           //// window.location.href = '/SignIN'; // Display success message
        } else {
            $('#response').text('OTP not  match.'); // Display error message
        }
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
        $('#response').text('Error verifying OTP.'); // Display error message
    }
});
});
});


