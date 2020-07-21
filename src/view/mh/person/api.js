import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class mhApi {
  static editorResume = (data) => ajax('/mhUser/resume',data,'POST')

  static getResume = (data) => ajax('/mhUser/resume',data,'GET')
}
