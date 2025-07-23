<template>
    <div class="tracker-card card flex gap-16">
        <div class="tracker-card-header flex-between">
            <div class="tracker-card-text flex-column gap-8">
                <p class="tracker-card-header-text">Login button not responsive on mobile</p>
                <p class="tracker-card-description-text description">The login button on the authentication page becomes unclickable on mobile devices smaller than 375px width. Users report they cannot tap the button consistently.</p>
            </div>
            <div class="tracker-card-priority">
                <PriorityLabel />
            </div>
        </div>
        <div class="tracker-card-footer flex-between">
            <div class="tracker-card-labels flex gap-32">
                <div class="tracker-card-time flex-center gap-8">
                    <span class="material-symbols-rounded description icon">schedule</span>
                    <p class="description">3 days ago</p>
                </div>
                <div class="tracker-card-author flex-center gap-8">
                    <span class="material-symbols-rounded description icon">campaign</span>
                    <p class="description">Vertushka</p>
                </div>
                <div class="tracker-card-assigned flex-center gap-8">
                    <span class="material-symbols-rounded description icon">assignment_ind</span>
                    <p class="description">Eerikazz</p>
                </div>
            </div>
            <div class="tracker-card-status">
                <StatusLabel />
            </div>
        </div>
    </div>
</template>

<style>

    .tracker-card {
        padding: 32px;
    }

    .tracker-card-header-text {
        font-weight: bold;
        font-size: 16px;
    }

</style>

<script>
    import PriorityLabel from './PriorityLabel.vue';
    import StatusLabel from './StatusLabel.vue';
    export default {
        name: "TrackerCard",
        components: {
            PriorityLabel,
            StatusLabel
        }
    }
</script>