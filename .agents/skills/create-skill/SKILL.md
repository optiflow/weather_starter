---
name: create-skill
description: Create new skills, modify and improve existing skills. Use when users want to create a skill from scratch, edit, or optimize an existing skill that extends the agent's capabilities with specialized knowledge, workflows, or tool integrations.
---

A skill for creating new skills and iteratively improving them.

Skills are modular, self-contained folders that extend the agent's capabilities by providing specialized knowledge, workflows, and tools. Think of them as "onboarding guides" for specific domains or tasks—they transform a general-purpose agent into a specialized agent equipped with procedural knowledge.

## Anatomy of a Skill

Every skill consists of a required `SKILL.md` file and optional bundled resources:

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter metadata (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/    - Executable code (Python/Bash/etc.) for deterministic/repetitive tasks
    ├── references/ - Documentation intended to be loaded into context as needed
    └── assets/     - Files used in output (templates, icons, fonts)
```

## Progressive Disclosure

Skills use a three-level loading system to manage context efficiently:

1. **Metadata (name + description)** - Always in context. Determines when the skill triggers.
2. **SKILL.md body** - Loaded into context when the skill triggers. Keep under 500 lines to minimize context bloat.
3. **Bundled resources** - Loaded as needed. Scripts can be executed, and reference files read when the agent determines they are necessary.

**Key principle:** Keep the `SKILL.md` body focused on the essentials. Move variant-specific details, large schemas, deep workflow guides, and configuration into separate reference files in the `references/` directory.

## Skill Creation Workflow

At a high level, the process of creating a skill goes like this:

### 1. Capture Intent and Plan
- Decide what you want the skill to do and roughly how it should do it.
- **Triggers**: When should this skill trigger? What user phrases or contexts apply?
- **Outputs**: What's the expected output format?
- **Resources**: What reusable resources (scripts, references, assets) will be needed to execute the workflow reliably?

### 2. Draft the Skill
- **Write the `SKILL.md` file**.
- **Frontmatter**: Ensure the YAML frontmatter contains a clear `name` and `description`. The description is the primary triggering mechanism, so make sure to include what the skill does AND specific contexts for when to use it.
- **Body**: Write the Markdown body using the imperative form. Define clear output formats and provide concise examples.
- **Resources**: Create and add any bundled resources. Keep scripts lean and modular.

### 3. Test and Evaluate
- **Test Prompts**: Create a few realistic test prompts (the kind of thing a real user would actually say).
- **Run**: Test the agent using the skill on those prompts.
- **Evaluate**: Evaluate the results qualitatively. Did the agent follow the skill correctly? Did it get stuck?

### 4. Iterate and Improve
- **Look for repeated work**: Read the transcripts from the test runs. If the agent independently writes similar helper scripts multiple times, that's a strong signal the skill should bundle that script. Write it once, put it in `scripts/`, and tell the skill to use it.
- **Refine Instructions**: Rewrite the skill based on feedback and results. Remove things that aren't pulling their weight.
- **Repeat** the test-evaluate-iterate loop until you and the user are satisfied.

## Writing Best Practices

- **Concise is Key**: The context window is precious. Default assumption: the agent is already very smart. Only add context it doesn't already have. Challenge each piece of information: "Does this paragraph justify its token cost?"
- **Explain the Why**: Try hard to explain the *why* behind everything you're asking the agent to do. Agents have good theory of mind and when given a good harness can go beyond rote instructions. Avoid heavy-handed, oppressive MUSTs if explaining the reasoning is more effective.
- **Set Appropriate Degrees of Freedom**:
  - **High freedom (text instructions)**: Use when multiple approaches are valid, and decisions depend on context.
  - **Medium freedom (scripts with parameters)**: Use when a preferred pattern exists, but some variation is acceptable.
  - **Low freedom (specific scripts)**: Use when operations are fragile, error-prone, and a specific sequence must be strictly followed.
- **Domain Organization**: When a skill supports multiple domains or frameworks, organize by variant (e.g., `references/aws.md`, `references/gcp.md`). The agent will only read the relevant one based on the user's specific request.
