import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class adminApi {
  static getData = (data) => ajax('/admin/data',data,'GET')

  static updateData = (data) => ajax('/admin/updateData',data,'POST')
}
