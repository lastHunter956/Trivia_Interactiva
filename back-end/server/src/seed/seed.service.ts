import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeUserEntity } from 'src/type-user/entity/type-user.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { generateId } from 'src/utils/generateId';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(TypeUserEntity)
    private readonly roleRepository: Repository<TypeUserEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async run() {
    // Verificar si los roles "Admin" y "Player" existen
    const adminRole = await this.findOrCreateRole('Admin', 'Administrador del sistema');
    const playerRole = await this.findOrCreateRole('Player', 'Usuario estándar');

    // Verificar si el usuario "admin" ya existe por email
    let adminUser = await this.userRepository.findOne({
      where: { email: 'admin@admin.com' },
    });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      adminUser = this.userRepository.create({
        id: await generateId(this.userRepository, 'id', 'user'),
        email: 'admin@admin.com',
        password: hashedPassword,
        typeUser: { id_type: adminRole.id_type },
      });

      await this.userRepository.save(adminUser);
      console.log('✅ Usuario "admin" creado.');
    } else {
      console.log('ℹ️ Usuario "admin" ya existe.');
    }
  }

  // Función para buscar o crear un rol
  private async findOrCreateRole(type_name: string, type_description: string): Promise<TypeUserEntity> {
    let role = await this.roleRepository.findOne({ where: { type_name } });

    if (!role) {
      role = this.roleRepository.create({
        id_type: await generateId(this.roleRepository, 'id_type', 'type'),
        type_name,
        type_description,
      });
      await this.roleRepository.save(role);
      console.log(`✅ Rol "${type_name}" creado.`);
    } else {
      console.log(`ℹ️ Rol "${type_name}" ya existe.`);
    }

    return role;
  }
}
