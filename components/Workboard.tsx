'use client';

import React, { useState, useEffect } from 'react';
import Worklist from './Worklist';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import './Workboard.css'; // Import the CSS file

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
      <div className="workboard-columns">
        {worklists.map((worklist, index) => (
          <div key={worklist.id} className={`workboard-column column-${index % 4}`}>
            <Worklist worklistId={worklist.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workboard;
