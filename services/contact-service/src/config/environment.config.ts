import { plainToInstance } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  PORT: string;

  @IsNotEmpty()
  @IsString()
  SWAGGER_PATH: string;

  @IsNotEmpty()
  @IsString()
  RESEND_API_KEY: string;

  @IsNotEmpty()
  @IsEmail()
  CONTACT_EMAIL: string;

  @IsNotEmpty()
  @IsString()
  FROM_DOMAIN: string;
}

// Fails startup on a missing or invalid variable instead of failing the first email send.
export function validateEnvironment(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config);
  const errors = validateSync(validated, { skipMissingProperties: false });

  if (errors.length > 0) {
    const details = errors
      .map((error) => `${error.property}: ${Object.values(error.constraints ?? {}).join(', ')}`)
      .join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return validated;
}
