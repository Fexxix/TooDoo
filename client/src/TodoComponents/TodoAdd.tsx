import { useForm } from "react-hook-form";

export type Todo = {
  title: string;
  description: string;
  is: string;
};
function TodoAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Todo>();

  const addTodo = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <form className="flex justify-center items-center my-8 text-2xl">
        <div className="lg:w-[75%] md:w-[90%] sm:w-[80%] flex justify-center items-center flex-col">
          <div className="w-full px-5 flex justify-center items-center  my-1 sm:flex-col lg:flex-row md:flex-row">
            <label htmlFor="title" className="text-white my-1 w-[15%]">
              Title:
            </label>
            <div className="w-[85%] h-full">
              <input
                placeholder="Add title of todo"
                className="outline-none border-none w-full h-full  py-3 px-5 rounded-2xl"
                type="text"
                id="description"
                {...register("title", {
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <div className="text-sm text-red-600">
                  {errors.title.message}
                </div>
              )}
            </div>
          </div>

          <div className="w-full px-5 flex justify-center items-center my-1 lg:flex-row md:flex-row sm:flex-col">
            <label htmlFor="description" className="text-white  w-[15%] ">
              Description:
            </label>
            <div className="w-[85%] h-full">
              <input
                placeholder="Add Description of todo"
                id="description"
                className="outline-none border-none w-full h-full py-3 px-5 rounded-2xl"
                {...register("description", {
                  minLength: {
                    value: 5,
                    message: "Description must be at least 5 characters",
                  },
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <div className="text-sm text-red-600 ">
                  {errors.description.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={handleSubmit(addTodo)}
          className="text-white items-center flex justify-center bg-orange-400 h-16 py-3 px-4 rounded-full hover:bg-orange-600 transform hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <img className="w-full h-full" src="plus-solid.svg" alt="" />
        </div>
      </form>
      {/* <TodooLists todoList={todoList} setTodosList={setTodosList} /> */}
    </>
  );
}

export default TodoAdd;
