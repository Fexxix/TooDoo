import { useState, useRef } from "react"
import TodooLists from "./TodoLists"

export type Todo = {
  text: string
  complete: string
  inputType: boolean
  editImage: string
  textDecor: string
  border: string
  iscomplete: boolean
}

function TodoAdd() {
  const inputElement = useRef<HTMLInputElement | null>(null)
  const [todoList, setTodosList] = useState<Todo[]>([])

  return (
    <>
      <div className="flex justify-center items-center my-8 text-2xl">
        <input
          ref={inputElement}
          className="outline-none border-none w-[400px] py-3 px-5 rounded-l-2xl"
          type="text"
          name=""
          id=""
        />
        <button
          className="text-white items-center flex justify-center bg-orange-400 h-16 py-3 px-4 rounded-r-2xl hover:bg-orange-600 transform hover:scale-110 transition-transform duration-300 ease-in-out"
          onClick={() =>
            setTodosList([
              ...todoList,
              {
                text: inputElement.current!.value,
                complete: "check-solid.svg",
                inputType: true,
                editImage: "pen-to-square-solid.svg",
                textDecor: "no-underline",
                border: "none",
                iscomplete: false,
              },
            ])
          }
        >
          Add
        </button>
      </div>
      <TodooLists todoList={todoList} setTodosList={setTodosList} />
    </>
  )
}

export default TodoAdd
