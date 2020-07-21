import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class adminApi {
  static getCompanyList = (data) => ajax('/admin/companyList',data,'GET')


}
