<template lang="pug">
  .main-container(id='app')
    router-view
</template>

<script>
export default {
  name: 'APP'
}
</script>


<style lang="less">
.flex {
  display: flex;
  .flex-1 {
    flex: 1;
  }
}
.page-container {
  font-size: 12px;
  .page-operatebar {
      background-color: #eee;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
  }
  
  .page-top-tip {
    margin-bottom: 15px;
  }
  .page-searchbar,.page-table,.page-table-info {
    margin-bottom: 15px;
  }
  .el-form-item__label,.el-form-item__content,.el-checkbox__label,.el-radio__label {
    font-size: 12px;
  }
  .el-radio__inner {
    width: 12px;
    height: 12px;
  }
  .page-table-info {
    width: 100%;
    font-size: 12px;
    border-collapse: collapse;
    th,td {
      padding: 8px 10px;
      line-height: 23px;
      border: 1px solid #ebeef5;
    }
    th {
      background: #f8fbfd;
      text-align: left;
      color: #909399;
      font-weight: 700;
      width: 16%;
    }
    td {
      white-space: normal;
      word-break: break-all;
      color: #606266;
      width: 34%;
    } 
  }
  .page-foot,.page-pagination {
    text-align: center;
  }
}
.upload-tip {
  color: #ccc;
}
.w100 {
  width: 100% !important;
}
.w300 {
  width: 300px !important;
}
.w600 {
  width: 600px !important;
}
.mr15 {
  margin-right: 15px;
}
.mb30 {
  margin-bottom: 30px !important;
}
.mr20 {
  margin-right: 20px;
}
body {
  background-color: #eee;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: #399bff;
}
body {
  min-width: 1000px;
  font-family: Helvetica Neue,Tahoma,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STHeitiSC,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
</style>
