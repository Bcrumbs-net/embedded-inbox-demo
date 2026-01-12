import React, { useEffect, useState } from 'react';
import { ApolloProvider, ServerError } from '@apollo/client';
import { Inbox, ThemeProvider, dconfigClient, setErrorHandler } from '@bcrumbs.net/inbox';
import { ConvsFilters } from '@bcrumbs.net/inbox/src/app/inbox/utils/convs';

setErrorHandler(({ networkError, graphQLErrors }) => {
    console.log('networkError', networkError);
    if (
        networkError &&
        ((networkError as ServerError).statusCode > 500 &&
            (networkError as ServerError).statusCode !== 503)
    ) {
        console.log('The server is down, please try again later.');
    }

    if (
        graphQLErrors &&
        graphQLErrors.find((error) => error?.extensions?.['code'] === 'UNAUTHENTICATED')
    ) {
        console.log('The token is expired or invalid, please get a new token.');
    }
});


const EmbeddedInboxTest: React.FC = () => {
    const [isStorageReady, setIsStorageReady] = useState(false);
    const [filters, setFilters] = useState<ConvsFilters>({ nameOrPhone: '90507', ended: true });

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
            <ThemeProvider initialThemeValues={{ rtl: true, toggleLang: () => { } }}>
                <div className="test-wrapper" dir="rtl">
                    <Inbox
                        rtl={true}
                        showDetails={true}
                        onConversationChange={(conv) => console.log(`Conversation with id ${conv.id} is selected`)}
                        initialFilters={filters}
                        onFiltersChange={(filters) => {
                            console.log(`Filters changed to ${JSON.stringify(filters)}`);
                            setFilters(filters);
                        }}
                        logo={"https://png.pngtree.com/png-clipart/20190614/original/pngtree-settings-line-black-icon-png-image_3767553.jpg"} 
                        clientSectionPlaceholder={<div>Client section placeholder</div>}
                        />
                </div>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default EmbeddedInboxTest;