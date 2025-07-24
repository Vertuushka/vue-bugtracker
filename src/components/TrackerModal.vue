<template>
    <div class="modal-overlay flex-center" @click.self="$emit('close')">
        <div class="tracker-modal">
            <div class="tracker-modal-header flex-between">
                <p class="tracker-modal-header-text">Add/Edit task</p>
                <button><span class="material-symbols-rounded description icon" @click="$emit('close')">close</span></button>
            </div>
            <form action="" class="flex-column gap-24">
                <label for="title" class="flex-column gap-8 width-100">
                    Title
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        required 
                        placeholder="Enter a descriptive title..." 
                        :value="title"
                        :readonly="readonly"
                    >
                </label>
                <label for="description" class="flex-column gap-8 width-100">
                    Description
                    <textarea 
                        name="description" 
                        id="description" 
                        placeholder="Describe the bug or task in detail..."
                        :readonly="readonly"
                    >{{ description }}</textarea>
                </label>
                <div class="flex width-100 gap-16">
                    <label for="Status" class="flex-column gap-8 width-100">
                        Status
                        <DropDown
                            :options="statuses"
                            :value="status"
                        />
                    </label>
                    <label for="Priority" class="flex-column gap-8 width-100">
                        Priority
                        <DropDown 
                            :options="priorities"
                            :value="priority"
                        />
                    </label>
                    <label for="assign" class="flex-column gap-8 width-100">
                        Assign to
                        <DropDown 
                            :options="userOptions.map(u => u.name)"
                            :value="assigned"
                        />
                    </label>
                </div>
                <div class="tracker-modal-controls flex-between width-100">
                    <button class="btn-red flex" type="button"><span class="material-symbols-rounded icon">delete</span>Delete</button>
                    <div class="controls-right flex gap-8">
                        <button class="btn-secondary" @click="$emit('close')">Cancel</button>
                        <button class="btn-primary-small flex" type="submit"><span class="material-symbols-rounded icon">save</span>Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.6);
        overflow: scroll;
        backdrop-filter: blur(2px);
    }

    .tracker-modal {
        background-color: #ffffff;
        padding: 32px;
        border: 1px solid var(--separator);
        border-radius: 8px;
    }

    .tracker-modal-header {
        align-items: center;
    }

    .tracker-modal-header p {
        font-size: 24px;
        font-weight: bold;
    }
    textarea {
        resize: none;
        padding: 8px;
        font-family: Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif;
        width: 50vw;
        height: 128px;
        border: 1px solid var(--separator);
        border-radius: 8px;
    }
    button {
        padding: 8px 12px;
    }
</style>


<script>
import { priorities, statuses } from "../constants";
import DropDown from "./DropDown.vue"

    export default {
        name: "TrackerModal",
        components: {
            DropDown
        },
        props: {
            users: {
                type: Object,
                required: false
            },
            selectedTask: {
                type: Object,
                default: null,
                required: false
            },
            userUID: {
                type: String,
                required: true
            }
        },
        computed: {
            userOptions() {
                return Object.entries(this.users).map(([uid, name]) => ({
                    uid,
                    name
                }));
            }
        },
        data() {
            return {
                statuses: statuses,
                priorities: priorities,

                title: this.selectedTask?.title || '',
                description: this.selectedTask?.description || '',
                assigned: this.selectedTask?.assigned || null,
                priority: this.selectedTask?.priority || null,
                status: this.selectedTask?.status || null,
                author: this.getUidByUsername(this.selectedTask?.author, this.users) || null,
                user: this.userUID,
                readonly: this.author !== this.user
            }
        },
        methods: {
            getUidByUsername(username, usersMap) {
                const entry = Object.entries(usersMap).find(
                    ([uid, name]) => name === username
                );
                return entry ? entry[0] : null;
            }

        }
    }
</script>