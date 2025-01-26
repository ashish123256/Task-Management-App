import { useDispatch, useSelector } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/user/userSlice";
import { apiUrl } from "../baseUrl";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      const res = await fetch(`${apiUrl}/api/auth/signout`,{
        credentials:"include"
      });
      const data = await res.json(); 
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
      } else {
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[150px]">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser?.username || ""}
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser?.email || ""}
          className="border p-3 rounded-lg"
          id="email"
        />
      </form>
      <div className="flex justify-center mt-5">
        <span className="cursor-pointer" onClick={handleSignOut}>LogOut</span>
      </div>
    </div>
  );
};

export default Profile;