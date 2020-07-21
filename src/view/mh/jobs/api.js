import ajax from '../../../api/ajax'

export class mhApi {
  static getPositionDetails = (data) => ajax('/mh/positionDetails',data,'GET')

  static getPositionList = (data) => ajax('/mh/positionList',data, 'GET')

  static deliveryResume  = (data) => ajax('/mhUser/deliveryResume',data, 'POST')

  static getData = (data) => ajax('/admin/data',data,'GET')

  static getResume = (data) => ajax('/mhUser/resume',data,'GET')

}
