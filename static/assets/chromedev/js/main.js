import { s as store, u as unsafeSVG, c as closeIcon, g as generateIdSalt, a as clearFilters } from './enhanced-select-68546119.js';
import { B as BaseElement$1, h as html, L as LitElement } from './base-element-e0a9d6c8.js';
import { u as unsafeHTML } from './unsafe-html-5bd1ff43.js';
import { d as debounce } from './tag-pill-list-495688d1.js';

var e,t,n,r,i,a=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},o=function(e){if("loading"===document.readyState)return "loading";var t=a();if(t){if(e<t.domInteractive)return "loading";if(0===t.domContentLoadedEventStart||e<t.domContentLoadedEventStart)return "dom-interactive";if(0===t.domComplete||e<t.domComplete)return "dom-content-loaded"}return "complete"},u=function(e){var t=e.nodeName;return 1===e.nodeType?t.toLowerCase():t.toUpperCase().replace(/^#/,"")},c=function(e,t){var n="";try{for(;e&&9!==e.nodeType;){var r=e,i=r.id?"#"+r.id:u(r)+(r.classList&&r.classList.value&&r.classList.value.trim()&&r.classList.value.trim().length?"."+r.classList.value.trim().replace(/\s+/g,"."):"");if(n.length+i.length>(t||100)-1)return n||i;if(n=n?i+">"+n:i,r.id)break;e=r.parentNode;}}catch(e){}return n},s=-1,f=function(){return s},d=function(e){addEventListener("pageshow",(function(t){t.persisted&&(s=t.timeStamp,e(t));}),!0);},l=function(){var e=a();return e&&e.activationStart||0},m=function(e,t){var n=a(),r="navigate";f()>=0?r="back-forward-cache":n&&(document.prerendering||l()>0?r="prerender":document.wasDiscarded?r="restore":n.type&&(r=n.type.replace(/_/g,"-")));return {name:e,value:void 0===t?-1:t,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},v=function(e,t,n){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){t(e.getEntries());}));}));return r.observe(Object.assign({type:e,buffered:!0},n||{})),r}}catch(e){}},p=function(e,t,n,r){var i,a;return function(o){t.value>=0&&(o||r)&&((a=t.value-(i||0))||void 0===i)&&(i=t.value,t.delta=a,t.rating=function(e,t){return e>t[1]?"poor":e>t[0]?"needs-improvement":"good"}(t.value,n),e(t));}},h=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}));},g=function(e){var t=function(t){"pagehide"!==t.type&&"hidden"!==document.visibilityState||e(t);};addEventListener("visibilitychange",t,!0),addEventListener("pagehide",t,!0);},T=function(e){var t=!1;return function(n){t||(e(n),t=!0);}},y=-1,E=function(){return "hidden"!==document.visibilityState||document.prerendering?1/0:0},S=function(e){"hidden"===document.visibilityState&&y>-1&&(y="visibilitychange"===e.type?e.timeStamp:0,b());},L=function(){addEventListener("visibilitychange",S,!0),addEventListener("prerenderingchange",S,!0);},b=function(){removeEventListener("visibilitychange",S,!0),removeEventListener("prerenderingchange",S,!0);},C=function(){return y<0&&(y=E(),L(),d((function(){setTimeout((function(){y=E(),L();}),0);}))),{get firstHiddenTime(){return y}}},w=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e();},M=[1800,3e3],x=function(e,t){t=t||{},w((function(){var n,r=C(),i=m("FCP"),a=v("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(a.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-l(),0),i.entries.push(e),n(!0)));}));}));a&&(n=p(e,i,M,t.reportAllChanges),d((function(r){i=m("FCP"),n=p(e,i,M,t.reportAllChanges),h((function(){i.value=performance.now()-r.timeStamp,n(!0);}));})));}));},A=[.1,.25],F=function(e,t){!function(e,t){t=t||{},x(T((function(){var n,r=m("CLS",0),i=0,a=[],o=function(e){e.forEach((function(e){if(!e.hadRecentInput){var t=a[0],n=a[a.length-1];i&&e.startTime-n.startTime<1e3&&e.startTime-t.startTime<5e3?(i+=e.value,a.push(e)):(i=e.value,a=[e]);}})),i>r.value&&(r.value=i,r.entries=a,n());},u=v("layout-shift",o);u&&(n=p(e,r,A,t.reportAllChanges),g((function(){o(u.takeRecords()),n(!0);})),d((function(){i=0,r=m("CLS",0),n=p(e,r,A,t.reportAllChanges),h((function(){return n()}));})),setTimeout(n,0));})));}((function(t){!function(e){if(e.entries.length){var t=e.entries.reduce((function(e,t){return e&&e.value>t.value?e:t}));if(t&&t.sources&&t.sources.length){var n=(r=t.sources).find((function(e){return e.node&&1===e.node.nodeType}))||r[0];if(n)return void(e.attribution={largestShiftTarget:c(n.node),largestShiftTime:t.startTime,largestShiftValue:t.value,largestShiftSource:n,largestShiftEntry:t,loadState:o(t.startTime)})}}var r;e.attribution={};}(t),e(t);}),t);},I=function(e,t){x((function(t){!function(e){if(e.entries.length){var t=a(),n=e.entries[e.entries.length-1];if(t){var r=t.activationStart||0,i=Math.max(0,t.responseStart-r);return void(e.attribution={timeToFirstByte:i,firstByteToFCP:e.value-i,loadState:o(e.entries[0].startTime),navigationEntry:t,fcpEntry:n})}}e.attribution={timeToFirstByte:0,firstByteToFCP:e.value,loadState:o(f())};}(t),e(t);}),t);},P={passive:!0,capture:!0},B=new Date,D=function(r,i){e||(e=i,t=r,n=new Date,q(removeEventListener),k());},k=function(){if(t>=0&&t<n-B){var i={entryType:"first-input",name:e.type,target:e.target,cancelable:e.cancelable,startTime:e.timeStamp,processingStart:e.timeStamp+t};r.forEach((function(e){e(i);})),r=[];}},R=function(e){if(e.cancelable){var t=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,t){var n=function(){D(e,t),i();},r=function(){i();},i=function(){removeEventListener("pointerup",n,P),removeEventListener("pointercancel",r,P);};addEventListener("pointerup",n,P),addEventListener("pointercancel",r,P);}(t,e):D(t,e);}},q=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(t){return e(t,R,P)}));},H=[100,300],N=function(n,i){i=i||{},w((function(){var a,o=C(),u=m("FID"),c=function(e){e.startTime<o.firstHiddenTime&&(u.value=e.processingStart-e.startTime,u.entries.push(e),a(!0));},s=function(e){e.forEach(c);},f=v("first-input",s);a=p(n,u,H,i.reportAllChanges),f&&g(T((function(){s(f.takeRecords()),f.disconnect();}))),f&&d((function(){var o;u=m("FID"),a=p(n,u,H,i.reportAllChanges),r=[],t=-1,e=null,q(addEventListener),o=c,r.push(o),k();}));}));},O=function(e,t){N((function(t){!function(e){var t=e.entries[0];e.attribution={eventTarget:c(t.target),eventType:t.name,eventTime:t.startTime,eventEntry:t,loadState:o(t.startTime)};}(t),e(t);}),t);},j=0,U=1/0,V=0,_=function(e){e.forEach((function(e){e.interactionId&&(U=Math.min(U,e.interactionId),V=Math.max(V,e.interactionId),j=V?(V-U)/7+1:0);}));},z=function(){return i?j:performance.interactionCount||0},G=function(){"interactionCount"in performance||i||(i=v("event",_,{type:"event",buffered:!0,durationThreshold:0}));},J=[200,500],K=0,Q=function(){return z()-K},W=[],X={},Y=function(e){var t=W[W.length-1],n=X[e.interactionId];if(n||W.length<10||e.duration>t.latency){if(n)n.entries.push(e),n.latency=Math.max(n.latency,e.duration);else {var r={id:e.interactionId,latency:e.duration,entries:[e]};X[r.id]=r,W.push(r);}W.sort((function(e,t){return t.latency-e.latency})),W.splice(10).forEach((function(e){delete X[e.id];}));}},Z=function(e,t){t=t||{},w((function(){var n;G();var r,i=m("INP"),a=function(e){e.forEach((function(e){(e.interactionId&&Y(e),"first-input"===e.entryType)&&(!W.some((function(t){return t.entries.some((function(t){return e.duration===t.duration&&e.startTime===t.startTime}))}))&&Y(e));}));var t,n=(t=Math.min(W.length-1,Math.floor(Q()/50)),W[t]);n&&n.latency!==i.value&&(i.value=n.latency,i.entries=n.entries,r());},o=v("event",a,{durationThreshold:null!==(n=t.durationThreshold)&&void 0!==n?n:40});r=p(e,i,J,t.reportAllChanges),o&&("interactionId"in PerformanceEventTiming.prototype&&o.observe({type:"first-input",buffered:!0}),g((function(){a(o.takeRecords()),i.value<0&&Q()>0&&(i.value=0,i.entries=[]),r(!0);})),d((function(){W=[],K=z(),i=m("INP"),r=p(e,i,J,t.reportAllChanges);})));}));},$=function(e,t){Z((function(t){!function(e){if(e.entries.length){var t=e.entries.sort((function(e,t){return t.duration-e.duration||t.processingEnd-t.processingStart-(e.processingEnd-e.processingStart)}))[0];e.attribution={eventTarget:c(t.target),eventType:t.name,eventTime:t.startTime,eventEntry:t,loadState:o(t.startTime)};}else e.attribution={};}(t),e(t);}),t);},ee=[2500,4e3],te={},ne=function(e,t){!function(e,t){t=t||{},w((function(){var n,r=C(),i=m("LCP"),a=function(e){var t=e[e.length-1];t&&t.startTime<r.firstHiddenTime&&(i.value=Math.max(t.startTime-l(),0),i.entries=[t],n());},o=v("largest-contentful-paint",a);if(o){n=p(e,i,ee,t.reportAllChanges);var u=T((function(){te[i.id]||(a(o.takeRecords()),o.disconnect(),te[i.id]=!0,n(!0));}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return setTimeout(u,0)}),!0);})),g(u),d((function(r){i=m("LCP"),n=p(e,i,ee,t.reportAllChanges),h((function(){i.value=performance.now()-r.timeStamp,te[i.id]=!0,n(!0);}));}));}}));}((function(t){!function(e){if(e.entries.length){var t=a();if(t){var n=t.activationStart||0,r=e.entries[e.entries.length-1],i=r.url&&performance.getEntriesByType("resource").filter((function(e){return e.name===r.url}))[0],o=Math.max(0,t.responseStart-n),u=Math.max(o,i?(i.requestStart||i.startTime)-n:0),s=Math.max(u,i?i.responseEnd-n:0),f=Math.max(s,r?r.startTime-n:0),d={element:c(r.element),timeToFirstByte:o,resourceLoadDelay:u-o,resourceLoadTime:s-u,elementRenderDelay:f-s,navigationEntry:t,lcpEntry:r};return r.url&&(d.url=r.url),i&&(d.lcpResourceEntry=i),void(e.attribution=d)}}e.attribution={timeToFirstByte:0,resourceLoadDelay:0,resourceLoadTime:0,elementRenderDelay:e.value};}(t),e(t);}),t);},re=[800,1800],ie=function e(t){document.prerendering?w((function(){return e(t)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(t)}),!0):setTimeout(t,0);},ae=function(e,t){t=t||{};var n=m("TTFB"),r=p(e,n,re,t.reportAllChanges);ie((function(){var i=a();if(i){var o=i.responseStart;if(o<=0||o>performance.now())return;n.value=Math.max(o-l(),0),n.entries=[i],r(!0),d((function(){n=m("TTFB",0),(r=p(e,n,re,t.reportAllChanges))(!0);}));}}));},oe=function(e,t){ae((function(t){!function(e){if(e.entries.length){var t=e.entries[0],n=t.activationStart||0,r=Math.max(t.domainLookupStart-n,0),i=Math.max(t.connectStart-n,0),a=Math.max(t.requestStart-n,0);e.attribution={waitingTime:r,dnsTime:i-r,connectionTime:a-i,requestTime:e.value-a,navigationEntry:t};}else e.attribution={waitingTime:0,dnsTime:0,connectionTime:0,requestTime:0};}(t),e(t);}),t);};

var version$1 = 5;

// A function that should be called once all all analytics code has been
// initialized. Calling this will resolve the `whenAnalyticsInitialize`
// promise.
let markAnalyticsInitialized;

// A promise that settles once all analytics has been initialized.
// Internally this assigned the `resolve()` function to the module-level
// `markAnalyticsInitialized` variable.
const whenAnalyticsInitialized = new Promise(resolve => {
  markAnalyticsInitialized = resolve;
});

/**
 * @param {string} name
 * @param {Object} params
 */
async function logEvent(name, params) {
  await whenAnalyticsInitialized;
  window.gtag('event', name, params);
}

/**
 * See: https://github.com/GoogleChrome/web-vitals#using-analyticsjs
 * @param {Object} metric
 */
function sendToGoogleAnalytics({
  name,
  value,
  delta,
  id,
  attribution,
  navigationType,
}) {
  const params = {
    event_category: 'Web Vitals',
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Send the raw metric value in addition to the value computed for GA
    // so it's available in BigQuery and the API.
    metric_value: value,
    // This should already by set globally, but to ensure it's consistent
    // with the web-vitals library, set it again.
    // Override for 'navigational-prefetch' for the prefetch origin trial
    // experiment (https://github.com/GoogleChrome/web.dev/pull/9532)
    navigation_type:
      navigationType === 'navigate' &&
      performance.getEntriesByType &&
      performance.getEntriesByType('navigation')[0] &&
      performance.getEntriesByType('navigation')[0].deliveryType ===
        'navigational-prefetch'
        ? 'navigational-prefetch'
        : navigationType,
    // Use a non-interaction event to avoid affecting bounce rate.
    // This only applies to Universal Analytics and can be deleted once
    // we're only using GA4.
    non_interaction: true,
  };

  let overrides;
  let debug_input_delay;
  let debug_processing_time;
  let debug_presentation_delay;

  switch (name) {
    case 'CLS':
      overrides = {
        debug_time: attribution.largestShiftTime,
        debug_load_state: attribution.loadState,
        debug_target: attribution.largestShiftTarget || '(not set)',
      };
      break;
    case 'FCP':
      overrides = {
        debug_ttfb: attribution.timeToFirstByte,
        debug_fb2fcp: attribution.firstByteToFCP,
        debug_load_state: attribution.loadState,
        debug_target: attribution.loadState || '(not set)',
      };
      break;
    case 'FID':
      overrides = {
        debug_event: attribution.eventType,
        debug_time: attribution.eventTime,
        debug_load_state: attribution.loadState,
        debug_target: attribution.eventTarget || '(not set)',
      };
      break;
    case 'INP':
      if (attribution.eventEntry) {
        debug_input_delay = Math.round(
          attribution.eventEntry.processingStart -
            attribution.eventEntry.startTime
        );
        debug_processing_time = Math.round(
          attribution.eventEntry.processingEnd -
            attribution.eventEntry.processingStart
        );
        debug_presentation_delay = Math.round(
          // RenderTime is an estimate, because duration is rounded, and may get rounded down.
          // In rare cases it can be less than processingEnd and that breaks performance.measure().
          // Lets make sure its at least 4ms in those cases so you can just barely see it.
          Math.max(
            attribution.eventEntry.processingEnd + 4,
            attribution.eventEntry.startTime + attribution.eventEntry.duration
          ) - attribution.eventEntry.processingEnd
        );
      }
      overrides = {
        debug_event: attribution.eventType,
        debug_time: attribution.eventTime,
        debug_load_state: attribution.loadState,
        debug_target: attribution.eventTarget || '(not set)',
        debug_input_delay: debug_input_delay,
        debug_processing_time: debug_processing_time,
        debug_presentation_delay: debug_presentation_delay,
      };
      break;
    case 'LCP':
      overrides = {
        debug_url: attribution.url,
        debug_ttfb: attribution.timeToFirstByte,
        debug_rld: attribution.resourceLoadDelay,
        debug_rlt: attribution.resourceLoadTime,
        debug_erd: attribution.elementRenderDelay,
        debug_target: attribution.element || '(not set)',
      };
      break;
    case 'TTFB':
      overrides = {
        debug_waiting_time: attribution.waitingTime,
        debug_dns_time: attribution.dnsTime,
        debug_connection_time: attribution.connectionTime,
        debug_request_time: attribution.requestTime,
      };
      break;
  }

  logEvent(name, Object.assign(params, overrides));
}

/**
 * Configures logging events for any clicks on a link (`<a href="...">`)
 * or another relevant elements (class="gc-analytics-event"), searching
 * for (requiring at least `data-category`, but also allowing
 * `data-action`, `data-label` and `data-value`.
 */
function addClickEventListener() {
  document.addEventListener(
    'click',
    /**
     * @param {WMouseEvent} e
     */
    e => {
      const clickableEl = e?.target?.closest('a[href], .gc-analytics-event');
      if (!clickableEl) {
        return;
      }
      const event = clickableEl.dataset['action'] || 'click';
      const category = clickableEl.dataset['category'] || undefined;
      const label = clickableEl.dataset['label'] || undefined;
      // must be number, or is ignored
      const value = Number(clickableEl.dataset['value']) || undefined;

      if (event && category) {
        logEvent(event, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    }
  );
}

/**
 * Adds a listener to detect back/forward cache restores and log them
 * as pageviews with the "back-forward-cache" navigation type set (in
 * case we need to distinguish them from regular pageviews).
 * https://web.dev/bfcache/#how-bfcache-affects-analytics-and-performance-measurement
 */
function addPageShowEventListener() {
  window.addEventListener(
    'pageshow',
    /**
     * @param {PageTransitionEvent} e
     */
    e => {
      if (e.persisted) {
        window.dataLayer.push({navigation_type: 'back-forward-cache'});
        logEvent('page_view', {});
      }
    }
  );
}

// Set up a promise for when the page is activated,
// which is needed for prerendered pages.
/**
 * @type {Promise<void>}
 */
const whenPageActivated = new Promise(resolve => {
  if (document.prerendering) {
    document.addEventListener('prerenderingchange', () => resolve());
  } else {
    resolve();
  }
});

/**
 * Gets the type of navigation for this page. In most cases this is the
 * value returned by the Navigation Timing API (normalized to use kebab case),
 * but in addition to this it also captures pages that were prerendered
 * as well as page that were restored after a discard.
 * @returns {string}
 */
function getNavigationType() {
  if (document.wasDiscarded) {
    return 'restore';
  }

  const navEntry =
    self.performance &&
    performance.getEntriesByType &&
    performance.getEntriesByType('navigation')[0];

  if (navEntry) {
    // Prerendered pages have an activationStart time after activation
    if (navEntry.activationStart && navEntry.activationStart > 0) {
      return 'prerender';
    } else if (
      // For the document speculation rules origin trial
      // overrwrite the navigation type
      navEntry.type === 'navigate' &&
      navEntry.deliveryType === 'navigational-prefetch'
    ) {
      return 'navigational-prefetch';
    } else {
      return navEntry.type.replace(/_/, '-');
    }
  }
  return '(not set)';
}

/**
 * Gets the type of navigation for this page. In most cases this is the
 * value returned by the Navigation Timing API (normalized to use kebab case),
 * but in addition to this it also captures pages that were prerendered
 * as well as page that were restored after a discard.
 * @returns {string|undefined}
 */
function getBackForwardNotRestoreReasons() {
  const navEntry =
    self.performance &&
    performance.getEntriesByType &&
    performance.getEntriesByType('navigation')[0];

  if (navEntry) {
    if (navEntry.notRestoredReasons) {
      return navEntry.notRestoredReasons.reasons.toString();
    }
  }
  return;
}

/**
 * Returns a list of any `prerender` speculation rules defined by any
 * `script[type=speculationrules]` elements on the page.
 * @returns {Object}
 */
function getPrerenderRules() {
  return [...document.querySelectorAll('script[type=speculationrules]')]
    .map(s => {
      try {
        return JSON.parse(s.textContent || '').prerender;
      } catch {
        // Ignore parse errors.
      }
    })
    .flat() // Remove scripts with errors or no prerender rules.
    .filter(rule => rule && rule.source === 'list');
}

/**
 * Logs analytics events for `prerender` speculation rules, if that browser
 * support speculation rules and is not in Data Saver mode.
 * @returns {void}
 */
function logPrerenders() {
  // Only log prerender attempts if supported
  // and not in datasaver mode
  if (
    // prettier-ignore
    !(
      // @ts-ignore
      HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')
    ) ||
    navigator.connection?.saveData
  ) {
    return;
  }

  const prerenderURLs = new Set(
    getPrerenderRules()
      .map(r => r.urls)
      .flat()
  );

  prerenderURLs.forEach(prerenderURL => {
    logEvent('prerender_attempt', {
      value: 1,
      event_category: 'Site-Wide Custom Events',
      event_label: prerenderURL,
      // Use a non-interaction event to avoid affecting bounce rate.
      non_interaction: true,
    });
  });
}

/**
 * @param {string} name
 * @returns {string|undefined}
 */
function getMeta(name) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta instanceof HTMLMetaElement) return meta.content;
  return;
}

/**
 * Sets the config for a given analytics measurement ID,
 * configured for the web.dev accounts.
 */
function setConfig() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  window.dataLayer.push({user_agent: navigator.userAgent});
  //Restrict GTM variables:
  window.dataLayer.push({'gtm.blocklist': ['html', 'd', 'jsm', 'j']});
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.dataLayer.push({measurement_version: version$1});
  const navigationType = getNavigationType();
  window.dataLayer.push({navigation_type: navigationType});
  if (navigationType === 'back-forward') {
    const reasons = getBackForwardNotRestoreReasons();
    window.dataLayer.push({back_forward_not_restore_reasons: reasons});
  }
  window.dataLayer.push({page_path: location.pathname});
  window.dataLayer.push({page_authors: getMeta('authors')});
  window.dataLayer.push({page_tags: getMeta('tags')});
  window.dataLayer.push({page_learn_paths: getMeta('paths')});
  window.dataLayer.push({
    color_scheme_preference: self.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light',
  });
  if (navigator.deviceMemory) {
    window.dataLayer.push({device_memory: navigator.deviceMemory});
  }
  if (navigator.connection && navigator.connection.effectiveType) {
    window.dataLayer.push({
      effective_connection_type: navigator.connection.effectiveType,
    });
  }
  if (location.hostname === 'localhost') {
    window.dataLayer.push({debug_mode: true});
  }
  const cookiePreference = localStorage.getItem('user-cookies');
  window.dataLayer.push({cookiePreference: cookiePreference});

  logEvent('dcc_analytics_configed', {});
}

async function initAnalytics() {
  // If prerendering then only init once the page is activated
  await whenPageActivated;

  setConfig();

  addClickEventListener();
  addPageShowEventListener();

  F(sendToGoogleAnalytics);
  I(sendToGoogleAnalytics);
  O(sendToGoogleAnalytics);
  $(sendToGoogleAnalytics);
  ne(sendToGoogleAnalytics);
  oe(sendToGoogleAnalytics);

  logPrerenders();

  markAnalyticsInitialized();
}

initAnalytics();

// Although discouraged (especially for longer videos), some video clips may have
// autoplay enabled. Disable it when prefers-reduced-motion is set, and ensure
// controls are enabled.
if (matchMedia('(prefers-reduced-motion)').matches) {
  document.querySelectorAll('video[autoplay]').forEach(b => {
    b.removeAttribute('autoplay');
    b.setAttribute('controls', '');
  });
}

function createBrowserLocalStorageCache(options) {
    const namespaceKey = `algoliasearch-client-js-${options.key}`;
    // eslint-disable-next-line functional/no-let
    let storage;
    const getStorage = () => {
        if (storage === undefined) {
            storage = options.localStorage || window.localStorage;
        }
        return storage;
    };
    const getNamespace = () => {
        return JSON.parse(getStorage().getItem(namespaceKey) || '{}');
    };
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            return Promise.resolve()
                .then(() => {
                const keyAsString = JSON.stringify(key);
                const value = getNamespace()[keyAsString];
                return Promise.all([value || defaultValue(), value !== undefined]);
            })
                .then(([value, exists]) => {
                return Promise.all([value, exists || events.miss(value)]);
            })
                .then(([value]) => value);
        },
        set(key, value) {
            return Promise.resolve().then(() => {
                const namespace = getNamespace();
                // eslint-disable-next-line functional/immutable-data
                namespace[JSON.stringify(key)] = value;
                getStorage().setItem(namespaceKey, JSON.stringify(namespace));
                return value;
            });
        },
        delete(key) {
            return Promise.resolve().then(() => {
                const namespace = getNamespace();
                // eslint-disable-next-line functional/immutable-data
                delete namespace[JSON.stringify(key)];
                getStorage().setItem(namespaceKey, JSON.stringify(namespace));
            });
        },
        clear() {
            return Promise.resolve().then(() => {
                getStorage().removeItem(namespaceKey);
            });
        },
    };
}

