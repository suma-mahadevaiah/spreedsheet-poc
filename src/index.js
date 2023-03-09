import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhkQlFacl1JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRjUH9ZcHZWR2hVVkM="
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

