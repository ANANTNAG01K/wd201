let userForm = document.getElementById('form');

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    } else{
        entries =[];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tablerecords = entries.map((entry) => {
        const namecell = `<td>${entry.name}</td>`;
        const emailcell = `<td>${entry.email}</td>`;
        const passwordcell = `<td>${entry.password}</td>`;
        const dobcell = `<td>${entry.dob}</td>`;
        const acceptTermscell = `<td>${entry.acceptTermsAndConditions}</td>`;

        const row = `<tr>${namecell} ${emailcell} ${passwordcell} ${dobcell} ${acceptTermscell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table border=1>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
        <tr>${tablerecords}</tr></table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.getElementById('dob').addEventListener('input', function() {
    const dob = this.value;
    const age = calculateAge(dob);

    if (age < 18) {
        this.setCustomValidity('You must be over 18 years old to register.');
    } else if (age > 55) {
        this.setCustomValidity('You must be under 55 years old to register.');
    } else {
        this.setCustomValidity('');
    }
});

const saveForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTermsAndConditions = document.getElementById("acceptTerms").checked;

    const age = calculateAge(dob);

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}

userForm.addEventListener("submit", saveForm);
displayEntries();
