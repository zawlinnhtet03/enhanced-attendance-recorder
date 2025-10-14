export type DynamicField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "radio" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export type FormKey = "CHECK_IN" | "CHECK_OUT" | "ONLY_CHECK_OUT";

export function defaultExtraFields(form: FormKey): DynamicField[] {
  switch (form) {
    case "CHECK_IN":
      return [
        { name: "organization", label: "Organization", type: "text", placeholder: "Your organization" },
        { name: "is_nuclear_medicine_member", label: "Is Nuclear Medicine Member", type: "select", required: true, options: ["Yes", "No"] },
        { name: "is_medical_specialist_member", label: "Is Medical Specialist Member", type: "select", required: true, options: ["Yes", "No"] },
        { name: "occupation_category", label: "Occupation Category", type: "text" },
        { name: "license_number", label: "License Number", type: "text" },
        { name: "work_registration_number", label: "Work Registration Number", type: "text" },
      ];
    case "ONLY_CHECK_OUT":
      return [
        { name: "organization", label: "Organization", type: "text" },
        { name: "is_nuclear_medicine_member", label: "Is Nuclear Medicine Member", type: "select", required: true, options: ["Yes", "No"] },
        { name: "is_medical_specialist_member", label: "Is Medical Specialist Member", type: "select", required: true, options: ["Yes", "No"] },
        { name: "occupation_category", label: "Occupation Category", type: "text" },
        { name: "license_number", label: "License Number", type: "text" },
        { name: "work_registration_number", label: "Work Registration Number", type: "text" },
      ];
    case "CHECK_OUT":
      return [];
  }
}

export const CORE_FIELD_NAMES = new Set(["first_name", "last_name", "email", "phone_number"]);
