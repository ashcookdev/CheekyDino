import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import CustomerDashboard from '../customerlogin/customerdashboard';

function App({ signOut, user }) {
  const navigate = useNavigate();

  const location = useLocation();
  const { selectedDate, selectedTimeSlot, partyid } = location.state;

  console.log(selectedDate);
  console.log(selectedTimeSlot);
  console.log(partyid);

  const party = partyid[0].name;
  const price = partyid[0].price;

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
          // Redirect the user to the /chat page
          navigate('/staffintro');
        }
      });
    }
  }, [user, navigate]);

  return (
   <CustomerDashboard />
 
  );
}

export default withAuthenticator(App);
