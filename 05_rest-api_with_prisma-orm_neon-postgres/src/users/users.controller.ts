import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    

    @Get() //Get /users or /users?role=value
    findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN"){
        return this.usersService.findAll(role)
    }

    @Get(":id") // GET /users/:id
    findOne(@Param("id", ParseIntPipe) id: number){
        return this.usersService.findOne(id) //using a unary plus to convert it to a number
    }

    @Post() //Post /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDTO){
        return this.usersService.create(createUserDto)
    }

    @Patch(":id") //Patch /users
    update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDTO){
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(":id") // DELETE /users/:id
    delete(@Param("id", ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }

}
