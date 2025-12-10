// --- Validators ---
type ValidationResult = { valid: boolean; message?: string };
type ValidationFn = (value: any) => ValidationResult;

// Required field
export const required: ValidationFn = (value) => ({
  valid: value !== undefined && value !== null && value !== "",
  message: "Field is required",
});

// Minimum number
export const min = (minValue: number): ValidationFn => (value) => ({
  valid: typeof value === "number" && value >= minValue,
  message: `Must be at least ${minValue}`,
});

// Validate function 
export function validate(
  validators: Record<string, ValidationFn>,
  values: Record<string, any>
): Record<string, ValidationResult> {
  const result: Record<string, ValidationResult> = {};
  for (const key in validators) {
    if (validators[key]) {
      result[key] = validators[key](values[key]);
    }
  }
  return result;
}


const formValues = { name: "", age: 15 };

const result = validate(
  {
    name: required,
    age: min(18),
  },
  formValues
);

console.log(result);
/* 
{
  name: { valid: false, message: "Field is required" },
  age: { valid: false, message: "Must be at least 18" }
}
*/
