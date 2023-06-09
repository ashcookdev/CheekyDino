import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { Messages } from './models';
import { Auth } from 'aws-amplify';

const templates = ['Party Host to Front Desk', 'Party Finished Clean Upstairs', 'Table (number) Food is Ready'];

function App() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [selectedGroups, setSelectedGroups] = React.useState([]);

  React.useEffect(() => {
    fetchMessages();
    const subscription = DataStore.observe(Messages).subscribe(() =>
      fetchMessages()
    );
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
    Auth.currentAuthenticatedUser().then((user) =>
      setUserEmail(user.attributes.email)
    );
    return () => subscription.unsubscribe();
  }, []);

  async function fetchMessages() {
    const messagesData = await DataStore.query(Messages);
    setMessages(messagesData);
  }

  async function handleAddMessage() {
    const user = await Auth.currentAuthenticatedUser();
    const { email, username } = user.attributes;
    const createdAt = new Date().toISOString().split('T')[1];
    await DataStore.save(
      new Messages({
        content: inputValue,
        email,
        group: [...selectedGroups, 'TeamLeader', 'Admin','Developer'], // always include TeamLeader and Admin groups
        createdAt
      })
    );
    setInputValue('');
  }

  const groups = ['Kitchen', 'PartyHost','Staff'];
  const sortedMessages = [...messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="p-4">
      <div className="mb-4 text-lg font-bold">Logged in as: {userEmail}</div>
      <select
        multiple
        value={selectedGroups}
        onChange={(e) =>
          setSelectedGroups(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
        className="border p-2 rounded-lg mb-4"
      >
        {groups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>

      <div className="border p-4 mb-4 h-64 overflow-y-scroll shadow-md rounded-lg">
        {sortedMessages.map((message) => (
          <div
            key={message.id}
            className={`p-2 rounded-lg mb-2 ${
              message.email === userEmail ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            <div className="font-bold">{message.email}</div>
            {message.content}
          </div>
        ))}
      </div>
      <input
        className="border p-2 mr-2 w-full rounded-lg"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 mr-2 rounded-lg w-full mt-2"
        onClick={handleAddMessage}
      >
        Add Message
      </button>
      <div className="flex mt-2">
        {templates.map((template) => (
          <button
            key={template}
            className="bg-gray-200 text-black p-2 mr-2 rounded-lg"
            onClick={() => setInputValue(template)}
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
