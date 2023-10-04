import { IsDateString, IsNotEmpty, IsNumber, IsString, Min, MinLength, IsIn } from 'class-validator';

export class UpdateRecruitmentDto {
  @IsDateString({ strict: true }, { message: "La fecha de contratación debe ser una fecha válida en formato YYYY-MM-DD" })
  date_hire?: string;

  @IsNotEmpty({ message: "La hora de inicio es obligatoria" })
  start_time?: string;

  @IsNotEmpty({ message: "La hora de finalización es obligatoria" })
  end_time?: string;

  @IsString({ message: "La ubicación del evento debe estar en formato de texto" })
  @MinLength(3, { message: "La ubicación del evento no debe tener menos de 3 caracteres" })
  event_location?: string;

  @IsString({ message: "El tipo de evento debe estar en formato de texto" })
  @MinLength(3, { message: "El tipo de evento no debe tener menos de 3 caracteres" })
  type_event?: string;

  @IsNumber({}, { message: "El acuerdo de tarifa debe ser un número" })
  @Min(0, { message: "El acuerdo de tarifa no debe ser menor que 0" })
  agreed_rate?: number;

  @IsDateString({ strict: true }, { message: "La fecha de pago debe ser una fecha válida" })
  payment_date?: Date;

  @IsString({ message: "El estado de pago debe estar en formato de texto" })
  @IsIn(["Pendiente", "Cancelado", "En progreso"], { message: "Estado de pago no válido" })
  payment_status?: string;

 
}
