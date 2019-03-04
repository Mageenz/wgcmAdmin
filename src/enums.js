// 0为待审核/1为线上/2为暂停/3为已完成/4为未通过/5为已退款， 这是上面的，加两个状态，已退款和暂停
export const missionStatus = {
  0: '待审核',
  1: '线上',
  2: '暂停',
  3: '已完成',
  4: '未通过',
  5: '已退款'
}
// 接单状态 0为全部/1为待审核/2为已完成/3为未达标/4为驳回/5为超时/6为进行中
export const missionStatus1 = {
  0: '全部',
  1: '待审核',
  2: '已完成',
  3: '未达标',
  4: '驳回',
  5: '超时',
  6: '进行中',
}

export const userType = {
  'Receiver': '兼职',
  'Client': '客户'
}

export const userType1 = {
  0: '管理员',
  1: '超级管理员'
}

export const dateType = {
  0: '日/月',
  1: '自定义'
}