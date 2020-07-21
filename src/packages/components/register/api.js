import {server} from '../../../tools/server'
import ajax from '../../../api/ajax'

// export class companyApi {
//   static registerCompany(params = {}) {
//     return server.connection('POST', '/company/register', params)
//   }
// }
export const registerCompany = (data) => ajax('/company/register',data,'POST')

// export const updateAvatar = (data) => ajax('http://localhost:3000/updateFile',data,'POST')
