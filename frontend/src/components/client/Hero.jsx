import { Container, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { useLogoutMutation } from '../../slices/clientSlices/userApiSlice.js';
import { logout } from '../../slices/clientSlices/authSlice.js';

const Hero = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout success')
    } catch (error) {
      
    }
  }

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Hello {userInfo.name}</h1>
          
          <div className='d-flex'>
          <Button variant='secondary' href='/profile'>
              Profile
            </Button>

            <Button variant='primary' onClick={logoutHandler} className='me-3'>
              Logout
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;