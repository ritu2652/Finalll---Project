'use client';

import React from "react";
import {
  useForm,
  useFieldArray,
  useFormContext,
  FormProvider,
  useWatch,
} from "react-hook-form";

type SocialMedia = {
  platform: string;
  url: string;
};

type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  socialLinks: SocialMedia[];
};

const SocialMediaFields: React.FC = () => {
  const { control, register } = useFormContext<SignUpFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  return (
    <div className="my-1">
      <h3 className="font-semibold text-xs">Social Media Links</h3>
      {fields.length > 0 &&
        fields.map((field, index) => (
          <div key={field.id} className="flex gap-1 items-center mb-2">
            <input
              {...register(`socialLinks.${index}.platform`)}
              placeholder="Platform"
              className="border rounded px-1 py-1 w-1/3 text-xs"
            />
            <input
              {...register(`socialLinks.${index}.url`)}
              placeholder="URL"
              className="border rounded px-1 py-1 w-2/3 text-xs"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() => append({ platform: "", url: "" })}
        className="text-blue-500 text-xs"
      >
        Add Social Link
      </button>
    </div>
  );
};

const SignUpForm: React.FC = () => {
  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      socialLinks: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = (data: SignUpFormValues) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return;
    }
    alert("Sign-Up Successful!");
    console.log("Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mx-auto p-4 border rounded shadow-md"
        >
          <h2 className="text-md text-primary-blue font-bold mb-3 text-center">Sign Up</h2>

          {/* Username Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              className="border rounded px-2 py-1 w-full text-xs"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="border rounded px-2 py-1 w-full text-xs"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="border rounded px-2 py-1 w-full text-xs"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              className="border rounded px-2 py-1 w-full text-xs"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Social Media Links */}
          <SocialMediaFields />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded w-full text-xs hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpForm;
