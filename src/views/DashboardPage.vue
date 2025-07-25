<template>
	<div id="app">
		<Navbar 
            @open-modal="openModal()"
        />
		<main>
            <div class="search-panel width-100 flex gap-24">
                <SearchBar
                    v-model="searchQuery"
                />
                <div class="filters width-100 flex gap-24">
                    <DropDown 
                        :options="priorities"
                        v-model="selectedPriority"
                    />
                    <DropDown 
                        :options="statuses"
                        v-model="selectedStatus"
                    />
                </div>
            </div>
            <div class="dashboard flex gap-16">
                <DashboardCard 
                    v-for="stat in stats" 
                    :type="stat.type"
                    :label="stat.label"
                    :value="stat.value"
                />
            </div>
            <div class="task-cards flex-column gap-16">
                <TrackerCard
                    v-for="record in filteredRecords"
                    :data="record"
                    @click="openModal(record)"
                 />
            </div>
            <TrackerModal
                v-if="showModal"
                :selectedTask="selectedTask"
                :users="usersMap"
                :userUID="userUID"
                :username="username"
                @close="closeModal()"
                @refresh="fetchTasks"
                />
		</main>
	</div>
</template>

<style>
    main {
        padding: 0px 128px;
    }

    .search-panel {
        padding: 48px 0px 16px 0px;
        border-bottom: 1px solid var(--separator);
    }

    .dashboard {
        padding: 24px 0px 12px 0px;
    }

    .task-cards {
        flex: 1;
        padding-top: 12px;
        overflow: auto;
    }
</style>

<script>
import Navbar from "../components/Navbar.vue";
import DropDown from "../components/DropDown.vue";
import SearchBar from "../components/SearchBar.vue";
import DashboardCard from "../components/DashboardCard.vue";
import TrackerCard from "../components/TrackerCard.vue";
import TrackerModal from "../components/TrackerModal.vue";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { statuses, priorities, statuses_filter, priorities_filter } from "../constants";

export default {
	name: "Dashboard",
	components: {
		Navbar,
		DropDown,
		SearchBar,
		DashboardCard,
		TrackerCard,
        TrackerModal
	},
    data() {
        return {
            priorities: priorities_filter,
            statuses: statuses_filter,
            stats: [],
            records: [],
            usersMap: {},
            selectedPriority: "All",
            selectedStatus: "All",
            selectedTask: null,
            showModal: false,
            userUID: null,
            searchQuery: "",
        }
    },
    async mounted() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.userUID = user.uid;
                await this.fetchUsers();
                this.username = this.usersMap[user.uid];
                this.fetchTasks();
            } else {
                this.$router.push('/login');
            }
        });
    },
    methods: {
        async fetchUsers() {
            const snapshot = await getDocs(collection(db, "user"));
            snapshot.forEach(doc => {
                this.usersMap[doc.id] = doc.data().username;
            });
        },
        formatTimestamp(ts) {
            if (!ts?.toDate) return '';
            const date = ts.toDate();
            
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            
            const hh = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            
            return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
        },


        openModal(task = null) {
            this.selectedTask = task;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedTask = null;
        },

        async fetchTasks() {
            const snapshot = await getDocs(collection(db, "tracker"));
            const allTasks = [];
            let total = 0;
            let assigned = 0;
            let open = 0;
            let inProgress = 0;
            let resolved = 0;

            snapshot.forEach(doc => {
                const task = doc.data();
                task.id = doc.id;
                total++;
                if (task.assigned === this.userUID) assigned++;
                if (task.status === "Open") open++;
                if (task.status === "In progress") inProgress++;
                if (task.status === "Resolved") resolved++;
                task.author = this.usersMap[task.author] || "Undefined";
                task.assigned = this.usersMap[task.assigned] || "Undefined";
                console.log(task.created_at);
                task.created_at = this.formatTimestamp(task.created_at);
                allTasks.push(task);
            });

            this.records = allTasks;

            this.stats = [
                { type: "text",      label: "Total items",     value: total },
                { type: "accent",    label: "Assigned",        value: assigned },
                { type: "critical",  label: "Open",            value: open },
                { type: "medium",    label: "In progress",     value: inProgress },
                { type: "low",       label: "Resolved",        value: resolved }
            ];
        }
    },
    computed: {
        filteredRecords() {
            return this.records.filter(task => {
                const matchesPriority = this.selectedPriority
                    ? task.priority === this.selectedPriority || this.selectedPriority === "All"
                    : true;

                const matchesStatus = this.selectedStatus
                    ? task.status === this.selectedStatus || this.selectedStatus === "All"
                    : true;

                const matchesSearch = this.searchQuery
                    ? (
                        task.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        task.description?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        task.assigned?.toLowerCase().includes(this.searchQuery.toLowerCase())
                    )
                    : true;

                return matchesPriority && matchesStatus && matchesSearch;
            });
        }
    }
};
</script>
