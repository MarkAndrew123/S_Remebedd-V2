import React, { useEffect } from 'react';
import axios from 'axios'
import { embedDashboard } from '@superset-ui/embedded-sdk';

const SupersetDashboard = () => {

  useEffect(() => {
    console.log('Token from localStorage:', localStorage.getItem('token'));

    const fetchGuestToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/superset/guest-token', {
          headers: {
            'Content-Type' :'application/json' ,
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const guestToken = response.data.guestToken;

        embedDashboard({
          id: '74ac2956-bb71-4411-985e-9ae5f010886e', // The Superset dashboard ID
          supersetDomain: 'https://mypartnershipview.mtn.ng',
          mountPoint: document.getElementById('superset-container'),
          fetchGuestToken: () => Promise.resolve(guestToken),
          dashboardUiConfig: { hideTitle: true }
        });

      } catch (error) {
        console.error('Error embedding Superset dashboard', error);
      }
    };

    fetchGuestToken();
  }, []);

  return (
    <div>
      <h1>Superset Dashboard</h1>
      <div id="superset-container" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};

export default SupersetDashboard;
