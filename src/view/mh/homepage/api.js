import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class mhApi {
  static getHotPosition = (data) => ajax('/mh/hotPosition',data,'GET')

  static registerMhUser = (data) => ajax('/mhUser/mhUser',data, 'POST')

  static loginMhUser = (data) => ajax('/mhUser/loginMhUser',data,'POST')

  static getData = (data) => ajax('/admin/data',data,'GET')
}
