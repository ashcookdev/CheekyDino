import {Auth} from 'aws-amplify';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { useNavigate } from 'react-router-dom';


export default function Unsubscribe() {

    const [userEmail, setUserEmail] = useState('');
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [unsubscribe, setUnsubscribe] = useState(false);
    const [unsubscribed, setUnsubscribed] = useState(false);


    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserEmail = async () => {
          const user = await Auth.currentAuthenticatedUser();
          if (user) {
            setUserEmail(user.attributes.email);
            setLoading(true);
          } else {
            // If there is no user, navigate to the root
            navigate('/');
          }
        };
      
        fetchUserEmail();
      }, []);
      
      const handleUnsubscribe = async () => {
        const matchingSessions = sessions.filter(session => session.Email === userEmail);
      
        // Check if any sessions were found
        if (matchingSessions.length > 0) {
          for (const session of matchingSessions) {
            await DataStore.save(Sessions.copyOf(session, updated => {
              updated.EmailSubscription = false;
            }));
          }
          setUnsubscribe(true);
          setUnsubscribed(true);
      
          // After successfully unsubscribing, navigate to the root
          navigate('/');
        } else {
          console.log('No session found for this email');
        }
      };
      
      
    
    useEffect(() => {
        const fetchSessions = async () => {
        setLoading(true);
        const sessions = await DataStore.query(Sessions);
        setSessions(sessions);
        setLoading(false);
        };
    
        fetchSessions();
    }, [userEmail]);
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div>
        <h1>Unsubscribe</h1>
        <p>Are you sure you want to unsubscribe from our mailing list?</p>
        <button onClick={handleUnsubscribe}>Unsubscribe</button>
        </div>
    );
    }