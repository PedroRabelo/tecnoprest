import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TenantsModule } from './resources/tenants/tenants.module';
import { DriversModule } from './resources/drivers/drivers.module';
import { VehiclesModule } from './resources/vehicles/vehicles.module';
import { TrackersModule } from './resources/trackers/trackers.module';
import { MapLocationsModule } from './resources/map-locations/map-locations.module';

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
export class AppModule { }
