import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';
import GlobalStyles from './components/global';
// import { getContents } from './app/features/contents/contentsSlice';
const container = document.getElementById('root');
const root = createRoot(container);
// store.dispatch(getContents(1));

root.render(
  <GlobalStyles>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyles>,
);
