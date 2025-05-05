import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Inbox, ThemeProvider } from '@bcrumbs.net/inbox';
import { dconfigClient } from '@bcrumbs.net/bc-api';


const EmbeddedInboxTest: React.FC = () => {
    const [isStorageReady, setIsStorageReady] = useState(false);

    useEffect(() => {
        // Initialize the localStorage with API key, context id (workspace id), and user info
        localStorage.setItem('ContextId', '1132');
        localStorage.setItem('token', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
        localStorage.setItem('userInfo', '{"username":"agent","id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}');
        setIsStorageReady(true);
    }, []);

    if (!isStorageReady) {
        return <div>Loading...</div>;
    }

    return (
        <ApolloProvider client={dconfigClient}>
            <ThemeProvider>
                <div className="test-wrapper">
                    <Inbox rtl={false} onConversationChange={(conv) => console.log(`Conversation with id ${conv.id} is selected`)} />
                </div>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default EmbeddedInboxTest;