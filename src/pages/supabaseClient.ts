import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bebxlfttavxztohyxxrk.supabase.co';
const supabaseAnonKey = 'sb_publishable_pN1OFe98APUm5Q_TqF1qeQ_IMKiWgpY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);