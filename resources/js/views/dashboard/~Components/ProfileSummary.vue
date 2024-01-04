<template>
  <ul role="list" class="divide-y divide-gray-200 mt-4 sm:rounded-xl shadow bg-white">
    <h1 class="p-4 font-bold text-gray-500">Profile Summary</h1>

    <li class="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-gray-50">
      <div class="flex justify-between space-x-3">
        <div class="min-w-0 flex-1">
          <RouterLink :to="{name: 'profile'}" class="block focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <div class="grid grid-cols-2 gap-2">
              <p class="truncate text-sm font-medium text-gray-900">{{ FullName(content.personal)  }}</p>
              <p class="truncate text-sm text-gray-900">Civil Status: {{ content.personal.civil_status_id }}</p>
              <p class="truncate text-sm text-gray-900">Birth Day: {{ moment(content.personal.birth_day).format('MMM DD, YYYY') }}</p>
              <p class="truncate text-sm text-gray-900">Birth Place: {{ $address.addressIDToFull(content.personal.birth_place_id) }}</p>
              <p class="truncate text-sm text-gray-900">Blood Type: {{ content.personal.blood_type.name }}</p>
              <p class="truncate text-sm text-gray-900">Sex: {{ content.personal.sex ? 'Male' : 'Female' }}</p>
              <p class="truncate text-sm text-gray-900">Height: {{ content.personal.height }}m</p>
              <p class="truncate text-sm text-gray-900">Weight: {{ content.personal.weight }}kl</p>
              <p class="truncate text-sm text-gray-900">
                Address:
                {{ `${content.personal.address}, ${content.personal.address_street}, ${content.personal.address_barangay}` }},
                {{ $address.addressIDToFull(content.personal.address_id) }}
              </p>
              <p class="truncate text-sm text-gray-900">GSIS ID: {{ content.personal.gsis_id ?? 'n/a' }}</p>
              <p class="truncate text-sm text-gray-900">PAGIBIG ID: {{ content.personal.pagibig_id ?? 'n/a'}}</p>
              <p class="truncate text-sm text-gray-900">TIN ID: {{ content.personal.tin_id ?? 'n/a' }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </li>

    <li v-if="content.education" class="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-gray-50">
      <div class="flex justify-between space-x-3">
        <div class="min-w-0 flex-1">
          <RouterLink :to="{name: 'profile-education'}" class="block focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <div class="grid grid-cols-2 gap-2">
              <p class="truncate text-sm font-medium text-gray-900 col-span-2 ">{{ content.education.education_level.name }} - {{ content.education.school }}</p>
              <p class="truncate text-sm text-gray-900">Date: {{ moment(content.education.from).format('MMM DD, YYYY') }} - {{ moment(content.education.to).format('MMM DD, YYYY') }}</p>
              <p class="truncate text-sm text-gray-900">Degree: {{ content.education.degree ?? 'n/a'}}</p>
              <p class="truncate text-sm text-gray-900">Scholarship: {{ content.education.scholarship ?? 'n/a'}}</p>
              <p class="truncate text-sm text-gray-900">Honors: {{ content.education.honors ?? 'n/a' }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </li>

    <li v-if="content.eligibility" class="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-gray-50">
      <div class="flex justify-between space-x-3">
        <div class="min-w-0 flex-1">
          <RouterLink :to="{name: 'profile-eligibilities'}" class="block focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <div class="grid grid-cols-2 gap-2">
              <p class="truncate text-sm font-medium text-gray-900">{{ content.eligibility.name }}</p>
              <p class="truncate text-sm text-gray-900">Rating: {{ content.eligibility.rating }}</p>
              <p class="truncate text-sm text-gray-900">Address: {{ $address.addressIDToFull(content.eligibility.address_id) }}</p>
              <p class="truncate text-sm text-gray-900">Exam Date: {{ moment(content.eligibility.exam_date).format('MMM DD, YYYY') }}</p>
              <p class="truncate text-sm text-gray-900">Validity: {{ moment(content.eligibility.validity_date).format('MMM DD, YYYY') }}</p>
              <p class="truncate text-sm text-gray-900">ID Number: {{ content.eligibility.number }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </li>

    <li v-if="content.experience" class="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-gray-50">
      <div class="flex justify-between space-x-3">
        <div class="min-w-0 flex-1">
          <RouterLink :to="{name: 'profile-experience'}" class="block focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <div class="grid grid-cols-2 gap-2">
              <p class="truncate text-sm font-medium text-gray-900">{{ content.experience.position }} - {{  content.experience.company }}</p>
              <p class="truncate text-sm text-gray-900">Date: {{ DateToPresent(content.experience.from, content.experience.to) }}</p>
              <p class="truncate text-sm text-gray-900">Salary: {{ NumberAddComma(content.experience.salary) }} / {{  content.experience.salary_type.name }}</p>
              <p class="truncate text-sm text-gray-900">Salary Grade: {{ content.experience.sg ?? 'n/a'}}</p>
              <p class="truncate text-sm text-gray-900">Work Status: {{ content.experience.work_status.name }}</p>
              <p class="truncate text-sm text-gray-900">{{ content.experience.is_government ? 'In Government' : 'Not In Government' }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </li>

    <li v-if="content.voluntary" class="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-gray-50">
      <div class="flex justify-between space-x-3">
        <div class="min-w-0 flex-1">
          <RouterLink :to="{name: 'profile-voluntaries'}" class="block focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <div class="grid grid-cols-2 gap-2">
              <p class="truncate text-sm font-medium text-gray-900">{{ content.voluntary.name }}</p>
              <p class="truncate text-sm text-gray-900">Hours: {{ NumberAddComma(content.voluntary.hours) }}</p>
              <p class="truncate text-sm text-gray-900">Date: {{ DateToPresent(content.voluntary.from, content.voluntary.to) }}</p>
              <p class="truncate text-sm text-gray-900">Position: {{ content.voluntary.position }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </li>

    <li v-if="content.seminar" class="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-gray-50">
      <div class="flex justify-between space-x-3">
        <div class="min-w-0 flex-1">
          <RouterLink :to="{name: 'profile-seminars'}" class="block focus:outline-none">
            <span class="absolute inset-0" aria-hidden="true" />
            <div class="grid grid-cols-2 gap-2">
              <p class="truncate text-sm font-medium text-gray-900">{{ content.seminar.name }}</p>
              <p class="truncate text-sm text-gray-900">Hours: {{ NumberAddComma(content.seminar.hours) }}</p>
              <p class="truncate text-sm text-gray-900">Date: {{ DateToPresent(content.seminar.from, content.seminar.to) }}</p>
              <p class="truncate text-sm text-gray-900">Seminar Type: {{ content.seminar.seminar_type.name }}</p>
              <p class="truncate text-sm text-gray-900">Sponsor: {{ content.seminar.sponsor }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </li>

  </ul>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import { useProfileSummaryStore } from '@/store/@applicant/ProfileSummaryStore'
import { FullName, NumberAddComma } from '@/helpers/Converter'
import moment from 'moment'
import { useAddressStore } from '@/store/system/AddressStore'

const $profile = useProfileSummaryStore()
const $address = useAddressStore()
const { content } = toRefs($profile)

function DateToPresent(from: Date, to: Date) {
  if(to) {
    return `${moment(from).format('MMM DD, YYYY')} - ${moment(to).format('MMM DD, YYYY')}`
  }
  return `${moment(from).format('MMM DD, YYYY')} - PRESENT`
}

onMounted(() => {
  $profile.GetAPI()
})
</script>
