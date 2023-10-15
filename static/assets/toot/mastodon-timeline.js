/**
 * Mastodon embed feed timeline v3.8.2
 * More info at:
 * https://gitlab.com/idotj/mastodon-embed-feed-timeline
 */

/**
 * Timeline settings
 * Adjust these parameters to customize your timeline
 */
window.addEventListener("load", () => {
    const mastodonTimeline = new MastodonApi({
        // Id of the <div> containing the timeline
        container_body_id: "mt-body",

        // Preferred color theme: 'light', 'dark' or 'auto'. Default: auto
        default_theme: "auto",

        // Your Mastodon instance
        instance_url: "https://api.eallion.com/mastodon",

        // Choose type of toots to show in the timeline: 'local', 'profile', 'hashtag'. Default: local
        timeline_type: "profile",

        // Your user ID on Mastodon instance. Leave empty if you didn't choose 'profile' as type of timeline
        user_id: "111136231674527355",

        // Your user name on Mastodon instance. Leave empty if you didn't choose 'profile' as type of timeline
        profile_name: "@eallion",

        // The name of the hashtag. Leave empty if you didn't choose 'hashtag' as type of timeline
        hashtag_name: "",

        // Maximum amount of toots to get. Default: 20
        toots_limit: "40",

        // Hide unlisted toots. Default: don't hide
        hide_unlisted: true,

        // Hide boosted toots. Default: don't hide
        hide_reblog: true,

        // Hide replies toots. Default: don't hide
        hide_replies: true,

        // Hide preview card if toot contains a link, photo or video from a URL. Default: don't hide
        hide_preview_link: true,

        // Hide custom emojis available on the server. Default: don't hide
        hide_emojos: true,

        // Converts Markdown symbol ">" at the beginning of a paragraph into a blockquote HTML tag. Ddefault: don't apply
        markdown_blockquote: false,

        // Limit the text content to a maximum number of lines. Default: 0 (unlimited)
        text_max_lines: "0",

        // Customize the text of the link pointing to the Mastodon page (appears after the last toot)
        link_see_more: "See more posts at e5n.cc",
    });
});

/**
 * Set all variables with customized values or use default ones
 * @param {object} params_ User customized values
 * Trigger main function to build the timeline
 */
const MastodonApi = function (params_) {
    this.CONTAINER_BODY_ID = params_.container_body_id || "mt-body";
    this.SPINNER_CLASS = params_.spinner_class || "loading-spinner";
    this.DEFAULT_THEME = params_.default_theme || "auto";
    this.INSTANCE_URL = params_.instance_url;
    this.USER_ID = params_.user_id || "";
    this.PROFILE_NAME = this.USER_ID ? params_.profile_name : "";
    this.TIMELINE_TYPE = params_.timeline_type || "local";
    this.HASHTAG_NAME = params_.hashtag_name || "";
    this.TOOTS_LIMIT = params_.toots_limit || "20";
    this.HIDE_UNLISTED =
        typeof params_.hide_unlisted !== "undefined"
            ? params_.hide_unlisted
            : false;
    this.HIDE_REBLOG =
        typeof params_.hide_reblog !== "undefined" ? params_.hide_reblog : false;
    this.HIDE_REPLIES =
        typeof params_.hide_replies !== "undefined" ? params_.hide_replies : false;
    this.HIDE_PREVIEW_LINK =
        typeof params_.hide_preview_link !== "undefined"
            ? params_.hide_preview_link
            : false;
    this.HIDE_EMOJOS =
        typeof params_.hide_emojos !== "undefined" ? params_.hide_emojos : false;
    this.MARKDOWN_BLOCKQUOTE =
        typeof params_.markdown_blockquote !== "undefined"
            ? params_.markdown_blockquote
            : false;
    this.TEXT_MAX_LINES = params_.text_max_lines || "0";
    this.LINK_SEE_MORE = params_.link_see_more;
    this.FETCHED_DATA = {};

    this.mtBodyContainer = document.getElementById(this.CONTAINER_BODY_ID);

    this.buildTimeline();
};

/**
 * Trigger functions and construct timeline
 */
