const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("77243451644-sm86nvr25q3o51eijm3o5m48a0r72fed.apps.googleusercontent.com");

const googleVerify = async(token = '') => {

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "77243451644-sm86nvr25q3o51eijm3o5m48a0r72fed.apps.googleusercontent.com",
            // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });

        if (ticket) {

            const { given_name, family_name, picture, email } = ticket.getPayload();

            return {
                given_name,
                family_name,
                picture,
                email
            }

        } else {
            given_name = undefined,
                family_name = undefined,
                picture = undefined,
                email = undefined
        }

    } catch (error) {
        return error;

    }


}

module.exports = {
    googleVerify
}