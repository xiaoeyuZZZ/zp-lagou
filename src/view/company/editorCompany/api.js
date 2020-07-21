import ajax from '../../../api/ajax'

// export const getCompanyIntroduce = (data) => ajax('http://localhost:3000/company/introduce',data,'GET')

export class companyApi {

  static editorCompany = (data) => ajax('/company/editorCompany',data,'POST')
}
