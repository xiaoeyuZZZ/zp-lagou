import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class companyApi {
  static getPositionList = (data) => ajax('/company/positionList',data,'GET')

  static deleteCompanyPosition = (data) => ajax('/company/deletePosition',data,'GET')
}
