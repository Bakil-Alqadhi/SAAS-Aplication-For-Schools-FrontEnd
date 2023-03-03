<template>
    <div class="flex items-center justify-center h-screen">
  <div class="relative bg-white rounded-lg w-96">
    <div class="p-8">
      <div class="text-center">
        <span class="text-xl font-bold text-gray-800">Log In</span>
      </div>
      <form class="mt-6">
        <div>
          <label class="block text-gray-700 font-semibold">Email Address</label>
          <input type="email" class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:bg-white focus:outline-none" placeholder="Enter your email address">
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 font-semibold">Password</label>
          <div class="relative">
            <input type="password" class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:bg-white focus:outline-none" placeholder="Enter your password">
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg class="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Log In</button>
        </div>
      </form>
    </div>
    <div class="absolute inset-0 bg-gray-800 opacity-25 rounded-lg"></div>
  </div>
</div>
</template>