import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TenantsModule } from './tenants/tenants.module';
import { DriversModule } from './drivers/drivers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TrackersModule } from './trackers/trackers.module';
import { MapLocationsModule } from './map-locations/map-locations.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    TenantsModule,
    DriversModule,
    VehiclesModule,
    TrackersModule,
    MapLocationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
