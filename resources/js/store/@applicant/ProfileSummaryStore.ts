import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'
import axios from 'axios'
import type { TGConfig, TGEducation, TGEligibility, TGPersonal, TGExperience, TGVoluntary, TGSeminar } from '../GlobalType'

type TContent = {
  personal: TGPersonal,
  education: TGEducation,
  eligibility: TGEligibility,
  experience: TGExperience,
  voluntary: TGVoluntary,
  seminar: TGSeminar,
}

const title = `applicant/ProfileSummaryStore`
export const useProfileSummaryStore = defineStore(title, () => {
  const content = useStorage<TContent>(`${title}/content`, InitParams(), sessionStorage, { serializer: StorageSerializers.object})
  const config = reactive<TGConfig>({
    contentLoading: false,
    buttonLoading: false,
    form: ''
  })

  async function GetAPI() {
    config.contentLoading = true
    try {
      let { data: {data}} = await axios.get('/api/dashboard/profile-summary')
      content.value = data
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
        civil_status: { name: null },
        birth_day: null,
        birth_place_id: null,
        blood_type_id: null,
        blood_type: { name: null },
        sex: false,
        height: null,
        weight: null,
        address_id: null,
        address_barangay: null,
        address_street: null,
        address: null,

        mobile_numbers: []
      },
      education: {
        id: null,
        level: null,
        education_level: { name: null },
        school: null,
        degree: null,
        from: null,
        to: null,
        scholarship: null,
        honors: null,
        education_levels: { name: null }
      },
      eligibility: {
        name: null,
        address_id: null,
        rating: null,
        exam_date: null,
        validity_date: null,
        number: null,
      },
      experience: {
        position: null,
        company: null,
        from: null,
        to: null,
        salary: null,
        salary_type_id: null,
        salary_type: { name: null },
        sg: null,
        work_status_id: null,
        work_status: { name: null },
        is_government: null,
      },
      voluntary: {
        name: null,
        from: null,
        to: null,
        hours: null,
        position: null,
      },
      seminar: {
        name: null,
        from: null,
        to: null,
        hours: null,
        seminar_type_id: null,
        seminar_type: { name: null },
        sponsor: null,
      }
    }
  }

  return {
    content,
    config,

    GetAPI,
  }
})
