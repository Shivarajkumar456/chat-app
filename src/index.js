import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Context/Authcontext';
import App from './App';
import { ChatProvider } from './Context/ChatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ChatProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatProvider>
  </AuthProvider>
);



