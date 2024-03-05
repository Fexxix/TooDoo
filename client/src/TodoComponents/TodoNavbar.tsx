import { useAuth } from "../Context/AuthProvider";

function TodoNavbar() {
  const { logout } = useAuth()!;
  return (
    <>
      <div className="bg-orange-400 fixed w-full top-0  h-fit items-center flex justify-between z-50 px-6">
        <h1 className="text-white  w-fit text-4xl font-bold py-3 ">
          My Toodoos
        </h1>
        <button
          onClick={logout}
          className="overflow text-white font-bold border-black border-2 mx-2 my-1 bg-black px-6 py-2 rounded-2xl"
        >
          logout
        </button>
      </div>
    </>
  );
}

export default TodoNavbar;
