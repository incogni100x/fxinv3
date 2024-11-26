"use server";

import { createSupabaseServer } from "@/lib/supabase/server";

import { redirect } from "next/navigation";
import {
  LoginSchema,
  SignUpSchema,
  NewPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/auth";

import * as z from "zod";

import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getURL } from "@/lib/utils";

export const verifyOtp = async (data: {
  email: string | null;
  otp: string;
  type: string;
}) => {
  const supabase = createSupabaseServer();
  if (!data.email) {
    return { error: "Email is required" };
  }
  const { data: res, error } = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.otp,
    type: "email",
  });
  if (error) {
    return { error: error.message };
  }
  return { success: "Successfully verified" };
};

const url = getURL();

export async function signIn(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  const supabase = createSupabaseServer();
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const user = validatedFields.data;

  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (error) {
    return { error: error.message };
  }
  if (callbackUrl) {
    redirect(callbackUrl);
  }
  redirect("/marketplace");
}

export async function newPassword(values: z.infer<typeof NewPasswordSchema>) {
  const supabase = createSupabaseServer();
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { confirmPassword } = validatedFields.data;

  const { error } = await supabase.auth.updateUser({
    password: confirmPassword,
  });
  if (error) {
    return { error: error.message };
  }
  redirect("/account");
}

export async function reset(values: z.infer<typeof ForgotPasswordSchema>) {
  try {
    const supabase = createSupabaseServer();
    const validatedFields = ForgotPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email } = validatedFields.data;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url}/api/reset-password`,
    });

    if (error) {
      return { error: error.message };
    }
    return { success: `A link has been sent to your email ${email} ` };
  } catch (error) {
    console.error("Error in Reset:", error);
    return { error: "An unexpected error occurred during sending reset email" };
  }
}

// export async function updateName(values: z.infer<typeof UpdateNameSchema>) {
//   try {
//     const supabase = createSupabaseServer();
//     const validatedFields = UpdateNameSchema.safeParse(values);

//     if (!validatedFields.success) {
//       return { error: "Invalid fields" };
//     }

//     const user = validatedFields.data;

//     const { error } = await supabase.auth.updateUser({
//       data: user,
//     });

//     if (error) {
//       return { error: error.message };
//     }
//     revalidatePath("/podcasts", "layout");
//     return { success: "Name Updated" };
//   } catch (error) {
//     console.error("Error in Update Name:", error);
//     return { error: "An unexpected error occurred during name update" };
//   }
// }
// export async function updateEmail(values: z.infer<typeof UpdateEmailSchema>) {
//   try {
//     const supabase = createSupabaseServer();
//     const validatedFields = UpdateEmailSchema.safeParse(values);

//     if (!validatedFields.success) {
//       return { error: "Invalid fields" };
//     }

//     const user = validatedFields.data;

//     const { error } = await supabase.auth.updateUser({
//       email: user.email,
//     });

//     if (error) {
//       return { error: error.message };
//     }
//     revalidatePath("/podcasts", "layout");
//     return {
//       success: `A link has been sent to your email `,
//     };
//   } catch (error) {
//     console.error("Error in Update Email:", error);
//     return { error: "An unexpected error occurred during email update" };
//   }
// }

export async function register(values: z.infer<typeof SignUpSchema>) {
  const supabase = createSupabaseServer();
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { first_name, last_name, email, password } = validatedFields.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${url}/api/auth/verification`,
      data: {
        first_name,
        last_name,
      },
    },
  });

  if (error) {
    console.log(error);

    return { error: error.message };
  }

  if (!(data.user?.identities && data.user?.identities.length > 0)) {
    return { error: "Already signed up, sign in instead?" };
  }

  redirect(`/verify?email=${data.user?.email}`);
}

export const logout = async () => {
  const supabase = createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
};

export const verify = async (email: string | null) => {
  if (!email) {
    return { error: "Email is required" };
  }

  const supabase = createSupabaseServer();

  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email: email!,
  });

  if (error) {
    return { error: error.message };
  }
  return { success: "Email sent" };
};
