import Vue from 'vue'

import https from './https'

// 接口定义
Object.defineProperty(Vue.prototype, '$api', {
  configurable: false,
  enumerable: false,
  get () {
    return {
      baseUrl: https.defaults.baseURL,
      getAttachment: https.defaults.baseURL + 'FileUpload/getAttach.json',
      uploadAttachment: https.defaults.baseURL + 'FileUpload/upload.json',
      uploadBase64: https.defaults.baseURL + 'FileUpload/uploadBase64.json',
      getDictionary: 'Dictionary/queryTableListByType.json',
      login: 'LoginRpc/login.json',
      getLoginMenu: 'Menu/getMenuTreeForIndex.json',
      getUserInfo: 'User/getUserInfo.json',
      getCurrentUserInfo: 'User/getCurrentUser.json',
      getLog: 'Log/queryPage.json',
      getDossierLists: 'CaseHeaderRpc/list.json',
      getDossierInfo: 'CaseHeaderRpc/detail.json',
      getDossierSubLists: 'CaseHeaderRpc/listFirstElecArchVo.json',
      getDossierGrandsonLists: 'CaseHeaderRpc/listSecondElecArchVo.json',
      getAttachmentLists: 'FileUpload/listAttach.json'
    }
  }
})
