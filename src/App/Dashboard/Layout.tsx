import Home from "../Home";
import BackImage  from '../../assets/pic.jpg'

export default function Layout() {
  return (
    <div className="w-full h-fit "
      style={{
        backgroundImage: `url(${BackImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}   
    >
      <Home/>
    </div>
  )
}
