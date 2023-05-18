<template>
<!-- Sidebar -->
    <router-link to="/teacher/dashboard">
        <i class="fa-solid fa-school"></i> 
        <span>Dashboard</span>
    </router-link>
    <router-link to="/teacher/sections/index">
        <i class="fas fa-chalkboard-teacher"></i>
        <span >Your Sections</span>
    </router-link>
    <router-link to="/attendances">
        <i class="fas fa-file-alt"></i>
        <span>Attendance's Report</span>
    </router-link>
    <router-link to="/questions/index">
        <i class="fas fa-clipboard-check"></i>
        <span>Exams</span>
    </router-link>

    <router-link to="/schools">
        <i class="fa-solid fa-users-between-lines"></i>
        <span>Classes</span>
    </router-link>
<!-- ./Sidebar -->


</template>
