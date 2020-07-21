import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class mhApi {
  static getCompany = (data) => ajax('/mh/company',data,'GET')

  static getCompanyPosition = (data) => ajax('/mh/companyPosition',data,'GET')

  static getCompanyList = (data) => ajax('/mh/companyList',data,'GET')

  static getData = (data) => ajax('/admin/data',data,'GET')
}
