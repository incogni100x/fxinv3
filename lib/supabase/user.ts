import { createSupabaseServer } from "./server";

// import { cache } from "react";
export const getUser = async () => {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  return data.user;
};
