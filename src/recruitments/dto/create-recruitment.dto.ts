import { IsDate, IsString, IsNumber, Min, IsNotEmpty, IsIn, MinLength, IsDateString } from 'class-validator';

export class CreateRecruitmentDto {
  @IsDateString({ strict: true }, { message: "La fecha de contratación debe ser una fecha válida en formato YYYY-MM-DD" })
  @IsNotEmpty({ message: "La fecha de contratación es obligatoria" })
  date_hire: string;

  @IsNotEmpty({ message: "La hora de inicio es obligatoria" })
  start_time: string;

  @IsNotEmpty({ message: "La hora de finalización es obligatoria" })
  end_time: string;

  @IsString({ message: "La ubicación del evento debe estar en formato de texto" })
  @MinLength(3, { message: "La ubicación del evento no debe tener menos de 3 caracteres" })
  @IsNotEmpty({ message: "La ubicación del evento es obligatoria" })
  event_location: string;

  @IsString({ message: "El tipo de evento debe estar en formato de texto" })
  @MinLength(3, { message: "El tipo de evento no debe tener menos de 3 caracteres" })
  @IsNotEmpty({ message: "El tipo de evento es obligatorio" })
  type_event: string;

  @IsNumber({}, { message: "El acuerdo de tarifa debe ser un número" })
  @Min(0, { message: "El acuerdo de tarifa no debe ser menor que 0" })
  @IsNotEmpty({ message: "El acuerdo de tarifa es obligatorio" })
  agreed_rate: number;

  @IsDateString({ strict: true }, { message: "La fecha de pago debe ser una fecha válida" })
  payment_date?: Date;

  @IsString({ message: "El estado de pago debe estar en formato de texto" })
  @IsIn(["Pendiente", "Cancelado", "En progreso"], { message: "Estado de pago no válido" })
  @IsNotEmpty({ message: "El estado de pago es obligatorio" })
  payment_status: string;

  @IsNotEmpty({ message: "El ID del músico es obligatorio" })
  musicianId: number;
  
  @IsNotEmpty({ message: "El ID del contratista es obligatorio" })
  contractorId: number;
}
