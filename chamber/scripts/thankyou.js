const params =
new URLSearchParams(window.location.search);

const submittedInfo =
document.querySelector("#submitted-info");



submittedInfo.innerHTML = `
<p><strong>First Name:</strong> ${params.get("firstname")}</p>

<p><strong>Last Name:</strong> ${params.get("lastname")}</p>

<p><strong>Email:</strong> ${params.get("email")}</p>

<p><strong>Phone:</strong> ${params.get("phone")}</p>

<p><strong>Business:</strong> ${params.get("business")}</p>

<p><strong>Date Submitted:</strong> ${params.get("timestamp")}</p>
`;