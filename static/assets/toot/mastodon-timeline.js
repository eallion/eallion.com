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
        instance_url: "https://api.eallion.com/gotosocial",

        // Choose type of toots to show in the timeline: 'local', 'profile', 'hashtag'. Default: local
        timeline_type: "profile",

        // Your user ID on Mastodon instance. Leave empty if you didn't choose 'profile' as type of timeline
        user_id: "01RVAVVGAPXR989VKK1BQV6BFS",

        // Your user name on Mastodon instance. Leave empty if you didn't choose 'profile' as type of timeline
        profile_name: "@eallion",

        // The name of the hashtag. Leave empty if you didn't choose 'hashtag' as type of timeline
        hashtag_name: "",

        // Maximum amount of toots to get. Default: 20
        toots_limit: "20",

        // Hide unlisted toots. Default: don't hide
        hide_unlisted: false,

        // Hide boosted toots. Default: don't hide
        hide_reblog: false,

        // Hide replies toots. Default: don't hide
        hide_replies: true,

        // Hide preview card if toot contains a link, photo or video from a URL. Default: don't hide
        hide_preview_link: false,

        // Hide custom emojis available on the server. Default: don't hide
        hide_emojos: true,

        // Converts Markdown symbol ">" at the beginning of a paragraph into a blockquote HTML tag. Ddefault: don't apply
        markdown_blockquote: false,

        // Limit the text content to a maximum number of lines. Default: 0 (unlimited)
        text_max_lines: "0",

        // Customize the text of the link pointing to the Mastodon page (appears after the last toot)
        link_see_more: "See more posts at Mastodon",
    });
});

/**
 * Set all variables with customized values or use default ones
 * @param {object} params_ User customized values
 * Trigger main function to build the timeline
 */
const MastodonApi = function (params_) {
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

    this.mtBodyContainer = document.getElementById(params_.container_body_id);

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
                this.INSTANCE_URL +
                "/" +
                linkSeeMorePath +
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
            e.target.localName == "img"
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
    let avatar, user, content, url, date, id, replies_count, reblogs_count, favourites_count;

    if (c.reblog) {
        // BOOSTED toot
        // Toot url
        url = c.reblog.url;

        // Boosted avatar
        avatar =
            '<a href="' +
            c.reblog.account.url +
            '" class="mt-avatar mt-avatar-boosted" style="background-image:url(' +
            c.reblog.account.avatar +
            ');" rel="nofollow noopener noreferrer" target="_blank">' +
            '<div class="mt-avatar mt-avatar-booster" style="background-image:url(' +
            c.account.avatar +
            ');">' +
            "</div>" +
            '<span class="visually-hidden">' +
            c.account.username +
            " avatar" +
            "</span>" +
            "</a>";

        // User name and url
        user =
            '<div class="mt-user">' +
            '<a href="' +
            c.reblog.account.url +
            '" rel="nofollow noopener noreferrer" target="_blank">' +
            // c.reblog.account.username +
            '<div class="mt-nick">Charles Chin</div><div class="mt-id">@eallion@eallion.com</div>' +
            '<span class="visually-hidden"> post</span>' +
            "</a>" +
            "</div>";

        // Date
        date = this.formatDate(c.reblog.created_at);
    } else {
        // STANDARD toot
        // Toot url
        url = c.url;

        replies_count = c.replies_count;
        favourites_count = c.favourites_count
        reblogs_count = c.reblogs_count

        // Avatar
        avatar =
            '<a href="' +
            c.account.url +
            '" class="mt-avatar" style="background-image:url(' +
            c.account.avatar +
            ');" rel="nofollow noopener noreferrer" target="_blank">' +
            '<span class="visually-hidden">' +
            c.account.username +
            " avatar" +
            "</span>" +
            "</a>";

        // User name and url
        user =
            '<div class="mt-user">' +
            '<a href="' +
            c.account.url +
            '" rel="nofollow noopener noreferrer" target="_blank">' +
            // c.account.username +
            '<div class="mt-nick">Charles Chin</div><div class="mt-id">@eallion@eallion.com</div>' +
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
            '<div class="toot-text ' +
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
            '<div class="toot-text ' +
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

    //Emaction
    let emaction =
        '<div class="emaction"><emoji-reaction class="reactions" reactTargetId="e5n_gts_' +
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
        timestamp +
        '<div class="mt-meta">' +
        reply +
        retoot +
        favourite +
        '</div>' +
        emaction +
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
            "</blockquote></p>"
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
        ' img-ratio14_7 loading-spinner">' +
        (spoiler ? '<button class="spoiler-link">Show content</button>' : "") +
        '<img onload="removeSpinner(this)" onerror="removeSpinner(this)" src="' +
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
            ? '<div class="toot-preview-image"><img onload="removeSpinner(this)" onerror="removeSpinner(this)" src="' +
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
 * Loading spinner
 * @param {object} e Image containing the spinner
 */
const removeSpinner = function (e) {
    const spinnerCSS = "loading-spinner";

    // Find closest parent container (1st, 2nd or 3rd level)
    let spinnerContainer = e.closest("." + spinnerCSS);

    if (spinnerContainer) {
        spinnerContainer.classList.remove(spinnerCSS);
    }
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
