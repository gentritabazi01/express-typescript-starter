import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers'
import { UserService } from '../../services/Users/UserService'
import { Service } from 'typedi'
import { UserCreateRequest } from '../../validators/Users/UserCreateRequest'
import { AuthCheck } from '../../middlewares/AuthCheck'
import { ResourceOptions } from '../../transformers/Application/ResourceOptions'

@Service()
@JsonController('/users')
@UseBefore(AuthCheck)
export class UserController {
    constructor(
        private userService: UserService
        ) {
        //
    }

    @Get()
    public async getAll(@QueryParams() resourceOptions: ResourceOptions) {
        return await this.userService.getAll(resourceOptions.getAll())
    }

    @Get('/:id')
    public async getOne(@Param('id') id: number) {
        return await this.userService.findOneById(id)
    }

    @Post()
    @HttpCode(201)
    public async create(@Body() user: UserCreateRequest) {
        return await this.userService.create(user)
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() user: any) {
        return await this.userService.updateOneById(id, user)
    }

    @Delete('/:id')
    @HttpCode(204)
    public async delete(@Param('id') id: number) {
        return await this.userService.deleteOneById(id)
    }
}