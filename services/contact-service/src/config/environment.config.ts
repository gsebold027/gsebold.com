import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

  // @IsNotEmpty()
  // @IsString()
  // FROM_DOMAIN: string;
}

export function validateEnvironment(config: Record<string, unknown>) {
  // You can add custom validation logic here if needed
  return config;
}
