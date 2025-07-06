import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
});
export const ParamsIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type ParamsIdDto = z.infer<typeof ParamsIdSchema>;
