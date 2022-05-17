<script setup lang="ts">
import { ref, computed } from 'vue';
import { useApi } from '@/composables/api';

const api = useApi()
const result = ref<Array<any>>([]);

const isLoading = ref(false);
const isError = ref(false);
const isEmpty = computed(() => !result.value.length);
const loadData = async () => {
    try {
        isLoading.value = true;
        const request = await api.get('/address');
        const { data } = request;
        if (data && Array.isArray(data) && data.length) {
            result.value = data
        }
    } catch (error) {
        isError.value = false
    } finally {
        isLoading.value = false
    }
}
loadData()

const reloadData = () => {
    isError.value = false
    result.value = []
    loadData()
}
</script>

<template>
    <div v-if="isError" class="flex h-screen">
        <div class="flex items-center flex-col gap-2 m-auto">
            <span dir="rtl">بارگذاری با خطا مواجه شد!</span>
            <p @click="reloadData" class="text-xs cursor-pointer opacity-60 underline">برای تلاش مجدد کلیک کنید</p>
        </div>
    </div>

    <div v-if="(isEmpty && !isError && !isLoading)" class="flex h-screen">
        <div class="flex items-center flex-col gap-2 m-auto">
            <span dir="rtl">لیست آدرس ها خالی هست!</span>
            <p @click="reloadData" class="text-xs cursor-pointer opacity-60 underline">برای تلاش مجدد کلیک کنید</p>
        </div>
    </div>

    <div class="flex h-screen" v-if="isLoading">
        <div class="flex items-center gap-2 m-auto">
            <span>درحال بارگذاری</span>
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>
    </div>

    <div class="flex flex-wrap gap-4 p-2 justify-center bg-gray-200" dir="rtl" v-if="!isEmpty">
        <div class="w-full text-sm flex flex-col items-center p-2 md:max-w-[250px] bg-white rounded shadow"
            v-for="(item, index) in result" :key="item.id">
            <div class="border border-solid border-gray-500 px-2 py-1 w-full text-right flex items-center">
                <address>{{ item.address }}</address>
            </div>
            <div class="mt-4">
                <p class="text-center">{{ item.first_name + ' ' + item.last_name }}</p>
                <p class="text-center mt-2">{{ item.coordinate_mobile }}</p>
            </div>
        </div>
    </div>
</template>