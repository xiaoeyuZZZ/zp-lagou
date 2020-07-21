import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class companyApi {

  static addCompanyPosition = (data) => ajax('/company/position',data,'POST')

  static getCompanyPosition = (data) => ajax('/company/position',data,'GET')

  static updateCompanyPosition = (data) => ajax('/company/updatePosition',data,'POST')

}
