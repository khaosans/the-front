import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status, position } = await request.json();

  try {
    const client = await pool.connect();
    await client.query(
      'UPDATE tasks SET status = $1, position = $2 WHERE id = $3',
      [status, position, id]
    );
    client.release();
    return NextResponse.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}