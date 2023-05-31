<script>



export default {
    data() {
        return {

        }
    },
    computed: {
        activePage() {
            return (path) => {
                const currentPath = this.$route.path;
                if (path === currentPath) {
                    return '#FF8A00'
                } else {
                    return '#1B1B1A'
                }
            }
        }
    }
}

</script>

<template>
    <div class="footer-mobile">
        <nav class="footer-mobile__navbar">
            <router-link to="/main" class="link-icon">
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 16H5.5V10H11.5V16H14.5V7L8.5 2.5L2.5 7V16ZM0.5 18V6L8.5 0L16.5 6V18H9.5V12H7.5V18H0.5Z"
                        :fill="activePage('/main')" />
                </svg>
            </router-link>
            <router-link to="/menu" class="link-icon">
                <svg width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 10V12H20.5V10H0.5ZM0.5 5V7H20.5V5H0.5ZM0.5 0V2H20.5V0H0.5Z" :fill="activePage('/menu')" />
                </svg>
            </router-link>
            <router-link to="/recipes" class="link-icon">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.5 10H19.5V12H21.5V6C21.5 4.9 20.6 4 19.5 4H18.5V2H16.5V4H8.5V2H6.5V4H5.5C4.39 4 3.51 4.9 3.51 6L3.5 20C3.5 20.5304 3.71071 21.0391 4.08579 21.4142C4.46086 21.7893 4.96957 22 5.5 22H12.5V20H5.5V10ZM5.5 6H19.5V8H5.5V6ZM23.34 16.28L22.63 16.99L20.51 14.87L21.22 14.16C21.3125 14.0673 21.4224 13.9937 21.5434 13.9436C21.6643 13.8934 21.794 13.8676 21.925 13.8676C22.056 13.8676 22.1857 13.8934 22.3066 13.9436C22.4276 13.9937 22.5375 14.0673 22.63 14.16L23.34 14.87C23.73 15.26 23.73 15.89 23.34 16.28ZM19.8 15.58L21.92 17.7L16.62 23H14.5V20.88L19.8 15.58Z"
                        :fill="activePage('/recipes')" />
                </svg>
            </router-link>
            <router-link to="/profile" class="link-icon">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.5 1.9C8.77578 1.9 9.04885 1.95432 9.30364 2.05985C9.55842 2.16539 9.78992 2.32007 9.98492 2.51508C10.1799 2.71008 10.3346 2.94158 10.4401 3.19636C10.5457 3.45115 10.6 3.72422 10.6 4C10.6 4.27578 10.5457 4.54885 10.4401 4.80364C10.3346 5.05842 10.1799 5.28992 9.98492 5.48492C9.78992 5.67993 9.55842 5.83461 9.30364 5.94015C9.04885 6.04568 8.77578 6.1 8.5 6.1C7.94305 6.1 7.4089 5.87875 7.01508 5.48492C6.62125 5.0911 6.4 4.55695 6.4 4C6.4 3.44305 6.62125 2.9089 7.01508 2.51508C7.4089 2.12125 7.94305 1.9 8.5 1.9ZM8.5 10.9C11.47 10.9 14.6 12.36 14.6 13V14.1H2.4V13C2.4 12.36 5.53 10.9 8.5 10.9ZM8.5 0C6.29 0 4.5 1.79 4.5 4C4.5 6.21 6.29 8 8.5 8C10.71 8 12.5 6.21 12.5 4C12.5 1.79 10.71 0 8.5 0ZM8.5 9C5.83 9 0.5 10.34 0.5 13V16H16.5V13C16.5 10.34 11.17 9 8.5 9Z"
                        :fill="activePage('/profile')" />
                </svg>
            </router-link>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
.footer-mobile {
    display: none;
    width: 100%;
    position: sticky;
    bottom: 0;
    background: var(--Light_orange_3);
    height: 56px;
    border-top: 2px solid #00000026;
    align-items: center;
    box-sizing: border-box;

    &__navbar {
        height: 24px;
        width: 650px;
        padding: 0 39px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .link-icon {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}


@media screen and (max-width: 650px) {
    .footer-mobile {
        display: flex;
    }
}
</style>