// @todo Add logger on options to debug when caches go wrong.
function createFallbackableCache(options) {
    const caches = [...options.caches];
    const current = caches.shift(); // eslint-disable-line functional/immutable-data
    if (current === undefined) {
        return createNullCache();
    }
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            return current.get(key, defaultValue, events).catch(() => {
                return createFallbackableCache({ caches }).get(key, defaultValue, events);
            });
        },
        set(key, value) {
            return current.set(key, value).catch(() => {
                return createFallbackableCache({ caches }).set(key, value);
            });
        },
        delete(key) {
            return current.delete(key).catch(() => {
                return createFallbackableCache({ caches }).delete(key);
            });
        },
        clear() {
            return current.clear().catch(() => {
                return createFallbackableCache({ caches }).clear();
            });
        },
    };
}

function createNullCache() {
    return {
        get(_key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            const value = defaultValue();
            return value
                .then(result => Promise.all([result, events.miss(result)]))
                .then(([result]) => result);
        },
        set(_key, value) {
            return Promise.resolve(value);
        },
        delete(_key) {
            return Promise.resolve();
        },
        clear() {
            return Promise.resolve();
        },
    };
}

function createInMemoryCache(options = { serializable: true }) {
    // eslint-disable-next-line functional/no-let
    let cache = {};
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            const keyAsString = JSON.stringify(key);
            if (keyAsString in cache) {
                return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
            }
            const promise = defaultValue();
            const miss = (events && events.miss) || (() => Promise.resolve());
            return promise.then((value) => miss(value)).then(() => promise);
        },
        set(key, value) {
            // eslint-disable-next-line functional/immutable-data
            cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;
            return Promise.resolve(value);
        },
        delete(key) {
            // eslint-disable-next-line functional/immutable-data
            delete cache[JSON.stringify(key)];
            return Promise.resolve();
        },
        clear() {
            cache = {};
            return Promise.resolve();
        },
    };
}

