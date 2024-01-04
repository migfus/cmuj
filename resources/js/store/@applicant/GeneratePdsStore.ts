import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'
import axios from 'axios'
import { notify } from 'notiwind'
import type { TGConfig, TGPersonal, TGEducation, TGEligibility, TGExperience, TGVoluntary, TGSeminar } from '../GlobalType'
import download from 'downloadjs'
import moment from 'moment'

interface TContent {
  personal: TGPersonal,
  user: {
    email: string
  },
  educations: TGEducation[]
  eligibilities: TGEligibility[]
  experience: TGExperience[]
  voluntaries: TGVoluntary[]
  seminars: TGSeminar[]
}

const title = `applicant/GeneratePdsStore`
export const useGeneratePdsStore = defineStore(title, () => {
  const content = ref<TContent>(InitParams())
  const config = reactive<TGConfig>({
    contentLoading: false,
    buttonLoading: false,
  })

  async function GetAPI() {
    config.contentLoading = true
    try {
      let data = await axios.get('/api/profile/generate-pds', { responseType: 'blob' })
      download(data, 'example.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    }
    catch(err) {
      console.log(err)
    }
    config.contentLoading = false
  }

  function InitParams() {
    return {
      personal: {
        id: null,
        last_name: null,
        first_name: null,
        mid_name: null,
        ext_name: null,

        civil_status_id: null,
        civil_status: {
          name: null,
        },
        birth_day: null,
        birth_place_id: null,
        blood_type_id: null,
        blood_type: {
          name: null,
        },
        sex: false,
        height: null,
        weight: null,
        address_id: null,
        address_barangay: null,
        address_street: null,
        address: null,

        gsis_id: null,
        pagibig_id: null,
        tin_id: null,
        philhealth_id: null,
        sss_id: null,
        agency_id: null,
        mobile_numbers: []
      },
      user: {
        email: null,
      },
      educations: [],
      eligibilities: [],
      experience: [],
      voluntaries: [],
      seminars: [],
    }
  }

  return {
    content,
    config,

    GetAPI,
  }
})
