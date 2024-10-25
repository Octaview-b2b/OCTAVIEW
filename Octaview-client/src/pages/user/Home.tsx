import{Link} from 'react-router-dom'
import Navbar from '../../components/user/NavBar'

function Home() {
  return (
 <>
    <div className="text-red-600 ">
    <ul className="gap-7  flex justify-end p-3">
    <Link to={'/login'}><li>Login</li></Link>
    <li>Docs</li>
    </ul>
    </div>
    <Navbar/>
 </>
  )
}

export default Home