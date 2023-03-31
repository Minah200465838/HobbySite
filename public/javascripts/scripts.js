// client-side js functions
function confirmDelete() {
    return confirm('Are you sure you want to delete this?');
}

function comparePasswords() {
    let pw1 = document.getElementById('password').value;
    let pw2 = document.getElementById('confirm').value;
    let pwMsg = document.getElementById('pwMsg');

    if (pw1 != pw2) {
        pwMsg.innerText = "Passwords do not match";
        pwMsg.className = "text-danger";
        return false;
    }
    else {
        pwMsg.innerText = "";
        pwMsg.className = "";
        return true;
    }
}
