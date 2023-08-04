// Mastodon embed feed timeline v3.7.2
// More info at:
// https://gitlab.com/idotj/mastodon-embed-feed-timeline

// Timeline settings
window.addEventListener("load", () => {
    let mapi = new MastodonApi({
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
        hide_replies: false,

        // Converts Markdown symbol ">" at the beginning of a paragraph into a blockquote HTML tag (default: don't apply)
        markdown_blockquote: false,

        // Limit the text content to a maximum number of lines. Default: 0 (unlimited)
        text_max_lines: "0",

        // Customize the text of the link pointing to the Mastodon page (appears after the last toot)
        link_see_more: "See more posts at e5n gts",
    });
});

let MastodonApi = function (params_) {
    // Endpoint access settings / default values
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
    this.MARKDOWN_BLOCKQUOTE =
        typeof params_.markdown_blockquote !== "undefined"
            ? params_.markdown_blockquote
            : false;
    this.TEXT_MAX_LINES = params_.text_max_lines || "0";
    this.LINK_SEE_MORE = params_.link_see_more;

    // Target selector
    this.mtBodyContainer = document.getElementById(params_.container_body_id);

    // Apply selected appearance
    this.applyTheme();

    // Get the toots
    this.getToots();
};

// Theme style
MastodonApi.prototype.applyTheme = function () {
    const setTheme = function (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    };
    if (this.DEFAULT_THEME === "auto") {
        let systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
        systemTheme.matches ? setTheme("dark") : setTheme("light");
        systemTheme.addEventListener("change", (e) => {
            e.matches ? setTheme("dark") : setTheme("light");
        });
    } else {
        setTheme(this.DEFAULT_THEME);
    }
};

