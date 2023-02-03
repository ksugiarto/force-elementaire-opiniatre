export class CreateActorDto  {
  firstName: string;
  lastName?: string;
  email?: string;
  birthdate?: string;
  birthplace?: string;
}

export class UpdateActorDto  {
  firstName: string;
  lastName?: string;
  isActive?: boolean;
  email?: string;
  birthdate?: string;
  birthplace?: string;
}
