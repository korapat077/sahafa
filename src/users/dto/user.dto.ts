import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({type: String})
    uid: string
    @ApiProperty({type: String})
    firstName: string
    @ApiProperty({type: String})
    lastName: string
}