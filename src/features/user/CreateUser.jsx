import { useState } from 'react';
import Button from '../../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from './userSlice';
import LinkButton from '../../ui/LinkButton';

function CreateUser() {
  const [username, setUsername] = useState('');
  // const { username: userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    navigate('/menu');
    setUsername('');
  }
  // note  lg:text-white means the class will be appliead from large screen to higher
  // sm:text-white means the class will be applied from small screen to higher
  return (
    <form onSubmit={handleSubmit}>
      <p className="space-y-2 p-4 py-4 text-lg font-semibold">👋 Welcome! Please start by telling us your name:</p>

      <input
        className="w-80 rounded-md border border-black bg-inherit p-2 text-center hover:border-yellow-500 lg:text-white"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      {username !== '' && (
        <div className="mt-4">
          <Button  size = 'md' type="primary">Start ordering</Button>

          {/* <LinkButton to={'/menu'}>Start Ordering</LinkButton> */}
        </div>
      )}
    </form>
  );
}

export default CreateUser;
