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

export const DoctorScalarFieldEnumSchema = z.enum(['id','name','phoneNumber','password','appointmentPrice']);

export const WorkerScalarFieldEnumSchema = z.enum(['id','name','password','role']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const GanderSchema = z.enum(['MALE','FEMALE']);

export type GanderType = `${z.infer<typeof GanderSchema>}`

export const WorkerRoleSchema = z.enum(['REG','LAB','ADMIN']);

export type WorkerRoleType = `${z.infer<typeof WorkerRoleSchema>}`

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
  id: z.string().cuid(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  appointmentPrice: z.number().int(),
})

export type Doctor = z.infer<typeof DoctorSchema>

/////////////////////////////////////////
// WORKER SCHEMA
/////////////////////////////////////////

export const WorkerSchema = z.object({
  role: WorkerRoleSchema,
  id: z.string().cuid(),
  name: z.string(),
  password: z.string(),
})

export type Worker = z.infer<typeof WorkerSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PATIENT
//------------------------------------------------------

export const PatientSelectSchema: z.ZodType<Prisma.PatientSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  age: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  gander: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// DOCTOR
//------------------------------------------------------

export const DoctorSelectSchema: z.ZodType<Prisma.DoctorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  password: z.boolean().optional(),
  appointmentPrice: z.boolean().optional(),
}).strict()

// WORKER
//------------------------------------------------------

export const WorkerSelectSchema: z.ZodType<Prisma.WorkerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
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
}).strict();

export const PatientOrderByWithRelationInputSchema: z.ZodType<Prisma.PatientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gander: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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
  appointmentPrice: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const DoctorOrderByWithRelationInputSchema: z.ZodType<Prisma.DoctorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorWhereUniqueInputSchema: z.ZodType<Prisma.DoctorWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DoctorWhereInputSchema),z.lazy(() => DoctorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DoctorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DoctorWhereInputSchema),z.lazy(() => DoctorWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appointmentPrice: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
}).strict());

export const DoctorOrderByWithAggregationInputSchema: z.ZodType<Prisma.DoctorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional(),
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
  appointmentPrice: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const WorkerWhereInputSchema: z.ZodType<Prisma.WorkerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkerWhereInputSchema),z.lazy(() => WorkerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkerWhereInputSchema),z.lazy(() => WorkerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumWorkerRoleFilterSchema),z.lazy(() => WorkerRoleSchema) ]).optional(),
}).strict();

export const WorkerOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
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
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumWorkerRoleFilterSchema),z.lazy(() => WorkerRoleSchema) ]).optional(),
}).strict());

export const WorkerOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
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
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumWorkerRoleWithAggregatesFilterSchema),z.lazy(() => WorkerRoleSchema) ]).optional(),
}).strict();

export const PatientCreateInputSchema: z.ZodType<Prisma.PatientCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().optional().nullable(),
  gander: z.lazy(() => GanderSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PatientUncheckedCreateInputSchema: z.ZodType<Prisma.PatientUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  age: z.number().int(),
  phoneNumber: z.string().optional().nullable(),
  gander: z.lazy(() => GanderSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PatientUpdateInputSchema: z.ZodType<Prisma.PatientUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PatientUncheckedUpdateInputSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gander: z.union([ z.lazy(() => GanderSchema),z.lazy(() => EnumGanderFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  appointmentPrice: z.number().int()
}).strict();

export const DoctorUncheckedCreateInputSchema: z.ZodType<Prisma.DoctorUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  appointmentPrice: z.number().int()
}).strict();

export const DoctorUpdateInputSchema: z.ZodType<Prisma.DoctorUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorUncheckedUpdateInputSchema: z.ZodType<Prisma.DoctorUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorCreateManyInputSchema: z.ZodType<Prisma.DoctorCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  appointmentPrice: z.number().int()
}).strict();

export const DoctorUpdateManyMutationInputSchema: z.ZodType<Prisma.DoctorUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DoctorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DoctorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appointmentPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerCreateInputSchema: z.ZodType<Prisma.WorkerCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema)
}).strict();

export const WorkerUncheckedCreateInputSchema: z.ZodType<Prisma.WorkerUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema)
}).strict();

export const WorkerUpdateInputSchema: z.ZodType<Prisma.WorkerUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerCreateManyInputSchema: z.ZodType<Prisma.WorkerCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  password: z.string(),
  role: z.lazy(() => WorkerRoleSchema)
}).strict();

export const WorkerUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => EnumWorkerRoleFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
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