function createAuth(authMode, appId, apiKey) {
    const credentials = {
        'x-algolia-api-key': apiKey,
        'x-algolia-application-id': appId,
    };
    return {
        headers() {
            return authMode === AuthMode.WithinHeaders ? credentials : {};
        },
        queryParameters() {
            return authMode === AuthMode.WithinQueryParameters ? credentials : {};
        },
    };
}

// eslint-disable-next-line functional/prefer-readonly-type
function shuffle(array) {
    let c = array.length - 1; // eslint-disable-line functional/no-let
    // eslint-disable-next-line functional/no-loop-statement
    for (c; c > 0; c--) {
        const b = Math.floor(Math.random() * (c + 1));
        const a = array[c];
        array[c] = array[b]; // eslint-disable-line functional/immutable-data, no-param-reassign
        array[b] = a; // eslint-disable-line functional/immutable-data, no-param-reassign
    }
    return array;
}
function addMethods(base, methods) {
    if (!methods) {
        return base;
    }
    Object.keys(methods).forEach(key => {
        // eslint-disable-next-line functional/immutable-data, no-param-reassign
        base[key] = methods[key](base);
    });
    return base;
}
function encode(format, ...args) {
    // eslint-disable-next-line functional/no-let
    let i = 0;
    return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}

const version = '4.17.1';

const AuthMode = {
    /**
     * If auth credentials should be in query parameters.
     */
    WithinQueryParameters: 0,
    /**
     * If auth credentials should be in headers.
     */
    WithinHeaders: 1,
};

function createMappedRequestOptions(requestOptions, timeout) {
    const options = requestOptions || {};
    const data = options.data || {};
    Object.keys(options).forEach(key => {
        if (['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(key) === -1) {
            data[key] = options[key]; // eslint-disable-line functional/immutable-data
        }
    });
    return {
        data: Object.entries(data).length > 0 ? data : undefined,
        timeout: options.timeout || timeout,
        headers: options.headers || {},
        queryParameters: options.queryParameters || {},
        cacheable: options.cacheable,
    };
}

const CallEnum = {
    /**
     * If the host is read only.
     */
    Read: 1,
    /**
     * If the host is write only.
     */
    Write: 2,
    /**
     * If the host is both read and write.
     */
    Any: 3,
};

const HostStatusEnum = {
    Up: 1,
    Down: 2,
    Timeouted: 3,
};

// By default, API Clients at Algolia have expiration delay
// of 5 mins. In the JavaScript client, we have 2 mins.
const EXPIRATION_DELAY = 2 * 60 * 1000;
function createStatefulHost(host, status = HostStatusEnum.Up) {
    return {
        ...host,
        status,
        lastUpdate: Date.now(),
    };
}
function isStatefulHostUp(host) {
    return host.status === HostStatusEnum.Up || Date.now() - host.lastUpdate > EXPIRATION_DELAY;
}
function isStatefulHostTimeouted(host) {
    return (host.status === HostStatusEnum.Timeouted && Date.now() - host.lastUpdate <= EXPIRATION_DELAY);
}

function createStatelessHost(options) {
    if (typeof options === 'string') {
        return {
            protocol: 'https',
            url: options,
            accept: CallEnum.Any,
        };
    }
    return {
        protocol: options.protocol || 'https',
        url: options.url,
        accept: options.accept || CallEnum.Any,
    };
}

const MethodEnum = {
    Delete: 'DELETE',
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
};

function createRetryableOptions(hostsCache, statelessHosts) {
    return Promise.all(statelessHosts.map(statelessHost => {
        return hostsCache.get(statelessHost, () => {
            return Promise.resolve(createStatefulHost(statelessHost));
        });
    })).then(statefulHosts => {
        const hostsUp = statefulHosts.filter(host => isStatefulHostUp(host));
        const hostsTimeouted = statefulHosts.filter(host => isStatefulHostTimeouted(host));
        /**
         * Note, we put the hosts that previously timeouted on the end of the list.
         */
        const hostsAvailable = [...hostsUp, ...hostsTimeouted];
        const statelessHostsAvailable = hostsAvailable.length > 0
            ? hostsAvailable.map(host => createStatelessHost(host))
            : statelessHosts;
        return {
            getTimeout(timeoutsCount, baseTimeout) {
                /**
                 * Imagine that you have 4 hosts, if timeouts will increase
                 * on the following way: 1 (timeouted) > 4 (timeouted) > 5 (200)
                 *
                 * Note that, the very next request, we start from the previous timeout
                 *
                 *  5 (timeouted) > 6 (timeouted) > 7 ...
                 *
                 * This strategy may need to be reviewed, but is the strategy on the our
                 * current v3 version.
                 */
                const timeoutMultiplier = hostsTimeouted.length === 0 && timeoutsCount === 0
                    ? 1
                    : hostsTimeouted.length + 3 + timeoutsCount;
                return timeoutMultiplier * baseTimeout;
            },
            statelessHosts: statelessHostsAvailable,
        };
    });
}

const isNetworkError = ({ isTimedOut, status }) => {
    return !isTimedOut && ~~status === 0;
};
const isRetryable = (response) => {
    const status = response.status;
    const isTimedOut = response.isTimedOut;
    return (isTimedOut || isNetworkError(response) || (~~(status / 100) !== 2 && ~~(status / 100) !== 4));
};
const isSuccess = ({ status }) => {
    return ~~(status / 100) === 2;
};
const retryDecision = (response, outcomes) => {
    if (isRetryable(response)) {
        return outcomes.onRetry(response);
    }
    if (isSuccess(response)) {
        return outcomes.onSuccess(response);
    }
    return outcomes.onFail(response);
};

function retryableRequest(transporter, statelessHosts, request, requestOptions) {
    const stackTrace = []; // eslint-disable-line functional/prefer-readonly-type
    /**
     * First we prepare the payload that do not depend from hosts.
     */
    const data = serializeData(request, requestOptions);
    const headers = serializeHeaders(transporter, requestOptions);
    const method = request.method;
    // On `GET`, the data is proxied to query parameters.
    const dataQueryParameters = request.method !== MethodEnum.Get
        ? {}
        : {
            ...request.data,
            ...requestOptions.data,
        };
    const queryParameters = {
        'x-algolia-agent': transporter.userAgent.value,
        ...transporter.queryParameters,
        ...dataQueryParameters,
        ...requestOptions.queryParameters,
    };
    let timeoutsCount = 0; // eslint-disable-line functional/no-let
    const retry = (hosts, // eslint-disable-line functional/prefer-readonly-type
    getTimeout) => {
        /**
         * We iterate on each host, until there is no host left.
         */
        const host = hosts.pop(); // eslint-disable-line functional/immutable-data
        if (host === undefined) {
            throw createRetryError(stackTraceWithoutCredentials(stackTrace));
        }
        const payload = {
            data,
            headers,
            method,
            url: serializeUrl(host, request.path, queryParameters),
            connectTimeout: getTimeout(timeoutsCount, transporter.timeouts.connect),
            responseTimeout: getTimeout(timeoutsCount, requestOptions.timeout),
        };
        /**
         * The stackFrame is pushed to the stackTrace so we
         * can have information about onRetry and onFailure
         * decisions.
         */
        const pushToStackTrace = (response) => {
            const stackFrame = {
                request: payload,
                response,
                host,
                triesLeft: hosts.length,
            };
            // eslint-disable-next-line functional/immutable-data
            stackTrace.push(stackFrame);
            return stackFrame;
        };
        const decisions = {
            onSuccess: response => deserializeSuccess(response),
            onRetry(response) {
                const stackFrame = pushToStackTrace(response);
                /**
                 * If response is a timeout, we increaset the number of
                 * timeouts so we can increase the timeout later.
                 */
                if (response.isTimedOut) {
                    timeoutsCount++;
                }
                return Promise.all([
                    /**
                     * Failures are individually send the logger, allowing
                     * the end user to debug / store stack frames even
                     * when a retry error does not happen.
                     */
                    transporter.logger.info('Retryable failure', stackFrameWithoutCredentials(stackFrame)),
                    /**
                     * We also store the state of the host in failure cases. If the host, is
                     * down it will remain down for the next 2 minutes. In a timeout situation,
                     * this host will be added end of the list of hosts on the next request.
                     */
                    transporter.hostsCache.set(host, createStatefulHost(host, response.isTimedOut ? HostStatusEnum.Timeouted : HostStatusEnum.Down)),
                ]).then(() => retry(hosts, getTimeout));
            },
            onFail(response) {
                pushToStackTrace(response);
                throw deserializeFailure(response, stackTraceWithoutCredentials(stackTrace));
            },
        };
        return transporter.requester.send(payload).then(response => {
            return retryDecision(response, decisions);
        });
    };
    /**
     * Finally, for each retryable host perform request until we got a non
     * retryable response. Some notes here:
     *
     * 1. The reverse here is applied so we can apply a `pop` later on => more performant.
     * 2. We also get from the retryable options a timeout multiplier that is tailored
     * for the current context.
     */
    return createRetryableOptions(transporter.hostsCache, statelessHosts).then(options => {
        return retry([...options.statelessHosts].reverse(), options.getTimeout);
    });
}

function createTransporter(options) {
    const { hostsCache, logger, requester, requestsCache, responsesCache, timeouts, userAgent, hosts, queryParameters, headers, } = options;
    const transporter = {
        hostsCache,
        logger,
        requester,
        requestsCache,
        responsesCache,
        timeouts,
        userAgent,
        headers,
        queryParameters,
        hosts: hosts.map(host => createStatelessHost(host)),
        read(request, requestOptions) {
            /**
             * First, we compute the user request options. Now, keep in mind,
             * that using request options the user is able to modified the intire
             * payload of the request. Such as headers, query parameters, and others.
             */
            const mappedRequestOptions = createMappedRequestOptions(requestOptions, transporter.timeouts.read);
            const createRetryableRequest = () => {
                /**
                 * Then, we prepare a function factory that contains the construction of
                 * the retryable request. At this point, we may *not* perform the actual
                 * request. But we want to have the function factory ready.
                 */
                return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Read) !== 0), request, mappedRequestOptions);
            };
            /**
             * Once we have the function factory ready, we need to determine of the
             * request is "cacheable" - should be cached. Note that, once again,
             * the user can force this option.
             */
            const cacheable = mappedRequestOptions.cacheable !== undefined
                ? mappedRequestOptions.cacheable
                : request.cacheable;
            /**
             * If is not "cacheable", we immediatly trigger the retryable request, no
             * need to check cache implementations.
             */
            if (cacheable !== true) {
                return createRetryableRequest();
            }
            /**
             * If the request is "cacheable", we need to first compute the key to ask
             * the cache implementations if this request is on progress or if the
             * response already exists on the cache.
             */
            const key = {
                request,
                mappedRequestOptions,
                transporter: {
                    queryParameters: transporter.queryParameters,
                    headers: transporter.headers,
                },
            };
            /**
             * With the computed key, we first ask the responses cache
             * implemention if this request was been resolved before.
             */
            return transporter.responsesCache.get(key, () => {
                /**
                 * If the request has never resolved before, we actually ask if there
                 * is a current request with the same key on progress.
                 */
                return transporter.requestsCache.get(key, () => {
                    return (transporter.requestsCache
                        /**
                         * Finally, if there is no request in progress with the same key,
                         * this `createRetryableRequest()` will actually trigger the
                         * retryable request.
                         */
                        .set(key, createRetryableRequest())
                        .then(response => Promise.all([transporter.requestsCache.delete(key), response]), err => Promise.all([transporter.requestsCache.delete(key), Promise.reject(err)]))
                        .then(([_, response]) => response));
                });
            }, {
                /**
                 * Of course, once we get this response back from the server, we
                 * tell response cache to actually store the received response
                 * to be used later.
                 */
                miss: response => transporter.responsesCache.set(key, response),
            });
        },
        write(request, requestOptions) {
            /**
             * On write requests, no cache mechanisms are applied, and we
             * proxy the request immediately to the requester.
             */
            return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Write) !== 0), request, createMappedRequestOptions(requestOptions, transporter.timeouts.write));
        },
    };
    return transporter;
}

