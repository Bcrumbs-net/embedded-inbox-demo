import React from 'react';
import { Theme } from '@radix-ui/themes';
import './styles/App.css';
import EmbeddedInboxTest from './components/EmbeddedInboxTest';

const App: React.FC = () => {
    return (
        <Theme>
            <div className="App">
                <EmbeddedInboxTest />
            </div>
        </Theme>
    );
};

export default App;