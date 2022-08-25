import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './resources/pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 5434,
      username: 'sa',
      password: 'dbaGest@',
      database: 'gesta-routes',
      autoLoadEntities: true,
      extra: {
        validateConnection: false,
        trustServerCertificate: true,
      },
    }),
    PedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
