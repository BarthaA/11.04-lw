import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import * as mysql from 'mysql2/promise';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  conn: mysql.Pool;
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }

  books: Book[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      isbn: '1234567890',
      publishYear: 2021,
      reserved: true
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      isbn: '0987654321',
      publishYear: 2020,
      reserved: false
    },
    {
      id: 3,
      title: 'Book 3',
      author: 'Author 3',
      isbn: '1234509876',
      publishYear: 2019,
      reserved: true
    },
    {
      id: 4,
      title: 'Book 4',
      author: 'Author 4',
      isbn: '6789054321',
      publishYear: 2018,
      reserved: false
    }
  ]
  async create( createBookDto: CreateBookDto) {
    return await this.db.book.create({
      data: createBookDto
    });
  }

  async findAll() {
    return this.db.book.findMany();
  }

  async findOne(id: number) {
    return this.db.book.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.db.book.update({
      where: { id },
      data: updateBookDto,
    });
    return updatedBook;
  }

  async remove(id: number) {
    try {
      await this.db.book.delete({
        where: { id },
      });
    }
    catch {
      return undefined;
    }
  }
}
