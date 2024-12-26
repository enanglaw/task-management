import { IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    userName:string
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          message:
            `Password is weak, make it complex`,
        })
    password:string
}