function createUserAgent(version) {
    const userAgent = {
        value: `Algolia for JavaScript (${version})`,
        add(options) {
            const addedUserAgent = `; ${options.segment}${options.version !== undefined ? ` (${options.version})` : ''}`;
            if (userAgent.value.indexOf(addedUserAgent) === -1) {
                // eslint-disable-next-line functional/immutable-data
                userAgent.value = `${userAgent.value}${addedUserAgent}`;
            }
            return userAgent;
        },
    };
    return userAgent;
}

function deserializeSuccess(response) {
    // eslint-disable-next-line functional/no-try-statement
    try {
        return JSON.parse(response.content);
    }
    catch (e) {
        throw createDeserializationError(e.message, response);
    }
}
function deserializeFailure({ content, status }, stackFrame) {
    // eslint-disable-next-line functional/no-let
    let message = content;
    // eslint-disable-next-line functional/no-try-statement
    try {
        message = JSON.parse(content).message;
    }
    catch (e) {
        // ..
    }
    return createApiError(message, status, stackFrame);
}

function serializeUrl(host, path, queryParameters) {
    const queryParametersAsString = serializeQueryParameters(queryParameters);
    // eslint-disable-next-line functional/no-let
    let url = `${host.protocol}://${host.url}/${path.charAt(0) === '/' ? path.substr(1) : path}`;
    if (queryParametersAsString.length) {
        url += `?${queryParametersAsString}`;
    }
    return url;
}
function serializeQueryParameters(parameters) {
    const isObjectOrArray = (value) => Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]';
    return Object.keys(parameters)
        .map(key => encode('%s=%s', key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]))
        .join('&');
}
function serializeData(request, requestOptions) {
    if (request.method === MethodEnum.Get ||
        (request.data === undefined && requestOptions.data === undefined)) {
        return undefined;
    }
    const data = Array.isArray(request.data)
        ? request.data
        : { ...request.data, ...requestOptions.data };
    return JSON.stringify(data);
}
function serializeHeaders(transporter, requestOptions) {
    const headers = {
        ...transporter.headers,
        ...requestOptions.headers,
    };
    const serializedHeaders = {};
    Object.keys(headers).forEach(header => {
        const value = headers[header];
        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data
        serializedHeaders[header.toLowerCase()] = value;
    });
    return serializedHeaders;
}

function stackTraceWithoutCredentials(stackTrace) {
    return stackTrace.map(stackFrame => stackFrameWithoutCredentials(stackFrame));
}
function stackFrameWithoutCredentials(stackFrame) {
    const modifiedHeaders = stackFrame.request.headers['x-algolia-api-key']
        ? { 'x-algolia-api-key': '*****' }
        : {};
    return {
        ...stackFrame,
        request: {
            ...stackFrame.request,
            headers: {
                ...stackFrame.request.headers,
                ...modifiedHeaders,
            },
        },
    };
}

function createApiError(message, status, transporterStackTrace) {
    return {
        name: 'ApiError',
        message,
        status,
        transporterStackTrace,
    };
}

function createDeserializationError(message, response) {
    return {
        name: 'DeserializationError',
        message,
        response,
    };
}

function createRetryError(transporterStackTrace) {
    return {
        name: 'RetryError',
        message: 'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
        transporterStackTrace,
    };
}

const createSearchClient = options => {
    const appId = options.appId;
    const auth = createAuth(options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders, appId, options.apiKey);
    const transporter = createTransporter({
        hosts: [
            { url: `${appId}-dsn.algolia.net`, accept: CallEnum.Read },
            { url: `${appId}.algolia.net`, accept: CallEnum.Write },
        ].concat(shuffle([
            { url: `${appId}-1.algolianet.com` },
            { url: `${appId}-2.algolianet.com` },
            { url: `${appId}-3.algolianet.com` },
        ])),
        ...options,
        headers: {
            ...auth.headers(),
            ...{ 'content-type': 'application/x-www-form-urlencoded' },
            ...options.headers,
        },
        queryParameters: {
            ...auth.queryParameters(),
            ...options.queryParameters,
        },
    });
    const base = {
        transporter,
        appId,
        addAlgoliaAgent(segment, version) {
            transporter.userAgent.add({ segment, version });
        },
        clearCache() {
            return Promise.all([
                transporter.requestsCache.clear(),
                transporter.responsesCache.clear(),
            ]).then(() => undefined);
        },
    };
    return addMethods(base, options.methods);
};

const customRequest = (base) => {
    return (request, requestOptions) => {
        if (request.method === MethodEnum.Get) {
            return base.transporter.read(request, requestOptions);
        }
        return base.transporter.write(request, requestOptions);
    };
};

const initIndex = (base) => {
    return (indexName, options = {}) => {
        const searchIndex = {
            transporter: base.transporter,
            appId: base.appId,
            indexName,
        };
        return addMethods(searchIndex, options.methods);
    };
};