MastodonApi.prototype.buildTimeline = async function () {
    // Apply color theme
    this.setTheme();

    // Get server data
    await this.getTimelineData();

    // Empty the <div> container
    this.mtBodyContainer.innerHTML = "";

    for (let i in this.FETCHED_DATA.timeline) {
        // First filter (Public / Unlisted)
        if (
            this.FETCHED_DATA.timeline[i].visibility == "public" ||
            (!this.HIDE_UNLISTED &&
                this.FETCHED_DATA.timeline[i].visibility == "unlisted")
        ) {
            // Second filter (Reblog / Replies)
            if (
                (this.HIDE_REBLOG && this.FETCHED_DATA.timeline[i].reblog) ||
                (this.HIDE_REPLIES && this.FETCHED_DATA.timeline[i].in_reply_to_id)
            ) {
                // Nothing here (Don't append toots)
            } else {
                // Append toots
                this.appendToot(this.FETCHED_DATA.timeline[i], Number(i));
            }
        }
    }

    // Check if there are toots in the container (due to filters applied)
    if (this.mtBodyContainer.innerHTML === "") {
        this.mtBodyContainer.setAttribute("role", "none");
        this.mtBodyContainer.innerHTML =
            '<div class="mt-error"><span class="mt-error-icon">📭</span><br/><strong>Sorry, no toots to show</strong><br/><div class="mt-error-message">Got ' +
            this.FETCHED_DATA.timeline.length +
            ' toots from the server but due to the "hide filters" applied, no toot is shown</div></div>';
    } else {
        // Insert link after last toot to visit Mastodon page
        if (this.LINK_SEE_MORE) {
            let linkSeeMorePath = "";
            if (this.TIMELINE_TYPE === "profile") {
                linkSeeMorePath = this.PROFILE_NAME;
            } else if (this.TIMELINE_TYPE === "hashtag") {
                linkSeeMorePath = "tags/" + this.HASHTAG_NAME;
            } else if (this.TIMELINE_TYPE === "local") {
                linkSeeMorePath = "public/local";
            }
            let linkSeeMore =
                '<div class="mt-footer"><a href="' +
                // this.INSTANCE_URL +
                // "/" +
                // linkSeeMorePath +
                'https://e5n.cc/@eallion' +
                '" class="btn" target="_blank" rel="nofollow noopener noreferrer">' +
                this.LINK_SEE_MORE +
                "</a></div>";
            this.mtBodyContainer.parentNode.insertAdjacentHTML(
                "beforeend",
                linkSeeMore
            );
        }
    }

    // Toot interactions
    this.mtBodyContainer.addEventListener("click", function (e) {
        // Check if toot cointainer was clicked
        if (
            e.target.localName == "article" ||
            e.target.offsetParent.localName == "article" ||
            (e.target.localName == "img" &&
                e.target.offsetParent.className !== "mt-avatar" &&
                e.target.offsetParent.className !== "mt-avatar-account")
        ) {
            openTootURL(e);
        }
        // Check if Show More/Less button was clicked
        if (
            e.target.localName == "button" &&
            e.target.className == "spoiler-link"
        ) {
            toogleSpoiler(e);
        }
    });
    this.mtBodyContainer.addEventListener("keydown", function (e) {
        // Check if Enter key was pressed with focus in an article
        if (e.key === "Enter" && e.target.localName == "article") {
            openTootURL(e);
        }
    });

    /**
     * Open toot in a new page avoiding any other natural link
     * @param {event} e User interaction trigger
     */
    const openTootURL = function (e) {
        let urlToot = e.target.closest(".mt-toot").dataset.location;
        if (
            e.target.localName !== "a" &&
            e.target.localName !== "span" &&
            e.target.localName !== "button" &&
            e.target.parentNode.className !== "toot-preview-image" &&
            urlToot
        ) {
            window.open(urlToot, "_blank");
        }
    };

    /**
     * Spoiler button
     * @param {event} e User interaction trigger
     */
    const toogleSpoiler = function (e) {
        const nextSibling = e.target.nextSibling;
        if (nextSibling.localName === "img") {
            e.target.parentNode.classList.remove("toot-media-spoiler");
            e.target.style.display = "none";
        } else if (
            nextSibling.classList.contains("spoiler-text-hidden") ||
            nextSibling.classList.contains("spoiler-text-visible")
        ) {
            if (e.target.textContent == "Show more") {
                nextSibling.classList.remove("spoiler-text-hidden");
                nextSibling.classList.add("spoiler-text-visible");
                e.target.setAttribute("aria-expanded", "true");
                e.target.textContent = "Show less";
            } else {
                nextSibling.classList.remove("spoiler-text-visible");
                nextSibling.classList.add("spoiler-text-hidden");
                e.target.setAttribute("aria-expanded", "false");
                e.target.textContent = "Show more";
            }
        }
    };
};

/**
 * Set the theme style chosen by the user or by the browser/OS
 */
