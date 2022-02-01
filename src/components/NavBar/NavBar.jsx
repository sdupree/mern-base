import { Link } from 'react-router-dom';

export default function NavBar({user}) {
  console.log(user);
  return (
    <nav>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      Hello, {user.name}
    </nav>
  );
}