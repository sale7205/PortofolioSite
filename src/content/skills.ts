export const skills = [
  "MATLAB",
  "Python",
  "SolidWorks",
  "ANSYS Fluent",
  "Systems Engineering",
  "CFD Analysis",
] as const

export type Skill = typeof skills[number]
