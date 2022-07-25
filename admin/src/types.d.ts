interface User {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  password?: string;
}

interface Session {
  id?: string;
  created_at?: string;
  first_accept: boolean;
  options_payload: any;
  updated_clicked: boolean;
  continue_clicked: boolean;
}
