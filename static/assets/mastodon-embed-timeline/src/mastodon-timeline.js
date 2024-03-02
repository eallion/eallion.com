/**
 * Mastodon embed timeline
 * @author idotj
 * @version 4.3.3
 * @url https://gitlab.com/idotj/mastodon-embed-timeline
 * @license GNU AGPLv3
 */
"use strict";

export class Init {
  constructor(customSettings = {}) {
    this.defaultSettings = {
      mtContainerId: "mt-container",
      instanceUrl: "https://mastodon.social",
      timelineType: "local",
      userId: "",
      profileName: "",
      hashtagName: "",
      spinnerClass: "mt-loading-spinner",
      defaultTheme: "auto",
      maxNbPostFetch: "20",
      maxNbPostShow: "20",
      dateLocale: "en-GB",
      dateOptions: {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
      hideUnlisted: false,
      hideReblog: false,
      hideReplies: false,
      hidePinnedPosts: false,
      hideUserAccount: false,
      hideEmojos: false,
      hideVideoPreview: false,
      hidePreviewLink: false,
      hideCounterBar: false,
      markdownBlockquote: false,
      txtMaxLines: "0",
      btnShowMore: "SHOW MORE",
      btnShowLess: "SHOW LESS",
      btnShowContent: "SHOW CONTENT",
      btnSeeMore: "See more posts at Mastodon",
      btnReload: "Refresh",
      insistSearchContainer: false,
      insistSearchContainerTime: "3000",
    };

    this.mtSettings = { ...this.defaultSettings, ...customSettings };

    this.mtContainerNode = "";
    this.mtBodyNode = "";
    this.fetchedData = {};

    this.#onDOMContentLoaded(() => {
      this.#getContainerNode();
    });
  }

  /**
   * Trigger callback when DOM loaded or completed
   * @param {function} c Callback executed
   */
  #onDOMContentLoaded(c) {
    if (typeof document !== "undefined" && document.readyState === "complete") {
      c();
    } else if (
      typeof document !== "undefined" &&
      document.readyState !== "complete"
    ) {
      document.addEventListener("DOMContentLoaded", c());
    }
  }

  /**
   * Find main container in DOM before building the timeline
   */
  #getContainerNode() {
    // console.log("Initializing Mastodon timeline with settings: ", this.mtSettings);

    const assignContainerNode = () => {
      this.mtContainerNode = document.getElementById(
        this.mtSettings.mtContainerId
      );
      this.mtBodyNode =
        this.mtContainerNode.getElementsByClassName("mt-body")[0];
      this.#loadColorTheme();
      this.#buildTimeline("newTimeline");
    };

    // Some frameworks render the DOM in deferred way and need some extra time
    if (this.mtSettings.insistSearchContainer) {
      const startCheck = performance.now();
      const findContainerNode = () => {
        // Check if the container is ready in DOM
        if (document.getElementById(this.mtSettings.mtContainerId)) {
          assignContainerNode();
        } else {
          // If the container is not found, check again
          const currentCheck = performance.now();
          if (
            currentCheck - startCheck <
            this.mtSettings.insistSearchContainerTime
          ) {
            requestAnimationFrame(findContainerNode);
          } else {
            console.error(
              `Impossible to find the <div> container with id: "${
                this.mtSettings.mtContainerId
              }" after several attempts for ${
                this.mtSettings.insistSearchContainerTime / 1000
              } seconds`
            );
          }
        }
      };
      findContainerNode();
    } else {
      if (document.getElementById(this.mtSettings.mtContainerId)) {
        assignContainerNode();
      } else {
        console.error(
          `Impossible to find the <div> container with id: "${this.mtSettings.mtContainerId}". Please try to add the option 'insistSearchContainer: true' when initializing the script`
        );
      }
    }
  }

  /**
   * Reload the timeline by fetching the lastest posts
   */
  mtUpdate() {
    this.#onDOMContentLoaded(() => {
      this.mtBodyNode.replaceChildren();
      this.mtBodyNode.insertAdjacentHTML(
        "afterbegin",
        '<div class="mt-loading-spinner"></div>'
      );
      this.#buildTimeline("updateTimeline");
    });
  }

  /**
   * Apply the color theme in the timeline
   * @param {string} themeType Type of color theme
   */
  mtColorTheme(themeType) {
    this.#onDOMContentLoaded(() => {
      this.mtContainerNode.setAttribute("data-theme", themeType);
    });
  }

  /**
   * Get the theme style chosen by the user or by the browser/OS
   */
  #loadColorTheme() {
    if (this.mtSettings.defaultTheme === "auto") {
      let systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      systemTheme.matches
        ? this.mtColorTheme("dark")
        : this.mtColorTheme("light");
      // Update the theme if user change browser/OS preference
      systemTheme.addEventListener("change", (e) => {
        e.matches ? this.mtColorTheme("dark") : this.mtColorTheme("light");
      });
    } else {
      this.mtColorTheme(this.mtSettings.defaultTheme);
    }
  }

  /**
   * Requests to the server to collect all the data
   * @returns {object} Data container
   */
  #fetchTimelineData() {
    return new Promise((resolve, reject) => {
      /**
       * Fetch data from server
       * @param {string} url address to fetch
       * @returns {array} List of objects
       */
      async function fetchData(url) {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch the following Url: <br>" +
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

      // Urls to fetch
      let urls = {};

      if (this.mtSettings.instanceUrl) {
        if (this.mtSettings.timelineType === "profile") {
          if (this.mtSettings.userId) {
            urls.timeline = `${this.mtSettings.instanceUrl}/api/v1/accounts/${this.mtSettings.userId}/statuses?limit=${this.mtSettings.maxNbPostFetch}`;
            if (!this.mtSettings.hidePinnedPosts) {
              urls.pinned = `${this.mtSettings.instanceUrl}/api/v1/accounts/${this.mtSettings.userId}/statuses?pinned=true`;
            }
          } else {
            this.#showError(
              "Please check your <strong>userId</strong> value",
              "⚠️"
            );
          }
        } else if (this.mtSettings.timelineType === "hashtag") {
          if (this.mtSettings.hashtagName) {
            urls.timeline = `${this.mtSettings.instanceUrl}/api/v1/timelines/tag/${this.mtSettings.hashtagName}?limit=${this.mtSettings.maxNbPostFetch}`;
          } else {
            this.#showError(
              "Please check your <strong>hashtagName</strong> value",
              "⚠️"
            );
          }
        } else if (this.mtSettings.timelineType === "local") {
          urls.timeline = `${this.mtSettings.instanceUrl}/api/v1/timelines/public?local=true&limit=${this.mtSettings.maxNbPostFetch}`;
        } else {
          this.#showError(
            "Please check your <strong>timelineType</strong> value",
            "⚠️"
          );
        }
      } else {
        this.#showError(
          "Please check your <strong>instanceUrl</strong> value",
          "⚠️"
        );
      }
      if (!this.mtSettings.hideEmojos) {
        urls.emojos = this.mtSettings.instanceUrl + "/api/v1/custom_emojis";
      }

      const urlsPromises = Object.entries(urls).map(([key, url]) => {
        return fetchData(url)
          .then((data) => ({ [key]: data }))
          .catch((error) => {
            reject(
              new Error("Something went wrong fetching data from: " + url)
            );
            this.#showError(error.message);
            return { [key]: [] };
          });
      });

      // Fetch all urls simultaneously
      Promise.all(urlsPromises).then((dataObjects) => {
        this.fetchedData = dataObjects.reduce((result, dataItem) => {
          return { ...result, ...dataItem };
        }, {});

        // console.log("Mastodon timeline data fetched: ", this.fetchedData);
        resolve();
      });
    });
  }

  /**
   * Filter all fetched posts and append them on the timeline
   * @param {string} t Type of build (new or reload)
   */
  async #buildTimeline(t) {
    await this.#fetchTimelineData();

    // Merge pinned posts with timeline posts
    let posts;
    if (
      !this.mtSettings.hidePinnedPosts &&
      this.fetchedData.pinned?.length !== undefined &&
      this.fetchedData.pinned.length !== 0
    ) {
      const pinnedPosts = this.fetchedData.pinned.map((obj) => ({
        ...obj,
        pinned: true,
      }));
      posts = [...pinnedPosts, ...this.fetchedData.timeline];
    } else {
      posts = this.fetchedData.timeline;
    }

    // Empty container body
    this.mtBodyNode.replaceChildren();

    // Set posts counter to 0
    let nbPostShow = 0;

    for (let i in posts) {
      // First filter (Public / Unlisted)
      if (
        posts[i].visibility == "public" ||
        (!this.mtSettings.hideUnlisted && posts[i].visibility == "unlisted")
      ) {
        // Second filter (Reblog / Replies)
        if (
          (this.mtSettings.hideReblog && posts[i].reblog) ||
          (this.mtSettings.hideReplies && posts[i].in_reply_to_id)
        ) {
          // Nothing here (Don't append posts)
        } else {
          if (nbPostShow < this.mtSettings.maxNbPostShow) {
            this.#appendPost(posts[i], Number(i));
            nbPostShow++;
          } else {
            // Nothing here (Reached the limit of maximum number of posts to show)
          }
        }
      }
    }

    // If there are no posts to display, show an error message
    if (this.mtBodyNode.innerHTML === "") {
      const errorMessage =
        "No posts to show <hr/>" +
        (posts?.length || 0) +
        " posts have been fetched from the server <hr/>This may be due to an incorrect configuration in the parameters or to filters applied (to hide certains type of posts)";
      this.#showError(errorMessage, "📭");
    } else {
      if (t === "newTimeline") {
        this.#manageSpinner();
        this.#setPostsInteracion();
        this.#buildFooter();
      } else if (t === "updateTimeline") {
        this.#manageSpinner();
      } else {
        this.#showError("The function buildTimeline() was expecting a param");
      }
    }
  }

  /**
   * Add each post in the timeline container
   * @param {object} c Post content
   * @param {number} i Index of post
   */
  #appendPost(c, i) {
    this.mtBodyNode.insertAdjacentHTML("beforeend", this.#assamblePost(c, i));
  }

  /**
   * Build post structure
   * @param {object} c Post content
   * @param {number} i Index of post
   */
  #assamblePost(c, i) {
    let avatar,
      user,
      userName,
      accountName,
      url,
      date,
      formattedDate,
      favoritesCount,
      reblogCount,
      repliesCount;

    if (c.reblog) {
      // BOOSTED post
      // Post url
      url = c.reblog.url;

      // Boosted avatar
      avatar =
        '<a href="' +
        c.reblog.account.url +
        '" class="mt-post-avatar" rel="nofollow noopener noreferrer" target="_blank">' +
        '<div class="mt-post-avatar-boosted">' +
        '<div class="mt-post-avatar-image-big mt-loading-spinner">' +
        '<img src="' +
        c.reblog.account.avatar +
        '" alt="' +
        this.#escapeHtml(c.reblog.account.username) +
        ' avatar" loading="lazy" />' +
        "</div>" +
        '<div class="mt-post-avatar-image-small">' +
        '<img src="' +
        c.account.avatar +
        '" alt="' +
        this.#escapeHtml(c.account.username) +
        ' avatar" loading="lazy" />' +
        "</div>" +
        "</div>" +
        "</a>";

      // User name and url
      if (!this.mtSettings.hideEmojos && c.reblog.account.display_name) {
        userName = this.#shortcode2Emojos(
          c.reblog.account.display_name,
          c.reblog.account.emojis
        );
      } else {
        userName = c.reblog.account.display_name ? c.reblog.account.display_name : c.reblog.account.username;
      }

      if (!this.mtSettings.hideUserAccount) {
        accountName =
          '<br/><span class="mt-post-header-user-account">@' +
          c.reblog.account.username +
          "@" +
          new URL(c.reblog.account.url).hostname +
          "</span>";
      } else {
        accountName = "";
      }

      user =
        '<div class="mt-post-header-user">' +
        '<a href="' +
        c.reblog.account.url +
        '" rel="nofollow noopener noreferrer" target="_blank"><bdi class="mt-post-header-user-name">' +
        userName +
        "</bdi>" +
        accountName +
        "</a>" +
        "</div>";

      // Date
      date = c.reblog.created_at;

      // Counter bar
      repliesCount = c.reblog.replies_count;
      reblogCount = c.reblog.reblogs_count;
      favoritesCount = c.reblog.favourites_count;
    } else {
      // STANDARD post
      // Post url
      url = c.url;

      // Avatar
      avatar =
        '<a href="' +
        c.account.url +
        '" class="mt-post-avatar" rel="nofollow noopener noreferrer" target="_blank">' +
        '<div class="mt-post-avatar-standard">' +
        '<div class="mt-post-avatar-image-big mt-loading-spinner">' +
        '<img src="' +
        c.account.avatar +
        '" alt="' +
        this.#escapeHtml(c.account.username) +
        ' avatar" loading="lazy" />' +
        "</div>" +
        "</div>" +
        "</a>";

      // User name and url
      if (!this.mtSettings.hideEmojos && c.account.display_name) {
        userName = this.#shortcode2Emojos(
          c.account.display_name,
          c.account.emojis
        );
      } else {
        userName = c.account.display_name ? c.account.display_name : c.account.username;
      }

      if (!this.mtSettings.hideUserAccount) {
        accountName =
          '<br/><span class="mt-post-header-user-account">@' +
          c.account.username +
          "@" +
          new URL(c.account.url).hostname +
          "</span>";
      } else {
        accountName = "";
      }

      user =
        '<div class="mt-post-header-user">' +
        '<a href="' +
        c.account.url +
        '" rel="nofollow noopener noreferrer" target="_blank"><bdi class="mt-post-header-user-name">' +
        userName +
        "</bdi>" +
        accountName +
        "</a>" +
        "</div>";

      // Date
      date = c.created_at;

      // Counter bar
      repliesCount = c.replies_count;
      reblogCount = c.reblogs_count;
      favoritesCount = c.favourites_count;
    }

    // Date
    formattedDate = this.#formatDate(date);
    const timestamp =
      '<div class="mt-post-header-date">' +
      (c.pinned
        ? '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" class="mt-post-pinned" aria-hidden="true"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"></path></svg>'
        : "") +
      '<a href="' +
      url +
      '" rel="nofollow noopener noreferrer" target="_blank">' +
      '<time datetime="' +
      date +
      '">' +
      formattedDate +
      "</time>" +
      (c.edited_at ? " *" : "") +
      "</a>" +
      "</div>";

    // Main text
    let txtCss = "";
    if (this.mtSettings.txtMaxLines !== "0") {
      txtCss = " truncate";
      this.mtBodyNode.parentNode.style.setProperty(
        "--mt-txt-max-lines",
        this.mtSettings.txtMaxLines
      );
    }

    let content = "";
    if (c.spoiler_text !== "") {
      content =
        '<div class="mt-post-txt">' +
        c.spoiler_text +
        ' <button type="button" class="mt-btn-dark mt-btn-spoiler" aria-expanded="false">' +
        this.mtSettings.btnShowMore +
        "</button>" +
        '<div class="spoiler-txt-hidden">' +
        this.#formatPostText(c.content) +
        "</div>" +
        "</div>";
    } else if (
      c.reblog &&
      c.reblog.content !== "" &&
      c.reblog.spoiler_text !== ""
    ) {
      content =
        '<div class="mt-post-txt">' +
        c.reblog.spoiler_text +
        ' <button type="button" class="mt-btn-dark mt-btn-spoiler" aria-expanded="false">' +
        this.mtSettings.btnShowMore +
        "</button>" +
        '<div class="spoiler-txt-hidden">' +
        this.#formatPostText(c.reblog.content) +
        "</div>" +
        "</div>";
    } else if (
      c.reblog &&
      c.reblog.content !== "" &&
      c.reblog.spoiler_text === ""
    ) {
      content =
        '<div class="mt-post-txt' +
        txtCss +
        '">' +
        '<div class="mt-post-txt-wrapper">' +
        this.#formatPostText(c.reblog.content) +
        "</div>" +
        "</div>";
    } else {
      content =
        '<div class="mt-post-txt' +
        txtCss +
        '">' +
        '<div class="mt-post-txt-wrapper">' +
        this.#formatPostText(c.content) +
        "</div>" +
        "</div>";
    }

    // Media attachments
    let media = [];
    if (c.media_attachments.length > 0) {
      for (let i in c.media_attachments) {
        media.push(this.#createMedia(c.media_attachments[i], c.sensitive));
      }
    }
    if (c.reblog && c.reblog.media_attachments.length > 0) {
      for (let i in c.reblog.media_attachments) {
        media.push(
          this.#createMedia(c.reblog.media_attachments[i], c.reblog.sensitive)
        );
      }
    }

    // Preview link
    let previewLink = "";
    if (!this.mtSettings.hidePreviewLink && c.card) {
      previewLink = this.#createPreviewLink(c.card);
    }

    // Poll
    let poll = "";
    if (c.poll) {
      let pollOption = "";
      for (let i in c.poll.options) {
        pollOption += "<li>" + c.poll.options[i].title + "</li>";
      }
      poll =
        '<div class="mt-post-poll ' +
        (c.poll.expired ? "mt-post-poll-expired" : "") +
        '">' +
        "<ul>" +
        pollOption +
        "</ul>" +
        "</div>";
    }

    // Counter bar
    let counterBar = "";
    if (!this.mtSettings.hideCounterBar) {
      const repliesTag =
        '<div class="mt-post-counter-bar-replies">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" aria-hidden="true"><path d="M774.913-185.869V-356q0-56.609-35.891-92.5-35.892-35.891-92.5-35.891H258.045L411.435-331l-56 56.566L105.869-524l249.566-249.566 56 56.566-153.39 153.391h388.477q88.957 0 148.566 59.609 59.608 59.609 59.608 148v170.131h-79.783Z"></path></svg>' +
        repliesCount +
        "</div>";

      const reblogTag =
        '<div class="mt-post-counter-bar-reblog">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" aria-hidden="true"><path d="M276.043-65.304 105.869-236.043l170.174-170.175 52.74 54.175-78.652 78.652h449.304v-160h75.261v235.261H250.131l78.652 78.087-52.74 54.74Zm-90.174-457.348v-235.261h524.565L631.782-836l52.74-54.74L854.696-720 684.522-549.26 631.782-604l78.652-78.652H261.13v160h-75.261Z"></path></svg>' +
        reblogCount +
        "</div>";

      const favoritesTag =
        '<div class="mt-post-counter-bar-favorites">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" aria-hidden="true"><path d="m330.955-216.328 149.066-89 149.066 90.023-40.305-168.391 131.217-114.347-172.956-14.87L480-671.869l-67.043 158.521-172.956 14.305 131.427 113.796-40.473 168.919ZM212.086-50.608l70.652-305.305L45.52-561.305l312.645-26.579L480-876.176l121.835 288.292 312.645 26.579-237.218 205.392 71.217 305.306L480-213.173 212.086-50.607ZM480-433.87Z"></path></svg>' +
        favoritesCount +
        "</div>";

      counterBar =
        '<div class="mt-post-counter-bar">' +
        repliesTag +
        reblogTag +
        favoritesTag +
        "</div>";
    }

    // Add all to main post container
    const post =
      '<article class="mt-post" aria-posinset="' +
      (i + 1) +
      '" aria-setsize="' +
      this.mtSettings.maxNbPostFetch +
      '" data-location="' +
      url +
      '" tabindex="0">' +
      '<div class="mt-post-header">' +
      avatar +
      user +
      timestamp +
      "</div>" +
      content +
      media.join("") +
      previewLink +
      poll +
      counterBar +
      "</article>";

    return post;
  }

  /**
   * Handle text changes made to posts
   * @param {string} c Text content
   * @returns {string} Text content modified
   */
  #formatPostText(c) {
    let content = c;

    // Format hashtags and mentions
    content = this.#addTarget2hashtagMention(content);

    // Convert emojos shortcode into images
    if (!this.mtSettings.hideEmojos) {
      content = this.#shortcode2Emojos(content, this.fetchedData.emojos);
    }

    // Convert markdown styles into HTML
    if (this.mtSettings.markdownBlockquote) {
      content = this.#replaceHTMLtag(
        content,
        "<p>&gt;",
        "</p>",
        "<blockquote><p>",
        "</p></blockquote>"
      );
    }

    return content;
  }

  /**
   * Add target="_blank" to all #hashtags and @mentions in the post
   * @param {string} c Text content
   * @returns {string} Text content modified
   */
  #addTarget2hashtagMention(c) {
    let content = c.replaceAll('rel="tag"', 'rel="tag" target="_blank"');
    content = content.replaceAll(
      'class="u-url mention"',
      'class="u-url mention" target="_blank"'
    );

    return content;
  }

  /**
   * Find all start/end <tags> and replace them by another start/end <tags>
   * @param {string} c Text content
   * @param {string} initialTagOpen Start HTML tag to replace
   * @param {string} initialTagClose End HTML tag to replace
   * @param {string} replacedTagOpen New start HTML tag
   * @param {string} replacedTagClose New end HTML tag
   * @returns {string} Text in HTML format
   */
  #replaceHTMLtag(
    c,
    initialTagOpen,
    initialTagClose,
    replacedTagOpen,
    replacedTagClose
  ) {
    if (c.includes(initialTagOpen)) {
      const regex = new RegExp(
        initialTagOpen + "(.*?)" + initialTagClose,
        "gi"
      );

      return c.replace(regex, replacedTagOpen + "$1" + replacedTagClose);
    } else {
      return c;
    }
  }

  /**
   * Escape quotes and other special characters, to make them safe to add
   * to HTML content and attributes as plain text
   * @param {string} s String
   * @returns {string} String
   */
  #escapeHtml(s) {
    return (s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /**
   * Find all custom emojis shortcode and replace by image
   * @param {string} c Text content
   * @param {array} e List with all custom emojis
   * @returns {string} Text content modified
   */
  #shortcode2Emojos(c, e) {
    if (c.includes(":")) {
      for (const emojo of e) {
        const regex = new RegExp(`\\:${emojo.shortcode}\\:`, "g");
        c = c.replace(
          regex,
          `<img src="${emojo.url}" class="mt-custom-emoji" alt="Emoji ${emojo.shortcode}" />`
        );
      }

      return c;
    } else {
      return c;
    }
  }

  /**
   * Format date
   * @param {string} d Date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
   * @returns {string} Date formated
   */
  #formatDate(d) {
    const originalDate = new Date(d);

    const formattedDate = new Intl.DateTimeFormat(
      this.mtSettings.dateLocale,
      this.mtSettings.dateOptions
    ).format(originalDate);

    return formattedDate;
  }

  /**
   * Create media element
   * @param {object} m Media content
   * @param {boolean} s Spoiler/Sensitive status
   * @returns {string} Media in HTML format
   */
  #createMedia(m, s) {
    const spoiler = s || false;
    const type = m.type;
    let media = "";

    if (type === "image") {
      media =
        '<div class="mt-post-media ' +
        (spoiler ? "mt-post-media-spoiler " : "") +
        this.mtSettings.spinnerClass +
        '" style="padding-top: calc(100%/' +
        m.meta.small.aspect +
        ')">' +
        (spoiler
          ? '<button class="mt-btn-dark mt-btn-spoiler">' +
            this.mtSettings.btnShowContent +
            "</button>"
          : "") +
        '<img src="' +
        m.preview_url +
        '" alt="' +
        (m.description ? this.#escapeHtml(m.description) : "") +
        '" loading="lazy" />' +
        "</div>";
    }

    if (type === "audio") {
      if (m.preview_url) {
        media =
          '<div class="mt-post-media ' +
          (spoiler ? "mt-post-media-spoiler " : "") +
          this.mtSettings.spinnerClass +
          '" style="padding-top: calc(100%/' +
          m.meta.small.aspect +
          ')">' +
          (spoiler
            ? '<button class="mt-btn-dark mt-btn-spoiler">' +
              this.mtSettings.btnShowContent +
              "</button>"
            : "") +
          '<audio controls src="' +
          m.url +
          '"></audio>' +
          '<img src="' +
          m.preview_url +
          '" alt="' +
          (m.description ? this.#escapeHtml(m.description) : "") +
          '" loading="lazy" />' +
          "</div>";
      } else {
        media =
          '<div class="mt-post-media ' +
          (spoiler ? "mt-post-media-spoiler " : "") +
          '">' +
          (spoiler
            ? '<button class="mt-btn-dark mt-btn-spoiler">' +
              this.mtSettings.btnShowContent +
              "</button>"
            : "") +
          '<audio controls src="' +
          m.url +
          '"></audio>' +
          "</div>";
      }
    }

    if (type === "video" || type === "gifv") {
      if (!this.mtSettings.hideVideoPreview) {
        media =
          '<div class="mt-post-media ' +
          (spoiler ? "mt-post-media-spoiler " : "") +
          this.mtSettings.spinnerClass +
          '" data-video-url="' +
          m.url +
          '" style="padding-top: calc(100%/' +
          m.meta.small.aspect +
          ')">' +
          (spoiler
            ? '<button class="mt-btn-dark mt-btn-spoiler">' +
              this.mtSettings.btnShowContent +
              "</button>"
            : "") +
          '<img src="' +
          m.preview_url +
          '" alt="' +
          (m.description ? this.#escapeHtml(m.description) : "") +
          '" loading="lazy" />' +
          '<button class="mt-post-media-play-icon" title="Load video"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14"><path d="M9.5 7l-9 6.3V.7z"/></svg></button>' +
          "</div>";
      } else {
        media =
          '<div class="mt-post-media ' +
          (spoiler ? "mt-post-media-spoiler " : "") +
          '" style="padding-top: calc(100%/' +
          m.meta.small.aspect +
          ')">' +
          (spoiler
            ? '<button class="mt-btn-dark mt-btn-spoiler">' +
              this.mtSettings.btnShowContent +
              "</button>"
            : "") +
          '<video controls src="' +
          m.url +
          '"></video>' +
          "</div>";
      }
    }

    return media;
  }

  /**
   * Replace the video preview image by the video player
   * @param {event} e User interaction trigger
   */
  #loadPostVideo(e) {
    const parentNode = e.target.closest("[data-video-url]");
    const videoUrl = parentNode.dataset.videoUrl;
    parentNode.replaceChildren();
    parentNode.innerHTML =
      '<video controls src="' + videoUrl + '" autoplay></video>';
  }

  /**
   * Spoiler button
   * @param {event} e User interaction trigger
   */
  #toogleSpoiler(e) {
    const nextSibling = e.target.nextSibling;
    if (
      nextSibling.localName === "img" ||
      nextSibling.localName === "audio" ||
      nextSibling.localName === "video"
    ) {
      e.target.parentNode.classList.remove("mt-post-media-spoiler");
      e.target.style.display = "none";
    } else if (
      nextSibling.classList.contains("spoiler-txt-hidden") ||
      nextSibling.classList.contains("spoiler-txt-visible")
    ) {
      if (e.target.textContent == this.mtSettings.btnShowMore) {
        nextSibling.classList.remove("spoiler-txt-hidden");
        nextSibling.classList.add("spoiler-txt-visible");
        e.target.setAttribute("aria-expanded", "true");
        e.target.textContent = this.mtSettings.btnShowLess;
      } else {
        nextSibling.classList.remove("spoiler-txt-visible");
        nextSibling.classList.add("spoiler-txt-hidden");
        e.target.setAttribute("aria-expanded", "false");
        e.target.textContent = this.mtSettings.btnShowMore;
      }
    }
  }

  /**
   * Create preview link
   * @param {object} c Preview link content
   * @returns {string} Preview link in HTML format
   */
  #createPreviewLink(c) {
    const card =
      '<a href="' +
      c.url +
      '" class="mt-post-preview" target="_blank" rel="noopener noreferrer">' +
      (c.image
        ? '<div class="mt-post-preview-image ' +
          this.mtSettings.spinnerClass +
          '"><img src="' +
          c.image +
          '" alt="' +
          this.#escapeHtml(c.image_description) +
          '" loading="lazy" /></div>'
        : '<div class="mt-post-preview-noImage">📄</div>') +
      "</div>" +
      '<div class="mt-post-preview-content">' +
      (c.provider_name
        ? '<span class="mt-post-preview-provider">' +
          this.#parseHTMLstring(c.provider_name) +
          "</span>"
        : "") +
      '<span class="mt-post-preview-title">' +
      c.title +
      "</span>" +
      (c.author_name
        ? '<span class="mt-post-preview-author">' +
          this.#parseHTMLstring(c.author_name) +
          "</span>"
        : "") +
      "</div>" +
      "</a>";

    return card;
  }

  /**
   * Parse HTML string
   * @param {string} s HTML string
   * @returns {string} Plain text
   */
  #parseHTMLstring(s) {
    const parser = new DOMParser();
    const txt = parser.parseFromString(s, "text/html");
    return txt.body.textContent;
  }

  /**
   * Build footer after last post
   */
  #buildFooter() {
    if (this.mtSettings.btnSeeMore || this.mtSettings.btnReload) {
      // Add footer container
      this.mtBodyNode.parentNode.insertAdjacentHTML(
        "beforeend",
        '<div class="mt-footer"></div>'
      );

      const containerFooter =
        this.mtContainerNode.getElementsByClassName("mt-footer")[0];

      // Create button to open Mastodon page
      if (this.mtSettings.btnSeeMore) {
        let btnSeeMorePath = "";
        if (this.mtSettings.timelineType === "profile") {
          if (this.mtSettings.profileName) {
            btnSeeMorePath = this.mtSettings.profileName;
          } else {
            this.#showError(
              "Please check your <strong>profileName</strong> value",
              "⚠️"
            );
          }
        } else if (this.mtSettings.timelineType === "hashtag") {
          btnSeeMorePath = "tags/" + this.mtSettings.hashtagName;
        } else if (this.mtSettings.timelineType === "local") {
          btnSeeMorePath = "public/local";
        }
        const btnSeeMoreHTML =
          '<a class="mt-btn-violet btn-see-more" href="' +
          this.mtSettings.instanceUrl +
          "/" +
          this.#escapeHtml(btnSeeMorePath) +
          '" rel="nofollow noopener noreferrer" target="_blank">' +
          this.mtSettings.btnSeeMore +
          "</a>";

        containerFooter.insertAdjacentHTML("beforeend", btnSeeMoreHTML);
      }

      // Create button to refresh the timeline
      if (this.mtSettings.btnReload) {
        const btnReloadHTML =
          '<button class="mt-btn-violet btn-refresh">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 3v5m0 0h-5m5 0l-3-2.708C16.408 3.867 14.305 3 12 3a9 9 0 1 0 0 18c4.283 0 7.868-2.992 8.777-7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          this.mtSettings.btnReload +
          "</button>";

        containerFooter.insertAdjacentHTML("beforeend", btnReloadHTML);

        const reloadBtn =
          this.mtContainerNode.getElementsByClassName("btn-refresh")[0];
        reloadBtn.addEventListener("click", () => {
          this.mtUpdate();
        });
      }
    }
  }

  /**
   * Add EventListeners for timeline interactions and trigger functions
   */
  #setPostsInteracion() {
    this.mtBodyNode.addEventListener("click", (e) => {
      // Check if post cointainer was clicked
      if (
        e.target.localName == "article" ||
        e.target.offsetParent?.localName == "article" ||
        (e.target.localName == "img" &&
          !e.target.parentNode.getAttribute("data-video-url"))
      ) {
        this.#openPostUrl(e);
      }
      // Check if Show More/Less button was clicked
      if (
        e.target.localName == "button" &&
        e.target.classList.contains("mt-btn-spoiler")
      ) {
        this.#toogleSpoiler(e);
      }
      // Check if video preview image or play icon/button was clicked
      if (
        e.target.className == "mt-post-media-play-icon" ||
        (e.target.localName == "svg" &&
          e.target.parentNode.className == "mt-post-media-play-icon") ||
        (e.target.localName == "path" &&
          e.target.parentNode.parentNode.className ==
            "mt-post-media-play-icon") ||
        (e.target.localName == "img" &&
          e.target.parentNode.getAttribute("data-video-url"))
      ) {
        this.#loadPostVideo(e);
      }
    });
    this.mtBodyNode.addEventListener("keydown", (e) => {
      // Check if Enter key was pressed with focus in an article
      if (e.key === "Enter" && e.target.localName == "article") {
        this.#openPostUrl(e);
      }
    });
  }

  /**
   * Open post in a new tab/page avoiding any other natural link
   * @param {event} e User interaction trigger
   */
  #openPostUrl(e) {
    const urlPost = e.target.closest(".mt-post").dataset.location;
    if (
      e.target.localName !== "a" &&
      e.target.localName !== "span" &&
      e.target.localName !== "button" &&
      e.target.localName !== "bdi" &&
      e.target.localName !== "time" &&
      e.target.className !== "mt-post-preview-noImage" &&
      e.target.parentNode.className !== "mt-post-avatar-image-big" &&
      e.target.parentNode.className !== "mt-post-avatar-image-small" &&
      e.target.parentNode.className !== "mt-post-preview-image" &&
      e.target.parentNode.className !== "mt-post-preview" &&
      urlPost
    ) {
      window.open(urlPost, "_blank", "noopener");
    }
  }

  /**
   * Add/Remove EventListeners for loading spinner
   */
  #manageSpinner() {
    // Remove EventListener and CSS class to container
    const removeSpinner = (e) => {
      e.target.parentNode.classList.remove(this.mtSettings.spinnerClass);
      e.target.removeEventListener("load", removeSpinner);
      e.target.removeEventListener("error", removeSpinner);
    };
    // Add EventListener to images
    this.mtBodyNode
      .querySelectorAll(`.${this.mtSettings.spinnerClass} > img`)
      .forEach((e) => {
        e.addEventListener("load", removeSpinner);
        e.addEventListener("error", removeSpinner);
      });
  }

  /**
   * Show an error on the timeline
   * @param {string} e Error message
   * @param {string} i Icon
   */
  #showError(t, i) {
    const icon = i || "❌";
    this.mtBodyNode.innerHTML =
      '<div class="mt-error"><span class="mt-error-icon">' +
      icon +
      '</span><br/><strong>Oops, something\'s happened:</strong><br/><div class="mt-error-message">' +
      t +
      "</div></div>";
    this.mtBodyNode.setAttribute("role", "none");
    throw new Error(
      "Stopping the script due to an error building the timeline."
    );
  }
}
