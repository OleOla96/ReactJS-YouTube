import React from 'react';
import { createRoot } from 'react-dom/client';
import { ProviderValue } from './context/ProviderValue';

import App from './App';
import GlobalStyles from './components/global';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GlobalStyles>
    <ProviderValue>
      <App />
    </ProviderValue>
  </GlobalStyles>,
);