const multipleQueries = (base) => {
    return (queries, requestOptions) => {
        const requests = queries.map(query => {
            return {
                ...query,
                params: serializeQueryParameters(query.params || {}),
            };
        });
        return base.transporter.read({
            method: MethodEnum.Post,
            path: '1/indexes/*/queries',
            data: {
                requests,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const multipleSearchForFacetValues = (base) => {
    return (queries, requestOptions) => {
        return Promise.all(queries.map(query => {
            const { facetName, facetQuery, ...params } = query.params;
            return initIndex(base)(query.indexName, {
                methods: { searchForFacetValues },
            }).searchForFacetValues(facetName, facetQuery, {
                ...requestOptions,
                ...params,
            });
        }));
    };
};

const findAnswers = (base) => {
    return (query, queryLanguages, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: encode('1/answers/%s/prediction', base.indexName),
            data: {
                query,
                queryLanguages,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const search = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/query', base.indexName),
            data: {
                query,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const searchForFacetValues = (base) => {
    return (facetName, facetQuery, requestOptions) => {
        return base.transporter.read({
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/facets/%s/query', base.indexName, facetName),
            data: {
                facetQuery,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const LogLevelEnum = {
    Debug: 1,
    Info: 2,
    Error: 3,
};

/* eslint no-console: 0 */
function createConsoleLogger(logLevel) {
    return {
        debug(message, args) {
            if (LogLevelEnum.Debug >= logLevel) {
                console.debug(message, args);
            }
            return Promise.resolve();
        },
        info(message, args) {
            if (LogLevelEnum.Info >= logLevel) {
                console.info(message, args);
            }
            return Promise.resolve();
        },
        error(message, args) {
            console.error(message, args);
            return Promise.resolve();
        },
    };
}

function createBrowserXhrRequester() {
    return {
        send(request) {
            return new Promise((resolve) => {
                const baseRequester = new XMLHttpRequest();
                baseRequester.open(request.method, request.url, true);
                Object.keys(request.headers).forEach(key => baseRequester.setRequestHeader(key, request.headers[key]));
                const createTimeout = (timeout, content) => {
                    return setTimeout(() => {
                        baseRequester.abort();
                        resolve({
                            status: 0,
                            content,
                            isTimedOut: true,
                        });
                    }, timeout * 1000);
                };
                const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');
                // eslint-disable-next-line functional/no-let
                let responseTimeout;
                // eslint-disable-next-line functional/immutable-data
                baseRequester.onreadystatechange = () => {
                    if (baseRequester.readyState > baseRequester.OPENED && responseTimeout === undefined) {
                        clearTimeout(connectTimeout);
                        responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
                    }
                };
                // eslint-disable-next-line functional/immutable-data
                baseRequester.onerror = () => {
                    // istanbul ignore next
                    if (baseRequester.status === 0) {
                        clearTimeout(connectTimeout);
                        clearTimeout(responseTimeout);
                        resolve({
                            content: baseRequester.responseText || 'Network request failed',
                            status: baseRequester.status,
                            isTimedOut: false,
                        });
                    }
                };
                //  eslint-disable-next-line functional/immutable-data
                baseRequester.onload = () => {
                    clearTimeout(connectTimeout);
                    clearTimeout(responseTimeout);
                    resolve({
                        content: baseRequester.responseText,
                        status: baseRequester.status,
                        isTimedOut: false,
                    });
                };
                baseRequester.send(request.data);
            });
        },
    };
}

function algoliasearch(appId, apiKey, options) {
    const commonOptions = {
        appId,
        apiKey,
        timeouts: {
            connect: 1,
            read: 2,
            write: 30,
        },
        requester: createBrowserXhrRequester(),
        logger: createConsoleLogger(LogLevelEnum.Error),
        responsesCache: createInMemoryCache(),
        requestsCache: createInMemoryCache({ serializable: false }),
        hostsCache: createFallbackableCache({
            caches: [
                createBrowserLocalStorageCache({ key: `${version}-${appId}` }),
                createInMemoryCache(),
            ],
        }),
        userAgent: createUserAgent(version).add({
            segment: 'Browser',
            version: 'lite',
        }),
        authMode: AuthMode.WithinQueryParameters,
    };
    return createSearchClient({
        ...commonOptions,
        ...options,
        methods: {
            search: multipleQueries,
            searchForFacetValues: multipleSearchForFacetValues,
            multipleQueries,
            multipleSearchForFacetValues,
            customRequest,
            initIndex: base => (indexName) => {
                return initIndex(base)(indexName, {
                    methods: { search, searchForFacetValues, findAnswers },
                });
            },
        },
    });
}
// eslint-disable-next-line functional/immutable-data
algoliasearch.version = version;

var searchIcon = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.76 13.27L20.49 19 19 20.49l-5.73-5.73C12.2 15.53 10.91 16 9.5 16A6.5 6.5 0 1116 9.5c0 1.41-.47 2.7-1.24 3.77zM9.5 5C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14 14 11.99 14 9.5 11.99 5 9.5 5z\"/></svg>";

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const activateSearch = store.action(() => {
  // Scroll the window to the top of the page.
  const html = /** @type {HTMLElement} */ (document.querySelector('html'));
  html.scrollTop = 0;

  // Mark all interactive elements as inert so the user can't tab out of the
  // search modal.
  document.querySelectorAll('[data-search-inert]').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = true;
  });

  // Prevent the user from scrolling the page underneath the search modal.
  document.body.classList.add('overflow-hidden');

  return {isSearchActive: true};
});

const deactivateSearch = store.action(() => {
  // Re-enable interactive elements now that the search modal is closed.
  document.querySelectorAll('[data-search-inert]').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = false;
  });

  // Re-enable page scrolling.
  document.body.classList.remove('overflow-hidden');

  return {isSearchActive: false};
});

/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const client = algoliasearch('0PPZV3EY55', 'dc0d3a2d53885be29eacc351026dcdcf');
const index = client.initIndex('prod_developer_chrome');

const blockedQueries = [
  /add? ?bloc?k?/,
  /d(a|o|u)w?nl?o?/,
  /^p(a|e)r+(l|al|el)/,
  /automate be/,
  /roblox/,
  /ublock/,
  /vpn/,
  /porn/,
  /xxx/,
];

class SearchBox extends BaseElement$1 {
  static get properties() {
    return {
      active: {type: Boolean, reflect: true},
      buttonLabel: {type: String},
      docsLabel: {type: String},
      articlesLabel: {type: String},
      blogLabel: {type: String},
      locale: {type: String},
      placeholder: {type: String},
      results: {type: Array},
      cursor: {type: Number},
    };
  }

  set active(isActive) {
    if (this._active === isActive) {
      return;
    }

    const oldVal = this._active;
    this._active = isActive;
    if (isActive) {
      activateSearch();
    } else {
      this.cursor = -1;
      deactivateSearch();
    }
    this.setAttribute('aria-expanded', isActive.toString());
    this.requestUpdate('active', oldVal);
  }

  get active() {
    return this._active;
  }

  constructor() {
    super();
    this._active = false;
    this.buttonLabel = 'open search';
    this.docsLabel = 'Documentation';
    this.overviewLabel = 'Overview';
    this.articlesLabel = 'Articles';
    this.blogLabel = 'Blog';
    this.locale = 'en';
    this.placeholder = 'Search';
    this.query = '';
    /** @type AlgoliaCollectionItem[] */
    this.results = [];
    /** @type {Object<string, AlgoliaCollectionItem[]>} */
    this.categorisedResults = {};
    // Used when rendering categorized results. The counter helps ensure that
    // each result has a unique id that corresponds to its rendered order in
    // the list.
    this.resultsCounter = -1;
    // Used to track which result the user has navigated to using their keyboard.
    this.cursor = -1;
    /** @type {!HTMLInputElement} */
    this.input;
    this.closeIcon = unsafeSVG(closeIcon);
    this.searchIcon = unsafeSVG(searchIcon);

    this.renderResult = this.renderResult.bind(this);
    this.search = debounce(this.search.bind(this), 1000);
  }

  clearSearch() {
    this.input.blur();
    this.active = false;
    this.input.value = '';
    this.search('');
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-owns', 'search-box__results');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-expanded', 'false');
  }

  firstUpdated() {
    this.input = /** @type {!HTMLInputElement} */ (
      this.querySelector('.search-box__input')
    );

    // Purely for style points.
    // Add a meta/ctrl + K keyboard shortcut to quick-focus the search input.
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        this.input.focus();
      }
    });
  }

  /**
   * Keep track of cursor changes and reflect them to aria-activedescendant.
   * This ensures screen readers properly announce the current search result.
   * We do this because focus never leaves the search input box, so when the
   * user is arrowing through results, we have to tell the screen reader about
   * it.
   * @param {Map<string, string>} changedProperties A Map of LitElement properties that changed.
   */
  updated(changedProperties) {
    if (!changedProperties.has('cursor')) {
      return;
    }

    if (this.cursor === -1) {
      this.input.removeAttribute('aria-activedescendant');
      return;
    }

    this.input.setAttribute(
      'aria-activedescendant',
      `search-box__link-${this.cursor}`
    );
  }

  /**
   * @param {WKeyboardEvent} e
   */
  onInput(e) {
    // If the user has deleted everything in the search box, clear all state
    // and hide the results modal.
    if (!this.input.value) {
      this.clearSearch();
      return;
    }

    this.active = true;
    this.search(e.target.value);
  }

  /**
   * @param {WKeyboardEvent} e
   */
  onKeyDown(e) {
    // Check if the user is navigating within the search popout.
    switch (e.key) {
      case 'Home':
        e.preventDefault();
        this.firstHit();
        return;

      case 'End':
        e.preventDefault();
        this.lastHit();
        return;

      case 'ArrowUp':
        e.preventDefault();
        this.prevHit();
        return;

      case 'ArrowDown':
        e.preventDefault();
        this.nextHit();
        return;

      case 'Enter':
        this.navigateToResult();
        return;

      case 'Escape':
        this.clearSearch();
        return;
    }
  }

  firstHit() {
    this.cursor = 0;
    this.scrollHitIntoView();
  }

  nextHit() {
    if (this.cursor < this.results.length - 1) {
      this.cursor++;
    } else {
      this.cursor = 0;
    }
    this.scrollHitIntoView();
  }

  lastHit() {
    this.cursor = this.results.length - 1;
    this.scrollHitIntoView();
  }

  prevHit() {
    if (this.cursor <= 0) {
      this.cursor = this.results.length - 1;
    } else {
      --this.cursor;
    }
    this.scrollHitIntoView();
  }

  navigateToResult() {
    const link = /** @type {HTMLAnchorElement} */ (
      this.querySelector('.search-box__link[aria-selected="true"]')
    );

    if (link) {
      window.location.href = link.href;
    }
  }

  /**
   * Changing this.cursor causes LitElement to render,
   * so we wait for LitElement to render,
   * then we attempt to scroll the current active link into view.
   *
   * This is done because focus never leaves the input field since the user may
   * still be typing their query. As a result, we need to tell the browser to
   * scroll if the user has arrowed down to a result that has overflown the
   * container.
   */
  scrollHitIntoView() {
    this.requestUpdate().then(() => {
      const activeLink = /** @type {HTMLAnchorElement} */ (
        this.querySelector('.search-box__link[aria-selected="true"]')
      );

      const modal = /** @type {HTMLElement} */ (
        this.querySelector('.search-box__results')
      );

      // Unfortunately we can't use scrollIntoView() as it seems to scroll the
      // entire page. So instead we manually scroll the modal to the offsetTop
      // of the active link.
      if (activeLink && modal) {
        modal.scrollTo({top: activeLink.offsetTop, behavior: 'smooth'});
      }
    });
  }

  async toggleSearch() {
    this.active = !this.active;
    if (this.active) {
      // Wait for the element to render, then focus the input.
      // We do this because the input will be display: none on mobile
      // and calling focus() on it would have no effect.
      await this.updateComplete;
      this.input.focus();
    } else {
      this.clearSearch();
    }
  }

  async search(query) {
    this.query = query.trim();

    for (const blockedQuery of blockedQueries) {
      if (this.query.match(blockedQuery)) {
        return;
      }
    }

    if (this.query === '') {
      this.results = [];
      this.categorisedResults = {};
      return;
    }

    if (this.query.length < 4) {
      this.results = [];
      this.categorisedResults = {};
      return;
    }

    try {
      const {hits: results} = await index.search(query, {
        hitsPerPage: 10,
        filters: `locale:"${this.locale}"`,
        highlightPreTag: '<strong>',
        highlightPostTag: '</strong>',
        // Adds a _snippetResult property to the response, truncated to 25 words.
        attributesToSnippet: ['content:25'],
        snippetEllipsisText: '…',
      });

      this.results = results.map(r => {
        // Algolia organizes searchable fields into the following structure:
        // {title: {value: 'some content', matchLevel: 'full|partial|none' }}
        // This helper just lets us define keys that we want to extract the
        // value from and add to the top level result object.
        // At present we only use a single key, 'title', but we'll probably add
        // more keys over time (tags, etc) so I'm leaving this helper in place.
        const highlightKeys = ['title'];
        for (const highlightKey of highlightKeys) {
          const highlightValue = r._highlightResult[highlightKey];
          if (highlightValue && highlightValue.matchLevel === 'full') {
            r[highlightKey] = highlightValue.value;
          }
        }
        // Some pages don't get indexed with fulltext content, but they do have
        // a meta description, so fall back to that.
        r.snippet =
          r._snippetResult.content?.value ||
          r._snippetResult.description?.value ||
          '';
        return r;
      });

      // Further categorize results into docs, articles, blog and the remaining posts.
      /** @type {AlgoliaCollectionItem[] & {
       *   filterMutate?: (predicate: (item: AlgoliaCollectionItem) => boolean) => AlgoliaCollectionItem[]
       * }}
       */
      const mutableResults = [...this.results];
      mutableResults.filterMutate = predicate => {
        const results = [];
        let i = 0;
        while (i < mutableResults.length) {
          if (predicate(mutableResults[i])) {
            results.push(mutableResults.splice(i, 1)[0]);
          } else {
            i++;
          }
        }

        return results;
      };

      this.categorisedResults = {
        [this.overviewLabel]: [],
        [this.docsLabel]: mutableResults.filterMutate(r => r.type === 'doc'),
        [this.articlesLabel]: mutableResults.filterMutate(
          r => r.type === 'article'
        ),
        [this.blogLabel]: mutableResults.filterMutate(
          r => r.type === 'blogPost'
        ),
      };

      this.categorisedResults[this.overviewLabel] = mutableResults;
    } catch (err) {
      console.error(err);
      console.error(/** @type {any} */ (err).debugData);
    }
  }

  /**
   * @param {string} [content]
   * @return {TemplateResult|undefined}
   */
  renderContent(content) {
    if (!content || content.length === 0) {
      return;
    }

    return html`<p>${unsafeHTML(content)}</p>`;
  }

  /**
   * @param {string} [image]
   * @return {TemplateResult|undefined}
   */
  renderImage(image) {
    if (!image || image.length === 0) {
      return;
    }

    return html`<img
      class="search-box__thumbnail"
      src="${image}"
      width="100"
      height="100"
      alt=""
    />`;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  renderResult(result) {
    // Because we split results across multiple sections (docs, blog, etc)
    // we need to have a single top-level counter so when the user presses
    // the down arrow key, we navigate to the next result, regardless of
    // which section its in.
    this.resultsCounter += 1;
    return html`
      <div role="presentation">
        <a
          id="search-box__link-${this.resultsCounter}"
          class="search-box__link"
          href="${result.url}"
          aria-selected="${this.resultsCounter === this.cursor}"
          role="option"
        >
          <div>
            <h3 class="search-box__title type--h6">
              ${unsafeHTML(result.title)}
            </h3>
            <div class="search-box__snippet type--small">
              ${this.renderContent(result.snippet)}
            </div>
          </div>
          ${this.renderImage(result.image)}
        </a>
      </div>
    `;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  renderResults() {
    if (!this.active) {
      return;
    }

    // check if the query length is less than two
    // if it is, then prompt the user to search for at
    // least three characters
    if (this.query.length <= 2) {
      return html`
        <div
          id="search-box__results"
          class="search-box__results"
          role="listbox"
          aria-label="${this.placeholder}"
        >
          <div class="search-box__result-heading type--label">
            Please enter at least 3 characters for search suggestions.
          </div>
        </div>
      `;
    }

    this.resultsCounter = -1;
    return html`
      <div
        id="search-box__results"
        class="search-box__results"
        role="listbox"
        aria-label="${this.placeholder}"
      >
        ${Object.entries(this.categorisedResults).map(([label, results]) =>
          results.length
            ? html`
                <div class="search-box__result-heading type--label">
                  ${label.toUpperCase()}
                </div>
                ${results.map(this.renderResult)}
              `
            : ''
        )}
      </div>
    `;
  }

  render() {
    // prettier-ignore
    return html`
      <div class="search-box__inner" role="presentation">
        <button
          @click="${this.toggleSearch}"
          aria-label="${this.buttonLabel}"
          class="search-box__btn"
        >
          ${this.active ? this.closeIcon : this.searchIcon}
        </button>

        <input
          type="text"
          class="search-box__input"
          placeholder="${this.placeholder}"
          @input="${this.onInput}"
          @keydown="${this.onKeyDown}"
          aria-label="${this.placeholder}"
          aria-autocomplete="list"
        />
      </div>
      ${this.renderResults()}
    `;
  }
}

customElements.define('search-box', SearchBox);

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const expandableElements = new WeakSet();

/**
 * Imbues an HTMLElement with aria-expanded behaviors. The element will default
 * to aria-expanded="false" unless the element has an existing aria-expanded
 * attribute.
 * @param {HTMLElement} element An HTMLElement
 */
const expandable = element => {
  if (!element || expandableElements.has(element)) {
    return;
  }

  function isAriaExpanded(element) {
    return element.getAttribute('aria-expanded') === 'true';
  }

  function toggleAriaExpanded(e) {
    const element = e.currentTarget;
    const update = !isAriaExpanded(element);
    element.setAttribute('aria-expanded', update ? 'true' : 'false');
  }

  element.addEventListener('click', toggleAriaExpanded);
  expandableElements.add(element);
};

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class NavigationTree extends BaseElement$1 {
  constructor() {
    super();
    this.onBack = this.onBack.bind(this);
  }

  connectedCallback() {
    // Imbue expandable buttons with aria-expanded behavior.
    // @ts-ignore
    this.querySelectorAll('[data-expandable]').forEach(expandable);

    this.backBtn = /** @type {HTMLElement} */ (
      this.querySelector('.navigation-tree__back')
    );
    this.backBtn.addEventListener('click', this.onBack);
  }

  disconnectedCallback() {
    /** @type {HTMLElement} */ (this.backBtn).removeEventListener(
      'click',
      this.onBack
    );
  }

  onBack() {
    this.dispatchEvent(new Event('navigation-tree-back', {bubbles: true}));
  }
}

customElements.define('navigation-tree', NavigationTree);

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class NavigationRail extends BaseElement$1 {
  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
  }

  connectedCallback() {
    this.closeBtn = /** @type {HTMLElement} */ (
      this.querySelector('.navigation-rail__close')
    );
    this.closeBtn.addEventListener('click', this.onClose);
  }

  disconnectedCallback() {
    /** @type {HTMLElement} */ (this.closeBtn).removeEventListener(
      'click',
      this.onClose
    );
  }

  onClose() {
    this.dispatchEvent(new Event('navigation-rail-collapse', {bubbles: true}));
  }
}

customElements.define('navigation-rail', NavigationRail);

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const expandSideNav = store.action(() => {
  document.querySelectorAll('[data-side-nav-inert').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = true;
  });

  /** @type {SideNav} */ (document.querySelector('side-nav')).expanded = true;

  // Prevent the user from scrolling the page underneath the search modal.
  document.body.classList.add('overflow-hidden');

  return {isSideNavExpanded: true};
});

const collapseSideNav = store.action(() => {
  document.querySelectorAll('[data-side-nav-inert').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = false;
  });

  /** @type {SideNav} */ (document.querySelector('side-nav')).expanded = false;

  // Re-enable page scrolling.
  document.body.classList.remove('overflow-hidden');

  return {isSideNavExpanded: false};
});

const restoreFocus = store.action(() => {
  /** @type {HTMLElement} */ (
    document.querySelector('.top-nav__hamburger')
  ).focus();
});

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class SideNav extends BaseElement$1 {
  static get properties() {
    return {
      type: {type: String, reflect: true},
      view: {type: String, reflect: true},
      animating: {type: Boolean, reflect: true},
      expanding: {type: Boolean},
      collapsing: {type: Boolean},
      switchingViews: {type: Boolean},
      expanded: {type: Boolean, attribute: false},
    };
  }

  set expanded(value) {
    if (this._expanded === value) {
      return;
    }

    if (value) {
      this.setAttribute('expanded', '');
      this.expanding = true;
      this.intersectionObserver.observe(this);
    } else {
      this.removeAttribute('expanded');
      this.collapsing = true;
      this.intersectionObserver.disconnect();
    }

    this.animating = true;
    this._expanded = value;
  }

  get expanded() {
    return this._expanded;
  }

  constructor() {
    super();
    this.type = 'site';
    this.animating = false;
    this.expanding = false;
    this.collapsing = false;
    this.switchingViews = false;
    this._expanded = false;

    this.onBack = this.onBack.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    // Keep track of whether the sidebar is visible. This only matters if the sidebar is opened
    // on a small screen and then becomes larger. We call `onVisibleChange` to close the sidebar.
    this.intersectionObserver = new IntersectionObserver(entries => {
      let visible = false;
      for (const entry of entries) {
        if (entry.target === this) {
          visible = entry.intersectionRatio > 0;
        }
      }
      this.onVisibleChange(visible);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Configure initial state.
    // If we're on a project page on mobile then the side-nav should initially
    // show the project navigation, followed by the site-wide navigation.
    if (this.type === 'project') {
      this.view = 'project';
    } else {
      this.view = 'site';
    }

    this.projectView = /** @type {!HTMLElement} */ (
      this.querySelector('navigation-tree')
    );

    this.siteView = /** @type {!HTMLElement} */ (
      this.querySelector('navigation-rail')
    );

    // This will catch if the user clicks the ::before element which acts as a
    // site overlay when the side-nav is expanded on mobile.
    // It will not fire if the user is clicking around inside of the
    // side-nav-views element because that element stops event
    // propogation (see below).
    this.addEventListener('click', collapseSideNav);

    // If one of the nav elements inside of side-nav was clicked, we
    // block the click so the side-nav won't collapse. If the click was outside
    // of the container/on the overlay, we close the side-nav.
    this.querySelectorAll('navigation-rail, navigation-tree').forEach(nav =>
      nav.addEventListener('click', this.onBlockClicks)
    );

    this.addEventListener('navigation-rail-collapse', collapseSideNav);
    this.addEventListener('navigation-tree-back', this.onBack);
    this.addEventListener('transitionend', this.onTransitionEnd);
  }

  disconnectedCallback() {
    this.removeEventListener('click', collapseSideNav);
    this.querySelectorAll('navigation-rail, navigation-tree').forEach(nav =>
      nav.removeEventListener('click', this.onBlockClicks)
    );
    this.removeEventListener('navigation-rail-collapse', collapseSideNav);
    this.removeEventListener('navigation-tree-back', this.onBack);
    this.removeEventListener('transitionend', this.onTransitionEnd);
  }

  /**
   * Called by IntersectionObserver with visibility changes.
   *
   * @param {boolean} visible
   */
  onVisibleChange(visible) {
    if (!visible) {
      collapseSideNav();
    }
  }

  /**
   * Block clicks if the user is just clicking around inside of the nav element.
   * @param {Event} e
   */
  onBlockClicks(e) {
    const link = /** @type {HTMLElement} */ (e.target).closest('a');
    if (!link) {
      e.stopPropagation();
    }
  }

  /**
   * Lets the user toggle from project-specific links, to site-wide links.
   */
  onBack() {
    this.animating = true;
    this.switchingViews = true;
    this.view = 'site';
  }

  onTransitionEnd() {
    this.animating = false;

    if (this.collapsing) {
      this.collapsing = false;
      if (this.type === 'project') {
        this.view = 'project';
      }
      // Tell the page to restore focus to the hamburger menu button in the
      // top-nav.
      restoreFocus();
      return;
    }

    if (this.expanding) {
      this.expanding = false;
      if (this.type === 'project') {
        /** @type {HTMLElement} */ (this.projectView).focus();
      } else {
        /** @type {HTMLElement} */ (this.siteView).focus();
      }
      return;
    }

    if (this.switchingViews) {
      this.switchingViews = false;
      /** @type {HTMLElement} */ (this.siteView).focus();
      return;
    }
  }
}

customElements.define('side-nav', SideNav);

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Base element which subscribes to global state.
 *
 * @extends {BaseElement}
 */
class BaseStateElement extends BaseElement$1 {
  constructor() {
    super();
    this.onStateChanged = this.onStateChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStateChanged);
    this.onStateChanged(store.getState());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    store.unsubscribe(this.onStateChanged);
  }

  /**
   * This method will be called whenever unistore state changes,
   * you can overwrite the method to hook into the event and deconstruct the state.
   *
   * @param {!Object<string, *>} state
   */

  // @ts-ignore-start
  onStateChanged(state) {} // eslint-disable-line no-unused-vars
  // @ts-ignore-end
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class TopNav extends BaseStateElement {
  connectedCallback() {
    super.connectedCallback();
    this.hamburgerBtn = /** @type {HTMLElement} */ (
      this.querySelector('.top-nav__hamburger')
    );
    this.hamburgerBtn.addEventListener('click', expandSideNav);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    /** @type {HTMLElement} */ (this.hamburgerBtn).removeEventListener(
      'click',
      expandSideNav
    );
  }

  onStateChanged({isSearchActive}) {
    if (isSearchActive) {
      this.setAttribute('data-search-active', '');
    } else {
      this.removeAttribute('data-search-active');
    }
  }
}

customElements.define('top-nav', TopNav);

/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class ShareButton extends BaseElement$1 {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  onClick(e) {
    // If Web Share API is available, intercept the call.
    if ('share' in window.navigator) {
      e.preventDefault();
      navigator.share({
        text: this.shareText,
        url: this.shareUrl,
      });
    }
  }

  get shareUrl() {
    return window.location.href;
  }

  get shareText() {
    const messageText = this.getAttribute('message');
    return messageText && messageText.length ? messageText : document.title;
  }
}

customElements.define('share-button', ShareButton);

/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class WebTabs extends BaseElement$1 {
  constructor() {
    super();
    this._tabPanels = [];
    this.onSelect = this.onSelect.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._id = `tabs-${generateIdSalt('tabs-')}`;
    this._selected = this._getSelectedTabIndex();
  }

  onSelect(e) {
    const tabIndex = parseInt(e.target.id.split('-').pop(), 10);
    if (this._selected !== tabIndex) {
      this._select(tabIndex);
    }
  }

  _select(tabIndex) {
    this._selected = tabIndex;
    this._tabPanels.forEach(tabPanel => {
      const tabIndex = parseInt(tabPanel.id.split('-').pop(), 10);
      const tabId = '#' + tabPanel.getAttribute('aria-labelledby');
      const tab = this.querySelector(tabId);
      if (this._selected !== tabIndex) {
        tabPanel.setAttribute('hidden', 'hidden');
        tab?.setAttribute('tabindex', '-1');
        tab?.setAttribute('aria-selected', 'false');
      } else {
        tabPanel.removeAttribute('hidden');
        tab?.setAttribute('tabindex', '0');
        tab?.setAttribute('aria-selected', 'true');
      }
    });
  }

  _formatTabs() {
    return this._tabPanels.map((child, i) => {
      const title = child.getAttribute('title');
      child.removeAttribute('title');
      const tabId = `${this._id}__tab-${i}`;
      const tabPanelId = `${this._id}__tabpanel-${i}`;
      child.setAttribute('id', tabPanelId);
      child.setAttribute('role', 'tabpanel');
      child.setAttribute('aria-labelledby', tabId);
      child.setAttribute('tabindex', 0);
      if (i !== this._selected) {
        child.setAttribute('hidden', 'hidden');
      } else {
        child.removeAttribute('hidden');
      }

      return html`<button
        role="tab"
        id="${tabId}"
        aria-selected="${i === this._selected}"
        aria-controls="${tabPanelId}"
        tabindex="${i === this._selected ? 0 : -1}"
        @click="${this.onSelect}"
      >
        ${title}
      </button>`;
    });
  }

  _getSelectedTabIndex() {
    const hash = window.location.hash;

    if (!hash) {
      return 0;
    }

    const targetElement = this.querySelector(hash);

    if (!targetElement) {
      return 0;
    }

    const tab = targetElement.closest('web-tab');

    if (!tab) {
      return 0;
    }

    return Array.from(this.children).indexOf(tab);
  }

  render() {
    if ('resolved' in this.dataset) {
      return Array.from(this.children);
    }

    this._tabPanels = Array.from(this.children);
    const tabs = this._formatTabs();

    return html`
      <div role="tablist">${tabs}</div>
      ${this._tabPanels}
    `;
  }
}

customElements.define('web-tabs', WebTabs);

/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable require-jsdoc */
class BaseElement extends LitElement {
  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
}

/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A map of supported language codes to their full names.
 * @const
 */
const languageNames = {
  en: 'English',
  pl: 'Polski',
  es: 'Español',
  ko: '한국어',
  zh: '中文',
  ru: 'Pусский',
  pt: 'Português',
  ja: '日本語',
};

class LanguageSelect extends BaseElement {
  static get properties() {
    return {
      current: {type: String}, // Current language of the document.
      supported: {type: String}, // Comma-separated list of language codes.
    };
  }

  constructor() {
    super();
    this.supported = Object.keys(languageNames).join(',') || '';
    this.supportedLanguages = [];
  }

  onChange() {
    // To be optionally implemented by an inheriting class.
  }

  connectedCallback() {
    super.connectedCallback();
    /* eslint-disable no-undef */
    this.current = document.documentElement.lang;
    this.supportedLanguages = this.supported.split(',');
  }

  renderOption(language) {
    let languageName = languageNames[language];
    if (!languageName) {
      return '';
    }
    languageName = languageName.toUpperCase();
    return this.current === language
      ? html`
          <option value="${language}" selected>
            ${languageName} (${language})
          </option>
        `
      : html`
          <option value="${language}">${languageName} (${language})</option>
        `;
  }

  render() {
    const languageVersions = Array.from(
      /* eslint-disable no-undef */
      document.querySelectorAll('link[rel="alternate"]')
    )
      .filter(link => link['hreflang'])
      .map(link => link['hreflang']);
    /* eslint-disable no-undef */
    const currentLang = document.documentElement.lang;
    const langList = this.supportedLanguages.filter(language => {
      return languageVersions.includes(language) || language === currentLang;
    });
    return html`
      <div class="language-select">
        <label class="w-visually-hidden" for="preferred-language">
          Choose language
        </label>
        <select id="preferred-language" @change="${this.onChange}">
          ${langList.map(language => this.renderOption(language))}
        </select>
      </div>
    `;
  }
}

/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @type {HTMLElement}
 */
class DccLanguageSelect extends LanguageSelect {
  constructor() {
    super();
    this.current = 'en';
    this.supportedLanguages = [];
  }

  onChange(e) {
    const lang = e.target.value;
    if (!this.supportedLanguages.includes(lang)) {
      return;
    }
    if (lang !== this.current) {
      const pathParts = location.pathname.split('/');
      const replace = this.supportedLanguages.includes(pathParts[1]) ? 1 : 0;
      pathParts.splice(1, replace, lang);
      location.href = pathParts.join('/');
    }
  }
}

// @ts-ignore
customElements.define('language-select', DccLanguageSelect);

class Banner extends HTMLElement {
  connectedCallback() {
    // No matter when this runs, the close button will not be visible until
    // after this class is added—this prevents ghost clicks on the button before
    // the event listener is added.
    this.setAttribute('active', '');
    this.addEventListener('click', e => {
      const buttonClicked = /** @type {HTMLElement} */ (e.target).closest(
        '[data-banner-close-btn]'
      );
      if (buttonClicked) {
        this.savePreference(buttonClicked);
        this.close();
      }
    });
  }

  savePreference(button) {
    const storageKey = this.getAttribute('storage-key') || '';
    const cta = button.getAttribute('storage-value');
    if (cta) {
      localStorage.setItem(storageKey, cta);
    } else {
      const hrefCta = this.querySelector('a[href]');
      if (hrefCta) {
        const ctaUrl = hrefCta.getAttribute('href') || '';
        localStorage.setItem(storageKey, ctaUrl);
      }
    }
  }

  close() {
    this.setAttribute('hidden', 'true');
  }
}

window.customElements.define('announcement-banner', Banner);

/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class TocActive extends BaseElement$1 {
  constructor() {
    super();
    this.updateHeading = () => {};

    /** @type {HTMLAnchorElement?} */
    this.previousActiveAnchor = null;

    /** @type {Set<HTMLElement>} */
    this.visibleHeadings = new Set();

    let rafPending = 0;

    const options = {threshold: 0.5};
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const t = /** @type {HTMLElement} */ (entry.target);
        if (entry.isIntersecting) {
          this.visibleHeadings.add(t);
        } else {
          this.visibleHeadings.delete(t);
        }

        // After any heading becomes visible or invisible (most likely due to
        // scroll or on startup), check which one is most active in a rAF.
        if (rafPending) {
          return;
        }
        rafPending = window.requestAnimationFrame(() => {
          rafPending = 0;
          this.updateHeading();
        });
      });
    }, options);
  }

  connectedCallback() {
    super.connectedCallback();

    // Make sure we have an article. Abandon if not.
    const se = document.scrollingElement;
    const target = document.body.querySelector('article');
    if (!target || !se) {
      return;
    }

    /** @type {{[hash: string]: HTMLAnchorElement}} */
    const tocLinkDict = {};
    const links = /** @type {NodeListOf<HTMLAnchorElement>} */ (
      this.querySelectorAll('a[href]')
    );
    /** @type {HTMLAnchorElement?} */
    let firstLink = null;
    for (const link of links) {
      const rawHref = link.getAttribute('href') ?? '';
      if (rawHref.startsWith('#')) {
        tocLinkDict[rawHref.substr(1)] = link;
        if (firstLink === null) {
          firstLink = link;
        }
      }
    }

    // Add all the headings in the article to an IntersectionObserver.
    const allArticleHeadings = /** @type {NodeListOf<HTMLElement>} */ (
      target.querySelectorAll('[id]')
    );
    for (const articleHeading of allArticleHeadings) {
      this.observer.observe(articleHeading);
    }

    this.updateHeading = () => {
      // Find the first visible anchor element inside the article that has a
      // matching link in the TOC.
      // We assume the DOM order matches the display order.
      /** @type {HTMLAnchorElement?} */
      let found = null;
      for (const articleHeading of allArticleHeadings) {
        if (
          this.visibleHeadings.has(articleHeading) &&
          articleHeading.id in tocLinkDict
        ) {
          found = tocLinkDict[articleHeading.id];
          break;
        }
      }

      if (found === this.previousActiveAnchor) {
        return;
      }

      // We don't remove `toc-active` from a previous anchor if there's no new
      // best found heading: this is possible in long articles where there's no
      // visible headings in a large section of text.
      // This basically makes it appear as if something is always active.
      if (found) {
        if (this.previousActiveAnchor) {
          this.previousActiveAnchor.removeAttribute('toc--active');
        }
        found.setAttribute('toc--active', '');
        this.previousActiveAnchor = found;

        // Scroll this heading into view, ensuring that long ToCs will always
        // have the active heading visible in the scroll area. If it's the first
        // heading, actually scroll to the top of the container (first element
        // child), so the "Table of Contents" heading appears.
        if (found === firstLink) {
          this.scrollTop = 0;
        } else {
          localScrollIntoView(found, this);
        }
      }
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();

    if (this.previousActiveAnchor) {
      this.previousActiveAnchor.removeAttribute('toc--active');
      this.previousActiveAnchor = null;
    }
  }
}

/**
 * This is a simplified version of `scrollIntoView`, as that causes odd
 * interactions with nested scroll containers in Chrome.
 *
 * @param {Element} target
 * @param {Element} container
 */
function localScrollIntoView(target, container) {
  const bounds = target.getBoundingClientRect();
  const containerBounds = container.getBoundingClientRect();

  const offTop = containerBounds.top - bounds.top;
  if (offTop > 0) {
    // Target is above the element.
    container.scrollTop -= offTop;
  } else {
    const offEnd = bounds.bottom - containerBounds.bottom;
    if (offEnd > 0) {
      // Target is below the element.
      container.scrollTop += offEnd;
    }
  }
}

customElements.define('toc-active', TocActive);

/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class SelectLoader extends BaseElement$1 {
  constructor() {
    super();

    this.addEventListener('change', event => {
      const t = event.target;
      if (!(t instanceof HTMLSelectElement)) {
        return;
      }
      const option = t.selectedOptions[0];
      if (option) {
        const href = option.getAttribute('href');
        if (href) {
          window.location.assign(href);
        }
      }

      // Choose the zero/default index again, in case the user presses Back
      // later on.
      t.selectedIndex = 0;
    });
  }
}

customElements.define('select-loader', SelectLoader);

/**
 *
 * The shadowDom / Intersection Observer version of Paul's concept:
 * https://github.com/paulirish/lite-youtube-embed
 *
 * A lightweight YouTube embed. Still should feel the same to the user, just
 * MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://storage.googleapis.com/amp-vs-non-amp/youtube-lazy.html
 *   https://autoplay-youtube-player.glitch.me/
 *
 * Once built it, I also found these (👍👍):
 *   https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube
 *   https://github.com/Daugilas/lazyYT https://github.com/vb/lazyframe
 */
class LiteYTEmbed extends HTMLElement {
    constructor() {
        super();
        this.iframeLoaded = false;
        this.setupDom();
    }
    static get observedAttributes() {
        return ['videoid'];
    }
    connectedCallback() {
        this.addEventListener('pointerover', LiteYTEmbed.warmConnections, {
            once: true,
        });
        this.addEventListener('click', () => this.addIframe());
    }
    get videoId() {
        return encodeURIComponent(this.getAttribute('videoid') || '');
    }
    set videoId(id) {
        this.setAttribute('videoid', id);
    }
    get videoTitle() {
        return this.getAttribute('videotitle') || 'Video';
    }
    set videoTitle(title) {
        this.setAttribute('videotitle', title);
    }
    get videoPlay() {
        return this.getAttribute('videoPlay') || 'Play';
    }
    set videoPlay(name) {
        this.setAttribute('videoPlay', name);
    }
    get videoStartAt() {
        return Number(this.getAttribute('videoStartAt') || '0');
    }
    set videoStartAt(time) {
        this.setAttribute('videoStartAt', String(time));
    }
    get autoLoad() {
        return this.hasAttribute('autoload');
    }
    set autoLoad(value) {
        if (value) {
            this.setAttribute('autoload', '');
        }
        else {
            this.removeAttribute('autoload');
        }
    }
    get params() {
        return `start=${this.videoStartAt}&${this.getAttribute('params')}`;
    }
    /**
     * Define our shadowDOM for the component
     */
    setupDom() {
        const shadowDom = this.attachShadow({ mode: 'open' });
        shadowDom.innerHTML = `
      <style>
        :host {
          contain: content;
          display: block;
          position: relative;
          width: 100%;
          padding-bottom: calc(100% / (16 / 9));
        }

        #frame, #fallbackPlaceholder, iframe {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        #frame {
          cursor: pointer;
        }

        #fallbackPlaceholder {
          object-fit: cover;
        }

        #frame::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
          background-position: top;
          background-repeat: repeat-x;
          height: 60px;
          padding-bottom: 50px;
          width: 100%;
          transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
          z-index: 1;
        }
        /* play button */
        .lty-playbtn {
          width: 70px;
          height: 46px;
          background-color: #212121;
          z-index: 1;
          opacity: 0.8;
          border-radius: 14%; /* TODO: Consider replacing this with YT's actual svg. Eh. */
          transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
          border: 0;
        }
        #frame:hover .lty-playbtn {
          background-color: #f00;
          opacity: 1;
        }
        /* play button triangle */
        .lty-playbtn:before {
          content: '';
          border-style: solid;
          border-width: 11px 0 11px 19px;
          border-color: transparent transparent transparent #fff;
        }
        .lty-playbtn,
        .lty-playbtn:before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }

        /* Post-click styles */
        .lyt-activated {
          cursor: unset;
        }

        #frame.lyt-activated::before,
        .lyt-activated .lty-playbtn {
          display: none;
        }
      </style>
      <div id="frame">
        <picture>
          <source id="webpPlaceholder" type="image/webp">
          <source id="jpegPlaceholder" type="image/jpeg">
          <img id="fallbackPlaceholder" referrerpolicy="origin">
        </picture>
        <button class="lty-playbtn"></button>
      </div>
    `;
        this.domRefFrame = this.shadowRoot.querySelector('#frame');
        this.domRefImg = {
            fallback: this.shadowRoot.querySelector('#fallbackPlaceholder'),
            webp: this.shadowRoot.querySelector('#webpPlaceholder'),
            jpeg: this.shadowRoot.querySelector('#jpegPlaceholder'),
        };
        this.domRefPlayButton = this.shadowRoot.querySelector('.lty-playbtn');
    }
    /**
     * Parse our attributes and fire up some placeholders
     */
    setupComponent() {
        this.initImagePlaceholder();
        this.domRefPlayButton.setAttribute('aria-label', `${this.videoPlay}: ${this.videoTitle}`);
        this.setAttribute('title', `${this.videoPlay}: ${this.videoTitle}`);
        if (this.autoLoad) {
            this.initIntersectionObserver();
        }
    }
    /**
     * Lifecycle method that we use to listen for attribute changes to period
     * @param {*} name
     * @param {*} oldVal
     * @param {*} newVal
     */
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case 'videoid': {
                if (oldVal !== newVal) {
                    this.setupComponent();
                    // if we have a previous iframe, remove it and the activated class
                    if (this.domRefFrame.classList.contains('lyt-activated')) {
                        this.domRefFrame.classList.remove('lyt-activated');
                        this.shadowRoot.querySelector('iframe').remove();
                        this.iframeLoaded = false;
                    }
                }
                break;
            }
        }
    }
    /**
     * Inject the iframe into the component body
     */
    addIframe() {
        if (!this.iframeLoaded) {
            const iframeHTML = `
<iframe frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
  src="https://www.youtube.com/embed/${this.videoId}?autoplay=1&${this.params}"
></iframe>`;
            this.domRefFrame.insertAdjacentHTML('beforeend', iframeHTML);
            this.domRefFrame.classList.add('lyt-activated');
            this.iframeLoaded = true;
        }
    }
    /**
     * Setup the placeholder image for the component
     */
    initImagePlaceholder() {
        // we don't know which image type to preload, so warm the connection
        LiteYTEmbed.addPrefetch('preconnect', 'https://i.ytimg.com/');
        const posterUrlWebp = `https://i.ytimg.com/vi_webp/${this.videoId}/hqdefault.webp`;
        const posterUrlJpeg = `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`;
        this.domRefImg.webp.srcset = posterUrlWebp;
        this.domRefImg.jpeg.srcset = posterUrlJpeg;
        this.domRefImg.fallback.src = posterUrlJpeg;
        this.domRefImg.fallback.setAttribute('aria-label', `${this.videoPlay}: ${this.videoTitle}`);
        this.domRefImg.fallback.setAttribute('alt', `${this.videoPlay}: ${this.videoTitle}`);
    }
    /**
     * Setup the Intersection Observer to load the iframe when scrolled into view
     */
    initIntersectionObserver() {
        if ('IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0,
            };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.iframeLoaded) {
                        LiteYTEmbed.warmConnections();
                        this.addIframe();
                        observer.unobserve(this);
                    }
                });
            }, options);
            observer.observe(this);
        }
    }
    /**
     * Add a <link rel={preload | preconnect} ...> to the head
     * @param {*} kind
     * @param {*} url
     * @param {*} as
     */
    static addPrefetch(kind, url, as) {
        const linkElem = document.createElement('link');
        linkElem.rel = kind;
        linkElem.href = url;
        if (as) {
            linkElem.as = as;
        }
        linkElem.crossOrigin = 'true';
        document.head.append(linkElem);
    }
    /**
     * Begin preconnecting to warm up the iframe load Since the embed's netwok
     * requests load within its iframe, preload/prefetch'ing them outside the
     * iframe will only cause double-downloads. So, the best we can do is warm up
     * a few connections to origins that are in the critical path.
     *
     * Maybe `<link rel=preload as=document>` would work, but it's unsupported:
     * http://crbug.com/593267 But TBH, I don't think it'll happen soon with Site
     * Isolation and split caches adding serious complexity.
     */
    static warmConnections() {
        if (LiteYTEmbed.preconnected)
            return;
        // Host that YT uses to serve JS needed by player, per amp-youtube
        LiteYTEmbed.addPrefetch('preconnect', 'https://s.ytimg.com');
        // The iframe document and most of its subresources come right off
        // youtube.com
        LiteYTEmbed.addPrefetch('preconnect', 'https://www.youtube.com');
        // The botguard script is fetched off from google.com
        LiteYTEmbed.addPrefetch('preconnect', 'https://www.google.com');
        // TODO: Not certain if these ad related domains are in the critical path.
        // Could verify with domain-specific throttling.
        LiteYTEmbed.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
        LiteYTEmbed.addPrefetch('preconnect', 'https://static.doubleclick.net');
        LiteYTEmbed.preconnected = true;
    }
}
LiteYTEmbed.preconnected = false;
// Register custom element
customElements.define('lite-youtube', LiteYTEmbed);

