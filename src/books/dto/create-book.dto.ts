import { IsInt, IsISBN, IsNotEmpty, IsString } from "class-validator"

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  author: string

  @IsISBN()
  @IsString()
  isbn: string

  @IsNotEmpty()
  @IsInt()
  publishYear: number
}
