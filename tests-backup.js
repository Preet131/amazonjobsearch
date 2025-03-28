
let apiKey = 'ff25f26091c49521387d403f95dfbe10-c02fd0ba-7bea2ff3';  // Replace with your actual Mailgun API key
let encodedApiKey = Buffer.from('api:' + apiKey).toString('base64');  // Base64 encode the "api:key-xxxxx"

// Capture the response data from the Amazon API
let amazonData = pm.response.json();  // Get the response as JSON

// Store the response in Postman environment for later use (email)
pm.environment.set("amazonResponse", JSON.stringify(amazonData));  // Save the response as a string in environment variable

let amazonResponse = pm.environment.get("amazonResponse");
console.log("Sending email with response data: ", amazonResponse);  // Log the value before sending

console.log("response data: ", amazonResponse);
pm.sendRequest({
    url: 'https://api.mailgun.net/v3/sandboxe03bb6de97654eafada088f78adbf62b.mailgun.org/messages',
    method: 'POST',
    header: {
        'Authorization': 'Basic ' + encodedApiKey  // Use encoded API key
    },
    body: {
        mode: 'formdata',
        formdata: [
            { key: 'from', value: 'Excited User <mailgun@sandboxe03bb6de97654eafada088f78adbf62b.mailgun.org>' },  // Replace with your verified sender email
            { key: 'to', value: 'preetvaghela83@gmail.com' },  // Replace with recipient email
            { key: 'subject', value: 'Amazon Job Search Results' },
            { key: 'text', value: 'Here are the latest Amazon job results:\n\n' + amazonResponse },
            { key: 'html', value: `<h1>Amazon Job Search Results</h1><pre>${amazonResponse}</pre>` }
        ]
    }
}, function (err, res) {
    if (err) {
        console.log('Error sending email:', err);
    } else {
        console.log('Email sent successfully:', res);
    }
});
