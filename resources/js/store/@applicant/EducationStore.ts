import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'
import axios from 'axios'
import { notify } from 'notiwind'
import type { TGConfig } from '../GlobalType'
import { cityIDToProvinceID } from '@/helpers/Converter'

interface TContent {
  id: number
  level: number
  school: string
  degree?: string
  from: Date
  to: Date
  scholarship?: string
  honors?: string
  education_levels: {
    name: string
  }
}

const title = `applicant/EducationStore`
export const useEducationStore = defineStore(title, () => {
  const content = useStorage<TContent[]>(`${title}/content`, null, sessionStorage, { serializer: StorageSerializers.object})
  const config = reactive<TGConfig>({
    contentLoading: false,
    buttonLoading: false,
    form: ''
  })
  const params = useStorage<TContent>(`${title}/params`, InitParams(), sessionStorage, { serializer: StorageSerializers.object })
  const query = reactive<{ search: string }>({
    search: ''
  })
  const province_id = ref(16)

  async function GetAPI() {
    config.contentLoading = true
    try {
      let { data: {data}} = await axios.get('/api/profile/education', { params: { search: query.search }})
      content.value = data
    }
    catch(err) {
      console.log(err)
    }
    config.contentLoading = false
  }

  async function PostAPI() {
    config.buttonLoading = true
    try {
      let { data: {data}} = await axios.post(`/api/profile/education`, params.value)
      if(data) {
        GetAPI()
        ChangeForm(null)
        notify({
          group: "success",
          title: "Personal Info updated!",
          text: 'Personal Info is now changed.'
        }, 5000)
      }
    }
    catch(err) {
      console.log(err)
      notify({
        group: "error",
        title: "Error",
        text: 'The inputs may be invalid or server error.'
      }, 5000)
    }
    config.buttonLoading = false
  }

  async function UpdateAPI() {
    config.buttonLoading = true
    try {
      let { data: {data}} = await axios.put(`/api/profile/education/${params.value.id}`, params.value)
      if(data) {
        GetAPI()
        ChangeForm(null)
        notify({
          group: "success",
          title: "Personal Info updated!",
          text: 'Personal Info is now changed.'
        }, 5000)
      }
    }
    catch(err) {
      console.log(err)
      notify({
        group: "error",
        title: "Error",
        text: 'The inputs may be invalid or server error.'
      }, 5000)
    }
    config.buttonLoading = false
  }

  async function DestroyAPI() {
    config.buttonLoading = true
    try {
      let { data: {data}} = await axios.delete(`/api/profile/education/${params.value.id}`)
      if(data) {

        GetAPI()
        notify({
          group: "success",
          title: "Mobile Number Deleted",
          text: 'Your mobile number is now removed'
        }, 5000)
      }
    }
    catch(err) {
      console.log(err)
      notify({
        group: "error",
        title: "Error Removing Number",
        text: 'Server error. Try refreshing the page'
      }, 5000)
    }
    config.buttonLoading = false
  }

  function InitParams() {
    return {
      id: -1,
      level: -1,
      school: '',
      degree: null,
      from: null,
      to: null,
      scholarship: '',
      honors: '',
      education_levels: {
        name: ''
      }
    }
  }

  function SetIDToDelete(id: number) {
    params.value.id = id
  }

  function ChangeForm(row?: TContent, formMode = null) {
    if(formMode == 'update') {
      config.form = 'update'
      params.value = row
    }
    else if(formMode == 'create') {
      province_id.value = 16
      config.form = 'create'
    }
    else {
      province_id.value = 16
      config.form = ''
      params.value = InitParams()
    }
  }

  return {
    content,
    config,
    params,
    query,
    province_id,

    GetAPI,
    UpdateAPI,
    DestroyAPI,
    PostAPI,

    SetIDToDelete,
    ChangeForm,
  }
})
