import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "sincere@april.bliz",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "shanna@melissa.tv",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Charles Obimnaetochukwu",
            "email": "egesionucharles@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 4,
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "role": "ENGINEER"
        }
    ]

    findAll(role?: "INTERN" | "ENGINEER" | "ADMIN"){
        if(role){
            const rolesArray = this.users.filter(user => user.role === role)

            if(rolesArray.length === 0){
                throw new NotFoundException("User Role Not Found")
            }
            
            return rolesArray
        }

        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if(!user){
            throw new NotFoundException("User Not Found")
        }
        return user
    }

    create(createUserDto: CreateUserDTO){
        const usersByHigestId = [...this.users].sort((a,b) => b.id - a.id)

        const newUser = {
            id: usersByHigestId[0].id + 1,
            ...createUserDto
        }

        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDTO){
        this.users = this.users.map((user) => {
            if(user.id === id){
                return {...user, ...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
