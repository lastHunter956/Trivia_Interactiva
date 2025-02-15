import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { refreshTokensEntity } from 'src/auth/entity/refreshToken.entity';

export async function generateToken(
  jwtService: JwtService,
  refreshTokenRepository: Repository<refreshTokensEntity>,
  userId: string,
  email: string,
  type_user: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = jwtService.sign(
    { userId, email, type_user },
    { expiresIn: '4h' }, // Token expires in 4 hour
  );

  const refreshToken = uuidv4(); // Generate a new unique refresh token
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 3); // Set expiry date for the refresh token to 3 days

  // Save the refresh token to the database
  await refreshTokenRepository.save({
    id: refreshToken,
    expyreDate: expiryDate,
    user: { id: userId },
  });

  return {
    accessToken,
    refreshToken,
  };
}
