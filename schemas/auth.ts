import * as z from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    first_name: z.string().min(2, { message: "First name is required" }),
    last_name: z.string().min(2, { message: "Last name is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" })
      .max(128, { message: "Password length cannot exceed 128 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter!",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter!",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character!",
      }),

    confirmPassword: z
      .string()
      .min(6, { message: "Password must be more than six characters long!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .max(128, { message: "Password length cannot exceed 128 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character!",
    }),
});

export const OtpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 characters")
    .max(6, "OTP must be 6 characters"),
});
export const BusinessTypeSchema = z.object({
  business_type: z.string().min(4, { message: "Select a business type" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be more than six characters long!" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter!",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter!",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character!",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be more than six characters long!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const ContactUsSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),

  email: z.string().email({
    message: "Email is required",
  }),

  phoneNo: z.string().min(1, {
    message: "Phone is required",
  }),

  message: z.string().min(1, {
    message: "Message is required",
  }),
});

export const EarlyAccessSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
