'use client';

import React from "react";
import { useForm, FormProvider } from "react-hook-form";

type ContactFormValues = {
  name: string;
  age: number;
  contactNumber: string;
  address: string;
  email: string;
};

const Page: React.FC = () => {
  const methods = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      age: 0,
      contactNumber: "",
      address: "",
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: ContactFormValues) => {
    alert("Form submitted successfully!");
    console.log("Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm mx-auto p-4 border rounded shadow-md"
        >
          <h2 className="text-md text-primary-blue font-bold mb-3 text-center">Contact Us</h2>

          {/* Name Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="border rounded px-2 py-1 w-full text-xs"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Age Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 1, message: "Age must be a positive number" },
              })}
              className="border rounded px-2 py-1 w-full text-xs"
            />
            {errors.age && (
              <p className="text-red-500 text-xs">{errors.age.message}</p>
            )}
          </div>

          {/* Contact Number Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Contact Number</label>
            <input
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact number must be 10 digits",
                },
              })}
              className="border rounded px-2 py-1 w-full text-xs"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="border rounded px-2 py-1 w-full text-xs"
              rows={2}
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>

          {/* Email ID Field */}
          <div className="mb-2">
            <label className="block mb-1 text-xs">Email ID</label>
            <input
              type="email"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded w-full text-xs hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
