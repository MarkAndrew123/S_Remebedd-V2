const axios = require('axios');

exports.getSupersetGuestToken = async (req, res) => {
    try {
        
        const loginResponse = await axios.post('https://mypartnershipview.mtn.ng/api/v1/security/login', {
            username: 'admin', 
            password: 'admin_password',
            provider: 'db',
            refresh: true
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        const accessToken = loginResponse.data.access_token;

        
        const guestTokenResponse = await axios.post('https://mypartnershipview.mtn.ng/superset/api/v1/security/guest_token', {
            resources: [{ type: 'dashboard', id: '74ac2956-bb71-4411-985e-9ae5f010886e' }],
            rls: [],
            user: {
                username: 'partner',
                first_name: 'report-viewer',
                last_name: 'report-viewer'
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }

        });
       

        const guestToken = guestTokenResponse.data.token;
        res.json({ guestToken });

    } catch (error) {
        console.error('Error generating guest token', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
