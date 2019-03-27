// 任务状态 9为全部/0为待审核/1为进行中/2为暂停/3为已完成/4为未通过审核/5为已退款
export const missionStatus = {
  9: '全部',
  0: '待审核',
  1: '进行中',
  2: '暂停',
  3: '已完成',
  4: '未通过审核',
  5: '已退款'
}
// 任务状态 0为全部/接单状态 1为待审核/2为已完成/3为未达标/4为驳回/5为超时/6为进行中
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

export const platform = {
  1: '微博',
  2: '豆瓣',
  3: '微信',
  4: '抖音',
  9: '今日头条',
  10: '知乎',
  18: '腾讯视频',
  19: '爱奇艺',
  20: '优酷',
  21: 'B站',
  22: '芒果TV',
  23: '猫眼',
  24: '淘票票',
  25: '腾讯新闻',
  26: '网易新闻',
  27: '文案撰写',
  28: '淘宝',
  29: '小红书',
  30: '支付宝',
  32: 'QQ音乐',
  33: 'QQ'
}

export const missionType = {
  1: '转评赞',
  2: '原创直发',
  3: '点赞',
  36: '粉丝',
  37: '超级话题',
  109: '日常养号直发'
}

// 账单类型:clientRecharge 客户充值/clientPay 客户支出/clientRefund 客户退款/receiverSalary 兼职工资/receiverIncome 兼职收益

export const billType = {
  'clientRecharge': '客户充值',
  'clientPay': '客户支出',
  'clientRefund': '客户退款',
  'receiverSalary': '兼职工资',
  'receiverIncome': '兼职收益',
}