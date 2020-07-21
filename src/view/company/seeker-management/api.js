import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class companyApi {
  static getSeekerList = (data) => ajax('/company/seekerList',data,'GET')

  static getResume = (data) => ajax('/company/resume',data,'GET')

  static editorSeekerStatus = (data) => ajax('/company/seekerStatus',data,'POST')

  static exportExcel = (data) => ajax('/data/export',data,'GET')
}
