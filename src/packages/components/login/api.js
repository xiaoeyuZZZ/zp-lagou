import ajax from '../../../api/ajax'

export const loginCompany = (data) => ajax('/company/login',data,'POST')

export const loginAdmin = (data) => ajax('/admin/login',data,'POST')
// export const getCompany = (data) => ajax('http://localhost:3000/company/login',data,'GET')
