import { Request, Response } from 'express'
import client from '../db/db'

export const createTeam = async (req: Request, res: Response) => {

  const userId = (req.session as any).userId
  const { name } = req.body

  try {
    const result = await client.query(
      'INSERT INTO teams (name, created_by) VALUES ($1, $2) RETURNING *',
      [name, userId]
    )

    const team = result.rows[0]
    res.status(201).json({ team })
    console.log('created team buddy')
  } catch (error) {
    console.error('Error creating team:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getUserTeams = async (req: Request, res: Response) => {
  const userId = (req.session as any).userId;

  try {
    const result = await client.query(
      `
      SELECT 
        t.*,
        (
          SELECT COUNT(*) 
          FROM team_members tm 
          WHERE tm.team_id = t.id
        ) AS membercount
      FROM teams t
      LEFT JOIN team_members tm ON t.id = tm.team_id
      WHERE t.created_by = $1 OR tm.user_id = $1
      GROUP BY t.id
      ORDER BY t.created_at DESC;
      `,
      [userId]
    );

    res.status(200).json({ teams: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

export const GetTeamMembers = async (req: Request, res: Response) => {
  const { teamid } = req.body;

  try {
    const result = await client.query(
      `
      SELECT u.*
      FROM users u
      INNER JOIN team_members tm ON tm.user_id = u.id
      WHERE tm.team_id = $1
      `,
      [teamid]
    );

    res.status(200).json({ members: result.rows });
  } catch (err) {
    console.error('Error getting team members:', err);
    res.status(500).json({ message: 'Failed to fetch team members' });
  }
};