/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class FilterModal extends BaseElement$1 {
  constructor() {
    super();
    this.items = [];
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStoreUpdate.bind(this));
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.onClick);
  }

  onClick(event) {
    const target = event.target;

    // Open menu button
    if (target.classList.contains('filter-modal__opener')) {
      /** @type {HTMLDialogElement|null} */
      const dialog = document.querySelector('#filter-modal');
      if (dialog) {
        // @ts-ignore
        dialog.showModal();
      }
    }

    // Filters reset
    if (target.id === 'filter-modal__reset') {
      this.resetFilters();
    }

    // Filters
    if (target.id === 'filter-modal__done' || target.nodeName === 'DIALOG') {
      /** @type {HTMLDialogElement|null} */
      const dialog = document.querySelector('#filter-modal');
      if (dialog) {
        // @ts-ignore
        dialog.close();
      }
    }
  }

  resetFilters() {
    clearFilters();
  }

  onStoreUpdate(state) {
    const filters = state.filters || {};
    const items = [];
    for (const [name, entries] of Object.entries(filters)) {
      for (const item of entries) {
        items.push({
          name: name,
          value: item.value,
          label: item.label,
        });
      }
    }
    this.items = items;
  }
}

customElements.define('filter-modal', FilterModal);

/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//import {html} from 'lit-element';

