import { Router } from "express"
import { isAuthenticated } from "../middleware/is-authenticated"
import { TodoModel } from "../models/todoModel"

export const todoRouter = Router()

todoRouter.use("/", isAuthenticated)

todoRouter.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find({
      // @ts-ignore
      userId: req.session.user._id as string,
    })

    res.json({
      todos: todos.map((t) => ({
        title: t.title,
        id: t._id,
        description: t.description,
      })),
    })
  } catch {
    res.status(500).json({ message: "Error occured while fetching todos" })
  }
})

todoRouter.post("/add", async (req, res) => {
  const { title, description, id } = req.body

  try {
    const todo = await TodoModel.create({
      title,
      description,
      userId: id,
    })
    res.status(201).json(todo)
  } catch (err) {
    res.status(500).json({ message: "Error occured while addiing todo" })
  }
})

todoRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params
    await TodoModel.findByIdAndDelete(id)
    res.json({ message: "Todo deleted successfully" })
  } catch {
    res.status(500).json({ message: "Error deleting todo" })
  }
})

todoRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description },
      {
        new: true,
      }
    )
    res.json(updatedTodo)
  } catch {
    res.status(500).json({ message: "Error updating todo" })
  }
})
