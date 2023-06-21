import React, { useContext } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import useUser from '../Hook/UseUser';


const Home = () => {
    const { user } = useContext(AuthContext)
    const [currentUserStatus ] = useUser();
    return (
        <div>
            
            
  <div className="w-36 mx-auto">
    <img className='rounded-full w-36'  src={user?.photoURL?user.photoURL:'data:image/png;base64,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'} />
            </div>
            <div className='bg-slate-200 w-1/2 mx-auto rounded-xl p-4 my-4'>
            <h1 className='font-bold text-2xl text-center my-4'>{user?.displayName}</h1>
            <p className='text-center'>Email: {user?.email}</p>
            <p className='font-bold text-center'>Your are: <span className='text-red-600'>{currentUserStatus?.role}</span></p>
            </div>
        </div>
    );
};

export default Home;