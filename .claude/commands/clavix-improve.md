---
description: Analyze and improve a prompt for better AI outputs
---

# Clavix Prompt Improvement

You are helping the user improve their prompt using Clavix's prompt optimization system.

## Instructions

1. Take the user's prompt: `$ARGUMENTS`

2. Analyze the prompt for:
   - **Gaps**: Missing context, unclear requirements, no success criteria
   - **Ambiguities**: Vague terms, multiple interpretations
   - **Strengths**: What's already clear and well-defined

3. Generate an improved, structured prompt with these sections:

   **Objective**: Clear, specific goal
   **Requirements**: Detailed, actionable requirements
   **Technical Constraints**: Technologies, performance needs, integrations
   **Expected Output**: What the result should look like
   **Success Criteria**: How to measure completion

4. Present the improved prompt in a code block for easy copying.

5. Highlight key improvements made.

## Example

If user provides: "Create a login page"

Improve it to:
```
Objective: Build a secure user authentication login page

Requirements:
- Email and password input fields with validation
- "Remember me" checkbox
- "Forgot password" link
- Show clear error messages for invalid credentials
- Responsive design for mobile and desktop

Technical Constraints:
- Use React with TypeScript
- Integrate with existing JWT authentication API
- Follow WCAG 2.1 AA accessibility standards
- Support password managers

Expected Output:
- Fully functional login component
- Unit tests with >80% coverage
- Integration with auth context

Success Criteria:
- Users can log in successfully
- Invalid credentials show appropriate errors
- Page is accessible via keyboard navigation
- Loads in < 2 seconds
```

## Note

If the prompt is very short or unclear, ask clarifying questions before improving.