MastodonApi.prototype.setTheme = function () {
    /**
     * Set the theme value in the <html> tag using the attribute "data-theme"
     * @param {string} theme Type of theme to apply: dark or light
     */
    const setTheme = function (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    };

    if (this.DEFAULT_THEME === "auto") {
        let systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
        systemTheme.matches ? setTheme("dark") : setTheme("light");
        // Update the theme if user change browser/OS preference
        systemTheme.addEventListener("change", (e) => {
            e.matches ? setTheme("dark") : setTheme("light");
        });
    } else {
        setTheme(this.DEFAULT_THEME);
    }
};

/**
 * Requests to the server to get all the data
 */
MastodonApi.prototype.getTimelineData = async function () {
    return new Promise((resolve, reject) => {
        /**
         * Fetch data from server
         * @param {string} url address to fetch
         * @returns {object} List of objects
         */
        async function fetchData(url) {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch the following URL: " +
                    url +
                    "<hr>" +
                    "Error status: " +
                    response.status +
                    "<hr>" +
                    "Error message: " +
                    response.statusText
                );
            }

            const data = await response.json();
            return data;
        }

        // URLs to fetch
        let urls = {};
        if (this.TIMELINE_TYPE === "profile") {
            urls.timeline = `${this.INSTANCE_URL}/api/v1/accounts/${this.USER_ID}/statuses?limit=${this.TOOTS_LIMIT}`;
        } else if (this.TIMELINE_TYPE === "hashtag") {
            urls.timeline = `${this.INSTANCE_URL}/api/v1/timelines/tag/${this.HASHTAG_NAME}?limit=${this.TOOTS_LIMIT}`;
        } else if (this.TIMELINE_TYPE === "local") {
            urls.timeline = `${this.INSTANCE_URL}/api/v1/timelines/public?local=true&limit=${this.TOOTS_LIMIT}`;
        }
        if (!this.HIDE_EMOJOS) {
            urls.emojos = this.INSTANCE_URL + "/api/v1/custom_emojis";
        }

        const urlsPromises = Object.entries(urls).map(([key, url]) => {
            return fetchData(url)
                .then((data) => ({ [key]: data }))
                .catch((error) => {
                    reject(new Error("Something went wrong fetching data"));
                    this.mtBodyContainer.innerHTML =
                        '<div class="mt-error"><span class="mt-error-icon">❌</span><br/><strong>Sorry, request failed:</strong><br/><div class="mt-error-message">' +
                        error.message +
                        "</div></div>";
                    this.mtBodyContainer.setAttribute("role", "none");
                    return { [key]: [] };
                });
        });

        // Fetch all urls simultaneously
        Promise.all(urlsPromises).then((dataObjects) => {
            this.FETCHED_DATA = dataObjects.reduce((result, dataItem) => {
                return { ...result, ...dataItem };
            }, {});

            // console.log("Timeline data: ", this.FETCHED_DATA);
            resolve();
        });
    });
};

/**
 * Inner function to add each toot in timeline container
 * @param {object} c Toot content
 * @param {number} i Index of toot
 */
MastodonApi.prototype.appendToot = function (c, i) {
    this.mtBodyContainer.insertAdjacentHTML("beforeend", this.assambleToot(c, i));
};

/**
 * Build toot structure
 * @param {object} c Toot content
 * @param {number} i Index of toot
 */
