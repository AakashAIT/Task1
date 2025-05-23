import { useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (field: keyof T, value: string) => {
    setValues({ ...values, [field]: value });
    setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  };
}
