import { UseFormReturn, FieldValues, Path } from "react-hook-form";

export function FormError<T extends FieldValues>(
  err: any,
  form: UseFormReturn<T>
) {
  if (err?.errors && Array.isArray(err.errors)) {
    err.errors.forEach((error: { field: string; message: string }) => {
      form.setError(error.field as Path<T>, {
        type: "server",
        message: error.message,
      });
    });
  } else {
    console.error("Unexpected error:", err);
  }
}
