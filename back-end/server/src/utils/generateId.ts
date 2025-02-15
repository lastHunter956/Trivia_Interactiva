import { Repository } from 'typeorm';

export async function generateId(
  repository: Repository<any>,
  fieldName: string,
  prefix: string,
): Promise<string> {
  const latestEntry = await repository
    .createQueryBuilder('entity')
    .orderBy(`entity.${fieldName}`, 'DESC')
    .getOne();

  if (latestEntry) {
    const idNumber = +latestEntry[fieldName].split('_')[1] + 1;
    return `${prefix}_${idNumber.toString().padStart(3, '0')}`;
  } else {
    return `${prefix}_001`;
  }
}
