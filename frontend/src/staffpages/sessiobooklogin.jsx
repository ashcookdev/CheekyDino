import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App({ signOut, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (user) {
      // Retrieve the current authenticated user's information
      Auth.currentAuthenticatedUser().then(userInfo => {
        // Check if the user is a member of one of the specified groups
        const groups = userInfo.signInUserSession.accessToken.payload['cognito:groups'];
        if (groups && groups.some(group => ['Staff', 'Developer', 'PartyHost', 'Admin', 'Superuser'].includes(group))) {
          // Redirect the user to the /chat page
          navigate('/');
          window.location.reload();
        } else {
          // Redirect the user to the /dashboard page
          navigate('/session');
          window.location.reload();
        }
      });
    }
  }, [user, navigate]);
}

export default withAuthenticator(App);