class FilteredElement extends BaseStateElement {
  static get properties() {
    return {
      hidden: {type: Boolean, reflect: true},
    };
  }

  constructor() {
    super();
    this.hidden = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.content = this.innerHTML;

    this.filters = {};
    const attributes = this.getAttributeNames();
    for (const attribute of attributes) {
      if (!attribute.startsWith('data-filter-')) {
        continue;
      }
      const name = attribute.replace('data-filter-', '');
      this.filters[name] = this.getAttribute(attribute);
    }
  }

  onStateChanged(state) {
    const activeFilters = state.filters || {};

    // Remove any empty filter arrays
    for (const key in activeFilters) {
      if (activeFilters[key] && activeFilters[key].length === 0) {
        delete activeFilters[key];
      }
    }

    // Check for matches
    if (Object.keys(activeFilters).length === 0) {
      // Show all elements when no filters are active
      this.hidden = false;
      return;
    }

    // Hide elements that don't match the active filters
    this.hidden = false;

    for (const [filterName, filterInput] of Object.entries(activeFilters)) {
      const values = filterInput.map(input => input.value);
      if (this.filters && !values.includes(this.filters[filterName])) {
        this.hidden = true;
      }
    }
  }
}
customElements.define('filtered-element', FilteredElement);

// fetch("https://api.eallion.com/hitokoto?c=k&charset=utf-8&encode=json")
fetch("https://v2.jinrishici.com/one.json")
    .then(response => response.json())
    .then(data => {
        const jinrishici = document.querySelector('#jinrishici');
        jinrishici.innerText = '「' + data.data.content + '」';
        const author = document.querySelector('#jinrishici-author');
        author.innerText = '- ' + '〔' + data.data.origin.dynasty + '〕' + data.data.origin.author + '《' + data.data.origin.title + '》';
    })
    .catch(console.error);
