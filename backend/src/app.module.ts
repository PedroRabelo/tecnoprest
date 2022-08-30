import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { DriversModule } from './resources/drivers/drivers.module';
import { MapLocationsModule } from './resources/map-locations/map-locations.module';
import { TenantsModule } from './resources/tenants/tenants.module';
import { TrackersModule } from './resources/trackers/trackers.module';
import { UserModule } from './resources/user/user.module';
import { VehiclesModule } from './resources/vehicles/vehicles.module';
import { DeliveriesModule } from './resources/deliveries/deliveries.module';

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
    DeliveriesModule,
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
