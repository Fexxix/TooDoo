import { v4 as uuidv4 } from "uuid";
import { useTodo } from "../Context/TodoProvider";
 export default function TodoLists() {
  const {
    todos,
    todostyle,
    remove,
    edit,
    handleInputChange,
    handleTextAreaChange,
    description
  } = useTodo()!;
  return (
    <>
      {todos.map((todo: any, index: number) => (
       <div key={index}
       className="bg-orange-400 my-2 lg:w-[65%] md:w-[80%] w-[90%] rounded-2xl overflow-hidden"
     >
       <div className="bg-orange-400 h-fit text-white flex flex-col px-6 py-3 justify-center items-center">
       <input
              onChange={(e) => {
                handleInputChange(e, index);
              }}
              id={`title-${index}`}
              disabled={todostyle[index]?.edit}
              className={`text-2xl bg-orange-400 border-white ${
                todostyle[index]?.edit ? "border-none" : "border-2"
              } py-1 px-3 w-full outline-none my-1 rounded-xl`}
              type="text"
              value={todostyle[index]?.title}
            />

         <div className="w-full h-full flex flex-col justify-center items-center mt-2">
         <div
                className="w-5 h-5"
                onClick={() => {
                  description(index);
                }}
              >
                <img
                  src={
                    !todostyle[index]?.description
                      ? "angle-down-solid.svg"
                      : "angle-up-solid.svg"
                  }
                  alt=""
                />
              </div>

           
              <textarea
                onChange={(e) => {
                  handleTextAreaChange(e, index);
                }}
                className={`bg-orange-400 scrollbar-hide px-3 py-1 rounded-lg mt-2 resize-none text-lg text-white  ${
                  todostyle[index]?.edit ? "border-none" : "border-2"
                } outline-none w-full transition-max-height duration-300`}
                id={`description-${index}`} // Added index to make id unique
                disabled={todostyle[index]?.edit}
                rows={2}
                value={todostyle[index]?.des} // Added empty string as fallback value
                style={{
                  maxHeight: !todostyle[index]?.description ? "0px" : "100px",
                  borderColor :!todostyle[index]?.description ? "#ED8936" : "white",
                }}
              ></textarea>
         </div>
       </div>

       <div className="w-full  h-fit flex justify-center items-center  text-white text-lg font-bold ">
            <button
              onClick={() => {
                edit(todo.id, index);
              }}
              className="overflow border-black border-2 mx-2 my-1 bg-black px-6 py-2 rounded-2xl"
            >
              {todostyle[index]?.edit ? "Edit" : "Done"}
            </button>

            <button
              className="overflow border-black border-2 mx-2 my-1 bg-black px-6 py-2 rounded-2xl"
              onClick={() => {
                remove(todo.id, index);
              }}
            >
              Remove
            </button>
          </div>
     </div>
    // <div  className="bg-orange-400 my-2 lg:w-[65%] md:w-[80%] w-[90%] rounded-2xl overflow-hidden">
    //       <div className="bg-orange-400 h-fit text-white flex flex-col px-6 py-3 justify-center items-center">
    //         <input
    //           className={`text-2xl bg-orange-400 border-white py-1 px-3 w-full outline-none my-1 rounded-xl`}
    //           type="text"
    //           value={"bjbjbjb"}
    //         />

    //         <div className="w-full h-full flex flex-col justify-center items-center mt-2">
    //           <div
    //             className="w-5 h-5"
    //             onClick={() => {
    //               setDescription(des ? false : true);
    //             }}
    //           >
    //             <img src={"angle-down-solid.svg"} alt="" />
    //           </div>

    //           <textarea
    //             className={`bg-orange-400 scrollbar-hide px-3 py-1 rounded-lg mt-2 resize-none text-lg text-white  border-white  outline-none w-full transition-max-height duration-300`}
    //             id={`description`} // Added index to make id unique
    //             disabled={des}
    //             rows={2}
    //             value={"bjjjjb"} // Added empty string as fallback value
    //             style={{
    //               maxHeight: des ? "0px" : "100px",
    //             }}
    //           ></textarea>
    //         </div>
    //       </div>

    //       <div className="w-full  h-fit flex justify-center items-center  text-white text-lg font-bold ">
    //         <button className="overflow border-black border-2 mx-2 my-1 bg-black px-6 py-2 rounded-2xl"></button>

    //         <button className="overflow border-black border-2 mx-2 my-1 bg-black px-6 py-2 rounded-2xl">
    //           Remove
    //         </button>
    //       </div>
    //     </div>
      ))}
    </>
  );
}
