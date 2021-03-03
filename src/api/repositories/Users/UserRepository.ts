import { Repository } from '../../../abstracts/Repository'
import { Service } from 'typedi'
import { User } from '../../models/Users/User'

@Service()
export class UserRepository extends Repository {
    private entity = User

    public async findAndCountAll(resourceOptions?: object) {
        return await this.entity.findAndCountAll(this.applyResourceOptions(resourceOptions))
    }

    public async create(user: any) {
        return await this.entity.create(user)
    }

    public async update(id: number, data: any) {
        let updatedUser = await this.entity.update(data, { returning: true, where: { id: id } })

        return updatedUser
    }

    public async delete(id: number) {
        return await this.entity.destroy({ where: { id: id } })
    }

    public async findOne(options: object) {
        return await this.entity.findOne(options)
    }
}