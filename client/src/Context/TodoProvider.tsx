import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";
import { default as axios, AxiosError } from "axios";
import { useAuth } from "./AuthProvider";

type todo = {
  edit: boolean;
  description: boolean;
  title: string;
  des: string;
};
export type Todo = {
  title: string;
  description: string;
  id: string;
};

type TodoContextType = {
  addTodo: (data: any) => Promise<void>;
  remove: (id: string, i: number) => Promise<void>;
  edit: (id: string, i: number) => Promise<void>;
  handleInputChange: (e: any, index: number) => void;
  handleTextAreaChange: (e: any, index: number) => void;
  todos: Todo[];
  todostyle: todo[];
  loading: boolean;

  error: { message: string };
  description: (i: number) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export function useTodo() {
  return useContext(TodoContext);
}
export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth()!;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todostyle, setTodoStyle] = useState<todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ message: "" });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (user) {
          const res = await axios.get(`${API_URL}/todos`, {
            withCredentials: true,
          });
          setTodos(res.data.todos);
          setLoading(false);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.data.message) {
            setError({ message: e.response.data.message });
          } else {
            e.cause?.message && setError({ message: e.cause.message });
          }
        } else {
          setError({ message: "An error occurred while logging in." });
        }
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    setTodoStyle(
      Array.from(todos, (todo) => ({
        edit: true,
        description: false,
        title: todo.title,
        des: todo.description,
      }))
    );
  }, [todos]);

  const addTodo = async (data: any) => {
    if (user) {
      const newData = { ...data, id: user.id };
      try {
        await axios.post(`${API_URL}/todos/add`, newData, {
          withCredentials: true,
        });
        setTodos([...todos, newData]);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const remove = async (id: string, i: number) => {
    try {
      await axios.delete(`${API_URL}/todos/delete/${id}`, {
        withCredentials: true,
      });
      setTodos((prevTodos: any) => [
        ...prevTodos.slice(0, i),
        ...prevTodos.slice(i + 1),
      ]);
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const edit = async (id: string, i: number) => {
    if (todostyle[i]?.edit === true) {
      setTodoStyle((prevStyles: any) => {
        const updatedStyles = [...prevStyles];
        updatedStyles[i] = { ...updatedStyles[i], edit: false };
        return updatedStyles;
      });
    } else {
      try {
        await axios.patch(
          `${API_URL}/todos/update/${id}`,
          { title: todostyle[i]?.title, description: todostyle[i]?.des },
          {
            withCredentials: true,
          }
        );

        setTodoStyle((prevStyles: any) => {
          const updatedStyles = [...prevStyles];
          updatedStyles[i] = { ...updatedStyles[i], edit: true };
          return updatedStyles;
        });
      } catch (error) {
        console.error("Error editing todo:", error);
      }
    }
  };

  const handleInputChange = (e: any, index: number) => {
    setTodoStyle((prevStyles: any) => {
      const updatedStyles = [...prevStyles];
      updatedStyles[index] = {
        ...updatedStyles[index],
        title: e.target.value,
      };
      return updatedStyles;
    });
  };

  const handleTextAreaChange = (e: any, index: number) => {
    const updatedTodos = [...todostyle];
    updatedTodos[index] = {
      ...updatedTodos[index],
      des: e.target.value,
    };
    setTodoStyle(updatedTodos);
  };

  const description = (i: number) => {
    setTodoStyle((prevStyles: any) => {
      const updatedStyles = [...prevStyles];
      updatedStyles[i] = {
        ...updatedStyles[i],
        description: updatedStyles[i]?.description ? false : true,
      };
      return updatedStyles;
    });
  };

  const value = {
    addTodo,
    todos,
    todostyle,
    handleInputChange,
    handleTextAreaChange,
    remove,
    edit,
    loading,
    error,
    description,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
