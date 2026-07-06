import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://ecxjpxjovztltkjikugw.supabase.co";
const supabaseKey = "sb_publishable_9JLgui-hlE4tgP7mgYweIQ_yYj4XWRW";

export const supabase = createClient(supabaseUrl, supabaseKey);
