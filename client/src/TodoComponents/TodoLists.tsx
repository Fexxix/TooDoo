export default function TodooLists(props: any) {
  const { setTodosList, todoList } = props

  const handleComplete = (i: number) => {
    setTodosList((p: any) => {
      const updatedTodos = [...p]
      if (updatedTodos[i].editImage === "check-solid.svg") {
        updatedTodos[i] = {
          ...updatedTodos[i],
          editImage: "pen-to-square-solid.svg",
        }
        updatedTodos[i] = { ...updatedTodos[i], inputType: true }
        updatedTodos[i] = { ...updatedTodos[i], border: "none" }
        updatedTodos[i] = { ...updatedTodos[i], isComplete: true }
      }
      updatedTodos[i] = {
        ...updatedTodos[i],
        complete: "check-double-solid.svg",
      }
      updatedTodos[i] = { ...updatedTodos[i], textDecor: "line-through" }
      return updatedTodos
    })
  }

  const handleDel = (i: number) => {
    setTodosList([...todoList.slice(0, i), ...todoList.slice(i + 1)])
  }

  const handleEdit = (i: number) => {
    if (!todoList[i]) {
      if (todoList[i].editImage === "pen-to-square-solid.svg") {
        setTodosList((prevTodos: any) => {
          const updatedTodos = [...prevTodos]
          updatedTodos[i] = { ...updatedTodos[i], editImage: "check-solid.svg" }
          updatedTodos[i] = { ...updatedTodos[i], inputType: false }
          updatedTodos[i] = { ...updatedTodos[i], border: "2" }
          return updatedTodos
        })
      } else {
        setTodosList((prevTodos: any) => {
          const updatedTodos = [...prevTodos]
          updatedTodos[i] = {
            ...updatedTodos[i],
            editImage: "pen-to-square-solid.svg",
          }
          updatedTodos[i] = { ...updatedTodos[i], inputType: true }
          updatedTodos[i] = { ...updatedTodos[i], border: "none" }
          return updatedTodos
        })
      }
    }
  }

  const handleInputChange = (index: number, newText: string) => {
    setTodosList((prevTodos: any) => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index].text = newText
      return updatedTodos
    })
  }

  return (
    <>
      <div
        className="mt-8"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => {
            setTodosList([])
          }}
          className="cursor-pointer my-4 text-white relative left-0 w-fit h-fit  py-3 px-4 bg-orange-400 rounded-full hover:bg-orange-600 transform hover:scale-110 hover:scale-x-125 transition-transform duration-300 ease-in-out "
        >
          clear all
        </div>
        {todoList.map((todo: any, index: any) => (
          <div
            key={index}
            className="w-[450px] mt-3 h-14 flex bg-orange-400 justify-center item-center px-2 rounded-2xl"
          >
            <div
              onClick={() => {
                handleComplete(index)
              }}
              className="w-6 h-full item-center mx-2"
            >
              <img className="w-full h-full " src={todo.complete} alt="" />
            </div>
            <input
              onChange={(e) => handleInputChange(index, e.target.value)}
              disabled={todo.inputType}
              className={`${todo.textDecor} bg-orange-400 text-2xl text-white w-[350px] outline-none border-${todo.border} border-white my-1 px-1 rounded-xl `}
              type="text"
              value={!todo.text ? "List" : todo.text}
            />
            <div
              onClick={() => {
                handleEdit(index)
              }}
              className="w-6 h-full ml-6  mx-2"
            >
              <img
                className="w-full h-full text-red-300"
                src={todo.editImage}
                alt=""
              />
            </div>
            <div
              onClick={() => {
                handleDel(index)
              }}
              className="w-6 h-full mx-2"
            >
              <img
                className="w-full h-full text-red-300"
                src="trash-can-regular.svg"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
