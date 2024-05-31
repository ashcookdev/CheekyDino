import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import CustomerDashboard from '../customerlogin/customerdashboard';

function App({ signOut, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { party, price } = location.state;

  const [enquire, setEnquire] = useState(null);
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (user) {
      Auth.currentAuthenticatedUser()
        .then((userInfo) => {
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
            navigate('/chat');
          } else {
            setEnquire(party);
            setNext(true);
          }
        })
        .catch((error) => {
          console.log('Error getting current authenticated user: ', error);
          // Handle the error here
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the promise is resolved
        });
    }
  }, [user, navigate, party, price]);

  useEffect(() => {
    if (next && enquire && !loading) { // Check that loading is false before navigating
      navigate('/enquirycontact', { state: { party: enquire }, replace: true });
      window.location.reload();
    }
  }, [next, navigate, enquire, loading]); // Add loading to the dependency array

  if (loading) {
    return <div>Loading...</div>; // Return a loading screen while loading is true
  }

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
