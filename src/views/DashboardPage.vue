<template>
	<div id="app">
		<Navbar />
		<main>
            <div class="search-panel width-100 flex gap-24">
                <SearchBar />
                <div class="filters width-100 flex gap-24">
                    <DropDown :options="priorities" />
                    <DropDown :options="statuses"/>
                </div>
            </div>
            <div class="dashboard flex gap-16">
                <DashboardCard />
            </div>
            <div class="task-cards flex-column gap-16">
                <TrackerCard />
                <TrackerCard />
                <TrackerCard />
            </div>
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


export default {
	name: "Dashboard",
	components: {
		Navbar,
		DropDown,
		SearchBar,
		DashboardCard,
		TrackerCard
	},
    data() {
        return {
            priorities: ["Low", "Medium", "High", "Critical"],
            statuses: ["Open", "In progress", "Resolved"]
        }
    }
};
</script>
