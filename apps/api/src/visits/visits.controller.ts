import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min, MinLength, Matches } from 'class-validator';
import { PreferredSlot, VisitStatus, VisitType } from '@prisma/client';
import { VisitsService } from './visits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateVisitDto {
  @IsString() @MinLength(2) beneficiaryName!: string;
  @IsOptional() @IsInt() @Min(0) beneficiaryAge?: number;
  @IsString() @MinLength(5) address!: string;
  @IsString() @MinLength(2) city!: string;
  @IsString() @MinLength(2) contactName!: string;
  @IsString() @Matches(/^[0-9+\s()-]{9,20}$/) contactPhone!: string;
  @IsOptional() @IsEmail() contactEmail?: string;
  @IsOptional() @IsEnum(PreferredSlot) preferredSlot?: PreferredSlot;
  @IsOptional() @IsEnum(VisitType) visitType?: VisitType;
  @IsOptional() @IsString() @MaxLength(500) notes?: string;
}
class UpdateVisitDto {
  @IsEnum(VisitStatus) status!: VisitStatus;
  @IsOptional() @IsString() @MaxLength(1000) staffNotes?: string;
}

@Controller('visits')
export class VisitsController {
  constructor(private visits: VisitsService) {}
  @Post()
  create(@Body() dto: CreateVisitDto) { return this.visits.create(dto); }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() { return this.visits.findAll(); }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) { return this.visits.findOne(id); }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateVisitDto) {
    return this.visits.updateStatus(id, dto.status, dto.staffNotes);
  }
}
