$(document).ready(function() {
    function enableEdit(button) {
        var row = $(button).closest('tr');
        row.find('.student-name').hide();
        row.find('.edit-name').show();
        row.find('.student-email').hide();
        row.find('.edit-email').show();
        $(button).hide();
        row.find('.deleteStudentButton').prop('disabled', true);
        row.find('.updateStudentButton').show();
    }

    function updateStudent(button) {
        var row = $(button).closest('tr');
        var studentId = row.find('.editStudentButton').attr('data-student-id');
        var updatedName = row.find('.edit-name').val();
        var updatedEmail = row.find('.edit-email').val();

        fetch('http://localhost:8080/student/edit/' + studentId+'?name='+updatedName+'&email='+updatedEmail, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Student updated successfully');
                    location.reload();
                } else {
                    console.error('Failed to update student');
                }
            });
    }
    function deleteStudent(button) {
        var studentId = button.getAttribute('data-student-id');
        // Add code for deleting the student based on studentId
        // For example, you can send it with a POST request, display it, or perform any other action
        console.log('Student ID: ' + studentId);

        // Add your code to delete the student using the 'studentId' variable
        // Send the data as JSON via AJAX POST request  DELETE http://localhost:8080/student/delete/3
        fetch('http://localhost:8080/student/delete/'+studentId, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status === 200) {
                    // Handle success, e.g., show a success message
                    console.log('Student with ID:'+studentId+' deleted successfully');
                    location.reload();
                } else {
                    // Handle error, e.g., show an error message
                    console.error('Failed to delete student');
                }
            });
    }

    $('.editStudentButton').click(function() {
        enableEdit(this);
    });

    $('.updateStudentButton').click(function() {
        updateStudent(this);
    });
});


function deleteStudent(button) {
    // Retrieve the student ID from the data attribute
    var studentId = button.getAttribute('data-student-id');

    // Now you can use the 'studentId' variable in your function
    // For example, you can send it with a POST request, display it, or perform any other action
    console.log('Student ID: ' + studentId);

    // Add your code to delete the student using the 'studentId' variable
    // Send the data as JSON via AJAX POST request  DELETE http://localhost:8080/student/delete/3
    fetch('http://localhost:8080/student/delete/'+studentId, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                // Handle success, e.g., show a success message
                console.log('Student with ID:'+studentId+' deleted successfully');
                location.reload();
            } else {
                // Handle error, e.g., show an error message
                console.error('Failed to delete student');
            }
        });
}

$(document).ready(function() {
    // Initialize the date picker
    $('#datepicker').datepicker({
        format: 'yyyy-mm-dd', // Set the desired date format
        autoclose: true // Close the calendar when a date is selected
    });

    $('#addStudentButton').click(function() {
        // Pre-validation
        var nameInput = $('#nameInput').val().trim();
        var emailInput = $('#emailInput').val().trim();
        var dobInput = $('#datepicker').val().trim();

        var nameRegex = /^[A-Za-z\s]+$/;
        var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

        if (nameInput === '' || !nameRegex.test(nameInput)) {
            alert('Name is invalid or empty.');
            return;
        }

        if (emailInput === '' || !emailRegex.test(emailInput)) {
            alert('Email is invalid or empty.');
            return;
        }

        if (dobInput === '') {
            alert('Date of Birth is required.');
            return;
        }

        // If all pre-validation checks pass, you can proceed to send the POST request
        sendStudentData(nameInput, emailInput, dobInput);
    });
});

function sendStudentData(name, email, dob) {
    // Gather data from the form
    const studentData = {
        name: name,
        email: email,
        dob: dob
    };

    // Send the data as JSON via AJAX POST request
    fetch('http://localhost:8080/student/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
        .then(response => {
            if (response.status === 200) {
                // Handle success, e.g., show a success message
                console.log('Student added successfully');
                location.reload();
            } else {
                // Handle error, e.g., show an error message
                console.error('Failed to add student');
            }
        });
}
