const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
const request = mailjet.post("sender").request({
        "Email":"rajonwitness@gmail.com"
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })

function handleError (err) {
    throw new Error(err.ErrorMessage);
}

exports.sendMail = function(name, recipient, sender, subject, html, message){
    email = {};
    email.FromName = name;
    email.FromEmail = 'rajonwitness@gmail.com';
    email.Subject = subject;
    email.Recipients = [{Email: recipient}];
    email['HTML-Part'] = html + '<p>' + message + '<p>' + 'From, ' + '</p>' + '<p>' + name + '</p>' + sender;

    mailjet.post('send')
        .request(email)
        .catch(handleError);
}
