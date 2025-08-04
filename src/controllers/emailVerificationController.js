const emailExistence = require('email-existence');
const verifier = require('email-verify');

const verifyEmail = async (req, res) => {

    try {
        const { email } = req.body;
        const checkParams = {
            firstCheck: false,
            firstMessage: null,
            secondCheck: false,
            secondMessage: null,
        };

        // Create a Promise for the first check
        const firstCheckPromise = new Promise((resolve, reject) => {
            emailExistence.check(email, (error, response) => {
                if (error) {
                  //  console.error('Error:', error);
                    checkParams.firstCheck = false;
                    checkParams.firstMessage = error;
                    reject(error); // Reject the promise on error
                } else {
                    checkParams.firstCheck = true;
                    checkParams.firstMessage = response;
                 //   console.log('Email exists first time:', response);
                    resolve(response); // Resolve the promise with the response
                }
            });
        });

        // Wait for the first check to complete
        await firstCheckPromise;

        // Create a Promise for the second check
        const secondCheckPromise = new Promise((resolve, reject) => {
            verifier.verify(email, (err, info) => {
                if (err) {
                    checkParams.secondCheck = false;
                    checkParams.secondMessage =  JSON.stringify(err, null, 2);
                    reject(err); // Reject the promise on error
                } else {
                    checkParams.secondCheck = true;
                    checkParams.secondMessage =  JSON.stringify(info, null, 2);
                //    console.log("2nd time Success (T/F): " + info.success);
                 //   console.log("Info: " + JSON.stringify(info, null, 2));
                    resolve(info); // Resolve the promise with the info
                }
            });
        });

        // Wait for the second check to complete
        await secondCheckPromise;

        // Send the final response after both checks are done
        res.status(201).json({ message: 'Check Successful', checkParams });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }

};

const verifyGetMethod = async (req, res) => {
    try {
        res.status(201).json({message: 'Yes successfully logged in'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    verifyEmail,
    verifyGetMethod,
}
