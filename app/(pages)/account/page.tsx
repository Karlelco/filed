import AccountForm from "../../custom/account-form";
import React from "react";
import { createClient } from "../../utils/supabase/server";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
