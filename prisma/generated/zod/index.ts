import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PatientScalarFieldEnumSchema = z.enum(['id','name','age','phoneNumber','gander','createdAt','updatedAt']);

export const DoctorScalarFieldEnumSchema = z.enum(['id','name','phoneNumber','password','specialization','appointmentPrice','workingDays','doctorPreferencesId']);

export const DoctorPreferencesScalarFieldEnumSchema = z.enum(['id','SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']);

export const WorkerScalarFieldEnumSchema = z.enum(['id','name','phoneNumber','password','role','verified']);

export const WorkerTokenScalarFieldEnumSchema = z.enum(['id','refreshToken','isValid','workerId']);

export const AppointmentScalarFieldEnumSchema = z.enum(['id','day','patientId','doctorId']);

export const MedicineScalarFieldEnumSchema = z.enum(['id','name','description','price','stock']);

export const PrescriptionScalarFieldEnumSchema = z.enum(['id','medicineId','patient','doctor','date']);

export const PrescriptionMedicineScalarFieldEnumSchema = z.enum(['id','name','description','price','quantity','prescriptionId']);

export const PatientCounterScalarFieldEnumSchema = z.enum(['id','value']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const WorkerRoleSchema = z.enum(['REG','LAB','ADMIN']);

export type WorkerRoleType = `${z.infer<typeof WorkerRoleSchema>}`

export const WeekdaySchema = z.enum(['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']);

export type WeekdayType = `${z.infer<typeof WeekdaySchema>}`

export const GanderSchema = z.enum(['MALE','FEMALE']);

export type GanderType = `${z.infer<typeof GanderSchema>}`

export const DoctorSpecializationSchema = z.enum(['GENERAL_MEDICINE','PEDIATRICS','CARDIOLOGY','DERMATOLOGY','ORTHOPEDICS','NEUROLOGY','GASTROENTEROLOGY','ENDOCRINOLOGY','NEPHROLOGY','PULMONOLOGY','OPHTHALMOLOGY','ENT','UROLOGY','OBSTETRICS_AND_GYNECOLOGY','ONCOLOGY','RADIOLOGY','PSYCHIATRY','ANESTHESIOLOGY','RHEUMATOLOGY','HEMATOLOGY','INFECTIOUS_DISEASES','ALLERGY_AND_IMMUNOLOGY','PHYSICAL_MEDICINE_AND_REHABILITATION','EMERGENCY_MEDICINE','FAMILY_MEDICINE','GERIATRICS','NUCLEAR_MEDICINE','PATHOLOGY','PLASTIC_SURGERY','CARDIOTHORACIC_SURGERY','COLORECTAL_SURGERY','HAND_SURGERY','PEDIATRIC_SURGERY','TRANSPLANT_SURGERY','VASCULAR_SURGERY','NEONATOLOGY','PAIN_MEDICINE','SLEEP_MEDICINE','SPORTS_MEDICINE','CRITICAL_CARE_MEDICINE','REPRODUCTIVE_ENDOCRINOLOGY_AND_INFERTILITY','MEDICAL_GENETICS','PALLIATIVE_MEDICINE','AEROSPACE_MEDICINE']);

export type DoctorSpecializationType = `${z.infer<typeof DoctorSpecializationSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PATIENT SCHEMA
/////////////////////////////////////////

export const PatientSchema = z.object({
  gander: GanderSchema,
  id: z.string().cuid(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Patient = z.infer<typeof PatientSchema>

/////////////////////////////////////////
// DOCTOR SCHEMA
/////////////////////////////////////////

export const DoctorSchema = z.object({
  specialization: DoctorSpecializationSchema,
  workingDays: WeekdaySchema.array(),
  id: z.string().cuid(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  appointmentPrice: z.number().int(),
  doctorPreferencesId: z.string(),
})

export type Doctor = z.infer<typeof DoctorSchema>

/////////////////////////////////////////
// DOCTOR PREFERENCES SCHEMA
/////////////////////////////////////////

export const DoctorPreferencesSchema = z.object({
  id: z.string().cuid(),
  SUNDAY: z.boolean(),
  MONDAY: z.boolean(),
  TUESDAY: z.boolean(),
  WEDNESDAY: z.boolean(),
  THURSDAY: z.boolean(),
  FRIDAY: z.boolean(),
  SATURDAY: z.boolean(),
})

export type DoctorPreferences = z.infer<typeof DoctorPreferencesSchema>

/////////////////////////////////////////
// WORKER SCHEMA
/////////////////////////////////////////

export const WorkerSchema = z.object({
  role: WorkerRoleSchema,
  id: z.string().cuid(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  verified: z.boolean(),
})

export type Worker = z.infer<typeof WorkerSchema>

/////////////////////////////////////////
// WORKER TOKEN SCHEMA
/////////////////////////////////////////

export const WorkerTokenSchema = z.object({
  id: z.string().cuid(),
  refreshToken: z.string(),
  isValid: z.boolean(),
  workerId: z.string(),
})

export type WorkerToken = z.infer<typeof WorkerTokenSchema>

/////////////////////////////////////////
// APPOINTMENT SCHEMA
/////////////////////////////////////////

export const AppointmentSchema = z.object({
  day: WeekdaySchema,
  id: z.number().int(),
  patientId: z.string().nullable(),
  doctorId: z.string().nullable(),
})

export type Appointment = z.infer<typeof AppointmentSchema>

/////////////////////////////////////////
// MEDICINE SCHEMA
/////////////////////////////////////////

export const MedicineSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().int(),
})

export type Medicine = z.infer<typeof MedicineSchema>

/////////////////////////////////////////
// PRESCRIPTION SCHEMA
/////////////////////////////////////////

export const PrescriptionSchema = z.object({
  id: z.number().int(),
  medicineId: z.number().int(),
  patient: z.string(),
  doctor: z.string(),
  date: z.coerce.date(),
})

export type Prescription = z.infer<typeof PrescriptionSchema>

/////////////////////////////////////////
// PRESCRIPTION MEDICINE SCHEMA
/////////////////////////////////////////

export const PrescriptionMedicineSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().int(),
  quantity: z.number().int(),
  prescriptionId: z.number().int().nullable(),
})

export type PrescriptionMedicine = z.infer<typeof PrescriptionMedicineSchema>

/////////////////////////////////////////
// PATIENT COUNTER SCHEMA
/////////////////////////////////////////

export const PatientCounterSchema = z.object({
  id: z.number().int(),
  value: z.number().int(),
})

export type PatientCounter = z.infer<typeof PatientCounterSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PATIENT
//------------------------------------------------------

export const PatientIncludeSchema: z.ZodType<Prisma.PatientInclude> = z.object({
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PatientArgsSchema: z.ZodType<Prisma.PatientDefaultArgs> = z.object({
  select: z.lazy(() => PatientSelectSchema).optional(),
  include: z.lazy(() => PatientIncludeSchema).optional(),
}).strict();

export const PatientCountOutputTypeArgsSchema: z.ZodType<Prisma.PatientCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PatientCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PatientCountOutputTypeSelectSchema: z.ZodType<Prisma.PatientCountOutputTypeSelect> = z.object({
  appointments: z.boolean().optional(),
}).strict();

export const PatientSelectSchema: z.ZodType<Prisma.PatientSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  age: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  gander: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DOCTOR
//------------------------------------------------------

export const DoctorIncludeSchema: z.ZodType<Prisma.DoctorInclude> = z.object({
  preferences: z.union([z.boolean(),z.lazy(() => DoctorPreferencesArgsSchema)]).optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DoctorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DoctorArgsSchema: z.ZodType<Prisma.DoctorDefaultArgs> = z.object({
  select: z.lazy(() => DoctorSelectSchema).optional(),
  include: z.lazy(() => DoctorIncludeSchema).optional(),
}).strict();

export const DoctorCountOutputTypeArgsSchema: z.ZodType<Prisma.DoctorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DoctorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DoctorCountOutputTypeSelectSchema: z.ZodType<Prisma.DoctorCountOutputTypeSelect> = z.object({
  appointments: z.boolean().optional(),
}).strict();

export const DoctorSelectSchema: z.ZodType<Prisma.DoctorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  password: z.boolean().optional(),
  specialization: z.boolean().optional(),
  appointmentPrice: z.boolean().optional(),
  workingDays: z.boolean().optional(),
  doctorPreferencesId: z.boolean().optional(),
  preferences: z.union([z.boolean(),z.lazy(() => DoctorPreferencesArgsSchema)]).optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DoctorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DOCTOR PREFERENCES
//------------------------------------------------------

export const DoctorPreferencesIncludeSchema: z.ZodType<Prisma.DoctorPreferencesInclude> = z.object({
  Doctor: z.union([z.boolean(),z.lazy(() => DoctorArgsSchema)]).optional(),
}).strict()

export const DoctorPreferencesArgsSchema: z.ZodType<Prisma.DoctorPreferencesDefaultArgs> = z.object({
  select: z.lazy(() => DoctorPreferencesSelectSchema).optional(),
  include: z.lazy(() => DoctorPreferencesIncludeSchema).optional(),
}).strict();

export const DoctorPreferencesSelectSchema: z.ZodType<Prisma.DoctorPreferencesSelect> = z.object({
  id: z.boolean().optional(),
  SUNDAY: z.boolean().optional(),
  MONDAY: z.boolean().optional(),
  TUESDAY: z.boolean().optional(),
  WEDNESDAY: z.boolean().optional(),
  THURSDAY: z.boolean().optional(),
  FRIDAY: z.boolean().optional(),
  SATURDAY: z.boolean().optional(),
  Doctor: z.union([z.boolean(),z.lazy(() => DoctorArgsSchema)]).optional(),
}).strict()

// WORKER
//------------------------------------------------------

export const WorkerIncludeSchema: z.ZodType<Prisma.WorkerInclude> = z.object({
  token: z.union([z.boolean(),z.lazy(() => WorkerTokenArgsSchema)]).optional(),
}).strict()

export const WorkerArgsSchema: z.ZodType<Prisma.WorkerDefaultArgs> = z.object({
  select: z.lazy(() => WorkerSelectSchema).optional(),
  include: z.lazy(() => WorkerIncludeSchema).optional(),
}).strict();

export const WorkerSelectSchema: z.ZodType<Prisma.WorkerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  verified: z.boolean().optional(),
  token: z.union([z.boolean(),z.lazy(() => WorkerTokenArgsSchema)]).optional(),
}).strict()

// WORKER TOKEN
//------------------------------------------------------

export const WorkerTokenIncludeSchema: z.ZodType<Prisma.WorkerTokenInclude> = z.object({
  worker: z.union([z.boolean(),z.lazy(() => WorkerArgsSchema)]).optional(),
}).strict()

export const WorkerTokenArgsSchema: z.ZodType<Prisma.WorkerTokenDefaultArgs> = z.object({
  select: z.lazy(() => WorkerTokenSelectSchema).optional(),
  include: z.lazy(() => WorkerTokenIncludeSchema).optional(),
}).strict();

export const WorkerTokenSelectSchema: z.ZodType<Prisma.WorkerTokenSelect> = z.object({
  id: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  isValid: z.boolean().optional(),
  workerId: z.boolean().optional(),
  worker: z.union([z.boolean(),z.lazy(() => WorkerArgsSchema)]).optional(),
}).strict()

// APPOINTMENT
//------------------------------------------------------

export const AppointmentIncludeSchema: z.ZodType<Prisma.AppointmentInclude> = z.object({
  Patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  Doctor: z.union([z.boolean(),z.lazy(() => DoctorArgsSchema)]).optional(),
}).strict()

export const AppointmentArgsSchema: z.ZodType<Prisma.AppointmentDefaultArgs> = z.object({
  select: z.lazy(() => AppointmentSelectSchema).optional(),
  include: z.lazy(() => AppointmentIncludeSchema).optional(),
}).strict();

export const AppointmentSelectSchema: z.ZodType<Prisma.AppointmentSelect> = z.object({
  id: z.boolean().optional(),
  day: z.boolean().optional(),
  patientId: z.boolean().optional(),
  doctorId: z.boolean().optional(),
  Patient: z.union([z.boolean(),z.lazy(() => PatientArgsSchema)]).optional(),
  Doctor: z.union([z.boolean(),z.lazy(() => DoctorArgsSchema)]).optional(),
}).strict()

// MEDICINE
//------------------------------------------------------

export const MedicineSelectSchema: z.ZodType<Prisma.MedicineSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  price: z.boolean().optional(),
  stock: z.boolean().optional(),
}).strict()

// PRESCRIPTION
//------------------------------------------------------

export const PrescriptionIncludeSchema: z.ZodType<Prisma.PrescriptionInclude> = z.object({
  medicines: z.union([z.boolean(),z.lazy(() => PrescriptionMedicineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PrescriptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PrescriptionArgsSchema: z.ZodType<Prisma.PrescriptionDefaultArgs> = z.object({
  select: z.lazy(() => PrescriptionSelectSchema).optional(),
  include: z.lazy(() => PrescriptionIncludeSchema).optional(),
}).strict();

export const PrescriptionCountOutputTypeArgsSchema: z.ZodType<Prisma.PrescriptionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PrescriptionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PrescriptionCountOutputTypeSelectSchema: z.ZodType<Prisma.PrescriptionCountOutputTypeSelect> = z.object({
  medicines: z.boolean().optional(),
}).strict();

export const PrescriptionSelectSchema: z.ZodType<Prisma.PrescriptionSelect> = z.object({
  id: z.boolean().optional(),
  medicineId: z.boolean().optional(),
  patient: z.boolean().optional(),
  doctor: z.boolean().optional(),
  date: z.boolean().optional(),
  medicines: z.union([z.boolean(),z.lazy(() => PrescriptionMedicineFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PrescriptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRESCRIPTION MEDICINE
//------------------------------------------------------

export const PrescriptionMedicineIncludeSchema: z.ZodType<Prisma.PrescriptionMedicineInclude> = z.object({
  Prescription: z.union([z.boolean(),z.lazy(() => PrescriptionArgsSchema)]).optional(),
}).strict()

export const PrescriptionMedicineArgsSchema: z.ZodType<Prisma.PrescriptionMedicineDefaultArgs> = z.object({
  select: z.lazy(() => PrescriptionMedicineSelectSchema).optional(),
  include: z.lazy(() => PrescriptionMedicineIncludeSchema).optional(),
}).strict();

export const PrescriptionMedicineSelectSchema: z.ZodType<Prisma.PrescriptionMedicineSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  price: z.boolean().optional(),
  quantity: z.boolean().optional(),
  prescriptionId: z.boolean().optional(),
  Prescription: z.union([z.boolean(),z.lazy(() => PrescriptionArgsSchema)]).optional(),
}).strict()

// PATIENT COUNTER
//------------------------------------------------------

export const PatientCounterSelectSchema: z.ZodType<Prisma.PatientCounterSelect> = z.object({
  id: z.boolean().optional(),
  value: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PatientWhereInputSchema: z.ZodType<Prisma.PatientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  age: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gander: z.union([ z.lazy(() => EnumGanderFilterSchema),z.lazy(() => GanderSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict();

export const PatientOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gander: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appointments: z.lazy(() => AppointmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PatientWhereUniqueInputSchema: z.ZodType<Prisma.PatientWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientWhereInputSchema),z.lazy(() => PatientWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  age: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gander: z.union([ z.lazy(() => EnumGanderFilterSchema),z.lazy(() => GanderSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict());

export const PatientOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gander: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatientCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatientAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatientMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatientSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  age: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  gander: z.union([ z.lazy(() => EnumGanderWithAggregatesFilterSchema),z.lazy(() => GanderSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DoctorWhereInputSchema: z.ZodType<Prisma.DoctorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DoctorWhereInputSchema),z.lazy(() => DoctorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoctorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoctorWhereInputSchema),z.lazy(() => DoctorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  specialization: z.union([ z.lazy(() => EnumDoctorSpecializationFilterSchema),z.lazy(() => DoctorSpecializationSchema) ]).optional(),
  appointmentPrice: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  workingDays: z.lazy(() => EnumWeekdayNullableListFilterSchema).optional(),
  doctorPreferencesId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  preferences: z.union([ z.lazy(() => DoctorPreferencesRelationFilterSchema),z.lazy(() => DoctorPreferencesWhereInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict();

export const DoctorOrderByWithRelationInputSchema: z.ZodType<Prisma.DoctorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  specialization: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional(),
  workingDays: z.lazy(() => SortOrderSchema).optional(),
  doctorPreferencesId: z.lazy(() => SortOrderSchema).optional(),
  preferences: z.lazy(() => DoctorPreferencesOrderByWithRelationInputSchema).optional(),
  appointments: z.lazy(() => AppointmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DoctorWhereUniqueInputSchema: z.ZodType<Prisma.DoctorWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    doctorPreferencesId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    doctorPreferencesId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  doctorPreferencesId: z.string().optional(),
  AND: z.union([ z.lazy(() => DoctorWhereInputSchema),z.lazy(() => DoctorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoctorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoctorWhereInputSchema),z.lazy(() => DoctorWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  specialization: z.union([ z.lazy(() => EnumDoctorSpecializationFilterSchema),z.lazy(() => DoctorSpecializationSchema) ]).optional(),
  appointmentPrice: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  workingDays: z.lazy(() => EnumWeekdayNullableListFilterSchema).optional(),
  preferences: z.union([ z.lazy(() => DoctorPreferencesRelationFilterSchema),z.lazy(() => DoctorPreferencesWhereInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict());

export const DoctorOrderByWithAggregationInputSchema: z.ZodType<Prisma.DoctorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  specialization: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional(),
  workingDays: z.lazy(() => SortOrderSchema).optional(),
  doctorPreferencesId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DoctorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DoctorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DoctorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DoctorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DoctorSumOrderByAggregateInputSchema).optional()
}).strict();

export const DoctorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DoctorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DoctorScalarWhereWithAggregatesInputSchema),z.lazy(() => DoctorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoctorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoctorScalarWhereWithAggregatesInputSchema),z.lazy(() => DoctorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  specialization: z.union([ z.lazy(() => EnumDoctorSpecializationWithAggregatesFilterSchema),z.lazy(() => DoctorSpecializationSchema) ]).optional(),
  appointmentPrice: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  workingDays: z.lazy(() => EnumWeekdayNullableListFilterSchema).optional(),
  doctorPreferencesId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DoctorPreferencesWhereInputSchema: z.ZodType<Prisma.DoctorPreferencesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DoctorPreferencesWhereInputSchema),z.lazy(() => DoctorPreferencesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoctorPreferencesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoctorPreferencesWhereInputSchema),z.lazy(() => DoctorPreferencesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  SUNDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  MONDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  TUESDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  WEDNESDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  THURSDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  FRIDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  SATURDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Doctor: z.union([ z.lazy(() => DoctorNullableRelationFilterSchema),z.lazy(() => DoctorWhereInputSchema) ]).optional().nullable(),
}).strict();

export const DoctorPreferencesOrderByWithRelationInputSchema: z.ZodType<Prisma.DoctorPreferencesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  SUNDAY: z.lazy(() => SortOrderSchema).optional(),
  MONDAY: z.lazy(() => SortOrderSchema).optional(),
  TUESDAY: z.lazy(() => SortOrderSchema).optional(),
  WEDNESDAY: z.lazy(() => SortOrderSchema).optional(),
  THURSDAY: z.lazy(() => SortOrderSchema).optional(),
  FRIDAY: z.lazy(() => SortOrderSchema).optional(),
  SATURDAY: z.lazy(() => SortOrderSchema).optional(),
  Doctor: z.lazy(() => DoctorOrderByWithRelationInputSchema).optional()
}).strict();

export const DoctorPreferencesWhereUniqueInputSchema: z.ZodType<Prisma.DoctorPreferencesWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DoctorPreferencesWhereInputSchema),z.lazy(() => DoctorPreferencesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoctorPreferencesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoctorPreferencesWhereInputSchema),z.lazy(() => DoctorPreferencesWhereInputSchema).array() ]).optional(),
  SUNDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  MONDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  TUESDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  WEDNESDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  THURSDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  FRIDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  SATURDAY: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Doctor: z.union([ z.lazy(() => DoctorNullableRelationFilterSchema),z.lazy(() => DoctorWhereInputSchema) ]).optional().nullable(),
}).strict());

export const DoctorPreferencesOrderByWithAggregationInputSchema: z.ZodType<Prisma.DoctorPreferencesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  SUNDAY: z.lazy(() => SortOrderSchema).optional(),
  MONDAY: z.lazy(() => SortOrderSchema).optional(),
  TUESDAY: z.lazy(() => SortOrderSchema).optional(),
  WEDNESDAY: z.lazy(() => SortOrderSchema).optional(),
  THURSDAY: z.lazy(() => SortOrderSchema).optional(),
  FRIDAY: z.lazy(() => SortOrderSchema).optional(),
  SATURDAY: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DoctorPreferencesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DoctorPreferencesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DoctorPreferencesMinOrderByAggregateInputSchema).optional()
}).strict();

export const DoctorPreferencesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DoctorPreferencesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DoctorPreferencesScalarWhereWithAggregatesInputSchema),z.lazy(() => DoctorPreferencesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoctorPreferencesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoctorPreferencesScalarWhereWithAggregatesInputSchema),z.lazy(() => DoctorPreferencesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  SUNDAY: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  MONDAY: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  TUESDAY: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  WEDNESDAY: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  THURSDAY: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  FRIDAY: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  SATURDAY: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const WorkerWhereInputSchema: z.ZodType<Prisma.WorkerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkerWhereInputSchema),z.lazy(() => WorkerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkerWhereInputSchema),z.lazy(() => WorkerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumWorkerRoleFilterSchema),z.lazy(() => WorkerRoleSchema) ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  token: z.union([ z.lazy(() => WorkerTokenNullableRelationFilterSchema),z.lazy(() => WorkerTokenWhereInputSchema) ]).optional().nullable(),
}).strict();

export const WorkerOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => WorkerTokenOrderByWithRelationInputSchema).optional()
}).strict();

export const WorkerWhereUniqueInputSchema: z.ZodType<Prisma.WorkerWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WorkerWhereInputSchema),z.lazy(() => WorkerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkerWhereInputSchema),z.lazy(() => WorkerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumWorkerRoleFilterSchema),z.lazy(() => WorkerRoleSchema) ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  token: z.union([ z.lazy(() => WorkerTokenNullableRelationFilterSchema),z.lazy(() => WorkerTokenWhereInputSchema) ]).optional().nullable(),
}).strict());

export const WorkerOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkerMinOrderByAggregateInputSchema).optional()
}).strict();

export const WorkerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkerScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkerScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumWorkerRoleWithAggregatesFilterSchema),z.lazy(() => WorkerRoleSchema) ]).optional(),
  verified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const WorkerTokenWhereInputSchema: z.ZodType<Prisma.WorkerTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkerTokenWhereInputSchema),z.lazy(() => WorkerTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkerTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkerTokenWhereInputSchema),z.lazy(() => WorkerTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isValid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  workerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  worker: z.union([ z.lazy(() => WorkerRelationFilterSchema),z.lazy(() => WorkerWhereInputSchema) ]).optional(),
}).strict();

export const WorkerTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkerTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  isValid: z.lazy(() => SortOrderSchema).optional(),
  workerId: z.lazy(() => SortOrderSchema).optional(),
  worker: z.lazy(() => WorkerOrderByWithRelationInputSchema).optional()
}).strict();

export const WorkerTokenWhereUniqueInputSchema: z.ZodType<Prisma.WorkerTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    workerId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    workerId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  workerId: z.string().optional(),
  AND: z.union([ z.lazy(() => WorkerTokenWhereInputSchema),z.lazy(() => WorkerTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkerTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkerTokenWhereInputSchema),z.lazy(() => WorkerTokenWhereInputSchema).array() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isValid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  worker: z.union([ z.lazy(() => WorkerRelationFilterSchema),z.lazy(() => WorkerWhereInputSchema) ]).optional(),
}).strict());

export const WorkerTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkerTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  isValid: z.lazy(() => SortOrderSchema).optional(),
  workerId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkerTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkerTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkerTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const WorkerTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkerTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkerTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkerTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkerTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkerTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkerTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isValid: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  workerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AppointmentWhereInputSchema: z.ZodType<Prisma.AppointmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  day: z.union([ z.lazy(() => EnumWeekdayFilterSchema),z.lazy(() => WeekdaySchema) ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  doctorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Patient: z.union([ z.lazy(() => PatientNullableRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional().nullable(),
  Doctor: z.union([ z.lazy(() => DoctorNullableRelationFilterSchema),z.lazy(() => DoctorWhereInputSchema) ]).optional().nullable(),
}).strict();

export const AppointmentOrderByWithRelationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doctorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Patient: z.lazy(() => PatientOrderByWithRelationInputSchema).optional(),
  Doctor: z.lazy(() => DoctorOrderByWithRelationInputSchema).optional()
}).strict();

export const AppointmentWhereUniqueInputSchema: z.ZodType<Prisma.AppointmentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  day: z.union([ z.lazy(() => EnumWeekdayFilterSchema),z.lazy(() => WeekdaySchema) ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  doctorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Patient: z.union([ z.lazy(() => PatientNullableRelationFilterSchema),z.lazy(() => PatientWhereInputSchema) ]).optional().nullable(),
  Doctor: z.union([ z.lazy(() => DoctorNullableRelationFilterSchema),z.lazy(() => DoctorWhereInputSchema) ]).optional().nullable(),
}).strict());

export const AppointmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doctorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AppointmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppointmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppointmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppointmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppointmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const AppointmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppointmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  day: z.union([ z.lazy(() => EnumWeekdayWithAggregatesFilterSchema),z.lazy(() => WeekdaySchema) ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  doctorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MedicineWhereInputSchema: z.ZodType<Prisma.MedicineWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MedicineWhereInputSchema),z.lazy(() => MedicineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MedicineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MedicineWhereInputSchema),z.lazy(() => MedicineWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  stock: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const MedicineOrderByWithRelationInputSchema: z.ZodType<Prisma.MedicineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicineWhereUniqueInputSchema: z.ZodType<Prisma.MedicineWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => MedicineWhereInputSchema),z.lazy(() => MedicineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MedicineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MedicineWhereInputSchema),z.lazy(() => MedicineWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  stock: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
}).strict());

export const MedicineOrderByWithAggregationInputSchema: z.ZodType<Prisma.MedicineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MedicineCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MedicineAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MedicineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MedicineMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MedicineSumOrderByAggregateInputSchema).optional()
}).strict();

export const MedicineScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MedicineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MedicineScalarWhereWithAggregatesInputSchema),z.lazy(() => MedicineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MedicineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MedicineScalarWhereWithAggregatesInputSchema),z.lazy(() => MedicineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  stock: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PrescriptionWhereInputSchema: z.ZodType<Prisma.PrescriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PrescriptionWhereInputSchema),z.lazy(() => PrescriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrescriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrescriptionWhereInputSchema),z.lazy(() => PrescriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  medicineId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  doctor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  medicines: z.lazy(() => PrescriptionMedicineListRelationFilterSchema).optional()
}).strict();

export const PrescriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.PrescriptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medicineId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => SortOrderSchema).optional(),
  doctor: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  medicines: z.lazy(() => PrescriptionMedicineOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PrescriptionWhereUniqueInputSchema: z.ZodType<Prisma.PrescriptionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PrescriptionWhereInputSchema),z.lazy(() => PrescriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrescriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrescriptionWhereInputSchema),z.lazy(() => PrescriptionWhereInputSchema).array() ]).optional(),
  medicineId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  patient: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  doctor: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  medicines: z.lazy(() => PrescriptionMedicineListRelationFilterSchema).optional()
}).strict());

export const PrescriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PrescriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medicineId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => SortOrderSchema).optional(),
  doctor: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PrescriptionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PrescriptionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PrescriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PrescriptionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PrescriptionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PrescriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PrescriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PrescriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => PrescriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrescriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrescriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => PrescriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  medicineId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  patient: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  doctor: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PrescriptionMedicineWhereInputSchema: z.ZodType<Prisma.PrescriptionMedicineWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PrescriptionMedicineWhereInputSchema),z.lazy(() => PrescriptionMedicineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrescriptionMedicineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrescriptionMedicineWhereInputSchema),z.lazy(() => PrescriptionMedicineWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  prescriptionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  Prescription: z.union([ z.lazy(() => PrescriptionNullableRelationFilterSchema),z.lazy(() => PrescriptionWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PrescriptionMedicineOrderByWithRelationInputSchema: z.ZodType<Prisma.PrescriptionMedicineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  prescriptionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Prescription: z.lazy(() => PrescriptionOrderByWithRelationInputSchema).optional()
}).strict();

export const PrescriptionMedicineWhereUniqueInputSchema: z.ZodType<Prisma.PrescriptionMedicineWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PrescriptionMedicineWhereInputSchema),z.lazy(() => PrescriptionMedicineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrescriptionMedicineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrescriptionMedicineWhereInputSchema),z.lazy(() => PrescriptionMedicineWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  prescriptionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  Prescription: z.union([ z.lazy(() => PrescriptionNullableRelationFilterSchema),z.lazy(() => PrescriptionWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PrescriptionMedicineOrderByWithAggregationInputSchema: z.ZodType<Prisma.PrescriptionMedicineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  prescriptionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PrescriptionMedicineCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PrescriptionMedicineAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PrescriptionMedicineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PrescriptionMedicineMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PrescriptionMedicineSumOrderByAggregateInputSchema).optional()
}).strict();

export const PrescriptionMedicineScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PrescriptionMedicineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PrescriptionMedicineScalarWhereWithAggregatesInputSchema),z.lazy(() => PrescriptionMedicineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrescriptionMedicineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrescriptionMedicineScalarWhereWithAggregatesInputSchema),z.lazy(() => PrescriptionMedicineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  prescriptionId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PatientCounterWhereInputSchema: z.ZodType<Prisma.PatientCounterWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PatientCounterWhereInputSchema),z.lazy(() => PatientCounterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientCounterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientCounterWhereInputSchema),z.lazy(() => PatientCounterWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PatientCounterOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientCounterOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCounterWhereUniqueInputSchema: z.ZodType<Prisma.PatientCounterWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PatientCounterWhereInputSchema),z.lazy(() => PatientCounterWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientCounterWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientCounterWhereInputSchema),z.lazy(() => PatientCounterWhereInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
}).strict());

export const PatientCounterOrderByWithAggregationInputSchema: z.ZodType<Prisma.PatientCounterOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PatientCounterCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PatientCounterAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PatientCounterMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PatientCounterMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PatientCounterSumOrderByAggregateInputSchema).optional()
}).strict();

export const PatientCounterScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PatientCounterScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PatientCounterScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientCounterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PatientCounterScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PatientCounterScalarWhereWithAggregatesInputSchema),z.lazy(() => PatientCounterScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PatientCreateInputSchema: z.ZodType<Prisma.PatientCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().optional().nullable(),
  gander: z.lazy(() => GanderSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUncheckedCreateInputSchema: z.ZodType<Prisma.PatientUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().optional().nullable(),
  gander: z.lazy(() => GanderSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const PatientUpdateInputSchema: z.ZodType<Prisma.PatientUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const PatientCreateManyInputSchema: z.ZodType<Prisma.PatientCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().optional().nullable(),
  gander: z.lazy(() => GanderSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PatientUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorCreateInputSchema: z.ZodType<Prisma.DoctorCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  specialization: z.lazy(() => DoctorSpecializationSchema),
  appointmentPrice: z.number().int(),
  workingDays: z.union([ z.lazy(() => DoctorCreateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  preferences: z.lazy(() => DoctorPreferencesCreateNestedOneWithoutDoctorInputSchema),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutDoctorInputSchema).optional()
}).strict();

export const DoctorUncheckedCreateInputSchema: z.ZodType<Prisma.DoctorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  specialization: z.lazy(() => DoctorSpecializationSchema),
  appointmentPrice: z.number().int(),
  workingDays: z.union([ z.lazy(() => DoctorCreateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  doctorPreferencesId: z.string(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutDoctorInputSchema).optional()
}).strict();

export const DoctorUpdateInputSchema: z.ZodType<Prisma.DoctorUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  preferences: z.lazy(() => DoctorPreferencesUpdateOneRequiredWithoutDoctorNestedInputSchema).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutDoctorNestedInputSchema).optional()
}).strict();

export const DoctorUncheckedUpdateInputSchema: z.ZodType<Prisma.DoctorUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  doctorPreferencesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutDoctorNestedInputSchema).optional()
}).strict();

export const DoctorCreateManyInputSchema: z.ZodType<Prisma.DoctorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  specialization: z.lazy(() => DoctorSpecializationSchema),
  appointmentPrice: z.number().int(),
  workingDays: z.union([ z.lazy(() => DoctorCreateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  doctorPreferencesId: z.string()
}).strict();

export const DoctorUpdateManyMutationInputSchema: z.ZodType<Prisma.DoctorUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
}).strict();

export const DoctorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DoctorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  doctorPreferencesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorPreferencesCreateInputSchema: z.ZodType<Prisma.DoctorPreferencesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  SUNDAY: z.boolean().optional(),
  MONDAY: z.boolean().optional(),
  TUESDAY: z.boolean().optional(),
  WEDNESDAY: z.boolean().optional(),
  THURSDAY: z.boolean().optional(),
  FRIDAY: z.boolean().optional(),
  SATURDAY: z.boolean().optional(),
  Doctor: z.lazy(() => DoctorCreateNestedOneWithoutPreferencesInputSchema).optional()
}).strict();

export const DoctorPreferencesUncheckedCreateInputSchema: z.ZodType<Prisma.DoctorPreferencesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  SUNDAY: z.boolean().optional(),
  MONDAY: z.boolean().optional(),
  TUESDAY: z.boolean().optional(),
  WEDNESDAY: z.boolean().optional(),
  THURSDAY: z.boolean().optional(),
  FRIDAY: z.boolean().optional(),
  SATURDAY: z.boolean().optional(),
  Doctor: z.lazy(() => DoctorUncheckedCreateNestedOneWithoutPreferencesInputSchema).optional()
}).strict();

export const DoctorPreferencesUpdateInputSchema: z.ZodType<Prisma.DoctorPreferencesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  SUNDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  MONDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  TUESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  WEDNESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  THURSDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  FRIDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  SATURDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Doctor: z.lazy(() => DoctorUpdateOneWithoutPreferencesNestedInputSchema).optional()
}).strict();

export const DoctorPreferencesUncheckedUpdateInputSchema: z.ZodType<Prisma.DoctorPreferencesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  SUNDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  MONDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  TUESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  WEDNESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  THURSDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  FRIDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  SATURDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Doctor: z.lazy(() => DoctorUncheckedUpdateOneWithoutPreferencesNestedInputSchema).optional()
}).strict();

export const DoctorPreferencesCreateManyInputSchema: z.ZodType<Prisma.DoctorPreferencesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  SUNDAY: z.boolean().optional(),
  MONDAY: z.boolean().optional(),
  TUESDAY: z.boolean().optional(),
  WEDNESDAY: z.boolean().optional(),
  THURSDAY: z.boolean().optional(),
  FRIDAY: z.boolean().optional(),
  SATURDAY: z.boolean().optional()
}).strict();

export const DoctorPreferencesUpdateManyMutationInputSchema: z.ZodType<Prisma.DoctorPreferencesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  SUNDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  MONDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  TUESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  WEDNESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  THURSDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  FRIDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  SATURDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorPreferencesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DoctorPreferencesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  SUNDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  MONDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  TUESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  WEDNESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  THURSDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  FRIDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  SATURDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerCreateInputSchema: z.ZodType<Prisma.WorkerCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema),
  verified: z.boolean().optional(),
  token: z.lazy(() => WorkerTokenCreateNestedOneWithoutWorkerInputSchema).optional()
}).strict();

export const WorkerUncheckedCreateInputSchema: z.ZodType<Prisma.WorkerUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema),
  verified: z.boolean().optional(),
  token: z.lazy(() => WorkerTokenUncheckedCreateNestedOneWithoutWorkerInputSchema).optional()
}).strict();

export const WorkerUpdateInputSchema: z.ZodType<Prisma.WorkerUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.lazy(() => WorkerTokenUpdateOneWithoutWorkerNestedInputSchema).optional()
}).strict();

export const WorkerUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.lazy(() => WorkerTokenUncheckedUpdateOneWithoutWorkerNestedInputSchema).optional()
}).strict();

export const WorkerCreateManyInputSchema: z.ZodType<Prisma.WorkerCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema),
  verified: z.boolean().optional()
}).strict();

export const WorkerUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerTokenCreateInputSchema: z.ZodType<Prisma.WorkerTokenCreateInput> = z.object({
  id: z.string().cuid().optional(),
  refreshToken: z.string(),
  isValid: z.boolean().optional(),
  worker: z.lazy(() => WorkerCreateNestedOneWithoutTokenInputSchema)
}).strict();

export const WorkerTokenUncheckedCreateInputSchema: z.ZodType<Prisma.WorkerTokenUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  refreshToken: z.string(),
  isValid: z.boolean().optional(),
  workerId: z.string()
}).strict();

export const WorkerTokenUpdateInputSchema: z.ZodType<Prisma.WorkerTokenUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  worker: z.lazy(() => WorkerUpdateOneRequiredWithoutTokenNestedInputSchema).optional()
}).strict();

export const WorkerTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkerTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  workerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerTokenCreateManyInputSchema: z.ZodType<Prisma.WorkerTokenCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  refreshToken: z.string(),
  isValid: z.boolean().optional(),
  workerId: z.string()
}).strict();

export const WorkerTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkerTokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkerTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  workerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateInputSchema: z.ZodType<Prisma.AppointmentCreateInput> = z.object({
  day: z.lazy(() => WeekdaySchema),
  Patient: z.lazy(() => PatientCreateNestedOneWithoutAppointmentsInputSchema).optional(),
  Doctor: z.lazy(() => DoctorCreateNestedOneWithoutAppointmentsInputSchema).optional()
}).strict();

export const AppointmentUncheckedCreateInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  day: z.lazy(() => WeekdaySchema),
  patientId: z.string().optional().nullable(),
  doctorId: z.string().optional().nullable()
}).strict();

export const AppointmentUpdateInputSchema: z.ZodType<Prisma.AppointmentUpdateInput> = z.object({
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  Patient: z.lazy(() => PatientUpdateOneWithoutAppointmentsNestedInputSchema).optional(),
  Doctor: z.lazy(() => DoctorUpdateOneWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doctorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppointmentCreateManyInputSchema: z.ZodType<Prisma.AppointmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  day: z.lazy(() => WeekdaySchema),
  patientId: z.string().optional().nullable(),
  doctorId: z.string().optional().nullable()
}).strict();

export const AppointmentUpdateManyMutationInputSchema: z.ZodType<Prisma.AppointmentUpdateManyMutationInput> = z.object({
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  doctorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MedicineCreateInputSchema: z.ZodType<Prisma.MedicineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().int()
}).strict();

export const MedicineUncheckedCreateInputSchema: z.ZodType<Prisma.MedicineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().int()
}).strict();

export const MedicineUpdateInputSchema: z.ZodType<Prisma.MedicineUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  stock: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MedicineUncheckedUpdateInputSchema: z.ZodType<Prisma.MedicineUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  stock: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MedicineCreateManyInputSchema: z.ZodType<Prisma.MedicineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().int()
}).strict();

export const MedicineUpdateManyMutationInputSchema: z.ZodType<Prisma.MedicineUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  stock: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MedicineUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MedicineUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  stock: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionCreateInputSchema: z.ZodType<Prisma.PrescriptionCreateInput> = z.object({
  medicineId: z.number().int(),
  patient: z.string(),
  doctor: z.string(),
  date: z.coerce.date().optional(),
  medicines: z.lazy(() => PrescriptionMedicineCreateNestedManyWithoutPrescriptionInputSchema).optional()
}).strict();

export const PrescriptionUncheckedCreateInputSchema: z.ZodType<Prisma.PrescriptionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  medicineId: z.number().int(),
  patient: z.string(),
  doctor: z.string(),
  date: z.coerce.date().optional(),
  medicines: z.lazy(() => PrescriptionMedicineUncheckedCreateNestedManyWithoutPrescriptionInputSchema).optional()
}).strict();

export const PrescriptionUpdateInputSchema: z.ZodType<Prisma.PrescriptionUpdateInput> = z.object({
  medicineId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  doctor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicines: z.lazy(() => PrescriptionMedicineUpdateManyWithoutPrescriptionNestedInputSchema).optional()
}).strict();

export const PrescriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.PrescriptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  medicineId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  doctor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  medicines: z.lazy(() => PrescriptionMedicineUncheckedUpdateManyWithoutPrescriptionNestedInputSchema).optional()
}).strict();

export const PrescriptionCreateManyInputSchema: z.ZodType<Prisma.PrescriptionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  medicineId: z.number().int(),
  patient: z.string(),
  doctor: z.string(),
  date: z.coerce.date().optional()
}).strict();

export const PrescriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.PrescriptionUpdateManyMutationInput> = z.object({
  medicineId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  doctor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PrescriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  medicineId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  doctor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionMedicineCreateInputSchema: z.ZodType<Prisma.PrescriptionMedicineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number().int(),
  quantity: z.number().int(),
  Prescription: z.lazy(() => PrescriptionCreateNestedOneWithoutMedicinesInputSchema).optional()
}).strict();

export const PrescriptionMedicineUncheckedCreateInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number().int(),
  quantity: z.number().int(),
  prescriptionId: z.number().int().optional().nullable()
}).strict();

export const PrescriptionMedicineUpdateInputSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Prescription: z.lazy(() => PrescriptionUpdateOneWithoutMedicinesNestedInputSchema).optional()
}).strict();

export const PrescriptionMedicineUncheckedUpdateInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prescriptionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PrescriptionMedicineCreateManyInputSchema: z.ZodType<Prisma.PrescriptionMedicineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number().int(),
  quantity: z.number().int(),
  prescriptionId: z.number().int().optional().nullable()
}).strict();

export const PrescriptionMedicineUpdateManyMutationInputSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionMedicineUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  prescriptionId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PatientCounterCreateInputSchema: z.ZodType<Prisma.PatientCounterCreateInput> = z.object({
  value: z.number().int()
}).strict();

export const PatientCounterUncheckedCreateInputSchema: z.ZodType<Prisma.PatientCounterUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  value: z.number().int()
}).strict();

export const PatientCounterUpdateInputSchema: z.ZodType<Prisma.PatientCounterUpdateInput> = z.object({
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCounterUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientCounterUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCounterCreateManyInputSchema: z.ZodType<Prisma.PatientCounterCreateManyInput> = z.object({
  id: z.number().int().optional(),
  value: z.number().int()
}).strict();

export const PatientCounterUpdateManyMutationInputSchema: z.ZodType<Prisma.PatientCounterUpdateManyMutationInput> = z.object({
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCounterUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PatientCounterUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumGanderFilterSchema: z.ZodType<Prisma.EnumGanderFilter> = z.object({
  equals: z.lazy(() => GanderSchema).optional(),
  in: z.lazy(() => GanderSchema).array().optional(),
  notIn: z.lazy(() => GanderSchema).array().optional(),
  not: z.union([ z.lazy(() => GanderSchema),z.lazy(() => NestedEnumGanderFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AppointmentListRelationFilterSchema: z.ZodType<Prisma.AppointmentListRelationFilter> = z.object({
  every: z.lazy(() => AppointmentWhereInputSchema).optional(),
  some: z.lazy(() => AppointmentWhereInputSchema).optional(),
  none: z.lazy(() => AppointmentWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AppointmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppointmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  gander: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatientAvgOrderByAggregateInput> = z.object({
  age: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  gander: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  gander: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatientSumOrderByAggregateInput> = z.object({
  age: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumGanderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGanderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GanderSchema).optional(),
  in: z.lazy(() => GanderSchema).array().optional(),
  notIn: z.lazy(() => GanderSchema).array().optional(),
  not: z.union([ z.lazy(() => GanderSchema),z.lazy(() => NestedEnumGanderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGanderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGanderFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumDoctorSpecializationFilterSchema: z.ZodType<Prisma.EnumDoctorSpecializationFilter> = z.object({
  equals: z.lazy(() => DoctorSpecializationSchema).optional(),
  in: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  notIn: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  not: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => NestedEnumDoctorSpecializationFilterSchema) ]).optional(),
}).strict();

export const EnumWeekdayNullableListFilterSchema: z.ZodType<Prisma.EnumWeekdayNullableListFilter> = z.object({
  equals: z.lazy(() => WeekdaySchema).array().optional().nullable(),
  has: z.lazy(() => WeekdaySchema).optional().nullable(),
  hasEvery: z.lazy(() => WeekdaySchema).array().optional(),
  hasSome: z.lazy(() => WeekdaySchema).array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const DoctorPreferencesRelationFilterSchema: z.ZodType<Prisma.DoctorPreferencesRelationFilter> = z.object({
  is: z.lazy(() => DoctorPreferencesWhereInputSchema).optional(),
  isNot: z.lazy(() => DoctorPreferencesWhereInputSchema).optional()
}).strict();

export const DoctorCountOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  specialization: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional(),
  workingDays: z.lazy(() => SortOrderSchema).optional(),
  doctorPreferencesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorAvgOrderByAggregateInput> = z.object({
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  specialization: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional(),
  doctorPreferencesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorMinOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  specialization: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional(),
  doctorPreferencesId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorSumOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorSumOrderByAggregateInput> = z.object({
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDoctorSpecializationWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDoctorSpecializationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DoctorSpecializationSchema).optional(),
  in: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  notIn: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  not: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => NestedEnumDoctorSpecializationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDoctorSpecializationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDoctorSpecializationFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DoctorNullableRelationFilterSchema: z.ZodType<Prisma.DoctorNullableRelationFilter> = z.object({
  is: z.lazy(() => DoctorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DoctorWhereInputSchema).optional().nullable()
}).strict();

export const DoctorPreferencesCountOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorPreferencesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  SUNDAY: z.lazy(() => SortOrderSchema).optional(),
  MONDAY: z.lazy(() => SortOrderSchema).optional(),
  TUESDAY: z.lazy(() => SortOrderSchema).optional(),
  WEDNESDAY: z.lazy(() => SortOrderSchema).optional(),
  THURSDAY: z.lazy(() => SortOrderSchema).optional(),
  FRIDAY: z.lazy(() => SortOrderSchema).optional(),
  SATURDAY: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorPreferencesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorPreferencesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  SUNDAY: z.lazy(() => SortOrderSchema).optional(),
  MONDAY: z.lazy(() => SortOrderSchema).optional(),
  TUESDAY: z.lazy(() => SortOrderSchema).optional(),
  WEDNESDAY: z.lazy(() => SortOrderSchema).optional(),
  THURSDAY: z.lazy(() => SortOrderSchema).optional(),
  FRIDAY: z.lazy(() => SortOrderSchema).optional(),
  SATURDAY: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorPreferencesMinOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorPreferencesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  SUNDAY: z.lazy(() => SortOrderSchema).optional(),
  MONDAY: z.lazy(() => SortOrderSchema).optional(),
  TUESDAY: z.lazy(() => SortOrderSchema).optional(),
  WEDNESDAY: z.lazy(() => SortOrderSchema).optional(),
  THURSDAY: z.lazy(() => SortOrderSchema).optional(),
  FRIDAY: z.lazy(() => SortOrderSchema).optional(),
  SATURDAY: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumWorkerRoleFilterSchema: z.ZodType<Prisma.EnumWorkerRoleFilter> = z.object({
  equals: z.lazy(() => WorkerRoleSchema).optional(),
  in: z.lazy(() => WorkerRoleSchema).array().optional(),
  notIn: z.lazy(() => WorkerRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => NestedEnumWorkerRoleFilterSchema) ]).optional(),
}).strict();

export const WorkerTokenNullableRelationFilterSchema: z.ZodType<Prisma.WorkerTokenNullableRelationFilter> = z.object({
  is: z.lazy(() => WorkerTokenWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WorkerTokenWhereInputSchema).optional().nullable()
}).strict();

export const WorkerCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkerMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumWorkerRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumWorkerRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkerRoleSchema).optional(),
  in: z.lazy(() => WorkerRoleSchema).array().optional(),
  notIn: z.lazy(() => WorkerRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => NestedEnumWorkerRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkerRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkerRoleFilterSchema).optional()
}).strict();

export const WorkerRelationFilterSchema: z.ZodType<Prisma.WorkerRelationFilter> = z.object({
  is: z.lazy(() => WorkerWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkerWhereInputSchema).optional()
}).strict();

export const WorkerTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  isValid: z.lazy(() => SortOrderSchema).optional(),
  workerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkerTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  isValid: z.lazy(() => SortOrderSchema).optional(),
  workerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkerTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  isValid: z.lazy(() => SortOrderSchema).optional(),
  workerId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumWeekdayFilterSchema: z.ZodType<Prisma.EnumWeekdayFilter> = z.object({
  equals: z.lazy(() => WeekdaySchema).optional(),
  in: z.lazy(() => WeekdaySchema).array().optional(),
  notIn: z.lazy(() => WeekdaySchema).array().optional(),
  not: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => NestedEnumWeekdayFilterSchema) ]).optional(),
}).strict();

export const PatientNullableRelationFilterSchema: z.ZodType<Prisma.PatientNullableRelationFilter> = z.object({
  is: z.lazy(() => PatientWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PatientWhereInputSchema).optional().nullable()
}).strict();

export const AppointmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  doctorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  doctorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  patientId: z.lazy(() => SortOrderSchema).optional(),
  doctorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumWeekdayWithAggregatesFilterSchema: z.ZodType<Prisma.EnumWeekdayWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WeekdaySchema).optional(),
  in: z.lazy(() => WeekdaySchema).array().optional(),
  notIn: z.lazy(() => WeekdaySchema).array().optional(),
  not: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => NestedEnumWeekdayWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWeekdayFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWeekdayFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const MedicineCountOrderByAggregateInputSchema: z.ZodType<Prisma.MedicineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicineAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MedicineAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicineMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MedicineMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicineMinOrderByAggregateInputSchema: z.ZodType<Prisma.MedicineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MedicineSumOrderByAggregateInputSchema: z.ZodType<Prisma.MedicineSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  stock: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const PrescriptionMedicineListRelationFilterSchema: z.ZodType<Prisma.PrescriptionMedicineListRelationFilter> = z.object({
  every: z.lazy(() => PrescriptionMedicineWhereInputSchema).optional(),
  some: z.lazy(() => PrescriptionMedicineWhereInputSchema).optional(),
  none: z.lazy(() => PrescriptionMedicineWhereInputSchema).optional()
}).strict();

export const PrescriptionMedicineOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PrescriptionMedicineOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medicineId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => SortOrderSchema).optional(),
  doctor: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medicineId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medicineId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => SortOrderSchema).optional(),
  doctor: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medicineId: z.lazy(() => SortOrderSchema).optional(),
  patient: z.lazy(() => SortOrderSchema).optional(),
  doctor: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medicineId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PrescriptionNullableRelationFilterSchema: z.ZodType<Prisma.PrescriptionNullableRelationFilter> = z.object({
  is: z.lazy(() => PrescriptionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PrescriptionWhereInputSchema).optional().nullable()
}).strict();

export const PrescriptionMedicineCountOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionMedicineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  prescriptionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionMedicineAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionMedicineAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  prescriptionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionMedicineMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionMedicineMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  prescriptionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionMedicineMinOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionMedicineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  prescriptionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PrescriptionMedicineSumOrderByAggregateInputSchema: z.ZodType<Prisma.PrescriptionMedicineSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  prescriptionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const PatientCounterCountOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCounterCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCounterAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCounterAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCounterMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCounterMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCounterMinOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCounterMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PatientCounterSumOrderByAggregateInputSchema: z.ZodType<Prisma.PatientCounterSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumGanderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGanderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GanderSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AppointmentUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentCreateWithoutPatientInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DoctorCreateworkingDaysInputSchema: z.ZodType<Prisma.DoctorCreateworkingDaysInput> = z.object({
  set: z.lazy(() => WeekdaySchema).array()
}).strict();

export const DoctorPreferencesCreateNestedOneWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesCreateNestedOneWithoutDoctorInput> = z.object({
  create: z.union([ z.lazy(() => DoctorPreferencesCreateWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUncheckedCreateWithoutDoctorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorPreferencesCreateOrConnectWithoutDoctorInputSchema).optional(),
  connect: z.lazy(() => DoctorPreferencesWhereUniqueInputSchema).optional()
}).strict();

export const AppointmentCreateNestedManyWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutDoctorInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateWithoutDoctorInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyDoctorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedCreateNestedManyWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutDoctorInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateWithoutDoctorInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyDoctorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumDoctorSpecializationFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDoctorSpecializationFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DoctorSpecializationSchema).optional()
}).strict();

export const DoctorUpdateworkingDaysInputSchema: z.ZodType<Prisma.DoctorUpdateworkingDaysInput> = z.object({
  set: z.lazy(() => WeekdaySchema).array().optional(),
  push: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
}).strict();

export const DoctorPreferencesUpdateOneRequiredWithoutDoctorNestedInputSchema: z.ZodType<Prisma.DoctorPreferencesUpdateOneRequiredWithoutDoctorNestedInput> = z.object({
  create: z.union([ z.lazy(() => DoctorPreferencesCreateWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUncheckedCreateWithoutDoctorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorPreferencesCreateOrConnectWithoutDoctorInputSchema).optional(),
  upsert: z.lazy(() => DoctorPreferencesUpsertWithoutDoctorInputSchema).optional(),
  connect: z.lazy(() => DoctorPreferencesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DoctorPreferencesUpdateToOneWithWhereWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUpdateWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUncheckedUpdateWithoutDoctorInputSchema) ]).optional(),
}).strict();

export const AppointmentUpdateManyWithoutDoctorNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutDoctorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateWithoutDoctorInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutDoctorInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutDoctorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyDoctorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutDoctorInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutDoctorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutDoctorInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutDoctorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutDoctorNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutDoctorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateWithoutDoctorInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutDoctorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutDoctorInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutDoctorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyDoctorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutDoctorInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutDoctorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutDoctorInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutDoctorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DoctorCreateNestedOneWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorCreateNestedOneWithoutPreferencesInput> = z.object({
  create: z.union([ z.lazy(() => DoctorCreateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutPreferencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorCreateOrConnectWithoutPreferencesInputSchema).optional(),
  connect: z.lazy(() => DoctorWhereUniqueInputSchema).optional()
}).strict();

export const DoctorUncheckedCreateNestedOneWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorUncheckedCreateNestedOneWithoutPreferencesInput> = z.object({
  create: z.union([ z.lazy(() => DoctorCreateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutPreferencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorCreateOrConnectWithoutPreferencesInputSchema).optional(),
  connect: z.lazy(() => DoctorWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DoctorUpdateOneWithoutPreferencesNestedInputSchema: z.ZodType<Prisma.DoctorUpdateOneWithoutPreferencesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DoctorCreateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutPreferencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorCreateOrConnectWithoutPreferencesInputSchema).optional(),
  upsert: z.lazy(() => DoctorUpsertWithoutPreferencesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DoctorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DoctorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DoctorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DoctorUpdateToOneWithWhereWithoutPreferencesInputSchema),z.lazy(() => DoctorUpdateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedUpdateWithoutPreferencesInputSchema) ]).optional(),
}).strict();

export const DoctorUncheckedUpdateOneWithoutPreferencesNestedInputSchema: z.ZodType<Prisma.DoctorUncheckedUpdateOneWithoutPreferencesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DoctorCreateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutPreferencesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorCreateOrConnectWithoutPreferencesInputSchema).optional(),
  upsert: z.lazy(() => DoctorUpsertWithoutPreferencesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DoctorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DoctorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DoctorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DoctorUpdateToOneWithWhereWithoutPreferencesInputSchema),z.lazy(() => DoctorUpdateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedUpdateWithoutPreferencesInputSchema) ]).optional(),
}).strict();

export const WorkerTokenCreateNestedOneWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenCreateNestedOneWithoutWorkerInput> = z.object({
  create: z.union([ z.lazy(() => WorkerTokenCreateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedCreateWithoutWorkerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkerTokenCreateOrConnectWithoutWorkerInputSchema).optional(),
  connect: z.lazy(() => WorkerTokenWhereUniqueInputSchema).optional()
}).strict();

export const WorkerTokenUncheckedCreateNestedOneWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenUncheckedCreateNestedOneWithoutWorkerInput> = z.object({
  create: z.union([ z.lazy(() => WorkerTokenCreateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedCreateWithoutWorkerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkerTokenCreateOrConnectWithoutWorkerInputSchema).optional(),
  connect: z.lazy(() => WorkerTokenWhereUniqueInputSchema).optional()
}).strict();

export const EnumWorkerRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumWorkerRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => WorkerRoleSchema).optional()
}).strict();

export const WorkerTokenUpdateOneWithoutWorkerNestedInputSchema: z.ZodType<Prisma.WorkerTokenUpdateOneWithoutWorkerNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkerTokenCreateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedCreateWithoutWorkerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkerTokenCreateOrConnectWithoutWorkerInputSchema).optional(),
  upsert: z.lazy(() => WorkerTokenUpsertWithoutWorkerInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WorkerTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WorkerTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WorkerTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkerTokenUpdateToOneWithWhereWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUpdateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedUpdateWithoutWorkerInputSchema) ]).optional(),
}).strict();

export const WorkerTokenUncheckedUpdateOneWithoutWorkerNestedInputSchema: z.ZodType<Prisma.WorkerTokenUncheckedUpdateOneWithoutWorkerNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkerTokenCreateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedCreateWithoutWorkerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkerTokenCreateOrConnectWithoutWorkerInputSchema).optional(),
  upsert: z.lazy(() => WorkerTokenUpsertWithoutWorkerInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WorkerTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WorkerTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WorkerTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkerTokenUpdateToOneWithWhereWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUpdateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedUpdateWithoutWorkerInputSchema) ]).optional(),
}).strict();

export const WorkerCreateNestedOneWithoutTokenInputSchema: z.ZodType<Prisma.WorkerCreateNestedOneWithoutTokenInput> = z.object({
  create: z.union([ z.lazy(() => WorkerCreateWithoutTokenInputSchema),z.lazy(() => WorkerUncheckedCreateWithoutTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkerCreateOrConnectWithoutTokenInputSchema).optional(),
  connect: z.lazy(() => WorkerWhereUniqueInputSchema).optional()
}).strict();

export const WorkerUpdateOneRequiredWithoutTokenNestedInputSchema: z.ZodType<Prisma.WorkerUpdateOneRequiredWithoutTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkerCreateWithoutTokenInputSchema),z.lazy(() => WorkerUncheckedCreateWithoutTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkerCreateOrConnectWithoutTokenInputSchema).optional(),
  upsert: z.lazy(() => WorkerUpsertWithoutTokenInputSchema).optional(),
  connect: z.lazy(() => WorkerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkerUpdateToOneWithWhereWithoutTokenInputSchema),z.lazy(() => WorkerUpdateWithoutTokenInputSchema),z.lazy(() => WorkerUncheckedUpdateWithoutTokenInputSchema) ]).optional(),
}).strict();

export const PatientCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateNestedOneWithoutAppointmentsInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional()
}).strict();

export const DoctorCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorCreateNestedOneWithoutAppointmentsInput> = z.object({
  create: z.union([ z.lazy(() => DoctorCreateWithoutAppointmentsInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => DoctorWhereUniqueInputSchema).optional()
}).strict();

export const EnumWeekdayFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumWeekdayFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => WeekdaySchema).optional()
}).strict();

export const PatientUpdateOneWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.PatientUpdateOneWithoutAppointmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PatientCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  upsert: z.lazy(() => PatientUpsertWithoutAppointmentsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PatientWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PatientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PatientUpdateToOneWithWhereWithoutAppointmentsInputSchema),z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema) ]).optional(),
}).strict();

export const DoctorUpdateOneWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.DoctorUpdateOneWithoutAppointmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DoctorCreateWithoutAppointmentsInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoctorCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  upsert: z.lazy(() => DoctorUpsertWithoutAppointmentsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DoctorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DoctorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DoctorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DoctorUpdateToOneWithWhereWithoutAppointmentsInputSchema),z.lazy(() => DoctorUpdateWithoutAppointmentsInputSchema),z.lazy(() => DoctorUncheckedUpdateWithoutAppointmentsInputSchema) ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PrescriptionMedicineCreateNestedManyWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineCreateNestedManyWithoutPrescriptionInput> = z.object({
  create: z.union([ z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema).array(),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PrescriptionMedicineCreateManyPrescriptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PrescriptionMedicineUncheckedCreateNestedManyWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedCreateNestedManyWithoutPrescriptionInput> = z.object({
  create: z.union([ z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema).array(),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PrescriptionMedicineCreateManyPrescriptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PrescriptionMedicineUpdateManyWithoutPrescriptionNestedInputSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateManyWithoutPrescriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema).array(),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PrescriptionMedicineUpsertWithWhereUniqueWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUpsertWithWhereUniqueWithoutPrescriptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PrescriptionMedicineCreateManyPrescriptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PrescriptionMedicineUpdateWithWhereUniqueWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUpdateWithWhereUniqueWithoutPrescriptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PrescriptionMedicineUpdateManyWithWhereWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUpdateManyWithWhereWithoutPrescriptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PrescriptionMedicineScalarWhereInputSchema),z.lazy(() => PrescriptionMedicineScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PrescriptionMedicineUncheckedUpdateManyWithoutPrescriptionNestedInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedUpdateManyWithoutPrescriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema).array(),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PrescriptionMedicineUpsertWithWhereUniqueWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUpsertWithWhereUniqueWithoutPrescriptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PrescriptionMedicineCreateManyPrescriptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PrescriptionMedicineUpdateWithWhereUniqueWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUpdateWithWhereUniqueWithoutPrescriptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PrescriptionMedicineUpdateManyWithWhereWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUpdateManyWithWhereWithoutPrescriptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PrescriptionMedicineScalarWhereInputSchema),z.lazy(() => PrescriptionMedicineScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PrescriptionCreateNestedOneWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionCreateNestedOneWithoutMedicinesInput> = z.object({
  create: z.union([ z.lazy(() => PrescriptionCreateWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUncheckedCreateWithoutMedicinesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrescriptionCreateOrConnectWithoutMedicinesInputSchema).optional(),
  connect: z.lazy(() => PrescriptionWhereUniqueInputSchema).optional()
}).strict();

export const PrescriptionUpdateOneWithoutMedicinesNestedInputSchema: z.ZodType<Prisma.PrescriptionUpdateOneWithoutMedicinesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PrescriptionCreateWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUncheckedCreateWithoutMedicinesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PrescriptionCreateOrConnectWithoutMedicinesInputSchema).optional(),
  upsert: z.lazy(() => PrescriptionUpsertWithoutMedicinesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PrescriptionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PrescriptionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PrescriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PrescriptionUpdateToOneWithWhereWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUpdateWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUncheckedUpdateWithoutMedicinesInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumGanderFilterSchema: z.ZodType<Prisma.NestedEnumGanderFilter> = z.object({
  equals: z.lazy(() => GanderSchema).optional(),
  in: z.lazy(() => GanderSchema).array().optional(),
  notIn: z.lazy(() => GanderSchema).array().optional(),
  not: z.union([ z.lazy(() => GanderSchema),z.lazy(() => NestedEnumGanderFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumGanderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGanderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GanderSchema).optional(),
  in: z.lazy(() => GanderSchema).array().optional(),
  notIn: z.lazy(() => GanderSchema).array().optional(),
  not: z.union([ z.lazy(() => GanderSchema),z.lazy(() => NestedEnumGanderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGanderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGanderFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumDoctorSpecializationFilterSchema: z.ZodType<Prisma.NestedEnumDoctorSpecializationFilter> = z.object({
  equals: z.lazy(() => DoctorSpecializationSchema).optional(),
  in: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  notIn: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  not: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => NestedEnumDoctorSpecializationFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDoctorSpecializationWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDoctorSpecializationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DoctorSpecializationSchema).optional(),
  in: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  notIn: z.lazy(() => DoctorSpecializationSchema).array().optional(),
  not: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => NestedEnumDoctorSpecializationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDoctorSpecializationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDoctorSpecializationFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumWorkerRoleFilterSchema: z.ZodType<Prisma.NestedEnumWorkerRoleFilter> = z.object({
  equals: z.lazy(() => WorkerRoleSchema).optional(),
  in: z.lazy(() => WorkerRoleSchema).array().optional(),
  notIn: z.lazy(() => WorkerRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => NestedEnumWorkerRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumWorkerRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumWorkerRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkerRoleSchema).optional(),
  in: z.lazy(() => WorkerRoleSchema).array().optional(),
  notIn: z.lazy(() => WorkerRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => NestedEnumWorkerRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkerRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkerRoleFilterSchema).optional()
}).strict();

export const NestedEnumWeekdayFilterSchema: z.ZodType<Prisma.NestedEnumWeekdayFilter> = z.object({
  equals: z.lazy(() => WeekdaySchema).optional(),
  in: z.lazy(() => WeekdaySchema).array().optional(),
  notIn: z.lazy(() => WeekdaySchema).array().optional(),
  not: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => NestedEnumWeekdayFilterSchema) ]).optional(),
}).strict();

export const NestedEnumWeekdayWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumWeekdayWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WeekdaySchema).optional(),
  in: z.lazy(() => WeekdaySchema).array().optional(),
  notIn: z.lazy(() => WeekdaySchema).array().optional(),
  not: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => NestedEnumWeekdayWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWeekdayFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWeekdayFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AppointmentCreateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutPatientInput> = z.object({
  day: z.lazy(() => WeekdaySchema),
  Doctor: z.lazy(() => DoctorCreateNestedOneWithoutAppointmentsInputSchema).optional()
}).strict();

export const AppointmentUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutPatientInput> = z.object({
  id: z.number().int().optional(),
  day: z.lazy(() => WeekdaySchema),
  doctorId: z.string().optional().nullable()
}).strict();

export const AppointmentCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppointmentCreateManyPatientInputSchema),z.lazy(() => AppointmentCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppointmentUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppointmentUpdateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateWithoutPatientInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => AppointmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateManyMutationInputSchema),z.lazy(() => AppointmentUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const AppointmentScalarWhereInputSchema: z.ZodType<Prisma.AppointmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  day: z.union([ z.lazy(() => EnumWeekdayFilterSchema),z.lazy(() => WeekdaySchema) ]).optional(),
  patientId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  doctorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const DoctorPreferencesCreateWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesCreateWithoutDoctorInput> = z.object({
  id: z.string().cuid().optional(),
  SUNDAY: z.boolean().optional(),
  MONDAY: z.boolean().optional(),
  TUESDAY: z.boolean().optional(),
  WEDNESDAY: z.boolean().optional(),
  THURSDAY: z.boolean().optional(),
  FRIDAY: z.boolean().optional(),
  SATURDAY: z.boolean().optional()
}).strict();

export const DoctorPreferencesUncheckedCreateWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesUncheckedCreateWithoutDoctorInput> = z.object({
  id: z.string().cuid().optional(),
  SUNDAY: z.boolean().optional(),
  MONDAY: z.boolean().optional(),
  TUESDAY: z.boolean().optional(),
  WEDNESDAY: z.boolean().optional(),
  THURSDAY: z.boolean().optional(),
  FRIDAY: z.boolean().optional(),
  SATURDAY: z.boolean().optional()
}).strict();

export const DoctorPreferencesCreateOrConnectWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesCreateOrConnectWithoutDoctorInput> = z.object({
  where: z.lazy(() => DoctorPreferencesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DoctorPreferencesCreateWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUncheckedCreateWithoutDoctorInputSchema) ]),
}).strict();

export const AppointmentCreateWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutDoctorInput> = z.object({
  day: z.lazy(() => WeekdaySchema),
  Patient: z.lazy(() => PatientCreateNestedOneWithoutAppointmentsInputSchema).optional()
}).strict();

export const AppointmentUncheckedCreateWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutDoctorInput> = z.object({
  id: z.number().int().optional(),
  day: z.lazy(() => WeekdaySchema),
  patientId: z.string().optional().nullable()
}).strict();

export const AppointmentCreateOrConnectWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutDoctorInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema) ]),
}).strict();

export const AppointmentCreateManyDoctorInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyDoctorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppointmentCreateManyDoctorInputSchema),z.lazy(() => AppointmentCreateManyDoctorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DoctorPreferencesUpsertWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesUpsertWithoutDoctorInput> = z.object({
  update: z.union([ z.lazy(() => DoctorPreferencesUpdateWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUncheckedUpdateWithoutDoctorInputSchema) ]),
  create: z.union([ z.lazy(() => DoctorPreferencesCreateWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUncheckedCreateWithoutDoctorInputSchema) ]),
  where: z.lazy(() => DoctorPreferencesWhereInputSchema).optional()
}).strict();

export const DoctorPreferencesUpdateToOneWithWhereWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesUpdateToOneWithWhereWithoutDoctorInput> = z.object({
  where: z.lazy(() => DoctorPreferencesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DoctorPreferencesUpdateWithoutDoctorInputSchema),z.lazy(() => DoctorPreferencesUncheckedUpdateWithoutDoctorInputSchema) ]),
}).strict();

export const DoctorPreferencesUpdateWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesUpdateWithoutDoctorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  SUNDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  MONDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  TUESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  WEDNESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  THURSDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  FRIDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  SATURDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorPreferencesUncheckedUpdateWithoutDoctorInputSchema: z.ZodType<Prisma.DoctorPreferencesUncheckedUpdateWithoutDoctorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  SUNDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  MONDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  TUESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  WEDNESDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  THURSDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  FRIDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  SATURDAY: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUpsertWithWhereUniqueWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutDoctorInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppointmentUpdateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutDoctorInputSchema) ]),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutDoctorInputSchema) ]),
}).strict();

export const AppointmentUpdateWithWhereUniqueWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutDoctorInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateWithoutDoctorInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutDoctorInputSchema) ]),
}).strict();

export const AppointmentUpdateManyWithWhereWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutDoctorInput> = z.object({
  where: z.lazy(() => AppointmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateManyMutationInputSchema),z.lazy(() => AppointmentUncheckedUpdateManyWithoutDoctorInputSchema) ]),
}).strict();

export const DoctorCreateWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorCreateWithoutPreferencesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  specialization: z.lazy(() => DoctorSpecializationSchema),
  appointmentPrice: z.number().int(),
  workingDays: z.union([ z.lazy(() => DoctorCreateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutDoctorInputSchema).optional()
}).strict();

export const DoctorUncheckedCreateWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorUncheckedCreateWithoutPreferencesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  specialization: z.lazy(() => DoctorSpecializationSchema),
  appointmentPrice: z.number().int(),
  workingDays: z.union([ z.lazy(() => DoctorCreateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutDoctorInputSchema).optional()
}).strict();

export const DoctorCreateOrConnectWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorCreateOrConnectWithoutPreferencesInput> = z.object({
  where: z.lazy(() => DoctorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DoctorCreateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutPreferencesInputSchema) ]),
}).strict();

export const DoctorUpsertWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorUpsertWithoutPreferencesInput> = z.object({
  update: z.union([ z.lazy(() => DoctorUpdateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedUpdateWithoutPreferencesInputSchema) ]),
  create: z.union([ z.lazy(() => DoctorCreateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutPreferencesInputSchema) ]),
  where: z.lazy(() => DoctorWhereInputSchema).optional()
}).strict();

export const DoctorUpdateToOneWithWhereWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorUpdateToOneWithWhereWithoutPreferencesInput> = z.object({
  where: z.lazy(() => DoctorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DoctorUpdateWithoutPreferencesInputSchema),z.lazy(() => DoctorUncheckedUpdateWithoutPreferencesInputSchema) ]),
}).strict();

export const DoctorUpdateWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorUpdateWithoutPreferencesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutDoctorNestedInputSchema).optional()
}).strict();

export const DoctorUncheckedUpdateWithoutPreferencesInputSchema: z.ZodType<Prisma.DoctorUncheckedUpdateWithoutPreferencesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutDoctorNestedInputSchema).optional()
}).strict();

export const WorkerTokenCreateWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenCreateWithoutWorkerInput> = z.object({
  id: z.string().cuid().optional(),
  refreshToken: z.string(),
  isValid: z.boolean().optional()
}).strict();

export const WorkerTokenUncheckedCreateWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenUncheckedCreateWithoutWorkerInput> = z.object({
  id: z.string().cuid().optional(),
  refreshToken: z.string(),
  isValid: z.boolean().optional()
}).strict();

export const WorkerTokenCreateOrConnectWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenCreateOrConnectWithoutWorkerInput> = z.object({
  where: z.lazy(() => WorkerTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkerTokenCreateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedCreateWithoutWorkerInputSchema) ]),
}).strict();

export const WorkerTokenUpsertWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenUpsertWithoutWorkerInput> = z.object({
  update: z.union([ z.lazy(() => WorkerTokenUpdateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedUpdateWithoutWorkerInputSchema) ]),
  create: z.union([ z.lazy(() => WorkerTokenCreateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedCreateWithoutWorkerInputSchema) ]),
  where: z.lazy(() => WorkerTokenWhereInputSchema).optional()
}).strict();

export const WorkerTokenUpdateToOneWithWhereWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenUpdateToOneWithWhereWithoutWorkerInput> = z.object({
  where: z.lazy(() => WorkerTokenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkerTokenUpdateWithoutWorkerInputSchema),z.lazy(() => WorkerTokenUncheckedUpdateWithoutWorkerInputSchema) ]),
}).strict();

export const WorkerTokenUpdateWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenUpdateWithoutWorkerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerTokenUncheckedUpdateWithoutWorkerInputSchema: z.ZodType<Prisma.WorkerTokenUncheckedUpdateWithoutWorkerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerCreateWithoutTokenInputSchema: z.ZodType<Prisma.WorkerCreateWithoutTokenInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema),
  verified: z.boolean().optional()
}).strict();

export const WorkerUncheckedCreateWithoutTokenInputSchema: z.ZodType<Prisma.WorkerUncheckedCreateWithoutTokenInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema),
  verified: z.boolean().optional()
}).strict();

export const WorkerCreateOrConnectWithoutTokenInputSchema: z.ZodType<Prisma.WorkerCreateOrConnectWithoutTokenInput> = z.object({
  where: z.lazy(() => WorkerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkerCreateWithoutTokenInputSchema),z.lazy(() => WorkerUncheckedCreateWithoutTokenInputSchema) ]),
}).strict();

export const WorkerUpsertWithoutTokenInputSchema: z.ZodType<Prisma.WorkerUpsertWithoutTokenInput> = z.object({
  update: z.union([ z.lazy(() => WorkerUpdateWithoutTokenInputSchema),z.lazy(() => WorkerUncheckedUpdateWithoutTokenInputSchema) ]),
  create: z.union([ z.lazy(() => WorkerCreateWithoutTokenInputSchema),z.lazy(() => WorkerUncheckedCreateWithoutTokenInputSchema) ]),
  where: z.lazy(() => WorkerWhereInputSchema).optional()
}).strict();

export const WorkerUpdateToOneWithWhereWithoutTokenInputSchema: z.ZodType<Prisma.WorkerUpdateToOneWithWhereWithoutTokenInput> = z.object({
  where: z.lazy(() => WorkerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkerUpdateWithoutTokenInputSchema),z.lazy(() => WorkerUncheckedUpdateWithoutTokenInputSchema) ]),
}).strict();

export const WorkerUpdateWithoutTokenInputSchema: z.ZodType<Prisma.WorkerUpdateWithoutTokenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerUncheckedUpdateWithoutTokenInputSchema: z.ZodType<Prisma.WorkerUncheckedUpdateWithoutTokenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateWithoutAppointmentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().optional().nullable(),
  gander: z.lazy(() => GanderSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PatientUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUncheckedCreateWithoutAppointmentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().optional().nullable(),
  gander: z.lazy(() => GanderSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PatientCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientCreateOrConnectWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => PatientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]),
}).strict();

export const DoctorCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorCreateWithoutAppointmentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  specialization: z.lazy(() => DoctorSpecializationSchema),
  appointmentPrice: z.number().int(),
  workingDays: z.union([ z.lazy(() => DoctorCreateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  preferences: z.lazy(() => DoctorPreferencesCreateNestedOneWithoutDoctorInputSchema)
}).strict();

export const DoctorUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorUncheckedCreateWithoutAppointmentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  specialization: z.lazy(() => DoctorSpecializationSchema),
  appointmentPrice: z.number().int(),
  workingDays: z.union([ z.lazy(() => DoctorCreateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  doctorPreferencesId: z.string()
}).strict();

export const DoctorCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorCreateOrConnectWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => DoctorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DoctorCreateWithoutAppointmentsInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutAppointmentsInputSchema) ]),
}).strict();

export const PatientUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpsertWithoutAppointmentsInput> = z.object({
  update: z.union([ z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema) ]),
  create: z.union([ z.lazy(() => PatientCreateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedCreateWithoutAppointmentsInputSchema) ]),
  where: z.lazy(() => PatientWhereInputSchema).optional()
}).strict();

export const PatientUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpdateToOneWithWhereWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => PatientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PatientUpdateWithoutAppointmentsInputSchema),z.lazy(() => PatientUncheckedUpdateWithoutAppointmentsInputSchema) ]),
}).strict();

export const PatientUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorUpsertWithoutAppointmentsInput> = z.object({
  update: z.union([ z.lazy(() => DoctorUpdateWithoutAppointmentsInputSchema),z.lazy(() => DoctorUncheckedUpdateWithoutAppointmentsInputSchema) ]),
  create: z.union([ z.lazy(() => DoctorCreateWithoutAppointmentsInputSchema),z.lazy(() => DoctorUncheckedCreateWithoutAppointmentsInputSchema) ]),
  where: z.lazy(() => DoctorWhereInputSchema).optional()
}).strict();

export const DoctorUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorUpdateToOneWithWhereWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => DoctorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DoctorUpdateWithoutAppointmentsInputSchema),z.lazy(() => DoctorUncheckedUpdateWithoutAppointmentsInputSchema) ]),
}).strict();

export const DoctorUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  preferences: z.lazy(() => DoctorPreferencesUpdateOneRequiredWithoutDoctorNestedInputSchema).optional()
}).strict();

export const DoctorUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.DoctorUncheckedUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  specialization: z.union([ z.lazy(() => DoctorSpecializationSchema),z.lazy(() => EnumDoctorSpecializationFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workingDays: z.union([ z.lazy(() => DoctorUpdateworkingDaysInputSchema),z.lazy(() => WeekdaySchema).array() ]).optional(),
  doctorPreferencesId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionMedicineCreateWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineCreateWithoutPrescriptionInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number().int(),
  quantity: z.number().int()
}).strict();

export const PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedCreateWithoutPrescriptionInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number().int(),
  quantity: z.number().int()
}).strict();

export const PrescriptionMedicineCreateOrConnectWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineCreateOrConnectWithoutPrescriptionInput> = z.object({
  where: z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema) ]),
}).strict();

export const PrescriptionMedicineCreateManyPrescriptionInputEnvelopeSchema: z.ZodType<Prisma.PrescriptionMedicineCreateManyPrescriptionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PrescriptionMedicineCreateManyPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineCreateManyPrescriptionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PrescriptionMedicineUpsertWithWhereUniqueWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUpsertWithWhereUniqueWithoutPrescriptionInput> = z.object({
  where: z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PrescriptionMedicineUpdateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedUpdateWithoutPrescriptionInputSchema) ]),
  create: z.union([ z.lazy(() => PrescriptionMedicineCreateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedCreateWithoutPrescriptionInputSchema) ]),
}).strict();

export const PrescriptionMedicineUpdateWithWhereUniqueWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateWithWhereUniqueWithoutPrescriptionInput> = z.object({
  where: z.lazy(() => PrescriptionMedicineWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PrescriptionMedicineUpdateWithoutPrescriptionInputSchema),z.lazy(() => PrescriptionMedicineUncheckedUpdateWithoutPrescriptionInputSchema) ]),
}).strict();

export const PrescriptionMedicineUpdateManyWithWhereWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateManyWithWhereWithoutPrescriptionInput> = z.object({
  where: z.lazy(() => PrescriptionMedicineScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PrescriptionMedicineUpdateManyMutationInputSchema),z.lazy(() => PrescriptionMedicineUncheckedUpdateManyWithoutPrescriptionInputSchema) ]),
}).strict();

export const PrescriptionMedicineScalarWhereInputSchema: z.ZodType<Prisma.PrescriptionMedicineScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PrescriptionMedicineScalarWhereInputSchema),z.lazy(() => PrescriptionMedicineScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PrescriptionMedicineScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PrescriptionMedicineScalarWhereInputSchema),z.lazy(() => PrescriptionMedicineScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  prescriptionId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PrescriptionCreateWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionCreateWithoutMedicinesInput> = z.object({
  medicineId: z.number().int(),
  patient: z.string(),
  doctor: z.string(),
  date: z.coerce.date().optional()
}).strict();

export const PrescriptionUncheckedCreateWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionUncheckedCreateWithoutMedicinesInput> = z.object({
  id: z.number().int().optional(),
  medicineId: z.number().int(),
  patient: z.string(),
  doctor: z.string(),
  date: z.coerce.date().optional()
}).strict();

export const PrescriptionCreateOrConnectWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionCreateOrConnectWithoutMedicinesInput> = z.object({
  where: z.lazy(() => PrescriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PrescriptionCreateWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUncheckedCreateWithoutMedicinesInputSchema) ]),
}).strict();

export const PrescriptionUpsertWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionUpsertWithoutMedicinesInput> = z.object({
  update: z.union([ z.lazy(() => PrescriptionUpdateWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUncheckedUpdateWithoutMedicinesInputSchema) ]),
  create: z.union([ z.lazy(() => PrescriptionCreateWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUncheckedCreateWithoutMedicinesInputSchema) ]),
  where: z.lazy(() => PrescriptionWhereInputSchema).optional()
}).strict();

export const PrescriptionUpdateToOneWithWhereWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionUpdateToOneWithWhereWithoutMedicinesInput> = z.object({
  where: z.lazy(() => PrescriptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PrescriptionUpdateWithoutMedicinesInputSchema),z.lazy(() => PrescriptionUncheckedUpdateWithoutMedicinesInputSchema) ]),
}).strict();

export const PrescriptionUpdateWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionUpdateWithoutMedicinesInput> = z.object({
  medicineId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  doctor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionUncheckedUpdateWithoutMedicinesInputSchema: z.ZodType<Prisma.PrescriptionUncheckedUpdateWithoutMedicinesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  medicineId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  doctor: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateManyPatientInputSchema: z.ZodType<Prisma.AppointmentCreateManyPatientInput> = z.object({
  id: z.number().int().optional(),
  day: z.lazy(() => WeekdaySchema),
  doctorId: z.string().optional().nullable()
}).strict();

export const AppointmentUpdateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutPatientInput> = z.object({
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  Doctor: z.lazy(() => DoctorUpdateOneWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  doctorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  doctorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppointmentCreateManyDoctorInputSchema: z.ZodType<Prisma.AppointmentCreateManyDoctorInput> = z.object({
  id: z.number().int().optional(),
  day: z.lazy(() => WeekdaySchema),
  patientId: z.string().optional().nullable()
}).strict();

export const AppointmentUpdateWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutDoctorInput> = z.object({
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  Patient: z.lazy(() => PatientUpdateOneWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutDoctorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutDoctorInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutDoctorInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.lazy(() => WeekdaySchema),z.lazy(() => EnumWeekdayFieldUpdateOperationsInputSchema) ]).optional(),
  patientId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PrescriptionMedicineCreateManyPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineCreateManyPrescriptionInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number().int(),
  quantity: z.number().int()
}).strict();

export const PrescriptionMedicineUpdateWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateWithoutPrescriptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionMedicineUncheckedUpdateWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedUpdateWithoutPrescriptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PrescriptionMedicineUncheckedUpdateManyWithoutPrescriptionInputSchema: z.ZodType<Prisma.PrescriptionMedicineUncheckedUpdateManyWithoutPrescriptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PatientFindFirstArgsSchema: z.ZodType<Prisma.PatientFindFirstArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientFindFirstOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindManyArgsSchema: z.ZodType<Prisma.PatientFindManyArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientAggregateArgsSchema: z.ZodType<Prisma.PatientAggregateArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientGroupByArgsSchema: z.ZodType<Prisma.PatientGroupByArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithAggregationInputSchema.array(),PatientOrderByWithAggregationInputSchema ]).optional(),
  by: PatientScalarFieldEnumSchema.array(),
  having: PatientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientFindUniqueArgsSchema: z.ZodType<Prisma.PatientFindUniqueArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientFindUniqueOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const DoctorFindFirstArgsSchema: z.ZodType<Prisma.DoctorFindFirstArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  where: DoctorWhereInputSchema.optional(),
  orderBy: z.union([ DoctorOrderByWithRelationInputSchema.array(),DoctorOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorScalarFieldEnumSchema,DoctorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DoctorFindFirstOrThrowArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  where: DoctorWhereInputSchema.optional(),
  orderBy: z.union([ DoctorOrderByWithRelationInputSchema.array(),DoctorOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorScalarFieldEnumSchema,DoctorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorFindManyArgsSchema: z.ZodType<Prisma.DoctorFindManyArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  where: DoctorWhereInputSchema.optional(),
  orderBy: z.union([ DoctorOrderByWithRelationInputSchema.array(),DoctorOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorScalarFieldEnumSchema,DoctorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorAggregateArgsSchema: z.ZodType<Prisma.DoctorAggregateArgs> = z.object({
  where: DoctorWhereInputSchema.optional(),
  orderBy: z.union([ DoctorOrderByWithRelationInputSchema.array(),DoctorOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DoctorGroupByArgsSchema: z.ZodType<Prisma.DoctorGroupByArgs> = z.object({
  where: DoctorWhereInputSchema.optional(),
  orderBy: z.union([ DoctorOrderByWithAggregationInputSchema.array(),DoctorOrderByWithAggregationInputSchema ]).optional(),
  by: DoctorScalarFieldEnumSchema.array(),
  having: DoctorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DoctorFindUniqueArgsSchema: z.ZodType<Prisma.DoctorFindUniqueArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  where: DoctorWhereUniqueInputSchema,
}).strict() ;

export const DoctorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DoctorFindUniqueOrThrowArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  where: DoctorWhereUniqueInputSchema,
}).strict() ;

export const DoctorPreferencesFindFirstArgsSchema: z.ZodType<Prisma.DoctorPreferencesFindFirstArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  where: DoctorPreferencesWhereInputSchema.optional(),
  orderBy: z.union([ DoctorPreferencesOrderByWithRelationInputSchema.array(),DoctorPreferencesOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorPreferencesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorPreferencesScalarFieldEnumSchema,DoctorPreferencesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorPreferencesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DoctorPreferencesFindFirstOrThrowArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  where: DoctorPreferencesWhereInputSchema.optional(),
  orderBy: z.union([ DoctorPreferencesOrderByWithRelationInputSchema.array(),DoctorPreferencesOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorPreferencesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorPreferencesScalarFieldEnumSchema,DoctorPreferencesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorPreferencesFindManyArgsSchema: z.ZodType<Prisma.DoctorPreferencesFindManyArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  where: DoctorPreferencesWhereInputSchema.optional(),
  orderBy: z.union([ DoctorPreferencesOrderByWithRelationInputSchema.array(),DoctorPreferencesOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorPreferencesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorPreferencesScalarFieldEnumSchema,DoctorPreferencesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorPreferencesAggregateArgsSchema: z.ZodType<Prisma.DoctorPreferencesAggregateArgs> = z.object({
  where: DoctorPreferencesWhereInputSchema.optional(),
  orderBy: z.union([ DoctorPreferencesOrderByWithRelationInputSchema.array(),DoctorPreferencesOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorPreferencesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DoctorPreferencesGroupByArgsSchema: z.ZodType<Prisma.DoctorPreferencesGroupByArgs> = z.object({
  where: DoctorPreferencesWhereInputSchema.optional(),
  orderBy: z.union([ DoctorPreferencesOrderByWithAggregationInputSchema.array(),DoctorPreferencesOrderByWithAggregationInputSchema ]).optional(),
  by: DoctorPreferencesScalarFieldEnumSchema.array(),
  having: DoctorPreferencesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DoctorPreferencesFindUniqueArgsSchema: z.ZodType<Prisma.DoctorPreferencesFindUniqueArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  where: DoctorPreferencesWhereUniqueInputSchema,
}).strict() ;

export const DoctorPreferencesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DoctorPreferencesFindUniqueOrThrowArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  where: DoctorPreferencesWhereUniqueInputSchema,
}).strict() ;

export const WorkerFindFirstArgsSchema: z.ZodType<Prisma.WorkerFindFirstArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  where: WorkerWhereInputSchema.optional(),
  orderBy: z.union([ WorkerOrderByWithRelationInputSchema.array(),WorkerOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerScalarFieldEnumSchema,WorkerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkerFindFirstOrThrowArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  where: WorkerWhereInputSchema.optional(),
  orderBy: z.union([ WorkerOrderByWithRelationInputSchema.array(),WorkerOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerScalarFieldEnumSchema,WorkerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerFindManyArgsSchema: z.ZodType<Prisma.WorkerFindManyArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  where: WorkerWhereInputSchema.optional(),
  orderBy: z.union([ WorkerOrderByWithRelationInputSchema.array(),WorkerOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerScalarFieldEnumSchema,WorkerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerAggregateArgsSchema: z.ZodType<Prisma.WorkerAggregateArgs> = z.object({
  where: WorkerWhereInputSchema.optional(),
  orderBy: z.union([ WorkerOrderByWithRelationInputSchema.array(),WorkerOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkerGroupByArgsSchema: z.ZodType<Prisma.WorkerGroupByArgs> = z.object({
  where: WorkerWhereInputSchema.optional(),
  orderBy: z.union([ WorkerOrderByWithAggregationInputSchema.array(),WorkerOrderByWithAggregationInputSchema ]).optional(),
  by: WorkerScalarFieldEnumSchema.array(),
  having: WorkerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkerFindUniqueArgsSchema: z.ZodType<Prisma.WorkerFindUniqueArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  where: WorkerWhereUniqueInputSchema,
}).strict() ;

export const WorkerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkerFindUniqueOrThrowArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  where: WorkerWhereUniqueInputSchema,
}).strict() ;

export const WorkerTokenFindFirstArgsSchema: z.ZodType<Prisma.WorkerTokenFindFirstArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  where: WorkerTokenWhereInputSchema.optional(),
  orderBy: z.union([ WorkerTokenOrderByWithRelationInputSchema.array(),WorkerTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerTokenScalarFieldEnumSchema,WorkerTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkerTokenFindFirstOrThrowArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  where: WorkerTokenWhereInputSchema.optional(),
  orderBy: z.union([ WorkerTokenOrderByWithRelationInputSchema.array(),WorkerTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerTokenScalarFieldEnumSchema,WorkerTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerTokenFindManyArgsSchema: z.ZodType<Prisma.WorkerTokenFindManyArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  where: WorkerTokenWhereInputSchema.optional(),
  orderBy: z.union([ WorkerTokenOrderByWithRelationInputSchema.array(),WorkerTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerTokenScalarFieldEnumSchema,WorkerTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerTokenAggregateArgsSchema: z.ZodType<Prisma.WorkerTokenAggregateArgs> = z.object({
  where: WorkerTokenWhereInputSchema.optional(),
  orderBy: z.union([ WorkerTokenOrderByWithRelationInputSchema.array(),WorkerTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkerTokenGroupByArgsSchema: z.ZodType<Prisma.WorkerTokenGroupByArgs> = z.object({
  where: WorkerTokenWhereInputSchema.optional(),
  orderBy: z.union([ WorkerTokenOrderByWithAggregationInputSchema.array(),WorkerTokenOrderByWithAggregationInputSchema ]).optional(),
  by: WorkerTokenScalarFieldEnumSchema.array(),
  having: WorkerTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkerTokenFindUniqueArgsSchema: z.ZodType<Prisma.WorkerTokenFindUniqueArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  where: WorkerTokenWhereUniqueInputSchema,
}).strict() ;

export const WorkerTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkerTokenFindUniqueOrThrowArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  where: WorkerTokenWhereUniqueInputSchema,
}).strict() ;

export const AppointmentFindFirstArgsSchema: z.ZodType<Prisma.AppointmentFindFirstArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindFirstOrThrowArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentFindManyArgsSchema: z.ZodType<Prisma.AppointmentFindManyArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentAggregateArgsSchema: z.ZodType<Prisma.AppointmentAggregateArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AppointmentGroupByArgsSchema: z.ZodType<Prisma.AppointmentGroupByArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithAggregationInputSchema.array(),AppointmentOrderByWithAggregationInputSchema ]).optional(),
  by: AppointmentScalarFieldEnumSchema.array(),
  having: AppointmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AppointmentFindUniqueArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueOrThrowArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const MedicineFindFirstArgsSchema: z.ZodType<Prisma.MedicineFindFirstArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  where: MedicineWhereInputSchema.optional(),
  orderBy: z.union([ MedicineOrderByWithRelationInputSchema.array(),MedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MedicineScalarFieldEnumSchema,MedicineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MedicineFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MedicineFindFirstOrThrowArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  where: MedicineWhereInputSchema.optional(),
  orderBy: z.union([ MedicineOrderByWithRelationInputSchema.array(),MedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MedicineScalarFieldEnumSchema,MedicineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MedicineFindManyArgsSchema: z.ZodType<Prisma.MedicineFindManyArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  where: MedicineWhereInputSchema.optional(),
  orderBy: z.union([ MedicineOrderByWithRelationInputSchema.array(),MedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MedicineScalarFieldEnumSchema,MedicineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MedicineAggregateArgsSchema: z.ZodType<Prisma.MedicineAggregateArgs> = z.object({
  where: MedicineWhereInputSchema.optional(),
  orderBy: z.union([ MedicineOrderByWithRelationInputSchema.array(),MedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: MedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MedicineGroupByArgsSchema: z.ZodType<Prisma.MedicineGroupByArgs> = z.object({
  where: MedicineWhereInputSchema.optional(),
  orderBy: z.union([ MedicineOrderByWithAggregationInputSchema.array(),MedicineOrderByWithAggregationInputSchema ]).optional(),
  by: MedicineScalarFieldEnumSchema.array(),
  having: MedicineScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MedicineFindUniqueArgsSchema: z.ZodType<Prisma.MedicineFindUniqueArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  where: MedicineWhereUniqueInputSchema,
}).strict() ;

export const MedicineFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MedicineFindUniqueOrThrowArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  where: MedicineWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionFindFirstArgsSchema: z.ZodType<Prisma.PrescriptionFindFirstArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  where: PrescriptionWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionOrderByWithRelationInputSchema.array(),PrescriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrescriptionScalarFieldEnumSchema,PrescriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrescriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PrescriptionFindFirstOrThrowArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  where: PrescriptionWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionOrderByWithRelationInputSchema.array(),PrescriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrescriptionScalarFieldEnumSchema,PrescriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrescriptionFindManyArgsSchema: z.ZodType<Prisma.PrescriptionFindManyArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  where: PrescriptionWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionOrderByWithRelationInputSchema.array(),PrescriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrescriptionScalarFieldEnumSchema,PrescriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrescriptionAggregateArgsSchema: z.ZodType<Prisma.PrescriptionAggregateArgs> = z.object({
  where: PrescriptionWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionOrderByWithRelationInputSchema.array(),PrescriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PrescriptionGroupByArgsSchema: z.ZodType<Prisma.PrescriptionGroupByArgs> = z.object({
  where: PrescriptionWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionOrderByWithAggregationInputSchema.array(),PrescriptionOrderByWithAggregationInputSchema ]).optional(),
  by: PrescriptionScalarFieldEnumSchema.array(),
  having: PrescriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PrescriptionFindUniqueArgsSchema: z.ZodType<Prisma.PrescriptionFindUniqueArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  where: PrescriptionWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PrescriptionFindUniqueOrThrowArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  where: PrescriptionWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionMedicineFindFirstArgsSchema: z.ZodType<Prisma.PrescriptionMedicineFindFirstArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  where: PrescriptionMedicineWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionMedicineOrderByWithRelationInputSchema.array(),PrescriptionMedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionMedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrescriptionMedicineScalarFieldEnumSchema,PrescriptionMedicineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrescriptionMedicineFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PrescriptionMedicineFindFirstOrThrowArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  where: PrescriptionMedicineWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionMedicineOrderByWithRelationInputSchema.array(),PrescriptionMedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionMedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrescriptionMedicineScalarFieldEnumSchema,PrescriptionMedicineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrescriptionMedicineFindManyArgsSchema: z.ZodType<Prisma.PrescriptionMedicineFindManyArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  where: PrescriptionMedicineWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionMedicineOrderByWithRelationInputSchema.array(),PrescriptionMedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionMedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PrescriptionMedicineScalarFieldEnumSchema,PrescriptionMedicineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PrescriptionMedicineAggregateArgsSchema: z.ZodType<Prisma.PrescriptionMedicineAggregateArgs> = z.object({
  where: PrescriptionMedicineWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionMedicineOrderByWithRelationInputSchema.array(),PrescriptionMedicineOrderByWithRelationInputSchema ]).optional(),
  cursor: PrescriptionMedicineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PrescriptionMedicineGroupByArgsSchema: z.ZodType<Prisma.PrescriptionMedicineGroupByArgs> = z.object({
  where: PrescriptionMedicineWhereInputSchema.optional(),
  orderBy: z.union([ PrescriptionMedicineOrderByWithAggregationInputSchema.array(),PrescriptionMedicineOrderByWithAggregationInputSchema ]).optional(),
  by: PrescriptionMedicineScalarFieldEnumSchema.array(),
  having: PrescriptionMedicineScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PrescriptionMedicineFindUniqueArgsSchema: z.ZodType<Prisma.PrescriptionMedicineFindUniqueArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  where: PrescriptionMedicineWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionMedicineFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PrescriptionMedicineFindUniqueOrThrowArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  where: PrescriptionMedicineWhereUniqueInputSchema,
}).strict() ;

export const PatientCounterFindFirstArgsSchema: z.ZodType<Prisma.PatientCounterFindFirstArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  where: PatientCounterWhereInputSchema.optional(),
  orderBy: z.union([ PatientCounterOrderByWithRelationInputSchema.array(),PatientCounterOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientCounterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientCounterScalarFieldEnumSchema,PatientCounterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientCounterFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientCounterFindFirstOrThrowArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  where: PatientCounterWhereInputSchema.optional(),
  orderBy: z.union([ PatientCounterOrderByWithRelationInputSchema.array(),PatientCounterOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientCounterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientCounterScalarFieldEnumSchema,PatientCounterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientCounterFindManyArgsSchema: z.ZodType<Prisma.PatientCounterFindManyArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  where: PatientCounterWhereInputSchema.optional(),
  orderBy: z.union([ PatientCounterOrderByWithRelationInputSchema.array(),PatientCounterOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientCounterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientCounterScalarFieldEnumSchema,PatientCounterScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientCounterAggregateArgsSchema: z.ZodType<Prisma.PatientCounterAggregateArgs> = z.object({
  where: PatientCounterWhereInputSchema.optional(),
  orderBy: z.union([ PatientCounterOrderByWithRelationInputSchema.array(),PatientCounterOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientCounterWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientCounterGroupByArgsSchema: z.ZodType<Prisma.PatientCounterGroupByArgs> = z.object({
  where: PatientCounterWhereInputSchema.optional(),
  orderBy: z.union([ PatientCounterOrderByWithAggregationInputSchema.array(),PatientCounterOrderByWithAggregationInputSchema ]).optional(),
  by: PatientCounterScalarFieldEnumSchema.array(),
  having: PatientCounterScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PatientCounterFindUniqueArgsSchema: z.ZodType<Prisma.PatientCounterFindUniqueArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  where: PatientCounterWhereUniqueInputSchema,
}).strict() ;

export const PatientCounterFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientCounterFindUniqueOrThrowArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  where: PatientCounterWhereUniqueInputSchema,
}).strict() ;

export const PatientCreateArgsSchema: z.ZodType<Prisma.PatientCreateArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  data: z.union([ PatientCreateInputSchema,PatientUncheckedCreateInputSchema ]),
}).strict() ;

export const PatientUpsertArgsSchema: z.ZodType<Prisma.PatientUpsertArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
  create: z.union([ PatientCreateInputSchema,PatientUncheckedCreateInputSchema ]),
  update: z.union([ PatientUpdateInputSchema,PatientUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatientCreateManyArgsSchema: z.ZodType<Prisma.PatientCreateManyArgs> = z.object({
  data: z.union([ PatientCreateManyInputSchema,PatientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientDeleteArgsSchema: z.ZodType<Prisma.PatientDeleteArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientUpdateArgsSchema: z.ZodType<Prisma.PatientUpdateArgs> = z.object({
  select: PatientSelectSchema.optional(),
  include: PatientIncludeSchema.optional(),
  data: z.union([ PatientUpdateInputSchema,PatientUncheckedUpdateInputSchema ]),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientUpdateManyArgsSchema: z.ZodType<Prisma.PatientUpdateManyArgs> = z.object({
  data: z.union([ PatientUpdateManyMutationInputSchema,PatientUncheckedUpdateManyInputSchema ]),
  where: PatientWhereInputSchema.optional(),
}).strict() ;

export const PatientDeleteManyArgsSchema: z.ZodType<Prisma.PatientDeleteManyArgs> = z.object({
  where: PatientWhereInputSchema.optional(),
}).strict() ;

export const DoctorCreateArgsSchema: z.ZodType<Prisma.DoctorCreateArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  data: z.union([ DoctorCreateInputSchema,DoctorUncheckedCreateInputSchema ]),
}).strict() ;

export const DoctorUpsertArgsSchema: z.ZodType<Prisma.DoctorUpsertArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  where: DoctorWhereUniqueInputSchema,
  create: z.union([ DoctorCreateInputSchema,DoctorUncheckedCreateInputSchema ]),
  update: z.union([ DoctorUpdateInputSchema,DoctorUncheckedUpdateInputSchema ]),
}).strict() ;

export const DoctorCreateManyArgsSchema: z.ZodType<Prisma.DoctorCreateManyArgs> = z.object({
  data: z.union([ DoctorCreateManyInputSchema,DoctorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DoctorDeleteArgsSchema: z.ZodType<Prisma.DoctorDeleteArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  where: DoctorWhereUniqueInputSchema,
}).strict() ;

export const DoctorUpdateArgsSchema: z.ZodType<Prisma.DoctorUpdateArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  include: DoctorIncludeSchema.optional(),
  data: z.union([ DoctorUpdateInputSchema,DoctorUncheckedUpdateInputSchema ]),
  where: DoctorWhereUniqueInputSchema,
}).strict() ;

export const DoctorUpdateManyArgsSchema: z.ZodType<Prisma.DoctorUpdateManyArgs> = z.object({
  data: z.union([ DoctorUpdateManyMutationInputSchema,DoctorUncheckedUpdateManyInputSchema ]),
  where: DoctorWhereInputSchema.optional(),
}).strict() ;

export const DoctorDeleteManyArgsSchema: z.ZodType<Prisma.DoctorDeleteManyArgs> = z.object({
  where: DoctorWhereInputSchema.optional(),
}).strict() ;

export const DoctorPreferencesCreateArgsSchema: z.ZodType<Prisma.DoctorPreferencesCreateArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  data: z.union([ DoctorPreferencesCreateInputSchema,DoctorPreferencesUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const DoctorPreferencesUpsertArgsSchema: z.ZodType<Prisma.DoctorPreferencesUpsertArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  where: DoctorPreferencesWhereUniqueInputSchema,
  create: z.union([ DoctorPreferencesCreateInputSchema,DoctorPreferencesUncheckedCreateInputSchema ]),
  update: z.union([ DoctorPreferencesUpdateInputSchema,DoctorPreferencesUncheckedUpdateInputSchema ]),
}).strict() ;

export const DoctorPreferencesCreateManyArgsSchema: z.ZodType<Prisma.DoctorPreferencesCreateManyArgs> = z.object({
  data: z.union([ DoctorPreferencesCreateManyInputSchema,DoctorPreferencesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DoctorPreferencesDeleteArgsSchema: z.ZodType<Prisma.DoctorPreferencesDeleteArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  where: DoctorPreferencesWhereUniqueInputSchema,
}).strict() ;

export const DoctorPreferencesUpdateArgsSchema: z.ZodType<Prisma.DoctorPreferencesUpdateArgs> = z.object({
  select: DoctorPreferencesSelectSchema.optional(),
  include: DoctorPreferencesIncludeSchema.optional(),
  data: z.union([ DoctorPreferencesUpdateInputSchema,DoctorPreferencesUncheckedUpdateInputSchema ]),
  where: DoctorPreferencesWhereUniqueInputSchema,
}).strict() ;

export const DoctorPreferencesUpdateManyArgsSchema: z.ZodType<Prisma.DoctorPreferencesUpdateManyArgs> = z.object({
  data: z.union([ DoctorPreferencesUpdateManyMutationInputSchema,DoctorPreferencesUncheckedUpdateManyInputSchema ]),
  where: DoctorPreferencesWhereInputSchema.optional(),
}).strict() ;

export const DoctorPreferencesDeleteManyArgsSchema: z.ZodType<Prisma.DoctorPreferencesDeleteManyArgs> = z.object({
  where: DoctorPreferencesWhereInputSchema.optional(),
}).strict() ;

export const WorkerCreateArgsSchema: z.ZodType<Prisma.WorkerCreateArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  data: z.union([ WorkerCreateInputSchema,WorkerUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkerUpsertArgsSchema: z.ZodType<Prisma.WorkerUpsertArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  where: WorkerWhereUniqueInputSchema,
  create: z.union([ WorkerCreateInputSchema,WorkerUncheckedCreateInputSchema ]),
  update: z.union([ WorkerUpdateInputSchema,WorkerUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkerCreateManyArgsSchema: z.ZodType<Prisma.WorkerCreateManyArgs> = z.object({
  data: z.union([ WorkerCreateManyInputSchema,WorkerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkerDeleteArgsSchema: z.ZodType<Prisma.WorkerDeleteArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  where: WorkerWhereUniqueInputSchema,
}).strict() ;

export const WorkerUpdateArgsSchema: z.ZodType<Prisma.WorkerUpdateArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  include: WorkerIncludeSchema.optional(),
  data: z.union([ WorkerUpdateInputSchema,WorkerUncheckedUpdateInputSchema ]),
  where: WorkerWhereUniqueInputSchema,
}).strict() ;

export const WorkerUpdateManyArgsSchema: z.ZodType<Prisma.WorkerUpdateManyArgs> = z.object({
  data: z.union([ WorkerUpdateManyMutationInputSchema,WorkerUncheckedUpdateManyInputSchema ]),
  where: WorkerWhereInputSchema.optional(),
}).strict() ;

export const WorkerDeleteManyArgsSchema: z.ZodType<Prisma.WorkerDeleteManyArgs> = z.object({
  where: WorkerWhereInputSchema.optional(),
}).strict() ;

export const WorkerTokenCreateArgsSchema: z.ZodType<Prisma.WorkerTokenCreateArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  data: z.union([ WorkerTokenCreateInputSchema,WorkerTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkerTokenUpsertArgsSchema: z.ZodType<Prisma.WorkerTokenUpsertArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  where: WorkerTokenWhereUniqueInputSchema,
  create: z.union([ WorkerTokenCreateInputSchema,WorkerTokenUncheckedCreateInputSchema ]),
  update: z.union([ WorkerTokenUpdateInputSchema,WorkerTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkerTokenCreateManyArgsSchema: z.ZodType<Prisma.WorkerTokenCreateManyArgs> = z.object({
  data: z.union([ WorkerTokenCreateManyInputSchema,WorkerTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkerTokenDeleteArgsSchema: z.ZodType<Prisma.WorkerTokenDeleteArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  where: WorkerTokenWhereUniqueInputSchema,
}).strict() ;

export const WorkerTokenUpdateArgsSchema: z.ZodType<Prisma.WorkerTokenUpdateArgs> = z.object({
  select: WorkerTokenSelectSchema.optional(),
  include: WorkerTokenIncludeSchema.optional(),
  data: z.union([ WorkerTokenUpdateInputSchema,WorkerTokenUncheckedUpdateInputSchema ]),
  where: WorkerTokenWhereUniqueInputSchema,
}).strict() ;

export const WorkerTokenUpdateManyArgsSchema: z.ZodType<Prisma.WorkerTokenUpdateManyArgs> = z.object({
  data: z.union([ WorkerTokenUpdateManyMutationInputSchema,WorkerTokenUncheckedUpdateManyInputSchema ]),
  where: WorkerTokenWhereInputSchema.optional(),
}).strict() ;

export const WorkerTokenDeleteManyArgsSchema: z.ZodType<Prisma.WorkerTokenDeleteManyArgs> = z.object({
  where: WorkerTokenWhereInputSchema.optional(),
}).strict() ;

export const AppointmentCreateArgsSchema: z.ZodType<Prisma.AppointmentCreateArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  data: z.union([ AppointmentCreateInputSchema,AppointmentUncheckedCreateInputSchema ]),
}).strict() ;

export const AppointmentUpsertArgsSchema: z.ZodType<Prisma.AppointmentUpsertArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
  create: z.union([ AppointmentCreateInputSchema,AppointmentUncheckedCreateInputSchema ]),
  update: z.union([ AppointmentUpdateInputSchema,AppointmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const AppointmentCreateManyArgsSchema: z.ZodType<Prisma.AppointmentCreateManyArgs> = z.object({
  data: z.union([ AppointmentCreateManyInputSchema,AppointmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AppointmentDeleteArgsSchema: z.ZodType<Prisma.AppointmentDeleteArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentUpdateArgsSchema: z.ZodType<Prisma.AppointmentUpdateArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  data: z.union([ AppointmentUpdateInputSchema,AppointmentUncheckedUpdateInputSchema ]),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentUpdateManyArgsSchema: z.ZodType<Prisma.AppointmentUpdateManyArgs> = z.object({
  data: z.union([ AppointmentUpdateManyMutationInputSchema,AppointmentUncheckedUpdateManyInputSchema ]),
  where: AppointmentWhereInputSchema.optional(),
}).strict() ;

export const AppointmentDeleteManyArgsSchema: z.ZodType<Prisma.AppointmentDeleteManyArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
}).strict() ;

export const MedicineCreateArgsSchema: z.ZodType<Prisma.MedicineCreateArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  data: z.union([ MedicineCreateInputSchema,MedicineUncheckedCreateInputSchema ]),
}).strict() ;

export const MedicineUpsertArgsSchema: z.ZodType<Prisma.MedicineUpsertArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  where: MedicineWhereUniqueInputSchema,
  create: z.union([ MedicineCreateInputSchema,MedicineUncheckedCreateInputSchema ]),
  update: z.union([ MedicineUpdateInputSchema,MedicineUncheckedUpdateInputSchema ]),
}).strict() ;

export const MedicineCreateManyArgsSchema: z.ZodType<Prisma.MedicineCreateManyArgs> = z.object({
  data: z.union([ MedicineCreateManyInputSchema,MedicineCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MedicineDeleteArgsSchema: z.ZodType<Prisma.MedicineDeleteArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  where: MedicineWhereUniqueInputSchema,
}).strict() ;

export const MedicineUpdateArgsSchema: z.ZodType<Prisma.MedicineUpdateArgs> = z.object({
  select: MedicineSelectSchema.optional(),
  data: z.union([ MedicineUpdateInputSchema,MedicineUncheckedUpdateInputSchema ]),
  where: MedicineWhereUniqueInputSchema,
}).strict() ;

export const MedicineUpdateManyArgsSchema: z.ZodType<Prisma.MedicineUpdateManyArgs> = z.object({
  data: z.union([ MedicineUpdateManyMutationInputSchema,MedicineUncheckedUpdateManyInputSchema ]),
  where: MedicineWhereInputSchema.optional(),
}).strict() ;

export const MedicineDeleteManyArgsSchema: z.ZodType<Prisma.MedicineDeleteManyArgs> = z.object({
  where: MedicineWhereInputSchema.optional(),
}).strict() ;

export const PrescriptionCreateArgsSchema: z.ZodType<Prisma.PrescriptionCreateArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  data: z.union([ PrescriptionCreateInputSchema,PrescriptionUncheckedCreateInputSchema ]),
}).strict() ;

export const PrescriptionUpsertArgsSchema: z.ZodType<Prisma.PrescriptionUpsertArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  where: PrescriptionWhereUniqueInputSchema,
  create: z.union([ PrescriptionCreateInputSchema,PrescriptionUncheckedCreateInputSchema ]),
  update: z.union([ PrescriptionUpdateInputSchema,PrescriptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PrescriptionCreateManyArgsSchema: z.ZodType<Prisma.PrescriptionCreateManyArgs> = z.object({
  data: z.union([ PrescriptionCreateManyInputSchema,PrescriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PrescriptionDeleteArgsSchema: z.ZodType<Prisma.PrescriptionDeleteArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  where: PrescriptionWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionUpdateArgsSchema: z.ZodType<Prisma.PrescriptionUpdateArgs> = z.object({
  select: PrescriptionSelectSchema.optional(),
  include: PrescriptionIncludeSchema.optional(),
  data: z.union([ PrescriptionUpdateInputSchema,PrescriptionUncheckedUpdateInputSchema ]),
  where: PrescriptionWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionUpdateManyArgsSchema: z.ZodType<Prisma.PrescriptionUpdateManyArgs> = z.object({
  data: z.union([ PrescriptionUpdateManyMutationInputSchema,PrescriptionUncheckedUpdateManyInputSchema ]),
  where: PrescriptionWhereInputSchema.optional(),
}).strict() ;

export const PrescriptionDeleteManyArgsSchema: z.ZodType<Prisma.PrescriptionDeleteManyArgs> = z.object({
  where: PrescriptionWhereInputSchema.optional(),
}).strict() ;

export const PrescriptionMedicineCreateArgsSchema: z.ZodType<Prisma.PrescriptionMedicineCreateArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  data: z.union([ PrescriptionMedicineCreateInputSchema,PrescriptionMedicineUncheckedCreateInputSchema ]),
}).strict() ;

export const PrescriptionMedicineUpsertArgsSchema: z.ZodType<Prisma.PrescriptionMedicineUpsertArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  where: PrescriptionMedicineWhereUniqueInputSchema,
  create: z.union([ PrescriptionMedicineCreateInputSchema,PrescriptionMedicineUncheckedCreateInputSchema ]),
  update: z.union([ PrescriptionMedicineUpdateInputSchema,PrescriptionMedicineUncheckedUpdateInputSchema ]),
}).strict() ;

export const PrescriptionMedicineCreateManyArgsSchema: z.ZodType<Prisma.PrescriptionMedicineCreateManyArgs> = z.object({
  data: z.union([ PrescriptionMedicineCreateManyInputSchema,PrescriptionMedicineCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PrescriptionMedicineDeleteArgsSchema: z.ZodType<Prisma.PrescriptionMedicineDeleteArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  where: PrescriptionMedicineWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionMedicineUpdateArgsSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateArgs> = z.object({
  select: PrescriptionMedicineSelectSchema.optional(),
  include: PrescriptionMedicineIncludeSchema.optional(),
  data: z.union([ PrescriptionMedicineUpdateInputSchema,PrescriptionMedicineUncheckedUpdateInputSchema ]),
  where: PrescriptionMedicineWhereUniqueInputSchema,
}).strict() ;

export const PrescriptionMedicineUpdateManyArgsSchema: z.ZodType<Prisma.PrescriptionMedicineUpdateManyArgs> = z.object({
  data: z.union([ PrescriptionMedicineUpdateManyMutationInputSchema,PrescriptionMedicineUncheckedUpdateManyInputSchema ]),
  where: PrescriptionMedicineWhereInputSchema.optional(),
}).strict() ;

export const PrescriptionMedicineDeleteManyArgsSchema: z.ZodType<Prisma.PrescriptionMedicineDeleteManyArgs> = z.object({
  where: PrescriptionMedicineWhereInputSchema.optional(),
}).strict() ;

export const PatientCounterCreateArgsSchema: z.ZodType<Prisma.PatientCounterCreateArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  data: z.union([ PatientCounterCreateInputSchema,PatientCounterUncheckedCreateInputSchema ]),
}).strict() ;

export const PatientCounterUpsertArgsSchema: z.ZodType<Prisma.PatientCounterUpsertArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  where: PatientCounterWhereUniqueInputSchema,
  create: z.union([ PatientCounterCreateInputSchema,PatientCounterUncheckedCreateInputSchema ]),
  update: z.union([ PatientCounterUpdateInputSchema,PatientCounterUncheckedUpdateInputSchema ]),
}).strict() ;

export const PatientCounterCreateManyArgsSchema: z.ZodType<Prisma.PatientCounterCreateManyArgs> = z.object({
  data: z.union([ PatientCounterCreateManyInputSchema,PatientCounterCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PatientCounterDeleteArgsSchema: z.ZodType<Prisma.PatientCounterDeleteArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  where: PatientCounterWhereUniqueInputSchema,
}).strict() ;

export const PatientCounterUpdateArgsSchema: z.ZodType<Prisma.PatientCounterUpdateArgs> = z.object({
  select: PatientCounterSelectSchema.optional(),
  data: z.union([ PatientCounterUpdateInputSchema,PatientCounterUncheckedUpdateInputSchema ]),
  where: PatientCounterWhereUniqueInputSchema,
}).strict() ;

export const PatientCounterUpdateManyArgsSchema: z.ZodType<Prisma.PatientCounterUpdateManyArgs> = z.object({
  data: z.union([ PatientCounterUpdateManyMutationInputSchema,PatientCounterUncheckedUpdateManyInputSchema ]),
  where: PatientCounterWhereInputSchema.optional(),
}).strict() ;

export const PatientCounterDeleteManyArgsSchema: z.ZodType<Prisma.PatientCounterDeleteManyArgs> = z.object({
  where: PatientCounterWhereInputSchema.optional(),
}).strict() ;