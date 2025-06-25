import { Request, Response } from "express";
import client from "../db/db";

// ✅ Create Task
export const createtasks = async (req: Request, res: Response) => {
  const { task_name, task_description, team_id } = req.body;

  if (!task_name || !team_id) {
    return res.status(400).json({ message: "Task name and team ID are required." });
  }

  try {
    const result = await client.query(
      `INSERT INTO tasks (task_name, task_description, team_id, is_completed) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [task_name, task_description || "", team_id, false]
    );

    res.status(201).json({ task: result.rows[0] });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// ✅ Get Tasks by Team
export const gettasks = async (req: Request, res: Response) => {
  const teamId = req.query.team_id;

  if (!teamId) {
    return res.status(400).json({ message: "team_id query param is required" });
  }

  try {
    const result = await client.query(
      `SELECT * FROM tasks WHERE team_id = $1 ORDER BY created_at DESC`,
      [teamId]
    );

    res.status(200).json({ tasks: result.rows });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// ✅ Update Task (including name & description only)
export const updatetasks = async (req: Request, res: Response) => {
  const { task_id, task_name, task_description } = req.body;

  if (!task_id || !task_name) {
    return res.status(400).json({ message: "task_id and task_name are required." });
  }

  try {
    const result = await client.query(
      `UPDATE tasks 
       SET task_name = $1, task_description = $2 
       WHERE id = $3 RETURNING *`,
      [task_name, task_description || "", task_id]
    );

    res.status(200).json({ task: result.rows[0] });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// ✅ Delete Task
export const deletetasks = async (req: Request, res: Response) => {
  const { task_id } = req.body;

  if (!task_id) {
    return res.status(400).json({ message: "task_id is required" });
  }

  try {
    await client.query(`DELETE FROM tasks WHERE id = $1`, [task_id]);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

// ✅ Toggle Complete Status
export const toggleComplete = async (req: Request, res: Response) => {
  const { task_id, is_completed } = req.body;

  if (typeof is_completed !== 'boolean' || !task_id) {
    return res.status(400).json({ message: "task_id and is_completed are required." });
  }

  try {
    const result = await client.query(
      `UPDATE tasks 
       SET is_completed = $1 
       WHERE id = $2 RETURNING *`,
      [is_completed, task_id]
    );

    res.status(200).json({ task: result.rows[0] });
  } catch (error) {
    console.error("Toggle Complete Error:", error);
    res.status(500).json({ message: "Failed to update task completion status" });
  }
};
