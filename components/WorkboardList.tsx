import React, { useState, useEffect } from 'react';
import Workcard from './Workcard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Workcard {
  id: number;
  title: string;
  description: string;
  // Add other properties as needed
}

const Worklist: React.FC<{ worklistId: number }> = ({ worklistId }) => {
  const [workcards, setWorkcards] = useState<Workcard[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchWorkcards = async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('list_id', worklistId);
      if (error) console.error('Error fetching workcards:', error);
      else setWorkcards(data);
    };

    fetchWorkcards();
  }, [worklistId]);

  return (
    <div>
      <h3>Worklist</h3>
      <div>
        {workcards.map(workcard => (
          <Workcard key={workcard.id} workcard={workcard} />
        ))}
      </div>
    </div>
  );
};

export default Worklist;
