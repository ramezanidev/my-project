<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { useApi } from '@/composables/api';
import { useRouter } from 'vue-router';
import AInput from '@/components/a-input.vue'
import AButton from '@/components/a-button.vue'
import {
    LMap,
    LTileLayer,
    LMarker,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

const zoom = ref(4);
const map = ref<any>(null);

const onReadyMap = (thisMap: any) => {
    map.value = thisMap;
    map.value.on("click", ({ latlng }: any, Zoom = zoom.value) => {
        [inputs.lat, inputs.lng] = [latlng.lat, latlng.lng];
        zoom.value = Zoom;
    });
};
const api = useApi()
const router = useRouter()

const step = ref(1)
const inputs = reactive({
    first_name: '',
    last_name: '',
    coordinate_mobile: '',
    coordinate_phone_number: '',
    address: '',
    region: 1,
    lat: 35.6970118,
    lng: 51.2097333,
    gender: 'male'
})

const validation = {
    first_name: computed(() => ({
        isEmpty: !inputs.first_name,
        isValid: inputs.first_name.length >= 3
    })),
    last_name: computed(() => ({
        isEmpty: !inputs.last_name,
        isValid: inputs.last_name.length >= 3
    })),
    coordinate_mobile: computed(() => ({
        isEmpty: !inputs.coordinate_mobile,
        isValid: inputs.coordinate_mobile.length === 11 && inputs.coordinate_mobile.startsWith('0')
    })),
    coordinate_phone_number: computed(() => ({
        isEmpty: !inputs.coordinate_phone_number,
        isValid: inputs.coordinate_phone_number.length === 11 && inputs.coordinate_phone_number.startsWith('0')
    })),
    address: computed(() => ({
        isEmpty: !inputs.address,
        isValid: inputs.address.length >= 10
    })),
}

const isValidForm = computed(() => {
    const requiredFields = (validation.first_name.value.isValid
        && validation.last_name.value.isValid
        && validation.coordinate_phone_number.value.isValid
        && validation.address.value.isValid);

    const optionalFields = (validation.coordinate_mobile.value.isValid || validation.coordinate_mobile.value.isEmpty)
    return optionalFields && requiredFields
})


const submit = async () => {
    try {
        const request = await api.post('/address', inputs)

    } catch (error) {
        alert('خطایی رخ داد')
    } finally {
        router.push('/')
    }
}
</script>

<template>
    <div class="pt-10" v-if="step === 1">
        <header class="fixed h-10 top-0 bg-white p-2 inset-x-0 flex justify-end">
            <h2 class="font-cold text-sm">ثبت نام</h2>
        </header>
        <div class="text-gray-700 bg-gray-300 text-sm px-2 py-4 select-none" dir="rtl">لطفا اطلاعات ورود خود را وارد
            نمایید.</div>
        <form @submit.prevent dir="rtl" class="py-2 gap-4 flex flex-col">
            <AInput v-model="inputs.first_name" label="نام" :validation="validation.first_name" placeholder="محمد"
                type="firstname" />
            <AInput v-model="inputs.last_name" label="نام خانوادگی" :validation="validation.last_name" placeholder="زمانی"
                type="lastname" />
            <AInput v-model="inputs.coordinate_phone_number" label="تلفن همراه"
                :validation="validation.coordinate_phone_number" placeholder="09904785777" type="number" />
            <AInput v-model="inputs.coordinate_mobile" label="تلفن ثابت" :validation="validation.coordinate_mobile"
                placeholder="02147474747" type="number" />
            <!-- divider -->
            <div class="h-2 bg-gray-300"></div>
            <AInput v-model="inputs.address" label="آدرس دقیق" :validation="validation.address" tag="textarea"
                placeholder="تهران" type="address" />
            <fieldset class="flex justify-between px-2">
                <label for="gender" class="font-bold text-gray-700  mb-1"> جنسیت:</label>
                <div class="flex w-40 rounded overflow-hidden border border-solid border-blue-500">
                    <div class="w-1/2 relative">
                        <input class="absolute opacity-0 inset-0 w-full h-full peer" type="radio"
                            v-model="inputs.gender" value="male" name="gender">
                        <span
                            class="select-none text-sm w-full flex p-2 peer-checked:text-white peer-checked:bg-blue-500 text-blue-500">آقا</span>
                    </div>
                    <div class="w-1/2 relative">
                        <input class="absolute opacity-0 inset-0 w-full h-full peer" type="radio"
                            v-model="inputs.gender" value="female" name="gender">
                        <span
                            class="select-none text-sm w-full flex p-2 peer-checked:text-white peer-checked:bg-blue-500 text-blue-500">خانم</span>
                    </div>
                </div>
            </fieldset>
            <AButton @click="step = 2" :disabled="!isValidForm"> مرحله بعد</AButton>
        </form>
    </div>

    <div v-if="step === 2" class="h-screen pt-10">
        <header class="fixed h-10 top-0 bg-white p-2 inset-x-0 flex justify-end">
            <h2 class="font-cold text-sm">موقعیت روی نقشه</h2>
        </header>
        <l-map v-model="zoom" v-model:zoom="zoom" :center="[inputs.lat, inputs.lng]" @ready="onReadyMap" ref="map"
            class="w-full h-full">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :lat-lng="[inputs.lat, inputs.lng]" draggable :options="{}">
            </l-marker>
        </l-map>
        <AButton class="z-[2000] bottom-2 fixed inset-x-0" @click.once="submit">تایید موقعیت</AButton>
    </div>
</template>