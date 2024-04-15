customElements.define('contributions-calendar',
    class extends HTMLElement {
        NUMBER_OF_WEEKS = 52;
        NUMBER_OF_DAYS_IN_WEEK = 7;
        NUMBER_OF_MILLISECONDS_IN_DAY = 86400000;
        START_DATE = '2019-01-06T00:00:00.000Z';

        MAX_CONTRIBUTIONS_NUMBER = 0;

        CONTRIBUTIONS = [];

        build_days_array(contributions, start_date, number_of_weeks, title) {
            let date = new Date(start_date).getTime();
            let days_array = [];
            for (let i = 0; i < number_of_weeks; i++) {
                for (let j = 0; j < this.NUMBER_OF_DAYS_IN_WEEK; j++) {
                    let date_contribution = {};
                    if (!(i === 0 && j === 0)) {
                        date += this.NUMBER_OF_MILLISECONDS_IN_DAY;
                    }

                    let count = this.count_contributions(date, contributions);

                    date_contribution = {
                        count: count,
                        date: date,
                        title: title
                    }

                    days_array.push(date_contribution);
                }
            }

            return days_array;
        }

        count_contributions(date, contributions) {
            let start_date_in_millis = date;
            let end_date_in_millis = date + this.NUMBER_OF_MILLISECONDS_IN_DAY;
            let count = 0;

            for (let i = 0; i < contributions.length; i++) {
                let contribution = contributions[i];
                let contribution_timestamp_in_millis = new Date(contribution.date).getTime();

                if (contribution_timestamp_in_millis >= start_date_in_millis && contribution_timestamp_in_millis < end_date_in_millis) {
                    count += 1;
                }
            }

            if (count > this.MAX_CONTRIBUTIONS_NUMBER) {
                this.MAX_CONTRIBUTIONS_NUMBER = count;
            }

            return count;
        }

        build_day(date_contribution, week_number, day_number, title) {
            const day_template_string = `
                    <template id="day-template">
                        <style>
                            .day {
                                margin: var(--contributions-calendar-day-tile-margin, 1px);
                                height: var(--contributions-calendar-day-tile-height, 1rem);
                                width: var(--contributions-calendar-day-tile-width, 1rem);
                                background-color: var(--contributions-calendar-day-tile-default-background, #ebedf0);
                            }

                            .day[one-quarter] {
                                background-color: var(--contributions-calendar-day-tile-one-quarter-background, #c6e48b);
                            }

                            .day[two-quarters] {
                                background-color: var(--contributions-calendar-day-tile-two-quarters-background, #7bc96f);
                            }

                            .day[three-quarters] {
                                background-color: var(--contributions-calendar-day-tile-three-quarters-background, #239a3b);
                            }

                            .day[four-quarters] {
                                background-color: var(--contributions-calendar-day-tile-four-quarters-background, #239a8c);
                            }
                        </style>
                        <div class="day">

                        </div>
                    </template>
                `;

            const parser = new DOMParser();
            const day_template = parser.parseFromString(day_template_string, 'text/html').querySelector("#day-template");
            const day_clone = day_template.content.cloneNode("#day-template");

            let day_container = day_clone.querySelector('.day');

            day_container.title = date_contribution.count;
            day_container.id = `week-${week_number}-day-${day_number}`;
            day_container.setAttribute('date', date_contribution.date);
            day_container.setAttribute('contributions', date_contribution.count);
            day_container.setAttribute('date-title', title);

            let percentage = 0;
            if (date_contribution.count) {
                let percentage = date_contribution.count / this.MAX_CONTRIBUTIONS_NUMBER
                if (percentage >= 0 && percentage <= 0.25) {
                    day_container.setAttribute('one-quarter', '');
                } else if (percentage > 0.25 && percentage <= 0.5) {
                    day_container.setAttribute('two-quarters', '');
                } else if (percentage > 0.5 && percentage <= 0.75) {
                    day_container.setAttribute('three-quarters', '');
                } else if (percentage > 0.75 && percentage <= 1) {
                    day_container.setAttribute('four-quarters', '');
                }
            }

            return day_clone;
        }

        build_week(week, week_number) {
            const week_template_string = `
                    <template id="week-template">
                        <div class="week">

                        </div>
                    </template>
                `;

            const parser = new DOMParser();
            const week_template = parser.parseFromString(week_template_string, 'text/html').querySelector("#week-template");
            const week_clone = week_template.content.cloneNode(true);
            const week_container = week_clone.querySelector(".week");
            week_container.id = `week-${week_number}`;

            for (let j = 0; j < this.NUMBER_OF_DAYS_IN_WEEK; j++) {
                const date_contribution = week[j];

                // const day = this.build_day(date_contribution, week_number, j);
                const day = this.build_day(date_contribution, week_number, j, date_contribution.title);

                week_container.appendChild(day);
            }

            return week_clone;
        }

        build_container(days_array, start_date, number_of_weeks) {
            const parser = new DOMParser();
            const container_template_string = `
                    <template id="container-template">
                        <style>
                            .container {
                                display: flex;
                                flex-wrap: wrap;
                            }
                        </style>
                        <div class="container">

                        </div>
                    </template>
                `;

            const container_template = parser.parseFromString(container_template_string, 'text/html');
            const container = container_template.querySelector("#container-template");
            const container_clone = container.content.cloneNode(true);

            for (let i = 0; i < number_of_weeks; i++) {

                let week = days_array.splice(0, 7);
                let week_clone = this.build_week(week, i);

                container_clone.querySelector('.container').appendChild(week_clone);
                container_clone.querySelector('.container').addEventListener("click", this.clickListener);
            }

            return container_clone;

        }

        clickListener(event, detail) {
            let rootElement = event.composedPath()[0];
            if (rootElement.className === 'day') {
                const date = rootElement.getAttribute('date');
                const contributions = rootElement.getAttribute('contributions') | 0;

                rootElement.dispatchEvent(new CustomEvent("contributions-calendar-day-selected", {
                    detail: {
                        date: date,
                        contributions: contributions,
                    },
                    composed: true,
                    bubbles: true,
                }));
            }
        }

        setContributions(contributions) {
            this.CONTRIBUTIONS = contributions;
        }

        setStartDate(start_date) {
            this.START_DATE = start_date;
        }

        setNumberOfWeeks(number_of_weeks) {
            this.NUMBER_OF_WEEKS = number_of_weeks;
        }

        init(contributions, start_date, number_of_weeks, title) {
            if (!!contributions) {
                this.setContributions(contributions);
            }

            if (start_date) {
                this.setStartDate(start_date);
            }

            if (number_of_weeks) {
                this.setNumberOfWeeks(number_of_weeks);
            }

            this.draw();
        }

        draw() {
            this.shadowRoot.innerHTML = '';

            let days_array = this.build_days_array(this.CONTRIBUTIONS, this.START_DATE, this.NUMBER_OF_WEEKS, title);
            let container_clone = this.build_container(days_array, this.START_DATE, this.NUMBER_OF_WEEKS);

            this.shadowRoot.appendChild(container_clone);
        }

        constructor() {
            super();

            this.attachShadow({ mode: 'open' });

            this.dispatchEvent(
                new CustomEvent("contributions-calendar-ready",
                    {
                        detail: this,
                        composed: true,
                        bubbles: true,
                    }
                )
            );

        }
    });
