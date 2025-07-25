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
                        v-model="title"
                        :readonly="isReadonly"
                    >
                </label>
                <label for="description" class="flex-column gap-8 width-100">
                    Description
                    <textarea 
                        name="description" 
                        id="description" 
                        placeholder="Describe the bug or task in detail..."
                        :readonly="isReadonly"
                        v-model="description"
                    ></textarea>
                </label>
                <div class="flex width-100 gap-16">
                    <label for="Status" class="flex-column gap-8 width-100">
                        Status
                        <DropDown
                            :options="statuses"
                            v-model="status"
                            :disabled="isReadonly"
                        />
                    </label>
                    <label for="Priority" class="flex-column gap-8 width-100">
                        Priority
                        <DropDown 
                            :options="priorities"
                            v-model="priority"
                            :disabled="isReadonly"
                        />
                    </label>
                    <label for="assign" class="flex-column gap-8 width-100">
                        Assign to
                        <DropDown 
                            :options="isReadonly ? [username] : userOptions.map(u => u.name)"
                            v-model="assigned"
                        />
                    </label>
                </div>
                <div class="tracker-modal-controls flex-between width-100">
                    <button :disabled="isReadonly" class="btn-red flex" type="button" @click="handleDelete"><span class="material-symbols-rounded icon">delete</span>Delete</button>
                    <div class="controls-right flex gap-8">
                        <button class="btn-secondary" @click="$emit('close')">Cancel</button>
                        <button class="btn-primary-small flex" type="button" @click="handleSave"><span class="material-symbols-rounded icon">save</span>Save</button>
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
        outline: none;
    }
    button {
        padding: 8px 12px;
    }
</style>


<script>
import { priorities, statuses } from "../constants";
import DropDown from "./DropDown.vue"
import { db } from "../firebase";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

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
            },
            username: {
                type: String,
                required: false
            }
        },
        computed: {
            userOptions() {
                return Object.entries(this.users).map(([uid, name]) => ({
                    uid,
                    name
                }));
            },
            authorUID() {
                const entry = Object.entries(this.users || {}).find(
                    ([uid, name]) => name === this.selectedTask?.author
                );
                return entry ? entry[0] : null;
            },
            isReadonly() {
                if (this.selectedTask?.id)
                    return this.authorUID !== this.userUID;
                else
                    return false;
            }

        },
        data() {
            return {
                statuses: statuses,
                priorities: priorities,

                title: this.selectedTask?.title || '',
                description: this.selectedTask?.description || '',
                assigned: this.selectedTask?.assigned || null,
                priority: this.selectedTask?.priority || 'Low',
                status: this.selectedTask?.status || 'Open',
                author: this.getUidByUsername(this.selectedTask?.author, this.users) || null,
            }
        },
        methods: {
            getUidByUsername(username) {
                const entry = Object.entries(this.users).find(
                    ([uid, name]) => name === username
                );
                return entry ? entry[0] : null;
            },
            async handleSave() {
                const isNew = this.selectedTask?.id;
                const taskData = {
                    title: this.title,
                    description: this.description,
                    assigned: this.getUidByUsername(this.assigned),
                    priority: this.priority,
                    status: this.status,
                    author: this.userUID,
                };
                if (!isNew) {
                    taskData["created_at"] = new Date();
                }
                console.log(taskData);
                console.log(this.selectedTask?.id)

                try {
                    if (this.selectedTask?.id) {
                        const taskRef = doc(db, "tracker", this.selectedTask.id);
                        await updateDoc(taskRef, taskData);
                    } else {
                        const newTaskRef = doc(db, "tracker", crypto.randomUUID());
                        await setDoc(newTaskRef, {
                            ...taskData,
                            id: newTaskRef.id
                        });
                    }
                    this.$emit('refresh');
                    this.$emit('close');
                } catch (e) {
                    console.error("Error:", e);
                }
            },
            async handleDelete() {
                if (!this.selectedTask?.id) return;

                try {
                    const taskRef = doc(db, "tracker", this.selectedTask.id);
                    await deleteDoc(taskRef);
                    this.$emit('refresh');
                    this.$emit('close');
                } catch (e) {
                    console.error("Error:", e);
                }
            }
        }
    }
</script>