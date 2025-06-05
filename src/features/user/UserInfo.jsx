import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';

function UserInfo() {
  const { username } = useSelector((state) => state.user);
  if (!username) return <LinkButton>LogIn</LinkButton>;
  return <div className="hidden text-sm font-semibold md:block">{username} </div>;
}

export default UserInfo;
