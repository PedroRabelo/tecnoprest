import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'PEDIDOS' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Entrega' })
  entrega: Date;

  @Column({ name: 'cod_cliente' })
  codigoCliente: string;

  @Column({ name: 'Cliente' })
  cliente: string;

  @Column({ name: 'Ped' })
  ped: number;

  @Column({ name: 'id_entrega' })
  idEntrega: string;

  @Column({ name: 'CEP' })
  cep: string;

  @Column({ name: 'Endereco' })
  endereco: string;

  @Column({ name: 'Numero' })
  numero: number;

  @Column({ name: 'Bairro' })
  bairro: string;

  @Column({ name: 'Cidade' })
  cidade: string;

  @Column({ name: 'Estado' })
  estado: string;

  @Column({ name: 'latitude' })
  latitude: number;

  @Column({ name: 'longitude' })
  longitude: number;

  @Column({ name: 'Total' })
  total: number;

  @Column({ name: 'Bruto' })
  bruto: number;

  constructor(partial: Partial<Pedido>) {
    Object.assign(this, partial);
  }
}
