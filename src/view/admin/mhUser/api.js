import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class adminApi {
  static getmhUserList = (data) => ajax('/admin/mhUserList',data,'GET')


}
