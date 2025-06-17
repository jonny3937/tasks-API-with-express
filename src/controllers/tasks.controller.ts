import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

// GET ALL
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await client.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// CREATE
export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const task = await client.task.create({
      data: { title, description },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};


// GET BY ID
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await client.task.findUnique({
      where: { id: Number(id) },
    });
  
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};


// UPDATE
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const updatedTask = await client.task.update({
      where: { id: Number(id) },
      data: { title, description, isCompleted },
    });
    res.status(200).json(updatedTask);
  } catch (_e) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await client.task.delete({ where: { id: Number(id) } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
};
