import { UseFormReturn, FieldPath } from "react-hook-form";

interface APIError {
  message: string;
  errors?: Record<string, string[]>;
}

interface APIErrorResponse {
  response?: {
    data?: APIError;
  };
  data?: APIError;
}

export function FormError<T extends Record<string, any>>(
  error: APIErrorResponse | any,
  form: UseFormReturn<T>
) {
  const errorData = error?.response?.data || error?.data || error;

  if (errorData?.errors && typeof errorData.errors === "object") {
    const errors = errorData.errors;

    form.clearErrors();

    Object.keys(errors).forEach((fieldName) => {
      const fieldErrors = errors[fieldName];

      if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
        const firstError = fieldErrors[0];

        if (fieldName in form.getValues()) {
          form.setError(fieldName as FieldPath<T>, {
            type: "server",
            message: firstError,
          });
        }
      }
    });

    if (errorData.message) {
      console.error("API Error:", errorData.message);
    }

    return true;
  }

  if (errorData?.message) {
    console.error("API Error:", errorData.message);

    return true;
  }

  console.error("Unexpected error:", error);

  return false;
}