// Listing toots function
MastodonApi.prototype.getToots = function () {
    let mapi = this;
    let requestURL = "";

    // Get request
    if (this.TIMELINE_TYPE === "profile") {
        requestURL = `${this.INSTANCE_URL}/api/v1/accounts/${this.USER_ID}/statuses?limit=${this.TOOTS_LIMIT}`;
    } else if (this.TIMELINE_TYPE === "hashtag") {
        requestURL = `${this.INSTANCE_URL}/api/v1/timelines/tag/${this.HASHTAG_NAME}?limit=${this.TOOTS_LIMIT}`;
    } else if (this.TIMELINE_TYPE === "local") {
        requestURL = `${this.INSTANCE_URL}/api/v1/timelines/public?local=true&limit=${this.TOOTS_LIMIT}`;
    }

    fetch(requestURL, {
        method: "get",
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error("404 Not found", { cause: response });
            } else {
                throw new Error(response.status);
            }
        })
        .then((jsonData) => {
            // console.log("jsonData: ", jsonData);

            // Empty the <div> container
            this.mtBodyContainer.innerHTML = "";

            // Add toots
            for (let i in jsonData) {
                // First filter (Public / Unlisted)
                if (
                    jsonData[i].visibility == "public" ||
                    (!this.HIDE_UNLISTED && jsonData[i].visibility == "unlisted")
                ) {
                    // Second filter (Reblog / Replies)
                    if (
                        (mapi.HIDE_REBLOG && jsonData[i].reblog) ||
                        (mapi.HIDE_REPLIES && jsonData[i].in_reply_to_id)
                    ) {
                        // Nothing here (Don't append toots)
                    } else {
                        // Format and append toots
                        appendToot.call(mapi, jsonData[i], i);
                    }
                }
            }

            // Check if there are toots in the container (due to filters applied)
            if (this.mtBodyContainer.innerHTML === "") {
                this.mtBodyContainer.setAttribute("role", "none");
                this.mtBodyContainer.innerHTML =
                    '<div class="mt-error"><span class="mt-error-icon">📭</span><br/><strong>Sorry, no toots to show</strong><br/><div class="mt-error-message">Got ' +
                    jsonData.length +
                    ' toots from the server but due to the "hide filters" applied, no toot is shown</div></div>';
            } else {
                // Insert link after last toot to visit Mastodon page
                if (mapi.LINK_SEE_MORE) {
                    let linkSeeMorePath = "";
                    if (this.TIMELINE_TYPE === "profile") {
                        linkSeeMorePath = mapi.PROFILE_NAME;
                    } else if (this.TIMELINE_TYPE === "hashtag") {
                        linkSeeMorePath = "tags/" + this.HASHTAG_NAME;
                    } else if (this.TIMELINE_TYPE === "local") {
                        linkSeeMorePath = "public/local";
                    }
                    let linkSeeMore =
                        '<div class="mt-footer"><a href="' +
                        // mapi.INSTANCE_URL +
                        'https://m.eallion.com' +
                        "/" +
                        linkSeeMorePath +
                        '" class="btn" target="_blank" rel="nofollow noopener noreferrer">' +
                        mapi.LINK_SEE_MORE +
                        "</a></div>";
                    this.mtBodyContainer.parentNode.insertAdjacentHTML(
                        "beforeend",
                        linkSeeMore
                    );
                }
            }
        })
        .catch((err) => {
            this.mtBodyContainer.innerHTML =
                '<div class="mt-error"><span class="mt-error-icon">❌</span><br/><strong>Sorry, request failed:</strong><br/><div class="mt-error-message">' +
                err +
                "</div></div>";
            this.mtBodyContainer.setAttribute("role", "none");
        });

    // Inner function to add each toot content in container
    let appendToot = function (status_, index) {
        let avatar, user, content, url, date;

        var twitterIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 2048 2048"><path fill="#1d9bf0" d="m1845 1024l124 155q18 23 28 50t10 57q0 30-9 57t-26 49t-41 38t-52 24l-191 53q2 51 5 103t4 104q0 36-13 67t-37 54t-55 37t-68 14q-31 0-61-11l-185-70l-109 165q-24 37-62 57t-83 21q-44 0-82-20t-63-58l-109-165l-185 70q-30 11-61 11q-36 0-67-13t-55-37t-37-55t-14-67q0-52 3-104t6-103l-191-53q-29-8-52-24t-40-38t-26-49t-10-57q0-29 10-56t28-51l124-155L79 869q-38-47-38-107q0-30 9-57t26-49t40-38t53-24l191-53q-2-51-5-103t-4-104q0-36 13-67t37-54t55-37t68-14q31 0 61 11l185 70L879 78q24-37 62-57t83-21q44 0 82 20t63 58l109 165l185-70q30-11 61-11q36 0 67 13t55 37t37 55t14 67q0 52-3 104t-6 103l191 53q28 8 52 24t40 38t26 49t10 57q0 60-38 107l-124 155zm-949 369l569-568l-114-114l-455 456l-199-200l-114 114l313 312z"/></svg>'

        if (status_.reblog) {
            // BOOSTED toot
            // Toot url
            url = status_.reblog.url;

            // Boosted avatar
            avatar =
                '<a href="' +
                status_.reblog.account.url +
                '" class="mt-avatar mt-avatar-boosted" style="background-image:url(' +
                status_.reblog.account.avatar +
                ');" rel="nofollow noopener noreferrer" target="_blank">' +
                '<div class="mt-avatar mt-avatar-booster" style="background-image:url(' +
                status_.account.avatar +
                ');">' +
                "</div>" +
                '<span class="visually-hidden">' +
                status_.account.username +
                " avatar" +
                "</span>" +
                "</a>";

            // User name and url
            user =
                '<div class="mt-user">' +
                '<a href="' +
                status_.reblog.account.url +
                '" rel="nofollow noopener noreferrer" target="_blank">' +
                // status_.reblog.account.username +
                '<div>Charles Chin</div><div>' + twitterIcon + '</div><div class="mt-id">@eallion · </div>' +
                '<span class="visually-hidden"> post</span>' +
                "</a>" +
                "</div>";

            // Date
            date = this.formatDate(status_.reblog.created_at);
        } else {
            // STANDARD toot
            // Toot url
            url = status_.url;

            // Avatar
            avatar =
                '<a href="' +
                status_.account.url +
                '" class="mt-avatar" style="background-image:url(' +
                status_.account.avatar +
                ');" rel="nofollow noopener noreferrer" target="_blank">' +
                '<span class="visually-hidden">' +
                status_.account.username +
                " avatar" +
                "</span>" +
                "</a>";

            // User name and url
            user =
                '<div class="mt-user">' +
                '<a href="' +
                status_.account.url +
                '" rel="nofollow noopener noreferrer" target="_blank">' +
                // status_.account.username +
                '<div>Charles Chin</div><div>' + twitterIcon + '</div><div class="mt-id">@eallion · </div>' +
                '<span class="visually-hidden"> post</span>' +
                "</a>" +
                "</div>";

            // Date
            date = this.formatDate(status_.created_at);
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

        if (status_.spoiler_text !== "") {
            let originalContent = imgReg(this.formatTootText(status_.content));
            content =
                '<div class="toot-text">' +
                status_.spoiler_text +
                ' <button type="button" class="spoiler-link" aria-expanded="false">Show more</button>' +
                '<div class="spoiler-text-hidden">' +
                // this.formatTootText(status_.content) +
                originalContent +
                "</div>" +
                "</div>";
        } else if (status_.reblog && status_.reblog.content !== "") {
            let originalContent = imgReg(this.formatTootText(status_.reblog.content));
            content =
                '<div class="toot-text ' +
                text_css +
                '">' +
                "<div>" +
                // this.formatTootText(status_.reblog.content) +
                originalContent +
                "</div>" +
                "</div>";
        } else {
            let originalContent = imgReg(this.formatTootText(status_.content));
            content =
                '<div class="toot-text ' +
                text_css +
                '">' +
                "<div>" +
                // this.formatTootText(status_.content) +
                originalContent +
                "</div>" +
                "</div>";
        }

        // Media attachments
        let media = "";
        if (status_.media_attachments.length > 0) {
            for (let picid in status_.media_attachments) {
                media = this.replaceMedias(
                    status_.media_attachments[picid],
                    status_.sensitive
                );
            }
        }
        if (status_.reblog && status_.reblog.media_attachments.length > 0) {
            for (let picid in status_.reblog.media_attachments) {
                media = this.replaceMedias(
                    status_.reblog.media_attachments[picid],
                    status_.sensitive
                );
            }
        }

        // Poll
        let poll = "";
        let pollOption = "";
        if (status_.poll) {
            for (let i in status_.poll.options) {
                pollOption += "<li>" + status_.poll.options[i].title + "</li>";
            }
            poll =
                '<div class="toot-poll">' + "<ul>" + pollOption + "</ul>" + "</div>";
        }

        // Date
        let timestamp =
            '<div class="toot-date">' +
            '<a href="' +
            url +
            '" rel="nofollow noopener noreferrer" tabindex="-1" target="_blank">' +
            date +
            "</a>" +
            "</div>";

        // Add all to main toot container
        let toot =
            '<article class="mt-toot" aria-posinset="' +
            (Number(index) + 1) +
            '" aria-setsize="' +
            this.TOOTS_LIMIT +
            //   '" data-location="' +
            //   url +
            '" tabindex="0">' +
            //   avatar +
            '<div class="mt-meta">' +
            user +
            timestamp +
            '</div>' +
            content +
            media +
            poll +
            "</article>";

        this.mtBodyContainer.insertAdjacentHTML("beforeend", toot);
    };

    // Toot interactions
    this.mtBodyContainer.addEventListener("click", function (e) {
        // Check if clicked in a toot
        if (
            e.target.localName == "article" ||
            e.target.offsetParent.localName == "article" ||
            e.target.localName == "img"
        ) {
            openTootURL(e);
        }
        // Check if clicked in Show More/Less button
        if (
            e.target.localName == "button" &&
            e.target.className == "spoiler-link"
        ) {
            toogleSpoiler(e);
        }
    });
    this.mtBodyContainer.addEventListener("keydown", function (e) {
        // Check if Enter key pressed with focus in an article
        if (event.code === "Enter" && e.target.localName == "article") {
            openTootURL(e);
        }
    });

    // Open Toot in a new page avoiding any other natural link
    let openTootURL = function (e) {
        let urlToot = e.target.closest(".mt-toot").dataset.location;
        if (
            e.target.localName !== "a" &&
            e.target.localName !== "span" &&
            e.target.localName !== "button" &&
            urlToot
        ) {
            window.open(urlToot, "_blank");
        }
    };

    // Spoiler button
    let toogleSpoiler = function (e) {
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

// Handle text changes made to Toots
MastodonApi.prototype.formatTootText = function (c) {
    let content = c;

    // Format hashtags and mentions
    content = this.addTarget2hashtagMention(content);

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

// Add target="_blank" to all #hashtags and @mentions
MastodonApi.prototype.addTarget2hashtagMention = function (c) {
    let content = c.replaceAll('rel="tag"', 'rel="tag" target="_blank"');
    content = content.replaceAll(
        'class="u-url mention"',
        'class="u-url mention" target="_blank"'
    );
    return content;
};

// Find all start/end <tags> and replace them by another start/end <tags>
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

// Place media
MastodonApi.prototype.replaceMedias = function (m, s) {
    let spoiler = s || false;
    let pic =
        '<div class="toot-media ' +
        (spoiler ? "toot-media-spoiler" : "") +
        ' img-ratio14_7 loading-spinner">' +
        (spoiler ? '<button class="spoiler-link">Show content</button>' : "") +
        '<img onload="removeSpinner(this)" onerror="removeSpinner(this)" src="' +
        m.preview_url +
        '" alt="" loading="lazy" />' +
        "</div>";

    return pic;
};

// Format date
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

    // let displayDate =
    //     monthNames[date.getMonth()] +
    //     " " +
    //     date.getDate() +
    //     ", " +
    //     date.getFullYear();

    let displayDateTwitter = moment(date).twitterLong()

    return displayDateTwitter;
};

// Loading spinner
removeSpinner = function (e) {
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
