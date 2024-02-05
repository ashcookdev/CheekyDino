import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import EventBooking from '../eventbooking';

function App({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { state: { events } = {} } = location;

  // Now you can use the events variable in this component
  console.log(events);

  useEffect(() => {
    // Check if the user is authenticated
    if (user) {
      // Retrieve the current authenticated user's information
      Auth.currentAuthenticatedUser().then((userInfo) => {
        // Check if the user is a member of one of the specified groups
        const groups =
          userInfo.signInUserSession.accessToken.payload['cognito:groups'];
        if (
          groups &&
          groups.some((group) =>
            ['Staff', 'Developer', 'PartyHost', 'Admin', 'Superuser'].includes(
              group
            )
          )
        ) {
          // Redirect the user to the /dashboard page
          navigate('/dashboard');
        }
      });
    }
  }, [user, navigate]);

  return <EventBooking events={events} />;
}

export default withAuthenticator(App);