MastodonApi.prototype.assambleToot = function (c, i) {
    let avatar, user, content, url, date, id, application, replies_count, reblogs_count, favourites_count;

    if (c.reblog) {
        // BOOSTED toot
        // Toot url
        url = c.reblog.url;

        // Boosted avatar
        avatar =
            '<a href="' +
            c.reblog.account.url +
            '" class="mt-avatar" rel="nofollow noopener noreferrer" target="_blank">' +
            '<div class="mt-avatar-image">' +
            '<div class="mt-avatar-boosted">' +
            '<img src="' +
            c.reblog.account.avatar +
            '" alt="' +
            c.reblog.account.username +
            ' avatar" loading="lazy" />' +
            "</div>" +
            '<div class="mt-avatar-account">' +
            '<img src="' +
            c.account.avatar +
            '" alt="' +
            c.account.username +
            ' avatar" loading="lazy" />' +
            "</div>" +
            "</div>" +
            "</a>";

        // User name and url
        user =
            '<div class="mt-user">' +
            '<a href="' +
            c.reblog.account.url +
            '" rel="nofollow noopener noreferrer" target="_blank">' +
            // c.reblog.account.username +
            '<div class="mt-nick">Charles Chin</div><div class="mt-id">@eallion@e5n.cc</div>' +
            '<span class="visually-hidden"> post</span>' +
            "</a>" +
            "</div>";

        // Date
        date = this.formatDate(c.reblog.created_at);
    } else {
        // STANDARD toot
        // Toot url
        url = c.url;

        appName = c.application.name;
        appWebsite = c.application.website || 'https://e5n.cc/@eallion';

        replies_count = c.replies_count;
        favourites_count = c.favourites_count
        reblogs_count = c.reblogs_count

        // Avatar
        avatar =
            '<a href="' +
            c.account.url +
            '" class="mt-avatar" rel="nofollow noopener noreferrer" target="_blank">' +
            '<div class="mt-avatar-image">' +
            '<img src="' +
            c.account.avatar +
            '" alt="' +
            c.account.username +
            ' avatar" loading="lazy" />' +
            "</div>" +
            "</a>";

        // User name and url
        user =
            '<div class="mt-user">' +
            '<a href="' +
            c.account.url +
            '" rel="nofollow noopener noreferrer" target="_blank">' +
            // c.account.username +
            '<div class="mt-nick">Charles Chin</div><div class="mt-id">@eallion@e5n.cc</div>' +
            "</a>" +
            '<span class="visually-hidden"> post</span>' +
            "</div>";

        // Date
        date = this.formatDate(c.created_at);

        // Toot ID
        id = c.id;
    }

    // Main text
    let text_css = "";
    if (this.TEXT_MAX_LINES !== "0") {
        text_css = "truncate";
        document.documentElement.style.setProperty(
            "--text-max-lines",
            this.TEXT_MAX_LINES
        );
    }

    if (c.spoiler_text !== "") {
        let originalContent = imgReg(this.formatTootText(c.content));
        content =
            '<div class="toot-text">' +
            c.spoiler_text +
            ' <button type="button" class="spoiler-link" aria-expanded="false">Show more</button>' +
            '<div class="spoiler-text-hidden">' +
            // this.formatTootText(c.content) +
            originalContent +
            "</div>" +
            "</div>";
    } else if (
        c.reblog &&
        c.reblog.content !== "" &&
        c.reblog.spoiler_text !== ""
    ) {
        let originalContent = imgReg(this.formatTootText(c.reblog.content));
        content =
            '<div class="toot-text">' +
            c.reblog.spoiler_text +
            ' <button type="button" class="spoiler-link" aria-expanded="false">Show more</button>' +
            '<div class="spoiler-text-hidden">' +
            // this.formatTootText(c.reblog.content) +
            originalContent +
            "</div>" +
            "</div>";
    } else if (
        c.reblog &&
        c.reblog.content !== "" &&
        c.reblog.spoiler_text === ""
    ) {
        let originalContent = imgReg(this.formatTootText(c.content));
        content =
            '<div class="toot-text' +
            text_css +
            '">' +
            "<div>" +
            // this.formatTootText(c.content) +
            originalContent +
            "</div>" +
            "</div>";
    } else {
        let originalContent = imgReg(this.formatTootText(c.content));
        content =
            '<div class="toot-text' +
            text_css +
            '">' +
            "<div>" +
            // this.formatTootText(c.content) +
            originalContent +
            "</div>" +
            "</div>";
    }

    // Media attachments
    let media = "";
    if (c.media_attachments.length > 0) {
        for (let picid in c.media_attachments) {
            media = this.placeMedias(c.media_attachments[picid], c.sensitive);
        }
    }
    if (c.reblog && c.reblog.media_attachments.length > 0) {
        for (let picid in c.reblog.media_attachments) {
            media = this.placeMedias(
                c.reblog.media_attachments[picid],
                c.reblog.sensitive
            );
        }
    }

    // Preview link
    let preview_link = "";
    if (!this.HIDE_PREVIEW_LINK && c.card) {
        preview_link = this.placePreviewLink(c.card);
    }

    // Poll
    let poll = "";
    let pollOption = "";
    if (c.poll) {
        for (let i in c.poll.options) {
            pollOption += "<li>" + c.poll.options[i].title + "</li>";
        }
        poll = '<div class="toot-poll">' + "<ul>" + pollOption + "</ul>" + "</div>";
    }

    // Date
    const timestamp =
        '<div class="toot-date">' +
        '<a href="' +
        url +
        '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank">' +
        date +
        "</a>" +
        "</div>";

    // Visibility
    let visibilityIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1536"><path fill="currentColor" d="M768 0q209 0 385.5 103T1433 382.5T1536 768t-103 385.5t-279.5 279.5T768 1536t-385.5-103T103 1153.5T0 768t103-385.5T382.5 103T768 0zm274 521q-2 1-9.5 9.5T1019 540q2 0 4.5-5t5-11t3.5-7q6-7 22-15q14-6 52-12q34-8 51 11q-2-2 9.5-13t14.5-12q3-2 15-4.5t15-7.5l2-22q-12 1-17.5-7t-6.5-21q0 2-6 8q0-7-4.5-8t-11.5 1t-9 1q-10-3-15-7.5t-8-16.5t-4-15q-2-5-9.5-11t-9.5-10q-1-2-2.5-5.5t-3-6.5t-4-5.5t-5.5-2.5t-7 5t-7.5 10t-4.5 5q-3-2-6-1.5t-4.5 1t-4.5 3t-5 3.5q-3 2-8.5 3t-8.5 2q15-5-1-11q-10-4-16-3q9-4 7.5-12t-8.5-14h5q-1-4-8.5-8.5T1002 310t-13-6q-8-5-34-9.5t-33-.5q-5 6-4.5 10.5t4 14T925 331q1 6-5.5 13t-6.5 12q0 7 14 15.5t10 21.5q-3 8-16 16t-16 12q-5 8-1.5 18.5T914 456q2 2 1.5 4t-3.5 4.5t-5.5 4t-6.5 3.5l-3 2q-11 5-20.5-6T863 442q-7-25-16-30q-23-8-29 1q-5-13-41-26q-25-9-58-4q6-1 0-15q-7-15-19-12q3-6 4-17.5t1-13.5q3-13 12-23q1-1 7-8.5t9.5-13.5t.5-6q35 4 50-11q5-5 11.5-17t10.5-17q9-6 14-5.5t14.5 5.5t14.5 5q14 1 15.5-11t-7.5-20q12 1 3-17q-4-7-8-9q-12-4-27 5q-8 4 2 8q-1-1-9.5 10.5T801 218t-16-5q-1-1-5.5-13.5T770 186q-8 0-16 15q3-8-11-15t-24-8q19-12-8-27q-7-4-20.5-5t-19.5 4q-5 7-5.5 11.5t5 8T681 175t11.5 4t8.5 3q14 10 8 14q-2 1-8.5 3.5T689 204t-6 4q-3 4 0 14t-2 14q-5-5-9-17.5t-7-16.5q7 9-25 6l-10-1q-4 0-16 2t-20.5 1t-13.5-8q-4-8 0-20q1-4 4-2q-4-3-11-9.5t-10-8.5q-46 15-94 41q6 1 12-1q5-2 13-6.5t10-5.5q34-14 42-7l5-5q14 16 20 25q-7-4-30-1q-20 6-22 12q7 12 5 18q-4-3-11.5-10T498 211t-15-5q-16 0-22 1q-146 80-235 222q7 7 12 8q4 1 5 9t2.5 11t11.5-3q9 8 3 19q1-1 44 27q19 17 21 21q3 11-10 18q-1-2-9-9t-9-4q-3 5 .5 18.5T308 557q-7 0-9.5 16t-2.5 35.5t-1 23.5l2 1q-3 12 5.5 34.5T324 687q-13 3 20 43q6 8 8 9q3 2 12 7.5t15 10t10 10.5q4 5 10 22.5t14 23.5q-2 6 9.5 20t10.5 23q-1 0-2.5 1t-2.5 1q3 7 15.5 14t15.5 13q1 3 2 10t3 11t8 2q2-20-24-62q-15-25-17-29q-3-5-5.5-15.5T421 787q2 0 6 1.5t8.5 3.5t7.5 4t2 3q-3 7 2 17.5t12 18.5t17 19t12 13q6 6 14 19.5t0 13.5q9 0 20 10.5t17 19.5q5 8 8 26t5 24q2 7 8.5 13.5t12.5 9.5l16 8l13 7q5 2 18.5 10.5T642 1040q10 4 16 4t14.5-2.5t13.5-3.5q15-2 29 15t21 21q36 19 55 11q-2 1 .5 7.5t8 15.5t9 14.5t5.5 8.5q5 6 18 15t18 15q6-4 7-9q-3 8 7 20t18 10q14-3 14-32q-31 15-49-18q0-1-2.5-5.5t-4-8.5t-2.5-8.5t0-7.5t5-3q9 0 10-3.5t-2-12.5t-4-13q-1-8-11-20t-12-15q-5 9-16 8t-16-9q0 1-1.5 5.5t-1.5 6.5q-13 0-15-1q1-3 2.5-17.5t3.5-22.5q1-4 5.5-12t7.5-14.5t4-12.5t-4.5-9.5T775 954q-19 1-26 20q-1 3-3 10.5t-5 11.5t-9 7q-7 3-24 2t-24-5q-13-8-22.5-29t-9.5-37q0-10 2.5-26.5t3-25T652 858q3-2 9-9.5t10-10.5q2-1 4.5-1.5t4.5 0t4-1.5t3-6q-1-1-4-3q-3-3-4-3q7 3 28.5-1.5T735 823q15 11 22-2q0-1-2.5-9.5T754 798q5 27 29 9q3 3 15.5 5t17.5 5q3 2 7 5.5t5.5 4.5t5-.5t8.5-6.5q10 14 12 24q11 40 19 44q7 3 11 2t4.5-9.5t0-14T887 854l-1-8v-18l-1-8q-15-3-18.5-12t1.5-18.5t15-18.5q1-1 8-3.5t15.5-6.5t12.5-8q21-19 15-35q7 0 11-9q-1 0-5-3t-7.5-5t-4.5-2q9-5 2-16q5-3 7.5-11t7.5-10q9 12 21 2q8-8 1-16q5-7 20.5-10.5t18.5-9.5q7 2 8-2t1-12t3-12q4-5 15-9t13-5l17-11q3-4 0-4q18 2 31-11q10-11-6-20q3-6-3-9.5t-15-5.5q3-1 11.5-.5t10.5-1.5q15-10-7-16q-17-5-43 12zm-163 877q206-36 351-189q-3-3-12.5-4.5t-12.5-3.5q-18-7-24-8q1-7-2.5-13t-8-9t-12.5-8t-11-7q-2-2-7-6t-7-5.5t-7.5-4.5t-8.5-2t-10 1l-3 1q-3 1-5.5 2.5t-5.5 3t-4 3t0 2.5q-21-17-36-22q-5-1-11-5.5t-10.5-7t-10-1.5t-11.5 7q-5 5-6 15t-2 13q-7-5 0-17.5t2-18.5q-3-6-10.5-4.5t-12 4.5t-11.5 8.5t-9 6.5t-8.5 5.5t-8.5 7.5q-3 4-6 12t-5 11q-2-4-11.5-6.5t-9.5-5.5q2 10 4 35t5 38q7 31-12 48q-27 25-29 40q-4 22 12 26q0 7-8 20.5t-7 21.5q0 6 2 16z"/></svg>'
    let visibility =
        '<div class="toot-visibility" title="公开">' +
        visibilityIcon +
        "</div>";

    // application
    let appFrom =
        '<div class="toot-app">' +
        '<a href="' +
        appWebsite +
        '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank" title="回复" alt="回复">' +
        appName +
        "</a>" +
        "</div>";

    // Reply
    let replyIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M136.309 189.836L312.313 37.851C327.72 24.546 352 35.348 352 56.015v82.763c129.182 10.231 224 52.212 224 183.548c0 61.441-39.582 122.309-83.333 154.132c-13.653 9.931-33.111-2.533-28.077-18.631c38.512-123.162-3.922-169.482-112.59-182.015v84.175c0 20.701-24.3 31.453-39.687 18.164L136.309 226.164c-11.071-9.561-11.086-26.753 0-36.328zm-128 36.328L184.313 378.15C199.7 391.439 224 380.687 224 359.986v-15.818l-108.606-93.785A55.96 55.96 0 0 1 96 207.998a55.953 55.953 0 0 1 19.393-42.38L224 71.832V56.015c0-20.667-24.28-31.469-39.687-18.164L8.309 189.836c-11.086 9.575-11.071 26.767 0 36.328z"/></svg>'
    let reply =
        '<div class="toot-reply">' +
        '<a href="' +
        url +
        '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank" title="回复" alt="回复">' +
        replyIcon +
        "</a>" +
        replies_count +
        "</div>";

    // Favourite
    let favouriteIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2L47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>'
    let favourite =
        '<div class="toot-favourite">' +
        '<a href="' +
        url +
        '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank" title="喜欢" alt="喜欢">' +
        favouriteIcon +
        "</a>" +
        favourites_count +
        "</div>";

    // Retoot
    let retootIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1280"><path fill="currentColor" d="M1280 1248q0 13-9.5 22.5t-22.5 9.5H288q-8 0-13.5-2t-9-7t-5.5-8t-3-11.5t-1-11.5V640H64q-26 0-45-19T0 576q0-24 15-41l320-384q19-22 49-22t49 22l320 384q15 17 15 41q0 26-19 45t-45 19H512v384h576q16 0 25 11l160 192q7 10 7 21zm640-416q0 24-15 41l-320 384q-20 23-49 23t-49-23l-320-384q-15-17-15-41q0-26 19-45t45-19h192V384H832q-16 0-25-12L647 180q-7-9-7-20q0-13 9.5-22.5T672 128h960q8 0 13.5 2t9 7t5.5 8t3 11.5t1 11.5v600h192q26 0 45 19t19 45z"/></svg>'
    let retoot =
        '<div class="toot-retoot">' +
        '<a href="' +
        url +
        '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank" title="转嘟" alt="转嘟">' +
        retootIcon +
        "</a>" +
        reblogs_count +
        "</div>";

    // Bookmarked
    let bookmarkedIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1536"><path fill="currentColor" d="M1164 0q23 0 44 9q33 13 52.5 41t19.5 62v1289q0 34-19.5 62t-52.5 41q-19 8-44 8q-48 0-83-32l-441-424l-441 424q-36 33-83 33q-23 0-44-9q-33-13-52.5-41T0 1401V112q0-34 19.5-62T72 9q21-9 44-9h1048z"/></svg>'
    let bookmarked =
        '<div class="toot-bookmarked">' +
        '<a href="' +
        url +
        '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank" title="添加到书签" alt="添加到书签">' +
        bookmarkedIcon +
        "</a>" +
        "</div>";

    // More button
    let moreIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1408 1280"><path fill="currentColor" d="M384 480v192q0 40-28 68t-68 28H96q-40 0-68-28T0 672V480q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28H608q-40 0-68-28t-28-68V480q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68V480q0-40 28-68t68-28h192q40 0 68 28t28 68z"/></svg>'
    let moreBtn =
        '<div class="toot-more">' +
        '<a href="' +
        url +
        '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank" title="更多" alt="更多">' +
        moreIcon +
        "</a>" +
        "</div>";

    //Emaction
    let emaction =
        '<div class="emaction"><emoji-reaction class="reactions" reactTargetId="e5n_mastodon_' +
        id +
        '" theme="system" endpoint="https://emaction.e5n.cc"></emoji-reaction></div>'

    // Add all to main toot container
    const toot =
        '<article class="mt-toot" aria-posinset="' +
        (i + 1) +
        '" aria-setsize="' +
        this.TOOTS_LIMIT +
        //   '" data-location="' +
        //   url +
        '" tabindex="0">' +
        '<div class="mt-header">' +
        avatar +
        user +
        '</div>' +
        content +
        media +
        poll +
        '<div class="toot-footer">' +
        '<div class="mt-bar">' +
        '<div class="toot-meta">' +
        timestamp +
        visibility +
        appFrom +
        '</div>' +
        reply +
        retoot +
        favourite +
        bookmarked +
        moreBtn +
        '</div>' +
        // emaction +
        '</div></article>';

    return toot;
};

