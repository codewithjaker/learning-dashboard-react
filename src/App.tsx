// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';
// // import { Toaster } from "./components/ui/sonner";
// import { Toaster } from './components/ui/toaster';
// import AppRoutes from './routes/AppRoutes';

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <AppRoutes />
//         <Toaster />
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;


import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext';
import { store } from './store';
import { Toaster } from './components/ui/toaster';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;