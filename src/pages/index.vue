<template>
    <div class="flex justify-center items-center h-screen flex-col gap-4">
        <router-link to="/new"
            class="inline-flex  items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-green-500 bg-green-100 hover:bg-green-200 transition ease-in-out duration-150 ring-1 ring-green-900/10">
            ثبت آدرس جدید
        </router-link>
        <router-link to="/address"
            class="inline-flex  items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-green-500 bg-green-100 hover:bg-green-200 transition ease-in-out duration-150 ring-1 ring-green-900/10">
            آدرس های ثبت شده
        </router-link>
    </div>
</template>