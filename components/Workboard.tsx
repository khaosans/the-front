'use client';

import React, { useState, useEffect } from 'react';
import Worklist from './Worklist';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Worklist {
  id: number;
  // Add other properties as needed
}

const defaultWorklists: Worklist[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 }, // Add more columns as needed
];

const Workboard: React.FC<{ workboardId: number }> = ({ workboardId }) => {
  const [worklists, setWorklists] = useState<Worklist[]>(defaultWorklists);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchWorklists = async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('board_id', workboardId);
      if (error) {
        console.error('Error fetching worklists:', error);
      } else if (data.length > 0) {
        setWorklists(data);
      }
    };

    fetchWorklists();
  }, [workboardId]);

  return (
    <div>
      <h2 style={{ color: 'var(--foreground)' }}>Workboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }}>
        {worklists.map(worklist => (
          <div key={worklist.id} style={{ flex: '0 0 300px', margin: '0 10px', backgroundColor: 'var(--btn-background)', padding: '10px', borderRadius: '5px' }}>
            <Worklist worklistId={worklist.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workboard;
