<template>
  <div>
    <Layout>
      <div class="divide-y divide-gray-200 lg:col-span-9">

        <!-- SECTION FORMS -->
        <BasicTransition>
          <!-- NOTE ADD -->
          <FormCard
            v-if="$eligibilities.config.form == 'create'"
            v-slot="{errors}"
            title="Add Eligibility"
            :loading="$eligibilities.config.buttonLoading"
            :formSchema="schema"
            submitButtonName="Create"
            @submitForm="$eligibilities.PostAPI()"
            @cancelClick="$eligibilities.ChangeForm(null)"
          >
            <div class="col-span-6">
                <AppInput v-model="$eligibilities.params.name" placeholder="Eligibility Name" name="name" :errors="errors"/>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="province" class="block text-sm font-medium text-gray-700">Province Taken</label>
              <select v-model="$eligibilities.province_id" id="province" name="province" class="mt-1 block w-full sm:rounded-xl border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option v-for="row in $address.content" :key="row.id" :value="row.id">{{ row.name }}</option>
              </select>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <AppSelect v-model="$eligibilities.params.address_id" placeholder="City Taken" name="address" :errors="errors">
                <option v-if="!$eligibilities.province_id" value="1">Select Province</option>
                <option v-for="row in $address.content.find(item => item.id === $eligibilities.province_id).cities" :key="row.id" :value="row.id">{{ row.name }}</option>
              </AppSelect>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <AppInput v-model="$eligibilities.params.rating" placeholder="Rating" name="rating" type="number" :errors="errors"/>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <AppInput v-model="$eligibilities.params.exam_date" placeholder="Examination Date" name="examination_date" type="date" :errors="errors"/>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <AppInput v-model="$eligibilities.params.validity_date" placeholder="Validity" name="validity" type="date" :errors="errors"/>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <AppInput v-model="$eligibilities.params.number" placeholder="ID Number" name="number" :errors="errors"/>
            </div>

          </FormCard>
          <!-- NOTE UPDATE -->
          <FormCard
            v-if="$eligibilities.config.form == 'update'"
            v-slot="{errors}"
            title="Update Mobile Number"
            :loading="$eligibilities.config.buttonLoading"
            :formSchema="schema_update"
            submitButtonName="Update"
            @submitForm="$eligibilities.UpdateAPI()"
            @cancelClick="$eligibilities.ChangeForm(null)"
          >
            <div class="col-span-6">
                <AppInput v-model="$eligibilities.params.name" placeholder="Eligibility Name" name="name" :errors="errors"/>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="province" class="block text-sm font-medium text-gray-700">Province Taken</label>
              <select v-model="$eligibilities.province_id" id="province" name="province" class="mt-1 block w-full sm:rounded-xl border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                <option v-for="row in $address.content" :key="row.id" :value="row.id">{{ row.name }}</option>
              </select>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <AppSelect v-model="$eligibilities.params.address_id" placeholder="City Taken" name="address" :errors="errors">
                <option v-if="!$eligibilities.province_id" value="1">Select Province</option>
                <option v-for="row in $address.content.find(item => item.id === $eligibilities.province_id).cities" :key="row.id" :value="row.id">{{ row.name }}</option>
              </AppSelect>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <AppInput v-model="$eligibilities.params.rating" placeholder="Rating" name="rating" type="number" :errors="errors"/>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <AppInput v-model="$eligibilities.params.exam_date" placeholder="Examination Date" name="examination_date" type="date" :errors="errors"/>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <AppInput v-model="$eligibilities.params.validity_date" placeholder="Validity" name="validity" type="date" :errors="errors"/>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <AppInput v-model="$eligibilities.params.number" placeholder="ID Number" name="number" :errors="errors"/>
            </div>
          </FormCard>
        </BasicTransition>

        <!-- SECTION CONTENT -->
        <ContenCard
          v-model="$eligibilities.query.search"
          title="Eligibilities"
          :form="$eligibilities.config.form"
          :buttonLoading="$eligibilities.config.buttonLoading"
          :contentLoading="$eligibilities.config.contentLoading"
          @actionCreateClick="$eligibilities.ChangeForm(null, 'create')"
          @actionCancelClick="$eligibilities.ChangeForm(null)"
        >
          <template #search>
            <AppInput v-model="$eligibilities.query.search" name="search" placeholder="Search" noLabel/>
          </template>
          <template #default>
            <DataTransition>
              <li v-for="row in $eligibilities.content" :key="row.id">
                <div class="block hover:bg-gray-50">
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p :class="['truncate text-sm font-medium text-primary-600']">
                        {{ row.name }} - {{ $address.addressIDToFull(row.address_id) }}
                      </p>
                      <div class="ml-2 flex flex-shrink-0">
                        <AppButton @click="$eligibilities.ChangeForm(row, 'update')" color='white' class="mr-2" size="sm">Edit</AppButton>
                        <AppButton @click="showPrompt = true; $eligibilities.SetIDToDelete(row.id)" color='danger' size="sm">Remove</AppButton>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500 mb-2 sm:mb-0 mr-2">
                          <CreditCardIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          {{ row.number }}
                        </p>
                        <p class="flex items-center text-sm text-gray-500 mb-2 sm:mb-0 mr-2">
                          <StarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          {{ NumberAddComma(row.rating) }}%
                        </p>
                      </div>
                      <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 mb-2 sm:mb-0">
                        <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <p>
                          Taken: {{ moment(row.exam_date).format("MMM DD, YYYY") }}, Valid: {{ moment(row.validity_date).format("MMM DD, YYYY") }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </DataTransition>
          </template>
        </ContenCard>

      </div>
    </Layout>
  </div>

  <PromptModal title="Remove this Number?" confirmButtonName="Remove" @confirm="$eligibilities.DestroyAPI()" v-model="showPrompt">
    <p class="text-gray-500">Are you sure you want to remove this number? This action cannot be undone.</p>
  </PromptModal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as Yup from 'yup'
import { useEligibilityStore } from '@/store/@applicant/EligibilitiesStore'
import { useAddressStore } from '@/store/system/AddressStore'
import { NumberAddComma } from '@/helpers/Converter'
import { useDebounceFn } from '@vueuse/core'
import moment from 'moment'
import { CalendarIcon, CreditCardIcon, StarIcon, } from '@heroicons/vue/24/outline'


import Layout from     './~Components/Layout.vue'
import ContenCard from './~Components/ContentCard.vue'
import FormCard from   './~Components/FormCard.vue'
import AppInput from    '@/components/form/AppInput.vue'
import PromptModal from '@/components/modals/PromptModal.vue'
import AppButton from   '@/components/form/AppButton.vue'
import BasicTransition from '@/components/transitions/BasicTransition.vue'
import DataTransition  from '@/components/transitions/DataTransition.vue'
import AppSelect from '@/components/form/AppSelect.vue'

const schema = Yup.object({
  name: Yup.string().required('Eligibiligy name is required'),
  address: Yup.string().required('Address is required'),
  rating: Yup.number().required('Rating is required').typeError("Invalid Number"),
  examination_date: Yup.date().required('Examination Date is required').typeError('Invalid Date'),
  validity: Yup.date().required('Validity Date is required').typeError('Invalid Date'),
  number: Yup.string().required('Number is required'),
})
const schema_update = schema

const $eligibilities = useEligibilityStore()
const $address = useAddressStore()
const showPrompt = ref(false)

onMounted(() => {
  $eligibilities.GetAPI()
})
watch($eligibilities.query, useDebounceFn(() => {
  $eligibilities.GetAPI()
}, 600))
</script>
