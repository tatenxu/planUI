import request from '@/utils/request'

export function getBrandList(name) {
  return request({
    url: '/backstage/brand/find',
    method: 'get',
    params:{
        'name':name
    }
  })
}

