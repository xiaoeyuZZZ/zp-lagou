import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class adminApi {
  static getPersonnelList = (data) => ajax('/admin/personnelList',data,'GET')

  static optionPersonnel = (data) => ajax('/admin/personnel',data,'POST')

  static deletePersonnel = (data) => ajax('/admin/personnel',data,'GET')
}
