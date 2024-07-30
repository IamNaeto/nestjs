import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get() //Get /users
    findAll(@Query("role") role?: "INTERN | ENGINNER | ADMIN"){
        return []
    }

    @Get(":id") // GET /users/:id
    findOne(@Param("id") id: string){
        return { id }
    }

    @Post() //Post /users
    create(@Body() user: {}){
        return user
    }

    @Patch(":id") //Patch /users
    update(@Param("id") id: string, @Body() userUpdate: {}){
        return {id, ...userUpdate}
    }

    @Delete(":id") // DELETE /users/:id
    delete(@Param("id") id: string){
        return { id }
    }

}
