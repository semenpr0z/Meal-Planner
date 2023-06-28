<script>
export default {
    props: {
        passwordOptions: {
            type: Array,
            required: false,
        }
    }
}
</script>

<template>
    <div class="wrapper-validation">
        <span class="span-1">Требования к паролю:</span>
        <ul class="list">
            <li class="list__item" v-for="(option, index) in passwordOptions" :key="index">
                <svg v-if="!option.status" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green"
                    class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <svg v-else width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2326_2385)">
                        <path
                            d="M8 0.5C8.73438 0.5 9.44271 0.59375 10.125 0.78125C10.8073 0.96875 11.4427 1.23958 12.0312 1.59375C12.6198 1.94792 13.1589 2.36458 13.6484 2.84375C14.138 3.32292 14.5573 3.86198 14.9062 4.46094C15.2552 5.0599 15.5234 5.69792 15.7109 6.375C15.8984 7.05208 15.9948 7.76042 16 8.5C16 9.23438 15.9062 9.94271 15.7188 10.625C15.5312 11.3073 15.2604 11.9427 14.9062 12.5312C14.5521 13.1198 14.1354 13.6589 13.6562 14.1484C13.1771 14.638 12.638 15.0573 12.0391 15.4062C11.4401 15.7552 10.8021 16.0234 10.125 16.2109C9.44792 16.3984 8.73958 16.4948 8 16.5C7.26562 16.5 6.55729 16.4062 5.875 16.2188C5.19271 16.0312 4.55729 15.7604 3.96875 15.4062C3.38021 15.0521 2.84115 14.6354 2.35156 14.1562C1.86198 13.6771 1.44271 13.138 1.09375 12.5391C0.744792 11.9401 0.476562 11.3021 0.289062 10.625C0.101562 9.94792 0.00520833 9.23958 0 8.5C0 7.76562 0.09375 7.05729 0.28125 6.375C0.46875 5.69271 0.739583 5.05729 1.09375 4.46875C1.44792 3.88021 1.86458 3.34115 2.34375 2.85156C2.82292 2.36198 3.36198 1.94271 3.96094 1.59375C4.5599 1.24479 5.19792 0.976562 5.875 0.789062C6.55208 0.601562 7.26042 0.505208 8 0.5ZM8.88281 8.5L11.5547 5.82812L10.6719 4.94531L8 7.61719L5.32812 4.94531L4.44531 5.82812L7.11719 8.5L4.44531 11.1719L5.32812 12.0547L8 9.38281L10.6719 12.0547L11.5547 11.1719L8.88281 8.5Z"
                            fill="#D02500" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2326_2385">
                            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                    </defs>
                </svg>
                <span :class="!option.status ? 'text-success' : 'text-danger'" class="span-3">{{ option.name }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang='scss' scoped>
.wrapper-validation {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-left: 24px;

    .list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;

        &__item {
            display: flex;
            align-items: center;
            gap: 8px;

            .text-success{
                color: #00B012;
            }

            .text-danger{
                color: #D02500;
            }
        }
    }
}
</style>