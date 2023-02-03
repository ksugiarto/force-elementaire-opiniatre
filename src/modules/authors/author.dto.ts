export class CreateAuthorDto {
  firstName: string;
  lastName?: string;
  email?: string;
  birthdate?: string;
  birthplace?: string;
}

export class UpdateAuthorDto {
  firstName: string;
  lastName?: string;
  isActive?: boolean;
  email?: string;
  birthdate?: string;
  birthplace?: string;
}
