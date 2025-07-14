import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClientProvider } from './lib/QueryClientProvider';

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
