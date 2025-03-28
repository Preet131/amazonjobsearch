const axios = require('axios'); // Make sure to install axios if using Node.js

// Function to send email
async function sendEmail() {
    // Retrieve environment variables
    const amazonResponse = process.env.AMAZON_RESPONSE;
    const sendEmailFlag = process.env.SEND_EMAIL;

    if (sendEmailFlag === 'true' && amazonResponse) {
        try {
            // Mailgun API key and encoded key
            let apiKey = 'ff25f26091c49521387d403f95dfbe10-c02fd0ba-7bea2ff3';
            let encodedApiKey = Buffer.from('api:' + apiKey).toString('base64');

            // Send email using Axios
            const response = await axios.post('https://api.mailgun.net/v3/sandboxe03bb6de97654eafada088f78adbf62b.mailgun.org/messages', null, {
                headers: {
                    'Authorization': 'Basic ' + encodedApiKey,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    from: 'Excited User <mailgun@sandboxe03bb6de97654eafada088f78adbf62b.mailgun.org>',
                    to: 'vaghela131@gmail.com, preetvaghela131@gmail.com, diya.vaghela.2112@gmail.com, lavvsss114@gmail.com',
                    subject: 'Amazon Job Search Results',
                    text: `Here are the latest Amazon job results:\n\n${amazonResponse}`,
                    html: `<h1>Amazon Job Search Results</h1><pre>${amazonResponse}</pre>`
                }
            });

            console.log('Email sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending email:', error.message);
        }
    }
}

// Run the sendEmail function
sendEmail();
