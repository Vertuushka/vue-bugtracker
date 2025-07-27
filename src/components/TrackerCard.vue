<template>
    <div class="tracker-card card flex gap-16">
        <div class="tracker-card-header flex-between gap-32">
            <div class="tracker-card-text flex-column gap-8">
                <p class="tracker-card-header-text">{{ data.title }}</p>
                <p class="tracker-card-description-text description">{{ data.description }}</p>
            </div>
            <div class="tracker-card-priority">
                <PriorityLabel 
                    :data="data.priority"
                />
            </div>
        </div>
        <div class="tracker-card-footer flex-between">
            <div class="tracker-card-labels flex gap-32">
                <div class="tracker-card-time flex-center gap-8">
                    <span class="material-symbols-rounded description icon">schedule</span>
                    <p class="description">{{ data.created_at }}</p>
                </div>
                <div class="tracker-card-author flex-center gap-8">
                    <span class="material-symbols-rounded description icon">campaign</span>
                    <p class="description">{{ data.author }}</p>
                </div>
                <div class="tracker-card-assigned flex-center gap-8">
                    <span class="material-symbols-rounded description icon">assignment_ind</span>
                    <p class="description">{{ data.assigned }}</p>
                </div>
            </div>
            <div class="tracker-card-status">
                <StatusLabel 
                    :data="data.status"
                />
            </div>
        </div>
    </div>
</template>

<style>

    .tracker-card {
        padding: 32px;
        transition: 0.3s;
        cursor: pointer;
    }

    .tracker-card:hover {
        color: var(--accent);
        border: 1px solid var(--accent);
        box-shadow: 0px 32px 64px -48px rgba(0,0,0,0.2);
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
        },
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    }
</script>