/**
 * Handle text changes made to toots
 * @param {string} c Text content
 * @returns {string} Text content modified
 */
MastodonApi.prototype.formatTootText = function (c) {
    let content = c;

    // Format hashtags and mentions
    content = this.addTarget2hashtagMention(content);

    // Convert emojos shortcode into images
    if (!this.HIDE_EMOJOS) {
        content = this.showEmojos(content, this.FETCHED_DATA.emojos);
    }

    // Convert markdown styles into HTML
    if (this.MARKDOWN_BLOCKQUOTE) {
        content = this.replaceHTMLtag(
            content,
            "<p>&gt;",
            "</p>",
            "<blockquote><p>",
            "</p></blockquote>"
        );
    }

    return content;
};

/**
 * Add target="_blank" to all #hashtags and @mentions in the toot
 * @param {string} c Text content
 * @returns {string} Text content modified
 */
MastodonApi.prototype.addTarget2hashtagMention = function (c) {
    let content = c.replaceAll('rel="tag"', 'rel="tag" target="_blank"');
    content = content.replaceAll(
        'class="u-url mention"',
        'class="u-url mention" target="_blank"'
    );

    return content;
};

/**
 * Find all custom emojis shortcode and replace by image
 * @param {string} c Text content
 * @param {array} e List with all custom emojis
 * @returns {string} Text content modified
 */
