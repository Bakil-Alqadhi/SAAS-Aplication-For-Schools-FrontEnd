<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-2 sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="mt-6">
            <div class="mt-2 text-center text-sm text-gray-600">
              <p>You do not have permission to access this page.</p>
            </div>
          </div>
          <div class="mt-6">
            <button
              @click="goBack"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
methods: {
    goBack() {
    this.$router.go(-1);
    },
},
};
</script>
  