import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    

    @Get() //Get /users or /users?role=value
    findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN"){
        return this.usersService.findAll(role)
    }

    @Get(":id") // GET /users/:id
    findOne(@Param("id") id: string){
        return this.usersService.findOne(+id) //using a unary plus to convert it to a number
    }

    @Post() //Post /users
    create(@Body() user: {name:string, email:string, role: "INTERN" | "ENGINNER" | "ADMIN"}){
        return this.usersService.create(user)
    }

    @Patch(":id") //Patch /users
    update(@Param("id") id: string, @Body() userUpdate: {name:string, email:string, role: "INTERN" | "ENGINNER" | "ADMIN"}){
        return this.usersService.update(+id, userUpdate)
    }

    @Delete(":id") // DELETE /users/:id
    delete(@Param("id") id: string){
        return this.usersService.delete(+id)
    }

}
