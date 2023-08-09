---
name: HTML Feedback template
about: Formatting for feedback from bug report feature
title: ''
labels: ''
assignees: ''

---

- type: markdown
    attributes:
      value: |
        ### Before you start

        **This is just a testing issue report**
        ↩ Developing.

        **Write base on**
        ↩ https://github.com/mdn/content/blob/main/.github/ISSUE_TEMPLATE/content-bug.yml?plain=1

        **Feasible link format**
        🙋 [Report issue](https://github.com/YiChen8185/TestForGitHubIssue/issues/new?assignees=&labels=&projects=&template=bug_report.yml&articleTitle=test_title)
        ↩ https://github.com/YiChen8185/TestForGitHubIssue/issues/new?assignees=&labels=&projects=&template=bug_report.yml&articleTitle=test_title

        ---

  - type: textarea
    attributes:
      label: Anything you want to write.


  # Below is autofill section.
  - type: markdown
    attributes:
      value: |
        ---
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        
        # Set automatically. Do not modify.
        
        
  - type: textarea
    id: description
    attributes:
      description: Set automatically. Do not modify.
      label: Description
    validations:
      required: true
  
  - type: textarea
    id: uniqueId
    attributes:
      label: UniqueId for the Article
      description: Set automatically. Do not modify.
    validations:
      required: true

  # Example.
  - type: textarea
    id: references
    attributes:
      label: Do you have any supporting links, references, or citations?
      description: Link to information that helps us confirm your issue.
  - type: textarea
    id: more-info
    attributes:
      label: Do you have anything more you want to share?
      description: For example, steps to reproduce a bug, screenshots, screen recordings, or sample code