MastodonApi.prototype.showEmojos = function (c, e) {
    if (c.includes(":")) {
        for (const emojo of e) {
            const regex = new RegExp(`\\:${emojo.shortcode}\\:`, "g");
            c = c.replace(
                regex,
                `<img src="${emojo.url}" class="custom-emoji" alt="Emoji ${emojo.shortcode}" />`
            );
        }

        return c;
    } else {
        return c;
    }
};

/**
 * Find all start/end <tags> and replace them by another start/end <tags>
 * @param {string} c Text content
 * @param {string} initialTagOpen Start HTML tag to replace
 * @param {string} initialTagClose End HTML tag to replace
 * @param {string} replacedTagOpen New start HTML tag
 * @param {string} replacedTagClose New end HTML tag
 * @returns {string} Text in HTML format
 */
MastodonApi.prototype.replaceHTMLtag = function (
    c,
    initialTagOpen,
    initialTagClose,
    replacedTagOpen,
    replacedTagClose
) {
    if (c.includes(initialTagOpen)) {
        const regex = new RegExp(initialTagOpen + "(.*?)" + initialTagClose, "gi");

        return c.replace(regex, replacedTagOpen + "$1" + replacedTagClose);
    } else {
        return c;
    }
};

/**
 * Place media
 * @param {object} m Media content
 * @param {boolean} s Spoiler/Sensitive status
 * @returns {string} Media in HTML format
 */
