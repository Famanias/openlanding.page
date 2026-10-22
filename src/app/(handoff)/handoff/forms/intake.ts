export type IntakeValues = { name: string; email: string; goal: string };
export type IntakeErrors = Partial<Record<keyof IntakeValues,string>>;
export function validateIntake(values: IntakeValues): IntakeErrors { const errors:IntakeErrors={}; if(!values.name.trim()) errors.name="Add your name."; if(!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email="Enter a work email."; if(!values.goal) errors.goal="Choose a service lane."; return errors; }
