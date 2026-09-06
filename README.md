# Overdrive public documentation site

This static site is intended for a separate public documentation repository. It does not contain the commercial theme source.

## Before deployment

1. Create a Formspree account owned by the support team.
2. Create a form and replace `https://formspree.io/f/REPLACE_WITH_FORM_ID` in `support.html` with its HTTPS endpoint.
3. Submit a test request and confirm delivery, spam handling and the reply workflow.
4. Confirm the stated two-business-day response policy can be maintained.
5. Publish this directory through a separate public GitHub Pages repository.
6. Replace `theme_documentation_url` and `theme_support_url` in the private theme repository with the final public URLs.
7. Re-run Theme Check and package a new release ZIP.

Do not copy theme source, release ZIPs, Partner credentials, store passwords or access tokens into the public documentation repository.
