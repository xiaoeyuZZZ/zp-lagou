import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class companyApi {
  static getCompanyIntroduce = (data) => ajax('/company/introduce',data,'GET')

  static updateCompanyIntroduce = (data) => ajax('/company/introduce',data,'POST')
}
