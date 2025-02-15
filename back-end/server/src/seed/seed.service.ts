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
    // Verificar si el rol "Admin" ya existe
    let adminRole = await this.roleRepository.findOne({
      where: { id_type: 'type_001' },
    });

    if (!adminRole) {
      adminRole = this.roleRepository.create({
        id_type: await generateId(this.roleRepository, 'id_type', 'type_001'),
        type_name: 'Admin',
        type_description: 'Administrador del sistema',
      });
      await this.roleRepository.save(adminRole);
      console.log('✅ Rol "Admin" creado.');
    }

    // Verificar si el usuario "admin" ya existe
    let adminUser = await this.userRepository.findOne({
      where: { id: 'user_001' },
    });

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    if (!adminUser) {
      adminUser = this.userRepository.create({
        id: await generateId(this.userRepository, 'id', 'user_001'),
        email: 'admin@admin.com',
        password: hashedPassword,
        typeUser: { id_type: adminRole.id_type },
      });
      await this.userRepository.save(adminUser);
      console.log('✅ Usuario "admin" creado.');
    }
  }
}