MastodonApi.prototype.placeMedias = function (m, s) {
    let spoiler = s || false;
    const pic =
        '<div class="toot-media ' +
        (spoiler ? "toot-media-spoiler" : "") +
        " img-ratio14_7 " +
        this.SPINNER_CLASS +
        '">' +
        (spoiler ? '<button class="spoiler-link">Show content</button>' : "") +
        '<img src="' +
        m.preview_url +
        '" alt="' +
        (m.description ? m.description : "") +
        '" loading="lazy" />' +
        "</div>";

    return pic;
};

/**
 * Place preview link
 * @param {object} c Preview link content
 * @returns {string} Preview link in HTML format
 */
MastodonApi.prototype.placePreviewLink = function (c) {
    let card =
        '<a href="' +
        c.url +
        '" class="toot-preview-link" target="_blank" rel="noopener noreferrer">' +
        (c.image
            ? '<div class="toot-preview-image ' +
            this.SPINNER_CLASS +
            '"><img src="' +
            c.image +
            '" alt="" loading="lazy" /></div>'
            : '<div class="toot-preview-noImage">📄</div>') +
        "</div>" +
        '<div class="toot-preview-content">' +
        (c.provider_name
            ? '<span class="toot-preview-provider">' + c.provider_name + "</span>"
            : "") +
        '<span class="toot-preview-title">' +
        c.title +
        "</span>" +
        (c.author_name
            ? '<span class="toot-preview-author">By ' + c.author_name + "</span>"
            : "") +
        "</div>" +
        "</a>";

    return card;
};

