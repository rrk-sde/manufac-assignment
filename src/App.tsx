import React from 'react';
import {
  createTheme, MantineProvider, localStorageColorSchemeManager,
} from '@mantine/core';
import DataTable from './components/DataTable';
import "./App.css"
const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
});

const App: React.FC = () => {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
    >
      <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
        <h1>Agriculture Data Aggregation</h1>
        <div>
          <DataTable />
        </div>
      </div>
    </MantineProvider>
  );
};

export default App;
