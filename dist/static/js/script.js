new Vue({
    el: "#app",
    data: {
        items: [],
        userProfile: Object,
        appData: Object
    },
    async mounted() {
        this.appData = new XiaAppData();  // create a new appData
        if (this.appData.refreshAccessToken() || !this.appData.access_cookie_body) {  // Refresh only when needed
            return  // No need to continue
        }
        // Fetch api data
        try {
            const response = await axios.get('/api/v1/exam');
            this.items = response.data;
        } catch (error) {
            console.error(error);
        }
        // Fetch user data
        this.userProfile = this.appData.access_cookie_body["user_profile"];
    },
    methods: {
        printExam(id) {
            const url = `/api/v1/exam/_id/${id}/_/print`;
            const windowFeatures = 'width=800, height=600, menubar=no, toolbar=no, location=no, status=no, resizable=yes, scrollbars=yes';
            window.open(url, '_blank', windowFeatures);
        },
        isPrintVisible(visibility) {
            return this.userProfile && this.userProfile.app_profile && (!('visibility' in this.userProfile.app_profile) || this.userProfile.app_profile.visibility.includes(visibility));
        },
    }
});