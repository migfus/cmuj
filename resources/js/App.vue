<template>
  <div style="background-color: #F3F4F6;">
    <NotificationsSection />

    <SideNavigation v-if="$route.meta.sideBar"/>
    <TopNavigation v-else/>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJobPublicStore } from      '@/store/@public/JobPublicStore'
import { useEventPublicStore } from    '@/store/@public/EventPublicStore'
import { useAddressStore } from        './store/system/AddressStore'
import { usePostPublicStore } from     './store/@public/PostPublicStore'
import { useSalaryTypeStore } from     '@/store/system/SalaryTypeStore'
import { useSeminarTypeStore } from    '@/store/system/SeminarTypeStore'
import { useWorkStatusStore } from     './store/system/WorkStatusStore'
import { useEducationLevelStore } from './store/system/EducationLevelStore'
import { useFaqPublicStore } from './store/@public/FaqPublicStore'


import NotificationsSection from './components/AppNotifications.vue'
import TopNavigation from        '@/layout/TopNavigation.vue'
import SideNavigation from       '@/layout/SideNavigation.vue'

const $route = useRoute()
const $job = useJobPublicStore()
const $event = useEventPublicStore()
const $address = useAddressStore()
const $post = usePostPublicStore()
const $faqs = useFaqPublicStore()

const $salaryType = useSalaryTypeStore()
const $seminarType = useSeminarTypeStore()
const $workStatus = useWorkStatusStore()
const $levels = useEducationLevelStore()

onMounted(async () => {
  await $job.GetAPI()
  await $event.GetCountAPI()
  await $address.GetAPI()
  await $post.GetAPI()
  await $faqs.GetAPI()

  await $salaryType.GetAPI()
  await $seminarType.GetAPI()
  await $workStatus.GetAPI()
  await $levels.GetAPI()
});
</script>