/**
 * Format date
 * @param {string} d Date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
 * @returns {string} Date formated (MM DD, YYYY)
 */
MastodonApi.prototype.formatDate = function (d) {
    // const monthNames = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    // ];

    let date = new Date(d);

    // const displayDate =
    //     monthNames[date.getMonth()] +
    //     " " +
    //     date.getDate() +
    //     ", " +
    //     date.getFullYear();

    // return displayDate;
    let displayDateTwitter = moment(date).twitterLong()

    return displayDateTwitter;
};

/**
 * Add/Remove event listener for loading spinner
 */
MastodonApi.prototype.manageSpinner = function () {
    // Remove CSS class to container and listener to images
    const spinnerCSS = this.SPINNER_CLASS;
    const removeSpinner = function () {
        this.parentNode.classList.remove(spinnerCSS);
        this.removeEventListener("load", removeSpinner);
        this.removeEventListener("error", removeSpinner);
    };

    // Add listener to images
    this.mtBodyContainer
        .querySelectorAll(`.${this.SPINNER_CLASS} > img`)
        .forEach((e) => {
            e.addEventListener("load", removeSpinner);
            e.addEventListener("error", removeSpinner);
        });
};


// 预处理图片
function imgReg(htmlString) {
    const IMG_REG = /(<img[^>]+>)/g
    if (IMG_REG) {
        var parentDiv = '<div class="toot-image-wrapper" view-image>';
        var firstImgIndex = htmlString.indexOf('<img');
        var modifiedHtml = htmlString.slice(0, firstImgIndex) + parentDiv + htmlString.slice(firstImgIndex);
        modifiedHtml = modifiedHtml.replace(/(<img[^>]+>)/g, function (match) {
            return '<div class="toot-images">' + match + '</div>';
        });
        var lastDivIndex = modifiedHtml.lastIndexOf('</div>');
        modifiedHtml = modifiedHtml.slice(0, lastDivIndex) + '</div>'
        return modifiedHtml;
    }
}
