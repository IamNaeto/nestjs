import { Injectable, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly db: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.db.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(@Query("role") role?:"INTERN" | "ENGINEER" | "ADMIN") {
    if(role) return this.db.employee.findMany({
      where: {
         role, 
        }
    });

    return this.db.employee.findMany()
  }

  async findOne(id: number) {
    return this.db.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.db.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.db.employee.delete({
      where: {
        id,
      },
    });
  }
}
