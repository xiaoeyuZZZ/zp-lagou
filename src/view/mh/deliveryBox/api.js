import ajax from '../../../api/ajax'

export class mhApi {
  static getSeekerList = (data) => ajax('/mhUser/seekerList',data,'GET')

}
