const { z } = require("zod");

const clientLoginSchema = z.object({
  client_email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

const clientResetPasswordSchema = z.object({
  client_email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),
  newPassword: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

const clientSignupSchema = z.object({
  client_username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(6, { message: "Name must be at least 6 characters" })
    .max(255, { message: "Name must be at most 255 characters" }),
  client_email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),
  client_phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(11, { message: "Phone must be at least 11 characters" })
    .max(255, { message: "Phone must be at most 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

const lawyerLoginSchema = z.object({
  lawyer_email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

const lawyerSignupSchema = z.object({
  lawyer_username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(6, { message: "Name must be at least 6 characters" })
    .max(255, { message: "Name must be at most 255 characters" }),
  lawyer_email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),
  lawyer_department: z
    .string({ required_error: "Department is required" })
    .trim(),
  lawyer_designation: z
    .string({ required_error: "Designation is required" })
    .trim(),
  location: z.string({ required_error: "Location is required" }).trim(),
  lawyer_phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(11, { message: "Phone must be at least 11 characters" })
    .max(255, { message: "Phone must be at most 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

const lawyerResetPasswordSchema = z.object({
  lawyer_email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),
  newPassword: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(6, { message: "Name must be at least 6 characters" })
    .max(255, { message: "Name must be at most 255 characters" }),
  email: z
    .string({ required_error: "Please Enter Your Email" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least 6 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),

  mobile: z
    .string({ required_error: "Please Enter Your Phone Number" })
    .trim()
    .min(11, { message: "Phone must be 11 characters" }),

  subject: z
    .string({ required_error: "Please Enter Subject" })
    .trim()
    .min(5, { message: "Subject must be 5 characters" }),

  message: z
    .string({ required_error: "Please Enter Message" })
    .trim()
    .min(10, { message: "Message must be atleast 10 characters" })
    .max(255, { message: "Message must be at most 255 characters" }),
});

module.exports = {
  clientLoginSchema,
  clientSignupSchema,
  clientResetPasswordSchema,
  lawyerLoginSchema,
  lawyerSignupSchema,
  lawyerResetPasswordSchema,
  contactSchema,
};
