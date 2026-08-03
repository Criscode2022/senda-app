import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PreferredSlot, VisitStatus, VisitType } from '@prisma/client';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}
  create(data: {
    beneficiaryName: string; beneficiaryAge?: number; address: string; city: string;
    contactName: string; contactPhone: string; contactEmail?: string;
    preferredSlot?: PreferredSlot; visitType?: VisitType; notes?: string;
  }) {
    return this.prisma.visitRequest.create({ data: { ...data, status: 'NEW' } });
  }
  findAll() {
    return this.prisma.visitRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { assignedTo: { select: { id: true, name: true, email: true } } },
    });
  }
  async findOne(id: string) {
    const v = await this.prisma.visitRequest.findUnique({
      where: { id },
      include: { assignedTo: { select: { id: true, name: true, email: true } } },
    });
    if (!v) throw new NotFoundException();
    return v;
  }
  async updateStatus(id: string, status: VisitStatus, staffNotes?: string) {
    try {
      return await this.prisma.visitRequest.update({
        where: { id },
        data: { status, staffNotes },
      });
    } catch { throw new NotFoundException(); }
  }
}
