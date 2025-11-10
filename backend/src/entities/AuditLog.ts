import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "audit_logs" })
export class AuditLog {
  @PrimaryGeneratedColumn() id!: number;
  @Column() userId!: number;
  @Column() action!: string;
  @CreateDateColumn() createdAt!: Date;
}
