<template >
<div class="filter flex">
    <form class="filter flex space-around" action="">
        <label>Search For Book By Title:
             <input v-model="filter.text" placeholder="Seach Text" type="text" name="title" @input="this.emitFilter"/>
        </label>
        <label>Max Price:
             <input v-model.number="filter.max" placeholder="max price" type="number" name="max" @input="this.emitFilter"/>
        </label>
        <label>Min Price:
             <input v-model.number="filter.min" placeholder="min price" type="number" name="min" @input="this.emitFilter"/>
        </label>
    </form>
</div>
</template>

<script>
export default {
    name:"BookFilter",
    data() {
        return {
            filter:{
                text:'',
                max:"",
                min:""  
            }   
        }
    },
    methods:{
        emitFilter(){
            this.$emit('filtered',this.filter)
        }
    },
    watcher:{

    }
}
</script>