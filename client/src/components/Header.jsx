import { useSelector } from "react-redux"
import { Link } from "react-router-dom";



const Header = () => {

    const {currentUser} = useSelector(state=> state.user);

  return (
    <header className="bg-slate-200 shadow-md">
    
    <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Task</span>
            <span className="text-slate-700">Management</span>
        </h1>
        </Link> 

        <div>
          <Link to={'/user-feed'}>
            <h1 className="text-sky-950 font-bold"> Feed</h1>
          </Link>
        </div>
      
       <div className="flex gap-3">
        {currentUser ? (
            <Link to="/profile" className="font-semibold">
                {currentUser?.username || currentUser?.email || "Profile"} 
            </Link>
        ) : (
            <Link to="/sign-in" className="font-semibold">Sign In</Link>
        )}
       </div>
    </div>
    </header>
  )
}

export default Header
