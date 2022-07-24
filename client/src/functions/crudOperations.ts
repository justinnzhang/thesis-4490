import { createClient } from '@supabase/supabase-js';

export const createNewSession = async (session_data: Session) => {
  const supabaseUrl = 'https://oqumrrcnkhqbzsnbrsri.supabase.co';
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'supabase-key';
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log(session_data);

  const { data, error } = await supabase
    .from('Sessions')
    .insert([{ ...session_data }]);

  console.log('done', data, error);

  return '';
};
