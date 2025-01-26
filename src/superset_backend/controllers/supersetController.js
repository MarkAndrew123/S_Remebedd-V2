const axios = require('axios');

exports.getSupersetGuestToken = async (req, res) => {
    try {
        
        const loginResponse = await axios.post('', {
            username: 'admin', 
            password: 'admin_password',
            provider: 'db',
            refresh: true
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        const accessToken = loginResponse.data.access_token;

        
        const guestTokenResponse = await axios.post('', {
            resources: [{ type: 'dashboard', id: '' }],
            rls: [],
            user: {
                username: '',
                first_name: '',
                last_name: ''
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
