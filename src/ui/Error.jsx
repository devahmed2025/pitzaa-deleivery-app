import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  // const navigate = useNavigate();
  const error = useRouteError();

  console.error(error); // log full error for debugging

  // Safely access nested properties
  const errorMessage = error?.data || error?.message || error?.error?.message || 'Unknown error occurred';

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