export const DoctorCountOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorAvgOrderByAggregateInput> = z.object({
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorMinOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DoctorSumOrderByAggregateInputSchema: z.ZodType<Prisma.DoctorSumOrderByAggregateInput> = z.object({
  appointmentPrice: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumWorkerRoleFilterSchema: z.ZodType<Prisma.EnumWorkerRoleFilter> = z.object({
  equals: z.lazy(() => WorkerRoleSchema).optional(),
  in: z.lazy(() => WorkerRoleSchema).array().optional(),
  notIn: z.lazy(() => WorkerRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkerRoleSchema),z.lazy(() => NestedEnumWorkerRoleFilterSchema) ]).optional(),
}).strict();

export const WorkerCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkerMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
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

export const EnumWorkerRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumWorkerRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => WorkerRoleSchema).optional()
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

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PatientFindFirstArgsSchema: z.ZodType<Prisma.PatientFindFirstArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PatientFindFirstOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereInputSchema.optional(),
  orderBy: z.union([ PatientOrderByWithRelationInputSchema.array(),PatientOrderByWithRelationInputSchema ]).optional(),
  cursor: PatientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PatientFindManyArgsSchema: z.ZodType<Prisma.PatientFindManyArgs> = z.object({
  select: PatientSelectSchema.optional(),
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
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PatientFindUniqueOrThrowArgs> = z.object({
  select: PatientSelectSchema.optional(),
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const DoctorFindFirstArgsSchema: z.ZodType<Prisma.DoctorFindFirstArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  where: DoctorWhereInputSchema.optional(),
  orderBy: z.union([ DoctorOrderByWithRelationInputSchema.array(),DoctorOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorScalarFieldEnumSchema,DoctorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DoctorFindFirstOrThrowArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  where: DoctorWhereInputSchema.optional(),
  orderBy: z.union([ DoctorOrderByWithRelationInputSchema.array(),DoctorOrderByWithRelationInputSchema ]).optional(),
  cursor: DoctorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DoctorScalarFieldEnumSchema,DoctorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DoctorFindManyArgsSchema: z.ZodType<Prisma.DoctorFindManyArgs> = z.object({
  select: DoctorSelectSchema.optional(),
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
  where: DoctorWhereUniqueInputSchema,
}).strict() ;

export const DoctorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DoctorFindUniqueOrThrowArgs> = z.object({
  select: DoctorSelectSchema.optional(),
  where: DoctorWhereUniqueInputSchema,
}).strict() ;

export const WorkerFindFirstArgsSchema: z.ZodType<Prisma.WorkerFindFirstArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  where: WorkerWhereInputSchema.optional(),
  orderBy: z.union([ WorkerOrderByWithRelationInputSchema.array(),WorkerOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerScalarFieldEnumSchema,WorkerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkerFindFirstOrThrowArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  where: WorkerWhereInputSchema.optional(),
  orderBy: z.union([ WorkerOrderByWithRelationInputSchema.array(),WorkerOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkerScalarFieldEnumSchema,WorkerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkerFindManyArgsSchema: z.ZodType<Prisma.WorkerFindManyArgs> = z.object({
  select: WorkerSelectSchema.optional(),
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
  where: WorkerWhereUniqueInputSchema,
}).strict() ;

export const WorkerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkerFindUniqueOrThrowArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  where: WorkerWhereUniqueInputSchema,
}).strict() ;

export const PatientCreateArgsSchema: z.ZodType<Prisma.PatientCreateArgs> = z.object({
  select: PatientSelectSchema.optional(),
  data: z.union([ PatientCreateInputSchema,PatientUncheckedCreateInputSchema ]),
}).strict() ;

export const PatientUpsertArgsSchema: z.ZodType<Prisma.PatientUpsertArgs> = z.object({
  select: PatientSelectSchema.optional(),
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
  where: PatientWhereUniqueInputSchema,
}).strict() ;

export const PatientUpdateArgsSchema: z.ZodType<Prisma.PatientUpdateArgs> = z.object({
  select: PatientSelectSchema.optional(),
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
  data: z.union([ DoctorCreateInputSchema,DoctorUncheckedCreateInputSchema ]),
}).strict() ;

export const DoctorUpsertArgsSchema: z.ZodType<Prisma.DoctorUpsertArgs> = z.object({
  select: DoctorSelectSchema.optional(),
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
  where: DoctorWhereUniqueInputSchema,
}).strict() ;

export const DoctorUpdateArgsSchema: z.ZodType<Prisma.DoctorUpdateArgs> = z.object({
  select: DoctorSelectSchema.optional(),
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

export const WorkerCreateArgsSchema: z.ZodType<Prisma.WorkerCreateArgs> = z.object({
  select: WorkerSelectSchema.optional(),
  data: z.union([ WorkerCreateInputSchema,WorkerUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkerUpsertArgsSchema: z.ZodType<Prisma.WorkerUpsertArgs> = z.object({
  select: WorkerSelectSchema.optional(),
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
  where: WorkerWhereUniqueInputSchema,
}).strict() ;

export const WorkerUpdateArgsSchema: z.ZodType<Prisma.WorkerUpdateArgs> = z.object({
  select: WorkerSelectSchema.optional(),
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