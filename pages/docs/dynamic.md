---
dynamic:
  variables: [ $os, $language ]
  ref: docs/$os/$language/dynamic
  $switch_text: Getting Started with $os and $language
---

# Dynamic page about {{ $os.name }} & {{ $language.name }}

Hey, this is the page about **{{ $os.name }}** and **{{ $language.name }}**.

## Smart import

{{ import "imported" }}

## Helpers Example

{{#eq $os.id "osx"}}
  **This page _is about_ OSX**.
  This paragraph is rendered using the Handlebars helper.
{{else}}
  **This page _is NOT about_ OSX**.
  This paragraph is rendered using the Handlebars helper.
{{/eq}}
