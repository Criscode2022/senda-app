import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VisitsModule } from './visits/visits.module';
@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, VisitsModule] })
export class AppModule {}
