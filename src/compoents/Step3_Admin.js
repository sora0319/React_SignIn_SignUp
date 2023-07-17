import { Link } from 'react-router-dom';
import Users from './Step3_User';

const Admin = () => {
    return (
        <section>
            <h1>Admins page</h1>
            <br />
            <Users />
            <br />
            <div className='flexGrow'>
                <Link to='/'>Home</Link>
            </div>
        </section>
    )
}