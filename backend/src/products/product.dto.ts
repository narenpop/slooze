import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpsertProductDto {
  @IsString()
  name!: string;

  @IsString()
  commodityType!: string;

  @IsNumber()
  @Min(0)
  quantity!: number;

  @IsNumber()
  @Min(0)
  unitPrice!: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
