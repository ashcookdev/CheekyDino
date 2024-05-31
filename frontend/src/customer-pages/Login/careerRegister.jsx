import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToApply = async () => {
      try {
        if (user) {
          navigate('/jobs/apply');
        }
      } catch (error) {
        console.error('Error redirecting to /jobs/apply:', error);
      }
    };

    redirectToApply();
  }, [user, navigate]);

  return (
    <>
      <h1>Hello {user.username}</h1>
    </>
  );
}

export default withAuthenticator(App);
