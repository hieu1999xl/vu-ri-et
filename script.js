new Vue({
    el: '#app',
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        { text: "Chủ đầu tư", align: "left", sortable: true, value: "investor" },
        { text: "Dựa án", value: "project" },
        { text: "Số vốn (tỷ)", value: "investment" },
        { text: "Thời hạn (tháng)", value: "time" },
        { text: "Hành động", value: "name", sortable: false }
      ],
      projects: [],
      editedIndex: -1,
      editedItem: {
        investor: "",
        project: "",
        investment: "",
        time: ""
      },
      defaultItem: {
        investor: "",
        project: "",
        investment: "",
        time: ""
      }
    }),
  
    created () {
      this.loadAlbums()
    },
    mounted() {
      
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed: {    
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.saveAlbums();
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.projects.indexOf(item)
        if ( confirm("Are you sure you want to delete this item?") === true) {
          this.projects.splice(index, 1)
          this.saveAlbums()
        } else {
          alert('ABORTED Delete Album')
        }      
        // confirm('Are you sure you want to delete this item?') && this.projects.splice(index, 1)
        // this.saveAlbums();
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.projects[this.editedIndex], this.editedItem)
          //this.saveAlbums();
        } else {
          this.projects.push(this.editedItem)
          //this.saveAlbums();
        }
        this.saveAlbums();
        this.close()    
      },    
      saveAlbums() {
        let parsed = JSON.stringify(this.projects);
        localStorage.setItem('projects', parsed);
      },
      loadAlbums() {
        // Loads localStorage.getItem('projects'))
        if(localStorage.getItem('projects')) {
          try {
            this.projects = JSON.parse(localStorage.getItem('projects'));
          } catch(e) {
            localStorage.removeItem('projects');
          }
        }      
      },
    },
     
  })