import {Link} from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'





const Error = () => {
    return (
        <Wrapper>
            <div className='full-page'>
                <img src={img} alt='not found' />
                <h1>Oh! Page Not Found</h1>
                <p>We can't seem to page you're looking for</p>
                <Link to='/'>Back home</Link>
            </div>
            
        </Wrapper>
    )
}

export default Error;