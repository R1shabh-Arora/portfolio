/**
 * External profile URLs, defined once.
 *
 * These were previously inlined at each use site, which let the Hack The Box
 * link drift: two components pointed at a stale app.hackthebox.com numeric ID
 * while a third had the correct profile.hackthebox.com UUID. Import from here
 * rather than pasting a URL into a component.
 */

/** HTB profiles are keyed by UUID on profile.hackthebox.com. */
export const HTB_PROFILE_URL =
  "https://profile.hackthebox.com/profile/019e7e93-f3b7-72d9-a26c-2eff19879e39";

export const THM_PROFILE_URL = "https://tryhackme.com/p/Failed0";

export const BLOG_URL = "https://blogs.rishabh.uk/";
export const BLOG_FEED_URL = "https://blogs.rishabh.uk/feed.xml";

export const GITHUB_URL = "https://github.com/R1shabh-Arora";
export const LINKEDIN_URL = "https://www.linkedin.com/in/R1shabh-Arora/";
export const INSTAGRAM_URL = "https://www.instagram.com/r1shabh_arora/";
